"use strict";

// Thin OpenClaw plugin shell.  All SAM business logic stays in Python.  The
// two registerTool call shapes are supported because OpenClaw 2026.3 and the
// newer 2026.9 line changed the registration wrapper, while retaining the
// same tool object contract.
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const TOOL_NAMES = [
  "sam_memory_read", "sam_memory_search", "sam_file_get",
  "sam_memory_map", "sam_conversation_read", "sam_thread_list",
  "sam_thread_open", "sam_promote",
  "sam_document_ingest",
];

const schemas = {
  sam_memory_read: { type: "object", description: "Exactly one argument: uri. Scope is injected; never send company_id, thread_id, project, or scope.", additionalProperties: false, required: ["uri"], properties: { uri: { type: "string", pattern: "^viking://", description: "A viking:// URI returned by sam_memory_map or sam_memory_search." } } },
  sam_memory_search: { type: "object", description: "Exactly one argument: query. Do not send limit, project, scope, company_id, or thread_id.", additionalProperties: false, required: ["query"], properties: { query: { type: "string", minLength: 1, description: "Search words only; result count and company scope are fixed by SAM." } } },
  sam_file_get: { type: "object", description: "Exactly one argument: file_hash. Scope is injected; do not send project or scope.", additionalProperties: false, required: ["file_hash"], properties: { file_hash: { type: "string", pattern: "^[0-9a-f]{64}$" } } },
  sam_memory_map: { type: "object", description: "Call with an empty object {}. It accepts no uri, project, scope, company_id, or thread_id; the current company map is injected by SAM.", additionalProperties: false, properties: {} },
  sam_conversation_read: { type: "object", additionalProperties: false, properties: { start: { type: "string" }, end: { type: "string" } } },
  sam_thread_list: { type: "object", additionalProperties: false, properties: {} },
  sam_thread_open: { type: "object", additionalProperties: false, properties: {} },
  sam_promote: { type: "object", additionalProperties: false, required: ["fact_key", "fact"], properties: { fact_key: { type: "string", minLength: 1 }, fact: { type: "object" } } },
  sam_document_ingest: { type: "object", description: "Parse one injected inbox task with the mounted document-ingest skill. Only file_hash and format are accepted; paths and engines are controlled by SAM.", additionalProperties: false, required: ["file_hash", "format"], properties: { file_hash: { type: "string", pattern: "^[0-9a-f]{64}$" }, format: { type: "string", enum: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "image"] } } },
};

const TOOL_DESCRIPTIONS = {
  sam_memory_read: "Read one discovered viking URI. Input must be exactly {uri}; scope is injected.",
  sam_memory_search: "Search current-company memory. Input must be exactly {query}; never pass limit/project/scope.",
  sam_file_get: "Read metadata for one manifest-discovered file. Input must be exactly {file_hash}.",
  sam_memory_map: "Read the current-company navigation map. Call exactly sam_memory_map({}); no arguments are accepted.",
  sam_conversation_read: "Read current-thread conversation range. Optional input only {start,end}; scope is injected.",
  sam_thread_list: "List visible threads. Call exactly sam_thread_list({}).",
  sam_thread_open: "Read current injected thread summary. Call exactly sam_thread_open({}).",
  sam_promote: "Optional verified-fact promotion. Input exactly {fact_key,fact}; evidence must already exist in the current thread.",
  sam_document_ingest: "Run the mounted document-ingest skill for the injected task. The tool owns bridge, quality checks, alternate-engine retry, and the confined outbox; never provide a path.",
};

function redactedError(error) {
  const text = error && error.message ? String(error.message) : "tool unavailable";
  if (/api[_-]?key|bearer|token|authorization|https?:\/\//i.test(text)) return "tool unavailable";
  return text.slice(0, 160) || "tool unavailable";
}

function errorForModel(error) {
  const code = error && error.code ? String(error.code) : "unavailable";
  const advice = {
    bad_request: "bad_request: check the tool arguments",
    denied: "denied: stay within the injected company/thread scope",
    not_found: "not_found: use sam_memory_map or sam_memory_search to discover a URI",
    unavailable: "unavailable: retry later or report the memory backend is unavailable",
  };
  return advice[code] || `unavailable: ${redactedError(error)}`;
}

function validate(name, input) {
  if (!TOOL_NAMES.includes(name) || !input || typeof input !== "object" || Array.isArray(input)) throw new Error("bad request");
  if (["company_id", "thread_id", "project", "scope"].some(key => Object.prototype.hasOwnProperty.call(input, key))) throw new Error("scope arguments are not accepted");
  if (name === "sam_memory_read" && (typeof input.uri !== "string" || !input.uri.startsWith("viking://"))) throw new Error("bad request");
  if (name === "sam_memory_search" && (typeof input.query !== "string" || !input.query.trim())) throw new Error("bad request");
  if (name === "sam_file_get" && !/^[0-9a-f]{64}$/.test(input.file_hash || "")) throw new Error("bad request");
  if (name === "sam_promote" && (!process.env.SAM_ALLOW_PROMOTE || !/^(1|true|yes)$/i.test(process.env.SAM_ALLOW_PROMOTE))) throw new Error("promotion disabled");
  if (name === "sam_document_ingest" && (!/^[0-9a-f]{64}$/.test(input.file_hash || "") || !schemas.sam_document_ingest.properties.format.enum.includes(input.format))) throw new Error("bad request");
  return input;
}

function runProcess(command, args, env, timeout) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: env.SAM_PROJECT_ROOT || process.cwd(), env, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = ""; let stderr = "";
    const timer = setTimeout(() => { child.kill(); reject(new Error("document ingest timeout")); }, timeout);
    child.stdout.on("data", chunk => { stdout += chunk.toString(); });
    child.stderr.on("data", chunk => { stderr += chunk.toString(); });
    child.on("error", error => { clearTimeout(timer); reject(error); });
    child.on("close", code => {
      clearTimeout(timer);
      if (code !== 0) return reject(new Error((stderr || stdout || "document ingest failed").slice(-500)));
      resolve(stdout);
    });
  });
}

async function documentIngestCall(input) {
  validate("sam_document_ingest", input);
  const root = path.resolve(process.env.SAM_HARNESS_ROOT || process.cwd());
  const taskPath = path.join(root, "inbox", `${input.file_hash}.json`);
  const outbox = path.join(root, "outbox");
  const task = JSON.parse(fs.readFileSync(taskPath, "utf8"));
  if (task.file_hash !== input.file_hash || task.format !== input.format) throw new Error("injected task mismatch");
  const objects = path.resolve(process.env.SAM_OBJECTS_DIR || path.join(process.env.SAM_PROJECT_ROOT || process.cwd(), "data", "objects"));
  const source = path.resolve(String(task.source_path || ""));
  if (!source.startsWith(`${objects}${path.sep}`) || !fs.statSync(source).isFile()) throw new Error("source is outside the object store");
  const skillRoot = path.resolve(process.env.SAM_SKILL_ROOT || path.join(process.env.SAM_PROJECT_ROOT || process.cwd(), "skills"));
  const bridge = path.join(skillRoot, "document-ingest", "scripts", "bridge");
  const quality = path.join(skillRoot, "document-ingest", "scripts", "quality.py");
  const python = process.env.SAM_TOOL_BRIDGE_PYTHON || process.env.SAM_VENV_PYTHON || "python3";
  fs.mkdirSync(outbox, { recursive: true });
  const temp = path.join(outbox, `.${input.file_hash}.json`);
  const baseEnv = { ...process.env, SAM_INGEST_ENGINE: process.env.SAM_INGEST_ENGINE || "auto" };
  const engines = baseEnv.SAM_INGEST_ENGINE === "auto" ? ["auto", "mineru", "docling"] : [baseEnv.SAM_INGEST_ENGINE];
  let manifest = null; let issues = []; let attempted = [];
  try {
    for (const engine of engines) {
      attempted.push(engine);
      const env = { ...baseEnv, SAM_INGEST_ENGINE: engine };
      await runProcess(python, [bridge, taskPath, "--output", temp], env, Number(process.env.SAM_DOCUMENT_INGEST_TIMEOUT_MS || 600000));
      manifest = JSON.parse(fs.readFileSync(temp, "utf8"));
      const qualityOutput = await runProcess(python, [quality, temp], env, 30000);
      const report = JSON.parse(qualityOutput.trim().split("\n").filter(Boolean).pop() || "{}");
      issues = Array.isArray(report.issues) ? report.issues : [];
      if (manifest.parse_summary?.status !== "parsed") {
        issues = [...issues, { code: "parse_failed", message: "解析引擎未产出可用正文" }];
      }
      if (!issues.length) break;
    }
    if (!manifest) throw new Error("document ingest produced no manifest");
    if (issues.length) {
      const summary = manifest.parse_summary || (manifest.parse_summary = {});
      summary.status = "parse_failed";
      summary.warnings = [...(Array.isArray(summary.warnings) ? summary.warnings : []), ...issues.map(item => `quality:${item.code}`), `engines:${attempted.join(",")}`];
    }
    const finalPath = path.join(outbox, `${input.file_hash}.json`);
    fs.writeFileSync(`${finalPath}.tmp`, JSON.stringify(manifest, null, 2) + "\n");
    fs.renameSync(`${finalPath}.tmp`, finalPath);
    return toToolResult({ status: manifest.parse_summary?.status || "parsed", outbox_path: finalPath, quality_issues: issues });
  } finally { try { fs.unlinkSync(temp); } catch (_) {} }
}

function decodeScopePart(value) {
  try {
    return Buffer.from(value, "base64url").toString("utf8");
  } catch (_) {
    return null;
  }
}

function scopeFromSessionId(value) {
  if (typeof value !== "string") return null;
  const match = /^sam-scope\.([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)\./.exec(value);
  if (!match) return null;
  const companyId = decodeScopePart(match[1]);
  const threadId = decodeScopePart(match[2]);
  return companyId && threadId ? { companyId, threadId } : null;
}

// Scope is captured at the trusted before_tool_call boundary and consumed by
// the immediately following execute(toolCallId, ...). The Gateway process is
// shared, so this map must never be treated as durable or session-global state.
const pendingScopes = new Map();

function rememberExecutionScope(event, context) {
  const toolName = event?.toolName;
  const callId = context?.toolCallId || event?.toolCallId;
  if (!TOOL_NAMES.includes(toolName) || toolName === "sam_document_ingest" || typeof callId !== "string" || !callId) return;
  const scope = scopeFromSessionId(context?.sessionId || context?.sessionKey || event?.sessionId || event?.sessionKey);
  if (scope) pendingScopes.set(callId, scope);
}

function takeExecutionScope(callId) {
  if (typeof callId !== "string") return null;
  const scope = pendingScopes.get(callId) || null;
  pendingScopes.delete(callId);
  return scope;
}

function bridgeCall(name, input, scope = null) {
  validate(name, input);
  const python = process.env.SAM_TOOL_BRIDGE_PYTHON || process.env.SAM_VENV_PYTHON || "python3";
  const cwd = process.env.SAM_PROJECT_ROOT || process.cwd();
  const timeout = Number(process.env.SAM_TOOL_BRIDGE_TIMEOUT_MS || 15000);
  return new Promise((resolve, reject) => {
    const env = { ...process.env };
    // Scope comes from the trusted OpenClaw session, never from model params.
    // The gateway process itself is long-lived, so these values must be set on
    // each private bridge child rather than relied on as gateway startup env.
    if (scope?.companyId && scope?.threadId) {
      env.SAM_COMPANY_ID = scope.companyId;
      env.SAM_THREAD_ID = scope.threadId;
    }
    const child = spawn(python, ["-m", "app.tool_bridge"], { cwd, env, stdio: ["pipe", "pipe", "pipe"] });
    let output = "";
    let errorOutput = "";
    const timer = setTimeout(() => { child.kill(); reject(new Error("tool timeout")); }, timeout);
    child.stdout.on("data", chunk => { output += chunk.toString(); });
    child.stderr.on("data", chunk => { errorOutput += chunk.toString(); });
    child.on("error", error => { clearTimeout(timer); reject(new Error(redactedError(error))); });
    child.on("close", code => {
      clearTimeout(timer);
      if (code !== 0 && !output) return reject(new Error(redactedError(new Error(errorOutput))));
      try {
        const response = JSON.parse(output.trim().split("\n").filter(Boolean).pop() || "{}");
        if (!response.ok) {
          const error = new Error(errorForModel(response.error || {}));
          error.code = response.error && response.error.code ? response.error.code : "unavailable";
          return reject(error);
        }
        resolve(toToolResult(response.result));
      } catch (error) { reject(new Error(redactedError(error))); }
    });
    child.stdin.end(JSON.stringify({ id: 1, method: name, params: input }) + "\n");
  });
}

function toToolResult(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return { content: [{ type: "text", text }], details: value };
}

const KNOWN_PARAM_KEYS = new Set(["uri", "query", "file_hash", "start", "end", "fact_key", "fact"]);

function extractParams(handlerArgs) {
  let firstObject = null;
  for (const value of handlerArgs) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) continue;
    if (!firstObject) firstObject = value;
    if (Object.keys(value).some(key => KNOWN_PARAM_KEYS.has(key))) return value;
  }
  return firstObject || {};
}

function registerTool(api, spec) {
  if (!api || typeof api.registerTool !== "function") throw new Error("OpenClaw registerTool unavailable");
  try { return api.registerTool(spec); }
  catch (first) { return api.registerTool(spec.name, spec.parameters, spec.execute); }
}

function register(api) {
  if (typeof api?.on === "function") {
    api.on("before_tool_call", (event, context) => rememberExecutionScope(event, context));
  }
  for (const name of TOOL_NAMES) {
    registerTool(api, {
      name,
      description: TOOL_DESCRIPTIONS[name],
      parameters: schemas[name],
      inputSchema: schemas[name],
      optional: name === "sam_promote",
      execute: async (...handlerArgs) => name === "sam_document_ingest"
        ? documentIngestCall(extractParams(handlerArgs))
        : bridgeCall(name, extractParams(handlerArgs), takeExecutionScope(handlerArgs[0])),
    });
  }
}

module.exports = { id: "sam-memory", name: "SAM memory tools", register, _private: { schemas, validate, bridgeCall, documentIngestCall, extractParams, toToolResult, rememberExecutionScope, takeExecutionScope, scopeFromSessionId, TOOL_NAMES } };
