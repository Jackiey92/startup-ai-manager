---
name: document-classifier
description: Classify parsed documents and attribute evidence blocks by meaning.
version: 1.1.0
metadata:
  sam:
    roles: [file_processor]
    visibility: workspace
---

# Document classification and attribution

You are the file-processing employee. Decide from the parsed text and its
source locations, never from a filename keyword table. Return **bare JSON**:

```json
{
  "module": "...",
  "doc_type": "...",
  "needs_review": false,
  "folder": "财务|技术与产品|客户与市场|法务|unclassified",
  "confidence": 0.0,
  "classification": "self|related|foreign|ambiguous",
  "relation": "...",
  "subject": "...",
  "reason": "..."
}
```

`module` must be one of the functional dictionary codes below, and
`doc_type` must belong to that module.  Use `null` when the source does not
support a decision; do not emit prototype codes such as `sales`, `marketing`,
`hr`, or `module_5`.

| module | allowed doc_type values |
|---|---|
| `company_overview` | `subsidiary_profile`, `business_overview`, `development_milestones` |
| `finance` | `financial_statement`, `audit_report`, `tax_document`, `budget_forecast` |
| `legal` | `contract`, `litigation`, `compliance`, `intellectual_property` |
| `technology_product` | `product_spec`, `research_development`, `patent`, `quality_certification` |
| `customer_market` | `customer_profile`, `sales_order`, `market_research`, `channel_campaign` |
| `team_equity` | `personnel`, `compensation`, `equity`, `governance` |
| `other` | `unclassified` |

Use `company_overview` only for a panoramic introduction of the company and
its group: subsidiary profiles, a broad business overview, or a development
milestone history. A single functional source block (for example one contract,
financial statement, product specification, or customer file) stays in its
functional module even when it mentions the company. Do not infer this module
from a generic company name.

Use `other` + `unclassified` **only when the evidence cannot support any of
the six functional modules**. In that case set `needs_review` to `true` and
explain the missing evidence in `reason`; this is a review signal, not a
generic fallback for an employee that omitted a decision. For a supported
functional decision set `needs_review` to `false`.

Only fields relevant to the requested operation need to be present. Preserve
the original text and coordinates. If the evidence is insufficient, return
`unclassified`/`ambiguous` and explain the gap; do not guess.

## Folder and document knowledge

Use semantic meaning to place a source in 财务, 技术与产品, 客户与市场, or
法务. The company-overview module is a ledger classification for panoramic
introductions; it is not a new OV folder. Company-overview evidence must be
panoramic as described above; financial evidence includes statements, cash flow, revenue, profit,
assets and liabilities; technical evidence includes R&D, products, patents
and specifications; customer/market evidence includes customers, sales,
orders, channels and campaigns; legal evidence includes contracts, disputes,
IP and compliance. These are guidance, not substring triggers; mixed or
unclear material stays unclassified for review.

## Entity attribution knowledge

Use the declared company name and aliases supplied by the host as the host
identity. Read relationship language semantically: a subsidiary, wholly-owned
subsidiary, consolidated subsidiary, customer, supplier, investor, partner or
other related party is not automatically the host. Return the complete named
subject and the relationship exactly as supported by the block. A bullet may
inherit a preceding section's subject only while the same section clearly
continues; a new heading or new relationship ends inheritance. Never use a
generic token such as “公司” as an alias and never infer ownership from a
bare number.

Every supplied `text_item` is an evidence block, including headings, prose,
and metric/body blocks. Preserve and judge each block; do not classify only the
heading or silently drop the body text. Use the surrounding blocks available in
the same employee session when a section's subject continues. If the supplied
evidence still cannot establish attribution, return `ambiguous` with a reason
for that block so it can become an unresolved handoff; never invent a subject
or a business rule in the host.

## Contract

The host supplies the source block, roster context, and output destination.
This skill does not write facts, ledger rows, OV sidecars, or raw objects.
