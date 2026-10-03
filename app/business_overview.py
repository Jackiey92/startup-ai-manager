"""Deterministic, source-backed extraction for the business overview screen.

Only parsed L2 manifests are read here.  There is deliberately no model call,
filename classifier, or prototype default: a field without unambiguous source
evidence is ``None`` (or an empty list).
"""
from __future__ import annotations

from dataclasses import asdict, dataclass
import json
import re
import sqlite3
from typing import Any, Iterable

from .db.database import connect
from .ports import MemoryProvider, LocalMemoryProvider
from .memory_paths import MEMORY_ROOT


# The UI consumes this mapping; keeping it here prevents stage wording from
# becoming a second, implicit extraction rule.
TRL_STAGE_MAP: dict[int, str] = {
    1: "概念研究", 2: "技术验证", 3: "实验室验证", 4: "样机验证",
    5: "中试验证", 6: "工程化", 7: "量产导入", 8: "规模化交付",
    9: "成熟运营",
}


@dataclass(frozen=True)
class Evidence:
    value: Any
    source_file: str
    source_page: int | None
    source_locator: str | None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class ProductEvidence:
    product: Evidence
    stage: Evidence | None = None
    trl: Evidence | None = None
    target_customer: Evidence | None = None
    status: Evidence | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "product": self.product.to_dict(),
            "stage": self.stage.to_dict() if self.stage else None,
            "trl": self.trl.to_dict() if self.trl else None,
            "target_customer": self.target_customer.to_dict() if self.target_customer else None,
            "status": self.status.to_dict() if self.status else None,
        }


def _text(value: Any) -> str:
    return str(value).strip() if value is not None else ""


def _evidence(value: Any, *, manifest: dict[str, Any], page: dict[str, Any],
              location: dict[str, Any] | None = None) -> Evidence | None:
    text = _text(value)
    if not text:
        return None
    normalized: Any = value if isinstance(value, (int, float)) and not isinstance(value, bool) else text
    source_file = _text(
        manifest.get("original_name") or manifest.get("_source_file")
        or manifest.get("filename") or manifest.get("file_hash")
    )
    page_no = page.get("page_no")
    if page_no is None:
        page_no = page.get("page")
    loc = location or {}
    return Evidence(normalized, source_file, page_no, loc.get("locator"))


def _location(base: dict[str, Any], *, row: int | None = None, col: int | None = None) -> dict[str, Any]:
    result = dict(base)
    suffix = []
    if row is not None:
        suffix.append(f"row={row}")
    if col is not None:
        suffix.append(f"col={col}")
    if suffix:
        result["locator"] = f"{result.get('locator') or 'table'};{';'.join(suffix)}"
    return result


def _flatten_text(value: Any) -> str:
    if isinstance(value, dict):
        return " ".join(f"{_text(k)} {_text(v)}" for k, v in value.items())
    if isinstance(value, (list, tuple)):
        return " ".join(_text(v) for v in value)
    return _text(value)


def _is_label(value: Any, labels: tuple[str, ...]) -> bool:
    text = _text(value).lower().replace(" ", "")
    return any(label.lower().replace(" ", "") in text for label in labels)


def _pairs(row: Any) -> Iterable[tuple[Any, Any]]:
    if isinstance(row, dict):
        yield from row.items()
    elif isinstance(row, (list, tuple)):
        for index in range(0, len(row) - 1, 2):
            yield row[index], row[index + 1]


def _iter_tables(manifest: dict[str, Any]):
    for page in manifest.get("pages", []) or []:
        if not isinstance(page, dict):
            continue
        for table_index, table in enumerate(page.get("tables", []) or []):
            if not isinstance(table, dict):
                continue
            location = table.get("source_loc") if isinstance(table.get("source_loc"), dict) else {}
            yield page, table, table.get("headers"), table.get("rows", []) or [], location, table_index


def _iter_page_values(manifest: dict[str, Any]):
    for page in manifest.get("pages", []) or []:
        if not isinstance(page, dict):
            continue
        for item in page.get("text_items", []) or []:
            if isinstance(item, dict):
                loc = item.get("source_loc") if isinstance(item.get("source_loc"), dict) else {}
                yield page, item.get("text"), loc
        for page2, _table, headers, rows, loc, _index in _iter_tables({"pages": [page]}):
            if isinstance(headers, list):
                yield page2, headers, loc
            for row_index, row in enumerate(rows, start=1):
                yield page2, row, _location(loc, row=row_index)


def _single_value(text: str, labels: tuple[str, ...]) -> str | None:
    escaped = "|".join(re.escape(label) for label in labels)
    match = re.search(rf"(?:{escaped})\s*(?:为|是|：|:)\s*([^,，;；。\n]+)", text, re.I)
    return match.group(1).strip() if match else None


def _number(value: str) -> int | None:
    match = re.search(r"(?<!\d)(\d[\d,]*)(?!\d)", value)
    if not match:
        return None
    try:
        return int(match.group(1).replace(",", ""))
    except ValueError:
        return None


def _evidence_for_label(manifest: dict[str, Any], labels: tuple[str, ...]) -> Evidence | None:
    """Find a labeled table cell first, then an explicitly labeled text span."""
    for page, _table, headers, rows, loc, _table_index in _iter_tables(manifest):
        if isinstance(headers, list) and len(headers) >= 2 and _is_label(headers[0], labels):
            return _evidence(headers[1], manifest=manifest, page=page,
                             location=_location(loc, row=0, col=1))
        for row_index, row in enumerate(rows, start=1):
            if isinstance(row, dict):
                cells = list(row.items())
            elif isinstance(headers, list) and isinstance(row, (list, tuple)):
                cells = list(zip(headers, row))
            else:
                cells = list(_pairs(row))
            for col, (label, value) in enumerate(cells):
                if _is_label(label, labels):
                    return _evidence(value, manifest=manifest, page=page,
                                     location=_location(loc, row=row_index, col=col))
    for page, raw, loc in _iter_page_values(manifest):
        value = _single_value(_flatten_text(raw), labels)
        if value:
            return _evidence(value, manifest=manifest, page=page, location=loc)
    return None


def _count_evidence(manifest: dict[str, Any], labels: tuple[str, ...]) -> Evidence | None:
    for page, _table, headers, _rows, loc, _table_index in _iter_tables(manifest):
        if isinstance(headers, list) and len(headers) >= 2 and _is_label(headers[0], labels):
            count = _number(_text(headers[1]))
            if count is not None:
                return _evidence(count, manifest=manifest, page=page,
                                 location=_location(loc, row=0, col=1))
    for page, raw, loc in _iter_page_values(manifest):
        if isinstance(raw, (list, tuple, dict)):
            for label, value in _pairs(raw):
                if _is_label(label, labels):
                    count = _number(_text(value))
                    if count is not None:
                        return _evidence(count, manifest=manifest, page=page, location=loc)
        text = _flatten_text(raw)
        escaped = "|".join(re.escape(label) for label in labels)
        match = re.search(rf"(?:{escaped})[^\d]{{0,20}}(\d[\d,]*)", text, re.I)
        if match:
            return _evidence(int(match.group(1).replace(",", "")), manifest=manifest,
                             page=page, location=loc)
    return None


def _trl_candidates(manifest: dict[str, Any]) -> list[Evidence]:
    findings: list[Evidence] = []
    for page, _table, headers, rows, loc, _table_index in _iter_tables(manifest):
        for row_index, row in enumerate(rows, start=1):
            cells = _cell_values(headers, row)
            found = _lookup(cells, ("TRL",))
            if not found:
                continue
            value, col = found
            match = re.search(r"(?<!\d)([1-9])(?!\d)", _text(value))
            if match:
                item = _evidence(int(match.group(1)), manifest=manifest, page=page,
                                 location=_location(loc, row=row_index, col=col))
                if item:
                    findings.append(item)
    for page, raw, loc in _iter_page_values(manifest):
        text = _flatten_text(raw)
        for match in re.finditer(r"\bTRL\s*[-:]?\s*([1-9])\b", text, re.I):
            item = _evidence(int(match.group(1)), manifest=manifest, page=page, location=loc)
            if item:
                findings.append(item)
    return findings


def _trl_evidence(manifest: dict[str, Any]) -> Evidence | None:
    findings = _trl_candidates(manifest)
    return max(findings, key=lambda item: int(item.value)) if findings else None


def _cell_values(headers: Any, row: Any) -> dict[str, tuple[Any, int]]:
    if isinstance(row, dict):
        return {str(label): (value, index) for index, (label, value) in enumerate(row.items())}
    if isinstance(headers, list) and isinstance(row, (list, tuple)):
        return {str(label): (value, index) for index, (label, value) in enumerate(zip(headers, row))}
    return {str(label): (value, index * 2 + 1) for index, (label, value) in enumerate(_pairs(row))}


def _lookup(cells: dict[str, tuple[Any, int]], labels: tuple[str, ...]):
    for label, (value, col) in cells.items():
        if _is_label(label, labels):
            return value, col
    return None


def _products(manifest: dict[str, Any]) -> list[ProductEvidence]:
    products: list[ProductEvidence] = []
    for page, _table, headers, rows, loc, _table_index in _iter_tables(manifest):
        for row_index, row in enumerate(rows, start=1):
            cells = _cell_values(headers, row)
            product = _lookup(cells, ("产品名称", "产品线", "产品系列", "产品"))
            if not product:
                continue
            def ev(labels: tuple[str, ...]) -> Evidence | None:
                found = _lookup(cells, labels)
                if not found:
                    return None
                value, col = found
                return _evidence(value, manifest=manifest, page=page,
                                 location=_location(loc, row=row_index, col=col))
            product_value, product_col = product
            product_ev = _evidence(product_value, manifest=manifest, page=page,
                                   location=_location(loc, row=row_index, col=product_col))
            if not product_ev:
                continue
            trl_ev = ev(("TRL",))
            if trl_ev:
                try:
                    match = re.search(r"[1-9]", _text(trl_ev.value))
                    trl_ev = Evidence(int(match.group()), trl_ev.source_file,
                                      trl_ev.source_page, trl_ev.source_locator) if match else None
                except (AttributeError, ValueError):
                    trl_ev = None
            stage_ev = ev(("研发阶段", "阶段"))
            if stage_ev is None and trl_ev is not None:
                stage_ev = Evidence(TRL_STAGE_MAP.get(int(trl_ev.value), ""), trl_ev.source_file,
                                    trl_ev.source_page, trl_ev.source_locator)
            products.append(ProductEvidence(
                product=product_ev, stage=stage_ev, trl=trl_ev,
                target_customer=ev(("目标客户", "应用领域", "客户群体")),
                status=ev(("当前状态", "状态", "进展")),
            ))
    for page, raw, loc in _iter_page_values(manifest):
        text = _flatten_text(raw)
        match = re.search(r"(?:产品名称|产品线|产品系列|产品)\s*(?:为|是|：|:)\s*([^,，;；。\n]+)", text)
        if match:
            item = _evidence(match.group(1), manifest=manifest, page=page, location=loc)
            if item:
                products.append(ProductEvidence(product=item))
    unique: dict[str, ProductEvidence] = {}
    for item in products:
        unique.setdefault(str(item.product.value), item)
    return list(unique.values())


_POSITIONING_PATTERNS = (
    # Keep these deliberately narrow: a free-form paragraph is not a company
    # positioning claim unless it uses one of the explicit positioning cues.
    re.compile(r"(?:公司定位(?:为|是)|定位为)\s*[：:]?\s*([^。；\n]+)", re.I),
    re.compile(r"(?:我们)?是一家\s*([^。；\n]+?(?:供应商|公司|企业|厂商))", re.I),
    re.compile(r"(?:专注于|专注在)\s*[：:]?\s*([^。；\n]+)", re.I),
)


def _positioning(manifest: dict[str, Any]) -> Evidence | None:
    for page, raw, loc in _iter_page_values(manifest):
        text = _flatten_text(raw)
        for pattern in _POSITIONING_PATTERNS:
            match = pattern.search(text)
            if match:
                value = match.group(1).strip(" ：:，,；;。")
                item = _evidence(value, manifest=manifest, page=page, location=loc)
                if item:
                    return item
    return None


def _summary_from_parts(products: list[ProductEvidence], model: Evidence | None) -> dict[str, Any] | None:
    """Compose a short, deterministic summary from already extracted fields."""
    names: list[str] = []
    targets: list[str] = []
    sources: list[dict[str, Any]] = []
    seen_sources: set[tuple[str, int | None, str | None, str]] = set()

    def add_source(item: Evidence | None) -> None:
        if item is None:
            return
        key = (item.source_file, item.source_page, item.source_locator, str(item.value))
        if key not in seen_sources:
            seen_sources.add(key)
            sources.append(item.to_dict())

    for product in products:
        name = _text(product.product.value)
        if name and name not in names:
            names.append(name)
        add_source(product.product)
        target = _text(product.target_customer.value) if product.target_customer else ""
        if target and target not in targets:
            targets.append(target)
        add_source(product.target_customer)
    add_source(model)

    pieces: list[str] = []
    if names:
        pieces.append(f"主要产品包括{'、'.join(names)}")
    if targets:
        pieces.append(f"目标客户为{'、'.join(targets)}")
    if model is not None and _text(model.value):
        pieces.append(f"商业模式为{_text(model.value)}")
    if not pieces:
        return None
    return {
        "value": "；".join(pieces) + "。",
        "sources": sources,
        "source_locator": "derived:business-summary",
    }


def _summary_from_dicts(products: list[dict[str, Any]], model: dict[str, Any] | None) -> dict[str, Any] | None:
    """Merge service-level product dictionaries without inventing evidence."""
    names: list[str] = []
    targets: list[str] = []
    sources: list[dict[str, Any]] = []
    seen: set[tuple[str, int | None, str | None, str]] = set()

    def add(item: dict[str, Any] | None) -> None:
        if not item:
            return
        key = (str(item.get("source_file") or ""), item.get("source_page"),
               item.get("source_locator"), str(item.get("value") or ""))
        if key not in seen:
            seen.add(key)
            sources.append(dict(item))

    for product in products:
        product_ev = product.get("product") or {}
        value = _text(product_ev.get("value"))
        if value and value not in names:
            names.append(value)
        add(product_ev)
        target_ev = product.get("target_customer")
        target = _text(target_ev.get("value")) if target_ev else ""
        if target and target not in targets:
            targets.append(target)
        add(target_ev)
    add(model)
    pieces: list[str] = []
    if names:
        pieces.append(f"主要产品包括{'、'.join(names)}")
    if targets:
        pieces.append(f"目标客户为{'、'.join(targets)}")
    if model and _text(model.get("value")):
        pieces.append(f"商业模式为{_text(model['value'])}")
    if not pieces:
        return None
    return {"value": "；".join(pieces) + "。", "sources": sources,
            "source_locator": "derived:business-summary"}


def extract_business_overview(manifest: dict[str, Any]) -> dict[str, Any]:
    """Extract one parsed manifest into the source-backed bizov contract."""
    trl = _trl_evidence(manifest)
    invention = _count_evidence(manifest, ("发明专利数", "发明专利"))
    software = _count_evidence(manifest, ("软件著作权", "软件著作", "软著"))
    model = _evidence_for_label(manifest, ("商业模式", "盈利模式", "销售模式", "收入模式"))
    products = _products(manifest)
    positioning = _positioning(manifest)
    return {
        "positioning": positioning.to_dict() if positioning else None,
        "summary": _summary_from_parts(products, model),
        "products": [item.to_dict() for item in products],
        "product_line_count": len(products) if products else None,
        "max_trl": ({**trl.to_dict(), "stage": TRL_STAGE_MAP.get(int(trl.value))} if trl else None),
        "invention_patent_count": invention.to_dict() if invention else None,
        "software_copyright_count": software.to_dict() if software else None,
        "business_model": model.to_dict() if model else None,
    }


class BusinessOverviewService:
    """Read parsed manifests scoped to one company and merge evidence."""

    def __init__(self, db_path, memory: MemoryProvider | None = None):
        self.db_path = db_path
        self.memory = memory

    def narrative_documents(self, *, company_id: str) -> list[dict[str, Any]]:
        """Read current L1/L0 navigation from OV; no local prose cache."""
        if self.memory is None:
            return []
        prefix = f"{MEMORY_ROOT}/narratives/{company_id}"
        result = []
        query_prefix = "viking://" if isinstance(self.memory, LocalMemoryProvider) else prefix
        try:
            items = self.memory.query(prefix=query_prefix)
        except (FileNotFoundError, OSError):
            return []
        for item in items:
            uri = str(item.get("uri", ""))
            if not uri.endswith("/L1/overview.md"):
                continue
            content = str(item.get("content", ""))
            parts = content.split("\n\n", 2)
            result.append({"uri": uri, "abstract_uri": uri.replace("/L1/overview.md", "/L0/abstract.md"),
                           "overview": parts[-1] if parts else "", "content": content})
        return result

    def manifests(self, *, company_id: str) -> list[dict[str, Any]]:
        try:
            with connect(self.db_path) as conn:
                rows = conn.execute(
                    """SELECT p.id,p.payload,s.original_name
                       FROM parse_staging p
                       JOIN source_files s ON s.file_hash=p.file_hash
                       JOIN file_classifications c ON c.file_hash=p.file_hash
                      WHERE p.status='parsed' AND c.company_id=?
                        AND c.status NOT IN ('superseded','canceled')
                      ORDER BY p.id DESC""", (company_id,)
                ).fetchall()
        except sqlite3.OperationalError as exc:
            # A brand-new database has no staging table until the first parse;
            # the overview is an empty state, not a server error.
            if "no such table" in str(exc).lower():
                return []
            raise
        seen: set[str] = set()
        manifests: list[dict[str, Any]] = []
        for row in rows:
            try:
                manifest = json.loads(row["payload"])
            except (TypeError, json.JSONDecodeError):
                continue
            file_hash = str(manifest.get("file_hash") or "")
            if not file_hash or file_hash in seen:
                continue
            seen.add(file_hash)
            # The object-store row is authoritative; parser payloads may only
            # carry a basename or a generated temporary filename.
            manifest["original_name"] = row["original_name"]
            manifests.append(manifest)
        return manifests

    def overview(self, *, company_id: str) -> dict[str, Any]:
        narratives = self.narrative_documents(company_id=company_id)
        if narratives:
            return {
                "products": [], "product_line_count": None, "max_trl": None,
                "invention_patent_count": None, "software_copyright_count": None,
                "business_model": None, "positioning": None, "summary": None,
                "insight": None, "source_files": [], "narrative_folders": narratives,
            }
        manifests = self.manifests(company_id=company_id)
        extracted = [extract_business_overview(manifest) for manifest in manifests]
        products: list[dict[str, Any]] = []
        product_seen: set[str] = set()
        trl_candidates: list[dict[str, Any]] = []
        invention = software = model = None
        positioning = None
        for item in extracted:
            for product in item["products"]:
                key = str(product["product"]["value"])
                if key not in product_seen:
                    product_seen.add(key)
                    products.append(product)
            if item["max_trl"]:
                trl_candidates.append(item["max_trl"])
            invention = invention or item["invention_patent_count"]
            software = software or item["software_copyright_count"]
            model = model or item["business_model"]
            positioning = positioning or item["positioning"]
        trl_candidates.sort(key=lambda value: int(value["value"]), reverse=True)
        return {
            "products": products,
            "product_line_count": len(products) if products else None,
            "max_trl": trl_candidates[0] if trl_candidates else None,
            "invention_patent_count": invention,
            "software_copyright_count": software,
            "business_model": model,
            "positioning": positioning,
            "summary": _summary_from_dicts(products, model),
            "insight": None,
            "source_files": [str(manifest.get("original_name") or manifest.get("file_hash")) for manifest in manifests],
        }
