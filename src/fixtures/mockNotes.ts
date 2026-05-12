import type { UserNote } from '../types'

export type MockUserNote = UserNote & {
  sourceBlockId: string
}

const createMockNote = (
  note: Omit<MockUserNote, 'blockId'>,
): MockUserNote => ({
  ...note,
  blockId: note.sourceBlockId,
})

export const mockNotesEmpty: MockUserNote[] = []

export const mockNotesOne: MockUserNote[] = [
  createMockNote({
    id: 'note-per-summary',
    faqId: 'faq-per',
    sourceBlockId: 'faq-per-summary',
    title: 'PERは利益に対する株価水準',
    excerpt:
      'PERは、株価が会社の利益に対してどれくらいの水準かを見るための指標です。',
    memo: 'PERだけで割安とは判断しない。',
    sourceReferenceIds: ['src-jpx-money'],
    createdAt: '2026-05-12T09:00:00.000Z',
    updatedAt: '2026-05-12T09:00:00.000Z',
  }),
]

export const mockNotesTwo: MockUserNote[] = [
  ...mockNotesOne,
  createMockNote({
    id: 'note-nisa-misconception',
    faqId: 'faq-nisa',
    sourceBlockId: 'faq-nisa-misconception',
    title: 'NISAは元本保証ではない',
    excerpt:
      'NISAは損をしない制度ではありません。非課税の仕組みであり、投資元本が保証されるわけではありません。',
    memo: '制度のメリットと投資リスクを分けて理解する。',
    sourceReferenceIds: ['src-fsa-nisa'],
    createdAt: '2026-05-12T09:10:00.000Z',
    updatedAt: '2026-05-12T09:10:00.000Z',
  }),
]

export const mockNotesAskUnlocked: MockUserNote[] = [
  ...mockNotesTwo,
  createMockNote({
    id: 'note-diversification-summary',
    faqId: 'faq-diversification',
    sourceBlockId: 'faq-diversification-summary',
    title: '分散投資は偏りを減らす考え方',
    excerpt:
      '分散投資は、投資先を分けて一つの失敗に偏りすぎないようにする考え方です。',
    memo: 'リスクが消えるわけではない点もセットで覚える。',
    sourceReferenceIds: ['src-fsa-guide'],
    createdAt: '2026-05-12T09:20:00.000Z',
    updatedAt: '2026-05-12T09:20:00.000Z',
  }),
]

export const mockNoteScenarios = {
  empty: mockNotesEmpty,
  oneNote: mockNotesOne,
  twoNotes: mockNotesTwo,
  askUnlocked: mockNotesAskUnlocked,
} as const
