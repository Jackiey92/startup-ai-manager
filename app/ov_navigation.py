"""Read-only adapter for SAM L0/L1 coordinates retained in L2 manifests."""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from .memory_paths import MEMORY_ROOT
from .ports import LocalMemoryProvider, MemoryProvider, MemoryUnavailable


class OVNavigationService:
    """Read SAM navigation documents without writing."""

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

    def read_sidecars(self, manifest: dict[str, Any]) -> dict[str, Any] | None:
        """Read exact SAM coordinates; never infer or read OV reserved paths."""
        routes = manifest.get("ov_sidecar_uris")
        if not isinstance(routes, dict):
            return None
        abstract_uri = routes.get("abstract_uri")
        overview_uri = routes.get("overview_uri")
        if not isinstance(abstract_uri, str) or not isinstance(overview_uri, str):
            return None
        if (not abstract_uri.startswith("viking://")
                or not abstract_uri.endswith("/L0/abstract.md")
                or overview_uri != abstract_uri.removesuffix("/L0/abstract.md") + "/L1/overview.md"):
            return None
        try:
            abstract = self.memory.read(abstract_uri)
            overview = self.memory.read(overview_uri)
        except (FileNotFoundError, MemoryUnavailable, OSError):
            return None
        return {
            "resource_uri": manifest.get("ov_resource_uri"),
            "abstract_uri": abstract_uri,
            "overview_uri": overview_uri,
            "abstract": abstract,
            "overview": overview,
            "provenance": "sam.visual_extraction",
        }


def legacy_narratives_uri(*parts: str) -> str:
    """Return a legacy URI for read-only migration diagnostics only."""
    safe = [re.sub(r"[^\w.-]+", "_", str(part), flags=re.UNICODE).strip("_")
            or "unknown" for part in parts]
    return f"{MEMORY_ROOT}/narratives/" + "/".join(safe)
