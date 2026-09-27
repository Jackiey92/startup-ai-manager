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
    assert "sam-guide" in config["agents"]["entries"]
    assert "list" not in config["agents"]
    assert set(config["agents"]["entries"]["sam-guide"]["tools"]["allow"]) == {
        "sam_memory_read",
        "sam_memory_search",
        "sam_file_get",
        "sam_memory_map",
        "sam_conversation_read",
        "sam_thread_list",
        "sam_thread_open",
    }
    assert "sam_promote" not in config["tools"]["allow"]
