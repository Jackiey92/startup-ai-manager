"""Neutral test-only OV root for import-time path constants."""
import os

os.environ.setdefault("SAM_MEMORY_ROOT_URI", "viking://sam-test/product-root")
