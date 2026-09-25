from datetime import datetime, timedelta, timezone

import pytest

from app.ports import LocalMemoryProvider
from app.runtime_memory import RuntimeWorkingMemory


def clock(value):
    return lambda: value


def test_runtime_state_flow_and_rebuild(tmp_path):
    now = datetime(2026, 9, 26, tzinfo=timezone.utc)
    memory = LocalMemoryProvider(tmp_path)
    runtime = RuntimeWorkingMemory(memory, clock=clock(now))
    state = runtime.create("s1", "t1", goal="import documents", ttl_seconds=3600, refs=["viking://.../2a/x"])
    assert state["state"] == "created"
    runtime.append_event("s1", "t1", "state", {"state": "running"})
    runtime.add_loop("s1", "t1", "missing-finance", "Need the latest financial statement")
    runtime.add_note("s1", "t1", "Likely a finance document", confidence=0.4)
    runtime.add_ref("s1", "t1", "viking://.../2b/cash.json")
    runtime.close_loop("s1", "t1", "missing-finance")
    final = runtime.append_event("s1", "t1", "state", {"state": "done"})
    assert final["state"] == "done"
    assert final["open_loops"] == []
    assert final["revision"] == 6
    rebuilt = runtime.rebuild(runtime._read_events("s1", "t1"), now=now)
    assert rebuilt == final


def test_ttl_expiry_uses_injected_clock_and_cleanup_preserves_2a_2b(tmp_path):
    start = datetime(2026, 9, 26, tzinfo=timezone.utc)
    current = [start]
    memory = LocalMemoryProvider(tmp_path)
    runtime = RuntimeWorkingMemory(memory, clock=lambda: current[0])
    runtime.create("s1", "t1", goal="temporary", ttl_seconds=10)
    runtime.append_event("s1", "t1", "state", {"state": "running"})
    current[0] = start + timedelta(seconds=11)
    assert runtime.close_or_expire("s1", "t1")["state"] == "expired"
    memory.put("viking://user/default/memories/projects/10_startup_ai_manager/2a/a.md", "l2")
    memory.put("viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/acme/cash.json", "fact")
    runtime.cleanup("s1", "t1")
    assert memory.read("viking://user/default/memories/projects/10_startup_ai_manager/2a/a.md") == "l2"
    assert memory.read("viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/acme/cash.json") == "fact"
    with pytest.raises(FileNotFoundError):
        memory.read("viking://user/default/memories/projects/10_startup_ai_manager/2c_runtime/s1/t1/state.json")


def test_runtime_notes_never_verified_and_refs_are_uris(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    runtime = RuntimeWorkingMemory(memory)
    runtime.create("s1", "t1", goal="x")
    with pytest.raises(ValueError, match="verified"):
        runtime.append_event("s1", "t1", "working_note", {"text": "bad", "status": "verified"})
    with pytest.raises(ValueError, match="viking://"):
        runtime.add_ref("s1", "t1", "not-a-uri")
