import sys, importlib.util
from pathlib import Path
webapp_file = Path(r"webapp\app.py").resolve()
sys.path.insert(0, str(webapp_file.parent))
sys.path.insert(0, str(webapp_file.parent.parent))
spec = importlib.util.spec_from_file_location("sales_app_module", webapp_file)
mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)

c = mod.app.test_client()
r = c.get("/files/4")
print("DETAIL STATUS:", r.status_code)
html = r.get_data(as_text=True)
print("has table:", "<table" in html)
print("has heading Sheet:", "Sheet1" in html)
import re
print("length:", len(html))
r2 = c.get("/")
print("INDEX STATUS:", r2.status_code, "lists file:", "BSG" in r2.get_data(as_text=True))
