type DocumentPaneProps = {
  children: React.ReactNode
  kicker: string
  subtitle: string
  title: string
}

export function DocumentPane({
  children,
  kicker,
  subtitle,
  title,
}: DocumentPaneProps) {
  return (
    <main className="vault-document-pane">
      <article className="vault-document">
        <header>
          <p className="vault-document-kicker">{kicker}</p>
          <h1 className="vault-document-title">{title}</h1>
          <p className="vault-document-subtitle">{subtitle}</p>
        </header>
        {children}
      </article>
    </main>
  )
}
