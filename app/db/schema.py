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

-- 归类记录（append-only；改类 = 追加新行，旧行 superseded）
CREATE TABLE IF NOT EXISTS file_classifications (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    file_hash     TEXT NOT NULL REFERENCES source_files(file_hash),
    module        TEXT NOT NULL REFERENCES modules(code),
    doc_type      TEXT REFERENCES doc_types(code),
    confidence    REAL NOT NULL DEFAULT 0.0,
    status        TEXT NOT NULL DEFAULT 'pending',   -- pending | confirmed | superseded
    classified_by TEXT NOT NULL DEFAULT 'auto',      -- auto | human
    created_at    TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_class_file ON file_classifications(file_hash);
CREATE INDEX IF NOT EXISTS idx_class_status ON file_classifications(status);

-- 文件补充标签（多对多）
CREATE TABLE IF NOT EXISTS file_tags (
    file_hash TEXT NOT NULL REFERENCES source_files(file_hash),
    tag       TEXT NOT NULL,
    PRIMARY KEY (file_hash, tag)
);

-- 事实台账（FactVoucher，append-only）
CREATE TABLE IF NOT EXISTS facts (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    entity         TEXT NOT NULL,
    attribute      TEXT NOT NULL,
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
    superseded_by  INTEGER REFERENCES facts(id),
    created_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_facts_entity ON facts(entity, attribute);
CREATE INDEX IF NOT EXISTS idx_facts_valid ON facts(valid_to);
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
