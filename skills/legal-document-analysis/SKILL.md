---
name: legal-document-analysis
description: Extract legally relevant evidence, obligations, and unresolved review items.
version: 1.0.0
metadata:
  sam:
    roles: [legal_analyst]
    visibility: workspace
---

# Legal document analysis

Return bare JSON only. Extract independently supported legal facts, obligations,
risks, dates, parties, and open questions from the supplied 2A block. Preserve
the exact quote and source locator supplied by the host; never invent a clause,
party, deadline, or legal conclusion. Contracts, disputes, intellectual
property, guarantees, compliance, and regulatory material are review topics,
not keyword triggers. When the text is incomplete or ambiguous, return an
`unresolved` item with the original quote, locator, and blocking reason.

The legal employee reads 2A/OV routes and writes only its role-scoped 2B
handoff. It never writes the R1 ledger, changes raw objects, or edits OV
navigation.
