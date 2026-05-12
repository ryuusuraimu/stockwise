# Stockwise AGENTS.md

## Project

Stockwise is an Editorial Investor Notebook for beginner investors.

It helps users:
1. search investment FAQ knowledge,
2. read structured official knowledge blocks,
3. save those blocks as short understanding notes,
4. later ask their saved notes in a source-grounded way.

Phase 1 focuses on the local harness only.

## Current goal

Build a development harness for validating:
- data models
- mock FAQ data
- reusable UI components
- screen states
- local note state
- mock AI helper behavior

Do not build a production backend.
Do not call real AI APIs.
Do not implement authentication.
Do not add vector DB or semantic search.

## Design direction

Use an Editorial Investor Notebook UI.

Use:
- left sidebar navigation
- warm off-white background
- soft white cards
- deep muted green actions
- deep charcoal text
- source chips
- document-like FAQ detail pages
- calm knowledge cards
- Japanese labels as primary UI language

Avoid:
- trading dashboards
- stock charts
- candlestick charts
- market tickers
- red/green profit-loss UI
- chat bubbles
- Google Material look
- crypto-like UI
- overly corporate Bloomberg-style terminals

## UI labels

Use these Japanese labels consistently:

- ホーム
- 理解ノート
- ライブラリ
- ノートに聞く
- 最近の理解
- つながる知識
- 参照元
- 関連ソース
- ＋ 理解ノートに追加
- まず一言で
- もう少し詳しく
- 例で見る
- よくある誤解

## Implementation rules

- Use TypeScript.
- Keep data models in `src/types.ts`.
- Keep mock FAQ data in `src/data/faqs.ts`.
- Keep harness fixtures in `src/fixtures`.
- Keep mock AI helpers in `src/utils/aiMocks.ts`.
- Keep harness pages in `src/harness`.
- Prefer small focused changes.
- After each task, run typecheck/build if scripts exist.
