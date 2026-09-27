"""In-process single-flight coordination for import-guide generation."""
from __future__ import annotations

from concurrent.futures import CancelledError, Future, TimeoutError
from dataclasses import dataclass
from threading import Lock
import time
from typing import Any, Callable


@dataclass
class GuideJob:
    key: str
    revision: int = 1
    future: Future[dict[str, Any]] | None = None


class GuideJobCoordinator:
    """Deduplicate a company's guide work while preserving later uploads.

    Every upload marks the current company guide revision dirty. If parsing of
    another document finishes while a guide is running, the same worker reruns
    once with a fresh evidence snapshot before completing its shared Future.
    """

    def __init__(self, executor: Any, *, debounce_seconds: float = 0.0,
                 sleep: Callable[[float], None] = time.sleep):
        self._executor = executor
        self._jobs: dict[str, GuideJob] = {}
        self._lock = Lock()
        self._debounce_seconds = max(0.0, debounce_seconds)
        self._sleep = sleep

    def queue(self, key: str, worker: Callable[[], dict[str, Any]]) -> GuideJob:
        """Start work or mark an in-flight company guide stale."""
        with self._lock:
            current = self._jobs.get(key)
            if current is not None and current.future is not None and not current.future.done():
                current.revision += 1
                return current
            return self._start_locked(key, worker)

    def get_or_start(self, key: str, worker: Callable[[], dict[str, Any]]) -> GuideJob:
        """Return an in-flight/cached result, creating work only when absent."""
        with self._lock:
            current = self._jobs.get(key)
            if current is not None and (current.future is None or not current.future.done()):
                return current
            if current is not None and current.future is not None and not current.future.cancelled():
                try:
                    if current.future.exception() is None:
                        return current
                except CancelledError:
                    pass
            return self._start_locked(key, worker)

    def wait(self, job: GuideJob, *, timeout: float) -> dict[str, Any] | None:
        """Return a ready guide, or ``None`` when it is still generating."""
        if job.future is None:
            return None
        try:
            return job.future.result(timeout=max(0.0, timeout))
        except TimeoutError:
            return None

    def status(self, key: str) -> str:
        with self._lock:
            job = self._jobs.get(key)
            if job is None or job.future is None:
                return "missing"
            if not job.future.done():
                return "generating"
            if job.future.cancelled() or job.future.exception() is not None:
                return "failed"
            return "ready"

    def snapshot(self, key: str) -> dict[str, Any]:
        """Expose a non-blocking, read-only terminal/pending job view."""
        with self._lock:
            job = self._jobs.get(key)
            if job is None or job.future is None:
                return {"guide_status": "missing"}
            if not job.future.done():
                return {"guide_status": "generating", "retry_after_ms": 1000}
            if job.future.cancelled():
                return {"guide_status": "failed", "reason": "cancelled"}
            try:
                failure = job.future.exception()
            except CancelledError:
                return {"guide_status": "failed", "reason": "cancelled"}
            if failure is not None:
                return {"guide_status": "failed", "reason": str(getattr(failure, "reason", "unavailable"))}
            return {"guide_status": "ready", "guide": job.future.result()}

    def _start_locked(self, key: str, worker: Callable[[], dict[str, Any]]) -> GuideJob:
        job = GuideJob(key=key)
        self._jobs[key] = job
        job.future = self._executor.submit(self._run_until_current, job, worker)
        return job

    def _run_until_current(self, job: GuideJob, worker: Callable[[], dict[str, Any]]) -> dict[str, Any]:
        # Let a short burst of uploads settle before the first evidence
        # snapshot. This prevents an A/B upload pair from spending an Agent
        # turn on A and immediately requiring an identical rerun for B.
        if self._debounce_seconds:
            self._sleep(self._debounce_seconds)
        while True:
            with self._lock:
                revision = job.revision
            try:
                result = worker()
            except Exception:
                with self._lock:
                    if revision != job.revision:
                        continue
                raise
            with self._lock:
                if revision == job.revision:
                    return result
