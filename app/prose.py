"""R2 source-verified human-readable L1 entries."""
from __future__ import annotations

from datetime import datetime, timezone
import re
from typing import Any

from .db.database import connect
from .employees import EmployeeRunner, WorkerUnavailable

_CATEGORIES = {"技术原理", "产品与用途", "客户与市场", "供应链与运营", "团队", "其他"}
_KINDS = {"fact", "plan", "opinion"}
_PLAN = re.compile(r"计划|目标|预计|拟|将|希望")
_OPINION = re.compile(r"自称|领先|先进|认为|判断|评价|称")

def _now(): return datetime.now(timezone.utc).isoformat()
def _compact(value: Any) -> str: return re.sub(r"\s+", "", str(value or "").strip())

def verify_prose(candidate: dict[str, Any], blocks: list[dict[str, Any]], *, company_id: str) -> dict | None:
    entity, category = str(candidate.get("entity") or "").strip(), str(candidate.get("category") or "").strip()
    kind, quote, content = str(candidate.get("kind") or "").strip(), _compact(candidate.get("quote")), str(candidate.get("content") or "").strip()
    speaker = candidate.get("source_speaker")
    if not entity or not content or not quote or category not in _CATEGORIES or kind not in _KINDS:
        return None
    if speaker is not None and not isinstance(speaker, str): return None
    if kind in {"plan", "opinion"} and not str(speaker or "").strip(): return None
    if kind == "fact" and (_PLAN.search(content) or _OPINION.search(content)):
        return None
    for block in blocks:
        if entity == str(block.get("subject") or "").strip() and quote in _compact(block.get("content")):
            return {"company_id": company_id, "entity": entity, "category": category, "kind": kind,
                    "source_speaker": str(speaker).strip() if speaker else None, "content": content,
                    "source_file": block["file_hash"], "source_page": block.get("source_page"),
                    "source_span": block.get("source_span"), "quote": str(candidate.get("quote")).strip()}
    return None

class ProseExtractionService:
    def __init__(self, db_path): self.db_path = db_path

    def _blocks(self, company_id, file_hash, bridge_run_id=None):
        sql = """SELECT b.* FROM entity_bridge_blocks b JOIN entity_bridge_runs r ON r.id=b.run_id
                 WHERE b.company_id=? AND b.file_hash=? AND r.status='completed' AND b.classification='self'"""
        args = [company_id, file_hash]
        if bridge_run_id is not None: sql += " AND b.run_id=?"; args.append(bridge_run_id)
        sql += " ORDER BY b.run_id, b.block_index"
        with connect(self.db_path) as conn: return [dict(row) for row in conn.execute(sql, args)]

    def extract(self, *, company_id, file_hash, bridge_run_id=None, worker=None, thread_id=None):
        if not company_id: raise ValueError("company_id must be injected by the host")
        blocks, employee, accepted = self._blocks(company_id, file_hash, bridge_run_id), worker or EmployeeRunner(), []
        for block in blocks:
            try: proposed = employee.run(skill="business-prose-extraction", text=block["content"], company_id=company_id, thread_id=thread_id)
            except (WorkerUnavailable, Exception): continue
            accepted.extend(filter(None, (verify_prose(item, [block], company_id=company_id) for item in proposed)))
        with connect(self.db_path) as conn:
            for item in accepted:
                conn.execute("""INSERT OR IGNORE INTO prose_facts(company_id,entity,category,kind,source_speaker,content,source_file,source_page,source_span,quote,status,created_at)
                             VALUES (:company_id,:entity,:category,:kind,:source_speaker,:content,:source_file,:source_page,:source_span,:quote,'active',:created_at)""", {**item, "created_at": _now()})
            conn.commit()
        return {"candidate_count": len(accepted), "fact_count": len(self.list(company_id=company_id, file_hash=file_hash))}

    def list(self, *, company_id, entity=None, category=None, file_hash=None):
        sql, args = "SELECT * FROM prose_facts WHERE company_id=? AND status='active'", [company_id]
        for column, value in (("entity", entity), ("category", category), ("source_file", file_hash)):
            if value: sql += f" AND {column}=?"; args.append(value)
        sql += " ORDER BY id"
        with connect(self.db_path) as conn: return [dict(row) for row in conn.execute(sql, args)]
