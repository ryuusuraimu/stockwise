type UnderstandingBlockProps = {
  linkedKnowledge: string[]
  officialKnowledge: string
  personalUnderstanding: string
}

export function UnderstandingBlock({
  linkedKnowledge,
  officialKnowledge,
  personalUnderstanding,
}: UnderstandingBlockProps) {
  return (
    <section className="understanding-block">
      <article className="understanding-layer">
        <h3 className="understanding-layer-title">公式知識</h3>
        <p className="understanding-layer-body">{officialKnowledge}</p>
      </article>

      <article className="understanding-layer is-personal">
        <h3 className="understanding-layer-title">自分の理解</h3>
        <p className="understanding-layer-body">{personalUnderstanding}</p>
      </article>

      <article className="understanding-layer">
        <h3 className="understanding-layer-title">つながる知識</h3>
        <p className="understanding-layer-body">{linkedKnowledge.join(' / ')}</p>
      </article>
    </section>
  )
}
