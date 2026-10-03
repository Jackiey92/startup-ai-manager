from __future__ import annotations

import pytest

from app.contracts.phase0 import (
    ContractError,
    SkillRegistry,
    ToolRegistry,
    parse_skill_frontmatter,
    validate_schema,
    validate_tool_arguments,
    validate_tool_manifest,
)


VALID_PARAMETERS = {
    "type": "object",
    "properties": {
        "file_hash": {"type": "string", "pattern": r"^[a-f0-9]{64}$"},
        "format": {"type": "string", "enum": ["pdf", "docx"]},
    },
    "required": ["file_hash", "format"],
    "additionalProperties": False,
}


def valid_tool(**overrides):
    value = {
        "name": "sam_document_ingest",
        "purpose": "Create a confined L2 manifest from one source object.",
        "parameters": VALID_PARAMETERS,
        "security_level": "controlled_write",
        "roles": ["file_processor"],
        "read_zones": ["raw_objects"],
        "write_zones": ["l2_staging"],
        "provenance": "sam-core/phase0",
    }
    value.update(overrides)
    return value


def test_skill_frontmatter_is_strict_and_registry_rejects_duplicates():
    markdown = (
        "---\nname: document-ingest\ndescription: Parse source files.\n"
        "version: 1.0.0\nhomepage: https://example.test\nlicense: MIT\n"
        "allowed-tools: Bash\nuser-invocable: false\n---\nbody"
    )
    parsed = parse_skill_frontmatter(markdown)
    registry = SkillRegistry()
    assert registry.register(parsed)["name"] == "document-ingest"
    with pytest.raises(ContractError, match="duplicate skill"):
        registry.register(parsed)
    with pytest.raises(ContractError, match="unknown field"):
        parse_skill_frontmatter("---\nname: x\ndescription: x\nis_bullet: true\n---")


def test_schema_rejects_unsupported_keywords_and_non_false_additional_properties():
    with pytest.raises(ContractError, match="unsupported schema keyword"):
        validate_schema({**VALID_PARAMETERS, "minLength": 1})
    with pytest.raises(ContractError, match="additionalProperties must be false"):
        validate_schema({**VALID_PARAMETERS, "additionalProperties": True})


def test_tool_manifest_rejects_unknown_role_zone_and_role_zone_escalation():
    with pytest.raises(ContractError, match="unauthorized value"):
        validate_tool_manifest(valid_tool(roles=["controller"]))
    with pytest.raises(ContractError, match="unauthorized value"):
        validate_tool_manifest(valid_tool(read_zones=["database"]))
    with pytest.raises(ContractError, match="exceed role"):
        validate_tool_manifest(valid_tool(roles=["finance_analyst"], read_zones=["raw_objects"]))


def test_tool_arguments_fail_closed_on_missing_extra_enum_and_pattern():
    validate_tool_arguments(VALID_PARAMETERS, {"file_hash": "a" * 64, "format": "pdf"})
    with pytest.raises(ContractError, match="missing required"):
        validate_tool_arguments(VALID_PARAMETERS, {"format": "pdf"})
    with pytest.raises(ContractError, match="unsupported field"):
        validate_tool_arguments(VALID_PARAMETERS, {"file_hash": "a" * 64, "format": "pdf", "path": "/tmp/x"})
    with pytest.raises(ContractError, match="outside enum"):
        validate_tool_arguments(VALID_PARAMETERS, {"file_hash": "a" * 64, "format": "xlsx"})
    with pytest.raises(ContractError, match="pattern"):
        validate_tool_arguments(VALID_PARAMETERS, {"file_hash": "not-a-hash", "format": "pdf"})


def test_tool_registry_search_and_call_are_role_scoped():
    registry = ToolRegistry()
    registry.register(valid_tool())
    assert registry.names(role="file_processor") == ("sam_document_ingest",)
    assert registry.names(role="finance_analyst") == ()
    registry.validate_call(
        "sam_document_ingest",
        role="file_processor",
        arguments={"file_hash": "b" * 64, "format": "docx"},
    )
    with pytest.raises(ContractError, match="not authorized"):
        registry.validate_call(
            "sam_document_ingest", role="finance_analyst",
            arguments={"file_hash": "b" * 64, "format": "docx"},
        )
    with pytest.raises(ContractError, match="duplicate tool"):
        registry.register(valid_tool())
