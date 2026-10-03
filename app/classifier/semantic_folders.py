"""Semantic resource-folder boundary owned by the file-processing employee."""
from __future__ import annotations

from pathlib import Path

from ..employees import SemanticDecisionUnavailable, SemanticEmployee

# Storage paths are protocol constants. Their meaning belongs to the skill.
FOLDERS = ("财务", "技术与产品", "客户与市场", "法务")


def classify(*, text: str, employee: SemanticEmployee | None = None,
             company_id: str = "default", thread_id: str | None = None,
             skills_root: str | Path = "skills") -> str:
    """Ask the employee for a folder; fail closed when no decision exists."""
    del skills_root
    if employee is None:
        return "unclassified"
    try:
        folder = employee.classify_document(
            text=text, company_id=company_id, thread_id=thread_id,
        ).get("folder")
    except (SemanticDecisionUnavailable, OSError, TypeError, ValueError):
        return "unclassified"
    return folder if folder in FOLDERS else "unclassified"
