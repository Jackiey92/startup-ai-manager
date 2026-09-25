"""Small capability seams for replaceable runtime, model, and memory backends.

The product layer depends on these protocols rather than on OpenClaw, a model
vendor, or OpenViking.  Concrete implementations may be local, remote, or
test doubles without changing the business code.
"""
from __future__ import annotations

from pathlib import Path
import json
from typing import Any, Protocol


class RuntimeProvider(Protocol):
    def supports(self, format: str) -> bool:
        """Whether a configured ingest skill handles this format."""

    def run_parse(self, file_hash: str, format: str, timeout: int = 600) -> int:
        """Run the configured parser and return a staging record id."""

    def run_agent_message(self, message: str, *, timeout: int = 600) -> str:
        """Run one agent turn and return its serialized result."""


class ModelProvider(Protocol):
    def complete_json(self, *, system_prompt: str, payload: dict[str, Any]) -> dict[str, Any]:
        """Return a JSON object from a configured model endpoint."""


class ModelUnavailable(RuntimeError):
    """The configured model provider could not return a valid response."""


class MemoryProvider(Protocol):
    def put(self, uri: str, content: str, *, metadata: dict[str, Any] | None = None) -> None:
        """Persist a memory document at a provider-specific URI."""

    def read(self, uri: str) -> str:
        """Read one memory document."""

    def query(self, *, prefix: str, query: str | None = None) -> list[dict[str, Any]]:
        """Query memory without exposing provider-specific internals."""

    def search(self, query: str, *, prefix: str = "viking://") -> list[dict[str, Any]]:
        """Search L0/L1/L2 memory through a provider-neutral operation."""

    def put_fact(self, company_id: str, fact_key: str, fact: dict[str, Any]) -> None:
        """Write a verified 2b fact under a company-scoped key."""

    def get_fact(self, company_id: str, fact_key: str) -> dict[str, Any] | None:
        """Read one 2b fact by deterministic company/key address."""

    def get_2b(self, company_id: str, key: str) -> dict[str, Any] | None:
        """Read one verified 2b value; pending/conflicting data is excluded."""


class LocalMemoryProvider:
    """Minimal filesystem reference implementation for local development.

    It deliberately does not pretend to be an OpenViking client.  A future OV
    adapter can implement the same protocol and be selected by configuration.
    """

    def __init__(self, root: str | Path):
        self.root = Path(root)

    def _path(self, uri: str) -> Path:
        relative = uri.removeprefix("viking://").lstrip("/")
        path = (self.root / relative).resolve()
        if self.root.resolve() not in path.parents and path != self.root.resolve():
            raise ValueError("memory URI escapes local memory root")
        return path

    def put(self, uri: str, content: str, *, metadata: dict[str, Any] | None = None) -> None:
        path = self._path(uri)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")

    def read(self, uri: str) -> str:
        return self._path(uri).read_text(encoding="utf-8")

    def query(self, *, prefix: str, query: str | None = None) -> list[dict[str, Any]]:
        root = self._path(prefix)
        if not root.exists():
            return []
        results: list[dict[str, Any]] = []
        for path in root.rglob("*"):
            if path.is_file():
                text = path.read_text(encoding="utf-8", errors="replace")
                if query is None or query.lower() in text.lower():
                    results.append({"uri": "viking://" + str(path.relative_to(self.root)), "content": text})
        return results

    def put_fact(self, company_id: str, fact_key: str, fact: dict[str, Any]) -> None:
        if fact.get("status") != "verified":
            raise ValueError("only verified facts may enter the 2b memory provider")
        self.put(
            f"viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/{company_id}/{fact_key}.json",
            json.dumps(fact, ensure_ascii=False, sort_keys=True),
            metadata={"layer": "2b", "company_id": company_id, "fact_key": fact_key},
        )

    def get_fact(self, company_id: str, fact_key: str) -> dict[str, Any] | None:
        uri = f"viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/{company_id}/{fact_key}.json"
        try:
            return json.loads(self.read(uri))
        except FileNotFoundError:
            return None

    def search(self, query: str, *, prefix: str = "viking://") -> list[dict[str, Any]]:
        return self.query(prefix=prefix, query=query)

    def get_2b(self, company_id: str, key: str) -> dict[str, Any] | None:
        return self.get_fact(company_id, key)


class MemoryUnavailable(RuntimeError):
    """Raised by an OV adapter when its configured endpoint is unavailable."""


class OpenVikingMemoryProvider:
    """Explicit OV seam; transport is intentionally supplied by a later adapter.

    Keeping this class inert prevents accidental network calls while preserving
    a stable provider shape for the real OpenViking client.  The endpoint and
    key are configuration facts, never hard-coded in application code.
    """

    def __init__(self, *, base_url: str | None = None, api_key: str | None = None):
        self.base_url = base_url
        self.api_key = api_key

    def _unavailable(self) -> None:
        raise MemoryUnavailable("OpenViking transport adapter is not installed")

    def put(self, uri: str, content: str, *, metadata: dict[str, Any] | None = None) -> None:
        self._unavailable()

    def read(self, uri: str) -> str:
        self._unavailable()
        return ""

    def query(self, *, prefix: str, query: str | None = None) -> list[dict[str, Any]]:
        self._unavailable()
        return []

    def search(self, query: str, *, prefix: str = "viking://") -> list[dict[str, Any]]:
        self._unavailable()
        return []

    def put_fact(self, company_id: str, fact_key: str, fact: dict[str, Any]) -> None:
        self._unavailable()

    def get_fact(self, company_id: str, fact_key: str) -> dict[str, Any] | None:
        self._unavailable()
        return None

    def get_2b(self, company_id: str, key: str) -> dict[str, Any] | None:
        self._unavailable()
        return None
