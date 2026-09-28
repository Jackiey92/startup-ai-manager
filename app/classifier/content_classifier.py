"""Content-first, deterministic classification for 2A source files.

Classification is navigation metadata, not a fact write.  A parsed manifest is
the primary evidence; filename matching is only available as a low-confidence
fallback for files that could not be parsed.  Every decision is retained in an
append-only SQLite ledger so a human correction never changes the original
object or erases the automatic result.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Iterable

from .file_classifier import CoarseResult, FileClassifier
from ..db.database import connect


# These are deliberately document-content terms rather than filename hints.
# A module needs at least two distinct indicators, avoiding a classification
# based on one accidental mention (for example, an HR roster containing a
# "sales" job title).
CONTENT_HINTS: dict[str, tuple[str, ...]] = {
    "finance": (
        "利润表", "资产负债表", "现金流", "现金流量", "营业收入", "净利润",
        "毛利率", "应收账款", "货币资金", "财务费用", "资产", "负债",
    ),
    "sales": (
        "客户名称", "客户", "订单", "订单金额", "发货", "回款", "报价",
        "销售额", "商机", "合同编号", "收款",
    ),
    "marketing": (
        "线索", "渠道", "投放", "营销", "市场活动", "广告", "转化率",
        "campaign", "lead", "channel",
    ),
    "hr": (
        "员工", "薪酬", "工资", "岗位", "入职", "离职", "社保", "考勤",
        "人力", "花名册", "基本工资", "绩效",
    ),
}


@dataclass(frozen=True)
class ContentResult:
    module: str | None
    doc_type: str | None
    confidence: float
    matched_terms: tuple[str, ...]


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


def classify_content(manifest: dict[str, Any]) -> ContentResult:
    text = manifest_text(manifest)
    scores: dict[str, tuple[str, ...]] = {}
    for module, terms in CONTENT_HINTS.items():
        hits = tuple(term for term in terms if term.lower() in text)
        scores[module] = hits
    ranked = sorted(scores.items(), key=lambda item: (-len(item[1]), item[0]))
    if not ranked or len(ranked[0][1]) < 2:
        return ContentResult(None, None, 0.0, ())
    winner, hits = ranked[0]
    runner_up = len(ranked[1][1]) if len(ranked) > 1 else 0
    if len(hits) == runner_up:
        return ContentResult(None, None, 0.0, ())
    # A deterministic score represents evidence coverage, not model belief.
    confidence = min(0.95, 0.55 + 0.1 * len(hits))
    return ContentResult(winner, _content_doc_type(winner, hits), confidence, hits)


def _content_doc_type(module: str, hits: Iterable[str]) -> str | None:
    terms = set(hits)
    if module == "sales":
        if "订单" in terms or "订单金额" in terms:
            return "sales_order"
        if "发货" in terms:
            return "delivery"
        if "回款" in terms or "收款" in terms:
            return "payment"
        if "客户" in terms or "客户名称" in terms:
            return "customer"
    if module == "marketing":
        if "线索" in terms or "lead" in terms:
            return "lead"
        if "渠道" in terms or "channel" in terms:
            return "channel"
        if "市场活动" in terms or "campaign" in terms:
            return "campaign"
        if "投放" in terms or "广告" in terms:
            return "ad_spend"
    return None


class ClassificationService:
    """Append-only classification ledger with company-scoped current views."""

    def __init__(self, db_path) -> None:
        self._db_path = db_path

    def _conn(self):
        return connect(self._db_path)

    @staticmethod
    def _current(conn, *, file_hash: str, company_id: str):
        return conn.execute(
            """
            SELECT * FROM file_classifications
            WHERE file_hash=? AND company_id=? AND status != 'superseded'
            ORDER BY id DESC LIMIT 1
            """,
            (file_hash, company_id),
        ).fetchone()

    def classify_parsed(self, *, file_hash: str, company_id: str, manifest: dict[str, Any]) -> dict[str, Any]:
        """Record an effective content classification, preserving human choices."""
        result = classify_content(manifest)
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
                classified_by="auto", basis="content",
            )
            conn.commit()
            return dict(conn.execute("SELECT * FROM file_classifications WHERE id=?", (row_id,)).fetchone())

    def classify_name_fallback(self, *, file_hash: str, company_id: str, original_name: str) -> dict[str, Any] | None:
        """Record a filename-only preliminary label only when no current row exists."""
        guess = FileClassifier.guess(original_name)
        with self._conn() as conn:
            current = self._current(conn, file_hash=file_hash, company_id=company_id)
            if current is not None:
                return dict(current)
            row_id = self._insert(
                conn, file_hash=file_hash, company_id=company_id, module=guess.module,
                doc_type=guess.doc_type, confidence=guess.confidence, status="auto",
                classified_by="auto", basis="name",
            )
            conn.commit()
            return dict(conn.execute("SELECT * FROM file_classifications WHERE id=?", (row_id,)).fetchone())

    def list_current(self, *, company_id: str, module: str | None = None, include_history: bool = False) -> list[dict[str, Any]]:
        sql = """
            SELECT c.*, s.original_name, s.mime_type, s.size_bytes, s.uploaded_at
            FROM file_classifications c
            JOIN source_files s ON s.file_hash=c.file_hash
            WHERE c.company_id=? AND c.status != 'superseded'
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
                        SELECT module, doc_type, confidence, status, classified_by, basis, created_at
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
            )
            conn.commit()
            return dict(conn.execute("SELECT * FROM file_classifications WHERE id=?", (row_id,)).fetchone())

    @staticmethod
    def _same(row, result: ContentResult, *, basis: str) -> bool:
        return (
            row["basis"] == basis and row["module"] == result.module
            and row["doc_type"] == result.doc_type and row["status"] != "superseded"
        )

    @staticmethod
    def _insert(conn, *, file_hash: str, company_id: str, module: str | None,
                doc_type: str | None, confidence: float, status: str,
                classified_by: str, basis: str) -> int:
        cur = conn.execute(
            """
            INSERT INTO file_classifications
                (file_hash, company_id, module, doc_type, confidence, status,
                 classified_by, basis, created_at)
            VALUES (?,?,?,?,?,?,?,?,?)
            """,
            (file_hash, company_id, module, doc_type, confidence, status,
             classified_by, basis, _now()),
        )
        return int(cur.lastrowid)
