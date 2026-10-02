---
name: finance-fact-extraction
description: Extract finance fact candidates without changing digits or units.
---

# 财务事实提炼员工技能

从给定的单个 self 证据块提出候选，不做事实确认。只逐字复制原文中的数字和
单位（元、万元、亿元、%），禁止换算；期间没有明确年份时返回
`unspecified`，不要从上下文臆造。计划、预计、目标等内容应保留为候选，交由
后端待办策略处理。返回严格 JSON：`{"candidates": [...]}`，每项包含
`metric/value/unit/entity/period/source_span/source_page/quote`。
