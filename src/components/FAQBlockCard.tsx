import type { FAQBlock, SourceReference } from '../types'

import { SourceChip } from './SourceChip'

type FAQBlockCardProps = {
  block: FAQBlock
  sources: SourceReference[]
  onAddNote?: (block: FAQBlock) => void
}

export function FAQBlockCard({
  block,
  sources,
  onAddNote,
}: FAQBlockCardProps) {
  return (
    <section
      style={{
        border: '1px solid #e4ded2',
        borderRadius: '8px',
        background: '#fffdf8',
        color: '#232925',
        padding: '18px',
      }}
    >
      <p
        style={{
          color: '#315f46',
          fontSize: '13px',
          fontWeight: 800,
          margin: '0 0 8px',
        }}
      >
        {block.label}
      </p>
      <p style={{ lineHeight: 1.9, margin: 0 }}>{block.body}</p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '14px',
        }}
      >
        {sources.map((source) => (
          <SourceChip key={source.id} source={source} />
        ))}
      </div>

      {onAddNote ? (
        <button
          type="button"
          onClick={() => onAddNote(block)}
          style={{
            border: 'none',
            borderRadius: '8px',
            background: '#315f46',
            color: '#fffdf8',
            cursor: 'pointer',
            fontWeight: 700,
            marginTop: '16px',
            padding: '10px 14px',
          }}
        >
          ＋ 理解ノートに追加
        </button>
      ) : null}
    </section>
  )
}
