"""2.0 entity roster: structured, source-backed suggestions only.

The roster is deliberately not an entity-resolution bridge.  It reads only
structured table cells from a parsed L2 manifest, never asks a model and never
turns a name-looking sentence into an entity.  Rows are append-only review
events; the immutable source blob and the 2B fact ledger are untouched.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import json
from typing import Any, Iterable

from ..db.database import connect


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


_LABELS: dict[str, tuple[str, ...]] = {
    "entity_name": ("公司名称", "企业名称", "主体名称", "公司全称", "企业全称", "主体全称"),
    "entity_type": ("企业类型", "公司类型", "组织形式", "企业性质"),
    "aliases": ("曾用名", "公司简称", "企业简称", "简称", "别名"),
    "credit_code": ("统一社会信用代码", "社会信用代码", "信用代码"),
    "stock_code": ("股票代码", "证券代码", "上市代码"),
}


@dataclass(frozen=True)
class RosterCandidate:
    company_id: str
    entity_name: str
    entity_type: str | None
    aliases: tuple[str, ...]
    credit_code: str | None
    stock_code: str | None
    source_file: str
    source_page: int | None
    source_span: str | None
    origin: str = "extracted"

    def to_dict(self) -> dict[str, Any]:
        result = {
            "company_id": self.company_id,
            "entity_name": self.entity_name,
            "entity_type": self.entity_type,
            "aliases": list(self.aliases),
            "credit_code": self.credit_code,
            "stock_code": self.stock_code,
            "source_file": self.source_file,
            "source_page": self.source_page,
            "source_span": self.source_span,
            "status": "suggested",
            "origin": self.origin,
        }
        return result


def _page_no(page: dict[str, Any]) -> int | None:
    value = page.get("page_no", page.get("page"))
    try:
        return int(value) if value is not None and str(value) != "?" else None
    except (TypeError, ValueError):
        return None


def _source_span(location: Any, *, table_index: int, row_index: int, column: int | None = None) -> str:
    loc = location if isinstance(location, dict) else {}
    locator = loc.get("locator") or f"table/{table_index}"
    parts = [str(locator), f"row={row_index}"]
    if column is not None:
        parts.append(f"col={column}")
    return ";".join(parts)


def _iter_cells(manifest: dict[str, Any]) -> Iterable[tuple[str, str, int | None, str]]:
    """Yield label/value pairs from structured tables only."""
    file_hash = str(manifest.get("file_hash") or "")
    for page in manifest.get("pages", []) if isinstance(manifest, dict) else []:
        if not isinstance(page, dict):
            continue
        page_no = _page_no(page)
        for table_index, table in enumerate(page.get("tables", []) or []):
            if not isinstance(table, dict):
                continue
            location = table.get("source_loc")
            for row_index, row in enumerate(table.get("rows", []) or [], start=1):
                if isinstance(row, dict):
                    for column, (label, value) in enumerate(row.items()):
                        label_text, value_text = str(label).strip(), str(value).strip()
                        if label_text and value_text:
                            yield label_text, value_text, page_no, _source_span(
                                location, table_index=table_index, row_index=row_index, column=column,
                            )
                    continue
                if not isinstance(row, list):
                    continue
                headers = table.get("headers")
                if isinstance(headers, list) and len(headers) == len(row):
                    for column, (label, value) in enumerate(zip(headers, row)):
                        label_text, value_text = str(label).strip(), str(value).strip()
                        if label_text and value_text:
                            yield label_text, value_text, page_no, _source_span(
                                location, table_index=table_index, row_index=row_index, column=column,
                            )
                    continue
                for column in range(0, len(row) - 1):
                    label_text, value_text = str(row[column]).strip(), str(row[column + 1]).strip()
                    if label_text and value_text:
                        yield label_text, value_text, page_no, _source_span(
                            location, table_index=table_index, row_index=row_index, column=column,
                        )


def _field(label: str) -> str | None:
    normalized = "".join(label.split()).lower()
    matches = [
        (len(alias), field)
        for field, aliases in _LABELS.items()
        for alias in aliases
        if "".join(alias.split()).lower() in normalized
    ]
    return max(matches)[1] if matches else None


def extract_roster_candidate(manifest: dict[str, Any], *, company_id: str) -> RosterCandidate | None:
    """Extract one deterministic roster suggestion from structured cells."""
    file_hash = str(manifest.get("file_hash") or "")
    if not file_hash:
        raise ValueError("manifest file_hash is required")
    values: dict[str, Any] = {}
    aliases: list[str] = []
    name_page: int | None = None
    name_span: str | None = None
    for label, value, page, span in _iter_cells(manifest):
        field = _field(label)
        if field is None:
            continue
        if field == "aliases":
            aliases.extend(part.strip() for part in value.replace("，", ",").split(",") if part.strip())
            continue
        values.setdefault(field, value)
        if field == "entity_name" and name_span is None:
            name_page, name_span = page, span
    entity_name = str(values.get("entity_name") or "").strip()
    if not entity_name:
        return None
    return RosterCandidate(
        company_id=company_id,
        entity_name=entity_name,
        entity_type=str(values.get("entity_type") or "").strip() or None,
        aliases=tuple(dict.fromkeys(aliases)),
        credit_code=str(values.get("credit_code") or "").strip() or None,
        stock_code=str(values.get("stock_code") or "").strip() or None,
        source_file=file_hash,
        source_page=name_page,
        source_span=name_span,
    )


class EntityRosterService:
    """Append-only roster suggestions and human review transitions."""

    def __init__(self, db_path):
        self.db_path = db_path

    def _manifest(self, file_hash: str) -> dict[str, Any]:
        with connect(self.db_path) as conn:
            row = conn.execute(
                "SELECT payload FROM parse_staging WHERE file_hash=? AND status='parsed' ORDER BY id DESC LIMIT 1",
                (file_hash,),
            ).fetchone()
        if row is None:
            raise KeyError(f"parsed manifest not found: {file_hash}")
        return json.loads(row["payload"])

    def suggest(self, *, company_id: str, file_hash: str) -> dict[str, Any] | None:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        candidate = extract_roster_candidate(self._manifest(file_hash), company_id=company_id)
        if candidate is None:
            return None
        values = candidate.to_dict()
        with connect(self.db_path) as conn:
            declared = conn.execute(
                """SELECT * FROM entity_roster
                   WHERE company_id=? AND origin='declared' AND status='active'
                     AND superseded_by IS NULL
                   ORDER BY id DESC LIMIT 1""",
                (company_id,),
            ).fetchone()
            # A host-declared self is authoritative.  Do not create a second
            # self suggestion when a registration cover repeats that name.
            # A differently named structured entity may still be a subsidiary.
            if declared is not None and declared["entity_name"].strip() == candidate.entity_name.strip():
                return dict(declared)
            existing = conn.execute(
                """SELECT * FROM entity_roster WHERE company_id=? AND entity_name=?
                   AND source_file=? AND superseded_by IS NULL
                   AND status IN ('suggested','active') ORDER BY id DESC LIMIT 1""",
                (company_id, candidate.entity_name, candidate.source_file),
            ).fetchone()
            if existing is not None:
                return dict(existing)
            cur = conn.execute(
                """INSERT INTO entity_roster
                   (company_id,entity_name,entity_type,aliases,credit_code,stock_code,origin,status,
                    source_file,source_page,source_span,created_at)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
                (company_id, candidate.entity_name, candidate.entity_type,
                 json.dumps(list(candidate.aliases), ensure_ascii=False), candidate.credit_code,
                 candidate.stock_code, "extracted", "suggested", candidate.source_file, candidate.source_page,
                 candidate.source_span, _now()),
            )
            conn.commit()
            return dict(conn.execute("SELECT * FROM entity_roster WHERE id=?", (cur.lastrowid,)).fetchone())

    def list(self, *, company_id: str, status: str | None = None) -> list[dict[str, Any]]:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        sql = "SELECT * FROM entity_roster WHERE company_id=? AND superseded_by IS NULL"
        params: list[Any] = [company_id]
        if status is not None:
            if status not in {"suggested", "active", "rejected"}:
                raise ValueError("invalid roster status")
            sql += " AND status=?"
            params.append(status)
        sql += " ORDER BY id DESC"
        with connect(self.db_path) as conn:
            rows = [dict(row) for row in conn.execute(sql, params).fetchall()]
        for row in rows:
            row["aliases"] = json.loads(row["aliases"] or "[]")
        return rows

    def declare(self, *, company_id: str, entity_name: str,
                aliases: Iterable[str] = ()) -> dict[str, Any]:
        """Record the host's authoritative self declaration as active.

        This command intentionally has no CLI ``--confirm`` gate: the host
        supplies the authenticated company scope and the explicit declaration
        itself is the confirmation.  It remains append-only and cannot change
        the source blob or any 2B fact.
        """
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        name = str(entity_name or "").strip()
        if not name:
            raise ValueError("entity_name is required")
        alias_values = tuple(dict.fromkeys(str(item).strip() for item in aliases if str(item).strip()))
        with connect(self.db_path) as conn:
            current = conn.execute(
                """SELECT * FROM entity_roster
                   WHERE company_id=? AND origin='declared' AND entity_name=?
                     AND status='active' AND superseded_by IS NULL
                   ORDER BY id DESC LIMIT 1""", (company_id, name),
            ).fetchone()
            if current is not None:
                return dict(current)
            previous = conn.execute(
                """SELECT * FROM entity_roster WHERE company_id=? AND status='active'
                   AND superseded_by IS NULL ORDER BY id DESC LIMIT 1""", (company_id,)
            ).fetchone()
            cur = conn.execute(
                """INSERT INTO entity_roster
                   (company_id,entity_name,entity_type,aliases,credit_code,stock_code,origin,status,
                    source_file,source_page,source_span,created_at)
                   VALUES (?,?,?,?,?,?,?,'active',NULL,NULL,NULL,?)""",
                (company_id, name, "self", json.dumps(list(alias_values), ensure_ascii=False),
                 None, None, "declared", _now()),
            )
            if previous is not None:
                conn.execute("UPDATE entity_roster SET superseded_by=? WHERE id=?", (cur.lastrowid, previous["id"]))
            conn.commit()
            return dict(conn.execute("SELECT * FROM entity_roster WHERE id=?", (cur.lastrowid,)).fetchone())

    def match_name(self, *, company_id: str, name: str) -> dict[str, Any] | None:
        """Resolve an exact roster name/alias with declared self priority."""
        needle = str(name or "").strip().casefold()
        if not needle:
            return None
        rows = self.list(company_id=company_id)
        rows.sort(key=lambda row: (0 if row.get("origin") == "declared" else 1, -int(row["id"])))
        for row in rows:
            names = [row.get("entity_name") or "", *row.get("aliases", [])]
            if any(str(value).strip().casefold() == needle for value in names):
                return row
        return None

    def _transition(self, *, company_id: str, roster_id: int, status: str, confirm: bool) -> dict[str, Any]:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        if not confirm:
            raise PermissionError("write operation requires --confirm")
        if status not in {"active", "rejected"}:
            raise ValueError("invalid roster transition")
        with connect(self.db_path) as conn:
            row = conn.execute(
                "SELECT * FROM entity_roster WHERE id=? AND company_id=? AND superseded_by IS NULL",
                (roster_id, company_id),
            ).fetchone()
            if row is None:
                raise KeyError(roster_id)
            cur = conn.execute(
                """INSERT INTO entity_roster
                   (company_id,entity_name,entity_type,aliases,credit_code,stock_code,origin,status,
                    source_file,source_page,source_span,created_at)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
                (row["company_id"], row["entity_name"], row["entity_type"], row["aliases"],
                 row["credit_code"], row["stock_code"], row["origin"], status, row["source_file"],
                 row["source_page"], row["source_span"], _now()),
            )
            conn.execute("UPDATE entity_roster SET superseded_by=? WHERE id=?", (cur.lastrowid, roster_id))
            conn.commit()
            return dict(conn.execute("SELECT * FROM entity_roster WHERE id=?", (cur.lastrowid,)).fetchone())

    def confirm(self, *, company_id: str, roster_id: int, confirm: bool = False) -> dict[str, Any]:
        return self._transition(company_id=company_id, roster_id=roster_id, status="active", confirm=confirm)

    def reject(self, *, company_id: str, roster_id: int, confirm: bool = False) -> dict[str, Any]:
        return self._transition(company_id=company_id, roster_id=roster_id, status="rejected", confirm=confirm)
