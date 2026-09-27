from __future__ import annotations

import importlib.machinery
import importlib.util
from pathlib import Path

from docx import Document
from docx.shared import Inches
from openpyxl import Workbook
from openpyxl.drawing.image import Image as XlsxImage
from pptx import Presentation
from pptx.util import Inches as PptxInches


ROOT = Path(__file__).resolve().parents[1]
BRIDGE = ROOT / "skills" / "document-ingest" / "scripts" / "bridge"


def _bridge_module():
    loader = importlib.machinery.SourceFileLoader("sam_document_ingest_bridge", str(BRIDGE))
    spec = importlib.util.spec_from_loader(loader.name, loader)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _make_png(path: Path) -> None:
    # A tiny valid RGB PNG; the image bytes are local test data only.
    from PIL import Image

    Image.new("RGB", (8, 8), (180, 20, 20)).save(path, format="PNG")


def _make_office(path: Path, image: Path, fmt: str) -> None:
    if fmt == "docx":
        document = Document()
        document.add_paragraph("No-suffix DOCX content")
        document.add_picture(str(image), width=Inches(1))
        document.save(path)
    elif fmt == "pptx":
        presentation = Presentation()
        slide = presentation.slides.add_slide(presentation.slide_layouts[6])
        slide.shapes.add_picture(str(image), PptxInches(1), PptxInches(1), width=PptxInches(1))
        presentation.save(path)
    elif fmt == "xlsx":
        workbook = Workbook()
        sheet = workbook.active
        sheet.title = "Evidence"
        sheet["A1"] = "No-suffix XLSX content"
        sheet.add_image(XlsxImage(str(image)), "B2")
        workbook.save(path)
    else:  # pragma: no cover - the parametrization is deliberately narrow
        raise AssertionError(fmt)


def test_embedded_images_work_from_hash_only_office_objects(tmp_path: Path) -> None:
    """Content-addressed objects have no suffix, but Office images still extract."""
    bridge = _bridge_module()
    image = tmp_path / "fixture.png"
    _make_png(image)
    for fmt in ("docx", "pptx", "xlsx"):
        named = tmp_path / f"fixture.{fmt}"
        _make_office(named, image, fmt)
        hash_only = tmp_path / (f"{fmt}-" + "a" * 64)
        hash_only.write_bytes(named.read_bytes())
        images, warnings = bridge._extract_embedded_images(hash_only, "a" * 64, fmt)
        assert not warnings, (fmt, warnings)
        assert len(images) == 1, (fmt, images)
        assert images[0]["image_hash"]
        assert images[0]["source_loc"]["file_hash"] == "a" * 64


def test_image_extraction_failure_is_non_fatal(tmp_path: Path) -> None:
    bridge = _bridge_module()
    source = tmp_path / ("b" * 64)
    source.write_bytes(b"not an OOXML container")
    images, warnings = bridge._extract_embedded_images(source, "b" * 64, "xlsx")
    assert images == []
    assert warnings and "BadZipFile" in warnings[0]
