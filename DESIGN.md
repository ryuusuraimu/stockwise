# Stockwise V1.0 Design Direction

## UI identity

Stockwise is an Obsidian-inspired Investor Knowledge Vault for beginner investors.

It is not a generic SaaS dashboard, trading app, card-grid FAQ app, hero-search landing page, or chatbot UI. It is a source-first investor knowledge vault where users read official knowledge, save their understanding, and connect related concepts.

## Visual system

The V1.0 visual system is **Tactile Ledger**:

- paper-like reading surfaces
- thin ledger dividers
- compact source stamps
- document-first composition
- restrained, editorial typography
- calm muted green actions
- no neon, glow, market ticker, chart, candlestick, or profit-loss color language

## Core layout

The main product structure is a three-pane knowledge workspace:

1. **Left pane:** Vault navigation
2. **Center pane:** Source document or understanding note
3. **Right pane:** Understanding context inspector

The main structure must not become a card-grid dashboard or hero search layout.

## Product and workspace naming

`Stockwise` is the fixed product name.

The vault/workspace name is user-defined and displayed separately from the product name. The default workspace name is:

`投資理解のVault`

Do not use "The Vault" as a fixed product name.

## Themes

V1.0 supports two themes through semantic CSS custom properties on `html[data-theme]`:

- `paper-light`: cream / ivory, paper-like, editorial, readable, not pure white
- `vault-dark`: Obsidian-inspired charcoal / deep ink, calm, focused, not pure black, no neon

Components should use semantic tokens rather than hardcoded final colors.

## Core note structure

Every saved understanding note is built from three layers:

1. `公式知識`
2. `自分の理解`
3. `つながる知識`

## Core UI primitives

- `VaultLayout`: fixed three-pane workspace shell
- `NavigationPane`: Stockwise, workspace name, primary navigation, knowledge areas
- `DocumentPane`: central source document or understanding note reading surface
- `ContextInspector`: right-side related understanding, sources, linked knowledge, and note ask context
- `SourceStamp`: archival source stamp replacing generic source chips in the final UI
- `LedgerEntry`: compact metadata row for note/source provenance
- `UnderstandingBlock`: three-layer understanding note block
- `LinkedKnowledgeSection`: related concepts or notes as linked rows
- `AskThisNotePanel`: non-chat note question panel grounded only in saved official knowledge and notes

## Explicit exclusions

Do not introduce:

- generic SaaS dashboards
- hero search layouts
- card-grid dashboards as the main structure
- chat bubbles
- trading dashboards
- stock charts
- candlestick charts
- market tickers
- red/green profit-loss UI
- pastel purple AI styling
- real AI API calls
- production backend, auth, vector DB, or semantic search
