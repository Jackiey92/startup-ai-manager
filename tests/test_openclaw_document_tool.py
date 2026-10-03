from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path


ROOT = Path(__file__).parents[1]
PLUGIN = ROOT / "harness-openclaw/plugins/sam-memory/index.js"


def _fake_python(path: Path, *, quality_issue: bool = False) -> None:
    quality = '{"ok":false,"issues":[{"code":"mid_word_break","message":"broken"}]}' if quality_issue else '{"ok":true,"issues":[]}'
    manifest = json.dumps({
        "file_hash": "a" * 64, "format": "pdf",
        "pages": [{"page_no": 1, "text_items": [{
            "text": "完整公司有限公司",
            "source_loc": {"file_hash": "a" * 64, "page_no": 1, "bbox": [0, 0, 1, 1], "locator": "fake"},
        }], "tables": []}], "images": [],
        "parse_summary": {"status": "parsed", "warnings": []},
    }, ensure_ascii=False)
    path.write_text(f'''#!/bin/sh
set -eu
if echo "$1" | grep -q 'quality.py'; then
  echo '{quality}'
  exit 0
fi
out=''
while [ "$#" -gt 0 ]; do
  if [ "$1" = '--output' ]; then out="$2"; shift 2; else shift; fi
done
printf '%s\\n' '{manifest}' > "$out"
''', encoding="utf-8")
    path.chmod(0o755)


def _run_tool(tmp_path: Path, *, quality_issue: bool = False) -> dict:
    digest = "a" * 64
    harness = tmp_path / "harness"
    objects = tmp_path / "objects" / "aa"
    objects.mkdir(parents=True)
    (objects / "blob").write_bytes(b"pdf")
    (harness / "inbox").mkdir(parents=True)
    (harness / "outbox").mkdir()
    (harness / "inbox" / f"{digest}.json").write_text(json.dumps({
        "file_hash": digest, "format": "pdf", "source_path": str(objects / "blob"),
    }), encoding="utf-8")
    fake = tmp_path / "fake-python"
    _fake_python(fake, quality_issue=quality_issue)
    script = """
const p = require(process.argv[1]);
p._private.documentIngestCall({file_hash: process.env.TEST_HASH, format: 'pdf'})
  .then(result => { process.stdout.write(JSON.stringify(result.details)); })
  .catch(error => { process.stderr.write(String(error)); process.exit(2); });
"""
    env = os.environ.copy()
    env.update({
        "SAM_HARNESS_ROOT": str(harness), "SAM_PROJECT_ROOT": str(ROOT),
        "SAM_OBJECTS_DIR": str(tmp_path / "objects"), "SAM_SKILL_ROOT": str(ROOT / "skills"),
        "SAM_TOOL_BRIDGE_PYTHON": str(fake), "SAM_INGEST_ENGINE": "auto", "TEST_HASH": digest,
    })
    result = subprocess.run(["node", "-e", script, str(PLUGIN)], env=env,
                            capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


def test_registered_document_tool_executes_confined_bridge_and_quality(tmp_path: Path) -> None:
    details = _run_tool(tmp_path)
    assert details["status"] == "parsed"
    manifest = json.loads((tmp_path / "harness/outbox" / ("a" * 64 + ".json")).read_text())
    assert manifest["pages"][0]["text_items"][0]["source_loc"]["locator"] == "fake"


def test_registered_document_tool_marks_quality_failure_instead_of_accepting_it(tmp_path: Path) -> None:
    details = _run_tool(tmp_path, quality_issue=True)
    assert details["status"] == "parse_failed"
    assert details["quality_issues"]
