"""Append-only classification ledger backed by the document employee."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from .file_classifier import CoarseResult
from ..db.database import connect
from ..employees import SemanticDecisionUnavailable, SemanticEmployee


@dataclass(frozen=True)
class ContentResult:
    module: str | None
    doc_type: str | None
    confidence: float
    matched_terms: tuple[str, ...]
    needs_review: bool = False


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def manifest_text(manifest: dict[str, Any]) -> str:
    """Collect user-visible text/table cells from an L2 manifest.

    This intentionally ignores filename and parser metadata, so content and
    filename disagreement is decided solely by the extracted evidence.
    """
    values: list[str] = []
    for page in manifest.get("pages", []) if isinstance(manifest, dict) else []:
        if not isinstance(page, dict):
            continue
        for item in page.get("text_items", []):
            if isinstance(item, dict) and isinstance(item.get("text"), str):
                values.append(item["text"])
        for table in page.get("tables", []):
            if not isinstance(table, dict):
                continue
            values.extend(str(value) for value in table.get("headers", []) if value is not None)
            for row in table.get("rows", []):
                if isinstance(row, dict):
                    values.extend(str(value) for value in row.values() if value is not None)
                elif isinstance(row, list):
                    values.extend(str(value) for value in row if value is not None)
    return "\n".join(values).lower()


def classify_content(manifest: dict[str, Any], *, employee: SemanticEmployee | None = None,
                     company_id: str = "default", thread_id: str | None = None) -> ContentResult:
    """Ask the employee for classification; no keyword or filename fallback."""
    if employee is None:
        return ContentResult(None, None, 0.0, ())
    try:
        result = employee.classify_document(
            text=manifest_text(manifest), company_id=company_id, thread_id=thread_id,
        )
    except (SemanticDecisionUnavailable, OSError, TypeError, ValueError):
        return ContentResult(None, None, 0.0, ())
    module = result.get("module")
    doc_type = result.get("doc_type")
    confidence = result.get("confidence", 0.0)
    try:
        confidence = float(confidence)
    except (TypeError, ValueError):
        confidence = 0.0
    matched = result.get("matched_terms") or ()
    needs_review = result.get("needs_review") if isinstance(result.get("needs_review"), bool) else False
    return ContentResult(
        module if isinstance(module, str) and module.strip() else None,
        doc_type if isinstance(doc_type, str) and doc_type.strip() else None,
        max(0.0, min(1.0, confidence)),
        tuple(item for item in matched if isinstance(item, str)),
        needs_review,
    )


class ClassificationService:
    """Append-only classification ledger with company-scoped current views."""

    def __init__(self, db_path, *, employee: SemanticEmployee | None = None) -> None:
        self._db_path = db_path
        self._employee = employee

    def _conn(self):
        return connect(self._db_path)

    @staticmethod
    def _current(conn, *, file_hash: str, company_id: str):
        return conn.execute(
            """
            SELECT * FROM file_classifications
            WHERE file_hash=? AND company_id=? AND status NOT IN ('superseded', 'canceled')
            ORDER BY id DESC LIMIT 1
            """,
            (file_hash, company_id),
        ).fetchone()

    def classify_parsed(self, *, file_hash: str, company_id: str, manifest: dict[str, Any]) -> dict[str, Any]:
        """Record an effective content classification, preserving human choices."""
        result = classify_content(manifest, employee=self._employee, company_id=company_id)
        with self._conn() as conn:
            current = self._current(conn, file_hash=file_hash, company_id=company_id)
            if current is not None and current["classified_by"] == "human":
                return dict(current)
            if current is not None and self._same(current, result, basis="content"):
                return dict(current)
            if current is not None:
                conn.execute("UPDATE file_classifications SET status='superseded' WHERE id=?", (current["id"],))
            row_id = self._insert(
                conn, file_hash=file_hash, company_id=company_id, module=result.module,
                doc_type=result.doc_type, confidence=result.confidence, status="auto",
                classified_by="employee" if self._employee is not None else "auto", basis="content",
                needs_review=result.needs_review,
            )
            conn.commit()
            row = dict(conn.execute("SELECT * FROM file_classifications WHERE id=?", (row_id,)).fetchone())
            # Internal pipeline marker: only this invocation's newly appended
            # row may be invalidated if the parse job is canceled.  It is not
            # included by the HTTP classification projection.
            row["_created_for_parse"] = True
            return row

    def classify_name_fallback(self, *, file_hash: str, company_id: str, original_name: str) -> dict[str, Any] | None:
        """Record a filename-only preliminary label only when no current row exists."""
        # Kept as an append-only compatibility projection. A name alone is
        # never a business decision; content classification must be supplied
        # by the document employee after parsing.
        del original_name
        guess = CoarseResult(None, None, 0.0)
        with self._conn() as conn:
            current = self._current(conn, file_hash=file_hash, company_id=company_id)
            if current is not None:
                return dict(current)
            row_id = self._insert(
                conn, file_hash=file_hash, company_id=company_id, module=guess.module,
                doc_type=guess.doc_type, confidence=guess.confidence, status="auto",
                classified_by="auto", basis="name", needs_review=False,
            )
            conn.commit()
            return dict(conn.execute("SELECT * FROM file_classifications WHERE id=?", (row_id,)).fetchone())

    def cancel_auto_content(self, *, classification_id: int, file_hash: str, company_id: str) -> bool:
        """Invalidate one canceled job's automatic content row only.

        The row id is captured from the current job's classify call, so a
        later upload or a human correction for the same source cannot be
        accidentally removed.  ``canceled`` is excluded from current views but
        retained as an audit marker.
        """
        with self._conn() as conn:
            cursor = conn.execute(
                """UPDATE file_classifications
                   SET status='canceled'
                 WHERE id=? AND file_hash=? AND company_id=?
                   AND status='auto' AND basis='content' AND classified_by IN ('auto', 'employee')""",
                (classification_id, file_hash, company_id),
            )
            conn.commit()
            return cursor.rowcount == 1

    def list_current(self, *, company_id: str, module: str | None = None, include_history: bool = False) -> list[dict[str, Any]]:
        sql = """
            SELECT c.*, s.original_name, s.mime_type, s.size_bytes, s.uploaded_at
            FROM file_classifications c
            JOIN source_files s ON s.file_hash=c.file_hash
            WHERE c.company_id=? AND c.status NOT IN ('superseded', 'canceled')
        """
        params: list[Any] = [company_id]
        if module in {"null", "unclassified"}:
            sql += " AND c.module IS NULL"
        elif module is not None:
            sql += " AND c.module=?"
            params.append(module)
        sql += " ORDER BY c.id DESC"
        with self._conn() as conn:
            rows = [dict(row) for row in conn.execute(sql, params).fetchall()]
            for item in rows:
                if include_history:
                    history = conn.execute(
                        """
                        SELECT module, doc_type, confidence, needs_review, status, classified_by, basis, created_at
                        FROM file_classifications
                        WHERE file_hash=? AND company_id=? AND id != ?
                        ORDER BY id ASC
                        """,
                        (item["file_hash"], company_id, item["id"]),
                    ).fetchall()
                    item["history"] = [dict(row) for row in history]
                item.pop("id", None)
        return rows

    def confirm(self, *, file_hash: str, company_id: str) -> dict[str, Any]:
        with self._conn() as conn:
            current = self._current(conn, file_hash=file_hash, company_id=company_id)
            if current is None:
                raise KeyError(file_hash)
            conn.execute("UPDATE file_classifications SET status='confirmed' WHERE id=?", (current["id"],))
            conn.commit()
            return dict(conn.execute("SELECT * FROM file_classifications WHERE id=?", (current["id"],)).fetchone())

    def reclassify(self, *, file_hash: str, company_id: str, module: str | None, doc_type: str | None) -> dict[str, Any]:
        with self._conn() as conn:
            if conn.execute("SELECT 1 FROM source_files WHERE file_hash=?", (file_hash,)).fetchone() is None:
                raise KeyError(file_hash)
            if module is not None and conn.execute("SELECT 1 FROM modules WHERE code=?", (module,)).fetchone() is None:
                raise ValueError("unknown module")
            if doc_type is not None:
                type_row = conn.execute("SELECT parent_module FROM doc_types WHERE code=?", (doc_type,)).fetchone()
                if type_row is None or type_row["parent_module"] != module:
                    raise ValueError("doc_type does not belong to module")
            current = self._current(conn, file_hash=file_hash, company_id=company_id)
            if current is not None:
                conn.execute("UPDATE file_classifications SET status='superseded' WHERE id=?", (current["id"],))
            row_id = self._insert(
                conn, file_hash=file_hash, company_id=company_id, module=module, doc_type=doc_type,
                confidence=1.0, status="confirmed", classified_by="human", basis="human",
                needs_review=False,
            )
            conn.commit()
            return dict(conn.execute("SELECT * FROM file_classifications WHERE id=?", (row_id,)).fetchone())

    @staticmethod
    def _same(row, result: ContentResult, *, basis: str) -> bool:
        return (
            row["basis"] == basis and row["module"] == result.module
            and row["doc_type"] == result.doc_type
            and int(row["needs_review"] or 0) == int(result.needs_review)
            and row["status"] != "superseded"
        )

    @staticmethod
    def _insert(conn, *, file_hash: str, company_id: str, module: str | None,
                doc_type: str | None, confidence: float, status: str,
                classified_by: str, basis: str, needs_review: bool = False) -> int:
        cur = conn.execute(
            """
            INSERT INTO file_classifications
                (file_hash, company_id, module, doc_type, confidence, status,
                 needs_review, classified_by, basis, created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?)
            """,
            (file_hash, company_id, module, doc_type, confidence, status,
             int(needs_review), classified_by, basis, _now()),
        )
        return int(cur.lastrowid)
