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


def home_snapshot(company_id: str) -> dict:
    from app.cloud_export import build_home_snapshot
    return build_home_snapshot(company_id=company_id)


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # Never forward the ingest credential or snapshot to a redirected host.
        return None


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--homepage", action="store_true", help="push the complete main-repo cloud window")
    parser.add_argument("--company-id", default=os.environ.get("SAM_COMPANY_ID"),
                        help="company scope (or set SAM_COMPANY_ID)")
    args = parser.parse_args(argv)
    if not args.company_id or not args.company_id.strip():
        parser.error("provide --company-id or set SAM_COMPANY_ID")

    # The complete homepage channel uses host scope only; retain the old
    # knowledge-only CLI contract for existing deployments.
    if args.homepage and args.company_id != os.environ.get("SAM_COMPANY_ID", "").strip():
        print("Homepage push requires host SAM_COMPANY_ID; caller override is not allowed", file=sys.stderr)
        return 1

    url_env = "SAM_CLOUD_URL" if args.homepage else "SAM_KNOWLEDGE_CLOUD_URL"
    key_env = "SAM_CLOUD_INGEST_KEY" if args.homepage else "SAM_KNOWLEDGE_INGEST_KEY"
    cloud_url = os.environ.get(url_env, "").strip()
    ingest_key = os.environ.get(key_env, "")
    missing = [name for name, value in (
        (url_env, cloud_url), (key_env, ingest_key),
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
        print(f"{url_env} must be an HTTP(S) service root without credentials, "
              "query or fragment", file=sys.stderr)
        return 1

    def error(message: str) -> None:
        # Defense in depth if an error response echoes the request credential.
        print(message.replace(ingest_key, "[redacted]"), file=sys.stderr)

    try:
        snapshot = home_snapshot(args.company_id) if args.homepage else {
            "company_id": args.company_id, "pushed_at": time.time(),
            "payload": knowledge_service().read(company_id=args.company_id),
        }
    except Exception as exc:
        error(f"Knowledge read failed: {exc}")
        return 1

    try:
        body = json.dumps(snapshot, ensure_ascii=False, allow_nan=False).encode("utf-8")
        if args.homepage and len(body) > 32 * 1024 * 1024:
            raise ValueError("homepage snapshot exceeds 32 MiB; nothing sent")
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

    if args.homepage:
        print(f"Homepage push succeeded: company_id={args.company_id} host={target.hostname}".replace(ingest_key, "[redacted]"))
        return 0
    payload = snapshot["payload"]
    files = len(payload["evidence"]["files"])
    facts = sum(len(group["facts"]) for group in payload["facts"]["groups"])
    working_memory = len(payload["working_memory"]["items"])
    print(f"Knowledge push succeeded: company_id={args.company_id} host={target.hostname} "
          f"files={files} facts={facts} working_memory={working_memory}".replace(ingest_key, "[redacted]"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
