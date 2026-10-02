from __future__ import annotations

import json
from pathlib import Path

import pytest

from app.db import connect, init_db
from app.harness.staging import StagingStore
from app.source_map import SourceMapService
from app.storage import SourceFileStore


def _manifest(file_hash: str) -> dict:
    return {
        "source_id": file_hash[:12], "filename": "报告.pdf", "format": "pdf",
        "file_hash": file_hash, "pages": [{"page_no": 2, "text_items": [
            {"text": "原始段落", "source_loc": {"page": 2, "locator": "p2:0-4"}},
            {"text": "无坐标段落", "source_loc": {}},
        ], "tables": []}],
        "parse_summary": {"status": "parsed", "raw_bytes_external": False, "full_text_external": False},
    }


def _service(tmp_path: Path):
    db = tmp_path / "app.db"
    objects = tmp_path / "objects"
    init_db(db)
    store = SourceFileStore(objects, db)
    data = b"immutable original"
    stored = store.put_bytes(data, original_name="报告.pdf", mime_type="application/pdf")
    StagingStore(db).save_manifest(_manifest(stored.file_hash))
    return SourceMapService(db, objects), stored, data, db


def test_mapping_is_standard_markdown_and_preserves_coordinates(tmp_path: Path):
    service, stored, _, _ = _service(tmp_path)
    mapping = service.read_map(file_hash=stored.file_hash, company_id="acme")
    assert mapping.startswith("---\n")
    assert "document_type: \"2a_source_mapping\"" in mapping
    assert "source: page=2; locator=p2:0-4" in mapping
    assert "source: page=2; locator=missing" in mapping
    assert "不是事实认定" in mapping


def test_replace_requires_confirm_and_is_append_only(tmp_path: Path):
    service, stored, original, db = _service(tmp_path)
    with pytest.raises(PermissionError):
        service.replace(file_hash=stored.file_hash, company_id="acme",
                        target_locator="page=2; locator=p2:0-4", replacement_text="修订")
    row = service.replace(file_hash=stored.file_hash, company_id="acme",
                         target_locator="page=2; locator=p2:0-4", replacement_text="修订", confirm=True)
    assert row["status"] == "active"
    assert "修订" in service.read_map(file_hash=stored.file_hash, company_id="acme")
    assert SourceFileStore(service.objects_path, db).get_bytes(stored.file_hash) == original
    with connect(db) as conn:
        assert conn.execute("SELECT COUNT(*) FROM source_edits").fetchone()[0] == 1


def test_remove_and_second_correction_supersede_only_same_coordinate(tmp_path: Path):
    service, stored, _, db = _service(tmp_path)
    first = service.replace(file_hash=stored.file_hash, company_id="acme",
                            target_locator="page=2; locator=p2:0-4", replacement_text="一", confirm=True)
    second = service.remove(file_hash=stored.file_hash, company_id="acme",
                            target_locator="page=2; locator=p2:0-4", confirm=True)
    mapping = service.read_map(file_hash=stored.file_hash, company_id="acme")
    assert "已移除原文片段" in mapping
    with connect(db) as conn:
        rows = conn.execute("SELECT status,supersedes_id FROM source_edits ORDER BY id").fetchall()
    assert [(row["status"], row["supersedes_id"]) for row in rows] == [("superseded", None), ("active", first["id"])]


def test_company_scope_is_required_by_cli_write_surface(tmp_path: Path):
    service, stored, _, _ = _service(tmp_path)
    with pytest.raises(ValueError):
        service.replace(file_hash=stored.file_hash, company_id="", target_locator="x", replacement_text="y", confirm=True)
