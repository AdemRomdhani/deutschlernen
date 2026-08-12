import { useState } from "react";
import { speakGerman } from "../speech.js";

const PHRASES = [
  {
    category: "Eröffnung", categoryAr: "الافتتاح",
    color: "#3b82f6",
    phrases: [
      { de: "Willkommen zu unserem Meeting.", ar: "مرحباً بكم في اجتماعنا." },
      { de: "Lassen Sie uns beginnen.", ar: "دعونا نبدأ." },
      { de: "Guten Morgen, meine Damen und Herren.", ar: "صباح الخير، سيداتي وسادتي." },
      { de: "Vielen Dank, dass Sie da sind.", ar: "شكراً جزيلاً لوجودكم هنا." },
      { de: "Ich freue mich, Sie alle begrüßen zu dürfen.", ar: "يسعدني أن أرحب بجميعكم." },
    ]
  },
  {
    category: "Zustimmung", categoryAr: "الموافقة",
    color: "#10b981",
    phrases: [
      { de: "Das sehe ich genauso.", ar: "أنا أرى الأمر بنفس الطريقة." },
      { de: "Ich stimme Ihnen voll zu.", ar: "أوافقك رأياً تماماً." },
      { de: "Das ist ein guter Vorschlag.", ar: "هذا اقتراح جيد." },
      { de: "Genau, das meine ich auch.", ar: "بالضبط، هذا ما أعتقده أيضاً." },
      { de: "Sie haben absolut recht.", ar: "أنت محق تماماً." },
    ]
  },
  {
    category: "Ablehnung", categoryAr: "الرفض",
    color: "#ef4444",
    phrases: [
      { de: "Da bin ich anderer Meinung.", ar: "لدي رأي مختلف." },
      { de: "Das kann ich nicht unterstützen.", ar: "لا أستطيع دعم هذا." },
      { de: "Leider muss ich da widersprechen.", ar: "للأسف يجب أن أعارض." },
      { de: "Ich hätte da eine andere Sichtweise.", ar: "لدي منظور مختلف." },
      { de: "Das ist leider nicht machbar.", ar: "للأسف هذا غير ممكن." },
    ]
  },
  {
    category: "Nachfragen", categoryAr: "الاستفسار",
    color: "#f59e0b",
    phrases: [
      { de: "Können Sie das bitte genauer erklären؟", ar: "هل يمكنك توضيح ذلك أكثر من فضلك؟" },
      { de: "Was meinen Sie genau damit؟", ar: "ماذا تعني بذلك بالضبط؟" },
      { de: "Haben Sie ein Beispiel dafür؟", ar: "هل لديك مثال على ذلك؟" },
      { de: "Ich habe eine kurze Frage dazu.", ar: "لدي سؤال قصير حول ذلك." },
      { de: "Können Sie das bitte wiederholen؟", ar: "هل يمكنك إعادة ذلك من فضلك؟" },
    ]
  },
  {
    category: "Zusammenfassung", categoryAr: "التلخيص",
    color: "#8b5cf6",
    phrases: [
      { de: "Lassen Sie mich zusammenfassen.", ar: "دعوني ألخص." },
      { de: "Die wichtigsten Punkte sind...", ar: "أهم النقاط هي..." },
      { de: "Zusammenfassend lässt sich sagen...", ar: "يمكن القول باختصار..." },
      { de: "Wir haben heute drei Punkte besprochen.", ar: "تناقشنا اليوم في ثلاث نقاط." },
      { de: "Zum Abschluss möchte ich noch sagen...", ar: "في الختام أريد أن أقول..." },
    ]
  },
  {
    category: "Smalltalk", categoryAr: "المحادثة الخفيفة",
    color: "#06b6d4",
    phrases: [
      { de: "Wie war Ihr Wochenende؟", ar: "كيف كان عطلة نهاية الأسبوع؟" },
      { de: "Schönes Wetter heute, oder؟", ar: "طقس جميل اليوم، أليس كذلك؟" },
      { de: "Haben Sie schon Urlaub geplant؟", ar: "هل خططت للعطلة بالفعل؟" },
      { de: "Wie geht es Ihrer Familie؟", ar: "كيف حال عائلتك؟" },
      { de: "Haben Sie das neue Projekt schon gesehen؟", ar: "هل رأيت المشروع الجديد بالفعل؟" },
    ]
  },
];

const SITUATIONS = [
  { situation: "تبدأ اجتماعاً جديداً", correct: "Lassen Sie uns beginnen.", options: ["Lassen Sie uns beginnen.", "Das kann ich nicht unterstützen.", "Leider muss ich da widersprechen.", "Wie war Ihr Wochenende؟"] },
  { situation: " توافق مع فكرة الزميل", correct: "Das sehe ich genauso.", options: ["Das sehe ich genauso.", "Da bin ich anderer Meinung.", "Können Sie das bitte genauer erklären؟", "Zusammenfassend lässt sich sagen..."] },
  { situation: " تود توضيح نقطة غامضة", correct: "Können Sie das bitte genauer erklären؟", options: ["Können Sie das bitte genauer erklären؟", "Das ist ein guter Vorschlag.", "Vielen Dank, dass Sie da sind.", "Ich freue mich, Sie alle begrüßen zu dürfen."] },
  { situation: " تلخص النقاط الرئيسية للاجتماع", correct: "Lassen Sie mich zusammenfassen.", options: ["Lassen Sie mich zusammenfassen.", "Guten Morgen, meine Damen und Herren.", "Da bin ich anderer Meinung.", "Haben Sie ein Beispiel dafür؟"] },
  { situation: "تمارس محادثة خفيفة قبل الاجتماع", correct: "Schönes Wetter heute, oder؟", options: ["Schönes Wetter heute, oder؟", "Lassen Sie mich zusammenfassen.", "Ich stimme Ihnen voll zu.", "Das ist leider nicht machbar."] },
];

export default function BusinessPhrases({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("phrases");
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [practiceScore, setPracticeScore] = useState(0);
  const [showPracticeResult, setShowPracticeResult] = useState(false);

  const handlePracticeAnswer = (option) => {
    setSelectedAnswer(option);
    setShowPracticeResult(true);
    if (option === SITUATIONS[practiceIdx].correct) {
      setPracticeScore(s => s + 1);
    }
  };

  const nextPractice = () => {
    if (practiceIdx < SITUATIONS.length - 1) {
      setPracticeIdx(i => i + 1);
      setSelectedAnswer(null);
      setShowPracticeResult(false);
    } else {
      setPracticeIdx(0);
      setSelectedAnswer(null);
      setShowPracticeResult(false);
      setPracticeScore(0);
    }
  };

  if (activeTab === "practice") {
    const s = SITUATIONS[practiceIdx];
    return (
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <button onClick={() => setActiveTab("phrases")} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2>🎯 تمرين المواقف</h2>
          <p style={{ color: "var(--text-soft)" }}>اختر العبارة المناسبة للموقف</p>
          <div style={{ fontSize: 13, color: "var(--text-soft)", marginTop: 4 }}>{practiceIdx + 1}/{SITUATIONS.length} • النقاط: {practiceScore}</div>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ background: "rgba(245,158,11,0.1)", borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "#f59e0b", fontWeight: 700, marginBottom: 4 }}>📋 الموقف:</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{s.situation}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {s.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handlePracticeAnswer(opt)}
                disabled={showPracticeResult}
                style={{
                  padding: "14px 16px", borderRadius: 12, border: "2px solid",
                  borderColor: showPracticeResult ? (opt === s.correct ? "#10b981" : opt === selectedAnswer ? "#ef4444" : "var(--border)") : "var(--border)",
                  background: showPracticeResult ? (opt === s.correct ? "rgba(16,185,129,0.1)" : opt === selectedAnswer ? "rgba(239,68,68,0.1)" : "var(--bg)") : "var(--bg)",
                  color: "var(--text)", fontWeight: 500, cursor: showPracticeResult ? "default" : "pointer", textAlign: "start", fontSize: 15, lineHeight: 1.6
                }}
              >
                {["أ", "ب", "ج", "د"][i]}. {opt}
              </button>
            ))}
          </div>

          {showPracticeResult && (
            <div style={{ marginTop: 16 }}>
              <div style={{ padding: 12, borderRadius: 10, background: selectedAnswer === s.correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: selectedAnswer === s.correct ? "#10b981" : "#ef4444", fontWeight: 700, textAlign: "center", marginBottom: 12 }}>
                {selectedAnswer === s.correct ? "✅ صحيح!" : `❌ الإجابة الصحيحة: ${s.correct}`}
              </div>
              <button onClick={nextPractice} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {practiceIdx < SITUATIONS.length - 1 ? "الموقف التالي →" : "إعادة التمرين"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={() => { setSelectedCategory(null); setActiveTab("phrases"); }} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: `${selectedCategory.color}20`, color: selectedCategory.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 8, fontWeight: 700 }}>💬</div>
            <h2 style={{ margin: "0 0 4px" }}>{selectedCategory.categoryAr}</h2>
            <div style={{ color: "var(--text-soft)", fontSize: 13 }}>{selectedCategory.phrases.length} عبارة</div>
          </div>

          <button onClick={() => selectedCategory.phrases.forEach(p => speakGerman(p.de))} style={{ width: "100%", padding: 10, borderRadius: 10, border: `2px solid ${selectedCategory.color}`, background: "transparent", color: selectedCategory.color, fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 16 }}>
            🔊 استمع لجميع العبارات
          </button>

          {selectedCategory.phrases.map((p, i) => (
            <div key={i} style={{ padding: 14, marginBottom: 10, borderRadius: 12, background: "var(--bg-soft)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, direction: "ltr", textAlign: "left", marginBottom: 4, fontWeight: 600 }}>{p.de}</div>
                  <div style={{ fontSize: 14, color: "var(--text-soft)" }}>{p.ar}</div>
                </div>
                <button onClick={() => speakGerman(p.de)} style={{ minWidth: 36, height: 36, borderRadius: 10, border: `2px solid ${selectedCategory.color}`, background: "transparent", color: selectedCategory.color, fontWeight: 700, cursor: "pointer", fontSize: 14, flexShrink: 0 }}>🔊</button>
              </div>
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
        <h2>💼 عبارات الأعمال</h2>
        <p style={{ color: "var(--text-soft)" }}>عبارات الاجتماعات والمحادثات المهنية</p>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
        {[{ id: "phrases", label: "📚 العبارات" }, { id: "practice", label: "🎯 التمرين" }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "8px 20px", borderRadius: 999, border: "2px solid", borderColor: activeTab === t.id ? "#8b5cf6" : "var(--border)", background: activeTab === t.id ? "#8b5cf6" : "var(--bg)", color: activeTab === t.id ? "#fff" : "var(--text)", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {PHRASES.map(cat => (
          <div key={cat.category} onClick={() => { setSelectedCategory(cat); setActiveTab("phrases"); }} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cat.color}20`, color: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 10, fontWeight: 700 }}>💬</div>
            <h3 style={{ margin: "0 0 4px", fontSize: 15 }}>{cat.categoryAr}</h3>
            <div style={{ fontSize: 12, color: "var(--text-soft)" }}>{cat.phrases.length} عبارة</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>🎯 كيف تستخدم العبارات؟</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
          {[
            { situation: "بداية الاجتماع", phrase: "Lassen Sie uns beginnen." },
            { situation: "ال agreeing مع الزميل", phrase: "Das sehe ich genauso." },
            { situation: "طرح سؤال", phrase: "Können Sie das bitte genauer erklären؟" },
            { situation: "تلخيص النقاط", phrase: "Lassen Sie mich zusammenfassen." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "10px 14px", background: "var(--bg-soft)", borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ color: "var(--text-soft)", fontSize: 12, marginBottom: 4 }}>{item.situation}</div>
              <div style={{ fontWeight: 700, direction: "ltr", textAlign: "left" }}>{item.phrase}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
