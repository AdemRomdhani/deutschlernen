import { useState } from "react";
import { speakGerman } from "../speech.js";

const SKILLS = [
  { key: "listening", label: "الاستماع", sub: "الاستماع" },
  { key: "reading", label: "القراءة", sub: "القراءة" },
  { key: "writing", label: "الكتابة", sub: "الكتابة" },
  { key: "speaking", label: "النطق", sub: "النطق" },
  { key: "grammar", label: "القواعد", sub: "القواعد" },
];

const initialLevels = { listening: 62, reading: 78, writing: 45, speaking: 53, grammar: 68 };

export default function WeakAreaFocus({ onBack }) {
  const [levels, setLevels] = useState(initialLevels);
  const [selected, setSelected] = useState(null);

  const weakestKey = Object.keys(levels).reduce((min, k) => (levels[k] < levels[min] ? k : min), Object.keys(levels)[0]);
  const weakestSkill = SKILLS.find(s => s.key === weakestKey);

  const startSkill = (key) => {
    setSelected(key);
    setLevels(l => ({ ...l, [key]: Math.min(100, l[key] + (l[key] < 50 ? 8 : 5)) }));
    const sk = SKILLS.find(s => s.key === key);
    speakGerman(sk.sub);
  };

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
    weakBanner: {
      background: "rgba(239, 68, 68, 0.12)",
      border: "1px solid #ef4444",
      borderRadius: "14px",
      padding: "16px",
      marginBottom: "18px",
      textAlign: "center",
    },
    weakText: { color: "#ef4444", fontWeight: 700, fontSize: "16px" },
    weakSub: { color: "var(--text-soft)", fontSize: "13px", marginTop: "4px" },
    skillRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" },
    skillName: { width: "90px", fontSize: "14px", fontWeight: 600, textAlign: "left" },
    skillBarTrack: { flexGrow: 1, height: "14px", background: "var(--bg-soft)", borderRadius: "8px", overflow: "hidden" },
    skillBarFill: { height: "100%", borderRadius: "8px", transition: "width 0.4s" },
    levelBadge: { width: "46px", fontSize: "13px", fontWeight: 700, textAlign: "center" },
    quickGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "16px" },
    quickBtn: {
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "12px",
      cursor: "pointer",
      background: "var(--bg-soft)",
      color: "var(--text)",
      fontSize: "14px",
      fontWeight: 600,
      textAlign: "center",
      transition: "all 0.2s",
    },
    quickActive: { background: "var(--primary)", color: "#fff" },
  };

  const getColor = (lvl) => (lvl < 50 ? "#ef4444" : lvl < 70 ? "#f59e0b" : "#10b981");

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
          <div style={styles.title}>تركيز على المجالات الضعيفة</div>
        </div>

        <div style={styles.weakBanner}>
          <div style={styles.weakText}>أضعف مهارة: {weakestSkill?.label} ({levels[weakestKey]}%)</div>
          <div style={styles.weakSub}>ابدأ هنا لتقوية هذه المهارة أولاً</div>
        </div>

        <div style={styles.card}>
          {SKILLS.map((s) => {
            const lvl = levels[s.key];
            return (
              <div key={s.key} style={styles.skillRow}>
                <div style={styles.skillName}>{s.label}</div>
                <div style={{ ...styles.skillBarTrack, borderColor: s.key === weakestKey ? "#ef4444" : "var(--border)" }}>
                  <div style={{ ...styles.skillBarFill, width: `${lvl}%`, backgroundColor: getColor(lvl) }} />
                </div>
                <div style={{ ...styles.levelBadge, color: getColor(lvl) }}>{lvl}%</div>
              </div>
            );
          })}

          <div style={styles.quickGrid}>
            {SKILLS.map((s) => (
              <button
                key={s.key}
                style={{
                  ...styles.quickBtn,
                  ...(selected === s.key ? styles.quickActive : {}),
                  ...(s.key === weakestKey ? { border: "2px solid #ef4444" } : {}),
                }}
                onClick={() => startSkill(s.key)}
              >
                {s.label}
                {s.key === weakestKey && " 🔴"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
