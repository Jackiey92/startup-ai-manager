"""Parser skill interface and registry.

A ParserSkill wraps one format's parsing logic (typically a Python library /
an external skill script) and turns a stored source file into a ParseResult.
"""
from __future__ import annotations

from abc import ABC, abstractmethod

from ..storage import SourceFileStore
from .types import ParseResult


class ParserSkill(ABC):
    format: str

    def __init__(self, store: SourceFileStore):
        self.store = store

    @abstractmethod
    def parse(self, file_hash: str) -> ParseResult:
        ...


class ParserRegistry:
    def __init__(self) -> None:
        self._parsers: dict[str, ParserSkill] = {}

    def register(self, parser: ParserSkill) -> None:
        self._parsers[parser.format] = parser

    def get(self, format: str) -> ParserSkill:
        if format not in self._parsers:
            raise KeyError(f"no parser for format: {format}")
        return self._parsers[format]

    def formats(self) -> list[str]:
        return sorted(self._parsers)
