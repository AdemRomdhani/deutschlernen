import { useMemo, useState } from "react";
import { LEVELS, DIALOGUES } from "../../data.js";
import { recordGameResult } from "../../store.js";
import { useConfetti } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

export default function Dialogue({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const dialog = DIALOGUES[level.code] || DIALOGUES.A1;
  const [eIndex, setEIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastPick, setLastPick] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [done, setDone] = useState(false);
  const confetti = useConfetti();

  const ex = dialog.exchanges[eIndex];

  // Past exchanges: bubble = the spoken line + the user's chosen reply
  const pastBubbles = useMemo(() => {
    const list = [];
    for (let i = 0; i < eIndex; i++) {
      const prev = dialog.exchanges[i];
      list.push({ speaker: prev.speaker, de: prev.de, ar: prev.ar, mine: false });
    }
    return list;
  }, [eIndex, dialog]);

  const chosenReplies = useMemo(() => {
    const list = [];
    for (let i = 0; i < eIndex; i++) {
      list.push(dialog.exchanges[i].reply);
    }
    return list;
  }, [eIndex, dialog]);

  if (done) {
    return <GameEnd won={score >= 2} title={score >= 2 ? "🏆 متحدث بارع!" : "💪 قريب!"}
      msg={`${score}/${dialog.exchanges.length} ردود صحيحة`} xp={score >= 2 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const pick = (opt) => {
    if (answered) return;
    setAnswered(true);
    setLastPick(opt.de);
    if (opt.correct) {
      setScore(s => s + 1);
      setFeedback("✅ إجابة صحيحة! " + ex.reply);
      confetti(40);
    } else {
      const right = ex.options.find(o => o.correct);
      setFeedback("❌ ليست الأفضل. الصحيح: «" + right.de + "» — " + right.ar);
    }
    setTimeout(() => {
      if (eIndex + 1 >= dialog.exchanges.length) {
        setDone(true);
        const finalScore = opt.correct ? score + 1 : score;
        recordGameResult({
          gameId: "dialogue", levelCode: level.code,
          metric: finalScore, isBetter: (b) => b === undefined || finalScore > b,
          won: finalScore >= 2, xp: finalScore >= 2 ? 15 : 5
        });
      } else {
        setAnswered(false);
        setEIndex(i => i + 1);
      }
    }, 1600);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>💬 {dialog.icon} {dialog.title}</h2>
        <p>{dialog.scene}</p>
        <span className="game-score">الموقف {eIndex + 1}/{dialog.exchanges.length} · النتيجة {score}</span>
      </div>

      <div className="dialogue-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="dialogue-scene">{dialog.icon} {dialog.title}</div>
        <div className="dialogue-chat">
          {pastBubbles.map((b, i) => (
            <div key={i} className="chat-bubble theirs">
              <div className="cb-speaker">{b.speaker}</div>
              <div className="cb-text" dir="ltr" style={{ fontFamily: "var(--font-la)" }}>{b.de}</div>
              <div className="cb-ar">{b.ar}</div>
            </div>
          ))}
          {chosenReplies.map((r, i) => (
            <div key={"r" + i} className="chat-bubble mine">
              <div className="cb-speaker">أنت</div>
              <div className="cb-text" dir="ltr" style={{ fontFamily: "var(--font-la)" }}>{r}</div>
            </div>
          ))}
          <div className={"chat-bubble " + (ex.speaker === "أنت" ? "mine" : "theirs")}>
            <div className="cb-speaker">{ex.speaker}</div>
            <div className="cb-text" dir="ltr" style={{ fontFamily: "var(--font-la)" }}>{ex.de}</div>
            <div className="cb-ar">{ex.ar}</div>
          </div>
        </div>

        <div className="dialogue-options">
          <p className="do-label">اختر الرد المناسب:</p>
          {ex.options.map((o, i) => {
            let cls = "dialogue-option";
            if (answered) {
              if (o.correct) cls += " correct";
              else if (o.de === lastPick) cls += " wrong";
            }
            return (
              <button key={i} className={cls} disabled={answered} onClick={() => pick(o)}>
                <span className="do-de" dir="ltr" style={{ fontFamily: "var(--font-la)" }}>{o.de}</span>
                <span className="do-ar">{o.ar}</span>
              </button>
            );
          })}
        </div>

        {answered && <div className={"dialogue-feedback " + (feedback.startsWith("✅") ? "good" : "bad")}>{feedback}</div>}
      </div>
    </>
  );
}
