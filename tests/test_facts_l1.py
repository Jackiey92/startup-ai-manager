from __future__ import annotations

from pathlib import Path

import pytest

from app.db import connect, init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.facts import FactExtractionService
from app.harness.staging import StagingStore
from app.storage import SourceFileStore


def _manifest(file_hash: str, text: list[str]) -> dict:
    return {
        "file_hash": file_hash,
        "filename": "年报2025.xlsx",
        "format": "xlsx",
        "parse_summary": {"status": "parsed"},
        "pages": [{
            "page_no": 1,
            "text_items": [
                {"text": value, "source_loc": {"locator": f"text/{index}"}}
                for index, value in enumerate(text)
            ],
            "tables": [],
        }],
    }


def _pipeline(tmp_path: Path, text: list[str], name="年报2025.xlsx"):
    db = tmp_path / "app.db"
    init_db(db)
    store = SourceFileStore(tmp_path / "objects", db)
    stored = store.put_bytes(b"file-" + str(len(text)).encode(), original_name=name)
    manifest = _manifest(stored.file_hash, text)
    StagingStore(db).save_manifest(manifest)
    EntityRosterService(db).declare(company_id="acme", entity_name="主公司有限公司")
    bridge = EntityBridgeService(db).run(company_id="acme", file_hash=stored.file_hash)
    return db, stored, bridge


def test_l1_reads_only_self_blocks_and_preserves_literal_digits(tmp_path: Path):
    db, stored, bridge = _pipeline(tmp_path, [
        "主公司有限公司营业收入 98,765.43",
        "远方科技有限公司营业收入 12345.67",
        "营业收入较上年同期增长15.30%",
    ])
    service = FactExtractionService(db)
    run = service.extract(company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"])
    facts = service.list_facts(company_id="acme")
    assert run["candidate_count"] == 1
    assert [(fact["attribute"], fact["value"]) for fact in facts] == [("营业收入", "98,765.43")]
    assert service.list_todos(company_id="acme") == []


def test_critical_first_occurrence_is_todo_and_decide_requires_confirm(tmp_path: Path):
    db, stored, bridge = _pipeline(tmp_path, ["主公司有限公司注册资本 5000000"])
    service = FactExtractionService(db)
    run = service.extract(company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"])
    assert run["fact_count"] == 0 and run["todo_count"] == 1
    todo = service.list_todos(company_id="acme")[0]
    assert todo["reason"] == "critical_review" and todo["suggestion"]
    with pytest.raises(PermissionError):
        service.decide(company_id="acme", todo_id=todo["id"], choose="candidate")


def test_l1_is_idempotent_and_tracks_fact_run_counts(tmp_path: Path):
    db, stored, bridge = _pipeline(tmp_path, ["主公司有限公司净利润 1200"])
    service = FactExtractionService(db)
    first = service.extract(company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"])
    second = service.extract(company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"])
    assert first["fact_count"] == 1
    assert second["fact_count"] == 0
    assert len(service.list_facts(company_id="acme")) == 1
    with connect(db) as conn:
        assert conn.execute("SELECT COUNT(*) FROM fact_runs").fetchone()[0] == 2


def test_fact_extraction_requires_host_company_scope(tmp_path: Path):
    db, stored, bridge = _pipeline(tmp_path, ["主公司有限公司营业收入 10"])
    with pytest.raises(ValueError):
        FactExtractionService(db).extract(company_id="", file_hash=stored.file_hash, bridge_run_id=bridge["id"])
