"""Knowledge UI/API are scoped read projections, never a promotion path."""
from __future__ import annotations

import json
import base64
import sqlite3
import shutil
import subprocess
from pathlib import Path
from urllib.parse import urlsplit, parse_qs

import pytest

from app.db.database import connect, init_db
from app.memory.company_facts import ConsolidationService
from app.memory.company_facts.l2_cap_table import CapTableEvent, CapTableStore
from app.memory.company_facts.l2_fact_extractor import ExtractedFact
from app.harness.staging import StagingStore
from app.ports import LocalMemoryProvider, MemoryUnavailable
from app.memory.user_memory.l1_memory_brief import RuntimeWorkingMemory
from app.storage import ArchiveFileStore
from tests.test_frontend_pages import _webapp_module

COMPANY = "acc-knowledge"
OTHER = "acc-other"


@pytest.fixture
def knowledge_env(tmp_path, monkeypatch):
    monkeypatch.delenv("SAM_VIEW_USER", raising=False)
    monkeypatch.delenv("SAM_VIEW_PASS", raising=False)
    db = tmp_path / "app.db"
    objects = tmp_path / "objects"
    init_db(db)
    memory = LocalMemoryProvider(tmp_path / "memory")
    webapp = _webapp_module()
    monkeypatch.setattr(webapp, "MAIN_DB", db)
    monkeypatch.setattr(webapp, "OBJECTS_DIR", objects)
    monkeypatch.setenv("SAM_COMPANY_ID", COMPANY)
    monkeypatch.setitem(webapp.app.extensions, "sam_memory_provider", memory)
    return webapp.app.test_client(), db, objects, memory


def basic_auth(username, password):
    token = base64.b64encode(f"{username}:{password}".encode("utf-8")).decode("ascii")
    return {"Authorization": f"Basic {token}"}


def test_knowledge_auth_disabled_without_environment(knowledge_env):
    response = knowledge_env[0].get("/knowledge")
    assert response.status_code == 200
    assert "WWW-Authenticate" not in response.headers


@pytest.mark.parametrize("headers", [
    {}, basic_auth("acc-viewer", "wrong"), basic_auth("wrong", "acc-password"),
    {"Authorization": "Basic !!!"}, {"Authorization": "Bearer acc-token"},
])
def test_knowledge_auth_rejects_invalid_credentials(knowledge_env, monkeypatch, headers):
    monkeypatch.setenv("SAM_VIEW_USER", "acc-viewer")
    monkeypatch.setenv("SAM_VIEW_PASS", "acc-password")
    for path in ("/knowledge", "/api/knowledge", "/knowledge/sources/unknown"):
        response = knowledge_env[0].get(path, headers=headers)
        assert response.status_code == 401
        assert response.headers["WWW-Authenticate"].startswith("Basic ")
    assert knowledge_env[0].head("/knowledge", headers=headers).status_code == 401


@pytest.mark.parametrize("username,password", [
    ("acc-viewer", "acc-password"), ("acc-读者", "acc-口令"),
])
def test_knowledge_auth_accepts_credentials(knowledge_env, monkeypatch, username, password):
    stored, _ = seed_file(knowledge_env)
    monkeypatch.setenv("SAM_VIEW_USER", username)
    monkeypatch.setenv("SAM_VIEW_PASS", password)
    for path in ("/knowledge", "/api/knowledge", f"/knowledge/sources/{stored.file_hash}"):
        assert knowledge_env[0].get(path, headers=basic_auth(username, password)).status_code == 200


@pytest.mark.parametrize("settings", [
    {"SAM_VIEW_USER": "acc-viewer"}, {"SAM_VIEW_PASS": "acc-password"},
    {"SAM_VIEW_USER": "", "SAM_VIEW_PASS": ""},
    {"SAM_VIEW_USER": "acc-viewer", "SAM_VIEW_PASS": ""},
])
def test_knowledge_auth_incomplete_configuration_fails_closed(knowledge_env, monkeypatch, settings):
    for key, value in settings.items():
        monkeypatch.setenv(key, value)
    response = knowledge_env[0].get("/knowledge", headers=basic_auth("acc-viewer", ""))
    assert response.status_code == 401
    assert response.headers["WWW-Authenticate"].startswith("Basic ")


def test_knowledge_auth_does_not_protect_overview(knowledge_env, monkeypatch):
    monkeypatch.setenv("SAM_VIEW_USER", "acc-viewer")
    monkeypatch.setenv("SAM_VIEW_PASS", "acc-password")
    response = knowledge_env[0].get("/overview")
    assert response.status_code == 200
    assert "WWW-Authenticate" not in response.headers


def seed_file(env, *, company=COMPANY, module="finance", content=b"acc-source"):
    _, db, objects, _ = env
    stored = ArchiveFileStore(objects, db).put_bytes(content, original_name="acc-report.xlsx")
    loc = {"file_hash": stored.file_hash, "page_no": 2, "locator": "Sheet1!B3"}
    manifest = {"source_id": stored.file_hash, "file_hash": stored.file_hash,
                "filename": stored.original_name, "format": "excel",
                "pages": [{"page_no": 2, "text_items": [
                    {"text": "acc 原文 <script>alert(1)</script>", "source_loc": loc}],
                    "tables": [{"headers": ["acc 项目", "内容"],
                                "rows": [["acc 指标", 17]], "source_loc": loc}]}],
                "parse_summary": {"status": "parsed", "raw_bytes_external": False,
                                  "full_text_external": False}}
    StagingStore(db).save_manifest(manifest)
    with connect(db) as conn:
        conn.execute("""INSERT INTO file_classifications
                     (file_hash,company_id,module,status,created_at) VALUES (?,?,?,'confirmed','2026-10-09')""",
                     (stored.file_hash, company, module))
        conn.commit()
    ConsolidationService(db).consolidate_candidates([ExtractedFact(
        company_id=company, entity="acc-entity", metric="acc 属性", value="17",
        value_type="number", period="2026", unit=None, source_file=stored.file_hash,
        source_page=2, source_span="Sheet1!B3", confidence=1.0, critical=False,
    )])
    return stored, manifest


def seed_runtime(memory, *, company=COMPANY, session="acc-session", task="acc-task"):
    runtime = RuntimeWorkingMemory(memory)
    runtime.create(session, task, goal="acc 目标", company_id=company)
    runtime.add_loop(session, task, "closed", "acc 已闭环")
    runtime.close_loop(session, task, "closed")
    runtime.add_loop(session, task, "open", "acc 未闭环")
    runtime.add_note(session, task, "acc 待核验结论", confidence=0.73)
    return runtime


def snapshot(db, memory):
    with sqlite3.connect(db) as conn:
        ledger = tuple(conn.iterdump())
    files = {str(p.relative_to(memory.root)): p.read_bytes()
             for p in memory.root.rglob("*") if p.is_file()}
    return ledger, files


def test_knowledge_empty_page_api_and_read_only_methods(knowledge_env):
    client, db, _, memory = knowledge_env
    before = snapshot(db, memory)
    response = client.get("/api/knowledge")
    assert response.status_code == 200
    assert response.json == {
        "company_id": COMPANY, "evidence": {"files": []},
        "facts": {"groups": [], "cap_table": {"events": [], "snapshot": None, "warnings": []}},
        "working_memory": {"items": [], "warnings": []},
    }
    html = client.get("/knowledge").get_data(as_text=True)
    assert '<div class="screen" id="knowledge">' in html
    assert 'data-go="knowledge"' in html
    for text in ("暂无原始证据", "暂无确认事实", "暂无已存股权事件链", "暂无当前公司", "只读"):
        assert text in html
    assert "data-upload-open" not in html and 'id="upload-modal"' not in html
    assert "data-todo-action" not in html and "data-file-confirm" not in html
    for path in ("/knowledge", "/api/knowledge", "/knowledge/sources/not-found"):
        assert client.post(path, json={"company_id": OTHER}).status_code == 405
    assert snapshot(db, memory) == before


def test_knowledge_three_layers_coordinates_and_links(knowledge_env, tmp_path):
    client, db, _, memory = knowledge_env
    stored, _ = seed_file(knowledge_env)
    seed_runtime(memory)
    CapTableStore(memory).append_events(COMPANY, [CapTableEvent(
        company_id=COMPANY, effective_at="2026-01-01", event_type="founding_issuance",
        holder_id="acc-founder", instrument="common", shares_delta=100,
        ownership_basis="issued", source_refs=[{"file_hash": stored.file_hash,
            "anchor": {"page_no": 2, "locator": "Sheet1!B3"}}],
    )])
    before = snapshot(db, memory)
    data = client.get("/api/knowledge").json
    evidence = data["evidence"]["files"][0]
    assert evidence["l0"]["content"] is None
    assert evidence["l1"]["content"] is None
    assert evidence["l2"]["manifest_uri"] is None
    assert "page=2; locator=Sheet1!B3" in evidence["l2"]["mapping"]
    for level in ("l0", "l1"):
        assert client.get(evidence[level]["source_ref"]["url"]).status_code == 200
    group = data["facts"]["groups"][0]
    assert group["category"] == "finance"
    with connect(db) as conn:
        assert group["label"] == conn.execute("SELECT name FROM modules WHERE code='finance'").fetchone()[0]
    fact = group["facts"][0]
    assert (fact["entity"], fact["attribute"], fact["value"], fact["period"]) == ("acc-entity", "acc 属性", "17", "2026")
    ref = fact["source_ref"]
    assert (ref["page"], ref["locator"]) == (2, "Sheet1!B3")
    assert parse_qs(urlsplit(ref["url"]).query) == {"page": ["2"], "locator": ["Sheet1!B3"]}
    source = client.get(ref["url"])
    assert source.status_code == 200
    source_html = source.get_data(as_text=True)
    assert source_html == client.get("/").get_data(as_text=True)
    assert "<script>alert(1)</script>" in evidence["l2"]["mapping"]  # JS owns escaping
    assert "<script>alert(1)</script>" not in source_html
    cap = data["facts"]["cap_table"]
    assert cap["snapshot"]["total_issued"] == 100
    assert client.get(cap["events"][0]["provenance"][0]["source_ref"]["url"]).status_code == 200
    runtime = data["working_memory"]["items"][0]
    assert runtime["runtime"]["goal"] == "acc 目标"
    assert runtime["runtime"]["open_loops"] == [{"id": "open", "text": "acc 未闭环"}]
    assert runtime["runtime"]["working_notes"][0]["confidence"] == 0.73
    # Execute the actual shell renderer against the real API projection, not a
    # second template or hand-written serialization of the expected fields.
    node = shutil.which("node")
    if node:
        payload = tmp_path / "knowledge.json"
        payload.write_text(json.dumps(data), encoding="utf-8")
        ran = subprocess.run([node, str(Path(__file__).parent / "js/home_shell.cjs"),
                              "ui-knowledge-payload", str(payload)], capture_output=True,
                             text=True, timeout=15)
        assert ran.returncode == 0, ran.stdout + ran.stderr
        rendered = json.loads(ran.stdout)
        for text in ("Sheet1!B3", "&lt;script&gt;"):
            assert text in rendered["mapping"]
        for text in ("acc-entity", "acc 属性", "17", "2026", "page=2"):
            assert text in rendered["facts"]
        assert "已发行总股数：100" in rendered["equity"]
        for text in ("acc 目标", "acc 已闭环", "acc 未闭环", "acc 待核验结论", "0.73"):
            assert text in rendered["runtime"]
        assert "<script>alert(1)</script>" not in json.dumps(rendered)
    assert any(event["type"] == "open_loop_remove" for event in runtime["events"])
    html = client.get("/knowledge").get_data(as_text=True)
    assert html == client.get("/").get_data(as_text=True)
    assert 'id="knowledgeRuntime"' in html
    assert snapshot(db, memory) == before


def test_knowledge_runtime_missing_snapshot_rebuild_is_not_persisted(knowledge_env, monkeypatch):
    client, db, _, memory = knowledge_env
    runtime = seed_runtime(memory)
    state_uri = runtime._state_uri("acc-session", "acc-task")
    memory.delete(state_uri)
    before = snapshot(db, memory)

    def forbidden(*args, **kwargs):
        pytest.fail("knowledge GET attempted a memory write/delete")

    monkeypatch.setattr(memory, "put", forbidden)
    monkeypatch.setattr(memory, "delete", forbidden)
    assert client.get("/api/knowledge").json["working_memory"]["items"][0]["runtime"]["revision"] == 4
    assert client.get("/knowledge").status_code == 200
    assert not memory._path(state_uri).exists()
    assert snapshot(db, memory) == before


def test_knowledge_host_scope_cannot_be_overridden(knowledge_env):
    client, _, _, memory = knowledge_env
    seed_file(knowledge_env)
    foreign, _ = seed_file(knowledge_env, company=OTHER, content=b"acc-foreign")
    seed_runtime(memory, company=OTHER, session="acc-foreign-session")
    seed_runtime(memory, company=None, session="acc-unscoped-session")
    data = client.get(f"/api/knowledge?company_id={OTHER}&session_id=acc-foreign-session").json
    assert data["company_id"] == COMPANY
    assert foreign.file_hash not in json.dumps(data)
    assert data["working_memory"]["items"] == []
    assert client.get(f"/knowledge/sources/{foreign.file_hash}?company_id={OTHER}").status_code == 200
    assert client.get(f"/knowledge?company_id={OTHER}").status_code == 200


def test_knowledge_missing_summaries_and_unclassified_facts_are_explicit(knowledge_env):
    client, _, _, memory = knowledge_env
    stored, _ = seed_file(knowledge_env, module=None)
    data = client.get("/api/knowledge").json
    assert data["evidence"]["files"][0]["l0"]["content"] is None
    assert data["facts"]["groups"][0]["category"] is None
    assert data["facts"]["groups"][0]["label"] is None
    # Missing-data wording and empty categories are exercised by ui-knowledge-partial.
    assert client.get("/knowledge").get_data(as_text=True) == client.get("/").get_data(as_text=True)
    assert client.get(f"/knowledge/sources/{stored.file_hash}").status_code == 200


def test_knowledge_catalog_includes_unparsed_jobs_without_classification(knowledge_env):
    client, db, objects, _ = knowledge_env
    stored = ArchiveFileStore(objects, db).put_bytes(b"acc-pending", original_name="acc-pending.pdf")
    with connect(db) as conn:
        conn.execute("""INSERT INTO parse_jobs
            (job_id,company_id,file_hash,original_name,file_format,harness_format,size_bytes,created_at,updated_at)
            VALUES ('acc-job',?,?,?,'pdf','pdf',1,'2026-10-09','2026-10-09')""",
            (COMPANY, stored.file_hash, stored.original_name))
        conn.commit()
    data = client.get("/api/knowledge").json
    assert data["evidence"]["files"][0]["status"] == "queued"
    assert data["evidence"]["files"][0]["l2"]["mapping"] is None
    assert "尚无可读取的 L2 原文" in client.get("/knowledge").get_data(as_text=True)


def test_knowledge_uses_persisted_category_names_not_business_mappings(knowledge_env):
    client, db, _, _ = knowledge_env
    with connect(db) as conn:
        conn.execute("INSERT INTO modules(code,name) VALUES ('acc-category','acc 自定义分类')")
        conn.commit()
    seed_file(knowledge_env, module="acc-category")
    group = client.get("/api/knowledge").json["facts"]["groups"][0]
    assert group["category"] == "acc-category" and group["label"] == "acc 自定义分类"


def test_knowledge_backend_outage_is_not_reported_as_empty_data(knowledge_env, monkeypatch):
    client, _, _, memory = knowledge_env
    seed_file(knowledge_env)

    def unavailable(*args, **kwargs):
        raise MemoryUnavailable("acc backend unavailable")

    monkeypatch.setattr(memory, "read", unavailable)
    monkeypatch.setattr(memory, "query", unavailable)
    data = client.get("/api/knowledge").json
    assert data["evidence"]["files"][0]["warnings"] == []
    assert data["evidence"]["files"][0]["l2"]["mapping"]  # local L2 remains usable
    assert data["facts"]["cap_table"]["warnings"]
    assert data["working_memory"]["warnings"]
    assert "暂不可读" in data["working_memory"]["warnings"][0]
    assert client.get("/knowledge").get_data(as_text=True) == client.get("/").get_data(as_text=True)


def test_knowledge_invalid_cap_chain_has_no_fabricated_snapshot(knowledge_env):
    client, _, _, memory = knowledge_env
    CapTableStore(memory).append_events(COMPANY, [CapTableEvent(
        company_id=COMPANY, effective_at="2026-01-01", event_type="buyback",
        holder_id="acc-founder", instrument="common", shares_delta=-1,
        ownership_basis="issued", source_refs=[{"file_hash": "acc-unknown", "anchor": {"page_no": 1}}],
    )])
    cap = client.get("/api/knowledge").json["facts"]["cap_table"]
    assert cap["snapshot"] is None and cap["warnings"]
    assert "回放校验失败" in cap["warnings"][0]


def test_knowledge_corrupt_runtime_is_reported_not_500(knowledge_env):
    client, _, _, memory = knowledge_env
    runtime = seed_runtime(memory)
    memory.put(runtime._state_uri("acc-session", "acc-task"), "[]")
    data = client.get("/api/knowledge").json
    assert data["working_memory"]["items"] == []
    assert data["working_memory"]["warnings"]
    assert client.get("/knowledge").status_code == 200


def test_knowledge_requires_host_company_scope(knowledge_env, monkeypatch):
    client, _, _, _ = knowledge_env
    monkeypatch.delenv("SAM_COMPANY_ID")
    assert client.get(f"/api/knowledge?company_id={COMPANY}").status_code == 503
    for path in ("/knowledge", "/knowledge/sources/unknown"):
        assert client.get(path + f"?company_id={COMPANY}").status_code == 200


def test_knowledge_preserves_source_map_corrections_and_missing_coordinates(knowledge_env):
    from app.storage.mapping_store import SourceMapService

    client, db, objects, _ = knowledge_env
    stored, _ = seed_file(knowledge_env)
    SourceMapService(db, objects).replace(
        file_hash=stored.file_hash, company_id=COMPANY,
        target_locator="page=2; locator=Sheet1!B3", replacement_text="acc 校正原文", confirm=True,
    )
    with connect(db) as conn:
        conn.execute("UPDATE facts SET source_page=NULL,source_span=NULL WHERE company_id=?", (COMPANY,))
        conn.commit()
    data = client.get("/api/knowledge").json
    assert "acc 校正原文" in data["evidence"]["files"][0]["l2"]["mapping"]
    ref = data["facts"]["groups"][0]["facts"][0]["source_ref"]
    assert ref["page"] is None and ref["locator"] is None
    assert "原文定位字段未提供" in client.get("/knowledge").get_data(as_text=True)
    assert client.get(ref["url"]).status_code == 200


def test_knowledge_json_unchanged_with_persisted_mapping(knowledge_env):
    from app.storage.mapping_store import SourceMapService
    client, db, objects, _ = knowledge_env
    stored, _ = seed_file(knowledge_env)
    service = SourceMapService(db, objects)
    path = service.map_path(stored.file_hash)
    assert not path.exists()
    before = client.get("/api/knowledge").get_json()
    service.rebuild_map(file_hash=stored.file_hash)
    assert client.get("/api/knowledge").get_json() == before
    assert set(before["evidence"]["files"][0]) >= {"l0", "l1", "l2"}
    service.replace(file_hash=stored.file_hash, company_id=COMPANY,
                    target_locator="page=2; locator=Sheet1!B3", replacement_text="acc 修订", confirm=True)
    corrected = client.get("/api/knowledge").get_json()
    path.unlink()
    assert client.get("/api/knowledge").get_json() == corrected


def test_drive_projects_only_persisted_file_metadata(knowledge_env):
    client, db, _, memory = knowledge_env
    with connect(db) as conn:
        conn.execute("INSERT INTO modules(code,name) VALUES ('acc-category','acc 文件分类')")
        conn.commit()
    stored, _ = seed_file(knowledge_env, module="acc-category")
    before = snapshot(db, memory)
    file = client.get('/api/knowledge').json['evidence']['files'][0]
    assert file['size_bytes'] == len(b'acc-source')
    assert file['mime_type'] == stored.mime_type
    assert file['origin_zone'] == stored.origin_zone
    assert file['uploaded_at'] == stored.uploaded_at
    assert file['category'] == 'acc-category'
    assert file['label'] == 'acc 文件分类'
    assert snapshot(db, memory) == before


def test_original_download_is_scoped_authenticated_and_read_only(knowledge_env, monkeypatch):
    client, db, objects, memory = knowledge_env
    stored, _ = seed_file(knowledge_env)
    other, _ = seed_file(knowledge_env, company=OTHER, content=b'acc-other-private')
    before = snapshot(db, memory)
    url = f'/api/knowledge/sources/{stored.file_hash}/original'
    response = client.get(url)
    assert response.status_code == 200
    assert response.data == b'acc-source'
    assert response.headers['Content-Disposition'].startswith('attachment;')
    assert response.headers['X-Content-Type-Options'] == 'nosniff'
    assert response.headers['Cache-Control'] == 'no-store'
    assert client.get(f'/api/knowledge/sources/{other.file_hash}/original?company_id={OTHER}').status_code == 404
    assert client.get('/api/knowledge/sources/unknown/original').status_code == 404
    assert client.post(url).status_code == 405
    monkeypatch.setenv('SAM_VIEW_USER', 'acc-viewer')
    monkeypatch.setenv('SAM_VIEW_PASS', 'acc-password')
    assert client.get(url).status_code == 401
    assert client.get(url, headers=basic_auth('acc-viewer', 'wrong')).status_code == 401
    assert client.get(url, headers=basic_auth('acc-viewer', 'acc-password')).status_code == 200
    monkeypatch.delenv('SAM_VIEW_USER')
    monkeypatch.delenv('SAM_VIEW_PASS')
    ArchiveFileStore(objects, db).path_for(stored.file_hash).unlink()
    assert client.get(url).status_code == 404
    assert snapshot(db, memory) == before


def test_knowledge_source_never_reads_remote_manifest_or_summaries(knowledge_env, monkeypatch):
    from app.knowledge import KnowledgeService
    _, db, objects, memory = knowledge_env
    stored, manifest = seed_file(knowledge_env)

    def forbidden(*_args, **_kwargs):
        pytest.fail("2A source read touched OV")

    monkeypatch.setattr(memory, "read", forbidden)
    monkeypatch.setattr(memory, "query", forbidden)
    source = KnowledgeService(db, memory, objects_path=objects).source(
        company_id=COMPANY, file_hash=stored.file_hash,
    )
    assert source["l0"]["content"] is None
    assert source["l1"]["content"] is None
    assert source["l2"]["manifest_uri"] is None
    assert manifest["pages"][0]["text_items"][0]["text"] in source["l2"]["mapping"]
