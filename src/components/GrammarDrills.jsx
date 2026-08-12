import { useState, useEffect } from "react";
import { LEVELS } from "../data.js";
import { GRAMMAR_DRILLS, GRAMMAR_TIPS } from "../grammarData.js";

export default function GrammarDrills({ levelIdx, onBack, onComplete }) {
  const level = LEVELS[levelIdx]?.code || "A1";
  const [drills] = useState(() => {
    const all = GRAMMAR_DRILLS[level] || GRAMMAR_DRILLS.A1;
    return all.sort(() => Math.random() - 0.5).slice(0, 10);
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  const current = drills[currentQ];
  const total = drills.length;

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
  }, [currentQ]);

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const correct = idx === current.correct;
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const xp = newStreak >= 5 ? 20 : newStreak >= 3 ? 15 : 10;
      setScore(s => s + xp);
      setXpEarned(x => x + xp);
    } else {
      setStreak(0);
      setScore(s => s + 2);
    }
  };

  const nextQuestion = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
    } else {
      const finalScore = Math.round((score / (total * 10)) * 100);
      onComplete(Math.min(finalScore, 100), xpEarned);
    }
  };

  const typeIcon = {
    article: "📛", verb: "🔄", sentence: "🧱", negation: "❌",
    plural: "👥", preposition: "📍", modal: "🎛️", perfekt: "⏮️",
    separable: "🔗", comparative: "📊", dative: "📍", accusative: "📍",
    adjective: "📝", konjunktion: "🧩", passiv: "🎭", relativ: "🔗",
    konj2: "💭", nebensatz: "🧩", partizip: "📝", infinitive: "🔄",
    nomen: "📝", nominal: "📝", stil: "✒️"
  };

  return (
    <div className="grammar-drills">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="grammar-header">
        <h2>📝 Grammar Drills — تدريبات قواعد</h2>
        <div className="grammar-level">{level}</div>
      </div>

      <div className="grammar-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
        </div>
        <span>{currentQ + 1}/{total}</span>
      </div>

      <div className="grammar-stats">
        <span className="stat">✅ {score} نقطة</span>
        <span className="stat">🔥 {streak} متتالية</span>
      </div>

      <div className="grammar-content">
        <div className="drill-type">
          <span className="type-icon">{typeIcon[current.type] || "📝"}</span>
          <span className="type-name">{current.type}</span>
        </div>

        <div className="drill-question">
          <div className="de-sentence">{current.de}</div>
          <div className="ar-sentence">{current.ar}</div>
        </div>

        <div className="drill-options">
          {current.options.map((opt, i) => (
            <button
              key={i}
              className={`drill-option ${
                showResult
                  ? i === current.correct
                    ? "correct"
                    : i === selected
                    ? "wrong"
                    : ""
                  : selected === i
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleSelect(i)}
              disabled={showResult}
            >
              <span className="option-letter">{["أ", "ب", "ج", "د"][i]}</span>
              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`drill-explanation ${selected === current.correct ? "correct" : "wrong"}`}>
            <div className="explanation-icon">{selected === current.correct ? "✅" : "❌"}</div>
            <div className="explanation-text">{current.explanation}</div>
            <div className="grammar-tip">
              <span className="tip-icon">💡</span>
              <span>{GRAMMAR_TIPS[current.type] || ""}</span>
            </div>
            <button className="btn-next" onClick={nextQuestion}>
              {currentQ < total - 1 ? "السؤال التالي →" : "إنهاء"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
