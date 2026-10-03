"""Compatibility data shape for employee-owned document classification.

The old filename keyword classifier was intentionally removed. A filename is
transport metadata, not evidence for a business module.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Optional

from ..db.database import connect


@dataclass(frozen=True)
class CoarseResult:
    module: Optional[str]
    doc_type: Optional[str]
    confidence: float


class FileClassifier:
    """Deprecated filename adapter; it never makes a business decision."""

    @staticmethod
    def guess(original_name: str) -> CoarseResult:
        del original_name
        return CoarseResult(None, None, 0.0)

    @staticmethod
    def record_classification(file_hash: str, result: CoarseResult, *, conn=None) -> Optional[int]:
        if result.module is None:
            return None
        own_conn = conn is None
        if own_conn:
            conn = connect()
        try:
            cur = conn.execute(
                "INSERT INTO file_classifications(file_hash,module,doc_type,"
                "confidence,status,classified_by,created_at) VALUES (?,?,?,?,?,?,?)",
                (file_hash, result.module, result.doc_type, result.confidence,
                 "pending", "employee", datetime.now(timezone.utc).isoformat()),
            )
            if own_conn:
                conn.commit()
            return cur.lastrowid
        finally:
            if own_conn:
                conn.close()
