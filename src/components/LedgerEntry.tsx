type LedgerEntryProps = {
  entryId: string
  source: string
  type: string
  updatedAt: string
}

export function LedgerEntry({
  entryId,
  source,
  type,
  updatedAt,
}: LedgerEntryProps) {
  const fields = [
    { label: 'ENTRY ID', value: entryId },
    { label: 'TYPE', value: type },
    { label: 'UPDATED', value: updatedAt },
    { label: 'SOURCE', value: source },
  ]

  return (
    <dl className="ledger-entry">
      {fields.map((field) => (
        <div className="ledger-field" key={field.label}>
          <dt className="ledger-label">{field.label}</dt>
          <dd className="ledger-value">{field.value}</dd>
        </div>
      ))}
    </dl>
  )
}
