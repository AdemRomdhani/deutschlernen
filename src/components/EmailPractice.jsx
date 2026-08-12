import { useState } from "react";
import { speakGerman } from "../speech.js";

const TEMPLATES = [
  {
    id: 1, type: "formal", name: "رسالة تقديم وظيفة", nameAr: "Bewerbung",
    greeting: "Sehr geehrte Damen und Herren,",
    body: [
      { text: "hiermit bewerbe ich mich um die Stelle als ", blank: true, answer: "Bewerbung" },
      { text: " in Ihrem Unternehmen.", blank: false },
      { text: "Ich habe ", blank: true, answer: "Erfahrung" },
      { text: " in diesem Bereich und bin motiviert, Ihr Team zu verstärken.", blank: false },
      { text: "Mein Lebenslauf ist im Anhang.", blank: false },
    ],
    closing: "Mit freundlichen Grüßen",
    vocab: [
      { de: "die Bewerbung", ar: "التقديم على الوظيفة" },
      { de: "die Erfahrung", ar: "الخبرة" },
      { de: "der Lebenslauf", ar: "السيرة الذاتية" },
      { de: "der Anhang", ar: "المرفق" },
    ]
  },
  {
    id: 2, type: "formal", name: "رسالة رسمية لعميل", nameAr: "Formelle E-Mail an Kunden",
    greeting: "Sehr geehrter Herr Müller,",
    body: [
      { text: "vielen Dank für Ihre Anfrage vom ", blank: true, answer: "Dienstag" },
      { text: ".", blank: false },
      { text: "Wir werden Ihre Anfrage umgehend bearbeiten.", blank: false },
      { text: "Bei weiteren Fragen stehe ich Ihnen gerne zur Verfügung.", blank: false },
      { text: "Ich freue mich auf Ihre Rückmeldung.", blank: false },
    ],
    closing: "Mit freundlichen Grüßen",
    vocab: [
      { de: "die Anfrage", ar: "الاستفسار" },
      { de: "umgehend", ar: "فوراً" },
      { de: "bearbeiten", ar: "يعالج" },
      { de: "die Rückmeldung", ar: "الرد" },
    ]
  },
  {
    id: 3, type: "informal", name: "رسالة لصديق", nameAr: "E-Mail an Freund",
    greeting: "Hallo Anna,",
    body: [
      { text: "wie geht es dir? Ich hoffe, es geht dir gut.", blank: false },
      { text: "Am ", blank: true, answer: "Samstag" },
      { text: " treffen wir uns zum Kaffee, oder?", blank: false },
      { text: "Ich habe viel zu erzählen!", blank: false },
      { text: "Schreib mir bitte zurück.", blank: false },
    ],
    closing: "Viele Grüße",
    vocab: [
      { de: "wie geht es dir?", ar: "كيف حالك؟" },
      { de: "der Samstag", ar: "السبت" },
      { de: "zurückschreiben", ar: "يرد" },
      { de: "erzählen", ar: "يروي" },
    ]
  },
  {
    id: 4, type: "informal", name: "دعوة لمناسبة", nameAr: "Einladung",
    greeting: "Hallo zusammen,",
    body: [
      { text: "ich lade Sie herzlich zu meinem ", blank: true, answer: "Geburtstag" },
      { text: " ein.", blank: false },
      { text: "Es findet am ", blank: true, answer: "Freitag" },
      { text: " um 19 Uhr bei mir zu Hause statt.", blank: false },
      { text: "Bitte gebt Bescheid, ob ihr kommen könnt.", blank: false },
    ],
    closing: "Liebe Grüße",
    vocab: [
      { de: "einladen", ar: "يدعو" },
      { de: "der Geburtstag", ar: "عيد الميلاد" },
      { de: "der Freitag", ar: "الجمعة" },
      { de: "Bescheid geben", ar: "يخبر" },
    ]
  },
  {
    id: 5, type: "formal", name: "شكوى رسمية", nameAr: "Beschwerde",
    greeting: "Sehr geehrte Damen und Herren,",
    body: [
      { text: "ich möchte mich über ", blank: true, answer: "den Lieferverzug" },
      { text: " beschweren.", blank: false },
      { text: "Die Ware wurde bis heute nicht geliefert.", blank: false },
      { text: "Ich bitte um eine sofortige Stellungnahme.", blank: false },
      { text: "Andernfalls sehe ich mich gezwungen, rechtliche Schritte einzuleiten.", blank: false },
    ],
    closing: "Mit freundlichen Grüßen",
    vocab: [
      { de: "die Beschwerde", ar: "الشكوى" },
      { de: "der Lieferverzug", ar: "تأخير التوصيل" },
      { de: "die Stellungnahme", ar: "التصريح" },
      { de: "rechtliche Schritte", ar: "إجراءات قانونية" },
    ]
  },
];

export default function EmailPractice({ onBack }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [revealed, setRevealed] = useState(new Set());
  const [showVocab, setShowVocab] = useState(false);

  const blanks = selectedTemplate ? selectedTemplate.body.filter(b => b.blank) : [];
  const filledCount = blanks.filter((b, i) => {
    const key = selectedTemplate.body.indexOf(b);
    return userInputs[key] && userInputs[key].trim().length > 0;
  }).length;

  const handleCheck = () => {
    const newRevealed = new Set();
    selectedTemplate.body.forEach((b, i) => {
      if (b.blank) newRevealed.add(i);
    });
    setRevealed(newRevealed);
  };

  const getCorrectCount = () => {
    let correct = 0;
    selectedTemplate.body.forEach((b, i) => {
      if (b.blank && revealed.has(i)) {
        if ((userInputs[i] || "").trim().toLowerCase() === b.answer.toLowerCase()) correct++;
      }
    });
    return correct;
  };

  if (selectedTemplate) {
    const t = selectedTemplate;
    const correctCount = revealed.size > 0 ? getCorrectCount() : 0;

    return (
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={() => { setSelectedTemplate(null); setUserInputs({}); setRevealed(new Set()); setShowVocab(false); }} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>✉️</div>
            <h2 style={{ margin: "0 0 4px" }}>{t.nameAr}</h2>
            <span style={{ padding: "3px 10px", borderRadius: 8, background: t.type === "formal" ? "rgba(59,130,246,0.1)" : "rgba(16,185,129,0.1)", color: t.type === "formal" ? "#3b82f6" : "#10b981", fontWeight: 600, fontSize: 12 }}>
              {t.type === "formal" ? "رسمي" : "غير رسمي"}
            </span>
          </div>

          <div style={{ background: "var(--bg-soft)", borderRadius: 12, padding: 20, border: "1px solid var(--border)", direction: "ltr", textAlign: "left", lineHeight: 2.4, fontSize: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>{t.greeting}</div>
            {t.body.map((part, i) => (
              <span key={i}>
                {part.blank ? (
                  revealed.has(i) ? (
                    <span style={{
                      padding: "2px 10px", borderRadius: 6, fontWeight: 700,
                      background: (userInputs[i] || "").trim().toLowerCase() === part.answer.toLowerCase() ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
                      color: (userInputs[i] || "").trim().toLowerCase() === part.answer.toLowerCase() ? "#10b981" : "#ef4444",
                      borderBottom: `2px solid ${(userInputs[i] || "").trim().toLowerCase() === part.answer.toLowerCase() ? "#10b981" : "#ef4444"}`
                    }}>
                      {(userInputs[i] || "").trim().toLowerCase() === part.answer.toLowerCase() ? userInputs[i] : part.answer}
                    </span>
                  ) : (
                    <input
                      value={userInputs[i] || ""}
                      onChange={e => setUserInputs(prev => ({ ...prev, [i]: e.target.value }))}
                      style={{ width: "auto", minWidth: 100, padding: "2px 10px", borderRadius: 6, border: "2px dashed #8b5cf6", background: "rgba(139,92,246,0.05)", color: "var(--text)", fontSize: 16, fontWeight: 700 }}
                      placeholder="..."
                    />
                  )
                ) : null}
                {part.text}{" "}
              </span>
            ))}
            <div style={{ marginTop: 16, fontWeight: 700 }}>{t.closing}</div>
          </div>

          {revealed.size > 0 && (
            <div style={{ textAlign: "center", margin: "16px 0", padding: 14, background: correctCount === blanks.length ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", borderRadius: 12, color: correctCount === blanks.length ? "#10b981" : "#f59e0b", fontWeight: 700 }}>
              {correctCount === blanks.length ? "🎉 ممتاز! كل الإجابات صحيحة!" : `النتيجة: ${correctCount}/${blanks.length} صحيحة`}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button onClick={handleCheck} style={{ flex: 1, padding: 12, borderRadius: 10, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>تحقق</button>
            <button onClick={() => { const r = new Set(); t.body.forEach((b, i) => { if (b.blank) r.add(i); }); setRevealed(r); }} style={{ padding: "12px 20px", borderRadius: 10, border: "2px solid #f59e0b", background: "transparent", color: "#f59e0b", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>💡</button>
          </div>

          <button onClick={() => setShowVocab(!showVocab)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "2px solid #8b5cf6", background: showVocab ? "#8b5cf6" : "transparent", color: showVocab ? "#fff" : "#8b5cf6", fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 12 }}>
            {showVocab ? "إخفاء المفردات" : "📚 عرض المفردات"}
          </button>

          {showVocab && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {t.vocab.map((v, i) => (
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
        <h2>✉️ تمارين كتابة الرسائل</h2>
        <p style={{ color: "var(--text-soft)" }}>تعلم كتابة رسائل بالألمانية بقوالب مختلفة</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
        {TEMPLATES.map(t => (
          <div key={t.id} onClick={() => setSelectedTemplate(t)} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#8b5cf6"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>✉️</div>
            <h3 style={{ margin: "0 0 4px", fontSize: 15 }}>{t.nameAr}</h3>
            <div style={{ fontSize: 12, color: "var(--text-soft)", marginBottom: 8 }}>{blanks.filter(b => b.blank).length} مفرغات</div>
            <span style={{ padding: "3px 10px", borderRadius: 8, background: t.type === "formal" ? "rgba(59,130,246,0.1)" : "rgba(16,185,129,0.1)", color: t.type === "formal" ? "#3b82f6" : "#10b981", fontWeight: 600, fontSize: 12 }}>
              {t.type === "formal" ? "رسمي" : "غير رسمي"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
