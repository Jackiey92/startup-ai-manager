"""2.0 entity roster: employee-supplied, source-backed suggestions."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import json
from typing import Any

from ..db.database import connect
from ..employees import SemanticDecisionUnavailable, SemanticEmployee


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


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


class EntityRosterService:
    """Append-only roster suggestions and human review transitions."""

    def __init__(self, db_path, *, employee: SemanticEmployee | None = None):
        self.db_path = db_path
        self.employee = employee

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
        manifest = self._manifest(file_hash)
        if self.employee is None:
            raise ValueError("entity employee is required for roster suggestions")
        try:
            result = self.employee.roster_candidate(
                text=json.dumps(manifest, ensure_ascii=False), company_id=company_id,
            )
        except (SemanticDecisionUnavailable, OSError, TypeError, ValueError):
            result = {}
        name = str(result.get("entity_name") or result.get("name") or "").strip()
        aliases = result.get("aliases") or []
        candidate = RosterCandidate(
            company_id=company_id, entity_name=name,
            entity_type=str(result.get("entity_type") or "").strip() or None,
            aliases=tuple(str(item).strip() for item in aliases if str(item).strip()),
            credit_code=str(result.get("credit_code") or "").strip() or None,
            stock_code=str(result.get("stock_code") or "").strip() or None,
            source_file=file_hash,
            source_page=result.get("source_page"),
            source_span=result.get("source_span"),
        ) if name else None
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
