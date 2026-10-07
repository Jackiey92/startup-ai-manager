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
from .memory_paths import MEMORY_ROOT
from .storage.source_store import SourceFileStore

ROOT = MEMORY_ROOT
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

    @staticmethod
    def _source_ids_from_items(company_id: str, items: list[dict[str, Any]]) -> tuple[str, ...]:
        """Extract source IDs from one provider listing response."""
        company = _safe(company_id)
        discovered: set[str] = set()
        for item in items:
            uri = _uri(item.get("uri")) if isinstance(item, dict) else None
            if not uri or not (
                uri.endswith("/L0") or uri.endswith("/L1")
                or uri.endswith("/manifest.json") or uri.endswith("/abstract.md")
                or uri.endswith("/L2") or uri.endswith("/mapping.md")
            ):
                continue
            marker = f"/2a_extraction/{company}/"
            if marker not in uri:
                continue
            discovered.add(uri.split(marker, 1)[-1].split("/", 1)[0])
        return tuple(sorted(discovered))

    def _listed_source_ids(self, company_id: str) -> tuple[str, ...]:
        """Read currently enumerable 2A source IDs without trusting a cache."""
        company = _safe(company_id)
        return self._source_ids_from_items(
            company, self.memory.query(prefix=f"{self.root}/2a_extraction/{company}")
        )

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
        discovered = set(self._source_ids_from_items(company, items)) if items else set()
        # The recursive listing is eventually consistent.  Explicit source
        # IDs are read by deterministic URI and therefore win over its view.
        candidates = sorted(discovered | {_safe(value) for value in source_ids})
        for source_id in candidates:
            # The parser-owned L2 mapping remains available even if SAM
            # L0/L1 extraction is deferred. Navigate to this stable body.
            branch_uri = f"{self.root}/2a_extraction/{company}/{source_id}/L2/mapping.md"
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
                listed_source_ids = self._listed_source_ids(company_id)
                if (
                    not any(item.get("dangling") for item in data.get("branches", []))
                    and set(source_ids) <= cached_source_ids
                    and set(listed_source_ids) <= cached_source_ids
                ):
                    return MemoryMapResult(_safe(company_id), data, bool(data.get("degraded")))
                source_ids = tuple(sorted(set(source_ids) | set(listed_source_ids)))
        except Exception:
            pass
        try:
            return self.rebuild_map(company_id, source_ids=tuple(sorted(cached_source_ids | set(source_ids))), fact_keys=fact_keys)
        except Exception:
            return MemoryMapResult(_safe(company_id), {"company_id": _safe(company_id), "branches": [], "degraded": True}, True)

    def global_read_map(self, *, source_catalog: tuple[tuple[str, str], ...] = ()) -> dict[str, Any]:
        """Build an in-memory navigation view for the trusted manager scope.

        This deliberately does not call ``put``: a manager may inspect every
        project resource, but the read-only scope must not create or refresh a
        cache as a side effect of ``sam_memory_map``.  The normal company map
        remains the durable, company-scoped navigation artifact.
        """
        branches: list[dict[str, Any]] = []
        degraded = False
        seen: set[str] = set()
        try:
            items = self.memory.query(prefix=f"{self.root}/2a_extraction")
        except Exception:
            items = []
            degraded = True
        marker = f"{self.root}/2a_extraction/"
        for item in items:
            uri = _uri(item.get("uri")) if isinstance(item, dict) else None
            if not uri or not uri.startswith(marker) or not uri.endswith("/L2/mapping.md"):
                continue
            relative = uri[len(marker):].split("/")
            if len(relative) < 3:
                continue
            company_id, source_id = relative[0], relative[1]
            if uri in seen:
                continue
            seen.add(uri)
            branches.append({
                "module": "source",
                "title": f"资料 {company_id}/{source_id[:12]}",
                "uri": uri,
                "kind": "2a",
                "company_id": company_id,
                "source_id": source_id,
                "has_children": True,
                "dangling": False,
            })
        # Provider directory listings can lag (and some OV deployments reject
        # recursive listing under a busy root).  The trusted host-side parse
        # catalog is therefore an explicit read-only fallback: it contributes
        # deterministic URIs, and each URI is still checked through the
        # provider before being exposed to the employee.
        for company_id, source_id in source_catalog:
            company = _safe(company_id)
            source = _safe(source_id)
            uri = f"{self.root}/2a_extraction/{company}/{source}/L2/mapping.md"
            if uri in seen:
                continue
            exists = self._exists(uri)
            if not exists:
                continue
            seen.add(uri)
            branches.append({
                "module": "source",
                "title": f"资料 {company}/{source[:12]}",
                "uri": uri,
                "kind": "2a",
                "company_id": company,
                "source_id": source,
                "has_children": True,
                "dangling": False,
            })
        try:
            fact_items = self.memory.query(prefix=f"{self.root}/2b_facts")
        except Exception:
            fact_items = []
            degraded = True
        fact_companies: set[str] = set()
        fact_marker = f"{self.root}/2b_facts/"
        for item in fact_items:
            uri = _uri(item.get("uri")) if isinstance(item, dict) else None
            if uri and uri.startswith(fact_marker):
                tail = uri[len(fact_marker):].split("/")
                if tail and tail[0]:
                    fact_companies.add(tail[0])
        for company_id in sorted(fact_companies):
            branches.append({
                "module": "facts",
                "title": f"已验证事实 {company_id}",
                "uri": f"{self.root}/2b_facts/{company_id}",
                "kind": "2b",
                "company_id": company_id,
                "has_children": True,
                "dangling": False,
            })
        branches.sort(key=lambda item: (item["module"], item["uri"]))
        data: dict[str, Any] = {
            "scope": "global_read_only",
            "read_only": True,
            "updated_at": _now(),
            "revision": self._revision(branches),
            "branches": branches,
            "files_index_uri": f"{self.root}/2a_extraction",
            "degraded": degraded,
        }
        encoded = json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        while len(encoded) > self.max_chars and data["branches"]:
            data["branches"].pop()
            data["truncated"] = True
            encoded = json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        return data

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
    """Tool-shaped facade with strict company or trusted global-read boundaries."""

    def __init__(self, memory: MemoryProvider, files: SourceFileStore, company_id: str, *, source_ids: tuple[str, ...] = (), global_read_only: bool = False, source_catalog: tuple[tuple[str, str], ...] = ()):
        self.memory, self.files, self.company_id = memory, files, _safe(company_id)
        self.global_read_only = bool(global_read_only)
        self.source_catalog = tuple(source_catalog)
        self.scope = f"{ROOT}/"
        self.company_prefixes = (
            f"{ROOT}/memory_maps/{self.company_id}/",
            f"{ROOT}/2a_extraction/{self.company_id}/",
            f"{ROOT}/2b_facts/{self.company_id}/",
        )
        self.global_prefixes = (f"{ROOT}/", "viking://resources/")
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
        if not isinstance(uri, str):
            raise PermissionError("memory URI is outside company scope")
        if self.global_read_only:
            if not uri.startswith(self.global_prefixes):
                raise PermissionError("memory URI is outside global read scope")
        elif not uri.startswith(self.company_prefixes):
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
            # Search both navigation metadata and extracted L2.  A map branch
            # must be discoverable without guessing its URI.
            rows = []
            prefixes = self.global_prefixes if self.global_read_only else (
                f"{ROOT}/memory_maps/{self.company_id}",
                f"{ROOT}/2a_extraction/{self.company_id}",
            )
            for prefix in prefixes:
                rows.extend(self.memory.search(query, prefix=prefix))
        except Exception as exc:
            if not self.global_read_only:
                raise RuntimeError("memory search unavailable") from exc
            # Some OV versions reject recursive search at a project root even
            # though exact reads work.  The trusted catalog lets the manager
            # retain global read semantics without widening to arbitrary URIs.
            rows = []
            needle = str(query).lower()
            for company_id, source_id in self.source_catalog:
                uri = f"{ROOT}/2a_extraction/{_safe(company_id)}/{_safe(source_id)}/L2/mapping.md"
                try:
                    content = self.memory.read(uri)
                except Exception:
                    continue
                if needle in str(content).lower():
                    rows.append({"uri": uri})
        uris = []
        for row in rows:
            uri = row.get("uri") if isinstance(row, dict) else None
            if isinstance(uri, str) and (
                uri.startswith(self.global_prefixes) if self.global_read_only else (
                    uri.startswith(self.company_prefixes[0]) or uri.startswith(self.company_prefixes[1])
                )
            ):
                uris.append(uri)
        self.navigation.extend(uris)
        return sorted(set(uris))

    def file_get(self, file_hash: str) -> dict[str, Any]:
        if not isinstance(file_hash, str) or not re.fullmatch(r"[0-9a-f]{64}", file_hash):
            raise ValueError("invalid file hash")
        if not self.global_read_only and file_hash not in self._file_hashes:
            raise PermissionError("file is outside company scope")
        try:
            stored = self.files.get(file_hash)
        except Exception as exc:
            raise RuntimeError("file unavailable") from exc
        return {"file_hash": stored.file_hash, "original_name": stored.original_name, "format": stored.mime_type, "size_bytes": stored.size_bytes, "storage_path": stored.storage_path}

    def tool_manifest(self) -> list[str]:
        return ["memory_read(uri)", "memory_search(query)", "file_get(file_hash)"]
