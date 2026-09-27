"""OpenClaw harness adapter (thin, replaceable).

Drives the locally installed OpenClaw CLI to run a registered parser skill,
then collects the confined outbox result and routes it to the existing staging
store. The rest of the app depends on this adapter's interface, not on
OpenClaw itself, so the runtime can be swapped later.
"""
from __future__ import annotations

import atexit
import hashlib
import json
import os
import signal
import socket
import subprocess
import time
from copy import deepcopy
from pathlib import Path
from threading import Lock
from collections.abc import Callable

from ..contracts import ParseResult, TextSpan, TableRow, SourceLoc, ClassificationHint
from ..staging import StagingStore
from ...ports import RuntimeProvider
from ...runtime_config import RuntimeConfig


_READONLY_TOOLS = [
    "sam_memory_read", "sam_memory_search", "sam_file_get", "sam_memory_map",
    "sam_conversation_read", "sam_thread_list", "sam_thread_open",
]
_GATEWAY_LOCK = Lock()
_GATEWAY_PROCESSES: dict[str, tuple[subprocess.Popen, object]] = {}


def _stop_gateways() -> None:
    with _GATEWAY_LOCK:
        processes = list(_GATEWAY_PROCESSES.values())
        _GATEWAY_PROCESSES.clear()
    for process, stream in processes:
        try:
            process.terminate()
            process.wait(timeout=3)
        except (OSError, subprocess.TimeoutExpired):
            try:
                process.kill()
            except OSError:
                pass
        try:
            stream.close()
        except AttributeError:
            pass


def _discard_gateway(key: str, process: subprocess.Popen) -> None:
    with _GATEWAY_LOCK:
        current = _GATEWAY_PROCESSES.get(key)
        if current is None or current[0] is not process:
            return
        _GATEWAY_PROCESSES.pop(key, None)
    try:
        process.terminate()
        process.wait(timeout=2)
    except (OSError, subprocess.TimeoutExpired):
        try:
            process.kill()
        except OSError:
            pass
    try:
        current[1].close()
    except AttributeError:
        pass


atexit.register(_stop_gateways)


class OpenClawAdapter(RuntimeProvider):
    def __init__(self, staging: StagingStore, *, config: RuntimeConfig | None = None,
                 objects_dir: Path | None = None, db_path: Path | None = None,
                 runner: Callable[..., subprocess.CompletedProcess[str]] | None = None):
        self.staging = staging
        self.config = config or RuntimeConfig.from_env()
        self.root = self.config.harness_root
        self.objects_dir = Path(objects_dir) if objects_dir else self.config.objects_dir
        self.db_path = Path(db_path) if db_path else self.config.main_db
        self._runner = runner or subprocess.run

    def supports(self, format: str) -> bool:
        return format in self.config.skill_for_format

    def run_parse(self, file_hash: str, format: str, timeout: int = 600) -> int:
        if not self.supports(format):
            raise KeyError(f"no OpenClaw skill for format: {format}")

        task_path = self._write_task(file_hash, format)
        skill_name = self.config.skill_for_format[format]
        if skill_name == "document-ingest":
            return self._run_document_ingest(task_path, timeout=timeout)
        message = f'Use the {self.config.skill_for_format[format]} skill with task file "{task_path}".'
        out_path = self.root / "outbox" / f"{file_hash}.json"
        if out_path.exists():
            out_path.unlink()

        self._invoke_agent(message, timeout=timeout)

        if not out_path.exists():
            raise RuntimeError(f"OpenClaw produced no output at {out_path}")

        payload = json.loads(out_path.read_text(encoding="utf-8"))
        # document-ingest emits the L2 manifest directly.  Keep it lossless in
        # staging; legacy ParseResult payloads remain supported for migration.
        if isinstance(payload, dict) and "parse_summary" in payload and "pages" in payload:
            return self.staging.save_manifest(payload)
        result = _result_from_dict(payload)
        return self.staging.save_parse(result)

    def _run_document_ingest(self, task_path: Path, *, timeout: int) -> int:
        """Run the deterministic local parser; do not ask the Agent to execute it."""
        bridge = self.config.skill_root / "document-ingest" / "scripts" / "bridge"
        if not bridge.is_file():
            raise RuntimeError(f"document-ingest bridge is missing: {bridge}")
        env = os.environ.copy()
        env["SAM_PROJECT_ROOT"] = str(self.config.project_root)
        env["SAM_L2_IMAGE_ROOT"] = str(self.config.data_root / "l2-images")
        proc = self._runner(
            [str(self.config.tool_bridge_python), str(bridge), str(task_path)],
            cwd=self.config.project_root,
            env=env,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=timeout,
        )
        if proc.returncode != 0:
            detail = (proc.stderr or proc.stdout or "").strip()[-1000:]
            raise RuntimeError(f"document-ingest bridge failed ({proc.returncode}): {detail}")
        try:
            payload = json.loads(proc.stdout)
        except json.JSONDecodeError as exc:
            raise RuntimeError("document-ingest bridge returned invalid JSON") from exc
        if not isinstance(payload, dict) or not isinstance(payload.get("parse_summary"), dict):
            raise RuntimeError("document-ingest bridge returned an invalid manifest")
        return self.staging.save_manifest(payload)

    def run_agent_message(self, message: str, *, context_text: str | None = None,
                          company_id: str | None = None, thread_id: str | None = None,
                          allow_promote: bool = False, timeout: int = 600) -> str:
        prompt = message
        if context_text:
            prompt = context_text.rstrip() + "\n\n用户问题：" + message
        return self._invoke_agent(prompt, timeout=timeout, company_id=company_id,
                                  thread_id=thread_id, allow_promote=allow_promote)

    def _write_task(self, file_hash: str, format: str) -> Path:
        inbox = self.root / "inbox"
        inbox.mkdir(parents=True, exist_ok=True)
        task_path = inbox / f"{file_hash}.json"
        from app.storage import SourceFileStore
        store = SourceFileStore(objects_path=self.objects_dir, db_path=self.db_path)
        stored = store.get(file_hash)
        task_path.write_text(
            json.dumps(
                {
                    "file_hash": file_hash,
                    "format": format,
                    "original_name": stored.original_name,
                    "source_path": str(self.objects_dir / stored.storage_path),
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )
        return task_path

    def _invoke_agent(self, message: str, timeout: int, *, company_id: str | None = None,
                      thread_id: str | None = None, allow_promote: bool = False) -> str:
        env = os.environ.copy()
        env["PATH"] = f"{self.config.venv_bin}:{env.get('PATH', '')}"
        state_dir = self.config.state_dir
        state_dir.mkdir(parents=True, exist_ok=True)
        env["OPENCLAW_STATE_DIR"] = str(state_dir)
        env["OPENCLAW_CONFIG_PATH"] = str(self.config.config_path)
        self._ensure_skill_mount()
        env["SAM_PROJECT_ROOT"] = str(self.config.project_root)
        env["SAM_HARNESS_ROOT"] = str(self.config.harness_root)
        env["SAM_SKILL_ROOT"] = str(self.config.skill_root)
        env["PYTHONPATH"] = os.pathsep.join(filter(None, [str(self.config.project_root), env.get("PYTHONPATH", "")]))
        env["SAM_TOOL_PLUGIN_DIR"] = str(self.config.tool_plugin_dir)
        env["SAM_TOOL_BRIDGE_PYTHON"] = str(self.config.tool_bridge_python)
        # Keep the provider/model contract captured by RuntimeConfig in the
        # child environment. RuntimeConfig already resolves environment wins;
        # assigning these non-secret values here prevents an unrelated parent
        # process environment from silently overriding an explicitly injected
        # config (notably during isolated acceptance runs). The API key is
        # intentionally never assigned or logged here.
        if self.config.model_base_url:
            env[self.config.model_base_url_env] = self.config.model_base_url
        env[self.config.model_name_env] = self.config.model_default
        if self.config.openclaw_mode == "gateway":
            # The Gateway ownership fingerprint includes the effective model
            # configuration, so prepare the child environment first.
            self._ensure_gateway(env, timeout=timeout)
        if company_id is not None:
            env["SAM_COMPANY_ID"] = str(company_id)
        if thread_id is not None:
            env["SAM_THREAD_ID"] = str(thread_id)
        env["SAM_ALLOW_PROMOTE"] = "1" if allow_promote else "0"
        cache_dir = self.root / "cache"
        cache_dir.mkdir(parents=True, exist_ok=True)
        env["XDG_CACHE_HOME"] = str(cache_dir)
        import uuid
        session_id = "oc-" + uuid.uuid4().hex
        cmd = [self.config.node_bin, str(self.config.openclaw_entry), "agent",
               "--agent", self.config.agent_id, "--session-id", session_id, "--json",
               "--message", message, "--timeout", str(timeout)]
        if self.config.openclaw_mode != "gateway":
            cmd.insert(3, "--local")
        proc = self._runner(
            cmd, cwd=self.root, env=env, capture_output=True,
            text=True, encoding="utf-8", errors="replace",
            # Gateway requests must obey the caller's bounded deadline. A
            # short grace lets subprocess cleanup finish without reviving the
            # old --local path's 30-second tail per retry.
            timeout=timeout + (2 if self.config.openclaw_mode == "gateway" else 30),
        )
        if proc.returncode != 0:
            raise RuntimeError(
                f"openclaw agent failed ({proc.returncode}): {proc.stderr.strip() or proc.stdout.strip()}"
            )
        return proc.stdout

    def _ensure_skill_mount(self) -> None:
        """Ensure the configured first-party skill root is visible to OpenClaw."""
        template = self.config.harness_root / "state" / "openclaw.example.json"
        path = self.config.config_path
        config: dict = {}
        if template.exists():
            try:
                loaded = json.loads(template.read_text(encoding="utf-8"))
                if isinstance(loaded, dict):
                    config = deepcopy(loaded)
            except (OSError, json.JSONDecodeError) as exc:
                raise RuntimeError("OpenClaw configuration template is invalid") from exc
        if path.exists():
            try:
                loaded = json.loads(path.read_text(encoding="utf-8"))
                if isinstance(loaded, dict):
                    _merge_missing(config, loaded)
            except (OSError, json.JSONDecodeError):
                # A corrupt runtime config must not erase the known-good
                # template; continue with template defaults and rewrite it.
                pass
        skills = config.setdefault("skills", {})
        loader = skills.setdefault("load", {})
        dirs = loader.setdefault("extraDirs", [])
        if not isinstance(dirs, list):
            dirs = []
            loader["extraDirs"] = dirs
        skill_root = str(self.config.skill_root)
        if skill_root not in dirs:
            dirs.append(skill_root)
        self._ensure_plugin_mount()
        _ensure_plugin_defaults(config)
        _normalize_agent_entries(config)
        _ensure_agent_model_defaults(config)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(config, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    def prepare_runtime(self) -> None:
        """Prepare a fresh state directory before OpenClaw is started.

        This deliberately does not start Gateway: the daemon must live as a
        child of the long-running Flask process so its lifecycle and atexit
        cleanup are owned by one process.  The first agent call then pays at
        most one bounded Gateway startup cost and all later calls reuse it.
        """
        self.config.state_dir.mkdir(parents=True, exist_ok=True)
        self._ensure_skill_mount()

    def _ensure_plugin_mount(self) -> None:
        """Expose the repository plugin through OpenClaw's state discovery dir."""
        source = self.config.tool_plugin_dir
        if not source.is_dir():
            raise RuntimeError("SAM memory plugin directory is missing")
        target = self.config.state_dir / "extensions" / source.name
        target.parent.mkdir(parents=True, exist_ok=True)
        if target.is_symlink():
            if target.resolve() == source.resolve():
                return
            target.unlink()
        if target.exists():
            # Do not overwrite an administrator-managed installed copy. The
            # OpenClaw install ledger may already own this exact discovery dir.
            return
        try:
            target.symlink_to(source, target_is_directory=True)
        except OSError as exc:
            raise RuntimeError("unable to mount SAM memory plugin") from exc

    def _ensure_gateway(self, env: dict[str, str], *, timeout: int) -> None:
        """Start one owned loopback Gateway per state directory and reuse it.

        A TCP listener alone is not proof that it belongs to this Flask
        process.  After an unclean restart an old Gateway can retain the port
        and silently keep the previous model/configuration.  We persist a
        non-secret owner record with a configuration fingerprint and reclaim
        only a process we can prove is our own; an unknown listener fails
        closed instead of serving requests through the wrong runtime.
        """
        # Unit tests inject a runner and must not launch a real daemon. The
        # production composition root uses subprocess.run and takes this path.
        if self._runner is not subprocess.run:
            return
        key = str(self.config.state_dir)
        with _GATEWAY_LOCK:
            current = _GATEWAY_PROCESSES.get(key)
            if current is not None and current[0].poll() is None:
                # Another request may have started it while this request was
                # waiting for the lock. Reuse that process and wait for its
                # socket instead of launching a second daemon on the port.
                process = current[0]
            else:
                if current is not None:
                    try:
                        current[1].close()
                    except AttributeError:
                        pass
                self._reclaim_or_reject_gateway_port()
                log_path = self.config.state_dir / "gateway.log"
                log_path.parent.mkdir(parents=True, exist_ok=True)
                stream = log_path.open("a", encoding="utf-8")
                command = [self.config.node_bin, str(self.config.openclaw_entry), "gateway", "run", "--port", str(self.config.gateway_port)]
                process = subprocess.Popen(
                    command, cwd=self.root, env=env, stdout=stream, stderr=stream,
                    text=True,
                )
                _GATEWAY_PROCESSES[key] = (process, stream)
        deadline = time.monotonic() + min(max(timeout, 1), 15)
        while time.monotonic() < deadline:
            if process.poll() is not None:
                _discard_gateway(key, process)
                raise RuntimeError("OpenClaw Gateway exited during startup")
            try:
                with socket.create_connection(("127.0.0.1", self.config.gateway_port), timeout=0.2):
                    self._write_gateway_owner(process, env)
                    return
            except OSError:
                time.sleep(0.1)
        _discard_gateway(key, process)
        raise TimeoutError("OpenClaw Gateway startup timed out")

    @property
    def _gateway_owner_path(self) -> Path:
        return self.config.state_dir / "gateway.owner.json"

    def _gateway_fingerprint(self, env: dict[str, str] | None = None) -> str:
        """Fingerprint effective non-secret Gateway identity/configuration."""
        try:
            config_digest = hashlib.sha256(self.config.config_path.read_bytes()).hexdigest()
        except OSError:
            config_digest = "missing"
        effective_env = env or os.environ
        material = {
            "config_digest": config_digest,
            "entry": str(self.config.openclaw_entry),
            "model": effective_env.get(self.config.model_name_env, self.config.model_default),
            "model_base_url": effective_env.get(self.config.model_base_url_env, self.config.model_base_url),
            "port": self.config.gateway_port,
            "state_dir": str(self.config.state_dir),
        }
        encoded = json.dumps(material, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        return hashlib.sha256(encoded.encode("utf-8")).hexdigest()

    def _read_gateway_owner(self) -> dict[str, object] | None:
        try:
            payload = json.loads(self._gateway_owner_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            return None
        return payload if isinstance(payload, dict) else None

    def _write_gateway_owner(self, process: subprocess.Popen, env: dict[str, str]) -> None:
        pid = getattr(process, "pid", None)
        if not isinstance(pid, int) or pid <= 0:
            # Test doubles need no filesystem ownership record.
            return
        payload = {
            "fingerprint": self._gateway_fingerprint(env),
            "pid": pid,
            "port": self.config.gateway_port,
            "state_dir": str(self.config.state_dir),
        }
        self._gateway_owner_path.parent.mkdir(parents=True, exist_ok=True)
        self._gateway_owner_path.write_text(json.dumps(payload, sort_keys=True) + "\n", encoding="utf-8")
        try:
            self._gateway_owner_path.chmod(0o600)
        except OSError:
            pass

    def _gateway_port_open(self) -> bool:
        try:
            with socket.create_connection(("127.0.0.1", self.config.gateway_port), timeout=0.2):
                return True
        except OSError:
            return False

    def _owner_is_sam_gateway(self, owner: dict[str, object]) -> bool:
        try:
            pid = int(owner.get("pid", 0))
            port = int(owner.get("port", -1))
        except (TypeError, ValueError):
            return False
        if pid <= 0 or port != self.config.gateway_port or owner.get("state_dir") != str(self.config.state_dir):
            return False
        try:
            os.kill(pid, 0)
            cmdline = Path(f"/proc/{pid}/cmdline").read_bytes().decode("utf-8", "replace")
        except OSError:
            return False
        return "gateway" in cmdline and str(self.config.openclaw_entry) in cmdline

    def _stop_owned_orphan(self, owner: dict[str, object]) -> None:
        pid = int(owner["pid"])
        try:
            os.kill(pid, signal.SIGTERM)
        except OSError:
            return
        deadline = time.monotonic() + 3.0
        while time.monotonic() < deadline:
            if not self._gateway_port_open():
                return
            time.sleep(0.1)
        try:
            os.kill(pid, signal.SIGKILL)
        except OSError:
            pass

    def _reclaim_or_reject_gateway_port(self) -> None:
        if not self._gateway_port_open():
            return
        owner = self._read_gateway_owner()
        if owner is None or not self._owner_is_sam_gateway(owner):
            raise RuntimeError("OpenClaw Gateway port is occupied by an unverified process")
        # A verified old process may still use a different model/configuration.
        # Always restart it when this Flask process does not own it, ensuring
        # the new state has an effective, matching fingerprint.
        self._stop_owned_orphan(owner)
        if self._gateway_port_open():
            raise RuntimeError("unable to reclaim stale OpenClaw Gateway")
        try:
            self._gateway_owner_path.unlink()
        except OSError:
            pass


def _merge_missing(defaults: dict, existing: dict) -> None:
    """Overlay runtime-specific values while retaining newly added defaults."""
    for key, value in existing.items():
        if isinstance(value, dict) and isinstance(defaults.get(key), dict):
            _merge_missing(defaults[key], value)
        else:
            defaults[key] = value


def _ensure_agent_model_defaults(config: dict) -> None:
    """Keep an older runtime config from dropping the configured provider."""
    agents = config.get("agents")
    if not isinstance(agents, dict):
        return
    defaults = agents.get("defaults")
    if isinstance(defaults, dict):
        model = defaults.setdefault("model", {})
        if isinstance(model, dict):
            model.setdefault("primary", "token-plan/${SAM_GUIDE_MODEL}")
    entries = agents.get("list")
    if isinstance(entries, list):
        for entry in entries:
            if isinstance(entry, dict):
                model = entry.setdefault("model", {})
                if isinstance(model, dict):
                    model.setdefault("primary", "token-plan/${SAM_GUIDE_MODEL}")
    entries_map = agents.get("entries")
    if isinstance(entries_map, dict):
        for entry in entries_map.values():
            if isinstance(entry, dict):
                model = entry.setdefault("model", {})
                if isinstance(model, dict):
                    model.setdefault("primary", "token-plan/${SAM_GUIDE_MODEL}")


def _normalize_agent_entries(config: dict) -> None:
    """Emit the 2026.9+ agents.entries shape without legacy id fields."""
    agents = config.get("agents")
    if not isinstance(agents, dict):
        return
    legacy = agents.pop("list", None)
    if not isinstance(legacy, list):
        return
    entries = agents.get("entries")
    if not isinstance(entries, dict):
        entries = {}
        agents["entries"] = entries
    for raw in legacy:
        if not isinstance(raw, dict):
            continue
        entry = dict(raw)
        agent_id = str(entry.pop("id", "") or "").strip()
        if not agent_id:
            name = str(entry.get("name", "agent")).strip().lower().replace(" ", "-")
            agent_id = name or "agent"
        entries.setdefault(agent_id, entry)
def _ensure_plugin_defaults(config: dict) -> None:
    plugins = config.setdefault("plugins", {})
    entries = plugins.setdefault("entries", {})
    if isinstance(entries, dict):
        entry = entries.setdefault("sam-memory", {})
        if isinstance(entry, dict):
            entry["enabled"] = True
    tools = config.setdefault("tools", {})
    if isinstance(tools, dict):
        current = tools.get("allow")
        if not isinstance(current, list):
            current = []
        tools["allow"] = _merge_tool_allowlist(current)
    agents = config.get("agents")
    if not isinstance(agents, dict):
        return
    entries_list = agents.get("list")
    if isinstance(entries_list, list):
        for agent in entries_list:
            if isinstance(agent, dict) and isinstance(agent.get("tools"), dict):
                current = agent["tools"].get("allow")
                agent["tools"]["allow"] = _merge_tool_allowlist(current if isinstance(current, list) else [])
    entries_map = agents.get("entries")
    if isinstance(entries_map, dict):
        for agent in entries_map.values():
            if isinstance(agent, dict) and isinstance(agent.get("tools"), dict):
                current = agent["tools"].get("allow")
                agent["tools"]["allow"] = _merge_tool_allowlist(current if isinstance(current, list) else [])


def _merge_tool_allowlist(current: list) -> list[str]:
    result = [str(item) for item in current if str(item) != "sam_promote"]
    for name in _READONLY_TOOLS:
        if name not in result:
            result.append(name)
    return result


def _result_from_dict(d: dict) -> ParseResult:
    hint = ClassificationHint(**d.get("hint", {}))
    spans = [
        TextSpan(
            text=s["text"],
            kind=s.get("kind", "text"),
            loc=SourceLoc(**s["loc"]),
        )
        for s in d.get("text_spans", [])
    ]
    rows = [
        TableRow(
            headers=r["headers"],
            values=r["values"],
            sheet=r.get("sheet"),
            row_index=r.get("row_index"),
            loc=SourceLoc(**r["loc"]),
        )
        for r in d.get("table_rows", [])
    ]
    return ParseResult(
        file_hash=d["file_hash"],
        original_name=d["original_name"],
        format=d["format"],
        text_spans=spans,
        table_rows=rows,
        hint=hint,
    )
