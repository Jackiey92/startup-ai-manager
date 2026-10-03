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
import tempfile
from pathlib import Path
from typing import Any, Iterable

from ..ports import MemoryProvider
from ..source_map import render_mapping
from ..memory_paths import MEMORY_ROOT
from ..classifier.semantic_folders import classify as classify_folder


def parsed_resource_uri(parent: str, resource_name: str) -> str:
    """Build the exact target URI owned by SAM for parsed markdown."""
    clean_parent = str(parent).rstrip("/")
    name = Path(str(resource_name)).name
    if not clean_parent.startswith("viking://"):
        raise ValueError("parent must be a viking:// URI")
    if not name or name in {".", ".."}:
        raise ValueError("resource_name is required")
    return f"{clean_parent}/{name}"


def add_parsed_resource(memory: MemoryProvider, manifest: dict[str, Any], *, parent: str,
                        resource_name: str | None = None, timeout: int = 600) -> tuple[Any, str]:
    """Ingest parser markdown, never the immutable source bytes, into OV.

    The target is submitted through ``--to`` so OV cannot choose its short
    fingerprint directory/name.  The temporary file is safe to remove after
    the CLI has accepted the upload; the original PDF remains in SAM's object
    store.
    """
    name = resource_name or f"{manifest.get('source_id') or manifest.get('file_hash')}.md"
    target_uri = parsed_resource_uri(parent, name)
    with tempfile.TemporaryDirectory() as directory:
        path = Path(directory) / Path(name).name
        path.write_text(render_mapping(manifest), encoding="utf-8")
        memory.ensure_directory(parent)
        result = memory.add_resource_to(str(path), target_uri, wait=True, timeout=timeout)
    return result, target_uri




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
        return render_mapping(manifest)

    def render_document(self, manifest: dict[str, Any]) -> str:
        """Return parser output suitable for OV resource ingestion."""
        return self._markdown(manifest)

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
        l2_document_uri = f"{source_root}/L2/mapping.md"
        l1_uri = f"{source_root}/L1/overview.md"
        l0_uri = f"{source_root}/L0/abstract.md"
        manifest_content = json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True) + "\n"
        self.memory.put(l2_manifest_uri, manifest_content, metadata={"layer": "2a", "level": "L2", "source_id": source_id})
        self.memory.put(l2_document_uri, document_markdown or self._markdown(manifest), metadata={"layer": "2a", "level": "L2", "kind": "mapping", "source_id": source_id})
        # L1/L0 are OV-generated folder navigation documents.  SAM retains
        # only these URI routes here; it must never duplicate their正文.
        return ExtractionRecord(source_id, l2_manifest_uri, l2_document_uri, l1_uri, l0_uri)

    def classify_folder(self, manifest: dict[str, Any], *, skills_root: str = "skills") -> str:
        text = self._markdown(manifest)
        return classify_folder(text=text, skills_root=skills_root)


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
