import type { SourceReference } from '../types'

type SourceChipProps = {
  source: SourceReference
}

export function SourceChip({ source }: SourceChipProps) {
  return (
    <a
      href={source.url}
      rel="noreferrer"
      target="_blank"
      title={source.note ?? source.title}
      style={{
        alignItems: 'center',
        border: '1px solid #d8d0c2',
        borderRadius: '999px',
        color: '#315f46',
        display: 'inline-flex',
        fontSize: '12px',
        fontWeight: 700,
        maxWidth: '100%',
        padding: '5px 9px',
        textDecoration: 'none',
      }}
    >
      参照元: {source.publisher}
    </a>
  )
}
