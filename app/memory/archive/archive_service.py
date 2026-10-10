"""Stable entry point for the entirely external 2A archive.

Originals and rebuildable mappings live in external bin/map storage. This
module must never depend on OV or accept a memory provider.
"""
from ...storage.archive_store import ArchiveFileStore
from ...storage.mapping_store import SourceMapService, render_mapping

__all__ = ["ArchiveFileStore", "SourceMapService", "render_mapping"]
