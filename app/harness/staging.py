"""Staging store: parser output lands here before validation/commit.

Nothing from a parser writes directly to the fact ledger. Staging rows can be
reviewed, then promoted through the transaction gateway.
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from ..storage.archive_paths import evidence_root

from ..db.database import connect
from .contracts import ParseResult


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


class StagingStore:
    def __init__(self, db_path=None, *, maps_path=None):
        self._db_path = db_path
        # Explicit DBs keep test/scoped output away from the product store.
        root = evidence_root() if db_path is None or os.environ.get("SAM_2A_ROOT") else Path(db_path).parent / "2a"
        self.maps_path = Path(maps_path) if maps_path is not None else root / "map"

    def _rebuild_map(self, conn, file_hash: str) -> None:
        from ..storage.mapping_store import persist_latest_mapping
        from ..storage.archive_paths import hash_relpath
        persist_latest_mapping(conn, file_hash, self.maps_path / hash_relpath(file_hash, mapping=True))

    def _conn(self):
        from ..db.database import connect as c
        return c(self._db_path) if self._db_path else c()

    def save_parse(self, result: ParseResult) -> int:
        return self.save_manifest(result.to_dict())

    def save_manifest(self, manifest: dict) -> int:
        """Store an engine-neutral L2 manifest without interpreting it."""
        summary = manifest.get("parse_summary")
        parse_status = str(summary.get("status") or "parse_failed") if isinstance(summary, dict) else "parse_failed"
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
                    manifest["file_hash"],
                    manifest["format"],
                    json.dumps(manifest, ensure_ascii=False),
                    parse_status,
                    _now(),
                ),
            )
            if parse_status == "parsed":
                self._rebuild_map(conn, manifest["file_hash"])
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

    def update_payload(self, staging_id: int, updates: dict) -> None:
        """Merge post-parse routing metadata without interpreting facts."""
        if not isinstance(updates, dict):
            raise TypeError("staging updates must be a mapping")
        with self._conn() as conn:
            conn.execute("BEGIN IMMEDIATE")
            row = conn.execute(
                "SELECT payload,status,file_hash FROM parse_staging WHERE id=?", (staging_id,)
            ).fetchone()
            if row is None:
                raise KeyError(staging_id)
            payload = json.loads(row["payload"])
            if not isinstance(payload, dict):
                raise ValueError("staging payload must be an object")
            payload.update(updates)
            conn.execute(
                "UPDATE parse_staging SET payload=? WHERE id=?",
                (json.dumps(payload, ensure_ascii=False), staging_id),
            )
            if row["status"] == "parsed":
                self._rebuild_map(conn, row["file_hash"])
            conn.commit()

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
