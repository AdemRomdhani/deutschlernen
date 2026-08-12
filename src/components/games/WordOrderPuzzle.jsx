import { useState, useEffect, useMemo } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, recordWrongWord } from "../../store.js";
import { useConfetti, useToast } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const SENTENCES = [
  { de: "Ich lerne jeden Tag Deutsch.", ar: "أنا أتعلم الألمانية كل يوم", words: ["Ich", "lerne", "jeden", "Tag", "Deutsch."] },
  { de: "Er spielt gern Fußball.", ar: "هو يحب لعب كرة القدم", words: ["Er", "spielt", "gern", "Fußball."] },
  { de: "Wir gehen in die Schule.", ar: "نحن نذهب إلى المدرسة", words: ["Wir", "gehen", "in", "die", "Schule."] },
  { de: "Sie trinkt Kaffee.", ar: "هي تشرب القهوة", words: ["Sie", "trinkt", "Kaffee."] },
  { de: "Der Hund ist sehr groß.", ar: "الكلب كبير جداً", words: ["Der", "Hund", "ist", "sehr", "groß."] },
  { de: "Das Kind spielt im Garten.", ar: "الطفل يلعب في الحديقة", words: ["Das", "Kind", "spielt", "im", "Garten."] },
  { de: "Meine Mutter kocht gern.", ar: "أمي تحب الطبخ", words: ["Meine", "Mutter", "kocht", "gern."] },
  { de: "Er fährt mit dem Bus.", ar: "هو يسافر بالحافلة", words: ["Er", "fährt", "mit", "dem", "Bus."] },
  { de: "Wir haben einen Hund.", ar: "لدينا كلب", words: ["Wir", "haben", "einen", "Hund."] },
  { de: "Das Buch ist interessant.", ar: "الكتاب مثير للاهتمام", words: ["Das", "Buch", "ist", "interessant."] },
  { de: "Ich möchte Pizza essen.", ar: "أريد أن آكل بيتزا", words: ["Ich", "möchte", "Pizza", "essen."] },
  { de: "Sie kommt aus Deutschland.", ar: "هي قادمة من ألمانيا", words: ["Sie", "kommt", "aus", "Deutschland."] },
  { de: "Er liest ein Buch.", ar: "هو يقرأ كتاباً", words: ["Er", "liest", "ein", "Buch."] },
  { de: "Wir wohnen in Berlin.", ar: "نحن نعيش في برلين", words: ["Wir", "wohnen", "in", "Berlin."] },
  { de: "Der Kaffee ist heiß.", ar: "القهوة حارة", words: ["Der", "Kaffee", "ist", "heiß."] },
  { de: "Das Wasser ist kalt.", ar: "الماء بارد", words: ["Das", "Wasser", "ist", "kalt."] },
  { de: "Ich habe Hunger.", ar: "أنا جائع", words: ["Ich", "habe", "Hunger."] },
  { de: "Sie spielt Klavier.", ar: "هي تعزف البيانو", words: ["Sie", "spielt", "Klavier."] },
  { de: "Er arbeitet in einem Büro.", ar: "هو يعمل في مكتب", words: ["Er", "arbeitet", "in", "einem", "Büro."] },
  { de: "Wir essen gern Italienisch.", ar: "نحب الأكل الإيطالي", words: ["Wir", "essen", "gern", "Italienisch."] },
];

export default function WordOrderPuzzle({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];

  const rounds = useMemo(() => shuffle(SENTENCES).slice(0, 8), []);

  const [rIndex, setRIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const confetti = useConfetti();
  const toast = useToast();

  const r = rounds[rIndex];

  const available = useMemo(() => {
    return r.words.filter(w => !selected.includes(w + "_" + r.words.indexOf(w)));
  }, [r, selected]);

  const selectedDisplay = useMemo(() => {
    return selected.map(s => {
      const idx = parseInt(s.split("_").pop());
      return r.words[idx];
    });
  }, [selected, r]);

  useEffect(() => {
    setSelected([]);
    setAnswered(false);
    setLastCorrect(null);
  }, [rIndex]);

  useEffect(() => {
    const t = setTimeout(() => speakGerman(r.de), 300);
    return () => clearTimeout(t);
  }, [rIndex]);

  if (done) {
    return <GameEnd won={score >= 6} title={score >= 6 ? "🏆 خبير ترتيب الجمل!" : "💪 قريب!"}
      msg={`${score}/${rounds.length} جمل صحيحة`} xp={score >= 6 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (rIndex + 1 >= rounds.length) {
      setDone(true);
      const won = finalScore >= 6;
      recordGameResult({
        gameId: "wordorder", levelCode: level.code,
        metric: finalScore, isBetter: (b) => b === undefined || finalScore > b,
        won, xp: won ? 15 : 5
      });
      if (won) confetti(70);
    } else {
      setRIndex(i => i + 1);
    }
  };

  const addWord = (word, idx) => {
    if (answered) return;
    const key = word + "_" + idx;
    if (selected.includes(key)) return;
    setSelected(s => [...s, key]);
  };

  const removeWord = (key) => {
    if (answered) return;
    setSelected(s => s.filter(x => x !== key));
  };

  const checkAnswer = () => {
    if (answered || selected.length !== r.words.length) return;
    setAnswered(true);
    const userSentence = selectedDisplay.join(" ");
    const correct = userSentence === r.de;
    setLastCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      setCombo(c => c + 1);
      if (combo + 1 >= 3) toast(`🔥 ${combo + 1} إجابات متتالية!`);
    } else {
      setCombo(0);
      recordWrongWord(level.code, { de: r.de, ar: r.ar });
    }
    const finalScore = correct ? score + 1 : score;
    setTimeout(() => advance(finalScore), 1200);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>🧩 ترتيب الجمل</h2>
        <p>رتب الكلمات لتكوين الجملة الصحيحة</p>
        <span className="game-score">السؤال {rIndex + 1}/{rounds.length} · النتيجة {score} · 🔥{combo}</span>
      </div>
      <div className="tf-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="tf-card">
          <div className="tf-ar" style={{ fontSize: "1.2rem", marginBottom: 8 }}>{r.ar}</div>
          <div className="tf-question">رتّب الكلمات بالترتيب الصحيح</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minHeight: 48, padding: "12px 8px", background: "var(--card-bg, #1a1a2e)", borderRadius: 12, marginTop: 16, justifyContent: "center", alignItems: "center" }}>
          {selectedDisplay.length === 0 && <span style={{ opacity: 0.4, fontSize: "0.9rem" }}>اضغط على الكلمات لإضافتها</span>}
          {selected.map((s, i) => {
            const word = s.split("_")[0];
            return (
              <button key={s} className="match-option" onClick={() => removeWord(s)}
                style={{ padding: "6px 14px", fontSize: "0.95rem" }}>
                {word}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16, justifyContent: "center" }}>
          {r.words.map((w, i) => {
            const key = w + "_" + i;
            const isUsed = selected.includes(key);
            return (
              <button key={key}
                className="match-option"
                style={{ opacity: isUsed ? 0.3 : 1, pointerEvents: isUsed ? "none" : "auto" }}
                disabled={isUsed || answered}
                onClick={() => addWord(w, i)}>
                {w}
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="btn btn-primary" disabled={selected.length !== r.words.length || answered}
            onClick={checkAnswer}>
            تحقق
          </button>
        </div>

        {answered && (
          <div style={{ textAlign: "center", marginTop: 12, fontSize: "1.1rem", fontWeight: 600, color: lastCorrect ? "#22c55e" : "#ef4444" }}>
            {lastCorrect ? "✓ صحيح!" : `✗ الإجابة الصحيحة: ${r.de}`}
          </div>
        )}
      </div>
    </>
  );
}
