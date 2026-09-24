"""OpenClaw skill bridge: run the project Excel parser on one task file.

Invoked by the parse-xlsx OpenClaw skill. Reads an inbox task JSON, parses the
named source via the existing app parser, and writes a ParseResult JSON to
outbox/. Output is confined to outbox (staging-only).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

HARNESS_ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = HARNESS_ROOT.parent

sys.path.insert(0, str(PROJECT_ROOT))

from app.storage import SourceFileStore  # noqa: E402
from app.parsing.xlsx_parser import XlsxParser  # noqa: E402


def main(task_json: str) -> int:
    task = json.loads(Path(task_json).read_text(encoding="utf-8"))
    file_hash = task["file_hash"]

    store = SourceFileStore(objects_path=PROJECT_ROOT / "data" / "objects")
    parser = XlsxParser(store)
    result = parser.parse(file_hash)

    outbox = HARNESS_ROOT / "outbox"
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
