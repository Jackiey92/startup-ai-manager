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
from pathlib import Path
from typing import Any

from .db.database import connect
from .storage.source_store import SourceFileStore


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


class SourceMapService:
    """Read mappings and append controlled replace/remove corrections."""

    def __init__(self, db_path, objects_path: Path | str = Path("data/objects")):
        self.db_path = db_path
        self.objects_path = Path(objects_path)

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

    def read_map(self, *, file_hash: str, company_id: str) -> str:
        return render_mapping(self._manifest(file_hash), edits=self.list_edits(file_hash=file_hash, company_id=company_id))

    def read_original(self, *, file_hash: str) -> dict[str, Any]:
        stored = SourceFileStore(objects_path=self.objects_path, db_path=self.db_path).get(file_hash)
        data = SourceFileStore(objects_path=self.objects_path, db_path=self.db_path).get_bytes(file_hash)
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
