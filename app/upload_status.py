"""Pure upload parse-status handling shared by the web route and tests."""
from __future__ import annotations


def parse_result_status(payload: object) -> tuple[str, str]:
    """Return client/storing status without treating an empty manifest as parsed."""
    if not isinstance(payload, dict):
        return "parse_failed", "parse_failed"
    summary = payload.get("parse_summary")
    if not isinstance(summary, dict):
        return "parse_failed", "parse_failed"
    status = str(summary.get("status") or "parse_failed")
    if status != "parsed":
        return status, status
    return "parsed", "not_attempted"
