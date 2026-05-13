import { ThemeToggle } from '../components/ThemeToggle'
import { WorkspaceName } from '../components/WorkspaceName'

const primaryNavigation = ['ホーム', '理解ノート', 'ライブラリ', 'ノートに聞く']
const knowledgeAreas = ['指標', 'NISA・税金', 'リスク管理', '投資スタイル']

export function NavigationPane() {
  return (
    <aside className="vault-nav">
      <div className="vault-brand">
        <p className="vault-product">Stockwise</p>
        <WorkspaceName />
      </div>

      <nav aria-label="Vault navigation" className="vault-nav-section">
        <p className="vault-nav-heading">Navigation</p>
        {primaryNavigation.map((item) => (
          <span
            className={`vault-nav-item ${item === '理解ノート' ? 'is-active' : ''}`}
            key={item}
          >
            {item}
          </span>
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
