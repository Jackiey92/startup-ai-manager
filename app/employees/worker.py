"""Bounded, scope-aware generic employee runtime seam for 2B R1."""
from __future__ import annotations

import json
import re
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
        raw = raw.strip()
        lines = raw.splitlines()
        if len(lines) < 3:
            return raw
        opening = lines[0].strip().lower()
        if opening in {"```", "```json"} and lines[-1].strip() == "```":
            return "\n".join(lines[1:-1]).strip()
        # Some gateway/model adapters add a short textual preface around the
        # otherwise valid fenced response. Only accept one complete JSON fence;
        # arbitrary prose is never treated as a candidate payload.
        match = re.fullmatch(r"(?is).*?```(?:json)?\s*(.*?)\s*```.*", raw)
        if match:
            return match.group(1).strip()
        return raw

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
            # OpenClaw CLI versions have emitted the same payload under
            # result.payloads and top-level payloads. Content/text/data are
            # accepted only as transport wrappers; business candidate objects
            # still must arrive through candidates/items.
            for key in ("result", "payloads", "content", "text", "payload", "data"):
                if key not in raw or raw[key] in (None, ""):
                    continue
                if key == "payloads":
                    payloads = raw[key]
                    if not isinstance(payloads, list) or not payloads:
                        raise WorkerUnavailable("employee returned invalid OpenClaw payloads")
                    candidates: list[dict[str, Any]] = []
                    for payload in payloads:
                        if not isinstance(payload, dict):
                            raise WorkerUnavailable("employee returned invalid OpenClaw payload")
                        value = next(
                            (payload[name] for name in ("text", "content", "payload", "data")
                             if name in payload and payload[name] not in (None, "")),
                            None,
                        )
                        if value is None:
                            raise WorkerUnavailable("employee returned invalid OpenClaw payload")
                        candidates.extend(EmployeeRunner._payload(value))
                    return candidates
                try:
                    return EmployeeRunner._payload(raw[key])
                except WorkerUnavailable:
                    continue
            raise WorkerUnavailable("employee returned invalid OpenClaw envelope")
        if isinstance(raw, list):
            if not raw:
                return []
            text_blocks = (
                all(isinstance(item, dict) and isinstance(item.get("text"), str) for item in raw)
                and all(
                    set(item).issubset({"text", "type", "annotations", "_meta"})
                    for item in raw
                )
            )
            if text_blocks:
                candidates: list[dict[str, Any]] = []
                for payload in raw:
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
