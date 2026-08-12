import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

const TOP_WORDS = [
  { de: "der", ar: "الـ", en: "the" },
  { de: "die", ar: "الـ / تلك", en: "the / those" },
  { de: "das", ar: "الـ", en: "the" },
  { de: "ich", ar: "أنا", en: "I" },
  { de: "du", ar: "أنتَ", en: "you" },
  { de: "er", ar: "هو", en: "he" },
  { de: "sie", ar: "هنَّ / إياهم", en: "they / her" },
  { de: "es", ar: "هوَ (مضي), إنه", en: "it" },
  { de: "wir", ar: "نحن", en: "we" },
  { de: "ihr", ar: "أنتم", en: "you (pl)" },
  { de: "ist", ar: "هوَ يكون", en: "is" },
  { de: "bist", ar: "أنتَ تكون", en: "are (you)" },
  { de: "hat", ar: "لديه", en: "has" },
  { de: "haben", ar: "لديهم", en: "have" },
  { de: "sein", ar: "كان / له", en: "is/was" },
  { de: "seine", ar: "الخاص به", en: "his" },
  { de: "nicht", ar: "ليس", en: "not" },
  { de: "und", ar: "و", en: "and" },
  { de: "oder", ar: "أو", en: "or" },
  { de: "aber", ar: "لكنّ", en: "but" },
  { de: "in", ar: "في", en: "in" },
  { de: "auf", ar: "على", en: "on" },
  { de: "mit", ar: "مع", en: "with" },
  { de: "zu", ar: "للـ / إلى", en: "to" },
  { de: "von", ar: "من", en: "of" },
  { de: "zu", ar: "إلى", en: "to" },
  { de: "das", ar: "الأن", en: "this/that" },
  { de: "ein", ar: "ـ", en: "a/an" },
  { de: "eine", ar: "إحدى", en: "a/an" },
  { de: "ich", ar: "أنا", en: "I" },
  { de: "möchten", ar: "أراد", en: "would like" },
  { de: "können", ar: "يمكن", en: "can" },
  { de: "wollen", ar: "أراد", en: "want" },
  { de: "gehen", ar: "يذهب", en: "go" },
  { de: "kommen", ar: "يأتي", en: "come" },
  { de: "sehen", ar: "يَرَى", en: "see" },
  { de: "machen", ar: "يَعمل", en: "do/make" },
  { de: "geben", ar: "يعطي", en: "give" },
  { de: "finden", ar: "يَجِد", en: "find" },
  { de: "sagen", ar: "يقول", en: "say" },
  { de: "lassen", ar: "يدَع", en: "let" },
  { de: "nehmen", ar: "يأخذ", en: "take" },
  { de: "bringen", ar: "يِحضر", en: "bring" },
  { de: "kosten", ar: "يكلف", en: "cost" },
  { de: "stehen", ar: "يَقِف", en: "stand" },
  { de: "bleiben", ar: "يَبقى", en: "stay" },
  { de: "stellen", ar: "يَضَع", en: "put" },
  { de: "lassen", ar: "يَسمح", en: "let/allow" },
  { de: "halten", ar: "يَحتفظ", en: "keep/hold" },
  { de: "geben", ar: "يعطي", en: "give" },
  { de: "werden", ar: "يَصبح", en: "become" },
  { de: "müssen", ar: "يَجب", en: "must" },
  { de: "mögen", ar: "يُحب", en: "like" },
  { de: "brauchen", ar: "يحتاج", en: "need" },
  { de: "sollen", ar: "يَجب على", en: "should" },
  { de: "lassen", ar: "جرى", en: "let" },
  { de: "sprechen", ar: "يتكلم", en: "speak" },
  { de: "reden", ar: "يتحدث", en: "talk" },
  { de: "fragen", ar: "يسأل", en: "ask/question" },
  { de: "antworten", ar: "يجيب", en: "answer" },
  { de: "verstehen", ar: "يفهم", en: "understand" },
  { de: "lieben", ar: "يحب", en: "love" },
  { de: "hassen", ar: "يبغض", en: "hate" },
  { de: "beginnen", ar: "يَبدأ", en: "begin" },
  { de: "hoffen", ar: "يأمل", en: "hope" },
  { de: "bedeuten", ar: "يَعني", en: "mean" },
  { de: "beißen", ar: "يَعض", en: "bite" },
  { de: "tragen", ar: "يَرتدي", en: "wear/carry" },
  { de: "steigen", ar: "يصعد", en: "climb/enter" },
  { de: "fallen", ar: "يَسقط", en: "fall" },
  { de: "schließen", ar: "يغلق", en: "close" },
  { de: "öffnen", ar: "يفتح", en: "open" },
  { de: "schließen", ar: "يُغلق", en: "close" },
  { de: "laufen", ar: "يركض", en: "run" },
  { de: "springen", ar: "يقفز", en: "jump" },
  { de: "sehen", ar: "يَرى", en: "see" },
  { de: "hören", ar: "يسمع", en: "hear" },
  { de: "lesen", ar: "يقرأ", en: "read" },
  { de: "schreiben", ar: "يكتب", en: "write" },
  { de: "schweigen", ar: "يَصمت", en: "be silent" },
  { de: "sitzen", ar: "يجلس", en: "sit" },
  { de: "stehen", ar: "يقف", en: "stand" },
  { de: "liegen", ar: "يَلقى", en: "lie" },
  { de: "treffen", ar: "يقابل", en: "meet" },
  { de: "lassen", ar: "دَع", en: "let" },
  { de: "geben", ar: "أعطِ", en: "give" },
  { de: "nehmen", ar: "خُذ", en: "take" },
  { de: "halten", ar: "امسك", en: "hold" },
  { de: "bringen", ar: "جلب", en: "bring" },
  { de: "finden", ar: "وجد", en: "find" },
  { de: "machen", ar: "افعل", en: "do" },
  { de: "sagen", ar: "قل", en: "say" },
  { de: "kommen", ar: "تعالَ", en: "come" },
  { de: "gehen", ar: "اذهب", en: "go" },
  { de: "sehen", ar: "أنظر", en: "see" },
  { de: "können", ar: "يمكن", en: "can" },
  { de: "müssen", ar: "يَجب", en: "must" },
  { de: "wollen", ar: "أراد", en: "want" },
  { de: "möchten", ar: "أراد أن", en: "would like" },
  { de: "sollen", ar: "يَجب على", en: "should" },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function FrequencyLearning({ onBack }) {
  const [sessionWords, setSessionWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [choices, setChoices] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalMastered, setTotalMastered] = useState(0);

  useEffect(() => {
    const shuffled = shuffle(TOP_WORDS).slice(0, 10);
    setSessionWords(shuffled);
    startQuestion(shuffled, 0);
  }, []);

  const startQuestion = (words, idx) => {
    if (idx >= words.length) {
      setShowResult(true);
      return;
    }
    const target = words[idx];
    const otherChoices = shuffle(TOP_WORDS.filter(w => w.de !== target.de)).slice(0, 3);
    const opts = shuffle([target, ...otherChoices]);
    setQuestion(target);
    setChoices(opts);
  };

  const answer = (word) => {
    const isCorrect = word.de === question.de;
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      setTotalMastered(c => Math.min(c + 1, 100));
    }
    speakGerman(word.de, { rate: 0.9 });
    setAnswered(a => [...a, { word: question, correct: isCorrect }]);
  };

  const nextQuestion = () => {
    const newIdx = currentIndex + 1;
    setCurrentIndex(newIdx);
    startQuestion(sessionWords, newIdx);
  };

  const reset = () => {
    const shuffled = shuffle(TOP_WORDS).slice(0, 10);
    setSessionWords(shuffled);
    setCurrentIndex(0);
    setAnswered([]);
    setShowResult(false);
    setCorrectCount(0);
    startQuestion(shuffled, 0);
  };

  const styles = {
    page: {
      direction: "rtl",
      textAlign: "right",
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "var(--font-ar), sans-serif",
      padding: "20px",
    },
    container: { maxWidth: "760px", margin: "0 auto" },
    header: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" },
    backBtn: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      borderRadius: "12px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
    },
    title: { fontSize: "22px", fontWeight: 700, flexGrow: 1 },
    card: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "18px",
      padding: "22px",
      marginBottom: "18px",
      boxShadow: "var(--shadow-sm)",
    },
    progressWrap: { marginBottom: "14px" },
    progressTrack: { width: "100%", height: "12px", background: "var(--bg-soft)", borderRadius: "8px", overflow: "hidden" },
    progressFill: { height: "100%", background: "var(--primary)", borderRadius: "8px" },
    counter: { fontSize: "13px", color: "var(--text-soft)", marginTop: "6px" },
    wordBox: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      padding: "22px",
      textAlign: "center",
      marginBottom: "18px",
    },
    wordDe: { fontSize: "32px", fontWeight: 700, color: "var(--primary)", marginBottom: "6px" },
    wordAr: { fontSize: "16px", color: "var(--text-soft)" },
    wordEn: { fontSize: "13px", color: "var(--text-soft)", marginTop: "4px" },
    choicesBox: { display: "grid", gap: "10px", marginBottom: "16px" },
    choiceBtn: {
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "14px",
      cursor: "pointer",
      background: "var(--bg-soft)",
      color: "var(--text)",
      fontSize: "16px",
      fontWeight: 600,
      textAlign: "center",
      transition: "all 0.2s",
    },
    choiceCorrect: { background: "rgba(16, 193, 129, 0.15)", borderColor: "#10b981" },
    choiceWrong: { background: "rgba(239, 68, 68, 0.15)", borderColor: "#ef4444" },
    nav: { display: "flex", gap: "12px", justifyContent: "flex-end" },
    btn: {
      border: "none",
      borderRadius: "12px",
      padding: "10px 18px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "14px",
      background: "var(--primary)",
      color: "#fff",
    },
    resultBanner: {
      background: "var(--bg-soft)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "22px",
      textAlign: "center",
    },
    resultPercent: { fontSize: "42px", fontWeight: 700, color: "var(--primary)" },
    masteredBar: { width: "100%", height: "10px", background: "var(--bg)", borderRadius: "8px", overflow: "hidden", marginTop: "14px" },
    masteredFill: { height: "100%", background: "#10b981", borderRadius: "8px" },
    answeredItem: { padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: "13px" },
    answerCorrect: { color: "#10b981" },
    answerWrong: { color: "#ef4444" },
  };

  if (showResult) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
            <div style={styles.title}>نتيجة الجلسة</div>
          </div>
          <div style={styles.card}>
            <div style={styles.counter}>الكلمات المتقنة: {totalMastered}/100</div>
            <div style={styles.masteredBar}>
              <div style={{ ...styles.masteredFill, width: `${totalMastered}%` }} />
            </div>
            <div style={styles.progressWrap}>
              <div style={{ ...styles.resultPercent }}>{Math.round((correctCount / 10) * 100)}%</div>
              <div style={styles.counter}>{correctCount}/10 إجابة صحيحة من أصل 10</div>
            </div>
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>مراجعة الإجابات:</div>
              {answered.map((a, i) => (
                <div key={i} style={{ ...styles.answeredItem, ...(a.correct ? { color: "#10b981" } : { color: "#ef4444" }) }}>
                  {a.word.de} — {a.word.ar} — {a.correct ? "✅" : "❌"}
                </div>
              ))}
            </div>
            <div style={styles.nav}>
              <button style={styles.btn} onClick={reset}>جلسة جديدة</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={onBack}>← رجوع</button>
          <div style={styles.title}>تعلم التردد — الـ 100 كلمة الأكثر شيوعًا</div>
        </div>

        <div style={styles.card}>
          <div style={styles.progressWrap}>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${((currentIndex + 1) / 10) * 100}%` }} />
            </div>
            <div style={styles.counter}>الكلمة {currentIndex + 1} من 10 — الجلسة الحالية</div>
          </div>

          <div style={styles.wordBox}>
            <div style={styles.wordDe}>{question?.de}</div>
            <div style={styles.wordAr}>{question?.ar}</div>
            <div style={styles.wordEn}>{question?.en}</div>
          </div>

          {question && (
            <div style={styles.choicesBox}>
              {choices.map((w, i) => (
                <button
                  key={i}
                  style={{
                    ...styles.choiceBtn,
                    ...(w.de === question.de ? styles.choiceCorrect : styles.choiceWrong),
                  }}
                  onClick={() => { answer(w); nextQuestion(); }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{w.ar}</span>
                    <span>{w.de}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
