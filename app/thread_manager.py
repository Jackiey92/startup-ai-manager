"""Company-scoped conversation thread index and promotion boundary."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
import json
import re
from typing import Any

from .conversation_store import CONVERSATION_ROOT, ConversationStore
from .ports import MemoryProvider


def _safe(value: str) -> str:
    value = re.sub(r"[^A-Za-z0-9_.-]", "", str(value))
    if not value:
        raise ValueError("thread scope is empty")
    return value


class ThreadManager:
    def __init__(self, memory: MemoryProvider, *, root: str = CONVERSATION_ROOT):
        self.memory, self.root = memory, root.rstrip("/")

    def index_uri(self) -> str:
        return self.root + "/thread_index.json"

    def _read_index(self) -> list[dict[str, Any]]:
        try:
            value = json.loads(self.memory.read(self.index_uri()))
        except (FileNotFoundError, json.JSONDecodeError):
            return []
        return value if isinstance(value, list) else []

    def _write_index(self, rows: list[dict[str, Any]]) -> None:
        self.memory.put(self.index_uri(), json.dumps(rows, ensure_ascii=False, sort_keys=True), metadata={"layer": "conversation", "type": "thread_index"})

    def create(self, company_id: str, thread_id: str, *, title: str, summary: str = "", substantive: bool = True) -> dict[str, Any]:
        company, thread = _safe(company_id), _safe(thread_id)
        if not substantive:
            return {"company_id": company, "thread_id": thread, "indexed": False}
        item = {"company_id": company, "thread_id": thread, "title": title[:200], "summary": summary[:1000], "created_at": datetime.now(timezone.utc).isoformat(), "last_opened_at": datetime.now(timezone.utc).isoformat(), "status": "open"}
        rows = [row for row in self._read_index() if not (row.get("company_id") == company and row.get("thread_id") == thread)]
        rows.append(item)
        self._write_index(sorted(rows, key=lambda row: (row.get("company_id", ""), row.get("thread_id", ""))))
        self.memory.put(f"{self.root}/{company}/{thread}/thread.meta.json", json.dumps(item, ensure_ascii=False, sort_keys=True), metadata={"layer": "conversation", "type": "thread_meta"})
        return item

    def list(self, company_id: str) -> list[dict[str, Any]]:
        company = _safe(company_id)
        return [row for row in self._read_index() if row.get("company_id") == company and row.get("status") != "archived"]

    def open(self, company_id: str, thread_id: str) -> dict[str, Any]:
        company, thread = _safe(company_id), _safe(thread_id)
        rows = self.list(company)
        for row in rows:
            if row.get("thread_id") == thread:
                return row
        raise KeyError("thread not visible")

    def archive(self, company_id: str, thread_id: str) -> None:
        company, thread = _safe(company_id), _safe(thread_id)
        rows = self._read_index()
        found = False
        for row in rows:
            if row.get("company_id") == company and row.get("thread_id") == thread:
                row["status"] = "archived"; found = True
        if not found:
            raise KeyError("thread not visible")
        self._write_index(rows)

    @staticmethod
    def recycle_candidate(thread: dict[str, Any], *, now: datetime | None = None) -> bool:
        if thread.get("status") != "open":
            return False
        last = thread.get("last_opened_at")
        try:
            old = datetime.fromisoformat(str(last).replace("Z", "+00:00"))
        except ValueError:
            return False
        stale = old < (now or datetime.now(timezone.utc)) - timedelta(days=7)
        brief = len(str(thread.get("summary", "")).split()) <= 30
        return stale and (brief or not thread.get("verified_fact_refs"))

    def promote(self, company_id: str, thread_id: str, *, fact_key: str, fact: dict[str, Any]) -> None:
        self.open(company_id, thread_id)
        if fact.get("status") != "verified" or not fact.get("source_refs") or not fact.get("derived_from_turn_ids"):
            raise ValueError("only verified facts derived from evidenced turns may be promoted")
        turns = ConversationStore(self.memory).read_range(company_id, thread_id)
        turn_ids = {item.get("turn_id") for item in turns}
        if not set(fact.get("derived_from_turn_ids", ())).issubset(turn_ids):
            raise ValueError("fact references unknown conversation turns")
        for ref in fact.get("source_refs", ()):
            uri = ref.get("uri") if isinstance(ref, dict) else ref
            if not isinstance(uri, str) or not uri.startswith("viking://"):
                raise ValueError("fact evidence must be a viking URI")
            try:
                self.memory.read(uri)
            except Exception as exc:
                raise ValueError("fact evidence is unavailable") from exc
        promoted = dict(fact)
        promoted["derived_from"] = list(fact["derived_from_turn_ids"])
        self.memory.put_fact(_safe(company_id), _safe(fact_key), promoted)


class ConversationTools:
    """Scoped read/promote tools exposed to an agent, never a global browser API."""
    def __init__(self, memory: MemoryProvider, company_id: str, thread_id: str):
        self.memory, self.company_id, self.thread_id = memory, _safe(company_id), _safe(thread_id)
        self.store = ConversationStore(memory)
        self.manager = ThreadManager(memory)

    def conversation_read(self, start: str | None = None, end: str | None = None) -> list[dict[str, Any]]:
        return self.store.read_range(self.company_id, self.thread_id, start=start, end=end)

    def thread_list(self) -> list[dict[str, Any]]:
        return self.manager.list(self.company_id)

    def thread_open(self, thread_id: str) -> str:
        row = self.manager.open(self.company_id, thread_id)
        uri = f"{self.manager.root}/{self.company_id}/{_safe(thread_id)}/L0/thread_summary.md"
        try:
            return self.memory.read(uri)
        except FileNotFoundError:
            return str(row.get("summary", ""))
        except Exception as exc:
            raise RuntimeError("thread summary unavailable") from exc

    def promote(self, thread_id: str, *, fact_key: str, fact: dict[str, Any]) -> None:
        self.manager.promote(self.company_id, thread_id, fact_key=fact_key, fact=fact)
