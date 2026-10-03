"""2.1.a employee entity attribution over 2A mapping blocks.

This is intentionally a source-preserving employee boundary, not entity
resolution: it never edits values or writes 2B. Every block keeps its source
coordinate and an ambiguous result remains explicitly reviewable.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import json
import re
from typing import Any

from ..db.database import connect
from ..source_map import _coord
from ..employees import SemanticDecisionUnavailable, SemanticEmployee
from .model_client import EntityAttributionModelClient


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


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


_BULLET_PREFIX = re.compile(r"^\s*[•●▪◦‣⁃]\s*")


def _bbox_x0(source_loc: Any) -> float | None:
    bbox = source_loc.get("bbox") if isinstance(source_loc, dict) else None
    value: Any = None
    if isinstance(bbox, dict):
        value = bbox.get("x0", bbox.get("left"))
    elif isinstance(bbox, (list, tuple)) and bbox:
        value = bbox[0]
    try:
        return float(value) if value is not None else None
    except (TypeError, ValueError):
        return None


def _item_structure(item: dict[str, Any]) -> dict[str, Any]:
    """Identify list structure from real MinerU text/source fields.

    Current MinerU payloads only promise ``text`` and ``source_loc``.  The
    optional parser fields remain accepted for older fixtures, but production
    detection is the visible bullet prefix or the normalized bbox indentation
    (body/title x0 around .091, indented bullets around .126).
    """
    text = str(item.get("text") or "")
    source_loc = item.get("source_loc")
    x0 = _bbox_x0(source_loc)
    visual_bullet = bool(_BULLET_PREFIX.match(text)) or (x0 is not None and x0 >= 0.115)
    kind = str(item.get("kind") or item.get("block_type") or item.get("type") or item.get("role") or "").casefold()
    list_kinds = {"bullet", "list_item", "list-item", "list item"}
    list_level = item.get("list_level")
    if list_level is None and kind in list_kinds:
        list_level = item.get("level")
    is_bullet = visual_bullet or bool(item.get("is_bullet") or item.get("bullet") or list_level is not None)
    is_bullet = is_bullet or kind in list_kinds
    is_heading = bool(item.get("is_heading")) or kind in {"heading", "title", "section", "header"}
    return {"is_bullet": is_bullet, "list_level": list_level, "is_heading": is_heading}


def _text_blocks(manifest: dict[str, Any]) -> list[tuple[str, str, Any, str | None, dict[str, Any]]]:
    blocks: list[tuple[str, str, Any, str | None, dict[str, Any]]] = []
    for page in manifest.get("pages", []) if isinstance(manifest, dict) else []:
        if not isinstance(page, dict):
            continue
        page_no = page.get("page_no", page.get("page"))
        for item in page.get("text_items", []) or []:
            if not isinstance(item, dict) or not isinstance(item.get("text"), str):
                continue
            blocks.append(("text", item["text"], page_no,
                           _coord(item.get("source_loc"), fallback_page=page_no),
                           _item_structure(item)))
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
                blocks.append(("table_row", content, page_no, span, {"is_bullet": False, "is_heading": False}))
    return blocks


def _validate_model_result(result: Any) -> dict[str, Any]:
    if not isinstance(result, dict) or set(result) != {"label", "subject", "reason"}:
        raise ValueError("invalid model classification shape")
    if result["label"] not in {"self", "related", "foreign", "ambiguous"}:
        raise ValueError("invalid model classification label")
    if result["subject"] is not None and not isinstance(result["subject"], str):
        raise ValueError("invalid model classification subject")
    if not isinstance(result["reason"], str) or not result["reason"].strip():
        raise ValueError("invalid model classification reason")
    return result


class EntityBridgeService:
    def __init__(self, db_path, *, model_client=None, employee: SemanticEmployee | None = None):
        self.db_path = db_path
        self.model_client = model_client
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

    @staticmethod
    def _model_scope(roster: list[dict[str, Any]]) -> tuple[str | None, list[str]]:
        """Expose only the host name/aliases, never the complete roster."""
        declared = [row for row in roster if row.get("origin") == "declared" and row.get("entity_type") == "self"]
        host = declared[0] if declared else next((row for row in roster if row.get("entity_type") == "self"), None)
        if host is None:
            return None, []
        return host.get("entity_name"), list(host.get("aliases") or [])

    def run(self, *, company_id: str, file_hash: str, use_model: bool = False,
            thread_id: str | None = None) -> dict[str, Any]:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        if self.employee is None and not use_model:
            raise ValueError("entity employee is required")
        manifest = self._manifest(file_hash)
        roster = self._roster(company_id)
        model = self.model_client
        if use_model and model is None:
            model = EntityAttributionModelClient()
        company_name, aliases = self._model_scope(roster)
        raw_blocks = _text_blocks(manifest)
        created = _now()
        with connect(self.db_path) as conn:
            cur = conn.execute(
                "INSERT INTO entity_bridge_runs(company_id,file_hash,status,block_count,created_at) VALUES (?,?,?,0,?)",
                (company_id, file_hash, "running", created),
            )
            run_id = int(cur.lastrowid)
            expanded_blocks = []
            for block_type, content, page, span, structure in raw_blocks:
                # The employee receives the original block. The bridge never
                # rewrites prose or splits it using an application rule.
                sections = [content]
                expanded_blocks.extend((block_type, section, page, span, structure) for section in sections)
            for index, (block_type, content, page, span, structure) in enumerate(expanded_blocks):
                reason = None
                relation = None
                source = "employee" if self.employee is not None else "deterministic"
                if self.employee is not None:
                    try:
                        result = self.employee.attribute_block(
                            text=content, company_name=company_name, aliases=aliases,
                            company_id=company_id, thread_id=thread_id,
                        )
                        classification = result["label"]
                        relation = result.get("relation")
                        subject = result.get("subject")
                        reason = result.get("reason")
                    except (SemanticDecisionUnavailable, OSError, TypeError, ValueError):
                        classification, relation, subject = "ambiguous", None, None
                        reason = "employee semantic attribution unavailable"
                else:
                    source = "model"
                    try:
                        result = _validate_model_result(model.classify(
                            text=content, company_name=company_name, aliases=aliases
                        ))
                        classification = result["label"]
                        relation = None
                        subject = result["subject"]
                        reason = result["reason"]
                    except Exception:
                        # Do not expose provider errors or allow a malformed
                        # answer to weaken review safety.
                        classification, subject, reason = "ambiguous", None, "model classification unavailable or invalid"
                needs_review = 1 if classification == "ambiguous" else 0
                conn.execute(
                    """INSERT INTO entity_bridge_blocks
                       (run_id,company_id,file_hash,block_index,block_type,content,source_page,source_span,
                       classification,relation,subject,reason,source,needs_review,status,created_at)
                       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'pending',?)""",
                    (run_id, company_id, file_hash, index, block_type, content, page, span,
                     classification, relation, subject, reason, source, needs_review, created),
                )
            conn.execute(
                "UPDATE entity_bridge_runs SET status='completed',block_count=?,completed_at=? WHERE id=?",
                (len(expanded_blocks), _now(), run_id),
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
                "UPDATE entity_bridge_blocks SET decision=?,classification=?,needs_review=0,source='human',status='decided' WHERE id=?",
                (classification, classification, block_id),
            )
            conn.commit()
            return dict(conn.execute("SELECT * FROM entity_bridge_blocks WHERE id=?", (block_id,)).fetchone())
