import { useState } from 'react'
import type { CSSProperties } from 'react'

import { AskLockedPanel } from '../components/AskLockedPanel'
import { FAQBlockCard } from '../components/FAQBlockCard'
import { FAQCard } from '../components/FAQCard'
import { RelatedKnowledgeChips } from '../components/RelatedKnowledgeChips'
import { SearchBar } from '../components/SearchBar'
import { SourceChip } from '../components/SourceChip'
import { StickyNoteCard } from '../components/StickyNoteCard'
import { faqs } from '../data/faqs'
import { mockAiAnswers } from '../fixtures/mockAiAnswers'
import {
  mockNotesAskUnlocked,
  mockNotesEmpty,
  mockNotesOne,
  mockNotesTwo,
  type MockUserNote,
} from '../fixtures/mockNotes'
import type { AIAnswer, UserNote } from '../types'
import { searchFaqs } from '../utils/searchFaqs'

const pageStyle: CSSProperties = {
  background: '#f7f3ea',
  color: '#232925',
  display: 'grid',
  gap: '28px',
  minHeight: '100vh',
  padding: '32px',
}

const frameStyle: CSSProperties = {
  border: '1px solid #e4ded2',
  borderRadius: '8px',
  background: '#fbf7ef',
  display: 'grid',
  gap: '18px',
  padding: '20px',
}

const surfaceStyle: CSSProperties = {
  border: '1px solid #e4ded2',
  borderRadius: '8px',
  background: '#fffdf8',
  padding: '18px',
}

const sidebarStyle: CSSProperties = {
  borderRight: '1px solid #e4ded2',
  display: 'grid',
  gap: '10px',
  paddingRight: '18px',
}

const shellStyle: CSSProperties = {
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: '160px minmax(0, 1fr)',
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: '14px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
}

const sectionTitleStyle: CSSProperties = {
  fontSize: '20px',
  lineHeight: 1.4,
  margin: 0,
}

const mutedTextStyle: CSSProperties = {
  color: '#60685f',
  lineHeight: 1.8,
  margin: 0,
}

const navItems = ['ホーム', '理解ノート', 'ライブラリ', 'ノートに聞く']

const getPerFaq = () => faqs.find((faq) => faq.id === 'faq-per') ?? faqs[0]

const getNoteFaq = (note: UserNote) => {
  return faqs.find((faq) => faq.id === note.faqId)
}

const getNoteBlock = (note: UserNote) => {
  return getNoteFaq(note)?.blocks.find(
    (block) => block.id === note.sourceBlockId,
  )
}

const getNoteSources = (note: UserNote) => {
  return (
    getNoteFaq(note)?.sourceReferences.filter((source) =>
      note.sourceReferenceIds.includes(source.id),
    ) ?? []
  )
}

function GroupHeading({ label }: { label: string }) {
  return (
    <p
      style={{
        borderBottom: '1px solid #e4ded2',
        color: '#315f46',
        fontSize: '13px',
        fontWeight: 800,
        margin: '8px 0 -4px',
        paddingBottom: '8px',
      }}
    >
      {label}
    </p>
  )
}

function HarnessFrame({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section style={frameStyle}>
      <h2 style={sectionTitleStyle}>{title}</h2>
      {children}
    </section>
  )
}

function Sidebar() {
  return (
    <aside style={sidebarStyle}>
      {navItems.map((item) => (
        <span
          key={item}
          style={{
            borderRadius: '8px',
            color: item === 'ホーム' ? '#315f46' : '#60685f',
            fontWeight: item === 'ホーム' ? 800 : 600,
            padding: '8px 10px',
          }}
        >
          {item}
        </span>
      ))}
    </aside>
  )
}

function HomeStatePreview({
  title,
  notes,
}: {
  title: string
  notes: MockUserNote[]
}) {
  const [query, setQuery] = useState('PER')
  const searchedFaqs = searchFaqs(query, faqs).slice(0, 3)
  const isAskUnlocked = notes.length >= 3

  return (
    <HarnessFrame title={title}>
      <div style={shellStyle}>
        <Sidebar />
        <div style={{ display: 'grid', gap: '18px' }}>
          <SearchBar value={query} onChange={setQuery} />

          <section style={surfaceStyle}>
            <p
              style={{
                color: '#315f46',
                fontSize: '13px',
                fontWeight: 800,
                margin: '0 0 8px',
              }}
            >
              最近の理解
            </p>
            {notes.length === 0 ? (
              <p style={mutedTextStyle}>
                まだ理解ノートはありません。FAQから気になる知識を保存できます。
              </p>
            ) : (
              <div style={gridStyle}>
                {notes.map((note) => (
                  <StickyNoteCard
                    key={note.id}
                    note={note}
                    sourceBlock={getNoteBlock(note)}
                    sources={getNoteSources(note)}
                  />
                ))}
              </div>
            )}
          </section>

          {isAskUnlocked ? (
            <section style={surfaceStyle}>
              <p
                style={{
                  color: '#315f46',
                  fontSize: '13px',
                  fontWeight: 800,
                  margin: '0 0 8px',
                }}
              >
                ノートに聞く
              </p>
              <p style={mutedTextStyle}>
                理解ノートが3件あります。保存した内容にもとづく回答状態を確認できます。
              </p>
            </section>
          ) : (
            <AskLockedPanel savedNoteCount={notes.length} />
          )}

          <section style={{ display: 'grid', gap: '14px' }}>
            <h3 style={{ fontSize: '16px', margin: 0 }}>ライブラリ</h3>
            <div style={gridStyle}>
              {searchedFaqs.map((faq) => (
                <FAQCard key={faq.id} faq={faq} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </HarnessFrame>
  )
}

function FaqDetailPreview() {
  const perFaq = getPerFaq()
  const relatedFaqs = faqs.filter((faq) => perFaq.relatedFaqIds.includes(faq.id))

  return (
    <HarnessFrame title="FAQ Detail for PER">
      <article style={{ ...surfaceStyle, display: 'grid', gap: '18px' }}>
        <header>
          <p
            style={{
              color: '#315f46',
              fontSize: '13px',
              fontWeight: 800,
              margin: '0 0 8px',
            }}
          >
            {perFaq.category}
          </p>
          <h3 style={{ fontSize: '24px', lineHeight: 1.4, margin: '0 0 8px' }}>
            {perFaq.title}
          </h3>
          <p style={mutedTextStyle}>{perFaq.question}</p>
        </header>

        {perFaq.blocks.map((block) => (
          <FAQBlockCard
            key={block.id}
            block={block}
            sources={perFaq.sourceReferences.filter((source) =>
              block.sourceReferenceIds.includes(source.id),
            )}
          />
        ))}

        <RelatedKnowledgeChips relatedFaqs={relatedFaqs} />
      </article>
    </HarnessFrame>
  )
}

function NotesPreview({
  title,
  notes,
}: {
  title: string
  notes: MockUserNote[]
}) {
  return (
    <HarnessFrame title={title}>
      <section style={surfaceStyle}>
        {notes.length === 0 ? (
          <div>
            <p
              style={{
                color: '#315f46',
                fontSize: '13px',
                fontWeight: 800,
                margin: '0 0 8px',
              }}
            >
              理解ノート
            </p>
            <h3 style={{ fontSize: '18px', lineHeight: 1.5, margin: '0 0 8px' }}>
              保存したノートはまだありません
            </h3>
            <p style={mutedTextStyle}>
              FAQの知識ブロックから、自分の理解として残したい内容を追加できます。
            </p>
          </div>
        ) : (
          <div style={gridStyle}>
            {notes.map((note) => (
              <StickyNoteCard
                key={note.id}
                note={note}
                sourceBlock={getNoteBlock(note)}
                sources={getNoteSources(note)}
              />
            ))}
          </div>
        )}
      </section>
    </HarnessFrame>
  )
}

function AskAnswerPreview({ answer }: { answer: AIAnswer }) {
  const sources = faqs
    .flatMap((faq) => faq.sourceReferences)
    .filter((source, index, allSources) => {
      return (
        answer.citedSourceReferenceIds.includes(source.id) &&
        allSources.findIndex((candidate) => candidate.id === source.id) === index
      )
    })

  return (
    <HarnessFrame title="Ask My Notes — unlocked answer state">
      <section style={{ ...surfaceStyle, display: 'grid', gap: '14px' }}>
        <p
          style={{
            color: '#315f46',
            fontSize: '13px',
            fontWeight: 800,
            margin: 0,
          }}
        >
          ノートに聞く
        </p>
        <h3 style={{ fontSize: '18px', lineHeight: 1.5, margin: 0 }}>
          {answer.question}
        </h3>
        <p style={{ lineHeight: 1.9, margin: 0, whiteSpace: 'pre-line' }}>
          {answer.answer}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {sources.map((source) => (
            <SourceChip key={source.id} source={source} />
          ))}
        </div>
      </section>
    </HarnessFrame>
  )
}

export function ScreenStateHarness() {
  const unlockedAnswer =
    mockAiAnswers.find((answer) => answer.id === 'ai-answer-ask-unlocked') ??
    mockAiAnswers[0]

  return (
    <main style={pageStyle}>
      <header style={{ maxWidth: '760px' }}>
        <p
          style={{
            color: '#315f46',
            fontSize: '13px',
            fontWeight: 800,
            margin: '0 0 8px',
          }}
        >
          Screen States
        </p>
        <h1 style={{ fontSize: '30px', lineHeight: 1.35, margin: '0 0 8px' }}>
          Screen state previews
        </h1>
        <p style={mutedTextStyle}>
          モックデータだけでホーム、FAQ詳細、理解ノート、ノートに聞く状態を確認します。
        </p>
      </header>

      <GroupHeading label="ホーム" />
      <HomeStatePreview title="Home — 0 notes" notes={mockNotesEmpty} />
      <HomeStatePreview title="Home — 1 note" notes={mockNotesOne} />
      <HomeStatePreview title="Home — 2 notes" notes={mockNotesTwo} />
      <HomeStatePreview title="Home — 3 notes (Ask unlocked)" notes={mockNotesAskUnlocked} />

      <GroupHeading label="ライブラリ" />
      <FaqDetailPreview />

      <GroupHeading label="理解ノート" />
      <NotesPreview title="Notes — empty state" notes={mockNotesEmpty} />
      <NotesPreview title="Notes — with saved notes" notes={mockNotesAskUnlocked} />

      <GroupHeading label="ノートに聞く" />
      <HarnessFrame title="Ask My Notes — locked state">
        <AskLockedPanel savedNoteCount={2} />
      </HarnessFrame>
      <AskAnswerPreview answer={unlockedAnswer} />
    </main>
  )
}
