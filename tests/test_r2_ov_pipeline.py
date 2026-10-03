from pathlib import Path

from app.classifier.semantic_folders import classify
from app.db import connect, init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.facts import FactExtractionService
from app.harness.staging import StagingStore
from app.memory import add_parsed_resource
from app.ports import LocalMemoryProvider
from app.storage import SourceFileStore


class TextOnlyOV(LocalMemoryProvider):
    """Fixture matching local OV: PDF bytes have no generated overview."""
    def add_resource(self, path: str, *, parent: str, wait: bool = True) -> None:
        source = Path(path)
        super().add_resource(path, parent=parent, wait=wait)
        if source.suffix == ".md":
            self.put(parent.rstrip("/") + "/overview.md", "概览已就绪：" + source.read_text(encoding="utf-8")[:80])
            self.put(parent.rstrip("/") + "/abstract.md", "盖戳：OV_READY")

    def add_resource_to(self, path: str, target_uri: str, *, wait: bool = True,
                        timeout: int = 600) -> None:
        source = Path(path)
        super().add_resource_to(path, target_uri, wait=wait, timeout=timeout)
        if source.suffix == ".md":
            parent = target_uri.rsplit("/", 1)[0]
            self.put(parent + "/overview.md", "概览已就绪：" + source.read_text(encoding="utf-8")[:80])
            self.put(parent + "/abstract.md", "盖戳：OV_READY")


def test_add_parsed_resource_sends_markdown_not_pdf_bytes():
    calls = []

    class Capture:
        def ensure_directory(self, uri):
            calls.append(("mkdir", uri))

        def add_resource_to(self, path, target_uri, *, wait, timeout):
            calls.append((Path(path).suffix, Path(path).read_text(encoding="utf-8"), target_uri, wait, timeout))

    _result, target = add_parsed_resource(Capture(), {
        "source_id": "report", "filename": "report.pdf", "format": "pdf",
        "file_hash": "a" * 64, "parse_summary": {"raw_bytes_external": False, "full_text_external": False},
        "pages": [{"page_no": 1, "text_items": [{"text": "财务收入 3.26亿元"}], "tables": []}],
    }, parent="viking://resources/财务")
    assert calls[0] == ("mkdir", "viking://resources/财务")
    assert calls[1][0] == ".md" and not calls[1][1].startswith("%PDF")
    assert "财务收入" in calls[1][1] and calls[1][2] == "viking://resources/财务/report.md"
    assert calls[1][3] is True
    assert target == "viking://resources/财务/report.md"


def test_r2_pipeline_imports_resource_and_verifies_finance_facts(tmp_path: Path):
    db = tmp_path / "app.db"
    init_db(db)
    objects = tmp_path / "objects"
    stored = SourceFileStore(objects, db).put_bytes(b"%PDF-raw-finance", original_name="report.pdf")
    text = "主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元，研发投入0.28亿元"
    StagingStore(db).save_manifest({
        "file_hash": stored.file_hash, "filename": stored.original_name,
        "format": "pdf", "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": [{"text": text, "source_loc": {"locator": "text/0"}}], "tables": []}],
    })
    EntityRosterService(db).declare(company_id="acme", entity_name="主公司有限公司")
    bridge = EntityBridgeService(db).run(company_id="acme", file_hash=stored.file_hash)
    # Empty employee output is an unresolved manager handoff; no code-side
    # extractor is allowed to guess facts when the employee has no conclusion.
    class EmptyEmployee:
        def run(self, **_):
            return []
    run = FactExtractionService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
        use_worker=True, worker=EmptyEmployee(),
    )
    memory = TextOnlyOV(tmp_path / "ov")
    folder = classify(text=text, skills_root=Path(__file__).parents[1] / "skills")
    # The original PDF is deliberately not sent to OV: raw bytes yield no
    # overview.  The parsed markdown is the only resource input.
    source_path = objects / stored.storage_path
    raw = tmp_path / "raw.pdf"
    raw.write_bytes(source_path.read_bytes())
    raw_ov = TextOnlyOV(tmp_path / "raw-ov")
    raw_ov.add_resource(str(raw), parent=f"viking://resources/{folder}", wait=True)
    assert raw_ov.query(prefix=f"viking://resources/{folder}/overview.md") == []
    parsed = tmp_path / "parsed.md"
    parsed.write_text("第1页\n\n" + text, encoding="utf-8")
    memory.add_resource(str(parsed), parent=f"viking://resources/{folder}", wait=True)
    facts = FactExtractionService(db).list_facts(company_id="acme")
    with connect(db) as conn:
        critical = conn.execute("SELECT id FROM todos WHERE reason='critical_review' AND status='open'").fetchall()
    assert memory.query(prefix=f"viking://resources/{folder}")
    assert memory.read(f"viking://resources/{folder}/parsed.md").startswith("第1页")
    assert "概览已就绪" in memory.read(f"viking://resources/{folder}/overview.md")
    assert "OV_READY" in memory.read(f"viking://resources/{folder}/abstract.md")
    assert run["fact_count"] == 0
    assert run["unresolved"]
    assert facts == []
    assert not critical
