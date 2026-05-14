import { ThemeToggle } from '../components/ThemeToggle'
import { WorkspaceName } from '../components/WorkspaceName'

export type VaultSection = 'home' | 'notes' | 'library' | 'ask'

const primaryNavigation: Array<{
  id: VaultSection
  label: string
}> = [
  { id: 'home', label: 'ホーム' },
  { id: 'notes', label: '理解ノート' },
  { id: 'library', label: 'ライブラリ' },
  { id: 'ask', label: 'ノートに聞く' },
]
const knowledgeAreas = ['指標', 'NISA・税金', 'リスク管理', '投資スタイル']

type NavigationPaneProps = {
  activeSection?: VaultSection
  onSelectSection?: (section: VaultSection) => void
}

export function NavigationPane({
  activeSection = 'notes',
  onSelectSection,
}: NavigationPaneProps) {
  return (
    <aside className="vault-nav">
      <div className="vault-brand">
        <p className="vault-product">Stockwise</p>
        <WorkspaceName />
      </div>

      <nav aria-label="Vault navigation" className="vault-nav-section">
        <p className="vault-nav-heading">Navigation</p>
        {primaryNavigation.map((item) => (
          <button
            aria-current={activeSection === item.id ? 'page' : undefined}
            className={`vault-nav-item ${
              activeSection === item.id ? 'is-active' : ''
            }`}
            key={item.id}
            type="button"
            onClick={() => onSelectSection?.(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <nav aria-label="Knowledge areas" className="vault-nav-section">
        <p className="vault-nav-heading">Knowledge Areas</p>
        {knowledgeAreas.map((item) => (
          <span className="vault-nav-item" key={item}>
            {item}
          </span>
        ))}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <ThemeToggle />
      </div>
    </aside>
  )
}
