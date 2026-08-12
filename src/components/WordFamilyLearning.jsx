import { useState } from "react";
import { speakGerman } from "../speech.js";

const FAMILIES = [
  {
    root: "der Student",
    derived: ["die Studentin", "der Studenten", "die Studierenden", "studentisch"],
    sentences: [
      "___ holt seine Bücher.",
      "___ trinkt Kaffee mit Freunden.",
      "___ zeigen das neue Buch.",
      "___ ist müde nach der Prüfung.",
    ],
    answers: ["der Student", "die Studentin", "die Studierenden", "studentisch"],
  },
  {
    root: "die Woche",
    derived: ["der Wochen", "wöchentlich", "die Woche", "wöchentlichen"],
    sentences: [
      "___ mache ich den Plan?",
      "___ gibt es ein Konzert.",
      "___ arbeite ich im Homeoffice.",
      "___ sind alle gleich wichtig.",
    ],
    answers: ["die Woche", "der Wochen", "wöchentlich", "wöchentlichen"],
  },
  {
    root: "der Krieg",
    derived: ["der Kriege", "kriegerisch", "der Krieg", "kriegerische"],
    sentences: [
      "___ endet, und alle sind glücklich.",
      "___ wollen Frieden, nicht ___.",
      "___ ist eine tragödie für die Menschheit.",
      "___ zerstören die Landschaft.",
    ],
    answers: ["der Krieg", "die Krieg", "kriegerisch", "kriegerische"],
  },
  {
    root: "das Kind",
    derived: ["die Kinder", "kindisch", "kindisch", "Kinder"],
    sentences: [
      "___ spielt im Park.",
      "___ lieben Süßigkeiten.",
      "___ Verhalten ist merkwürdig.",
      "___ fahren mit dem Rad.",
    ],
    answers: ["das Kind", "die Kinder", "kindisch", "Kinder"],
  },
  {
    root: "die Bildung",
    derived: ["gebildet", "die Bildung", "bildlich", "Bildende"],
    sentences: [
      "___ ist wichtig für die Zukunft.",
      "___ Menschen haben viel Wissen.",
      "___ Sprache ist schwierig zu erklären.",
      "___ an einer universität.",
    ],
    answers: ["die Bildung", "gebildet", "bildlich", "Bildende"],
  },
];

export default function WordFamilyLearning({ onBack }) {
  const [familyIdx, setFamilyIdx] = useState(0);
  const [dragged, setDragged] = useState(null);
  const [matched, setMatched] = useState({});
  const [score, setScore] = useState(0);

  const family = FAMILIES[familyIdx];
  const allForms = [family.root, ...family.derived];

  const handleDragStart = (word) => {
    setDragged(word);
  };

  const handleDrop = (slotIdx) => {
    if (!dragged) return;
    const correct = family.answers[slotIdx] === dragged || dragged === family.answers[slotIdx];
    if (correct) {
      setMatched(m => ({ ...m, [slotIdx]: dragged }));
      speakGerman(dragged);
    }
    setDragged(null);
    if (correct && !matched[slotIdx]) setScore(s => s + 10);
  };

  const nextFamily = () => {
    setFamilyIdx(f => (f + 1) % FAMILIES.length);
    setMatched({});
    setScore(0);
    setDragged(null);
  };

  const completed = Object.keys(matched).length === 4;

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
    scoreBar: { display: "flex", justifyContent: "space-between", marginBottom: "14px" },
    scoreText: { fontSize: "15px", fontWeight: 600, color: "var(--primary)" },
    rootBox: {
      background: "var(--bg-soft)",
      borderRadius: "12px",
      padding: "14px",
      textAlign: "center",
      marginBottom: "16px",
      border: "1px solid var(--border)",
    },
    rootLabel: { fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" },
    rootWord: { fontSize: "20px", fontWeight: 700, color: "var(--primary)" },
    formsBox: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "20px",
      justifyContent: "center",
    },
    formChip: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "10px",
      padding: "8px 14px",
      cursor: "grab",
      fontSize: "14px",
      userSelect: "none",
    },
    slotsBox: { display: "grid", gap: "12px" },
    slot: {
      background: "rgba(139, 92, 246, 0.08)",
      border: "1px dashed #8b5cf6",
      borderRadius: "12px",
      padding: "14px",
      fontSize: "15px",
      minHeight: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    slotMatched: { background: "rgba(16, 193, 129, 0.15)", border: "1px solid #10b981" },
    controls: { display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" },
    btn: {
      border: "none",
      borderRadius: "12px",
      padding: "10px 18px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "14px",
      background: "var(--primary)",
      color: "#fff",
    },
    completeBanner: {
      background: "rgba(16, 193, 129, 0.12)",
      border: "1px solid #10b981",
      borderRadius: "14px",
      padding: "16px",
      textAlign: "center",
      marginBottom: "16px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
          <div style={styles.title}>عائلة الكلمات — سحب إلى الجملة الصحيحة</div>
        </div>

        <div style={styles.card}>
          <div style={styles.scoreBar}>
            <span style={styles.scoreText}>النقاط: {score}</span>
            <span style={{ ...styles.scoreText, color: "var(--text-soft)" }}>العائلة {familyIdx + 1}/{FAMILIES.length}</span>
          </div>

          <div style={styles.rootBox}>
            <div style={styles.rootLabel}>الكلمة الأساسية (Root):</div>
            <div style={styles.rootWord}>{family.root}</div>
          </div>

          <div style={styles.formsBox}>
            {allForms.map((w, i) => (
              <div
                key={i}
                style={styles.formChip}
                draggable
                onDragStart={() => handleDragStart(w)}
                onClick={() => speakGerman(w)}
              >
                {w}
              </div>
            ))}
          </div>

          {completed && (
            <div style={styles.completeBanner}>
              <span style={{ color: "#10b981", fontWeight: 700 }}>تم التخطيط على العائلة بنجاح!</span>
            </div>
          )}

          <div style={styles.slotsBox}>
            {family.sentences.map((s, i) => (
              <div
                key={i}
                style={{
                  ...styles.slot,
                  ...(matched[i] ? styles.slotMatched : {}),
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
              >
                <span style={{ flexGrow: 1 }}>{s}</span>
                {matched[i] && <strong style={{ color: "#10b981" }}>{matched[i]}</strong>}
              </div>
            ))}
          </div>

          <div style={styles.controls}>
            <button style={styles.btn} onClick={nextFamily}>العائلة التالية</button>
          </div>
        </div>
      </div>
    </div>
  );
}
