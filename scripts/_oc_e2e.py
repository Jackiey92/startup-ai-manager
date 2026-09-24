import sys
from pathlib import Path
sys.path.insert(0, ".")
from app.harness.staging import StagingStore
from app.harness.runtime.openclaw_adapter import OpenClawAdapter

h = "0aa6d152435ee8b5718cb536bb59dd44d32622f8d43a2f38a4718b9f2982a842"
ad = OpenClawAdapter(StagingStore())
sid = ad.run_parse(h, "xlsx", timeout=300)
print("STAGING_ID", sid)
row = StagingStore().get(sid)
print("FORMAT", row["format"], "STATUS", row["status"])
print("ROWS", len(row["payload"]["table_rows"]), "SPANS", len(row["payload"]["text_spans"]))
print("HINT", row["payload"]["hint"])
