from app.upload_status import parse_result_status


def test_upload_only_stores_parsed_manifests():
    assert parse_result_status({"parse_summary": {"status": "parsed"}}) == ("parsed", "not_attempted")
    assert parse_result_status({"parse_summary": {"status": "engine_unavailable"}}) == (
        "engine_unavailable", "engine_unavailable"
    )
    assert parse_result_status({"parse_summary": {"status": "parse_failed"}}) == (
        "parse_failed", "parse_failed"
    )
    assert parse_result_status({"pages": []}) == ("parse_failed", "parse_failed")
