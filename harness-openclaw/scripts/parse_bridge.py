"""OpenClaw skill bridge: run the project Excel parser on one task file.

Invoked by the parse-xlsx OpenClaw skill. Reads an inbox task JSON, parses the
named source via the existing app parser, and writes a ParseResult JSON to
outbox/. Output is confined to outbox (staging-only).
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

PROJECT_ROOT = Path(os.environ.get("SAM_PROJECT_ROOT", Path(__file__).resolve().parents[2])).resolve()

sys.path.insert(0, str(PROJECT_ROOT))

from app.storage import SourceFileStore  # noqa: E402
from app.parsing.xlsx_parser import XlsxParser  # noqa: E402
from app.runtime_config import RuntimeConfig  # noqa: E402


def main(task_json: str) -> int:
    config = RuntimeConfig.from_env()
    task = json.loads(Path(task_json).read_text(encoding="utf-8"))
    file_hash = task["file_hash"]

    store = SourceFileStore(objects_path=config.objects_dir, db_path=config.main_db)
    parser = XlsxParser(store)
    result = parser.parse(file_hash)

    outbox = config.harness_root / "outbox"
    outbox.mkdir(parents=True, exist_ok=True)
    out_path = outbox / f"{file_hash}.json"
    out_path.write_text(
        json.dumps(result.to_dict(), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(out_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1]))
