#!/usr/bin/env python3
"""Prepare OpenClaw state discovery for a clean SAM startup.

This is intentionally side-effect limited: it writes the generated config
and mounts first-party skills/plugins, but does not launch a daemon.  Gateway
is owned by the long-lived Flask process and is started once on its first
agent call when gateway mode is enabled.
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.harness.runtime.openclaw_adapter import OpenClawAdapter
from app.harness.staging import StagingStore
from app.runtime_config import RuntimeConfig


def main() -> int:
    root = ROOT
    config = RuntimeConfig.from_env(project_root=root)
    adapter = OpenClawAdapter(
        StagingStore(db_path=config.main_db), config=config,
        db_path=config.main_db, objects_dir=config.objects_dir,
    )
    adapter.prepare_runtime()
    print(f"openclaw_runtime_prepared state={config.state_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
