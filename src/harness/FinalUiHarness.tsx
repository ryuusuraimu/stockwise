import { LedgerEntry } from '../components/LedgerEntry'
import { SourceStamp } from '../components/SourceStamp'
import { UnderstandingBlock } from '../components/UnderstandingBlock'
import { faqs } from '../data/faqs'
import { VaultLayout } from '../layouts/VaultLayout'
import type { FAQ } from '../types'
import type { StockwiseTheme } from '../utils/theme'

const beginnerTopicIds = [
  'faq-per',
  'faq-pbr',
  'faq-nisa',
  'faq-dividend-yield',
  'faq-diversification',
]

const getFaq = (faqId: string) => faqs.find((faq) => faq.id === faqId)
const isFaq = (faq: FAQ | undefined): faq is FAQ => faq !== undefined

function FinalPreview({ theme }: { theme: Exclude<StockwiseTheme, 'system'> }) {
  const perFaq = getFaq('faq-per') ?? faqs[0]
  const summaryBlock = perFaq.blocks[0]
  const source = perFaq.sourceReferences[0]
  const relatedFaqs = beginnerTopicIds
    .map(getFaq)
    .filter(isFaq)
    .filter((faq) => faq.id !== perFaq.id)

  const linkedKnowledge = relatedFaqs.map((faq) => ({
    id: faq.id,
    meta: `${faq.category} / ${faq.tags.slice(0, 2).join('・')}`,
    title: faq.title,
  }))

  const relatedUnderstandings = [
    {
      id: 'note-pbr',
      meta: '理解ノート / 指標',
      title: 'PBRは純資産に対する株価水準',
    },
    {
      id: 'note-diversification',
      meta: '理解ノート / リスク管理',
      title: '分散投資は偏りを減らす考え方',
    },
  ]

  return (
    <section data-theme={theme} className="vault-preview-frame">
      <VaultLayout
        context={{
          linkedKnowledge,
          relatedUnderstandings,
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
          subtitle:
            '公式な知識ブロックを読み、自分の言葉で短く残し、関連する投資用語へつなげます。',
          title: 'PERとは？',
          children: (
            <>
              <LedgerEntry
                entryId="NOTE-PER-001"
                source={source.publisher}
                type="Understanding Note"
                updatedAt={perFaq.updatedAt}
              />

              <div className="vault-section-divider">
                <SourceStamp
                  blockLabel={summaryBlock.label}
                  sourceTitle={`${source.title} / ${summaryBlock.label}`}
                />
              </div>

              <UnderstandingBlock
                officialKnowledge={summaryBlock.body}
                personalUnderstanding="PERは、会社が出している利益に対して、今の株価がどれくらい高く見られているかを確認する入口の指標。低いだけで割安とは決めず、業種や利益の安定性も一緒に見る。"
                linkedKnowledge={[
                  'PBRとは？',
                  '配当利回りとは？',
                  '分散投資とは？',
                ]}
              />

              <section className="vault-section-divider">
                <p className="vault-document-kicker">関連ソース</p>
                <p className="vault-document-subtitle">
                  {perFaq.blocks
                    .map((block) => `${block.label}: ${block.body}`)
                    .join('\n\n')}
                </p>
              </section>
            </>
          ),
        }}
      />
    </section>
  )
}

export function FinalUiHarness() {
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
          Final UI
        </p>
        <h1 style={{ fontSize: '30px', lineHeight: 1.35, margin: '0 0 8px' }}>
          Obsidian-inspired Investor Knowledge Vault
        </h1>
        <p
          style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          Stockwise V1.0 の最終UI方向を、同じ三ペイン構造で Paper Light と
          Vault Dark に展開します。
        </p>
      </header>

      <section style={{ display: 'grid', gap: '16px' }}>
        <h2 style={{ fontSize: '18px', lineHeight: 1.4, margin: 0 }}>
          Paper Light preview
        </h2>
        <FinalPreview theme="paper-light" />
      </section>

      <section style={{ display: 'grid', gap: '16px' }}>
        <h2 style={{ fontSize: '18px', lineHeight: 1.4, margin: 0 }}>
          Vault Dark preview
        </h2>
        <FinalPreview theme="vault-dark" />
      </section>
    </main>
  )
}
