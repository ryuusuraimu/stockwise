import { ContextInspector } from './ContextInspector'
import { DocumentPane } from './DocumentPane'
import { NavigationPane } from './NavigationPane'

type VaultLayoutProps = {
  context: React.ComponentProps<typeof ContextInspector>
  document: React.ComponentProps<typeof DocumentPane>
  navigation?: React.ComponentProps<typeof NavigationPane>
}

export function VaultLayout({ context, document, navigation }: VaultLayoutProps) {
  return (
    <div className="vault-layout">
      <NavigationPane {...navigation} />
      <DocumentPane {...document} />
      <ContextInspector {...context} />
    </div>
  )
}
