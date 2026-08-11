import { useEffect, useMemo, useState } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, recordWrongWord } from "../../store.js";
import { useToast, useConfetti, TimerBar } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const TIME_PER_Q = 10;

export default function MatchGame({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => getLevelWords(levelIdx), [levelIdx]);
  const questions = useMemo(() => shuffle(words).slice(0, 8), [words]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastChosen, setLastChosen] = useState(null);
  const [done, setDone] = useState(false);
  const toast = useToast();
  const confetti = useConfetti();

  const q = questions[qIndex];

  const options = useMemo(() => {
    if (!q) return [];
    const wrong = shuffle(words.filter(w => w.ar !== q.ar)).slice(0, 3).map(w => w.ar);
    return shuffle([q.ar, ...wrong]);
  }, [q, words]);

  useEffect(() => {
    setAnswered(false);
    setLastChosen(null);
  }, [qIndex]);

  useEffect(() => {
    const t = setTimeout(() => speakGerman(q.de), 300);
    return () => clearTimeout(t);
  }, [q]);

  if (done) {
    return <GameEnd won={score >= 6} title={score >= 6 ? "🏆 رائع!" : "💪 قريب!"}
      msg={`${score}/${questions.length} إجابة صحيحة`} xp={score >= 6 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (qIndex + 1 >= questions.length) {
      setDone(true);
      const won = finalScore >= 6;
      recordGameResult({
        gameId: "match", levelCode: level.code,
        metric: finalScore, isBetter: (best) => best === undefined || finalScore > best,
        won, xp: won ? 15 : 5
      });
      if (won) confetti(70);
    } else {
      setQIndex(i => i + 1);
    }
  };

  const answer = (chosen) => {
    if (answered) return;
    setAnswered(true);
    setLastChosen(chosen);
    const correct = chosen === q.ar;
    if (correct) {
      setScore(s => s + 1);
      setCombo(c => c + 1);
      if (combo + 1 >= 3) toast(`🔥 ${combo + 1} إجابات متتالية!`);
    } else {
      setCombo(0);
      recordWrongWord(level.code, q);
    }
    const finalScore = correct ? score + 1 : score;
    setTimeout(() => advance(finalScore), 900);
  };

  const onTimeout = () => {
    if (answered) return;
    setAnswered(true);
    setLastChosen(null);
    setCombo(0);
    toast("⏰ انتهى الوقت!");
    recordWrongWord(level.code, q);
    setTimeout(() => advance(score), 600);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>🎯 اختبر نفسك</h2>
        <p>اختر المعنى العربي الصحيح للكلمة الألمانية</p>
        <span className="game-score">السؤال {qIndex + 1}/{questions.length} · النتيجة {score} · 🔥{combo}</span>
      </div>
      <TimerBar seconds={TIME_PER_Q} resetKey={qIndex} onTimeout={onTimeout} />
      <div className="match-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="match-prompt">
          <div className="mp-label">ما معنى هذه الكلمة؟</div>
          <div className="mp-word">{q.de}</div>
          <div style={{ marginTop: 10 }}>
            <button className="speak-btn" style={{ background: "rgba(255,255,255,0.95)", border: "none" }}
              onClick={() => speakGerman(q.de)}>
              <span className="spk-icon">🔊</span> استمع للنطق
            </button>
          </div>
        </div>
        <div className="match-options">
          {options.map((o, i) => {
            let cls = "match-option";
            if (answered) {
              if (o === q.ar) cls += " correct";
              else if (o === lastChosen) cls += " wrong";
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
