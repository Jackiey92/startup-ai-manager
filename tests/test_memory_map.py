from dataclasses import dataclass
from pathlib import Path

import pytest

from app.memory.extraction import ExtractionMemoryService
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
        self.rows = {"a" * 64: FakeFile("a" * 64, "report.pdf", "application/pdf", 10, "aa/report")}

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
    uri = f"{ROOT}/2a_extraction/acme/source-1/L0/abstract.md"
    memory.delete(uri)
    result = MapBuilder(memory).rebuild_map("acme").map
    source = next(item for item in result["branches"] if item["kind"] == "2a")
    assert source["dangling"] is True


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
