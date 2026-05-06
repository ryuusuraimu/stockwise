import { useState } from "react";
import "./App.css";
import { faqs } from "./data/faqs";

function App() {
  const [searchText, setSearchText] = useState(""); // 検索キーワードの状態を管理・Reactが覚えるための箱

  const filteredFaqs = faqs.filter((faq) => {
    const keyword = searchText.toLowerCase();

    return (
      faq.term.toLowerCase().includes(keyword) ||
      faq.question.toLowerCase().includes(keyword) ||
      faq.answer.toLowerCase().includes(keyword) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(keyword))
    );
  });

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
      </section>

      <section className="results">
        <p className="resultCount">{filteredFaqs.length}件のFAQ</p>

        <div className="faqList">
          {filteredFaqs.map((faq) => (
            <article className="faqCard" key={faq.id}>
              <p className="term">{faq.term}</p>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>

              <div className="tags">
                {faq.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
