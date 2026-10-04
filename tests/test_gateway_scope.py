from __future__ import annotations

import base64
import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "harness-openclaw/plugins/sam-memory/index.js"


def _part(value: str) -> str:
    return base64.urlsafe_b64encode(value.encode()).decode().rstrip("=")


def _node(expression: str) -> object:
    result = subprocess.run(
        ["node", "-e", expression], cwd=ROOT, check=True,
        capture_output=True, text=True,
    )
    return json.loads(result.stdout)


def test_plugin_before_hook_derives_scope_once_and_rejects_model_scope() -> None:
    session_id = f"sam-scope.{_part('company-a')}.{_part('thread-7')}.nonce"
    expression = f"""
const mod = require({str(PLUGIN)!r});
const p = mod._private;
let hook;
mod.register({{on: (name, fn) => hook = fn, registerTool: () => {{}}}});
hook({{toolName: 'sam_memory_map', toolCallId: 'call-1'}}, {{sessionId: {session_id!r}, toolCallId: 'call-1'}});
const scope = p.takeExecutionScope('call-1');
const consumed = p.takeExecutionScope('call-1');
let rejected = false;
try {{ p.validate('sam_memory_map', {{scope: 'company-a'}}); }} catch (_) {{ rejected = true; }}
console.log(JSON.stringify({{scope, consumed, rejected}}));
"""
    assert _node(expression) == {
        "scope": {"companyId": "company-a", "threadId": "thread-7"},
        "consumed": None,
        "rejected": True,
    }


def test_scope_identity_is_request_specific() -> None:
    expression = f"""
const p = require({str(PLUGIN)!r})._private;
const a = p.scopeFromSessionId({('sam-scope.' + _part('a') + '.' + _part('t1') + '.x')!r});
const b = p.scopeFromSessionId({('sam-scope.' + _part('b') + '.' + _part('t2') + '.y')!r});
console.log(JSON.stringify({{a, b, different: a.companyId !== b.companyId && a.threadId !== b.threadId}}));
"""
    assert _node(expression)["different"] is True


def test_manager_session_derives_trusted_global_read_role() -> None:
    expression = f"""
const p = require({str(PLUGIN)!r})._private;
const scope = p.scopeFromSessionId({('sam-manager.' + _part('all') + '.' + _part('manager-thread') + '.x')!r});
console.log(JSON.stringify(scope));
"""
    assert _node(expression) == {
        "companyId": "all", "threadId": "manager-thread", "role": "manager",
    }
