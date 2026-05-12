import type { AIAnswer, FAQ, FAQBlock, UserNote } from '../types'

export type MisunderstandingGuardResult = {
  status: 'safe' | 'caution'
  message: string
  cautions: string[]
}

const getSummaryBlock = (faq: FAQ) => {
  return faq.blocks.find((block) => block.id.endsWith('-summary'))
}

const findFaqBlock = (faqs: FAQ[], sourceBlockId: string) => {
  return faqs
    .flatMap((faq) => faq.blocks)
    .find((block) => block.id === sourceBlockId)
}

const findSourceTitle = (faqs: FAQ[], sourceReferenceId: string) => {
  return (
    faqs
      .flatMap((faq) => faq.sourceReferences)
      .find((source) => source.id === sourceReferenceId)?.title ??
    sourceReferenceId
  )
}

export const generateAiDraft = (faqBlock: FAQBlock) => {
  const plainText = faqBlock.body.replace(/[「」]/g, '')
  const trimmedText =
    plainText.length > 28 ? `${plainText.slice(0, 28)}…` : plainText

  return `${trimmedText} と理解しました。`
}

export const runMisunderstandingGuard = (
  userUnderstanding: string,
  faq: FAQ,
): MisunderstandingGuardResult => {
  const riskyPatterns = [
    '絶対',
    '必ず儲',
    '損しない',
    '元本保証',
    '買うべき',
    '売るべき',
    'おすすめ銘柄',
  ]
  const matchedPatterns = riskyPatterns.filter((pattern) =>
    userUnderstanding.includes(pattern),
  )

  if (matchedPatterns.length > 0) {
    return {
      status: 'caution',
      message:
        '投資助言や保証のように読める表現があります。FAQの説明に沿って、教育目的の理解メモに直しましょう。',
      cautions: matchedPatterns,
    }
  }

  return {
    status: 'safe',
    message: `${faq.title} の理解メモとして安全な範囲です。断定や売買指示になっていません。`,
    cautions: [],
  }
}

export const askMyNotes = (
  question: string,
  notes: UserNote[],
  faqs: FAQ[],
): AIAnswer => {
  if (notes.length === 0) {
    return {
      id: 'mock-answer-empty-notes',
      question,
      answer:
        '保存された理解ノートがまだありません。FAQから知識ブロックを保存すると、そのノートを参照して回答できます。',
      citedNoteIds: [],
      citedSourceReferenceIds: [],
      createdAt: new Date().toISOString(),
    }
  }

  const citedNoteIds = notes.map((note) => note.id)
  const citedSourceReferenceIds = [
    ...new Set(notes.flatMap((note) => note.sourceReferenceIds)),
  ]
  const noteLines = notes.map((note) => {
    const block = findFaqBlock(faqs, note.sourceBlockId)
    const sourceLabel = note.sourceReferenceIds
      .map((sourceReferenceId) => findSourceTitle(faqs, sourceReferenceId))
      .join('、')

    return `- ${note.title}: ${note.excerpt}${
      block ? `（${block.label}）` : ''
    } [参照元: ${sourceLabel}]`
  })

  return {
    id: `mock-answer-${Date.now()}`,
    question,
    answer: [
      '保存された理解ノートにもとづく回答です。',
      '',
      ...noteLines,
      '',
      '注意: これは保存ノートを整理したモック回答であり、投資助言や売買判断ではありません。',
    ].join('\n'),
    citedNoteIds,
    citedSourceReferenceIds,
    createdAt: new Date().toISOString(),
  }
}

export const draftFromFaqSummary = (faq: FAQ) => {
  const summaryBlock = getSummaryBlock(faq)

  return summaryBlock
    ? generateAiDraft(summaryBlock)
    : `${faq.title} の要点を短く理解しました。`
}
