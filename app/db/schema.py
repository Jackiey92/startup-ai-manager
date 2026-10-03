"""SQLite schema for M1: source files, classification, fact ledger, dictionaries."""

SCHEMA = """
PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

-- 原文 manifest（不可变，一份原件一行）
CREATE TABLE IF NOT EXISTS source_files (
    file_hash      TEXT PRIMARY KEY,
    original_name  TEXT NOT NULL,
    mime_type      TEXT,
    size_bytes     INTEGER NOT NULL,
    storage_path   TEXT NOT NULL,
    origin_zone    TEXT NOT NULL DEFAULT 'internal',  -- internal | quarantine
    status         TEXT NOT NULL DEFAULT 'active',
    uploaded_by    TEXT,
    uploaded_at    TEXT NOT NULL
);

-- 模块字典
CREATE TABLE IF NOT EXISTS modules (
    code        TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    sort_order  INTEGER NOT NULL DEFAULT 0
);

-- 模块内二级文件类型字典
CREATE TABLE IF NOT EXISTS doc_types (
    code           TEXT PRIMARY KEY,
    name           TEXT NOT NULL,
    parent_module  TEXT NOT NULL REFERENCES modules(code),
    sort_order     INTEGER NOT NULL DEFAULT 0
);

-- 归类记录（append-only；改类 = 追加新行，旧行 superseded）。
-- module 可为空：正文没有足够证据时，宁可进入未归类视图也不猜测。
CREATE TABLE IF NOT EXISTS file_classifications (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    file_hash     TEXT NOT NULL REFERENCES source_files(file_hash),
    company_id    TEXT NOT NULL DEFAULT 'default',
    module        TEXT REFERENCES modules(code),
    doc_type      TEXT REFERENCES doc_types(code),
    confidence    REAL NOT NULL DEFAULT 0.0,
    status        TEXT NOT NULL DEFAULT 'auto',      -- auto | confirmed | superseded
    classified_by TEXT NOT NULL DEFAULT 'auto',      -- auto | human
    basis         TEXT NOT NULL DEFAULT 'name',      -- name | content | human
    created_at    TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_class_file ON file_classifications(file_hash);
CREATE INDEX IF NOT EXISTS idx_class_status ON file_classifications(status);
CREATE INDEX IF NOT EXISTS idx_class_company_current
    ON file_classifications(company_id, status, file_hash, id);

-- 文件补充标签（多对多）
CREATE TABLE IF NOT EXISTS file_tags (
    file_hash TEXT NOT NULL REFERENCES source_files(file_hash),
    tag       TEXT NOT NULL,
    PRIMARY KEY (file_hash, tag)
);

-- 事实台账（FactVoucher，append-only）
CREATE TABLE IF NOT EXISTS facts (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id     TEXT NOT NULL DEFAULT 'default',
    entity         TEXT NOT NULL,
    attribute      TEXT NOT NULL,
    period         TEXT NOT NULL DEFAULT 'unspecified',
    value          TEXT NOT NULL,
    value_type     TEXT NOT NULL DEFAULT 'string',
    unit           TEXT,
    source_file    TEXT REFERENCES source_files(file_hash),
    source_page    INTEGER,
    source_span    TEXT,
    valid_from     TEXT,
    valid_to       TEXT,
    confidence     REAL NOT NULL DEFAULT 1.0,
    status         TEXT NOT NULL DEFAULT 'verified', -- verified | claimed | inferred
    confirm_mode   TEXT NOT NULL DEFAULT 'manual',   -- auto | manual
    superseded_by  INTEGER REFERENCES facts(id),
    created_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_facts_entity ON facts(entity, attribute);
CREATE INDEX IF NOT EXISTS idx_facts_valid ON facts(valid_to);
CREATE INDEX IF NOT EXISTS idx_facts_coordinate
    ON facts(company_id, attribute, period, superseded_by);

-- 需要人工决策的候选事实。候选从不覆盖当前 facts；处理结果留在此表。
CREATE TABLE IF NOT EXISTS todos (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id           TEXT NOT NULL,
    entity               TEXT NOT NULL DEFAULT '',
    metric               TEXT NOT NULL,
    period               TEXT NOT NULL,
    candidate_value      TEXT NOT NULL,
    candidate_value_type TEXT NOT NULL DEFAULT 'string',
    candidate_unit       TEXT,
    existing_value       TEXT,
    reason               TEXT NOT NULL, -- conflict | critical_review | anomaly | uncertain
    suggestion           TEXT NOT NULL,
    status               TEXT NOT NULL DEFAULT 'open', -- open | resolved | dismissed
    related_fact_id      INTEGER REFERENCES facts(id),
    source_file          TEXT NOT NULL REFERENCES source_files(file_hash),
    source_page          INTEGER,
    source_span          TEXT,
    created_at           TEXT NOT NULL,
    resolved_at          TEXT
);
CREATE INDEX IF NOT EXISTS idx_todos_company_status ON todos(company_id, status, id);
CREATE INDEX IF NOT EXISTS idx_todos_coordinate ON todos(company_id, metric, period, status);

-- 异步上传中转区任务。原件在 source_files，解析与固化状态独立可轮询。
CREATE TABLE IF NOT EXISTS parse_jobs (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id            TEXT NOT NULL UNIQUE,
    company_id        TEXT NOT NULL,
    file_hash         TEXT NOT NULL REFERENCES source_files(file_hash),
    original_name     TEXT NOT NULL,
    file_format       TEXT NOT NULL,
    harness_format    TEXT NOT NULL,
    size_bytes        INTEGER NOT NULL,
    status            TEXT NOT NULL DEFAULT 'queued',
    stage             TEXT NOT NULL DEFAULT 'queued',
    progress_current  INTEGER NOT NULL DEFAULT 0,
    progress_total    INTEGER,
    message           TEXT,
    error_kind        TEXT,
    created_at        TEXT NOT NULL,
    updated_at        TEXT NOT NULL,
    started_at        TEXT,
    finished_at       TEXT
);
CREATE INDEX IF NOT EXISTS idx_parse_jobs_company_status
    ON parse_jobs(company_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_parse_jobs_status
    ON parse_jobs(status, created_at);

-- 2A controlled corrections. Original blobs and old rows remain immutable;
-- active is the current projection and superseded rows are audit history.
CREATE TABLE IF NOT EXISTS source_edits (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    file_hash       TEXT NOT NULL REFERENCES source_files(file_hash),
    company_id      TEXT NOT NULL,
    operation       TEXT NOT NULL CHECK(operation IN ('replace', 'remove')),
    target_locator  TEXT NOT NULL,
    replacement_text TEXT,
    status          TEXT NOT NULL DEFAULT 'active',
    supersedes_id   INTEGER REFERENCES source_edits(id),
    created_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_source_edits_current
    ON source_edits(file_hash, company_id, target_locator, status, id);

-- 2.0 deterministic entity roster suggestions and review transitions.
-- Rows are retained; superseded_by points to the next review state.
CREATE TABLE IF NOT EXISTS entity_roster (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id    TEXT NOT NULL,
    entity_name   TEXT NOT NULL,
    entity_type   TEXT,
    aliases       TEXT NOT NULL DEFAULT '[]',
    credit_code   TEXT,
    stock_code    TEXT,
    origin        TEXT NOT NULL DEFAULT 'extracted'
                  CHECK(origin IN ('declared', 'extracted')),
    status        TEXT NOT NULL DEFAULT 'suggested'
                  CHECK(status IN ('suggested', 'active', 'rejected')),
    source_file   TEXT REFERENCES source_files(file_hash),
    source_page   INTEGER,
    source_span   TEXT,
    superseded_by INTEGER REFERENCES entity_roster(id),
    created_at    TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_entity_roster_current
    ON entity_roster(company_id, status, superseded_by, id);

-- 2.1.a deterministic entity attribution runs and immutable source blocks.
CREATE TABLE IF NOT EXISTS entity_bridge_runs (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id   TEXT NOT NULL,
    file_hash    TEXT NOT NULL REFERENCES source_files(file_hash),
    status       TEXT NOT NULL DEFAULT 'completed',
    block_count  INTEGER NOT NULL DEFAULT 0,
    created_at   TEXT NOT NULL,
    completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_entity_bridge_runs_company
    ON entity_bridge_runs(company_id, created_at DESC, id DESC);

-- Independent per employee/file attribution artifact. This is deliberately
-- not a child of entity_bridge_runs; its only evidence FK is source_files.
CREATE TABLE IF NOT EXISTS entity_bridge_artifacts (
    artifact_id  TEXT PRIMARY KEY,
    run_id       INTEGER NOT NULL UNIQUE,
    company_id   TEXT NOT NULL,
    file_hash    TEXT NOT NULL REFERENCES source_files(file_hash),
    status       TEXT NOT NULL DEFAULT 'completed',
    block_count  INTEGER NOT NULL DEFAULT 0,
    created_at   TEXT NOT NULL,
    completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_entity_bridge_artifacts_file
    ON entity_bridge_artifacts(company_id, file_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS entity_bridge_blocks (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    -- ``run_id`` is a compatibility grouping token only.  New writes do not
    -- depend on the legacy entity_bridge_runs parent table.
    run_id         INTEGER NOT NULL,
    artifact_id    TEXT NOT NULL,
    company_id     TEXT NOT NULL,
    file_hash      TEXT NOT NULL REFERENCES source_files(file_hash),
    block_index    INTEGER NOT NULL,
    block_type     TEXT NOT NULL CHECK(block_type IN ('text', 'table_row')),
    content        TEXT NOT NULL,
    source_page    INTEGER,
    source_span    TEXT,
    classification TEXT NOT NULL CHECK(classification IN ('self', 'related', 'foreign', 'ambiguous')),
    relation       TEXT,
    subject        TEXT,
    reason         TEXT,
    source         TEXT NOT NULL DEFAULT 'deterministic'
                   CHECK(source IN ('deterministic', 'employee', 'model', 'human')),
    needs_review   INTEGER NOT NULL DEFAULT 0 CHECK(needs_review IN (0, 1)),
    decision       TEXT,
    status         TEXT NOT NULL DEFAULT 'pending',
    created_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_entity_bridge_blocks_run
    ON entity_bridge_blocks(run_id, block_index);
CREATE INDEX IF NOT EXISTS idx_entity_bridge_blocks_review
    ON entity_bridge_blocks(company_id, needs_review, status, id);

-- 2B.a deterministic L1 extraction ledger.
CREATE TABLE IF NOT EXISTS fact_runs (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id      TEXT NOT NULL,
    file_hash       TEXT NOT NULL REFERENCES source_files(file_hash),
    bridge_run_id   INTEGER REFERENCES entity_bridge_runs(id),
    bridge_artifact_id TEXT,
    status          TEXT NOT NULL DEFAULT 'completed',
    candidate_count INTEGER NOT NULL DEFAULT 0,
    fact_count      INTEGER NOT NULL DEFAULT 0,
    todo_count      INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT NOT NULL,
    completed_at    TEXT
);
CREATE INDEX IF NOT EXISTS idx_fact_runs_company
    ON fact_runs(company_id, created_at DESC, id DESC);

-- Company-scoped dashboard visibility only; this never deletes source data.
CREATE TABLE IF NOT EXISTS dashboard_preferences (
    company_id   TEXT NOT NULL,
    dashboard_id TEXT NOT NULL,
    card_id      TEXT NOT NULL,
    hidden       INTEGER NOT NULL DEFAULT 0 CHECK(hidden IN (0, 1)),
    updated_at   TEXT NOT NULL,
    PRIMARY KEY(company_id, dashboard_id, card_id)
);

"""

MODULES = [
    ("finance", "财务", 1),
    ("legal", "法务", 2),
    ("technology_product", "技术与产品", 3),
    ("customer_market", "客户与市场", 4),
    ("team_equity", "团队股权", 5),
]

DOC_TYPES = [
    ("financial_statement", "财务报表", "finance", 1),
    ("audit_report", "审计报告", "finance", 2),
    ("tax_document", "税务资料", "finance", 3),
    ("budget_forecast", "预算与预测", "finance", 4),
    ("contract", "合同与协议", "legal", 1),
    ("litigation", "争议与诉讼", "legal", 2),
    ("compliance", "合规与监管", "legal", 3),
    ("intellectual_property", "知识产权", "legal", 4),
    ("product_spec", "产品与规格", "technology_product", 1),
    ("research_development", "研发项目", "technology_product", 2),
    ("patent", "专利", "technology_product", 3),
    ("quality_certification", "质量认证", "technology_product", 4),
    ("customer_profile", "客户资料", "customer_market", 1),
    ("sales_order", "销售订单", "customer_market", 2),
    ("market_research", "市场研究", "customer_market", 3),
    ("channel_campaign", "渠道与活动", "customer_market", 4),
    ("personnel", "人员与组织", "team_equity", 1),
    ("compensation", "薪酬", "team_equity", 2),
    ("equity", "股权", "team_equity", 3),
    ("governance", "治理与股东", "team_equity", 4),
]

# Historical dictionary values from the prototype. Known values are mapped
# to their new functional owner; placeholder modules are intentionally
# unclassified rather than guessed into a new business function.
LEGACY_MODULE_MAP = {
    "sales": "customer_market",
    "marketing": "customer_market",
    "hr": "team_equity",
    "finance": "finance",
    "module_5": None,
    "module_6": None,
    "module_7": None,
    "module_8": None,
}

LEGACY_DOC_TYPE_MAP = {
    "customer": "customer_profile",
    "sales_order": "sales_order",
    "delivery": "channel_campaign",
    "payment": "financial_statement",
    "lead": "market_research",
    "channel": "channel_campaign",
    "campaign": "channel_campaign",
    "ad_spend": "market_research",
}
