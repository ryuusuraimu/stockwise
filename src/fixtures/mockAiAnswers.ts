import type { AIAnswer } from '../types'

export const mockAiAnswers: AIAnswer[] = [
  {
    id: 'ai-answer-empty-notes',
    question: '保存したノートから何が学べますか？',
    answer:
      'まだ理解ノートが保存されていません。まずFAQから気になる知識ブロックを追加すると、保存した内容にもとづいて振り返れます。',
    citedNoteIds: [],
    citedSourceReferenceIds: [],
    createdAt: '2026-05-12T10:00:00.000Z',
  },
  {
    id: 'ai-answer-per-review',
    question: 'PERを見るときに気をつけることは？',
    answer:
      '保存ノートでは、PERは利益に対する株価水準を見る指標だと整理されています。ただし、PERだけで割安とは判断せず、成長性や一時的な利益変動も確認する必要があります。',
    citedNoteIds: ['note-per-summary'],
    citedSourceReferenceIds: ['src-jpx-money'],
    createdAt: '2026-05-12T10:05:00.000Z',
  },
  {
    id: 'ai-answer-nisa-risk-review',
    question: 'NISAなら損をしないと考えてよいですか？',
    answer:
      '保存ノートでは、NISAは非課税の仕組みであり、元本保証ではないと整理されています。制度のメリットと投資リスクは分けて理解します。',
    citedNoteIds: ['note-nisa-misconception'],
    citedSourceReferenceIds: ['src-fsa-nisa'],
    createdAt: '2026-05-12T10:10:00.000Z',
  },
  {
    id: 'ai-answer-ask-unlocked',
    question: '初心者が最初に覚えるべきリスクの考え方は？',
    answer:
      '保存ノートからは、PERは判断材料の一つであり、NISAも元本保証ではなく、分散投資は偏りを減らす考え方だと整理できます。どれも損失をなくすものではないため、仕組みと限界を一緒に確認することが大切です。',
    citedNoteIds: [
      'note-per-summary',
      'note-nisa-misconception',
      'note-diversification-summary',
    ],
    citedSourceReferenceIds: [
      'src-jpx-money',
      'src-fsa-nisa',
      'src-fsa-guide',
    ],
    createdAt: '2026-05-12T10:15:00.000Z',
  },
]
