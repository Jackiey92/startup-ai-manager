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

from ...parsing.types import ParseResult, TextSpan, TableRow, SourceLoc, ClassificationHint
from ..staging import StagingStore

HARNESS_ROOT = Path(__file__).resolve().parents[3] / "harness-openclaw"
NODE_DIR = Path(r"C:\Users\jacki\Documents\Codex\.node24")
OC_DIR = Path(r"C:\Users\jacki\Documents\Codex\.oc-runtime")
OC_MJS = OC_DIR / "node_modules" / "openclaw" / "openclaw.mjs"
GIT_DIR = r"C:\Program Files\Git\cmd"
SKILL_FOR_FORMAT = {"xlsx": "parse-xlsx"}


class OpenClawAdapter:
    def __init__(self, staging: StagingStore, harness_root: Path = HARNESS_ROOT,
                 objects_dir: Path | None = None, db_path: Path | None = None):
        self.staging = staging
        self.root = Path(harness_root)
        self.objects_dir = Path(objects_dir) if objects_dir else HARNESS_ROOT.parent / "data" / "objects"
        self.db_path = Path(db_path) if db_path else None

    def supports(self, format: str) -> bool:
        return format in SKILL_FOR_FORMAT

    def run_parse(self, file_hash: str, format: str, timeout: int = 600) -> int:
        if not self.supports(format):
            raise KeyError(f"no OpenClaw skill for format: {format}")

        task_path = self._write_task(file_hash, format)
        message = f'Use the {SKILL_FOR_FORMAT[format]} skill with task file "{task_path}".'
        out_path = self.root / "outbox" / f"{file_hash}.json"
        if out_path.exists():
            out_path.unlink()

        self._invoke_agent(message, timeout=timeout)

        if not out_path.exists():
            raise RuntimeError(f"OpenClaw produced no output at {out_path}")

        result = _result_from_dict(json.loads(out_path.read_text(encoding="utf-8")))
        return self.staging.save_parse(result)

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
        venv_scripts = HARNESS_ROOT.parent / ".venv" / "Scripts"
        env["PATH"] = f"{venv_scripts};{NODE_DIR};{GIT_DIR};{env.get('PATH', '')}"
        env.setdefault("OPENROUTER_API_KEY", "")
        state_dir = self.root / "state"
        state_dir.mkdir(parents=True, exist_ok=True)
        env["OPENCLAW_STATE_DIR"] = str(state_dir)
        env["OPENCLAW_CONFIG_PATH"] = str(state_dir / "openclaw.json")
        cache_dir = self.root / "cache"
        cache_dir.mkdir(parents=True, exist_ok=True)
        env["XDG_CACHE_HOME"] = str(cache_dir)
        import uuid
        session_id = "oc-" + uuid.uuid4().hex
        cmd = [str(NODE_DIR / "node.exe"), str(OC_MJS), "agent", "--local",
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
