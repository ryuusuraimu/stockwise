import { useEffect, useState } from 'react'

import type { FAQ, FAQBlock, UserNote } from '../types'

type NoteCreationPayload = Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>

type NoteCreationModalProps = {
  isOpen: boolean
  faq: FAQ
  block: FAQBlock
  initialDraft: string
  previewMode?: boolean
  onClose: () => void
  onSave: (note: NoteCreationPayload) => void
}

export function NoteCreationModal({
  isOpen,
  faq,
  block,
  initialDraft,
  previewMode = false,
  onClose,
  onSave,
}: NoteCreationModalProps) {
  const [title, setTitle] = useState(faq.title)
  const [excerpt, setExcerpt] = useState(initialDraft)
  const [memo, setMemo] = useState('')

  useEffect(() => {
    if (isOpen) {
      setTitle(faq.title)
      setExcerpt(initialDraft)
      setMemo('')
    }
  }, [faq.title, initialDraft, isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      role="presentation"
      style={{
        alignItems: 'center',
        background: previewMode ? '#f7f3ea' : 'rgba(35, 41, 37, 0.28)',
        display: 'flex',
        inset: previewMode ? undefined : 0,
        justifyContent: 'center',
        padding: '20px',
        position: previewMode ? 'relative' : 'fixed',
        zIndex: previewMode ? 0 : 20,
      }}
    >
      <section
        aria-label="理解ノートを作成"
        role="dialog"
        style={{
          background: '#fffdf8',
          border: '1px solid #e4ded2',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(35, 41, 37, 0.18)',
          color: '#232925',
          maxWidth: '560px',
          padding: '20px',
          width: '100%',
        }}
      >
        <p
          style={{
            color: '#315f46',
            fontSize: '13px',
            fontWeight: 800,
            margin: '0 0 8px',
          }}
        >
          ＋ 理解ノートに追加
        </p>
        <h2 style={{ fontSize: '20px', lineHeight: 1.5, margin: '0 0 16px' }}>
          {block.label}
        </h2>

        <label style={{ display: 'grid', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700 }}>タイトル</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{
              border: '1px solid #d8d0c2',
              borderRadius: '8px',
              color: '#232925',
              padding: '10px',
            }}
          />
        </label>

        <label style={{ display: 'grid', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700 }}>理解メモ</span>
          <textarea
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={4}
            style={{
              border: '1px solid #d8d0c2',
              borderRadius: '8px',
              color: '#232925',
              lineHeight: 1.7,
              padding: '10px',
              resize: 'vertical',
            }}
          />
        </label>

        <label style={{ display: 'grid', gap: '6px', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700 }}>補足</span>
          <textarea
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
            rows={3}
            style={{
              border: '1px solid #d8d0c2',
              borderRadius: '8px',
              color: '#232925',
              lineHeight: 1.7,
              padding: '10px',
              resize: 'vertical',
            }}
          />
        </label>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          {previewMode ? (
            <span
              style={{
                border: '1px solid #d8d0c2',
                borderRadius: '8px',
                background: '#fffdf8',
                color: '#60685f',
                padding: '10px 14px',
              }}
            >
              静的プレビュー
            </span>
          ) : (
            <button
              type="button"
              onClick={onClose}
              style={{
                border: '1px solid #d8d0c2',
                borderRadius: '8px',
                background: '#fffdf8',
                color: '#232925',
                cursor: 'pointer',
                padding: '10px 14px',
              }}
            >
              閉じる
            </button>
          )}
          <button
            type="button"
            disabled={previewMode}
            onClick={() => {
              if (previewMode) {
                return
              }

              onSave({
                faqId: faq.id,
                sourceBlockId: block.id,
                title,
                excerpt,
                memo,
                sourceReferenceIds: block.sourceReferenceIds,
              })
            }}
            style={{
              border: 'none',
              borderRadius: '8px',
              background: previewMode ? '#8ba08f' : '#315f46',
              color: '#fffdf8',
              cursor: previewMode ? 'default' : 'pointer',
              fontWeight: 700,
              padding: '10px 14px',
            }}
          >
            {previewMode ? '保存プレビュー' : '保存する'}
          </button>
        </div>
      </section>
    </div>
  )
}
