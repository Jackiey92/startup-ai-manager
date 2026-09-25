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
caption. `images[]` is an evidence reference, not a verified 2b fact.

## Engine selection

The bridge selects `SAM_INGEST_ENGINE` (`auto`, `mineru`, or `docling`). The
selected engine is behind the bridge and may be replaced without changing the
application layer. `auto` prefers MinerU, then Docling. The local POC has
verified MinerU 4.0.7 on CPU with a basic ONNX tier for PDF, DOCX, XLSX and
PPTX, and Docling slim 2.130.0 for Office. Docling PDF requires its optional
Torch/OCR stack and is reported as `parse_failed` when that stack is absent;
the bridge must not pretend that this path succeeded.

## Safety and memory boundary

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
