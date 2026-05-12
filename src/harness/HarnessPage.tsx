import { useState } from 'react'
import type { CSSProperties } from 'react'

import { ComponentHarness } from './ComponentHarness'
import { ScreenStateHarness } from './ScreenStateHarness'

type HarnessTab = 'components' | 'screenStates' | 'flows'

const tabs: Array<{ id: HarnessTab; label: string }> = [
  { id: 'components', label: 'Components' },
  { id: 'screenStates', label: 'Screen States' },
  { id: 'flows', label: 'Flows' },
]

const pageStyle: CSSProperties = {
  background: '#f7f3ea',
  color: '#232925',
  minHeight: '100vh',
}

const headerStyle: CSSProperties = {
  background: '#fffdf8',
  borderBottom: '1px solid #e4ded2',
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
  background: isActive ? '#315f46' : '#fffdf8',
  border: `1px solid ${isActive ? '#315f46' : '#d8d0c2'}`,
  borderRadius: '8px',
  color: isActive ? '#fffdf8' : '#315f46',
  cursor: 'pointer',
  fontWeight: 800,
  padding: '10px 14px',
})

function FlowHarness() {
  return (
    <main
      style={{
        background: '#f7f3ea',
        color: '#232925',
        display: 'grid',
        gap: '16px',
        minHeight: '100vh',
        padding: '32px',
      }}
    >
      <section
        style={{
          background: '#fffdf8',
          border: '1px solid #e4ded2',
          borderRadius: '8px',
          display: 'grid',
          gap: '14px',
          padding: '20px',
        }}
      >
        <p
          style={{
            color: '#315f46',
            fontSize: '13px',
            fontWeight: 800,
            margin: 0,
          }}
        >
          Flows
        </p>
        <h2 style={{ fontSize: '22px', lineHeight: 1.4, margin: 0 }}>
          Search → FAQ → understanding → related concepts → save/revisit
        </h2>
        <p style={{ color: '#60685f', lineHeight: 1.8, margin: 0 }}>
          このタブはフロー検証用の入口です。現時点では本番画面やルーティングを追加せず、
          Components と Screen States のハーネスを組み合わせて確認します。
        </p>
      </section>
    </main>
  )
}

export function HarnessPage() {
  const [activeTab, setActiveTab] = useState<HarnessTab>('components')

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <p
            style={{
              color: '#315f46',
              fontSize: '13px',
              fontWeight: 800,
              margin: '0 0 8px',
            }}
          >
            Stockwise Harness
          </p>
          <h1 style={{ fontSize: '28px', lineHeight: 1.35, margin: 0 }}>
            Editorial Investor Notebook validation
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

      {activeTab === 'components' ? <ComponentHarness /> : null}
      {activeTab === 'screenStates' ? <ScreenStateHarness /> : null}
      {activeTab === 'flows' ? <FlowHarness /> : null}
    </div>
  )
}

export default HarnessPage
