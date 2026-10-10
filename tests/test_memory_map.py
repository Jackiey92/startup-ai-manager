from dataclasses import dataclass
from pathlib import Path

import pytest

from app.memory.archive.archive_service import ExtractionMemoryService
from app.memory_map import MapBuilder, MemoryMapTools, ROOT
from app.ports import LocalMemoryProvider


@dataclass
class FakeFile:
    file_hash: str
    original_name: str
    mime_type: str
    size_bytes: int
    storage_path: str


class FakeFiles:
    def __init__(self):
        self.rows = {
            "a" * 64: FakeFile("a" * 64, "report.pdf", "application/pdf", 10, "aa/report"),
            "b" * 64: FakeFile("b" * 64, "brief.pdf", "application/pdf", 12, "bb/brief"),
        }

    def get(self, file_hash):
        return self.rows[file_hash]


def _memory(tmp_path: Path):
    memory = LocalMemoryProvider(tmp_path)
    ExtractionMemoryService(memory).ingest("acme", {
        "source_id": "source-1", "filename": "report.pdf", "format": "pdf",
        "file_hash": "a" * 64, "pages": [],
        "parse_summary": {"raw_bytes_external": False, "full_text_external": False},
    })
    memory.put_fact("acme", "runway", {"status": "verified", "value": 12, "unit": "months", "source_refs": [{"uri": "viking://evidence"}]})
    return memory


def test_map_is_navigation_only_and_rebuild_is_deterministic(tmp_path):
    memory = _memory(tmp_path)
    first = MapBuilder(memory).rebuild_map("acme").map
    second = MapBuilder(memory).rebuild_map("acme").map
    assert first["branches"] == second["branches"]
    assert all(set(item) >= {"title", "uri", "kind"} for item in first["branches"])
    assert "runway" not in str(first)
    assert memory.read(MapBuilder(memory).markdown_uri("acme")).count("viking://") >= 1


def test_map_marks_dangling_branch(tmp_path):
    memory = _memory(tmp_path)
    uri = f"{ROOT}/2a_extraction/acme/source-1/L2/mapping.md"
    memory.delete(uri)
    result = MapBuilder(memory).rebuild_map("acme").map
    source = next(item for item in result["branches"] if item["kind"] == "2a")
    assert source["dangling"] is True


def test_manager_can_read_parser_body_from_map_branch(tmp_path):
    memory = _memory(tmp_path)
    result = MapBuilder(memory).rebuild_map("acme")
    source = next(item for item in result.map["branches"] if item["kind"] == "2a")
    assert source["uri"].endswith("/L2/mapping.md")
    body = MemoryMapTools(memory, FakeFiles(), "acme").memory_read(source["uri"])
    assert "source_id" in body


def test_cached_map_refreshes_when_parallel_import_adds_a_source(tmp_path):
    memory = _memory(tmp_path)
    builder = MapBuilder(memory)
    builder.rebuild_map("acme")
    ExtractionMemoryService(memory).ingest("acme", {
        "source_id": "source-2", "filename": "brief.pdf", "format": "pdf",
        "file_hash": "b" * 64, "pages": [],
        "parse_summary": {"raw_bytes_external": False, "full_text_external": False},
    })
    refreshed = builder.load_or_rebuild("acme")
    assert {item["uri"].split("/")[-3] for item in refreshed.map["branches"] if item["kind"] == "2a"} == {
        "source-1", "source-2",
    }


def test_tools_enforce_company_scope_and_record_navigation(tmp_path):
    memory = _memory(tmp_path)
    tools = MemoryMapTools(memory, FakeFiles(), "acme")
    uri = f"{ROOT}/2a_extraction/acme/source-1/L2/manifest.json"
    assert "source_id" in tools.memory_read(uri)
    assert tools.memory_search("report")
    assert tools.file_get("a" * 64)["original_name"] == "report.pdf"
    with pytest.raises(PermissionError):
        tools.memory_read(f"{ROOT}/2a_extraction/other/x/L2/manifest.json")
    with pytest.raises(ValueError):
        tools.file_get("not-a-hash")
    assert all(item.startswith("viking://") for item in tools.navigation)


def test_manager_global_read_scope_reads_other_company_without_writing_map(tmp_path):
    memory = _memory(tmp_path)
    ExtractionMemoryService(memory).ingest("other", {
        "source_id": "source-2", "filename": "brief.pdf", "format": "pdf",
        "file_hash": "b" * 64, "pages": [],
        "parse_summary": {"raw_bytes_external": False, "full_text_external": False},
    })
    tools = MemoryMapTools(memory, FakeFiles(), "acme", global_read_only=True)
    other_uri = f"{ROOT}/2a_extraction/other/source-2/L2/mapping.md"
    assert "source-2" in tools.memory_read(other_uri)
    assert other_uri in tools.memory_search("brief")
    assert tools.file_get("b" * 64)["original_name"] == "brief.pdf"
    global_map = MapBuilder(memory).global_read_map(source_catalog=(('acme', 'a' * 64), ('other', 'b' * 64)))
    assert global_map["scope"] == "global_read_only"
    assert global_map["read_only"] is True
    assert {item["company_id"] for item in global_map["branches"] if item["kind"] == "2a"} == {"acme", "other"}
    with pytest.raises(FileNotFoundError):
        memory.read(f"{ROOT}/memory_maps/_global_read_only/map.json")
    with pytest.raises(PermissionError):
        tools.memory_read("viking://untrusted/outside")
