from __future__ import annotations

from pathlib import Path

import pytest

from app.db import connect, init_db
from app.entities.bridge import EntityBridgeService, classify_block
from app.entities.roster import EntityRosterService
from app.harness.staging import StagingStore
from app.storage import SourceFileStore


def _manifest(file_hash: str) -> dict:
    return {
        "file_hash": file_hash,
        "filename": "材料.xlsx",
        "format": "xlsx",
        "parse_summary": {"status": "parsed"},
        "pages": [
            {
                "page_no": 2,
                "text_items": [
                    {"text": "本公司营业收入 100", "source_loc": {}},
                    {"text": "本公司子公司远方科技有限公司营业收入 20", "source_loc": {"locator": "text/1"}},
                    {"text": "远方科技有限公司营业收入 30", "source_loc": {"locator": "text/2"}},
                    {"text": "这是一段无法判断归属的说明", "source_loc": {"locator": "text/3"}},
                ],
                "tables": [
                    {
                        "headers": ["指标", "数值"],
                        "rows": [["营业收入", "100"]],
                        "source_loc": {"locator": "docling:table/0"},
                    }
                ],
            }
        ],
    }


def _setup(tmp_path: Path):
    db = tmp_path / "app.db"
    init_db(db)
    stored = SourceFileStore(tmp_path / "objects", db).put_bytes(
        b"bridge", original_name="材料.xlsx"
    )
    StagingStore(db).save_manifest(_manifest(stored.file_hash))
    roster = EntityRosterService(db)
    declared = roster.declare(company_id="host", entity_name="主公司有限公司", aliases=("主公司",))
    return db, stored, declared


def test_classification_prefers_longest_active_roster_name_and_keeps_unknown_ambiguous():
    roster = [
        {"entity_name": "主公司", "aliases": [], "credit_code": None, "stock_code": None,
         "status": "active", "superseded_by": None},
        {"entity_name": "主公司有限公司", "aliases": [], "credit_code": None, "stock_code": None,
         "status": "active", "superseded_by": None},
    ]
    assert classify_block("主公司有限公司营业收入100", roster) == ("self", None, "主公司有限公司")
    assert classify_block("没有公司名称的说明", roster)[0] == "ambiguous"


def test_run_splits_text_and_table_and_classifies_with_coordinates(tmp_path: Path):
    db, stored, _ = _setup(tmp_path)
    blocks = EntityBridgeService(db).run(company_id="host", file_hash=stored.file_hash)
    assert blocks["status"] == "completed"
    service = EntityBridgeService(db)
    rows = service.list(company_id="host", run_id=blocks["id"])
    assert {row["block_type"] for row in rows} == {"text", "table_row"}
    assert rows[0]["classification"] == "ambiguous"
    assert rows[0]["source_page"] == 2
    assert rows[0]["source_span"] == "page=2; locator=missing"
    table = next(row for row in rows if row["block_type"] == "table_row")
    assert table["content"] == "指标 / 数值 => 营业收入 / 100"
    assert table["source_span"] == "page=2; locator=docling:table/0"


def test_related_foreign_and_ambiguous_are_distinct_and_decision_requires_confirm(tmp_path: Path):
    db, stored, _ = _setup(tmp_path)
    run = EntityBridgeService(db).run(company_id="host", file_hash=stored.file_hash)
    service = EntityBridgeService(db)
    rows = service.list(company_id="host", run_id=run["id"])
    related = next(row for row in rows if "子公司" in row["content"])
    foreign = next(row for row in rows if row["content"].startswith("远方科技有限公司"))
    assert (related["classification"], related["relation"], related["subject"]) == (
        "related", "子公司", "远方科技有限公司"
    )
    assert foreign["classification"] == "foreign"
    unknown = [row for row in rows if row["classification"] == "ambiguous"]
    assert unknown and all(row["needs_review"] == 1 for row in unknown)
    with pytest.raises(PermissionError):
        service.decide(company_id="host", block_id=unknown[0]["id"], classification="self")
    decided = service.decide(
        company_id="host", block_id=unknown[0]["id"], classification="self", confirm=True
    )
    assert decided["status"] == "decided"
    assert decided["decision"] == "self"


def test_company_scope_is_required_for_bridge_writes(tmp_path: Path):
    db, stored, _ = _setup(tmp_path)
    with pytest.raises(ValueError):
        EntityBridgeService(db).run(company_id="", file_hash=stored.file_hash)
    with connect(db) as conn:
        assert conn.execute("SELECT COUNT(*) FROM entity_bridge_runs").fetchone()[0] == 0
