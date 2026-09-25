from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
BRIDGE = ROOT / "skills" / "document-ingest" / "scripts" / "bridge"


def test_bridge_contract_without_engine(tmp_path: Path) -> None:
    source = tmp_path / "sample.xlsx"
    source.write_bytes(b"contract-only-fixture")
    task = tmp_path / "task.json"
    task.write_text(json.dumps({"source_path": str(source), "uploaded_at": "2026-09-25T00:00:00Z"}), encoding="utf-8")
    env = dict(os.environ)
    # Force the not-yet-enabled Docling adapter so the contract test remains
    # deterministic even when MinerU is installed in the developer venv.
    env["SAM_INGEST_ENGINE"] = "docling"
    output = subprocess.check_output([sys.executable, str(BRIDGE), str(task)], text=True, env=env)
    result = json.loads(output)
    assert result["format"] == "xlsx"
    assert result["size_bytes"] == len(b"contract-only-fixture")
    assert len(result["file_hash"]) == 64
    assert result["pages"] == []
    assert result["parse_summary"]["raw_bytes_external"] is False
    assert result["parse_summary"]["full_text_external"] is False
    assert result["parse_summary"]["status"] in {"engine_unavailable", "adapter_pending", "parse_failed"}


def test_bridge_rejects_unknown_engine(tmp_path: Path) -> None:
    source = tmp_path / "sample.pdf"
    source.write_bytes(b"fixture")
    task = tmp_path / "task.json"
    task.write_text(json.dumps({"source_path": str(source)}), encoding="utf-8")
    env = dict(os.environ, SAM_INGEST_ENGINE="unknown")
    process = subprocess.run([sys.executable, str(BRIDGE), str(task)], text=True, capture_output=True, env=env)
    assert process.returncode != 0
    assert "SAM_INGEST_ENGINE" in process.stderr
