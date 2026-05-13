import { LedgerEntry } from '../components/LedgerEntry'
import { LinkedKnowledgeSection } from '../components/LinkedKnowledgeSection'
import { SourceStamp } from '../components/SourceStamp'
import { UnderstandingBlock } from '../components/UnderstandingBlock'
import { faqs } from '../data/faqs'
import { VaultLayout } from '../layouts/VaultLayout'
import type { FAQ } from '../types'

const getFaq = (faqId: string) => faqs.find((faq) => faq.id === faqId)
const isFaq = (faq: FAQ | undefined): faq is FAQ => faq !== undefined

const flowSteps = [
  {
    id: 'search',
    title: '1. Vault Search',
    body: '指標、NISA、リスク管理などの知識領域から、読みたい公式知識を見つけます。',
  },
  {
    id: 'source',
    title: '2. Open Official Source',
    body: '検索結果をカードではなく、参照元つきの文書として開きます。',
  },
  {
    id: 'add',
    title: '3. Add to Understanding Note',
    body: '残したい公式知識ブロックを、理解ノートの公式知識レイヤーに追加します。',
  },
  {
    id: 'write',
    title: '4. Write My Understanding',
    body: '自分の言葉で、初心者として後から読み返せる短い理解を書きます。',
  },
  {
    id: 'linked',
    title: '5. Review Linked Knowledge',
    body: 'PBR、EPS、分散投資など、理解を深める関連知識へ移動します。',
  },
  {
    id: 'ask',
    title: '6. Ask This Note',
    body: '保存した公式知識と理解ノートだけを根拠に、このノートへ質問します。',
  },
]

export function InteractionFlowHarness() {
  const perFaq = getFaq('faq-per') ?? faqs[0]
  const summaryBlock = perFaq.blocks[0]
  const source = perFaq.sourceReferences[0]
  const linkedKnowledge = ['faq-pbr', 'faq-eps', 'faq-diversification', 'faq-nisa']
    .map(getFaq)
    .filter(isFaq)
    .map((faq) => ({
      id: faq.id,
      meta: `${faq.category} / ${faq.tags.slice(0, 2).join('・')}`,
      title: faq.title,
    }))

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
          Interaction Flow
        </p>
        <h1 style={{ fontSize: '30px', lineHeight: 1.35, margin: '0 0 8px' }}>
          Vault Search → Ask This Note
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
          旧FAQカードの流れではなく、文書、参照元、理解レイヤー、関連知識として中核体験を確認します。
        </p>
      </header>

      <section data-theme="paper-light" className="vault-preview-frame">
        <VaultLayout
          context={{
            linkedKnowledge,
            relatedUnderstandings: [
              { id: 'note-per', title: 'PERは利益に対する株価水準', meta: '理解ノート / 指標' },
              { id: 'note-risk', title: '分散投資は偏りを減らす考え方', meta: '理解ノート / リスク管理' },
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
            kicker: 'Interaction Flow / Tactile Ledger',
            subtitle:
              '初心者が公式知識を開き、自分の理解として保存し、関連知識をたどり、保存済みノートに質問するまで。',
            title: 'Stockwise core flow',
            children: (
              <>
                <LedgerEntry
                  entryId="FLOW-PER-001"
                  source="Local mock knowledge"
                  type="Harness Flow"
                  updatedAt="2026-05-13"
                />

                <section className="vault-section-divider">
                  <p className="vault-document-kicker">Vault Search</p>
                  <LinkedKnowledgeSection
                    items={[
                      { id: 'search-per', title: 'PERとは？', meta: '検索語: PER / 指標' },
                      { id: 'search-nisa', title: 'NISAとは？', meta: '検索語: NISA / 制度と税金' },
                      { id: 'search-diversification', title: '分散投資とは？', meta: '検索語: リスク / リスク管理' },
                    ]}
                  />
                </section>

                <section className="vault-section-divider">
                  <p className="vault-document-kicker">Open Official Source</p>
                  <SourceStamp
                    blockLabel={summaryBlock.label}
                    sourceTitle={`${source.title} / ${source.publisher}`}
                  />
                  <p className="vault-document-subtitle" style={{ marginTop: '12px' }}>
                    {summaryBlock.body}
                  </p>
                </section>

                <section className="vault-section-divider">
                  <p className="vault-document-kicker">Add / Write / Connect</p>
                  <UnderstandingBlock
                    officialKnowledge={summaryBlock.body}
                    personalUnderstanding="PERは利益に対して株価がどれくらい高いかを見る入口。低いだけで安心せず、利益が一時的に増減していないかも確認する。"
                    linkedKnowledge={['PBRとは？', 'EPSとは？', '分散投資とは？']}
                  />
                </section>

                <section className="vault-section-divider">
                  <p className="vault-document-kicker">Flow steps</p>
                  <LinkedKnowledgeSection
                    items={flowSteps.map((step) => ({
                      id: step.id,
                      title: step.title,
                      meta: step.body,
                    }))}
                  />
                </section>
              </>
            ),
          }}
        />
      </section>
    </main>
  )
}
