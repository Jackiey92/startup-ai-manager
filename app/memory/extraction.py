"""2a extraction-memory orchestration over the MemoryProvider seam.

The ingest skill produces an L2 manifest locally.  This module stores that
manifest and a human-readable extraction in 2a, then writes L1/L0 documents
that contain references to L2 rather than copying facts into another source
of truth.  It deliberately does not write 2b.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import hashlib
import json
from typing import Any, Iterable

from ..ports import MemoryProvider


MEMORY_ROOT = "viking://user/default/memories/projects/10_startup_ai_manager"


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _segment(value: str) -> str:
    value = "".join(ch for ch in str(value).strip() if ch.isalnum() or ch in "._-")
    if not value:
        raise ValueError("memory path segment cannot be empty")
    return value


@dataclass(frozen=True)
class ExtractionRecord:
    source_id: str
    l2_manifest_uri: str
    l2_document_uri: str
    l1_uri: str
    l0_uri: str


class ExtractionMemoryService:
    def __init__(self, memory: MemoryProvider, *, root: str = MEMORY_ROOT):
        self.memory = memory
        self.root = root.rstrip("/")

    def _source_root(self, company_id: str, source_id: str) -> str:
        return f"{self.root}/2a_extraction/{_segment(company_id)}/{_segment(source_id)}"

    @staticmethod
    def _markdown(manifest: dict[str, Any]) -> str:
        lines = [f"# {manifest.get('filename', 'document')}", ""]
        lines.append(f"- source_id: `{manifest.get('source_id', '')}`")
        lines.append(f"- file_hash: `{manifest.get('file_hash', '')}`")
        lines.append(f"- format: `{manifest.get('format', '')}`")
        lines.append(f"- raw_bytes_external: `{manifest.get('parse_summary', {}).get('raw_bytes_external', False)}`")
        lines.append(f"- full_text_external: `{manifest.get('parse_summary', {}).get('full_text_external', False)}`")
        lines.append("")
        for page in manifest.get("pages", []):
            lines.append(f"## Page {page.get('page_no', '?')}")
            for item in page.get("text_items", []):
                loc = item.get("source_loc", {})
                lines.append(f"- {item.get('text', '')} _(source: {loc.get('locator', '')})_")
            for table in page.get("tables", []):
                lines.append(f"- table rows: {len(table.get('rows', []))}; source: {table.get('source_loc', {}).get('locator', '')}")
        if manifest.get("images"):
            lines.extend(["", "## Embedded images"])
            for image in manifest["images"]:
                lines.append(f"- `{image.get('image_id')}`: `{image.get('local_path')}` _(source: {image.get('source_loc', {}).get('locator', '')})_")
        return "\n".join(lines) + "\n"

    def ingest(self, company_id: str, manifest: dict[str, Any], *, document_markdown: str | None = None) -> ExtractionRecord:
        required = ("source_id", "filename", "format", "file_hash", "pages", "parse_summary")
        missing = [key for key in required if key not in manifest]
        if missing:
            raise ValueError(f"L2 manifest missing fields: {', '.join(missing)}")
        if manifest.get("parse_summary", {}).get("raw_bytes_external") is not False or manifest.get("parse_summary", {}).get("full_text_external") is not False:
            raise ValueError("2a accepts only manifests with external disclosure flags set to false")
        source_id = _segment(manifest["source_id"])
        source_root = self._source_root(company_id, source_id)
        l2_manifest_uri = f"{source_root}/L2/manifest.json"
        l2_document_uri = f"{source_root}/L2/extraction.md"
        l1_uri = f"{source_root}/L1/overview.md"
        l0_uri = f"{source_root}/L0/abstract.md"
        manifest_content = json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True) + "\n"
        self.memory.put(l2_manifest_uri, manifest_content, metadata={"layer": "2a", "level": "L2", "source_id": source_id})
        self.memory.put(l2_document_uri, document_markdown or self._markdown(manifest), metadata={"layer": "2a", "level": "L2", "source_id": source_id})
        references = f"- L2 manifest: `{l2_manifest_uri}`\n- L2 extraction: `{l2_document_uri}`\n"
        l1 = f"# L1 Overview\n\nGenerated: {_now()}\n\nThis overview contains references only; facts remain in L2 until verified.\n\n{references}"
        l0 = f"# L0 Abstract\n\nGenerated: {_now()}\n\nSource: `{l1_uri}`\n\nEvidence remains at:\n{references}"
        self.memory.put(l1_uri, l1, metadata={"layer": "2a", "level": "L1", "source_id": source_id})
        self.memory.put(l0_uri, l0, metadata={"layer": "2a", "level": "L0", "source_id": source_id})
        return ExtractionRecord(source_id, l2_manifest_uri, l2_document_uri, l1_uri, l0_uri)


class ConflictScanner:
    """Small post-import scanner; conflicts become todos, never 2b facts."""

    def __init__(self, memory: MemoryProvider, *, root: str = MEMORY_ROOT):
        self.memory = memory
        self.root = root.rstrip("/")

    def scan(self, manifests: Iterable[dict[str, Any]]) -> list[str]:
        seen: dict[str, tuple[Any, str, str]] = {}
        todo_uris: list[str] = []
        for manifest in manifests:
            source = str(manifest.get("source_id", "unknown"))
            source_uri = str(manifest.get("source_uri") or source)
            candidates = manifest.get("candidate_facts", {})
            if isinstance(candidates, list):
                candidates = {str(item.get("key")): item.get("value") for item in candidates if isinstance(item, dict) and item.get("key")}
            for key, value in dict(candidates).items():
                previous = seen.get(str(key))
                if previous and previous[0] != value:
                    digest = hashlib.sha256(f"{key}|{previous[1]}|{source}".encode()).hexdigest()[:16]
                    uri = f"{self.root}/todos/conflict-{digest}.md"
                    body = (
                        f"# Conflict: {key}\n\n"
                        f"Status: pending\n\n"
                        f"- Existing value: `{previous[0]}`\n"
                        f"  - Evidence: `{previous[2]}`\n"
                        f"- New value: `{value}`\n"
                        f"  - Evidence: `{source_uri}`\n\n"
                        "This conflict is not promoted to 2b until reviewed.\n"
                    )
                    self.memory.put(uri, body, metadata={"kind": "conflict", "status": "pending", "fact_key": str(key)})
                    todo_uris.append(uri)
                else:
                    seen[str(key)] = (value, source, source_uri)
        return todo_uris
