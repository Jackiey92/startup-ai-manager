import json

from app.conversation_store import ConversationStore
from app.ports import LocalMemoryProvider, MemoryUnavailable, OpenVikingMemoryProvider


def test_append_repairs_provider_that_strips_trailing_newline(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    store = ConversationStore(memory)
    store.append("acme", "t", role="user", text="one", turn_id="1")
    uri = store.turns_uri("acme", "t")
    memory.put(uri, memory.read(uri).rstrip("\n"))
    store.append("acme", "t", role="assistant", text="two", turn_id="2")
    assert [row["turn_id"] for row in store.read_range("acme", "t")] == ["1", "2"]


def test_ov_not_found_maps_to_file_not_found():
    def runner(command, **kwargs):
        import subprocess
        return subprocess.CompletedProcess(command, 1, "", "NOT_FOUND")
    provider = OpenVikingMemoryProvider(runner=runner)
    try:
        provider.read("viking://missing")
    except FileNotFoundError:
        pass
    else:
        raise AssertionError("NOT_FOUND was not mapped")
