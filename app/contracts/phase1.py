"""Phase 1 read-only catalog builders.

The builders scan and validate; they do not install skills, enable
``tool_search``, or change plugin/runtime configuration.  Their JSON output is
the reviewable registration input for later phases.
"""
from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path
import re
from typing import Any

from .phase0 import (
    ContractError,
    ROLES,
    SkillRegistry,
    ToolRegistry,
    validate_tool_manifest,
)


SKILL_ROLE_DEFAULTS = {
    "document-ingest": ["file_processor"],
    "finance-fact-extraction": ["finance_analyst"],
    "business-prose-extraction": ["business_analyst"],
}


def _sha256(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def _rejection(kind: str, path: Path, error: Exception, *, name: str | None = None) -> dict[str, Any]:
    item: dict[str, Any] = {"kind": kind, "path": path.as_posix(), "error": str(error)}
    if name:
        item["name"] = name
    return item


def build_skill_catalog(skill_root: Path) -> dict[str, Any]:
    """Scan every SKILL.md and record accepted and rejected entries."""
    registry = SkillRegistry()
    skills: list[dict[str, Any]] = []
    rejected: list[dict[str, Any]] = []
    for path in sorted(skill_root.rglob("SKILL.md")):
        relative = path.relative_to(skill_root)
        try:
            frontmatter = registry.register_markdown(path.read_text(encoding="utf-8"))
            if path.parent.name != frontmatter["name"]:
                raise ContractError(
                    f"frontmatter.name {frontmatter['name']!r} does not match directory {path.parent.name!r}"
                )
            metadata = frontmatter.get("metadata") or {}
            sam_metadata = metadata.get("sam") if isinstance(metadata, dict) else None
            roles = SKILL_ROLE_DEFAULTS.get(frontmatter["name"], [])
            visibility = "workspace"
            if isinstance(sam_metadata, dict):
                if "roles" in sam_metadata:
                    roles = list(sam_metadata["roles"])
                visibility = sam_metadata.get("visibility", visibility)
            unknown_roles = set(roles) - ROLES
            if unknown_roles:
                raise ContractError(f"skill roles contain unauthorized value(s): {sorted(unknown_roles)}")
            skills.append({
                "skill_id": frontmatter["name"],
                "name": frontmatter["name"],
                "description": frontmatter["description"],
                "version": frontmatter.get("version", "unversioned"),
                "source": relative.as_posix(),
                "content_sha256": _sha256(path),
                "roles": sorted(roles),
                "visibility": visibility,
            })
        except (ContractError, OSError, UnicodeError) as exc:
            rejected.append(_rejection("skill", relative, exc))
    return {
        "catalog_version": "phase1",
        "scan_root": skill_root.name,
        "skills": sorted(skills, key=lambda item: item["name"]),
        "rejected": rejected,
    }


def _object_schema(properties: dict[str, dict[str, Any]], required: list[str] | None = None) -> dict[str, Any]:
    result: dict[str, Any] = {
        "type": "object",
        "properties": properties,
        "additionalProperties": False,
    }
    if required:
        result["required"] = required
    return result


def _string(pattern: str | None = None, enum: list[str] | None = None) -> dict[str, Any]:
    value: dict[str, Any] = {"type": "string"}
    if pattern is not None:
        value["pattern"] = pattern
    if enum is not None:
        value["enum"] = enum
    return value


def _manifest(
    name: str,
    purpose: str,
    parameters: dict[str, Any],
    roles: list[str],
    read_zones: list[str],
    write_zones: list[str],
    security_level: str = "read_only",
) -> dict[str, Any]:
    return {
        "name": name,
        "purpose": purpose,
        "parameters": parameters,
        "security_level": security_level,
        "roles": roles,
        "read_zones": read_zones,
        "write_zones": write_zones,
        "provenance": "openclaw-plugin:sam-memory@0.2.0",
    }


def _sam_memory_manifests() -> list[dict[str, Any]]:
    all_analysts = ["file_processor", "finance_analyst", "legal_analyst", "business_analyst"]
    readable = ["runtime_outbox", "l2_staging", "ov_resources"]
    empty = _object_schema({})
    return [
        _manifest(
            "sam_memory_read", "Read one discovered scoped Viking URI.",
            _object_schema({"uri": _string(r"^viking://")}, ["uri"]), all_analysts, readable, [],
        ),
        _manifest(
            "sam_memory_search", "Search scoped SAM memory.",
            _object_schema({"query": _string(r"\S")}, ["query"]), all_analysts, readable, [],
        ),
        _manifest(
            "sam_file_get", "Read metadata for one discovered source file.",
            _object_schema({"file_hash": _string(r"^[0-9a-f]{64}$")}, ["file_hash"]),
            ["file_processor"], ["raw_objects"], [],
        ),
        _manifest("sam_memory_map", "Read the scoped navigation map.", empty, all_analysts, readable, []),
        _manifest(
            "sam_conversation_read", "Read the current scoped conversation range.",
            _object_schema({"start": _string(), "end": _string()}), all_analysts, readable, [],
        ),
        _manifest("sam_thread_list", "List visible scoped threads.", empty, all_analysts, readable, []),
        _manifest("sam_thread_open", "Read the current injected thread summary.", empty, all_analysts, readable, []),
        _manifest(
            "sam_document_ingest", "Parse one injected source task into a confined L2 manifest.",
            _object_schema({
                "file_hash": _string(r"^[0-9a-f]{64}$"),
                "format": _string(enum=["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "image"]),
            }, ["file_hash", "format"]),
            ["file_processor"], ["raw_objects"], ["runtime_outbox", "l2_staging"],
            security_level="controlled_write",
        ),
    ]


def build_tool_manifest(plugin_root: Path) -> dict[str, Any]:
    """Build the canonical manifest and explicit rejection list for plugins."""
    plugin_path = plugin_root / "sam-memory" / "openclaw.plugin.json"
    project_root = plugin_root.resolve().parent.parent
    plugin_display_path = plugin_path.resolve().relative_to(project_root).as_posix()
    index_path = plugin_path.with_name("index.js")
    plugin = json.loads(plugin_path.read_text(encoding="utf-8"))
    declared = list(plugin.get("contracts", {}).get("tools", []))
    index_text = index_path.read_text(encoding="utf-8")
    tool_names_match = re.search(r"const TOOL_NAMES = \[(.*?)\];", index_text, flags=re.DOTALL)
    if not tool_names_match:
        raise ContractError(f"unable to find runtime tool registration list: {index_path}")
    runtime_registered = re.findall(r"['\"]([^'\"]+)['\"]", tool_names_match.group(1))
    candidates = {item["name"]: item for item in _sam_memory_manifests()}
    accepted: list[dict[str, Any]] = []
    rejected: list[dict[str, Any]] = []
    registry = ToolRegistry()
    for name in declared:
        if name == "sam_promote":
            continue
        candidate = candidates.get(name)
        if candidate is None:
            rejected.append({
                "kind": "tool", "name": name, "path": plugin_display_path,
                "error": "plugin declares a tool without a Phase 1 manifest",
            })
            continue
        try:
            accepted.append(registry.register(candidate))
        except ContractError as exc:
            rejected.append({
                "kind": "tool", "name": name, "path": plugin_display_path,
                "error": str(exc),
            })
    # sam_promote deliberately remains rejected: its runtime accepts an
    # arbitrary object, which cannot be represented by this fail-closed schema
    # subset without silently changing its contract.
    if "sam_promote" in declared:
        rejected.append({
            "kind": "tool", "name": "sam_promote", "path": plugin_display_path,
            "error": "runtime fact object is open-ended; not representable by Phase 0 schema subset",
        })
    rejected_names = sorted(item["name"] for item in rejected if item.get("name"))
    accepted_names = sorted(item["name"] for item in accepted)
    declared_names = sorted(declared)
    return {
        "manifest_version": "phase1",
        "plugin": plugin.get("id", "sam-memory"),
        "plugin_manifest": plugin_display_path,
        "tools": sorted(accepted, key=lambda item: item["name"]),
        "rejected": rejected,
        "registration_comparison": {
            "declared_tools": declared_names,
            "runtime_registered_tools": sorted(runtime_registered),
            "manifest_tools": accepted_names,
            "rejected_tools": rejected_names,
            "unaccounted_tools": sorted(set(declared_names) - set(accepted_names) - set(rejected_names)),
            "runtime_missing_from_plugin": sorted(set(runtime_registered) - set(declared_names)),
            "plugin_missing_from_runtime": sorted(set(declared_names) - set(runtime_registered)),
        },
    }
