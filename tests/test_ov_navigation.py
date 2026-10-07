from app.ov_navigation import OVNavigationService
from app.ports import LocalMemoryProvider


def routes():
    return {"ov_resource_uri": "viking://resources/sample.md", "ov_sidecar_uris": {
        "abstract_uri": "viking://sam-test/2a_extraction/acc-test/sample/L0/abstract.md",
        "overview_uri": "viking://sam-test/2a_extraction/acc-test/sample/L1/overview.md",
    }}


def test_reads_exact_sam_coordinates(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    manifest = routes()
    for key, uri in manifest["ov_sidecar_uris"].items():
        memory.put(uri, key)
    result = OVNavigationService(memory=memory).read_sidecars(manifest)
    assert result["abstract"] == "abstract_uri"
    assert result["overview"] == "overview_uri"
    assert result["provenance"] == "sam.visual_extraction"


def test_no_fallback_to_ov_reserved_sidecars(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    manifest = routes()
    resource = manifest["ov_resource_uri"]
    memory.put(resource + "/.abstract.md", "OV")
    memory.put(resource + "/.overview.md", "OV")
    service = OVNavigationService(memory=memory)
    assert service.read_sidecars(manifest) is None
    assert service.read_sidecars({"ov_resource_uri": resource}) is None
    manifest["ov_sidecar_uris"] = {
        "abstract_uri": resource + "/.abstract.md",
        "overview_uri": resource + "/.overview.md",
    }
    assert service.read_sidecars(manifest) is None


def test_sidecars_are_not_ready_until_both_files_exist(tmp_path):
    memory = LocalMemoryProvider(tmp_path)
    manifest = routes()
    memory.put(manifest["ov_sidecar_uris"]["abstract_uri"], "摘要")
    assert OVNavigationService(memory=memory).read_sidecars(manifest) is None
