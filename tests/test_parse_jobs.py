from __future__ import annotations

import time
from threading import Event
from pathlib import Path

from app.db.database import connect, init_db
from app.parse_jobs import ParseJobCanceled, ParseJobManager


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
