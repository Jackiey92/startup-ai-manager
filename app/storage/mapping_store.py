"""Canonical 2A source mapping and append-only human corrections.

This module is deliberately below the CLI and above the storage/database
layers.  It never changes the immutable source blob or promotes anything to
2B.  A mapping is a projection of the latest parsed L2 manifest plus active
correction records, rendered as a conservative Markdown document.
"""
from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timezone
import base64
import hashlib
import json
import os
import tempfile
from pathlib import Path
from typing import Any

from ..db.database import connect
from .archive_store import ArchiveFileStore
from .archive_paths import evidence_root, hash_relpath


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _coord(loc: Any, *, fallback_page: Any = None) -> str:
    """Render a stable, machine-readable coordinate, including missing data."""
    loc = loc if isinstance(loc, dict) else {}
    page = loc.get("page")
    if page is None:
        page = loc.get("page_no", fallback_page if fallback_page is not None else "?")
    locator = loc.get("locator") or loc.get("char_range")
    return f"page={page if page is not None else '?'}; locator={locator or 'missing'}"


def _frontmatter(values: dict[str, Any]) -> str:
    lines = ["---"]
    for key, value in values.items():
        encoded = json.dumps(value, ensure_ascii=False)
        lines.append(f"{key}: {encoded}")
    lines.append("---")
    return "\n".join(lines)


def _text_items(manifest: dict[str, Any]) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    for page in manifest.get("pages", []) if isinstance(manifest, dict) else []:
        if not isinstance(page, dict):
            continue
        page_no = page.get("page_no", page.get("page", "?"))
        for index, item in enumerate(page.get("text_items", []) or []):
            if not isinstance(item, dict):
                continue
            entry = deepcopy(item)
            entry["_page_no"] = page_no
            entry["_index"] = index
            items.append(entry)
    return items


def _table_rows(manifest: dict[str, Any]) -> list[tuple[Any, int, dict[str, Any]]]:
    rows: list[tuple[Any, int, dict[str, Any]]] = []
    for page in manifest.get("pages", []) if isinstance(manifest, dict) else []:
        if not isinstance(page, dict):
            continue
        page_no = page.get("page_no", page.get("page", "?"))
        for table_index, table in enumerate(page.get("tables", []) or []):
            if not isinstance(table, dict):
                continue
            for row_index, row in enumerate(table.get("rows", []) or []):
                values = row if isinstance(row, dict) else {str(i): value for i, value in enumerate(row or [])}
                rows.append((page_no, row_index, {"table_index": table_index, "headers": table.get("headers") or [], "values": values, "loc": row.get("source_loc") if isinstance(row, dict) else table.get("source_loc")}))
    return rows


def render_mapping(manifest: dict[str, Any], *, edits: list[dict[str, Any]] | None = None) -> str:
    """Render an L2 mapping Markdown without inventing missing coordinates."""
    edits = edits or []
    active = {str(item["target_locator"]): item for item in edits if item.get("status") == "active"}
    summary = manifest.get("parse_summary") if isinstance(manifest, dict) else {}
    summary = summary if isinstance(summary, dict) else {}
    meta = {
        "document_type": "2a_source_mapping",
        "source_id": manifest.get("source_id"),
        "file_hash": manifest.get("file_hash"),
        "original_name": manifest.get("filename") or manifest.get("original_name"),
        "format": manifest.get("format"),
        "parse_status": summary.get("status", "unknown"),
        "coordinate_policy": "source_loc is preserved; missing coordinates are explicit",
    }
    lines = [_frontmatter(meta), "", f"# {meta['original_name'] or '未命名原件'}", "",
             "> 本页是原件的 2A 映射，不是事实认定。未提供坐标处明确标注为 `missing`。", ""]
    lines += ["## 正文", ""]
    items = _text_items(manifest)
    if not items:
        lines.append("暂无可解析正文。")
    for item in items:
        loc = _coord(item.get("source_loc"), fallback_page=item.get("_page_no"))
        edit = active.get(loc)
        if edit and edit.get("operation") == "remove":
            lines.append(f"- ~~已移除原文片段~~ <!-- source: {loc}; correction: {edit['id']} -->")
            continue
        text = item.get("text", "")
        if edit and edit.get("operation") == "replace":
            text = edit.get("replacement_text") or ""
            marker = f"; correction: {edit['id']}"
        else:
            marker = ""
        lines.append(f"- {text} <!-- source: {loc}{marker} -->")

    lines += ["", "## 表格", "", "| 页码 | 行 | 内容 | 坐标 |", "| --- | ---: | --- | --- |"]
    rows = _table_rows(manifest)
    if not rows:
        lines.append("| — | — | — | missing |")
    else:
        for page_no, row_index, row in rows:
            values = " / ".join(str(v) for v in row["values"].values())
            if row["headers"]:
                values = " / ".join(str(v) for v in row["headers"]) + " => " + values
            loc = _coord(row.get("loc"), fallback_page=page_no)
            edit = active.get(loc)
            if edit and edit.get("operation") == "remove":
                values = "~~已移除原文行~~"
            elif edit and edit.get("operation") == "replace":
                values = str(edit.get("replacement_text") or "")
            lines.append(f"| {page_no} | {row_index} | {values.replace('|', '\\|')} | {loc} |")
    return "\n".join(lines) + "\n"


def write_mapping(path: Path, mapping: str) -> None:
    """Atomically replace a rebuildable projection using a unique sibling tmp."""
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", newline="",
                                         dir=path.parent, prefix=".mapping-", suffix=".tmp",
                                         delete=False) as stream:
            tmp_path = Path(stream.name)
            stream.write(mapping)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(tmp_path, path)
    finally:
        if tmp_path is not None:
            tmp_path.unlink(missing_ok=True)


def persist_latest_mapping(conn, file_hash: str, path: Path) -> str:
    """Caller holds the SQLite writer lock while replacing its projection."""
    row = conn.execute(
        "SELECT payload FROM parse_staging WHERE file_hash=? AND status='parsed' ORDER BY id DESC LIMIT 1",
        (file_hash,),
    ).fetchone()
    if row is None:
        raise KeyError(f"parsed mapping not found: {file_hash}")
    mapping = render_mapping(json.loads(row["payload"]))
    write_mapping(path, mapping)
    return mapping


class SourceMapService:
    """Read mappings and append controlled replace/remove corrections."""

    def __init__(self, db_path, objects_path: Path | str | None = None, *, maps_path=None):
        self.db_path = db_path
        self.objects_path = Path(objects_path) if objects_path is not None else evidence_root() / "bin"
        self.maps_path = Path(maps_path) if maps_path is not None else self.objects_path.parent / "map"

    def _manifest(self, file_hash: str) -> dict[str, Any]:
        with connect(self.db_path) as conn:
            row = conn.execute(
                "SELECT payload FROM parse_staging WHERE file_hash=? AND status='parsed' ORDER BY id DESC LIMIT 1",
                (file_hash,),
            ).fetchone()
        if row is None:
            raise KeyError(f"parsed mapping not found: {file_hash}")
        return json.loads(row["payload"])

    def list_edits(self, *, file_hash: str, company_id: str) -> list[dict[str, Any]]:
        with connect(self.db_path) as conn:
            rows = conn.execute(
                "SELECT * FROM source_edits WHERE file_hash=? AND company_id=? ORDER BY id ASC",
                (file_hash, company_id),
            ).fetchall()
        return [dict(row) for row in rows]

    def read_manifest(self, *, file_hash: str) -> dict[str, Any]:
        """Read the latest parsed L2; callers must enforce their company catalog."""
        return self._manifest(file_hash)

    def map_path(self, file_hash: str) -> Path:
        return self.maps_path / hash_relpath(file_hash, mapping=True)

    def rebuild_map(self, *, file_hash: str) -> str:
        """Persist the shared source projection, never company-private edits.

        Serialize with staging writers so concurrent parses cannot replace the
        newest projection with an older manifest. Reads never rebuild files.
        """
        with connect(self.db_path) as conn:
            conn.execute("BEGIN IMMEDIATE")
            return persist_latest_mapping(conn, file_hash, self.map_path(file_hash))

    def read_map(self, *, file_hash: str, company_id: str, manifest=None) -> str:
        # Synchronize the DB snapshot and file read with staging writers. This
        # transaction changes no rows; it only guards a projection replacement.
        with connect(self.db_path) as conn:
            conn.execute("BEGIN IMMEDIATE")
            row = conn.execute(
                "SELECT payload FROM parse_staging WHERE file_hash=? AND status='parsed' ORDER BY id DESC LIMIT 1",
                (file_hash,),
            ).fetchone()
            if row is None:
                raise KeyError(f"parsed mapping not found: {file_hash}")
            local = json.loads(row["payload"])
            edits = [dict(edit) for edit in conn.execute(
                "SELECT * FROM source_edits WHERE file_hash=? AND company_id=? ORDER BY id ASC",
                (file_hash, company_id),
            )]
            selected = local if manifest is None else manifest
            # Preserve remote-manifest preference and company correction scope.
            if selected == local and not any(edit["status"] == "active" for edit in edits):
                try:
                    return self.map_path(file_hash).read_text(encoding="utf-8")
                except (FileNotFoundError, UnicodeDecodeError):
                    pass
            return render_mapping(selected, edits=edits)

    def read_original(self, *, file_hash: str) -> dict[str, Any]:
        stored = ArchiveFileStore(objects_path=self.objects_path, db_path=self.db_path).get(file_hash)
        data = ArchiveFileStore(objects_path=self.objects_path, db_path=self.db_path).get_bytes(file_hash)
        result: dict[str, Any] = {
            "file_hash": stored.file_hash, "original_name": stored.original_name,
            "mime_type": stored.mime_type, "size_bytes": stored.size_bytes,
            "status": stored.status, "sha256_verified": hashlib.sha256(data).hexdigest() == file_hash,
        }
        try:
            result["text"] = data.decode("utf-8")
        except UnicodeDecodeError:
            result["base64"] = base64.b64encode(data).decode("ascii")
        return result

    def _edit(self, *, file_hash: str, company_id: str, operation: str,
              target_locator: str, replacement_text: str | None, confirm: bool) -> dict[str, Any]:
        if not company_id or not isinstance(company_id, str):
            raise ValueError("company_id must be injected by the host")
        if not confirm:
            raise PermissionError("write operation requires --confirm")
        if operation not in {"replace", "remove"}:
            raise ValueError("unsupported correction operation")
        self._manifest(file_hash)  # verify a parsed mapping exists before writing
        with connect(self.db_path) as conn:
            conn.execute("BEGIN IMMEDIATE")
            current = conn.execute(
                "SELECT * FROM source_edits WHERE file_hash=? AND company_id=? AND target_locator=? AND status='active' ORDER BY id DESC LIMIT 1",
                (file_hash, company_id, target_locator),
            ).fetchone()
            if current is not None:
                conn.execute("UPDATE source_edits SET status='superseded' WHERE id=?", (current["id"],))
            cur = conn.execute(
                "INSERT INTO source_edits(file_hash,company_id,operation,target_locator,replacement_text,status,supersedes_id,created_at) VALUES (?,?,?,?,?,'active',?,?)",
                (file_hash, company_id, operation, target_locator, replacement_text,
                 current["id"] if current is not None else None, _now()),
            )
            persist_latest_mapping(conn, file_hash, self.map_path(file_hash))
            conn.commit()
            row = conn.execute("SELECT * FROM source_edits WHERE id=?", (cur.lastrowid,)).fetchone()
        return dict(row)

    def replace(self, *, file_hash: str, company_id: str, target_locator: str,
                replacement_text: str, confirm: bool = False) -> dict[str, Any]:
        return self._edit(file_hash=file_hash, company_id=company_id, operation="replace",
                          target_locator=target_locator, replacement_text=replacement_text, confirm=confirm)

    def remove(self, *, file_hash: str, company_id: str, target_locator: str,
               confirm: bool = False) -> dict[str, Any]:
        return self._edit(file_hash=file_hash, company_id=company_id, operation="remove",
                          target_locator=target_locator, replacement_text=None, confirm=confirm)
