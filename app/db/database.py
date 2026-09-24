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


if __name__ == "__main__":
    init_db()
    print(f"initialized {DEFAULT_DB_PATH}")
