from __future__ import annotations

import json
from pathlib import Path

import pytest

from app.contracts.phase0 import ContractError, validate_tool_manifest
from app.contracts.phase1 import build_skill_catalog, build_tool_manifest


ROOT = Path(__file__).resolve().parents[1]


def test_skill_catalog_matches_generated_artifact_and_records_rejections():
    catalog = build_skill_catalog(ROOT / "skills")
    artifact = json.loads((ROOT / "harness-openclaw/skill-registry/catalog.json").read_text())
    assert catalog == artifact
    assert catalog["rejected"] == []
    assert {item["name"] for item in catalog["skills"]} == {
        "business-prose-extraction", "document-classifier", "document-ingest",
        "finance-fact-extraction", "legal-document-analysis",
    }


def test_tool_manifest_matches_registration_and_every_accepted_entry_validates():
    manifest = build_tool_manifest(ROOT / "harness-openclaw/plugins")
    artifact = json.loads((ROOT / "harness-openclaw/tool-registry/manifest.json").read_text())
    assert manifest == artifact
    assert manifest["registration_comparison"]["unaccounted_tools"] == []
    assert manifest["registration_comparison"]["runtime_missing_from_plugin"] == []
    assert manifest["registration_comparison"]["plugin_missing_from_runtime"] == []
    assert manifest["registration_comparison"]["declared_tools"] == sorted(
        manifest["registration_comparison"]["manifest_tools"]
        + manifest["registration_comparison"]["rejected_tools"]
    )
    for tool in manifest["tools"]:
        assert validate_tool_manifest(tool) == tool
    rejected = {item["name"]: item["error"] for item in manifest["rejected"]}
    assert "sam_promote" in rejected
    assert "open-ended" in rejected["sam_promote"]


def test_rejected_artifacts_are_explicit_and_same_as_catalog_outputs():
    skill_rejected = json.loads((ROOT / "harness-openclaw/skill-registry/rejected.json").read_text())
    tool_rejected = json.loads((ROOT / "harness-openclaw/tool-registry/rejected.json").read_text())
    assert skill_rejected == build_skill_catalog(ROOT / "skills")["rejected"]
    assert tool_rejected == build_tool_manifest(ROOT / "harness-openclaw/plugins")["rejected"]


def test_phase1_isolation_defaults_are_least_privilege_and_tool_search_stays_off():
    config = json.loads((ROOT / "harness-openclaw/config/phase1-isolation.json").read_text())
    assert config["identity"]["run_as_user"] not in {"root", "Administrator"}
    assert config["identity"]["full_disk_access"] == "deny"
    assert config["identity"]["credential_access"] == "deny"
    assert config["network"]["default_policy"] == "deny"
    assert config["network"]["external_egress"] == "allowlist_only"
    assert config["network"]["external_allowlist"] == []
    assert config["network"]["internal_information_exfiltration_lock"] is True
    assert config["tool_search"]["enabled"] is False
