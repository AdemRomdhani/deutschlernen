import { useState } from "react";
import { speakGerman } from "../speech.js";

const WORD_SETS = [
  {
    de: "Guten Tag", ar: "مرحباً", pron: "غوتن تاغ",
    sentences: [
      { de: "Guten Tag, wie geht es Ihnen?", ar: "مرحباً، كيف حالك؟" },
      { de: "Guten Tag, mein Name ist Anna.", ar: "مرحباً، اسمي آنا." },
      { de: "Guten Tag, kann ich Ihnen helfen?", ar: "مرحباً، هل يمكنني مساعدتك؟" }
    ]
  },
  {
    de: "Danke", ar: "شكراً", pron: "دانكه",
    sentences: [
      { de: "Danke für Ihre Hilfe.", ar: "شكراً لمساعدتك." },
      { de: "Danke schön für das Geschenk.", ar: "شكراً جزيلاً على الهديا." },
      { de: "Vielen Dank für Ihre Zeit.", ar: "شكراً جزيلاً لوقتك." }
    ]
  },
  {
    de: "Entschuldigung", ar: "عذراً", pron: "إنتشولديغونغ",
    sentences: [
      { de: "Entschuldigung, wo ist der Bahnhof?", ar: "عذراً، أين محطة القطار؟" },
      { de: "Entschuldigung, ich habe Sie nicht gehört.", ar: "عذراً، لم أسمعك." },
      { de: "Entschuldigung, können Sie das wiederholen?", ar: "عذراً، هل يمكنك تكرار ذلك؟" }
    ]
  },
  {
    de: "Verstehen", ar: "يفهم / أفهم", pron: "فيرشتاين",
    sentences: [
      { de: "Ich verstehe das nicht.", ar: "لا أفهم ذلك." },
      { de: "Verstehen Sie mich?", ar: "هل تفهمني؟" },
      { de: "Ich habe alles verstanden.", ar: "فهمت كل شيء." }
    ]
  },
  {
    de: "Helfen", ar: "يساعد", pron: "هيلفن",
    sentences: [
      { de: "Können Sie mir helfen?", ar: "هل يمكنك مساعدتي؟" },
      { de: "Ich helfe dir gerne.", ar: "يسعدني مساعدتك." },
      { de: "Wer kann mir helfen?", ar: "من يمكنه مساعدتي؟" }
    ]
  },
  {
    de: "Wohnen", ar: "يسكن", pron: "فونن",
    sentences: [
      { de: "Wo wohnen Sie?", ar: "أين تسكن؟" },
      { de: "Ich wohne in Berlin.", ar: "أسكن في برلين." },
      { de: "Er wohnt in einer kleinen Wohnung.", ar: "يسكن في شقة صغيرة." }
    ]
  },
  {
    de: "Arbeiten", ar: "يعمل", pron: "آربايتن",
    sentences: [
      { de: "Wo arbeiten Sie?", ar: "أين تعمل؟" },
      { de: "Ich arbeite als Ingenieur.", ar: "أعمل كمهندس." },
      { de: "Er arbeitet jeden Tag.", ar: "يعمل كل يوم." }
    ]
  },
  {
    de: "Essen", ar: "يأكل", pron: "إسن",
    sentences: [
      { de: "Was möchtest du essen?", ar: "ماذا تريد أن تأكل؟" },
      { de: "Ich esse gern italienisches Essen.", ar: "أحب الأكل الإيطالي." },
      { de: "Wir essen um acht Uhr.", ar: "نتغدى الساعة الثامنة." }
    ]
  }
];

export default function ContextualLearning({ levelIdx, onBack, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [learned, setLearned] = useState([]);
  const [review, setReview] = useState([]);
  const [currentSentence, setCurrentSentence] = useState(0);

  const word = WORD_SETS[currentIdx];
  const total = WORD_SETS.length;

  const markLearned = () => {
    setLearned(prev => [...prev, currentIdx]);
    goNext();
  };

  const markReview = () => {
    setReview(prev => [...prev, currentIdx]);
    goNext();
  };

  const goNext = () => {
    setCurrentSentence(0);
    if (currentIdx < total - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      const score = Math.round((learned.length / total) * 100);
      onComplete(Math.min(score, 100));
    }
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>Contextual Learning</h2>
          <span style={{ fontSize: 13, color: "var(--text-soft)" }}>{currentIdx + 1}/{total}</span>
        </div>

        <div style={{ background: "var(--bg-soft)", borderRadius: 8, height: 6, marginBottom: 20 }}>
          <div style={{ background: "var(--accent, #3b82f6)", height: "100%", borderRadius: 8, width: `${((currentIdx + 1) / total) * 100}%`, transition: "width 0.3s" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 800, direction: "ltr", marginBottom: 4 }}>{word.de}</div>
          <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 4 }}>{word.pron}</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>{word.ar}</div>
          <button onClick={() => speakGerman(word.de, { rate: 0.75 })} style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 16px", color: "var(--text)", cursor: "pointer", fontSize: 13 }}>
            Listen
          </button>
        </div>

        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-soft)", marginBottom: 10 }}>Example sentences:</div>
        {word.sentences.map((s, i) => (
          <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, direction: "ltr", textAlign: "left", marginBottom: 2 }}>{s.de}</div>
              <div style={{ fontSize: 13, color: "var(--text-soft)" }}>{s.ar}</div>
            </div>
            <button onClick={() => speakGerman(s.de, { rate: 0.75 })} style={{ background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", color: "var(--text)", cursor: "pointer", fontSize: 12, flexShrink: 0 }}>
              🔊
            </button>
          </div>
        ))}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={markReview} style={{ flex: 1, padding: 14, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "var(--text)", cursor: "pointer" }}>
            Need Review
          </button>
          <button onClick={markLearned} style={{ flex: 1, padding: 14, background: "#10b981", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
            Learned ✓
          </button>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
          <div style={{ fontSize: 13, color: "#10b981" }}>Learned: {learned.length}</div>
          <div style={{ fontSize: 13, color: "#f59e0b" }}>Review: {review.length}</div>
        </div>
      </div>
    </div>
  );
}
