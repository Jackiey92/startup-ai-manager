"""Ephemeral 2c runtime/working memory with event-sourced rebuilds."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import json
from typing import Any, Callable, Iterable
import uuid

from .ports import MemoryProvider


RUNTIME_ROOT = "viking://user/default/memories/projects/10_startup_ai_manager/2c_runtime"
STATES = {"created", "running", "waiting", "blocked", "done", "cancelled", "expired"}
TERMINAL = {"done", "cancelled", "expired"}
TRANSITIONS = {
    "created": {"running", "cancelled"},
    "running": {"waiting", "blocked", "done", "cancelled"},
    "waiting": {"running", "blocked", "done", "cancelled"},
    "blocked": {"running", "waiting", "done", "cancelled"},
    "done": set(), "cancelled": set(), "expired": set(),
}


def _iso(value: datetime) -> str:
    return value.astimezone(timezone.utc).isoformat()


def _parse(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def _uri(value: str) -> str:
    if not isinstance(value, str) or not value.startswith("viking://"):
        raise ValueError("runtime refs must be viking:// URIs")
    return value


def _scope(value: str) -> str:
    value = "".join(ch for ch in str(value) if ch.isalnum() or ch in "._-")
    if not value:
        raise ValueError("runtime scope cannot be empty")
    return value


@dataclass(frozen=True)
class RuntimeRef:
    uri: str

    def __post_init__(self) -> None:
        _uri(self.uri)


class RuntimeWorkingMemory:
    def __init__(self, memory: MemoryProvider, *, root: str = RUNTIME_ROOT, clock: Callable[[], datetime] | None = None):
        self.memory = memory
        self.root = root.rstrip("/")
        self.clock = clock or (lambda: datetime.now(timezone.utc))

    def _base(self, session_id: str, task_id: str) -> str:
        return f"{self.root}/{_scope(session_id)}/{_scope(task_id)}"

    def _events_uri(self, session_id: str, task_id: str) -> str:
        return f"{self._base(session_id, task_id)}/events.jsonl"

    def _state_uri(self, session_id: str, task_id: str) -> str:
        return f"{self._base(session_id, task_id)}/state.json"

    def create(self, session_id: str, task_id: str, *, goal: str, company_id: str | None = None, ttl_seconds: int = 86400, refs: Iterable[str] = ()) -> dict[str, Any]:
        now = self.clock()
        state = {
            "session_id": session_id, "task_id": task_id, "company_id": company_id,
            "state": "created", "goal": goal, "open_loops": [], "working_notes": [],
            "refs": [_uri(ref) for ref in refs], "last_actions": [],
            "created_at": _iso(now), "updated_at": _iso(now),
            "expires_at": _iso(now + timedelta(seconds=ttl_seconds)), "version": 1, "revision": 0,
        }
        self._write_events(session_id, task_id, [{"event_id": str(uuid.uuid4()), "type": "created", "at": _iso(now), "payload": state}])
        self._write_state(state)
        return state

    def append_event(self, session_id: str, task_id: str, event_type: str, payload: dict[str, Any] | None = None, *, at: datetime | None = None) -> dict[str, Any]:
        current = self.get_runtime(session_id, task_id)
        event = {"event_id": str(uuid.uuid4()), "type": event_type, "at": _iso(at or self.clock()), "payload": payload or {}}
        state = self.rebuild(self._read_events(session_id, task_id) + [event], now=at or self.clock())
        self._write_events(session_id, task_id, self._read_events(session_id, task_id) + [event])
        self._write_state(state)
        return state

    def add_loop(self, session_id: str, task_id: str, loop_id: str, text: str) -> dict[str, Any]:
        return self.append_event(session_id, task_id, "open_loop_add", {"id": loop_id, "text": text})

    def close_loop(self, session_id: str, task_id: str, loop_id: str) -> dict[str, Any]:
        return self.append_event(session_id, task_id, "open_loop_remove", {"id": loop_id})

    def add_note(self, session_id: str, task_id: str, text: str, *, confidence: float = 0.5, inferred: bool = True) -> dict[str, Any]:
        return self.append_event(session_id, task_id, "working_note", {"text": text, "confidence": confidence, "inferred": inferred, "status": "working"})

    def add_ref(self, session_id: str, task_id: str, uri: str) -> dict[str, Any]:
        return self.append_event(session_id, task_id, "ref_add", {"uri": _uri(uri)})

    def close_or_expire(self, session_id: str, task_id: str, *, state: str | None = None) -> dict[str, Any]:
        current = self.get_runtime(session_id, task_id)
        if state is not None:
            return self.append_event(session_id, task_id, "state", {"state": state})
        if current["state"] not in TERMINAL and _parse(current["expires_at"]) <= self.clock():
            return self.append_event(session_id, task_id, "state", {"state": "expired"})
        return current

    def get_runtime(self, session_id: str, task_id: str) -> dict[str, Any]:
        try:
            return json.loads(self.memory.read(self._state_uri(session_id, task_id)))
        except FileNotFoundError:
            events = self._read_events(session_id, task_id)
            if not events:
                raise KeyError((session_id, task_id))
            state = self.rebuild(events, now=self.clock())
            self._write_state(state)
            return state

    def rebuild(self, events: list[dict[str, Any]], *, now: datetime | None = None) -> dict[str, Any]:
        if not events or events[0].get("type") != "created":
            raise ValueError("runtime event stream must start with created")
        base = dict(events[0]["payload"])
        base.setdefault("open_loops", []); base.setdefault("working_notes", []); base.setdefault("refs", []); base.setdefault("last_actions", [])
        previous = base["state"]
        for event in events[1:]:
            payload = event.get("payload") or {}
            if event["type"] == "state":
                target = payload.get("state")
                expiry_transition = target == "expired" and previous not in TERMINAL and _parse(base["expires_at"]) <= _parse(event["at"])
                if target not in STATES or (target not in TRANSITIONS[previous] and not expiry_transition):
                    raise ValueError(f"invalid runtime transition {previous}->{target}")
                previous = target; base["state"] = target
            elif event["type"] == "open_loop_add":
                if not any(item.get("id") == payload.get("id") for item in base["open_loops"]): base["open_loops"].append(payload)
            elif event["type"] == "open_loop_remove":
                base["open_loops"] = [item for item in base["open_loops"] if item.get("id") != payload.get("id")]
            elif event["type"] == "working_note":
                if payload.get("status") == "verified": raise ValueError("runtime working notes cannot be verified")
                base["working_notes"].append({**payload, "status": "working"})
            elif event["type"] == "ref_add":
                base["refs"].append(_uri(payload["uri"]))
            elif event["type"] == "action":
                base["last_actions"].append(payload)
        now = now or datetime.now(timezone.utc)
        if base["state"] not in TERMINAL and _parse(base["expires_at"]) <= now:
            base["state"] = "expired"
        base["updated_at"] = _iso(now)
        base["revision"] = len(events) - 1
        return base

    def cleanup(self, session_id: str, task_id: str) -> None:
        delete = getattr(self.memory, "delete", None)
        if delete is None: return
        delete(self._base(session_id, task_id), recursive=True)

    def _read_events(self, session_id: str, task_id: str) -> list[dict[str, Any]]:
        try: content = self.memory.read(self._events_uri(session_id, task_id))
        except FileNotFoundError: return []
        return [json.loads(line) for line in content.splitlines() if line.strip()]

    def _write_events(self, session_id: str, task_id: str, events: list[dict[str, Any]]) -> None:
        content = "\n".join(json.dumps(event, ensure_ascii=False, sort_keys=True) for event in events) + "\n"
        self.memory.put(self._events_uri(session_id, task_id), content, metadata={"layer": "2c", "type": "runtime_events"})

    def _write_state(self, state: dict[str, Any]) -> None:
        self.memory.put(self._state_uri(state["session_id"], state["task_id"]), json.dumps(state, ensure_ascii=False, sort_keys=True), metadata={"layer": "2c", "type": "runtime_state"})
