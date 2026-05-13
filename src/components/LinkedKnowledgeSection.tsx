export type LinkedKnowledgeItem = {
  id: string
  meta: string
  title: string
}

type LinkedKnowledgeSectionProps = {
  items: LinkedKnowledgeItem[]
}

export function LinkedKnowledgeSection({ items }: LinkedKnowledgeSectionProps) {
  return (
    <div className="linked-knowledge">
      {items.map((item) => (
        <button className="linked-row" key={item.id} type="button">
          <span className="linked-row-title">{item.title}</span>
          <span className="linked-row-meta">{item.meta}</span>
        </button>
      ))}
    </div>
  )
}
