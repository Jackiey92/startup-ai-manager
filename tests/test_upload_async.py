from __future__ import annotations

import time
import sys
from threading import Event
from app.guidance.import_guide import _GuideError
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / "webapp"))
import webapp.app as webapp


def test_import_guide_is_queued_without_waiting_for_agent(monkeypatch) -> None:
    started = []

    def slow_guide(**kwargs):
        started.append(kwargs)
        time.sleep(0.15)
        return {}

    # The true acceptance harness sets a company scope. This unit test asserts
    # the documented no-environment fallback, so isolate it from that parent.
    monkeypatch.delenv("SAM_COMPANY_ID", raising=False)
    monkeypatch.setattr(webapp, "import_guide", slow_guide)
    monkeypatch.setattr(webapp._GUIDE_COORDINATOR, "_debounce_seconds", 0)
    begin = time.monotonic()
    webapp.queue_import_guide("a" * 64)
    elapsed = time.monotonic() - begin
    assert elapsed < 0.1
    deadline = time.monotonic() + 2
    while not started and time.monotonic() < deadline:
        time.sleep(0.01)
    assert started == [{"event": "upload", "uploaded_file_hash": "a" * 64, "company_id": "default"}]


def test_refresh_reuses_inflight_guide_instead_of_returning_bare_503(monkeypatch) -> None:
    release = Event()
    company = "concurrent-test-company"

    def slow_guide(**kwargs):
        assert release.wait(timeout=1)
        return {"message": "ready"}

    monkeypatch.setattr(webapp, "import_guide", slow_guide)
    monkeypatch.setattr(webapp._GUIDE_COORDINATOR, "_debounce_seconds", 0)
    monkeypatch.setenv("SAM_GUIDE_REFRESH_WAIT", "0.001")
    webapp.queue_import_guide("b" * 64, company_id=company)
    response = webapp.app.test_client().post("/api/import-guide", json={"event": "refresh", "company_id": company})
    assert response.status_code == 202
    assert response.get_json()["guide_status"] == "generating"
    release.set()


def test_invalid_gateway_envelope_is_saved_locally_and_redacted(monkeypatch, tmp_path: Path) -> None:
    monkeypatch.setattr(webapp, "DATA_ROOT", tmp_path)
    webapp._record_guide_diagnostic(
        "acme", _GuideError("bad", reason="invalid_json", raw_response='Bearer abcdefghijklmnopqrstuvwxyz sk-secretvalue123456'),
    )
    files = list((tmp_path / "guide-diagnostics").glob("*.json"))
    assert len(files) == 1
    text = files[0].read_text(encoding="utf-8")
    assert "[REDACTED]" in text
    assert "secretvalue" not in text
