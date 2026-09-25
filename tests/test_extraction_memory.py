import json

from app.memory.extraction import ConflictScanner, ExtractionMemoryService
from app.ports import LocalMemoryProvider


def manifest(source_id="pdf-1", candidate_facts=None):
    return {
        "source_id": source_id,
        "filename": "sample.pdf",
        "format": "pdf",
        "size_bytes": 12,
        "uploaded_at": "2026-09-25T00:00:00+00:00",
        "file_hash": "a" * 64,
        "pages": [{"page_no": 1, "text_items": [], "tables": []}],
        "images": [],
        "parse_summary": {
            "status": "parsed",
            "engine": "mineru",
            "text_item_count": 0,
            "table_count": 0,
            "table_row_count": 0,
            "warnings": [],
            "raw_bytes_external": False,
            "full_text_external": False,
        },
        **({"candidate_facts": candidate_facts} if candidate_facts is not None else {}),
    }


def test_2a_writes_l2_l1_l0_and_references(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    record = ExtractionMemoryService(memory).ingest("acme", manifest())

    assert json.loads(memory.read(record.l2_manifest_uri))["source_id"] == "pdf-1"
    assert "L2 manifest" in memory.read(record.l1_uri)
    assert record.l2_document_uri in memory.read(record.l0_uri)
    assert memory.get_2b("acme", "cash") is None


def test_conflicts_become_pending_todos_not_facts(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    todos = ConflictScanner(memory).scan([
        manifest("a", {"registered_capital": 100}),
        manifest("b", {"registered_capital": 120}),
    ])

    assert len(todos) == 1
    body = memory.read(todos[0])
    assert "Status: pending" in body
    assert "registered_capital" in body
    assert memory.get_2b("acme", "registered_capital") is None
