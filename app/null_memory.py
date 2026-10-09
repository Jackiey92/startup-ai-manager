"""Network-free, disk-free memory boundary for the cloud display window."""
from __future__ import annotations

from collections.abc import Sequence
from typing import Any


class ReadOnlyMemoryError(RuntimeError):
    """A programming error attempted to write through the cloud boundary."""


class NullMemoryProvider:
    """All reads are empty; all writes fail explicitly and persist no data.

    Cloud snapshots are stored separately, never in OV or local memory. Failing
    rather than silently acknowledging a write prevents false success reports.
    """

    def __init__(self, *, memory_root: str = "viking://sam-cloud-readonly/disabled"):
        self.memory_root = memory_root

    def read(self, uri: str) -> str:
        return ""

    def query(self, *, prefix: str, query: str | None = None) -> list[dict[str, Any]]:
        return []

    def search(self, query: str, *, prefix: str = "viking://") -> list[dict[str, Any]]:
        return []

    def get_fact(self, company_id: str, fact_key: str) -> dict[str, Any] | None:
        return None

    def get_2b(self, company_id: str, key: str) -> dict[str, Any] | None:
        return None

    def list_facts(self, company_id: str, *, fact_keys: Sequence[str] = ()) -> list[dict[str, Any]]:
        return []

    @staticmethod
    def _reject() -> None:
        raise ReadOnlyMemoryError("云端记忆只读，不落任何数据，请在本地操作")

    def add_resource(self, path: str, *, parent: str, wait: bool = True) -> None:
        self._reject()

    def add_resource_to(self, path: str, target_uri: str, *, wait: bool = True,
                        timeout: int = 600) -> None:
        self._reject()

    def ensure_directory(self, uri: str) -> None:
        self._reject()

    def wait_for_resource(self, uri: str, *, timeout: int = 600, interval: float = 2.0) -> None:
        self._reject()

    def put(self, uri: str, content: str, *, metadata: dict[str, Any] | None = None) -> None:
        self._reject()

    def put_fact(self, company_id: str, fact_key: str, fact: dict[str, Any]) -> None:
        self._reject()

    def delete(self, uri: str, *, recursive: bool = False) -> None:
        self._reject()
