import { AskThisNotePanel } from '../components/AskThisNotePanel'
import {
  LinkedKnowledgeSection,
  type LinkedKnowledgeItem,
} from '../components/LinkedKnowledgeSection'
import { SourceStamp } from '../components/SourceStamp'

type ContextInspectorProps = {
  linkedKnowledge: LinkedKnowledgeItem[]
  overview?: {
    concepts: Array<{
      label: string
      value: string
    }>
    reviewSuggestion: string
    stats: Array<{
      label: string
      value: string
    }>
  }
  relatedUnderstandings: LinkedKnowledgeItem[]
  sources: Array<{
    blockLabel?: string
    id: string
    title: string
  }>
}

export function ContextInspector({
  linkedKnowledge,
  overview,
  relatedUnderstandings,
  sources,
}: ContextInspectorProps) {
  return (
    <aside className="vault-inspector">
      <h2 className="vault-inspector-title">理解コンテキスト</h2>

      {overview ? (
        <>
          <section className="vault-inspector-section">
            <h3 className="vault-inspector-heading">Vault Status</h3>
            <div className="vault-status-grid">
              {overview.stats.map((stat) => (
                <div className="vault-status-item" key={stat.label}>
                  <span className="vault-status-label">{stat.label}</span>
                  <span className="vault-status-value">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="vault-inspector-section">
            <h3 className="vault-inspector-heading">つながる知識</h3>
            <div className="vault-concept-summary">
              {overview.concepts.map((concept) => (
                <div className="vault-concept-chip" key={concept.label}>
                  <span>{concept.label}</span>
                  <strong>{concept.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="vault-inspector-section">
            <h3 className="vault-inspector-heading">Weekly Review Suggested</h3>
            <p className="vault-review-callout">{overview.reviewSuggestion}</p>
          </section>
        </>
      ) : null}

      <section className="vault-inspector-section">
        <h3 className="vault-inspector-heading">関連する理解</h3>
        <LinkedKnowledgeSection items={relatedUnderstandings} />
      </section>

      <section className="vault-inspector-section">
        <h3 className="vault-inspector-heading">参照元</h3>
        {sources.map((source) => (
          <SourceStamp
            blockLabel={source.blockLabel}
            key={source.id}
            sourceTitle={source.title}
          />
        ))}
      </section>

      <section className="vault-inspector-section">
        <h3 className="vault-inspector-heading">つながる知識</h3>
        <LinkedKnowledgeSection items={linkedKnowledge} />
      </section>

      <section className="vault-inspector-section">
        <h3 className="vault-inspector-heading">このノートに聞く</h3>
        <AskThisNotePanel />
      </section>
    </aside>
  )
}
