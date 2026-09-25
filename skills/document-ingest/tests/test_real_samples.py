"""Opt-in local acceptance test for real files.

The test is skipped by default so CI never depends on a user's mounted
documents or a running local MinerU server. Set the four
``SAM_REAL_SAMPLE_*`` variables to run it against local copies.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator


ROOT = Path(__file__).resolve().parents[3]
BRIDGE = ROOT / "skills/document-ingest/scripts/bridge"
SCHEMA = json.loads((ROOT / "skills/document-ingest/schemas/l2-manifest.schema.json").read_text())


SAMPLES = {
    "pdf": os.environ.get("SAM_REAL_SAMPLE_PDF"),
    "xlsx": os.environ.get("SAM_REAL_SAMPLE_XLSX"),
    "docx": os.environ.get("SAM_REAL_SAMPLE_DOCX"),
    "pptx": os.environ.get("SAM_REAL_SAMPLE_PPTX"),
}


@pytest.mark.parametrize("fmt,raw_path", [(key, value) for key, value in SAMPLES.items() if value])
def test_real_sample_l2_contract(fmt: str, raw_path: str) -> None:
    source = Path(raw_path)
    if not source.is_file():
        pytest.skip(f"real sample is not available: {source}")
    task = {"source_path": str(source), "format": fmt, "uploaded_at": "2026-09-25T00:00:00Z"}
    env = dict(os.environ)
    env.setdefault("SAM_INGEST_ENGINE", "mineru")
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as stream:
        json.dump(task, stream)
        task_path = stream.name
    try:
        output = subprocess.check_output(
            [sys.executable, str(BRIDGE), task_path], text=True, env=env
        )
    finally:
        Path(task_path).unlink(missing_ok=True)
    result = json.loads(output)
    errors = sorted(Draft202012Validator(SCHEMA).iter_errors(result), key=lambda error: error.path)
    assert not errors, errors[0].message if errors else ""
    assert result["format"] == fmt
    assert result["file_hash"]
    assert result["parse_summary"]["raw_bytes_external"] is False
    assert result["parse_summary"]["full_text_external"] is False
