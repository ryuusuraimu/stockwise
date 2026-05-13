import { ContextInspector } from './ContextInspector'
import { DocumentPane } from './DocumentPane'
import { NavigationPane } from './NavigationPane'

type VaultLayoutProps = {
  context: React.ComponentProps<typeof ContextInspector>
  document: React.ComponentProps<typeof DocumentPane>
}

export function VaultLayout({ context, document }: VaultLayoutProps) {
  return (
    <div className="vault-layout">
      <NavigationPane />
      <DocumentPane {...document} />
      <ContextInspector {...context} />
    </div>
  )
}
