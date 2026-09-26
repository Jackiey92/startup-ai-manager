"""Small capability seams for replaceable runtime, model, and memory backends.

The product layer depends on these protocols rather than on OpenClaw, a model
vendor, or OpenViking.  Concrete implementations may be local, remote, or
test doubles without changing the business code.
"""
from __future__ import annotations

from pathlib import Path
import json
import os
import subprocess
import tempfile
import shutil
from collections.abc import Callable, Sequence
from typing import Any, Protocol


class RuntimeProvider(Protocol):
    def supports(self, format: str) -> bool:
        """Whether a configured ingest skill handles this format."""

    def run_parse(self, file_hash: str, format: str, timeout: int = 600) -> int:
        """Run the configured parser and return a staging record id."""

    def run_agent_message(self, message: str, *, context_text: str | None = None, timeout: int = 600) -> str:
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

    def delete(self, uri: str, *, recursive: bool = False) -> None:
        """Delete an explicitly scoped runtime-memory resource."""

    def list_facts(self, company_id: str, *, fact_keys: Sequence[str] = ()) -> list[dict[str, Any]]:
        """List verified 2b facts for one company."""


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

    def delete(self, uri: str, *, recursive: bool = False) -> None:
        path = self._path(uri)
        if path.is_dir():
            if not recursive:
                raise ValueError("refusing to delete a directory without recursive=True")
            shutil.rmtree(path)
        elif path.exists():
            path.unlink()

    def list_facts(self, company_id: str, *, fact_keys: Sequence[str] = ()) -> list[dict[str, Any]]:
        prefix = f"viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/{company_id}"
        facts = []
        seen: set[str] = set()
        for key in fact_keys:
            try:
                fact = self.get_fact(company_id, str(key))
            except Exception:
                fact = None
            if isinstance(fact, dict) and fact.get("status") == "verified":
                fact.setdefault("fact_key", str(key))
                fact.setdefault("uri", f"{prefix}/{key}.json")
                facts.append(fact)
                seen.add(str(key))
        for item in self.query(prefix=prefix):
            uri = item.get("uri", "")
            if not uri.endswith(".json"):
                continue
            try:
                fact = json.loads(item.get("content", ""))
            except (TypeError, json.JSONDecodeError):
                continue
            if isinstance(fact, dict) and fact.get("status") == "verified":
                fact.setdefault("fact_key", uri.rsplit("/", 1)[-1][:-5])
                fact.setdefault("uri", uri)
                if fact["fact_key"] not in seen:
                    facts.append(fact)
                    seen.add(fact["fact_key"])
        return sorted(facts, key=lambda value: str(value.get("fact_key", "")))


class MemoryUnavailable(RuntimeError):
    """Raised by an OV adapter when its configured endpoint is unavailable."""


class OpenVikingMemoryProvider:
    """Thin adapter over the official ``ov`` client.

    The OpenViking CLI is the supported transport boundary here.  It owns the
    HTTP API details and its normal config discovery, while this class exposes
    only the provider contract to SAM.  Optional endpoint/key overrides are
    injected as environment variables; values are never logged or embedded in
    the repository.  Tests can inject ``runner`` without making network calls.
    """

    def __init__(
        self,
        *,
        base_url: str | None = None,
        api_key: str | None = None,
        ov_bin: str = "ov",
        runner: Callable[..., subprocess.CompletedProcess[str]] | None = None,
    ):
        self.base_url = base_url
        self.api_key = api_key
        self.ov_bin = ov_bin
        self._runner = runner or subprocess.run
        self._known_fact_keys: dict[str, set[str]] = {}

    def _env(self) -> dict[str, str]:
        env = os.environ.copy()
        if self.base_url:
            # These are the names supported by current OV CLI releases.  The
            # CLI config remains the fallback when no override is injected.
            env["OPENVIKING_URL"] = self.base_url
            env["VIKINGBOT_ENDPOINT"] = self.base_url
        if self.api_key:
            env["OPENVIKING_API_KEY"] = self.api_key
            env["VIKINGBOT_API_KEY"] = self.api_key
        return env

    @staticmethod
    def _safe_error(text: str) -> str:
        # Never echo an accidental credential-like value from a CLI error.
        for marker in ("api_key=", "api-key=", "Authorization:", "Bearer "):
            if marker in text:
                text = text.split(marker, 1)[0] + marker + "<redacted>"
        return text[-1000:]

    def _run(self, args: Sequence[str]) -> Any:
        command = [self.ov_bin, *args, "-o", "json", "-c", "true"]
        try:
            completed = self._runner(
                command,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                env=self._env(),
                check=False,
            )
        except (OSError, subprocess.SubprocessError) as exc:
            raise MemoryUnavailable(f"OpenViking client unavailable: {exc}") from exc
        if completed.returncode != 0:
            detail = self._safe_error((completed.stderr or completed.stdout or "").strip())
            raise MemoryUnavailable(f"OpenViking request failed: {detail or 'unknown error'}")
        raw = (completed.stdout or "").strip()
        if not raw:
            return None
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return raw

    @staticmethod
    def _items(payload: Any) -> list[dict[str, Any]]:
        if isinstance(payload, list):
            return [item for item in payload if isinstance(item, dict)]
        if isinstance(payload, dict):
            for key in ("results", "items", "nodes", "data"):
                value = payload.get(key)
                if isinstance(value, list):
                    return [item for item in value if isinstance(item, dict)]
        return []

    def put(self, uri: str, content: str, *, metadata: dict[str, Any] | None = None) -> None:
        tags = None
        if metadata:
            tags = ",".join(f"{key}={value}" for key, value in metadata.items())
        with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".md") as handle:
            handle.write(content)
            handle.flush()
            args = ["write", uri, "--from-file", handle.name, "--wait", "--processing-mode", "semantic_and_vectors"]
            if tags:
                args.extend(["--tags", tags])
            self._run(args)

    def read(self, uri: str) -> str:
        payload = self._run(["read", uri])
        if isinstance(payload, str):
            return payload
        if isinstance(payload, dict):
            # Current CLI compact output wraps the file body in {"ok":true,
            # "result": "<content>"}; older/other shapes use content/text/data.
            for key in ("result", "content", "text", "data"):
                if isinstance(payload.get(key), str):
                    return payload[key]
        raise MemoryUnavailable(f"OpenViking read returned no content for {uri}")

    def query(self, *, prefix: str, query: str | None = None) -> list[dict[str, Any]]:
        if query:
            return self._items(self._run(["find", query, "--uri", prefix, "--read-content"]))
        return self._items(self._run(["ls", prefix, "--recursive"]))

    def search(self, query: str, *, prefix: str = "viking://") -> list[dict[str, Any]]:
        return self._items(self._run(["find", query, "--uri", prefix, "--read-content"]))

    def put_fact(self, company_id: str, fact_key: str, fact: dict[str, Any]) -> None:
        if fact.get("status") != "verified":
            raise ValueError("only verified facts may enter the 2b memory provider")
        self.put(
            f"viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/{company_id}/{fact_key}.json",
            json.dumps(fact, ensure_ascii=False, sort_keys=True),
            metadata={"layer": "2b", "company_id": company_id, "fact_key": fact_key},
        )
        self._known_fact_keys.setdefault(company_id, set()).add(fact_key)

    def get_fact(self, company_id: str, fact_key: str) -> dict[str, Any] | None:
        uri = f"viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/{company_id}/{fact_key}.json"
        try:
            return json.loads(self.read(uri))
        except (FileNotFoundError, MemoryUnavailable) as exc:
            if isinstance(exc, MemoryUnavailable) and "not found" not in str(exc).lower():
                raise
            return None

    def get_2b(self, company_id: str, key: str) -> dict[str, Any] | None:
        return self.get_fact(company_id, key)

    def delete(self, uri: str, *, recursive: bool = False) -> None:
        args = ["rm", uri]
        if recursive:
            args.append("--recursive")
        self._run(args)

    def reindex(self, uri: str, *, recursive: bool = True) -> None:
        self._run(["reindex", uri, "--mode", "semantic_and_vectors", "--wait", "true", "--recursive", str(recursive).lower()])

    def list_facts(self, company_id: str, *, fact_keys: Sequence[str] = ()) -> list[dict[str, Any]]:
        prefix = f"viking://user/default/memories/projects/10_startup_ai_manager/2b_facts/{company_id}"
        facts: list[dict[str, Any]] = []
        keys = list(dict.fromkeys([*self._known_fact_keys.get(company_id, set()), *map(str, fact_keys)]))
        seen: set[str] = set()
        for key in keys:
            try:
                fact = json.loads(self.read(f"{prefix}/{key}.json"))
            except (MemoryUnavailable, json.JSONDecodeError, TypeError):
                fact = None
            if isinstance(fact, dict) and fact.get("status") == "verified":
                fact.setdefault("fact_key", key)
                fact.setdefault("uri", f"{prefix}/{key}.json")
                facts.append(fact)
                seen.add(key)
        for item in self._items(self._run(["ls", prefix, "--recursive"])):
            uri = item.get("uri") or item.get("path")
            if not isinstance(uri, str) or not uri.endswith(".json"):
                continue
            try:
                fact = json.loads(self.read(uri))
            except (MemoryUnavailable, json.JSONDecodeError, TypeError):
                # A broken individual fact must not turn a company map into a
                # fabricated result.  The caller can mark the map degraded.
                continue
            if isinstance(fact, dict) and fact.get("status") == "verified":
                fact.setdefault("fact_key", uri.rsplit("/", 1)[-1][:-5])
                fact.setdefault("uri", uri)
                key = str(fact.get("fact_key", ""))
                if key not in seen:
                    facts.append(fact)
                    seen.add(key)
        return sorted(facts, key=lambda value: str(value.get("fact_key", "")))
