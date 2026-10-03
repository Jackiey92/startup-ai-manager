"""Read-only access to OpenViking's resource-generated navigation sidecars.

OpenViking owns the semantic L0/L1 documents for imported resources. SAM must
not create a second ``narratives`` namespace or write manager prose into those
sidecars. This module is deliberately a thin route/read adapter.
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from .memory_paths import MEMORY_ROOT
from .ports import LocalMemoryProvider, MemoryProvider, MemoryUnavailable


class OVNavigationService:
    """Resolve and read OV-generated sidecars without writing to OV."""

    def __init__(self, db_path=None, memory: MemoryProvider | None = None, *,
                 resources_root: str = "viking://resources"):
        # ``db_path`` remains accepted for a narrow compatibility boundary;
        # navigation is now derived from OV resources, not SQLite prose.
        self.db_path = db_path
        self.memory = memory or LocalMemoryProvider(Path(".ov-memory"))
        self.resources_root = resources_root.rstrip("/")

    @staticmethod
    def _segment(value: Any) -> str:
        value = str(value or "").strip()
        if not value or value in {".", ".."} or "/" in value or "\\" in value:
            raise ValueError("unsafe OV resource path segment")
        return value

    def resource_uri(self, folder: str, file_hash: str) -> str:
        """Return the exact resource directory requested by SAM's ``--to``."""
        return (f"{self.resources_root}/{self._segment(folder)}/"
                f"{self._segment(file_hash)}.md")

    @staticmethod
    def sidecar_uris(resource_uri: str) -> dict[str, str]:
        uri = str(resource_uri or "").rstrip("/")
        if not uri.startswith("viking://") or uri == "viking://":
            raise ValueError("resource_uri must be a viking:// URI")
        return {
            "abstract_uri": f"{uri}/.abstract.md",
            "overview_uri": f"{uri}/.overview.md",
        }

    def read_sidecars(self, resource_uri: str) -> dict[str, Any] | None:
        """Read both OV sidecars, returning ``None`` while either is absent."""
        routes = self.sidecar_uris(resource_uri)
        try:
            abstract = self.memory.read(routes["abstract_uri"])
            overview = self.memory.read(routes["overview_uri"])
        except (FileNotFoundError, MemoryUnavailable, OSError):
            return None
        return {
            "resource_uri": str(resource_uri).rstrip("/"),
            **routes,
            "abstract": abstract,
            "overview": overview,
            "provenance": "openviking.semantic_processor",
        }

    def list(self, *, prefix: str | None = None) -> list[dict[str, Any]]:
        """List sidecar records already materialized by OV."""
        query_prefix = prefix or self.resources_root
        try:
            items = self.memory.query(prefix=query_prefix)
        except (FileNotFoundError, MemoryUnavailable, OSError):
            return []
        records: dict[str, dict[str, Any]] = {}
        for item in items:
            uri = str(item.get("uri") or "")
            if uri.endswith("/.abstract.md"):
                root = uri[:-len("/.abstract.md")]
                records.setdefault(root, {"resource_uri": root})["abstract_uri"] = uri
            elif uri.endswith("/.overview.md"):
                root = uri[:-len("/.overview.md")]
                records.setdefault(root, {"resource_uri": root})["overview_uri"] = uri
        return sorted(records.values(), key=lambda item: str(item["resource_uri"]))


def legacy_narratives_uri(*parts: str) -> str:
    """Return a legacy URI for read-only migration diagnostics only."""
    safe = [re.sub(r"[^\w.-]+", "_", str(part), flags=re.UNICODE).strip("_")
            or "unknown" for part in parts]
    return f"{MEMORY_ROOT}/narratives/" + "/".join(safe)
