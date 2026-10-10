"""Local-only snapshot assembly using existing scoped SAM read services."""
from __future__ import annotations

import time

from .business_overview import BusinessOverviewService
from .classifier import ClassificationService
from .cloud_snapshot import SNAPSHOT_VERSION
from .memory.user_memory.l2_conversation import ConversationStore
from .dashboard import DashboardPreferenceStore, assemble_dashboard
from .db.database import connect
from .entities import EntityRosterService
from .memory.company_facts import ConsolidationService
from .knowledge import KnowledgeService
from .providers import memory_provider
from .runtime_config import RuntimeConfig
from .thread_manager import ThreadManager


def build_home_snapshot(*, company_id: str) -> dict:
    """Read the host-selected company without creating jobs or starting workers.

    Business projections are supplied unchanged by the current services. Only
    container assembly and file-count aggregation occur here; no classifier,
    model call, extraction, consolidation, promotion or memory write is made.
    The local ledger may change during reads; push again for a fresher snapshot.
    """
    config = RuntimeConfig.from_env()
    if config.cloud_readonly:
        raise RuntimeError('homepage export requires local mode, not SAM_CLOUD_READONLY')
    memory = memory_provider(config)
    facts = ConsolidationService(config.main_db).list_facts(company_id=company_id)
    todos = ConsolidationService(config.main_db).list_todos(company_id=company_id, status=None)
    files = ClassificationService(config.main_db).list_current(company_id=company_id)
    module_counts = {}
    for item in files:
        module = item.get('module')
        if module:
            module_counts[str(module)] = module_counts.get(str(module), 0) + 1
    with connect(config.main_db) as conn:
        labels = {row['code']: row['name'] for row in conn.execute('SELECT code,name FROM modules')}
        jobs = [dict(row) for row in conn.execute(
            'SELECT * FROM parse_jobs WHERE company_id=? ORDER BY id DESC', (company_id,))]
    overview = BusinessOverviewService(config.main_db, memory).overview(company_id=company_id)
    hidden = DashboardPreferenceStore(config.main_db).get(company_id=company_id)
    conversation_store = ConversationStore(memory)
    conversations = [{**thread, 'turns': conversation_store.read_range(company_id, thread['thread_id'])}
                     for thread in ThreadManager(memory).list(company_id)]
    return {'version': SNAPSHOT_VERSION, 'company_id': company_id, 'pushed_at': time.time(), 'payload': {
        'page_context': {'facts': facts, 'todos': todos, 'files': files,
                         'module_counts': module_counts, 'module_labels': labels},
        'knowledge': KnowledgeService(config.main_db, memory, objects_path=config.objects_dir).read(company_id=company_id),
        'overview': overview,
        'dashboard': assemble_dashboard(overview=overview, facts=facts, hidden=hidden),
        'dashboard_preferences': hidden,
        'entities': EntityRosterService(config.main_db).list(company_id=company_id),
        'jobs': jobs, 'conversations': conversations,
    }}
