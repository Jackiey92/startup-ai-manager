"""Replaceable employee/skill decision for semantic OV resource folders."""
from __future__ import annotations

import importlib.util
from pathlib import Path
from typing import Any

FOLDERS = ("财务", "技术与产品", "客户与市场", "法务")

def classify(*, text: str, employee: str = "document-classifier", skills_root: str | Path = "skills") -> str:
    """Return a semantic folder, allowing a versioned skill to override rules."""
    root = Path(skills_root)
    plugin = root / employee / "classifier.py"
    if plugin.is_file():
        spec = importlib.util.spec_from_file_location("sam_classifier_skill", plugin)
        if spec and spec.loader:
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            value = module.classify(text)
            if value in FOLDERS:
                return value
    scores = {
        "财务": sum(x in text for x in ("利润", "资产负债", "现金流", "发票", "会计")),
        "技术与产品": sum(x in text for x in ("技术", "产品", "研发", "专利", "规格")),
        "客户与市场": sum(x in text for x in ("客户", "市场", "销售", "订单", "渠道")),
        "法务": sum(x in text for x in ("合同", "诉讼", "知识产权", "法务", "合规")),
    }
    winner, score = max(scores.items(), key=lambda item: item[1])
    return winner if score else "技术与产品"
