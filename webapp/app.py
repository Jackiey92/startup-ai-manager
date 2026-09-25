"""Startup AI Manager prototype and document-import APIs."""
from __future__ import annotations

import json
import os
import sqlite3
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, abort, render_template, request, send_file

import sys as _sys
BASE_DIR = Path(__file__).resolve().parent
_PROJECT_ROOT = BASE_DIR.parent
_sys.path.insert(0, str(_PROJECT_ROOT))

from app.storage import SourceFileStore
from app.db.database import init_db as init_core_db
from app.guidance import ImportGuideService, ModelUnavailable
from app.harness.staging import StagingStore
from app.providers import memory_provider, model_provider, runtime_provider
from app.runtime_config import RuntimeConfig
from markdown_render import render_markdown
import markdown as md_lib

RUNTIME_CONFIG = RuntimeConfig.from_env(project_root=_PROJECT_ROOT)
DATA_ROOT = RUNTIME_CONFIG.data_root
DATA_DIR = RUNTIME_CONFIG.app_db.parent
OBJECTS_DIR = RUNTIME_CONFIG.objects_dir
MAIN_DB = RUNTIME_CONFIG.main_db
DB_PATH = RUNTIME_CONFIG.app_db

OBJECTS_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)
app.extensions["sam_runtime_config"] = RUNTIME_CONFIG
app.extensions["sam_memory_provider"] = memory_provider(RUNTIME_CONFIG)


@app.after_request
def add_cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    init_core_db(MAIN_DB)
    with db() as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS files ("
            "id INTEGER PRIMARY KEY AUTOINCREMENT,"
            "file_hash TEXT NOT NULL UNIQUE,"
            "original_name TEXT NOT NULL,"
            "file_format TEXT NOT NULL,"
            "size INTEGER NOT NULL,"
            "storage_path TEXT NOT NULL,"
            "module TEXT,"
            "doc_type TEXT,"
            "confidence REAL,"
            "structured TEXT,"
            "uploaded_at TEXT NOT NULL)"
        )
        conn.commit()


def detect_format(filename: str) -> str:
    name = filename.lower()
    if name.endswith((".xlsx", ".xlsm", ".xls")):
        return "excel"
    if name.endswith(".pdf"):
        return "pdf"
    return "unknown"


def import_guide(*, event: str, uploaded_file_hash: str | None = None) -> dict:
    """Return a real model guide, never a browser-side fallback template."""
    service = ImportGuideService(
        store=SourceFileStore(objects_path=OBJECTS_DIR, db_path=MAIN_DB),
        db_path=MAIN_DB,
        model_provider=model_provider(RUNTIME_CONFIG),
    )
    return service.generate(event=event, uploaded_file_hash=uploaded_file_hash)


@app.route("/")
@app.route("/prototype")
def prototype_page():
    """Serve the GitHub prototype as the single UI shell for every module."""
    proto = BASE_DIR.parent / "prototype" / "startup-ai-manager.html"
    return send_file(str(proto))


@app.route("/api/chat", methods=["POST", "OPTIONS"])
def api_chat():
    if request.method == "OPTIONS":
        return ("", 204)
    payload = request.get_json(silent=True) or {}
    question = (payload.get("message") or "").strip()
    if not question:
        return {"error": "empty message"}, 400

    adapter = runtime_provider(RUNTIME_CONFIG, StagingStore(db_path=MAIN_DB))
    try:
        raw = adapter.run_agent_message(question, timeout=600)
    except (RuntimeError, OSError, subprocess.SubprocessError):
        return {"error": "agent failed"}, 502
    data = json.loads(raw)
    answer = ""
    meta = data.get("meta") or {}
    answer = meta.get("finalAssistantVisibleText") or ""
    if not answer:
        for pl in data.get("payloads", []):
            answer += pl.get("text", "")
    return {"message": answer, "model": os.environ.get(RUNTIME_CONFIG.model_name_env, RUNTIME_CONFIG.model_default)}


@app.route("/api/upload", methods=["POST", "OPTIONS"])
def api_upload():
    if request.method == "OPTIONS":
        return ("", 204)

    upload = request.files.get("file")
    if upload is None or not upload.filename:
        return {"error": "no file"}, 400

    blob = upload.read()
    file_format = detect_format(upload.filename)
    if file_format == "unknown":
        return {"error": "unsupported format"}, 400

    store = SourceFileStore(objects_path=OBJECTS_DIR, db_path=MAIN_DB)
    stored = store.put_bytes(
        blob,
        original_name=upload.filename,
        mime_type="application/pdf" if file_format == "pdf" else None,
        origin_zone="internal",
    )
    file_hash = stored.file_hash

    harness_format = "xlsx" if file_format == "excel" else file_format
    adapter = runtime_provider(RUNTIME_CONFIG, StagingStore(db_path=MAIN_DB))
    parse_status = "not_supported"
    if adapter.supports(harness_format):
        try:
            adapter.run_parse(file_hash, harness_format, timeout=600)
            parse_status = "parsed"
        except (RuntimeError, OSError, subprocess.SubprocessError):
            # The immutable original is still stored. A failed optional parser
            # must not turn a completed upload into a false client-side failure.
            parse_status = "pending_runtime"

    response = {
        "file_hash": file_hash,
        "original_name": upload.filename,
        "format": file_format,
        "size": len(blob),
        "parse_status": parse_status,
    }
    try:
        response["guide"] = import_guide(event="upload", uploaded_file_hash=file_hash)
    except ModelUnavailable as exc:
        response["guide_error"] = "AI import guide is temporarily unavailable."
        app.logger.info("import guide unavailable after upload: %s", exc)
    return response


@app.route("/api/import-guide", methods=["POST", "OPTIONS"])
def api_import_guide():
    if request.method == "OPTIONS":
        return ("", 204)
    payload = request.get_json(silent=True) or {}
    event = payload.get("event", "open")
    if event not in {"open", "upload", "refresh"}:
        return {"error": "invalid import guide event"}, 400
    uploaded_file_hash = payload.get("uploaded_file_hash")
    if uploaded_file_hash is not None and not isinstance(uploaded_file_hash, str):
        return {"error": "invalid uploaded_file_hash"}, 400
    try:
        return {"guide": import_guide(event=event, uploaded_file_hash=uploaded_file_hash)}
    except ModelUnavailable as exc:
        app.logger.info("import guide unavailable: %s", exc)
        return {"error": "import guide unavailable"}, 503


@app.route("/files/<int:file_id>")
def detail(file_id):
    with db() as conn:
        row = conn.execute("SELECT * FROM files WHERE id=?", (file_id,)).fetchone()
    if row is None:
        abort(404)
    data = dict(row)
    structured = json.loads(data["structured"])
    markdown_text = structured.get("markdown") or render_markdown(structured)
    markdown_html = md_lib.markdown(markdown_text, extensions=["tables"])
    markdown_html = markdown_html.replace("<table>", "<div class=\"tbl-wrap\"><table>").replace("</table>", "</table></div>")
    return render_template("detail.html", file=data, markdown_html=markdown_html)


if __name__ == "__main__":
    import os
    init_db()
    app.run(
        host=os.environ.get("HOST", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=False,
    )
