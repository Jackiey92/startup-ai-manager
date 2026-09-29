from __future__ import annotations

from pathlib import Path

from app.db.database import init_db


def _webapp_module():
    from tests.test_frontend_pages import _webapp_module as load
    return load()


def test_navigation_has_four_grouped_entries_and_bizov_landing(tmp_path: Path, monkeypatch) -> None:
    db_path = tmp_path / "app.db"
    init_db(db_path)
    webapp = _webapp_module()
    monkeypatch.setattr(webapp, "MAIN_DB", db_path)
    monkeypatch.setattr(webapp, "OBJECTS_DIR", tmp_path / "objects")
    webapp.init_db()
    client = webapp.app.test_client()

    landing = client.get("/")
    assert landing.status_code == 302
    assert landing.headers["Location"].endswith("/bizov")
    page = client.get("/bizov?company_id=empty")
    assert page.status_code == 200
    html = page.get_data(as_text=True)
    assert 'class="nav-groups"' in html
    assert html.count("nav-primary") == 4
    assert "业务概览" in html and "上传中转区" in html
    assert 'class="nav-primary nav-disabled"' in html
    assert "日程" in html and "云盘" in html and "即将开放" in html

    # Existing screens remain reachable under their grouped links.
    for path in ("/overview", "/inbox", "/todos", "/facts", "/files", "/chat"):
        assert client.get(path + "?company_id=empty").status_code == 200, path
