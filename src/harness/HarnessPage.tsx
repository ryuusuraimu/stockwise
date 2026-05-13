import { useState } from 'react'
import type { CSSProperties } from 'react'

import { DocumentStatesHarness } from './DocumentStatesHarness'
import { FinalUiHarness } from './FinalUiHarness'
import { InteractionFlowHarness } from './InteractionFlowHarness'
import { LayoutPrimitivesHarness } from './LayoutPrimitivesHarness'
import { LegacyComponentsHarness } from './LegacyComponentsHarness'

type HarnessTab =
  | 'finalUi'
  | 'layoutPrimitives'
  | 'documentStates'
  | 'interactionFlow'
  | 'legacyComponents'

const tabs: Array<{ id: HarnessTab; label: string }> = [
  { id: 'finalUi', label: 'Final UI' },
  { id: 'layoutPrimitives', label: 'Layout Primitives' },
  { id: 'documentStates', label: 'Document States' },
  { id: 'interactionFlow', label: 'Interaction Flow' },
  { id: 'legacyComponents', label: 'Legacy / Supporting Components' },
]

const pageStyle: CSSProperties = {
  background: 'var(--bg-app)',
  color: 'var(--text-primary)',
  minHeight: '100vh',
}

const headerStyle: CSSProperties = {
  background: 'var(--bg-panel)',
  borderBottom: '1px solid var(--border-subtle)',
  display: 'grid',
  gap: '18px',
  padding: '24px 32px',
  position: 'sticky',
  top: 0,
  zIndex: 10,
}

const tabListStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
}

const getTabButtonStyle = (isActive: boolean): CSSProperties => ({
  background: isActive ? 'var(--accent-soft)' : 'transparent',
  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-subtle)'}`,
  borderRadius: '3px',
  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
  cursor: 'pointer',
  fontWeight: 800,
  padding: '10px 14px',
})

export function HarnessPage() {
  const [activeTab, setActiveTab] = useState<HarnessTab>('finalUi')

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <p
            style={{
              color: 'var(--accent)',
              fontSize: '13px',
              fontWeight: 800,
              margin: '0 0 8px',
            }}
          >
            Stockwise Harness
          </p>
          <h1 style={{ fontSize: '28px', lineHeight: 1.35, margin: 0 }}>
            Investor Knowledge Vault validation
          </h1>
        </div>

        <nav aria-label="Harness sections" style={tabListStyle}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={getTabButtonStyle(activeTab === tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {activeTab === 'finalUi' ? <FinalUiHarness /> : null}
      {activeTab === 'layoutPrimitives' ? <LayoutPrimitivesHarness /> : null}
      {activeTab === 'documentStates' ? <DocumentStatesHarness /> : null}
      {activeTab === 'interactionFlow' ? <InteractionFlowHarness /> : null}
      {activeTab === 'legacyComponents' ? <LegacyComponentsHarness /> : null}
    </div>
  )
}

export default HarnessPage
