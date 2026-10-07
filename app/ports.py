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
import time
import urllib.error
import urllib.request
from urllib.parse import urlparse
from collections.abc import Callable, Sequence
from typing import Any, Protocol
from .memory_paths import MEMORY_ROOT


class RuntimeProvider(Protocol):
    def supports(self, format: str) -> bool:
        """Whether a configured ingest skill handles this format."""

    def run_parse(self, file_hash: str, format: str, timeout: int = 600) -> int:
        """Run the configured parser and return a staging record id."""

    def run_agent_message(self, message: str, *, context_text: str | None = None,
                          company_id: str | None = None, thread_id: str | None = None,
                          allow_promote: bool = False, timeout: int = 600,
                          access_role: str = "employee") -> str:
        """Run one agent turn and return its serialized result."""


class ModelProvider(Protocol):
    def complete_json(self, *, system_prompt: str, payload: dict[str, Any],
                      image_urls: list[str] | None = None) -> dict[str, Any]:
        """Return a JSON object from a configured model endpoint."""


class ModelUnavailable(RuntimeError):
    """The configured model provider could not return a valid response."""


class RetryableRuntimeError(RuntimeError):
    """A runtime dependency is not ready yet and the job may be retried."""

    error_kind = "runtime"


class MemoryProvider(Protocol):
    def add_resource(self, path: str, *, parent: str, wait: bool = True) -> None:
        """Import a source file into the configured OV semantic folder."""

    def add_resource_to(self, path: str, target_uri: str, *, wait: bool = True,
                        timeout: int = 600) -> Any:
        """Import a source file to an exact, caller-owned URI."""

    def ensure_directory(self, uri: str) -> None:
        """Ensure a semantic parent directory exists."""

    def wait_for_resource(self, uri: str, *, timeout: int = 600, interval: float = 2.0) -> None:
        """Poll asynchronous OV processing until semantic navigation is ready."""

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

    def __init__(self, root: str | Path, *, memory_root: str = MEMORY_ROOT):
        self.root = Path(root)
        self.memory_root = memory_root.rstrip("/")

    def _path(self, uri: str) -> Path:
        relative = uri.removeprefix("viking://").lstrip("/")
        path = (self.root / relative).resolve()
        if self.root.resolve() not in path.parents and path != self.root.resolve():
            raise ValueError("memory URI escapes local memory root")
        return path

    def add_resource(self, path: str, *, parent: str, wait: bool = True) -> None:
        source = Path(path)
        if not source.is_file():
            raise FileNotFoundError(path)
        target = self._path(parent.rstrip("/") + "/" + source.name)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)

    def add_resource_to(self, path: str, target_uri: str, *, wait: bool = True,
                        timeout: int = 600) -> None:
        source = Path(path)
        if not source.is_file():
            raise FileNotFoundError(path)
        target = self._path(target_uri)
        if target.exists():
            raise FileExistsError(target_uri)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)

    def ensure_directory(self, uri: str) -> None:
        path = self._path(uri)
        path.mkdir(parents=True, exist_ok=True)

    def wait_for_resource(self, uri: str, *, timeout: int = 600, interval: float = 2.0) -> None:
        return None

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
            f"{self.memory_root}/2b_facts/{company_id}/{fact_key}.json",
            json.dumps(fact, ensure_ascii=False, sort_keys=True),
            metadata={"layer": "2b", "company_id": company_id, "fact_key": fact_key},
        )

    def get_fact(self, company_id: str, fact_key: str) -> dict[str, Any] | None:
        uri = f"{self.memory_root}/2b_facts/{company_id}/{fact_key}.json"
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
        prefix = f"{self.memory_root}/2b_facts/{company_id}"
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
        templates_dir: str = "custom-prompts",
        ov_bin: str = "ov",
        runner: Callable[..., subprocess.CompletedProcess[str]] | None = None,
        memory_root: str = MEMORY_ROOT,
        cli_config_path: str | Path | None = None,
    ):
        self.base_url = base_url
        self.api_key = api_key
        self.templates_dir = templates_dir
        self.ov_bin = ov_bin
        self._runner = runner or subprocess.run
        self._injected_runner = runner is not None
        self.cli_config_path = Path(cli_config_path or (Path(tempfile.gettempdir()) / "sam-openviking" / "sam-ovcli.conf"))
        self._endpoint_checked = False
        self.memory_root = memory_root.rstrip("/")
        self._known_fact_keys: dict[str, set[str]] = {}

    def _env(self) -> dict[str, str]:
        # Deliberately construct an allowlisted environment. In particular,
        # neither developer OV credentials nor global CLI discovery survive.
        env = {key: os.environ[key] for key in ("PATH", "HOME", "LANG", "LC_ALL", "TMPDIR") if os.environ.get(key)}
        self.cli_config_path.parent.mkdir(parents=True, exist_ok=True)
        config: dict[str, Any] = {"url": self.base_url or "http://127.0.0.1:1933"}
        if self.api_key:
            config["api_key"] = self.api_key
        self.cli_config_path.write_text(json.dumps(config), encoding="utf-8")
        try:
            self.cli_config_path.chmod(0o600)
        except OSError:
            pass
        env["OPENVIKING_CLI_CONFIG_FILE"] = str(self.cli_config_path)
        if self.templates_dir:
            env["SAM_OV_TEMPLATES_DIR"] = self.templates_dir
        return env

    def _check_endpoint(self) -> None:
        if self._endpoint_checked or self._injected_runner:
            return
        url = (self.base_url or "http://127.0.0.1:1933").rstrip("/")
        if urlparse(url).hostname not in {"127.0.0.1", "localhost", "::1"}:
            raise MemoryUnavailable("SAM OpenViking endpoint must be a local loopback address; remote fallback is disabled")
        try:
            # Loopback checks must not be redirected through the host's SOCKS/HTTP proxy.
            opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
            with opener.open(url + "/health", timeout=2) as response:
                if response.status >= 400:
                    raise OSError(f"HTTP {response.status}")
        except (OSError, urllib.error.URLError) as exc:
            raise MemoryUnavailable(
                f"Local OpenViking is unavailable at {url}; start it with openviking-server "
                "(initialize with 'openviking-server init' and check with 'openviking-server doctor')."
            ) from exc
        self._endpoint_checked = True

    @staticmethod
    def _safe_error(text: str) -> str:
        # Never echo an accidental credential-like value from a CLI error.
        for marker in ("api_key=", "api-key=", "Authorization:", "Bearer "):
            if marker in text:
                text = text.split(marker, 1)[0] + marker + "<redacted>"
        return text[-1000:]

    def _run(self, args: Sequence[str]) -> Any:
        self._check_endpoint()
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
            if "not_found" in detail.lower() or "not found" in detail.lower():
                raise FileNotFoundError(detail or "memory resource not found")
            raise MemoryUnavailable(f"OpenViking request failed: {detail or 'unknown error'}")
        raw = (completed.stdout or "").strip()
        if not raw:
            return None
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            # Some local ``ov`` wrappers echo the rendered command before the
            # JSON payload on stdout (for example ``cmd: ov ls ...``).  Keep
            # the transport provider JSON-first: discard only the non-JSON
            # preamble, then decode the complete object/list.  Plain text
            # reads remain untouched when no JSON document follows.
            lines = raw.splitlines()
            for index, line in enumerate(lines):
                if line.lstrip().startswith(("{", "[")):
                    try:
                        return json.loads("\n".join(lines[index:]))
                    except json.JSONDecodeError:
                        break
            return raw

    @staticmethod
    def _items(payload: Any) -> list[dict[str, Any]]:
        if isinstance(payload, list):
            return [item for item in payload if isinstance(item, dict)]
        if isinstance(payload, dict):
            # OV compact envelopes use ``result`` for both scalar reads and
            # list commands.  Only a list is an item collection; a string is
            # intentionally left to read(), which handles the body envelope.
            for key in ("result", "results", "items", "nodes", "data"):
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
            # L1/L0 navigation is rebuilt idempotently by concurrent parse
            # workers.  Make the intended upsert explicit: relying on the
            # CLI default can turn a racing second write into ALREADY_EXISTS.
            # File persistence is deliberately model-free. Semantic/vector
            # processing is an explicit, separate operation (e.g. reindex),
            # so a plain memory write works on a local server with no model.
            args = ["write", uri, "--from-file", handle.name, "--mode", "replace", "--wait"]
            if tags:
                args.extend(["--tags", tags])
            self._run(args)

    def add_resource(self, path: str, *, parent: str, wait: bool = True) -> Any:
        """Ingest into a semantic folder, creating the folder when needed."""
        args = ["add-resource", path, "--parent-auto-create", parent]
        if wait:
            args.append("--wait")
        return self._run(args)

    def add_resource_to(self, path: str, target_uri: str, *, wait: bool = True,
                        timeout: int = 600) -> Any:
        """Import to an exact URI; never let OV choose a short fingerprint path."""
        args = ["add-resource", path, "--to", target_uri]
        if wait:
            args.extend(["--wait", "--timeout", str(max(1, int(timeout)))])
        return self._run(args)

    def ensure_directory(self, uri: str) -> None:
        """Create the semantic parent, treating an existing directory as success."""
        try:
            self._run(["mkdir", uri])
        except MemoryUnavailable as exc:
            if not any(token in str(exc).lower() for token in ("already exists", "already_exists", "exists")):
                raise

    @staticmethod
    def _semantic_ready(payload: Any) -> bool:
        if isinstance(payload, dict):
            status = str(payload.get("status") or payload.get("state") or "").lower()
            if status in {"ready", "completed", "complete", "success", "succeeded"}:
                return True
            if payload.get("overview_ready") is True or payload.get("abstract_ready") is True:
                return True
            return any(OpenVikingMemoryProvider._semantic_ready(value) for value in payload.values())
        if isinstance(payload, list):
            return any(OpenVikingMemoryProvider._semantic_ready(value) for value in payload)
        return False

    def wait_for_resource(self, uri: str, *, timeout: int = 600, interval: float = 2.0) -> None:
        """Poll stat until semantic processing is ready.

        OpenViking creates the resource asynchronously.  A deterministic child
        URI can therefore return NOT_FOUND for a short period after
        ``add-resource`` has accepted the submission.  That response is a
        pending state here, not a second submission and not an immediate
        failure.  Only a timeout turns it into a durable, actionable error.
        """
        deadline = time.monotonic() + max(0.0, float(timeout))
        not_found: FileNotFoundError | None = None
        while True:
            try:
                payload = self._run(["stat", uri])
            except FileNotFoundError as exc:
                not_found = exc
                payload = None
            if payload is not None and self._semantic_ready(payload):
                return
            if time.monotonic() >= deadline:
                if not_found is not None:
                    raise MemoryUnavailable(
                        f"OpenViking resource did not appear before timeout: {uri}"
                    ) from not_found
                raise MemoryUnavailable(f"OpenViking semantic processing timed out for {uri}")
            time.sleep(max(0.0, interval))

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
            f"{self.memory_root}/2b_facts/{company_id}/{fact_key}.json",
            json.dumps(fact, ensure_ascii=False, sort_keys=True),
            metadata={"layer": "2b", "company_id": company_id, "fact_key": fact_key},
        )
        self._known_fact_keys.setdefault(company_id, set()).add(fact_key)

    def get_fact(self, company_id: str, fact_key: str) -> dict[str, Any] | None:
        uri = f"{self.memory_root}/2b_facts/{company_id}/{fact_key}.json"
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
        prefix = f"{self.memory_root}/2b_facts/{company_id}"
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
