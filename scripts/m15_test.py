"""M1.5 end-to-end test: store xlsx -> harness parse -> staging + audit."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.db import init_db
from app.storage import SourceFileStore
from app.parsing.base import ParserRegistry
from app.parsing.xlsx_parser import XlsxParser
from app.harness.staging import StagingStore
from app.harness.runtime import HarnessRuntime
import openpyxl


def make_sample() -> Path:
    sample_dir = Path("data/samples")
    sample_dir.mkdir(parents=True, exist_ok=True)
    path = sample_dir / "销售订单台账.xlsx"
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "订单"
    ws.append(["客户", "订单号", "金额", "已回款"])
    ws.append(["上海智造", "SO-001", 120, 84])
    ws.append(["宁波科技", "SO-002", 56, 0])
    ws2 = wb.create_sheet("客户")
    ws2.append(["客户", "联系人"])
    ws2.append(["上海智造", "王"])
    wb.save(path)
    return path


def main() -> None:
    init_db()
    path = make_sample()

    store = SourceFileStore()
    stored = store.put_path(path, mime_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", uploaded_by="founder")

    registry = ParserRegistry()
    registry.register(XlsxParser(store))

    harness = HarnessRuntime(registry, StagingStore())
    report = harness.parse_file(stored.file_hash, "xlsx")

    staged = StagingStore().get(report.staging_id)
    payload = staged["payload"]

    print("report:", report)
    print("formats:", registry.formats())
    print("hint:", payload["hint"])
    print("headings:", [s["text"] for s in payload["text_spans"]])
    print("first row:", payload["table_rows"][0]["values"], payload["table_rows"][0]["loc"])
    print("total table rows:", len(payload["table_rows"]))
    print("pending:", StagingStore().list_pending())

    assert report.rows == 3
    assert payload["hint"]["module"] == "sales"
    order_rows = [r for r in payload["table_rows"] if r["sheet"] == "订单"]
    assert order_rows[0]["values"]["金额"] == 120
    assert order_rows[0]["loc"]["file_hash"] == stored.file_hash
    assert order_rows[0]["loc"]["char_range"].startswith("A2")
    print("last audit:", HarnessRuntime.list_audit(1)[0])
    print("M1.5 TEST PASSED")


if __name__ == "__main__":
    main()
