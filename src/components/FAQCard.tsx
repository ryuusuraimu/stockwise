import type { FAQ } from '../types'

import { SourceChip } from './SourceChip'

type FAQCardProps = {
  faq: FAQ
  onSelect?: (faq: FAQ) => void
}

const getSummary = (faq: FAQ) => {
  return faq.blocks.find((block) => block.id.endsWith('-summary'))?.body
}

export function FAQCard({ faq, onSelect }: FAQCardProps) {
  return (
    <article
      className="faqCard"
      style={{
        border: '1px solid #e4ded2',
        borderRadius: '8px',
        background: '#fffdf8',
        boxShadow: '0 10px 24px rgba(49, 39, 24, 0.06)',
        color: '#232925',
        padding: '20px',
      }}
    >
      <p
        className="term"
        style={{
          color: '#315f46',
          fontSize: '13px',
          fontWeight: 700,
          margin: '0 0 8px',
        }}
      >
        {faq.category}
      </p>
      <h2 style={{ fontSize: '20px', lineHeight: 1.4, margin: '0 0 10px' }}>
        {faq.title}
      </h2>
      <p style={{ lineHeight: 1.8, margin: '0 0 16px' }}>
        {getSummary(faq) ?? faq.question}
      </p>

      <div
        className="tags"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
      >
        {faq.tags.map((tag) => (
          <span
            key={tag}
            style={{
              border: '1px solid #d8d0c2',
              borderRadius: '999px',
              color: '#4f574f',
              fontSize: '12px',
              padding: '5px 9px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {faq.sourceReferences.length > 0 ? (
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          {faq.sourceReferences.slice(0, 2).map((source) => (
            <SourceChip key={source.id} source={source} />
          ))}
        </div>
      ) : null}

      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(faq)}
          style={{
            border: 'none',
            borderRadius: '8px',
            background: '#315f46',
            color: '#fffdf8',
            cursor: 'pointer',
            fontWeight: 700,
            marginTop: '18px',
            padding: '10px 14px',
          }}
        >
          詳しく読む
        </button>
      ) : null}
    </article>
  )
}
