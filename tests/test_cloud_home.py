"""Cloud transport/assembly contracts; no OV, models or production data."""
from copy import deepcopy
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

import pytest

ROOT = Path(__file__).resolve().parents[1]


def snapshot():
    return {"version": 1, "company_id": "acc-cloud", "pushed_at": 1.5, "payload": {
        "page_context": {"facts": [{"extra": "事实原文"}], "todos": [{"extra": "待办原文"}],
                         "files": [{"file_hash": "abc", "original_name": "测试资料"}],
                         "module_counts": {"new-module": 2}},
        "knowledge": {"evidence": {"files": [{"file_hash": "abc", "l2": {"mapping": "L2原文"}}]},
                      "facts": {"new-field": [False, None]}, "working_memory": {}},
        "overview": {"new-field": "业务原文"}, "dashboard": {},
        "conversations": [{"thread_id": "acc-thread", "turns": [{"text": "历史对话"}]}],
        "jobs": [], "future": {"opaque": [False, None, 0, "<script>alert(1)</script>"]}}}


def test_null_memory_has_all_protocol_methods(tmp_path):
    from app.null_memory import NullMemoryProvider, ReadOnlyMemoryError
    from app.ports import MemoryProvider
    memory = NullMemoryProvider()
    assert all(hasattr(memory, name) for name in MemoryProvider.__dict__ if not name.startswith('_'))
    assert memory.read('anything') == ''
    assert memory.query(prefix='anything') == []
    assert memory.search('anything') == []
    assert memory.get_fact('acc-cloud', 'x') is None
    assert memory.get_2b('acc-cloud', 'x') is None
    assert memory.list_facts('acc-cloud') == []
    writes = [lambda: memory.add_resource(str(tmp_path), parent='x'),
              lambda: memory.add_resource_to(str(tmp_path), 'x'),
              lambda: memory.ensure_directory('x'), lambda: memory.wait_for_resource('x'),
              lambda: memory.put('x', 'body'), lambda: memory.put_fact('acc-cloud', 'x', {}),
              lambda: memory.delete('x', recursive=True)]
    for write in writes:
        with pytest.raises(ReadOnlyMemoryError, match='只读'):
            write()
    assert list(tmp_path.iterdir()) == []


def test_local_config_still_requires_root():
    from app.runtime_config import RuntimeConfig
    with pytest.raises(RuntimeError, match='Missing SAM_MEMORY_ROOT_URI'):
        RuntimeConfig.from_env(ROOT, env={})


def test_cloud_config_needs_neither_root_nor_node(monkeypatch, tmp_path):
    from app import runtime_config
    from app.providers import memory_provider
    from app.null_memory import NullMemoryProvider
    monkeypatch.setattr(runtime_config, '_select_node_bin', lambda *_: pytest.fail('must not probe Node'))
    config = runtime_config.RuntimeConfig.from_env(ROOT, env={
        'SAM_CLOUD_READONLY': '1', 'SAM_DATA_ROOT': str(tmp_path), 'SAM_PROFILE': 'cloud'})
    assert config.cloud_readonly
    assert config.data_root == tmp_path
    assert config.objects_dir == tmp_path / 'objects'
    assert config.main_db == tmp_path / 'app.db'
    assert isinstance(memory_provider(config, env={}), NullMemoryProvider)
    default = runtime_config.RuntimeConfig.from_env(ROOT, env={'SAM_CLOUD_READONLY': '1'})
    assert default.data_root.is_relative_to(Path('/tmp'))


@pytest.mark.parametrize('cloud,success', [('1', True), ('0', False)])
def test_import_time_root_branch(cloud, success, tmp_path):
    import os
    env = dict(os.environ, SAM_CLOUD_READONLY=cloud, SAM_DATA_ROOT=str(tmp_path))
    env.pop('SAM_MEMORY_ROOT_URI', None)
    result = subprocess.run([sys.executable, '-c', 'import app.memory_paths; import webapp.app'],
                            cwd=ROOT, env=env, capture_output=True, text=True, timeout=20)
    if success:
        assert result.returncode == 0, result.stderr
        assert not (tmp_path / 'app.db').exists()
    else:
        assert result.returncode != 0
        assert 'Missing SAM_MEMORY_ROOT_URI' in result.stderr


def test_snapshot_atomic_roundtrip_and_replace(tmp_path):
    from app.cloud_snapshot import SnapshotStore
    store = SnapshotStore(tmp_path / 'snapshot.db')
    assert store.read() is None
    original = snapshot()
    store.replace(original)
    assert store.read() == original
    original['payload']['future']['opaque'].append('not saved')
    assert store.read() != original
    second = snapshot()
    second['payload'] = {}
    store.replace(second)
    assert store.read() == second  # no merging of stale fields


@pytest.mark.parametrize('change', [ {'version': 0}, {'company_id': ''}, {'pushed_at': float('nan')},
                                    {'pushed_at': True}, {'payload': []}, {'version': True}])
def test_invalid_snapshot_preserves_old_data(tmp_path, change):
    from app.cloud_snapshot import SnapshotStore
    store = SnapshotStore(tmp_path / 'snapshot.db')
    original = snapshot()
    store.replace(original)
    with pytest.raises(ValueError):
        store.replace({**original, **change})
    assert store.read() == original


def test_concurrent_snapshot_replacement(tmp_path):
    from app.cloud_snapshot import SnapshotStore
    store = SnapshotStore(tmp_path / 'snapshot.db')
    values = [{**snapshot(), 'pushed_at': i} for i in range(12)]
    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(store.replace, values))
    assert store.read() in values


@pytest.fixture
def cloud_web(monkeypatch, tmp_path):
    monkeypatch.setenv('SAM_CLOUD_READONLY', '1')
    monkeypatch.setenv('SAM_DATA_ROOT', str(tmp_path))
    monkeypatch.setenv('SAM_COMPANY_ID', 'acc-cloud')
    monkeypatch.setenv('SAM_CLOUD_INGEST_KEY', 'acc-ingest')
    for name in ('SAM_MEMORY_ROOT_URI', 'SAM_VIEW_USER', 'SAM_VIEW_PASS'):
        monkeypatch.delenv(name, raising=False)
    spec = importlib.util.spec_from_file_location('acc_cloud_web', ROOT / 'webapp/app.py')
    web = importlib.util.module_from_spec(spec)
    monkeypatch.setitem(sys.modules, spec.name, web)
    spec.loader.exec_module(web)
    web.app.config.update(TESTING=True)
    return web


@pytest.mark.parametrize('with_snapshot', [False, True])
def test_all_cloud_pages_and_read_apis(cloud_web, with_snapshot, monkeypatch):
    web = cloud_web
    if with_snapshot:
        web.app.extensions['sam_snapshot_store'].replace(snapshot())
    monkeypatch.setattr(web, 'consolidation_service', lambda: pytest.fail('no local ledger'))
    monkeypatch.setattr(web, 'classification_service', lambda: pytest.fail('no local ledger'))
    monkeypatch.setattr(web, 'business_overview_service', lambda: pytest.fail('no local ledger'))
    client = web.app.test_client()
    # The high-fidelity prototype is served directly as the cloud landing page.
    landing = client.get('/')
    assert landing.status_code == 200
    assert '企业经营智能体原型' in landing.get_data(as_text=True)
    assert client.get('/prototype').status_code == 200
    for path in ['/bizov', '/overview', '/todos', '/facts', '/knowledge',
                 '/knowledge/sources/abc', '/files', '/files/abc', '/chat', '/inbox']:
        result = client.get(path)
        assert result.status_code == 200, (path, result.data)
        html = result.get_data(as_text=True)
        assert 'data-upload-open' not in html
        assert 'id="upload-modal"' not in html
        assert '只读' in html
        assert 'type="file"' not in html
        if not with_snapshot:
            # The wired knowledge page has its own three-tab empty states rather
            # than the generic cloud_page "暂无同步数据" marker.
            if path == '/knowledge':
                assert '暂无原始证据' in html
                assert '暂无确认事实' in html
            elif path == '/knowledge/sources/abc':
                assert '尚无可读取的 L2 原文' in html
            else:
                assert '暂无同步数据' in html
    for path in ['/api/bizov', '/api/business-overview', '/api/dashboard',
                 '/api/dashboard/preferences', '/api/knowledge', '/api/facts', '/api/todos',
                 '/api/files/classifications', '/api/entity-roster', '/api/parse-jobs', '/api/chat/history']:
        assert client.get(path).status_code == 200, path
    assert not web.MAIN_DB.exists()
    with web.app.app_context():
        assert web.knowledge_service().read(company_id='acc-cloud') == (
            snapshot()['payload']['knowledge'] if with_snapshot else {})
    if with_snapshot:
        assert '历史对话' in client.get('/chat').get_data(as_text=True)
        assert 'L2原文' in client.get('/knowledge/sources/abc').get_data(as_text=True)
        assert 'new-field' in client.get('/bizov').get_data(as_text=True)
        assert 'new-module' in client.get('/overview').get_data(as_text=True)
        assert client.get('/api/facts?company_id=other').get_json()['company_id'] == 'acc-cloud'


def test_all_write_routes_blocked_centrally(cloud_web):
    client = cloud_web.app.test_client()
    for rule in cloud_web.app.url_map.iter_rules():
        if 'POST' in rule.methods and rule.endpoint != 'cloud_ingest':
            path = str(rule).replace('<int:todo_id>', '1').replace('<job_id>', 'x').replace('<card_id>', 'x')
            result = client.post(path, json={})
            assert result.status_code == 403, (path, result.data)
            assert result.get_json()['message'] == '云端为只读演示窗口，请在本地操作'
    for method in ['put', 'patch', 'delete']:
        assert getattr(client, method)('/api/facts').status_code == 403


def test_ingest_auth_limits_validation_and_replace(cloud_web, monkeypatch):
    client = cloud_web.app.test_client()
    assert client.post('/ingest', json=snapshot()).status_code == 401
    headers = {'X-Ingest-Key': 'acc-ingest'}
    assert client.post('/ingest', json=snapshot(), headers=headers).status_code == 200
    assert client.get('/api/knowledge').get_json() == snapshot()['payload']['knowledge']
    assert client.post('/ingest', json={**snapshot(), 'company_id': 'other'}, headers=headers).status_code == 400
    assert client.post('/ingest', data=b'{bad', headers=headers).status_code == 400
    assert client.post('/ingest', data=b'{"pushed_at":NaN}', headers=headers).status_code == 400
    cloud_web.app.config['MAX_CONTENT_LENGTH'] = 8
    assert client.post('/ingest', data=b' ' * 9, headers=headers).status_code == 413
    monkeypatch.delenv('SAM_CLOUD_INGEST_KEY')
    assert client.post('/ingest', headers=headers).status_code == 503


def test_view_auth_is_global_and_separate_from_ingest(cloud_web, monkeypatch):
    monkeypatch.setenv('SAM_VIEW_USER', 'acc-view')
    monkeypatch.setenv('SAM_VIEW_PASS', '查看钥匙')
    client = cloud_web.app.test_client()
    for path in ['/', '/bizov', '/knowledge', '/files', '/chat', '/api/facts']:
        assert client.get(path).status_code == 401
        assert client.get(path, auth=('acc-view', '查看钥匙')).status_code in (200, 302)
    assert client.get('/healthz').status_code == 200
    assert client.post('/ingest', json=snapshot(), headers={'X-Ingest-Key': 'acc-ingest'}).status_code == 200
    monkeypatch.delenv('SAM_VIEW_PASS')
    assert client.get('/bizov', auth=('acc-view', '查看钥匙')).status_code == 401


def test_unknown_and_partial_fields_render_safely(cloud_web):
    data = snapshot()
    data['payload']['page_context'] = {'facts': [{}], 'todos': [{}], 'files': [{}]}
    cloud_web.app.extensions['sam_snapshot_store'].replace(data)
    client = cloud_web.app.test_client()
    for path in ['/overview', '/todos', '/facts', '/knowledge', '/files']:
        assert client.get(path).status_code == 200
    html = client.get('/overview').get_data(as_text=True)
    assert 'opaque' in html
    assert '<script>alert(1)</script>' not in html
    assert '&lt;script&gt;' in html


def test_local_snapshot_assembly_uses_scoped_existing_services(tmp_path, monkeypatch):
    from app import cloud_export
    from app.db.database import init_db
    from app.ports import LocalMemoryProvider
    from app.runtime_config import RuntimeConfig
    from app.conversation_store import ConversationStore
    from app.thread_manager import ThreadManager
    from types import SimpleNamespace

    db = tmp_path / 'app.db'
    init_db(db)
    config = SimpleNamespace(cloud_readonly=False, main_db=db, objects_dir=tmp_path / 'objects')
    memory = LocalMemoryProvider(tmp_path / 'memory')
    ThreadManager(memory).create('acc-cloud', 'acc-thread', title='测试会话')
    ConversationStore(memory).append('acc-cloud', 'acc-thread', role='user', text='历史原文')
    ThreadManager(memory).create('acc-other', 'private', title='其他公司')
    monkeypatch.setattr(cloud_export, 'memory_provider', lambda actual: memory)
    monkeypatch.setattr(cloud_export.RuntimeConfig, 'from_env', lambda **_: config)
    result = cloud_export.build_home_snapshot(company_id='acc-cloud')
    assert result['company_id'] == 'acc-cloud'
    assert result['version'] == 1
    payload = result['payload']
    assert set(payload['page_context']) >= {'facts', 'todos', 'files', 'module_counts'}
    assert set(payload['knowledge']) >= {'evidence', 'facts', 'working_memory'}
    assert payload['conversations'][0]['turns'][0]['text'] == '历史原文'
    assert len(payload['conversations']) == 1
    assert not payload['jobs']
    config.cloud_readonly = True
    with pytest.raises(RuntimeError, match='local'):
        cloud_export.build_home_snapshot(company_id='acc-cloud')


def test_homepage_push_preserves_complete_envelope(monkeypatch, capsys):
    from scripts import sam_knowledge_push as push
    from tests.test_knowledge_push import cloud
    data = snapshot()
    monkeypatch.setenv('SAM_COMPANY_ID', 'acc-cloud')
    monkeypatch.setenv('SAM_CLOUD_INGEST_KEY', 'acc-home-key')
    monkeypatch.setenv('NO_PROXY', '127.0.0.1')
    monkeypatch.setattr(push, 'home_snapshot', lambda company_id: deepcopy(data))
    with cloud(monkeypatch) as requests:
        monkeypatch.setenv('SAM_CLOUD_URL', __import__('os').environ['SAM_KNOWLEDGE_CLOUD_URL'])
        assert push.main(['--homepage']) == 0
    sent = json.loads(requests[0][2])
    assert sent == data
    assert requests[0][1]['X-Ingest-Key'] == 'acc-home-key'
    assert 'acc-home-key' not in capsys.readouterr().out
    assert push.main(['--homepage', '--company-id', 'acc-other']) == 1


def test_payload_cannot_override_template_guard(cloud_web):
    value = snapshot()
    value['payload']['page_context'].update(read_only=False, title='untrusted', sections=[], snapshot={})
    cloud_web.app.extensions['sam_snapshot_store'].replace(value)
    result = cloud_web.app.test_client().get('/overview')
    assert result.status_code == 200
    assert b'data-upload-open' not in result.data


def test_snapshot_depth_limit_preserves_previous(tmp_path):
    from app.cloud_snapshot import SnapshotStore
    store = SnapshotStore(tmp_path / 'snapshot.db')
    store.replace(snapshot())
    nested = {}
    for _ in range(40):
        nested = {'nested': nested}
    value = snapshot()
    value['payload']['future'] = nested
    with pytest.raises(ValueError, match='depth'):
        store.replace(value)
    assert store.read() == snapshot()


def test_private_cloud_responses_are_not_cached(cloud_web):
    response = cloud_web.app.test_client().get('/bizov')
    assert response.headers['Cache-Control'] == 'no-store'
    assert response.headers['Referrer-Policy'] == 'no-referrer'
    assert response.headers.get('Access-Control-Allow-Origin') != '*'


def test_future_endpoints_cannot_escape_cloud_boundary(cloud_web):
    from flask import render_template
    web = cloud_web
    def future_read():
        pytest.fail('future local GET must not run in cloud')
    def future_write():
        pytest.fail('future local write must not run in cloud')
    web.app.add_url_rule('/acc-future-read', 'acc_future_read', future_read)
    web.app.add_url_rule('/acc-future-write', 'acc_future_write', future_write, methods=['POST'])
    assert web.app.test_client().get('/acc-future-read').status_code == 404
    assert web.app.test_client().post('/acc-future-write').status_code == 403
    with web.app.test_request_context('/'):
        html = render_template('base.html', company_id='acc-cloud')
        assert 'data-upload-open' not in html


def test_cloud_launcher_serves_real_http_without_memory_root(tmp_path):
    import os
    import socket
    import time
    import urllib.error
    import urllib.request
    from contextlib import closing

    with closing(socket.socket()) as sock:
        sock.bind(('127.0.0.1', 0))
        port = sock.getsockname()[1]
    env = dict(os.environ, SAM_CLOUD_PYTHON=sys.executable, SAM_DATA_ROOT=str(tmp_path),
               PORT=str(port), HOST='127.0.0.1', NO_PROXY='127.0.0.1')
    for key in ('SAM_CLOUD_READONLY', 'SAM_MEMORY_ROOT_URI', 'SAM_VIEW_USER', 'SAM_VIEW_PASS'):
        env.pop(key, None)
    with (tmp_path / 'server.log').open('w+') as log:
        process = subprocess.Popen(['bash', str(ROOT / 'scripts/cloud_run.sh')], cwd='/tmp',
                                   env=env, stdout=log, stderr=log)
        try:
            deadline = time.monotonic() + 10
            while time.monotonic() < deadline:
                try:
                    with urllib.request.urlopen(f'http://127.0.0.1:{port}/healthz', timeout=1) as response:
                        assert json.load(response) == {'ok': True, 'read_only': True}
                    break
                except urllib.error.URLError:
                    if process.poll() is not None:
                        log.seek(0)
                        pytest.fail(log.read())
                    time.sleep(.05)
            else:
                pytest.fail('cloud launcher readiness timeout')
            with urllib.request.urlopen(f'http://127.0.0.1:{port}/bizov', timeout=2) as response:
                assert '暂无同步数据' in response.read().decode()
            assert not (tmp_path / 'app.db').exists()
        finally:
            process.terminate()
            process.wait(timeout=5)


def test_homepage_transport_rejects_redirect_and_redacts_key(monkeypatch, capsys):
    from scripts import sam_knowledge_push as push
    from tests.test_knowledge_push import cloud
    import os
    monkeypatch.setenv('SAM_COMPANY_ID', 'acc-cloud')
    monkeypatch.setenv('SAM_CLOUD_INGEST_KEY', 'acc-secret-home-key')
    monkeypatch.setenv('NO_PROXY', '127.0.0.1')
    monkeypatch.setattr(push, 'home_snapshot', lambda company_id: snapshot())
    with cloud(monkeypatch) as destination:
        target = os.environ['SAM_KNOWLEDGE_CLOUD_URL'] + 'ingest'
        with cloud(monkeypatch, status=307, location=target,
                   response=b'acc-secret-home-key'):
            monkeypatch.setenv('SAM_CLOUD_URL', os.environ['SAM_KNOWLEDGE_CLOUD_URL'])
            assert push.main(['--homepage']) == 1
        assert not destination
    output = capsys.readouterr()
    assert 'HTTP 307' in output.err
    assert 'acc-secret-home-key' not in output.err


def test_changed_host_scope_does_not_display_previous_company(cloud_web, monkeypatch):
    cloud_web.app.extensions['sam_snapshot_store'].replace(snapshot())
    monkeypatch.setenv('SAM_COMPANY_ID', 'acc-new-company')
    client = cloud_web.app.test_client()
    assert client.get('/api/knowledge').get_json() == {}
    html = client.get('/overview').get_data(as_text=True)
    assert '事实原文' not in html
    assert '暂无同步数据' in html


def test_malformed_optional_collections_do_not_break_pages(cloud_web):
    value = snapshot()
    value['payload']['page_context'] = {'facts': 3, 'todos': False, 'files': 'opaque', 'module_counts': []}
    cloud_web.app.extensions['sam_snapshot_store'].replace(value)
    for path in ['/bizov', '/overview', '/facts', '/todos', '/files']:
        assert cloud_web.app.test_client().get(path).status_code == 200
