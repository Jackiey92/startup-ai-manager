"""Employee-owned semantic decisions used by the 2A bridges.

This module deliberately contains no document vocabulary, entity regex, or
business fallback.  It only transports a bounded request to a skill and
validates the shape needed by the storage adapters.  Meaning belongs to the
skill and the employee session; malformed or absent output is unresolved.
"""
from __future__ import annotations

import json
from typing import Any, Mapping

from .worker import EmployeeRunner, WorkerUnavailable


class SemanticDecisionUnavailable(WorkerUnavailable):
    """The employee did not return a usable semantic decision."""


class SemanticEmployee:
    """One generic employee runtime with role-specific skill requests."""

    def __init__(self, worker: EmployeeRunner | None = None):
        self.worker = worker or EmployeeRunner()

    def _run(self, *, task: str, text: str, company_id: str,
             thread_id: str | None = None) -> dict[str, Any]:
        prompt = f"TASK: {task}\nReturn one decision object inside the required candidates JSON.\n"
        values = self.worker.run(
            skill="document-classifier",
            text=prompt + text,
            company_id=company_id,
            thread_id=thread_id,
        )
        if len(values) != 1 or not isinstance(values[0], Mapping):
            raise SemanticDecisionUnavailable("employee returned no single semantic decision")
        return dict(values[0])

    def classify_document(self, *, text: str, company_id: str,
                          thread_id: str | None = None) -> dict[str, Any]:
        return self._run(
            task="classify the source module, document type, and semantic folder",
            text=text, company_id=company_id, thread_id=thread_id,
        )

    def attribute_block(self, *, text: str, company_name: str | None,
                        aliases: list[str], company_id: str,
                        thread_id: str | None = None) -> dict[str, Any]:
        context = json.dumps({
            "company_name": company_name or "",
            "aliases": aliases,
            "block": text,
        }, ensure_ascii=False)
        result = self._run(
            task="attribute this block to the host, a related entity, a foreign entity, or ambiguous",
            text=context, company_id=company_id, thread_id=thread_id,
        )
        label = result.get("classification", result.get("label"))
        if label not in {"self", "related", "foreign", "ambiguous"}:
            raise SemanticDecisionUnavailable("employee returned invalid entity classification")
        subject = result.get("subject")
        relation = result.get("relation")
        reason = result.get("reason")
        if subject is not None and not isinstance(subject, str):
            raise SemanticDecisionUnavailable("employee returned invalid entity subject")
        if relation is not None and not isinstance(relation, str):
            raise SemanticDecisionUnavailable("employee returned invalid entity relation")
        if not isinstance(reason, str) or not reason.strip():
            reason = "employee semantic attribution"
        return {
            "label": label,
            "subject": subject.strip() if isinstance(subject, str) and subject.strip() else None,
            "relation": relation.strip() if isinstance(relation, str) and relation.strip() else None,
            "reason": reason,
        }

    def roster_candidate(self, *, text: str, company_id: str,
                         thread_id: str | None = None) -> dict[str, Any]:
        return self._run(
            task="extract the declared or suggested entity roster fields from this source",
            text=text, company_id=company_id, thread_id=thread_id,
        )
