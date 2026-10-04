---
name: finance-fact-extraction
description: Extract finance fact candidates without changing digits or units.
version: 1.1.0
metadata:
  sam:
    roles: [finance_analyst]
    visibility: workspace
---

# 财务事实提炼员工技能

从给定的单个 self 证据块提出候选，不做事实确认。只逐字复制原文中的数字和
单位（元、万元、亿元、%），禁止换算；期间没有明确年份时返回
`unspecified`，不要从上下文臆造。计划、预计、目标等内容应保留为候选，交由
后端待办策略处理。返回严格 JSON：`{"candidates": [...]}`，每项包含
`metric/value/unit/entity/period/quote`。`quote` 使用人话原文片段；不要猜测
或构造机器页码、定位符、文件哈希，后端会从匹配的 self 块补齐坐标。
必须返回裸 JSON 对象或数组，禁止使用 Markdown 代码围栏（例如 ```json ... ```）。
如果传输信封或 JSON 无法解析，宿主会在不改变原文与请求的前提下有限重试；不要
借重试补数字、改引用或改变候选语义。

如果原文不足以形成可逐字核验的候选，必须返回空 `candidates`，并附
`unresolved` 说明卡点；不要用常识补数字、实体、期间或单位。示例：
`{"candidates": [], "unresolved": {"reason": "missing_source_grounding", "blocking": "..."}}`。

## Semantic finance knowledge

Recognize equivalent wording by meaning rather than requiring a fixed alias:
revenue/sales income/operating income, net profit/profit attributable to
owners, gross margin, cash and equivalents, accounts receivable, total assets,
operating cash flow, R&D spend, registered capital, financing, customers,
suppliers, orders, capacity and litigation. Keep the employee's chosen metric
label and quote; the application must not rebuild an alias table.

For consolidated reporting, separately identify the host's consolidated scope,
a subsidiary's standalone scope, and related/foreign entities. The employee
decides consolidation from report language and evidence; a backend relationship
word list is not authoritative. Keep parent and subsidiary facts as separate
entity records and preserve the relationship in the candidate.
