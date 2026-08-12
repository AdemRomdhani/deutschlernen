import { useState, useEffect, useMemo } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, recordWrongWord } from "../../store.js";
import { useConfetti, useToast, TimerBar } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const TIME_PER_Q = 10;

const OPPOSITE_PAIRS = [
  { de: "groß", ar: "كبير", opposite: "klein", oppAr: "صغير" },
  { de: "klein", ar: "صغير", opposite: "groß", oppAr: "كبير" },
  { de: "gut", ar: "جيد", opposite: "schlecht", oppAr: "سيء" },
  { de: "schlecht", ar: "سيء", opposite: "gut", oppAr: "جيد" },
  { de: "heiß", ar: "حار", opposite: "kalt", oppAr: "بارد" },
  { de: "kalt", ar: "بارد", opposite: "heiß", oppAr: "حار" },
  { de: "alt", ar: "قديم", opposite: "neu", oppAr: "جديد" },
  { de: "neu", ar: "جديد", opposite: "alt", oppAr: "قديم" },
  { de: "schnell", ar: "سريع", opposite: "langsam", oppAr: "بطيء" },
  { de: "langsam", ar: "بطيء", opposite: "schnell", oppAr: "سريع" },
  { de: "schön", ar: "جميل", opposite: "hässlich", oppAr: "قبيح" },
  { de: "reich", ar: "غني", opposite: "arm", oppAr: "فقير" },
  { de: "arm", ar: "فقير", opposite: "reich", oppAr: "غني" },
  { de: "jung", ar: "شباب", opposite: "alt", oppAr: "كبير" },
  { de: "leicht", ar: "سهل", opposite: "schwer", oppAr: "صعب" },
  { de: "schwer", ar: "صعب", opposite: "leicht", oppAr: "سهل" },
  { de: "laut", ar: "عالي الصوت", opposite: "leise", oppAr: "هادئ" },
  { de: "leise", ar: "هادئ", opposite: "laut", oppAr: "عالي الصوت" },
  { de: "offen", ar: "مفتوح", opposite: "geschlossen", oppAr: "مغلق" },
  { de: "nah", ar: "قريب", opposite: "weit", oppAr: "بعيد" },
  { de: "weit", ar: "بعيد", opposite: "nah", oppAr: "قريب" },
  { de: "dunkel", ar: "مظلم", opposite: "hell", oppAr: "مضيء" },
  { de: "hell", ar: "مضيء", opposite: "dunkel", oppAr: "مظلم" },
  { de: "voll", ar: "ممتلئ", opposite: "leer", oppAr: "فارغ" },
  { de: "leer", ar: "فارغ", opposite: "voll", oppAr: "ممتلئ" },
  { de: "richtig", ar: "صحيح", opposite: "falsch", oppAr: "خطأ" },
  { de: "falsch", ar: "خطأ", opposite: "richtig", oppAr: "صحيح" },
  { de: "teuer", ar: "غالي", opposite: "billig", oppAr: "رخيص" },
  { de: "billig", ar: "رخيص", opposite: "teuer", oppAr: "غالي" },
  { de: "freundlich", ar: "ودود", opposite: "unfreundlich", oppAr: "غير ودود" },
];

function getDistractors(opposite, allWords) {
  const others = allWords.filter(w => w !== opposite);
  return shuffle(others).slice(0, 3);
}

export default function OppositesGame({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];

  const rounds = useMemo(() => {
    const selected = shuffle(OPPOSITE_PAIRS).slice(0, 8);
    const allOpposites = OPPOSITE_PAIRS.map(p => p.opposite);
    return selected.map(p => {
      const distractors = getDistractors(p.opposite, allOpposites);
      return {
        de: p.de, ar: p.ar,
        correct: p.opposite,
        correctAr: p.oppAr,
        options: shuffle([p.opposite, ...distractors]),
      };
    });
  }, []);

  const [rIndex, setRIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastChoice, setLastChoice] = useState(null);
  const [done, setDone] = useState(false);
  const confetti = useConfetti();
  const toast = useToast();

  const r = rounds[rIndex];

  useEffect(() => {
    setAnswered(false);
    setLastChoice(null);
  }, [rIndex]);

  useEffect(() => {
    const t = setTimeout(() => speakGerman(r.de), 300);
    return () => clearTimeout(t);
  }, [rIndex]);

  if (done) {
    return <GameEnd won={score >= 6} title={score >= 6 ? "🏆 خبير الأضداد!" : "💪 قريب!"}
      msg={`${score}/${rounds.length} إجابات صحيحة`} xp={score >= 6 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (rIndex + 1 >= rounds.length) {
      setDone(true);
      const won = finalScore >= 6;
      recordGameResult({
        gameId: "opposites", levelCode: level.code,
        metric: finalScore, isBetter: (b) => b === undefined || finalScore > b,
        won, xp: won ? 15 : 5
      });
      if (won) confetti(70);
    } else {
      setRIndex(i => i + 1);
    }
  };

  const answer = (choice) => {
    if (answered) return;
    setAnswered(true);
    setLastChoice(choice);
    const correct = choice === r.correct;
    if (correct) {
      setScore(s => s + 1);
      setCombo(c => c + 1);
      if (combo + 1 >= 3) toast(`🔥 ${combo + 1} إجابات متتالية!`);
    } else {
      setCombo(0);
      recordWrongWord(level.code, { de: r.de, ar: r.ar });
    }
    const finalScore = correct ? score + 1 : score;
    setTimeout(() => advance(finalScore), 900);
  };

  const onTimeout = () => {
    if (answered) return;
    setAnswered(true);
    setLastChoice(null);
    setCombo(0);
    toast("⏰ انتهى الوقت!");
    recordWrongWord(level.code, { de: r.de, ar: r.ar });
    setTimeout(() => advance(score), 600);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>🔄 تحدي الأضداد</h2>
        <p>ما هو反义词 (العكس) للكلمة المعروضة؟</p>
        <span className="game-score">السؤال {rIndex + 1}/{rounds.length} · النتيجة {score} · 🔥{combo}</span>
      </div>
      <TimerBar seconds={TIME_PER_Q} resetKey={rIndex} onTimeout={onTimeout} />
      <div className="tf-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="tf-card">
          <div className="tf-de">{r.de}</div>
          <div className="tf-ar">{r.ar}</div>
          <div className="tf-question" style={{ marginTop: 12 }}>
            ما هو <strong>المعكس</strong> لهذه الكلمة؟
          </div>
        </div>
        <div className="match-options" style={{ marginTop: 16 }}>
          {r.options.map((o, i) => {
            let cls = "match-option";
            if (answered) {
              if (o === r.correct) cls += " correct";
              else if (o === lastChoice) cls += " wrong";
            }
            return (
              <button key={i} className={cls} disabled={answered} onClick={() => answer(o)}>
                {o}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
