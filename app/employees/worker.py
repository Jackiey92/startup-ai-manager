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
                 runner: Callable[..., Any] | None = None, timeout: int = 120,
                 retries: int = 1):
        self.config = config or RuntimeConfig.from_env()
        self.runtime = runtime
        self.runner = runner
        self.timeout = max(1, int(timeout))
        # A malformed transport envelope is occasionally produced by the
        # gateway. Retry the unchanged request once, but keep this bounded so
        # malformed output cannot turn into an unbounded business retry loop.
        self.retries = max(0, min(2, int(retries)))

    def _skill(self, skill: str) -> str:
        path = self.config.skill_root / skill / "SKILL.md"
        try:
            return path.read_text(encoding="utf-8")
        except OSError as exc:
            raise WorkerUnavailable("employee skill unavailable") from exc

    @staticmethod
    def _strip_json_fence(raw: str) -> str:
        """Remove one outer Markdown JSON fence without changing payload data."""
        lines = raw.strip().splitlines()
        if len(lines) < 3:
            return raw.strip()
        opening = lines[0].strip().lower()
        if opening not in {"```", "```json"} or lines[-1].strip() != "```":
            return raw.strip()
        return "\n".join(lines[1:-1]).strip()

    @staticmethod
    def _payload(raw: Any) -> list[dict[str, Any]]:
        try:
            if isinstance(raw, str):
                raw = json.loads(EmployeeRunner._strip_json_fence(raw))
        except (TypeError, json.JSONDecodeError) as exc:
            raise WorkerUnavailable("employee returned invalid JSON") from exc
        if isinstance(raw, dict) and ("candidates" in raw or "items" in raw):
            raw = raw.get("candidates", raw.get("items"))
        elif isinstance(raw, dict):
            result = raw.get("result")
            payloads = result.get("payloads") if isinstance(result, dict) else None
            if not isinstance(payloads, list) or not payloads:
                raise WorkerUnavailable("employee returned invalid OpenClaw envelope")
            candidates: list[dict[str, Any]] = []
            for payload in payloads:
                if not isinstance(payload, dict) or not isinstance(payload.get("text"), str):
                    raise WorkerUnavailable("employee returned invalid OpenClaw payload")
                candidates.extend(EmployeeRunner._payload(payload["text"]))
            return candidates
        if not isinstance(raw, list) or not all(isinstance(item, dict) for item in raw):
            raise WorkerUnavailable("employee returned invalid candidates")
        return raw

    def run(self, *, skill: str, text: str, company_id: str, thread_id: str | None = None) -> list[dict[str, Any]]:
        if not company_id:
            raise ValueError("company_id must be injected by the host")
        scope = {"company_id": company_id, "thread_id": thread_id}
        skill_text = self._skill(skill)
        for attempt in range(self.retries + 1):
            if self.runner is not None:
                raw = self.runner(skill=skill, skill_text=skill_text, text=text, scope=scope,
                                  timeout=self.timeout)
            else:
                if self.runtime is None:
                    self.runtime = runtime_provider(self.config, StagingStore(self.config.main_db))
                runtime = self.runtime
                prompt = "Load the supplied employee skill and return only its required JSON candidates/items payload."
                raw = runtime.run_agent_message(
                    prompt, context_text=skill_text + "\n\nBLOCK:\n" + text,
                    company_id=company_id, thread_id=thread_id, timeout=self.timeout,
                )
            try:
                return self._payload(raw)
            except WorkerUnavailable:
                if attempt >= self.retries:
                    raise
        # The loop either returns or re-raises the last payload error.
        raise WorkerUnavailable("employee returned invalid JSON")
