"""Scoped JSON-RPC bridge used by the SAM OpenClaw plugin.

The process is intentionally boring: OpenClaw owns tool registration and this
module owns only the capability boundary.  A request never gets to choose its
company or session scope; those values come from the environment injected by
the plugin/runtime.
"""
from __future__ import annotations

import json
import os
import sys
from typing import Any, Callable, TextIO

from .memory_map import MemoryMapTools
from .ports import MemoryUnavailable
from .providers import memory_provider
from .runtime_config import RuntimeConfig
from .storage.source_store import SourceFileStore
from .thread_manager import ConversationTools


ERROR_CODES = {"not_found", "denied", "unavailable", "bad_request"}
_SCOPE_KEYS = {"company_id", "thread_id"}


class ToolBridge:
    """Dispatch the seven SAM tools while enforcing one injected scope."""

    def __init__(
        self,
        memory: Any,
        files: Any,
        *,
        company_id: str,
        thread_id: str,
        promote_allowed: bool = False,
        map_tools_factory: Callable[..., MemoryMapTools] = MemoryMapTools,
        conversation_tools_factory: Callable[..., ConversationTools] = ConversationTools,
    ) -> None:
        self.company_id = str(company_id)
        self.thread_id = str(thread_id)
        if not self.company_id or not self.thread_id:
            raise ValueError("tool scope is required")
        self.memory = memory
        self.files = files
        self.promote_allowed = bool(promote_allowed)
        self.map_tools = map_tools_factory(memory, files, self.company_id)
        self.conversation_tools = conversation_tools_factory(memory, self.company_id, self.thread_id)

    def dispatch(self, method: str, params: dict[str, Any] | None = None) -> Any:
        if not isinstance(method, str) or not method.startswith("sam_"):
            raise BadRequest("unknown tool")
        params = {} if params is None else params
        if not isinstance(params, dict):
            raise BadRequest("tool parameters must be an object")
        # Scope is an execution property, never an LLM-controlled argument.
        if _SCOPE_KEYS.intersection(params):
            raise BadRequest("scope arguments are not accepted")

        if method == "sam_memory_read":
            return self.map_tools.memory_read(self._string(params, "uri"))
        if method == "sam_memory_search":
            return self.map_tools.memory_search(self._string(params, "query"))
        if method == "sam_file_get":
            return self.map_tools.file_get(self._string(params, "file_hash"))
        if method == "sam_conversation_read":
            return self.conversation_tools.conversation_read(
                start=self._optional_string(params, "start"),
                end=self._optional_string(params, "end"),
            )
        if method == "sam_thread_list":
            self._no_extra(params)
            return self.conversation_tools.thread_list()
        if method == "sam_thread_open":
            # The current thread is injected.  This avoids turning the tool
            # into a cross-thread browser; list is the only discovery surface.
            self._no_extra(params)
            return self.conversation_tools.thread_open(self.thread_id)
        if method == "sam_promote":
            if not self.promote_allowed:
                raise PermissionError("promotion is disabled")
            fact_key = self._string(params, "fact_key")
            fact = params.get("fact")
            if not isinstance(fact, dict):
                raise BadRequest("fact must be an object")
            self.conversation_tools.promote(self.thread_id, fact_key=fact_key, fact=fact)
            return {"accepted": True, "fact_key": fact_key}
        raise BadRequest("unknown tool")

    @staticmethod
    def _string(params: dict[str, Any], name: str) -> str:
        value = params.get(name)
        if not isinstance(value, str) or not value.strip():
            raise BadRequest(f"{name} is required")
        return value

    @staticmethod
    def _optional_string(params: dict[str, Any], name: str) -> str | None:
        value = params.get(name)
        if value is None:
            return None
        if not isinstance(value, str):
            raise BadRequest(f"{name} must be a string")
        return value

    @staticmethod
    def _no_extra(params: dict[str, Any]) -> None:
        if params:
            raise BadRequest("unexpected tool arguments")


class BadRequest(ValueError):
    pass


def _error(exc: BaseException) -> dict[str, str]:
    if isinstance(exc, (BadRequest, ValueError, TypeError, json.JSONDecodeError)):
        code = "bad_request"
    elif isinstance(exc, PermissionError):
        code = "denied"
    elif isinstance(exc, (FileNotFoundError, KeyError)):
        code = "not_found"
    elif isinstance(exc, (MemoryUnavailable, RuntimeError, OSError)):
        code = "unavailable"
    else:
        code = "unavailable"
    return {"code": code, "message": code.replace("_", " ")}


def handle_request(bridge: ToolBridge, request: Any) -> dict[str, Any]:
    """Turn one JSON value into a redacted JSON-RPC response."""
    request_id = request.get("id") if isinstance(request, dict) else None
    try:
        if not isinstance(request, dict):
            raise BadRequest("request must be an object")
        result = bridge.dispatch(request.get("method"), request.get("params"))
        return {"id": request_id, "ok": True, "result": result}
    except BaseException as exc:  # protocol boundary: never leak a traceback
        return {"id": request_id, "ok": False, "error": _error(exc)}


def serve(bridge: ToolBridge, stdin: TextIO = sys.stdin, stdout: TextIO = sys.stdout) -> None:
    for line in stdin:
        if not line.strip():
            continue
        try:
            request = json.loads(line)
        except json.JSONDecodeError:
            response = {"id": None, "ok": False, "error": {"code": "bad_request", "message": "bad request"}}
        else:
            response = handle_request(bridge, request)
        stdout.write(json.dumps(response, ensure_ascii=False, separators=(",", ":")) + "\n")
        stdout.flush()


def from_environment() -> ToolBridge:
    config = RuntimeConfig.from_env()
    memory = memory_provider(config)
    files = SourceFileStore(objects_path=config.objects_dir, db_path=config.main_db)
    company = os.environ.get("SAM_COMPANY_ID", "default")
    thread = os.environ.get("SAM_THREAD_ID")
    if not thread:
        raise ValueError("SAM_THREAD_ID is required")
    return ToolBridge(
        memory,
        files,
        company_id=company,
        thread_id=thread,
        promote_allowed=os.environ.get("SAM_ALLOW_PROMOTE", "0").lower() in {"1", "true", "yes"},
    )


if __name__ == "__main__":  # pragma: no cover - exercised by the Node shell
    try:
        serve(from_environment())
    except BaseException as exc:
        # Startup failures are still a protocol response and never include
        # endpoint/key details from provider construction.
        print(json.dumps({"id": None, "ok": False, "error": _error(exc)}, separators=(",", ":")), flush=True)
