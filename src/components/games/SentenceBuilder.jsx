import { useEffect, useMemo, useState } from "react";
import { LEVELS, getLevelSentences, shuffle } from "../../data.js";
import { recordGameResult } from "../../store.js";
import { useToast, useConfetti, TimerBar } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const TIME_PER_Q = 25;

export default function SentenceBuilder({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const all = useMemo(() => getLevelSentences(levelIdx), [levelIdx]);
  const sentences = useMemo(() => shuffle(all).slice(0, 5), [all]);
  const [sIndex, setSIndex] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [picked, setPicked] = useState([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const toast = useToast();
  const confetti = useConfetti();

  const s = sentences[sIndex];
  const tokens = useMemo(() => {
    if (!s) return [];
    return s.de.replace(/[.!?]$/, "").split(" ").map(t => t.trim()).filter(Boolean);
  }, [s]);

  const shuffled = useMemo(() => shuffle(tokens), [s]);

  useEffect(() => {
    setPlaced([]);
    setPicked(shuffled);
  }, [sIndex]);

  if (done) {
    return <GameEnd won={score >= 3} title={score >= 3 ? "🏆 مهندس الجمل!" : "💪 قريب!"}
      msg={`${score}/${sentences.length} جمل صحيحة`} xp={score >= 3 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const place = (word) => {
    setPicked(p => p.filter(w => w !== word));
    setPlaced(p => [...p, word]);
  };

  const unplace = (word) => {
    setPlaced(p => p.filter(w => w !== word));
    setPicked(p => [...p, word]);
  };

  const check = () => {
    const correct = placed.join(" ") === tokens.join(" ");
    if (correct) {
      setScore(sc => sc + 1);
      toast("✅ جملة صحيحة!");
      confetti(50);
    } else {
      toast("❌ حاول مرة أخرى");
    }
    setTimeout(() => {
      if (sIndex + 1 >= sentences.length) {
        setDone(true);
        const finalScore = correct ? score + 1 : score;
        recordGameResult({
          gameId: "sentence", levelCode: level.code,
          metric: finalScore, isBetter: (b) => b === undefined || finalScore > b,
          won: finalScore >= 3, xp: finalScore >= 3 ? 15 : 5
        });
      } else {
        setSIndex(i => i + 1);
      }
    }, 900);
  };

  const onTimeout = () => {
    setPicked(shuffled);
    setPlaced([]);
    toast("⏰ انتهى الوقت!");
    setTimeout(() => {
      if (sIndex + 1 >= sentences.length) {
        setDone(true);
        recordGameResult({
          gameId: "sentence", levelCode: level.code,
          metric: score, isBetter: (b) => b === undefined || score > b,
          won: score >= 3, xp: score >= 3 ? 15 : 5
        });
      } else {
        setSIndex(i => i + 1);
      }
    }, 600);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>🧱 رتب الجملة</h2>
        <p>رتّب الكلمات لتكوين جملة ألمانية صحيحة</p>
        <span className="game-score">الجملة {sIndex + 1}/{sentences.length} · النتيجة {score}</span>
      </div>
      <TimerBar seconds={TIME_PER_Q} resetKey={sIndex} onTimeout={onTimeout} />
      <div className="sentence-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="sentence-prompt">
          <div className="sp-icon">💡</div>
          <div className="sp-ar">{s.ar}</div>
          <button className="speak-btn" onClick={() => speakGerman(s.de)}>
            <span className="spk-icon">🔊</span> استمع للنموذج
          </button>
        </div>

        <div className="sentence-slots">
          {placed.map((w, i) => (
            <button key={i} className="slot-word" onClick={() => unplace(w)}>{w}</button>
          ))}
          {placed.length === 0 && <span className="slots-hint">اضغط على الكلمات بالأسفل</span>}
        </div>

        <div className="sentence-bank">
          {picked.map((w, i) => (
            <button key={i} className="bank-word" onClick={() => place(w)}>{w}</button>
          ))}
        </div>

        <button className="btn btn-primary" onClick={check} disabled={placed.length === 0}>
          ✓ تحقق
        </button>
      </div>
    </>
  );
}
