"""Homepage takeover contracts, isolated from OV/model/production data."""
from __future__ import annotations

import importlib.util
import io
import json
from pathlib import Path
import shutil
import subprocess
import sys

import pytest

from app.home_shell import render_home_shell

ROOT = Path(__file__).resolve().parents[1]


@pytest.fixture(params=["full", "readonly"])
def shell_web(request, monkeypatch, tmp_path):
    readonly = request.param == "readonly"
    monkeypatch.setenv("SAM_CLOUD_READONLY", "1" if readonly else "0")
    monkeypatch.setenv("SAM_COMPANY_ID", "acc-shell")
    monkeypatch.setenv("SAM_MEMORY_ROOT_URI", "viking://sam-test/acc-shell")
    monkeypatch.setenv("SAM_DATA_ROOT", str(tmp_path))
    for name, value in (("SAM_MAIN_DB", tmp_path / "app.db"),
                        ("SAM_APP_DB", tmp_path / "sales.db"),
                        ("SAM_OBJECTS_DIR", tmp_path / "objects")):
        monkeypatch.setenv(name, str(value))
    for name in ("SAM_VIEW_USER", "SAM_VIEW_PASS"):
        monkeypatch.delenv(name, raising=False)
    spec = importlib.util.spec_from_file_location("acc_shell_web", ROOT / "webapp/app.py")
    web = importlib.util.module_from_spec(spec)
    monkeypatch.setitem(sys.modules, spec.name, web)
    spec.loader.exec_module(web)
    web.app.config.update(TESTING=True)
    yield web
    if web._PARSE_MANAGER:
        web._PARSE_MANAGER.close()
    if web._GUIDE_EXECUTOR:
        web._GUIDE_EXECUTOR.shutdown(wait=True)
    shutil.rmtree(tmp_path)  # remove this fixture's acc-* ledgers/objects/memory


def _config(html):
    return json.loads(html.split("window.SAM_CONFIG = ", 1)[1].split(";", 1)[0])


def test_home_and_alias_share_one_owned_visual_source(shell_web, monkeypatch):
    web = shell_web
    for name in ("_page_context", "consolidation_service", "classification_service", "business_overview_service"):
        monkeypatch.setattr(web, name, lambda **_: pytest.fail("home must not call business services"))
    source = (ROOT / "prototype/startup-ai-manager.html").read_text(encoding="utf-8")
    client = web.app.test_client()
    home = client.get("/?company_id=caller-cannot-change-shell")
    assert home.status_code == 200
    assert home.mimetype == "text/html"
    assert home.headers["Cache-Control"] == "no-store"
    html = home.get_data(as_text=True)
    config = _config(html)
    assert config == {"mode": "readonly" if web.RUNTIME_CONFIG.cloud_readonly else "full",
                      "company_id": "acc-shell"}
    injection = "\nwindow.SAM_CONFIG = " + json.dumps(config, ensure_ascii=True) + ";"
    assert html.replace(injection, "", 1) == source
    assert html.count("window.SAM_CONFIG = ") == 1
    assert '<div class="screen active" id="overview">' in html
    assert html.count('<div class="screen active"') == 1
    assert "http://127.0.0.1:5000/api/chat" not in html
    alias = client.get("/prototype")
    assert alias.status_code == 200
    assert alias.data == home.data


@pytest.mark.parametrize("company", [None, 'acc-公司"</script><script>alert(1)</script>&\u2028\u2029'])
@pytest.mark.parametrize("readonly", [False, True])
def test_configuration_default_and_script_safe_serialization(monkeypatch, company, readonly):
    if company is None:
        monkeypatch.delenv("SAM_COMPANY_ID", raising=False)
    else:
        monkeypatch.setenv("SAM_COMPANY_ID", company)
    html = render_home_shell(ROOT, readonly=readonly).get_data(as_text=True)
    assert _config(html) == {"mode": "readonly" if readonly else "full", "company_id": company or "default"}
    script = html.split("<script>", 1)[1].split(";", 1)[0]
    assert "</script>" not in script
    assert "&" not in script
    assert "\u2028" not in script and "\u2029" not in script


def test_shell_missing_injection_point_fails_explicitly(tmp_path):
    (tmp_path / "prototype").mkdir()
    (tmp_path / "prototype/startup-ai-manager.html").write_text("<html></html>")
    with pytest.raises(RuntimeError, match="injection point"):
        render_home_shell(tmp_path, readonly=False)


def test_full_routes_still_work_and_readonly_blocks_before_services(shell_web, monkeypatch, tmp_path):
    from app.entities import EntityRosterService
    from app.ports import LocalMemoryProvider

    web = shell_web
    client = web.app.test_client()
    if web.RUNTIME_CONFIG.cloud_readonly:
        monkeypatch.setattr(web, "_has_declared_self", lambda _: pytest.fail("readonly must block before upload"))
        monkeypatch.setattr(web, "runtime_provider", lambda *_: pytest.fail("readonly must not call model"))
        for path in ("/api/chat", "/api/upload", "/api/import-guide", "/api/parse-jobs/x/retry"):
            response = client.post(path, json={})
            assert response.status_code == 403
            assert response.get_json()["error"] == "cloud_readonly"
        assert client.get("/knowledge").status_code == 200
        assert client.get("/knowledge/sources/x").status_code == 200
        assert client.get("/api/knowledge").status_code == 200
        assert client.get("/api/knowledge/sources/acc-hash/original").status_code == 404
        assert not web.MAIN_DB.exists()
        return

    web.app.extensions["sam_memory_provider"] = LocalMemoryProvider(tmp_path / "memory")
    EntityRosterService(web.MAIN_DB).declare(company_id="acc-shell", entity_name="acc-shell")
    model_calls = []

    class Runtime:
        def run_agent_message(self, message, **kwargs):
            model_calls.append((message, kwargs))
            return json.dumps({"result": {"payloads": [{"text": "测试回复"}]}})

    monkeypatch.setattr(web, "runtime_provider", lambda *_: Runtime())
    monkeypatch.setattr(web, "sync_agent_config", lambda *_: None)
    response = client.post("/api/chat", json={"message": "测试消息"})
    assert response.status_code == 200
    assert response.get_json()["message"] == "测试回复"
    assert model_calls[0][1]["company_id"] == "acc-shell"
    monkeypatch.setattr(web._PARSE_MANAGER, "create", lambda **kwargs: {"job_id": "acc-job", **kwargs})
    response = client.post("/api/upload", data={"file": (io.BytesIO(b"acc-test-document"), "acc-test.pdf")})
    assert response.status_code == 202
    assert response.get_json()["status"] == "queued"
    assert response.get_json()["original_name"] == "acc-test.pdf"
    monkeypatch.setattr(web, "_run_import_guide", lambda **_: {"message": "测试引导"})
    response = client.post("/api/import-guide", json={"event": "open"})
    assert response.status_code == 200
    assert response.get_json()["guide"]["message"] == "测试引导"
    assert client.get("/bizov").status_code == 200


@pytest.mark.parametrize("case", ["api", "empty", "failure", "label", "readonly", "full", "ui-readonly", "ui-full",
    "ui-cabinet-registration", "ui-cabinet-409", "ui-cabinet-lifecycle", "ui-cabinet-actions",
    "ui-cabinet-errors", "ui-cabinet-readonly", "ui-cabinet-pause", "ui-cabinet-registration-error",
    "ui-cabinet-upload-error", "ui-cabinet-races", "ui-cabinet-upload-race",
    "ui-knowledge-data", "ui-knowledge-empty", "ui-knowledge-failure", "ui-knowledge-partial",
    "ui-knowledge-warnings", "ui-knowledge-race", "ui-knowledge-cabinet", "ui-knowledge-cabinet-readonly",
    "ui-knowledge-legacy", "ui-knowledge-legacy-source",
    "ui-knowledge-explorer", "ui-knowledge-explorer-readonly"])
def test_javascript_foundation_contracts(case):
    node = shutil.which("node")
    if not node:
        pytest.skip("Node required for executable frontend contracts")
    result = subprocess.run([node, str(ROOT / "tests/js/home_shell.cjs"), case],
                            cwd=ROOT, capture_output=True, text=True, timeout=15)
    assert result.returncode == 0, result.stdout + result.stderr


def test_file_cabinet_stays_inside_the_owned_wizard():
    source = (ROOT / 'prototype/startup-ai-manager.html').read_text(encoding='utf-8')
    nav = source.split('id="importNavBtn"', 1)[1].split('</button>', 1)[0]
    assert '文件柜' in nav and '资料导入' not in nav
    assert 'id="importRegistration" hidden' in source
    assert 'for="importCompanyName"' in source
    assert 'id="importFiles" aria-live="polite"' in source
    assert "button('result','查看结果')" in source
    assert "button('source','溯源')" in source
    assert 'target="_blank" rel="noopener">查看结果' not in source


def test_cabinet_registration_read_and_write_boundary(shell_web):
    web = shell_web
    client = web.app.test_client()
    assert client.get('/api/entity-roster').get_json()['entities'] == []
    if web.RUNTIME_CONFIG.cloud_readonly:
        assert not web.MAIN_DB.exists()
        for path in ('/api/entity-roster', '/api/parse-jobs/x/cancel', '/api/parse-jobs/x/retry'):
            response = client.post(path, json={'entity_name': 'acc-cabinet'})
            assert response.status_code == 403
            assert response.get_json()['error'] == 'cloud_readonly'
        assert not web.MAIN_DB.exists()
        return
    before = client.post('/api/upload', data={'file': (io.BytesIO(b'acc-content'), 'acc-file.pdf')})
    assert before.status_code == 409
    assert before.get_json()['error'] == 'company_not_registered'
    invalid = client.post('/api/entity-roster', json={'entity_name': '  '})
    assert invalid.status_code == 400
    declared = client.post('/api/entity-roster', json={'entity_name': 'acc-cabinet'})
    assert declared.status_code == 201
    entities = client.get('/api/entity-roster').get_json()['entities']
    assert len(entities) == 1
    assert entities[0]['entity_name'] == 'acc-cabinet'
    assert entities[0]['origin'] == 'declared' and entities[0]['entity_type'] == 'self'
    assert entities[0]['status'] == 'active'


def test_cabinet_job_transport_and_existing_result_routes(shell_web, monkeypatch):
    from threading import Event
    import time
    from app.parse_jobs import ParseJobManager

    web = shell_web
    client = web.app.test_client()
    if web.RUNTIME_CONFIG.cloud_readonly:
        web.app.extensions['sam_snapshot_store'].replace({
            'version': 1, 'company_id': 'acc-shell', 'pushed_at': 1,
            'payload': {'entities': [{'origin': 'declared', 'entity_type': 'self', 'status': 'active'}],
                        'jobs': [{'job_id': 'acc-job', 'file_hash': 'acc-hash', 'status': 'done'}]}})
        assert client.get('/api/entity-roster').get_json()['entities'][0]['status'] == 'active'
        assert client.get('/api/parse-jobs/acc-job').get_json()['job']['status'] == 'done'
        assert client.get('/knowledge#source-acc-hash').status_code == 200
        assert client.get('/knowledge/sources/acc-hash').status_code == 200
        return

    # A real durable queue with an isolated test worker, not an OV/model claim.
    started, release = Event(), Event()

    def worker(job, progress, event):
        progress(stage='parsing', current=1, total=2, message='acc-page')
        started.set()
        assert release.wait(5)

    web._PARSE_MANAGER.close()
    manager = ParseJobManager(web.MAIN_DB, worker, workers=1)
    monkeypatch.setattr(web, '_PARSE_MANAGER', manager)
    try:
        assert client.post('/api/entity-roster', json={'entity_name': 'acc-cabinet'}).status_code == 201
        upload = client.post('/api/upload', data={'file': (io.BytesIO(b'acc-content'), 'acc-file.pdf')})
        assert upload.status_code == 202
        data = upload.get_json()
        assert started.wait(2)
        job = client.get('/api/parse-jobs/' + data['job_id']).get_json()['job']
        assert (job['status'], job['stage'], job['progress_current'], job['progress_total']) == ('parsing', 'parsing', 1, 2)
        release.set()
        for _ in range(100):
            job = client.get('/api/parse-jobs/' + data['job_id']).get_json()['job']
            if job['status'] == 'done':
                break
            time.sleep(.01)
        assert job['status'] == 'done'
        assert client.get('/knowledge#source-' + data['file_hash']).status_code == 200
        assert client.get('/knowledge/sources/' + data['file_hash']).status_code == 200
    finally:
        release.set()
        manager.executor.shutdown(wait=True, cancel_futures=True)


def test_knowledge_old_routes_share_shell_without_reading_services(shell_web, monkeypatch):
    web = shell_web
    monkeypatch.setattr(web, "knowledge_service", lambda: pytest.fail("HTML must only serve the shell"))
    client = web.app.test_client()
    home = client.get('/')
    for path in ('/knowledge', '/knowledge/sources/unknown?page=0&locator=Sheet1!B3'):
        result = client.get(path + ('&' if '?' in path else '?') + 'company_id=foreign')
        assert result.status_code == 200
        assert result.data == home.data
        assert result.headers['Cache-Control'] == 'no-store'
    if web.RUNTIME_CONFIG.cloud_readonly:
        assert not web.MAIN_DB.exists()
