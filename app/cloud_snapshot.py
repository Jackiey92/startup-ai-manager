"""Opaque, atomic, single-company snapshot channel; no business interpretation."""
from __future__ import annotations

from contextlib import closing
import json
import math
from pathlib import Path
import sqlite3

SNAPSHOT_VERSION = 1
MAX_BODY_BYTES = 32 * 1024 * 1024


def validate_snapshot(value: object) -> None:
    """Validate only the transport envelope, not the business payload."""
    if not isinstance(value, dict):
        raise ValueError("snapshot must be a JSON object")
    if type(value.get("version")) is not int or value["version"] != SNAPSHOT_VERSION:
        raise ValueError("unsupported snapshot version; expected 1")
    if not isinstance(value.get("company_id"), str) or not value["company_id"].strip():
        raise ValueError("company_id must be a non-empty string")
    stamp = value.get("pushed_at")
    try:
        valid_stamp = type(stamp) in (int, float) and math.isfinite(stamp)
    except OverflowError:
        valid_stamp = False
    if not valid_stamp:
        raise ValueError("pushed_at must be a finite Unix timestamp")
    if not isinstance(value.get("payload"), dict):
        raise ValueError("payload must be a JSON object")
    pending = [(value, 0)]
    while pending:
        item, depth = pending.pop()
        if depth > 32:
            raise ValueError("snapshot nesting depth exceeds 32")
        if isinstance(item, dict):
            pending.extend((child, depth + 1) for child in item.values())
        elif isinstance(item, list):
            pending.extend((child, depth + 1) for child in item)


def reject_constant(value: str):
    raise ValueError("non-finite JSON constant")


class SnapshotStore:
    """One complete snapshot per instance, replaced within a SQLite transaction.

    Connections are request-local and explicitly closed. Readers see either the
    old document or the new document, never a partial merge. Unknown JSON fields
    survive unchanged. This database is separate from MAIN_DB.
    """

    def __init__(self, path: str | Path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with closing(self._connect()) as conn, conn:
            conn.execute("CREATE TABLE IF NOT EXISTS cloud_snapshot ("
                         "slot INTEGER PRIMARY KEY CHECK(slot=1), document TEXT NOT NULL)")

    def _connect(self):
        return sqlite3.connect(self.path, timeout=30)

    def replace(self, snapshot: dict) -> None:
        validate_snapshot(snapshot)
        document = json.dumps(snapshot, ensure_ascii=False, allow_nan=False)
        with closing(self._connect()) as conn, conn:
            conn.execute("INSERT INTO cloud_snapshot(slot,document) VALUES(1,?) "
                         "ON CONFLICT(slot) DO UPDATE SET document=excluded.document", (document,))

    def read(self) -> dict | None:
        with closing(self._connect()) as conn:
            row = conn.execute("SELECT document FROM cloud_snapshot WHERE slot=1").fetchone()
        return json.loads(row[0]) if row else None


def object_value(value) -> dict:
    return value if isinstance(value, dict) else {}


class SnapshotKnowledgeService:
    """Knowledge read port backed exclusively by the current snapshot."""

    def __init__(self, snapshot: dict | None):
        self.snapshot = snapshot or {}

    def read(self, *, company_id: str) -> dict:
        if self.snapshot.get("company_id") != company_id:
            return {}
        return object_value(object_value(self.snapshot.get("payload")).get("knowledge"))

    def source(self, *, company_id: str, file_hash: str) -> dict:
        files = object_value(self.read(company_id=company_id).get("evidence")).get("files", [])
        if isinstance(files, list):
            for item in files:
                if isinstance(item, dict) and item.get("file_hash") == file_hash:
                    return item
        raise KeyError(file_hash)
