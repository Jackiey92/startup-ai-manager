"""Knowledge UI/API are scoped read projections, never a promotion path."""
from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from urllib.parse import urlsplit, parse_qs

import pytest

from app.db.database import connect, init_db
from app.facts import ConsolidationService
from app.facts.cap_table import CapTableEvent, CapTableStore
from app.facts.extractor import ExtractedFact
from app.harness.staging import StagingStore
from app.memory.extraction import ExtractionMemoryService
from app.ports import LocalMemoryProvider, MemoryUnavailable
from app.runtime_memory import RuntimeWorkingMemory
from app.storage import SourceFileStore
from tests.test_frontend_pages import _webapp_module

COMPANY = "acc-knowledge"
OTHER = "acc-other"


@pytest.fixture
def knowledge_env(tmp_path, monkeypatch):
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


def seed_file(env, *, company=COMPANY, module="finance", content=b"acc-source"):
    _, db, objects, memory = env
    stored = SourceFileStore(objects, db).put_bytes(content, original_name="acc-report.xlsx")
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
    record = ExtractionMemoryService(memory).ingest(company, manifest, resource_folder="acc-test")
    memory.put(record.abstract_uri, "acc L0 摘要")
    memory.put(record.overview_uri, "acc L1 概览")
    ConsolidationService(db).consolidate_candidates([ExtractedFact(
        company_id=company, entity="acc-entity", metric="acc 属性", value="17",
        value_type="number", period="2026", unit=None, source_file=stored.file_hash,
        source_page=2, source_span="Sheet1!B3", confidence=1.0, critical=False,
    )])
    return stored, record


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
    assert 'class="nav-primary active" href="/knowledge"' in html
    for text in ("暂无原始证据", "暂无确认事实", "暂无已存股权事件链", "暂无当前公司", "只读"):
        assert text in html
    assert "data-upload-open" not in html and 'id="upload-modal"' not in html
    assert "data-todo-action" not in html and "data-file-confirm" not in html
    for path in ("/knowledge", "/api/knowledge", "/knowledge/sources/not-found"):
        assert client.post(path, json={"company_id": OTHER}).status_code == 405
    assert snapshot(db, memory) == before


def test_knowledge_three_layers_coordinates_and_links(knowledge_env):
    client, db, _, memory = knowledge_env
    stored, record = seed_file(knowledge_env)
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
    assert evidence["l0"]["content"] == "acc L0 摘要"
    assert evidence["l1"]["content"] == "acc L1 概览"
    assert evidence["l2"]["manifest_uri"] == record.l2_manifest_uri
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
    assert "knowledge-selected" in source_html and "Sheet1!B3" in source_html
    assert "<script>alert(1)</script>" not in source_html
    assert "&lt;script&gt;" in source_html
    cap = data["facts"]["cap_table"]
    assert cap["snapshot"]["total_issued"] == 100
    assert client.get(cap["events"][0]["provenance"][0]["source_ref"]["url"]).status_code == 200
    runtime = data["working_memory"]["items"][0]
    assert runtime["runtime"]["goal"] == "acc 目标"
    assert runtime["runtime"]["open_loops"] == [{"id": "open", "text": "acc 未闭环"}]
    assert runtime["runtime"]["working_notes"][0]["confidence"] == 0.73
    assert any(event["type"] == "open_loop_remove" for event in runtime["events"])
    html = client.get("/knowledge").get_data(as_text=True)
    for text in ("acc L0 摘要", "acc L1 概览", "acc 已闭环", "acc 未闭环", "acc 待核验结论", "0.73", "待固化候选", "到期时间", "100"):
        assert text in html
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
    assert client.get(f"/knowledge/sources/{foreign.file_hash}?company_id={OTHER}").status_code == 404
    assert client.get(f"/knowledge?company_id={OTHER}").status_code == 200


def test_knowledge_missing_summaries_and_unclassified_facts_are_explicit(knowledge_env):
    client, _, _, memory = knowledge_env
    stored, record = seed_file(knowledge_env, module=None)
    memory.delete(record.abstract_uri)
    memory.delete(record.overview_uri)
    data = client.get("/api/knowledge").json
    assert data["evidence"]["files"][0]["l0"]["content"] is None
    assert data["facts"]["groups"][0]["category"] is None
    assert data["facts"]["groups"][0]["label"] is None
    assert "未存分类" in client.get("/knowledge").get_data(as_text=True)
    assert "解析中/暂无摘要" in client.get("/knowledge").get_data(as_text=True)
    assert client.get(f"/knowledge/sources/{stored.file_hash}").status_code == 200


def test_knowledge_catalog_includes_unparsed_jobs_without_classification(knowledge_env):
    client, db, objects, _ = knowledge_env
    stored = SourceFileStore(objects, db).put_bytes(b"acc-pending", original_name="acc-pending.pdf")
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
    assert data["evidence"]["files"][0]["warnings"]
    assert data["evidence"]["files"][0]["l2"]["mapping"]  # local L2 remains usable
    assert data["facts"]["cap_table"]["warnings"]
    assert data["working_memory"]["warnings"]
    html = client.get("/knowledge").get_data(as_text=True)
    assert "暂不可读" in html
    assert "暂无已存股权事件链" not in html
    assert "暂无当前公司可读取" not in html


def test_knowledge_invalid_cap_chain_has_no_fabricated_snapshot(knowledge_env):
    client, _, _, memory = knowledge_env
    CapTableStore(memory).append_events(COMPANY, [CapTableEvent(
        company_id=COMPANY, effective_at="2026-01-01", event_type="buyback",
        holder_id="acc-founder", instrument="common", shares_delta=-1,
        ownership_basis="issued", source_refs=[{"file_hash": "acc-unknown", "anchor": {"page_no": 1}}],
    )])
    cap = client.get("/api/knowledge").json["facts"]["cap_table"]
    assert cap["snapshot"] is None and cap["warnings"]
    assert "回放校验失败" in client.get("/knowledge").get_data(as_text=True)


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
    for path in ("/knowledge", "/api/knowledge", "/knowledge/sources/unknown"):
        assert client.get(path + f"?company_id={COMPANY}").status_code == 503


def test_knowledge_preserves_source_map_corrections_and_missing_coordinates(knowledge_env):
    from app.source_map import SourceMapService

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
