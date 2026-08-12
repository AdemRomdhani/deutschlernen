import { useState } from "react";
import { speakGerman } from "../speech.js";

const ARTICLES = [
  {
    id: 1, level: "A1", title: "Wetter in Deutschland", titleAr: "الطقس في ألمانيا",
    content: "Das Wetter in Deutschland ist heute schön. Die Sonne scheint und es ist warm. Morgen wird es regnen. Im Winter ist es kalt und schneit oft. Im Sommer ist es heiß und sonnig.",
    vocab: [
      { de: "das Wetter", ar: "الطقس" }, { de: "die Sonne", ar: "الشمس" },
      { de: "scheinen", ar: "تُشرق" }, { de: "regnen", ar: "تمطر" },
      { de: "schneien", ar: "تسقط الثلوج" }, { de: "heiß", ar: "حار" },
    ],
    questions: [
      { q: "Wie ist das Wetter heute?", opts: ["Schön", "Kalt", "Regnerisch", "Schneit"], correct: 0 },
      { q: "Was macht die Sonne?", opts: ["Scheint", "Regnet", "Schneit", "Versteckt sich"], correct: 0 },
    ]
  },
  {
    id: 2, level: "A1", title: "Mein Frühstück", titleAr: "فطوري",
    content: "Ich esse jeden Morgen Frühstück. Ich trinke Kaffee und esse Brot mit Käse. Manchmal esse ich auch Müsli mit Milch. Mein Bruder isst nur Brötchen mit Marmelade.",
    vocab: [
      { de: "das Frühstück", ar: "الفطور" }, { de: "der Kaffee", ar: "القهوة" },
      { de: "das Brot", ar: "الخبز" }, { de: "der Käse", ar: "الجبن" },
      { de: "die Milch", ar: "الحليب" }, { de: "die Marmelade", ar: "المربى" },
    ],
    questions: [
      { q: "Was trinkt der Sprecher?", opts: ["Kaffee", "Tee", "Wasser", "Saft"], correct: 0 },
      { q: "Was isst der Bruder?", opts: ["Brötchen mit Marmelade", "Brot mit Käse", "Müsli", "Eier"], correct: 0 },
    ]
  },
  {
    id: 3, level: "A2", title: "Deutsche Städte", titleAr: "المدن الألمانية",
    content: "Berlin ist die Hauptstadt von Deutschland. Die Stadt hat viele Museen und Parks. München ist berühmt für das Oktoberfest. Hamburg hat einen großen Hafen. Köln hat einen berühmten Dom.",
    vocab: [
      { de: "die Hauptstadt", ar: "العاصمة" }, { de: "das Museum", ar: "المتحف" },
      { de: "berühmt", ar: "مشهور" }, { de: "der Hafen", ar: "الميناء" },
      { de: "der Dom", ar: "الكاتدرائية" }, { de: "das Oktoberfest", ar: "مهرجان أكتوبر" },
    ],
    questions: [
      { q: "Was ist die Hauptstadt?", opts: ["Berlin", "München", "Hamburg", "Köln"], correct: 0 },
      { q: "Wofür ist München berühmt?", opts: ["Oktoberfest", "Museen", "Hafen", "Dom"], correct: 0 },
    ]
  },
  {
    id: 4, level: "A2", title: "Im Supermarkt", titleAr: "في السوبر ماركت",
    content: "Frau Müller geht in den Supermarkt. Sie kauft Brot, Milch und Eier. Das Brot kostet zwei Euro. Die Milch kostet einen Euro. An der Kasse bezahlt sie mit Bargeld.",
    vocab: [
      { de: "der Supermarkt", ar: "السوبر ماركت" }, { de: "kaufen", ar: "يشتري" },
      { de: "die Eier", ar: "البيض" }, { de: "die Kasse", ar: "الصندوق" },
      { de: "Bargeld", ar: "نقداً" }, { de: "bezahlen", ar: "يدفع" },
    ],
    questions: [
      { q: "Was kauft Frau Müller?", opts: ["Brot, Milch, Eier", "Nur Brot", "Fleisch", "Gemüse"], correct: 0 },
      { q: "Wie bezahlt sie?", opts: ["Mit Bargeld", "Mit Karte", "Mit App", "Kryptowährung"], correct: 0 },
    ]
  },
  {
    id: 5, level: "B1", title: "Umweltschutz", titleAr: "حماية البيئة",
    content: "Umweltschutz ist ein wichtiges Thema in Deutschland. Viele Menschen recyceln Papier, Glas und Plastik. Die Regierung fördert erneuerbare Energien wie Wind und Sonnenenergie. Trotzdem gibt es noch viele Probleme wie Luftverschmutzung.",
    vocab: [
      { de: "das Umweltschutz", ar: "حماية البيئة" }, { de: "recyceln", ar: "يعيد التدوير" },
      { de: "die erneuerbare Energie", ar: "الطاقة المتجددة" }, { de: "die Luftverschmutzung", ar: "تلوث الهواء" },
      { de: "die Regierung", ar: "الحكومة" }, { de: "fördern", ar: "يدعم" },
    ],
    questions: [
      { q: "Was recyceln viele Menschen?", opts: ["Papier, Glas, Plastik", "Nur Papier", "Nur Glas", "Essen"], correct: 0 },
      { q: "Welche Energien fördert die Regierung?", opts: ["Wind und Sonnenenergie", "Atomenergie", "Kohle", "Gas"], correct: 0 },
    ]
  },
  {
    id: 6, level: "B1", title: "Deutsche Traditionen", titleAr: "التقاليد الألمانية",
    content: "Deutschland hat viele Traditionen. Das Weihnachtsfest ist sehr wichtig. Familien schmücken den Weihnachtsbaum und singen Lieder. Am Nikolausstag bekommen Kinder Geschenke. Das Oktoberfest in München ist weltweit bekannt.",
    vocab: [
      { de: "die Tradition", ar: "التقاليد" }, { de: "das Weihnachtsfest", ar: "عيد الميلاد" },
      { de: "schmücken", ar: "يزيّن" }, { de: "der Weihnachtsbaum", ar: "شجرة الميلاد" },
      { de: "das Geschenk", ar: "الهدايا" }, { de: "weltweit", ar: "في جميع أنحاء العالم" },
    ],
    questions: [
      { q: "Was machen Familien zum Weihnachtsfest?", opts: ["Baum schmücken und singen", "Nur essen", "Reisen", "Arbeiten"], correct: 0 },
      { q: "Ist das Oktoberfest weltweit bekannt?", opts: ["Ja", "Nein", "Nur in München", "Nur in Berlin"], correct: 0 },
    ]
  },
];

export default function SlowNews({ onBack }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeLevel, setActiveLevel] = useState("A1");
  const [clickedWord, setClickedWord] = useState(null);
  const [showVocab, setShowVocab] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [qAnswer, setQAnswer] = useState(null);

  const filtered = ARTICLES.filter(a => a.level === activeLevel);

  const handleWordClick = (word) => {
    const clean = word.replace(/[.,!?;:]/g, "");
    const allVocab = ARTICLES.flatMap(a => a.vocab);
    const match = allVocab.find(v => v.de.toLowerCase() === clean.toLowerCase());
    if (match) {
      setClickedWord(match);
      speakGerman(match.de);
    }
  };

  if (selectedArticle) {
    const article = selectedArticle;
    const words = article.content.split(" ");
    return (
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={() => { setSelectedArticle(null); setClickedWord(null); setActiveQuestion(null); setQAnswer(null); }} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 20 }}>{article.title}</h2>
            <span style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(139,92,246,0.1)", color: "#8b5cf6", fontWeight: 700, fontSize: 13 }}>{article.level}</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 12 }}>{article.titleAr}</div>

          <button onClick={() => speakGerman(article.content)} style={{ padding: "8px 16px", borderRadius: 10, border: "2px solid #8b5cf6", background: "transparent", color: "#8b5cf6", fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 16 }}>
            🔊 استمع للمقال
          </button>

          <div style={{ lineHeight: 2.2, fontSize: 17, direction: "ltr", textAlign: "left", marginBottom: 20 }}>
            {words.map((w, i) => {
              const clean = w.replace(/[.,!?;:]/g, "");
              const hasVocab = article.vocab.some(v => v.de.toLowerCase() === clean.toLowerCase());
              return (
                <span
                  key={i}
                  onClick={() => handleWordClick(w)}
                  style={{ cursor: hasVocab ? "pointer" : "default", color: hasVocab ? "#8b5cf6" : "var(--text)", fontWeight: hasVocab ? 700 : 400, borderBottom: hasVocab ? "2px dotted #8b5cf6" : "none", padding: "0 2px", transition: "all 0.2s" }}
                >
                  {w}{" "}
                </span>
              );
            })}
          </div>

          {clickedWord && (
            <div style={{ background: "rgba(139,92,246,0.1)", border: "1px solid #8b5cf6", borderRadius: 12, padding: 14, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, direction: "ltr" }}>{clickedWord.de}</div>
                <div style={{ color: "var(--text-soft)", fontSize: 14 }}>{clickedWord.ar}</div>
              </div>
              <button onClick={() => speakGerman(clickedWord.de)} style={{ padding: "8px 14px", borderRadius: 10, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 700, cursor: "pointer" }}>🔊</button>
            </div>
          )}

          <button onClick={() => setShowVocab(!showVocab)} style={{ padding: "8px 20px", borderRadius: 10, border: "2px solid #8b5cf6", background: showVocab ? "#8b5cf6" : "transparent", color: showVocab ? "#fff" : "#8b5cf6", fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 16 }}>
            {showVocab ? "إخفاء المفردات" : "عرض المفردات"}
          </button>

          {showVocab && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {article.vocab.map((v, i) => (
                <div key={i} onClick={() => { speakGerman(v.de); setClickedWord(v); }} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--bg-soft)", borderRadius: 10, border: "1px solid var(--border)", cursor: "pointer" }}>
                  <span style={{ fontWeight: 700, direction: "ltr" }}>{v.de}</span>
                  <span style={{ color: "var(--text-soft)" }}>{v.ar}</span>
                </div>
              ))}
            </div>
          )}

          <h3 style={{ margin: "16px 0 10px", fontSize: 16 }}>❓ أسئلة الفهم</h3>
          {article.questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{q.q}</div>
              {q.opts.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => { setActiveQuestion(qi); setQAnswer(oi); }}
                  style={{
                    display: "block", width: "100%", padding: "10px 14px", marginBottom: 6, borderRadius: 10, border: "2px solid",
                    borderColor: activeQuestion === qi ? (oi === q.correct ? "#10b981" : oi === qAnswer ? "#ef4444" : "var(--border)") : "var(--border)",
                    background: activeQuestion === qi ? (oi === q.correct ? "rgba(16,185,129,0.1)" : oi === qAnswer ? "rgba(239,68,68,0.1)" : "var(--bg)") : "var(--bg)",
                    color: "var(--text)", fontWeight: 500, cursor: activeQuestion === qi ? "default" : "pointer", textAlign: "start", fontSize: 14
                  }}
                >
                  {["أ", "ب", "ج", "د"][oi]}. {opt}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2>📰 أخبار ألمانيا المبسّطة</h2>
        <p style={{ color: "var(--text-soft)" }}>اقرأ مقالات ألمانية بسيطة مع ترجمة</p>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
        {["A1", "A2", "B1"].map(l => (
          <button key={l} onClick={() => { setActiveLevel(l); setSelectedArticle(null); setClickedWord(null); }} style={{ padding: "8px 20px", borderRadius: 999, border: "2px solid", borderColor: activeLevel === l ? "#8b5cf6" : "var(--border)", background: activeLevel === l ? "#8b5cf6" : "var(--bg)", color: activeLevel === l ? "#fff" : "var(--text)", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
            {l}
          </button>
        ))}
      </div>

      {filtered.map(article => (
        <div key={article.id} onClick={() => setSelectedArticle(article)} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#8b5cf6"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <h3 style={{ margin: 0, fontSize: 16 }}>{article.title}</h3>
            <span style={{ padding: "3px 10px", borderRadius: 8, background: "rgba(139,92,246,0.1)", color: "#8b5cf6", fontWeight: 600, fontSize: 12 }}>{article.level}</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 8 }}>{article.titleAr}</div>
          <div style={{ fontSize: 13, color: "var(--text-soft)", direction: "ltr", textAlign: "left", lineHeight: 1.6 }}>{article.content.slice(0, 100)}...</div>
        </div>
      ))}
    </div>
  );
}
