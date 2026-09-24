---
name: parse-xlsx
description: Parse an Excel (.xlsx) source file into the unified ParseResult JSON (text spans + table rows locked to source locations). Use when a sales file such as a contract order list or sales ledger needs to be parsed. The output is staging-only; never write facts directly.
---

# parse-xlsx

Parse one stored Excel file into the project's unified `ParseResult` JSON.

## Procedure

1. Read the task JSON path given in the user message (an `inbox/<id>.json` file).
   It contains: `file_hash`, `source_path`, `original_name`, `format`.
2. Run the bridge script with the project virtualenv Python, using this exact
   absolute path. Do NOT use any other python, and do NOT run pip:

   `python "scripts/parse_bridge.py" "<task_json_path>"`  (the harness adapter places the project virtualenv first on PATH; do not hardcode an absolute interpreter path)

3. The script writes a `ParseResult` JSON file to `outbox/<file_hash>.json`
   and prints its path.
4. Return only that output path. Do not modify facts, the database, or any file
   outside `outbox/`.

## Rules

- Only read the single `source_path` named in the task.
- Output is confined to `outbox/`; it is staging data, not committed facts.
- Preserve source location on every span/row (`file_hash` + sheet + range).
- Never attempt to install packages; openpyxl is already available in the
  project virtualenv above.
