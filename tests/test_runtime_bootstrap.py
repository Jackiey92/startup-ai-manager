from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path


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
    }
    assert "sam_promote" not in config["tools"]["allow"]
    assert config["agents"]["defaults"]["models"]["token-plan/${SAM_GUIDE_MODEL}"]["params"]["enable_thinking"] is False


def test_default_token_plan_model_is_qwen38max_without_model_override() -> None:
    manifest = (ROOT / "sam-manifest.yaml").read_text(encoding="utf-8")
    startup = (ROOT / "scripts" / "run.sh").read_text(encoding="utf-8")
    isolated = (ROOT / "tools" / "run-sam-isolated.sh").read_text(encoding="utf-8")
    assert "default_model: qwen3.8-max" in manifest
    assert 'SAM_GUIDE_MODEL:-qwen3.8-max' in startup
    assert 'SAM_GUIDE_MODEL:-qwen3.8-max' in isolated


def test_standard_startup_fails_before_flask_when_model_key_is_missing(tmp_path: Path) -> None:
    startup = (ROOT / "scripts" / "run.sh").read_text(encoding="utf-8")
    assert "export PORT=18789" in startup
    assert "export OPENCLAW_GATEWAY_PORT=18790" in startup
    assert "export SAM_OPENCLAW_GATEWAY_PORT=\"$OPENCLAW_GATEWAY_PORT\"" in startup
    env = os.environ.copy()
    env.pop("SAM_GUIDE_MODEL_API_KEY", None)
    env["HOME"] = str(tmp_path)
    result = subprocess.run(
        ["bash", "scripts/run.sh"], cwd=ROOT, env=env,
        capture_output=True, text=True,
    )
    assert result.returncode == 2
    assert "Missing SAM_GUIDE_MODEL_API_KEY" in result.stderr
