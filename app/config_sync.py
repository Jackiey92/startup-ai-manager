"""One-way agent configuration sync from OV into a harness workspace."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .ports import MemoryProvider

CONFIG_ROOT = "viking://user/default/memories/projects/10_startup_ai_manager/agent_config"
CONFIG_FILES = ("SOUL.md", "IDENTITY.md", "AGENTS.md", "USER.md")


def sync_agent_config(memory: MemoryProvider, workspace: Path, *, version: str | None = None) -> dict[str, Any]:
    workspace.mkdir(parents=True, exist_ok=True)
    meta = json.loads(memory.read(CONFIG_ROOT + "/config.meta.json"))
    if version and meta.get("version") != version:
        raise ValueError("agent config version mismatch")
    written = []
    for name in CONFIG_FILES:
        content = memory.read(CONFIG_ROOT + "/" + name)
        (workspace / name).write_text(content, encoding="utf-8")
        written.append(name)
    return {"version": meta.get("version"), "files": written, "direction": "ov_to_harness"}
