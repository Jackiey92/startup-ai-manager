from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path

import pytest


ROOT = Path(__file__).resolve().parents[1]


def test_prepare_runtime_mounts_plugin_and_writes_fresh_9_6_shape(tmp_path: Path) -> None:
    state = tmp_path / "state"
    env = os.environ.copy()
    env.update(
        {
            "SAM_PROFILE": "local",
            "SAM_OPENCLAW_STATE_DIR": str(state),
            "SAM_OPENCLAW_CONFIG": str(state / "openclaw.json"),
        }
    )
    result = subprocess.run(
        [sys.executable, "scripts/prepare-openclaw-runtime.py"],
        cwd=ROOT,
        env=env,
        check=True,
        capture_output=True,
        text=True,
    )
    assert "openclaw_runtime_prepared" in result.stdout
    assert (state / "extensions" / "sam-memory").is_symlink()
    config = json.loads((state / "openclaw.json").read_text(encoding="utf-8"))
    assert "sam-leader" in config["agents"]["entries"]
    assert config["agents"]["entries"]["sam-leader"]["name"] == "SAM Leader"
    assert "list" not in config["agents"]
    assert set(config["agents"]["entries"]["sam-leader"]["tools"]["allow"]) == {
        "sam_memory_read",
        "sam_memory_search",
        "sam_file_get",
        "sam_memory_map",
        "sam_conversation_read",
        "sam_thread_list",
        "sam_thread_open",
        "sam_document_ingest",
    }
    assert "sam_promote" not in config["tools"]["allow"]
    assert config["tools"]["toolSearch"] == {
        "enabled": True,
        "mode": "tools",
        "searchDefaultLimit": 5,
        "maxSearchLimit": 10,
    }
    assert config["tools"]["codeMode"]["enabled"] is False
    assert config["agents"]["defaults"]["models"]["token-plan/${SAM_LEADER_MODEL}"]["params"]["enable_thinking"] is False


def test_default_token_plan_model_is_qwen38max_without_model_override() -> None:
    manifest = (ROOT / "sam-manifest.yaml").read_text(encoding="utf-8")
    startup = (ROOT / "scripts" / "run.sh").read_text(encoding="utf-8")
    isolated = (ROOT / "tools" / "run-sam-isolated.sh").read_text(encoding="utf-8")
    assert "default_model: qwen3.8-max" in manifest
    assert 'SAM_LEADER_MODEL:-${SAM_GUIDE_MODEL:-qwen3.8-max}' in startup
    assert 'SAM_LEADER_MODEL:-${SAM_GUIDE_MODEL:-qwen3.8-max}' in isolated


def test_legacy_guide_model_environment_falls_back_to_leader_names() -> None:
    from app.runtime_config import RuntimeConfig

    env = {
        "SAM_PROFILE": "local",
        "SAM_GUIDE_MODEL": "legacy-model",
        "SAM_GUIDE_MODEL_BASE_URL": "https://legacy.invalid/v1",
        "SAM_GUIDE_MODEL_API_KEY": "legacy-secret",
    }
    config = RuntimeConfig.from_env(project_root=ROOT, env=env)
    assert config.model_default == "legacy-model"
    assert config.model_base_url == "https://legacy.invalid/v1"
    assert config.model_name_env == "SAM_LEADER_MODEL"
    assert config.model_base_url_env == "SAM_LEADER_MODEL_BASE_URL"
    assert config.model_api_key_env == "SAM_LEADER_MODEL_API_KEY"
    assert env["SAM_LEADER_MODEL"] == "legacy-model"
    assert env["SAM_LEADER_MODEL_API_KEY"] == "legacy-secret"


def test_standard_startup_fails_before_flask_when_model_key_is_missing(tmp_path: Path) -> None:
    startup = (ROOT / "scripts" / "run.sh").read_text(encoding="utf-8")
    assert "export PORT=18789" in startup
    assert "export OPENCLAW_GATEWAY_PORT=18790" in startup
    assert "export SAM_OPENCLAW_GATEWAY_PORT=\"$OPENCLAW_GATEWAY_PORT\"" in startup
    env = os.environ.copy()
    env.pop("SAM_LEADER_MODEL_API_KEY", None)
    env["HOME"] = str(tmp_path)
    env["SAM_NODE_BIN"] = str(_fake_node(tmp_path / "node24", "v24.21.0"))
    result = subprocess.run(
        ["bash", "scripts/run.sh"], cwd=ROOT, env=env,
        capture_output=True, text=True,
    )
    assert result.returncode == 2
    assert "Missing SAM_LEADER_MODEL_API_KEY" in result.stderr


def _fake_node(path: Path, version: str) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(f"#!/bin/sh\necho {version}\n", encoding="utf-8")
    path.chmod(0o755)
    return path


def test_runtime_prefers_local_node24_over_path_node22(tmp_path: Path) -> None:
    from app.runtime_config import RuntimeConfig

    node22 = _fake_node(tmp_path / "bin" / "node", "v22.23.3")
    node24 = _fake_node(
        tmp_path / ".local" / "node-v24.21.0-linux-x64" / "bin" / "node",
        "v24.21.0",
    )
    config = RuntimeConfig.from_env(project_root=ROOT, env={
        "HOME": str(tmp_path), "PATH": str(node22.parent), "SAM_PROFILE": "local",
    })
    assert config.node_bin == str(node24)


def test_runtime_rejects_explicit_unsupported_node(tmp_path: Path) -> None:
    from app.runtime_config import RuntimeConfig

    node22 = _fake_node(tmp_path / "node22", "v22.23.3")
    with pytest.raises(RuntimeError, match="Node.js >=24"):
        RuntimeConfig.from_env(project_root=ROOT, env={
            "HOME": str(tmp_path), "PATH": str(tmp_path),
            "SAM_NODE_BIN": str(node22), "SAM_PROFILE": "local",
        })
