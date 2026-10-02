"""Bounded, scope-aware generic employee runtime seam for 2B R1."""
from __future__ import annotations

import json
from typing import Any, Callable

from ..runtime_config import RuntimeConfig
from ..providers import runtime_provider
from ..harness.staging import StagingStore


class WorkerUnavailable(RuntimeError):
    """Employee execution failed or returned an unusable candidate payload."""


class EmployeeRunner:
    def __init__(self, *, config: RuntimeConfig | None = None, runtime=None,
                 runner: Callable[..., Any] | None = None, timeout: int = 120):
        self.config = config or RuntimeConfig.from_env()
        self.runtime = runtime
        self.runner = runner
        self.timeout = max(1, int(timeout))

    def _skill(self, skill: str) -> str:
        path = self.config.skill_root / skill / "SKILL.md"
        try:
            return path.read_text(encoding="utf-8")
        except OSError as exc:
            raise WorkerUnavailable("employee skill unavailable") from exc

    @staticmethod
    def _payload(raw: Any) -> list[dict[str, Any]]:
        if isinstance(raw, str):
            raw = json.loads(raw)
        if isinstance(raw, dict):
            raw = raw.get("candidates", raw.get("items"))
        if not isinstance(raw, list) or not all(isinstance(item, dict) for item in raw):
            raise WorkerUnavailable("employee returned invalid candidates")
        return raw

    def run(self, *, skill: str, text: str, company_id: str, thread_id: str | None = None) -> list[dict[str, Any]]:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        scope = {"company_id": company_id, "thread_id": thread_id}
        skill_text = self._skill(skill)
        if self.runner is not None:
            raw = self.runner(skill=skill, skill_text=skill_text, text=text, scope=scope,
                              timeout=self.timeout)
        else:
            runtime = self.runtime or runtime_provider(self.config, StagingStore(self.config.main_db))
            prompt = (
                "Load the supplied employee skill and return JSON only as "
                '{"candidates":[{"metric":"...","value":"...","unit":null,'
                '"entity":"...","period":"unspecified","source_span":"...",'
                '"source_page":null,"quote":"..."}]}.'
            )
            raw = runtime.run_agent_message(
                prompt, context_text=skill_text + "\n\nBLOCK:\n" + text,
                company_id=company_id, thread_id=thread_id, timeout=self.timeout,
            )
        return self._payload(raw)
