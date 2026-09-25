"""Portable SAM runtime configuration.

The repository carries a small YAML manifest and local/cloud profiles. A
dependency-free parser is used so deployment needs no package just to discover
paths and environment-variable names. Environment variables are final wins.
"""
from __future__ import annotations

import json
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any


def _scalar(value: str) -> Any:
    value = value.strip()
    if not value:
        return None
    if value[0:1] in {"\"", "'"} and value[-1:] == value[0]:
        return value[1:-1]
    if value in {"true", "false"}:
        return value == "true"
    if value in {"null", "~"}:
        return None
    try:
        return json.loads(value)
    except (TypeError, ValueError):
        return value


def _simple_yaml(text: str) -> dict[str, Any]:
    """Parse the small nested-mapping subset used by SAM profiles."""
    root: dict[str, Any] = {}
    stack: list[tuple[int, dict[str, Any]]] = [(-1, root)]
    for raw in text.splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        indent = len(raw) - len(raw.lstrip(" "))
        key, sep, value = raw.strip().partition(":")
        if not sep or not key:
            raise ValueError(f"unsupported manifest line: {raw!r}")
        while stack[-1][0] >= indent:
            stack.pop()
        parent = stack[-1][1]
        if value.strip():
            parent[key] = _scalar(value)
        else:
            child: dict[str, Any] = {}
            parent[key] = child
            stack.append((indent, child))
    return root


def _merge(base: dict[str, Any], overlay: dict[str, Any]) -> dict[str, Any]:
    result = dict(base)
    for key, value in overlay.items():
        if isinstance(value, dict) and isinstance(result.get(key), dict):
            result[key] = _merge(result[key], value)
        else:
            result[key] = value
    return result


def _read_config(root: Path, env: dict[str, str]) -> dict[str, Any]:
    manifest_path = Path(env.get("SAM_MANIFEST", root / "sam-manifest.yaml"))
    manifest = _simple_yaml(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
    profile_name = env.get("SAM_PROFILE", "local")
    profile_path = Path(env.get("SAM_PROFILE_PATH", root / "profiles" / f"{profile_name}.yaml"))
    profile = _simple_yaml(profile_path.read_text(encoding="utf-8")) if profile_path.exists() else {}
    return _merge(manifest, profile)


def _path(root: Path, value: str | None, default: Path) -> Path:
    if not value:
        return default.resolve()
    candidate = Path(value)
    return (candidate if candidate.is_absolute() else root / candidate).resolve()


@dataclass(frozen=True)
class RuntimeConfig:
    project_root: Path
    harness_root: Path
    node_bin: str
    openclaw_entry: Path
    venv_bin: Path
    state_dir: Path
    config_path: Path
    git_dir: str | None
    skill_for_format: dict[str, str]
    model_api: str
    model_base_url: str
    model_base_url_env: str
    model_name_env: str
    model_api_key_env: str
    model_default: str
    memory_provider: str
    memory_base_url_env: str
    memory_api_key_env: str

    @classmethod
    def from_env(cls, project_root: str | Path | None = None, env: dict[str, str] | None = None) -> "RuntimeConfig":
        env = env if env is not None else os.environ
        root = Path(project_root or env.get("SAM_PROJECT_ROOT", Path(__file__).resolve().parent.parent)).resolve()
        config = _read_config(root, env)
        runtime = config.get("runtime", {})
        paths = config.get("paths", {})
        skills = config.get("skills", {})
        model = config.get("model", {})
        memory = config.get("memory", {})
        harness = _path(root, env.get("SAM_HARNESS_ROOT", paths.get("harness_root")), root / "harness-openclaw")
        node_bin = env.get("SAM_NODE_BIN", runtime.get("node_bin", "node"))
        entry = _path(root, env.get("SAM_OPENCLAW_ENTRY", paths.get("openclaw_entry")), root / ".oc-runtime/node_modules/openclaw/openclaw.mjs")
        venv_bin = _path(root, env.get("SAM_VENV_BIN", paths.get("venv_bin")), root / ".venv/bin")
        state = _path(root, env.get("SAM_OPENCLAW_STATE_DIR", paths.get("state_dir")), harness / "state")
        config_path = _path(root, env.get("SAM_OPENCLAW_CONFIG", paths.get("config_path")), state / "openclaw.json")
        mapping = dict(skills.get("map", {"xlsx": "parse-xlsx"}))
        raw_mapping = env.get("SAM_SKILL_MAP")
        if raw_mapping:
            loaded = json.loads(raw_mapping)
            if not isinstance(loaded, dict) or not all(isinstance(k, str) and isinstance(v, str) for k, v in loaded.items()):
                raise ValueError("SAM_SKILL_MAP must be a JSON object of format to skill names")
            mapping = loaded
        base_url_env = str(env.get("SAM_MODEL_BASE_URL_ENV", model.get("base_url_env", "SAM_GUIDE_MODEL_BASE_URL")))
        name_env = str(env.get("SAM_MODEL_NAME_ENV", model.get("model_env", "SAM_GUIDE_MODEL")))
        key_env = str(env.get("SAM_MODEL_API_KEY_ENV", model.get("api_key_env", "SAM_GUIDE_MODEL_API_KEY")))
        return cls(
            root, harness, node_bin, entry, venv_bin, state, config_path,
            env.get("SAM_GIT_DIR"), mapping,
            str(model.get("api", "openai-completions")),
            str(model.get("base_url", "")), base_url_env, name_env, key_env,
            str(model.get("default_model", "auto")),
            str(memory.get("provider", "local")),
            str(memory.get("base_url_env", "SAM_OV_BASE_URL")),
            str(memory.get("api_key_env", "SAM_OV_API_KEY")),
        )
