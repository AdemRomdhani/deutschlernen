import { useEffect, useMemo, useState } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, recordWrongWord } from "../../store.js";
import { useConfetti, useToast, TimerBar } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const TIME_PER_Q = 12;

export default function ListeningGame({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => getLevelWords(levelIdx), [levelIdx]);
  const questions = useMemo(() => shuffle(words).slice(0, 7), [words]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastChosen, setLastChosen] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const confetti = useConfetti();
  const toast = useToast();

  const q = questions[qIndex];

  const options = useMemo(() => {
    if (!q) return [];
    const wrong = shuffle(words.filter(w => w.ar !== q.ar)).slice(0, 3).map(w => w.ar);
    return shuffle([q.ar, ...wrong]);
  }, [q, words]);

  const play = () => {
    if (playing) return;
    setPlaying(true);
    speakGerman(q.de, () => setPlaying(false));
  };

  useEffect(() => {
    setAnswered(false);
    setLastChosen(null);
  }, [qIndex]);

  useEffect(() => {
    const t = setTimeout(play, 400);
    return () => clearTimeout(t);
  }, [qIndex]);

  if (done) {
    return <GameEnd won={score >= 5} title={score >= 5 ? "🏆 أذن موسيقية!" : "💪 قريب!"}
      msg={`${score}/${questions.length} إجابات صحيحة`} xp={score >= 5 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (qIndex + 1 >= questions.length) {
      setDone(true);
      const won = finalScore >= 5;
      recordGameResult({
        gameId: "listening", levelCode: level.code,
        metric: finalScore, isBetter: (b) => b === undefined || finalScore > b,
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
        <h2>🎧 استمع واختر</h2>
        <p>استمع إلى النطق الألماني واختر المعنى الصحيح</p>
        <span className="game-score">السؤال {qIndex + 1}/{questions.length} · النتيجة {score} · 🔥{combo}</span>
      </div>
      <TimerBar seconds={TIME_PER_Q} resetKey={qIndex} onTimeout={onTimeout} />
      <div className="listen-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="listen-prompt">
          <div className="lp-big">🎧</div>
          <p>استمع جيداً ثم اختر المعنى الصحيح</p>
          <button className={"speak-btn" + (playing ? " playing" : "")} onClick={play}>
            <span className="spk-icon">🔊</span> {playing ? "... يتم التشغيل" : "استمع مرة أخرى"}
          </button>
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
