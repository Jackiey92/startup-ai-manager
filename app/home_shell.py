"""Serve the single visual source with host-owned, script-safe configuration."""
from __future__ import annotations

import json
import os
from pathlib import Path

from flask import Response


def render_home_shell(project_root: Path, *, readonly: bool) -> Response:
    source = (project_root / "prototype" / "startup-ai-manager.html").read_text(encoding="utf-8")
    config = json.dumps({
        "mode": "readonly" if readonly else "full",
        "company_id": os.environ.get("SAM_COMPANY_ID", "default"),
    }, ensure_ascii=True)
    # JSON escaping alone does not prevent an HTML parser closing <script>.
    for char, escaped in (("<", "\\u003c"), (">", "\\u003e"), ("&", "\\u0026")):
        config = config.replace(char, escaped)
    marker = "<script>"
    if marker not in source:
        raise RuntimeError("SAM home shell is missing its script injection point")
    html = source.replace(marker, f"{marker}\nwindow.SAM_CONFIG = {config};", 1)
    return Response(html, mimetype="text/html", headers={"Cache-Control": "no-store"})
