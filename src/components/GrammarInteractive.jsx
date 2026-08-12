import { useState } from "react";
import { speakGerman } from "../speech.js";

const QUESTIONS = [
  {
    sentence: "___ Mann ist groß.",
    highlight: 0,
    options: ["Der", "Die", "Das", "Den"],
    correct: 0,
    explanation: "der Mann - maskulin Nominativ"
  },
  {
    sentence: "___ Frau ist nett.",
    highlight: 0,
    options: ["Der", "Die", "Das", "Dem"],
    correct: 1,
    explanation: "die Frau - feminin Nominativ"
  },
  {
    sentence: "___ Kind spielt.",
    highlight: 0,
    options: ["Der", "Die", "Das", "Den"],
    correct: 2,
    explanation: "das Kind - neutral Nominativ"
  },
  {
    sentence: "Ich gebe ___ Mann das Buch.",
    highlight: 2,
    options: ["der", "die", "das", "dem"],
    correct: 3,
    explanation: "dem Mann - Dativ maskulin"
  },
  {
    sentence: "Ich sehe ___ Frau.",
    highlight: 2,
    options: ["der", "die", "das", "den"],
    correct: 1,
    explanation: "die Frau - Akkusativ feminin bleibt 'die'"
  },
  {
    sentence: "___ Buch ist interessant.",
    highlight: 0,
    options: ["Der", "Die", "Das", "Ein"],
    correct: 2,
    explanation: "das Buch - neutral Nominativ"
  },
  {
    sentence: "Wir fahren mit ___ Auto.",
    highlight: 3,
    options: ["der", "die", "das", "dem"],
    correct: 3,
    explanation: "dem Auto - Dativ neutral"
  },
  {
    sentence: "Er hilft ___ Kind.",
    highlight: 3,
    options: ["der", "die", "das", "den"],
    correct: 2,
    explanation: "das Kind - Akkusativ neutral bleibt 'das'"
  },
  {
    sentence: "___ Kinder spielen draußen.",
    highlight: 0,
    options: ["Der", "Die", "Das", "Dem"],
    correct: 1,
    explanation: "die Kinder - Plural Nominativ"
  },
  {
    sentence: "Ich kaufe ___ Hund.",
    highlight: 2,
    options: ["der", "die", "das", "den"],
    correct: 3,
    explanation: "den Hund - Akkusativ maskulin"
  }
];

export default function GrammarInteractive({ levelIdx, onBack, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const q = QUESTIONS[currentQ];
  const total = QUESTIONS.length;

  const handleSelect = (idx) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    const correct = idx === q.correct;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { q: currentQ, selected: idx, correct: q.correct, isCorrect: correct }]);
  };

  const nextQuestion = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      const finalScore = Math.round((score / total) * 100);
      onComplete(Math.min(finalScore, 100));
    }
  };

  const parts = q.sentence.split("___");

  return (
    <div style={{ padding: "20px 0" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>Grammar Interactive</h2>
          <span style={{ fontSize: 13, color: "var(--text-soft)" }}>{currentQ + 1}/{total}</span>
        </div>

        <div style={{ background: "var(--bg-soft)", borderRadius: 8, height: 6, marginBottom: 20 }}>
          <div style={{ background: "var(--accent, #3b82f6)", height: "100%", borderRadius: 8, width: `${((currentQ + 1) / total) * 100}%`, transition: "width 0.3s" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 700, direction: "ltr", textAlign: "left", marginBottom: 20, lineHeight: 1.6 }}>
            {parts[0]}
            <span style={{ display: "inline-block", minWidth: 80, height: 36, background: "var(--accent, #3b82f6)", color: "#fff", borderRadius: 8, textAlign: "center", lineHeight: "36px", fontSize: 18, margin: "0 4px", verticalAlign: "middle" }}>?</span>
            {parts[1] || ""}
          </div>
          <button onClick={() => speakGerman(q.sentence.replace("___", "________"))} style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 16px", color: "var(--text)", cursor: "pointer", fontSize: 13 }}>
            Listen
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {q.options.map((opt, i) => {
            let bg = "var(--card)";
            let border = "1px solid var(--border)";
            let color = "var(--text)";
            if (showExplanation) {
              if (i === q.correct) { bg = "rgba(16,185,129,0.15)"; border = "2px solid #10b981"; color = "#10b981"; }
              else if (i === selected && i !== q.correct) { bg = "rgba(239,68,68,0.15)"; border = "2px solid #ef4444"; color = "#ef4444"; }
            } else if (i === selected) {
              border = "2px solid var(--accent, #3b82f6)";
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} disabled={showExplanation} style={{ background: bg, border, borderRadius: 12, padding: "14px 10px", fontSize: 17, fontWeight: 600, color, cursor: showExplanation ? "default" : "pointer", transition: "all 0.2s" }}>
                {opt}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div style={{ background: q.options[selected] === q.options[q.correct] ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${selected === q.correct ? "#10b981" : "#ef4444"}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: selected === q.correct ? "#10b981" : "#ef4444" }}>
              {selected === q.correct ? "Correct!" : "Incorrect"}
            </div>
            <div style={{ fontSize: 14, color: "var(--text-soft)" }}>{q.explanation}</div>
            <button onClick={nextQuestion} style={{ marginTop: 12, width: "100%", padding: 12, background: "var(--accent, #3b82f6)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              {currentQ < total - 1 ? "Next Question →" : "See Results"}
            </button>
          </div>
        )}

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {answers.map((a, i) => (
            <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: a.isCorrect ? "#10b981" : "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
