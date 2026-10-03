"""R2 folder-level L1/L0 narrative documents backed by L2 quotes."""
from __future__ import annotations
from datetime import datetime, timezone
import hashlib, json, re
from pathlib import Path
from typing import Any
from .db.database import connect
from .employees import EmployeeRunner, WorkerUnavailable
from .ports import MemoryProvider, LocalMemoryProvider
from .memory_paths import MEMORY_ROOT

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
    """Render folder navigation directly into OV; SQLite is not a prose store."""
    def __init__(self, db_path, memory: MemoryProvider | None = None, *, root: str = MEMORY_ROOT):
        self.db_path = db_path
        self.memory = memory or LocalMemoryProvider(Path(db_path).parent / ".ov-memory")
        self.root = root.rstrip("/") + "/narratives"

    def _uri(self, company_id: str, entity: str, folder: str, level: str) -> str:
        safe = lambda value: re.sub(r"[^\w.-]+", "_", str(value), flags=re.UNICODE).strip("_") or "unknown"
        return f"{self.root}/{safe(company_id)}/{safe(entity)}/{safe(folder)}/{level}"
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
        for (entity,folder), items in grouped.items():
            additions = [{**i["citation"], "line": i["line"]} for i in items]
            uri = self._uri(company_id, entity, folder, "L1/overview.md")
            old: list[dict[str, Any]] = []
            try:
                old = json.loads(self.memory.read(uri).split("\n\n", 1)[-1])
            except (FileNotFoundError, ValueError, json.JSONDecodeError):
                pass
            citations = list({json.dumps(x, ensure_ascii=False, sort_keys=True): x for x in old + additions}.values())
            lines = list(dict.fromkeys(str(x.get("line") or x.get("quote") or "") for x in citations))
            overview = "\n".join(f"- {line}" for line in lines)
            body = f"# L1 Overview\n\n{json.dumps(citations, ensure_ascii=False)}\n\n{overview}\n"
            self.memory.put(uri, body, metadata={"layer": "L1", "company_id": company_id, "folder": folder})
            self.memory.put(self._uri(company_id, entity, folder, "L0/abstract.md"), lines[0][:240] if lines else "", metadata={"layer": "L0"})
            changed.append({"entity":entity,"folder":folder})
        return {"folders": changed, "item_count": sum(map(len,grouped.values()))}
    def list(self, *, company_id, entity=None, folder=None):
        prefix = f"{self.root}/{re.sub(r'[^\w.-]+', '_', str(company_id), flags=re.UNICODE)}"
        # LocalMemoryProvider exposes paths relative to its sandbox root;
        # querying its namespace root keeps the adapter provider-neutral.
        query_prefix = "viking://" if isinstance(self.memory, LocalMemoryProvider) else prefix
        rows = []
        for item in self.memory.query(prefix=query_prefix):
            uri = str(item.get("uri", ""))
            if not uri.endswith("/L1/overview.md"):
                continue
            parts = uri.split("/")
            if len(parts) < 4:
                continue
            current_entity, current_folder = parts[-4], parts[-3]
            if entity and current_entity != re.sub(r"[^\w.-]+", "_", str(entity), flags=re.UNICODE):
                continue
            if folder and current_folder != re.sub(r"[^\w.-]+", "_", str(folder), flags=re.UNICODE):
                continue
            content = str(item.get("content", ""))
            chunks = content.split("\n\n", 2)
            citations = json.loads(chunks[1]) if len(chunks) > 1 else []
            overview = chunks[2].strip() if len(chunks) > 2 else ""
            rows.append({"company_id": company_id, "entity": current_entity, "folder": current_folder,
                         "l1_overview": overview, "l0_abstract": overview[:240], "citations": citations})
        return sorted(rows, key=lambda row: (row["entity"], row["folder"]))
