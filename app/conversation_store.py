"""Portable event-sourced conversation storage and bounded folding."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
import json
from typing import Any, Iterable
import uuid

from .ports import MemoryProvider

CONVERSATION_ROOT = "viking://user/default/memories/projects/10_startup_ai_manager/conversations"
KEEP_FIRST = 2
KEEP_LAST = 6


def _iso(value: datetime | None = None) -> str:
    return (value or datetime.now(timezone.utc)).astimezone(timezone.utc).isoformat()


def _scope(value: str) -> str:
    clean = "".join(ch for ch in str(value) if ch.isalnum() or ch in "._-")
    if not clean:
        raise ValueError("conversation scope is empty")
    return clean


def partition_turns(turns: list[dict[str, Any]], *, now: datetime | None = None, window_minutes: int = 15, keep_first: int = KEEP_FIRST, keep_last: int = KEEP_LAST) -> dict[str, Any]:
    """Keep the head/tail verbatim and fold the middle into pointer lines."""
    ordered = sorted(turns, key=lambda item: (str(item.get("server_at", "")), str(item.get("turn_id", ""))))
    cutoff = (now or datetime.now(timezone.utc)) - timedelta(minutes=window_minutes)
    recent = []
    for turn in ordered:
        try:
            when = datetime.fromisoformat(str(turn.get("server_at", "")).replace("Z", "+00:00"))
        except ValueError:
            when = cutoff
        if when >= cutoff:
            recent.append(turn)
    if not recent:
        recent = ordered[-keep_last:]
    fixed_first = ordered[:keep_first]
    fixed_last = recent[-keep_last:]
    keep_ids = {item.get("turn_id") for item in fixed_first + fixed_last}
    middle = [item for item in ordered if item.get("turn_id") not in keep_ids]
    pointers = []
    if middle:
        pointers.append({
            "kind": "l2_pointer", "from": middle[0].get("turn_id"), "to": middle[-1].get("turn_id"),
            "time_from": middle[0].get("server_at"), "time_to": middle[-1].get("server_at"),
            "summary": "较早对话已折叠，原文保存在 L2 turns.jsonl。",
        })
    return {"first": fixed_first, "pointers": pointers, "last": fixed_last, "folded_count": len(middle)}


def replay_turns(lines: Iterable[str], *, start: str | None = None, end: str | None = None) -> list[dict[str, Any]]:
    result = []
    for line in lines:
        if not line.strip():
            continue
        item = json.loads(line)
        at = str(item.get("server_at", ""))
        if start and at < start:
            continue
        if end and at > end:
            continue
        result.append(item)
    return result


class ConversationStore:
    def __init__(self, memory: MemoryProvider, *, root: str = CONVERSATION_ROOT):
        self.memory, self.root = memory, root.rstrip("/")

    def base(self, company_id: str, thread_id: str) -> str:
        return f"{self.root}/{_scope(company_id)}/{_scope(thread_id)}"

    def turns_uri(self, company_id: str, thread_id: str) -> str:
        return self.base(company_id, thread_id) + "/L2/turns.jsonl"

    def append(self, company_id: str, thread_id: str, *, role: str, text: str, tool_results: list[dict[str, Any]] | None = None, turn_id: str | None = None, server_at: str | None = None) -> dict[str, Any]:
        if role not in {"user", "assistant", "tool", "system"}:
            raise ValueError("invalid conversation role")
        turn = {"turn_id": turn_id or uuid.uuid4().hex, "role": role, "server_at": server_at or _iso(), "text": str(text), "tool_results": tool_results or []}
        uri = self.turns_uri(company_id, thread_id)
        try:
            old = self.memory.read(uri)
        except FileNotFoundError:
            old = ""
        self.memory.put(uri, old + json.dumps(turn, ensure_ascii=False, sort_keys=True) + "\n", metadata={"layer": "conversation", "level": "L2"})
        return turn

    def read_range(self, company_id: str, thread_id: str, *, start: str | None = None, end: str | None = None) -> list[dict[str, Any]]:
        try:
            text = self.memory.read(self.turns_uri(company_id, thread_id))
        except FileNotFoundError:
            return []
        return replay_turns(text.splitlines(), start=start, end=end)

    def fold_l1(self, company_id: str, thread_id: str, *, now: datetime | None = None, window_minutes: int = 15) -> dict[str, Any]:
        turns = self.read_range(company_id, thread_id)
        folded = partition_turns(turns, now=now, window_minutes=window_minutes)
        body = json.dumps(folded, ensure_ascii=False, sort_keys=True)
        uri = self.base(company_id, thread_id) + f"/L1/{(now or datetime.now(timezone.utc)).strftime('%Y%m%dT%H%M%SZ')}.md"
        self.memory.put(uri, body, metadata={"layer": "conversation", "level": "L1"})
        return folded

    def fold_l0(self, company_id: str, thread_id: str, *, summary: str) -> str:
        uri = self.base(company_id, thread_id) + "/L0/thread_summary.md"
        self.memory.put(uri, summary, metadata={"layer": "conversation", "level": "L0"})
        return uri
