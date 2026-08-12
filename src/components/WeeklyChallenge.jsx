import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

const GAMES = [
  { id: "vocab", name: "مفردات", icon: "📚", color: "#3b82f6" },
  { id: "listening", name: "استماع", icon: "🎧", color: "#8b5cf6" },
  { id: "grammar", name: "قواعد", icon: "✍️", color: "#10b981" },
  { id: "reading", name: "قراءة", icon: "📖", color: "#f59e0b" },
  { id: "speaking", name: "تحدث", icon: "🗣️", color: "#ef4444" },
];

function getWeekKey() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  return start.toISOString().slice(0, 10);
}

function getLastWeekKey() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() - 6);
  return start.toISOString().slice(0, 10);
}

function loadWeeklyData(weekKey) {
  try {
    return JSON.parse(localStorage.getItem(`weekly_${weekKey}`) || "{}");
  } catch {
    return {};
  }
}

function saveWeeklyData(weekKey, data) {
  localStorage.setItem(`weekly_${weekKey}`, JSON.stringify(data));
}

function ProgressBar({ label, current, best, color }) {
  const max = Math.max(current, best, 100);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
        <span>{label}</span>
        <span style={{ color: "var(--text-soft)" }}>{current}/{max}</span>
      </div>
      <div style={{ position: "relative", height: 24, background: "var(--bg-soft)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${(best / max) * 100}%`, background: "rgba(255,255,255,0.1)", borderRadius: 12 }} />
        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${(current / max) * 100}%`, background: color, borderRadius: 12, transition: "width 0.5s" }} />
        {current > best && (
          <div style={{ position: "absolute", top: 2, left: `${(best / max) * 100}%`, width: 3, height: 20, background: "#fbbf24", borderRadius: 2 }} />
        )}
      </div>
      {current > best && (
        <div style={{ fontSize: 11, color: "#fbbf24", marginTop: 4 }}>🎯 رقّم قياسي جديد!</div>
      )}
    </div>
  );
}

export default function WeeklyChallenge({ onBack }) {
  const [weeklyData, setWeeklyData] = useState(() => loadWeeklyData(getWeekKey()));
  const [lastWeekData, setLastWeekData] = useState(() => loadWeeklyData(getLastWeekKey()));
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [bonusXP, setBonusXP] = useState(0);

  useEffect(() => {
    setWeeklyData(loadWeeklyData(getWeekKey()));
    setLastWeekData(loadWeeklyData(getLastWeekKey()));
  }, []);

  const totalLastWeek = Object.values(lastWeekData).reduce((a, b) => a + (b || 0), 0);
  const totalCurrent = Object.values(weeklyData).reduce((a, b) => a + (b || 0), 0);
  const beatingRecord = totalCurrent > totalLastWeek;

  const handleScore = (gameId, score) => {
    const newData = { ...weeklyData, [gameId]: Math.max(weeklyData[gameId] || 0, score) };
    setWeeklyData(newData);
    saveWeeklyData(getWeekKey(), newData);
    setCurrentScore(score);

    if (lastWeekData[gameId] && score > lastWeekData[gameId]) {
      const bonus = Math.floor((score - lastWeekData[gameId]) * 2);
      setBonusXP(bonus);
    }
    setShowComplete(true);
  };

  if (selectedGame) {
    const game = GAMES.find(g => g.id === selectedGame);
    return (
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <button onClick={() => { setSelectedGame(null); setShowComplete(false); setBonusXP(0); }} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 48 }}>{game.icon}</div>
            <h2 style={{ margin: "8px 0 4px" }}>{game.name}</h2>
            <p style={{ color: "var(--text-soft)", fontSize: 13, margin: 0 }}>تحدي الأسبوع: تجاوز نتائج الأسبوع الماضي</p>
          </div>

          <div style={{ background: "var(--bg-soft)", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>{lastWeekData[selectedGame] || 0}</div>
                <div style={{ fontSize: 12, color: "var(--text-soft)" }}>الأسبوع الماضي</div>
              </div>
              <div style={{ fontSize: 24, color: "var(--text-soft)" }}>←</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: currentScore > (lastWeekData[selectedGame] || 0) ? "#10b981" : "var(--text)" }}>{weeklyData[selectedGame] || 0}</div>
                <div style={{ fontSize: 12, color: "var(--text-soft)" }}>هذا الأسبوع</div>
              </div>
            </div>
          </div>

          {!showComplete ? (
            <div>
              <p style={{ textAlign: "center", color: "var(--text-soft)", marginBottom: 16 }}>أكّل 5 أسئلة لتحديد نتيجتك</p>
              <QuizGame gameId={selectedGame} onComplete={(score) => handleScore(selectedGame, score)} />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{currentScore > (lastWeekData[selectedGame] || 0) ? "🏆" : "💪"}</div>
              <h3>النتيجة: {currentScore}%</h3>
              {bonusXP > 0 && (
                <div style={{ background: "rgba(251,191,36,0.1)", border: "1px solid #fbbf24", borderRadius: 10, padding: 12, marginBottom: 16, color: "#fbbf24" }}>
                  +{bonusXP} XP مكافأة لكسر القياس!
                </div>
              )}
              <button onClick={() => { setShowComplete(false); setSelectedGame(null); setBonusXP(0); }} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: game.color, color: "#fff", fontWeight: 700, cursor: "pointer" }}>العودة للتحديات</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2>🏆 تحدي الأسبوع</h2>
        <p style={{ color: "var(--text-soft)" }}>تجاوز نتائجك من الأسبوع الماضي</p>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16 }}>📊 مقارنة الأسابيع</h3>
        {GAMES.map(game => (
          <ProgressBar
            key={game.id}
            label={`${game.icon} ${game.name}`}
            current={weeklyData[game.id] || 0}
            best={lastWeekData[game.id] || 0}
            color={game.color}
          />
        ))}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-around", fontSize: 14 }}>
          <div><strong>{totalLastWeek}</strong> <span style={{ color: "var(--text-soft)" }}>الأسبوع الماضي</span></div>
          <div><strong style={{ color: beatingRecord ? "#10b981" : "var(--text)" }}>{totalCurrent}</strong> <span style={{ color: "var(--text-soft)" }}>هذا الأسبوع</span></div>
        </div>
        {beatingRecord && (
          <div style={{ textAlign: "center", marginTop: 12, padding: 10, background: "rgba(16,185,129,0.1)", borderRadius: 10, color: "#10b981", fontWeight: 700 }}>🎉 أنت تتفوق!</div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {GAMES.map(game => (
          <div
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = game.color; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{ fontSize: 36, marginBottom: 8 }}>{game.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{game.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-soft)" }}>الأسبوع: {lastWeekData[game.id] || 0}</div>
            <div style={{ fontSize: 12, color: "var(--text-soft)" }}>هذا: {weeklyData[game.id] || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizGame({ gameId, onComplete }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);

  const questions = [
    { q: "كيف تقول 'شكراً' بالألمانية؟", opts: ["Danke", "Bitte", "Tschüss", "Hallo"], correct: 0 },
    { q: "ما معنى 'Entschuldigung'؟", opts: ["عذراً", "مرحباً", "وداعاً", "نعم"], correct: 0 },
    { q: "كيف تسأل عن السعر؟", opts: ["Was kostet das?", "Wie geht es?", "Wo ist das?", "Wer bist du?"], correct: 0 },
    { q: "ما ترجمة 'أنا من المغرب'؟", opts: ["Ich komme aus Marokko", "Ich bin Marokko", "Ich lebe Marokko", "Ich habe Marokko"], correct: 0 },
    { q: "كيف تقول 'صباح الخير'؟", opts: ["Guten Morgen", "Gute Nacht", "Guten Tag", "Tschüss"], correct: 0 },
  ];

  const current = questions[qIdx];

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === current.correct) setScore(s => s + 20);
  };

  const next = () => {
    if (qIdx < questions.length - 1) {
      setQIdx(q => q + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      onComplete(score + (selected === current.correct ? 20 : 0));
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 12, fontSize: 13, color: "var(--text-soft)" }}>{qIdx + 1}/{questions.length}</div>
      <div style={{ background: "var(--bg-soft)", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "center", fontSize: 18, border: "1px solid var(--border)" }}>{current.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {current.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            style={{
              padding: "14px 16px", borderRadius: 12, border: "2px solid",
              borderColor: answered ? (i === current.correct ? "#10b981" : i === selected ? "#ef4444" : "var(--border)") : "var(--border)",
              background: answered ? (i === current.correct ? "rgba(16,185,129,0.1)" : i === selected ? "rgba(239,68,68,0.1)" : "var(--bg)") : "var(--bg)",
              color: "var(--text)", fontWeight: 600, cursor: answered ? "default" : "pointer", fontSize: 15, textAlign: "start"
            }}
          >
            {["أ", "ب", "ج", "د"][i]}. {opt}
          </button>
        ))}
      </div>
      {answered && (
        <button onClick={next} style={{ width: "100%", marginTop: 16, padding: 12, borderRadius: 10, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          {qIdx < questions.length - 1 ? "السؤال التالي →" : "إنهاء"}
        </button>
      )}
    </div>
  );
}
