"""Sales import web app: upload -> classify/store -> parse -> view."""
from __future__ import annotations

import hashlib
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, render_template, request, redirect, url_for, abort

import sys as _sys
BASE_DIR = Path(__file__).resolve().parent
_PROJECT_ROOT = BASE_DIR.parent
_sys.path.insert(0, str(_PROJECT_ROOT))

from classify import classify
from app.storage import SourceFileStore
from app.harness.staging import StagingStore
from app.harness.runtime.openclaw_adapter import OpenClawAdapter
from markdown_render import render_markdown
import markdown as md_lib

DATA_DIR = BASE_DIR.parent / "data" / "sales_app"
OBJECTS_DIR = BASE_DIR.parent / "data" / "objects"
MAIN_DB = BASE_DIR.parent / "data" / "app.db"
DB_PATH = DATA_DIR / "app.db"

OBJECTS_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)


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


@app.route("/")
def index():
    with db() as conn:
        rows = conn.execute(
            "SELECT id,original_name,file_format,size,module,doc_type,uploaded_at"
            " FROM files ORDER BY id DESC"
        ).fetchall()
    return render_template("index.html", files=rows)


@app.route("/upload", methods=["POST"])
def upload():
    upload = request.files.get("file")
    if upload is None or not upload.filename:
        return redirect(url_for("index"))

    blob = upload.read()
    file_format = detect_format(upload.filename)
    if file_format == "unknown":
        return "仅支持 PDF / Excel 文件", 400

    cls = classify(upload.filename)

    mime = "application/pdf" if file_format == "pdf" else None
    store = SourceFileStore(objects_path=OBJECTS_DIR, db_path=MAIN_DB)
    stored = store.put_bytes(
        blob,
        original_name=upload.filename,
        mime_type=mime,
        origin_zone="internal",
    )
    file_hash = stored.file_hash
    rel_path = stored.storage_path

    harness_format = "xlsx" if file_format == "excel" else file_format
    structured = {"format": file_format}
    staging_id = None
    adapter = OpenClawAdapter(
        StagingStore(db_path=MAIN_DB),
        objects_dir=OBJECTS_DIR,
        db_path=MAIN_DB,
    )
    if adapter.supports(harness_format):
        staging_id = adapter.run_parse(file_hash, harness_format, timeout=600)
        structured = StagingStore(db_path=MAIN_DB).get(staging_id)["payload"]

    with db() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO files(file_hash,original_name,file_format,size,"
            "storage_path,module,doc_type,confidence,structured,uploaded_at)"
            " VALUES (?,?,?,?,?,?,?,?,?,?)",
            (
                file_hash,
                upload.filename,
                file_format,
                len(blob),
                rel_path,
                cls.module,
                cls.doc_type,
                cls.confidence,
                json.dumps(structured, ensure_ascii=False),
                now(),
            ),
        )
        conn.commit()
        row = conn.execute(
            "SELECT id FROM files WHERE file_hash=?", (file_hash,)
        ).fetchone()
    return redirect(url_for("detail", file_id=row["id"]))


@app.route("/api/chat", methods=["POST", "OPTIONS"])
def api_chat():
    if request.method == "OPTIONS":
        return ("", 204)
    payload = request.get_json(silent=True) or {}
    question = (payload.get("message") or "").strip()
    if not question:
        return {"error": "empty message"}, 400

    import os, subprocess, uuid
    root = BASE_DIR.parent / "harness-openclaw"
    ws_root = BASE_DIR.parents[2]
    node_dir = ws_root / ".node24"
    oc_mjs = ws_root / ".oc-runtime" / "node_modules" / "openclaw" / "openclaw.mjs"
    env = os.environ.copy()
    venv_scripts = BASE_DIR.parent / ".venv" / "Scripts"
    env["PATH"] = f"{venv_scripts};{node_dir};C:\\Program Files\\Git\\cmd;{env.get('PATH','')}"
    env["OPENCLAW_STATE_DIR"] = str(root / "state")
    env["OPENCLAW_CONFIG_PATH"] = str(root / "state" / "openclaw.json")
    env["XDG_CACHE_HOME"] = str(root / "cache")
    session_id = "chat-" + uuid.uuid4().hex
    cmd = [str(node_dir / "node.exe"), str(oc_mjs), "agent", "--local",
           "--agent", "main", "--session-id", session_id, "--json",
           "--message", question, "--timeout", "600"]
    proc = subprocess.run(cmd, cwd=str(root), env=env, capture_output=True,
                          text=True, encoding="utf-8", errors="replace", timeout=630)
    if proc.returncode != 0:
        return {"error": "agent failed"}, 502

    data = json.loads(proc.stdout)
    answer = ""
    meta = data.get("meta") or {}
    answer = meta.get("finalAssistantVisibleText") or ""
    if not answer:
        for pl in data.get("payloads", []):
            answer += pl.get("text", "")
    return {"message": answer, "model": "doubao-ark"}


@app.route("/prototype")
def prototype_page():
    from flask import send_file
    proto = BASE_DIR.parent / "startup-ai-manager" / "prototype" / "startup-ai-manager.html"
    return send_file(str(proto))


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
    adapter = OpenClawAdapter(
        StagingStore(db_path=MAIN_DB),
        objects_dir=OBJECTS_DIR,
        db_path=MAIN_DB,
    )
    if adapter.supports(harness_format):
        adapter.run_parse(file_hash, harness_format, timeout=600)

    return {
        "file_hash": file_hash,
        "original_name": upload.filename,
        "format": file_format,
        "size": len(blob),
    }


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
    init_db()
    app.run(host="127.0.0.1", port=5000, debug=False)

