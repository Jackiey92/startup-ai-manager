from __future__ import annotations

import json
from pathlib import Path

import pytest

from app.contracts.phase0 import ContractError
from app.contracts.phase3 import (
    HANDOFF_VERSION,
    HandoffChain,
    build_phase3_role_matrix,
    classify_stalled,
    mark_claim_unverified,
    new_user_claim,
    stalled_threshold,
    validate_handoff_artifact,
    validate_role_matrix,
    verify_claim,
)
from app.contracts.phase2 import load_phase1_registry


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "harness-openclaw/tool-registry/manifest.json"
SKILLS = ROOT / "skills"
CONFIG = ROOT / "harness-openclaw/config/phase3-roles.json"


def test_four_role_matrix_is_generated_from_phase1_and_uses_one_runtime() -> None:
    generated = build_phase3_role_matrix(MANIFEST, SKILLS)
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    registry = load_phase1_registry(MANIFEST)
    validate_role_matrix(config, registry)
    assert config["roles"] == generated["roles"]
    for key in ("phase", "runtime", "catalog", "skill_catalog", "tool_search"):
        assert config[key] == generated[key]
    assert set(config["roles"]) == {
        "file_processor", "finance_analyst", "legal_analyst", "business_analyst",
    }
    assert {item["runtime"] for item in config["roles"].values()} == {
        "openclaw-unified-employee-runtime",
    }
    assert config["roles"]["file_processor"]["skills"] == ["document-ingest", "document-classifier"]
    assert config["roles"]["finance_analyst"]["skills"] == ["finance-fact-extraction"]
    assert config["roles"]["legal_analyst"]["skills"] == ["legal-document-analysis"]
    assert config["roles"]["business_analyst"]["skills"] == ["business-prose-extraction"]
    assert config["roles"]["legal_analyst"]["skill_gap"] == []
    assert config["roles"]["business_analyst"]["skill_gap"] == []
    assert all("ledger_r1" not in role["write_zones"] for role in config["roles"].values())


def test_handoff_chain_blocks_missing_2a_and_requires_all_three_2b() -> None:
    chain = HandoffChain()
    with pytest.raises(ContractError, match="2A mapping is absent"):
        chain.start_2b("finance_analyst", None)

    mapping = {
        "contract_version": HANDOFF_VERSION,
        "stage": "2a_mapping",
        "status": "ready",
        "artifact_id": "2a-1",
        "source_file_hash": "a" * 64,
        "manifest_uri": "viking://resources/财务/a.md",
        "blocks": [{"text": "2024 revenue", "source_loc": {"page_no": 1}}],
        "path": "l2_staging/a.json",
    }
    start = chain.start_2b("finance_analyst", mapping)
    assert start["input_path"] == "l2_staging/a.json"
    assert start["output_path"] == "facts_2b/finance_analyst/" + "a" * 64 + ".json"

    with pytest.raises(ContractError, match="all three"):
        chain.start_leader([])

    def fact(role: str) -> dict:
        return {
            "contract_version": HANDOFF_VERSION,
            "stage": "2b_facts",
            "status": "ready",
            "artifact_id": "2b-" + role,
            "source_2a_id": "2a-1",
            "role": role,
            "facts": [],
            "path": f"facts_2b/{role}/a.json",
        }

    leader = chain.start_leader([fact("finance_analyst"), fact("legal_analyst"), fact("business_analyst")])
    assert leader["output_path"] == "runtime_outbox/leader/summary.json"
    assert set(leader["source_2b_ids"]) == {"2b-finance_analyst", "2b-legal_analyst", "2b-business_analyst"}


def test_handoff_rejects_not_ready_or_out_of_zone_artifacts() -> None:
    base = {
        "contract_version": HANDOFF_VERSION,
        "stage": "2a_mapping",
        "status": "pending",
        "artifact_id": "2a-1",
        "source_file_hash": "a" * 64,
        "manifest_uri": "viking://resources/技术与产品/a.md",
        "blocks": [{}],
        "path": "l2_staging/a.json",
    }
    with pytest.raises(ContractError, match="ready"):
        validate_handoff_artifact(base, stage="2a_mapping")
    base["status"] = "ready"
    base["path"] = "facts_2b/a.json"
    with pytest.raises(ContractError, match="l2_staging"):
        validate_handoff_artifact(base, stage="2a_mapping")


def test_2c_claim_is_not_equal_to_material_fact_until_evidence() -> None:
    claim = new_user_claim(
        claim_id="claim-1", entity="本公司", metric="营收", value="3.26", unit="亿元", period="2024",
        quote="创始人口述营收为3.26亿元",
    )
    assert claim["source"] == "user"
    assert claim["status"] == "claimed_by_user"
    assert claim["weight"] == "unverified_not_equal_to_material_fact"
    unverified = mark_claim_unverified(claim)
    with pytest.raises(ContractError, match="evidence"):
        verify_claim(unverified, [])
    verified = verify_claim(unverified, [{"path": "l2_staging/a.json", "locator": "page/1/block/2"}])
    assert verified["source"] == "user"
    assert verified["status"] == "verified"
    assert verified["weight"] == "equal_after_material_verification"
    assert verified["evidence_sources"][0]["path"] == "l2_staging/a.json"


def test_tool_search_guidance_has_chain_and_few_shot_guardrails() -> None:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    guidance = (ROOT / config["tool_search_guidance"]).read_text(encoding="utf-8")
    for phrase in ("tool_search", "tool_describe", "tool_call", "sam_document_ingest", "file_hash", "source_path"):
        assert phrase in guidance
    assert "tool_call({\"id\":\"sam_document_ingest\"" in guidance


def test_slow_tool_stall_policy_allows_mineru_but_detects_real_no_progress() -> None:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    assert config["stalled_policy"]["default_seconds"] == 90
    assert config["stalled_policy"]["slow_tools"]["sam_document_ingest"]["threshold_seconds"] == 300
    assert stalled_threshold("sam_document_ingest") == 300
    assert stalled_threshold("sam_memory_read") == 90
    assert classify_stalled("sam_document_ingest", 150) == "not_stalled"
    assert classify_stalled("sam_document_ingest", 301, heartbeat=True) == "progressing_slow_tool"
    assert classify_stalled("sam_document_ingest", 301, heartbeat=False) == "stalled"


def test_parse_pool_contract_defaults_to_four_and_isolates_sessions() -> None:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    pool = config["parse_pool"]
    assert pool["default_workers"] == 4
    assert pool["max_workers"] == 4
    assert pool["startup_log"] == "parse workers=N (requested=N, max=N)"
    assert pool["session_policy"] == "independent_openclaw_session_per_document"
    assert pool["failure_isolation"] == "one_job_failure_does_not_cancel_other_jobs"
