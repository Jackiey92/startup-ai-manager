"""Server-side import guidance.

The browser deliberately contains no import order or business methodology.
This module owns the eight-module method and asks a configured model to turn
the current evidence snapshot into a concise, company-specific next action.
"""
from __future__ import annotations

import os
import sqlite3
from typing import Any

from app.ports import ModelProvider, ModelUnavailable
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
    """Build evidence snapshots and obtain a real guide from an OpenAI-compatible API."""

    def __init__(
        self,
        *,
        store: SourceFileStore,
        db_path: str | os.PathLike[str] | None = None,
        env: dict[str, str] | None = None,
        model_provider: ModelProvider,
    ):
        self.store = store
        self.db_path = os.fspath(db_path) if db_path else None
        self.env = env if env is not None else os.environ
        self.model_provider = model_provider

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
        }

    def _parse_summary(self) -> dict[str, int]:
        """Expose parser evidence to the model without copying document text."""
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
        return self.model_provider.complete_json(system_prompt=SYSTEM_PROMPT, payload=payload)


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
