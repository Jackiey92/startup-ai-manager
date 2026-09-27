import json
import sqlite3
from types import SimpleNamespace

from app.guidance.import_guide import ImportGuideService, _GuideError, _decode_agent_json


class FakeStore:
    def list_files(self, *, origin_zone=None):
        return [SimpleNamespace(
            file_hash="a" * 64,
            original_name="财务报告.xlsx",
            size_bytes=10,
            uploaded_at="2026-09-27T00:00:00Z",
        )]


class FakeRuntime:
    def __init__(self, outputs):
        self.outputs = list(outputs)
        self.calls = []

    def run_agent_message(self, message, **kwargs):
        self.calls.append((message, kwargs))
        output = self.outputs.pop(0)
        if isinstance(output, Exception):
            raise output
        return output


def _db(tmp_path, text):
    path = tmp_path / "app.db"
    with sqlite3.connect(path) as conn:
        conn.execute("CREATE TABLE parse_staging (id INTEGER PRIMARY KEY, file_hash TEXT, format TEXT, payload TEXT, status TEXT)")
        conn.execute("INSERT INTO parse_staging VALUES (1, ?, 'xlsx', ?, 'pending')", ("a" * 64, json.dumps({
            "source_id": "source-a",
            "file_hash": "a" * 64,
            "filename": "财务报告.xlsx",
            "format": "xlsx",
            "pages": [{"page_no": 1, "text": text, "tables": [["指标", "数值"]]}],
            "parse_summary": {"parsed_files": 1},
        }, ensure_ascii=False),))
        conn.commit()
    return path


def _guide(message="基于内容生成"):
    return json.dumps({
        "meta": {"finalAssistantVisibleText": json.dumps({
            "message": message,
            "next_action": "补充主体资料",
            "completeness": {"percent": 20, "received": ["财务"], "missing": ["主体"]},
        }, ensure_ascii=False)},
        "payloads": [],
    }, ensure_ascii=False)


def test_import_guide_uses_main_agent_and_parsed_content(tmp_path):
    runtime = FakeRuntime([_guide()])
    service = ImportGuideService(
        store=FakeStore(), db_path=_db(tmp_path, "营业收入 4820 万元"),
        runtime_provider=runtime, company_id="acme", env={"SAM_GUIDE_RETRIES": "1"}, sleep=lambda _: None,
    )
    result = service.generate(event="upload", uploaded_file_hash="a" * 64)
    assert result["completeness"]["percent"] == 20
    assert len(runtime.calls) == 1
    context = runtime.calls[0][1]["context_text"]
    assert "营业收入 4820 万元" in context
    assert "2a_extraction/acme/source-a/L2/manifest.json" in context
    assert runtime.calls[0][1]["allow_promote"] is False


def test_import_guide_retries_rate_limit_and_returns_classified_invalid_json(tmp_path):
    runtime = FakeRuntime([RuntimeError("HTTP 429 rate limit"), _guide("重试后成功")])
    service = ImportGuideService(
        store=FakeStore(), db_path=_db(tmp_path, "收入 A"), runtime_provider=runtime,
        env={"SAM_GUIDE_RETRIES": "2", "SAM_GUIDE_RETRY_BACKOFF": "0"}, sleep=lambda _: None,
    )
    assert service.generate(event="refresh")["message"] == "重试后成功"
    assert len(runtime.calls) == 2


def test_import_guide_decodes_gateway_jsonl_final_envelope():
    guide = {
        "message": "基于已解析内容生成",
        "next_action": "补主体材料",
        "completeness": {"percent": 25, "received": ["财务"], "missing": ["主体"]},
    }
    raw = "\n".join([
        json.dumps({"type": "tool", "payload": {"text": "tool frame"}}, ensure_ascii=False),
        json.dumps({"meta": {"finalAssistantVisibleText": json.dumps(guide, ensure_ascii=False)}}, ensure_ascii=False),
    ])
    assert _decode_agent_json(raw) == guide


def test_import_guide_invalid_json_keeps_bounded_raw_envelope():
    raw = '{"type":"tool"}\nnot-json'
    try:
        _decode_agent_json(raw)
    except _GuideError as exc:
        assert exc.reason == "invalid_json"
        assert exc.raw_response == raw
    else:  # pragma: no cover - documents the expected rejection path
        raise AssertionError("invalid Gateway output must not be accepted")


def test_import_guide_retries_invalid_gateway_envelope(tmp_path):
    runtime = FakeRuntime(['{"type":"tool"}\ntruncated', _guide("重试后有效")])
    service = ImportGuideService(
        store=FakeStore(), db_path=_db(tmp_path, "收入 A"), runtime_provider=runtime,
        env={"SAM_GUIDE_RETRIES": "2", "SAM_GUIDE_RETRY_BACKOFF": "0"}, sleep=lambda _: None,
    )
    assert service.generate(event="refresh")["message"] == "重试后有效"
    assert len(runtime.calls) == 2
