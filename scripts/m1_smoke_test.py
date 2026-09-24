"""M1 smoke test: end-to-end exercise of source layer + classifier + gateway."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.db import init_db, connect
from app.storage import SourceFileStore
from app.classifier import FileClassifier
from app.harness import TransactionGateway, FactInput


def main() -> None:
    init_db()

    sample = Path("data/samples")
    sample.mkdir(parents=True, exist_ok=True)
    f1 = sample / "销售订单_2026Q3.csv"
    f1.write_text("order,amount\nSO-1,100\n", encoding="utf-8")
    f2 = sample / "扫描件001.bin"
    f2.write_bytes(b"\x00\x01binary")

    store = SourceFileStore()
    stored1 = store.put_path(f1, mime_type="text/csv", uploaded_by="founder")
    stored2 = store.put_path(f2, mime_type="application/octet-stream", uploaded_by="founder")
    again = store.put_path(f1, mime_type="text/csv", uploaded_by="founder")
    assert again.file_hash == stored1.file_hash, "dedup failed"

    guess1 = FileClassifier.guess(stored1.original_name)
    guess2 = FileClassifier.guess(stored2.original_name)
    FileClassifier.record_classification(stored1.file_hash, guess1)

    gateway = TransactionGateway()
    fact_id = gateway.assert_fact(
        FactInput(
            entity="company",
            attribute="sales_order_amount",
            value=100,
            value_type="number",
            unit="CNY",
            source_file=stored1.file_hash,
            confidence=1.0,
        )
    )
    new_id = gateway.assert_fact(
        FactInput(
            entity="company",
            attribute="sales_order_amount",
            value=120,
            value_type="number",
            unit="CNY",
            source_file=stored1.file_hash,
        )
    )

    with connect() as conn:
        files = conn.execute("SELECT COUNT(*) c FROM source_files").fetchone()["c"]
        classifications = conn.execute(
            "SELECT module,doc_type,status FROM file_classifications"
        ).fetchall()
        active_facts = conn.execute(
            "SELECT value,status,source_file,valid_to FROM facts WHERE id=?", (new_id,)
        ).fetchone()
        old = conn.execute(
            "SELECT value,valid_to,superseded_by FROM facts WHERE id=?", (fact_id,)
        ).fetchone()

    print("files:", files)
    print("guess1:", guess1)
    print("guess2 (should be None module):", guess2)
    print("classifications:", [dict(r) for r in classifications])
    print("active fact:", dict(active_facts))
    print("superseded fact:", dict(old))
    assert files == 2
    assert guess1.module == "sales" and guess1.doc_type == "sales_order"
    assert guess2.module is None
    assert active_facts["value"] == "120" and active_facts["valid_to"] is None
    assert old["valid_to"] is not None and old["superseded_by"] == new_id
    blob = store.get_bytes(stored1.file_hash)
    assert blob == f1.read_bytes()
    print("M1 SMOKE TEST PASSED")


if __name__ == "__main__":
    main()
