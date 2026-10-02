#!/usr/bin/env python3
"""Small 2A-only ``sam`` CLI backed by :mod:`app.source_map`.

The host supplies company scope explicitly.  This CLI is intentionally a
thin shell: it does not implement another storage path and never touches 2B.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.db import init_db
from app.runtime_config import RuntimeConfig
from app.source_map import SourceMapService


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="sam", description="SAM 2A source mapping tools")
    parser.add_argument("--company-id", help="host-injected company scope (required for map/write commands)")
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("read-original", "read-map"):
        command = sub.add_parser(name)
        command.add_argument("file_hash")
    for name in ("replace", "remove"):
        command = sub.add_parser(name)
        command.add_argument("file_hash")
        command.add_argument("target_locator")
        if name == "replace":
            command.add_argument("replacement_text")
        command.add_argument("--confirm", action="store_true", help="confirm an append-only source correction")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    init_db()
    config = RuntimeConfig.from_env(project_root=ROOT)
    service = SourceMapService(config.main_db, objects_path=config.objects_dir)
    try:
        if args.command == "read-original":
            result = service.read_original(file_hash=args.file_hash)
        elif args.command == "read-map":
            if not args.company_id:
                raise ValueError("company_id must be injected by the host")
            result = service.read_map(file_hash=args.file_hash, company_id=args.company_id)
        elif args.command == "replace":
            if not args.company_id:
                raise ValueError("company_id must be injected by the host")
            result = service.replace(file_hash=args.file_hash, company_id=args.company_id,
                                     target_locator=args.target_locator,
                                     replacement_text=args.replacement_text, confirm=args.confirm)
        else:
            if not args.company_id:
                raise ValueError("company_id must be injected by the host")
            result = service.remove(file_hash=args.file_hash, company_id=args.company_id,
                                    target_locator=args.target_locator, confirm=args.confirm)
    except (KeyError, ValueError, PermissionError) as exc:
        print(json.dumps({"error": str(exc)}, ensure_ascii=False), file=sys.stderr)
        return 2
    if isinstance(result, str):
        print(result, end="")
    else:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
