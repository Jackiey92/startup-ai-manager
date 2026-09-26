"use strict";

// Thin OpenClaw plugin shell.  All SAM business logic stays in Python.  The
// two registerTool call shapes are supported because OpenClaw 2026.3 and the
// newer 2026.9 line changed the registration wrapper, while retaining the
// same tool object contract.
const { spawn } = require("node:child_process");

const TOOL_NAMES = [
  "sam_memory_read", "sam_memory_search", "sam_file_get",
  "sam_memory_map", "sam_conversation_read", "sam_thread_list",
  "sam_thread_open", "sam_promote",
];

const schemas = {
  sam_memory_read: { type: "object", additionalProperties: false, required: ["uri"], properties: { uri: { type: "string", pattern: "^viking://" } } },
  sam_memory_search: { type: "object", additionalProperties: false, required: ["query"], properties: { query: { type: "string", minLength: 1 } } },
  sam_file_get: { type: "object", additionalProperties: false, required: ["file_hash"], properties: { file_hash: { type: "string", pattern: "^[0-9a-f]{64}$" } } },
  sam_memory_map: { type: "object", additionalProperties: false, properties: {} },
  sam_conversation_read: { type: "object", additionalProperties: false, properties: { start: { type: "string" }, end: { type: "string" } } },
  sam_thread_list: { type: "object", additionalProperties: false, properties: {} },
  sam_thread_open: { type: "object", additionalProperties: false, properties: {} },
  sam_promote: { type: "object", additionalProperties: false, required: ["fact_key", "fact"], properties: { fact_key: { type: "string", minLength: 1 }, fact: { type: "object" } } },
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
  if (Object.prototype.hasOwnProperty.call(input, "company_id") || Object.prototype.hasOwnProperty.call(input, "thread_id")) throw new Error("scope arguments are not accepted");
  if (name === "sam_memory_read" && (typeof input.uri !== "string" || !input.uri.startsWith("viking://"))) throw new Error("bad request");
  if (name === "sam_memory_search" && (typeof input.query !== "string" || !input.query.trim())) throw new Error("bad request");
  if (name === "sam_file_get" && !/^[0-9a-f]{64}$/.test(input.file_hash || "")) throw new Error("bad request");
  if (name === "sam_promote" && (!process.env.SAM_ALLOW_PROMOTE || !/^(1|true|yes)$/i.test(process.env.SAM_ALLOW_PROMOTE))) throw new Error("promotion disabled");
  return input;
}

function bridgeCall(name, input) {
  validate(name, input);
  const python = process.env.SAM_TOOL_BRIDGE_PYTHON || process.env.SAM_VENV_PYTHON || "python3";
  const cwd = process.env.SAM_PROJECT_ROOT || process.cwd();
  const timeout = Number(process.env.SAM_TOOL_BRIDGE_TIMEOUT_MS || 15000);
  return new Promise((resolve, reject) => {
    const child = spawn(python, ["-m", "app.tool_bridge"], { cwd, env: { ...process.env }, stdio: ["pipe", "pipe", "pipe"] });
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
  for (const name of TOOL_NAMES) {
    registerTool(api, {
      name,
      description: `SAM scoped ${name.replace(/^sam_/, "")} tool`,
      parameters: schemas[name],
      inputSchema: schemas[name],
      optional: name === "sam_promote",
      execute: async (...handlerArgs) => bridgeCall(name, extractParams(handlerArgs)),
    });
  }
}

module.exports = { id: "sam-memory", name: "SAM memory tools", register, _private: { schemas, validate, bridgeCall, extractParams, toToolResult, TOOL_NAMES } };
