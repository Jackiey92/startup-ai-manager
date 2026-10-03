"""Startup AI Manager prototype and document-import APIs."""
from __future__ import annotations

import json
import hmac
import os
import subprocess
import uuid
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
import re

from flask import Flask, abort, redirect, render_template, request, send_file, url_for

import sys as _sys
BASE_DIR = Path(__file__).resolve().parent
_PROJECT_ROOT = BASE_DIR.parent
_sys.path.insert(0, str(_PROJECT_ROOT))

from app.storage import SourceFileStore
from app.db.database import init_db as init_core_db
from app.classifier import ClassificationService
from app.facts import ConsolidationService, FactExtractionService
from app.ov_navigation import OVNavigationService
from app.entities import EntityBridgeService
from app.guidance import GuideJobCoordinator, ImportGuideService, ModelUnavailable
from app.harness.staging import StagingStore
from app.memory import ExtractionMemoryService
from app.memory_map import MapBuilder, MemoryMapTools
from app.conversation_store import ConversationStore, deterministic_summary
from app.context_assembler import ContextAssembler
from app.thread_manager import ConversationTools
from app.config_sync import sync_agent_config, CONFIG_FILES
from app.ports import MemoryUnavailable
from app.providers import memory_provider, runtime_provider
from app.runtime_config import RuntimeConfig
from app.runtime_memory import RuntimeWorkingMemory
from app.upload_status import parse_result_status
from app.parse_jobs import ParseJobCanceled, ParseJobManager
from app.business_overview import BusinessOverviewService
from app.dashboard import DashboardPreferenceStore, REGISTRY, assemble_dashboard

RUNTIME_CONFIG = RuntimeConfig.from_env(project_root=_PROJECT_ROOT)
DATA_ROOT = RUNTIME_CONFIG.data_root
DATA_DIR = RUNTIME_CONFIG.app_db.parent
OBJECTS_DIR = RUNTIME_CONFIG.objects_dir
MAIN_DB = RUNTIME_CONFIG.main_db

OBJECTS_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)
app.extensions["sam_runtime_config"] = RUNTIME_CONFIG
app.extensions["sam_memory_provider"] = memory_provider(RUNTIME_CONFIG)

# Both parsing/consolidation and model guidance run outside the Flask request
# thread.  The upload endpoint only stores the immutable original and creates
# a durable parse-job row; clients observe actual parser stages via /inbox.
_GUIDE_EXECUTOR = ThreadPoolExecutor(max_workers=2, thread_name_prefix="sam-leader")
_GUIDE_COORDINATOR = GuideJobCoordinator(
    _GUIDE_EXECUTOR, debounce_seconds=float(os.environ.get("SAM_GUIDE_DEBOUNCE", "3"))
)


@app.after_request
def add_cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp


def now() -> str:
    return datetime.now(timezone.utc).isoformat()



def classification_service() -> ClassificationService:
    """Return the company-scoped 2A navigation-label ledger."""
    return ClassificationService(MAIN_DB)


def consolidation_service() -> ConsolidationService:
    """2B document-consolidation path; deliberately unrelated to chat promote."""
    return ConsolidationService(MAIN_DB)


def business_overview_service() -> BusinessOverviewService:
    """Read-only deterministic business profile extracted from parsed L2."""
    return BusinessOverviewService(MAIN_DB, app.extensions["sam_memory_provider"])


def dashboard_preferences() -> DashboardPreferenceStore:
    return DashboardPreferenceStore(MAIN_DB)


def init_db() -> None:
    """Initialize the canonical source/fact/classification ledger only."""
    init_core_db(MAIN_DB)


# Ensure the durable queue table exists for both the Flask entry point and the
# test client.  This is schema initialization only; no upload is processed at
# import time.
init_db()


def detect_format(filename: str) -> str:
    name = filename.lower()
    if name.endswith((".xlsx", ".xlsm", ".xls")):
        return "excel"
    if name.endswith((".ppt", ".pptx")):
        return "ppt"
    if name.endswith((".doc", ".docx")):
        return "doc"
    if name.endswith(".pdf"):
        return "pdf"
    return "unknown"


def import_guide(*, event: str, uploaded_file_hash: str | None = None,
                 company_id: str | None = None) -> dict:
    """Ask the configured OpenClaw main Agent for an import guide."""
    staging = StagingStore(db_path=MAIN_DB)
    service = ImportGuideService(
        store=SourceFileStore(objects_path=OBJECTS_DIR, db_path=MAIN_DB),
        db_path=MAIN_DB,
        runtime_provider=runtime_provider(RUNTIME_CONFIG, staging),
        company_id=company_id or os.environ.get("SAM_COMPANY_ID", "default"),
    )
    return service.generate(event=event, uploaded_file_hash=uploaded_file_hash)


def _guide_key(company_id: str) -> str:
    return f"{company_id}:import-guide"


def _redact_guide_diagnostic(raw: str) -> str:
    """Keep debugging local while ensuring accidental credentials never persist."""
    raw = re.sub(r"(?i)(bearer\s+)[^\s\"']+", r"\1[REDACTED]", raw)
    return re.sub(r"\bsk-[A-Za-z0-9_-]{12,}\b", "sk-[REDACTED]", raw)


def _record_guide_diagnostic(company_id: str, exc: Exception) -> None:
    raw = getattr(exc, "raw_response", None)
    diagnostic_dir = DATA_ROOT / "guide-diagnostics"
    diagnostic_dir.mkdir(parents=True, exist_ok=True)
    filename = f"{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')}-{uuid.uuid4().hex}.json"
    path = diagnostic_dir / filename
    path.write_text(json.dumps({
        "created_at": now(), "company_id": company_id,
        "reason": getattr(exc, "reason", "invalid_json"),
        "raw_envelope": _redact_guide_diagnostic(raw[:32768]) if isinstance(raw, str) else None,
    }, ensure_ascii=False, indent=2), encoding="utf-8")
    try:
        path.chmod(0o600)
    except OSError:
        pass
    app.logger.warning("import guide invalid envelope captured locally: %s", path.name)


def _run_import_guide(*, event: str, uploaded_file_hash: str | None, company_id: str) -> dict:
    try:
        return import_guide(event=event, uploaded_file_hash=uploaded_file_hash, company_id=company_id)
    except ModelUnavailable as exc:
        _record_guide_diagnostic(company_id, exc)
        raise


def queue_import_guide(uploaded_file_hash: str, *, company_id: str | None = None):
    """Queue/revise one company guide without holding the upload request."""
    company = company_id or os.environ.get("SAM_COMPANY_ID", "default")
    return _GUIDE_COORDINATOR.queue(
        _guide_key(company),
        lambda: _run_import_guide(event="upload", uploaded_file_hash=uploaded_file_hash, company_id=company),
    )


def _parse_job_worker(job: dict, progress, cancel_event) -> None:
    """Run the existing deterministic upload pipeline off the request thread."""
    adapter = _PARSE_ADAPTER

    def check_cancel() -> None:
        if cancel_event.is_set():
            # A cancel request can arrive in the tiny gap before the adapter
            # registers its Popen process.  Clear that one-shot intent when
            # this check wins the race and no child will be spawned.
            clear_cancel = getattr(adapter, "clear_parse_cancel", None)
            if clear_cancel is not None:
                clear_cancel(job["file_hash"])
            raise ParseJobCanceled("job canceled")

    progress(stage="starting_engine", message="正在准备本地解析引擎")
    check_cancel()
    staging = StagingStore(db_path=MAIN_DB)
    classification_id: int | None = None
    critical_started = False
    fact_service: FactExtractionService | None = None
    prepared_facts = None
    try:
        progress(stage="parsing", message="正在解析文档")
        # Cancellation can arrive while the worker is transitioning from
        # engine setup to the private bridge.  Re-check immediately before
        # spawning so a stopped queued job never starts a parser.
        check_cancel()
        staging_id = adapter.run_parse(job["file_hash"], job["harness_format"], timeout=600)
        check_cancel()
        staged = staging.get(staging_id)
        payload = staged.get("payload", {})
        parse_status, _memory_status = parse_result_status(payload)
        summary = payload.get("parse_summary") if isinstance(payload, dict) else {}
        if parse_status != "parsed":
            error = RuntimeError(
                str((summary or {}).get("user_message") or "文档解析失败")
            )
            error.error_kind = str((summary or {}).get("error_kind") or "engine")
            raise error
        pages = payload.get("pages") or []
        total = len(pages) or None
        progress(stage="parsing", current=total or 0, total=total, message=f"解析完成，已读取 {total or 0} 页")
        check_cancel()

        # Content-derived classification and 2A memory are independent of the
        # 2B transaction.  Keep them outside the short critical section so a
        # slow provider write does not make the stop button appear hung.
        classification = classification_service().classify_parsed(
            file_hash=job["file_hash"], company_id=job["company_id"], manifest=payload,
        )
        if classification.get("_created_for_parse"):
            classification_id = int(classification["id"])
        extraction = ExtractionMemoryService(app.extensions["sam_memory_provider"])
        extraction.ingest(job["company_id"], payload)
        # Source bytes are imported into OV's semantic namespace exactly once;
        # the employee/skill chooses the folder from parsed content.
        try:
            stored = SourceFileStore(RUNTIME_CONFIG.objects_dir, MAIN_DB).get(job["file_hash"])
            extraction.memory.add_resource(
                str(RUNTIME_CONFIG.objects_dir / stored.storage_path),
                parent=f"resources/{extraction.classify_folder(payload, skills_root=RUNTIME_CONFIG.skill_root)}",
                wait=True,
            )
        except Exception:
            app.logger.exception("OV resource import deferred after extraction")
        check_cancel()

        # Normal uploads automatically traverse the entity bridge and the
        # finance employee.  Model work happens before the short write-only
        # critical section; only verified candidates are retained in memory.
        bridge_run = EntityBridgeService(MAIN_DB).run(
            company_id=job["company_id"], file_hash=job["file_hash"],
        )
        # Prose has its own source verifier and is intentionally independent
        # from finance consolidation: a bad prose candidate never blocks facts.
        OVNavigationService(MAIN_DB, app.extensions["sam_memory_provider"]).rebuild(
            company_id=job["company_id"], file_hash=job["file_hash"],
            bridge_run_id=int(bridge_run["id"]), thread_id=f"parse-job:{job['job_id']}",
        )
        fact_service = FactExtractionService(MAIN_DB)
        prepared_facts = fact_service.prepare(
            company_id=job["company_id"], file_hash=job["file_hash"],
            bridge_run_id=int(bridge_run["id"]), use_worker=True,
            thread_id=f"parse-job:{job['job_id']}",
        )
        check_cancel()

        # Once this short local SQLite write starts, cancellation is rejected
        # by the API.  No engine/model call is made in the critical section.
        critical_started = True
        progress(stage="consolidating", message="正在写入事实", critical=True)
        fact_service.commit(prepared_facts)
        prepared_facts = None
        progress(stage="consolidating", current=total or 0, total=total,
                 message="事实写入完成", critical_end=True)
        try:
            MapBuilder(app.extensions["sam_memory_provider"]).rebuild_map(
                job["company_id"], source_ids=(str(payload["source_id"]),)
            )
        except Exception:
            app.logger.info("memory map update deferred after upload job")
        try:
            queue_import_guide(job["file_hash"], company_id=job["company_id"])
        except Exception:
            # Guide generation is a follow-up; a model/runtime outage must not
            # turn a successfully parsed and consolidated upload into failed.
            app.logger.exception("import guide queue failed after parse job completion")
    except Exception as exc:
        if fact_service is not None and prepared_facts is not None:
            try:
                fact_service.abort(
                    prepared_facts, status="canceled" if cancel_event.is_set() else "failed",
                )
            except Exception:
                app.logger.exception("failed to close interrupted fact extraction run")
        if classification_id is not None and not critical_started:
            try:
                classification_service().cancel_auto_content(
                    classification_id=classification_id,
                    file_hash=job["file_hash"], company_id=job["company_id"],
                )
            except Exception:
                app.logger.exception("failed to invalidate canceled parse classification")
        if cancel_event.is_set():
            raise ParseJobCanceled("job canceled") from exc
        raise


_PARSE_ADAPTER = runtime_provider(RUNTIME_CONFIG, StagingStore(db_path=MAIN_DB))
_PARSE_MANAGER = ParseJobManager(
    MAIN_DB,
    _parse_job_worker,
    cancel_parser=_PARSE_ADAPTER.cancel_parse,
)


MODULE_LABELS = {"sales": "销售", "marketing": "市场", "hr": "人员", "finance": "财务"}


def _company_id() -> str:
    return str(request.args.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))


def _parse_failure_message(payload: object, status: str) -> str | None:
    """Return a safe, actionable parse failure message for upload clients."""
    if isinstance(payload, dict):
        summary = payload.get("parse_summary")
        if isinstance(summary, dict):
            message = summary.get("user_message")
            if isinstance(message, str) and message.strip():
                return message.strip()
    if status in {"engine_unavailable", "pending_runtime", "unavailable"}:
        return "本地解析服务暂不可用，请稍后重试或联系管理员。"
    if status != "parsed":
        return "文档解析失败，请检查文件后重试。"
    return None


def _page_context(*, company_id: str) -> dict:
    facts = consolidation_service().list_facts(company_id=company_id)
    todos = consolidation_service().list_todos(company_id=company_id, status="open")
    files = classification_service().list_current(company_id=company_id)
    module_counts: dict[str, int] = {}
    for item in files:
        module = item.get("module")
        if module:
            module_counts[str(module)] = module_counts.get(str(module), 0) + 1
    return {"company_id": company_id, "facts": facts, "todos": todos, "files": files,
            "module_counts": module_counts, "module_labels": MODULE_LABELS}


@app.route("/")
def home_page():
    """Canonical landing redirects to the first real business screen."""
    return redirect(url_for("business_overview_page"))


@app.route("/overview")
def legacy_overview_page():
    """Preserve the previous real-data summary page under a stable legacy URL."""
    context = _page_context(company_id=_company_id())
    context["conflict_count"] = sum(t["reason"] == "conflict" for t in context["todos"])
    context["critical_count"] = sum(t["reason"] == "critical_review" for t in context["todos"])
    context["unclassified_count"] = sum(item.get("module") is None for item in context["files"])
    return render_template("home.html", **context)


@app.route("/prototype")
def prototype_page():
    """Keep the historic static prototype available for visual comparison only."""
    return send_file(str(BASE_DIR.parent / "prototype" / "startup-ai-manager.html"))


@app.route("/bizov")
def business_overview_page():
    company_id = _company_id()
    context = _page_context(company_id=company_id)
    context["overview"] = business_overview_service().overview(company_id=company_id)
    context["dashboard"] = assemble_dashboard(
        overview=context["overview"], facts=context["facts"],
        hidden=dashboard_preferences().get(company_id=company_id),
    )
    return render_template("bizov.html", **context)


@app.route("/api/business-overview", methods=["GET"])
@app.route("/api/bizov", methods=["GET"])
def api_business_overview():
    company_id = _company_id()
    overview = business_overview_service().overview(company_id=company_id)
    return {"overview": overview, "dashboard": assemble_dashboard(
        overview=overview,
        facts=consolidation_service().list_facts(company_id=company_id),
        hidden=dashboard_preferences().get(company_id=company_id),
    )}


@app.route("/api/dashboard", methods=["GET"])
def api_dashboard():
    """Stable dashboard-only API for native clients and future modules."""
    company_id = _company_id()
    overview = business_overview_service().overview(company_id=company_id)
    return {"dashboard": assemble_dashboard(
        overview=overview,
        facts=consolidation_service().list_facts(company_id=company_id),
        hidden=dashboard_preferences().get(company_id=company_id),
    )}


def _dashboard_company_id() -> str:
    payload = request.get_json(silent=True) or {}
    return str(payload.get("company_id") or request.args.get("company_id")
               or os.environ.get("SAM_COMPANY_ID", "default"))


@app.route("/api/dashboard/preferences", methods=["GET", "POST"])
def api_dashboard_preferences():
    """Read or persist company-scoped card visibility preferences."""
    if request.method == "GET":
        company_id = _company_id()
        return {"company_id": company_id, "dashboard_id": "business",
                "hidden": dashboard_preferences().get(company_id=company_id)}
    payload = request.get_json(silent=True) or {}
    card_id = payload.get("card_id")
    hidden = payload.get("hidden")
    if not isinstance(card_id, str) or not isinstance(hidden, bool):
        return {"error": "card_id and boolean hidden are required"}, 400
    return _toggle_dashboard_card(card_id, company_id=_dashboard_company_id(), hidden=hidden)


def _toggle_dashboard_card(card_id: str, *, company_id: str, hidden: bool):
    known = {card.key: card for card in REGISTRY.cards("business")}
    if card_id not in known:
        return {"error": "unknown dashboard card"}, 404
    if known[card_id].always_visible:
        return {"error": "company overview cannot be hidden"}, 400
    preference = dashboard_preferences().set(
        company_id=company_id, dashboard_id="business", card_id=card_id, hidden=hidden,
    )
    return {"preference": preference, "hidden": dashboard_preferences().get(company_id=company_id)}


@app.route("/api/dashboard/cards/<card_id>/toggle", methods=["POST"])
def api_toggle_dashboard_card(card_id: str):
    payload = request.get_json(silent=True) or {}
    hidden = payload.get("hidden")
    if not isinstance(hidden, bool):
        return {"error": "boolean hidden is required"}, 400
    return _toggle_dashboard_card(card_id, company_id=_dashboard_company_id(), hidden=hidden)


@app.route("/todos")
def todos_page():
    selected_status = str(request.args.get("status") or "open").lower()
    if selected_status not in {"open", "all", "resolved", "dismissed"}:
        selected_status = "open"
    context = _page_context(company_id=_company_id())
    context["todos"] = consolidation_service().list_todos(
        company_id=context["company_id"],
        status=None if selected_status == "all" else selected_status,
    )
    context["todo_status"] = selected_status
    context["open_conflicts"] = [t for t in context["todos"] if t["reason"] == "conflict"]
    context["open_critical"] = [t for t in context["todos"] if t["reason"] == "critical_review"]
    return render_template("todos.html", **context)


@app.route("/facts")
def facts_page():
    return render_template("facts.html", **_page_context(company_id=_company_id()))


@app.route("/files")
def files_page():
    return render_template("files.html", **_page_context(company_id=_company_id()))


@app.route("/inbox")
def inbox_page():
    """Upload handoff queue; parsing itself remains in the worker pool."""
    company_id = _company_id()
    return render_template(
        "inbox.html", company_id=company_id,
        jobs=_PARSE_MANAGER.list(company_id=company_id),
    )


@app.route("/chat")
def chat_page():
    return render_template("chat.html", **_page_context(company_id=_company_id()))


def _agent_visible_text(data: object) -> str:
    """Extract visible text from both legacy and 9.6 agent JSON envelopes."""
    if not isinstance(data, dict):
        return ""
    envelopes: list[dict] = [data]
    nested = data.get("result")
    if isinstance(nested, dict):
        envelopes.insert(0, nested)
    for envelope in envelopes:
        meta = envelope.get("meta")
        if isinstance(meta, dict):
            text = meta.get("finalAssistantVisibleText")
            if isinstance(text, str) and text.strip():
                return text
        for key in ("final", "message", "text"):
            text = envelope.get(key)
            if isinstance(text, str) and text.strip():
                return text
        payloads = envelope.get("payloads")
        if isinstance(payloads, list):
            parts = [
                item.get("text", "")
                for item in payloads
                if isinstance(item, dict) and isinstance(item.get("text"), str)
            ]
            answer = "".join(parts).strip()
            if answer:
                return answer
    return ""


@app.route("/api/chat", methods=["POST", "OPTIONS"])
def api_chat():
    if request.method == "OPTIONS":
        return ("", 204)
    payload = request.get_json(silent=True) or {}
    question = (payload.get("message") or "").strip()
    if not question:
        return {"error": "empty message"}, 400

    session_id = str(payload.get("session_id") or ("session-" + uuid.uuid4().hex))
    company_id = str(payload.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
    memory = app.extensions["sam_memory_provider"]
    source_store = SourceFileStore(objects_path=OBJECTS_DIR, db_path=MAIN_DB)
    thread_id = str(payload.get("thread_id") or session_id)
    map_result = MapBuilder(memory).load_or_rebuild(company_id)
    map_data = map_result.map
    source_ids = tuple(
        str(item.get("uri", "")).split(f"/2a_extraction/{company_id}/", 1)[-1].split("/", 1)[0]
        for item in map_data.get("branches", [])
        if isinstance(item, dict) and item.get("kind") == "2a"
    )
    # This is deliberately navigation-only.  No L2/L1 body or 2b value is
    # inserted into the resident prompt; the agent is told to drill down via
    # the three scoped tools when needed.
    map_json = json.dumps(map_data, ensure_ascii=False, sort_keys=True)
    conversations = ConversationStore(memory)
    try:
        conversations.append(company_id, thread_id, role="user", text=question)
        conversations.fold_l1(company_id, thread_id)
        conversations.fold_l0(company_id, thread_id, summary=deterministic_summary(conversations.read_range(company_id, thread_id)))
    except Exception:
        map_data["degraded"] = True
    try:
        agent_config = ""
        try:
            sync_agent_config(memory, RUNTIME_CONFIG.harness_root)
            agent_config = "\n\n".join((RUNTIME_CONFIG.harness_root / name).read_text(encoding="utf-8") for name in CONFIG_FILES)
        except Exception:
            map_data["degraded"] = True
        assembled = ContextAssembler(memory, company_id=company_id, thread_id=thread_id, agent_config=agent_config).assemble(question)
        context_text = assembled["prompt"] + "\n\n可用公司范围工具：memory_map()、memory_read(uri)、memory_search(query)、file_get(file_hash)、conversation_read(start,end)、thread_list()、thread_open()、promote(...)。工具只读当前 company/thread scope，promote 仅显式授权时调用。"
        context_stats = assembled["stats"]
    except Exception:
        context_text = "公司记忆地图（仅导航，不含事实正文）：\n" + map_json[:12000] + "\n\n当前上下文 degraded。"
        context_stats = {"tokens": max(1, len(context_text) // 4), "branch_count": len(map_data.get("branches", [])), "folded_blocks": 0, "tool_calls": 0}
    tools = MemoryMapTools(memory, source_store, company_id, source_ids=source_ids)
    conversation_tools = ConversationTools(memory, company_id, thread_id)
    runtime = RuntimeWorkingMemory(memory)
    try:
        try:
            state = runtime.get_runtime(session_id, "conversation")
            if state.get("state") == "expired":
                runtime.cleanup(session_id, "conversation")
                raise KeyError(session_id)
        except (KeyError, FileNotFoundError):
            runtime.create(session_id, "conversation", goal=f"公司 {company_id} 对话", company_id=company_id)
    except Exception:
        # Runtime memory is useful but must not turn a chat into a 500.
        map_data["degraded"] = True
    adapter = runtime_provider(RUNTIME_CONFIG, StagingStore(db_path=MAIN_DB))
    try:
        raw = adapter.run_agent_message(
            question, context_text=context_text, company_id=company_id,
            thread_id=thread_id, allow_promote=False, timeout=600,
        )
        data = json.loads(raw)
    except Exception:
        # Keep the client-facing contract stable while preserving the actual
        # gateway/model failure (including malformed envelopes) in Flask logs.
        app.logger.exception("api_chat agent execution failed")
        return {"error": "agent failed"}, 502
    answer = _agent_visible_text(data)
    try:
        refs = [uri for uri in tools.navigation if uri.startswith("viking://")]
        runtime.append_event(session_id, "conversation", "action", {
            "kind": "memory_map_turn", "question": question[:1000],
            "map_uri": MapBuilder(memory).map_uri(company_id),
            "navigation": refs[:50], "answer_summary": answer[:1000],
        })
        conversations.append(company_id, thread_id, role="assistant", text=answer, tool_results=[{"navigation": refs[:50]}])
    except Exception:
        map_data["degraded"] = True
    return {
        "message": answer,
        "model": os.environ.get(RUNTIME_CONFIG.model_name_env, RUNTIME_CONFIG.model_default),
        "session_id": session_id,
        "thread_id": thread_id,
        "context": {"map_uri": MapBuilder(memory).map_uri(company_id), "degraded": bool(map_data.get("degraded")), "navigation_count": len(tools.navigation), **context_stats},
    }


@app.route("/api/upload", methods=["POST", "OPTIONS"])
def api_upload():
    """Store an immutable original and enqueue parsing without blocking HTTP."""
    if request.method == "OPTIONS":
        return ("", 204)
    upload = request.files.get("file")
    if upload is None or not upload.filename:
        return {"error": "no file"}, 400
    file_format = detect_format(upload.filename)
    if file_format == "unknown":
        return {
            "error": "unsupported format",
            "message": "暂不支持该文件格式；请上传 PDF、Excel、PPT 或 Word 文件。",
        }, 400
    blob = upload.read()
    store = SourceFileStore(objects_path=OBJECTS_DIR, db_path=MAIN_DB)
    stored = store.put_bytes(
        blob,
        original_name=upload.filename,
        mime_type="application/pdf" if file_format == "pdf" else None,
        origin_zone="internal",
    )
    if file_format == "excel":
        harness_format = "xlsx"
    elif file_format == "ppt":
        harness_format = "pptx" if upload.filename.lower().endswith(".pptx") else "ppt"
    elif file_format == "doc":
        harness_format = "docx" if upload.filename.lower().endswith(".docx") else "doc"
    else:
        harness_format = file_format
    company_id = str(request.form.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
    job = _PARSE_MANAGER.create(
        company_id=company_id, file_hash=stored.file_hash,
        original_name=upload.filename, file_format=file_format,
        harness_format=harness_format, size_bytes=len(blob),
    )
    return {
        "job_id": job["job_id"], "file_hash": stored.file_hash,
        "original_name": upload.filename, "format": file_format,
        "size": len(blob), "status": "queued", "stage": "queued",
    }, 202


@app.route("/api/parse-jobs", methods=["GET"])
def api_parse_jobs():
    company_id = str(request.args.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
    status = request.args.get("status")
    if status is not None and status not in {"all", "queued", "parsing", "done", "failed", "canceled"}:
        return {"error": "invalid parse job status"}, 400
    return {"jobs": _PARSE_MANAGER.list(company_id=company_id, status=status)}


@app.route("/api/parse-jobs/<job_id>", methods=["GET"])
def api_parse_job(job_id: str):
    try:
        job = _PARSE_MANAGER.get(job_id)
    except KeyError:
        return {"error": "parse job not found"}, 404
    company_id = str(request.args.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
    if job["company_id"] != company_id:
        return {"error": "parse job not found"}, 404
    return {"job": job}


@app.route("/api/parse-jobs/<job_id>/cancel", methods=["POST"])
def api_cancel_parse_job(job_id: str):
    try:
        job = _PARSE_MANAGER.get(job_id)
        payload = request.get_json(silent=True) or {}
        company_id = str(request.args.get("company_id") or request.form.get("company_id") or payload.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
        if job["company_id"] != company_id:
            return {"error": "parse job not found"}, 404
        result = _PARSE_MANAGER.cancel(job_id)
    except KeyError:
        return {"error": "parse job not found"}, 404
    except RuntimeError as exc:
        return {"error": str(exc)}, 409
    return {"job": result}


@app.route("/api/parse-jobs/<job_id>/retry", methods=["POST"])
def api_retry_parse_job(job_id: str):
    try:
        job = _PARSE_MANAGER.get(job_id)
        payload = request.get_json(silent=True) or {}
        company_id = str(request.args.get("company_id") or request.form.get("company_id") or payload.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
        if job["company_id"] != company_id:
            return {"error": "parse job not found"}, 404
        result = _PARSE_MANAGER.retry(job_id)
    except KeyError:
        return {"error": "parse job not found"}, 404
    except RuntimeError as exc:
        return {"error": str(exc)}, 409
    return {"job": result}, 202


@app.route("/api/facts", methods=["GET"])
def api_facts():
    """Read current verified document facts; superseded values are excluded."""
    company_id = str(request.args.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
    file_hash = request.args.get("file_hash")
    return {"facts": consolidation_service().list_facts(company_id=company_id, file_hash=file_hash)}


def _internal_manager_authorized() -> bool:
    """Require both a deployment-provided token and a loopback caller."""
    expected = os.environ.get("SAM_INTERNAL_TOKEN", "")
    supplied = request.headers.get("X-SAM-Internal-Token", "")
    if not expected or not supplied or not hmac.compare_digest(supplied, expected):
        return False
    return request.remote_addr in {"127.0.0.1", "::1"}


@app.route("/api/internal/facts/extract", methods=["POST"])
def api_internal_facts_extract():
    """Resident-manager entry point for the worker-backed finance path.

    This is deliberately not exposed as a CLI-to-model bypass: only the
    long-lived Flask process may invoke ``use_worker=True``.  The host owns
    company scope; request JSON cannot override it.
    """
    if not _internal_manager_authorized():
        return {"error": "internal authorization required"}, 403
    payload = request.get_json(silent=True) or {}
    file_hash = payload.get("file_hash")
    if not isinstance(file_hash, str) or not file_hash:
        return {"error": "file_hash is required"}, 400
    bridge_run_id = payload.get("bridge_run_id")
    if bridge_run_id is not None and not isinstance(bridge_run_id, int):
        return {"error": "bridge_run_id must be an integer"}, 400
    thread_id = payload.get("thread_id")
    if thread_id is not None and not isinstance(thread_id, str):
        return {"error": "thread_id must be a string"}, 400
    try:
        if bridge_run_id is None:
            bridge_run = EntityBridgeService(MAIN_DB).run(
                company_id=_company_id(), file_hash=file_hash,
            )
            bridge_run_id = int(bridge_run["id"])
        result = FactExtractionService(MAIN_DB).extract(
            company_id=_company_id(), file_hash=file_hash, bridge_run_id=bridge_run_id,
            use_worker=True, thread_id=thread_id,
        )
    except (KeyError, ValueError) as exc:
        return {"error": str(exc)}, 400
    return {"run": result}


@app.route("/api/todos", methods=["GET"])
def api_todos():
    company_id = str(request.args.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
    status = request.args.get("status", "open")
    if status not in {"open", "resolved", "dismissed", "all"}:
        return {"error": "invalid todo status"}, 400
    return {"todos": consolidation_service().list_todos(
        company_id=company_id, status=None if status == "all" else status,
    )}


def _todo_action(todo_id: int, *, dismiss: bool = False):
    payload = request.get_json(silent=True) or {}
    try:
        if dismiss:
            result = consolidation_service().dismiss(todo_id)
        else:
            choose = payload.get("choose")
            if not isinstance(choose, str) or not choose:
                return {"error": "choose is required"}, 400
            result = consolidation_service().resolve(todo_id, choose=choose)
    except PermissionError:
        # Reserved for an injected future authorization policy.
        return {"error": "authorization failed"}, 403
    except KeyError:
        return {"error": "todo not found"}, 404
    except ValueError as exc:
        return {"error": str(exc)}, 409
    return {"todo": result}


@app.route("/api/todos/<int:todo_id>/resolve", methods=["POST"])
def api_resolve_todo(todo_id: int):
    return _todo_action(todo_id)


@app.route("/api/todos/<int:todo_id>/dismiss", methods=["POST"])
def api_dismiss_todo(todo_id: int):
    return _todo_action(todo_id, dismiss=True)


@app.route("/api/files/classifications", methods=["GET", "POST", "OPTIONS"])
def api_file_classifications():
    """List effective 2A labels or append one human correction."""
    if request.method == "OPTIONS":
        return ("", 204)
    if request.method == "GET":
        company_id = str(request.args.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
        module = request.args.get("module")
        if module == "":
            module = None
        include_history = str(request.args.get("include_history", "")).lower() in {"1", "true", "yes"}
        return {"files": classification_service().list_current(
            company_id=company_id, module=module, include_history=include_history,
        )}

    payload = request.get_json(silent=True) or {}
    file_hash = payload.get("file_hash")
    company_id = payload.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default")
    module = payload.get("module")
    doc_type = payload.get("doc_type")
    if not isinstance(file_hash, str) or not isinstance(company_id, str):
        return {"error": "file_hash and company_id are required"}, 400
    if module is not None and not isinstance(module, str):
        return {"error": "module must be a string or null"}, 400
    if doc_type is not None and not isinstance(doc_type, str):
        return {"error": "doc_type must be a string or null"}, 400
    try:
        record = classification_service().reclassify(
            file_hash=file_hash, company_id=company_id, module=module, doc_type=doc_type,
        )
    except KeyError:
        return {"error": "file not found"}, 404
    except ValueError as exc:
        return {"error": str(exc)}, 400
    return {"classification": record}


@app.route("/api/files/classifications/confirm", methods=["POST", "OPTIONS"])
def api_confirm_file_classification():
    """Optional review marker; automatic labels are already active without it."""
    if request.method == "OPTIONS":
        return ("", 204)
    payload = request.get_json(silent=True) or {}
    file_hash = payload.get("file_hash")
    company_id = payload.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default")
    if not isinstance(file_hash, str) or not isinstance(company_id, str):
        return {"error": "file_hash and company_id are required"}, 400
    try:
        record = classification_service().confirm(file_hash=file_hash, company_id=company_id)
    except KeyError:
        return {"error": "classification not found"}, 404
    return {"classification": record}


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
    company_id = str(payload.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
    job = _GUIDE_COORDINATOR.get_or_start(
        _guide_key(company_id),
        lambda: _run_import_guide(event=event, uploaded_file_hash=uploaded_file_hash, company_id=company_id),
    )
    try:
        guide = _GUIDE_COORDINATOR.wait(
            # A guide may legitimately use most of the 150s worker budget.
            # The HTTP refresh path is only a short poll; clients continue via
            # the read-only status endpoint until ready/failed.
            job, timeout=float(os.environ.get("SAM_GUIDE_REFRESH_WAIT", "5"))
        )
    except ModelUnavailable as exc:
        app.logger.info("import guide unavailable: %s", getattr(exc, "reason", type(exc).__name__))
        return {"error": "import guide unavailable", "guide_status": "failed", "reason": getattr(exc, "reason", "unavailable")}, 503
    except Exception as exc:
        app.logger.info("import guide background failed: %s", type(exc).__name__)
        return {"error": "import guide unavailable", "guide_status": "failed", "reason": "unavailable"}, 503
    if guide is None:
        return {"guide_status": "generating", "retry_after_ms": 1000}, 202
    return {"guide": guide, "guide_status": "ready"}


@app.route("/api/import-guide/status", methods=["GET"])
def api_import_guide_status():
    """Read-only polling endpoint for a company guide's terminal state."""
    company_id = str(request.args.get("company_id") or os.environ.get("SAM_COMPANY_ID", "default"))
    return _GUIDE_COORDINATOR.snapshot(_guide_key(company_id))


@app.route("/files/<file_hash>")
def detail(file_hash: str):
    """Render canonical source-file metadata plus its current 2A/2B references."""
    store = SourceFileStore(objects_path=OBJECTS_DIR, db_path=MAIN_DB)
    try:
        stored = store.get(file_hash)
    except KeyError:
        abort(404)

    company_id = _company_id()
    classification = next(
        (item for item in classification_service().list_current(company_id=company_id)
         if item["file_hash"] == file_hash),
        None,
    )
    context = _page_context(company_id=company_id)
    context.update({
        "file": stored,
        "classification": classification,
        "file_facts": consolidation_service().list_facts(
            company_id=company_id, file_hash=file_hash,
        ),
    })
    return render_template("detail.html", **context)


if __name__ == "__main__":
    import os
    init_db()
    app.run(
        host=os.environ.get("HOST", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=False,
    )
