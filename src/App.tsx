import { useState } from 'react'

import { AskThisNotePanel } from './components/AskThisNotePanel'
import { LedgerEntry } from './components/LedgerEntry'
import { SourceStamp } from './components/SourceStamp'
import { UnderstandingBlock } from './components/UnderstandingBlock'
import { faqs } from './data/faqs'
import { mockNotesAskUnlocked } from './fixtures/mockNotes'
import { VaultLayout } from './layouts/VaultLayout'
import type { VaultSection } from './layouts/NavigationPane'
import type { FAQ, UserNote } from './types'

const beginnerDocumentIds = [
  'faq-per',
  'faq-pbr',
  'faq-nisa',
  'faq-dividend-yield',
  'faq-diversification',
]

const defaultFaq = faqs.find((faq) => faq.id === 'faq-per') ?? faqs[0]
const defaultNote = mockNotesAskUnlocked[0]

const findFaq = (faqId: string) => faqs.find((faq) => faq.id === faqId)
const isFaq = (faq: FAQ | undefined): faq is FAQ => faq !== undefined

const displayTitle = (title: string) =>
  title.replace('何ですか？', '？').replace('何ですか?', '?')

const buildLinkedKnowledge = (faq: FAQ) =>
  faq.relatedFaqIds.map(findFaq).filter(isFaq).map((relatedFaq) => ({
    id: relatedFaq.id,
    meta: `${relatedFaq.category} / ${relatedFaq.tags.slice(0, 2).join('・')}`,
    title: displayTitle(relatedFaq.title),
  }))

const findSourceBlock = (note: UserNote, faq: FAQ) =>
  faq.blocks.find((block) => block.id === note.sourceBlockId) ?? faq.blocks[0]

function App() {
  const [activeSection, setActiveSection] = useState<VaultSection>('home')
  const [selectedFaqId, setSelectedFaqId] = useState(defaultFaq.id)
  const [selectedNoteId, setSelectedNoteId] = useState(defaultNote.id)

  const libraryDocuments = beginnerDocumentIds.map(findFaq).filter(isFaq)
  const selectedFaq = findFaq(selectedFaqId) ?? defaultFaq
  const selectedNote =
    mockNotesAskUnlocked.find((note) => note.id === selectedNoteId) ??
    defaultNote
  const selectedNoteFaq = findFaq(selectedNote.faqId) ?? defaultFaq
  const selectedNoteBlock = findSourceBlock(selectedNote, selectedNoteFaq)
  const currentFaq = activeSection === 'notes' ? selectedNoteFaq : selectedFaq

  const linkedKnowledge = buildLinkedKnowledge(currentFaq)
  const homeConcepts = [
    { label: '指標', value: 'PER / PBR' },
    { label: '制度', value: 'NISA' },
    { label: 'リスク', value: '分散投資' },
  ]

  const relatedUnderstandings = mockNotesAskUnlocked
    .filter((note) => note.id !== selectedNote.id)
    .map((note) => ({
      id: note.id,
      meta: '理解ノート / 保存済み',
      title: note.title,
    }))

  const sourceReferences =
    activeSection === 'notes'
      ? selectedNoteFaq.sourceReferences.filter((source) =>
          selectedNote.sourceReferenceIds.includes(source.id),
        )
      : currentFaq.sourceReferences

  const context = {
    linkedKnowledge,
    overview:
      activeSection === 'home'
        ? {
            concepts: homeConcepts,
            reviewSuggestion:
              '今週は「NISAは元本保証ではない」と「分散投資は偏りを減らす考え方」を短く見直すと、制度とリスクの理解がつながります。',
            stats: [
              {
                label: '総ノート数',
                value: `${mockNotesAskUnlocked.length}`,
              },
              {
                label: 'マスター済み',
                value: '1',
              },
              {
                label: 'レビュー待ち',
                value: '2',
              },
              {
                label: '理解達成度',
                value: '62%',
              },
            ],
          }
        : undefined,
    relatedUnderstandings,
    sources: sourceReferences.map((source) => ({
      blockLabel:
        activeSection === 'notes' ? selectedNoteBlock.label : currentFaq.blocks[0]?.label,
      id: source.id,
      title: `${source.title} / ${source.publisher}`,
    })),
  }

  const homeDocument = {
    kicker: 'ホーム',
    subtitle:
      '公式知識を読み、自分の言葉で短く残し、関連する知識へつなげるためのVaultです。',
    title: '投資理解のVault',
    children: (
      <>
        <section className="vault-section-divider">
          <div className="vault-overview-band">
            <div>
              <p className="vault-document-kicker">Vault Overview</p>
              <p className="vault-overview-text">
                保存した理解ノートを、公式知識・自分の理解・つながる知識の流れで見直します。
              </p>
            </div>
            <div className="vault-overview-progress">
              <span>理解達成度</span>
              <strong>62%</strong>
            </div>
          </div>
        </section>

        <section className="vault-section-divider">
          <p className="vault-document-kicker">最近の理解</p>
          <div className="vault-selector-list">
            {mockNotesAskUnlocked.map((note) => (
              <button
                className="vault-selector-row"
                key={note.id}
                type="button"
                onClick={() => {
                  setSelectedNoteId(note.id)
                  setActiveSection('notes')
                }}
              >
                <span className="vault-selector-title">{note.title}</span>
                <span className="vault-selector-meta">{note.memo}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="vault-section-divider">
          <p className="vault-document-kicker">ライブラリ</p>
          <div className="vault-selector-list">
            {libraryDocuments.map((faq) => (
              <button
                className="vault-selector-row"
                key={faq.id}
                type="button"
                onClick={() => {
                  setSelectedFaqId(faq.id)
                  setActiveSection('library')
                }}
              >
                <span className="vault-selector-title">
                  {displayTitle(faq.title)}
                </span>
                <span className="vault-selector-meta">
                  {faq.category} / {faq.tags.slice(0, 2).join('・')}
                </span>
              </button>
            ))}
          </div>
        </section>
      </>
    ),
  }

  const libraryDocument = {
    kicker: 'ライブラリ / 公式知識',
    subtitle:
      '初心者向けの公式知識を読み、理解ノートに残す材料を確認します。',
    title: displayTitle(selectedFaq.title),
    children: (
      <>
        <div className="vault-selector-list">
          {libraryDocuments.map((faq) => (
            <button
              aria-current={selectedFaq.id === faq.id ? 'page' : undefined}
              className={`vault-selector-row ${
                selectedFaq.id === faq.id ? 'is-active' : ''
              }`}
              key={faq.id}
              type="button"
              onClick={() => setSelectedFaqId(faq.id)}
            >
              <span className="vault-selector-title">
                {displayTitle(faq.title)}
              </span>
              <span className="vault-selector-meta">
                {faq.category} / {faq.tags.slice(0, 2).join('・')}
              </span>
            </button>
          ))}
        </div>

        <section className="vault-section-divider">
          <LedgerEntry
            entryId={selectedFaq.id.toUpperCase()}
            source={selectedFaq.sourceReferences[0]?.publisher ?? 'Mock Source'}
            type="Official Knowledge"
            updatedAt={selectedFaq.updatedAt}
          />
        </section>

        {selectedFaq.blocks.map((block) => (
          <section className="understanding-layer" key={block.id}>
            <h3 className="understanding-layer-title">{block.label}</h3>
            <p className="understanding-layer-body">{block.body}</p>
          </section>
        ))}

        <section className="vault-section-divider">
          <SourceStamp
            blockLabel={selectedFaq.blocks[0]?.label}
            sourceTitle={`${selectedFaq.sourceReferences[0]?.title} / ${
              selectedFaq.sourceReferences[0]?.publisher
            }`}
          />
        </section>
      </>
    ),
  }

  const notesDocument = {
    kicker: '理解ノート',
    subtitle:
      '保存した公式知識、自分の理解、つながる知識を三層で確認します。',
    title: selectedNote.title,
    children: (
      <>
        <div className="vault-selector-list">
          {mockNotesAskUnlocked.map((note) => (
            <button
              aria-current={selectedNote.id === note.id ? 'page' : undefined}
              className={`vault-selector-row ${
                selectedNote.id === note.id ? 'is-active' : ''
              }`}
              key={note.id}
              type="button"
              onClick={() => setSelectedNoteId(note.id)}
            >
              <span className="vault-selector-title">{note.title}</span>
              <span className="vault-selector-meta">{note.memo}</span>
            </button>
          ))}
        </div>

        <LedgerEntry
          entryId={selectedNote.id.toUpperCase()}
          source={selectedNoteFaq.sourceReferences[0]?.publisher ?? 'Mock Source'}
          type="Understanding Note"
          updatedAt={selectedNote.updatedAt}
        />

        <div className="vault-section-divider">
          <SourceStamp
            blockLabel={selectedNoteBlock.label}
            sourceTitle={`${selectedNoteFaq.sourceReferences[0]?.title} / ${selectedNoteBlock.label}`}
          />
        </div>

        <UnderstandingBlock
          officialKnowledge={selectedNote.excerpt}
          personalUnderstanding={selectedNote.memo ?? '自分の言葉で短く理解を残す。'}
          linkedKnowledge={linkedKnowledge.map((item) => item.title)}
        />
      </>
    ),
  }

  const askDocument = {
    kicker: 'ノートに聞く',
    subtitle:
      '保存済みの公式知識と理解ノートを参照範囲にした、ローカルのモック確認画面です。',
    title: 'このノートに聞く',
    children: (
      <>
        <AskThisNotePanel />
        <section className="vault-section-divider">
          <p className="vault-document-kicker">参照中の理解ノート</p>
          <p className="vault-document-subtitle">{selectedNote.title}</p>
        </section>
      </>
    ),
  }

  const documentBySection = {
    ask: askDocument,
    home: homeDocument,
    library: libraryDocument,
    notes: notesDocument,
  }

  return (
    <VaultLayout
      context={context}
      document={documentBySection[activeSection]}
      navigation={{
        activeSection,
        onSelectSection: setActiveSection,
      }}
    />
  )
}

// Development harness remains available at ./harness/HarnessPage for manual mounting.
export default App
