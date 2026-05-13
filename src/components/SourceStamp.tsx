type SourceStampProps = {
  blockLabel?: string
  sourceTitle: string
}

export function SourceStamp({ blockLabel, sourceTitle }: SourceStampProps) {
  return (
    <span className="source-stamp">
      <span className="source-stamp-label">参照元:</span>
      <span>{sourceTitle}</span>
      {blockLabel ? <span>/ {blockLabel}</span> : null}
    </span>
  )
}
