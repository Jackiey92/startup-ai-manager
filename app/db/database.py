"""Database initialization and connection helpers."""
from __future__ import annotations

import sqlite3
from pathlib import Path

from .schema import SCHEMA, MODULES, DOC_TYPES

DEFAULT_DB_PATH = Path("data/app.db")


def connect(db_path: Path = DEFAULT_DB_PATH) -> sqlite3.Connection:
    db_path = Path(db_path)
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db(db_path: Path = DEFAULT_DB_PATH) -> None:
    conn = connect(db_path)
    try:
        # Legacy M1 databases have a NOT NULL module column.  Upgrade before
        # SCHEMA creates its new company/current index, which refers to the
        # fields absent from that old table.
        if _classification_needs_rebuild(conn):
            _migrate_file_classifications(conn)
        _migrate_facts(conn)
        _migrate_todos(conn)
        _migrate_entity_roster(conn)
        _migrate_entity_bridge(conn)
        conn.executescript(SCHEMA)
        conn.executemany(
            "INSERT OR IGNORE INTO modules(code,name,sort_order) VALUES (?,?,?)",
            MODULES,
        )
        conn.executemany(
            "INSERT OR IGNORE INTO doc_types(code,name,parent_module,sort_order)"
            " VALUES (?,?,?,?)",
            DOC_TYPES,
        )
        conn.commit()
    finally:
        conn.close()


def _migrate_file_classifications(conn: sqlite3.Connection) -> None:
    """Upgrade the early M1 classification table without discarding history.

    The original table made ``module`` NOT NULL and had no company or basis
    fields.  SQLite cannot relax that constraint in place, so rebuild only
    this append-only ledger and carry existing rows forward as name-based
    classifications in the default company scope.
    """
    if not _classification_needs_rebuild(conn):
        return

    conn.execute("DROP INDEX IF EXISTS idx_class_file")
    conn.execute("DROP INDEX IF EXISTS idx_class_status")
    conn.execute("DROP INDEX IF EXISTS idx_class_company_current")
    conn.executescript(
        """
        CREATE TABLE file_classifications_new (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            file_hash     TEXT NOT NULL REFERENCES source_files(file_hash),
            company_id    TEXT NOT NULL DEFAULT 'default',
            module        TEXT REFERENCES modules(code),
            doc_type      TEXT REFERENCES doc_types(code),
            confidence    REAL NOT NULL DEFAULT 0.0,
            status        TEXT NOT NULL DEFAULT 'auto',
            classified_by TEXT NOT NULL DEFAULT 'auto',
            basis         TEXT NOT NULL DEFAULT 'name',
            created_at    TEXT NOT NULL
        );
        """
    )
    conn.execute(
        """
        INSERT INTO file_classifications_new
            (id, file_hash, company_id, module, doc_type, confidence, status,
             classified_by, basis, created_at)
        SELECT id, file_hash, 'default', module, doc_type, confidence,
               CASE WHEN status='pending' THEN 'auto' ELSE status END,
               classified_by, 'name', created_at
        FROM file_classifications
        """
    )
    conn.execute("DROP TABLE file_classifications")
    conn.execute("ALTER TABLE file_classifications_new RENAME TO file_classifications")
    conn.executescript(
        """
        CREATE INDEX IF NOT EXISTS idx_class_file ON file_classifications(file_hash);
        CREATE INDEX IF NOT EXISTS idx_class_status ON file_classifications(status);
        CREATE INDEX IF NOT EXISTS idx_class_company_current
            ON file_classifications(company_id, status, file_hash, id);
        """
    )


def _classification_needs_rebuild(conn: sqlite3.Connection) -> bool:
    columns = {
        str(row["name"]): row
        for row in conn.execute("PRAGMA table_info(file_classifications)").fetchall()
    }
    if not columns:
        return False
    module_column = columns.get("module")
    module_not_null = bool(module_column["notnull"]) if module_column is not None else False
    return module_not_null or not {"company_id", "basis"}.issubset(columns)


def _migrate_facts(conn: sqlite3.Connection) -> None:
    """Add 2B consolidation coordinates to the pre-existing M1 facts table."""
    columns = {
        str(row["name"])
        for row in conn.execute("PRAGMA table_info(facts)").fetchall()
    }
    if not columns:
        return
    # SQLite permits ADD COLUMN with a literal default, preserving all historic
    # M1 rows under their explicit legacy/default coordinate.
    if "company_id" not in columns:
        conn.execute("ALTER TABLE facts ADD COLUMN company_id TEXT NOT NULL DEFAULT 'default'")
    if "period" not in columns:
        conn.execute("ALTER TABLE facts ADD COLUMN period TEXT NOT NULL DEFAULT 'unspecified'")
    if "confirm_mode" not in columns:
        conn.execute("ALTER TABLE facts ADD COLUMN confirm_mode TEXT NOT NULL DEFAULT 'manual'")


def _migrate_todos(conn: sqlite3.Connection) -> None:
    columns = {str(row["name"]) for row in conn.execute("PRAGMA table_info(todos)").fetchall()}
    if columns and "entity" not in columns:
        conn.execute("ALTER TABLE todos ADD COLUMN entity TEXT NOT NULL DEFAULT ''")


def _migrate_entity_roster(conn: sqlite3.Connection) -> None:
    """Add the declared/extracted provenance to an existing 2.0 roster."""
    rows = conn.execute("PRAGMA table_info(entity_roster)").fetchall()
    columns = {str(row["name"]): row for row in rows}
    if columns and "origin" not in columns:
        conn.execute("ALTER TABLE entity_roster ADD COLUMN origin TEXT NOT NULL DEFAULT 'extracted'")
        rows = conn.execute("PRAGMA table_info(entity_roster)").fetchall()
        columns = {str(row["name"]): row for row in rows}
    source_file = columns.get("source_file")
    if source_file is not None and bool(source_file["notnull"]):
        # Early 2.0 created source_file NOT NULL, which made a host-declared
        # self impossible to store without inventing a source. Preserve every
        # row while relaxing only that constraint.
        conn.execute("DROP INDEX IF EXISTS idx_entity_roster_current")
        conn.executescript(
            """
            CREATE TABLE entity_roster_new (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                company_id TEXT NOT NULL,
                entity_name TEXT NOT NULL,
                entity_type TEXT,
                aliases TEXT NOT NULL DEFAULT '[]',
                credit_code TEXT,
                stock_code TEXT,
                origin TEXT NOT NULL DEFAULT 'extracted',
                status TEXT NOT NULL DEFAULT 'suggested',
                source_file TEXT REFERENCES source_files(file_hash),
                source_page INTEGER,
                source_span TEXT,
                superseded_by INTEGER REFERENCES entity_roster_new(id),
                created_at TEXT NOT NULL
            );
            """
        )
        conn.execute(
            """INSERT INTO entity_roster_new
               (id,company_id,entity_name,entity_type,aliases,credit_code,stock_code,origin,
                status,source_file,source_page,source_span,superseded_by,created_at)
               SELECT id,company_id,entity_name,entity_type,aliases,credit_code,stock_code,
                      COALESCE(origin,'extracted'),status,source_file,source_page,source_span,
                      superseded_by,created_at FROM entity_roster"""
        )
        conn.execute("DROP TABLE entity_roster")
        conn.execute("ALTER TABLE entity_roster_new RENAME TO entity_roster")
        conn.execute(
            """CREATE INDEX IF NOT EXISTS idx_entity_roster_current
               ON entity_roster(company_id, status, superseded_by, id)"""
        )


def _migrate_entity_bridge(conn: sqlite3.Connection) -> None:
    """Add audit fields to an existing 2.1.a bridge table."""
    columns = {str(row["name"]) for row in conn.execute("PRAGMA table_info(entity_bridge_blocks)").fetchall()}
    if not columns:
        return
    if "reason" not in columns:
        conn.execute("ALTER TABLE entity_bridge_blocks ADD COLUMN reason TEXT")
    if "source" not in columns:
        conn.execute("ALTER TABLE entity_bridge_blocks ADD COLUMN source TEXT NOT NULL DEFAULT 'deterministic'")


if __name__ == "__main__":
    init_db()
    print(f"initialized {DEFAULT_DB_PATH}")
