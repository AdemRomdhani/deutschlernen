import { useState, useEffect, useMemo } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, recordWrongWord } from "../../store.js";
import { useConfetti, useToast, TimerBar } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const TIME_PER_Q = 10;

const NOUN_DATA = {
  "der Mann":     { gender: "m", nominativ: "der Mann", akkusativ: "den Mann", dativ: "dem Mann", genitiv: "des Mannes" },
  "die Frau":     { gender: "f", nominativ: "die Frau", akkusativ: "die Frau", dativ: "der Frau", genitiv: "der Frau" },
  "das Kind":     { gender: "n", nominativ: "das Kind", akkusativ: "das Kind", dativ: "dem Kind", genitiv: "des Kindes" },
  "die Kinder":   { gender: "pl", nominativ: "die Kinder", akkusativ: "die Kinder", dativ: "den Kindern", genitiv: "der Kinder" },
  "der Hund":     { gender: "m", nominativ: "der Hund", akkusativ: "den Hund", dativ: "dem Hund", genitiv: "des Hundes" },
  "die Katze":    { gender: "f", nominativ: "die Katze", akkusativ: "die Katze", dativ: "der Katze", genitiv: "der Katze" },
  "das Buch":     { gender: "n", nominativ: "das Buch", akkusativ: "das Buch", dativ: "dem Buch", genitiv: "des Buches" },
  "der Tisch":    { gender: "m", nominativ: "der Tisch", akkusativ: "den Tisch", dativ: "dem Tisch", genitiv: "des Tisches" },
  "die Blume":    { gender: "f", nominativ: "die Blume", akkusativ: "die Blume", dativ: "der Blume", genitiv: "der Blume" },
  "das Auto":     { gender: "n", nominativ: "das Auto", akkusativ: "das Auto", dativ: "dem Auto", genitiv: "des Autos" },
  "der Apfel":    { gender: "m", nominativ: "der Apfel", akkusativ: "den Apfel", dativ: "dem Apfel", genitiv: "des Apfels" },
  "die Milch":    { gender: "f", nominativ: "die Milch", akkusativ: "die Milch", dativ: "der Milch", genitiv: "der Milch" },
  "das Wasser":   { gender: "n", nominativ: "das Wasser", akkusativ: "das Wasser", dativ: "dem Wasser", genitiv: "des Wassers" },
  "der Kaffee":   { gender: "m", nominativ: "der Kaffee", akkusativ: "den Kaffee", dativ: "dem Kaffee", genitiv: "des Kaffees" },
  "die Schule":   { gender: "f", nominativ: "die Schule", akkusativ: "die Schule", dativ: "der Schule", genitiv: "der Schule" },
  "das Haus":     { gender: "n", nominativ: "das Haus", akkusativ: "das Haus", dativ: "dem Haus", genitiv: "des Hauses" },
  "der Arzt":     { gender: "m", nominativ: "der Arzt", akkusativ: "den Arzt", dativ: "dem Arzt", genitiv: "des Arztes" },
  "die Zeitung":  { gender: "f", nominativ: "die Zeitung", akkusativ: "die Zeitung", dativ: "der Zeitung", genitiv: "der Zeitung" },
  "das Fenster":  { gender: "n", nominativ: "das Fenster", akkusativ: "das Fenster", dativ: "dem Fenster", genitiv: "des Fensters" },
  "der Stuhl":    { gender: "m", nominativ: "der Stuhl", akkusativ: "den Stuhl", dativ: "dem Stuhl", genitiv: "des Stuhls" },
};

const CASES = ["Nominativ", "Akkusativ", "Dativ"];
const ARTICLE_OPTIONS = ["der", "die", "das", "den", "dem", "des"];

function getArticle(noun, caseName) {
  const d = NOUN_DATA[noun];
  if (!d) return "der";
  const full = d[caseName.toLowerCase()];
  if (!full) return "der";
  return full.split(" ")[0];
}

function getDistractors(correctArticle) {
  const others = ARTICLE_OPTIONS.filter(a => a !== correctArticle);
  return shuffle(others).slice(0, 3);
}

export default function CaseChallenge({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => getLevelWords(levelIdx), [levelIdx]);

  const rounds = useMemo(() => {
    const nouns = words.filter(w => {
      const noun = w.de.split(" ").pop();
      return NOUN_DATA[w.de] || NOUN_DATA[noun];
    });
    const base = nouns.length >= 4 ? nouns : words;
    const selected = shuffle(base).slice(0, 8);
    return selected.map(w => {
      const noun = NOUN_DATA[w.de] || NOUN_DATA[w.de.split(" ").pop()];
      const caseName = CASES[Math.floor(Math.random() * CASES.length)];
      const correctArticle = getArticle(w.de, caseName);
      const distractors = getDistractors(correctArticle);
      return { de: w.de, ar: w.ar, case: caseName, correct: correctArticle, options: shuffle([correctArticle, ...distractors]) };
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
    return <GameEnd won={score >= 6} title={score >= 6 ? "🏆 خبير الحالات!" : "💪 قريب!"}
      msg={`${score}/${rounds.length} إجابات صحيحة`} xp={score >= 6 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (rIndex + 1 >= rounds.length) {
      setDone(true);
      const won = finalScore >= 6;
      recordGameResult({
        gameId: "casechallenge", levelCode: level.code,
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
        <h2>📛 تحدي الحالات</h2>
        <p>ما هو الأداة الصحيحة للاسم في حالة {r.case}؟</p>
        <span className="game-score">السؤال {rIndex + 1}/{rounds.length} · النتيجة {score} · 🔥{combo}</span>
      </div>
      <TimerBar seconds={TIME_PER_Q} resetKey={rIndex} onTimeout={onTimeout} />
      <div className="tf-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="tf-card">
          <div className="tf-de">{r.de}</div>
          <div className="tf-ar">{r.ar}</div>
          <div className="tf-question" style={{ marginTop: 12 }}>
            ما هو الأداة في حالة <strong>{r.case}</strong>؟
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
