"""Deterministic extraction of source-backed operating facts from L2 manifests."""
from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal, InvalidOperation
import re
from typing import Any, Iterable


@dataclass(frozen=True)
class MetricSpec:
    metric: str
    aliases: tuple[str, ...]
    critical: bool = False


# The dictionary is intentionally compact, reviewable, and content-only.  It
# may be extended without changing extraction flow.  ``critical`` is policy,
# not a confidence score: any match is routed to a human todo on first sight.
METRICS: tuple[MetricSpec, ...] = (
    MetricSpec("营业收入", ("营业收入", "营收", "销售收入")),
    MetricSpec("净利润", ("净利润", "利润总额")),
    MetricSpec("毛利率", ("毛利率",)),
    MetricSpec("注册资本", ("注册资本",), critical=True),
    MetricSpec("融资金额", ("融资金额", "融资额", "融资"), critical=True),
    MetricSpec("估值", ("估值", "投后估值", "投前估值"), critical=True),
    MetricSpec("股权比例", ("股权比例", "持股比例", "股份比例"), critical=True),
    MetricSpec("股东", ("股东", "股东名称"), critical=True),
    MetricSpec("大额资金", ("大额资金", "大额付款", "大额支出"), critical=True),
)


@dataclass(frozen=True)
class ExtractedFact:
    company_id: str
    metric: str
    period: str
    value: str
    value_type: str
    unit: str | None
    source_file: str
    source_page: int | None
    source_span: str | None
    confidence: float
    critical: bool

    @property
    def coordinate(self) -> tuple[str, str, str]:
        return self.company_id, self.metric, self.period


def _match_metric(label: Any) -> MetricSpec | None:
    text = str(label).strip()
    if not text:
        return None
    for spec in METRICS:
        if any(alias in text for alias in spec.aliases):
            return spec
    return None


def _value(value: Any) -> tuple[str, str, str | None] | None:
    if value is None:
        return None
    literal = str(value).strip()
    if not literal:
        return None
    unit = "%" if literal.endswith("%") else None
    candidate = literal[:-1].strip() if unit else literal.replace(",", "")
    try:
        Decimal(candidate)
    except InvalidOperation:
        return literal, "string", unit
    return literal, "number", unit


def _period(manifest: dict[str, Any]) -> str:
    explicit = manifest.get("period")
    if isinstance(explicit, str) and explicit.strip():
        return explicit.strip()
    # A year in the original filename is reliable enough as a deterministic
    # coordinate hint.  Otherwise retain an explicit stable default rather
    # than leaving the coordinate incomplete.
    filename = str(manifest.get("filename") or "")
    matched = re.search(r"((?:19|20)\d{2})(?:年度|年)?", filename)
    return matched.group(1) if matched else "unspecified"


def _page_rows(page: dict[str, Any]) -> Iterable[tuple[int, list[Any], dict[str, Any]]]:
    for table_index, table in enumerate(page.get("tables", []) or []):
        if not isinstance(table, dict):
            continue
        location = table.get("source_loc") if isinstance(table.get("source_loc"), dict) else {}
        headers = table.get("headers")
        if isinstance(headers, list):
            yield table_index, headers, location
        for row_index, row in enumerate(table.get("rows", []) or [], start=1):
            if isinstance(row, dict):
                yield table_index, list(row.items()), location | {"_row_index": row_index}
            elif isinstance(row, list):
                yield table_index, row, location | {"_row_index": row_index}


def _from_row(*, company_id: str, period: str, file_hash: str, page_no: int | None,
              values: list[Any], location: dict[str, Any], table_index: int) -> list[ExtractedFact]:
    results: list[ExtractedFact] = []
    # Normal L2 tables preserve label/value as adjacent cells.  Scan every
    # adjacent pair so the method also tolerates a wide table with several
    # metric/value pairs.
    for index in range(max(0, len(values) - 1)):
        label, raw = values[index], values[index + 1]
        if isinstance(label, tuple):  # dict row converted to (key, value)
            label, raw = label
        spec = _match_metric(label)
        parsed = _value(raw)
        if spec is None or parsed is None:
            continue
        value, value_type, unit = parsed
        row_index = location.get("_row_index")
        locator = location.get("locator") or f"table/{table_index}"
        span = f"{locator};row={row_index if row_index is not None else 0};col={index}"
        results.append(ExtractedFact(
            company_id=company_id, metric=spec.metric, period=period, value=value,
            value_type=value_type, unit=unit, source_file=file_hash,
            source_page=page_no or location.get("page_no"), source_span=span,
            confidence=1.0, critical=spec.critical,
        ))
    return results


_TEXT_VALUE = re.compile(
    r"(?P<label>营业收入|营收|销售收入|净利润|利润总额|毛利率|注册资本|融资金额|融资额|融资|估值|投后估值|投前估值|股权比例|持股比例|股份比例|大额资金|大额付款|大额支出)"
    r"\s*(?:为|：|:)?\s*(?P<value>-?[0-9][0-9,]*(?:\.[0-9]+)?%?)"
)


def _from_text(*, company_id: str, period: str, file_hash: str, page_no: int | None,
               text: str, location: dict[str, Any], text_index: int) -> list[ExtractedFact]:
    results: list[ExtractedFact] = []
    for match in _TEXT_VALUE.finditer(text):
        spec = _match_metric(match.group("label"))
        parsed = _value(match.group("value"))
        if spec is None or parsed is None:
            continue
        value, value_type, unit = parsed
        locator = location.get("locator") or f"text/{text_index}"
        results.append(ExtractedFact(
            company_id=company_id, metric=spec.metric, period=period, value=value,
            value_type=value_type, unit=unit, source_file=file_hash,
            source_page=page_no or location.get("page_no"), source_span=f"{locator};match={match.start()}",
            confidence=0.9, critical=spec.critical,
        ))
    return results


def extract_facts(manifest: dict[str, Any], *, company_id: str) -> list[ExtractedFact]:
    """Extract stable, deduplicated candidates from one parsed L2 manifest.

    No network, LLM, filename category, or mutable global state is consulted.
    Deduplication preserves the first source occurrence, which is deterministic
    because pages/tables/rows are read in their manifest order.
    """
    file_hash = str(manifest.get("file_hash") or "")
    if not file_hash:
        raise ValueError("manifest file_hash is required")
    period = _period(manifest)
    findings: list[ExtractedFact] = []
    for page in manifest.get("pages", []) or []:
        if not isinstance(page, dict):
            continue
        page_no = page.get("page_no")
        for table_index, row, location in _page_rows(page):
            findings.extend(_from_row(
                company_id=company_id, period=period, file_hash=file_hash, page_no=page_no,
                values=row, location=location, table_index=table_index,
            ))
        for text_index, item in enumerate(page.get("text_items", []) or []):
            if not isinstance(item, dict) or not isinstance(item.get("text"), str):
                continue
            location = item.get("source_loc") if isinstance(item.get("source_loc"), dict) else {}
            findings.extend(_from_text(
                company_id=company_id, period=period, file_hash=file_hash, page_no=page_no,
                text=item["text"], location=location, text_index=text_index,
            ))
    unique: dict[tuple[str, str, str, str], ExtractedFact] = {}
    for fact in findings:
        unique.setdefault((*fact.coordinate, fact.value), fact)
    return list(unique.values())
