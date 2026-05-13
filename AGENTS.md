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

Stockwise V1.0 is an Obsidian-inspired Investor Knowledge Vault.

Use the Tactile Ledger visual system:
- three-pane knowledge workspace
- left Vault navigation
- center source document / understanding note pane
- right understanding context inspector
- paper-like reading surfaces
- thin ledger dividers
- compact archival source stamps
- deep muted green actions
- deep charcoal or warm ivory text depending on theme
- Japanese labels as primary UI language

Core layout:
1. Left pane: Vault navigation
2. Center pane: source document / understanding note
3. Right pane: understanding context inspector

Core saved-note layers:
1. 公式知識
2. 自分の理解
3. つながる知識

Themes:
- Paper Light: cream / ivory, paper-like, editorial, readable, not pure white
- Vault Dark: Obsidian-inspired charcoal / deep ink, calm, focused, not pure black, no neon

Product and workspace naming:
- Stockwise is the fixed product name.
- The workspace/vault name is user-configurable.
- Default workspace name: 投資理解のVault
- Do not use “The Vault” as a fixed product name.

Core UI primitives:
- VaultLayout
- NavigationPane
- DocumentPane
- ContextInspector
- SourceStamp
- LedgerEntry
- UnderstandingBlock
- LinkedKnowledgeSection
- AskThisNotePanel

Avoid:
- generic SaaS dashboards
- hero search layouts
- card-grid dashboards as the main structure
- trading dashboards
- stock charts
- candlestick charts
- market tickers
- red/green profit-loss UI
- chat bubbles
- Google Material look
- crypto-like UI
- overly corporate Bloomberg-style terminals
- pastel purple AI styling

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
