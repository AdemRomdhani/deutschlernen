import { useState } from "react";
import { speakGerman, stopSpeaking } from "../speech.js";

const TEXTS = [
  {
    title: "Das Wetter in Berlin",
    titleAr: "الطقس في برلين",
    level: "A1",
    text: "Berlin ist die Hauptstadt von Deutschland. Die Stadt hat über drei Millionen Einwohner. Im Sommer ist es warm und im Winter kalt. Die Berliner sind freundlich und hilfsbereit. Jeden Tag gehen Millionen von Menschen zur Arbeit. Die U-Bahn und die S-Bahn sind sehr beliebt.",
    vocab: [
      { de: "Hauptstadt", ar: "عاصمة" },
      { de: "Einwohner", ar: "سكان" },
      { de: "freundlich", ar: "ودود" },
      { de: "hilfsbereit", ar: "مساعد" },
      { de: "beliebt", ar: "شائع" },
    ],
    questions: [
      { q: "ما عاصمة ألمانيا؟", options: ["ميونخ", "برلين", "هامبورغ", "فرانكفورت"], correct: 1 },
      { q: "كم عدد سكان برلين؟", options: ["مليون", "اثنان مليون", "أكثر من ثلاثة ملايين", "خمسة ملايين"], correct: 2 },
      { q: "كيف يصف المقال BERLINER؟", options: ["كسلان", "ودود ومساعد", "غاضب", "حزين"], correct: 1 },
    ],
  },
  {
    title: "Mein Frühstück",
    titleAr: "فطوري",
    level: "A1",
    text: "Ich stehe jeden Tag um sieben Uhr auf. Zum Frühstück esse ich Brot mit Käse und trinke eine Tasse Kaffee. Mein Bruder bevorzugt Müsli mit Milch. Meine Mutter macht immer frischen Saft. Wir frühstücken zusammen in der Küche. Das Frühstück ist die wichtigste Mahlzeit des Tages.",
    vocab: [
      { de: "Frühstück", ar: "فطور" },
      { de: "aufstehen", ar: "يستيقظ" },
      { de: "bevorzugen", ar: "يفضل" },
      { de: "frisch", ar: "طازج" },
      { de: "wichtig", ar: "مهم" },
    ],
    questions: [
      { q: "متى يستيقظ الكاتب؟", options: ["الساعة السادسة", "الساعة السابعة", "الساعة الثامنة", "الساعة التاسعة"], correct: 1 },
      { q: "ماذا يأكل الكاتب للفطور؟", options: ["خبز مع جبنة", "موز مع حليب", "أرز مع دجاج", "بيض مع لحم"], correct: 0 },
      { q: "ماذا تفضل الأم؟", options: ["القهوة", "العصير الطازج", "الشاي", "الماء"], correct: 1 },
    ],
  },
  {
    title: "Ein Tag in München",
    titleAr: "يوم في ميونخ",
    level: "A2",
    text: "München ist die größte Stadt in Bayern. Die Stadt ist bekannt für das Oktoberfest, das jedes Jahr Millionen von Touristen anzieht. Im Zentrum gibt es den Marienplatz mit dem berühmten Glockenspiel. Die Bürger are sehr stolz auf ihre Traditionen. Das Englische Garten ist einer der größten Parks der Welt.",
    vocab: [
      { de: "bekannt", ar: "مشهور" },
      { de: "anziehen", ar: "يجلب" },
      { de: "Zentrum", ar: "وسط" },
      { de: "berühmt", ar: "مشهور" },
      { de: "stolz", ar: "فخور" },
    ],
    questions: [
      { q: "ما هي أكبر مدينة في بافاريا؟", options: ["برلين", "ميونخ", "هامبورغ", "كولونيا"], correct: 1 },
      { q: "لماذا مشهورة ميونخ؟", options: ["الجامعات", "أوكتوبر فيست", "المطاعم", "المتاجر"], correct: 1 },
      { q: "كم يجلب المهرجان من السياح؟", options: ["آلاف", "ملايين", "مئات", "عشرات"], correct: 1 },
    ],
  },
  {
    title: "Die deutsche Autobahn",
    titleAr: "ال'autobahn الألمانية",
    level: "A2",
    text: "Die Autobahn ist ein Netz von Schnellstraßen in Deutschland. Es gibt keine Geschwindigkeitsbegrenzung auf vielen Abschnitten. Das macht die Autobahn besonders beliebt bei Autofahrern. Die Strecke zwischen Berlin und München ist sehr stark befahren. Es gibt auch Raststätten mit Restaurants und Tankstellen.",
    vocab: [
      { de: "Schnellstraße", ar: "طريق سريع" },
      { de: "Geschwindigkeitsbegrenzung", ar: "حد السرعة" },
      { de: "Abschnitt", ar: "قسم" },
      { de: "befahren", ar: "يمر عليه" },
      { de: "Raststätte", ar: "محطة استراحة" },
    ],
    questions: [
      { q: "ما هي Autobahn؟", options: ["نفق", "شبكة طرق سريعة", "جسر", "قناة"], correct: 1 },
      { q: "ما الذي يجعلها مميزة؟", options: ["الجمال", "لا حدود سرعة في أجزاء كثيرة", "الخطوط الكثيرة", "الآلات"], correct: 1 },
      { q: "ماذا توجد عند محطات الاستراحة؟", options: ["فنادق", "مطاعم ومحطات وقود", "مستشفيات", "مكاتب بريد"], correct: 1 },
    ],
  },
  {
    title: "Umwelt und Recycling",
    titleAr: "البيئة والتدوير",
    level: "B1",
    text: "Deutschland ist weltweit führend im Bereich Umweltschutz und Recycling. Das Trennsystem für Müll ist sehr streng. Es gibt verschiedene Farben für verschiedene Arten von Abfall. Der Grüne Punkt zeigt an, dass die Verpackung recycelt werden kann. Das Pfand-System für Getränkeflaschen funktioniert sehr gut.",
    vocab: [
      { de: "Umweltschutz", ar: "حماية البيئة" },
      { de: "Trennsystem", ar: "نظام الفصل" },
      { de: "Abfall", ar: "نفايات" },
      { de: "Verpackung", ar: "تغليف" },
      { de: "Pfand", ar: "وديعة" },
    ],
    questions: [
      { q: "ما هو نظام Trennsystem؟", options: ["نظام للطبخ", "نظام فصل النفايات", "نظام للتعليم", "نظام للنقل"], correct: 1 },
      { q: "ماذا يدل Grüner Punkt؟", options: ["نقطة خضراء جميلة", "التغليف قابل للتدوير", "الحديقة مفتوحة", "المطعم شغال"], correct: 1 },
      { q: "لماذا يُconsider ألمانيا رائدة؟", options: ["التعليم", "حماية البيئة والتدوير", "الطبخ", "الرياضة"], correct: 1 },
    ],
  },
  {
    title: "Digitalisierung in der Schule",
    titleAr: "التحول الرقمي في المدرسة",
    level: "B2",
    text: "Deutsche Schulen modernisieren sich zunehmend. Tablets und Laptops werden im Unterricht eingesetzt. Digitale Medien helfen den Schülern beim Lernen. Es gibt aber auch Bedenken über Bildschirmzeit und Konzentration. Lehrer müssen sich ständig weiterbilden, um mit der Technologie Schritt zu halten.",
    vocab: [
      { de: "modernisieren", ar: "تحديث" },
      { de: "Bedenken", ar: "مخاوف" },
      { de: "Bildschirmzeit", ar: "وقت الشاشة" },
      { de: "Konzentration", ar: "تركيز" },
      { de: "Schritt halten", ar: "مواكبة" },
    ],
    questions: [
      { q: "ما الذي يُستخدم في الفصول؟", options: ["كتب فقط", "أجهزة تابلت وحاسوب", "سبورات قديمة", "没有什么"], correct: 1 },
      { q: "ما هي المخاوف المتعلقة بالتحول الرقمي؟", options: ["التكلفة", "وقت الشاشة والتركيز", "ال噪音", "الصعوبة"], correct: 1 },
      { q: "ماذا يجب على المعلمين فعله؟", options: ["العمل أكثر", "مواكبة التكنولوجيا", "التخلي عن الوظيفة", "الانتقال لمدينة أخرى"], correct: 1 },
    ],
  },
  {
    title: "Deutsche Küche",
    titleAr: "المطبخ الألماني",
    level: "A2",
    text: "Die deutsche Küche ist vielfältig und lecker. Brezeln und Weißwurst sind typisch für Bayern. Im Norden gibt es viel Fisch, besonders in Hamburg und Bremen. Kartoffeln sind ein wichtiger Bestandteil fast jeder Mahlzeit. Das Brot in Deutschland ist weltberühmt – es gibt über 3000 Sorten.",
    vocab: [
      { de: "vielfältig", ar: "متنوع" },
      { de: "typisch", ar: "مميز" },
      { de: "Bestandteil", ar: "مكون" },
      { de: "weltberühmt", ar: "مشهور عالمياً" },
      { de: "Sorte", ar: "نوع" },
    ],
    questions: [
      { q: "ما هو الطعام المميز لبافاريا؟", options: ["السمك", "البريتزل والسوسيس الأبيض", "الكعك", "الأرز"], correct: 1 },
      { q: "كم عدد أنواع الخبز في ألمانيا؟", options: ["300", "3000", "30000", "300"], correct: 1 },
      { q: "ما هو المكون الأساسي في الأطباق الألمانية؟", options: ["الأرز", "البطاطس", "الدجاج", "الخضار"], correct: 1 },
    ],
  },
  {
    title: "Öffentlicher Nahverkehr",
    titleAr: "النقل العام",
    level: "B1",
    text: "Der öffentliche Nahverkehr in Deutschland ist sehr gut ausgebaut. U-Bahn, S-Bahn, Straßenbahn und Busse verbinden die Stadtteile. Viele Menschen nutzen die Monatskarte, da sie günstiger ist. Die Züge sind in der Regel pünktlich. In Großstädten kann man auch ohne Auto gut zurechtkommen.",
    vocab: [
      { de: "Nahverkehr", ar: "نقل محلي" },
      { de: "ausbauen", ar: "توسيع" },
      { de: "verbinden", ar: "يربط" },
      { de: "günstig", ar: "رخيص" },
      { de: "zurechtkommen", ar: "يتعامل مع" },
    ],
    questions: [
      { q: "ما هي وسائل النقل العام في ألمانيا؟", options: ["حافلات فقط", "مترو وقطارات وحافلات وترام", "تاكسي فقط", "دراجات"], correct: 1 },
      { q: "لماذا يستخدم الناس Monatskarte؟", options: ["لأنها مجانية", "لأنها أرخص", "لأنها أسرع", "لأنها وسيلة وحيدة"], correct: 1 },
      { q: "هل يمكن التعامل بدون سيارة؟", options: ["لا أبداً", "نعم في المدن الكبيرة", "فقط في الصيف", "فقط للفقراء"], correct: 1 },
    ],
  },
];

export default function NewspaperReading({ levelIdx, onBack, onComplete }) {
  const [articles] = useState(() => shuffle(TEXTS).slice(0, 4));
  const [currentArticle, setCurrentArticle] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [phase, setPhase] = useState("reading");

  const article = articles[currentArticle];
  const totalArticles = articles.length;
  const totalQuestions = articles.reduce((s, a) => s + a.questions.length, 0);
  const questionsAnswered = articles.slice(0, currentArticle).reduce((s, a) => s + a.questions.length, 0) + currentQuestion;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    const correct = article.questions[currentQuestion].correct === idx;
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) setScore(s => s + 10);
  };

  const nextStep = () => {
    if (phase === "reading") {
      setPhase("questions");
      setCurrentQuestion(0);
      setAnswered(false);
      setSelected(null);
      return;
    }

    if (currentQuestion < article.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setAnswered(false);
      setSelected(null);
      setIsCorrect(false);
    } else if (currentArticle < totalArticles - 1) {
      setCurrentArticle(a => a + 1);
      setPhase("reading");
      setCurrentQuestion(0);
      setAnswered(false);
      setSelected(null);
      setIsCorrect(false);
      setShowVocab(false);
    } else {
      const finalScore = Math.round((score / (totalQuestions * 10)) * 100);
      onComplete(Math.min(finalScore, 100));
    }
  };

  const highlightVocab = (text) => {
    let result = text;
    article.vocab.forEach(v => {
      const regex = new RegExp(`(${v.de})`, "gi");
      result = result.replace(regex, `<mark style="background:rgba(37,99,235,0.15);padding:2px 4px;border-radius:4px;cursor:pointer" title="${v.ar}">$1</mark>`);
    });
    return result;
  };

  if (phase === "reading") {
    return (
      <div style={{ padding: "20px 0" }}>
        <button className="back-btn" onClick={onBack}>← رجوع</button>

        <div className="game-head">
          <h2>📰 قراءة الصحف — Newspaper Reading</h2>
          <p>اقرأ النص ثم أجب عن الأسئلة</p>
          <div className="game-score">
            <span>✅ {score} نقطة</span>
            <span>|</span>
            <span>{currentArticle + 1}/{totalArticles}</span>
          </div>
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 28, marginBottom: 20, boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0 }}>{article.title}</h3>
                <p style={{ color: "var(--text-soft)", margin: "4px 0 0" }}>{article.titleAr}</p>
              </div>
              <span style={{ padding: "4px 12px", borderRadius: 12, background: "rgba(37,99,235,0.1)", color: "var(--primary)", fontWeight: 800, fontSize: 13 }}>
                {article.level}
              </span>
            </div>

            <div
              style={{ fontSize: 16, lineHeight: 2, color: "var(--text)", marginBottom: 20 }}
              dangerouslySetInnerHTML={{ __html: highlightVocab(article.text) }}
            />

            <button className="back-btn" onClick={() => setShowVocab(!showVocab)} style={{ marginBottom: 12 }}>
              {showVocab ? "إخفاء المفردات" : "📚 عرض المفردات"}
            </button>

            {showVocab && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {article.vocab.map((v, i) => (
                  <div key={i} style={{ padding: "8px 14px", borderRadius: 10, background: "var(--bg-soft)", border: "1px solid var(--border)", fontSize: 14 }}>
                    <strong style={{ fontFamily: "var(--font-la)", direction: "ltr" }}>{v.de}</strong>
                    <span style={{ color: "var(--text-soft)", marginRight: 8 }}>— {v.ar}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              className="speak-btn"
              onClick={() => speakGerman(article.text, { rate: 0.8 })}
              style={{ marginBottom: 8 }}
            >
              🔊 استمع للنص
            </button>
          </div>

          <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary" onClick={nextStep}>
              الأسئلة التالية ←
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = article.questions[currentQuestion];
  const globalQuestionNum = questionsAnswered;

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>

      <div className="game-head">
        <h2>📝 أسئلة الفهم — Comprehension</h2>
        <p>{article.title}</p>
        <div className="game-score">
          <span>✅ {score} نقطة</span>
          <span>|</span>
          <span>{currentQuestion + 1}/{article.questions.length}</span>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className="tf-card" style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>{q.q}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                className={`tf-btn ${selected === idx ? (idx === q.correct ? "correct" : "wrong") : ""} ${
                  answered && idx === q.correct ? "correct" : ""
                }`}
                onClick={() => handleAnswer(idx)}
                disabled={answered}
                style={{ textAlign: "center" }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {answered && (
          <div className={`dialogue-feedback ${isCorrect ? "good" : "bad"}`} style={{ textAlign: "center", marginBottom: 16 }}>
            {isCorrect ? "✅ إجابة صحيحة!" : "❌ إجابة خاطئة"}
          </div>
        )}

        {answered && (
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary" onClick={nextStep}>
              {currentQuestion < article.questions.length - 1
                ? "السؤال التالي →"
                : currentArticle < totalArticles - 1
                  ? "المقال التالي →"
                  : "إنهاء"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
