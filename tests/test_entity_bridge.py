from __future__ import annotations

from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

import pytest

from app.db import connect, init_db
from app.entities.bridge import EntityBridgeService
from app.entities.roster import EntityRosterService
from app.harness.staging import StagingStore
from app.storage import SourceFileStore
from app.facts import FactExtractionService
from tests.entity_employee import FixtureEntityEmployee


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


def test_run_splits_text_and_table_and_classifies_with_coordinates(tmp_path: Path):
    db, stored, _ = _setup(tmp_path)
    blocks = EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="host", file_hash=stored.file_hash)
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
    run = EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="host", file_hash=stored.file_hash)
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
        EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="", file_hash=stored.file_hash)
    with connect(db) as conn:
        assert conn.execute("SELECT COUNT(*) FROM entity_bridge_runs").fetchone()[0] == 0


def test_bridge_requires_employee_or_explicit_compatibility_model(tmp_path: Path):
    db, stored, _ = _setup(tmp_path)
    with pytest.raises(ValueError, match="employee is required"):
        EntityBridgeService(db).run(company_id="host", file_hash=stored.file_hash)


def test_concurrent_attribution_and_fact_writes_commit_parent_before_children(tmp_path: Path):
    """Exercise the same four-worker SQLite path as the parse queue.

    Each employee/file artifact is independent: no child needs a shared
    bridge-run parent, while every row still references its source parent.
    """
    db = tmp_path / "concurrent.db"
    init_db(db)
    EntityRosterService(db).declare(company_id="host", entity_name="主公司有限公司")

    class Employee:
        def attribute_block(self, **_payload):
            return {
                "label": "self", "subject": "主公司有限公司",
                "relation": None, "reason": "fixture employee",
            }

    def process(index: int):
        stored = SourceFileStore(tmp_path / "objects", db).put_bytes(
            f"concurrent-{index}".encode(), original_name=f"{index}.pdf"
        )
        StagingStore(db).save_manifest({
            "file_hash": stored.file_hash, "filename": stored.original_name,
            "format": "pdf", "parse_summary": {"status": "parsed"},
            "pages": [{"page_no": 1, "text_items": [{
                "text": f"主公司有限公司营业收入 {100 + index}", "source_loc": {},
            }], "tables": []}],
        })
        bridge = EntityBridgeService(db, employee=Employee()).run(
            company_id="host", file_hash=stored.file_hash,
        )
        result = FactExtractionService(db).extract(
            company_id="host", file_hash=stored.file_hash,
            bridge_run_id=int(bridge["id"]),
        )
        return stored.file_hash, int(bridge["id"]), int(result["id"])

    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(process, range(4)))

    with connect(db) as conn:
        assert conn.execute("SELECT COUNT(*) FROM entity_bridge_runs").fetchone()[0] == 0
        assert conn.execute("SELECT COUNT(*) FROM entity_bridge_artifacts").fetchone()[0] == 4
        assert conn.execute("SELECT COUNT(*) FROM entity_bridge_blocks").fetchone()[0] == 4
        assert conn.execute("SELECT COUNT(*) FROM fact_runs").fetchone()[0] == 4
        assert conn.execute(
            """SELECT COUNT(*) FROM entity_bridge_blocks b
               JOIN source_files s ON s.file_hash=b.file_hash"""
        ).fetchone()[0] == 4
        assert conn.execute(
            "SELECT COUNT(DISTINCT artifact_id) FROM entity_bridge_blocks"
        ).fetchone()[0] == 4
        assert conn.execute(
            "SELECT COUNT(*) FROM fact_runs WHERE bridge_artifact_id IS NOT NULL"
        ).fetchone()[0] == 4
        assert conn.execute("PRAGMA foreign_key_check").fetchall() == []
    assert len({item[0] for item in results}) == 4


def test_bullet_subject_inheritance_preserves_parent_child_and_stops_at_heading(tmp_path: Path):
    db = tmp_path / "context.db"
    init_db(db)
    stored = SourceFileStore(tmp_path / "objects", db).put_bytes(b"narrative", original_name="财务.pdf")
    items = [
        {"text": "主公司有限公司2024年合并口径：", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.091, 0.1, 0.8, 0.12], "locator": "mineru:page/1/block/0"}},
        {"text": "• 2024年营业收入3.26亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.13, 0.8, 0.15], "locator": "mineru:page/1/block/1"}},
        {"text": "• 2024年净利润0.58亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.16, 0.8, 0.18], "locator": "mineru:page/1/block/2"}},
        {"text": "• 毛利率31.50%", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.19, 0.8, 0.21], "locator": "mineru:page/1/block/3"}},
        {"text": "• 货币资金0.84亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.22, 0.8, 0.24], "locator": "mineru:page/1/block/4"}},
        {"text": "• 应收账款1.12亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.25, 0.8, 0.27], "locator": "mineru:page/1/block/5"}},
        {"text": "• 经营现金流0.36亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.28, 0.8, 0.30], "locator": "mineru:page/1/block/6"}},
        {"text": "全资子公司常州未蓝新能源有限公司（主营电池管理系统及电池材料）2024年单独口径:", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.091, 0.31, 0.8, 0.33], "locator": "mineru:page/1/block/7"}},
        {"text": "• 营业收入0.92亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.34, 0.8, 0.36], "locator": "mineru:page/1/block/8"}},
        {"text": "• 净利润0.07亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.37, 0.8, 0.39], "locator": "mineru:page/1/block/9"}},
        {"text": "• 总资产1.35亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.40, 0.8, 0.42], "locator": "mineru:page/1/block/10"}},
        {"text": "技术与产品", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.091, 0.43, 0.8, 0.45], "locator": "mineru:page/1/block/11"}},
        # This must not inherit the subsidiary context after the new section.
        {"text": "• 营业收入99亿元", "source_loc": {"file_hash": stored.file_hash, "page_no": 1, "bbox": [0.126, 0.46, 0.8, 0.48], "locator": "mineru:page/1/block/12"}},
    ]
    manifest = {
        "file_hash": stored.file_hash, "filename": stored.original_name,
        "format": "pdf", "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": items, "tables": []}],
    }
    StagingStore(db).save_manifest(manifest)
    # Deliberately realistic registration: no generic "公司"/"本公司" alias.
    EntityRosterService(db).declare(company_id="acme", entity_name="主公司有限公司", aliases=("主企",))
    bridge = EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="acme", file_hash=stored.file_hash)
    rows = EntityBridgeService(db).list(company_id="acme", run_id=bridge["id"])
    parent = [row for row in rows if row["content"].startswith("• 2024年营业收入")][0]
    child = [row for row in rows if row["content"].startswith("• 营业收入0.92")][0]
    stopped = [row for row in rows if row["content"].startswith("• 营业收入99")][0]
    assert (parent["classification"], parent["subject"], parent["relation"]) == (
        "self", "主公司有限公司", None
    )
    assert (child["classification"], child["subject"], child["relation"]) == (
        "related", "常州未蓝新能源有限公司", "全资子公司"
    )
    assert stopped["classification"] == "ambiguous"

    result = FactExtractionService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
    )
    facts = FactExtractionService(db).list_facts(company_id="acme")
    values = {(row["entity"], row["attribute"]): row["value"] for row in facts}
    assert result["fact_count"] == 9
    assert values[("主公司有限公司", "营业收入")] == "3.26"
    assert values[("主公司有限公司", "毛利率")] == "31.50"
    assert values[("常州未蓝新能源有限公司", "营业收入")] == "0.92"
    assert values[("常州未蓝新能源有限公司", "总资产")] == "1.35"
    assert FactExtractionService(db).list_todos(company_id="acme") == []


class _FakeModel:
    def __init__(self, result=None, error=None):
        self.result = result
        self.error = error
        self.calls = []

    def classify(self, **payload):
        self.calls.append(payload)
        if self.error:
            raise self.error
        return self.result


def test_use_model_only_classifies_ambiguous_and_records_model_source(tmp_path: Path):
    db, stored, _ = _setup(tmp_path)
    fake = _FakeModel({"label": "foreign", "subject": "远方科技有限公司", "reason": "named entity"})
    run = EntityBridgeService(db, model_client=fake).run(
        company_id="host", file_hash=stored.file_hash, use_model=True
    )
    rows = EntityBridgeService(db).list(company_id="host", run_id=run["id"])
    assert len(fake.calls) == 5
    assert set(fake.calls[0]) == {"text", "company_name", "aliases"}
    modeled = [row for row in rows if row["source"] == "model"]
    assert len(modeled) == 5
    assert all(row["classification"] == "foreign" and row["needs_review"] == 0 for row in modeled)


@pytest.mark.parametrize(
    "result",
    [None, {"label": "bogus", "subject": None, "reason": "bad"},
     {"label": "self", "subject": 3, "reason": "bad"},
     {"label": "self", "subject": "x", "reason": ""}],
)
def test_model_shape_errors_remain_ambiguous_and_reviewable(tmp_path: Path, result):
    db, stored, _ = _setup(tmp_path)
    fake = _FakeModel(result=result, error=RuntimeError("timeout") if result is None else None)
    run = EntityBridgeService(db, model_client=fake).run(
        company_id="host", file_hash=stored.file_hash, use_model=True
    )
    rows = EntityBridgeService(db).list(company_id="host", run_id=run["id"])
    assert any(row["source"] == "model" and row["classification"] == "ambiguous"
               and row["needs_review"] == 1 for row in rows)
    assert all("timeout" not in (row["reason"] or "") for row in rows)


def test_employee_path_owns_entity_attribution_and_preserves_source_blocks(tmp_path: Path):
    db, stored, _ = _setup(tmp_path)

    class Employee:
        def __init__(self):
            self.calls = []

        def attribute_block(self, **payload):
            self.calls.append(payload)
            return {"label": "self", "subject": "员工判定主体", "relation": None, "reason": "semantic"}

    employee = Employee()
    run = EntityBridgeService(db, employee=employee).run(
        company_id="host", file_hash=stored.file_hash, thread_id="employee-session",
    )
    rows = EntityBridgeService(db).list(company_id="host", run_id=run["id"])
    assert employee.calls
    assert all(row["source"] == "employee" for row in rows)
    assert all(row["subject"] == "员工判定主体" for row in rows)
    assert employee.calls[0]["company_id"] == "host"
