"""Generic staging contracts shared by runtime adapters.

Document parsing engines live behind ``skills/document-ingest``.  These small
value objects are transport/staging contracts only; they do not implement a
parser and therefore do not couple the application to a parsing library.
"""
from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any, Optional


@dataclass
class SourceLoc:
    file_hash: str
    page: Optional[int] = None
    char_range: Optional[str] = None
    locator: Optional[str] = None

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class TextSpan:
    text: str
    loc: SourceLoc
    kind: str = "text"

    def to_dict(self) -> dict:
        return asdict(self)


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
    format: str
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
