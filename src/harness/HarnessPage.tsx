import { useState } from 'react'
import type { CSSProperties } from 'react'

import { FAQBlockCard } from '../components/FAQBlockCard'
import { FAQCard } from '../components/FAQCard'
import { RelatedKnowledgeChips } from '../components/RelatedKnowledgeChips'
import { SearchBar } from '../components/SearchBar'
import { StickyNoteCard } from '../components/StickyNoteCard'
import { faqs } from '../data/faqs'
import { mockNotesOne } from '../fixtures/mockNotes'
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
  const [query, setQuery] = useState('PER')
  const perFaq = faqs.find((faq) => faq.id === 'faq-per') ?? faqs[0]
  const summaryBlock =
    perFaq.blocks.find((block) => block.id === 'faq-per-summary') ??
    perFaq.blocks[0]
  const note = mockNotesOne[0]
  const relatedKnowledge = ['faq-eps', 'faq-pbr', 'faq-roe']
    .map((faqId) => faqs.find((faq) => faq.id === faqId))
    .filter((faq) => faq !== undefined)
  const sourceBlock = perFaq.blocks.find(
    (block) => block.id === note.sourceBlockId,
  )
  const noteSources = perFaq.sourceReferences.filter((source) =>
    note.sourceReferenceIds.includes(source.id),
  )

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
      <header style={{ maxWidth: '760px' }}>
        <p
          style={{
            color: '#315f46',
            fontSize: '13px',
            fontWeight: 800,
            margin: '0 0 8px',
          }}
        >
          Flows
        </p>
        <h2 style={{ fontSize: '26px', lineHeight: 1.35, margin: 0 }}>
          Search → Find → Save → Internalize → Revisit
        </h2>
      </header>

      <section
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <article
          style={{
            background: '#fffdf8',
            border: '1px solid #e4ded2',
            borderRadius: '8px',
            display: 'grid',
            gap: '12px',
            padding: '18px',
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
            検索する
          </p>
          <SearchBar value={query} onChange={setQuery} />
        </article>

        <article style={{ display: 'grid', gap: '12px' }}>
          <p
            style={{
              color: '#315f46',
              fontSize: '13px',
              fontWeight: 800,
              margin: 0,
            }}
          >
            見つける
          </p>
          <FAQCard faq={perFaq} />
        </article>

        <article style={{ display: 'grid', gap: '12px' }}>
          <p
            style={{
              color: '#315f46',
              fontSize: '13px',
              fontWeight: 800,
              margin: 0,
            }}
          >
            読む
          </p>
          <FAQBlockCard
            block={summaryBlock}
            sources={perFaq.sourceReferences.filter((source) =>
              summaryBlock.sourceReferenceIds.includes(source.id),
            )}
          />
        </article>

        <article
          style={{
            background: '#fffdf8',
            border: '1px solid #e4ded2',
            borderRadius: '8px',
            display: 'grid',
            gap: '12px',
            padding: '18px',
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
            理解ノートに追加
          </p>
          <p style={{ color: '#60685f', lineHeight: 1.8, margin: 0 }}>
            公式知識ブロックから、短い理解メモの下書きを作ります。
          </p>
          <button
            type="button"
            style={{
              border: 'none',
              borderRadius: '8px',
              background: '#315f46',
              color: '#fffdf8',
              cursor: 'default',
              fontWeight: 800,
              justifySelf: 'start',
              padding: '10px 14px',
            }}
          >
            ＋ 理解ノートに追加
          </button>
        </article>

        <article style={{ display: 'grid', gap: '12px' }}>
          <p
            style={{
              color: '#315f46',
              fontSize: '13px',
              fontWeight: 800,
              margin: 0,
            }}
          >
            自分の理解にする
          </p>
          <StickyNoteCard
            note={note}
            sourceBlock={sourceBlock}
            sources={noteSources}
          />
        </article>

        <article
          style={{
            background: '#fffdf8',
            border: '1px solid #e4ded2',
            borderRadius: '8px',
            display: 'grid',
            gap: '12px',
            padding: '18px',
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
            つながる知識を見る
          </p>
          <RelatedKnowledgeChips relatedFaqs={relatedKnowledge} />
        </article>
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
