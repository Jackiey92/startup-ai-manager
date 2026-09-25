"""Canonical 2b fact records.

Facts are derived, verified outputs.  L2 source references are mandatory so
every value can be traced back to an original extraction document and anchor.
"""
from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Any
import uuid


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass(frozen=True)
class SourceRef:
    l2_document_id: str
    anchor: dict[str, Any]
    file_hash: str

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class FactRecord:
    company_id: str
    entity_id: str
    fact_type: str
    value: Any
    unit: str | None = None
    currency: str | None = None
    period: str | None = None
    valid_from: str | None = None
    valid_to: str | None = None
    observed_at: str | None = None
    status: str = "verified"
    source_refs: list[SourceRef] = field(default_factory=list)
    derived_from: list[str] = field(default_factory=list)
    method: str = "document-ingest"
    method_version: str = "1"
    supersedes: str | None = None
    revision: int = 1
    invariant_checks: list[dict[str, Any]] = field(default_factory=list)
    calculation_trace: dict[str, Any] = field(default_factory=dict)
    fact_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = field(default_factory=_now)
    updated_at: str = field(default_factory=_now)

    def validate(self) -> None:
        if self.status != "verified":
            raise ValueError("2b facts must have status=verified")
        if not self.company_id or not self.entity_id or not self.fact_type:
            raise ValueError("company_id, entity_id and fact_type are required")
        if not self.source_refs:
            raise ValueError("verified 2b facts require at least one source_ref")
        for ref in self.source_refs:
            if not ref.l2_document_id or not ref.file_hash or not ref.anchor:
                raise ValueError("source_ref requires l2_document_id, anchor and file_hash")

    @classmethod
    def from_dict(cls, payload: dict[str, Any]) -> "FactRecord":
        values = dict(payload)
        values["source_refs"] = [
            ref if isinstance(ref, SourceRef) else SourceRef(**ref)
            for ref in values.get("source_refs", [])
        ]
        record = cls(**values)
        record.validate()
        return record

    def to_dict(self) -> dict[str, Any]:
        self.validate()
        result = asdict(self)
        result["source_refs"] = [ref.to_dict() for ref in self.source_refs]
        return result
