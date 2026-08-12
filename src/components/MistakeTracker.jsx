import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

function loadMistakes() {
  try { return JSON.parse(localStorage.getItem("mistakeTracker") || "[]"); } catch { return []; }
}

export default function MistakeTracker({ onBack }) {
  const [mistakes, setMistakes] = useState(loadMistakes);
  const [filter, setFilter] = useState("all");
  const [retryMode, setRetryMode] = useState(false);
  const [retryIdx, setRetryIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mastered, setMastered] = useState([]);

  useEffect(() => { localStorage.setItem("mistakeTracker", JSON.stringify(mistakes)); }, [mistakes]);

  const groups = {};
  mistakes.forEach(m => {
    const cat = m.category || "عام";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(m);
  });

  const filtered = filter === "all" ? mistakes : (groups[filter] || []);

  const removeMastered = (idx) => {
    const item = filtered[idx];
    setMistakes(prev => prev.filter(m => m.de !== item.de));
  };

  const startRetry = () => {
    setRetryMode(true);
    setRetryIdx(0);
    setShowAnswer(false);
  };

  if (retryMode && filtered.length > 0) {
    const word = filtered[retryIdx % filtered.length];
    return (
      <div style={{ padding: "20px 0" }}>
        <button className="back-btn" onClick={() => setRetryMode(false)}>← رجوع</button>
        <div className="game-head">
          <h2>🔄 مراجعة الكلمات الخاطئة</h2>
          <div className="game-score"><span>{retryIdx + 1}/{filtered.length}</span></div>
        </div>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div className="tf-card" style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-la)", fontWeight: 800, fontSize: 36, direction: "ltr", marginBottom: 12 }}>{word.de}</div>
            <button className="speak-btn" onClick={() => speakGerman(word.de)}>🔊 استمع</button>
            {!showAnswer ? (
              <div style={{ marginTop: 16 }}>
                <button className="btn btn-primary" onClick={() => setShowAnswer(true)}>إظهار الإجابة</button>
              </div>
            ) : (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{word.ar}</div>
                <div style={{ color: "var(--text-soft)", fontSize: 14 }}>الإجابة الصحيحة: <strong>{word.correct || word.de}</strong></div>
                {word.wrong && <div style={{ color: "#ef4444", fontSize: 13 }}>إجابتك: {word.wrong}</div>}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
                  <button className="btn btn-ghost" onClick={() => { removeMastered(retryIdx % filtered.length); setRetryIdx(i => i + 1); setShowAnswer(false); }} style={{ color: "#22c55e" }}>✅ حُذفت</button>
                  <button className="btn btn-primary" onClick={() => { setRetryIdx(i => i + 1); setShowAnswer(false); }}>التالي →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>
      <div className="game-head">
        <h2>⚠️ متتبع الأخطاء — Mistake Tracker</h2>
        <p>الكلمات التي أخطأت فيها سابقاً</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button className={`tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>الكل ({mistakes.length})</button>
          {Object.entries(groups).map(([cat, words]) => (
            <button key={cat} className={`tab ${filter === cat ? "active" : ""}`} onClick={() => setFilter(cat)}>{cat} ({words.length})</button>
          ))}
        </div>
        {mistakes.length > 0 && (
          <button className="btn btn-primary" onClick={startRetry} style={{ width: "100%", marginBottom: 16 }}>🔄 مراجعة الكل</button>
        )}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h3>لا توجد أخطاء!</h3>
            <p style={{ color: "var(--text-soft)" }}>أحسنت! لا توجد كلمات خاطئة حالياً.</p>
          </div>
        ) : (
          filtered.map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, marginBottom: 10, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-la)", fontWeight: 700, direction: "ltr", fontSize: 17 }}>{m.de}</div>
                <div style={{ color: "var(--text-soft)", fontSize: 14 }}>{m.ar}</div>
                {m.wrong && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 2 }}>إجابتك الخاطئة: {m.wrong}</div>}
                <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 2 }}>{m.category || "عام"}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="speak-btn" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => speakGerman(m.de)}>🔊</button>
                <button className="speak-btn" style={{ padding: "4px 10px", fontSize: 12, color: "#22c55e" }} onClick={() => removeMastered(i)}>✕</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
