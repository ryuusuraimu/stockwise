import { LedgerEntry } from './components/LedgerEntry'
import { SourceStamp } from './components/SourceStamp'
import { UnderstandingBlock } from './components/UnderstandingBlock'
import { faqs } from './data/faqs'
import { VaultLayout } from './layouts/VaultLayout'
import type { FAQ } from './types'

const defaultFaq = faqs.find((faq) => faq.id === 'faq-per') ?? faqs[0]

const findFaq = (faqId: string) => faqs.find((faq) => faq.id === faqId)
const isFaq = (faq: FAQ | undefined): faq is FAQ => faq !== undefined

const relatedFaqs = defaultFaq.relatedFaqIds.map(findFaq).filter(isFaq)
const summaryBlock = defaultFaq.blocks[0]
const detailBlock = defaultFaq.blocks[1]
const misconceptionBlock = defaultFaq.blocks[3]
const primarySource = defaultFaq.sourceReferences[0]

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
    id: 'note-eps',
    meta: '理解ノート / 企業分析',
    title: 'EPSはPERを読むための利益の単位',
  },
]

function App() {
  return (
    <VaultLayout
      context={{
        linkedKnowledge,
        relatedUnderstandings,
        sources: [
          {
            blockLabel: summaryBlock.label,
            id: primarySource.id,
            title: `${primarySource.title} / ${primarySource.publisher}`,
          },
        ],
      }}
      document={{
        kicker: '理解ノート / 指標',
        subtitle:
          '公式知識を読み、自分の言葉で短く残し、関連する知識へつなげるためのノートです。',
        title: 'PERとは？',
        children: (
          <>
            <LedgerEntry
              entryId="NOTE-PER-001"
              source={primarySource.publisher}
              type="Understanding Note"
              updatedAt={defaultFaq.updatedAt}
            />

            <div className="vault-section-divider">
              <SourceStamp
                blockLabel={summaryBlock.label}
                sourceTitle={`${primarySource.title} / ${summaryBlock.label}`}
              />
            </div>

            <UnderstandingBlock
              officialKnowledge={`${summaryBlock.body} ${detailBlock.body} ${misconceptionBlock.body}`}
              personalUnderstanding="PERは、会社の利益に対して今の株価がどれくらい高く見られているかを確認する入口の指標。低いだけで割安とは決めず、業種や利益の安定性も一緒に見る。"
              linkedKnowledge={linkedKnowledge.map((item) => item.title)}
            />

            <section className="vault-section-divider">
              <p className="vault-document-kicker">関連ソース</p>
              <p className="vault-document-subtitle">
                {defaultFaq.blocks
                  .map((block) => `${block.label}: ${block.body}`)
                  .join('\n\n')}
              </p>
            </section>
          </>
        ),
      }}
    />
  )
}

// Development harness remains available at ./harness/HarnessPage for manual mounting.
export default App
