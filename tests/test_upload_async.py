from __future__ import annotations

import time
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / "webapp"))
import webapp.app as webapp


def test_import_guide_is_queued_without_waiting_for_agent(monkeypatch) -> None:
    started = []

    def slow_guide(**kwargs):
        started.append(kwargs)
        time.sleep(0.15)
        return {}

    monkeypatch.setattr(webapp, "import_guide", slow_guide)
    begin = time.monotonic()
    webapp.queue_import_guide("a" * 64)
    elapsed = time.monotonic() - begin
    assert elapsed < 0.1
    deadline = time.monotonic() + 2
    while not started and time.monotonic() < deadline:
        time.sleep(0.01)
    assert started == [{"event": "upload", "uploaded_file_hash": "a" * 64}]
