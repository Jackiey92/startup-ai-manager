from __future__ import annotations

import json
import subprocess
from pathlib import Path

import pytest

from app.ports import LocalMemoryProvider
from app.runtime_config import RuntimeConfig


ROOT = Path(__file__).resolve().parents[1]


def test_local_profile_injects_paths_and_skills() -> None:
    config = RuntimeConfig.from_env(project_root=ROOT, env={"SAM_PROFILE": "local"})
    assert config.project_root == ROOT
    assert config.harness_root == ROOT / "harness-openclaw"
    assert config.objects_dir == ROOT / "data" / "objects"
    assert config.main_db == ROOT / "data" / "app.db"
    assert config.skill_for_format["pdf"] == "document-ingest"
    assert config.memory_provider == "local"
    assert config.gateway_port == 18790
    assert config.gateway_port != 18789


def test_cloud_profile_is_a_portable_path_overlay() -> None:
    config = RuntimeConfig.from_env(project_root=ROOT, env={"SAM_PROFILE": "cloud"})
    assert config.project_root == Path("/opt/sam/workspace")
    assert config.harness_root == Path("/opt/sam/workspace/harness-openclaw")
    assert config.main_db == Path("/opt/sam/workspace/data/app.db")
    assert config.memory_provider == "openviking"


def test_environment_can_override_skill_map_and_model_names() -> None:
    config = RuntimeConfig.from_env(
        project_root=ROOT,
        env={
            "SAM_PROFILE": "local",
            "SAM_SKILL_MAP": json.dumps({"pdf": "custom-pdf"}),
            "SAM_MODEL_NAME_ENV": "MODEL_NAME",
            "SAM_MODEL_API_KEY_ENV": "MODEL_KEY",
        },
    )
    assert config.skill_for_format == {"pdf": "custom-pdf"}
    assert config.model_name_env == "MODEL_NAME"
    assert config.model_api_key_env == "MODEL_KEY"


def test_openclaw_gateway_port_has_explicit_env_alias() -> None:
    config = RuntimeConfig.from_env(
        project_root=ROOT,
        env={"SAM_PROFILE": "local", "OPENCLAW_GATEWAY_PORT": "18791"},
    )
    assert config.gateway_port == 18791


def test_local_memory_enforces_verified_2b_and_supports_search(tmp_path: Path) -> None:
    memory = LocalMemoryProvider(tmp_path)
    with pytest.raises(ValueError):
        memory.put_fact("acme", "runway", {"status": "claimed", "months": 3})
    memory.put_fact("acme", "runway", {"status": "verified", "months": 12})
    assert memory.get_2b("acme", "runway")["months"] == 12
    assert memory.search("months", prefix="viking://user/default")[0]["content"]


def test_application_sources_have_no_windows_runtime_literals() -> None:
    sources = list((ROOT / "app").rglob("*.py")) + [ROOT / "webapp" / "app.py"]
    text = "\n".join(path.read_text(encoding="utf-8") for path in sources)
    assert "C:\\Users\\" not in text
    assert "C:\\Program Files\\" not in text
    assert "SKILL_FOR_FORMAT" not in text


def test_bridge_interpreter_keeps_venv_symlink_and_prefix() -> None:
    interpreter = ROOT / ".sam-isolated" / "venv" / "bin" / "python"
    if not interpreter.is_file():
        pytest.skip("isolated venv is not present in this checkout")
    config = RuntimeConfig.from_env(
        project_root=ROOT,
        env={"SAM_PROFILE": "local", "SAM_TOOL_BRIDGE_PYTHON": str(interpreter)},
    )
    assert config.tool_bridge_python == interpreter
    assert "venv" in config.tool_bridge_python.parts
    result = subprocess.run(
        [str(config.tool_bridge_python), "-c", "import docling,sys; print(sys.prefix)"],
        check=True,
        capture_output=True,
        text=True,
    )
    assert result.stdout.strip() == str(ROOT / ".sam-isolated" / "venv")


def test_default_bridge_prefers_isolated_parser_venv_when_present() -> None:
    isolated = ROOT / ".sam-isolated" / "venv" / "bin" / "python"
    if not isolated.is_file():
        pytest.skip("isolated venv is not present in this checkout")
    config = RuntimeConfig.from_env(project_root=ROOT, env={"SAM_PROFILE": "local"})
    assert config.tool_bridge_python == isolated
