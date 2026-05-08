# Stockwise

Stockwise は、株式投資を学び始めた初心者向けの FAQ 型ナレッジ検索アプリです。

PER・PBR・NISA・配当利回りなどの基本用語をすばやく検索し、FAQ形式で理解できます。

## 概要

Stockwise は、投資初心者が株式投資の基礎知識を検索・確認するためのアプリです。

ユーザーは検索欄にキーワードを入力することで、株式投資に関する基本用語や考え方を確認できます。  
また、カテゴリフィルターを使って、株価指標・企業分析・NISA・リスク管理などのテーマ別にFAQを絞り込めます。

## 主な機能

- React + TypeScript によるFAQ検索UI
- 投資初心者向けのFAQデータ
- キーワード検索
- カテゴリフィルター
- 検索結果0件時の空状態表示
- 出典URL・更新日を含む構造化FAQデータ
- 検索ロジックを `utils` に分離した構成

## 使用技術

- React
- TypeScript
- Vite
- CSS
- ESLint

## ディレクトリ構成

```txt
src/
├── data/
│   └── faqs.ts
├── utils/
│   └── searchFaqs.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 主要な実装内容

### FAQデータ

FAQデータは、TypeScriptの型を使って構造化しています。

```ts
export type FAQ = {
  id: number;
  term: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  sourceUrls: string[];
  sourceNote: string;
  updatedAt: string;
};
```

この構成により、用語・質問・回答・カテゴリ・タグ・出典情報を一貫した形で管理できます。

### 検索ロジック

検索処理はUIから分離し、`src/utils/searchFaqs.ts` にまとめています。

```ts
searchFaqs(faqs, searchText);
```

これにより、画面表示を担当する `App.tsx` と、検索処理を担当する `searchFaqs.ts` の役割を分けています。  
今後、検索精度の改善やランキング処理を追加しやすい構成にしています。

## 開発方法

依存関係をインストールします。

```bash
npm install
```

開発サーバーを起動します。

```bash
npm run dev
```

本番用にビルドします。

```bash
npm run build
```

ビルド結果を確認します。

```bash
npm run preview
```

## 現在の実装状況

現在、以下の機能を実装しています。

- React + TypeScript の初期構成
- FAQデータの作成
- キーワード検索
- カテゴリフィルター
- 基本的なレスポンシブUI
- 検索結果が0件の場合の表示
- 検索ロジックの分離

## 今後の改善予定

- コンポーネント分割
- 検索結果の並び順改善
- ブル・ベア解説カードの追加
- 用語ごとの図解表示
- GitHub Pagesへのデプロイ
- ポートフォリオサイトへの掲載

## 制作目的

このプロジェクトは、学習目的を兼ねたポートフォリオ制作物です。

単に動くアプリを作るだけでなく、以下を自分で理解し、説明できる状態を目指しています。

- Reactの状態管理
- `map` を使った一覧表示
- 検索フィルタリングの仕組み
- TypeScriptによるデータ構造の管理
- UIとロジックの分離
- GitHubを使った開発履歴の管理

## 注意事項

Stockwise は学習目的のアプリです。  
掲載している内容は投資助言ではありません。  
特定の金融商品の購入・売却を推奨するものではありません。
