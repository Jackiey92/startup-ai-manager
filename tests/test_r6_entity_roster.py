from pathlib import Path

from app.db import connect, init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.memory.company_facts import L2CompleteFactService
from app.harness.staging import StagingStore
from app.memory.archive.archive_service import add_parsed_resource
from app.classifier.semantic_folders import classify
from app.ports import LocalMemoryProvider
from app.storage import ArchiveFileStore
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


def _narrative_manifest(file_hash: str) -> dict:
    text = "主公司有限公司2024年合并口径营业收入3.26亿元，净利润0.58亿元，毛利率31.50%"
    subsidiary = "全资子公司常州未蓝新能源有限公司营业收入0.92亿元、净利润0.07亿元、总资产1.35亿元"
    return {
        "file_hash": file_hash, "filename": "财务.pdf", "format": "pdf",
        "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": [
            {"text": text, "source_loc": {"locator": "text/0"}},
            {"text": subsidiary, "source_loc": {"locator": "text/1"}},
        ], "tables": []}],
    }


def test_declared_company_api_and_narrative_parent_child_facts(tmp_path: Path, monkeypatch):
    db = tmp_path / "app.db"
    init_db(db)
    import webapp.app as webapp
    monkeypatch.setattr(webapp, "MAIN_DB", str(db))
    client = webapp.app.test_client()

    response = client.post(
        "/api/entity-roster?company_id=acme",
        json={"entity_name": "主公司有限公司", "aliases": ["主公司"]},
    )
    assert response.status_code == 201
    assert response.get_json()["entity"]["origin"] == "declared"
    assert response.get_json()["entity"]["entity_type"] == "self"

    stored = ArchiveFileStore(tmp_path / "objects", db).put_bytes(b"pdf", original_name="财务.pdf")
    StagingStore(db).save_manifest(_narrative_manifest(stored.file_hash))
    bridge = EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="acme", file_hash=stored.file_hash)
    result = L2CompleteFactService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
    )
    facts = L2CompleteFactService(db).list_facts(company_id="acme")
    by_entity_metric = {(row["entity"], row["attribute"]): row["value"] for row in facts}
    assert result["fact_count"] >= 6
    assert by_entity_metric[("主公司有限公司", "营业收入")] == "3.26"
    assert by_entity_metric[("主公司有限公司", "净利润")] == "0.58"
    assert by_entity_metric[("主公司有限公司", "毛利率")] == "31.50"
    assert by_entity_metric[("常州未蓝新能源有限公司", "营业收入")] == "0.92"
    assert by_entity_metric[("常州未蓝新能源有限公司", "净利润")] == "0.07"
    assert by_entity_metric[("常州未蓝新能源有限公司", "总资产")] == "1.35"
    assert L2CompleteFactService(db).list_todos(company_id="acme") == []


def test_upload_rejects_unregistered_company_with_actionable_message(tmp_path: Path, monkeypatch):
    db = tmp_path / "app.db"
    init_db(db)
    import webapp.app as webapp
    monkeypatch.setattr(webapp, "MAIN_DB", db)
    response = webapp.app.test_client().post(
        "/api/upload?company_id=unregistered",
        data={"file": (Path(__file__).open("rb"), "finance.pdf")},
        content_type="multipart/form-data",
    )
    assert response.status_code == 409
    assert response.get_json()["message"] == "请先登记本公司名称"


def test_declared_upload_fixture_reaches_all_four_semantic_folders(tmp_path: Path):
    memory = LocalMemoryProvider(tmp_path / "ov")
    samples = {
        "财务": "年度营业收入3.26亿元净利润0.58亿元",
        "技术与产品": "技术研发产品路线图",
        "客户与市场": "客户市场销售渠道",
        "法务": "合同诉讼合规法务",
    }
    for index, (expected, text) in enumerate(samples.items()):
        manifest = {
            "source_id": f"source-{index}", "filename": f"source-{index}.pdf",
            "format": "pdf", "file_hash": f"{index + 1:064x}",
            "parse_summary": {"status": "parsed", "raw_bytes_external": False, "full_text_external": False},
            "pages": [{"page_no": 1, "text_items": [{"text": text}], "tables": []}],
        }
        folder = classify(text=text, employee=_FolderEmployee(),
                          skills_root=Path(__file__).parents[1] / "skills")
        assert folder == expected
        _result, target = add_parsed_resource(
            memory, manifest, parent=f"viking://resources/{folder}",
            resource_name=f"source-{index}.md",
        )
        memory.put(f"viking://resources/{folder}/overview.md", "概览已就绪")
        memory.put(f"viking://resources/{folder}/abstract.md", "OV_READY")
        assert memory.read(target).startswith("---")
        assert "概览已就绪" in memory.read(f"viking://resources/{folder}/overview.md")
        assert "OV_READY" in memory.read(f"viking://resources/{folder}/abstract.md")
