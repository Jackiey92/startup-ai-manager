"""Phase 0 contracts for the global skill and tool registries.

This module deliberately has no runtime or plugin integration.  It freezes the
shape and the fail-closed validation rules that later registry adapters must
use.  A capability is not executable merely because it validates here; the
runtime still has to register it and grant the role explicitly.
"""
from __future__ import annotations

from copy import deepcopy
import re
from typing import Any, Mapping


class ContractError(ValueError):
    """Raised when a Phase 0 contract is malformed or unauthorized."""


ROLES = frozenset({
    "file_processor",
    "finance_analyst",
    "legal_analyst",
    "business_analyst",
})
ZONES = frozenset({
    "raw_objects",
    "runtime_outbox",
    "l2_staging",
    "ov_resources",
    "facts_2b",
    "ledger_r1",
})
SECURITY_LEVELS = frozenset({"read_only", "controlled_write", "sensitive_write"})

# This is the Phase 0 authorization boundary, not an execution policy.  A
# manifest may only mention zones that its roles are permitted to access.  R1
# ledger data is intentionally absent from every write set.
ROLE_ZONE_ALLOWLIST: dict[str, dict[str, frozenset[str]]] = {
    "file_processor": {
        "read": frozenset({"raw_objects", "runtime_outbox"}),
        "write": frozenset({"runtime_outbox", "l2_staging", "ov_resources"}),
    },
    "finance_analyst": {
        "read": frozenset({"runtime_outbox", "l2_staging", "ov_resources"}),
        "write": frozenset({"facts_2b"}),
    },
    "legal_analyst": {
        "read": frozenset({"runtime_outbox", "l2_staging", "ov_resources"}),
        "write": frozenset({"facts_2b"}),
    },
    "business_analyst": {
        "read": frozenset({"runtime_outbox", "l2_staging", "ov_resources", "facts_2b"}),
        "write": frozenset({"facts_2b"}),
    },
}

# Top-level fields are intentionally small.  ``metadata`` is reserved for
# registry provenance and remains a mapping; it is not an escape hatch for
# executable permissions.
SKILL_FRONTMATTER_FIELDS = frozenset({
    "name", "description", "version", "metadata", "homepage", "license",
    "allowed-tools", "user-invocable",
})
TOOL_MANIFEST_FIELDS = frozenset({
    "name", "purpose", "parameters", "security_level", "roles",
    "read_zones", "write_zones", "provenance",
})
_NAME = re.compile(r"^[a-z][a-z0-9_.-]*$")
_VERSION = re.compile(r"^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$")
_SCHEMA_TYPES = frozenset({"object", "array", "string", "integer", "number", "boolean", "null"})
_SCHEMA_FIELDS = frozenset({"type", "properties", "required", "enum", "pattern", "additionalProperties"})


def _expect_mapping(value: Any, path: str) -> Mapping[str, Any]:
    if not isinstance(value, Mapping):
        raise ContractError(f"{path} must be an object")
    return value


def _expect_string(value: Any, path: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ContractError(f"{path} must be a non-empty string")
    return value


def _expect_unique_strings(value: Any, path: str, allowed: frozenset[str]) -> tuple[str, ...]:
    if not isinstance(value, list) or not value:
        raise ContractError(f"{path} must be a non-empty array")
    if any(not isinstance(item, str) or not item for item in value):
        raise ContractError(f"{path} must contain only non-empty strings")
    if len(set(value)) != len(value):
        raise ContractError(f"{path} must not contain duplicates")
    unknown = set(value) - allowed
    if unknown:
        raise ContractError(f"{path} contains unauthorized value(s): {sorted(unknown)}")
    return tuple(value)


def validate_frontmatter(frontmatter: Mapping[str, Any]) -> dict[str, Any]:
    """Validate and copy one skill's YAML frontmatter.

    Unknown keys are rejected before any registry lookup.  Keeping this check
    separate makes it usable by scanners without loading or executing a skill.
    """
    values = _expect_mapping(frontmatter, "frontmatter")
    unknown = set(values) - SKILL_FRONTMATTER_FIELDS
    if unknown:
        raise ContractError(f"frontmatter contains unknown field(s): {sorted(unknown)}")
    name = _expect_string(values.get("name"), "frontmatter.name")
    if not _NAME.fullmatch(name):
        raise ContractError("frontmatter.name must be a lowercase capability name")
    _expect_string(values.get("description"), "frontmatter.description")
    if "version" in values:
        version = _expect_string(values["version"], "frontmatter.version")
        if not _VERSION.fullmatch(version):
            raise ContractError("frontmatter.version must be semantic version text")
    for field in ("homepage", "license", "allowed-tools"):
        if field in values:
            _expect_string(values[field], f"frontmatter.{field}")
    if "user-invocable" in values and not isinstance(values["user-invocable"], bool):
        raise ContractError("frontmatter.user-invocable must be boolean")
    if "metadata" in values:
        _expect_mapping(values["metadata"], "frontmatter.metadata")
    return deepcopy(dict(values))


def parse_skill_frontmatter(markdown: str) -> dict[str, Any]:
    """Parse the YAML document between the first pair of ``---`` markers."""
    if not isinstance(markdown, str):
        raise ContractError("skill document must be text")
    lines = markdown.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ContractError("skill document must start with frontmatter")
    try:
        end = next(index for index, line in enumerate(lines[1:], 1) if line.strip() == "---")
    except StopIteration as exc:
        raise ContractError("skill frontmatter is not closed") from exc
    raw = "\n".join(lines[1:end])
    # PyYAML is already part of the project environment used by the parser
    # harness, but importing it lazily keeps this module importable in a lean
    # static-check environment.  Never use the unsafe loader.
    try:
        import yaml  # type: ignore
        values = yaml.safe_load(raw) or {}
    except ImportError:
        # Keep static validation usable in the minimal runtime image.  The
        # fallback intentionally supports only the same simple mapping subset
        # used by SAM's skill frontmatter; complex YAML is rejected rather
        # than interpreted permissively.
        values = {}
        for line in raw.splitlines():
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            key, separator, value = line.strip().partition(":")
            if not separator or not key or not value.strip():
                raise ContractError("frontmatter requires YAML support for this syntax")
            scalar = value.strip()
            if scalar.startswith(("'", '"')) and scalar.endswith(("'", '"')):
                scalar = scalar[1:-1]
            values[key] = scalar
    return validate_frontmatter(values)


def _schema_type_matches(value: Any, schema_type: str) -> bool:
    if schema_type == "null":
        return value is None
    if schema_type == "boolean":
        return isinstance(value, bool)
    if schema_type == "integer":
        return isinstance(value, int) and not isinstance(value, bool)
    if schema_type == "number":
        return isinstance(value, (int, float)) and not isinstance(value, bool)
    if schema_type == "object":
        return isinstance(value, dict)
    if schema_type == "array":
        return isinstance(value, list)
    if schema_type == "string":
        return isinstance(value, str)
    return False


def validate_schema(schema: Mapping[str, Any], *, path: str = "parameters") -> dict[str, Any]:
    """Validate the intentionally small tool-argument JSON Schema subset."""
    values = _expect_mapping(schema, path)
    unknown = set(values) - _SCHEMA_FIELDS
    if unknown:
        raise ContractError(f"{path} contains unsupported schema keyword(s): {sorted(unknown)}")
    schema_type = values.get("type")
    if not isinstance(schema_type, str) or schema_type not in _SCHEMA_TYPES:
        raise ContractError(f"{path}.type must be one of {sorted(_SCHEMA_TYPES)}")
    if schema_type == "object" and values.get("additionalProperties") is not False:
        raise ContractError(f"{path}.additionalProperties must be false")
    if schema_type != "object" and "additionalProperties" in values and values["additionalProperties"] is not False:
        raise ContractError(f"{path}.additionalProperties must be false when present")
    if "enum" in values and (not isinstance(values["enum"], list) or not values["enum"]):
        raise ContractError(f"{path}.enum must be a non-empty array")
    if "pattern" in values:
        pattern = values["pattern"]
        if not isinstance(pattern, str):
            raise ContractError(f"{path}.pattern must be text")
        if schema_type != "string":
            raise ContractError(f"{path}.pattern is only valid for string schemas")
        try:
            re.compile(pattern)
        except re.error as exc:
            raise ContractError(f"{path}.pattern is invalid") from exc
    if schema_type == "object":
        properties = values.get("properties", {})
        if not isinstance(properties, Mapping):
            raise ContractError(f"{path}.properties must be an object")
        required = values.get("required", [])
        if not isinstance(required, list) or any(not isinstance(item, str) for item in required):
            raise ContractError(f"{path}.required must be an array of strings")
        if len(set(required)) != len(required):
            raise ContractError(f"{path}.required must not contain duplicates")
        missing_definitions = set(required) - set(properties)
        if missing_definitions:
            raise ContractError(f"{path}.required references undefined properties: {sorted(missing_definitions)}")
        for name, child in properties.items():
            if not isinstance(name, str) or not name:
                raise ContractError(f"{path}.properties names must be non-empty strings")
            validate_schema(child, path=f"{path}.properties.{name}")
    elif any(key in values for key in ("properties", "required")):
        raise ContractError(f"{path}.properties/required are only valid for object schemas")
    if "enum" in values:
        for enum_value in values["enum"]:
            if not _schema_type_matches(enum_value, schema_type):
                raise ContractError(f"{path}.enum contains a value outside type {schema_type}")
    return deepcopy(dict(values))


def validate_tool_arguments(schema: Mapping[str, Any], arguments: Mapping[str, Any]) -> None:
    """Fail closed on missing, extra, wrong-type, enum, and pattern arguments."""
    checked = validate_schema(schema)
    args = _expect_mapping(arguments, "arguments")
    if checked["type"] != "object":
        raise ContractError("tool parameters must be an object schema")
    properties = checked.get("properties", {})
    required = checked.get("required", [])
    missing = set(required) - set(args)
    if missing:
        raise ContractError(f"arguments missing required field(s): {sorted(missing)}")
    extra = set(args) - set(properties)
    if extra:
        raise ContractError(f"arguments contain unsupported field(s): {sorted(extra)}")
    for name, child in properties.items():
        if name not in args:
            continue
        value = args[name]
        child_type = child["type"]
        if not _schema_type_matches(value, child_type):
            raise ContractError(f"arguments.{name} does not match type {child_type}")
        if "enum" in child and value not in child["enum"]:
            raise ContractError(f"arguments.{name} is outside enum")
        if "pattern" in child and not re.search(child["pattern"], value):
            raise ContractError(f"arguments.{name} does not match pattern")


def validate_tool_manifest(manifest: Mapping[str, Any]) -> dict[str, Any]:
    """Validate one tool manifest, including role-scoped zone permissions."""
    values = _expect_mapping(manifest, "tool manifest")
    unknown = set(values) - TOOL_MANIFEST_FIELDS
    if unknown:
        raise ContractError(f"tool manifest contains unknown field(s): {sorted(unknown)}")
    for field in TOOL_MANIFEST_FIELDS:
        if field not in values:
            raise ContractError(f"tool manifest.{field} is required")
    name = _expect_string(values["name"], "tool manifest.name")
    if not _NAME.fullmatch(name):
        raise ContractError("tool manifest.name must be a lowercase capability name")
    _expect_string(values["purpose"], "tool manifest.purpose")
    validate_schema(values["parameters"], path="tool manifest.parameters")
    security = values["security_level"]
    if security not in SECURITY_LEVELS:
        raise ContractError(f"tool manifest.security_level must be one of {sorted(SECURITY_LEVELS)}")
    roles = _expect_unique_strings(values["roles"], "tool manifest.roles", ROLES)
    read_zones = _expect_unique_strings(values["read_zones"], "tool manifest.read_zones", ZONES)
    write_zones = _expect_unique_strings(values["write_zones"], "tool manifest.write_zones", ZONES)
    _expect_string(values["provenance"], "tool manifest.provenance")
    for role in roles:
        read_forbidden = set(read_zones) - ROLE_ZONE_ALLOWLIST[role]["read"]
        write_forbidden = set(write_zones) - ROLE_ZONE_ALLOWLIST[role]["write"]
        if read_forbidden or write_forbidden:
            raise ContractError(
                f"tool manifest zones exceed role {role}: "
                f"read={sorted(read_forbidden)}, write={sorted(write_forbidden)}"
            )
    return deepcopy(dict(values))


class SkillRegistry:
    """In-memory duplicate-detecting registry for validated skill metadata."""

    def __init__(self) -> None:
        self._skills: dict[str, dict[str, Any]] = {}

    def register(self, frontmatter: Mapping[str, Any]) -> dict[str, Any]:
        skill = validate_frontmatter(frontmatter)
        name = skill["name"]
        if name in self._skills:
            raise ContractError(f"duplicate skill name: {name}")
        self._skills[name] = skill
        return deepcopy(skill)

    def register_markdown(self, markdown: str) -> dict[str, Any]:
        return self.register(parse_skill_frontmatter(markdown))

    def names(self) -> tuple[str, ...]:
        return tuple(sorted(self._skills))


class ToolRegistry:
    """In-memory tool manifest registry with role-scoped resolution."""

    def __init__(self) -> None:
        self._tools: dict[str, dict[str, Any]] = {}

    def register(self, manifest: Mapping[str, Any]) -> dict[str, Any]:
        tool = validate_tool_manifest(manifest)
        name = tool["name"]
        if name in self._tools:
            raise ContractError(f"duplicate tool name: {name}")
        self._tools[name] = tool
        return deepcopy(tool)

    def names(self, role: str | None = None) -> tuple[str, ...]:
        if role is not None and role not in ROLES:
            raise ContractError(f"unknown role: {role}")
        return tuple(sorted(
            name for name, manifest in self._tools.items()
            if role is None or role in manifest["roles"]
        ))

    def resolve(self, name: str, *, role: str) -> dict[str, Any]:
        if role not in ROLES:
            raise ContractError(f"unknown role: {role}")
        manifest = self._tools.get(name)
        if manifest is None or role not in manifest["roles"]:
            raise ContractError(f"tool is not authorized for role: {name}/{role}")
        return deepcopy(manifest)

    def validate_call(self, name: str, *, role: str, arguments: Mapping[str, Any]) -> None:
        manifest = self.resolve(name, role=role)
        validate_tool_arguments(manifest["parameters"], arguments)
