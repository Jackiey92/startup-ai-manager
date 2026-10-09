"""Flask-only cloud window: snapshot reads, global auth and mutation gate.

Endpoint selection here is UI wiring, not business classification. The cloud
never interprets fact values or derives dashboard cards; it displays fields
assembled by the existing local services, including future/unknown fields.
"""
from __future__ import annotations

import hmac
import json
import os
import sqlite3
from pathlib import Path

from flask import abort, g, redirect, render_template, request, send_file, url_for

from .cloud_snapshot import (MAX_BODY_BYTES, SnapshotKnowledgeService, SnapshotStore,
                             object_value, reject_constant)

READONLY_MESSAGE = "云端为只读演示窗口，请在本地操作"


def current_snapshot(app):
    if "sam_cloud_snapshot" not in g:
        snapshot = app.extensions["sam_snapshot_store"].read()
        company_id = os.environ.get('SAM_COMPANY_ID', '').strip()
        if snapshot and company_id and snapshot.get('company_id') != company_id:
            snapshot = None  # a persisted snapshot from a previous host scope
        g.sam_cloud_snapshot = snapshot
    return g.sam_cloud_snapshot


def page_context(app) -> dict:
    snapshot = current_snapshot(app) or {}
    payload = object_value(snapshot.get("payload"))
    context = object_value(payload.get("page_context"))
    # Do not unpack untrusted page_context into template control variables.
    # Its unknown fields are still preserved and shown in the raw snapshot.
    return {"company_id": snapshot.get("company_id") or os.environ.get("SAM_COMPANY_ID", ""),
            "facts": context.get("facts") if isinstance(context.get("facts"), list) else [],
            "todos": context.get("todos") if isinstance(context.get("todos"), list) else [],
            "files": context.get("files") if isinstance(context.get("files"), list) else [],
            "module_counts": object_value(context.get("module_counts")),
            "module_labels": object_value(context.get("module_labels"))}


def _matches(candidate, expected) -> bool:
    return bool(isinstance(candidate, str) and expected and
                hmac.compare_digest(candidate.encode("utf-8"), expected.encode("utf-8")))


def install_cloud_window(app, config, context_reader) -> None:
    app.config["MAX_CONTENT_LENGTH"] = MAX_BODY_BYTES
    app.extensions["sam_snapshot_store"] = SnapshotStore(config.data_root / "cloud-snapshot.db")

    @app.context_processor
    def readonly_context():
        return {"read_only": True}

    @app.errorhandler(413)
    def oversized_body(_error):
        return {"error": "snapshot_too_large", "message": "快照超过 32 MiB 上限"}, 413

    @app.route('/healthz')
    def cloud_health():
        return {"ok": True, "read_only": True}

    @app.route('/ingest', methods=['POST'])
    def cloud_ingest():
        expected = os.environ.get('SAM_CLOUD_INGEST_KEY', '')
        if not expected.strip():
            return {"error": "ingest_not_configured", "message": "宿主未配置收数钥匙"}, 503
        if not _matches(request.headers.get('X-Ingest-Key'), expected):
            return {"error": "unauthorized", "message": "收数钥匙不正确"}, 401
        try:
            value = json.loads(request.get_data(), parse_constant=reject_constant)
            company = os.environ.get('SAM_COMPANY_ID', '').strip()
            if company and object_value(value).get('company_id') != company:
                raise ValueError('company_id does not match host scope')
            app.extensions['sam_snapshot_store'].replace(value)
        except (ValueError, UnicodeError, RecursionError, OverflowError) as exc:
            return {"error": "invalid_snapshot", "message": str(exc)}, 400
        except sqlite3.Error:
            app.logger.exception('cloud snapshot storage unavailable')
            return {"error": "storage_unavailable", "message": "快照存储暂不可用"}, 503
        return {"ok": True}

    @app.before_request
    def cloud_boundary():
        # Only authenticated ingestion can mutate anything in the cloud. This
        # covers future POST/PUT/PATCH/DELETE routes as well as today's routes.
        if request.endpoint == 'cloud_ingest' and request.method == 'POST':
            return None
        if request.method not in ('GET', 'HEAD', 'OPTIONS'):
            return {"error": "cloud_readonly", "message": READONLY_MESSAGE}, 403
        if request.method == 'OPTIONS':
            return '', 204
        if request.endpoint == 'cloud_health':
            return None

        user = os.environ.get('SAM_VIEW_USER')
        password = os.environ.get('SAM_VIEW_PASS')
        if user is not None or password is not None:
            auth = request.authorization
            if not (auth and auth.type == 'basic' and _matches(auth.username, user)
                    and _matches(auth.password, password)):
                return 'Authentication required', 401, {'WWW-Authenticate': 'Basic realm="SAM cloud"'}
        if request.endpoint == 'static':
            return None
        # The high-fidelity prototype is the cloud landing experience: serve
        # the self-contained file directly for both '/' and '/prototype'.
        if request.endpoint in ('home_page', 'prototype_page'):
            prototype_file = Path(config.project_root) / 'prototype' / 'startup-ai-manager.html'
            if prototype_file.is_file():
                return send_file(str(prototype_file))
            return redirect(url_for('business_overview_page'))

        snapshot = current_snapshot(app)
        context = context_reader(company_id='')  # scope comes only from the stored envelope
        payload = object_value(object_value(snapshot).get('payload'))
        company_id = context['company_id']
        knowledge = SnapshotKnowledgeService(snapshot)
        data = knowledge.read(company_id=company_id)

        # These names are the existing public read API contracts, not business
        # rules. All bodies are opaque values taken from this one snapshot.
        if request.endpoint in ('api_business_overview',):
            return {'overview': payload.get('overview', {}), 'dashboard': payload.get('dashboard', {})}
        if request.endpoint == 'api_dashboard':
            return {'dashboard': payload.get('dashboard', {})}
        if request.endpoint == 'api_dashboard_preferences':
            return {'company_id': company_id, 'dashboard_id': 'business',
                    'hidden': payload.get('dashboard_preferences', [])}
        if request.endpoint == 'api_knowledge':
            return data
        if request.endpoint == 'api_facts':
            return {'company_id': company_id, 'facts': context['facts']}
        if request.endpoint == 'api_todos':
            return {'company_id': company_id, 'todos': context['todos']}
        if request.endpoint == 'api_file_classifications':
            return {'company_id': company_id, 'files': context['files']}
        if request.endpoint == 'api_entity_roster':
            return {'company_id': company_id, 'entities': payload.get('entities', [])}
        if request.endpoint == 'api_parse_jobs':
            return {'jobs': payload.get('jobs', [])}
        if request.endpoint == 'api_parse_job':
            jobs = payload.get('jobs', [])
            job = next((item for item in jobs if isinstance(item, dict)
                        and item.get('job_id') == request.view_args['job_id']), None) if isinstance(jobs, list) else None
            return {'job': job} if job else ({'error': 'not_found'}, 404)
        if request.endpoint == 'api_import_guide_status':
            return {'status': 'idle', 'message': READONLY_MESSAGE}
        if request.endpoint == 'cloud_chat_history':
            return {'company_id': company_id, 'conversations': payload.get('conversations', [])}

        title = ''
        sections = []
        if request.endpoint == 'business_overview_page':
            title = '业务概览'
            sections = [('overview', payload.get('overview')), ('dashboard', payload.get('dashboard'))]
        elif request.endpoint == 'legacy_overview_page':
            title = '总览'
            sections = [('page_context', payload.get('page_context'))]
        elif request.endpoint == 'todos_page':
            title = '待办中心'
            sections = [('todos', context['todos'])]
        elif request.endpoint == 'facts_page':
            title = '事实库'
            sections = [('facts', context['facts'])]
        elif request.endpoint == 'knowledge_page':
            title = '知识库'
            sections = list(data.items())
        elif request.endpoint in ('knowledge_source_page', 'detail'):
            title = '原文溯源' if request.endpoint == 'knowledge_source_page' else '文件详情'
            try:
                source = knowledge.source(company_id=company_id, file_hash=request.view_args['file_hash'])
            except KeyError:
                source = None
            sections = [('source', source)]
        elif request.endpoint == 'files_page':
            title = '文件柜'
            sections = [('files', context['files'])]
        elif request.endpoint == 'chat_page':
            title = '企业对话'
            sections = [('conversations', payload.get('conversations', []))]
        elif request.endpoint == 'inbox_page':
            title = '资料导入'
            sections = [('jobs', payload.get('jobs', []))]
        else:
            # Never fall through to a future local GET handler: it might
            # initialise a ledger, clean a runtime, or trigger an employee.
            abort(404)
        return render_template('cloud_page.html', **context, title=title, sections=sections,
                               snapshot=snapshot, snapshot_payload=payload)

    @app.route('/api/chat/history')
    def cloud_chat_history():
        # Response is supplied by cloud_boundary above, alongside other reads.
        raise AssertionError('cloud read boundary was bypassed')
