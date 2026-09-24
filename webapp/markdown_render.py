"""Render a structured result dict as Markdown."""
from __future__ import annotations

from typing import Any


def _escape(value: Any) -> str:
    text = "" if value is None else str(value)
    return text.replace("|", "\\|").replace("\n", " ")


def render_parse_result(data: dict) -> str:
    parts: list[str] = []
    headings = {}
    for span in data.get("text_spans", []):
        if span.get("kind") == "heading":
            page = span.get("loc", {}).get("page")
            headings[page] = span.get("text", "")

    grouped: dict = {}
    for row in data.get("table_rows", []):
        page = row.get("loc", {}).get("page")
        grouped.setdefault(page, []).append(row)

    for page in sorted(grouped, key=lambda x: (x is None, x)):
        title = headings.get(page) or f"Sheet {page}"
        parts.append(f"## {title}\n")
        rows = grouped[page]
        headers = rows[0].get("headers", []) if rows else []
        if headers:
            parts.append("| " + " | ".join(_escape(h) for h in headers) + " |")
            parts.append("| " + " | ".join(["---"] * len(headers)) + " |")
            for row in rows:
                values = row.get("values", {})
                cells = [_escape(values.get(h, "")) for h in headers]
                parts.append("| " + " | ".join(cells) + " |")
        parts.append("")
    return "\n".join(parts).strip() + "\n"


def render_markdown(data: dict) -> str:
    fmt = data.get("format")

    if data.get("table_rows") is not None and ("text_spans" in data or "table_rows" in data):
        rendered = render_parse_result(data)
        if rendered.strip():
            return rendered

    parts: list[str] = []

    if fmt == "excel":
        for table in data.get("tables", []):
            headers = table.get("headers", [])
            parts.append(f"## {table.get('sheet', '')}\n")
            if headers:
                parts.append("| " + " | ".join(_escape(h) for h in headers) + " |")
                parts.append("| " + " | ".join(["---"] * len(headers)) + " |")
                for row in table.get("rows", []):
                    cells = [_escape(row.get(h, "")) for h in headers]
                    parts.append("| " + " | ".join(cells) + " |")
            parts.append("")
    elif fmt == "pdf":
        for page in data.get("pdf_pages", []):
            parts.append(f"## 第 {page.get('page')} 页\n")
            parts.append(page.get("text", "").strip())
            parts.append("")

    return "\n".join(parts).strip() + "\n"
