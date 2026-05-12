import { useMemo, useState } from 'react'

import { AskLockedPanel } from '../components/AskLockedPanel'
import { FAQBlockCard } from '../components/FAQBlockCard'
import { FAQCard } from '../components/FAQCard'
import { NoteCreationModal } from '../components/NoteCreationModal'
import { RelatedKnowledgeChips } from '../components/RelatedKnowledgeChips'
import { SearchBar } from '../components/SearchBar'
import { SourceChip } from '../components/SourceChip'
import { StickyNoteCard } from '../components/StickyNoteCard'
import { faqs } from '../data/faqs'
import { mockNotesAskUnlocked } from '../fixtures/mockNotes'
import { generateAiDraft } from '../utils/aiMocks'

const pageStyle = {
  background: '#f7f3ea',
  color: '#232925',
  minHeight: '100vh',
  padding: '32px',
} satisfies React.CSSProperties

const sectionStyle = {
  display: 'grid',
  gap: '16px',
  marginBottom: '32px',
} satisfies React.CSSProperties

const sectionTitleStyle = {
  fontSize: '18px',
  lineHeight: 1.5,
  margin: 0,
} satisfies React.CSSProperties

const gridStyle = {
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
} satisfies React.CSSProperties

export function ComponentHarness() {
  const [query, setQuery] = useState('PER')

  const primaryFaq = faqs[0]
  const relatedFaqs = useMemo(
    () => faqs.filter((faq) => primaryFaq.relatedFaqIds.includes(faq.id)),
    [primaryFaq.relatedFaqIds],
  )
  const stickyNote = mockNotesAskUnlocked[0]
  const stickyNoteFaq = faqs.find((faq) => faq.id === stickyNote.faqId)
  const stickyNoteBlock = stickyNoteFaq?.blocks.find(
    (block) => block.id === stickyNote.sourceBlockId,
  )
  const stickyNoteSources =
    stickyNoteFaq?.sourceReferences.filter((source) =>
      stickyNote.sourceReferenceIds.includes(source.id),
    ) ?? []

  return (
    <main style={pageStyle}>
      <header style={{ marginBottom: '32px', maxWidth: '760px' }}>
        <p
          style={{
            color: '#315f46',
            fontSize: '13px',
            fontWeight: 800,
            margin: '0 0 8px',
          }}
        >
          Stockwise Component Harness
        </p>
        <h1 style={{ fontSize: '28px', lineHeight: 1.35, margin: 0 }}>
          Editorial Investor Notebook UI
        </h1>
      </header>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>SearchBar</h2>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>FAQCard</h2>
        <FAQCard faq={primaryFaq} />
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>FAQBlockCard</h2>
        <div style={gridStyle}>
          {primaryFaq.blocks.map((block) => (
            <FAQBlockCard
              key={block.id}
              block={block}
              sources={primaryFaq.sourceReferences.filter((source) =>
                block.sourceReferenceIds.includes(source.id),
              )}
            />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>StickyNoteCard</h2>
        <StickyNoteCard
          note={stickyNote}
          sourceBlock={stickyNoteBlock}
          sources={stickyNoteSources}
        />
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>SourceChip</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {primaryFaq.sourceReferences.map((source) => (
            <SourceChip key={source.id} source={source} />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>RelatedKnowledgeChips</h2>
        <RelatedKnowledgeChips relatedFaqs={relatedFaqs} />
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>AskLockedPanel</h2>
        <div style={gridStyle}>
          <AskLockedPanel savedNoteCount={0} />
          <AskLockedPanel savedNoteCount={1} />
          <AskLockedPanel savedNoteCount={2} />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>NoteCreationModal</h2>
        <div
          style={{
            border: '1px solid #e4ded2',
            borderRadius: '8px',
            background: '#fffdf8',
            minHeight: '420px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <NoteCreationModal
            isOpen
            previewMode
            faq={primaryFaq}
            block={primaryFaq.blocks[0]}
            initialDraft={generateAiDraft(primaryFaq.blocks[0])}
            onClose={() => undefined}
            onSave={() => undefined}
          />
        </div>
      </section>
    </main>
  )
}
