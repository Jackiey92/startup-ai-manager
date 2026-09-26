from datetime import datetime, timedelta, timezone

from app.conversation_store import ConversationStore, partition_turns
from app.context_assembler import ContextAssembler
from app.ports import LocalMemoryProvider
from app.thread_manager import ThreadManager
from app.thread_manager import ConversationTools
from app.config_sync import CONFIG_ROOT, sync_agent_config


def test_turns_append_range_and_fold_pointers(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    store = ConversationStore(memory)
    base = datetime(2026, 1, 1, tzinfo=timezone.utc)
    for i in range(10):
        store.append("acme", "t1", role="user", text=f"q{i}", turn_id=f"t{i}", server_at=(base + timedelta(minutes=i)).isoformat())
    rows = store.read_range("acme", "t1", start=base.isoformat(), end=(base + timedelta(minutes=3)).isoformat())
    assert len(rows) == 4
    folded = partition_turns(store.read_range("acme", "t1"), now=base + timedelta(minutes=20), window_minutes=15)
    assert folded["folded_count"] >= 1
    assert folded["pointers"][0]["kind"] == "l2_pointer"
    assert len(folded["first"]) <= 2 and len(folded["last"]) <= 6


def test_thread_index_omits_empty_and_promotion_requires_evidence(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    manager = ThreadManager(memory)
    assert manager.create("acme", "empty", title="hi", substantive=False)["indexed"] is False
    manager.create("acme", "t1", title="cap table", substantive=True)
    assert [row["thread_id"] for row in manager.list("acme")] == ["t1"]
    try:
        manager.promote("acme", "t1", fact_key="x", fact={"status": "claimed"})
    except ValueError:
        pass
    else:
        raise AssertionError("unverified promotion accepted")
    manager.promote("acme", "t1", fact_key="x", fact={"status": "verified", "source_refs": [{"uri": "viking://e"}], "value": 1})
    assert memory.get_fact("acme", "x")["value"] == 1


def test_context_assembler_map_is_bounded_and_does_not_copy_fact_body(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    memory.put("viking://user/default/memories/projects/10_startup_ai_manager/memory_maps/acme/map.json", '{"company_id":"acme","branches":[{"title":"财务","uri":"viking://user/default/memories/projects/10_startup_ai_manager/2a_extraction/acme/s1/L0/abstract.md","kind":"2a"}]}')
    assembler = ContextAssembler(memory, company_id="acme", thread_id="t1", agent_config="fixed", budget=200)
    result = assembler.assemble("财务")
    assert result["stats"]["tokens"] <= 200
    assert "facts" not in result["prompt"]
    assert "[agent_config]" in result["prompt"] and "[current_question]" in result["prompt"]


def test_conversation_tools_are_thread_and_company_scoped(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    manager = ThreadManager(memory)
    manager.create("acme", "t1", title="topic", summary="short")
    ConversationStore(memory).fold_l0("acme", "t1", summary="L0")
    tools = ConversationTools(memory, "acme", "t1")
    assert tools.thread_list()[0]["thread_id"] == "t1"
    assert tools.thread_open("t1") == "L0"
    try:
        tools.thread_open("other")
    except KeyError:
        pass
    else:
        raise AssertionError("invisible thread was opened")


def test_agent_config_sync_is_one_way_and_versioned(tmp_path):
    memory = LocalMemoryProvider(tmp_path / "memory")
    memory.put(CONFIG_ROOT + "/config.meta.json", '{"version":"v1"}')
    for name in ("SOUL.md", "IDENTITY.md", "AGENTS.md", "USER.md"):
        memory.put(CONFIG_ROOT + "/" + name, name)
    result = sync_agent_config(memory, tmp_path / "harness")
    assert result["version"] == "v1"
    assert (tmp_path / "harness" / "SOUL.md").read_text() == "SOUL.md"
