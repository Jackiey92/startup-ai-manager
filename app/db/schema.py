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

"""

MODULES = [
    ("sales", "销售", 1),
    ("marketing", "市场", 2),
    ("hr", "人员", 3),
    ("finance", "财务", 4),
    ("module_5", "待定义5", 5),
    ("module_6", "待定义6", 6),
    ("module_7", "待定义7", 7),
    ("module_8", "待定义8", 8),
]

DOC_TYPES = [
    ("customer", "客户资料", "sales", 1),
    ("sales_order", "订单合同", "sales", 2),
    ("delivery", "发货验收", "sales", 3),
    ("payment", "回款凭证", "sales", 4),
    ("lead", "线索清单", "marketing", 1),
    ("channel", "渠道资料", "marketing", 2),
    ("campaign", "活动方案", "marketing", 3),
    ("ad_spend", "投放数据", "marketing", 4),
]
