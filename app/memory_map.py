"""Company memory maps and deliberately narrow drill-down tools.

The map is navigation metadata, not a second fact store.  It contains links
and short labels only; agents must use :class:`MemoryMapTools` to read a
branch or retrieve an original by its content hash.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import hashlib
import json
import re
from typing import Any, Callable

from .ports import MemoryProvider, MemoryUnavailable
from .storage.source_store import SourceFileStore

ROOT = "viking://user/default/memories/projects/10_startup_ai_manager"
MAP_ROOT = ROOT + "/memory_maps"
MAP_LIMIT = 12_000


def _safe(value: str) -> str:
    value = re.sub(r"[^A-Za-z0-9_.-]", "", str(value))
    if not value:
        raise ValueError("company scope is empty")
    return value


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _uri(value: Any) -> str | None:
    return value if isinstance(value, str) and value.startswith("viking://") else None


@dataclass(frozen=True)
class MemoryMapResult:
    company_id: str
    map: dict[str, Any]
    degraded: bool = False


class MapBuilder:
    """Deterministically rebuild one company's map from provider listings."""

    def __init__(self, memory: MemoryProvider, *, root: str = ROOT, max_chars: int = MAP_LIMIT):
        self.memory = memory
        self.root = root.rstrip("/")
        self.max_chars = max_chars

    def map_uri(self, company_id: str) -> str:
        return f"{self.root}/memory_maps/{_safe(company_id)}/map.json"

    def overview_uri(self, company_id: str) -> str:
        return f"{self.root}/memory_maps/{_safe(company_id)}/company_overview.md"

    def markdown_uri(self, company_id: str) -> str:
        return f"{self.root}/memory_maps/{_safe(company_id)}/map.md"

    def rebuild_map(self, company_id: str, *, source_ids: tuple[str, ...] = (), fact_keys: tuple[str, ...] = ()) -> MemoryMapResult:
        company = _safe(company_id)
        degraded = False
        branches: list[dict[str, Any]] = []
        known: list[str] = []
        try:
            l2_prefix = f"{self.root}/2a_extraction/{company}"
            items = self.memory.query(prefix=l2_prefix)
        except Exception:
            items = []
            degraded = True
        discovered: set[str] = set()
        for item in sorted(items, key=lambda v: str(v.get("uri", ""))):
            uri = _uri(item.get("uri"))
            if not uri or not (uri.endswith("/L0") or uri.endswith("/L1") or uri.endswith("/manifest.json") or uri.endswith("/L2")):
                continue
            source_id = uri.split(f"/2a_extraction/{company}/", 1)[-1].split("/", 1)[0]
            discovered.add(source_id)
        # The recursive listing is eventually consistent.  Explicit source
        # IDs are read by deterministic URI and therefore win over its view.
        candidates = sorted(discovered | {_safe(value) for value in source_ids})
        for source_id in candidates:
            branch_uri = f"{self.root}/2a_extraction/{company}/{source_id}/L0/abstract.md"
            if branch_uri in known:
                continue
            known.append(branch_uri)
            branches.append({
                "module": "source",
                "title": f"资料 {source_id[:12]}",
                "uri": branch_uri,
                "kind": "2a",
                "has_children": True,
                "dangling": not self._exists(branch_uri),
            })
        try:
            try:
                facts = self.memory.list_facts(company, fact_keys=fact_keys)
            except TypeError:  # backwards-compatible third-party providers
                facts = self.memory.list_facts(company)
        except Exception:
            facts = []
            degraded = True
        if facts:
            fact_uri = f"{self.root}/2b_facts/{company}"
            branches.append({"module": "facts", "title": "已验证事实", "uri": fact_uri, "kind": "2b", "has_children": True, "dangling": not self._exists(fact_uri)})
        branches.sort(key=lambda b: (b["module"], b["uri"]))
        map_data = {
            "company_id": company,
            "updated_at": _now(),
            "revision": self._revision(branches),
            "branches": branches,
            "files_index_uri": f"{self.root}/2a_extraction/{company}",
            "open_loops_uri": f"{self.root}/2c_runtime",
            "degraded": degraded,
        }
        encoded = json.dumps(map_data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        while len(encoded) > self.max_chars and map_data["branches"]:
            map_data["branches"].pop()
            map_data["truncated"] = True
            encoded = json.dumps(map_data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        self.memory.put(self.map_uri(company), json.dumps(map_data, ensure_ascii=False, sort_keys=True), metadata={"layer": "map", "company_id": company})
        overview = "# 公司记忆地图\n\n" + "\n".join(f"- [{b['title']}]({b['uri']})" for b in map_data["branches"])
        if degraded:
            overview += "\n\n> degraded: 部分记忆源暂不可用。"
        self.memory.put(self.overview_uri(company), overview, metadata={"layer": "map", "company_id": company})
        self.memory.put(self.markdown_uri(company), overview, metadata={"layer": "map", "company_id": company})
        return MemoryMapResult(company, map_data, degraded)

    def load_or_rebuild(self, company_id: str, *, source_ids: tuple[str, ...] = (), fact_keys: tuple[str, ...] = ()) -> MemoryMapResult:
        cached_source_ids: set[str] = set()
        try:
            data = json.loads(self.memory.read(self.map_uri(company_id)))
            if isinstance(data, dict) and data.get("company_id") == _safe(company_id):
                cached_source_ids = {
                    str(item.get("uri", "")).split(f"/2a_extraction/{_safe(company_id)}/", 1)[-1].split("/", 1)[0]
                    for item in data.get("branches", [])
                    if isinstance(item, dict) and item.get("kind") == "2a"
                }
                # A deleted source/fact must not remain silently linked from a
                # cached map. Rebuild when a previously live branch vanished.
                if not any(item.get("dangling") for item in data.get("branches", [])) and set(source_ids) <= cached_source_ids:
                    return MemoryMapResult(_safe(company_id), data, bool(data.get("degraded")))
        except Exception:
            pass
        try:
            return self.rebuild_map(company_id, source_ids=tuple(sorted(cached_source_ids | set(source_ids))), fact_keys=fact_keys)
        except Exception:
            return MemoryMapResult(_safe(company_id), {"company_id": _safe(company_id), "branches": [], "degraded": True}, True)

    def _exists(self, uri: str) -> bool:
        try:
            self.memory.read(uri)
            return True
        except Exception:
            try:
                return bool(self.memory.query(prefix=uri))
            except Exception:
                return False

    @staticmethod
    def _revision(branches: list[dict[str, Any]]) -> str:
        return hashlib.sha256(json.dumps(branches, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:16]


class MemoryMapTools:
    """Tool-shaped facade with strict company URI and file-hash boundaries."""

    def __init__(self, memory: MemoryProvider, files: SourceFileStore, company_id: str, *, source_ids: tuple[str, ...] = ()):
        self.memory, self.files, self.company_id = memory, files, _safe(company_id)
        self.scope = f"{ROOT}/"
        self.company_prefixes = (
            f"{ROOT}/memory_maps/{self.company_id}/",
            f"{ROOT}/2a_extraction/{self.company_id}/",
            f"{ROOT}/2b_facts/{self.company_id}/",
        )
        self.navigation: list[str] = []
        self._file_hashes: set[str] = set()
        for source_id in source_ids:
            manifest_uri = f"{ROOT}/2a_extraction/{self.company_id}/{_safe(source_id)}/L2/manifest.json"
            try:
                document = json.loads(memory.read(manifest_uri))
            except Exception:
                document = None
            if isinstance(document, dict) and isinstance(document.get("file_hash"), str):
                self._file_hashes.add(document["file_hash"])
        try:
            for item in memory.query(prefix=f"{ROOT}/2a_extraction/{self.company_id}"):
                content = item.get("content", "") if isinstance(item, dict) else ""
                try:
                    document = json.loads(content)
                except (TypeError, json.JSONDecodeError):
                    continue
                if isinstance(document, dict) and isinstance(document.get("file_hash"), str):
                    self._file_hashes.add(document["file_hash"])
        except Exception:
            self._file_hashes = set()

    def _check_uri(self, uri: str) -> str:
        if not isinstance(uri, str) or not uri.startswith(self.company_prefixes):
            raise PermissionError("memory URI is outside company scope")
        return uri

    def memory_read(self, uri: str) -> str:
        uri = self._check_uri(uri)
        self.navigation.append(uri)
        try:
            return self.memory.read(uri)
        except Exception as exc:
            raise RuntimeError("memory read unavailable") from exc

    def memory_search(self, query: str) -> list[str]:
        try:
            rows = self.memory.search(query, prefix=f"{ROOT}/2a_extraction/{self.company_id}")
        except Exception as exc:
            raise RuntimeError("memory search unavailable") from exc
        uris = []
        for row in rows:
            uri = row.get("uri") if isinstance(row, dict) else None
            if isinstance(uri, str) and uri.startswith(self.company_prefixes[1]):
                uris.append(uri)
        self.navigation.extend(uris)
        return sorted(set(uris))

    def file_get(self, file_hash: str) -> dict[str, Any]:
        if not isinstance(file_hash, str) or not re.fullmatch(r"[0-9a-f]{64}", file_hash):
            raise ValueError("invalid file hash")
        if file_hash not in self._file_hashes:
            raise PermissionError("file is outside company scope")
        try:
            stored = self.files.get(file_hash)
        except Exception as exc:
            raise RuntimeError("file unavailable") from exc
        return {"file_hash": stored.file_hash, "original_name": stored.original_name, "format": stored.mime_type, "size_bytes": stored.size_bytes, "storage_path": stored.storage_path}

    def tool_manifest(self) -> list[str]:
        return ["memory_read(uri)", "memory_search(query)", "file_get(file_hash)"]
