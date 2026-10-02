"""R2 folder-level L1/L0 narrative documents backed by L2 quotes."""
from __future__ import annotations
from datetime import datetime, timezone
import hashlib, json, re
from typing import Any
from .db.database import connect
from .employees import EmployeeRunner, WorkerUnavailable

FOLDERS = {"技术原理": "技术与产品", "产品与用途": "技术与产品", "客户与市场": "客户与市场",
           "供应链与运营": "供应链与运营", "团队": "团队", "其他": "其他"}
PLAN = re.compile(r"计划|目标|预计|拟|将|希望")
OPINION = re.compile(r"自称|领先|先进|认为|判断|评价|称")

def _now(): return datetime.now(timezone.utc).isoformat()
def _compact(value: Any): return re.sub(r"\s+", "", str(value or "").strip())

def verify_narrative_item(item: dict[str, Any], blocks: list[dict[str, Any]]) -> dict | None:
    entity, category = str(item.get("entity") or "").strip(), str(item.get("category") or "").strip()
    quote, content = _compact(item.get("quote")), str(item.get("content") or "").strip()
    kind, speaker = str(item.get("kind") or "").strip(), str(item.get("source_speaker") or "").strip()
    if not entity or category not in FOLDERS or not quote or not content or kind not in {"fact", "plan", "opinion"}: return None
    if kind in {"plan", "opinion"} and not speaker: return None
    if kind == "fact" and (PLAN.search(content) or OPINION.search(content)): return None
    for block in blocks:
        if entity == str(block.get("subject") or "").strip() and quote in _compact(block.get("content")):
            prefix = "（计划）" if kind == "plan" else (f"（观点·{speaker}）" if kind == "opinion" else "")
            return {"entity": entity, "folder": FOLDERS[category], "line": prefix + content,
                    "citation": {"file_hash": block["file_hash"], "page": block.get("source_page"),
                                 "span": block.get("source_span"), "quote": str(item.get("quote")).strip()}}
    return None

class NarrativeFolderService:
    def __init__(self, db_path): self.db_path = db_path
    def _blocks(self, company_id, file_hash, bridge_run_id=None):
        sql = """SELECT b.* FROM entity_bridge_blocks b JOIN entity_bridge_runs r ON r.id=b.run_id
                 WHERE b.company_id=? AND b.file_hash=? AND r.status='completed' AND b.classification='self'"""
        args=[company_id,file_hash]
        if bridge_run_id is not None: sql += " AND b.run_id=?"; args.append(bridge_run_id)
        with connect(self.db_path) as c: return [dict(x) for x in c.execute(sql+" ORDER BY b.run_id,b.block_index", args)]
    def rebuild(self, *, company_id, file_hash, bridge_run_id=None, worker=None, thread_id=None):
        if not company_id: raise ValueError("company_id must be injected by the host")
        blocks=self._blocks(company_id,file_hash,bridge_run_id); employee=worker or EmployeeRunner(); grouped={}
        for block in blocks:
            try: proposed=employee.run(skill="business-prose-extraction", text=block["content"], company_id=company_id, thread_id=thread_id)
            except (WorkerUnavailable, Exception): continue
            for raw in proposed:
                item=verify_narrative_item(raw,[block])
                if item: grouped.setdefault((item["entity"],item["folder"]),[]).append(item)
        changed=[]
        with connect(self.db_path) as c:
            for (entity,folder), items in grouped.items():
                # Deterministic assembly: no unsupported wording is introduced after verification.
                previous = c.execute("SELECT citations FROM narrative_folders WHERE company_id=? AND entity=? AND folder=?", (company_id, entity, folder)).fetchone()
                old = json.loads(previous["citations"]) if previous else []
                additions = [{**i["citation"], "line": i["line"]} for i in items]
                citations = list({json.dumps(x, ensure_ascii=False, sort_keys=True): x for x in old + additions}.values())
                lines=list(dict.fromkeys(str(i.get("line") or i.get("quote") or "") for i in citations))
                overview="\n".join(f"- {line}" for line in lines)
                abstract=lines[0][:240]
                fingerprint=hashlib.sha256(json.dumps(citations,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
                c.execute("""INSERT INTO narrative_folders(company_id,entity,folder,l1_overview,l0_abstract,citations,source_fingerprint,updated_at)
                           VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(company_id,entity,folder) DO UPDATE SET
                           l1_overview=excluded.l1_overview,l0_abstract=excluded.l0_abstract,citations=excluded.citations,
                           source_fingerprint=excluded.source_fingerprint,updated_at=excluded.updated_at""",
                          (company_id,entity,folder,overview,abstract,json.dumps(citations,ensure_ascii=False),fingerprint,_now()))
                changed.append({"entity":entity,"folder":folder})
            c.commit()
        return {"folders": changed, "item_count": sum(map(len,grouped.values()))}
    def list(self, *, company_id, entity=None, folder=None):
        sql,args="SELECT * FROM narrative_folders WHERE company_id=?",[company_id]
        if entity: sql+=" AND entity=?";args.append(entity)
        if folder: sql+=" AND folder=?";args.append(folder)
        with connect(self.db_path) as c:
            rows=[]
            for row in c.execute(sql+" ORDER BY entity,folder",args):
                x=dict(row);x["citations"]=json.loads(x["citations"]);rows.append(x)
            return rows
