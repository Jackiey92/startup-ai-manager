from __future__ import annotations

import json
from pathlib import Path

import pytest

from app.db import connect, init_db
from app.entities.roster import EntityRosterService, extract_roster_candidate
from app.harness.staging import StagingStore
from app.storage import SourceFileStore


def _manifest(file_hash: str, *, prose: bool = False) -> dict:
    return {
        "source_id": "registration-1", "filename": "注册信息.xlsx", "format": "xlsx",
        "file_hash": file_hash,
        "pages": [{"page_no": 1, "text_items": [{
            "text": "本公司是一家成长中的企业，名称仅供参考。" if prose else "",
            "source_loc": {"page_no": 1, "locator": "text/0"},
        }], "tables": [{
            "headers": ["公司名称", "统一社会信用代码", "企业类型", "股票代码"],
            "rows": [["杭州示例科技有限公司", "91330000123456789X", "有限责任公司", "688001"]],
            "source_loc": {"page_no": 1, "locator": "docling:table/0@#/tables/0"},
        }]}],
        "parse_summary": {"status": "parsed"},
    }


def _service(tmp_path: Path):
    db, objects = tmp_path / "app.db", tmp_path / "objects"
    init_db(db)
    store = SourceFileStore(objects, db)
    stored = store.put_bytes(b"registration", original_name="注册信息.xlsx")
    StagingStore(db).save_manifest(_manifest(stored.file_hash))
    return EntityRosterService(db), stored, db


def test_extracts_structured_roster_with_coordinates_and_no_prose_guess():
    candidate = extract_roster_candidate(_manifest("a" * 64, prose=True), company_id="acme")
    assert candidate is not None
    assert candidate.entity_name == "杭州示例科技有限公司"
    assert candidate.credit_code == "91330000123456789X"
    assert candidate.source_file == "a" * 64
    assert candidate.source_page == 1
    assert "docling:table/0" in (candidate.source_span or "")


def test_empty_structured_cover_does_not_guess_name_from_prose():
    manifest = _manifest("a" * 64, prose=True)
    manifest["pages"][0]["tables"] = []
    assert extract_roster_candidate(manifest, company_id="acme") is None


def test_suggest_is_idempotent_and_review_transitions_are_append_only(tmp_path: Path):
    service, stored, db = _service(tmp_path)
    first = service.suggest(company_id="acme", file_hash=stored.file_hash)
    second = service.suggest(company_id="acme", file_hash=stored.file_hash)
    assert first["id"] == second["id"]
    with pytest.raises(PermissionError):
        service.confirm(company_id="acme", roster_id=first["id"])
    active = service.confirm(company_id="acme", roster_id=first["id"], confirm=True)
    assert active["status"] == "active"
    rows = service.list(company_id="acme")
    assert len(rows) == 1 and rows[0]["status"] == "active"
    with connect(db) as conn:
        history = conn.execute("SELECT status,superseded_by FROM entity_roster ORDER BY id").fetchall()
    assert [(row["status"], row["superseded_by"]) for row in history] == [("suggested", active["id"]), ("active", None)]


def test_reject_is_confirmed_and_company_scope_is_required(tmp_path: Path):
    service, stored, _ = _service(tmp_path)
    suggested = service.suggest(company_id="acme", file_hash=stored.file_hash)
    with pytest.raises(ValueError):
        service.reject(company_id="", roster_id=suggested["id"], confirm=True)
    rejected = service.reject(company_id="acme", roster_id=suggested["id"], confirm=True)
    assert rejected["status"] == "rejected"
    assert service.list(company_id="other") == []


def test_declared_self_is_active_and_has_matching_priority(tmp_path: Path):
    service, stored, db = _service(tmp_path)
    extracted = service.suggest(company_id="acme", file_hash=stored.file_hash)
    declared = service.declare(company_id="acme", entity_name="杭州示例科技有限公司", aliases=("Example", "示例科技"))
    assert extracted["origin"] == "extracted" and extracted["status"] == "suggested"
    assert declared["origin"] == "declared" and declared["status"] == "active"
    assert service.match_name(company_id="acme", name="Example")["id"] == declared["id"]
    assert service.match_name(company_id="acme", name="杭州示例科技有限公司")["id"] == declared["id"]
    # A repeated cover name does not create another self suggestion.
    repeated = service.suggest(company_id="acme", file_hash=stored.file_hash)
    assert repeated["id"] == declared["id"]
    with connect(db) as conn:
        assert conn.execute("SELECT COUNT(*) FROM entity_roster WHERE origin='declared'").fetchone()[0] == 1
