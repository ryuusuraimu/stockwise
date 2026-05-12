type AskLockedPanelProps = {
  savedNoteCount: number
  requiredNoteCount?: number
}

export function AskLockedPanel({
  savedNoteCount,
  requiredNoteCount = 3,
}: AskLockedPanelProps) {
  const remainingCount = Math.max(requiredNoteCount - savedNoteCount, 0)

  return (
    <aside
      style={{
        border: '1px solid #ead9aa',
        borderRadius: '8px',
        background: '#fff8df',
        color: '#232925',
        padding: '18px',
      }}
    >
      <p
        style={{
          color: '#7a5b18',
          fontSize: '13px',
          fontWeight: 800,
          margin: '0 0 8px',
        }}
      >
        ノートに聞く
      </p>
      <h3 style={{ fontSize: '18px', lineHeight: 1.5, margin: '0 0 8px' }}>
        理解ノートをあと{remainingCount}件追加すると使えます
      </h3>
      <p style={{ color: '#5f594d', lineHeight: 1.8, margin: 0 }}>
        保存したノートが{requiredNoteCount}
        件になると、参照元つきで学びを振り返る状態を確認できます。
      </p>
    </aside>
  )
}
