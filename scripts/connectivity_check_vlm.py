#!/usr/bin/env python3
"""Explicit live qwen3.8-flash text/image connectivity check; never writes to OV."""
from __future__ import annotations

import argparse
import base64
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.runtime_config import RuntimeConfig
from app.model_provider import OpenAICompatibleProvider


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", action="store_true", help="also render a real one-page PDF")
    args = parser.parse_args()
    config = RuntimeConfig.from_env().for_extraction()
    model = OpenAICompatibleProvider(config=config)
    images = []
    if args.image:
        import pymupdf as fitz
        with fitz.open() as doc:
            page = doc.new_page()
            page.insert_text((50, 50), "Employee laptop delivery is planned, not completed.")
            png = page.get_pixmap(alpha=False).tobytes("png")
            images.append("data:image/png;base64," + base64.b64encode(png).decode("ascii"))
    result = model.complete_json(
        system_prompt="只输出 JSON，observation 字段描述所给材料，不推断未提供的事实。",
        payload={"text": "公司计划下周为新员工交付电脑，尚未完成。"},
        image_urls=images,
    )
    if not isinstance(result.get("observation"), str) or not result["observation"].strip():
        raise ValueError("VLM connectivity returned no observation")
    print(f"PASS model={config.model_default} endpoint={config.model_base_url} image={args.image}")
    print(result["observation"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
