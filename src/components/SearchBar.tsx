import type { FormEvent } from 'react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'PER、NISA、分散投資などを検索',
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '10px',
        width: '100%',
        padding: '10px',
        border: '1px solid #e2ddd2',
        borderRadius: '8px',
        background: '#fffdf8',
      }}
    >
      <input
        aria-label="FAQを検索"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: '#232925',
          fontSize: '15px',
        }}
        type="search"
      />
      <button
        type="submit"
        style={{
          border: 'none',
          borderRadius: '8px',
          background: '#315f46',
          color: '#fffdf8',
          cursor: 'pointer',
          fontWeight: 700,
          padding: '10px 14px',
        }}
      >
        検索
      </button>
    </form>
  )
}
