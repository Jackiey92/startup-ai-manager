"""Portable SAM runtime configuration.

The repository carries a small YAML manifest and local/cloud profiles. A
dependency-free parser is used so deployment needs no package just to discover
paths and environment-variable names. Environment variables are final wins.
"""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
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


def _path(root: Path, value: str | None, default: Path, *, follow_symlinks: bool = True) -> Path:
    if not value:
        candidate = default
    else:
        candidate = Path(value).expanduser()
        if not candidate.is_absolute():
            candidate = root / candidate
    # Executable paths must retain virtual-environment symlinks. Calling
    # resolve() on .venv/bin/python turns it into /usr/bin/python3 and loses
    # the venv's sys.prefix and installed packages.
    if follow_symlinks:
        return candidate.resolve()
    return Path(os.path.abspath(candidate))


def _node_major(binary: str) -> int | None:
    packaged = re.search(r"(?:^|/)node-v(\d+)(?:\.[^/]*)?-linux-x64/bin/node$", binary)
    if packaged and Path(binary).is_file() and os.access(binary, os.X_OK):
        return int(packaged.group(1))
    try:
        output = subprocess.check_output(
            [binary, "--version"], text=True, timeout=5, stderr=subprocess.DEVNULL,
        )
    except (OSError, subprocess.SubprocessError):
        return None
    match = re.match(r"v?(\d+)", output.strip())
    return int(match.group(1)) if match else None


def _select_node_bin(env: dict[str, str], runtime: dict[str, Any]) -> str:
    """Select a real Node.js >=24 executable; never limp on with Node 22."""
    explicit = env.get("SAM_NODE_BIN")
    candidates: list[str] = []
    if explicit:
        candidates.append(explicit)
    else:
        home = Path(env.get("HOME", str(Path.home()))).expanduser()
        candidates.extend(str(path) for path in sorted(
            (home / ".local").glob("node-v*-linux-x64/bin/node"), reverse=True,
        ))
        configured = runtime.get("node_bin")
        if configured:
            candidates.append(str(configured))
        system = shutil.which("node", path=env.get("PATH"))
        if system:
            candidates.append(system)
    seen: set[str] = set()
    detected: list[str] = []
    for candidate in candidates:
        resolved = shutil.which(candidate, path=env.get("PATH")) or candidate
        if resolved in seen:
            continue
        seen.add(resolved)
        major = _node_major(resolved)
        detected.append(f"{resolved}={major if major is not None else 'unavailable'}")
        if major is not None and major >= 24:
            return resolved
    detail = ", ".join(detected) if detected else "no node executable found"
    raise RuntimeError(f"Node.js >=24 is required for OpenClaw Gateway ({detail})")


@dataclass(frozen=True)
class RuntimeConfig:
    project_root: Path
    harness_root: Path
    node_bin: str
    openclaw_entry: Path
    venv_bin: Path
    state_dir: Path
    config_path: Path
    data_root: Path
    objects_dir: Path
    main_db: Path
    app_db: Path
    memory_root: Path
    skill_root: Path
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
    tool_plugin_dir: Path
    tool_bridge_python: Path
    agent_id: str
    openclaw_mode: str
    gateway_port: int

    @classmethod
    def from_env(cls, project_root: str | Path | None = None, env: dict[str, str] | None = None) -> "RuntimeConfig":
        env = env if env is not None else os.environ
        root = Path(project_root or env.get("SAM_PROJECT_ROOT", Path(__file__).resolve().parent.parent)).resolve()
        config = _read_config(root, env)
        runtime = config.get("runtime", {})
        paths = config.get("paths", {})
        configured_root = _path(root, env.get("SAM_PROJECT_ROOT", paths.get("project_root")), root)
        skills = config.get("skills", {})
        model = config.get("model", {})
        memory = config.get("memory", {})
        harness = _path(configured_root, env.get("SAM_HARNESS_ROOT", paths.get("harness_root")), configured_root / "harness-openclaw")
        node_bin = _select_node_bin(env, runtime)
        entry = _path(configured_root, env.get("SAM_OPENCLAW_ENTRY", paths.get("openclaw_entry")), configured_root / ".oc-runtime/node_modules/openclaw/openclaw.mjs", follow_symlinks=False)
        venv_bin = _path(configured_root, env.get("SAM_VENV_BIN", paths.get("venv_bin")), configured_root / ".venv/bin", follow_symlinks=False)
        state = _path(configured_root, env.get("SAM_OPENCLAW_STATE_DIR", paths.get("state_dir")), harness / "state")
        config_path = _path(configured_root, env.get("SAM_OPENCLAW_CONFIG", paths.get("config_path")), state / "openclaw.json")
        plugin_dir = _path(configured_root, env.get("SAM_TOOL_PLUGIN_DIR", paths.get("tool_plugin_dir")), harness / "plugins" / "sam-memory")
        # The web/runtime venv intentionally remains separate from the parser
        # venv.  A clean checkout may have Docling in ``.venv`` but CPU Torch
        # only in ``.sam-isolated/venv``; prefer the latter for the bridge when
        # no explicit interpreter was injected.  Explicit configuration always
        # wins, so deployments can use their own isolated interpreter.
        configured_bridge = env.get("SAM_TOOL_BRIDGE_PYTHON")
        manifest_bridge = paths.get("tool_bridge_python")
        if configured_bridge is None and manifest_bridge in {None, ".venv/bin/python"}:
            isolated_bridge = configured_root / ".sam-isolated" / "venv" / "bin" / "python"
            if isolated_bridge.is_file():
                bridge_python = _path(configured_root, str(isolated_bridge), venv_bin / "python", follow_symlinks=False)
            else:
                bridge_python = _path(configured_root, manifest_bridge, venv_bin / "python", follow_symlinks=False)
        else:
            bridge_python = _path(configured_root, configured_bridge or manifest_bridge, venv_bin / "python", follow_symlinks=False)
        agent_id = str(env.get("SAM_OPENCLAW_AGENT", runtime.get("agent_id", "sam-leader")))
        mapping = dict(skills.get("map", {"*": "document-ingest"}))
        raw_mapping = env.get("SAM_SKILL_MAP")
        if raw_mapping:
            loaded = json.loads(raw_mapping)
            if not isinstance(loaded, dict) or not all(isinstance(k, str) and isinstance(v, str) for k, v in loaded.items()):
                raise ValueError("SAM_SKILL_MAP must be a JSON object of format to skill names")
            mapping = loaded
        base_url_env = str(env.get("SAM_MODEL_BASE_URL_ENV", model.get("base_url_env", "SAM_LEADER_MODEL_BASE_URL")))
        name_env = str(env.get("SAM_MODEL_NAME_ENV", model.get("model_env", "SAM_LEADER_MODEL")))
        key_env = str(env.get("SAM_MODEL_API_KEY_ENV", model.get("api_key_env", "SAM_LEADER_MODEL_API_KEY")))
        # Keep older deployments working while making the leader-scoped names
        # canonical. A new variable always wins over its legacy counterpart.
        legacy_envs = {
            "SAM_LEADER_MODEL_BASE_URL": "SAM_GUIDE_MODEL_BASE_URL",
            "SAM_LEADER_MODEL": "SAM_GUIDE_MODEL",
            "SAM_LEADER_MODEL_API_KEY": "SAM_GUIDE_MODEL_API_KEY",
        }
        for current, legacy in legacy_envs.items():
            if not env.get(current) and env.get(legacy):
                env[current] = env[legacy]
        gateway_mode = str(env.get("SAM_OPENCLAW_MODE", runtime.get("gateway_mode", "gateway")))
        # The web service uses PORT (18789 in the demo).  Never fall back to
        # that listener for the resident OpenClaw gateway when a custom
        # manifest omits its explicit port.
        gateway_port = int(env.get(
            "SAM_OPENCLAW_GATEWAY_PORT",
            env.get("OPENCLAW_GATEWAY_PORT", runtime.get("gateway_port", 18790)),
        ))
        return cls(
            configured_root, harness, node_bin, entry, venv_bin, state, config_path,
            _path(configured_root, env.get("SAM_DATA_ROOT", paths.get("data_root")), configured_root / "data"),
            _path(configured_root, env.get("SAM_OBJECTS_DIR", paths.get("objects_dir")), configured_root / "data" / "objects"),
            _path(configured_root, env.get("SAM_MAIN_DB", paths.get("main_db")), configured_root / "data" / "app.db"),
            _path(configured_root, env.get("SAM_APP_DB", paths.get("app_db")), configured_root / "data" / "sales_app" / "app.db"),
            _path(configured_root, env.get("SAM_MEMORY_ROOT", paths.get("memory_root")), configured_root / ".sam-memory"),
            _path(configured_root, env.get("SAM_SKILL_ROOT", skills.get("root")), configured_root / "skills"),
            env.get("SAM_GIT_DIR"), mapping,
            str(model.get("api", "openai-completions")),
            str(env.get(base_url_env, model.get("base_url", ""))), base_url_env, name_env, key_env,
            str(env.get(name_env, model.get("default_model", "auto"))),
            str(memory.get("provider", "local")),
            str(memory.get("base_url_env", "SAM_OV_BASE_URL")),
            str(memory.get("api_key_env", "SAM_OV_API_KEY")),
            plugin_dir, bridge_python,
            agent_id,
            gateway_mode,
            gateway_port,
        )
