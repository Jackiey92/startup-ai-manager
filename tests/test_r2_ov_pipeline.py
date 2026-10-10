from pathlib import Path

from app.classifier.semantic_folders import classify
from app.db import connect, init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.memory.company_facts import L2CompleteFactService
from app.harness.staging import StagingStore
from app.ports import LocalMemoryProvider
from app.memory.archive.archive_service import ArchiveFileStore, SourceMapService
from tests.entity_employee import FixtureEntityEmployee


class _FolderEmployee:
    def classify_document(self, *, text: str, **_):
        if "利润" in text or "收入" in text or "现金流" in text:
            return {"folder": "财务"}
        if "技术" in text or "产品" in text or "研发" in text:
            return {"folder": "技术与产品"}
        if "客户" in text or "市场" in text or "销售" in text:
            return {"folder": "客户与市场"}
        return {"folder": "法务"}


def test_r2_pipeline_imports_resource_and_verifies_finance_facts(tmp_path: Path):
    db = tmp_path / "app.db"
    init_db(db)
    objects = tmp_path / "data" / "2a" / "bin"
    stored = ArchiveFileStore(objects, db).put_bytes(b"%PDF-raw-finance", original_name="report.pdf")
    text = "主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元，研发投入0.28亿元"
    StagingStore(db, maps_path=objects.parent / "map").save_manifest({
        "file_hash": stored.file_hash, "filename": stored.original_name,
        "format": "pdf", "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": [{"text": text, "source_loc": {"locator": "text/0"}}], "tables": []}],
    })
    EntityRosterService(db).declare(company_id="acme", entity_name="主公司有限公司")
    bridge = EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="acme", file_hash=stored.file_hash)
    # Empty employee output is an unresolved manager handoff; no code-side
    # extractor is allowed to guess facts when the employee has no conclusion.
    class EmptyEmployee:
        def run(self, **_):
            return []
    run = L2CompleteFactService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
        use_worker=True, worker=EmptyEmployee(),
    )
    memory = LocalMemoryProvider(tmp_path / "ov")
    folder = classify(text=text, employee=_FolderEmployee(), skills_root=Path(__file__).parents[1] / "skills")
    assert folder == "财务"
    source_path = objects / stored.storage_path
    assert source_path == objects / stored.file_hash[:2] / stored.file_hash
    assert source_path.read_bytes() == b"%PDF-raw-finance"
    maps = SourceMapService(db, objects)
    assert maps.map_path(stored.file_hash).read_text(encoding="utf-8") == maps.read_map(
        file_hash=stored.file_hash, company_id="acme",
    )
    assert text in maps.read_map(file_hash=stored.file_hash, company_id="acme")
    assert memory.query(prefix="viking://") == []
    assert not any(path.name == "2a_extraction" for path in memory.root.rglob("*"))
    assert not any(path.name == f"{stored.file_hash}.md" for path in memory.root.rglob("*"))
    facts = L2CompleteFactService(db).list_facts(company_id="acme")
    with connect(db) as conn:
        critical = conn.execute("SELECT id FROM todos WHERE reason='critical_review' AND status='open'").fetchall()
    assert run["fact_count"] == 0
    assert run["unresolved"]
    assert facts == []
    assert not critical
