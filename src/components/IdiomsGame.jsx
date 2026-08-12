import { useState } from "react";
import { speakGerman, stopSpeaking } from "../speech.js";

const IDIOMS = [
  {
    de: "Die Daumen drücken",
    literal: "ضغط الإبهامين",
    correct: "أฃومئ بالسلامة / أتمنى التوفيق",
    options: ["أฃومئ بالسلامة / أتمنى التوفيق", "أضغط على يدي", "أحبك كثيراً", "أنا غاضب"],
    explanation: "تعبير ألماني شائع يعني \"تمني التوفيق\" لشخص ما. يُستخدم عندما يتمنى شخص نجاح آخر في مهمة معينة.",
    example: "Ich drücke dir die Daumen für die Prüfung!"
  },
  {
    de: "Schwein haben",
    literal: "أن يكون لدي خنزير",
    correct: "أن يكون محظوظاً",
    options: ["أن يكون محظوظاً", "أن يأكل لحم خنزير", "أن يكون غاضباً", "أن يشتري خنزيراً"],
    explanation: "تعني \"أن تكون محظوظاً\". في ألمانيا القديمة كان الخنزير رمزاً للحظ السعيد.",
    example: "Ich habe heute Schwein gehabt – ich habe die Prüfung bestanden!"
  },
  {
    de: "Den inneren Schweinehund überwinden",
    literal: "التغلب على خنزير الحبوب الداخلي",
    correct: "التغلب على الكسل",
    options: ["التغلب على الكسل", "إ.kill حيوان", "شراء خنزير", "النوم كثيراً"],
    explanation: "تعني التغلب على الدافع الداخلي للكسل أو التأجيل. مصطلح شائع للتحدث عن تجاوز الذات.",
    example: "Ich muss meinen inneren Schweinehund überwinden und ins Fitnessstudio gehen."
  },
  {
    de: "Alles hat ein Ende, nur die Wurst hat zwei",
    literal: "كل شيء له نهاية، فقط النقانق لها اثنتان",
    correct: "كل شيء ينتي في النهاية",
    options: ["كل شيء ينتي في النهاية", "النقانق لذيذة جداً", "الألمانيون يحبون النقانق", "لا تأكل وجبات سريعة"],
    explanation: "تعبير مضحك يعني أن كل شيء له نهاية. النكتة في أن كلمة \"Wurst\" (نقانق) تنتهي بـ \"Ende\" (نهاية).",
    example: "Mach dir keine Sorgen, alles hat ein Ende, nur die Wurst hat zwei."
  },
  {
    de: "Tomaten auf den Augen haben",
    literal: "أن يكون لديك طماطم على عينيك",
    correct: "عدم ملاحظة شيء واضح",
    options: ["عدم ملاحظة شيء واضح", "أن تحب الطماطم", "عدم الرؤية جيداً", "أن تطبخ الطماطم"],
    explanation: "تعني أنك لا تلاحظ شيئاً واضحاً أمامك. تُستخدم عندما يكون شخص ما غير منتبه لشيء بديهي.",
    example: "Hast du Tomaten auf den Augen? Das Schild ist doch direkt vor dir!"
  },
  {
    de: "Die Daume drücken",
    literal: "ضغط الإبهام",
    correct: "تمني الحظ السعيد",
    options: ["تمني الحظ السعيد", "الضغط على زر", "الغضب من شخص", "الانسحاب من مسابقة"],
    explanation: "تعبير ألماني شائع يعني \"تمني الحظ السعيد\" لشخص ما. يُستخدم عندما يتمنى شخص نجاح آخر في مهمة معينة.",
    example: "Ich drücke dir die Daumen für die Prüfung!"
  },
  {
    de: "Keine Ahnung haben",
    literal: "لا يكون لدي فكرة",
    correct: "عدم المعرفة بشيء",
    options: ["عدم المعرفة بشيء", "أن يكون ذكياً جداً", "أن يعرف كل شيء", "عدم الاهتمام"],
    explanation: "تعني أنك لا تعرف شيئاً أو ليس لديك أي فكرة عن موضوع معين.",
    example: "Was ist die Hauptstadt von Usbekistan? Keine Ahnung!"
  },
  {
    de: "Das ist mir Wurst",
    literal: "هذا لي نقانق",
    correct: "لا يهمني هذا الأمر",
    options: ["لا يهمني هذا الأمر", "أحب النقانق", "هذا غريب جداً", "هذا صعب جداً"],
    explanation: "تعني \"لا يهمني\" أو \"لا يهم\". تعبير غير رسمي للتعبير عن عدم الاهتمام.",
    example: "Ob wir Pizza oder Pasta essen, ist mir Wurst."
  },
  {
    de: "Um den heißen Brei herumreden",
    literal: "التحدث حول العصيدة الساخنة",
    correct: "تجنب الحديث المباشر",
    options: ["تجنب الحديث المباشر", "التحدث عن الطعام", "ال Talk about weather", "ال Talk about sports"],
    explanation: "تعني التحدث حول الموضوع دون الخوض في التفاصيل المباشرة. tương tự لـ \"beating around the bush\" بالإنجليزية.",
    example: "Komm zum Punkt! Hör auf, um den heißen Brei herumzureden!"
  },
  {
    de: "Den Faden verlieren",
    literal: "فقدان الخيط",
    correct: "فقدان تركيز conversation",
    options: ["فقدان تركيز conversation", "خسارة في لعبة", "ضياع في الطريق", "نسيان كلمة"],
    explanation: "تعني فقدان التسلسل المنطقي في الحديث أو فقدان الموضوع الأصلي.",
    example: "Entschuldigung, ich habe den Faden verloren. Wo waren wir stehen geblieben?"
  },
  {
    de: "Den Nagel auf den Kopf treffen",
    literal: "ضرب المسمار على الرأس",
    correct: "إya正确的 الإجابة",
    options: ["إya正确的 الإجابة", "ضرب شخص", "إya正确的 الإجابة", "إصابة هدف"],
    explanation: "تعني أنك أصبت الصواب تماماً أو وصفت شيئاً بشكل دقيق. tương tự لـ \"hit the nail on the head\" بالإنجليزية.",
    example: "Du hast den Nagel auf den Kopf getroffen!"
  },
  {
    de: "Die Katze aus dem Sack lassen",
    literal: "إya正确的 الإجابة",
    correct: "كشف السر",
    options: ["كشف السر", "إya正确的 الإجابة", "إya正确的 الإجابة", "إya正确的 الإجابة"],
    explanation: "تعني كشف سر أو مفاجأة قبل أوانها. tương tự لـ \"let the cat out of the bag\" بالإنجليزية.",
    example: "Lass die Katze aus dem Sack! Was ist das Geheimnis?"
  },
  {
    de: "Bäume aus dem Wald reden",
    literal: "ال Talk about trees in the forest",
    correct: "ال Talk about irrelevant things",
    options: ["ال Talk about irrelevant things", "Talk about nature", "Talk about environment", "Talk about hiking"],
    explanation: "تعني التحدث عن مواضيع غير ذات صلة أو مهمة. tương tự لـ \"beating around the bush\" بالإنجليزية.",
    example: "Hör auf, Bäume aus dem Wald zu reden! Was ist wirklich passiert?"
  },
  {
    de: "Da steppt der Bär",
    literal: "هنا يرقص الدب",
    correct: "سيكون هناك حفلة رائعة",
    options: ["سيكون هناك حفلة رائعة", "هناك حيوانات في الغابة", "الدب مريض", "الحديقة مفتوحة"],
    explanation: "تعبير يعني أن هناك حفلة أو مناسبة ستكون ممتعة جداً. يُستخدم للتحدث عن أحداث مشوقة.",
    example: "Am Samstag steppt der Bär! Kommst du zur Party?"
  },
  {
    de: "In den sauren Apfel beißen",
    literal: "عض التفاح الحامض",
    correct: "تقبل situation صعبة",
    options: ["تقبل situation صعبة", "أكل فاكهة", "شراء تفاح", "الطبخ في المطبخ"],
    explanation: "تعني قبول شيء غير سار أو صعب. tương tự لـ \"bite the bullet\" بالإنجليزية.",
    example: "Ich muss in den sauren Apfel beißen und meinen Fehler zugeben."
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(options) {
  const correct = options[0];
  const shuffled = shuffle(options);
  return shuffled;
}

export default function IdiomsGame({ levelIdx, onBack, onComplete }) {
  const [idioms] = useState(() => shuffle(IDIOMS).slice(0, 8));
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState(() => shuffleOptions(idioms[0].options));

  const current = idioms[currentQ];
  const total = idioms.length;

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    const correct = shuffledOptions[idx] === current.correct;
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) setScore(s => s + 15);
  };

  const nextQuestion = () => {
    if (currentQ < total - 1) {
      const nextIdx = currentQ + 1;
      setCurrentQ(nextIdx);
      setShuffledOptions(shuffleOptions(idioms[nextIdx].options));
      setAnswered(false);
      setSelected(null);
      setIsCorrect(false);
    } else {
      const finalScore = Math.round((score / (total * 15)) * 100);
      onComplete(Math.min(finalScore, 100));
    }
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>

      <div className="game-head">
        <h2>💬 الأمثال الألمانية — Idioms</h2>
        <p>اختر الترجمة الصحيحة للمثل الألماني</p>
        <div className="game-score">
          <span>✅ {score} نقطة</span>
          <span>|</span>
          <span>{currentQ + 1}/{total}</span>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className="tf-card" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 8 }}>المثل الألماني</div>
          <div style={{ fontFamily: "var(--font-la)", fontWeight: 800, fontSize: 28, direction: "ltr", marginBottom: 6 }}>
            {current.de}
          </div>
          <div style={{ fontSize: 16, color: "var(--text-soft)", marginBottom: 12 }}>
            ({current.literal})
          </div>
          <button
            className="speak-btn"
            onClick={() => speakGerman(current.de)}
            style={{ marginBottom: 16 }}
          >
            🔊 استمع
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {shuffledOptions.map((opt, idx) => (
            <button
              key={idx}
              className={`tf-btn ${selected === idx ? (opt === current.correct ? "correct" : "wrong") : ""} ${
                answered && opt === current.correct ? "correct" : ""
              }`}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              style={{ textAlign: "center" }}
            >
              {opt}
            </button>
          ))}
        </div>

        {answered && (
          <div className={`dialogue-feedback ${isCorrect ? "good" : "bad"}`} style={{ marginBottom: 16 }}>
            {isCorrect ? "✅ ممتاز!" : "❌ غير صحيح"}
            <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.8 }}>
              <strong>الشرح:</strong> {current.explanation}
              <br />
              <strong>مثال:</strong> <span style={{ direction: "ltr", fontFamily: "var(--font-la)" }}>{current.example}</span>
            </div>
          </div>
        )}

        {answered && (
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary" onClick={nextQuestion}>
              {currentQ < total - 1 ? "السؤال التالي →" : "إنهاء"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
