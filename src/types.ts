export type SourceReference = {
  id: string
  title: string
  publisher: string
  url: string
  note?: string
  publishedAt?: string
  updatedAt?: string
}

export type FAQBlock = {
  id: string
  label: 'まず一言で' | 'もう少し詳しく' | '例で見る' | 'よくある誤解'
  body: string
  sourceReferenceIds: string[]
}

export type FAQ = {
  id: string
  slug: string
  title: string
  question: string
  category: string
  tags: string[]
  blocks: FAQBlock[]
  sourceReferences: SourceReference[]
  relatedFaqIds: string[]
  updatedAt: string
}

export type UserNote = {
  id: string
  faqId: string
  blockId: string
  title: string
  excerpt: string
  memo?: string
  sourceReferenceIds: string[]
  createdAt: string
  updatedAt: string
}

export type AIAnswer = {
  id: string
  question: string
  answer: string
  citedNoteIds: string[]
  citedSourceReferenceIds: string[]
  createdAt: string
}
