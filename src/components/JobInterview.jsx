import { useState } from "react";
import { speakGerman } from "../speech.js";

const QUESTIONS = [
  {
    id: 1, category: "Vorstellung", categoryAr: "التعريف",
    question: "Erzählen Sie etwas über sich selbst.",
    questionAr: "أخبرنا عن نفسك.",
    options: [
      "Ich bin 28 Jahre alt und habe ein Studium in Informatik abgeschlossen.",
      "Ich komme aus Berlin und mag Pizza.",
      "Mein Lieblingsfarbe ist Blau.",
      "Ich habe einen Hund.",
    ],
    correct: 0,
    model: "Ich bin [Alter] Jahre alt und habe [Ausbildung] abgeschlossen. Ich habe [X] Jahre Erfahrung in [Bereich]. Besonders interessiert mich [Interesse].",
    modelAr: "أنا في عمر [السن] وأنهيت [التعليم]. لدي خبرة [عدد] سنوات في [المجال]. أهتم بشكل خاص بـ [الاهتمام]."
  },
  {
    id: 2, category: "Vorstellung", categoryAr: "التعريف",
    question: "Was sind Ihre Stärken?",
    questionAr: "ما نقاط قوتك؟",
    options: [
      "Ich bin teamfähig und lösungsorientiert.",
      "Ich bin groß und stark.",
      "Ich esse viel.",
      "Ich schlafe gern.",
    ],
    correct: 0,
    model: "Zu meinen Stärken gehören Teamfähigkeit, Problemlösungskompetenz und Zuverlässigkeit.",
    modelAr: "من نقاط قوتي القدرة على العمل في فريق، حل المشكلات، والموثوقية."
  },
  {
    id: 3, category: "Vorstellung", categoryAr: "التعريف",
    question: "Warum möchten Sie bei uns arbeiten?",
    questionAr: "لماذا تريد العمل معنا؟",
    options: [
      "Ich bewundere Ihre Unternehmenskultur und möchte mein Wissen einbringen.",
      "Weil Sie viel Geld bezahlen.",
      "Weil ich arbeitslos bin.",
      "Weil es nah an meinem Zuhause ist.",
    ],
    correct: 0,
    model: "Ich interessiere mich für Ihr Unternehmen wegen [Grund]. Ich kann meine Erfahrung in [Bereich] einbringen.",
    modelAr: "أهتم بشركتكم بسبب [السبب]. يمكنني المساهمة بخبرتي في [المجال]."
  },
  {
    id: 4, category: "Erfahrung", categoryAr: "الخبرة",
    question: "Beschreiben Sie eine Herausforderung, die Sie gemeistert haben.",
    questionAr: "صف تحدٍّ تغلبت عليه.",
    options: [
      "In meinem letzten Projekt musste ich ein Team von 5 Leuten koordinieren.",
      "Ich habe einmal 100 Euro verloren.",
      "Ich bin mal hingefallen.",
      "Ich habe schlechte Noten bekommen.",
    ],
    correct: 0,
    model: "In meiner letzten Position stand ich vor [Problem]. Durch [Maßnahme] konnte ich [Ergebnis] erreichen.",
    modelAr: "في وظيفتي السابقة واجهت [المشكلة]. من خلال [الإجراء] تمكنت من تحقيق [النتيجة]."
  },
  {
    id: 5, category: "Erfahrung", categoryAr: "الخبرة",
    question: "Was ist Ihr größter Erfolg?",
    questionAr: "ما أكبر إنجاز لك؟",
    options: [
      "Ich habe ein Projekt geleitet, das 20% Kosteneinsparungen erzielte.",
      "Ich habe einmal ein Spiel gewonnen.",
      "Ich habe einen Kuchen gebacken.",
      "Ich habe mein Zimmer aufgeräumt.",
    ],
    correct: 0,
    model: "Mein größter Erfolg war [Projekt], bei dem ich [Ergebnis] erreicht habe.",
    modelAr: "أكبر إنجاز لي كان [المشروع] حيث حققت [النتيجة]."
  },
  {
    id: 6, category: "Zukunft", categoryAr: "المستقبل",
    question: "Wo sehen Sie sich in 5 Jahren?",
    questionAr: "أين ترى نفسك بعد 5 سنوات؟",
    options: [
      "Ich möchte mich weiterentwickeln und Verantwortung übernehmen.",
      "Ich möchte reich sein und nicht arbeiten.",
      "Ich weiß nicht.",
      "Ich möchte in einem anderen Land leben.",
    ],
    correct: 0,
    model: "In fünf Jahren sehe ich mich in einer Führungsposition, in der ich meine Erfahrungen einbringen kann.",
    modelAr: "بعد خمس سنوات أرى نفسي في منصب قيادي حيث يمكنني المساهمة بخبراتي."
  },
  {
    id: 7, category: "Fragen", categoryAr: "الأسئلة",
    question: "Haben Sie Fragen an uns?",
    questionAr: "هل لديك أسئلة لنا؟",
    options: [
      "Ja, wie sieht ein typischer Arbeitstag aus?",
      "Nein, ich habe keine Fragen.",
      "Wann kann ich anfangen?",
      "Wie viel kostet der Kaffee?",
    ],
    correct: 0,
    model: "Ja, mich interessiert: Wie sieht ein typischer Arbeitstag aus? Welche Weiterbildungsmöglichkeiten gibt es?",
    modelAr: "نعم، أريد أن أعرف: كيف يبدو يوم العمل العادي؟ ما هي فرص التدريب المتاحة؟"
  },
];

export default function JobInterview({ onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = QUESTIONS[currentQ];
  const total = QUESTIONS.length;

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const correct = idx === question.correct;
    setAnswers(a => [...a, { correct, question }]);
    if (correct) setScore(s => s + 1);
  };

  const next = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowResult(false);
      setShowModel(false);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    const pct = Math.round((score / total) * 100);
    return (
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{pct >= 70 ? "🎉" : "💪"}</div>
          <h2>اكتملت المقابلة!</h2>
          <div style={{ fontSize: 48, fontWeight: 800, margin: "16px 0", color: pct >= 70 ? "#10b981" : "#ef4444" }}>{pct}%</div>
          <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 20 }}>{score}/{total} إجابات صحيحة</div>
          <div style={{ padding: 14, background: "var(--bg-soft)", borderRadius: 12, marginBottom: 20, textAlign: "start", fontSize: 14, lineHeight: 2 }}>
            <strong>نصائح للمقابلة:</strong>
            <ul style={{ margin: "8px 0", paddingInlineStart: 20 }}>
              <li>كن واثقاً من نفسك</li>
              <li>استخدم أمثلة من خبراتك</li>
              <li>اسأل أسئلة ذكية</li>
              <li>كن صادقاً في إجاباتك</li>
            </ul>
          </div>
          <button onClick={onBack} style={{ padding: "12px 24px", borderRadius: 10, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>العودة</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2>💼 محاكاة مقابلة عمل</h2>
        <p style={{ color: "var(--text-soft)" }}>تدرب على أسئلة المقابلات بالألمانية</p>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(139,92,246,0.1)", color: "#8b5cf6", fontWeight: 700, fontSize: 12 }}>{question.categoryAr}</span>
          <span style={{ color: "var(--text-soft)", fontSize: 13 }}>{currentQ + 1}/{total}</span>
        </div>

        <div style={{ background: "var(--bg-soft)", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 18, fontWeight: 700, direction: "ltr", textAlign: "left", marginBottom: 8 }}>{question.question}</div>
          <div style={{ fontSize: 14, color: "var(--text-soft)" }}>{question.questionAr}</div>
        </div>

        <button onClick={() => speakGerman(question.question)} style={{ padding: "8px 16px", borderRadius: 10, border: "2px solid #8b5cf6", background: "transparent", color: "#8b5cf6", fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 16 }}>🔊 استمع للسؤال</button>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                padding: "14px 16px", borderRadius: 12, border: "2px solid",
                borderColor: showResult ? (i === question.correct ? "#10b981" : i === selected ? "#ef4444" : "var(--border)") : "var(--border)",
                background: showResult ? (i === question.correct ? "rgba(16,185,129,0.1)" : i === selected ? "rgba(239,68,68,0.1)" : "var(--bg)") : "var(--bg)",
                color: "var(--text)", fontWeight: 500, cursor: showResult ? "default" : "pointer", textAlign: "start", fontSize: 15, lineHeight: 1.6
              }}
            >
              {["أ", "ب", "ج", "د"][i]}. {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div style={{ marginTop: 16 }}>
            <div style={{ padding: 14, borderRadius: 12, background: selected === question.correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${selected === question.correct ? "#10b981" : "#ef4444"}`, marginBottom: 12, textAlign: "center", fontWeight: 700, color: selected === question.correct ? "#10b981" : "#ef4444" }}>
              {selected === question.correct ? "✅ إجابة صحيحة!" : "❌ إجابة خاطئة"}
            </div>

            {!showModel && (
              <button onClick={() => setShowModel(true)} style={{ width: "100%", padding: 12, borderRadius: 10, border: "2px solid #f59e0b", background: "transparent", color: "#f59e0b", fontWeight: 700, cursor: "pointer", fontSize: 13, marginBottom: 12 }}>
                💡 عرض الإجابة النموذجية
              </button>
            )}

            {showModel && (
              <div style={{ padding: 16, background: "rgba(245,158,11,0.05)", borderRadius: 12, border: "1px solid #f59e0b", marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, color: "#f59e0b" }}>💡 الإجابة النموذجية:</div>
                <div style={{ fontSize: 14, direction: "ltr", textAlign: "left", lineHeight: 1.8, marginBottom: 8 }}>{question.model}</div>
                <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{question.modelAr}</div>
                <button onClick={() => speakGerman(question.model)} style={{ marginTop: 8, padding: "6px 14px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>🔊 استمع للإجابة</button>
              </div>
            )}

            <button onClick={next} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
              {currentQ < total - 1 ? "السؤال التالي →" : "إنهاء المقابلة"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
