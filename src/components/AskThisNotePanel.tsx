export function AskThisNotePanel() {
  return (
    <div className="ask-note-panel">
      <p>保存した公式知識と理解ノートだけをもとに回答します。</p>
      <textarea
        aria-label="このノートへの質問"
        className="ask-note-input"
        placeholder="例: PERだけで割安と言えない理由は？"
        readOnly
      />
      <button className="vault-text-button" type="button">
        このノートに聞く
      </button>
    </div>
  )
}
