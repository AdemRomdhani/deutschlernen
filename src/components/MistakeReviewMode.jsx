import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

function loadMistakes() {
  try { return JSON.parse(localStorage.getItem("mistakeTracker") || "[]"); } catch { return []; }
}

function saveMistakes(data) {
  localStorage.setItem("mistakeTracker", JSON.stringify(data));
}

export default function MistakeReviewMode({ onBack }) {
  const [mistakes, setMistakes] = useState(loadMistakes);
  const [mode, setMode] = useState("list");
  const [quizIdx, setQuizIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState({});
  const [masteredWords, setMasteredWords] = useState([]);

  useEffect(() => { saveMistakes(mistakes); }, [mistakes]);

  const remaining = mistakes.filter(m => !masteredWords.includes(m.de));

  const startQuiz = () => {
    if (remaining.length === 0) return;
    setMode("quiz");
    setQuizIdx(0);
    setShowAnswer(false);
    setSelected(null);
  };

  const generateOptions = (word) => {
    const wrongOptions = mistakes
      .filter(m => m.de !== word.de)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(m => m.ar);
    const options = [...wrongOptions, word.ar].sort(() => Math.random() - 0.5);
    return options;
  };

  const current = remaining[quizIdx % remaining.length];
  const options = current ? generateOptions(current) : [];

  const handleSelect = (ar) => {
    if (showAnswer) return;
    setSelected(ar);
    setShowAnswer(true);

    if (ar === current.ar) {
      const newCount = (correctCount[current.de] || 0) + 1;
      setCorrectCount(prev => ({ ...prev, [current.de]: newCount }));
      if (newCount >= 3) {
        setMasteredWords(prev => [...prev, current.de]);
        setMistakes(prev => prev.filter(m => m.de !== current.de));
      }
    }
  };

  const nextQuestion = () => {
    if (quizIdx < remaining.length - 1) {
      setQuizIdx(i => i + 1);
      setShowAnswer(false);
      setSelected(null);
    } else {
      setMode("list");
    }
  };

  if (mode === "quiz" && current) {
    return (
      <div style={{ padding: "20px 0" }}>
        <button onClick={() => setMode("list")} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 20 }}>Mistake Review Quiz</h2>
            <span style={{ fontSize: 13, color: "var(--text-soft)" }}>{quizIdx + 1}/{remaining.length}</span>
          </div>

          <div style={{ background: "var(--bg-soft)", borderRadius: 8, height: 6, marginBottom: 20 }}>
            <div style={{ background: "var(--accent, #3b82f6)", height: "100%", borderRadius: 8, width: `${((quizIdx + 1) / remaining.length) * 100}%`, transition: "width 0.3s" }} />
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 800, direction: "ltr", marginBottom: 6 }}>{current.de}</div>
            <div style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 4 }}>{current.pron || ""}</div>
            <button onClick={() => speakGerman(current.de)} style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 16px", color: "var(--text)", cursor: "pointer", fontSize: 13, marginTop: 8 }}>
              Listen
            </button>
          </div>

          <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 10, textAlign: "center" }}>Pick the correct Arabic meaning:</div>
          <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
            {options.map((opt, i) => {
              let bg = "var(--card)";
              let border = "1px solid var(--border)";
              let color = "var(--text)";
              if (showAnswer) {
                if (opt === current.ar) { bg = "rgba(16,185,129,0.15)"; border = "2px solid #10b981"; color = "#10b981"; }
                else if (opt === selected && opt !== current.ar) { bg = "rgba(239,68,68,0.15)"; border = "2px solid #ef4444"; color = "#ef4444"; }
              }
              return (
                <button key={i} onClick={() => handleSelect(opt)} disabled={showAnswer} style={{ background: bg, border, borderRadius: 12, padding: "14px 16px", fontSize: 16, fontWeight: 600, color, cursor: showAnswer ? "default" : "pointer", textAlign: "left", transition: "all 0.2s" }}>
                  {opt}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div>
              {selected === current.ar ? (
                <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid #10b981", borderRadius: 12, padding: 14, marginBottom: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#10b981" }}>Correct!</div>
                  <div style={{ fontSize: 13, color: "var(--text-soft)" }}>
                    {correctCount[current.de] || 0}/3 correct to master
                  </div>
                </div>
              ) : (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", borderRadius: 12, padding: 14, marginBottom: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#ef4444" }}>Incorrect</div>
                  <div style={{ fontSize: 14, color: "var(--text)" }}>{current.de} = {current.ar}</div>
                </div>
              )}
              <button onClick={nextQuestion} style={{ width: "100%", padding: 12, background: "var(--accent, #3b82f6)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                {quizIdx < remaining.length - 1 ? "Next →" : "Finish Quiz"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 22 }}>Mistake Review Mode</h2>

        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--text-soft)" }}>Mastered</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#10b981" }}>{masteredWords.length}</div>
          </div>
          <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--text-soft)" }}>Remaining</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f59e0b" }}>{remaining.length}</div>
          </div>
        </div>

        {remaining.length > 0 ? (
          <button onClick={startQuiz} style={{ width: "100%", padding: 14, background: "var(--accent, #3b82f6)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}>
            Start Quiz ({remaining.length} words)
          </button>
        ) : (
          <div style={{ textAlign: "center", padding: 40, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>All mastered!</div>
            <div style={{ color: "var(--text-soft)" }}>No more mistake words to review.</div>
          </div>
        )}

        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-soft)", marginBottom: 10 }}>Mistake Words ({mistakes.length}):</div>
        {mistakes.length === 0 ? (
          <div style={{ textAlign: "center", padding: 30, color: "var(--text-soft)" }}>No mistakes recorded yet.</div>
        ) : (
          mistakes.map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: masteredWords.includes(m.de) ? "rgba(16,185,129,0.1)" : "var(--card)", border: `1px solid ${masteredWords.includes(m.de) ? "#10b981" : "var(--border)"}`, borderRadius: 12, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, direction: "ltr" }}>{m.de}</div>
                <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{m.ar}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: masteredWords.includes(m.de) ? "#10b981" : "#f59e0b" }}>
                  {correctCount[m.de] || 0}/3
                </span>
                <button onClick={() => speakGerman(m.de)} style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px", color: "var(--text)", cursor: "pointer", fontSize: 12 }}>
                  🔊
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
