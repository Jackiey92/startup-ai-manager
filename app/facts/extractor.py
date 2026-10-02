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
    MetricSpec("营业收入", ("营业收入", "销售收入", "营收", "收入")),
    MetricSpec("净利润", ("净利润", "利润总额")),
    MetricSpec("总资产", ("资产总额", "总资产")),
    MetricSpec("净资产", ("所有者权益合计", "股东权益合计", "净资产")),
    MetricSpec("毛利率", ("毛利率", "销售毛利率", "综合毛利率")),
    MetricSpec("净利率", ("净利率", "销售净利率", "净利润率")),
    MetricSpec("客户", ("前五大客户", "主要客户", "客户数量", "客户数", "客户")),
    MetricSpec("供应商", ("前五大供应商", "主要供应商", "供应商数量", "供应商数", "供应商")),
    MetricSpec("在手订单", ("在手订单金额", "在手订单", "现有订单")),
    MetricSpec("新签订单", ("新签订单金额", "新签订单", "新增订单")),
    MetricSpec("订单金额", ("订单总额", "订单金额", "订单额")),
    # Keep related labels together for review; matching remains deterministic
    # and chooses the longest matching alias when labels overlap.
    MetricSpec("研发人员占比", ("研发人员占比", "研发人员比例", "研发人员占员工比例")),
    MetricSpec("研发人员", ("研发人员数量", "研发人员人数", "研发人员数", "研发人员")),
    MetricSpec("员工人数", ("员工人数", "员工总数", "员工数量", "人员总数", "人员数量", "在职员工")),
    MetricSpec("重大合同", ("重大合同金额", "重大合同")),
    MetricSpec("中标", ("中标金额", "中标项目数", "中标数量", "中标")),
    MetricSpec("合同", ("合同金额", "合同总额", "合同数量", "合同")),
    MetricSpec("产能", ("设计产能", "现有产能", "年产能", "产能")),
    MetricSpec("产量", ("生产量", "实际产量", "年产量", "产量")),
    MetricSpec("销量", ("销售量", "销售数量", "年销量", "销量")),
    MetricSpec("研发费用率", ("研发费用率", "研发费率", "研发投入占比")),
    MetricSpec("研发投入", ("研发投入金额", "研发投入", "研发支出")),
    MetricSpec("研发费用", ("研发费用", "研发经费")),
    MetricSpec("发明专利", ("发明专利数量", "发明专利数", "发明专利")),
    MetricSpec("软件著作权", ("软件著作权数量", "软件著作权数", "计算机软件著作权", "软著数量")),
    MetricSpec("专利", ("专利数量", "专利总数", "授权专利", "专利")),
    MetricSpec("重大诉讼", ("重大诉讼案件数", "重大诉讼金额", "重大诉讼", "重大仲裁"), critical=True),
    MetricSpec("对外担保", ("对外担保余额", "对外担保金额", "对外担保"), critical=True),
    MetricSpec("抵押质押", ("抵押质押金额", "抵押及质押", "抵押担保", "质押担保", "抵押质押"), critical=True),
    MetricSpec("风险", ("重大风险", "风险事项", "风险"), critical=True),
    MetricSpec("注册资本", ("注册资本",), critical=True),
    MetricSpec("实收资本", ("实收资本", "实缴资本"), critical=True),
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
    review_reason: str | None = None

    @property
    def coordinate(self) -> tuple[str, str, str]:
        return self.company_id, self.metric, self.period


def _match_metric(label: Any) -> MetricSpec | None:
    text = str(label).strip()
    if not text:
        return None
    # Prefer the most specific alias.  This keeps additive aliases such as
    # ``净利润率`` from being captured by the pre-existing ``净利润`` prefix.
    matches = [
        (len(alias), spec)
        for spec in METRICS
        for alias in spec.aliases
        if alias in text
    ]
    return max(matches, key=lambda item: item[0])[1] if matches else None


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


def _block_value(value: Any) -> tuple[str, str, str | None] | None:
    """L1 value parser: split supported Chinese currency units, never convert."""
    if value is None:
        return None
    literal = str(value).strip()
    match = re.fullmatch(r"(?P<number>-?[0-9][0-9,]*(?:\.[0-9]+)?)(?P<unit>亿元|万元|元|%)?", literal)
    if match is None:
        return literal, "string", None
    number = match.group("number")
    try:
        Decimal(number.replace(",", ""))
    except InvalidOperation:
        return literal, "string", match.group("unit")
    return number, "number", match.group("unit")


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


# Free text remains deliberately numeric-only.  Structured table cells may
# safely carry names or descriptions (for example a major-customer company
# name or a risk item), but extracting those unbounded values from prose would
# swallow surrounding sentences.  Customer/supplier/contract/patent/risk
# prose is therefore supported only when a numeric amount/count/rate follows
# one of these explicit labels; descriptive values require a table row.
_TEXT_LABELS = tuple(dict.fromkeys(
    alias for spec in METRICS for alias in spec.aliases
    if alias not in {"客户", "主要客户", "前五大客户", "供应商", "主要供应商", "前五大供应商",
                     "合同", "重大合同", "中标", "专利", "发明专利", "软件著作权",
                     "风险", "重大风险", "风险事项", "重大诉讼", "重大仲裁",
                     "对外担保", "抵押及质押", "抵押担保", "质押担保", "抵押质押"}
))
_TEXT_VALUE = re.compile(
    rf"(?P<label>{'|'.join(map(re.escape, sorted(_TEXT_LABELS, key=len, reverse=True)))})"
    r"\s*(?:为|：|:)?\s*(?P<value>-?[0-9][0-9,]*(?:\.[0-9]+)?(?:亿元|万元|元|%)?)"
)


def extract_block_facts(block: dict[str, Any], *, company_id: str, period: str = "unspecified") -> list[ExtractedFact]:
    """Extract numeric candidates from one self-attributed bridge block.

    The bridge has already filtered ownership.  This parser only recognizes
    dictionary labels and preserves the literal value; it never converts
    units or consults a model.
    """
    text = str(block.get("content") or "")
    aliases = sorted(
        (alias for spec in METRICS for alias in spec.aliases), key=len, reverse=True
    )
    if not text or not aliases:
        return []
    pattern = re.compile(
        rf"(?P<label>{'|'.join(map(re.escape, aliases))})"
        r"\s*(?:为|是|：|:|=|/|=>)?\s*"
        r"(?P<value>-?[0-9][0-9,]*(?:\.[0-9]+)?(?:亿元|万元|元|%)?)"
    )
    file_hash = str(block.get("file_hash") or "")
    results: list[ExtractedFact] = []
    span = block.get("source_span")
    content_review = any(cue in text for cue in ("观点", "计划", "预计", "拟", "可能", "目标"))
    review_reason = "uncertain" if content_review or not block.get("source_page") or not span or "locator=missing" in str(span) else None
    for match in pattern.finditer(text):
        spec = _match_metric(match.group("label"))
        parsed = _block_value(match.group("value"))
        if spec is None or parsed is None:
            continue
        value, value_type, unit = parsed
        results.append(ExtractedFact(
            company_id=company_id, metric=spec.metric, period=period, value=value,
            value_type=value_type, unit=unit, source_file=file_hash,
            source_page=block.get("source_page"), source_span=span,
            confidence=1.0, critical=spec.critical, review_reason=review_reason,
        ))
    unique: dict[tuple[str, str, str, str], ExtractedFact] = {}
    for fact in results:
        unique.setdefault((*fact.coordinate, fact.value), fact)
    return list(unique.values())


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
