import type { FAQ } from "../data/faqs";

type FAQCardProps = {
  faq: FAQ;
};

export function FAQCard({ faq }: FAQCardProps) {
  return (
    <article className="faqCard">
      <p className="term">{faq.term}</p>
      <h2>{faq.question}</h2>
      <p>{faq.answer}</p>

      <div className="tags">
        {faq.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
