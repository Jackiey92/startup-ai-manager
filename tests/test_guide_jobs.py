from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from threading import Event

from app.guidance.jobs import GuideJobCoordinator


def test_upload_during_generation_reruns_one_shared_job_with_latest_snapshot():
    release_first = Event()
    first_started = Event()
    calls: list[int] = []

    def worker():
        calls.append(len(calls) + 1)
        if len(calls) == 1:
            first_started.set()
            assert release_first.wait(timeout=1)
        return {"revision": len(calls)}

    with ThreadPoolExecutor(max_workers=1) as executor:
        coordinator = GuideJobCoordinator(executor)
        job = coordinator.queue("acme:import-guide", worker)
        assert first_started.wait(timeout=1)
        coordinator.queue("acme:import-guide", worker)
        release_first.set()
        assert coordinator.wait(job, timeout=1) == {"revision": 2}
        assert calls == [1, 2]


def test_refresh_reuses_inflight_job_and_reports_generating_on_deadline():
    release = Event()

    def worker():
        assert release.wait(timeout=1)
        return {"message": "ready"}

    with ThreadPoolExecutor(max_workers=1) as executor:
        coordinator = GuideJobCoordinator(executor)
        job = coordinator.queue("acme:import-guide", worker)
        assert coordinator.get_or_start("acme:import-guide", worker) is job
        assert coordinator.wait(job, timeout=0.001) is None
        assert coordinator.status("acme:import-guide") == "generating"
        release.set()
        assert coordinator.wait(job, timeout=1) == {"message": "ready"}
        assert coordinator.status("acme:import-guide") == "ready"
