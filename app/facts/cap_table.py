"""Deterministic cap-table event chain and replay."""
from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
import json
from typing import Any, Iterable
import uuid

from ..ports import MemoryProvider


EVENT_TYPES = {
    "founding_issuance", "transfer", "option_grant", "option_exercise",
    "cancellation", "new_round", "split", "buyback", "conversion", "correction",
}
BASIS = {"issued", "fully_diluted"}
ROOT = "viking://user/default/memories/projects/10_startup_ai_manager/2b_facts"


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class CapTableEvent:
    company_id: str
    effective_at: str
    event_type: str
    holder_id: str
    instrument: str
    shares_delta: float
    ownership_basis: str
    source_refs: list[dict[str, Any]]
    event_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    recorded_at: str = field(default_factory=_now)
    shares_after: float | None = None
    price: float | None = None
    currency: str | None = None
    valuation: float | None = None
    transaction_ref: str | None = None
    status: str = "verified"
    supersedes: str | None = None
    from_holder_id: str | None = None

    def validate(self) -> None:
        if self.event_type not in EVENT_TYPES:
            raise ValueError(f"unsupported cap table event type: {self.event_type}")
        if self.ownership_basis not in BASIS:
            raise ValueError("ownership_basis must be issued or fully_diluted")
        if self.status != "verified":
            raise ValueError("unverified events cannot enter the replay chain")
        if not self.company_id or not self.holder_id or not self.source_refs:
            raise ValueError("cap table events require company, holder and source_refs")

    def to_dict(self) -> dict[str, Any]:
        self.validate()
        return asdict(self)

    @classmethod
    def from_dict(cls, payload: dict[str, Any]) -> "CapTableEvent":
        event = cls(**payload)
        event.validate()
        return event


def _event_sort_key(event: CapTableEvent) -> tuple[str, str, str]:
    return event.effective_at, event.recorded_at, event.event_id


def replay_cap_table(events: Iterable[CapTableEvent], *, company_id: str, as_of: str | None = None) -> dict[str, Any]:
    selected: list[CapTableEvent] = []
    seen: set[str] = set()
    superseded: set[str] = set()
    all_events = list(events)
    for event in all_events:
        event.validate()
        if event.company_id != company_id:
            raise ValueError("event company_id does not match replay company")
        if event.event_id in seen:
            raise ValueError(f"duplicate event_id: {event.event_id}")
        seen.add(event.event_id)
        if event.supersedes:
            superseded.add(event.supersedes)
    for event in sorted(all_events, key=_event_sort_key):
        if event.event_id in superseded or (as_of and event.effective_at > as_of):
            continue
        selected.append(event)

    issued: dict[str, float] = {}
    diluted: dict[str, float] = {}
    option_pool = 0.0
    rounds: list[dict[str, Any]] = []
    trace: list[str] = []
    for event in selected:
        delta = float(event.shares_delta)
        if event.event_type == "option_grant":
            diluted[event.holder_id] = diluted.get(event.holder_id, 0.0) + delta
            option_pool += delta
        elif event.event_type == "option_exercise":
            issued[event.holder_id] = issued.get(event.holder_id, 0.0) + delta
            option_pool -= delta
        elif event.event_type == "transfer":
            issued[event.holder_id] = issued.get(event.holder_id, 0.0) + delta
            diluted[event.holder_id] = diluted.get(event.holder_id, 0.0) + delta
            if event.from_holder_id:
                issued[event.from_holder_id] = issued.get(event.from_holder_id, 0.0) - delta
                diluted[event.from_holder_id] = diluted.get(event.from_holder_id, 0.0) - delta
        else:
            issued[event.holder_id] = issued.get(event.holder_id, 0.0) + delta
            diluted[event.holder_id] = diluted.get(event.holder_id, 0.0) + delta
            if event.event_type == "new_round":
                rounds.append({"transaction_ref": event.transaction_ref, "holder_id": event.holder_id, "shares": delta, "valuation": event.valuation})
        if event.shares_after is not None:
            current = issued if event.ownership_basis == "issued" else diluted
            if abs(current.get(event.holder_id, 0.0) - float(event.shares_after)) > 1e-9:
                raise ValueError(f"shares_after invariant failed for {event.event_id}")
        if any(value < -1e-9 for value in (*issued.values(), *diluted.values())) or option_pool < -1e-9:
            raise ValueError(f"negative cap table balance after {event.event_id}")
        trace.append(event.event_id)

    total_issued = sum(issued.values())
    total_diluted = sum(diluted.values())
    if abs(total_diluted - total_issued - option_pool) > 1e-9:
        raise ValueError("issued and fully diluted totals are inconsistent")
    holders = {}
    for holder in sorted(set(issued) | set(diluted)):
        holders[holder] = {
            "issued": issued.get(holder, 0.0),
            "fully_diluted": diluted.get(holder, 0.0),
            "ownership_issued_pct": issued.get(holder, 0.0) / total_issued * 100 if total_issued else 0.0,
            "ownership_fully_diluted_pct": diluted.get(holder, 0.0) / total_diluted * 100 if total_diluted else 0.0,
        }
    return {
        "company_id": company_id,
        "as_of": as_of,
        "holders": holders,
        "total_issued": total_issued,
        "total_fully_diluted": total_diluted,
        "option_pool": option_pool,
        "rounds": rounds,
        "event_ids": trace,
        "invariant_checks": ["event_chain_replayed", "issued_total_equals_holder_sum", "fully_diluted_separate_from_issued"],
    }


class CapTableStore:
    def __init__(self, memory: MemoryProvider, *, root: str = ROOT):
        self.memory = memory
        self.root = root.rstrip("/")

    def _events_uri(self, company_id: str) -> str:
        return f"{self.root}/{company_id}/cap_table/events.jsonl"

    def _snapshot_uri(self, company_id: str, as_of: str | None) -> str:
        suffix = (as_of or "current").replace(":", "-")
        return f"{self.root}/{company_id}/cap_table/snapshot-{suffix}.json"

    def read_events(self, company_id: str) -> list[CapTableEvent]:
        try:
            content = self.memory.read(self._events_uri(company_id))
        except Exception:
            return []
        return [CapTableEvent.from_dict(json.loads(line)) for line in content.splitlines() if line.strip()]

    def append_events(self, company_id: str, events: Iterable[CapTableEvent]) -> None:
        current = self.read_events(company_id)
        current.extend(events)
        content = "\n".join(json.dumps(event.to_dict(), ensure_ascii=False, sort_keys=True) for event in current) + "\n"
        self.memory.put(self._events_uri(company_id), content, metadata={"layer": "2b", "type": "cap_table_events"})

    def rebuild_snapshot(self, company_id: str, *, as_of: str | None = None) -> dict[str, Any]:
        snapshot = replay_cap_table(self.read_events(company_id), company_id=company_id, as_of=as_of)
        self.memory.put(self._snapshot_uri(company_id, as_of), json.dumps(snapshot, ensure_ascii=False, sort_keys=True), metadata={"layer": "2b", "type": "cap_table_snapshot", "rebuildable": "true"})
        return snapshot
