"""Excel parser skill: turns a stored xlsx/csv into a unified ParseResult."""
from __future__ import annotations

import io

import openpyxl

from ..classifier import FileClassifier
from ..storage import SourceFileStore
from .base import ParserSkill
from .types import (
    ParseResult, TextSpan, TableRow, SourceLoc, ClassificationHint,
)


class XlsxParser(ParserSkill):
    format = "xlsx"

    def __init__(self, store: SourceFileStore):
        super().__init__(store)

    def parse(self, file_hash: str) -> ParseResult:
        stored = self.store.get(file_hash)
        blob = self.store.get_bytes(file_hash)
        wb = openpyxl.load_workbook(io.BytesIO(blob), data_only=True)

        result = ParseResult(
            file_hash=file_hash,
            original_name=stored.original_name,
            format=self.format,
        )

        for sheet_index, ws in enumerate(wb.worksheets, start=1):
            rows = [
                [cell for cell in row]
                for row in ws.iter_rows(values_only=True)
            ]
            non_empty = [r for r in rows if any(v is not None and str(v).strip() for v in r)]
            if not non_empty:
                continue

            headers = [
                str(v).strip() if v is not None else f"col_{i+1}"
                for i, v in enumerate(non_empty[0])
            ]

            result.text_spans.append(
                TextSpan(
                    text=ws.title,
                    kind="heading",
                    loc=SourceLoc(
                        file_hash=file_hash,
                        page=sheet_index,
                        char_range="A1",
                        locator=f"{ws.title}",
                    ),
                )
            )

            for row_offset, raw in enumerate(non_empty[1:], start=2):
                values = {}
                for col_index, value in enumerate(raw):
                    header = headers[col_index] if col_index < len(headers) else f"col_{col_index+1}"
                    if value is not None and str(value).strip():
                        values[header] = value
                if not values:
                    continue
                col_letter = openpyxl.utils.get_column_letter(len(values))
                result.table_rows.append(
                    TableRow(
                        headers=headers,
                        values=values,
                        sheet=ws.title,
                        row_index=row_offset,
                        loc=SourceLoc(
                            file_hash=file_hash,
                            page=sheet_index,
                            char_range=f"A{row_offset}:{col_letter}{row_offset}",
                            locator=f"{ws.title}!行{row_offset}",
                        ),
                    )
                )

        guess = FileClassifier.guess(stored.original_name)
        result.hint = ClassificationHint(
            module=guess.module,
            doc_type=guess.doc_type,
            confidence=guess.confidence,
        )
        return result
