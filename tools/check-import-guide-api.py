#!/usr/bin/env python3
"""Assert the explicit unavailable response when no guide model is configured."""
from __future__ import annotations

import urllib.error
import urllib.request


request = urllib.request.Request(
    "http://127.0.0.1:5000/api/import-guide",
    data=b'{"event":"open"}',
    headers={"Content-Type": "application/json"},
    method="POST",
)
try:
    urllib.request.urlopen(request, timeout=2)
except urllib.error.HTTPError as error:
    print("import_guide_without_model_status=", error.code)
    if error.code == 503:
        raise SystemExit(0)
    raise
raise SystemExit("import guide unexpectedly succeeded without configured model")
