"""Source-provenance guard for employee-produced finance candidates."""
from __future__ import annotations

import re
from typing import Any

from .l2_fact_extractor import ExtractedFact


def _without_whitespace(value: Any) -> str:
    return re.sub(r"\s+", "", str(value or ""))


def verify_candidate(candidate: dict[str, Any], blocks: list[dict[str, Any]], *, company_id: str) -> ExtractedFact | None:
    """Accept only a candidate whose quote occurs in one source block.

    Metric meaning, entity ownership, period and unit are employee output, not
    verifier policy.  Rechecking them here duplicated R1 extraction rules and
    rejected valid model conclusions.  This layer only proves source
    provenance and backfills coordinates owned by the parsed block.
    """
    if not isinstance(candidate, dict):
        return None
    metric = str(candidate.get("metric") or "").strip()
    value = str(candidate.get("value") or "").strip()
    raw_unit = candidate.get("unit")
    unit = None if raw_unit is None else str(raw_unit)
    raw_period = candidate.get("period")
    period = "unspecified" if raw_period in (None, "") else str(raw_period).strip()
    entity = str(candidate.get("entity") or "").strip()
    quote = _without_whitespace(candidate.get("quote"))
    if not quote:
        return None
    for block in blocks:
        content = str(block.get("content") or "")
        if quote not in _without_whitespace(content):
            continue
        block_entity = str(block.get("subject") or "").strip()
        return ExtractedFact(
            company_id=company_id, entity=entity or block_entity or company_id,
            metric=metric, period=period, value=value,
            value_type=str(candidate.get("value_type") or "number"), unit=unit,
            source_file=str(block.get("file_hash") or ""), source_page=block.get("source_page"),
            source_span=block.get("source_span"), confidence=float(candidate.get("confidence") or 1.0),
            critical=bool(candidate.get("critical", False)),
            review_reason=(str(candidate["review_reason"]) if candidate.get("review_reason") else None),
        )
    return None


def verify_candidates(candidates: list[dict[str, Any]], blocks: list[dict[str, Any]], *, company_id: str) -> list[ExtractedFact]:
    accepted = []
    for candidate in candidates:
        fact = verify_candidate(candidate, blocks, company_id=company_id)
        if fact is not None:
            accepted.append(fact)
    return accepted
