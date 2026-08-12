import { useState, useEffect, useRef } from "react";
import { LEVELS, shuffle } from "../data.js";
import { speakGerman, stopSpeaking } from "../speech.js";

const DICTATION_SENTENCES = {
  A1: [
    { de: "Hallo, wie geht es Ihnen?", ar: "مرحباً، كيف حالك؟", difficulty: 1 },
    { de: "Ich heiße Ahmad und komme aus Tunesien.", ar: "اسمي أحمد وأنا من تونس.", difficulty: 1 },
    { de: "Guten Morgen, ich möchte einen Kaffee.", ar: "صباح الخير، أريد قهوة.", difficulty: 1 },
    { de: "Die Katze schläft auf dem Sofa.", ar: "القطة تنام على الأريكة.", difficulty: 1 },
    { de: "Wir gehen heute ins Kino.", ar: "اليوم نذهب إلى السينما.", difficulty: 2 },
    { de: "Können Sie mir bitte helfen?", ar: "هل يمكنك مساعدتي من فضلك؟", difficulty: 2 },
    { de: "Ich habe zwei Kinder und einen Hund.", ar: "لدي طفلان وكلب.", difficulty: 2 },
    { de: "Das Essen war sehr lecker.", ar: "كان الطعام لذيذاً جداً.", difficulty: 1 },
    { de: "Wo ist der nächste Bahnhof?", ar: "أين أقرب محطة قطار؟", difficulty: 2 },
    { de: "Ich lerne seit drei Monaten Deutsch.", ar: "أتعلم الألمانية منذ ثلاثة أشهر.", difficulty: 3 }
  ],
  A2: [
    { de: "Gestern war ich im Supermarkt und habe Brot gekauft.", ar: "أمس ذهبت إلى السوبر ماركت وشتريت خبزاً.", difficulty: 2 },
    { de: "Ich muss morgen früh aufstehen.", ar: "يجب أن أستيقظ مبكراً غداً.", difficulty: 2 },
    { de: "Hast du den Film gestern Abend gesehen?", ar: "هل شاهدت الفيلم الليلة الماضية؟", difficulty: 2 },
    { de: "Wir möchten nächste Woche verreisen.", ar: "نريد السفر الأسبوع القادم.", difficulty: 2 },
    { de: "Kannst du mir die Adresse geben?", ar: "هل يمكنك إعطائي العنوان؟", difficulty: 2 },
    { de: "Meine Schwester arbeitet als Lehrerin.", ar: "أختي تعمل كمعلمة.", difficulty: 2 },
    { de: "Der Zug fährt um acht Uhr ab.", ar: "القطار يغادر الساعة الثامنة.", difficulty: 3 },
    { de: "Ich habe gestern lange mit meinem Freund telefoniert.", ar: "أمس تحدثت لوقت طويل مع صديقي.", difficulty: 3 }
  ],
  B1: [
    { de: "Obwohl es regnet, gehen wir trotzdem spazieren.", ar: "رغم المطر نذهب للتنزه.", difficulty: 3 },
    { de: "Ich hätte gern mehr Zeit, um meine Hobbys zu pflegen.", ar: "أود أن يكون لدي وقت أكثر لهواياتي.", difficulty: 3 },
    { de: "Die Ergebnisse der Studie waren ziemlich überraschend.", ar: "كانت نتائج الدراسة مفاجئة جداً.", difficulty: 3 },
    { de: "Er sagt, dass er nächstes Jahr nach Deutschland ziehen will.", ar: "يقول إنه يريد الانتقال إلى ألمانيا العام المقبل.", difficulty: 3 },
    { de: "Wir haben beschlossen, das Projekt fortzusetzen.", ar: "قrrarna بمواصلة المشروع.", difficulty: 3 },
    { de: "Trotz der schwierigen Bedingungen haben wir das Ziel erreicht.", ar: "رغم الظروف الصعبة حققنا الهدف.", difficulty: 4 },
    { de: "Wenn ich mehr Zeit hätte, würde ich mehr lesen.", ar: "لو كان لدي وقت أكثر لقرأت أكثر.", difficulty: 4 }
  ],
  B2: [
    { de: "Die Politiker diskutieren über die Zukunft der Energieversorgung.", ar: "يناقش السياسيون مستقبل تزويد الطاقة.", difficulty: 4 },
    { de: "Man sollte regelmäßig Sport treiben, um gesund zu bleiben.", ar: "يجب ممارسة الرياضة بانتظام للبقاء بصحة جيدة.", difficulty: 4 },
    { de: "Die Firma hat beschlossen, neue Arbeitsplätze zu schaffen.", ar: "قررت الشركة إنشاء فرص عمل جديدة.", difficulty: 4 },
    { de: "Er wurde trotz seines jungen Alters zum Teamleiter ernannt.", ar: "عُيّن كقائد فريق رغم صغر سنه.", difficulty: 4 },
    { de: "Die Studie zeigt, dass Kinder, die früh lesen, bessere Noten haben.", ar: "تظهر الدراسة أن الأطفال الذين يقرأون مبكراً يحققون نتائج أفضل.", difficulty: 5 }
  ],
  C1: [
    { de: "Die Regierung hat neue Maßnahmen gegen den Klimawandel beschlossen.", ar: "قررت الحكومة تدابير جديدة ضد تغير المناخ.", difficulty: 5 },
    { de: "Es ist notwendig, dass wir unsere Strategie grundlegend überdenken.", ar: "من الضروري أن نعيد التفكير في استراتيجيتنا بشكل جذري.", difficulty: 5 },
    { de: "Die Ergebnisse der Studie waren durchaus überraschend, aber nicht unerwartet.", ar: "كانت نتائج الدراسة مفاجئة لكن غير غير متوقعة.", difficulty: 5 },
    { de: "Unter diesen Umständen können wir das Projekt nicht fortsetzen.", ar: "في ظل هذه الظروف لا يمكننا مواصلة المشروع.", difficulty: 5 }
  ],
  C2: [
    { de: "Angesichts der wirtschaftlichen Lage sind wir zur Vorsicht verpflichtet.", ar: "نظراً للوضع الاقتصادي نحن ملزمون بالحذر.", difficulty: 5 },
    { de: "Die Fülle an Informationen macht eine fundierte Entscheidung schwierig.", ar: "كثرة المعلومات تجعل القرار المدروس صعباً.", difficulty: 5 },
    { de: "Im Nachhinein betrachtet war diese Entscheidung weise und vorbildlich.", ar: "بالنظر إلى ما بعد فوات الأوان كان هذا القرار حكيماً وقدوة.", difficulty: 5 }
  ]
};

export default function Dictation({ levelIdx, onBack, onComplete }) {
  const level = LEVELS[levelIdx]?.code || "A1";
  const [sentences] = useState(() => shuffle(DICTATION_SENTENCES[level] || DICTATION_SENTENCES.A1).slice(0, 8));
  const [currentQ, setCurrentQ] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0.8);
  const [streak, setStreak] = useState(0);
  const [hints, setHints] = useState(0);
  const inputRef = useRef(null);

  const current = sentences[currentQ];
  const total = sentences.length;

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentQ, showResult]);

  const speak = (text, rate = speed) => {
    stopSpeaking();
    speakGerman(text, {
      rate,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
  };

  const normalize = (s) => s.toLowerCase().replace(/[.,!?;:'"]/g, "").replace(/\s+/g, " ").trim();

  const checkAnswer = () => {
    const correct = normalize(current.de);
    const user = normalize(userInput);
    const match = correct === user || (user.length > correct.length * 0.8 && correct.includes(user.substring(0, 10)));
    setIsCorrect(match);
    setShowResult(true);
    if (match) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(s => s + (newStreak >= 3 ? 15 : 10));
    } else {
      setStreak(0);
      setScore(s => s + 2);
    }
  };

  const useHint = () => {
    if (hints < 3) {
      setHints(h => h + 1);
      const chars = current.de.split("");
      const revealed = chars.slice(0, Math.min(hints + 3, chars.length)).join("");
      setUserInput(revealed);
    }
  };

  const nextQuestion = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setUserInput("");
      setShowResult(false);
      setIsCorrect(false);
    } else {
      const finalScore = Math.round((score / (total * 10)) * 100);
      onComplete(Math.min(finalScore, 100));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !showResult) {
      checkAnswer();
    } else if (e.key === "Enter" && showResult) {
      nextQuestion();
    }
  };

  return (
    <div className="dictation">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="dict-header">
        <h2>🎧 Dictation — الكتابة بالاستماع</h2>
        <div className="dict-level">{level}</div>
      </div>

      <div className="dict-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
        </div>
        <span>{currentQ + 1}/{total}</span>
      </div>

      <div className="dict-stats">
        <span className="stat">✅ {score} نقطة</span>
        <span className="stat">🔥 {streak} متتالية</span>
        <span className="stat">💡 {3 - hints} تلميحات</span>
      </div>

      <div className="dict-content">
        <div className="dict-controls">
          <button className="btn-play" onClick={() => speak(current.de)} disabled={isPlaying}>
            {isPlaying ? "⏳" : "🔊"} استمع
          </button>
          <button className="btn-play-slow" onClick={() => speak(current.de, 0.6)}>
            🐢 بطيء
          </button>
          <div className="speed-control">
            <label>السرعة:</label>
            <input
              type="range" min="0.5" max="1.2" step="0.1"
              value={speed}
              onChange={e => setSpeed(parseFloat(e.target.value))}
            />
            <span>{speed}x</span>
          </div>
        </div>

        {!showResult ? (
          <div className="dict-input-area">
            <input
              ref={inputRef}
              type="text"
              className="dict-input"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب ما سمعته هنا..."
              dir="ltr"
            />
            <div className="dict-actions">
              <button className="btn-check" onClick={checkAnswer} disabled={!userInput.trim()}>
                ✓ تحقق
              </button>
              <button className="btn-hint" onClick={useHint} disabled={hints >= 3}>
                💡 تلميح ({3 - hints})
              </button>
              <button className="btn-replay" onClick={() => speak(current.de)}>
                🔁 أعد الاستماع
              </button>
            </div>
          </div>
        ) : (
          <div className={`dict-result ${isCorrect ? "correct" : "wrong"}`}>
            <div className="result-icon">{isCorrect ? "✅" : "❌"}</div>
            <div className="result-message">{isCorrect ? "ممتاز! أحسنت!" : "حاول مرة أخرى"}</div>
            {!isCorrect && (
              <div className="correct-answer">
                <div className="label">الإجابة الصحيحة:</div>
                <div className="answer-de">{current.de}</div>
                <div className="answer-ar">{current.ar}</div>
              </div>
            )}
            <button className="btn-next" onClick={nextQuestion}>
              {currentQ < total - 1 ? "السؤال التالي →" : "إنهاء"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
