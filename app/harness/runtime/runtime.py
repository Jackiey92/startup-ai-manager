"""Minimal harness runtime.

Runs parser skills inside a controlled boundary and records every action to an
audit log. M1.5 scope:
- capability registry: only registered parsers may run
- controlled read: parser can only read the given file_hash via the store
- output confinement: results only go to staging, never straight to facts
- audit: what ran, on which file, produced what
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Optional

from ..contracts import ParseResult
from typing import Protocol
from ..staging import StagingStore


class ParserRegistry(Protocol):
    def get(self, format: str): ...


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class RunReport:
    file_hash: str
    format: str
    staging_id: int
    spans: int
    rows: int
    audit_id: int


class HarnessRuntime:
    def __init__(self, registry: ParserRegistry, staging: StagingStore):
        self.registry = registry
        self.staging = staging

    def parse_file(self, file_hash: str, format: str) -> RunReport:
        parser = self.registry.get(format)

        result: ParseResult = parser.parse(file_hash)

        staging_id = self.staging.save_parse(result)
        audit_id = self._audit(
            action="parse",
            file_hash=file_hash,
            format=format,
            detail=(
                f"spans={len(result.text_spans)} "
                f"rows={len(result.table_rows)} "
                f"module={result.hint.module}"
            ),
        )
        return RunReport(
            file_hash=file_hash,
            format=format,
            staging_id=staging_id,
            spans=len(result.text_spans),
            rows=len(result.table_rows),
            audit_id=audit_id,
        )

    @staticmethod
    def _audit(action: str, file_hash: str, format: str, detail: str) -> int:
        from ...db.database import connect

        with connect() as conn:
            conn.execute(
                "CREATE TABLE IF NOT EXISTS audit_log ("
                "id INTEGER PRIMARY KEY AUTOINCREMENT,"
                "action TEXT NOT NULL,"
                "file_hash TEXT,"
                "format TEXT,"
                "detail TEXT,"
                "created_at TEXT NOT NULL)"
            )
            cur = conn.execute(
                "INSERT INTO audit_log(action,file_hash,format,detail,created_at)"
                " VALUES (?,?,?,?,?)",
                (action, file_hash, format, detail, _now()),
            )
            conn.commit()
            return cur.lastrowid

    @staticmethod
    def list_audit(limit: int = 20) -> list[dict]:
        from ...db.database import connect

        with connect() as conn:
            rows = conn.execute(
                "SELECT * FROM audit_log ORDER BY id DESC LIMIT ?", (limit,)
            ).fetchall()
        return [dict(r) for r in rows]


