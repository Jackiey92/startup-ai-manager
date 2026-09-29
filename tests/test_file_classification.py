from __future__ import annotations

from pathlib import Path
import sqlite3
import sys

import pytest

from app.classifier import ClassificationService, classify_content
from app.db.database import init_db
from app.storage import SourceFileStore


def _manifest(*texts: str) -> dict:
    return {
        "pages": [{
            "text_items": [{"text": text} for text in texts],
            "tables": [],
        }]
    }


@pytest.fixture
def ledger(tmp_path: Path):
    db_path = tmp_path / "app.db"
    init_db(db_path)
    store = SourceFileStore(tmp_path / "objects", db_path)
    service = ClassificationService(db_path)
    return store, service


def test_content_wins_when_filename_claims_sales(ledger) -> None:
    store, service = ledger
    # The filename intentionally says customer list. Only manifest content is
    # passed to the content classifier, proving it cannot win by filename.
    stored = store.put_bytes(b"misnamed finance", original_name="客户名单.xlsx")
    result = service.classify_parsed(
        file_hash=stored.file_hash,
        company_id="acme",
        manifest=_manifest("利润表 营业收入 净利润 毛利率", "资产负债表 货币资金 应收账款"),
    )
    assert result["module"] == "finance"
    assert result["basis"] == "content"
    assert result["status"] == "auto"


@pytest.mark.parametrize(
    ("text", "module"),
    [
        ("营业收入 净利润 毛利率 现金流", "finance"),
        ("客户名称 订单金额 发货状态 已发货", "sales"),
        ("员工姓名 岗位 基本工资 薪酬", "hr"),
        ("渠道 投放 广告 转化率", "marketing"),
    ],
)
def test_content_modules_are_deterministic(text: str, module: str) -> None:
    assert classify_content(_manifest(text)).module == module


def test_insufficient_content_stays_unclassified(ledger) -> None:
    store, service = ledger
    stored = store.put_bytes(b"notes", original_name="随手记.xlsx")
    result = service.classify_parsed(
        file_hash=stored.file_hash, company_id="acme",
        manifest=_manifest("今天天气不错 周末去爬山 记得买菜"),
    )
    assert result["module"] is None
    assert result["basis"] == "content"
    current = service.list_current(company_id="acme")
    assert current[0]["module"] is None
    assert len(service.list_current(company_id="acme", module="unclassified")) == 1


def test_module_filter_confirm_and_human_reclassification_keep_history(ledger) -> None:
    store, service = ledger
    stored = store.put_bytes(b"sales", original_name="销售订单.xlsx")
    service.classify_parsed(
        file_hash=stored.file_hash, company_id="acme",
        manifest=_manifest("客户名称 订单金额 发货状态 已发货"),
    )
    assert len(service.list_current(company_id="acme", module="sales")) == 1
    assert service.confirm(file_hash=stored.file_hash, company_id="acme")["status"] == "confirmed"
    current = service.reclassify(
        file_hash=stored.file_hash, company_id="acme", module="finance", doc_type=None,
    )
    assert current["classified_by"] == "human"
    rows = service.list_current(company_id="acme", include_history=True)
    assert rows[0]["module"] == "finance"
    assert any(row["module"] == "sales" and row["status"] == "superseded" for row in rows[0]["history"])
    assert service.list_current(company_id="acme", module="sales") == []


def test_human_classification_is_not_overwritten_by_later_parser_retry(ledger) -> None:
    store, service = ledger
    stored = store.put_bytes(b"document", original_name="任意.xlsx")
    service.reclassify(file_hash=stored.file_hash, company_id="acme", module="hr", doc_type=None)
    after = service.classify_parsed(
        file_hash=stored.file_hash, company_id="acme",
        manifest=_manifest("营业收入 净利润 毛利率 现金流"),
    )
    assert after["module"] == "hr"
    assert after["classified_by"] == "human"


def test_canceled_parse_invalidates_only_its_new_content_row_and_retry_reclassifies(ledger) -> None:
    store, service = ledger
    stored = store.put_bytes(b"cancel-me", original_name="cancel.pdf")
    first = service.classify_parsed(
        file_hash=stored.file_hash, company_id="acme",
        manifest=_manifest("营业收入 净利润 毛利率 现金流"),
    )
    assert first["_created_for_parse"] is True
    assert service.cancel_auto_content(
        classification_id=first["id"], file_hash=stored.file_hash, company_id="acme",
    ) is True
    assert service.list_current(company_id="acme") == []
    assert service.list_current(company_id="acme", include_history=True) == []
    # A retry appends a fresh effective row; the canceled audit row is not
    # resurrected or treated as the current classification.
    retried = service.classify_parsed(
        file_hash=stored.file_hash, company_id="acme",
        manifest=_manifest("营业收入 净利润 毛利率 现金流"),
    )
    assert retried["id"] != first["id"]
    assert service.list_current(company_id="acme")[0]["basis"] == "content"


def test_http_list_filter_confirm_and_human_contract(monkeypatch, ledger) -> None:
    store, service = ledger
    stored = store.put_bytes(b"sales", original_name="销售订单.xlsx")
    service.classify_parsed(
        file_hash=stored.file_hash, company_id="acme",
        manifest=_manifest("客户名称 订单金额 发货状态 已发货"),
    )
    webapp_dir = Path(__file__).resolve().parents[1] / "webapp"
    sys.path.insert(0, str(webapp_dir))
    try:
        import webapp.app as webapp
    finally:
        sys.path.remove(str(webapp_dir))

    monkeypatch.setattr(webapp, "MAIN_DB", store._db_path)
    client = webapp.app.test_client()
    listed = client.get("/api/files/classifications?company_id=acme&module=sales")
    assert listed.status_code == 200
    assert listed.get_json()["files"][0]["basis"] == "content"
    confirmed = client.post("/api/files/classifications/confirm", json={"file_hash": stored.file_hash, "company_id": "acme"})
    assert confirmed.status_code == 200
    revised = client.post("/api/files/classifications", json={
        "file_hash": stored.file_hash, "company_id": "acme", "module": "finance", "doc_type": None,
    })
    assert revised.status_code == 200
    history = client.get("/api/files/classifications?company_id=acme&include_history=1").get_json()["files"][0]["history"]
    assert any(item["status"] == "superseded" for item in history)


def test_legacy_non_nullable_module_ledger_is_migrated_without_losing_rows(tmp_path: Path) -> None:
    """Existing M1 databases must accept an unclassified content result."""
    db_path = tmp_path / "legacy.db"
    conn = sqlite3.connect(db_path)
    conn.executescript(
        """
        CREATE TABLE source_files (
            file_hash TEXT PRIMARY KEY, original_name TEXT NOT NULL,
            mime_type TEXT, size_bytes INTEGER NOT NULL, storage_path TEXT NOT NULL,
            origin_zone TEXT NOT NULL DEFAULT 'internal', status TEXT NOT NULL DEFAULT 'active',
            uploaded_by TEXT, uploaded_at TEXT NOT NULL
        );
        CREATE TABLE modules (code TEXT PRIMARY KEY, name TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE doc_types (code TEXT PRIMARY KEY, name TEXT NOT NULL, parent_module TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE file_classifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT, file_hash TEXT NOT NULL,
            module TEXT NOT NULL, doc_type TEXT, confidence REAL NOT NULL DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'pending', classified_by TEXT NOT NULL DEFAULT 'auto',
            created_at TEXT NOT NULL
        );
        INSERT INTO modules VALUES ('sales','销售',1);
        INSERT INTO source_files VALUES ('h','old.xlsx',NULL,1,'h','internal','active',NULL,'now');
        INSERT INTO file_classifications(file_hash,module,confidence,status,classified_by,created_at)
            VALUES ('h','sales',0.6,'pending','auto','now');
        """
    )
    conn.commit()
    conn.close()
    init_db(db_path)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    columns = {row["name"]: row for row in conn.execute("PRAGMA table_info(file_classifications)")}
    row = conn.execute("SELECT * FROM file_classifications WHERE file_hash='h'").fetchone()
    assert columns["module"]["notnull"] == 0
    assert row["company_id"] == "default"
    assert row["basis"] == "name"
    assert row["status"] == "auto"
    conn.close()
