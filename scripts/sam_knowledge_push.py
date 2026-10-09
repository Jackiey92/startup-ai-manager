#!/usr/bin/env python3
"""Manually send one unchanged SAM knowledge snapshot to the cloud ingest API."""
from __future__ import annotations

import argparse
import http.client
import json
import os
from pathlib import Path
import sys
import time
import urllib.error
import urllib.request
from urllib.parse import urlsplit

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))


def knowledge_service():
    """Reuse the web entry point's configuration and provider composition."""
    # Defer imports so missing push settings can be reported without starting OV
    # or requiring the application's separately injected memory namespace.
    from app.knowledge import KnowledgeService
    from app.providers import memory_provider
    from app.runtime_config import RuntimeConfig

    config = RuntimeConfig.from_env(project_root=PROJECT_ROOT)
    return KnowledgeService(config.main_db, memory_provider(config), objects_path=config.objects_dir)


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # Never forward the ingest credential or snapshot to a redirected host.
        return None


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--company-id", default=os.environ.get("SAM_COMPANY_ID"),
                        help="company scope (or set SAM_COMPANY_ID)")
    args = parser.parse_args(argv)
    if not args.company_id or not args.company_id.strip():
        parser.error("provide --company-id or set SAM_COMPANY_ID")

    cloud_url = os.environ.get("SAM_KNOWLEDGE_CLOUD_URL", "").strip()
    ingest_key = os.environ.get("SAM_KNOWLEDGE_INGEST_KEY", "")
    missing = [name for name, value in (
        ("SAM_KNOWLEDGE_CLOUD_URL", cloud_url), ("SAM_KNOWLEDGE_INGEST_KEY", ingest_key),
    ) if not value.strip()]
    if missing:
        print("Set required environment variables: " + ", ".join(missing), file=sys.stderr)
        return 1

    try:
        target = urlsplit(cloud_url)
        if (target.scheme not in ("http", "https") or not target.hostname
                or target.username is not None or target.password is not None
                or target.query or target.fragment):
            raise ValueError("invalid service root")
        target.port  # Validate malformed ports before reading a snapshot.
    except ValueError:
        print("SAM_KNOWLEDGE_CLOUD_URL must be an HTTP(S) service root without credentials, "
              "query or fragment", file=sys.stderr)
        return 1

    def error(message: str) -> None:
        # Defense in depth if an error response echoes the request credential.
        print(message.replace(ingest_key, "[redacted]"), file=sys.stderr)

    try:
        payload = knowledge_service().read(company_id=args.company_id)
    except Exception as exc:
        error(f"Knowledge read failed: {exc}")
        return 1

    try:
        body = json.dumps({"company_id": args.company_id, "pushed_at": time.time(),
                           "payload": payload}, ensure_ascii=False).encode("utf-8")
        request = urllib.request.Request(
            cloud_url.rstrip("/") + "/ingest", data=body, method="POST",
            headers={"Content-Type": "application/json", "X-Ingest-Key": ingest_key},
        )
        # Default ProxyHandler honors environment proxy settings; no fixed proxy.
        opener = urllib.request.build_opener(_NoRedirect())
        with opener.open(request, timeout=30) as response:
            status = response.status
            response_body = response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        with exc:
            try:
                detail = exc.read().decode("utf-8", errors="replace")
            except (OSError, http.client.HTTPException) as read_error:
                detail = f"could not read error response: {read_error}"
            error(f"HTTP {exc.code}: {detail}")
        return 1
    except (urllib.error.URLError, OSError, http.client.HTTPException, ValueError, TypeError) as exc:
        error(f"Knowledge push failed: {exc}")
        return 1

    if status != 200:
        error(f"HTTP {status}: {response_body}")
        return 1
    try:
        result = json.loads(response_body)
    except ValueError:
        error(f"HTTP 200: invalid JSON response: {response_body}")
        return 1
    if not isinstance(result, dict) or result.get("ok") is not True:
        error(f"HTTP 200: ingest did not confirm ok=true: {response_body}")
        return 1

    files = len(payload["evidence"]["files"])
    facts = sum(len(group["facts"]) for group in payload["facts"]["groups"])
    working_memory = len(payload["working_memory"]["items"])
    print(f"Knowledge push succeeded: company_id={args.company_id} host={target.hostname} "
          f"files={files} facts={facts} working_memory={working_memory}".replace(ingest_key, "[redacted]"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
