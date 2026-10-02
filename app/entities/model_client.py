"""Small, dependency-free model client for 2.1.b ambiguous blocks."""
from __future__ import annotations

from typing import Any

from ..model_provider import OpenAICompatibleProvider
from ..runtime_config import RuntimeConfig


class EntityAttributionModelClient:
    def __init__(self, *, config: RuntimeConfig | None = None, provider: Any | None = None):
        self.provider = provider or OpenAICompatibleProvider(config=config)

    def classify(self, *, text: str, company_name: str | None, aliases: list[str]) -> dict[str, Any]:
        result = self.provider.complete_json(
            system_prompt=(
                "You classify one ambiguous document block for entity attribution. "
                "Return strict JSON with exactly the fields label, subject, reason. "
                "label must be self, related, foreign, or ambiguous. Do not change "
                "numbers or invent a subject; choose ambiguous when uncertain."
            ),
            payload={
                "task": "attribute this block to the host company, a related entity, or a foreign entity",
                "text": text,
                "company_name": company_name or "",
                "aliases": aliases,
            },
        )
        if not isinstance(result, dict) or set(result) != {"label", "subject", "reason"}:
            raise ValueError("invalid model classification shape")
        if result["label"] not in {"self", "related", "foreign", "ambiguous"}:
            raise ValueError("invalid model classification label")
        if result["subject"] is not None and not isinstance(result["subject"], str):
            raise ValueError("invalid model classification subject")
        if not isinstance(result["reason"], str) or not result["reason"].strip():
            raise ValueError("invalid model classification reason")
        return {"label": result["label"], "subject": result["subject"], "reason": result["reason"]}
