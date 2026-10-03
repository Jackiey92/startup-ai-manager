#!/usr/bin/env python3
"""Lossless L2 quality checks used by the document-ingest skill."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

_COMPANY_SUFFIX = re.compile(r"[\u4e00-\u9fffA-Za-z0-9·（）()_-]{2,40}(?:有限公司|有限责任公司|股份有限公司|集团公司|集团)")
_RELATION = re.compile(r"(?:全资子公司|控股子公司|并表子公司|子公司)")


def _texts(manifest: dict[str, Any]) -> list[str]:
    result: list[str] = []
    for page in manifest.get("pages", []) or []:
        if not isinstance(page, dict):
            continue
        for item in page.get("text_items", []) or []:
            if isinstance(item, dict) and isinstance(item.get("text"), str):
                result.append(item["text"])
    return result


def inspect_manifest(manifest: dict[str, Any]) -> list[dict[str, str]]:
    """Return actionable quality issues; empty means the checks passed."""
    issues: list[dict[str, str]] = []
    texts = _texts(manifest)
    joined = "\n".join(texts)
    if joined.count("（") != joined.count("）") or joined.count("(") != joined.count(")"):
        issues.append({"code": "unbalanced_parentheses", "message": "括号未配对"})
    for text in texts:
        if _RELATION.search(text) and ("单独口径" in text or "合并口径" in text):
            if not text.rstrip().endswith((":", "：")) and not _COMPANY_SUFFIX.search(text):
                issues.append({"code": "truncated_company_name", "message": "主体名称后缀不完整"})
            if "口径" in text and ":" not in text and "：" not in text:
                issues.append({"code": "missing_guide_colon", "message": "主体引导句缺少冒号"})
        if re.search(r"(?:有限|股份)\s+(?:公|司)", text) or re.search(r"新能\s+池", text) or re.search(r"新能源\s+池", text):
            issues.append({"code": "mid_word_break", "message": "公司名或词语在中间断裂"})
    if any(_RELATION.search(text) for text in texts) and not _COMPANY_SUFFIX.search(joined):
        issues.append({"code": "missing_company_suffix", "message": "关系句未找到完整公司后缀"})
    return issues


def main(argv: list[str] | None = None) -> int:
    args = argv or sys.argv[1:]
    if not args:
        raise SystemExit("usage: quality.py MANIFEST.json")
    manifest = json.loads(Path(args[0]).read_text(encoding="utf-8"))
    issues = inspect_manifest(manifest)
    print(json.dumps({"ok": not issues, "issues": issues}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
