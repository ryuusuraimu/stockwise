import type { FAQ } from '../types'

const normalizeText = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '').trim()
}

const getSummaryBlockText = (faq: FAQ) => {
  return faq.blocks.find((block) => block.id.endsWith('-summary'))?.body ?? ''
}

export function searchFaqs(query: string, faqs: FAQ[]): FAQ[]
export function searchFaqs(faqs: FAQ[], query: string): FAQ[]
export function searchFaqs(
  queryOrFaqs: string | FAQ[],
  faqsOrQuery: FAQ[] | string,
) {
  const query =
    typeof queryOrFaqs === 'string' ? queryOrFaqs : String(faqsOrQuery)
  const faqs = Array.isArray(queryOrFaqs)
    ? queryOrFaqs
    : (faqsOrQuery as FAQ[])
  const keyword = normalizeText(query)

  if (keyword === '') {
    return faqs
  }

  return faqs.filter((faq) => {
    const searchableText = normalizeText(
      [faq.title, ...faq.tags, getSummaryBlockText(faq)].join(' '),
    )

    return searchableText.includes(keyword)
  })
}
