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


def test_plugin_derives_scope_from_trusted_session_context_and_rejects_model_scope() -> None:
    session_id = f"sam-scope.{_part('company-a')}.{_part('thread-7')}.nonce"
    expression = f"""
const p = require({str(PLUGIN)!r})._private;
const ctx = {{sessionManager: {{getSessionTarget: () => ({{sessionId: {session_id!r}}})}}}};
const scope = p.executionScope(['call-1', {{}}, null, ctx]);
let rejected = false;
try {{ p.validate('sam_memory_map', {{scope: 'company-a'}}); }} catch (_) {{ rejected = true; }}
console.log(JSON.stringify({{scope, rejected}}));
"""
    assert _node(expression) == {
        "scope": {"companyId": "company-a", "threadId": "thread-7"},
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

