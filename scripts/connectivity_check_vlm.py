#!/usr/bin/env python3
"""Explicit live qwen3.8-flash + local OV L0/L1 check (outside pytest)."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys
import tempfile
import uuid

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.runtime_config import RuntimeConfig
from app.model_provider import OpenAICompatibleProvider
from app.ports import OpenVikingMemoryProvider
from app.memory.extraction import ExtractionMemoryService
from app.memory.visual_extraction import generate_sidecars
from connectivity_check_local import _delete_with_retry


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", action="store_true", help="also render a real one-page PDF")
    args = parser.parse_args()
    config = RuntimeConfig.from_env().for_extraction()
    company = "acc-vlm-" + uuid.uuid4().hex[:12]
    scratch = f"{config.memory_root_uri}/{company}"
    model = OpenAICompatibleProvider(config=config)
    manifest = {
        "source_id": "sample", "filename": "sample.pdf" if args.image else "sample.txt",
        "format": "pdf" if args.image else "txt", "file_hash": uuid.uuid4().hex,
        "pages": [{"page_no": 1, "text_items": [{"text": "公司计划下周为新员工交付电脑，尚未完成。"}], "tables": []}],
        "parse_summary": {"raw_bytes_external": False, "full_text_external": False},
    }
    # The CLI config is temporary and contains only the local URL, never a key.
    with tempfile.TemporaryDirectory() as directory:
        memory = OpenVikingMemoryProvider(base_url=config.memory_base_url, memory_root=scratch,
                                         cli_config_path=Path(directory) / "sam-ovcli-vlm.conf")
        # Fail before any writes; no cleanup retry against an unreachable server.
        memory._check_endpoint()
        source_path = None
        if args.image:
            import pymupdf as fitz
            source_path = Path(directory) / "sample.pdf"
            with fitz.open() as doc:
                doc.new_page().insert_text((50, 50), "Employee laptop delivery is planned, not completed.")
                doc.save(source_path)
        try:
            record = ExtractionMemoryService(memory, root=scratch).ingest(
                company, manifest, resource_uri=f"{scratch}/resource",
            )
            generate_sidecars(memory, model, manifest, abstract_uri=record.abstract_uri, overview_uri=record.overview_uri,
                              l2_manifest_uri=record.l2_manifest_uri, source_path=source_path)
            saved = json.loads(memory.read(record.l2_manifest_uri))
            for key, uri in (("abstract_uri", record.abstract_uri), ("overview_uri", record.overview_uri)):
                assert saved["ov_sidecar_uris"][key] == uri
                assert not uri.endswith(("/.abstract.md", "/.overview.md"))
                text = memory.read(uri)
                assert len(text.strip()) > 20 and record.l2_manifest_uri in text
                print(f"PASS {key} uri={uri}\n{text}")
            print(f"PASS model={config.model_default} endpoint={config.model_base_url} image={args.image}")
        finally:
            _delete_with_retry(memory, scratch, recursive=True)
            print(f"PASS cleanup={scratch}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
