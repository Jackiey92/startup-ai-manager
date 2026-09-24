"""Unified parse output shared by all parser skills (xlsx/pptx/word/pdf).

Every parser, regardless of source format, produces a ParseResult:
text spans and table rows, each locked to a source location
(file_hash + page + char range), plus a coarse classification hint.
"""
from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import Any, Optional


@dataclass
class SourceLoc:
    file_hash: str
    page: Optional[int] = None       # 1-based; sheet index for spreadsheets
    char_range: Optional[str] = None  # e.g. "A1:C10" or char offset range
    locator: Optional[str] = None    # human-readable location hint

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class TextSpan:
    text: str
    loc: SourceLoc
    kind: str = "text"               # text | heading | list_item | note

    def to_dict(self) -> dict:
        d = asdict(self)
        return d


@dataclass
class TableRow:
    headers: list[str]
    values: dict[str, Any]
    loc: SourceLoc
    sheet: Optional[str] = None
    row_index: Optional[int] = None

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class ClassificationHint:
    module: Optional[str] = None
    doc_type: Optional[str] = None
    confidence: float = 0.0

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class ParseResult:
    file_hash: str
    original_name: str
    format: str                       # xlsx | pptx | word | pdf
    text_spans: list[TextSpan] = field(default_factory=list)
    table_rows: list[TableRow] = field(default_factory=list)
    hint: ClassificationHint = field(default_factory=ClassificationHint)

    def to_dict(self) -> dict:
        return {
            "file_hash": self.file_hash,
            "original_name": self.original_name,
            "format": self.format,
            "text_spans": [s.to_dict() for s in self.text_spans],
            "table_rows": [r.to_dict() for r in self.table_rows],
            "hint": self.hint.to_dict(),
        }
