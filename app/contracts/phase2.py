"""Phase 2, role-scoped native Tool Search boundary.

The OpenClaw Gateway owns the actual ``tool_search``/``tool_describe``/
``tool_call`` control tools.  This module owns the part that must be stable
and reviewable before the Gateway is started: projecting the Phase 1 manifest
into one role's catalog and applying the same Phase 0 validation to every
describe/call.  A caller supplies the already registered runtime executor;
this module never shells out or invents a filesystem path.
"""
from __future__ import annotations

from copy import deepcopy
import json
from pathlib import Path
import re
from typing import Any, Callable, Mapping

from .phase0 import ContractError, ROLES, ToolRegistry, validate_tool_arguments


GRAY_ROLE = "file_processor"
GRAY_ROLES = frozenset({GRAY_ROLE})
_TOKEN = re.compile(r"[a-z0-9]+")


def _tokens(text: str) -> set[str]:
    return set(_TOKEN.findall(text.lower()))


def load_phase1_registry(manifest_path: Path) -> ToolRegistry:
    """Load and validate the generated Phase 1 manifest, fail closed."""
    try:
        payload = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ContractError(f"unable to load tool catalog: {manifest_path}") from exc
    if not isinstance(payload, dict) or not isinstance(payload.get("tools"), list):
        raise ContractError("tool catalog must contain a tools array")
    registry = ToolRegistry()
    for item in payload["tools"]:
        if not isinstance(item, Mapping):
            raise ContractError("tool catalog entries must be objects")
        registry.register(item)
    return registry


def finalize_agent_tool_availability(registry: ToolRegistry, role: str) -> tuple[str, ...]:
    """Return the exact execution allowlist for one role.

    This is the host-side input to OpenClaw's native
    ``finalizeAgentToolAvailability(..., {toolExecutionAllow})``.  Phase 2
    deliberately activates only the file-processor gray role; the other
    roles remain empty until their own review gates open.
    """
    if role not in ROLES:
        raise ContractError(f"unknown role: {role}")
    if role not in GRAY_ROLES:
        return ()
    return registry.names(role)


class ToolSearchSurface:
    """Role-scoped search/describe/call facade for native Tool Search.

    ``executor`` is an injected, already-registered OpenClaw tool callback.
    Keeping it outside this class prevents a catalog lookup from becoming an
    implicit subprocess or path operation.
    """

    def __init__(
        self,
        registry: ToolRegistry,
        *,
        executor: Callable[[str, Mapping[str, Any]], Any] | None = None,
    ) -> None:
        self._registry = registry
        self._executor = executor

    @staticmethod
    def _ensure_gray(role: str) -> None:
        if role not in ROLES:
            raise ContractError(f"unknown role: {role}")
        if role not in GRAY_ROLES:
            raise ContractError(f"tool_search gray rollout is not enabled for role: {role}")

    def search(self, intent: str, *, role: str, limit: int = 10) -> list[dict[str, Any]]:
        self._ensure_gray(role)
        if not isinstance(intent, str) or not intent.strip():
            raise ContractError("tool_search intent must be non-empty text")
        if not isinstance(limit, int) or isinstance(limit, bool) or not 1 <= limit <= 50:
            raise ContractError("tool_search limit must be an integer between 1 and 50")
        query = _tokens(intent)
        results: list[tuple[int, dict[str, Any]]] = []
        for name in self._registry.names(role):
            manifest = self._registry.resolve(name, role=role)
            haystack = _tokens(" ".join((name, manifest["purpose"])))
            score = len(query & haystack)
            if score:
                results.append((score, manifest))
        results.sort(key=lambda pair: (-pair[0], pair[1]["name"]))
        return [deepcopy(item) for _, item in results[:limit]]

    def describe(self, name: str, *, role: str) -> dict[str, Any]:
        self._ensure_gray(role)
        return self._registry.resolve(name, role=role)

    def call(self, name: str, arguments: Mapping[str, Any], *, role: str) -> Any:
        self._ensure_gray(role)
        manifest = self._registry.resolve(name, role=role)
        validate_tool_arguments(manifest["parameters"], arguments)
        if self._executor is None:
            raise ContractError("tool execution callback is not registered")
        # The executor receives the validated copy, never an untrusted object.
        return self._executor(name, deepcopy(dict(arguments)))


def load_tool_search_surface(manifest_path: Path, *, executor: Callable[[str, Mapping[str, Any]], Any] | None = None) -> ToolSearchSurface:
    return ToolSearchSurface(load_phase1_registry(manifest_path), executor=executor)
