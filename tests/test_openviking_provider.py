import json
import subprocess

import pytest

from app.ports import MemoryUnavailable, OpenVikingMemoryProvider


def fake_runner_factory(responses):
    calls = []

    def runner(command, **kwargs):
        calls.append((command, kwargs))
        response = responses.pop(0)
        return subprocess.CompletedProcess(command, response[0], response[1], response[2])

    runner.calls = calls
    return runner


def test_openviking_provider_uses_cli_and_injected_transport(tmp_path):
    runner = fake_runner_factory([
        (0, json.dumps({"ok": True}), ""),
        (0, json.dumps({"content": "hello"}), ""),
        (0, json.dumps({"results": [{"uri": "viking://x.md"}]}), ""),
        (0, json.dumps({"results": [{"uri": "viking://x.md"}]}), ""),
    ])
    provider = OpenVikingMemoryProvider(
        base_url="https://ov.example.test",
        api_key="secret-for-test",
        runner=runner,
    )

    provider.put("viking://x.md", "hello", metadata={"layer": "2a"})
    assert provider.read("viking://x.md") == "hello"
    assert provider.query(prefix="viking://x", query="hello")[0]["uri"] == "viking://x.md"
    assert provider.search("hello")[0]["uri"] == "viking://x.md"

    command, kwargs = runner.calls[0]
    assert command[0] == "ov"
    assert "write" in command
    assert kwargs["env"]["OPENVIKING_URL"] == "https://ov.example.test"
    assert kwargs["env"]["VIKINGBOT_ENDPOINT"] == "https://ov.example.test"
    assert kwargs["env"]["VIKINGBOT_API_KEY"] == "secret-for-test"
    assert "secret-for-test" not in " ".join(command)


def test_add_resource_passes_full_ov_parent_auto_create_uri(tmp_path):
    source = tmp_path / "annual.pdf"
    source.write_bytes(b"pdf")
    runner = fake_runner_factory([(0, json.dumps({"ok": True}), "")])
    provider = OpenVikingMemoryProvider(base_url="http://127.0.0.1:1933", runner=runner)
    provider.add_resource(str(source), parent="viking://resources/财务", wait=True)
    command, _ = runner.calls[0]
    assert command[:4] == ["ov", "add-resource", str(source), "--parent-auto-create"]
    assert command[4] == "viking://resources/财务"
    assert "--wait" in command


def test_add_resource_handles_missing_parent_without_plain_parent_fallback(tmp_path):
    source = tmp_path / "annual.pdf"
    source.write_bytes(b"pdf")
    calls = []

    def runner(command, **kwargs):
        calls.append(command)
        if "--parent" in command and "--parent-auto-create" not in command:
            return subprocess.CompletedProcess(command, 1, "", "NOT_FOUND: resource directory")
        return subprocess.CompletedProcess(command, 0, json.dumps({"ok": True}), "")

    provider = OpenVikingMemoryProvider(runner=runner)
    provider.add_resource(str(source), parent="viking://resources/财务", wait=True)
    assert len(calls) == 1
    assert "--parent-auto-create" in calls[0]
    assert "--parent" not in [item for item in calls[0] if item != "--parent-auto-create"]


def test_add_resource_to_uses_exact_target_and_parent_is_separate(tmp_path):
    source = tmp_path / "parsed.md"
    source.write_text("中文正文", encoding="utf-8")
    runner = fake_runner_factory([
        (0, json.dumps({"ok": True}), ""),
        (0, json.dumps({"ok": True}), ""),
    ])
    provider = OpenVikingMemoryProvider(runner=runner)
    parent = "viking://resources/技术与产品"
    target = parent + "/" + "a" * 64 + ".md"
    provider.ensure_directory(parent)
    provider.add_resource_to(str(source), target, wait=True, timeout=37)
    (mkdir, _), (add, _) = runner.calls
    assert mkdir[1:3] == ["mkdir", parent]
    assert add[1:4] == ["add-resource", str(source), "--to"]
    assert add[4] == target
    assert "--parent" not in add and "--parent-auto-create" not in add
    assert add[add.index("--timeout") + 1] == "37"


def test_async_resource_processing_polls_until_ready_without_resubmitting(tmp_path):
    source = tmp_path / "annual.md"
    source.write_text("财务收入 3.26亿元", encoding="utf-8")
    calls = []
    responses = [
        (0, json.dumps({"uri": "viking://resources/财务/annual.md", "status": "processing"}), ""),
        (0, json.dumps({"status": "processing", "overview_ready": False}), ""),
        (0, json.dumps({"status": "ready", "overview_ready": True, "abstract_ready": True}), ""),
    ]

    def runner(command, **kwargs):
        calls.append(command)
        response = responses.pop(0)
        return subprocess.CompletedProcess(command, response[0], response[1], response[2])

    provider = OpenVikingMemoryProvider(runner=runner)
    result = provider.add_resource(str(source), parent="viking://resources/财务", wait=False)
    provider.wait_for_resource(result["uri"], timeout=2, interval=0)
    assert sum(command[1] == "add-resource" for command in calls) == 1
    assert [command[1] for command in calls] == ["add-resource", "stat", "stat"]


def test_not_found_child_is_pending_until_stat_becomes_ready(tmp_path):
    source = tmp_path / "annual.md"
    source.write_text("财务收入 3.26亿元", encoding="utf-8")
    calls = []
    responses = [
        (0, json.dumps({"ok": True}), ""),
        (1, "", "NOT_FOUND: resource is still being created"),
        (0, json.dumps({"status": "ready", "overview_ready": True, "abstract_ready": True}), ""),
    ]

    def runner(command, **kwargs):
        calls.append(command)
        response = responses.pop(0)
        return subprocess.CompletedProcess(command, response[0], response[1], response[2])

    provider = OpenVikingMemoryProvider(runner=runner)
    provider.add_resource(str(source), parent="viking://resources/财务", wait=False)
    provider.wait_for_resource("viking://resources/财务/annual.md", timeout=2, interval=0)
    assert [command[1] for command in calls] == ["add-resource", "stat", "stat"]


def test_not_found_becomes_actionable_timeout_not_immediate_failure(tmp_path):
    calls = []

    def runner(command, **kwargs):
        calls.append(command)
        return subprocess.CompletedProcess(command, 1, "", "NOT_FOUND: resource")

    provider = OpenVikingMemoryProvider(runner=runner)
    with pytest.raises(MemoryUnavailable, match="did not appear before timeout"):
        provider.wait_for_resource("viking://resources/财务/missing.md", timeout=0, interval=0)
    assert len(calls) == 1


def test_add_resource_without_uri_polls_deterministic_child_not_parent(tmp_path):
    source = tmp_path / "report.md"
    source.write_text("中文正文", encoding="utf-8")
    calls = []
    responses = [
        (0, json.dumps({"ok": True}), ""),
        (0, json.dumps({"status": "ready", "overview_ready": True, "abstract_ready": True}), ""),
    ]

    def runner(command, **kwargs):
        calls.append(command)
        response = responses.pop(0)
        return subprocess.CompletedProcess(command, response[0], response[1], response[2])

    provider = OpenVikingMemoryProvider(runner=runner)
    result = provider.add_resource(str(source), parent="viking://resources/财务", wait=False)
    assert "uri" not in result
    target = "viking://resources/财务/report.md"
    provider.wait_for_resource(target, timeout=2, interval=0)
    assert calls[0][1] == "add-resource"
    assert calls[1][1:3] == ["stat", target]
    assert all(command[2] != "viking://resources" for command in calls[1:])


def test_openviking_provider_rejects_failed_transport():
    runner = fake_runner_factory([(1, "", "connection refused")])
    provider = OpenVikingMemoryProvider(runner=runner)
    with pytest.raises(MemoryUnavailable, match="request failed"):
        provider.read("viking://missing.md")


def test_openviking_provider_blocks_unverified_fact():
    provider = OpenVikingMemoryProvider(runner=lambda *a, **k: None)
    with pytest.raises(ValueError, match="verified"):
        provider.put_fact("acme", "cash", {"status": "claimed"})


def test_openviking_list_facts_reads_known_key_when_ls_lags():
    runner = fake_runner_factory([
        (0, json.dumps({"ok": True}), ""),
        (0, json.dumps({"result": json.dumps({"status": "verified", "value": 8})}), ""),
        (0, json.dumps({"items": []}), ""),
    ])
    provider = OpenVikingMemoryProvider(runner=runner)
    provider.put_fact("acme", "runway", {"status": "verified", "value": 8})
    facts = provider.list_facts("acme")
    assert facts[0]["fact_key"] == "runway"
    assert facts[0]["value"] == 8


def test_openviking_result_envelope_lists_items_and_ignores_scalar_result():
    runner = fake_runner_factory([
        (0, json.dumps({"ok": True, "result": [{"uri": "viking://a"}, {"uri": "viking://b"}]}), ""),
    ])
    provider = OpenVikingMemoryProvider(runner=runner)
    assert [row["uri"] for row in provider.query(prefix="viking://root")] == ["viking://a", "viking://b"]
    assert OpenVikingMemoryProvider._items({"ok": True, "result": "body"}) == []
