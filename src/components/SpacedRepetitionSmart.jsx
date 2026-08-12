import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

const INITIAL_WORDS = [
  { id: 1, de: "die Bildung", ar: "التعليم", en: "education", interval: 0, rep: 0, ease: 2.5, due: 0 },
  { id: 2, de: "der Student", ar: "الطالب", en: "student", interval: 0, rep: 0, ease: 2.5, due: 0 },
  { id: 3, de: "die Woche", ar: "الأسبوع", en: "week", interval: 0, rep: 0, ease: 2.5, due: 0 },
  { id: 4, de: "der Krieg", ar: "الحرب", en: "war", interval: 0, rep: 0, ease: 2.5, due: 0 },
  { id: 5, de: "das Kind", ar: "الطفل", en: "child", interval: 0, rep: 0, ease: 2.5, due: 0 },
  { id: 6, de: "die Uni", ar: "الجامعة", en: "university", interval: 3, rep: 2, ease: 2.5, due: 0 },
  { id: 7, de: "die Prüfung", ar: "الامتحان", en: "exam", interval: 5, rep: 1, ease: 2.5, due: 0 },
  { id: 8, de: "die Sprache", ar: "اللغة", en: "language", interval: 2, rep: 1, ease: 2.5, due: 0 },
];

const SM2 = (word, grade) => {
  let { interval, rep, ease } = word;
  if (grade >= 4) {
    if (rep === 0) interval = 1;
    else if (rep === 1) interval = 6;
    else interval = Math.round(interval * ease);
    rep += 1;
    if (grade === 5) ease += 0.15;
    else ease += 0.10;
  } else {
    rep = 0;
    interval = 1;
    if (grade === 0) ease -= 0.20;
    else ease -= 0.15;
  }
  if (ease < 1.3) ease = 1.3;
  const due = Date.now() + interval * 24 * 60 * 60 * 1000;
  return { ...word, interval, rep, ease, due };
};

const GRADES = [
  { label: "مرة أخرى", key: "Again", color: "#ef4444", value: 0 },
  { label: "صعب", key: "Hard", color: "#f59e0b", value: 2 },
  { label: "جيد", key: "Good", color: "#10b981", value: 4 },
  { label: "سهل", key: "Easy", color: "#8b5cf6", value: 5 },
];

export default function SpacedRepetitionSmart({ onBack }) {
  const [words, setWords] = useState(INITIAL_WORDS);
  const [today] = useState(() => Date.now());
  const dueWords = words.filter(w => (w.due === 0 || w.due <= today)).sort((a, b) => (a.due || 0) - (b.due || 0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  useEffect(() => {
    setWords(w => w.map(x => ({ ...x, due: today + (x.due ? x.due - today : 0) })));
  }, []);

  const current = dueWords[currentIndex];

  const handleGrade = (value) => {
    const graded = SM2(current, value);
    setWords(w => w.map(x => (x.id === graded.id ? graded : x)));
    setShowFront(true);
    setSessionTotal(s => s + 1);
    if (value >= 4) setSessionCorrect(c => c + 1);
    speakGerman(graded.de, { rate: 0.85 });

    if (currentIndex + 1 >= dueWords.length) {
      setSessionDone(true);
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const resetSession = () => {
    setWords(INITIAL_WORDS);
    setCurrentIndex(0);
    setShowFront(true);
    setSessionCorrect(0);
    setSessionTotal(0);
    setSessionDone(false);
  };

  const progressPct = dueWords.length ? ((currentIndex + 1) / dueWords.length) * 100 : 0;

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
    container: { maxWidth: "760px", margin: "0 auto" },
    header: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" },
    backBtn: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      borderRadius: "12px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
    },
    title: { fontSize: "22px", fontWeight: 700, flexGrow: 1 },
    card: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "18px",
      padding: "22px",
      marginBottom: "18px",
      boxShadow: "var(--shadow-sm)",
    },
    summaryBar: { display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "14px" },
    dueCount: { color: "var(--primary)", fontWeight: 600 },
    sessionStats: { color: "var(--text-soft)" },
    progressWrap: { marginBottom: "14px" },
    progressTrack: { width: "100%", height: "10px", background: "var(--bg-soft)", borderRadius: "8px", overflow: "hidden" },
    progressFill: { height: "100%", background: "var(--primary)", borderRadius: "8px" },
    flashCard: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "28px",
      textAlign: "center",
      minHeight: "180px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      marginBottom: "18px",
    },
    cardDe: { fontSize: "30px", fontWeight: 700, color: "var(--primary)" },
    cardAr: { fontSize: "16px", color: "var(--text-soft)", marginTop: "12px" },
    cardEn: { fontSize: "13px", color: "var(--text-soft)", marginTop: "6px" },
    gradesBox: { display: "flex", gap: "10px", flexWrap: "wrap" },
    gradeBtn: {
      flexGrow: 1,
      border: "none",
      borderRadius: "12px",
      padding: "12px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "13px",
      color: "#fff",
    },
    resultBanner: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "22px",
      textAlign: "center",
    },
    finalPercent: { fontSize: "42px", fontWeight: 700, color: "var(--primary)" },
  };

  if (sessionDone) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
            <div style={styles.title}>الخانة مكتملة!</div>
          </div>
          <div style={styles.card}>
            <div style={styles.finalPercent}>{Math.round((sessionCorrect / Math.max(sessionTotal, 1)) * 100)}%</div>
            <div style={styles.counter}>{sessionCorrect}/{sessionTotal} إجابة صحيحة</div>
            <div style={styles.sessionStats}>تمت إعادة جدولة الكلمات وفق خوارزمية SM-2</div>
            <div style={{ ...styles.gradesBox, marginTop: "20px" }}>
              <button style={{ ...styles.gradeBtn, background: "var(--primary)" }} onClick={resetSession}>جلسة جديدة</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
            <div style={styles.title}>التكرار المتباعد</div>
          </div>
          <div style={styles.card}>
            <div style={{ textAlign: "center", padding: "20px", color: "var(--text-soft)" }}>
              لا توجد كلمات مستحقة حالياً. جرّب مراجعة لاحقاً!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
          <div style={styles.title}>التكرار المتباعد الذكي (SM-2)</div>
        </div>

        <div style={styles.card}>
          <div style={styles.summaryBar}>
            <span style={styles.dueCount}>مستحقة اليوم: {dueWords.length}</span>
            <span style={styles.sessionStats}>{currentIndex + 1}/{dueWords.length} — جلسة حالية</span>
          </div>

          <div style={styles.progressWrap}>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
            </div>
          </div>

          <div style={styles.flashCard} onClick={() => setShowFront(f => !f)}>
            <div>
              <div style={styles.cardDe}>{showFront ? current.de : "_____"}</div>
              {!showFront && (
                <>
                  <div style={styles.cardAr}>{current.ar}</div>
                  <div style={styles.cardEn}>{current.en}</div>
                </>
              )}
            </div>
          </div>

          <div style={styles.gradesBox}>
            {GRADES.map(g => (
              <button key={g.key} style={{ ...styles.gradeBtn, background: g.color }} onClick={() => handleGrade(g.value)}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
