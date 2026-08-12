import { useState, useRef, useEffect } from "react";
import { speakGerman } from "../speech.js";
import { normalizeGerman } from "../utils.js";

const SENTENCES = [
  "Guten Morgen, wie geht es Ihnen?",
  "Ich möchte einen Kaffee bestellen.",
  "Wo ist der nächste Bahnhof?",
  "Können Sie mir bitte helfen?",
  "Das Wetter ist heute sehr schön."
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

export default function SpeakingShadowAdvanced({ levelIdx, onBack, onComplete }) {
  const [round, setRound] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [timingBars, setTimingBars] = useState([]);
  const recognitionRef = useRef(null);
  const intervalRef = useRef(null);

  const current = SENTENCES[round];
  const total = SENTENCES.length;
  const words = current.split(" ");

  useEffect(() => () => {
    recognitionRef.current?.stop();
    clearInterval(intervalRef.current);
  }, []);

  const playAndRecord = () => {
    setIsPlaying(true);
    setShowResult(false);
    setTranscript("");
    setTimingBars([]);

    words.forEach((_, i) => {
      setTimeout(() => {
        setTimingBars(prev => [...prev, i]);
      }, (i / words.length) * 3000);
    });

    speakGerman(current, { rate: 0.7, onEnd: () => {
      setIsPlaying(false);
      startRecording();
    }});
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
      finishRound(text);
    };
    rec.onerror = () => finishRound("");
    rec.onend = () => setIsRecording(false);
    recognitionRef.current = rec;
    rec.start();
    setIsRecording(true);
  };

  const finishRound = (text) => {
    setTranscript(text);
    setIsRecording(false);
    const sim = similarity(current, text);
    setScore(s => s + sim);
    setRoundScores(prev => [...prev, { target: current, said: text, sim }]);
    setShowResult(true);
  };

  const nextRound = () => {
    if (round < total - 1) {
      setRound(r => r + 1);
      setShowResult(false);
      setTranscript("");
      setTimingBars([]);
    } else {
      const avg = Math.round(score / total);
      onComplete(Math.min(avg, 100));
    }
  };

  const avgScore = roundScores.length > 0 ? Math.round(score / roundScores.length) : 0;
  const lastSim = roundScores.length > 0 ? roundScores[roundScores.length - 1].sim : 0;

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
          <h2 style={{ margin: 0, fontSize: 20 }}>Speaking Shadow Advanced</h2>
          <span style={{ fontSize: 13, color: "var(--text-soft)" }}>{round + 1}/{total}</span>
        </div>

        <div style={{ background: "var(--bg-soft)", borderRadius: 8, height: 6, marginBottom: 20 }}>
          <div style={{ background: "var(--accent, #3b82f6)", height: "100%", borderRadius: 8, width: `${((round + 1) / total) * 100}%`, transition: "width 0.3s" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "var(--text-soft)", marginBottom: 8 }}>Listen and shadow:</div>
          <div style={{ fontSize: 20, fontWeight: 700, direction: "ltr", textAlign: "left", marginBottom: 16, lineHeight: 1.5 }}>
            {words.map((w, i) => (
              <span key={i} style={{ display: "inline-block", marginRight: 8, padding: "2px 6px", borderRadius: 6, background: timingBars.includes(i) ? "rgba(59,130,246,0.2)" : "transparent", color: timingBars.includes(i) ? "var(--accent, #3b82f6)" : "var(--text)", transition: "all 0.3s" }}>
                {w}
              </span>
            ))}
          </div>

          {!showResult && !isPlaying && !isRecording && (
            <button onClick={playAndRecord} style={{ width: "100%", padding: 14, background: "var(--accent, #3b82f6)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              Start Shadowing
            </button>
          )}

          {(isPlaying || isRecording) && (
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block", width: 12, height: 12, borderRadius: "50%", background: isRecording ? "#ef4444" : "#3b82f6", marginRight: 8, animation: "pulse 1s infinite" }} />
              <span style={{ fontSize: 14, color: "var(--text-soft)" }}>{isPlaying ? "Listening..." : "Now speak!"}</span>
            </div>
          )}
        </div>

        {showResult && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text-soft)" }}>Confidence</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: getScoreColor(lastSim) }}>{lastSim}%</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text-soft)" }}>Average</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{avgScore}%</div>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "var(--text-soft)", marginBottom: 4 }}>Original:</div>
              <div style={{ fontSize: 16, fontWeight: 600, direction: "ltr", textAlign: "left" }}>{current}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--text-soft)", marginBottom: 4 }}>You said:</div>
              <div style={{ fontSize: 16, fontWeight: 600, direction: "ltr", textAlign: "left", color: lastSim >= 80 ? "#10b981" : lastSim >= 60 ? "#f59e0b" : "#ef4444" }}>{transcript || "(no result)"}</div>
            </div>

            <button onClick={nextRound} style={{ width: "100%", padding: 12, background: "var(--accent, #3b82f6)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              {round < total - 1 ? "Next Sentence →" : "See Results"}
            </button>
          </div>
        )}

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
