import { ComponentHarness } from './ComponentHarness'

export function LegacyComponentsHarness() {
  return (
    <div>
      <section
        style={{
          background: '#fbf7ef',
          borderBottom: '1px solid #e4ded2',
          color: '#232925',
          padding: '20px 32px',
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
          Legacy / Supporting Components
        </p>
        <p style={{ lineHeight: 1.8, margin: 0, maxWidth: '820px' }}>
          旧FAQ/カード系コンポーネントの確認用です。最終UIアーキテクチャは
          Final UI、Layout Primitives、Document States、Interaction Flow
          の各タブで検証します。
        </p>
      </section>
      <ComponentHarness />
    </div>
  )
}
