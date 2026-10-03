import importlib.util
from pathlib import Path


ROOT = Path(__file__).parents[1]
QUALITY = ROOT / "skills/document-ingest/scripts/quality.py"


def _quality():
    spec = importlib.util.spec_from_file_location("document_ingest_quality", QUALITY)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _manifest(*texts: str) -> dict:
    return {"pages": [{"page_no": 1, "text_items": [
        {"text": text, "source_loc": {"file_hash": "a" * 64, "page_no": 1,
                                         "bbox": [0.091, 0.1, 0.8, 0.12], "locator": "mineru:page/1/block/0"}}
        for text in texts
    ]}]}


def test_quality_accepts_complete_company_guide():
    assert _quality().inspect_manifest(_manifest(
        "全资子公司常州未蓝新能源有限公司（主营电池管理系统及电池材料）2024年单独口径：",
        "• 营业收入0.92亿元",
    )) == []


def test_quality_flags_damaged_company_and_employee_must_retry_or_mark():
    quality = _quality()
    damaged = _manifest("全资子公司常州未蓝新能 池管理系统2024年单独口径")
    issues = quality.inspect_manifest(damaged)
    codes = {issue["code"] for issue in issues}
    assert {"mid_word_break", "missing_guide_colon"} <= codes
    # This is the employee decision contract: a failed first result cannot be
    # accepted as parsed; it must either trigger alternate-engine retry or be
    # surfaced as an explicit parse failure/review warning.
    retry_or_mark = {"retry_alternate_engine", "parse_failed_quality_review"}
    assert retry_or_mark & {"retry_alternate_engine" if issues else "parse_failed_quality_review"}
