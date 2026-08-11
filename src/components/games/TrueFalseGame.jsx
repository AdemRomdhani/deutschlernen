import { useEffect, useMemo, useState } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, recordWrongWord } from "../../store.js";
import { useConfetti, useToast, TimerBar } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const TIME_PER_Q = 8;

export default function TrueFalseGame({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => getLevelWords(levelIdx), [levelIdx]);
  const rounds = useMemo(() => {
    const selected = shuffle(words).slice(0, 8);
    return selected.map((w, i) => {
      // alternate: even-index rounds show correct pair, odd show a wrong pairing
      const isCorrectPair = i % 2 === 0;
      if (isCorrectPair) {
        return { de: w.de, ar: w.ar, correct: true };
      }
      const wrong = words.find(x => x.ar !== w.ar) || w;
      return { de: w.de, ar: wrong.ar, correct: false };
    });
  }, [words]);

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
    return <GameEnd won={score >= 6} title={score >= 6 ? "🏆 حكم خبير!" : "💪 قريب!"}
      msg={`${score}/${rounds.length} إجابات صحيحة`} xp={score >= 6 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (rIndex + 1 >= rounds.length) {
      setDone(true);
      const won = finalScore >= 6;
      recordGameResult({
        gameId: "truefalse", levelCode: level.code,
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
    const correct = (choice === "true") === r.correct;
    if (correct) {
      setScore(s => s + 1);
      setCombo(c => c + 1);
      if (combo + 1 >= 3) toast(`🔥 ${combo + 1} إجابات متتالية!`);
    } else {
      setCombo(0);
      recordWrongWord(level.code, { de: r.de, ar: r.ar, pron: r.pron });
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
    recordWrongWord(level.code, { de: r.de, ar: r.ar, pron: r.pron });
    setTimeout(() => advance(score), 600);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>⚡ صح أم خطأ</h2>
        <p>هل الترجمة المعروضة صحيحة؟ احكم بسرعة!</p>
        <span className="game-score">السؤال {rIndex + 1}/{rounds.length} · النتيجة {score} · 🔥{combo}</span>
      </div>
      <TimerBar seconds={TIME_PER_Q} resetKey={rIndex} onTimeout={onTimeout} />
      <div className="tf-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="tf-card">
          <div className="tf-de">{r.de}</div>
          <div className="tf-ar">{r.ar}</div>
          <div className="tf-question">هل هذا هو المعنى الصحيح؟</div>
        </div>
        <div className="tf-options">
          <button
            className={"tf-btn true" + (answered ? (r.correct ? " correct" : lastChoice === "true" ? " wrong" : "") : "")}
            disabled={answered}
            onClick={() => answer("true")}
          >
            ✓ صحيح
          </button>
          <button
            className={"tf-btn false" + (answered ? (!r.correct ? " correct" : lastChoice === "false" ? " wrong" : "") : "")}
            disabled={answered}
            onClick={() => answer("false")}
          >
            ✗ خطأ
          </button>
        </div>
      </div>
    </>
  );
}
