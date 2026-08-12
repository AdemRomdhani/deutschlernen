import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  { q: "Wie ___ du?", opts: ["heißt", "heist", "heissen", "heiset"], correct: 0, level: "A1" },
  { q: "Ich ___ aus Ägypten.", opts: ["komme", "kommen", "kommt", "kommst"], correct: 0, level: "A1" },
  { q: "___ ist das?", opts: ["Wer", "Was", "Wie", "Wo"], correct: 1, level: "A1" },
  { q: "Er ___ einen Kaffee.", opts: ["möchte", "möchtest", "möchten", "möchtet"], correct: 0, level: "A1" },
  { q: "Wir ___ im Haus.", opts: ["wohnen", "wohnt", "wohnst", "wohne"], correct: 0, level: "A1" },
  { q: "___ ich Ihnen helfen?", opts: ["Kann", "Könnte", "Darf", "Soll"], correct: 0, level: "A1" },
  { q: "Das ist ___ Buch.", opts: ["ein", "eine", "einen", "einer"], correct: 0, level: "A1" },
  { q: "Sie spricht ___ Deutsch.", opts: ["gut", "gute", "guter", "gutes"], correct: 0, level: "A1" },
  { q: "___ gehen wir ins Kino.", opts: ["Heute", "Heutig", "Heutige", "Heutiges"], correct: 0, level: "A1" },
  { q: "Ich habe ___ Hunger.", opts: ["einen", "ein", "eine", "einer"], correct: 0, level: "A1" },
  { q: "Der Mann ___ das Auto.", opts: ["fährt", "fährt", "fährt", "fährt"], correct: 0, level: "A1" },
  { q: "Wo ist ___下一个词", opts: ["der", "die", "das", "den"], correct: 0, level: "A1" },
  { q: "Ich möchte ___ Bier.", opts: ["ein", "eine", "einen", "einer"], correct: 0, level: "A1" },
  { q: "Er ___ jeden Tag zur Arbeit.", opts: ["geht", "gehst", "geht", "gehen"], correct: 0, level: "A1" },
  { q: "___ kostet das?", opts: ["Wie", "Was", "Wo", "Wer"], correct: 0, level: "A1" },
  { q: "Wir haben ___ Zeit.", opts: ["keine", "kein", "keinen", "keiner"], correct: 0, level: "A2" },
  { q: "Ich bin ___ als gestern.", opts: ["müder", "müde", "müder", "müder"], correct: 0, level: "A2" },
  { q: "Er ist ___ gelaufen.", opts: ["schnell", "schnelle", "schneller", "schnelles"], correct: 0, level: "A2" },
  { q: "Das Buch ist ___ interessant.", opts: ["sehr", "viel", "mehr", "ganz"], correct: 0, level: "A2" },
  { q: "Ich habe ___ verstanden.", opts: ["nichts", "nicht", "kein", "nichts"], correct: 0, level: "A2" },
  { q: "Er sagt, er ___ krank.", opts: ["sei", "ist", "war", "wäre"], correct: 0, level: "B1" },
  { q: "Hätte ich doch mehr ___ gelernt!", opts: ["Deutsch", "deutsche", "deutscher", "deutsches"], correct: 0, level: "B1" },
  { q: "Obwohl er müde war, ___ er weiter.", opts: ["arbeitete", "arbeitet", "arbeiten", "arbeitete"], correct: 0, level: "B1" },
  { q: "Das ist der Mann, ___ ich getroffen habe.", opts: ["den", "der", "dem", "dessen"], correct: 0, level: "B1" },
  { q: "Ich würde gern ___ Reise machen.", opts: ["eine", "ein", "einen", "einer"], correct: 0, level: "B1" },
  { q: "Er hätte das nicht ___ sollen.", opts: ["tun", "machen", "sagen", "gehen"], correct: 0, level: "B2" },
  { q: "Die Regierung ___ neue Maßnahmen beschlossen.", opts: ["hat", "haben", "hatte", "haben"], correct: 0, level: "B2" },
  { q: "Es wurde viel ___ dem Thema diskutiert.", opts: ["über", "von", "aus", "mit"], correct: 0, level: "B2" },
  { q: "Der Vertrag ___ bereits unterschrieben.", opts: ["wurde", "wurden", "worden", "wird"], correct: 0, level: "B2" },
  { q: "Hätte ich das gewusst, ___ ich anders gehandelt.", opts: ["hätte", "hatte", "haben", "hätten"], correct: 0, level: "C1" }
];

const TIME_PER_Q = 30;

export default function PlacementTest({ onBack, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  const q = QUESTIONS[currentQ];
  const total = QUESTIONS.length;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return TIME_PER_Q;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQ]);

  const handleTimeout = () => {
    setAnswers(prev => [...prev, { selected: -1, correct: q.correct, isCorrect: false, level: q.level }]);
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setTimeLeft(TIME_PER_Q);
      setSelected(null);
    } else {
      finishTest();
    }
  };

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    clearInterval(timerRef.current);
    const isCorrect = idx === q.correct;
    setAnswers(prev => [...prev, { selected: idx, correct: q.correct, isCorrect, level: q.level }]);

    setTimeout(() => {
      if (currentQ < total - 1) {
        setCurrentQ(c => c + 1);
        setTimeLeft(TIME_PER_Q);
        setSelected(null);
      } else {
        finishTest();
      }
    }, 800);
  };

  const finishTest = () => {
    setFinished(true);
    clearInterval(timerRef.current);
  };

  if (finished) {
    const correct = answers.filter(a => a.isCorrect).length;
    const pct = Math.round((correct / total) * 100);

    const levelCounts = {};
    answers.forEach(a => {
      if (!levelCounts[a.level]) levelCounts[a.level] = { correct: 0, total: 0 };
      levelCounts[a.level].total += 1;
      if (a.isCorrect) levelCounts[a.level].correct += 1;
    });

    let recommended = "A1";
    if (levelCounts.A1 && levelCounts.A1.correct / levelCounts.A1.total >= 0.7) {
      recommended = "A2";
      if (levelCounts.A2 && levelCounts.A2.correct / levelCounts.A2.total >= 0.7) {
        recommended = "B1";
        if (levelCounts.B1 && levelCounts.B1.correct / levelCounts.B1.total >= 0.7) {
          recommended = "B2";
          if (levelCounts.B2 && levelCounts.B2.correct / levelCounts.B2.total >= 0.7) {
            recommended = "C1";
          }
        }
      }
    }

    return (
      <div style={{ padding: "20px 0" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>Test Complete</div>
          <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 8 }}>{pct}%</div>
          <div style={{ fontSize: 15, color: "var(--text-soft)", marginBottom: 8 }}>{correct}/{total} correct</div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 4 }}>Recommended Level</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "var(--accent, #3b82f6)" }}>{recommended}</div>
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 16, marginBottom: 20, textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, textAlign: "center" }}>Results by Level</div>
            {Object.entries(levelCounts).map(([level, data]) => (
              <div key={level} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 600 }}>{level}</span>
                <span style={{ color: "var(--text-soft)" }}>{data.correct}/{data.total}</span>
              </div>
            ))}
          </div>

          <button onClick={() => onComplete(pct)} style={{ width: "100%", padding: 14, background: "var(--accent, #3b82f6)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
            Start Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>Placement Test</h2>
          <span style={{ fontSize: 13, color: "var(--text-soft)" }}>{currentQ + 1}/{total}</span>
        </div>

        <div style={{ background: "var(--bg-soft)", borderRadius: 8, height: 6, marginBottom: 10 }}>
          <div style={{ background: "var(--accent, #3b82f6)", height: "100%", borderRadius: 8, width: `${((currentQ + 1) / total) * 100}%`, transition: "width 0.3s" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{q.level}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: timeLeft <= 10 ? "#ef4444" : "var(--bg-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: timeLeft <= 10 ? "#fff" : "var(--text)" }}>
              {timeLeft}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-soft)" }}>sec</div>
          </div>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 700, direction: "ltr", textAlign: "left", marginBottom: 20 }}>{q.q}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {q.opts.map((opt, i) => {
              let bg = "var(--bg-soft)";
              let border = "1px solid var(--border)";
              let color = "var(--text)";
              if (selected !== null) {
                if (i === q.correct) { bg = "rgba(16,185,129,0.15)"; border = "2px solid #10b981"; color = "#10b981"; }
                else if (i === selected && i !== q.correct) { bg = "rgba(239,68,68,0.15)"; border = "2px solid #ef4444"; color = "#ef4444"; }
              }
              return (
                <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null} style={{ background: bg, border, borderRadius: 12, padding: "14px 10px", fontSize: 16, fontWeight: 600, color, cursor: selected !== null ? "default" : "pointer", transition: "all 0.2s" }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
          {answers.map((a, i) => (
            <div key={i} style={{ width: 20, height: 20, borderRadius: "50%", background: a.isCorrect ? "#10b981" : "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff" }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
