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
from app.entities import EntityBridgeService, EntityRosterService
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
    roster = sub.add_parser("roster", help="2.0 deterministic entity roster")
    roster.add_argument("--company-id", dest="roster_company_id", help="host-injected company scope")
    roster_sub = roster.add_subparsers(dest="roster_command", required=True)
    list_command = roster_sub.add_parser("list")
    list_command.add_argument("--status", choices=("suggested", "active", "rejected"))
    suggest_command = roster_sub.add_parser("suggest")
    suggest_command.add_argument("file_hash")
    for name in ("confirm", "reject"):
        transition = roster_sub.add_parser(name)
        transition.add_argument("roster_id", type=int)
        transition.add_argument("--confirm", action="store_true", help="confirm the review action")
    declare = roster_sub.add_parser("declare")
    declare.add_argument("--company-id", dest="declare_company_id", required=True, help="host-injected company scope")
    declare.add_argument("--name", required=True)
    declare.add_argument("--aliases", default="", help="comma-separated aliases")
    bridge = sub.add_parser("bridge", help="2.1.a deterministic entity attribution")
    bridge.add_argument("--company-id", dest="bridge_company_id", help="host-injected company scope")
    bridge_sub = bridge.add_subparsers(dest="bridge_command", required=True)
    run_bridge = bridge_sub.add_parser("run")
    run_bridge.add_argument("file_hash")
    run_bridge.add_argument("--use-model", action="store_true", help="classify only deterministic ambiguous blocks")
    list_bridge = bridge_sub.add_parser("list")
    list_bridge.add_argument("--run-id", type=int)
    ambiguous_bridge = bridge_sub.add_parser("ambiguous")
    ambiguous_bridge.add_argument("--run-id", type=int)
    decide_bridge = bridge_sub.add_parser("decide")
    decide_bridge.add_argument("block_id", type=int)
    decide_bridge.add_argument("classification", choices=("self", "related", "foreign"))
    decide_bridge.add_argument("--confirm", action="store_true", help="confirm the review decision")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    init_db()
    config = RuntimeConfig.from_env(project_root=ROOT)
    service = SourceMapService(config.main_db, objects_path=config.objects_dir)
    try:
        if args.command == "roster":
            company_id = (getattr(args, "declare_company_id", None)
                          or getattr(args, "roster_company_id", None)
                          or args.company_id)
            if not company_id:
                raise ValueError("company_id must be injected by the host")
            roster_service = EntityRosterService(config.main_db)
            if args.roster_command == "list":
                result = roster_service.list(company_id=company_id, status=args.status)
            elif args.roster_command == "suggest":
                result = roster_service.suggest(company_id=company_id, file_hash=args.file_hash)
            elif args.roster_command == "confirm":
                result = roster_service.confirm(company_id=company_id, roster_id=args.roster_id, confirm=args.confirm)
            elif args.roster_command == "reject":
                result = roster_service.reject(company_id=company_id, roster_id=args.roster_id, confirm=args.confirm)
            else:
                result = roster_service.declare(company_id=company_id, entity_name=args.name,
                                                aliases=args.aliases.split(","))
        elif args.command == "bridge":
            company_id = getattr(args, "bridge_company_id", None) or args.company_id
            if not company_id:
                raise ValueError("company_id must be injected by the host")
            bridge_service = EntityBridgeService(config.main_db)
            if args.bridge_command == "run":
                result = bridge_service.run(company_id=company_id, file_hash=args.file_hash, use_model=args.use_model)
            elif args.bridge_command == "list":
                result = bridge_service.list(company_id=company_id, run_id=args.run_id)
            elif args.bridge_command == "ambiguous":
                result = bridge_service.ambiguous(company_id=company_id, run_id=args.run_id)
            else:
                result = bridge_service.decide(company_id=company_id, block_id=args.block_id,
                                               classification=args.classification, confirm=args.confirm)
        elif args.command == "read-original":
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
