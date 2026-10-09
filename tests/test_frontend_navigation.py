from __future__ import annotations

from pathlib import Path

from app.db.database import init_db


def _webapp_module():
    from tests.test_frontend_pages import _webapp_module as load
    return load()


def test_navigation_keeps_legacy_pages_and_owned_home(tmp_path: Path, monkeypatch) -> None:
    db_path = tmp_path / "app.db"
    init_db(db_path)
    webapp = _webapp_module()
    monkeypatch.setattr(webapp, "MAIN_DB", db_path)
    monkeypatch.setattr(webapp, "OBJECTS_DIR", tmp_path / "objects")
    webapp.init_db()
    client = webapp.app.test_client()

    landing = client.get("/")
    assert landing.status_code == 200
    assert 'window.SAM_CONFIG = ' in landing.get_data(as_text=True)
    assert '<div class="screen active" id="overview">' in landing.get_data(as_text=True)
    page = client.get("/bizov?company_id=empty")
    assert page.status_code == 200
    html = page.get_data(as_text=True)
    assert 'class="nav-groups"' in html
    assert html.count("nav-primary") == 6
    assert "业务概览" in html and "文件柜" in html
    assert 'href="/chat"' in html
    assert 'href="/knowledge"' in html
    assert 'class="nav-primary nav-disabled"' in html
    assert "日程" in html and "云盘" in html and "即将开放" in html

    # Existing screens remain reachable under their grouped links.
    for path in ("/overview", "/inbox", "/todos", "/facts", "/files", "/chat"):
        assert client.get(path + "?company_id=empty").status_code == 200, path


def test_mobile_layout_keeps_navigation_and_tables_inside_viewport() -> None:
    css = (Path(__file__).resolve().parents[1] / "webapp/static/css/app.css").read_text(encoding="utf-8")
    assert "@media(max-width:850px)" in css
    assert ".nav-groups .nav-group{display:none}" in css
    assert ".sidebar nav.nav-groups" in css and "overflow-x:auto" in css
    assert "html,body,.app-shell,.main,.page" in css and "max-width:100%" in css
    assert ".table-wrap" in css and "overflow-x:auto" in css
    assert "@media(max-width:600px)" in css
    assert ".kpi-grid{grid-template-columns:minmax(0,1fr)}" in css
