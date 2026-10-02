"""2.1.a deterministic entity attribution over 2A mapping blocks.

This is intentionally a slicing/classification bridge, not entity resolution:
it never edits values, calls a model, or writes 2B.  Every block keeps its
source coordinate and an ambiguous result remains explicitly reviewable.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import json
import re
from typing import Any

from ..db.database import connect
from ..source_map import _coord


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


_RELATIONS = (
    "控股子公司", "全资子公司", "子公司", "关联公司", "关联方", "合作方",
    "合作伙伴", "供应商", "客户", "投资方", "被投资方", "参股公司",
)
_ENTITY_NAME = re.compile(r"[\u4e00-\u9fffA-Za-z0-9·（）()_-]{2,40}(?:有限公司|有限责任公司|股份有限公司|集团公司|集团)")


@dataclass(frozen=True)
class BridgeBlock:
    block_index: int
    block_type: str
    content: str
    source_page: int | None
    source_span: str | None
    classification: str
    relation: str | None = None
    subject: str | None = None


def _text_blocks(manifest: dict[str, Any]) -> list[tuple[str, str, Any, str | None]]:
    blocks: list[tuple[str, str, Any, str | None]] = []
    for page in manifest.get("pages", []) if isinstance(manifest, dict) else []:
        if not isinstance(page, dict):
            continue
        page_no = page.get("page_no", page.get("page"))
        for item in page.get("text_items", []) or []:
            if not isinstance(item, dict) or not isinstance(item.get("text"), str):
                continue
            blocks.append(("text", item["text"], page_no, _coord(item.get("source_loc"), fallback_page=page_no)))
        for table in page.get("tables", []) or []:
            if not isinstance(table, dict):
                continue
            headers = table.get("headers") or []
            table_loc = table.get("source_loc")
            for row_index, row in enumerate(table.get("rows", []) or [], start=1):
                if isinstance(row, dict):
                    values = list(row.values())
                elif isinstance(row, list):
                    values = row
                else:
                    continue
                content = " / ".join(str(value) for value in values if value is not None)
                if headers:
                    content = " / ".join(str(value) for value in headers) + " => " + content
                location = row.get("source_loc") if isinstance(row, dict) else table_loc
                span = _coord(location, fallback_page=page_no)
                blocks.append(("table_row", content, page_no, span))
    return blocks


def _roster_tokens(rows: list[dict[str, Any]]) -> list[tuple[str, dict[str, Any]]]:
    tokens: list[tuple[str, dict[str, Any]]] = []
    for row in rows:
        if row.get("status") != "active" or row.get("superseded_by") is not None:
            continue
        values = [row.get("entity_name"), row.get("credit_code"), row.get("stock_code")]
        values.extend(row.get("aliases") or [])
        for value in values:
            token = str(value or "").strip()
            if token:
                tokens.append((token, row))
    return sorted(tokens, key=lambda item: len(item[0]), reverse=True)


def classify_block(content: str, roster: list[dict[str, Any]]) -> tuple[str, str | None, str | None]:
    """Classify without changing the block's content or numerical values."""
    text = str(content or "")
    tokens = _roster_tokens(roster)
    own = next(((token, row) for token, row in tokens if token.casefold() in text.casefold()), None)
    relation = next((term for term in _RELATIONS if term in text), None)
    if relation:
        # A relationship sentence is related even when the counterpart is not
        # yet in the roster; the subject is the longest structured company
        # name, or the matched roster token when it is available.
        # Prefer the counterparty following the relationship cue.  Searching
        # the complete sentence would greedily include the host's preceding
        # prose (for example ``本公司子公司远方科技有限公司``).
        relation_end = text.find(relation) + len(relation)
        subject_match = _ENTITY_NAME.search(text[relation_end:])
        if subject_match:
            subject = subject_match.group(0)
        else:
            subject_match = _ENTITY_NAME.search(text)
            subject = subject_match.group(0) if subject_match else (own[0] if own else None)
        if subject:
            return "related", relation, subject
    if own:
        return "self", None, own[0]
    # A named company asserting its own metric, without a relationship cue,
    # is foreign to the host scope.  Unnamed or weakly described text stays
    # ambiguous and must be reviewed rather than guessed.
    named = _ENTITY_NAME.search(text)
    if named:
        return "foreign", None, named.group(0)
    return "ambiguous", None, None


class EntityBridgeService:
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

    def _roster(self, company_id: str) -> list[dict[str, Any]]:
        with connect(self.db_path) as conn:
            rows = conn.execute(
                """SELECT * FROM entity_roster WHERE company_id=? AND status='active'
                   AND superseded_by IS NULL ORDER BY id DESC""", (company_id,),
            ).fetchall()
        result = []
        for row in rows:
            item = dict(row)
            item["aliases"] = json.loads(item.get("aliases") or "[]")
            result.append(item)
        return result

    def run(self, *, company_id: str, file_hash: str) -> dict[str, Any]:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        manifest = self._manifest(file_hash)
        roster = self._roster(company_id)
        raw_blocks = _text_blocks(manifest)
        created = _now()
        with connect(self.db_path) as conn:
            cur = conn.execute(
                "INSERT INTO entity_bridge_runs(company_id,file_hash,status,block_count,created_at) VALUES (?,?,?,0,?)",
                (company_id, file_hash, "running", created),
            )
            run_id = int(cur.lastrowid)
            for index, (block_type, content, page, span) in enumerate(raw_blocks):
                classification, relation, subject = classify_block(content, roster)
                conn.execute(
                    """INSERT INTO entity_bridge_blocks
                       (run_id,company_id,file_hash,block_index,block_type,content,source_page,source_span,
                        classification,relation,subject,needs_review,status,created_at)
                       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'pending',?)""",
                    (run_id, company_id, file_hash, index, block_type, content, page, span,
                     classification, relation, subject, 1 if classification == "ambiguous" else 0, created),
                )
            conn.execute(
                "UPDATE entity_bridge_runs SET status='completed',block_count=?,completed_at=? WHERE id=?",
                (len(raw_blocks), _now(), run_id),
            )
            conn.commit()
            row = conn.execute("SELECT * FROM entity_bridge_runs WHERE id=?", (run_id,)).fetchone()
        return dict(row)

    def list(self, *, company_id: str, run_id: int | None = None) -> list[dict[str, Any]]:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        sql = "SELECT * FROM entity_bridge_blocks WHERE company_id=?"
        params: list[Any] = [company_id]
        if run_id is not None:
            sql += " AND run_id=?"
            params.append(run_id)
        sql += " ORDER BY id ASC"
        with connect(self.db_path) as conn:
            return [dict(row) for row in conn.execute(sql, params).fetchall()]

    def ambiguous(self, *, company_id: str, run_id: int | None = None) -> list[dict[str, Any]]:
        rows = self.list(company_id=company_id, run_id=run_id)
        return [row for row in rows if row["needs_review"] and row["status"] == "pending"]

    def decide(self, *, company_id: str, block_id: int, classification: str, confirm: bool = False) -> dict[str, Any]:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        if not confirm:
            raise PermissionError("write operation requires --confirm")
        if classification not in {"self", "related", "foreign"}:
            raise ValueError("decision must be self, related, or foreign")
        with connect(self.db_path) as conn:
            row = conn.execute(
                "SELECT * FROM entity_bridge_blocks WHERE id=? AND company_id=? AND status='pending'",
                (block_id, company_id),
            ).fetchone()
            if row is None:
                raise KeyError(block_id)
            conn.execute(
                "UPDATE entity_bridge_blocks SET decision=?,classification=?,needs_review=0,status='decided' WHERE id=?",
                (classification, classification, block_id),
            )
            conn.commit()
            return dict(conn.execute("SELECT * FROM entity_bridge_blocks WHERE id=?", (block_id,)).fetchone())
