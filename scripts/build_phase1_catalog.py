#!/usr/bin/env python3
"""Generate Phase 1's reviewable skill and tool registration artifacts.

This is a read-only scanner with explicit JSON outputs.  It does not install
skills, mutate OpenClaw config, or enable tool_search.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from app.contracts.phase1 import build_skill_catalog, build_tool_manifest


def _write(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    root = args.root.resolve()
    skills = build_skill_catalog(root / "skills")
    tools = build_tool_manifest(root / "harness-openclaw" / "plugins")
    _write(root / "harness-openclaw" / "skill-registry" / "catalog.json", skills)
    _write(root / "harness-openclaw" / "tool-registry" / "manifest.json", tools)
    _write(root / "harness-openclaw" / "skill-registry" / "rejected.json", skills["rejected"])
    _write(root / "harness-openclaw" / "tool-registry" / "rejected.json", tools["rejected"])
    print(json.dumps({
        "skills": len(skills["skills"]),
        "rejected_skills": len(skills["rejected"]),
        "tools": len(tools["tools"]),
        "rejected_tools": len(tools["rejected"]),
    }, ensure_ascii=False, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
