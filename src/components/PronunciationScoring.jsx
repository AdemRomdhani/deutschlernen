import { useState, useRef, useEffect } from "react";
import { speakGerman } from "../speech.js";
import { normalizeGerman } from "../utils.js";

const ROUNDS = 8;

const WORDS = [
  { de: "Guten Morgen", ar: "صباح الخير" },
  { de: "Wie geht es Ihnen?", ar: "كيف حالك؟" },
  { de: "Ich möchte einen Kaffee", ar: "أريد قهوة" },
  { de: "Wo ist der Bahnhof?", ar: "أين محطة القطار؟" },
  { de: "Können Sie mir helfen?", ar: "هل يمكنك مساعدتي؟" },
  { de: "Das Wetter ist schön", ar: "الطقس جميل" },
  { de: "Ich habe Hunger", ar: "أنا جائع" },
  { de: "Bitte sprechen Sie langsamer", ar: "من فضلك تكلم أبطأ" },
  { de: "Wo ist die Toilette?", ar: "أين الحمام؟" },
  { de: "Danke für Ihre Hilfe", ar: "شكراً لمساعدتك" },
  { de: "Ich komme aus Ägypten", ar: "أنا من مصر" },
  { de: "Wie viel kostet das?", ar: "بكم هذا؟" },
  { de: "Ich verstehe nicht", ar: "لا أفهم" },
  { de: "Können Sie das wiederholen?", ar: "هل يمكنك تكرار ذلك؟" },
  { de: "Ich lerne Deutsch", ar: "أنا أتعلم الألمانية" },
  { de: "Mein Name ist Ahmed", ar: "اسمي أحمد" },
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

export default function PronunciationScoring({ levelIdx, onBack, onComplete }) {
  const [round, setRound] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [roundScores, setRoundScores] = useState([]);
  const recognitionRef = useRef(null);

  const shuffled = useRef(WORDS.sort(() => Math.random() - 0.5).slice(0, ROUNDS));
  const current = shuffled.current[round];

  useEffect(() => () => { recognitionRef.current?.stop(); }, []);

  const getScoreColor = (s) => {
    if (s >= 80) return "#10b981";
    if (s >= 60) return "#f59e0b";
    if (s >= 40) return "#f97316";
    return "#ef4444";
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return "Excellent";
    if (s >= 60) return "Good";
    if (s >= 40) return "Fair";
    return "Keep trying";
  };

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "de-DE";
    rec.continuous = false;
    rec.interimResults = false;

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      const sim = similarity(current.de, text);
      setScore(s => s + sim);
      setRoundScores(prev => [...prev, { target: current.de, said: text, sim }]);
      setShowResult(true);
      setIsRecording(false);
    };
    rec.onerror = () => {
      setTranscript("");
      setRoundScores(prev => [...prev, { target: current.de, said: "(no result)", sim: 0 }]);
      setShowResult(true);
      setIsRecording(false);
    };
    rec.onend = () => setIsRecording(false);
    recognitionRef.current = rec;
    rec.start();
    setIsRecording(true);
    setTranscript("");
    setShowResult(false);
  };

  const nextRound = () => {
    if (round < ROUNDS - 1) {
      setRound(r => r + 1);
      setTranscript("");
      setShowResult(false);
    } else {
      const avg = Math.round(score / ROUNDS);
      onComplete(Math.min(avg, 100));
    }
  };

  const avgScore = roundScores.length > 0 ? Math.round(score / roundScores.length) : 0;

  if (showResult) {
    const last = roundScores[roundScores.length - 1];
    return (
      <div style={{ padding: "20px 0" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 4 }}>Round {round + 1}/{ROUNDS}</div>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 100, height: 100, borderRadius: "50%", border: `4px solid ${getScoreColor(last.sim)}`, background: "var(--card)" }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: getScoreColor(last.sim) }}>{last.sim}%</div>
                <div style={{ fontSize: 10, color: "var(--text-soft)" }}>{getScoreLabel(last.sim)}</div>
              </div>
            </div>
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 18, marginBottom: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "var(--text-soft)", marginBottom: 4 }}>Target:</div>
              <div style={{ fontSize: 20, fontWeight: 700, direction: "ltr", textAlign: "left" }}>{current.de}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "var(--text-soft)", marginBottom: 4 }}>You said:</div>
              <div style={{ fontSize: 18, fontWeight: 600, direction: "ltr", textAlign: "left", color: last.sim >= 80 ? "#10b981" : last.sim >= 60 ? "#f59e0b" : "#ef4444" }}>{last.said || "(no result)"}</div>
            </div>
            <button onClick={() => speakGerman(current.de)} style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 16px", color: "var(--text)", cursor: "pointer", fontSize: 13 }}>
              Listen again
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--text-soft)" }}>Round Score</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: getScoreColor(last.sim) }}>{last.sim}%</div>
            </div>
            <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--text-soft)" }}>Total Avg</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{avgScore}%</div>
            </div>
          </div>

          <button onClick={nextRound} style={{ width: "100%", padding: 14, background: "var(--accent, #3b82f6)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
            {round < ROUNDS - 1 ? "Next Round →" : "See Results"}
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
          <h2 style={{ margin: 0, fontSize: 20 }}>Pronunciation Scoring</h2>
          <span style={{ fontSize: 13, color: "var(--text-soft)" }}>{round + 1}/{ROUNDS}</span>
        </div>

        <div style={{ background: "var(--bg-soft)", borderRadius: 8, height: 6, marginBottom: 20 }}>
          <div style={{ background: "var(--accent, #3b82f6)", height: "100%", borderRadius: 8, width: `${((round + 1) / ROUNDS) * 100}%`, transition: "width 0.3s" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, direction: "ltr", marginBottom: 6 }}>{current.de}</div>
          <div style={{ fontSize: 15, color: "var(--text-soft)", marginBottom: 16 }}>{current.ar}</div>
          <button onClick={() => speakGerman(current.de, { rate: 0.75 })} style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 20px", color: "var(--text)", cursor: "pointer", fontSize: 14 }}>
            Listen
          </button>
        </div>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          {!isRecording ? (
            <button onClick={startRecording} style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", boxShadow: "0 4px 20px rgba(239,68,68,0.3)" }}>
              Mic
            </button>
          ) : (
            <button onClick={() => recognitionRef.current?.stop()} style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #6b7280, #4b5563)", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", animation: "pulse 1.5s infinite" }}>
              Stop
            </button>
          )}
          <div style={{ fontSize: 13, color: "var(--text-soft)", marginTop: 8 }}>{isRecording ? "Listening..." : "Tap to record"}</div>
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
