import { LedgerEntry } from '../components/LedgerEntry'
import { LinkedKnowledgeSection } from '../components/LinkedKnowledgeSection'
import { SourceStamp } from '../components/SourceStamp'
import { UnderstandingBlock } from '../components/UnderstandingBlock'
import { faqs } from '../data/faqs'
import { mockAiAnswers } from '../fixtures/mockAiAnswers'
import { mockNotesAskUnlocked, mockNotesEmpty } from '../fixtures/mockNotes'
import { VaultLayout } from '../layouts/VaultLayout'
import type { FAQ, UserNote } from '../types'
import type { StockwiseTheme } from '../utils/theme'

const isFaq = (faq: FAQ | undefined): faq is FAQ => faq !== undefined
const getFaq = (faqId: string) => faqs.find((faq) => faq.id === faqId)

const beginnerLinks = ['faq-per', 'faq-pbr', 'faq-nisa', 'faq-dividend-yield', 'faq-diversification']
  .map(getFaq)
  .filter(isFaq)
  .map((faq) => ({
    id: faq.id,
    meta: `${faq.category} / ${faq.tags.slice(0, 2).join('・')}`,
    title: faq.title,
  }))

const getNoteItems = (notes: UserNote[]) =>
  notes.map((note) => ({
    id: note.id,
    meta: '理解ノート / 保存済み',
    title: note.title,
  }))

function StateFrame({
  children,
  theme = 'paper-light',
  title,
}: {
  children: React.ReactNode
  theme?: Exclude<StockwiseTheme, 'system'>
  title: string
}) {
  return (
    <section style={{ display: 'grid', gap: '12px' }}>
      <h2 style={{ fontSize: '18px', lineHeight: 1.4, margin: 0 }}>{title}</h2>
      <div data-theme={theme} className="vault-preview-frame">
        {children}
      </div>
    </section>
  )
}

function VaultHomeState({ notes }: { notes: UserNote[] }) {
  const noteItems = getNoteItems(notes)

  return (
    <VaultLayout
      context={{
        linkedKnowledge: beginnerLinks,
        relatedUnderstandings: noteItems,
        sources: [
          { id: 'src-fsa-guide', title: '投資の基本 / 金融庁' },
          { id: 'src-jpx-money', title: '投資の基礎知識 / 日本取引所グループ' },
        ],
      }}
      document={{
        kicker: 'ホーム / 投資理解のVault',
        subtitle:
          notes.length === 0
            ? '公式知識を開いて、自分の言葉で理解ノートを作り始めます。'
            : '保存した理解を起点に、関連する公式知識へ戻れる状態です。',
        title: notes.length === 0 ? 'まだ理解ノートはありません' : '最近の理解',
        children: (
          <>
            <LedgerEntry
              entryId={notes.length === 0 ? 'VAULT-HOME-EMPTY' : 'VAULT-HOME-ACTIVE'}
              source="Stockwise local harness"
              type="Vault Home"
              updatedAt="2026-05-13"
            />
            <section className="vault-section-divider">
              <p className="vault-document-kicker">最近の理解</p>
              {noteItems.length === 0 ? (
                <p className="vault-document-subtitle">
                  PER、NISA、分散投資などの公式知識から、残したいブロックを理解ノートに追加します。
                </p>
              ) : (
                <LinkedKnowledgeSection items={noteItems} />
              )}
            </section>
            <section className="vault-section-divider">
              <p className="vault-document-kicker">つながる知識</p>
              <LinkedKnowledgeSection items={beginnerLinks} />
            </section>
          </>
        ),
      }}
    />
  )
}

function UnderstandingNoteDetail() {
  const perFaq = getFaq('faq-per') ?? faqs[0]
  const summaryBlock = perFaq.blocks[0]
  const source = perFaq.sourceReferences[0]

  return (
    <VaultLayout
      context={{
        linkedKnowledge: beginnerLinks.filter((item) => item.id !== perFaq.id),
        relatedUnderstandings: [
          { id: 'note-pbr', title: 'PBRは純資産に対する株価水準', meta: '理解ノート / 指標' },
          { id: 'note-diversification', title: '分散投資は偏りを減らす考え方', meta: '理解ノート / リスク管理' },
        ],
        sources: [
          {
            blockLabel: summaryBlock.label,
            id: source.id,
            title: `${perFaq.title} / ${source.publisher}`,
          },
        ],
      }}
      document={{
        kicker: '理解ノート / 株価指標',
        subtitle: '公式知識を自分の言葉で短く残し、関連する考え方へ接続します。',
        title: 'PERとは？',
        children: (
          <>
            <LedgerEntry
              entryId="NOTE-PER-001"
              source={source.publisher}
              type="Understanding Note"
              updatedAt={perFaq.updatedAt}
            />
            <UnderstandingBlock
              officialKnowledge={summaryBlock.body}
              personalUnderstanding="PERは株価が利益に対して高いか低いかを見る入口。低ければ必ず割安ではなく、業種や利益の一時変動も見る。"
              linkedKnowledge={['PBRとは？', 'EPSとは？', 'バリュエーションとは？']}
            />
          </>
        ),
      }}
    />
  )
}

function OfficialSourceDetail() {
  const nisaFaq = getFaq('faq-nisa') ?? faqs[0]
  const source = nisaFaq.sourceReferences[0]

  return (
    <VaultLayout
      context={{
        linkedKnowledge: beginnerLinks.filter((item) => item.id !== nisaFaq.id),
        relatedUnderstandings: [
          { id: 'note-nisa-risk', title: 'NISAは元本保証ではない', meta: '理解ノート / 制度と税金' },
        ],
        sources: [{ id: source.id, title: `${nisaFaq.title} / ${source.publisher}` }],
      }}
      document={{
        kicker: '公式ソース / 制度と税金',
        subtitle: nisaFaq.question,
        title: 'NISAとは？',
        children: (
          <>
            <LedgerEntry
              entryId="SRC-NISA-001"
              source={source.publisher}
              type="Official Source"
              updatedAt={nisaFaq.updatedAt}
            />
            {nisaFaq.blocks.map((block) => (
              <section className="vault-section-divider" key={block.id}>
                <SourceStamp
                  blockLabel={block.label}
                  sourceTitle={`${source.title} / ${source.publisher}`}
                />
                <p className="vault-document-subtitle" style={{ marginTop: '12px' }}>
                  {block.body}
                </p>
              </section>
            ))}
          </>
        ),
      }}
    />
  )
}

function AskState({ unlocked }: { unlocked: boolean }) {
  const answer =
    mockAiAnswers.find((mockAnswer) => mockAnswer.id === 'ai-answer-ask-unlocked') ??
    mockAiAnswers[0]

  return (
    <VaultLayout
      context={{
        linkedKnowledge: beginnerLinks,
        relatedUnderstandings: getNoteItems(mockNotesAskUnlocked),
        sources: [
          { id: 'src-jpx-money', title: '投資の基礎知識 / 日本取引所グループ' },
          { id: 'src-fsa-guide', title: '投資の基本 / 金融庁' },
        ],
      }}
      document={{
        kicker: 'ノートに聞く',
        subtitle: '保存した公式知識と理解ノートだけをもとに回答します。',
        title: unlocked ? 'Ask This Note: unlocked mock answer' : 'Ask This Note: locked',
        children: (
          <>
            <LedgerEntry
              entryId={unlocked ? 'ASK-UNLOCKED' : 'ASK-LOCKED'}
              source="Saved understanding notes"
              type="Grounded Ask"
              updatedAt="2026-05-13"
            />
            <section className="vault-section-divider">
              <p className="vault-document-kicker">質問</p>
              <p className="vault-document-subtitle">
                {unlocked ? answer.question : '理解ノートを3件保存すると、このノートに聞けます。'}
              </p>
            </section>
            <section className="vault-section-divider">
              <p className="vault-document-kicker">{unlocked ? '回答' : '状態'}</p>
              <p className="vault-document-subtitle" style={{ whiteSpace: 'pre-line' }}>
                {unlocked
                  ? answer.answer
                  : 'まだ回答は作成されません。保存済みの公式知識と理解ノートだけを根拠にするため、必要なノート数に達するまでロックします。'}
              </p>
            </section>
          </>
        ),
      }}
    />
  )
}

export function DocumentStatesHarness() {
  return (
    <main
      style={{
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
        display: 'grid',
        gap: '28px',
        minHeight: '100vh',
        padding: '32px',
      }}
    >
      <header style={{ maxWidth: '860px' }}>
        <p
          style={{
            color: 'var(--accent)',
            fontSize: '13px',
            fontWeight: 800,
            margin: '0 0 8px',
          }}
        >
          Document States
        </p>
        <h1 style={{ fontSize: '30px', lineHeight: 1.35, margin: '0 0 8px' }}>
          Final vault states
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
          旧カードグリッドではなく、すべて三ペインの知識ワークスペースとして状態を確認します。
        </p>
      </header>

      <StateFrame title="Vault Home / 0 notes">
        <VaultHomeState notes={mockNotesEmpty} />
      </StateFrame>

      <StateFrame title="Vault Home / 3 notes">
        <VaultHomeState notes={mockNotesAskUnlocked} />
      </StateFrame>

      <StateFrame title="Understanding Note Detail: PERとは？">
        <UnderstandingNoteDetail />
      </StateFrame>

      <StateFrame title="Official Source Detail: NISAとは？">
        <OfficialSourceDetail />
      </StateFrame>

      <StateFrame title="Ask This Note: locked">
        <AskState unlocked={false} />
      </StateFrame>

      <StateFrame title="Ask This Note: unlocked mock answer">
        <AskState unlocked />
      </StateFrame>

      <StateFrame title="Paper Light document view" theme="paper-light">
        <UnderstandingNoteDetail />
      </StateFrame>

      <StateFrame title="Vault Dark document view" theme="vault-dark">
        <UnderstandingNoteDetail />
      </StateFrame>
    </main>
  )
}
