"""Server-side import guidance.

The browser deliberately contains no import order or business methodology.
This module owns the eight-module method and asks the configured OpenClaw main
Agent to turn
the current evidence snapshot into a concise, company-specific next action.
"""
from __future__ import annotations

import os
import sqlite3
import json
import re
import subprocess
import time
from typing import Any

from app.ports import ModelUnavailable, RuntimeProvider
from app.storage import SourceFileStore


SYSTEM_PROMPT = """你是 Startup AI Manager 的企业资料导入引导助手。
你的工作不是套用固定步骤，而是只根据当前已经存入系统的企业资料，判断
下一份最有价值的资料、说明原因、说明上传后可以得到的分析，并评估资料
完整度。你遵循八大模块方法：公司主体与股权、财务、销售与客户、人员、
研发与产品、运营与供应链、法务与合规、市场与融资。优先级随公司的现有
资料、文件内容和缺口动态变化，不要假设任一模块已经完成。

仅返回一个 JSON 对象，禁止 Markdown 或额外字段：
{
  "message": "面向创业者的简洁引导（不超过 160 字）",
  "next_action": "建议下一步上传的资料类型",
  "completeness": {
    "percent": 0,
    "received": ["已获得的模块或资料"],
    "missing": ["当前最重要的缺口"]
  }
}
percent 必须是 0 到 100 的整数。没有足够证据时明确说明不确定性，不得把
文件名猜测为已核实事实。"""

class ImportGuideService:
    """Build bounded parse evidence and ask the configured OpenClaw agent.

    Import guidance deliberately has no model-vendor client.  The configured
    RuntimeProvider starts the same ``sam-guide`` agent used by the rest of
    SAM, so tool scope and model routing remain in one place.
    """

    def __init__(
        self,
        *,
        store: SourceFileStore,
        db_path: str | os.PathLike[str] | None = None,
        env: dict[str, str] | None = None,
        runtime_provider: RuntimeProvider,
        company_id: str = "default",
        sleep: Any = time.sleep,
    ):
        self.store = store
        self.db_path = os.fspath(db_path) if db_path else None
        self.env = env if env is not None else os.environ
        self.runtime_provider = runtime_provider
        self.company_id = str(company_id)
        self._sleep = sleep

    def snapshot(self) -> dict[str, Any]:
        files = self.store.list_files(origin_zone="internal")
        return {
            "file_count": len(files),
            "files": [
                {
                    "file_hash": item.file_hash,
                    "original_name": item.original_name,
                    "format": _format_from_name(item.original_name),
                    "size_bytes": item.size_bytes,
                    "uploaded_at": item.uploaded_at,
                }
                for item in files[:100]
            ],
            "parse_summary": self._parse_summary(),
            "parsed_evidence": self._parsed_evidence(),
        }

    def _parse_summary(self) -> dict[str, int]:
        """Expose parser status; detailed evidence is bounded separately."""
        if not self.db_path:
            return {"parsed_files": 0, "pending_parse_records": 0}
        with sqlite3.connect(self.db_path) as conn:
            exists = conn.execute(
                "SELECT 1 FROM sqlite_master WHERE type='table' AND name='parse_staging'"
            ).fetchone()
            if not exists:
                return {"parsed_files": 0, "pending_parse_records": 0}
            row = conn.execute(
                "SELECT COUNT(DISTINCT file_hash), COUNT(*) FROM parse_staging"
            ).fetchone()
        return {"parsed_files": row[0], "pending_parse_records": row[1]}

    def _parsed_evidence(self, *, max_items: int = 40, max_chars: int = 12000) -> list[dict[str, Any]]:
        """Return content-derived snippets and L2 pointers, never raw blobs."""
        if not self.db_path:
            return []
        try:
            with sqlite3.connect(self.db_path) as conn:
                rows = conn.execute(
                    "SELECT payload FROM parse_staging ORDER BY id DESC LIMIT ?",
                    (max_items,),
                ).fetchall()
        except sqlite3.Error:
            return []
        evidence: list[dict[str, Any]] = []
        used = 0
        for (raw,) in rows:
            try:
                payload = json.loads(raw)
            except (TypeError, json.JSONDecodeError):
                continue
            if not isinstance(payload, dict):
                continue
            source_id = str(payload.get("source_id") or payload.get("file_hash") or "unknown")
            item: dict[str, Any] = {
                "source_id": source_id,
                "file_hash": payload.get("file_hash"),
                "filename": payload.get("filename") or payload.get("original_name"),
                "format": payload.get("format"),
                "evidence_uri": (
                    "viking://user/default/memories/projects/10_startup_ai_manager/"
                    f"2a_extraction/{self.company_id}/{source_id}/L2/manifest.json"
                ),
                "parse_summary": payload.get("parse_summary", {}),
            }
            pages: list[dict[str, Any]] = []
            for page in payload.get("pages", [])[:4]:
                if not isinstance(page, dict):
                    continue
                compact: dict[str, Any] = {"page_no": page.get("page_no", page.get("page"))}
                text = page.get("text")
                if isinstance(text, str) and text.strip():
                    compact["text"] = text[:600]
                tables = page.get("tables")
                if isinstance(tables, list):
                    compact["tables"] = tables[:2]
                if len(compact) > 1:
                    pages.append(compact)
            if pages:
                item["pages"] = pages
            candidates = payload.get("candidate_facts")
            if isinstance(candidates, (dict, list)):
                item["candidate_facts"] = candidates
            encoded = json.dumps(item, ensure_ascii=False, sort_keys=True)
            if len(encoded) > max_chars - used:
                # Keep the pointer and a short content sample rather than
                # allowing one unusually large parser result to exceed the
                # complete evidence budget.
                item.pop("candidate_facts", None)
                item["pages"] = [
                    {"page_no": page.get("page_no"), "text": page.get("text", "")[:240]}
                    for page in pages[:2]
                ]
                encoded = json.dumps(item, ensure_ascii=False, sort_keys=True)
            if used + len(encoded) > max_chars:
                break
            evidence.append(item)
            used += len(encoded)
        return evidence

    def generate(self, *, event: str, uploaded_file_hash: str | None = None) -> dict[str, Any]:
        snapshot = self.snapshot()
        payload = {
            "event": event,
            "uploaded_file_hash": uploaded_file_hash,
            "evidence_snapshot": snapshot,
        }
        result = self._call_model(payload)
        return _validate_guide(result)

    def _call_model(self, payload: dict[str, Any]) -> dict[str, Any]:
        evidence = json.dumps(payload["evidence_snapshot"], ensure_ascii=False, sort_keys=True)
        context = (
            SYSTEM_PROMPT
            + "\n\n这是当前公司已解析证据快照（不是文件名推断）：\n"
            + evidence
            + "\n请先按需调用 sam_memory_map/sam_memory_search/sam_memory_read 读取证据 URI，"
              "再仅返回上述 JSON。不要调用 sam_promote。"
        )
        attempts = max(1, int(self.env.get("SAM_GUIDE_RETRIES", "3")))
        backoff = max(0.0, float(self.env.get("SAM_GUIDE_RETRY_BACKOFF", "0.25")))
        last_error: ModelUnavailable | None = None
        for attempt in range(attempts):
            try:
                raw = self.runtime_provider.run_agent_message(
                    "根据已解析资料生成本轮导入指引。只输出要求的 JSON。",
                    context_text=context,
                    company_id=self.company_id,
                    thread_id="import-guide",
                    allow_promote=False,
                    timeout=int(self.env.get("SAM_GUIDE_TIMEOUT", "90")),
                )
                return _validate_guide(_decode_agent_json(raw))
            except Exception as exc:
                last_error = _guide_error(exc)
                if last_error.reason in {"auth", "invalid_request"} or attempt + 1 >= attempts:
                    raise last_error from exc
                self._sleep(backoff * (2 ** attempt))
        raise last_error or ModelUnavailable("AI import guide unavailable")


class _GuideError(ModelUnavailable):
    def __init__(self, message: str, *, reason: str):
        super().__init__(message)
        self.reason = reason


def _guide_error(exc: Exception) -> _GuideError:
    text = str(exc).lower()
    if isinstance(exc, json.JSONDecodeError) or "invalid json" in text or "non-object" in text or "missing required" in text or "invalid completeness" in text:
        return _GuideError("AI import guide returned invalid JSON", reason="invalid_json")
    if isinstance(exc, (TimeoutError, subprocess.TimeoutExpired)) or "timeout" in text or "timed out" in text:
        return _GuideError("AI import guide timed out", reason="timeout")
    if "401" in text or "403" in text or "unauthor" in text or "forbidden" in text or "api key" in text:
        return _GuideError("AI import guide authentication failed", reason="auth")
    if "429" in text or "rate" in text or "limit" in text:
        return _GuideError("AI import guide rate limited", reason="rate_limited")
    return _GuideError("AI import guide unavailable", reason="unavailable")


def _decode_agent_json(raw: str) -> dict[str, Any]:
    if not isinstance(raw, str):
        raise _GuideError("AI import guide returned invalid JSON", reason="invalid_json")
    candidates = [raw]
    try:
        envelope = json.loads(raw)
    except json.JSONDecodeError:
        envelope = None
    if isinstance(envelope, dict):
        if "message" in envelope and "completeness" in envelope:
            return envelope
        meta = envelope.get("meta") or {}
        if isinstance(meta.get("finalAssistantVisibleText"), str):
            candidates.append(meta["finalAssistantVisibleText"])
        for payload in envelope.get("payloads", []):
            if isinstance(payload, dict) and isinstance(payload.get("text"), str):
                candidates.append(payload["text"])
    for candidate in candidates:
        text = re.sub(r"^```(?:json)?\s*|\s*```$", "", candidate.strip(), flags=re.I)
        try:
            value = json.loads(text)
        except json.JSONDecodeError:
            decoder = json.JSONDecoder()
            for match in re.finditer(r"\{", text):
                try:
                    value, _ = decoder.raw_decode(text[match.start():])
                    break
                except json.JSONDecodeError:
                    continue
            else:
                continue
        if isinstance(value, dict) and {"message", "next_action", "completeness"}.issubset(value):
            return value
    raise _GuideError("AI import guide returned invalid JSON", reason="invalid_json")


def _format_from_name(name: str) -> str:
    suffix = name.rsplit(".", 1)[-1].lower() if "." in name else "unknown"
    return {"xlsx": "excel", "xls": "excel", "xlsm": "excel"}.get(suffix, suffix)


def _validate_guide(value: Any) -> dict[str, Any]:
    if not isinstance(value, dict):
        raise ModelUnavailable("AI import guide returned a non-object response")
    message = value.get("message")
    next_action = value.get("next_action")
    completeness = value.get("completeness")
    if not isinstance(message, str) or not isinstance(next_action, str) or not isinstance(completeness, dict):
        raise ModelUnavailable("AI import guide response is missing required fields")
    percent = completeness.get("percent")
    received = completeness.get("received")
    missing = completeness.get("missing")
    if isinstance(percent, bool) or not isinstance(percent, int) or not 0 <= percent <= 100:
        raise ModelUnavailable("AI import guide returned an invalid completeness percent")
    if not isinstance(received, list) or not all(isinstance(item, str) for item in received):
        raise ModelUnavailable("AI import guide returned invalid received items")
    if not isinstance(missing, list) or not all(isinstance(item, str) for item in missing):
        raise ModelUnavailable("AI import guide returned invalid missing items")
    return {
        "message": message,
        "next_action": next_action,
        "completeness": {"percent": percent, "received": received, "missing": missing},
    }
