"""Deterministic employee stub used by bridge unit tests only."""
from __future__ import annotations

import re


class FixtureEntityEmployee:
    def __init__(self):
        self.context = None

    def attribute_block(self, *, text: str, **_):
        if text.strip() == "技术与产品":
            self.context = None
            return {"label": "ambiguous", "subject": None, "relation": None, "reason": "heading"}
        named = re.findall(r"[\u4e00-\u9fffA-Za-z0-9·（）()_-]{2,40}(?:有限公司|有限责任公司|股份有限公司|集团公司|集团)", text)
        if ("全资子公司" in text or "子公司" in text) and named:
            relation = "全资子公司" if "全资子公司" in text else "子公司"
            tail = text.split(relation, 1)[1]
            child_names = re.findall(
                r"[\u4e00-\u9fffA-Za-z0-9·（）()_-]{2,40}(?:有限公司|有限责任公司|股份有限公司|集团公司|集团)",
                tail,
            )
            subject = child_names[-1] if child_names else named[-1]
            result = {"label": "related", "subject": subject, "relation": relation, "reason": "employee"}
            self.context = result
            return result
        if "主要客户" in text and named:
            return {"label": "related", "subject": named[-1], "relation": "客户", "reason": "employee"}
        if "主公司有限公司" in text:
            result = {"label": "self", "subject": "主公司有限公司", "relation": None, "reason": "employee"}
            self.context = result
            return result
        if text.lstrip().startswith(("•", "●", "▪")) and self.context is not None:
            return dict(self.context)
        if named:
            return {"label": "foreign", "subject": named[0], "relation": None, "reason": "employee"}
        return {"label": "ambiguous", "subject": None, "relation": None, "reason": "employee"}
