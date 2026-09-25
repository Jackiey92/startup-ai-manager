"""OpenClaw harness adapter (thin, replaceable).

Drives the locally installed OpenClaw CLI to run a registered parser skill,
then collects the confined outbox result and routes it to the existing staging
store. The rest of the app depends on this adapter's interface, not on
OpenClaw itself, so the runtime can be swapped later.
"""
from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path

from ..contracts import ParseResult, TextSpan, TableRow, SourceLoc, ClassificationHint
from ..staging import StagingStore
from ...ports import RuntimeProvider
from ...runtime_config import RuntimeConfig


class OpenClawAdapter(RuntimeProvider):
    def __init__(self, staging: StagingStore, *, config: RuntimeConfig | None = None,
                 objects_dir: Path | None = None, db_path: Path | None = None):
        self.staging = staging
        self.config = config or RuntimeConfig.from_env()
        self.root = self.config.harness_root
        self.objects_dir = Path(objects_dir) if objects_dir else self.config.objects_dir
        self.db_path = Path(db_path) if db_path else self.config.main_db

    def supports(self, format: str) -> bool:
        return format in self.config.skill_for_format

    def run_parse(self, file_hash: str, format: str, timeout: int = 600) -> int:
        if not self.supports(format):
            raise KeyError(f"no OpenClaw skill for format: {format}")

        task_path = self._write_task(file_hash, format)
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

    def run_agent_message(self, message: str, *, timeout: int = 600) -> str:
        return self._invoke_agent(message, timeout=timeout)

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

    def _invoke_agent(self, message: str, timeout: int) -> str:
        env = os.environ.copy()
        env["PATH"] = f"{self.config.venv_bin}:{env.get('PATH', '')}"
        state_dir = self.config.state_dir
        state_dir.mkdir(parents=True, exist_ok=True)
        env["OPENCLAW_STATE_DIR"] = str(state_dir)
        env["OPENCLAW_CONFIG_PATH"] = str(self.config.config_path)
        cache_dir = self.root / "cache"
        cache_dir.mkdir(parents=True, exist_ok=True)
        env["XDG_CACHE_HOME"] = str(cache_dir)
        import uuid
        session_id = "oc-" + uuid.uuid4().hex
        cmd = [self.config.node_bin, str(self.config.openclaw_entry), "agent", "--local",
               "--agent", "main", "--session-id", session_id, "--json",
               "--message", message, "--timeout", str(timeout)]
        proc = subprocess.run(
            cmd, cwd=self.root, env=env, capture_output=True,
            text=True, encoding="utf-8", errors="replace",
            timeout=timeout + 30,
        )
        if proc.returncode != 0:
            raise RuntimeError(
                f"openclaw agent failed ({proc.returncode}): {proc.stderr.strip() or proc.stdout.strip()}"
            )
        return proc.stdout


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
