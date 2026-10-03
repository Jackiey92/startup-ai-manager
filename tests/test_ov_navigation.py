from pathlib import Path

import pytest

from app.ov_navigation import OVNavigationService
from app.ports import LocalMemoryProvider


class NoNarrativeWrites(LocalMemoryProvider):
    def __init__(self, root: Path):
        super().__init__(root)
        self.put_calls = []

    def put(self, uri, content, *, metadata=None):
        self.put_calls.append((uri, content, metadata))
        if "/narratives/" in uri:
            raise AssertionError("SAM must not write the legacy narratives namespace")
        return super().put(uri, content, metadata=metadata)


def test_sidecar_routes_match_measured_openviking_shape(tmp_path):
    service = OVNavigationService(resources_root="viking://resources")
    resource = service.resource_uri("技术与产品", "a" * 64)
    assert resource == "viking://resources/技术与产品/" + "a" * 64 + ".md"
    assert service.sidecar_uris(resource) == {
        "abstract_uri": resource + "/.abstract.md",
        "overview_uri": resource + "/.overview.md",
    }


def test_reads_ov_generated_sidecars_without_writing_narratives(tmp_path):
    memory = NoNarrativeWrites(tmp_path / "ov")
    service = OVNavigationService(memory=memory)
    resource = service.resource_uri("财务", "b" * 64)
    memory.put(resource + "/.abstract.md", "盖戳：OV 自动摘要", metadata={"generated_by": "SemanticProcessor"})
    memory.put(resource + "/.overview.md", "# 财务\n\nOV 目录概览", metadata={"generated_by": "SemanticProcessor"})

    result = service.read_sidecars(resource)
    assert result is not None
    assert result["abstract"] == "盖戳：OV 自动摘要"
    assert "OV 目录概览" in result["overview"]
    assert result["provenance"] == "openviking.semantic_processor"
    assert not [call for call in memory.put_calls if "/narratives/" in call[0]]


def test_sidecars_are_not_ready_until_both_files_exist(tmp_path):
    memory = LocalMemoryProvider(tmp_path / "ov")
    service = OVNavigationService(memory=memory)
    resource = service.resource_uri("法务", "c" * 64)
    memory.put(resource + "/.abstract.md", "摘要")
    assert service.read_sidecars(resource) is None
    with pytest.raises(ValueError):
        service.sidecar_uris("file:///not-viking")
