---
name: document-ingest
description: Ingest PDF, DOC/DOCX, XLS/XLSX and PPT/PPTX into local L2 evidence with provenance.
---

# document-ingest

Use this skill when a source document must be converted into the SAM L2
evidence contract. The skill is an orchestration boundary, not a business
facts extractor.

## Contract

`scripts/bridge` accepts a task JSON path and writes one JSON document to the
requested output path (or stdout). The output has:

- source metadata: `source_id`, `filename`, `format`, `size_bytes`,
  `uploaded_at`, `file_hash`;
- `pages[]`, with page number, text items, table rows and optional `bbox`;
- `images[]`, with image hash, MIME, local-only path and source locator;
- `parse_summary`, including engine, status, warnings and counts.

Every evidence item must carry a source locator. PDF locators use page and
bbox; spreadsheets use sheet and cell/range; Word uses paragraph/table
indices; PowerPoint uses slide and shape/table indices. A missing locator is a
warning, not permission to invent one.

Embedded image bytes are extracted only to the local L2 image store. They are
not sent to a model; an external model may receive only an approved marker or
caption. DOCX paragraph, PPTX slide/shape, and XLSX sheet/cell anchors are
filled when the container exposes them; otherwise the locator remains explicit
and coordinate fields are null. `images[]` is an evidence reference, not a
verified 2b fact.

## Engine selection

The bridge selects `SAM_INGEST_ENGINE` (`auto`, `mineru`, or `docling`). The
selected engine is behind the bridge and may be replaced without changing the
application layer. `auto` prefers Docling for Office formats (no server
required), and MinerU first for PDF/image layout, with the other local engine
as a fallback when the preferred conversion fails. The local POC has
verified MinerU 4.0.7 on CPU with a basic ONNX tier for PDF, DOCX, XLSX and
PPTX, and Docling slim 2.130.0 for Office. Docling PDF requires its optional
Torch/OCR stack and is reported as `parse_failed` when that stack is absent;
the bridge must not pretend that this path succeeded.

## Safety and memory boundary

## Employee workflow and quality gate

The employee calls the registered OpenClaw tool `sam_document_ingest` with
exactly `{file_hash, format}`. It is the skill's controlled executioner: it
reads only the runtime-injected inbox task, runs `scripts/bridge` and
`scripts/quality.py` in the parser sandbox, retries the alternate engine when
quality fails, and atomically writes the manifest to the confined outbox.
The employee must not invent paths, run shell commands, or claim success when
the tool reports `parse_failed`. Quality failures (unbalanced parentheses,
incomplete company suffix, missing guide colon, or a mid-word break) remain
explicit in `parse_summary.warnings`; never silently accept damaged text.

This skill writes L2 extraction only. It must never write verified 2b facts,
resolve conflicts, or update OV directly. The caller/runtime owns the L2
destination and may pass a RuntimeProvider-managed path. Raw source bytes and
full extracted text stay local by default; do not send them to a model. Only
explicitly approved metadata/summary may leave the machine.

MinerU online-service deployments must retain the project's required
"Powered by MinerU" attribution and license notices. This local bridge does
not expose MinerU as an online service.

## OpenClaw mounting

The skill directory is mounted from `skills/document-ingest` under the
manifest's skill root. The OpenClaw skill mapping for `pdf`, `docx`, `xlsx`,
and `pptx` points here. RuntimeProvider supplies the root and task transport;
no Windows or host-specific path is embedded in this skill.

## Tool Search usage (Phase 3)

Use the native tools-mode controls in this order, with an English query:

1. `tool_search({"query":"parse an uploaded document"})`.
2. Take the exact returned business tool `sam_document_ingest`; do not invent
   an `openclaw:<plugin>:<tool>` prefix and do not pass a control name as an id.
3. `tool_describe({"id":"sam_document_ingest"})` to read the schema.
4. `tool_call({"id":"sam_document_ingest","args":{"file_hash":"<64 lowercase hex>","format":"pdf"}})`.

The call arguments are exactly `file_hash` and `format`. Never send an empty
object, `path`, `source_path`, shell text, or a host filesystem path. The
runtime injects the source object and confines output to `runtime_outbox` and
`l2_staging`; this skill does not write facts, OV, or 2B data.

Few-shot correction:

```json
{"query":"parse an uploaded PDF into L2 evidence"}
{"id":"sam_document_ingest"}
{"id":"sam_document_ingest","args":{"file_hash":"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef","format":"pdf"}}
```

`{"id":"tool_call","args":{}}` and
`{"id":"sam_document_ingest","args":{"path":"/etc/passwd"}}` are invalid;
stop and repeat search/describe instead of guessing.
