from pathlib import Path

from app.db import connect, init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.harness.staging import StagingStore
from app.prose import ProseExtractionService, verify_prose
from app.storage import SourceFileStore


class FakeWorker:
    def __init__(self, items): self.items = items
    def run(self, **_kwargs): return self.items


def setup(tmp_path: Path):
    db = tmp_path / "app.db"; init_db(db)
    stored = SourceFileStore(tmp_path / "objects", db).put_bytes(b"prose", original_name="bp.pdf")
    text = "未蓝科技有限公司采用低温烧结技术，产品用于新能源汽车电池。公司计划2025年营收做到1000万元。公司自称技术行业领先。"
    child = "未蓝科技有限公司全资子公司常州未蓝新能源有限公司负责电池材料供应。"
    StagingStore(db).save_manifest({"file_hash": stored.file_hash, "filename": "bp.pdf", "format": "pdf", "parse_summary": {"status": "parsed"}, "pages": [{"page_no": 1, "text_items": [{"text": text, "source_loc": {"locator": "text/0"}}, {"text": child, "source_loc": {"locator": "text/1"}}], "tables": []}]})
    EntityRosterService(db).declare(company_id="acme", entity_name="未蓝科技有限公司")
    return db, stored, EntityBridgeService(db).run(company_id="acme", file_hash=stored.file_hash), text, child


def test_prose_fact_plan_opinion_subsidiary_and_idempotency(tmp_path):
    db, stored, run, text, child = setup(tmp_path)
    worker = FakeWorker([
        {"entity":"未蓝科技有限公司","category":"技术原理","kind":"fact","content":"公司采用低温烧结技术。","quote":"采用低温烧结技术"},
        {"entity":"未蓝科技有限公司","category":"产品与用途","kind":"fact","content":"产品用于新能源汽车电池。","quote":"产品用于新能源汽车电池"},
        {"entity":"未蓝科技有限公司","category":"客户与市场","kind":"plan","source_speaker":"公司","content":"公司计划2025年营收做到1000万元。","quote":"公司计划2025年营收做到1000万元"},
        {"entity":"未蓝科技有限公司","category":"其他","kind":"opinion","source_speaker":"公司自称","content":"公司自称技术行业领先。","quote":"公司自称技术行业领先"},
        {"entity":"常州未蓝新能源有限公司","category":"供应链与运营","kind":"fact","content":"子公司负责电池材料供应。","quote":"常州未蓝新能源有限公司负责电池材料供应"},
    ])
    service = ProseExtractionService(db)
    service.extract(company_id="acme", file_hash=stored.file_hash, bridge_run_id=run["id"], worker=worker)
    service.extract(company_id="acme", file_hash=stored.file_hash, bridge_run_id=run["id"], worker=worker)
    rows = service.list(company_id="acme")
    assert len(rows) == 5
    assert {(r["kind"], r["entity"]) for r in rows} >= {("fact", "未蓝科技有限公司"), ("plan", "未蓝科技有限公司"), ("opinion", "未蓝科技有限公司"), ("fact", "常州未蓝新能源有限公司")}
    assert all(r["source_span"] for r in rows)


def test_prose_rejects_tampered_quote_entity_and_unmarked_plan(tmp_path):
    db, stored, run, text, _child = setup(tmp_path)
    blocks = ProseExtractionService(db)._blocks("acme", stored.file_hash, run["id"])
    bad = [
        {"entity":"未蓝科技有限公司","category":"技术原理","kind":"fact","content":"x","quote":"不存在"},
        {"entity":"其他公司","category":"技术原理","kind":"fact","content":"x","quote":"采用低温烧结技术"},
        {"entity":"未蓝科技有限公司","category":"其他","kind":"fact","content":"计划2025年营收做到1000万元","quote":"公司计划2025年营收做到1000万元"},
    ]
    assert [verify_prose(item, blocks, company_id="acme") for item in bad] == [None, None, None]


def test_api_prose_filters_company_scoped_verified_entries(tmp_path, monkeypatch):
    import webapp.app as webapp
    db, stored, run, _text, _child = setup(tmp_path)
    worker = FakeWorker([{"entity":"未蓝科技有限公司", "category":"技术原理", "kind":"fact",
                          "content":"公司采用低温烧结技术。", "quote":"采用低温烧结技术"}])
    ProseExtractionService(db).extract(company_id="acme", file_hash=stored.file_hash,
                                       bridge_run_id=run["id"], worker=worker)
    monkeypatch.setattr(webapp, "MAIN_DB", db)
    response = webapp.app.test_client().get("/api/prose?company_id=acme&entity=未蓝科技有限公司")
    assert response.status_code == 200
    assert response.get_json()["prose"][0]["quote"] == "采用低温烧结技术"
