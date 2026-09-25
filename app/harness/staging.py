"""Staging store: parser output lands here before validation/commit.

Nothing from a parser writes directly to the fact ledger. Staging rows can be
reviewed, then promoted through the transaction gateway.
"""
from __future__ import annotations

import json
from datetime import datetime, timezone
from typing import Optional

from ..db.database import connect
from .contracts import ParseResult


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


class StagingStore:
    def __init__(self, db_path=None):
        self._db_path = db_path

    def _conn(self):
        from ..db.database import connect as c
        return c(self._db_path) if self._db_path else c()

    def save_parse(self, result: ParseResult) -> int:
        with self._conn() as conn:
            conn.execute(
                "CREATE TABLE IF NOT EXISTS parse_staging ("
                "id INTEGER PRIMARY KEY AUTOINCREMENT,"
                "file_hash TEXT NOT NULL,"
                "format TEXT NOT NULL,"
                "payload TEXT NOT NULL,"
                "status TEXT NOT NULL DEFAULT 'pending',"
                "created_at TEXT NOT NULL)"
            )
            cur = conn.execute(
                "INSERT INTO parse_staging(file_hash,format,payload,status,created_at)"
                " VALUES (?,?,?,?,?)",
                (
                    result.file_hash,
                    result.format,
                    json.dumps(result.to_dict(), ensure_ascii=False),
                    "pending",
                    _now(),
                ),
            )
            conn.commit()
            return cur.lastrowid

    def get(self, staging_id: int) -> dict:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM parse_staging WHERE id=?", (staging_id,)
            ).fetchone()
        if row is None:
            raise KeyError(staging_id)
        data = dict(row)
        data["payload"] = json.loads(data["payload"])
        return data

    def list_pending(self) -> list[dict]:
        with self._conn() as conn:
            conn.execute(
                "CREATE TABLE IF NOT EXISTS parse_staging ("
                "id INTEGER PRIMARY KEY AUTOINCREMENT,"
                "file_hash TEXT NOT NULL,"
                "format TEXT NOT NULL,"
                "payload TEXT NOT NULL,"
                "status TEXT NOT NULL DEFAULT 'pending',"
                "created_at TEXT NOT NULL)"
            )
            rows = conn.execute(
                "SELECT id,file_hash,format,status,created_at"
                " FROM parse_staging WHERE status='pending' ORDER BY id"
            ).fetchall()
        return [dict(r) for r in rows]
