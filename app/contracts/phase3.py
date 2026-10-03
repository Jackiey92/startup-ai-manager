"""Phase 3 role, handoff, oral-claim, and Tool Search guard contracts.

This module is intentionally a contract layer.  It does not execute an
employee, write facts, or alter the R1 ledger.  A single generic runtime can
consume the role projections and handoff payloads produced here.
"""
from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timezone
import json
from pathlib import Path
from typing import Any, Mapping

from .phase0 import ContractError, ROLE_ZONE_ALLOWLIST, ROLES, ToolRegistry
from .phase1 import build_skill_catalog
from .phase2 import load_phase1_registry


UNIFIED_RUNTIME = "openclaw-unified-employee-runtime"
ROLE_SKILLS: dict[str, tuple[str, ...]] = {
    "file_processor": ("document-ingest",),
    "finance_analyst": ("finance-fact-extraction",),
    # Phase 1 rejected these two skill files (missing/invalid frontmatter).
    # Do not silently invent a skill: the roles remain enabled with their
    # authorized memory tools and wait for a separately reviewed skill.
    "legal_analyst": (),
    "business_analyst": (),
}
ROLE_SKILL_GAPS: dict[str, tuple[str, ...]] = {
    "file_processor": (),
    "finance_analyst": (),
    "legal_analyst": ("no accepted Phase 1 legal skill; tools-only pending review",),
    "business_analyst": ("no accepted Phase 1 business skill; tools-only pending review",),
}

HANDOFF_VERSION = "phase3.v1"
HANDOFF_STAGES = frozenset({"2a_mapping", "2b_facts", "leader_summary"})
HANDOFF_ROLES = frozenset({"finance_analyst", "legal_analyst", "business_analyst"})
_STAGE_REQUIRED: dict[str, tuple[str, ...]] = {
    "2a_mapping": ("artifact_id", "source_file_hash", "manifest_uri", "blocks"),
    "2b_facts": ("artifact_id", "source_2a_id", "role", "facts"),
    "leader_summary": ("artifact_id", "source_2b_ids", "summary"),
}
HANDOFF_PATH_PREFIX = {
    "2a_mapping": "l2_staging/",
    "2b_facts": "facts_2b/",
    "leader_summary": "runtime_outbox/leader/",
}

CLAIM_STATUSES = frozenset({"claimed_by_user", "unverified", "verified"})
CLAIM_SOURCES = frozenset({"user"})

# A parser can legitimately take around two minutes on the local CPU.  The
# monitor must still report a real stall: no heartbeat beyond this bound is a
# failure, not a permanently suppressed warning.
DEFAULT_STALLED_SECONDS = 90
SLOW_TOOL_STALLED_SECONDS = {"sam_document_ingest": 300}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _load_json(path: Path, label: str) -> dict[str, Any]:
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ContractError(f"unable to load {label}: {path}") from exc
    if not isinstance(payload, dict):
        raise ContractError(f"{label} must be an object")
    return payload


def build_phase3_role_matrix(manifest_path: Path, skill_root: Path) -> dict[str, Any]:
    """Project one generic runtime into all four reviewed role boundaries."""
    registry = load_phase1_registry(manifest_path)
    catalog = build_skill_catalog(skill_root)
    accepted_skills = {item["name"]: item for item in catalog["skills"]}
    roles: dict[str, Any] = {}
    for role in sorted(ROLES):
        skills = list(ROLE_SKILLS[role])
        missing = sorted(set(skills) - set(accepted_skills))
        if missing:
            raise ContractError(f"role {role} references skills outside accepted catalog: {missing}")
        tools = list(registry.names(role))
        read_zones = sorted({
            zone
            for name in tools
            for zone in registry.resolve(name, role=role)["read_zones"]
        })
        write_zones = sorted(ROLE_ZONE_ALLOWLIST[role]["write"])
        if set(read_zones) - ROLE_ZONE_ALLOWLIST[role]["read"]:
            raise ContractError(f"role {role} tool read zones exceed Phase 0 allowlist")
        if set(write_zones) - ROLE_ZONE_ALLOWLIST[role]["write"]:
            raise ContractError(f"role {role} write zones exceed Phase 0 allowlist")
        roles[role] = {
            "enabled": True,
            "runtime": UNIFIED_RUNTIME,
            "skills": skills,
            "tools": tools,
            "toolExecutionAllow": tools,
            "read_zones": read_zones,
            "write_zones": write_zones,
            "prohibited_roles": sorted(set(ROLES) - {role}),
            "prohibited_write_zones": ["ledger_r1"],
            "skill_gap": list(missing) + list(ROLE_SKILL_GAPS[role]),
        }
    return {
        "phase": "phase3",
        "runtime": UNIFIED_RUNTIME,
        "roles": roles,
        "catalog": "harness-openclaw/tool-registry/manifest.json",
        "skill_catalog": "harness-openclaw/skill-registry/catalog.json",
        "tool_search": {
            "enabled": True,
            "mode": "tools",
            "code_mode": False,
            "availability": "finalizeAgentToolAvailability",
            "execution_allow": "toolExecutionAllow",
        },
    }


def validate_role_matrix(matrix: Mapping[str, Any], registry: ToolRegistry) -> None:
    roles = matrix.get("roles")
    if not isinstance(roles, Mapping) or set(roles) != set(ROLES):
        raise ContractError("Phase 3 role matrix must contain exactly the four approved roles")
    for role in ROLES:
        entry = roles[role]
        if not isinstance(entry, Mapping) or entry.get("enabled") is not True:
            raise ContractError(f"role is not enabled: {role}")
        if entry.get("runtime") != UNIFIED_RUNTIME:
            raise ContractError(f"role does not use the generic runtime: {role}")
        tools = entry.get("tools")
        if not isinstance(tools, list) or tuple(sorted(tools)) != registry.names(role):
            raise ContractError(f"role tools do not match manifest: {role}")
        if entry.get("toolExecutionAllow") != tools:
            raise ContractError(f"role execution allowlist differs from tools: {role}")
        allowed = ROLE_ZONE_ALLOWLIST[role]
        if set(entry.get("read_zones", [])) - allowed["read"]:
            raise ContractError(f"role read zones exceed allowlist: {role}")
        if set(entry.get("write_zones", [])) - allowed["write"]:
            raise ContractError(f"role write zones exceed allowlist: {role}")
        if "ledger_r1" in entry.get("write_zones", []):
            raise ContractError("R1 ledger cannot be a role write zone")


def _validate_path(stage: str, path: str) -> None:
    prefix = HANDOFF_PATH_PREFIX[stage]
    if not isinstance(path, str) or not path.startswith(prefix) or ".." in Path(path).parts:
        raise ContractError(f"{stage} artifact path must be under {prefix}")


def validate_handoff_artifact(payload: Mapping[str, Any], *, stage: str) -> dict[str, Any]:
    if stage not in HANDOFF_STAGES:
        raise ContractError(f"unknown handoff stage: {stage}")
    item = deepcopy(dict(payload))
    if item.get("contract_version") != HANDOFF_VERSION:
        raise ContractError("handoff contract version mismatch")
    if item.get("stage") != stage or item.get("status") != "ready":
        raise ContractError(f"{stage} upstream must be ready")
    for field in _STAGE_REQUIRED[stage]:
        # An analyst may legitimately produce an empty ``facts`` list (or a
        # mapping with no blocks) while still delivering a valid, reviewable
        # artifact.  Presence and readiness are the gate; payload semantics
        # remain the consuming analyst's contract.
        if field not in item or item[field] in (None, ""):
            raise ContractError(f"{stage} missing required field: {field}")
    _validate_path(stage, item.get("path", ""))
    return item


class HandoffChain:
    """Gate downstream workers on durable, ready upstream artifacts."""

    def start_2b(self, role: str, upstream_2a: Mapping[str, Any] | None) -> dict[str, Any]:
        if role not in HANDOFF_ROLES:
            raise ContractError(f"only analyst roles may start 2B: {role}")
        if upstream_2a is None:
            raise ContractError(f"{role} cannot start: 2A mapping is absent")
        source = validate_handoff_artifact(upstream_2a, stage="2a_mapping")
        return {
            "contract_version": HANDOFF_VERSION,
            "stage": "2b_facts",
            "status": "ready_to_start",
            "role": role,
            "source_2a_id": source["artifact_id"],
            "input_path": source["path"],
            "output_path": f"facts_2b/{role}/{source['source_file_hash']}.json",
        }

    def start_leader(self, upstream_2b: Mapping[str, Any] | None) -> dict[str, Any]:
        if (
            not isinstance(upstream_2b, list)
            or not all(isinstance(item, Mapping) for item in upstream_2b)
            or {item.get("role") for item in upstream_2b} != set(HANDOFF_ROLES)
        ):
            raise ContractError("leader cannot start: all three ready 2B artifacts are required")
        sources = [validate_handoff_artifact(item, stage="2b_facts") for item in upstream_2b]
        return {
            "contract_version": HANDOFF_VERSION,
            "stage": "leader_summary",
            "status": "ready_to_start",
            "source_2b_ids": [item["artifact_id"] for item in sources],
            "input_paths": [item["path"] for item in sources],
            "output_path": "runtime_outbox/leader/summary.json",
        }


def new_user_claim(*, claim_id: str, entity: str, metric: str, value: str,
                   unit: str | None = None, period: str = "unspecified",
                   quote: str | None = None) -> dict[str, Any]:
    """Create a 2C oral claim with user provenance and no fact weight."""
    if not all(isinstance(item, str) and item.strip() for item in (claim_id, entity, metric, value)):
        raise ContractError("2C claim identity and value fields are required")
    return {
        "claim_id": claim_id,
        "entity": entity,
        "metric": metric,
        "value": value,
        "unit": unit,
        "period": period,
        "quote": quote,
        "source": "user",
        "status": "claimed_by_user",
        "weight": "unverified_not_equal_to_material_fact",
        "evidence_sources": [],
        "created_at": _now(),
        "updated_at": _now(),
    }


def mark_claim_unverified(claim: Mapping[str, Any]) -> dict[str, Any]:
    item = deepcopy(dict(claim))
    if item.get("source") != "user" or item.get("status") not in {"claimed_by_user", "unverified"}:
        raise ContractError("only a user claim can enter unverified state")
    item["status"] = "unverified"
    item["weight"] = "unverified_not_equal_to_material_fact"
    item["updated_at"] = _now()
    return item


def verify_claim(claim: Mapping[str, Any], evidence_sources: list[Mapping[str, Any]]) -> dict[str, Any]:
    item = deepcopy(dict(claim))
    if item.get("source") != "user" or item.get("status") not in {"claimed_by_user", "unverified"}:
        raise ContractError("only an unverified user claim can be verified")
    if not evidence_sources or not all(isinstance(source, Mapping) and source.get("path") for source in evidence_sources):
        raise ContractError("material evidence is required before a 2C claim is verified")
    item["status"] = "verified"
    item["weight"] = "equal_after_material_verification"
    item["evidence_sources"] = [deepcopy(dict(source)) for source in evidence_sources]
    item["updated_at"] = _now()
    return item


def stalled_threshold(tool_name: str) -> int:
    return SLOW_TOOL_STALLED_SECONDS.get(tool_name, DEFAULT_STALLED_SECONDS)


def classify_stalled(tool_name: str, age_seconds: float, *, heartbeat: bool = False) -> str:
    """Differentiate expected slow work from a real no-progress stall."""
    if age_seconds < stalled_threshold(tool_name):
        return "not_stalled"
    if heartbeat:
        return "progressing_slow_tool"
    return "stalled"
