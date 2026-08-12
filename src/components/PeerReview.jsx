import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

const PROMPTS = [
  { de: "Schreiben Sie über Ihren Tag", ar: "اكتب عن يومك" },
  { de: "Beschreiben Sie Ihre Familie", ar: "صف عائلتك" },
  { de: "Was ist Ihre Lieblingsfarbe?", ar: "ما هو لونك المفضل؟" },
  { de: "Schreiben Sie über Ihre Hobbys", ar: "اكتب عن هواياتك" },
  { de: "Wo wohnen Sie?", ar: "أين تسكن؟" },
  { de: "Was essen Sie gern?", ar: "ماذا تحب أن تأكل؟" },
  { de: "Beschreiben Sie Ihren besten Freund", ar: "صف أفضل صديق لك" },
  { de: "Was möchten Sie in Deutschland machen?", ar: "ماذا تريد أن تفعل في ألمانيا؟" },
];

const WORD_BANK = [
  "ich", "bin", "ist", "sind", "habe", "hat", "gern", "nicht", "und", "oder",
  "aber", "auch", "sehr", "gut", "schlecht", "groß", "klein", "neu", "alt",
  "Mann", "Frau", "Kind", "Haus", "Hund", "Katze", "Brot", "Wasser", "Kaffee",
  "Arbeit", "Schule", "Universität", "Freunde", "Familie", "Musik", "Buch",
  "essen", "trinken", "schlafen", "lesen", "schreiben", "sprechen", "lernen",
  "groß", "klein", "schön", "traurig", "fröhlich", "müde", "hungrig",
  "Heute", "Morgen", "Gestern", "Wasser", "essen", "trinken", "gehen",
];

function suggestCorrections(text) {
  const words = text.split(/\s+/);
  const suggestions = [];
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[.,!?]/g, "");
    const matches = WORD_BANK.filter(bw => {
      const bl = bw.toLowerCase();
      if (clean === bl) return false;
      if (bl.startsWith(clean.slice(0, 2)) && Math.abs(bl.length - clean.length) <= 2) return true;
      return false;
    });
    if (matches.length > 0 && clean.length > 2) {
      suggestions.push({ word: w, suggestions: matches.slice(0, 3) });
    }
  });
  return suggestions;
}

function getScore(text) {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  let score = Math.min(50, words.length * 5);
  if (text.length > 20) score += 10;
  if (/[.!?]$/.test(text.trim())) score += 10;
  if (/[A-Z]/.test(text)) score += 10;
  const germanChars = text.match(/[äöüßÄÖÜ]/g);
  if (germanChars) score += germanChars.length * 3;
  return Math.min(100, score);
}

export default function PeerReview({ onBack, onComplete }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [text, setText] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [score, setScore] = useState(0);
  const [saved, setSaved] = useState(false);

  const prompt = PROMPTS[promptIdx];

  useEffect(() => {
    const saved = localStorage.getItem("peerReview_writings");
    if (saved) {
      try { setText(JSON.parse(saved).text || ""); } catch {}
    }
  }, []);

  const review = () => {
    setSuggestions(suggestCorrections(text));
    setScore(getScore(text));
    setReviewed(true);
  };

  const save = () => {
    const writings = JSON.parse(localStorage.getItem("peerReview_writings") || "[]");
    writings.push({ prompt: prompt.de, text, score, date: new Date().toISOString() });
    localStorage.setItem("peerReview_writings", JSON.stringify(writings));
    localStorage.setItem("peerReview_writings", JSON.stringify({ text }));
    setSaved(true);
  };

  const nextPrompt = () => {
    setPromptIdx(p => (p + 1) % PROMPTS.length);
    setText("");
    setReviewed(false);
    setSuggestions([]);
    setScore(0);
    setSaved(false);
  };

  const applySuggestion = (word, suggestion) => {
    setText(prev => prev.replace(word, suggestion));
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>
      <div className="game-head">
        <h2>✍️ مراجعة الكتابة — Peer Review</h2>
        <p>تدرب على الكتابة بالألمانية</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className="tf-card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 6 }}>الموضوع:</div>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{prompt.de}</div>
          <div style={{ color: "var(--text-soft)", fontSize: 14 }}>{prompt.ar}</div>
          <button className="speak-btn" style={{ marginTop: 10 }} onClick={() => speakGerman(prompt.de)}>🔊 استمع للموضوع</button>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="اكتب بالألمانية هنا..."
          style={{ width: "100%", minHeight: 160, padding: 16, borderRadius: 14, border: "2px solid var(--border)", background: "var(--card)", fontSize: 16, fontFamily: "var(--font-ar)", resize: "vertical", outline: "none", direction: "ltr", textAlign: "left", boxSizing: "border-box" }}
          dir="ltr"
        />
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={review} disabled={!text.trim() || reviewed}>📝 راجع</button>
          <button className="btn btn-ghost" onClick={save} disabled={!reviewed || saved}>{saved ? "✅ تم الحفظ" : "💾 حفظ"}</button>
          <button className="btn btn-ghost" onClick={nextPrompt}>🔄 موضوع جديد</button>
        </div>
        {reviewed && (
          <div style={{ marginTop: 20 }}>
            <div className="tf-card">
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>النتيجة: {score}/100</div>
              <div style={{ height: 8, background: "var(--border)", borderRadius: 999, overflow: "hidden", marginBottom: 14 }}>
                <div style={{ height: "100%", width: `${score}%`, background: score > 70 ? "#22c55e" : score > 40 ? "#eab308" : "#ef4444", borderRadius: 999 }} />
              </div>
              {suggestions.length > 0 ? (
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>اقتراحات التصحيح:</div>
                  {suggestions.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                      <span style={{ fontWeight: 700 }}>{s.word}:</span>
                      {s.suggestions.map((sg, j) => (
                        <button key={j} className="speak-btn" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => applySuggestion(s.word, sg)}>{sg}</button>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: "#22c55e", fontWeight: 700 }}>لا توجد أخطاء واضحة! جيد جداً.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
