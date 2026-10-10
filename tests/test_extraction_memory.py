"""The archive entry point exposes only external storage capabilities."""
from app.memory.archive.archive_service import ArchiveFileStore, SourceMapService, render_mapping
from app.storage.archive_store import ArchiveFileStore as StoredArchive
from app.storage.mapping_store import SourceMapService as StoredMapping, render_mapping as render


def test_archive_exports_external_storage_without_wrappers():
    assert ArchiveFileStore is StoredArchive
    assert SourceMapService is StoredMapping
    assert render_mapping is render


def test_memory_package_imports_external_archive_exports():
    import app.memory as memory
    assert memory.ArchiveFileStore is StoredArchive
    assert memory.SourceMapService is StoredMapping
