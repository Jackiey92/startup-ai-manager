"""Conservative 2a -> 2b fact promotion."""
from __future__ import annotations

from typing import Any, Iterable

from ..ports import MemoryProvider
from .schema import FactRecord


class FactDerivation:
    def __init__(self, memory: MemoryProvider, *, root: str = "viking://user/default/memories/projects/10_startup_ai_manager"):
        self.memory = memory
        self.root = root.rstrip("/")

    def derive_manifest(self, manifest: dict[str, Any]) -> list[FactRecord]:
        """Promote only explicitly verified, source-backed candidate facts."""
        candidates = manifest.get("candidate_facts", [])
        if isinstance(candidates, dict):
            candidates = list(candidates.values())
        results: list[FactRecord] = []
        for candidate in candidates:
            if not isinstance(candidate, dict) or candidate.get("status") != "verified":
                continue
            payload = dict(candidate)
            payload.setdefault("company_id", manifest.get("company_id", "default"))
            payload.setdefault("entity_id", manifest.get("source_id", "unknown"))
            payload.setdefault("source_refs", [{
                "l2_document_id": manifest.get("source_id", "unknown"),
                "anchor": candidate.get("anchor") or {"locator": "manifest.candidate_facts"},
                "file_hash": manifest["file_hash"],
            }])
            payload.setdefault("derived_from", [manifest.get("source_id", "unknown")])
            payload.setdefault("calculation_trace", {"input_l2": manifest.get("source_id"), "rule": "explicit_verified_candidate"})
            results.append(FactRecord.from_dict(payload))
        return results

    def promote(self, facts: Iterable[FactRecord]) -> list[str]:
        written: list[str] = []
        for fact in facts:
            fact.validate()
            key = f"{fact.entity_id}/{fact.fact_type}-{fact.fact_id}.json"
            self.memory.put(
                f"{self.root}/2b_facts/{fact.company_id}/{key}",
                __import__("json").dumps(fact.to_dict(), ensure_ascii=False, sort_keys=True),
                metadata={"layer": "2b", "status": "verified", "fact_type": fact.fact_type},
            )
            written.append(key)
        return written

    def rebuild(self, manifests: Iterable[dict[str, Any]]) -> list[str]:
        """Re-derive from 2a; callers may clear 2b before invoking this."""
        facts = [fact for manifest in manifests for fact in self.derive_manifest(manifest)]
        return self.promote(facts)
