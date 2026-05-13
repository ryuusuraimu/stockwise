import { AskThisNotePanel } from '../components/AskThisNotePanel'
import {
  LinkedKnowledgeSection,
  type LinkedKnowledgeItem,
} from '../components/LinkedKnowledgeSection'
import { SourceStamp } from '../components/SourceStamp'

type ContextInspectorProps = {
  linkedKnowledge: LinkedKnowledgeItem[]
  relatedUnderstandings: LinkedKnowledgeItem[]
  sources: Array<{
    blockLabel?: string
    id: string
    title: string
  }>
}

export function ContextInspector({
  linkedKnowledge,
  relatedUnderstandings,
  sources,
}: ContextInspectorProps) {
  return (
    <aside className="vault-inspector">
      <h2 className="vault-inspector-title">理解コンテキスト</h2>

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
