# Stockwise Product Brief

## Product Summary

Stockwise is a beginner-friendly Investor Knowledge Vault.

It helps beginner investors read official investment knowledge, save the parts they understand as their own understanding notes, connect related concepts, and later ask those saved notes in a source-grounded way.

## Target User

Stockwise is for people who are starting to learn stock investing and feel overwhelmed by unfamiliar terms such as NISA, index funds, PER, PBR, dividends, risk, and long-term investing.

## Core Problem

Beginners do not only lack information. They often do not know which explanations to trust, what concepts to understand first, or how to turn official knowledge into something they can revisit later.

## Value Proposition

Stockwise gives beginners a calm, source-first workspace for building an investment knowledge vault. It turns official investing knowledge into short saved understanding notes, keeps the original source visible, and helps users find connected ideas without drifting into advice or trading behavior.

## MVP Scope

- Local Investor Knowledge Vault harness
- Official knowledge blocks from mock FAQ data
- Beginner-friendly reading states
- Understanding notes saved locally
- Three-layer note structure: 公式知識, 自分の理解, つながる知識
- Related source and linked knowledge sections
- Source stamps and provenance metadata
- Ask This Note mock helper grounded only in saved official knowledge and understanding notes
- Paper Light and Vault Dark visual validation
- Mock data, fixture, and type validation

## Future Scope

- Synonym-aware search
- Learning paths
- Stronger source-quality checks
- Better note review states
- Stronger tests
- Better mock AI safety checks

## Success Criteria

- Beginners can read official investing concepts without feeling lost.
- Users can save concepts as short understanding notes they can revisit.
- Saved notes keep official source context visible.
- Users can discover related concepts from their own vault context.
- Ask This Note answers stay grounded in saved official knowledge and understanding notes.
- The product avoids financial advice and recommendation behavior.

## Product Principles

- Beginner-first clarity
- Educational, not advisory
- Small steps over dense explanations
- Source-first understanding
- Personal notes over generic chat
- Trust through careful wording
- Simple implementation over clever complexity

## Ask This Note Boundary

Ask This Note is not generic AI chat. It is a note-specific helper that may only answer from saved official knowledge blocks and the user's saved understanding notes. It should not answer from open-ended model knowledge, provide personalized financial advice, recommend securities, predict prices, or manage portfolios.

See `docs/non-goals.md` for boundaries that keep the MVP focused.
