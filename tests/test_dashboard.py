from __future__ import annotations

from pathlib import Path

from app.classifier import ClassificationService
from app.db.database import init_db
from app.facts import ConsolidationService
from app.harness.staging import StagingStore
from app.storage import SourceFileStore


def _manifest(file_hash: str) -> dict:
    return {
        "file_hash": file_hash,
        "original_name": "业务介绍.xlsx",
        "format": "excel",
        "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": [{
            "text": "公司定位为工业材料供应商；商业模式：产品直销",
            "source_loc": {"locator": "#/text/0"},
        }], "tables": [{
            "headers": ["产品", "阶段", "TRL", "目标客户", "状态"],
            "rows": [["产品甲", "工程化", 6, "工业客户", "验证中"]],
            "source_loc": {"locator": "#/tables/0"},
        }],}],
    }


def _webapp_module():
    from tests.test_frontend_pages import _webapp_module as load
    return load()


def test_dashboard_cards_are_data_driven_and_company_scoped(tmp_path: Path, monkeypatch) -> None:
    db_path = tmp_path / "app.db"
    init_db(db_path)
    source = SourceFileStore(tmp_path / "objects", db_path)
    stored = source.put_bytes(b"business", original_name="业务介绍.xlsx")
    manifest = _manifest(stored.file_hash)
    ClassificationService(db_path).classify_parsed(
        file_hash=stored.file_hash, company_id="acme", manifest=manifest,
    )
    StagingStore(db_path).save_manifest(manifest)
    ConsolidationService(db_path).consolidate_manifest(
        {"file_hash": stored.file_hash, "pages": [{"page_no": 1, "text_items": [
            {"text": "营业收入：12345.67", "source_loc": {"locator": "#/text/1"}},
        ]}]}, company_id="acme",
    )
    ClassificationService(db_path).classify_parsed(
        file_hash=stored.file_hash, company_id="other", manifest=manifest,
    )
    ConsolidationService(db_path).consolidate_manifest(
        {"file_hash": stored.file_hash, "pages": [{"page_no": 1, "text_items": [
            {"text": "营业收入：12345.67", "source_loc": {"locator": "#/text/1"}},
        ]}]}, company_id="other",
    )

    webapp = _webapp_module()
    monkeypatch.setattr(webapp, "MAIN_DB", db_path)
    monkeypatch.setattr(webapp, "OBJECTS_DIR", tmp_path / "objects")
    webapp.init_db()
    client = webapp.app.test_client()

    page = client.get("/bizov?company_id=acme")
    assert page.status_code == 200
    html = page.get_data(as_text=True)
    assert 'data-dashboard-card="company_overview"' in html
    assert 'data-dashboard-card="product_lines"' in html
    assert 'data-dashboard-card="revenue"' in html
    assert 'data-dashboard-card="business_model"' not in html
    assert "工业材料供应商" in html
    for marker in ("来源：", "可溯源", "依据：", "证据"):
        assert marker not in html

    hidden = client.post("/api/dashboard/cards/revenue/toggle", json={
        "company_id": "acme", "hidden": True,
    })
    assert hidden.status_code == 200
    assert hidden.get_json()["preference"]["hidden"] is True
    assert 'data-dashboard-card="revenue"' not in client.get("/bizov?company_id=acme").get_data(as_text=True)
    assert 'data-dashboard-card="revenue"' in client.get("/bizov?company_id=other").get_data(as_text=True)

    restored = client.post("/api/dashboard/preferences", json={
        "company_id": "acme", "card_id": "revenue", "hidden": False,
    })
    assert restored.status_code == 200
    assert 'data-dashboard-card="revenue"' in client.get("/bizov?company_id=acme").get_data(as_text=True)
    assert client.post("/api/dashboard/cards/company_overview/toggle", json={
        "company_id": "acme", "hidden": True,
    }).status_code == 400


def test_dashboard_empty_state_has_no_data_cards(tmp_path: Path, monkeypatch) -> None:
    db_path = tmp_path / "app.db"
    init_db(db_path)
    webapp = _webapp_module()
    monkeypatch.setattr(webapp, "MAIN_DB", db_path)
    monkeypatch.setattr(webapp, "OBJECTS_DIR", tmp_path / "objects")
    webapp.init_db()
    response = webapp.app.test_client().get("/bizov?company_id=empty")
    assert response.status_code == 200
    html = response.get_data(as_text=True)
    assert 'data-dashboard-card="company_overview"' in html
    assert 'data-dashboard-card="product_lines"' not in html
    assert "建议上传公司介绍或 BP" in html
