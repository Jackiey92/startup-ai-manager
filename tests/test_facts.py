import json

import pytest

from app.facts import CapTableEvent, CapTableStore, FactDerivation, replay_cap_table
from app.ports import LocalMemoryProvider


def ref(name):
    return [{"l2_document_id": name, "anchor": {"page_no": 1, "bbox": [0, 0, 1, 1]}, "file_hash": "b" * 64}]


def event(company, kind, holder, delta, basis="issued", **kwargs):
    return CapTableEvent(
        company_id=company, effective_at=kwargs.pop("effective_at", "2026-01-01T00:00:00+00:00"),
        recorded_at=kwargs.pop("recorded_at", "2026-01-01T00:00:00+00:00"), event_type=kind,
        holder_id=holder, instrument=kwargs.pop("instrument", "common"), shares_delta=delta,
        ownership_basis=basis, source_refs=ref(holder), **kwargs,
    )


def test_cap_table_replay_separates_issued_and_fully_diluted():
    events = [
        event("acme", "founding_issuance", "founder", 1_000_000, shares_after=1_000_000),
        event("acme", "new_round", "investor", 250_000, effective_at="2026-02-01T00:00:00+00:00", price=2, valuation=2_500_000),
        event("acme", "option_grant", "option_pool", 100_000, basis="fully_diluted", effective_at="2026-03-01T00:00:00+00:00", instrument="option"),
    ]
    snapshot = replay_cap_table(events, company_id="acme", as_of="2026-04-01T00:00:00+00:00")
    assert snapshot["total_issued"] == 1_250_000
    assert snapshot["total_fully_diluted"] == 1_350_000
    assert snapshot["option_pool"] == 100_000
    assert snapshot["holders"]["founder"]["ownership_issued_pct"] == pytest.approx(80)
    assert snapshot["holders"]["founder"]["ownership_fully_diluted_pct"] == pytest.approx(100_000_000 / 1_350_000)


def test_cap_table_snapshot_rebuilds_from_immutable_events(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    store = CapTableStore(memory)
    events = [event("acme", "founding_issuance", "founder", 1000, shares_after=1000)]
    store.append_events("acme", events)
    first = store.rebuild_snapshot("acme")
    snapshot_uri = store._snapshot_uri("acme", None)
    memory._path(snapshot_uri).unlink()
    second = store.rebuild_snapshot("acme")
    assert first == second
    assert json.loads(memory.read(store._events_uri("acme")))["event_type"] == "founding_issuance"


def test_derivation_promotes_only_verified_source_backed_facts(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    service = FactDerivation(memory)
    manifest = {
        "source_id": "source-1", "file_hash": "c" * 64,
        "candidate_facts": [
            {"company_id": "acme", "entity_id": "acme", "fact_type": "cash", "value": 100, "status": "verified", "source_refs": ref("source-1")},
            {"company_id": "acme", "entity_id": "acme", "fact_type": "claim", "value": 1, "status": "claimed"},
        ],
    }
    facts = service.derive_manifest(manifest)
    assert len(facts) == 1
    written = service.promote(facts)
    assert len(written) == 1
    assert memory.query(prefix="viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/acme")
