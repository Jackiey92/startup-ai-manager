from pathlib import Path

from app.classifier.semantic_folders import classify
from app.db import connect, init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.facts import FactExtractionService
from app.harness.staging import StagingStore
from app.ports import LocalMemoryProvider
from app.storage import SourceFileStore


def test_r2_pipeline_imports_resource_and_verifies_finance_facts(tmp_path: Path):
    db = tmp_path / "app.db"
    init_db(db)
    objects = tmp_path / "objects"
    stored = SourceFileStore(objects, db).put_bytes(b"finance-pdf", original_name="report.pdf")
    text = "主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元，研发投入0.28亿元"
    StagingStore(db).save_manifest({
        "file_hash": stored.file_hash, "filename": stored.original_name,
        "format": "pdf", "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": [{"text": text, "source_loc": {"locator": "text/0"}}], "tables": []}],
    })
    EntityRosterService(db).declare(company_id="acme", entity_name="主公司有限公司")
    bridge = EntityBridgeService(db).run(company_id="acme", file_hash=stored.file_hash)
    # Empty employee output is the real degraded-model case; deterministic
    # extraction must still produce verified operating facts.
    class EmptyEmployee:
        def run(self, **_):
            return []
    run = FactExtractionService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
        use_worker=True, worker=EmptyEmployee(),
    )
    memory = LocalMemoryProvider(tmp_path / "ov")
    folder = classify(text=text, skills_root=Path(__file__).parents[1] / "skills")
    source_path = objects / stored.storage_path
    memory.add_resource(str(source_path), parent=f"viking://resources/{folder}", wait=True)
    facts = FactExtractionService(db).list_facts(company_id="acme")
    with connect(db) as conn:
        critical = conn.execute("SELECT id FROM todos WHERE reason='critical_review' AND status='open'").fetchall()
    assert memory.query(prefix=f"viking://resources/{folder}")
    assert run["fact_count"] >= 3
    assert {item["attribute"] for item in facts} >= {"营业收入", "净利润", "研发投入"}
    assert not critical
