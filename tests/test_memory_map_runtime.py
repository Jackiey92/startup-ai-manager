import json
import subprocess
from dataclasses import replace
from pathlib import Path

from app.harness.runtime.openclaw_adapter import OpenClawAdapter
from app.harness.staging import StagingStore
from app.db.database import init_db
from app.storage import SourceFileStore
from app.runtime_config import RuntimeConfig


def test_agent_context_is_optional_and_deterministically_injected(tmp_path: Path):
    calls = []

    def runner(command, **kwargs):
        calls.append(command)
        payload = {"meta": {"finalAssistantVisibleText": "ok"}}
        return subprocess.CompletedProcess(command, 0, json.dumps(payload), "")

    config = RuntimeConfig.from_env(project_root=Path(__file__).parents[1], env={"SAM_PROFILE": "local"})
    config = replace(config, state_dir=tmp_path / "state", config_path=tmp_path / "state" / "openclaw.json")
    adapter = OpenClawAdapter(StagingStore(db_path=tmp_path / "missing.db"), config=config, runner=runner)
    adapter.run_agent_message("裸问题")
    assert calls[-1][calls[-1].index("--message") + 1] == "裸问题"
    mounted = json.loads(config.config_path.read_text(encoding="utf-8"))
    assert str(config.skill_root) in mounted["skills"]["load"]["extraDirs"]
    adapter.run_agent_message("问题", context_text="地图：viking://map/acme")
    prompt = calls[-1][calls[-1].index("--message") + 1]
    assert prompt == "地图：viking://map/acme\n\n用户问题：问题"
    assert (config.state_dir / "extensions" / "sam-memory").is_symlink()
    assert "sam_memory_map" in mounted["tools"]["allow"]
    assert "sam_promote" not in mounted["tools"]["allow"]
    assert "--local" not in calls[-1]


def test_agent_scope_is_injected_outside_prompt(tmp_path: Path):
    calls = []

    def runner(command, **kwargs):
        calls.append((command, kwargs))
        return subprocess.CompletedProcess(command, 0, json.dumps({"meta": {"finalAssistantVisibleText": "ok"}}), "")

    config = RuntimeConfig.from_env(project_root=Path(__file__).parents[1], env={"SAM_PROFILE": "local"})
    config = replace(config, state_dir=tmp_path / "state", config_path=tmp_path / "state" / "openclaw.json")
    adapter = OpenClawAdapter(StagingStore(db_path=tmp_path / "missing.db"), config=config, runner=runner)
    adapter.run_agent_message("问题", company_id="acme", thread_id="t1")
    env = calls[-1][1]["env"]
    assert env["SAM_COMPANY_ID"] == "acme"
    assert env["SAM_THREAD_ID"] == "t1"
    assert env["SAM_ALLOW_PROMOTE"] == "0"
    assert "acme" not in calls[-1][0][calls[-1][0].index("--message") + 1]


def test_runtime_injects_token_plan_provider_into_existing_config(tmp_path: Path):
    calls = []

    def runner(command, **kwargs):
        calls.append((command, kwargs))
        return subprocess.CompletedProcess(command, 0, json.dumps({"meta": {"finalAssistantVisibleText": "ok"}}), "")

    config = RuntimeConfig.from_env(
        project_root=Path(__file__).parents[1],
        env={"SAM_PROFILE": "local", "SAM_GUIDE_MODEL": "qwen3.8-max"},
    )
    config_path = tmp_path / "e2e-state" / "openclaw.json"
    config_path.parent.mkdir(parents=True)
    config_path.write_text(json.dumps({"agents": {"list": [{"id": "sam-guide"}]}}), encoding="utf-8")
    config = replace(config, state_dir=tmp_path / "state", config_path=config_path)
    adapter = OpenClawAdapter(StagingStore(db_path=tmp_path / "missing.db"), config=config, runner=runner)
    adapter.run_agent_message("问题")
    generated = json.loads(config_path.read_text(encoding="utf-8"))
    provider = generated["models"]["providers"]["token-plan"]
    assert provider["api"] == "openai-completions"
    assert provider["baseUrl"] == "${SAM_GUIDE_MODEL_BASE_URL}"
    assert provider["apiKey"] == "${SAM_GUIDE_MODEL_API_KEY}"
    assert generated["agents"]["entries"]["sam-guide"]["model"]["primary"] == "token-plan/${SAM_GUIDE_MODEL}"
    assert "list" not in generated["agents"]
    env = calls[-1][1]["env"]
    assert env["SAM_GUIDE_MODEL_BASE_URL"].endswith("/compatible-mode/v1")
    assert env["SAM_GUIDE_MODEL"] == "qwen3.8-max"


def test_gateway_mode_starts_one_daemon_and_reuses_it(tmp_path: Path, monkeypatch):
    import app.harness.runtime.openclaw_adapter as adapter_module

    agent_calls = []
    gateway_calls = []

    class FakeProcess:
        pid = 43210

        def poll(self):
            return None

        def terminate(self):
            return None

        def wait(self, timeout=None):
            return 0

        def kill(self):
            return None

    def fake_run(command, **kwargs):
        agent_calls.append(command)
        return subprocess.CompletedProcess(command, 0, json.dumps({"meta": {"finalAssistantVisibleText": "ok"}}), "")

    def fake_popen(command, **kwargs):
        gateway_calls.append(command)
        return FakeProcess()

    class ReadySocket:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return False

    monkeypatch.setattr(adapter_module.subprocess, "run", fake_run)
    monkeypatch.setattr(adapter_module.subprocess, "Popen", fake_popen)
    calls_to_socket = {"count": 0}

    def socket_connection(*args, **kwargs):
        calls_to_socket["count"] += 1
        # The first probe is the pre-spawn ownership check: no listener yet.
        if calls_to_socket["count"] == 1:
            raise OSError("not listening")
        return ReadySocket()

    monkeypatch.setattr(adapter_module.socket, "create_connection", socket_connection)

    config = RuntimeConfig.from_env(project_root=Path(__file__).parents[1], env={"SAM_PROFILE": "local"})
    config = replace(config, state_dir=tmp_path / "state", config_path=tmp_path / "state" / "openclaw.json")
    adapter = OpenClawAdapter(StagingStore(db_path=tmp_path / "missing.db"), config=config)
    adapter.run_agent_message("第一问")
    adapter.run_agent_message("第二问")
    assert len(gateway_calls) == 1
    assert all("--local" not in command for command in agent_calls)
    adapter_module._stop_gateways()


def test_gateway_rejects_unknown_listener_instead_of_reusing_wrong_config(tmp_path: Path, monkeypatch):
    import app.harness.runtime.openclaw_adapter as adapter_module

    class ReadySocket:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return False

    monkeypatch.setattr(adapter_module.socket, "create_connection", lambda *args, **kwargs: ReadySocket())
    config = RuntimeConfig.from_env(project_root=Path(__file__).parents[1], env={"SAM_PROFILE": "local"})
    config = replace(config, state_dir=tmp_path / "state", config_path=tmp_path / "state" / "openclaw.json")
    adapter = OpenClawAdapter(StagingStore(db_path=tmp_path / "missing.db"), config=config)
    try:
        adapter._ensure_gateway({}, timeout=1)
    except RuntimeError as exc:
        assert "unverified process" in str(exc)
    else:  # pragma: no cover - must never reuse an unknown listener
        raise AssertionError("unknown Gateway listener was reused")


def test_gateway_fingerprint_binds_state_port_and_effective_model(tmp_path: Path):
    config = RuntimeConfig.from_env(project_root=Path(__file__).parents[1], env={"SAM_PROFILE": "local"})
    config = replace(config, state_dir=tmp_path / "state", config_path=tmp_path / "state" / "openclaw.json")
    config.state_dir.mkdir(parents=True)
    config.config_path.write_text("{}", encoding="utf-8")
    adapter = OpenClawAdapter(StagingStore(db_path=tmp_path / "missing.db"), config=config)
    first = adapter._gateway_fingerprint({"SAM_GUIDE_MODEL": "deepseek-v4.1-flash"})
    second = adapter._gateway_fingerprint({"SAM_GUIDE_MODEL": "another-model"})
    assert first != second


def test_document_ingest_runs_deterministic_bridge_without_agent(tmp_path: Path):
    db_path = tmp_path / "app.db"
    objects = tmp_path / "objects"
    init_db(db_path)
    stored = SourceFileStore(objects_path=objects, db_path=db_path).put_bytes(
        b"xlsx", original_name="report.xlsx"
    )
    calls = []

    def runner(command, **kwargs):
        calls.append((command, kwargs))
        payload = {
            "source_id": stored.file_hash,
            "file_hash": stored.file_hash,
            "filename": "report.xlsx",
            "format": "xlsx",
            "pages": [{"page_no": 1, "text_items": [], "tables": []}],
            "images": [],
            "parse_summary": {
                "status": "parsed", "raw_bytes_external": False,
                "full_text_external": False,
            },
        }
        return subprocess.CompletedProcess(command, 0, json.dumps(payload), "")

    config = RuntimeConfig.from_env(project_root=Path(__file__).parents[1], env={"SAM_PROFILE": "local"})
    adapter = OpenClawAdapter(
        StagingStore(db_path=db_path), config=config, objects_dir=objects,
        db_path=db_path, runner=runner,
    )
    staging_id = adapter.run_parse(stored.file_hash, "xlsx")
    staged = StagingStore(db_path=db_path).get(staging_id)
    assert staged["payload"]["parse_summary"]["status"] == "parsed"
    assert "document-ingest/scripts/bridge" in calls[0][0][1]
    assert "--message" not in calls[0][0]
