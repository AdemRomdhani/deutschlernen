import { useEffect, useMemo, useState } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult } from "../../store.js";
import { useConfetti } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

export default function BuilderGame({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => getLevelWords(levelIdx), [levelIdx]);
  const pool = useMemo(() =>
    shuffle(words.filter(w => /^[a-zA-ZäöüÄÖÜß]+$/.test(w.de) && w.de.length >= 3)).slice(0, 5),
    [words]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [used, setUsed] = useState([]);
  const [slots, setSlots] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);
  const confetti = useConfetti();

  const q = pool[qIndex];

  const letters = useMemo(() => {
    if (!q) return [];
    return shuffle(q.de.split(""));
  }, [q]);

  // (re)initialize per question
  useEffect(() => {
    if (!q) return;
    setUsed(new Array(q.de.length).fill(null));
    setSlots(new Array(q.de.length).fill(""));
    setFeedback(null);
  }, [qIndex]);

  useEffect(() => {
    if (!q) return;
    const t = setTimeout(() => speakGerman(q.de), 300);
    return () => clearTimeout(t);
  }, [q]);

  if (done) {
    return <GameEnd won={score >= 4}
      title={score >= 4 ? `${score}/${pool.length} كلمات صحيحة!` : `${score}/${pool.length} — واصل التدريب!`}
      msg={score >= 4 ? "ممتاز! أنت تبني الكلمات كالمحترفين" : "لا تستسلم، ستتحسن"} 
      xp={score >= 4 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const placeLetter = (i) => {
    if (feedback) return;
    if (used[i] !== null) return;
    const emptyIdx = slots.indexOf("");
    if (emptyIdx === -1) return;
    const nextUsed = used.slice();
    const nextSlots = slots.slice();
    nextUsed[i] = emptyIdx;
    nextSlots[emptyIdx] = letters[i];
    setUsed(nextUsed);
    setSlots(nextSlots);
  };

  const removeSlot = (i) => {
    if (feedback) return;
    if (slots[i] === "") return;
    const letterIdx = used.indexOf(i);
    if (letterIdx === -1) return;
    const nextUsed = used.slice();
    const nextSlots = slots.slice();
    nextUsed[letterIdx] = null;
    nextSlots[i] = "";
    setUsed(nextUsed);
    setSlots(nextSlots);
  };

  const clearAll = () => {
    if (feedback) return;
    setUsed(new Array(q.de.length).fill(null));
    setSlots(new Array(q.de.length).fill(""));
  };

  const check = () => {
    if (feedback) return;
    const built = slots.join("");
    const correct = built.toLowerCase() === q.de.toLowerCase();
    setFeedback(correct ? "ok" : "bad");
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (qIndex + 1 >= pool.length) {
        setDone(true);
        const finalScore = correct ? score + 1 : score;
        const won = finalScore >= 4;
        recordGameResult({
          gameId: "builder", levelCode: level.code,
          metric: finalScore, isBetter: (b) => b === undefined || finalScore > b,
          won, xp: won ? 15 : 5
        });
        if (won) confetti(70);
      } else {
        setQIndex(i => i + 1);
      }
    }, correct ? 1000 : 1600);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>🧩 ابنِ الكلمة</h2>
        <p>رتّب الحروف لتكوين الكلمة الألمانية الصحيحة</p>
        <span className="game-score">الكلمة {qIndex + 1}/{pool.length} · النتيجة {score}</span>
      </div>
      <div className="builder-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="builder-prompt">
          <div className="bp-ar">{q.ar}</div>
          <div className="bp-pron">{q.pron}</div>
          <div style={{ marginTop: 8 }}>
            <button className="speak-btn" onClick={() => speakGerman(q.de)}>
              <span className="spk-icon">🔊</span> استمع
            </button>
          </div>
        </div>
        <div className="builder-slots">
          {slots.map((val, i) => (
            <div
              key={i}
              className={"builder-slot" + (val ? " filled" : "")}
              onClick={() => removeSlot(i)}
            >
              {val}
            </div>
          ))}
        </div>
        <div className="builder-letters">
          {letters.map((l, i) => (
            <button
              key={i}
              className={"builder-letter" + (used[i] !== null ? " used" : "")}
              onClick={() => placeLetter(i)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="builder-actions">
          <button className="btn btn-ghost" onClick={clearAll}>↺ مسح</button>
          <button className="btn btn-primary" onClick={check}>✓ تحقق</button>
        </div>
        <div className={"builder-feedback " + (feedback === "ok" ? "ok" : feedback === "bad" ? "bad" : "")}>
          {feedback === "ok" && "✅ أحسنت! صحيح تماماً"}
          {feedback === "bad" && <>❌ الصحيح هو: <span style={{ fontFamily: "var(--font-la)", direction: "ltr", display: "inline-block" }}>{q.de}</span></>}
        </div>
      </div>
    </>
  );
}
