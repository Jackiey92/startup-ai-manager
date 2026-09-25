import json
import subprocess
from pathlib import Path

from app.harness.runtime.openclaw_adapter import OpenClawAdapter
from app.harness.staging import StagingStore
from app.runtime_config import RuntimeConfig


def test_agent_context_is_optional_and_deterministically_injected(tmp_path: Path):
    calls = []

    def runner(command, **kwargs):
        calls.append(command)
        payload = {"meta": {"finalAssistantVisibleText": "ok"}}
        return subprocess.CompletedProcess(command, 0, json.dumps(payload), "")

    config = RuntimeConfig.from_env(project_root=Path(__file__).parents[1], env={"SAM_PROFILE": "local"})
    adapter = OpenClawAdapter(StagingStore(db_path=tmp_path / "missing.db"), config=config, runner=runner)
    adapter.run_agent_message("裸问题")
    assert calls[-1][calls[-1].index("--message") + 1] == "裸问题"
    adapter.run_agent_message("问题", context_text="地图：viking://map/acme")
    prompt = calls[-1][calls[-1].index("--message") + 1]
    assert prompt == "地图：viking://map/acme\n\n用户问题：问题"
