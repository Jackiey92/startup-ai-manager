"""Pluggable, source-backed dashboard card registry.

The dashboard is deliberately a small assembly layer.  Cards describe where
their data comes from and are only emitted when that data exists; this keeps
the template free of prototype values and leaves future industry modules as
registrable extensions rather than conditionals in the Flask view.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Iterable

from ..db.database import connect


@dataclass(frozen=True)
class CardSpec:
    """A dashboard card contract, independent of its HTML rendering."""

    key: str
    label: str
    module: str
    description: str
    source: str
    kind: str = "scalar"
    always_visible: bool = False


@dataclass(frozen=True)
class ModuleSpec:
    key: str
    label: str
    cards: tuple[CardSpec, ...]


@dataclass(frozen=True)
class DashboardSpec:
    key: str
    label: str
    modules: tuple[ModuleSpec, ...]


class DashboardRegistry:
    """Registry used by the assembler; no business logic is hidden in views."""

    def __init__(self) -> None:
        self._dashboards: dict[str, DashboardSpec] = {}

    def register(self, dashboard: DashboardSpec) -> DashboardSpec:
        if dashboard.key in self._dashboards:
            raise ValueError(f"dashboard already registered: {dashboard.key}")
        self._dashboards[dashboard.key] = dashboard
        return dashboard

    def get(self, key: str = "business") -> DashboardSpec:
        try:
            return self._dashboards[key]
        except KeyError as exc:
            raise KeyError(f"unknown dashboard: {key}") from exc

    def cards(self, key: str = "business") -> tuple[CardSpec, ...]:
        return tuple(card for module in self.get(key).modules for card in module.cards)


BUSINESS_DASHBOARD = DashboardSpec(
    key="business",
    label="业务",
    modules=(
        ModuleSpec(
            key="profile",
            label="公司概况",
            cards=(
                CardSpec(
                    key="company_overview",
                    label="公司概述",
                    module="profile",
                    description="定位与业务简述",
                    source="business_overview",
                    kind="overview",
                    always_visible=True,
                ),
                CardSpec(
                    key="product_lines",
                    label="产品线",
                    module="profile",
                    description="已解析产品矩阵中的产品线数量",
                    source="business_overview.product_line_count",
                ),
                CardSpec(
                    key="max_trl",
                    label="最高成熟度 TRL",
                    module="profile",
                    description="已解析资料中的最高 TRL",
                    source="business_overview.max_trl",
                ),
                CardSpec(
                    key="intellectual_property",
                    label="知识产权",
                    module="profile",
                    description="发明专利与软件著作权数量",
                    source="business_overview.ip",
                ),
            ),
        ),
        ModuleSpec(
            key="facts",
            label="经营事实",
            cards=(
                CardSpec("revenue", "营业收入", "facts", "已确认营业收入", "facts.营业收入"),
                CardSpec("net_profit", "净利润", "facts", "已确认净利润", "facts.净利润"),
                CardSpec("registered_capital", "注册资本", "facts", "已确认注册资本", "facts.注册资本"),
                CardSpec("financing", "融资", "facts", "已确认融资金额", "facts.融资金额"),
            ),
        ),
    ),
)


REGISTRY = DashboardRegistry()
REGISTRY.register(BUSINESS_DASHBOARD)


_FACT_ALIASES: dict[str, tuple[str, ...]] = {
    "revenue": ("营业收入", "营收"),
    "net_profit": ("净利润", "净利"),
    "registered_capital": ("注册资本",),
    "financing": ("融资金额", "融资"),
}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


class DashboardPreferenceStore:
    """Per-company card visibility preferences, stored independently of facts."""

    def __init__(self, db_path) -> None:
        self._db_path = db_path

    def get(self, *, company_id: str, dashboard_id: str = "business") -> dict[str, bool]:
        with connect(self._db_path) as conn:
            rows = conn.execute(
                """SELECT card_id,hidden FROM dashboard_preferences
                   WHERE company_id=? AND dashboard_id=?""",
                (company_id, dashboard_id),
            ).fetchall()
        return {str(row["card_id"]): bool(row["hidden"]) for row in rows}

    def set(self, *, company_id: str, dashboard_id: str, card_id: str, hidden: bool) -> dict:
        with connect(self._db_path) as conn:
            conn.execute(
                """INSERT INTO dashboard_preferences(company_id,dashboard_id,card_id,hidden,updated_at)
                   VALUES (?,?,?,?,?)
                   ON CONFLICT(company_id,dashboard_id,card_id)
                   DO UPDATE SET hidden=excluded.hidden, updated_at=excluded.updated_at""",
                (company_id, dashboard_id, card_id, int(hidden), _now()),
            )
            conn.commit()
        return {"company_id": company_id, "dashboard_id": dashboard_id,
                "card_id": card_id, "hidden": bool(hidden)}


def _nonempty(value: Any) -> bool:
    return value is not None and (not isinstance(value, str) or bool(value.strip()))


def _fact_card(spec: CardSpec, facts: Iterable[dict[str, Any]]) -> dict[str, Any] | None:
    aliases = _FACT_ALIASES.get(spec.key, ())
    matches = [fact for fact in facts if any(
        str(fact.get("attribute") or "").strip() == alias for alias in aliases
    ) and _nonempty(fact.get("value"))]
    if not matches:
        return None
    return {"id": spec.key, "label": spec.label, "description": spec.description,
            "kind": "fact", "source": spec.source, "facts": matches,
            "value": matches[0].get("value"), "unit": matches[0].get("unit"),
            "period": matches[0].get("period")}


def assemble_dashboard(*, overview: dict[str, Any], facts: list[dict[str, Any]],
                       hidden: dict[str, bool], dashboard: DashboardSpec = BUSINESS_DASHBOARD) -> dict[str, Any]:
    """Build the render/API contract from real overview and fact evidence."""
    cards: list[dict[str, Any]] = []
    available: dict[str, dict[str, Any]] = {}
    for spec in (card for module in dashboard.modules for card in module.cards):
        if spec.key == "company_overview":
            cards.append({"id": spec.key, "label": spec.label, "description": spec.description,
                          "kind": spec.kind, "source": spec.source,
                          "positioning": overview.get("positioning"),
                          "summary": overview.get("summary")})
            continue
        candidate: dict[str, Any] | None = None
        if spec.key == "product_lines":
            value = overview.get("product_line_count")
            if not _nonempty(value):
                continue
            candidate = {"id": spec.key, "label": spec.label, "description": spec.description,
                         "kind": spec.kind, "source": spec.source, "value": value,
                         "evidence": (overview.get("products") or [])[:1]}
        elif spec.key == "max_trl":
            value = overview.get("max_trl")
            if not value:
                continue
            candidate = {"id": spec.key, "label": spec.label, "description": spec.description,
                         "kind": spec.kind, "source": spec.source, "value": value.get("value"),
                         "stage": value.get("stage"), "evidence": [value]}
        elif spec.key == "intellectual_property":
            invention = overview.get("invention_patent_count")
            software = overview.get("software_copyright_count")
            if not invention and not software:
                continue
            candidate = {"id": spec.key, "label": spec.label, "description": spec.description,
                         "kind": spec.kind, "source": spec.source,
                         "invention": invention, "software": software,
                         "evidence": [item for item in (invention, software) if item]}
        else:
            candidate = _fact_card(spec, facts)
        if candidate is not None:
            available[spec.key] = candidate
            if not hidden.get(spec.key, False):
                cards.append(candidate)
    controls = [{"id": spec.key, "label": spec.label, "hidden": bool(hidden.get(spec.key, False))}
                for spec in (card for module in dashboard.modules for card in module.cards)
                if spec.key != "company_overview" and spec.key in available]
    return {"id": dashboard.key, "label": dashboard.label,
            "modules": [{"id": module.key, "label": module.label,
                         "card_ids": [card.key for card in module.cards]}
                        for module in dashboard.modules],
            "cards": cards,
            "controls": controls,
            "hidden": dict(hidden)}


class DashboardAssembler:
    """Small injectable facade for callers that select a registered dashboard."""

    def __init__(self, registry: DashboardRegistry = REGISTRY) -> None:
        self.registry = registry

    def assemble(self, *, overview: dict[str, Any], facts: list[dict[str, Any]],
                 hidden: dict[str, bool], dashboard_id: str = "business") -> dict[str, Any]:
        return assemble_dashboard(
            overview=overview, facts=facts, hidden=hidden,
            dashboard=self.registry.get(dashboard_id),
        )


__all__ = [
    "BUSINESS_DASHBOARD", "CardSpec", "DashboardAssembler", "DashboardPreferenceStore", "DashboardRegistry",
    "DashboardSpec", "ModuleSpec", "REGISTRY", "assemble_dashboard",
]
