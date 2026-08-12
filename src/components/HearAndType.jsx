import { useState, useRef, useEffect } from "react";
import { speakGerman } from "../speech.js";
import { normalizeGerman } from "../utils.js";

const ROUNDS = 8;

const SENTENCES = [
  "Guten Morgen, wie geht es Ihnen?",
  "Ich möchte einen Kaffee bestellen.",
  "Wo ist der nächste Bahnhof?",
  "Können Sie mir bitte helfen?",
  "Das Wetter ist heute sehr schön.",
  "Ich habe einen Termin um drei Uhr.",
  "Bitte sprechen Sie langsamer.",
  "Wo kann ich ein Taxi finden?",
  "Ich lerne seit zwei Jahren Deutsch.",
  "Können Sie die Rechnung bringen?",
  "Ich komme aus Ägypten.",
  "Mein Lieblingsessen ist Pizza.",
  "Die Bibliothek ist sehr groß.",
  "Ich fahre jeden Tag mit dem Bus.",
  "Haben Sie eine Reservierung?",
  "Ich brauche noch etwas Zeit."
];

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[n];
}

function similarity(a, b) {
  const na = normalizeGerman(a);
  const nb = normalizeGerman(b);
  if (!na || !nb) return 0;
  const dist = levenshtein(na, nb);
  return Math.max(0, Math.round((1 - dist / Math.max(na.length, nb.length)) * 100));
}

export default function HearAndType({ levelIdx, onBack, onComplete }) {
  const [round, setRound] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef(null);

  const shuffled = useRef(SENTENCES.sort(() => Math.random() - 0.5).slice(0, ROUNDS));
  const current = shuffled.current[round];

  const playAudio = () => {
    setIsPlaying(true);
    speakGerman(current, { rate: 0.75, onEnd: () => setIsPlaying(false) });
  };

  useEffect(() => {
    playAudio();
  }, [round]);

  const checkAnswer = () => {
    const sim = similarity(current, userInput);
    setScore(s => s + sim);
    setRoundScores(prev => [...prev, { target: current, said: userInput, sim }]);
    setShowResult(true);
  };

  const nextRound = () => {
    if (round < ROUNDS - 1) {
      setRound(r => r + 1);
      setUserInput("");
      setShowResult(false);
    } else {
      const avg = Math.round(score / ROUNDS);
      onComplete(Math.min(avg, 100));
    }
  };

  const avgScore = roundScores.length > 0 ? Math.round(score / roundScores.length) : 0;

  const getScoreColor = (s) => {
    if (s >= 80) return "#10b981";
    if (s >= 60) return "#f59e0b";
    if (s >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>Hear & Type</h2>
          <span style={{ fontSize: 13, color: "var(--text-soft)" }}>{round + 1}/{ROUNDS}</span>
        </div>

        <div style={{ background: "var(--bg-soft)", borderRadius: 8, height: 6, marginBottom: 20 }}>
          <div style={{ background: "var(--accent, #3b82f6)", height: "100%", borderRadius: 8, width: `${((round + 1) / ROUNDS) * 100}%`, transition: "width 0.3s" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 15, color: "var(--text-soft)", marginBottom: 12 }}>Type what you hear:</div>
          <button onClick={playAudio} disabled={isPlaying} style={{ width: 64, height: 64, borderRadius: "50%", background: isPlaying ? "var(--bg-soft)" : "var(--accent, #3b82f6)", border: "none", color: isPlaying ? "var(--text-soft)" : "#fff", fontSize: 24, cursor: isPlaying ? "default" : "pointer", marginBottom: 16 }}>
            {isPlaying ? "..." : "Play"}
          </button>

          {!showResult ? (
            <div>
              <input ref={inputRef} type="text" value={userInput} onChange={e => setUserInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && userInput.trim()) checkAnswer(); }} placeholder="Type here..." style={{ width: "100%", padding: 14, background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text)", fontSize: 16, outline: "none", marginBottom: 12, boxSizing: "border-box", direction: "ltr", textAlign: "left" }} autoFocus />
              <button onClick={checkAnswer} disabled={!userInput.trim()} style={{ width: "100%", padding: 12, background: userInput.trim() ? "var(--accent, #3b82f6)" : "var(--bg-soft)", color: userInput.trim() ? "#fff" : "var(--text-soft)", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: userInput.trim() ? "pointer" : "default" }}>
                Check
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 80, height: 80, borderRadius: "50%", border: `4px solid ${getScoreColor(roundScores[roundScores.length - 1].sim)}`, marginBottom: 12 }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: getScoreColor(roundScores[roundScores.length - 1].sim) }}>{roundScores[roundScores.length - 1].sim}%</span>
              </div>
              <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 8 }}>Correct answer:</div>
              <div style={{ fontSize: 18, fontWeight: 700, direction: "ltr", marginBottom: 16 }}>{current}</div>
              <button onClick={nextRound} style={{ width: "100%", padding: 12, background: "var(--accent, #3b82f6)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                {round < ROUNDS - 1 ? "Next →" : "See Results"}
              </button>
            </div>
          )}
        </div>

        {roundScores.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {roundScores.map((r, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: getScoreColor(r.sim), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>
                {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
