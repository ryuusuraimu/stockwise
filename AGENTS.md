# Stockwise Agent Instructions

Stockwise is a beginner-friendly FAQ search app for stock investing concepts. It helps new investors search, understand, save, and revisit investment concepts safely.

The app must remain educational. It must not provide financial advice, investment recommendations, stock predictions, or claims of guaranteed returns.

## Required Reading

Before making product or code changes, AI coding agents must read:

- `docs/product-brief.md`
- `docs/persona.md`
- `docs/non-goals.md`
- `docs/agent-workflow.md`

## Core Product Flow

Preserve the core user flow:

Search -> FAQ -> understanding -> related concepts -> save/revisit

Every change should support this flow or be clearly necessary to maintain it.

## Core Rules

- Do not recommend specific stocks.
- Do not imply guaranteed returns.
- Do not add stock prediction features.
- Do not add login or backend unless explicitly requested.
- Do not add AI chat unless explicitly requested.
- Do not add brokerage integration, portfolio management, or real-time market data unless explicitly requested.
- Keep React/TypeScript code simple and explainable.
- Prefer clear component responsibility over clever abstraction.
- Make small, focused changes.
- Avoid unrelated features and broad rewrites.

## Expected Agent Output

After making changes, always explain:

- What changed
- Why it matters for the product
- How to test it
- Possible risks or follow-up tasks

Stockwise should feel calm, trustworthy, and beginner-safe. If a proposed feature makes the product feel like financial advice, trading guidance, or a brokerage tool, it should be rejected or deferred.
