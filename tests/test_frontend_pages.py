from __future__ import annotations

import json
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
    monkeypatch.setattr(webapp, "DB_PATH", db_path)
    webapp.init_db()
    with webapp.db() as conn:
        cursor = conn.execute(
            """INSERT INTO files(file_hash,original_name,file_format,size,storage_path,module,doc_type,
               confidence,structured,uploaded_at) VALUES (?,?,?,?,?,?,?,?,?,?)""",
            (second.file_hash, "annual-b.xlsx", "excel", 1, "objects/b", "finance", None,
             0.9, json.dumps({"markdown": "# Parsed report\n\nRevenue: 20"}), "now"),
        )
        file_id = cursor.lastrowid
        conn.commit()

    client = webapp.app.test_client()
    resolved = client.get("/todos?company_id=acme&status=resolved")
    assert resolved.status_code == 200
    assert b'value="resolved" selected' in resolved.data
    assert "营业收入" in resolved.get_data(as_text=True)
    invalid = client.get("/todos?company_id=acme&status=not-a-state")
    assert invalid.status_code == 200
    assert b'value="open" selected' in invalid.data
    detail = client.get(f"/files/{file_id}?company_id=acme")
    assert detail.status_code == 200
    assert "annual-b.xlsx" in detail.get_data(as_text=True)
    assert "Parsed report" in detail.get_data(as_text=True)
