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
