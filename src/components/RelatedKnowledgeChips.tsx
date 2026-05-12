import type { FAQ } from '../types'

type RelatedKnowledgeChipsProps = {
  relatedFaqs: FAQ[]
  onSelect?: (faq: FAQ) => void
}

export function RelatedKnowledgeChips({
  relatedFaqs,
  onSelect,
}: RelatedKnowledgeChipsProps) {
  if (relatedFaqs.length === 0) {
    return null
  }

  return (
    <section aria-label="つながる知識">
      <p
        style={{
          color: '#315f46',
          fontSize: '13px',
          fontWeight: 800,
          margin: '0 0 10px',
        }}
      >
        つながる知識
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {relatedFaqs.map((faq) => (
          <button
            key={faq.id}
            type="button"
            onClick={() => onSelect?.(faq)}
            style={{
              border: '1px solid #cfd8ca',
              borderRadius: '999px',
              background: '#f7f3ea',
              color: '#315f46',
              cursor: onSelect ? 'pointer' : 'default',
              fontWeight: 700,
              padding: '8px 11px',
            }}
          >
            {faq.title}
          </button>
        ))}
      </div>
    </section>
  )
}
