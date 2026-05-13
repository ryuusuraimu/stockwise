import { AskThisNotePanel } from '../components/AskThisNotePanel'
import { LedgerEntry } from '../components/LedgerEntry'
import { LinkedKnowledgeSection } from '../components/LinkedKnowledgeSection'
import { SourceStamp } from '../components/SourceStamp'
import { ThemeToggle } from '../components/ThemeToggle'
import { UnderstandingBlock } from '../components/UnderstandingBlock'
import { WorkspaceName } from '../components/WorkspaceName'
import { ContextInspector } from '../layouts/ContextInspector'
import { DocumentPane } from '../layouts/DocumentPane'
import { NavigationPane } from '../layouts/NavigationPane'
import { VaultLayout } from '../layouts/VaultLayout'

const linkedItems = [
  { id: 'per', title: 'PERとは？', meta: '株価指標 / まず一言で' },
  { id: 'pbr', title: 'PBRとは？', meta: '株価指標 / 純資産' },
  { id: 'nisa', title: 'NISAとは？', meta: '制度と税金 / 非課税' },
]

function PrimitiveSection({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <section
      style={{
        borderTop: '1px solid var(--border-subtle)',
        display: 'grid',
        gap: '14px',
        paddingTop: '18px',
      }}
    >
      <h2 style={{ fontSize: '18px', lineHeight: 1.4, margin: 0 }}>{title}</h2>
      {children}
    </section>
  )
}

export function LayoutPrimitivesHarness() {
  return (
    <main
      data-theme="paper-light"
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
          Layout Primitives
        </p>
        <h1 style={{ fontSize: '30px', lineHeight: 1.35, margin: '0 0 8px' }}>
          Tactile Ledger building blocks
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
          最終UIの三ペイン構造、参照元、台帳メタデータ、理解ノートの基本部品を確認します。
        </p>
      </header>

      <PrimitiveSection title="VaultLayout">
        <div className="vault-preview-frame">
          <VaultLayout
            context={{
              linkedKnowledge: linkedItems,
              relatedUnderstandings: linkedItems.slice(0, 2),
              sources: [
                {
                  blockLabel: 'まず一言で',
                  id: 'src-jpx',
                  title: 'PERとは？ / 日本取引所グループ',
                },
              ],
            }}
            document={{
              kicker: '理解ノート / 指標',
              subtitle: '三ペインで公式知識、自分の理解、関連知識を同時に見ます。',
              title: 'PERとは？',
              children: (
                <>
                  <LedgerEntry
                    entryId="NOTE-PER-001"
                    source="日本取引所グループ"
                    type="Understanding Note"
                    updatedAt="2026-05-12"
                  />
                  <UnderstandingBlock
                    officialKnowledge="PERは、株価が会社の利益に対してどれくらいの水準かを見るための指標です。"
                    personalUnderstanding="PERは株価と利益の関係を見る入口。単独では判断せず、利益の安定性や業種も合わせて見る。"
                    linkedKnowledge={['PBRとは？', '配当利回りとは？', '分散投資とは？']}
                  />
                </>
              ),
            }}
          />
        </div>
      </PrimitiveSection>

      <PrimitiveSection title="NavigationPane / DocumentPane / ContextInspector">
        <div
          style={{
            border: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: '248px minmax(360px, 1fr) 300px',
            minHeight: '520px',
            overflow: 'hidden',
          }}
        >
          <NavigationPane />
          <DocumentPane
            kicker="公式ソース / 制度と税金"
            subtitle="文書として読み、必要なブロックを理解ノートへ保存します。"
            title="NISAとは？"
          >
            <SourceStamp
              blockLabel="まず一言で"
              sourceTitle="NISA特設ウェブサイト / 金融庁"
            />
            <p className="vault-document-subtitle">
              NISAは、投資で得た一部の利益に税金がかからない制度です。
            </p>
          </DocumentPane>
          <ContextInspector
            linkedKnowledge={linkedItems}
            relatedUnderstandings={linkedItems.slice(1)}
            sources={[
              {
                blockLabel: 'まず一言で',
                id: 'src-fsa',
                title: 'NISAとは？ / 金融庁',
              },
            ]}
          />
        </div>
      </PrimitiveSection>

      <PrimitiveSection title="SourceStamp / LedgerEntry / UnderstandingBlock">
        <div style={{ display: 'grid', gap: '18px', maxWidth: '760px' }}>
          <SourceStamp
            blockLabel="まず一言で"
            sourceTitle="PERとは？ / 日本取引所グループ"
          />
          <LedgerEntry
            entryId="SRC-PER-001"
            source="日本取引所グループ"
            type="Official Source"
            updatedAt="2026-05-12"
          />
          <UnderstandingBlock
            officialKnowledge="PERは、株価が会社の利益に対してどれくらいの水準かを見るための指標です。"
            personalUnderstanding="低PERだけで割安と決めず、利益の質や一時的な要因も確認する。"
            linkedKnowledge={['EPSとは？', 'PBRとは？', 'バリュエーションとは？']}
          />
        </div>
      </PrimitiveSection>

      <PrimitiveSection title="LinkedKnowledgeSection / AskThisNotePanel">
        <div style={{ display: 'grid', gap: '18px', maxWidth: '520px' }}>
          <LinkedKnowledgeSection items={linkedItems} />
          <AskThisNotePanel />
        </div>
      </PrimitiveSection>

      <PrimitiveSection title="ThemeToggle / WorkspaceName">
        <div style={{ display: 'grid', gap: '12px', maxWidth: '360px' }}>
          <ThemeToggle />
          <WorkspaceName />
        </div>
      </PrimitiveSection>
    </main>
  )
}
