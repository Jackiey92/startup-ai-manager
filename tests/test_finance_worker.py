from __future__ import annotations

from pathlib import Path

from app.db import init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.employees import EmployeeRunner
from app.facts import FactExtractionService
from app.harness.staging import StagingStore
from app.storage import SourceFileStore


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
    run = EntityBridgeService(db).run(company_id="acme", file_hash=stored.file_hash)
    return db, stored, run


class _FakeEmployee:
    def __init__(self, candidates):
        self.candidates = candidates
        self.calls = []

    def run(self, **kwargs):
        self.calls.append(kwargs)
        return self.candidates


def _candidate(metric="营业收入", value="3.26", unit="亿元", entity="主公司有限公司", period="2024", **extra):
    return {"metric": metric, "value": value, "unit": unit, "entity": entity,
            "period": period, "source_page": 1, "source_span": "page=1; locator=text/0",
            "quote": "主公司有限公司2024年度营业收入3.26亿元，净利润0.58亿元", **extra}


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


def test_worker_tampering_wrong_unit_entity_or_year_is_rejected(tmp_path: Path):
    for candidate in (
        _candidate(unit="万元"),
        _candidate(unit=None),
        _candidate(entity="其他公司有限公司"),
        _candidate(period="2023"),
        _candidate(value="9.99"),
    ):
        db, stored, bridge = _setup(tmp_path)
        fake = _FakeEmployee([candidate])
        run = FactExtractionService(db).extract(company_id="acme", file_hash=stored.file_hash,
                                                bridge_run_id=bridge["id"], use_worker=True, worker=fake)
        assert run["fact_count"] == 0
        assert FactExtractionService(db).list_facts(company_id="acme") == []


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
