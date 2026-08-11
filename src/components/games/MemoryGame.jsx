import { useEffect, useMemo, useState } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, useProgress } from "../../store.js";
import { useConfetti } from "../UI.jsx";
import GameEnd from "./GameEnd.jsx";

export default function MemoryGame({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => shuffle(getLevelWords(levelIdx)).slice(0, 6), [levelIdx]);
  const cards = useMemo(() =>
    shuffle(words.flatMap(w => [
      { type: "de", text: w.de, id: w.de },
      { type: "ar", text: w.ar, id: w.de }
    ])), [words]);

  const [revealed, setRevealed] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [pending, setPending] = useState(null);
  const [done, setDone] = useState(false);
  const confetti = useConfetti();

  const totalPairs = words.length;
  const progress = useProgress();
  const best = progress.gameBests[`memory_${level.code}`];

  useEffect(() => {
    if (matched.length === totalPairs && totalPairs > 0) {
      const t = setTimeout(() => {
        setDone(true);
        const won = moves <= totalPairs * 2;
        recordGameResult({
          gameId: "memory", levelCode: level.code,
          metric: moves, isBetter: (b) => b === undefined || moves < b,
          won, xp: won ? 15 : 8
        });
        if (won) confetti(70);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [matched, moves, totalPairs, level.code]);

  if (done) {
    return <GameEnd won={moves <= totalPairs * 2}
      title={`أنهيت اللعبة في ${moves} تحرّك!`}
      msg={moves <= totalPairs * 2 ? "ممتاز! ذاكرة قوية" : "جرّب مرة أخرى لتقليل التحركات"}
      xp={moves <= totalPairs * 2 ? 15 : 8} onReplay={onReplay} onBack={onBack} />;
  }

  const flip = (i) => {
    if (pending) return;
    if (revealed.includes(i) || matched.includes(i)) return;
    const newRevealed = [...revealed, i];
    setRevealed(newRevealed);
    setMoves(m => m + 1);

    if (newRevealed.length === 2) {
      setPending(true);
      const [a, b] = newRevealed;
      if (cards[a].id === cards[b].id) {
        setMatched(m => [...m, a, b]);
        setRevealed([]);
        setPending(null);
      } else {
        setTimeout(() => {
          setRevealed([]);
          setPending(null);
        }, 900);
      }
    }
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>🧠 لعبة الذاكرة</h2>
        <p>اعثر على أزواج الكلمات المتطابقة</p>
        <span className="game-score">
          التحركات: {moves} · الأزواج: {matched.length / 2}/{totalPairs}
          {best !== undefined && <>&nbsp;· الأفضل: {best}</>}
        </span>
      </div>
      <div className="memory-grid" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        {cards.map((c, i) => {
          const isRevealed = revealed.includes(i);
          const isMatched = matched.includes(i);
          const face = isRevealed || isMatched;
          return (
            <button
              key={i}
              className={"memory-card" + (face ? " revealed" : "") + (isMatched ? " matched" : "")}
              onClick={() => flip(i)}
            >
              <span className="mem-face mem-front">❓</span>
              <span className="mem-face mem-back" style={c.text.length > 10 ? { fontSize: 13 } : undefined}>
                {c.text}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
