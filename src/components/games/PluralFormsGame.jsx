import { useState, useEffect, useMemo } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, recordWrongWord } from "../../store.js";
import { useConfetti, useToast, TimerBar } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const TIME_PER_Q = 10;

const PLURAL_DATA = [
  { singular: "der Mann", plural: "die Männer", ar: "الرجال", ending: "-er" },
  { singular: "die Frau", plural: "die Frauen", ar: "النساء", ending: "-en" },
  { singular: "das Kind", plural: "die Kinder", ar: "الأطفال", ending: "-er" },
  { singular: "der Hund", plural: "die Hunde", ar: "الكلاب", ending: "-e" },
  { singular: "die Katze", plural: "die Katzen", ar: "القطط", ending: "-n" },
  { singular: "das Buch", plural: "die Bücher", ar: "الكتب", ending: "-er" },
  { singular: "der Tisch", plural: "die Tische", ar: "الطاولات", ending: "-e" },
  { singular: "die Blume", plural: "die Blumen", ar: "الزهور", ending: "-n" },
  { singular: "das Auto", plural: "die Autos", ar: "السيارات", ending: "-s" },
  { singular: "der Apfel", plural: "die Äpfel", ar: "التفاح", ending: "umlaut+-e" },
  { singular: "die Schule", plural: "die Schulen", ar: "المدارس", ending: "-n" },
  { singular: "das Haus", plural: "die Häuser", ar: "البيوت", ending: "umlaut+-er" },
  { singular: "der Arzt", plural: "die Ärzte", ar: "الأطباء", ending: "umlaut+-e" },
  { singular: "die Zeitung", plural: "die Zeitungen", ar: "الجرائد", ending: "-n" },
  { singular: "das Fenster", plural: "die Fenster", ar: "النوافذ", ending: "-" },
  { singular: "der Stuhl", plural: "die Stühle", ar: "الكراسي", ending: "umlaut+-e" },
  { singular: "die Milch", plural: "die Milche", ar: "الحليب (أنواع)", ending: "-n" },
  { singular: "das Wasser", plural: "die Wasser", ar: "المياه", ending: "-" },
  { singular: "der Kaffee", plural: "die Kaffees", ar: "القهوة (أنواع)", ending: "-s" },
  { singular: "die Schuhe", plural: "die Schuhe", ar: "الأحذية", ending: "-" },
  { singular: "der Bruder", plural: "die Brüder", ar: "الإخوة", ending: "umlaut+-er" },
  { singular: "die Schwester", plural: "die Schwestern", ar: "الأخوات", ending: "-n" },
  { singular: "das Brot", plural: "die Brote", ar: "الخبز (أنواع)", ending: "-e" },
  { singular: "der Vater", plural: "die Väter", ar: "الآباء", ending: "umlaut+-er" },
  { singular: "die Mutter", plural: "die Mütter", ar: "ال الأمهات", ending: "umlaut+-er" },
];

function generatePluralDistractors(correctPlural, singular) {
  const noun = singular.split(" ").pop();
  const wrongEndings = ["-e", "-n", "-s", "-er", "-en", "-"];
  const distractors = wrongEndings.map(e => {
    if (e === "-") return "die " + noun;
    if (e === "-s") return "die " + noun + "s";
    if (e === "-n" || e === "-en") return "die " + noun + "en";
    if (e === "-e") return "die " + noun + "e";
    if (e === "-er") return "die " + noun + "er";
    return "die " + noun + e;
  }).filter(d => d !== correctPlural && d !== singular);
  return shuffle([...new Set(distractors)]).slice(0, 3);
}

export default function PluralFormsGame({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => getLevelWords(levelIdx), [levelIdx]);

  const rounds = useMemo(() => {
    const matching = PLURAL_DATA.filter(p =>
      words.some(w => w.de === p.singular || w.de.includes(p.singular.split(" ").pop()))
    );
    const base = matching.length >= 4 ? matching : PLURAL_DATA;
    return shuffle(base).slice(0, 8).map(p => {
      const distractors = generatePluralDistractors(p.plural, p.singular);
      return {
        singular: p.singular,
        plural: p.plural,
        ar: p.ar,
        correct: p.plural,
        options: shuffle([p.plural, ...distractors]),
      };
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
    const t = setTimeout(() => speakGerman(r.singular), 300);
    return () => clearTimeout(t);
  }, [rIndex]);

  if (done) {
    return <GameEnd won={score >= 6} title={score >= 6 ? "🏆 خبير الجمع!" : "💪 قريب!"}
      msg={`${score}/${rounds.length} إجابات صحيحة`} xp={score >= 6 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (rIndex + 1 >= rounds.length) {
      setDone(true);
      const won = finalScore >= 6;
      recordGameResult({
        gameId: "plurals", levelCode: level.code,
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
      recordWrongWord(level.code, { de: r.singular, ar: r.ar });
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
    recordWrongWord(level.code, { de: r.singular, ar: r.ar });
    setTimeout(() => advance(score), 600);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>📚 أشكال الجمع</h2>
        <p>اختر الشكل الصحيح للجمع للاسم المعروض</p>
        <span className="game-score">السؤال {rIndex + 1}/{rounds.length} · النتيجة {score} · 🔥{combo}</span>
      </div>
      <TimerBar seconds={TIME_PER_Q} resetKey={rIndex} onTimeout={onTimeout} />
      <div className="tf-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="tf-card">
          <div className="tf-de">{r.singular}</div>
          <div className="tf-ar">{r.ar}</div>
          <div className="tf-question" style={{ marginTop: 12 }}>
            ما هو الشكل الصحيح لل<strong>جمع</strong>؟
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
