import type { FAQ } from '../data/faqs'

// 検索しやすくするための前処理を行う関数・スペースを削除して小文字にする
const normalizeText = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '').trim()
}

export const searchFaqs = (faqs: FAQ[], searchText: string) => {
  const keyword = normalizeText(searchText)

  if (keyword === '') {
    return faqs
  }

  return faqs.filter((faq) => {
    const searchableText = normalizeText(
      [
        faq.term,
        faq.question,
        faq.answer,
        faq.category,
        ...faq.tags,
      ].join(' '),
    )

    return searchableText.includes(keyword)
  })
}