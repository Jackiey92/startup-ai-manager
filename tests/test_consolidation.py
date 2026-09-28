from __future__ import annotations

from pathlib import Path
import pytest

from app.db.database import init_db
from app.facts import ConsolidationService, extract_facts
from app.storage import SourceFileStore


def _manifest(file_hash: str, *rows: tuple[str, object]) -> dict:
    return {
        "file_hash": file_hash,
        "filename": "annual-report.xlsx",
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


@pytest.fixture
def pipeline(tmp_path: Path):
    db_path = tmp_path / "app.db"
    init_db(db_path)
    store = SourceFileStore(tmp_path / "objects", db_path)
    return store, ConsolidationService(db_path), db_path


def _stored_manifest(store: SourceFileStore, name: str, payload: bytes, *rows: tuple[str, object]):
    stored = store.put_bytes(payload, original_name=name)
    return stored, _manifest(stored.file_hash, *rows)


def test_extractor_is_deterministic_and_keeps_coordinate_and_locator(pipeline) -> None:
    store, _, _ = pipeline
    stored, manifest = _stored_manifest(
        store, "错名客户名单.xlsx", b"annual-a",
        ("营业收入", 12345.67), ("净利润", 3000), ("毛利率", 0.514),
    )
    first = extract_facts(manifest, company_id="acme")
    second = extract_facts(manifest, company_id="acme")
    assert first == second
    assert [(item.company_id, item.metric, item.period, item.value) for item in first] == [
        ("acme", "营业收入", "unspecified", "12345.67"),
        ("acme", "净利润", "unspecified", "3000"),
        ("acme", "毛利率", "unspecified", "0.514"),
    ]
    assert all(item.source_file == stored.file_hash and item.source_span for item in first)


def test_ordinary_auto_verify_idempotency_conflict_and_manual_resolution(pipeline) -> None:
    store, service, _ = pipeline
    _, a = _stored_manifest(store, "年报A.xlsx", b"annual-a", ("营业收入", 12345.67), ("净利润", 3000), ("毛利率", 0.514))
    _, b = _stored_manifest(store, "年报B.xlsx", b"annual-b", ("营业收入", 98765.43), ("净利润", 1200), ("毛利率", 0.082))
    first = service.consolidate_manifest(a, company_id="acme")
    assert len(first.verified_fact_ids) == 3 and not first.todo_ids
    assert len(service.list_facts(company_id="acme")) == 3
    repeat = service.consolidate_manifest(a, company_id="acme")
    assert not repeat.verified_fact_ids and len(repeat.duplicate_fact_ids) == 3
    conflict = service.consolidate_manifest(b, company_id="acme")
    assert len(conflict.todo_ids) == 3
    current = service.list_facts(company_id="acme")
    assert any(f["attribute"] == "营业收入" and f["value"] == "12345.67" for f in current)
    todos = service.list_todos(company_id="acme")
    revenue_todo = next(item for item in todos if item["metric"] == "营业收入")
    assert revenue_todo["reason"] == "conflict" and revenue_todo["suggestion"]
    resolved = service.resolve(revenue_todo["id"], choose="candidate")
    assert resolved["status"] == "resolved"
    # Candidate confirmation applies the complete conflicting evidence bundle
    # from the same uploaded source, never a partial document overwrite.
    assert len(resolved["resolved_ids"]) == 3
    assert all(todo["status"] == "resolved" for todo in service.list_todos(company_id="acme", status=None))
    facts = service.list_facts(company_id="acme")
    assert any(f["attribute"] == "营业收入" and f["value"] == "98765.43" for f in facts)
    assert not any(f["attribute"] == "营业收入" and f["value"] == "12345.67" for f in facts)


def test_critical_first_occurrence_requires_todo_and_unrelated_note_is_empty(pipeline) -> None:
    store, service, _ = pipeline
    _, critical = _stored_manifest(store, "注册信息.xlsx", b"critical", ("注册资本", 5000000), ("融资金额", 10000000))
    _, note = _stored_manifest(store, "便签.xlsx", b"note", ("今天天气不错",), ("下周计划",))
    critical_result = service.consolidate_manifest(critical, company_id="acme")
    assert not critical_result.verified_fact_ids and len(critical_result.todo_ids) == 2
    assert {item["reason"] for item in service.list_todos(company_id="acme")} == {"critical_review"}
    empty = service.consolidate_manifest(note, company_id="acme")
    assert not empty.verified_fact_ids and not empty.todo_ids


def test_authorizer_is_an_injectable_future_gate(pipeline) -> None:
    store, _, db_path = pipeline
    _, critical = _stored_manifest(store, "注册信息.xlsx", b"critical", ("注册资本", 5000000))
    service = ConsolidationService(db_path, authorizer=lambda _todo, _action: (_ for _ in ()).throw(PermissionError()))
    todo_id = service.consolidate_manifest(critical, company_id="acme").todo_ids[0]
    with pytest.raises(PermissionError):
        service.resolve(todo_id, choose="candidate")


def test_dismiss_leaves_current_fact_unchanged_without_first_release_auth(pipeline) -> None:
    store, service, _ = pipeline
    _, a = _stored_manifest(store, "年报A.xlsx", b"annual-a", ("营业收入", 10))
    _, b = _stored_manifest(store, "年报B.xlsx", b"annual-b", ("营业收入", 20))
    service.consolidate_manifest(a, company_id="acme")
    todo_id = service.consolidate_manifest(b, company_id="acme").todo_ids[0]
    assert service.dismiss(todo_id)["status"] == "dismissed"
    facts = service.list_facts(company_id="acme")
    assert [(fact["attribute"], fact["value"]) for fact in facts] == [("营业收入", "10")]
