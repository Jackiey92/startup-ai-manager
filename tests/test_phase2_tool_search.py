from __future__ import annotations

import json
from pathlib import Path

import pytest

from app.contracts.phase0 import ContractError
from app.contracts.phase2 import (
    ToolSearchSurface,
    finalize_agent_tool_availability,
    load_phase1_registry,
)


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "harness-openclaw/tool-registry/manifest.json"
CONFIG = ROOT / "harness-openclaw/config/phase2-tool-search.json"


def test_file_processor_search_describe_and_call_use_phase1_catalog() -> None:
    registry = load_phase1_registry(MANIFEST)
    calls: list[tuple[str, dict]] = []

    def execute(name: str, arguments: dict) -> dict:
        calls.append((name, arguments))
        return {"status": "accepted", "zone": "runtime_outbox"}

    surface = ToolSearchSurface(registry, executor=execute)
    found = surface.search("parse a document", role="file_processor")
    assert found and found[0]["name"] == "sam_document_ingest"
    described = surface.describe("sam_document_ingest", role="file_processor")
    assert described["parameters"]["required"] == ["file_hash", "format"]
    result = surface.call(
        "sam_document_ingest",
        {"file_hash": "a" * 64, "format": "pdf"},
        role="file_processor",
    )
    assert result["zone"] == "runtime_outbox"
    assert calls == [("sam_document_ingest", {"file_hash": "a" * 64, "format": "pdf"})]


@pytest.mark.parametrize("role", ["finance_analyst", "legal_analyst", "business_analyst"])
def test_non_gray_roles_cannot_search_or_call_phase2_surface(role: str) -> None:
    surface = ToolSearchSurface(load_phase1_registry(MANIFEST))
    with pytest.raises(ContractError, match="gray rollout"):
        surface.search("document ingest", role=role)
    with pytest.raises(ContractError, match="gray rollout"):
        surface.call("sam_document_ingest", {"file_hash": "a" * 64, "format": "pdf"}, role=role)


@pytest.mark.parametrize(
    "arguments",
    [
        {"file_hash": "a" * 64},
        {"file_hash": "a" * 64, "format": "pdf", "path": "/etc/passwd"},
        {"file_hash": "../etc/passwd", "format": "pdf"},
        {"file_hash": "a" * 64, "format": "pdf", "source_path": "raw.pdf"},
    ],
)
def test_call_rejects_missing_extra_or_path_arguments(arguments: dict) -> None:
    surface = ToolSearchSurface(load_phase1_registry(MANIFEST), executor=lambda *_: None)
    with pytest.raises(ContractError):
        surface.call("sam_document_ingest", arguments, role="file_processor")


def test_rejected_or_unregistered_tool_is_not_callable() -> None:
    surface = ToolSearchSurface(load_phase1_registry(MANIFEST), executor=lambda *_: None)
    with pytest.raises(ContractError, match="not authorized"):
        surface.describe("sam_promote", role="file_processor")
    with pytest.raises(ContractError, match="not authorized"):
        surface.call("not_a_registered_tool", {}, role="file_processor")


def test_tool_execution_allow_matches_manifest_and_gray_config() -> None:
    registry = load_phase1_registry(MANIFEST)
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    assert config["surface"] == {
        "enabled": True,
        "mode": "tools",
        "directory_enabled": False,
        "code_enabled": False,
        "controls": ["tool_search", "tool_describe", "tool_call"],
    }
    assert config["native_runtime"]["tools"]["toolSearch"] == {
        "enabled": True,
        "mode": "tools",
        "searchDefaultLimit": 5,
        "maxSearchLimit": 10,
    }
    assert config["native_runtime"]["tools"]["codeMode"]["enabled"] is False
    assert tuple(config["roles"]["file_processor"]["toolExecutionAllow"]) == finalize_agent_tool_availability(
        registry, "file_processor"
    )
    for role in ("finance_analyst", "legal_analyst", "business_analyst"):
        assert config["roles"][role]["enabled"] is False
        assert config["roles"][role]["toolExecutionAllow"] == []


def test_catalog_role_projection_has_no_unmanifested_tools() -> None:
    registry = load_phase1_registry(MANIFEST)
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    assert set(config["roles"]["file_processor"]["toolExecutionAllow"]) == set(
        registry.names("file_processor")
    )
    assert set(config["roles"]["file_processor"]["toolExecutionAllow"]) <= set(registry.names())
    assert "sam_promote" not in config["roles"]["file_processor"]["toolExecutionAllow"]
