from __future__ import annotations

from pathlib import Path
import sys

from app.db.database import init_db as init_core_db
from app.facts import ConsolidationService
from app.storage import SourceFileStore


def _manifest(file_hash: str, *rows: tuple[str, object]) -> dict:
    return {
        "file_hash": file_hash,
        "filename": "report.xlsx",
        "pages": [{
            "page_no": 1,
            "tables": [{
                "headers": list(rows[0]),
                "rows": [list(row) for row in rows[1:]],
                "source_loc": {"file_hash": file_hash, "page_no": 1, "locator": "#/tables/0"},
            }],
            "text_items": [],
        }],
    }


def _webapp_module():
    webapp_dir = Path(__file__).resolve().parents[1] / "webapp"
    sys.path.insert(0, str(webapp_dir))
    try:
        import webapp.app as webapp
    finally:
        sys.path.remove(str(webapp_dir))
    return webapp


def test_todo_status_filters_and_file_detail_use_actual_local_columns(tmp_path: Path, monkeypatch) -> None:
    """Status pages must render their selected ledger state and file detail must not 500."""
    db_path = tmp_path / "app.db"
    init_core_db(db_path)
    store = SourceFileStore(tmp_path / "objects", db_path)
    service = ConsolidationService(db_path)
    first = store.put_bytes(b"a", original_name="annual-a.xlsx")
    second = store.put_bytes(b"b", original_name="annual-b.xlsx")
    service.consolidate_manifest(
        _manifest(first.file_hash, ("营业收入", 10)), company_id="acme",
    )
    todo_id = service.consolidate_manifest(
        _manifest(second.file_hash, ("营业收入", 20)), company_id="acme",
    ).todo_ids[0]
    service.resolve(todo_id, choose="candidate")

    webapp = _webapp_module()
    monkeypatch.setattr(webapp, "MAIN_DB", db_path)
    monkeypatch.setattr(webapp, "OBJECTS_DIR", tmp_path / "objects")
    webapp.init_db()

    client = webapp.app.test_client()
    resolved = client.get("/todos?company_id=acme&status=resolved")
    assert resolved.status_code == 200
    assert b'value="resolved" selected' in resolved.data
    assert "营业收入" in resolved.get_data(as_text=True)
    invalid = client.get("/todos?company_id=acme&status=not-a-state")
    assert invalid.status_code == 200
    assert b'value="open" selected' in invalid.data
    detail = client.get(f"/files/{second.file_hash}?company_id=acme")
    assert detail.status_code == 200
    detail_text = detail.get_data(as_text=True)
    assert "annual-b.xlsx" in detail_text
    assert "MIME 类型" in detail_text
    assert "营业收入" in detail_text
    assert client.get("/files/1?company_id=acme").status_code == 404


def test_parse_failure_message_prefers_bridge_user_message() -> None:
    webapp = _webapp_module()
    assert webapp._parse_failure_message({"parse_summary": {
        "user_message": "本地 MinerU 解析服务启动失败或被网络代理拦截；请检查本地解析服务状态。",
    }}, "parse_failed") == "本地 MinerU 解析服务启动失败或被网络代理拦截；请检查本地解析服务状态。"
    assert webapp._parse_failure_message({}, "engine_unavailable") == "本地解析服务暂不可用，请稍后重试或联系管理员。"


def test_detect_format_accepts_word_and_powerpoint() -> None:
    webapp = _webapp_module()
    assert webapp.detect_format("brief.pptx") == "ppt"
    assert webapp.detect_format("legacy.ppt") == "ppt"
    assert webapp.detect_format("brief.docx") == "doc"
    assert webapp.detect_format("legacy.doc") == "doc"
