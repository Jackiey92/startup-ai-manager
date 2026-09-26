import json

from app.memory_map import MapBuilder
from app.ports import OpenVikingMemoryProvider


def test_map_builder_consumes_result_array_from_ls():
    responses = [
        # 2a recursive listing is present after eventual consistency settles.
            {"ok": True, "result": [{"uri": "viking://user/default/memories/projects/10_startup_ai_manager/2a_extraction/fixco/src_a/L0/abstract.md"}, {"uri": "viking://user/default/memories/projects/10_startup_ai_manager/2a_extraction/fixco/src_a/L2/manifest.json"}]},
        {"ok": True, "result": "# L0"},
        # 2b listing and exact fact read.
        {"ok": True, "result": [{"uri": "viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/fixco/registered_capital.json"}]},
        {"ok": True, "result": json.dumps({"status": "verified", "value": 100})},
            {"ok": True, "result": "ok"},
            {"ok": True, "result": [{"uri": "viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/fixco/registered_capital.json"}]},
            {"ok": True, "result": "ok"}, {"ok": True, "result": "ok"}, {"ok": True, "result": "ok"},
    ]

    def runner(command, **kwargs):
        import subprocess
        return subprocess.CompletedProcess(command, 0, json.dumps(responses.pop(0)), "")

    provider = OpenVikingMemoryProvider(runner=runner)
    result = MapBuilder(provider).rebuild_map("fixco")
    kinds = sorted(item["kind"] for item in result.map["branches"])
    assert kinds == ["2a", "2b"]
    assert all(not item["dangling"] for item in result.map["branches"])
