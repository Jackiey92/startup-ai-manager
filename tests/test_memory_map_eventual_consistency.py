from pathlib import Path

from app.memory.archive.archive_service import ExtractionMemoryService
from app.memory_map import MapBuilder
from app.ports import LocalMemoryProvider


class LaggyListingMemory(LocalMemoryProvider):
    def __init__(self, root: Path):
        super().__init__(root)
        self.listing_ready = False

    def query(self, *, prefix: str, query=None):
        if "/2a_extraction/" in prefix and not self.listing_ready:
            return []
        return super().query(prefix=prefix, query=query)


def _manifest():
    return {
        "source_id": "fresh-source", "filename": "fresh.pdf", "format": "pdf",
        "file_hash": "b" * 64, "pages": [],
        "parse_summary": {"raw_bytes_external": False, "full_text_external": False},
    }


def test_known_source_is_found_by_exact_read_while_ls_lags(tmp_path):
    memory = LaggyListingMemory(tmp_path)
    ExtractionMemoryService(memory).ingest("acme", _manifest())
    # Recursive listing is empty; explicit source IDs still point to the
    # parser-owned L2 body so the manager can read the正文 immediately.
    result = MapBuilder(memory).rebuild_map("acme", source_ids=("fresh-source",))
    assert [item["uri"] for item in result.map["branches"]] == [
        "viking://sam-test/product-root/2a_extraction/acme/fresh-source/L2/mapping.md"
    ]
    assert result.map["branches"][0]["dangling"] is False

    # Once enumeration catches up, the same branch is not duplicated.
    memory.listing_ready = True
    again = MapBuilder(memory).rebuild_map("acme", source_ids=("fresh-source",))
    assert len(again.map["branches"]) == 1
    assert again.map["branches"][0]["dangling"] is False
