import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

const DIFFICULTY_LABELS = {
  1: "مبتدئ",
  2: "متوسط",
  3: "متقدم",
  4: "متقدم جداً",
  5: "خبير",
};

const SKILL_RECS = {
  1: ["ابدأ بتمرينات المفردات الأساسية", "ركّز على الأزمن الأساسية", "استخدم flashcards اليومية"],
  2: ["أضف جمل كاملة إلى مراجعتك", "تمرين الأسئلة القصيرة", "التركيز على التلفظ"],
  3: ["جرّب حوارات طويلة", "راجع الأخطاء الشائعة", "تمرين الكتابة البسيطة"],
  4: ["مارس مقابلات عمل بالألمانية", "قراءة مقالات أخبارية", "تمرين الحوار غير المتوقع"],
  5: ["كتابة مقالات طويلة", "مناقشة مواضيع معقدة", "بناء مفردات احترافية"],
};

const RECENT_SESSIONS = [
  { score: 88, accuracy: 0.92 },
  { score: 71, accuracy: 0.71 },
  { score: 64, accuracy: 0.64 },
  { score: 90, accuracy: 0.9 },
  { score: 85, accuracy: 0.85 },
];

export default function AdaptiveDifficulty({ onBack }) {
  const [difficulty, setDifficulty] = useState(3);
  const [autoSuggestion, setAutoSuggestion] = useState(null);
  const [performanceHistory, setPerformanceHistory] = useState(RECENT_SESSIONS);

  useEffect(() => {
    const avg = performanceHistory.reduce((a, s) => a + s.accuracy, 0) / performanceHistory.length;
    let suggested = difficulty;
    if (avg > 0.85) suggested = Math.min(5, difficulty + 1);
    else if (avg < 0.6) suggested = Math.max(1, difficulty - 1);
    setAutoSuggestion(suggested > difficulty ? "زيادة" : suggested < difficulty ? "تخفيض" : null);
  }, [performanceHistory, difficulty]);

  const handleManual = (dir) => {
    const next = Math.max(1, Math.min(5, difficulty + dir));
    setDifficulty(next);
    speakGerman(DIFFICULTY_LABELS[next]);
  };

  const applySuggestion = () => {
    if (autoSuggestion === "زيادة") handleManual(1);
    else if (autoSuggestion === "تخفيض") handleManual(-1);
  };

  const handleRecord = (score) => {
    const acc = score / 100;
    setPerformanceHistory(p => [...p.slice(-9), { score, accuracy: acc }]);
  };

  const barWidth = (difficulty / 5) * 100;

  const styles = {
    page: {
      direction: "rtl",
      textAlign: "right",
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "var(--font-ar), sans-serif",
      padding: "20px",
    },
    container: {
      maxWidth: "780px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "20px",
    },
    backBtn: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      borderRadius: "12px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
    },
    title: {
      fontSize: "22px",
      fontWeight: 700,
      flexGrow: 1,
    },
    card: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "18px",
      padding: "22px",
      marginBottom: "18px",
      boxShadow: "var(--shadow-sm)",
    },
    difficultyLabel: {
      fontSize: "16px",
      fontWeight: 600,
      marginBottom: "8px",
    },
    diffValue: {
      color: "var(--primary)",
      fontWeight: 700,
    },
    barTrack: {
      width: "100%",
      height: "16px",
      background: "var(--bg-soft)",
      borderRadius: "10px",
      overflow: "hidden",
      marginTop: "10px",
      marginBottom: "8px",
    },
    barFill: {
      width: `${barWidth}%`,
      height: "100%",
      background: "linear-gradient(90deg, #10b981, var(--primary))",
      borderRadius: "10px",
      transition: "width 0.4s ease",
    },
    controls: {
      display: "flex",
      gap: "12px",
      marginTop: "16px",
      justifyContent: "flex-end",
    },
    btn: {
      border: "none",
      borderRadius: "12px",
      padding: "10px 18px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "14px",
    },
    btnInc: {
      background: "#10b981",
      color: "#fff",
    },
    btnDec: {
      background: "#ef4444",
      color: "#fff",
    },
    btnAuto: {
      background: "#8b5cf6",
      color: "#fff",
    },
    suggestionBox: {
      background: "rgba(139, 92, 246, 0.12)",
      border: "1px dashed #8b5cf6",
      borderRadius: "12px",
      padding: "14px",
      marginTop: "12px",
    },
    suggestionText: {
      color: "#8b5cf6",
      fontWeight: 600,
    },
    recBox: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "16px",
    },
    recTitle: {
      fontSize: "14px",
      fontWeight: 600,
      marginBottom: "10px",
      color: "var(--text-soft)",
    },
    recList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    recItem: {
      padding: "6px 0",
      borderBottom: "1px solid var(--border)",
      fontSize: "14px",
    },
    recItemLast: {
      padding: "6px 0",
      fontSize: "14px",
    },
    historyBox: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "8px",
    },
    sessionCell: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "8px",
      padding: "8px",
      textAlign: "center",
      fontSize: "12px",
    },
    recordRow: {
      display: "flex",
      gap: "8px",
      marginTop: "14px",
      justifyContent: "flex-end",
    },
    scoreInput: {
      width: "70px",
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid var(--border)",
      background: "var(--bg)",
      color: "var(--text)",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
          <div style={styles.title}>مستوى الصعوبة التكيفي — التكييف الذكي</div>
        </div>

        <div style={styles.card}>
          <div style={styles.difficultyLabel}>
            الصعوبة الحالية: <span style={styles.diffValue}>{DIFFICULTY_LABELS[difficulty]}</span> ({difficulty}/5)
          </div>
          <div style={styles.barTrack}>
            <div style={styles.barFill} />
          </div>
          <div style={styles.controls}>
            <button style={{ ...styles.btn, ...styles.btnInc }} onClick={() => handleManual(1)}>زيادة ↑</button>
            <button style={{ ...styles.btn, ...styles.btnDec }} onClick={() => handleManual(-1)}>تخفيض ↓</button>
            {autoSuggestion && (
              <button style={{ ...styles.btn, ...styles.btnAuto }} onClick={applySuggestion}>
                {autoSuggestion} حسّن تلقائياً
              </button>
            )}
          </div>

          {autoSuggestion && (
            <div style={styles.suggestionBox}>
              <span style={styles.suggestionText}>اقتراح ذكي: النظام يوصي {autoSuggestion} (متوسط الأداء: {Math.round(performanceHistory.reduce((a, s) => a + s.accuracy, 0) / performanceHistory.length * 100)}%).</span>
            </div>
          )}
        </div>

        <div style={styles.recBox}>
          <div style={styles.recTitle}>توصيات مهارية — مستوى {DIFFICULTY_LABELS[difficulty]}</div>
          <ul style={styles.recList}>
            {SKILL_RECS[difficulty].map((rec, i) => (
              <li key={i} style={i === SKILL_RECS[difficulty].length - 1 ? styles.recItemLast : styles.recItem}>{rec}</li>
            ))}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.recTitle}>الأداء الأخير (آخر 10 جلسات)</div>
          <div style={styles.historyBox}>
            {performanceHistory.slice(-10).map((s, i) => (
              <div key={i} style={styles.sessionCell}>
                <div>النتيجة {s.score}</div>
                <div style={{ color: "var(--text-soft)" }}>{Math.round(s.accuracy * 100)}%</div>
              </div>
            ))}
          </div>
          <div style={styles.recordRow}>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="سجل نتيجة /100"
              style={styles.scoreInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const v = Number(e.target.value);
                  if (v >= 0 && v <= 100) {
                    handleRecord(v);
                    e.target.value = "";
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
