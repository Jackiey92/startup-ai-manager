"""Database initialization and connection helpers."""
from __future__ import annotations

import sqlite3
from pathlib import Path

from .schema import SCHEMA, MODULES, DOC_TYPES

DEFAULT_DB_PATH = Path("data/app.db")


def connect(db_path: Path = DEFAULT_DB_PATH) -> sqlite3.Connection:
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


if __name__ == "__main__":
    init_db()
    print(f"initialized {DEFAULT_DB_PATH}")
