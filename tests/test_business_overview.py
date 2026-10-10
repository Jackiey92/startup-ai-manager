from __future__ import annotations

from pathlib import Path

from app.business_overview import BusinessOverviewService, TRL_STAGE_MAP, extract_business_overview
from app.db.database import init_db
from app.classifier import ClassificationService
from app.harness.staging import StagingStore
from app.storage import ArchiveFileStore


def _manifest(*, name: str = "业务资料.xlsx", text: list[str] | None = None,
              rows: list[list[object]] | None = None) -> dict:
    return {
        "file_hash": "f" * 64,
        "original_name": name,
        "format": "excel",
        "parse_summary": {"status": "parsed"},
        "pages": [{
            "page_no": 3,
            "text_items": [{"text": value, "source_loc": {
                "locator": f"#/text/{index}",
            }} for index, value in enumerate(text or [])],
            "tables": [{
                "headers": ["产品", "阶段", "TRL", "目标客户", "状态"],
                "rows": rows or [],
                "source_loc": {"locator": "#/tables/0"},
            }] if rows is not None else [],
        }],
    }


def test_business_overview_extracts_all_fields_from_content_with_evidence() -> None:
    result = extract_business_overview(_manifest(
        text=["公司定位为工业材料供应商", "商业模式：产品直销", "发明专利 3 项，软件著作权 2 项", "最高成熟度 TRL 7"],
        rows=[["产品甲", "中试", 5, "工业客户", "验证中"]],
    ))
    assert result["positioning"]["value"] == "工业材料供应商"
    assert "产品甲" in result["summary"]["value"]
    assert "工业客户" in result["summary"]["value"]
    assert "产品直销" in result["summary"]["value"]
    assert result["summary"]["sources"]
    assert result["product_line_count"] == 1
    assert result["max_trl"]["value"] == 7
    assert result["max_trl"]["stage"] == TRL_STAGE_MAP[7]
    assert result["invention_patent_count"]["value"] == 3
    assert result["software_copyright_count"]["value"] == 2
    assert result["business_model"]["value"] == "产品直销"
    product = result["products"][0]
    assert product["product"]["value"] == "产品甲"
    assert product["product"]["source_file"] == "业务资料.xlsx"
    assert product["product"]["source_page"] == 3
    assert "row=1" in product["product"]["source_locator"]


def test_business_overview_leaves_partial_evidence_blank() -> None:
    result = extract_business_overview(_manifest(
        text=["商业模式：按项目交付"],
        rows=[["产品乙", None, 4, None, "研发中"]],
    ))
    assert result["business_model"]["value"] == "按项目交付"
    assert result["max_trl"]["value"] == 4
    product = result["products"][0]
    assert product["stage"]["value"] == TRL_STAGE_MAP[4]
    assert product["target_customer"] is None
    assert product["status"]["value"] == "研发中"
    assert result["invention_patent_count"] is None
    assert result["software_copyright_count"] is None
    assert result["positioning"] is None
    assert result["summary"] is not None


def test_business_overview_all_missing_has_no_prototype_defaults() -> None:
    result = extract_business_overview(_manifest(text=["公司简介：持续研发"] , rows=[]))
    assert result == {
        "products": [], "product_line_count": None, "max_trl": None,
        "invention_patent_count": None, "software_copyright_count": None,
        "business_model": None, "positioning": None, "summary": None,
    }


def test_business_overview_service_reads_only_parsed_staging(tmp_path: Path) -> None:
    db_path = tmp_path / "app.db"
    init_db(db_path)
    store = ArchiveFileStore(tmp_path / "objects", db_path)
    stored = store.put_bytes(b"source", original_name="真实业务资料.xlsx")
    manifest = _manifest(rows=[["产品丙", "工程化", 6, "企业客户", "量产准备"]])
    manifest["file_hash"] = stored.file_hash
    ClassificationService(db_path).classify_parsed(
        file_hash=stored.file_hash, company_id="acme", manifest=manifest,
    )
    StagingStore(db_path).save_manifest(manifest)
    overview = BusinessOverviewService(db_path).overview(company_id="acme")
    assert overview["products"][0]["product"]["source_file"] == "真实业务资料.xlsx"
    assert overview["max_trl"]["stage"] == TRL_STAGE_MAP[6]


def test_business_overview_reads_folder_navigation_from_ov(tmp_path: Path) -> None:
    from app.ports import LocalMemoryProvider
    memory = LocalMemoryProvider(tmp_path / "memory")
    db_path = tmp_path / "app.db"
    init_db(db_path)
    store = ArchiveFileStore(tmp_path / "objects", db_path)
    stored = store.put_bytes(b"source", original_name="技术资料.md")
    manifest = _manifest(name="技术资料.md", text=["公司定位为工业材料供应商"])
    manifest["file_hash"] = stored.file_hash
    manifest["resource_folder"] = "技术与产品"
    manifest["ov_resource_uri"] = (
        f"viking://resources/技术与产品/{stored.file_hash}.md"
    )
    ClassificationService(db_path).classify_parsed(
        file_hash=stored.file_hash, company_id="acme", manifest=manifest,
    )
    manifest["ov_sidecar_uris"] = {
        "abstract_uri": "viking://sam-test/2a_extraction/acme/sample/L0/abstract.md",
        "overview_uri": "viking://sam-test/2a_extraction/acme/sample/L1/overview.md",
    }
    StagingStore(db_path).save_manifest(manifest)
    resource = manifest["ov_resource_uri"]
    memory.put(manifest["ov_sidecar_uris"]["abstract_uri"], "盖戳：OV 摘要", metadata={"generated_by": "SemanticProcessor"})
    memory.put(manifest["ov_sidecar_uris"]["overview_uri"], "# 技术资料\n\n技术证据", metadata={"generated_by": "SemanticProcessor"})

    result = BusinessOverviewService(db_path, memory).overview(company_id="acme")
    assert result["navigation_documents"][0]["abstract_uri"].endswith("/L0/abstract.md")
    assert "技术证据" in result["navigation_documents"][0]["overview"]
    assert result["narrative_documents"] == result["navigation_documents"]
    assert result["positioning"]["value"] == "工业材料供应商"


def test_business_overview_page_is_empty_before_first_parse(tmp_path: Path, monkeypatch) -> None:
    from tests.test_frontend_pages import _webapp_module

    db_path = tmp_path / "app.db"
    init_db(db_path)
    webapp = _webapp_module()
    monkeypatch.setattr(webapp, "MAIN_DB", db_path)
    monkeypatch.setattr(webapp, "OBJECTS_DIR", tmp_path / "objects")
    webapp.init_db()
    response = webapp.app.test_client().get("/bizov?company_id=empty")
    assert response.status_code == 200
    html = response.get_data(as_text=True)
    assert "暂无可识别的产品信息" in html
    assert "建议上传公司介绍或 BP" in html
    for marker in ("来源：", "可溯源", "依据：", "证据"):
        assert marker not in html
