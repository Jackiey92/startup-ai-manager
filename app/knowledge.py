"""Read-only projections of stored 2A evidence, 2B facts and 2c runtimes.

No classifier, extractor, promotion, map rebuild or snapshot writer is invoked.
Grouping follows the existing file classification and persisted module dictionary.
"""
from __future__ import annotations

from urllib.parse import urlencode, quote

from .classifier import ClassificationService
from .db.database import connect
from .memory.company_facts import ConsolidationService
from .memory.company_facts.l2_cap_table import CapTableStore, replay_cap_table
from .memory.archive.archive_service import ExtractionMemoryService
from .ports import MemoryUnavailable
from .memory.user_memory.l1_memory_brief import RuntimeWorkingMemory
from .storage.mapping_store import SourceMapService, render_mapping


class KnowledgeService:
    def __init__(self, db_path, memory, *, objects_path):
        self.db_path = db_path
        self.memory = memory
        self.maps = SourceMapService(db_path, objects_path)
        self.extraction = ExtractionMemoryService(memory)

    def _catalog(self, company_id: str) -> list[dict]:
        # source_files has no company column: never enumerate it unscoped.
        with connect(self.db_path) as conn:
            rows = conn.execute("""
                SELECT s.* FROM source_files s WHERE s.file_hash IN (
                    SELECT file_hash FROM parse_jobs WHERE company_id=?
                    UNION SELECT file_hash FROM file_classifications WHERE company_id=?
                    UNION SELECT source_file FROM facts WHERE company_id=?
                ) ORDER BY s.uploaded_at, s.file_hash
            """, (company_id, company_id, company_id)).fetchall()
        return [dict(row) for row in rows]

    @staticmethod
    def source_ref(file_hash, *, page=None, locator=None, l2_manifest_uri=None) -> dict:
        params = {k: v for k, v in (("page", page), ("locator", locator)) if v is not None}
        url = f"/knowledge/sources/{quote(str(file_hash), safe='')}" if file_hash else None
        if url and params:
            url += "?" + urlencode(params)
        return {"file_hash": file_hash, "page": page, "locator": locator,
                "l2_manifest_uri": l2_manifest_uri, "url": url}

    def _source(self, stored: dict, company_id: str) -> dict:
        file_hash = stored["file_hash"]
        warnings = []
        with connect(self.db_path) as conn:
            has_staging = conn.execute(
                "SELECT 1 FROM sqlite_master WHERE type='table' AND name='parse_staging'"
            ).fetchone() is not None
            job = conn.execute(
                "SELECT status,file_format FROM parse_jobs WHERE company_id=? AND file_hash=? ORDER BY id DESC LIMIT 1",
                (company_id, file_hash),
            ).fetchone()
        try:
            manifest = self.maps.read_manifest(file_hash=file_hash) if has_staging else None
        except KeyError:
            manifest = None
        except (ValueError, TypeError):
            manifest = None
            warnings.append("已存本地 L2 格式损坏，无法展示原文。")
        if manifest is not None and not isinstance(manifest, dict):
            manifest = None
            warnings.append("已存本地 L2 格式损坏，无法展示原文。")
        abstract = overview = l2_uri = None
        if manifest:
            source_id = manifest.get("source_id")
            if source_id:
                try:
                    extracted = self.extraction.read_source(company_id, source_id)
                    l2_uri = extracted["l2_manifest_uri"]
                    abstract, overview = extracted["abstract"], extracted["overview"]
                    remote = extracted["manifest"]
                    if isinstance(remote, dict) and remote.get("file_hash") == file_hash:
                        manifest = remote
                except (MemoryUnavailable, ValueError, TypeError):
                    warnings.append("记忆后端暂不可读或摘要格式损坏；以下为已存本地 L2。")
        edits = self.maps.list_edits(file_hash=file_hash, company_id=company_id)
        mapping = self.maps.read_map(file_hash=file_hash, company_id=company_id, manifest=manifest) if manifest else None
        ref = self.source_ref(file_hash, l2_manifest_uri=l2_uri)
        # Summaries are whole-document navigation, not invented per-sentence evidence.
        pages = []
        for page in (manifest or {}).get("pages", []) or []:
            if not isinstance(page, dict):
                continue
            page_no = page.get("page_no", page.get("page"))
            pages.append({"page": page_no, "mapping": render_mapping(
                {**manifest, "pages": [page]}, edits=edits,
            ), "source_ref": self.source_ref(file_hash, page=page_no, l2_manifest_uri=l2_uri)})
        return {"file_hash": file_hash, "original_name": stored["original_name"],
                "status": job["status"] if job else stored["status"],
                "format": job["file_format"] if job else None,
                **{key: stored[key] for key in ("mime_type", "size_bytes", "origin_zone", "uploaded_at")},
                "l0": {"content": abstract, "source_ref": ref},
                "l1": {"content": overview, "source_ref": ref},
                "l2": {"manifest_uri": l2_uri, "mapping": mapping, "pages": pages},
                "source_ref": ref, "warnings": warnings}

    def source(self, *, company_id: str, file_hash: str) -> dict:
        stored = next((row for row in self._catalog(company_id) if row["file_hash"] == file_hash), None)
        if stored is None:
            raise KeyError(file_hash)
        return self._source(stored, company_id)

    def _runtimes(self, company_id: str) -> dict:
        runtime = RuntimeWorkingMemory(self.memory)
        result = {"items": [], "warnings": []}
        try:
            listed = self.memory.query(prefix=runtime.root)
        except FileNotFoundError:
            return result
        except MemoryUnavailable:
            result["warnings"].append("工作记忆暂不可读，请检查本地记忆后端。")
            return result
        scopes = set()
        for item in listed:
            uri = item.get("uri", "")
            if not isinstance(uri, str) or not uri.startswith(runtime.root + "/"):
                continue
            parts = uri[len(runtime.root) + 1:].split("/")
            if len(parts) != 3 or parts[2] not in ("state.json", "events.jsonl"):
                continue
            if any(not value or value in (".", "..") or
                   any(not (c.isalnum() or c in "._-") for c in value) for value in parts[:2]):
                continue
            scopes.add(tuple(parts[:2]))
        for session_id, task_id in sorted(scopes):
            try:
                state = runtime.get_runtime(session_id, task_id, read_only=True)
                if not isinstance(state, dict):
                    raise ValueError("runtime state must be an object")
                if state.get("company_id") != company_id:
                    continue
                if state.get("session_id") != session_id or state.get("task_id") != task_id:
                    continue
                events = runtime.read_events(session_id, task_id)
                if any(not isinstance(event, dict) or not isinstance(event.get("payload", {}), dict)
                       for event in events):
                    raise ValueError("runtime events must be objects")
                if events and events[0].get("payload", {}).get("company_id") != company_id:
                    continue
                result["items"].append({"runtime": state, "events": events})
            except (KeyError, FileNotFoundError, MemoryUnavailable, ValueError, TypeError):
                result["warnings"].append("一条工作记忆不可读或已被清理，未展示其内容。")
        return result

    def read(self, *, company_id: str) -> dict:
        sources = [self._source(row, company_id) for row in self._catalog(company_id)]
        classifications = {}
        for row in ClassificationService(self.db_path).list_current(company_id=company_id):
            classifications.setdefault(row["file_hash"], row)
        with connect(self.db_path) as conn:
            labels = {row["code"]: row["name"] for row in conn.execute("SELECT code,name FROM modules")}
        for source in sources:
            category = classifications.get(source["file_hash"], {}).get("module")
            source.update(category=category, label=labels.get(category))
        groups = {}
        for fact in ConsolidationService(self.db_path).list_facts(company_id=company_id):
            if fact["status"] != "verified":
                continue
            category = classifications.get(fact["source_file"], {}).get("module")
            group = groups.setdefault(category, {"category": category, "label": labels.get(category), "facts": []})
            group["facts"].append({**fact, "source_ref": self.source_ref(
                fact["source_file"], page=fact["source_page"], locator=fact["source_span"],
            )})
        equity = {"events": [], "snapshot": None, "warnings": []}
        try:
            events = CapTableStore(self.memory).read_events(company_id, strict=True)
            if any(event.company_id != company_id for event in events):
                raise ValueError("cap table event scope mismatch")
            equity["events"] = [{**event.to_dict(), "provenance": [
                {**ref, "source_ref": self.source_ref(
                    ref.get("file_hash"), page=(ref.get("anchor") or {}).get("page_no"),
                    locator=(ref.get("anchor") or {}).get("locator"),
                )} for ref in event.source_refs
            ]} for event in events]
            if events:
                equity["snapshot"] = replay_cap_table(events, company_id=company_id)
        except (MemoryUnavailable, ValueError, TypeError, KeyError):
            equity["warnings"].append("股权事件链暂不可读或回放校验失败，未展示推算结果。")
        return {"company_id": company_id, "evidence": {"files": sources},
                "facts": {"groups": list(groups.values()), "cap_table": equity},
                "working_memory": self._runtimes(company_id)}
