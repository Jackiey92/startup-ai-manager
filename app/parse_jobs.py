"""In-process upload parse queue with durable, pollable job state."""
from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
import os
from threading import Event, Lock
import time
from typing import Callable, Any

from .db.database import connect


STATUSES = {"queued", "parsing", "done", "failed", "canceled"}
STAGES = {"queued", "uploading", "starting_engine", "parsing", "consolidating", "done", "failed", "canceled"}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


class ParseJobCanceled(RuntimeError):
    """Raised by a worker after its private parser process was terminated."""


JobWorker = Callable[[dict[str, Any], Callable[..., None], Event], None]
CancelParser = Callable[[str], bool]


class ParseJobManager:
    """Durable job ledger plus a small process-local executor.

    ``worker`` owns the actual parse/consolidate pipeline.  The manager only
    controls lifecycle, cancellation races, and persisted progress so it can
    be tested without a parser or external queue.
    """

    def __init__(self, db_path, worker: JobWorker, *, cancel_parser: CancelParser | None = None,
                 workers: int | None = None) -> None:
        self.db_path = db_path
        self.worker = worker
        self.cancel_parser = cancel_parser or (lambda _file_hash: False)
        count = workers if workers is not None else int(os.environ.get("SAM_PARSE_WORKERS", "1"))
        if count < 1:
            raise ValueError("SAM_PARSE_WORKERS must be positive")
        self.executor = ThreadPoolExecutor(max_workers=count, thread_name_prefix="sam-parse")
        self._events: dict[str, Event] = {}
        self._critical: set[str] = set()
        self._lock = Lock()

    def close(self) -> None:
        self.executor.shutdown(wait=False, cancel_futures=True)

    def create(self, *, company_id: str, file_hash: str, original_name: str,
               file_format: str, harness_format: str, size_bytes: int) -> dict[str, Any]:
        stamp = str(int(time.time() * 1000))
        job_id = "j_" + stamp + "_" + hashlib.sha256(f"{file_hash}:{stamp}".encode()).hexdigest()[:10]
        now = _now()
        with connect(self.db_path) as conn:
            conn.execute(
                """INSERT INTO parse_jobs
                (job_id,company_id,file_hash,original_name,file_format,harness_format,size_bytes,
                 status,stage,progress_current,created_at,updated_at)
                VALUES (?,?,?,?,?,?,?,'queued','queued',0,?,?)""",
                (job_id, company_id, file_hash, original_name, file_format, harness_format,
                 size_bytes, now, now),
            )
            conn.commit()
        with self._lock:
            self._events[job_id] = Event()
        self.executor.submit(self._run, job_id)
        return self.get(job_id)

    def get(self, job_id: str) -> dict[str, Any]:
        with connect(self.db_path) as conn:
            row = conn.execute("SELECT * FROM parse_jobs WHERE job_id=?", (job_id,)).fetchone()
        if row is None:
            raise KeyError(job_id)
        return dict(row)

    def list(self, *, company_id: str, status: str | None = None) -> list[dict[str, Any]]:
        sql = "SELECT * FROM parse_jobs WHERE company_id=?"
        params: list[Any] = [company_id]
        if status and status != "all":
            sql += " AND status=?"
            params.append(status)
        sql += " ORDER BY created_at DESC, id DESC"
        with connect(self.db_path) as conn:
            return [dict(row) for row in conn.execute(sql, params).fetchall()]

    def cancel(self, job_id: str) -> dict[str, Any]:
        job = self.get(job_id)
        status = job["status"]
        if status == "done":
            raise RuntimeError("job already completed")
        if status in {"failed", "canceled"}:
            return job
        with self._lock:
            critical = job_id in self._critical
        if job["stage"] == "consolidating" or critical:
            raise RuntimeError("consolidation already started")
        with self._lock:
            event = self._events.setdefault(job_id, Event())
            event.set()
        if status == "queued":
            self._update(job_id, status="canceled", stage="canceled", message="已按用户要求停止", error_kind="canceled", finished_at=_now())
            return self.get(job_id)
        # Only terminate this job's bridge group.  Shared MinerU is not owned
        # by a job and is intentionally never passed to cancel_parser.  During
        # engine setup the worker has not reached its private bridge yet; its
        # next cancellation check is sufficient and avoids a stale intent.
        if job["stage"] == "parsing":
            self.cancel_parser(str(job["file_hash"]))
        return self.get(job_id)

    def retry(self, job_id: str) -> dict[str, Any]:
        job = self.get(job_id)
        if job["status"] not in {"failed", "canceled"}:
            raise RuntimeError("only failed or canceled jobs can be retried")
        now = _now()
        with self._lock:
            # A canceled parsing worker may still be unwinding after its
            # private bridge group was terminated.  Do not replace its event
            # with a new generation until its cleanup is complete.
            if job_id in self._events:
                raise RuntimeError("job cancellation is still finishing")
            self._events[job_id] = Event()
        self._update(job_id, status="queued", stage="queued", message=None,
                     error_kind=None, progress_current=0, progress_total=None,
                     started_at=None, finished_at=None, updated_at=now)
        self.executor.submit(self._run, job_id)
        return self.get(job_id)

    def _run(self, job_id: str) -> None:
        event = self._events.setdefault(job_id, Event())
        job = self.get(job_id)
        if job["status"] != "queued":
            with self._lock:
                if self._events.get(job_id) is event:
                    self._events.pop(job_id, None)
            return
        self._update(job_id, status="parsing", stage="starting_engine", started_at=_now())
        try:
            self.worker(job, lambda **kwargs: self._progress(job_id, **kwargs), event)
            with self._lock:
                canceled = event.is_set()
            if canceled:
                self._update(job_id, status="canceled", stage="canceled", message="已按用户要求停止", error_kind="canceled", finished_at=_now())
            else:
                current = self.get(job_id)
                self._update(job_id, status="done", stage="done",
                             progress_current=current.get("progress_total") or current.get("progress_current") or 0,
                             message="解析完成", finished_at=_now())
        except Exception as exc:
            if event.is_set():
                self._update(job_id, status="canceled", stage="canceled", message="已按用户要求停止", error_kind="canceled", finished_at=_now())
            else:
                kind = getattr(exc, "error_kind", "engine")
                self._update(job_id, status="failed", stage="failed", message=str(exc)[:500] or "解析失败", error_kind=str(kind), finished_at=_now())
        finally:
            with self._lock:
                if self._events.get(job_id) is event:
                    self._events.pop(job_id, None)
                self._critical.discard(job_id)

    def _progress(self, job_id: str, *, stage: str | None = None, current: int | None = None,
                  total: int | None = None, message: str | None = None,
                  critical: bool = False, critical_end: bool = False) -> None:
        if stage is not None and stage not in STAGES:
            raise ValueError(f"unknown parse stage: {stage}")
        if critical:
            with self._lock:
                event = self._events.setdefault(job_id, Event())
                if event.is_set():
                    raise ParseJobCanceled("job canceled before consolidation")
                self._critical.add(job_id)
        if critical_end:
            with self._lock:
                self._critical.discard(job_id)
        updates: dict[str, Any] = {"updated_at": _now()}
        if stage is not None:
            updates["stage"] = stage
        if current is not None:
            updates["progress_current"] = max(0, int(current))
        if total is not None:
            updates["progress_total"] = max(0, int(total))
        if message is not None:
            updates["message"] = message
        self._update(job_id, **updates)

    def _update(self, job_id: str, **updates: Any) -> None:
        if not updates:
            return
        updates["updated_at"] = updates.get("updated_at") or _now()
        columns = ", ".join(f"{key}=?" for key in updates)
        values = list(updates.values()) + [job_id]
        with connect(self.db_path) as conn:
            conn.execute(f"UPDATE parse_jobs SET {columns} WHERE job_id=?", values)
            conn.commit()
