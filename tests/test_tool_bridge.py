import json
import subprocess
from pathlib import Path

from app.memory_map import ROOT
from app.ports import LocalMemoryProvider
from app.tool_bridge import ToolBridge, handle_request, serve


class Files:
    def __init__(self, file_hash):
        self.file_hash = file_hash

    def get(self, file_hash):
        if file_hash != self.file_hash:
            raise KeyError(file_hash)
        return type("Stored", (), {
            "file_hash": file_hash, "original_name": "x.pdf", "mime_type": "application/pdf",
            "size_bytes": 3, "storage_path": "aa/blob",
        })()


def make_bridge(tmp_path):
    memory = LocalMemoryProvider(tmp_path / "memory")
    digest = "a" * 64
    manifest = f'{ROOT}/2a_extraction/acme/s1/L2/manifest.json'
    memory.put(manifest, json.dumps({"file_hash": digest}))
    memory.put(f"{ROOT}/2a_extraction/acme/s1/L0/abstract.md", "summary")
    return ToolBridge(memory, Files(digest), company_id="acme", thread_id="t1")


def test_json_rpc_frames_and_scoped_tools(tmp_path):
    bridge = make_bridge(tmp_path)
    response = handle_request(bridge, {"id": 1, "method": "sam_memory_read", "params": {
        "uri": f"{ROOT}/2a_extraction/acme/s1/L0/abstract.md"
    }})
    assert response == {"id": 1, "ok": True, "result": "summary"}
    denied = handle_request(bridge, {"id": 2, "method": "sam_memory_read", "params": {
        "uri": f"{ROOT}/2a_extraction/other/s1/L0/abstract.md"
    }})
    assert denied["ok"] is False and denied["error"]["code"] == "denied"
    injected = handle_request(bridge, {"id": 3, "method": "sam_thread_list", "params": {"company_id": "other"}})
    assert injected["ok"] is False and injected["error"]["code"] == "bad_request"


def test_bridge_redacts_provider_errors_and_serve_frames(tmp_path):
    bridge = make_bridge(tmp_path)
    result = handle_request(bridge, {"id": 4, "method": "sam_memory_read", "params": {
        "uri": "viking://evil/outside"
    }})
    assert "evil" not in json.dumps(result)
    assert result["error"]["code"] == "denied"
    from io import StringIO
    output = StringIO()
    serve(bridge, StringIO('{"id":5,"method":"sam_thread_list","params":{}}\nnot-json\n'), output)
    rows = [json.loads(line) for line in output.getvalue().splitlines()]
    assert rows[0]["id"] == 5 and rows[0]["ok"] is True
    assert rows[1]["ok"] is False and rows[1]["error"]["code"] == "bad_request"


def test_promote_is_disabled_by_default_and_external_hash_is_rejected(tmp_path):
    bridge = make_bridge(tmp_path)
    disabled = handle_request(bridge, {"id": 6, "method": "sam_promote", "params": {
        "fact_key": "x", "fact": {"status": "verified"}
    }})
    assert disabled["error"]["code"] == "denied"
    bad_hash = handle_request(bridge, {"id": 7, "method": "sam_file_get", "params": {"file_hash": "b" * 64}})
    assert bad_hash["error"]["code"] == "denied"


def test_plugin_syntax_and_registration_shape():
    plugin = Path(__file__).parents[1] / "harness-openclaw" / "plugins" / "sam-memory" / "index.js"
    checked = subprocess.run(["node", "--check", str(plugin)], capture_output=True, text=True)
    assert checked.returncode == 0, checked.stderr
    script = """
const p = require(process.argv[1]); const names=[];
p.register({registerTool(spec) { names.push(spec.name); if (spec.optional !== (spec.name === 'sam_promote')) process.exit(2); }});
if (names.length !== 7 || !names.includes('sam_memory_search')) process.exit(3);
"""
    ran = subprocess.run(["node", "-e", script, str(plugin)], capture_output=True, text=True)
    assert ran.returncode == 0, ran.stderr
