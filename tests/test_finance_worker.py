from __future__ import annotations

import json
from pathlib import Path
from threading import Event

import pytest

from app.db import connect, init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.employees import EmployeeRunner, WorkerUnavailable
from app.facts import FactExtractionService
from app.facts.l1 import normalize_finance_text
from app.facts.verifier import verify_candidate
from app.harness.staging import StagingStore
from app.storage import SourceFileStore
from tests.entity_employee import FixtureEntityEmployee


def _setup(tmp_path: Path):
    db = tmp_path / "app.db"
    init_db(db)
    store = SourceFileStore(tmp_path / "objects", db)
    stored = store.put_bytes(b"worker", original_name="年报.xlsx")
    StagingStore(db).save_manifest({
        "file_hash": stored.file_hash, "filename": "年报.xlsx", "format": "xlsx",
        "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": [{
            "text": "主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元",
            "source_loc": {"locator": "text/0"},
        }], "tables": []}],
    })
    EntityRosterService(db).declare(company_id="acme", entity_name="主公司有限公司")
    run = EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="acme", file_hash=stored.file_hash)
    return db, stored, run


class _FakeEmployee:
    def __init__(self, candidates):
        self.candidates = candidates
        self.calls = []

    def run(self, **kwargs):
        self.calls.append(kwargs)
        return self.candidates


def test_finance_worker_receives_upstream_entity_attribution(tmp_path: Path):
    db, stored, bridge = _setup(tmp_path)
    fake = _FakeEmployee([_candidate()])
    FactExtractionService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
        use_worker=True, worker=fake,
    )
    payload = json.loads(fake.calls[0]["text"])
    assert payload["source_block"].startswith("主公司有限公司2024年度营业收入")
    assert payload["attribution"] == {
        "classification": "self", "subject": "主公司有限公司", "relation": None,
    }


def _candidate(metric="营业收入", value="3.26", unit="亿元", entity="主公司有限公司", period="2024",
               quote="主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元", **extra):
    return {"metric": metric, "value": value, "unit": unit, "entity": entity,
            "period": period, "source_page": 1, "source_span": "page=1; locator=text/0",
            "quote": quote, **extra}


def test_worker_candidate_passes_only_after_exact_provenance_verification(tmp_path: Path):
    db, stored, bridge = _setup(tmp_path)
    fake = _FakeEmployee([_candidate(), _candidate(metric="净利润", value="0.58")])
    run = FactExtractionService(db).extract(company_id="acme", file_hash=stored.file_hash,
                                            bridge_run_id=bridge["id"], use_worker=True, worker=fake)
    facts = FactExtractionService(db).list_facts(company_id="acme")
    assert run["fact_count"] == 2
    assert {(fact["attribute"], fact["value"], fact["period"]) for fact in facts} == {
        ("营业收入", "3.26", "2024"), ("净利润", "0.58", "2024")
    }
    assert all(fact["entity"] == "主公司有限公司" for fact in facts)
    assert fake.calls[0]["company_id"] == "acme"


def test_spaced_mineru_digits_are_normalized_before_worker_verification(tmp_path: Path):
    db, stored, bridge = _setup(tmp_path)
    spaced = "主公司有限公司 2 0 2 4 年度 营业收入 3 . 2 6 亿元，净利润 0 . 5 8 亿元，毛利率 3 1 . 5 0 %"
    with connect(db) as conn:
        conn.execute("UPDATE entity_bridge_blocks SET content=? WHERE run_id=?", (spaced, bridge["id"]))
        conn.commit()
    normalized = normalize_finance_text(spaced)
    assert "营业收入3.26亿元" in normalized and "毛利率31.50%" in normalized
    candidates = [
        _candidate(metric="营业收入", value="3.26", unit="亿元", quote="主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元，毛利率31.50%"),
        _candidate(metric="净利润", value="0.58", unit="亿元", quote="主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元，毛利率31.50%"),
        _candidate(metric="毛利率", value="31.50", unit="%", quote="主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元，毛利率31.50%"),
    ]
    run = FactExtractionService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
        use_worker=True, worker=_FakeEmployee(candidates),
    )
    assert run["fact_count"] == 3


def test_worker_human_quote_without_machine_coordinates_is_backfilled(tmp_path: Path):
    db, stored, bridge = _setup(tmp_path)
    candidate = _candidate(
        period="2024年度",
        quote="主公司有限公司 2024年度 营业收入3.26亿元，净利润0.58亿元",
    )
    candidate["source_page"] = 999
    candidate["source_span"] = "employee-invented-coordinate"
    run = FactExtractionService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
        use_worker=True, worker=_FakeEmployee([candidate]),
    )
    fact = FactExtractionService(db).list_facts(company_id="acme")[0]
    assert run["fact_count"] == 1
    assert (fact["period"], fact["source_page"], fact["source_span"]) == (
        "2024年度", 1, "page=1; locator=text/0",
    )


def test_verifier_does_not_rejudge_employee_metadata_when_quote_is_in_block():
    block = {
        "content": "主公司有限公司2024年度营业收入3.26亿元",
        "subject": "主公司有限公司",
        "file_hash": "f" * 64,
        "source_page": 1,
        "source_span": "page=1; locator=text/0",
    }
    fact = verify_candidate({
        "metric": "模型自定义收入口径",
        "value": "任意保留值",
        "unit": "自定义单位",
        "entity": "员工判断主体",
        "period": "2025年报告期",
        "quote": "主公司有限公司2024年度营业收入3.26亿元",
    }, [block], company_id="acme")
    assert fact is not None
    assert (fact.metric, fact.value, fact.unit, fact.entity, fact.period) == (
        "模型自定义收入口径", "任意保留值", "自定义单位", "员工判断主体", "2025年报告期",
    )


def test_verifier_rejects_quote_tampering_and_emits_unresolved(tmp_path: Path):
    db, stored, bridge = _setup(tmp_path)
    run = FactExtractionService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
        use_worker=True, worker=_FakeEmployee([_candidate(quote="完全不在原文中的片段")]),
    )
    assert run["fact_count"] == 0
    assert run["unresolved"] and run["unresolved_handoff"]["count"] == 1
    assert run["unresolved"][0]["source"]["span"] == "page=1; locator=text/0"
    assert FactExtractionService(db).list_facts(company_id="acme") == []


def test_docx_emits_unresolved_when_employee_candidates_fail_verification(tmp_path: Path):
    db = tmp_path / "app.db"
    init_db(db)
    store = SourceFileStore(tmp_path / "objects", db)
    stored = store.put_bytes(b"docx-worker", original_name="年报.docx")
    text = "主公司有限公司2024年度营业收入3.26亿元"
    StagingStore(db).save_manifest({
        "file_hash": stored.file_hash, "filename": stored.original_name, "format": "docx",
        "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": [{
            "text": text, "source_loc": {"locator": "text/0"},
        }], "tables": []}],
    })
    EntityRosterService(db).declare(company_id="acme", entity_name="主公司有限公司")
    bridge = EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="acme", file_hash=stored.file_hash)
    invalid = _candidate(quote="模型臆造的引用")
    run = FactExtractionService(db).extract(
        company_id="acme", file_hash=stored.file_hash, bridge_run_id=bridge["id"],
        use_worker=True, worker=_FakeEmployee([invalid]),
    )
    assert run["fact_count"] == 0
    assert run["unresolved"][0]["reason"] == "employee_candidates_unverified"
    assert run["unresolved"][0]["source"] == {
        "file_hash": stored.file_hash,
        "page": 1,
        "span": "page=1; locator=text/0",
        "text": text,
        "entity": "主公司有限公司",
        "classification": "self",
    }
    handoff = tmp_path / "runtime_outbox" / "unresolved" / "finance_analyst" / f"{stored.file_hash}.json"
    assert handoff.exists()


def test_worker_keeps_parent_and_subsidiary_entities_separate(tmp_path: Path):
    db, parent, parent_bridge = _setup(tmp_path)
    child_text = "主公司有限公司全资子公司常州未蓝新能源有限公司收入0.92亿元"
    store = SourceFileStore(tmp_path / "objects", db)
    child = store.put_bytes(b"child-worker", original_name="子公司.xlsx")
    StagingStore(db).save_manifest({
        "file_hash": child.file_hash, "filename": "子公司.xlsx", "format": "xlsx",
        "parse_summary": {"status": "parsed"},
        "pages": [{"page_no": 1, "text_items": [{
            "text": child_text, "source_loc": {"locator": "text/0"},
        }], "tables": []}],
    })
    child_bridge = EntityBridgeService(db, employee=FixtureEntityEmployee()).run(company_id="acme", file_hash=child.file_hash)

    class _RoutedEmployee:
        def run(self, **kwargs):
            if "子公司" in kwargs["text"]:
                return [_candidate(value="0.92", entity="常州未蓝新能源有限公司", period="unspecified", quote=child_text)]
            return [_candidate()]

    service = FactExtractionService(db)
    parent_run = service.extract(company_id="acme", file_hash=parent.file_hash,
                                 bridge_run_id=parent_bridge["id"], use_worker=True,
                                 worker=_RoutedEmployee())
    child_run = service.extract(company_id="acme", file_hash=child.file_hash,
                                bridge_run_id=child_bridge["id"], use_worker=True,
                                worker=_RoutedEmployee())
    assert parent_run["fact_count"] == child_run["fact_count"] == 1
    facts = service.list_facts(company_id="acme")
    assert {(item["entity"], item["value"], item["period"]) for item in facts} == {
        ("主公司有限公司", "3.26", "2024"),
        ("常州未蓝新能源有限公司", "0.92", "unspecified"),
    }
    assert service.list_todos(company_id="acme") == []


def test_employee_runner_injected_scope_isolated_and_skill_loaded(tmp_path: Path):
    seen = []
    runner = EmployeeRunner(
        config=__import__("app.runtime_config", fromlist=["RuntimeConfig"]).RuntimeConfig.from_env(),
        runner=lambda **kwargs: seen.append(kwargs) or {"candidates": []},
    )
    runner.run(skill="finance-fact-extraction", text="x", company_id="acc-one", thread_id="t1")
    runner.run(skill="finance-fact-extraction", text="y", company_id="acc-two", thread_id="t2")
    assert [(item["scope"]["company_id"], item["scope"]["thread_id"]) for item in seen] == [("acc-one", "t1"), ("acc-two", "t2")]
    assert all(item["skill_text"] for item in seen)


def test_employee_runner_unwraps_openclaw_payload_envelope():
    first = _candidate()
    second = _candidate(metric="净利润", value="0.58")
    runner = EmployeeRunner(runner=lambda **_kwargs: {
        "status": "ok",
        "result": {"payloads": [
            {"text": json.dumps({"candidates": [first]}, ensure_ascii=False)},
            {"text": json.dumps([second], ensure_ascii=False)},
        ]},
    })
    assert runner.run(
        skill="finance-fact-extraction", text="block", company_id="acme",
    ) == [first, second]
    direct = EmployeeRunner(runner=lambda **_kwargs: [first])
    assert direct.run(
        skill="finance-fact-extraction", text="block", company_id="acme",
    ) == [first]


@pytest.mark.parametrize("raw_factory", [
    lambda candidate: {"payloads": [{"text": json.dumps({"candidates": [candidate]}, ensure_ascii=False)}]},
    lambda candidate: {"result": {"content": [{"type": "text", "text": json.dumps({"candidates": [candidate]}, ensure_ascii=False)}]}},
    lambda candidate: {"data": {"payload": json.dumps([candidate], ensure_ascii=False)}},
])
def test_employee_runner_unwraps_supported_openclaw_transport_variants(raw_factory):
    candidate = _candidate()
    runner = EmployeeRunner(runner=lambda **_: raw_factory(candidate))
    assert runner.run(
        skill="finance-fact-extraction", text="block", company_id="acme",
    ) == [candidate]


def test_employee_runner_accepts_bare_employee_decision_object():
    decision = {"module": "finance", "doc_type": "financial_statement", "reason": "source evidence"}
    runner = EmployeeRunner(runner=lambda **_: json.dumps(decision, ensure_ascii=False))
    assert runner.run(
        skill="document-classifier", text="block", company_id="acme",
    ) == [decision]


def test_employee_runner_rejects_unknown_transport_wrapper():
    runner = EmployeeRunner(
        runner=lambda **_: {"answer": {"candidates": [_candidate()]}}, retries=0,
    )
    with pytest.raises(WorkerUnavailable, match="invalid OpenClaw envelope"):
        runner.run(skill="finance-fact-extraction", text="block", company_id="acme")


@pytest.mark.parametrize("raw", [
    lambda candidate: "```json\n" + json.dumps({"candidates": [candidate]}, ensure_ascii=False) + "\n```",
    lambda candidate: json.dumps({"candidates": [candidate]}, ensure_ascii=False),
])
def test_employee_runner_accepts_bare_json_and_one_outer_json_fence(raw):
    candidate = _candidate()
    runner = EmployeeRunner(runner=lambda **_: raw(candidate))
    assert runner.run(
        skill="finance-fact-extraction", text="block", company_id="acme",
    ) == [candidate]


def test_employee_runner_preserves_outer_openclaw_envelope_with_inner_fenced_text():
    candidate = _candidate()
    inner = "```json\n" + json.dumps({"candidates": [candidate]}, ensure_ascii=False) + "\n```"
    raw = json.dumps({"status": "ok", "result": {"payloads": [{"text": inner}]}}, ensure_ascii=False)
    runner = EmployeeRunner(runner=lambda **_: raw)
    assert runner.run(
        skill="finance-fact-extraction", text="block", company_id="acme",
    ) == [candidate]


def test_employee_runner_rejects_invalid_json_after_fence_unwrap():
    runner = EmployeeRunner(runner=lambda **_: "```json\nnot-json\n```")
    with pytest.raises(WorkerUnavailable, match="invalid JSON"):
        runner.run(skill="finance-fact-extraction", text="block", company_id="acme")


def test_employee_runner_retries_transient_invalid_json_envelope_without_changing_request():
    candidate = _candidate()
    responses = iter([
        {"status": "ok", "result": {"payloads": [{"text": "not-json"}]}},
        "```json\n" + json.dumps({"candidates": [candidate]}, ensure_ascii=False) + "\n```",
    ])
    calls = []

    def flaky(**kwargs):
        calls.append(kwargs)
        return next(responses)

    runner = EmployeeRunner(runner=flaky)
    assert runner.run(
        skill="finance-fact-extraction", text="block", company_id="acme", thread_id="t1",
    ) == [candidate]
    assert len(calls) == 2
    assert [(call["text"], call["scope"]) for call in calls] == [
        ("block", {"company_id": "acme", "thread_id": "t1"}),
        ("block", {"company_id": "acme", "thread_id": "t1"}),
    ]


def test_employee_runner_bounds_invalid_envelope_retry():
    calls = []

    def always_bad(**kwargs):
        calls.append(kwargs)
        return {"status": "ok", "result": {"payloads": [{"text": "not-json"}]}}

    runner = EmployeeRunner(runner=always_bad, retries=1)
    with pytest.raises(WorkerUnavailable, match="invalid OpenClaw envelope"):
        runner.run(skill="finance-fact-extraction", text="block", company_id="acme")
    assert len(calls) == 2


@pytest.mark.parametrize("raw", [
    {"status": "ok", "result": {"payloads": []}},
    {"status": "ok", "result": {"payloads": [{"text": "not-json"}]}},
    {"status": "ok", "result": {"payloads": [{"missing": "text"}]}},
])
def test_employee_runner_rejects_bad_openclaw_envelopes(raw):
    runner = EmployeeRunner(runner=lambda **_kwargs: raw)
    with pytest.raises(WorkerUnavailable):
        runner.run(skill="finance-fact-extraction", text="block", company_id="acme")


def test_flask_internal_manager_entry_runs_in_process_and_rejects_external_scope(tmp_path: Path, monkeypatch):
    import webapp.app as webapp

    init_db(tmp_path / "app.db")
    monkeypatch.setattr(webapp, "MAIN_DB", tmp_path / "app.db")
    monkeypatch.setenv("SAM_COMPANY_ID", "host-company")
    seen = {}

    class _Service:
        def __init__(self, db):
            seen["db"] = db

        def extract(self, **kwargs):
            seen.update(kwargs)
            return {"status": "completed", "fact_count": 1}

    monkeypatch.setattr(webapp, "FactExtractionService", _Service)
    client = webapp.app.test_client()
    missing = client.post(
        "/api/internal/facts/extract", json={"file_hash": "hash"},
        environ_overrides={"REMOTE_ADDR": "127.0.0.1"},
    )
    assert missing.status_code == 403
    monkeypatch.setenv("SAM_INTERNAL_TOKEN", "test-internal-token")
    wrong = client.post(
        "/api/internal/facts/extract", json={"file_hash": "hash"},
        headers={"X-SAM-Internal-Token": "wrong"},
        environ_overrides={"REMOTE_ADDR": "127.0.0.1"},
    )
    assert wrong.status_code == 403
    response = client.post(
        "/api/internal/facts/extract",
        json={"file_hash": "hash", "bridge_run_id": 1, "company_id": "attacker"},
        headers={"X-SAM-Internal-Token": "test-internal-token"},
        environ_overrides={"REMOTE_ADDR": "127.0.0.1"},
    )
    assert response.status_code == 200
    assert seen["company_id"] == "host-company"
    assert seen["use_worker"] is True
    denied = client.post(
        "/api/internal/facts/extract", json={"file_hash": "hash"},
        headers={"X-SAM-Internal-Token": "test-internal-token"},
        environ_overrides={"REMOTE_ADDR": "10.0.0.8"},
    )
    assert denied.status_code == 403


def test_cli_worker_flag_cannot_bypass_resident_manager(monkeypatch, capsys):
    from scripts import sam

    monkeypatch.setattr(sam, "init_db", lambda: None)
    assert sam.main(["--company-id", "acme", "facts", "extract", "hash", "--use-worker"]) == 2
    assert "authenticated Flask internal endpoint" in capsys.readouterr().err


def test_upload_worker_automatically_runs_bridge_worker_verify_and_commit(tmp_path: Path, monkeypatch):
    import webapp.app as webapp

    db, stored, _old_bridge = _setup(tmp_path)
    with connect(db) as conn:
        staging_id = int(conn.execute(
            "SELECT id FROM parse_staging WHERE file_hash=? ORDER BY id DESC LIMIT 1",
            (stored.file_hash,),
        ).fetchone()["id"])
    fake = _FakeEmployee([_candidate(), _candidate(metric="净利润", value="0.58")])
    real_service = FactExtractionService

    class _InProcessFactService(real_service):
        def prepare(self, **kwargs):
            kwargs["worker"] = fake
            return super().prepare(**kwargs)

    class _Adapter:
        def run_parse(self, *_args, **_kwargs):
            return staging_id

    class _Classification:
        def classify_parsed(self, **_kwargs):
            return {"id": 1, "_created_for_parse": False}

    class _EntityEmployee:
        def attribute_block(self, **_kwargs):
            return {"label": "self", "subject": "主公司有限公司", "relation": None, "reason": "fixture"}

        def classify_document(self, **_kwargs):
            return {"folder": "财务"}

    class _Memory:
        def __init__(self, _provider):
            pass

        def ingest(self, *_args, **_kwargs):
            return None

    class _Map:
        def __init__(self, _provider):
            pass

        def rebuild_map(self, *_args, **_kwargs):
            return None

    monkeypatch.setattr(webapp, "MAIN_DB", db)
    monkeypatch.setattr(webapp, "_PARSE_ADAPTER", _Adapter())
    monkeypatch.setattr(webapp, "FactExtractionService", _InProcessFactService)
    monkeypatch.setattr(webapp, "classification_service", lambda: _Classification())
    monkeypatch.setattr(webapp, "semantic_employee", lambda: _EntityEmployee())
    monkeypatch.setattr(webapp, "ExtractionMemoryService", _Memory)
    monkeypatch.setattr(webapp, "MapBuilder", _Map)
    monkeypatch.setattr(webapp, "queue_import_guide", lambda *_args, **_kwargs: None)
    progress = []
    webapp._parse_job_worker(
        {"job_id": "automatic-1", "file_hash": stored.file_hash,
         "harness_format": "xlsx", "company_id": "acme"},
        lambda **item: progress.append(item), Event(),
    )
    facts = real_service(db).list_facts(company_id="acme")
    assert {(item["attribute"], item["value"], item["period"]) for item in facts} == {
        ("营业收入", "3.26", "2024"), ("净利润", "0.58", "2024"),
    }
    assert real_service(db).list_todos(company_id="acme") == []
    assert fake.calls and any(item.get("stage") == "consolidating" for item in progress)
