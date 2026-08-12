import { useState } from "react";
import { LEVELS, shuffle } from "../data.js";

const CONTEXT_SENTENCES = {
  A1: [
    { de: "Hallo! Ich heiße Ahmad.", ar: "مرحباً! اسمي أحمد.", words: ["Hallo", "heiße"], context: "التحيات" },
    { de: "Guten Morgen, wie geht es Ihnen?", ar: "صباح الخير، كيف حالك؟", words: ["Guten", "Morgen", "geht"], context: "التحيات الصباحية" },
    { de: "Ich komme aus Tunesien.", ar: "أنا من تونس.", words: ["komme", "aus"], context: "التعريف بالنفس" },
    { de: "Die Katze schläft auf dem Sofa.", ar: "القطة تنام على الأريكة.", words: ["Katze", "schläft", "auf"], context: "الحيوانات" },
    { de: "Wir gehen heute ins Kino.", ar: "اليوم نذهب إلى السينما.", words: ["gehen", "heute", "ins"], context: "الأنشطة" },
    { de: "Können Sie mir bitte helfen?", ar: "هل يمكنك مساعدتي من فضلك؟", words: ["Können", "helfen"], context: "طلب المساعدة" }
  ],
  A2: [
    { de: "Gestern war ich im Supermarkt und habe Brot gekauft.", ar: "أمس ذهبت إلى السوبر ماركت وشتريت خبزاً.", words: ["Gestern", "gekauft"], context: "التسوق" },
    { de: "Ich muss morgen früh aufstehen.", ar: "يجب أن أستيقظ مبكراً غداً.", words: ["muss", "aufstehen"], context: "الروتين اليومي" },
    { de: "Meine Schwester arbeitet als Lehrerin.", ar: "أختي تعمل كمعلمة.", words: ["Schwester", "arbeitet", "als"], context: "المهن" },
    { de: "Der Zug fährt um acht Uhr ab.", ar: "القطار يغادر الساعة الثامنة.", words: ["Zug", "fährt", "ab"], context: "السفر" },
    { de: "Ich habe gestern lange mit meinem Freund telefoniert.", ar: "أمس تحدثت لوقت طويل مع صديقي.", words: ["telefoniert"], context: "التواصل" }
  ],
  B1: [
    { de: "Obwohl es regnet, gehen wir trotzdem spazieren.", ar: "رغم المطر نذهب للتنزه.", words: ["Obwohl", "trotzdem"], context: "الروابط" },
    { de: "Ich hätte gern mehr Zeit, um meine Hobbys zu pflegen.", ar: "أود أن يكون لدي وقت أكثر لهواياتي.", words: ["hätte", "um...zu"], context: "التمني" },
    { de: "Die Ergebnisse der Studie waren ziemlich überraschend.", ar: "كانت نتائج الدراسة مفاجئة جداً.", words: ["Ergebnisse", "überraschend"], context: "الأكاديمي" },
    { de: "Er sagt, dass er nächstes Jahr nach Deutschland ziehen will.", ar: "يقول إنه يريد الانتقال إلى ألمانيا العام المقبل.", words: ["dass", "ziehen"], context: "نقل الكلام" }
  ],
  B2: [
    { de: "Die Politiker diskutieren über die Zukunft der Energieversorgung.", ar: "يناقش السياسيون مستقبل تزويد الطاقة.", words: ["diskutieren", "Energieversorgung"], context: "السياسة" },
    { de: "Man sollte regelmäßig Sport treiben, um gesund zu bleiben.", ar: "يجب ممارسة الرياضة بانتظام للبقاء بصحة جيدة.", words: ["sollte", "regelmäßig"], context: "النصيحة" },
    { de: "Die Firma hat beschlossen, neue Arbeitsplätze zu schaffen.", ar: "قررت الشركة إنشاء فرص عمل جديدة.", words: ["beschlossen", "schaffen"], context: "الأعمال" }
  ],
  C1: [
    { de: "Die Regierung hat neue Maßnahmen gegen den Klimawandel beschlossen.", ar: "قررت الحكومة تدابير جديدة ضد تغير المناخ.", words: ["Maßnahmen", "Klimawandel"], context: "البيئة" },
    { de: "Es ist notwendig, dass wir unsere Strategie grundlegend überdenken.", ar: "من الضروري أن نعيد التفكير في استراتيجيتنا بشكل جذري.", words: ["notwendig", "überdenken"], context: "التخطيط" }
  ],
  C2: [
    { de: "Angesichts der wirtschaftlichen Lage sind wir zur Vorsicht verpflichtet.", ar: "نظراً للوضع الاقتصادي نحن ملزمون بالحذر.", words: ["Angesichts", "verpflichtet"], context: "الرسمية" },
    { de: "Die Fülle an Informationen macht eine fundierte Entscheidung schwierig.", ar: "كثرة المعلومات تجعل القرار المدروس صعباً.", words: ["Fülle", "fundiert"], context: "الأكاديمي" }
  ]
};

export default function ContextLearning({ levelIdx, onBack, onComplete }) {
  const level = LEVELS[levelIdx]?.code || "A1";
  const [sentences] = useState(() => shuffle(CONTEXT_SENTENCES[level] || CONTEXT_SENTENCES.A1));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showHighlight, setShowHighlight] = useState(false);
  const [score, setScore] = useState(0);
  const [viewMode, setViewMode] = useState("sentences"); // sentences | words

  const current = sentences[currentIdx];
  const total = sentences.length;

  const highlightWords = (sentence, words) => {
    if (!showHighlight) return sentence;
    let result = sentence;
    words.forEach(word => {
      result = result.replace(new RegExp(`(${word})`, "gi"), `<mark class="highlight">$1</mark>`);
    });
    return result;
  };

  const goNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(i => i + 1);
      setShowHighlight(false);
    } else {
      onComplete(score);
    }
  };

  const markAsLearned = () => {
    setScore(s => s + Math.round(100 / total));
    goNext();
  };

  const skip = () => {
    goNext();
  };

  return (
    <div className="context-learning">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="context-header">
        <h2>📖 Context Learning — تعلم السياق</h2>
        <div className="context-level">{level}</div>
      </div>

      <div className="context-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
        </div>
        <span>{currentIdx + 1}/{total}</span>
      </div>

      <div className="context-content">
        <div className="context-badge">{current.context}</div>

        <div className="context-sentence">
          <div
            className="de-sentence"
            dangerouslySetInnerHTML={{ __html: highlightWords(current.de, current.words) }}
          />
          <div className="ar-sentence">{current.ar}</div>
        </div>

        <div className="context-actions">
          <button
            className="btn-highlight"
            onClick={() => setShowHighlight(!showHighlight)}
          >
            {showHighlight ? "🔍 إخفاء الكلمات المهمة" : "🔍 أظهر الكلمات المهمة"}
          </button>
        </div>

        {showHighlight && (
          <div className="context-words">
            <h4>الكلمات المهمة:</h4>
            <div className="words-list">
              {current.words.map((word, i) => (
                <span key={i} className="context-word">{word}</span>
              ))}
            </div>
          </div>
        )}

        <div className="context-nav">
          <button className="btn-skip" onClick={skip}>⏭ تخطي</button>
          <button className="btn-learned" onClick={markAsLearned}>✅ تعلمتها</button>
        </div>
      </div>
    </div>
  );
}
