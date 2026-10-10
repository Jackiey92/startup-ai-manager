import json
import traceback
import urllib.error

import pytest

from app.model_provider import OpenAICompatibleProvider
from app.runtime_config import RuntimeConfig
from app.ports import LocalMemoryProvider, ModelUnavailable
from app.memory.archive.archive_service import ExtractionMemoryService
from app.memory.visual_extraction import generate_sidecars, page_images


def config(env):
    return RuntimeConfig.from_env(env={"SAM_MEMORY_ROOT_URI": "viking://sam-test/root", **env}).for_extraction(env)


def mock_response(monkeypatch, result, captured):
    class Response:
        def __enter__(self): return self
        def __exit__(self, *args): pass
        def read(self):
            return json.dumps({"choices": [{"message": {"content": json.dumps(result)}}]}).encode()
    def open_(request, **kwargs):
        captured.append(request)
        return Response()
    monkeypatch.setattr("urllib.request.urlopen", open_)


def test_multimodal_payload_and_injection(monkeypatch):
    env = {"SAM_LEADER_MODEL_API_KEY": "test-secret", "SAM_LEADER_MODEL": "custom-vision",
           "SAM_LEADER_MODEL_BASE_URL": "https://example.test/v1"}
    captured = []
    mock_response(monkeypatch, {"ok": True}, captured)
    provider = OpenAICompatibleProvider(env=env, config=config(env))
    assert provider.complete_json(system_prompt="system", payload={"text": "中文"},
                                  image_urls=["data:image/png;base64,AA=="]) == {"ok": True}
    request = captured[0]
    body = json.loads(request.data)
    assert body["model"] == "custom-vision"
    assert request.full_url == "https://example.test/v1/chat/completions"
    assert body["messages"][1]["content"] == [
        {"type": "text", "text": '{"text": "中文"}'},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,AA=="}},
    ]
    assert config({}).model_default == "qwen3.8-flash"


def test_missing_key_and_secret_safe_traceback(monkeypatch):
    provider = OpenAICompatibleProvider(env={}, config=config({}))
    with pytest.raises(ModelUnavailable):
        provider.complete_json(system_prompt="x", payload={})
    secret = "test-very-private-secret"
    def fail(*args, **kwargs):
        raise urllib.error.URLError(secret)
    monkeypatch.setattr("urllib.request.urlopen", fail)
    provider = OpenAICompatibleProvider(env={"SAM_LEADER_MODEL_API_KEY": secret}, config=config({}))
    with pytest.raises(ModelUnavailable) as exc:
        provider.complete_json(system_prompt="x", payload={})
    assert secret not in ''.join(traceback.format_exception(exc.value))


def manifest(format="txt"):
    return {"source_id": "source-1", "filename": "sample", "format": format,
            "file_hash": "a" * 64, "pages": [],
            "parse_summary": {"raw_bytes_external": False, "full_text_external": False}}


def test_sidecars_routes_and_no_prose_in_manifest(tmp_path, monkeypatch):
    memory = LocalMemoryProvider(tmp_path)
    data = manifest()
    record = ExtractionMemoryService(memory).ingest("acc-test", data)
    captured = []
    mock_response(monkeypatch, {"abstract": "定性摘要", "overview": "页面导航"}, captured)
    model = OpenAICompatibleProvider(env={"SAM_LEADER_MODEL_API_KEY": "mock"}, config=config({}))
    generate_sidecars(memory, model, data, abstract_uri=record.abstract_uri, overview_uri=record.overview_uri,
                      l2_manifest_uri=record.l2_manifest_uri)
    assert record.abstract_uri == record.l2_manifest_uri.removesuffix("/L2/manifest.json") + "/L0/abstract.md"
    assert record.overview_uri == record.l2_manifest_uri.removesuffix("/L2/manifest.json") + "/L1/overview.md"
    assert not any(item["uri"].endswith(("/.abstract.md", "/.overview.md")) for item in memory.query(prefix="viking://"))
    assert "定性摘要" in memory.read(record.abstract_uri)
    assert record.l2_manifest_uri in memory.read(record.overview_uri)
    saved = json.loads(memory.read(record.l2_manifest_uri))
    assert saved["ov_sidecar_uris"] == {"abstract_uri": record.abstract_uri, "overview_uri": record.overview_uri}
    assert "定性摘要" not in memory.read(record.l2_manifest_uri)


def test_pdf_renders_and_sends_pages(tmp_path, monkeypatch):
    import pymupdf as fitz
    path = tmp_path / "scan.pdf"
    with fitz.open() as doc:
        for _ in range(5):
            doc.new_page().insert_text((50, 50), "Vision test")
        doc.save(path)
    assert len(list(page_images(path, "pdf"))) == 5
    captured = []
    mock_response(monkeypatch, {"abstract": "summary", "overview": "navigation"}, captured)
    model = OpenAICompatibleProvider(env={"SAM_LEADER_MODEL_API_KEY": "mock"}, config=config({}))
    memory = LocalMemoryProvider(tmp_path / "memory")
    generate_sidecars(memory, model, manifest("pdf"), abstract_uri="viking://sam-test/L0/abstract.md", overview_uri="viking://sam-test/L1/overview.md",
                      l2_manifest_uri="viking://sam-test/L2/manifest.json", source_path=path)
    bodies = [json.loads(r.data) for r in captured]
    assert len(bodies) == 3
    assert [len(b["messages"][1]["content"]) for b in bodies[:2]] == [5, 2]
    assert isinstance(bodies[2]["messages"][1]["content"], str)


@pytest.mark.parametrize("result", [{}, {"abstract": "", "overview": "x"}, {"abstract": [], "overview": "x"}, []])
def test_invalid_results_do_not_write(tmp_path, monkeypatch, result):
    captured = []
    mock_response(monkeypatch, result, captured)
    model = OpenAICompatibleProvider(env={"SAM_LEADER_MODEL_API_KEY": "mock"}, config=config({}))
    memory = LocalMemoryProvider(tmp_path)
    with pytest.raises(ModelUnavailable):
        generate_sidecars(memory, model, manifest(), abstract_uri="viking://sam-test/L0/abstract.md", overview_uri="viking://sam-test/L1/overview.md",
                          l2_manifest_uri="viking://sam-test/L2/manifest.json")
    with pytest.raises(FileNotFoundError):
        memory.read("viking://resources/acc-test/.abstract.md")


def test_missing_visual_source_fails_closed(tmp_path):
    with pytest.raises(ModelUnavailable):
        list(page_images(None, "pdf"))
    assert list(page_images(None, "docx")) == []


def test_image_rendering(tmp_path):
    import pymupdf as fitz
    image = tmp_path / "scan.png"
    pixmap = fitz.Pixmap(fitz.csRGB, fitz.IRect(0, 0, 32, 32), False)
    pixmap.clear_with(255)
    pixmap.save(image)
    pages = list(page_images(image, "image"))
    assert len(pages) == 1
    assert pages[0][0] == 1
    assert pages[0][1].startswith("data:image/png;base64,")


def test_remote_image_rejected_before_http(monkeypatch):
    def unexpected(*args, **kwargs):
        pytest.fail("remote image must not reach HTTP")
    monkeypatch.setattr("urllib.request.urlopen", unexpected)
    model = OpenAICompatibleProvider(env={"SAM_LEADER_MODEL_API_KEY": "mock"}, config=config({}))
    with pytest.raises(ModelUnavailable):
        model.complete_json(system_prompt="x", payload={}, image_urls=["https://example.test/private"])

def test_reserved_write_coordinates_rejected_before_model(tmp_path):
    class NoModel:
        def complete_json(self, **kwargs):
            pytest.fail("invalid coordinates must fail before model invocation")
    with pytest.raises(ValueError, match="coordinates"):
        generate_sidecars(LocalMemoryProvider(tmp_path), NoModel(), manifest(),
                          abstract_uri="viking://resources/sample/.abstract.md",
                          overview_uri="viking://resources/sample/.overview.md",
                          l2_manifest_uri="viking://sam-test/L2/manifest.json")
