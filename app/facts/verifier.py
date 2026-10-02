"""Backend provenance verifier for employee-produced finance candidates."""
from __future__ import annotations

import re
from typing import Any

from .extractor import METRICS, ExtractedFact


def _metric(name: Any):
    text = str(name or "").strip()
    matches = [(len(alias), spec) for spec in METRICS for alias in spec.aliases if alias in text]
    return max(matches, key=lambda item: item[0])[1] if matches else None


def verify_candidate(candidate: dict[str, Any], blocks: list[dict[str, Any]], *, company_id: str) -> ExtractedFact | None:
    """Accept only a candidate whose exact number/unit/subject/period is in a block."""
    spec = _metric(candidate.get("metric"))
    value = str(candidate.get("value") or "").strip()
    unit = candidate.get("unit")
    entity = str(candidate.get("entity") or "").strip()
    period = str(candidate.get("period") or "unspecified").strip()
    if spec is None or not value or not entity or (unit is not None and not isinstance(unit, str)):
        return None
    if unit not in {None, "元", "万元", "亿元", "%"}:
        return None
    if not candidate.get("source_span") or candidate.get("source_page") is None:
        return None
    if period != "unspecified" and not re.search(rf"(?<!\d){re.escape(period)}\s*(?:年|年度)", " ".join(str(b.get("content", "")) for b in blocks)):
        return None
    for block in blocks:
        content = str(block.get("content") or "")
        numeric = re.compile(rf"{re.escape(value)}(亿元|万元|元|%)?(?![0-9.])")
        if not any(match.group(1) == unit for match in numeric.finditer(content)):
            continue
        block_entity = str(block.get("subject") or company_id)
        if entity != block_entity:
            continue
        quote = candidate.get("quote")
        if quote and str(quote) not in content:
            continue
        if candidate["source_span"] != block.get("source_span"):
            continue
        if candidate.get("source_page") != block.get("source_page"):
            continue
        return ExtractedFact(
            company_id=company_id, entity=entity or block_entity, metric=spec.metric,
            period=period, value=value, value_type="number", unit=unit,
            source_file=str(block.get("file_hash") or ""), source_page=block.get("source_page"),
            source_span=block.get("source_span"), confidence=1.0, critical=spec.critical,
        )
    return None


def verify_candidates(candidates: list[dict[str, Any]], blocks: list[dict[str, Any]], *, company_id: str) -> list[ExtractedFact]:
    accepted = []
    for candidate in candidates:
        fact = verify_candidate(candidate, blocks, company_id=company_id)
        if fact is not None:
            accepted.append(fact)
    return accepted
