import { useState } from "react";
import { speakGerman } from "../speech.js";

const SONGS = [
  {
    id: 1, title: "99 Luftballons", artist: "Nena", difficulty: "سهل",
    lines: [
      { text: "Hast du etwas Zeit für mich", blanks: [] },
      { text: "Dann singe ich ein Lied für dich", blanks: ["sing", "Lied"] },
      { text: "Von __ der Liebe zwischen dir und mir", blanks: ["99 Luftballons"] },
      { text: "Und dass wir für die Welt sofrei", blanks: ["frei"] },
    ],
    vocab: [
      { de: "die Zeit", ar: "الوقت" }, { de: "das Lied", ar: "الأغنية" },
      { de: "die Liebe", ar: "الحب" }, { de: "frei", ar: "حر" },
    ]
  },
  {
    id: 2, title: "Du hast", artist: "Rammstein", difficulty: "سهل",
    lines: [
      { text: "Du hast mich", blanks: [] },
      { text: "Du hast mich gefragt", blanks: ["gefragt"] },
      { text: "Du hast mich gefragt und ich hab nichts gesagt", blanks: ["nichts"] },
      { text: "Willst du bis der Tod euch scheidet", blanks: ["scheidet"] },
    ],
    vocab: [
      { de: "fragen", ar: "يسأل" }, { de: "sagen", ar: "يقول" },
      { de: "der Tod", ar: "الموت" }, { de: "scheiden", ar: "يفصل" },
    ]
  },
  {
    id: 3, title: "Die Gedanken sind frei", artist: "traditionell", difficulty: "متوسط",
    lines: [
      { text: "Die Gedanken sind frei", blanks: [] },
      { text: "Wer kann sie erraten?", blanks: ["erraten"] },
      { text: "Sie fliehen vorbei", blanks: ["fliehen"] },
      { text: "Wie nächtliche Schatten", blanks: ["nächtliche", "Schatten"] },
    ],
    vocab: [
      { de: "der Gedanke", ar: "الفكرة" }, { de: "erraten", ar: "يُخمن" },
      { de: "fliehen", ar: "يُهرب" }, { de: "der Schatten", ar: "الظل" },
    ]
  },
  {
    id: 4, title: "Alle Vögel sind schon da", artist: "traditionell", difficulty: "سهل",
    lines: [
      { text: "Alle Vögel sind schon da", blanks: [] },
      { text: "Alle Vögel, alle", blanks: ["alle"] },
      { text: "Schon auf dem Dach, schwarz und weiß", blanks: ["Dach"] },
      { text: "Und der Rotkehlchen sein Gestreichel", blanks: ["Rotkehlchen", "Gestreichel"] },
    ],
    vocab: [
      { de: "der Vogel", ar: "الطائر" }, { de: "das Dach", ar: "السطح" },
      { de: "schwarz", ar: "أسود" }, { de: "weiß", ar: "أبيض" },
    ]
  },
  {
    id: 5, title: "Marmor, Stein und Eisen bricht", artist: "Drafi Deutscher", difficulty: "متوسط",
    lines: [
      { text: "Marmor, Stein und Eisen bricht", blanks: [] },
      { text: "Aber unsere Liebe nicht", blanks: ["unsere", "Liebe"] },
      { text: "Denn es gibt nur ein, das ist das Herz", blanks: ["eins", "Herz"] },
      { text: "Und das schlägt nur für dich", blanks: ["schlägt"] },
    ],
    vocab: [
      { de: "der Marmor", ar: "الرخام" }, { de: "brechen", ar: "يتكسر" },
      { de: "das Herz", ar: "القلب" }, { de: "schlagen", ar: "ينبض" },
    ]
  },
];

export default function SongLyrics({ onBack }) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [revealed, setRevealed] = useState(new Set());
  const [showVocab, setShowVocab] = useState(false);
  const [score, setScore] = useState(0);

  const handleCheck = () => {
    if (!selectedSong) return;
    let correct = 0;
    let total = 0;
    selectedSong.lines.forEach((line, li) => {
      line.blanks.forEach((blank, bi) => {
        total++;
        const key = `${li}-${bi}`;
        const userVal = (userInputs[key] || "").trim().toLowerCase();
        const target = blank.toLowerCase();
        if (userVal === target) correct++;
        setRevealed(prev => new Set([...prev, key]));
      });
    });
    setScore(total > 0 ? Math.round((correct / total) * 100) : 0);
  };

  const renderLine = (line, lineIdx) => {
    let blankIdx = 0;
    const parts = [];
    const segments = line.text.split("___");

    segments.forEach((seg, si) => {
      parts.push(<span key={`seg-${si}`}>{seg} </span>);
      if (si < segments.length - 1) {
        const key = `${lineIdx}-${blankIdx}`;
        const isRevealed = revealed.has(key);
        const isCorrect = isRevealed && (userInputs[key] || "").trim().toLowerCase() === line.blanks[blankIdx].toLowerCase();
        const blankColor = isRevealed ? (isCorrect ? "#10b981" : "#ef4444") : "var(--bg-soft)";

        parts.push(
          <span key={`blank-${blankIdx}`} style={{ display: "inline-block", margin: "0 4px" }}>
            {isRevealed ? (
              <span style={{ color: isCorrect ? "#10b981" : "#ef4444", fontWeight: 700, borderBottom: `2px solid ${isCorrect ? "#10b981" : "#ef4444"}`, padding: "2px 8px" }}>
                {isCorrect ? userInputs[key] : line.blanks[blankIdx]}
              </span>
            ) : (
              <input
                value={userInputs[key] || ""}
                onChange={e => setUserInputs(prev => ({ ...prev, [key]: e.target.value }))}
                style={{ width: `${Math.max(line.blanks[blankIdx].length * 10, 60)}px`, padding: "4px 8px", borderRadius: 6, border: "2px solid var(--border)", background: blankColor, color: "var(--text)", fontSize: 14, fontWeight: 700, direction: "ltr", textAlign: "center" }}
                placeholder="___"
                dir="ltr"
              />
            )}
          </span>
        );
        blankIdx++;
      }
    });
    return parts;
  };

  if (selectedSong) {
    const allCorrect = selectedSong.lines.every(line => line.blanks.every((b, bi) => {
      const key = `${selectedSong.lines.indexOf(line)}-${bi}`;
      return revealed.has(key) && (userInputs[key] || "").trim().toLowerCase() === b.toLowerCase();
    }));

    return (
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={() => { setSelectedSong(null); setUserInputs({}); setRevealed(new Set()); setScore(0); setShowVocab(false); }} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎵</div>
            <h2 style={{ margin: "0 0 4px" }}>{selectedSong.title}</h2>
            <div style={{ color: "var(--text-soft)", fontSize: 13 }}>{selectedSong.artist} • {selectedSong.difficulty}</div>
          </div>

          <div style={{ background: "var(--bg-soft)", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid var(--border)" }}>
            {selectedSong.lines.map((line, li) => (
              <div key={li} style={{ fontSize: 18, lineHeight: 2.4, direction: "ltr", textAlign: "left", borderBottom: li < selectedSong.lines.length - 1 ? "1px solid var(--border)" : "none", paddingBottom: 8, marginBottom: 8 }}>
                {renderLine(line, li)}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button onClick={handleCheck} style={{ flex: 1, padding: 12, borderRadius: 10, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>تحقق من الإجابات</button>
            <button onClick={() => { const rev = new Set(); selectedSong.lines.forEach((l, li) => l.blanks.forEach((b, bi) => rev.add(`${li}-${bi}`))); setRevealed(rev); }} style={{ padding: "12px 20px", borderRadius: 10, border: "2px solid #f59e0b", background: "transparent", color: "#f59e0b", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>💡 عرض الإجابات</button>
          </div>

          {revealed.size > 0 && (
            <div style={{ textAlign: "center", marginBottom: 16, padding: 14, background: allCorrect ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 12, color: allCorrect ? "#10b981" : "#ef4444", fontWeight: 700, fontSize: 16 }}>
              {allCorrect ? "🎉 ممتاز! كل الإجابات صحيحة!" : `النتيجة: ${score}% — حاول مرة أخرى`}
            </div>
          )}

          <button onClick={() => setShowVocab(!showVocab)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "2px solid #8b5cf6", background: showVocab ? "#8b5cf6" : "transparent", color: showVocab ? "#fff" : "#8b5cf6", fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 12 }}>
            {showVocab ? "إخفاء المفردات" : "📚 عرض المفردات"}
          </button>

          {showVocab && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {selectedSong.vocab.map((v, i) => (
                <div key={i} onClick={() => speakGerman(v.de)} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--bg-soft)", borderRadius: 10, border: "1px solid var(--border)", cursor: "pointer" }}>
                  <span style={{ fontWeight: 700, direction: "ltr" }}>{v.de}</span>
                  <span style={{ color: "var(--text-soft)" }}>{v.ar}</span>
                </div>
              ))}
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
        <h2>🎵 أكمل كلمات الأغاني</h2>
        <p style={{ color: "var(--text-soft)" }}>أكمل الكلمات المفقودة من الأغاني الألمانية</p>
      </div>

      {SONGS.map(song => (
        <div key={song.id} onClick={() => setSelectedSong(song)} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#8b5cf6"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: 16 }}>🎵 {song.title}</h3>
              <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{song.artist}</div>
            </div>
            <span style={{ padding: "3px 10px", borderRadius: 8, background: "rgba(139,92,246,0.1)", color: "#8b5cf6", fontWeight: 600, fontSize: 12 }}>{song.difficulty}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
