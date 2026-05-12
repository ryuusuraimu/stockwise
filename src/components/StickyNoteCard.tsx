import type { FAQBlock, SourceReference, UserNote } from '../types'

import { SourceChip } from './SourceChip'

type StickyNoteCardProps = {
  note: UserNote
  sourceBlock?: FAQBlock
  sources?: SourceReference[]
  onRemove?: (noteId: string) => void
}

export function StickyNoteCard({
  note,
  sourceBlock,
  sources = [],
  onRemove,
}: StickyNoteCardProps) {
  return (
    <article
      style={{
        border: '1px solid #ead9aa',
        borderRadius: '8px',
        background: '#fff8df',
        boxShadow: '0 10px 18px rgba(75, 57, 18, 0.08)',
        color: '#232925',
        padding: '16px',
      }}
    >
      <p
        style={{
          color: '#7a5b18',
          fontSize: '12px',
          fontWeight: 800,
          margin: '0 0 8px',
        }}
      >
        理解ノート
      </p>
      <h3 style={{ fontSize: '16px', lineHeight: 1.5, margin: '0 0 8px' }}>
        {note.title}
      </h3>
      <p style={{ lineHeight: 1.8, margin: '0 0 10px' }}>{note.excerpt}</p>
      {note.memo ? (
        <p style={{ color: '#5f594d', lineHeight: 1.7, margin: '0 0 10px' }}>
          {note.memo}
        </p>
      ) : null}
      {sourceBlock ? (
        <p style={{ color: '#315f46', fontSize: '12px', margin: '0 0 12px' }}>
          参照ブロック: {sourceBlock.label}
        </p>
      ) : null}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {sources.map((source) => (
          <SourceChip key={source.id} source={source} />
        ))}
      </div>

      {onRemove ? (
        <button
          type="button"
          onClick={() => onRemove(note.id)}
          style={{
            border: '1px solid #d8c999',
            borderRadius: '8px',
            background: '#fffdf8',
            color: '#5f4c20',
            cursor: 'pointer',
            marginTop: '14px',
            padding: '8px 10px',
          }}
        >
          ノートから外す
        </button>
      ) : null}
    </article>
  )
}
