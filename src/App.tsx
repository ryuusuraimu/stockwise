import { useState } from "react";
import "./App.css";
import { faqs } from "./data/faqs";
import { searchFaqs } from "./utils/searchFaqs";
import { FAQCard } from "./components/FAQCard";

function App() {
  const [searchText, setSearchText] = useState(""); // 検索キーワードの状態を管理・Reactが覚えるための箱
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const categories = ["すべて", ...new Set(faqs.map((faq) => faq.category))];

  const searchedFaqs = searchFaqs(faqs, searchText);

  const filteredFaqs =
    selectedCategory === "すべて"
      ? searchedFaqs
      : searchedFaqs.filter((faq) => faq.category === selectedCategory);

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Stockwise</p>
        <h1>株式投資の基礎知識を、すばやく検索する。</h1>
        <p className="description">
          PER、PBR、配当利回り、NISAなど、投資初心者がつまずきやすい用語を
          FAQ形式で確認できるナレッジ検索アプリです。
        </p>

        <div className="searchBox">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="例：PER、NISA、配当利回り"
            aria-label="検索キーワード"
          />
        </div>
        <div className="categoryFilter" aria-label="FAQカテゴリ">
          {categories.map((category) => (
            <button
              className={
                selectedCategory === category
                  ? "categoryButton isActive"
                  : "categoryButton"
              }
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="results">
        <p className="resultCount">{filteredFaqs.length}件のFAQ</p>

        {filteredFaqs.length === 0 ? (
          <div className="emptyMessage">
            <p>該当するFAQが見つかりませんでした。</p>
            <p>
              別のキーワードを試すか、カテゴリを「すべて」に戻してみてください。
            </p>
          </div>
        ) : (
          <div className="faqList">
            {filteredFaqs.map((faq) => (
              <FAQCard faq={faq} key={faq.id} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
