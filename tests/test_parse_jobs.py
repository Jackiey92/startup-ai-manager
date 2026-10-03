from __future__ import annotations

import time
from threading import Barrier, Event, Lock
from pathlib import Path

from app.db.database import connect, init_db
from app.parse_jobs import ParseJobCanceled, ParseJobManager
from app.ports import RetryableRuntimeError


def _wait_for(manager: ParseJobManager, job_id: str, predicate, timeout: float = 2.0):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        job = manager.get(job_id)
        if predicate(job):
            return job
        time.sleep(0.01)
    return manager.get(job_id)


def _manager(tmp_path: Path, worker, cancel_parser=None, workers=1):
    db = tmp_path / "app.db"
    init_db(db)
    digest = "a" * 64
    with connect(db) as conn:
        conn.execute(
            "INSERT INTO source_files(file_hash,original_name,size_bytes,storage_path,origin_zone,uploaded_at) "
            "VALUES (?,?,?,?,?,?)",
            (digest, "sample.pdf", 1, str(tmp_path / "sample.pdf"), "internal", "now"),
        )
        conn.commit()
    return ParseJobManager(db, worker, cancel_parser=cancel_parser, workers=workers), digest


def _create(manager, digest, name="sample.pdf"):
    return manager.create(
        company_id="acme", file_hash=digest, original_name=name,
        file_format="pdf", harness_format="pdf", size_bytes=1,
    )


def test_parse_job_records_real_progress_and_newest_first(tmp_path: Path):
    def worker(job, progress, event):
        progress(stage="parsing", current=1, total=3, message="读取第 1 页")
        progress(stage="parsing", current=3, total=3, message="解析完成")

    manager, digest = _manager(tmp_path, worker)
    try:
        first = _create(manager, digest)
        done = _wait_for(manager, first["job_id"], lambda j: j["status"] == "done")
        assert done["stage"] == "done"
        assert done["progress_current"] == 3
        assert done["progress_total"] == 3
        second = _create(manager, digest, "second.pdf")
        _wait_for(manager, second["job_id"], lambda j: j["status"] == "done")
        assert [j["job_id"] for j in manager.list(company_id="acme")][:2] == [second["job_id"], first["job_id"]]
    finally:
        manager.close()


def test_cancel_queued_job_never_runs_worker(tmp_path: Path):
    started = Event()
    release = Event()
    calls = []

    def worker(job, progress, event):
        calls.append(job["job_id"])
        started.set()
        release.wait(2)

    manager, digest = _manager(tmp_path, worker)
    try:
        first = _create(manager, digest)
        assert started.wait(1)
        second = _create(manager, digest, "queued.pdf")
        canceled = manager.cancel(second["job_id"])
        assert canceled["status"] == "canceled"
        assert _wait_for(manager, second["job_id"], lambda j: j["status"] == "canceled")["status"] == "canceled"
        assert calls == [first["job_id"]]
        release.set()
        assert _wait_for(manager, first["job_id"], lambda j: j["status"] == "done")["status"] == "done"
    finally:
        release.set()
        manager.close()


def test_cancel_parsing_calls_only_private_parser_and_leaves_shared_daemon(tmp_path: Path):
    started = Event()
    cancel_calls = []

    def cancel_parser(file_hash):
        cancel_calls.append(file_hash)
        return True

    def worker(job, progress, event):
        progress(stage="parsing", message="bridge")
        started.set()
        while not event.is_set():
            time.sleep(0.01)
        raise ParseJobCanceled("private bridge stopped")

    manager, digest = _manager(tmp_path, worker, cancel_parser=cancel_parser)
    try:
        job = _create(manager, digest)
        assert started.wait(1)
        _wait_for(manager, job["job_id"], lambda j: j["status"] == "parsing")
        manager.cancel(job["job_id"])
        final = _wait_for(manager, job["job_id"], lambda j: j["status"] == "canceled")
        assert final["status"] == "canceled"
        assert cancel_calls == [digest]
    finally:
        manager.close()


def test_cancel_is_rejected_inside_short_consolidation_critical_section(tmp_path: Path):
    started = Event()
    release = Event()

    def worker(job, progress, event):
        progress(stage="consolidating", critical=True, message="本地写入")
        started.set()
        release.wait(2)

    manager, digest = _manager(tmp_path, worker)
    try:
        job = _create(manager, digest)
        assert started.wait(1)
        _wait_for(manager, job["job_id"], lambda j: j["stage"] == "consolidating")
        try:
            manager.cancel(job["job_id"])
        except RuntimeError as exc:
            assert "consolidation" in str(exc)
        else:
            raise AssertionError("cancellation must be rejected during consolidation")
        release.set()
        assert _wait_for(manager, job["job_id"], lambda j: j["status"] == "done")["status"] == "done"
    finally:
        release.set()
        manager.close()


def test_canceled_queued_job_cleans_worker_event_and_can_retry(tmp_path: Path):
    started = Event()
    release = Event()
    calls = []

    def worker(job, progress, event):
        calls.append(job["job_id"])
        if len(calls) == 1:
            started.set()
            release.wait(2)

    manager, digest = _manager(tmp_path, worker)
    try:
        first = _create(manager, digest)
        assert started.wait(1)
        second = _create(manager, digest, "retry-me.pdf")
        assert manager.cancel(second["job_id"])["status"] == "canceled"
        release.set()
        _wait_for(manager, first["job_id"], lambda j: j["status"] == "done")
        _wait_for(manager, second["job_id"], lambda j: j["status"] == "canceled")
        retried = manager.retry(second["job_id"])
        assert retried["status"] in {"queued", "parsing", "done"}
        assert _wait_for(manager, second["job_id"], lambda j: j["status"] == "done")["status"] == "done"
    finally:
        release.set()
        manager.close()


def test_parse_jobs_isolate_one_slow_instance_from_other_jobs(tmp_path: Path):
    slow_started = Event()
    release = Event()

    def worker(job, progress, event):
        if job["original_name"] == "slow.pdf":
            slow_started.set()
            release.wait(2)
        progress(stage="parsing", current=1, total=1, message="done")

    manager, digest = _manager(tmp_path, worker, workers=2)
    try:
        slow = _create(manager, digest, "slow.pdf")
        assert slow_started.wait(1)
        fast = _create(manager, digest, "fast.pdf")
        assert _wait_for(manager, fast["job_id"], lambda j: j["status"] == "done")["status"] == "done"
        assert manager.get(slow["job_id"])["status"] == "parsing"
    finally:
        release.set()
        manager.close()


def test_parse_job_failure_does_not_block_other_pool_instance(tmp_path: Path):
    def worker(job, progress, event):
        if job["original_name"] == "bad.pdf":
            raise RuntimeError("only this document failed")
        progress(stage="parsing", current=1, total=1, message="done")

    manager, digest = _manager(tmp_path, worker, workers=2)
    try:
        bad = _create(manager, digest, "bad.pdf")
        fast = _create(manager, digest, "fast.pdf")
        bad_done = _wait_for(manager, bad["job_id"], lambda j: j["status"] == "failed")
        fast_done = _wait_for(manager, fast["job_id"], lambda j: j["status"] == "done")
        assert bad_done["error_kind"] == "engine"
        assert fast_done["status"] == "done"
    finally:
        manager.close()


def test_parse_workers_are_capped_by_configured_upper_bound(tmp_path: Path, monkeypatch):
    monkeypatch.setenv("SAM_PARSE_CONCURRENCY", "99")
    monkeypatch.setenv("SAM_PARSE_CONCURRENCY_MAX", "2")
    manager, _ = _manager(tmp_path, lambda *_args: None, workers=None)
    try:
        assert manager.executor._max_workers == 2
    finally:
        manager.close()


def test_default_parse_pool_starts_four_workers_and_emits_startup_count(tmp_path: Path, monkeypatch):
    monkeypatch.delenv("SAM_PARSE_CONCURRENCY", raising=False)
    monkeypatch.delenv("SAM_PARSE_WORKERS", raising=False)
    monkeypatch.delenv("SAM_PARSE_CONCURRENCY_MAX", raising=False)
    monkeypatch.delenv("SAM_PARSE_WORKERS_MAX", raising=False)
    manager, _ = _manager(tmp_path, lambda *_args: None, workers=None)
    try:
        assert manager.worker_count == 4
        assert manager.executor._max_workers == 4
        assert manager.startup_log_line.startswith("parse workers=4")
    finally:
        manager.close()


def test_four_jobs_enter_parsing_at_the_same_time(tmp_path: Path):
    entered = Barrier(4)
    entered_names = []
    names_lock = Lock()
    all_entered = Event()
    release = Event()

    def worker(job, progress, event):
        progress(stage="parsing", current=0, total=1, message="started")
        with names_lock:
            entered_names.append(job["job_id"])
            if len(entered_names) == 4:
                all_entered.set()
        entered.wait(timeout=2)
        release.wait(timeout=2)
        progress(stage="parsing", current=1, total=1, message="done")

    manager, digest = _manager(tmp_path, worker, workers=4)
    try:
        jobs = [_create(manager, digest, f"parallel-{index}.pdf") for index in range(4)]
        assert all_entered.wait(timeout=2)
        assert len(set(entered_names)) == 4
        assert all(manager.get(job["job_id"])["stage"] == "parsing" for job in jobs)
        release.set()
        assert all(_wait_for(manager, job["job_id"], lambda row: row["status"] == "done")["status"] == "done" for job in jobs)
    finally:
        release.set()
        manager.close()


def test_retryable_runtime_error_is_requeued_instead_of_failed(tmp_path: Path, monkeypatch):
    calls = []

    def worker(job, progress, event):
        calls.append(job["job_id"])
        if len(calls) == 1:
            raise RetryableRuntimeError("gateway not ready")

    monkeypatch.setenv("SAM_RUNTIME_RETRIES", "2")
    manager, digest = _manager(tmp_path, worker)
    try:
        job = _create(manager, digest)
        done = _wait_for(manager, job["job_id"], lambda j: j["status"] == "done", timeout=3)
        assert done["status"] == "done"
        assert len(calls) == 2
    finally:
        manager.close()
