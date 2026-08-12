import { useState, useEffect, useMemo } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult, recordWrongWord } from "../../store.js";
import { useConfetti, useToast, TimerBar } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import GameEnd from "./GameEnd.jsx";

const TIME_PER_Q = 10;

const PRONOUNS = [
  { de: "ich", en: "I" },
  { de: "du", en: "you (informal)" },
  { de: "er", en: "he" },
  { de: "sie", en: "she" },
  { de: "es", en: "it" },
  { de: "wir", en: "we" },
  { de: "ihr", en: "you all" },
  { de: "sie", en: "they" },
];

const CONJUGATIONS = {
  sein:    { ich: "bin", du: "bist", er: "ist", sie: "ist", es: "ist", wir: "sind", ihr: "seid", sie2: "sind" },
  haben:   { ich: "habe", du: "hast", er: "hat", sie: "hat", es: "hat", wir: "haben", ihr: "habt", sie2: "haben" },
  machen:  { ich: "mache", du: "machst", er: "macht", sie: "macht", es: "macht", wir: "machen", ihr: "macht", sie2: "machen" },
  gehen:   { ich: "gehe", du: "gehst", er: "geht", sie: "geht", es: "geht", wir: "gehen", ihr: "geht", sie2: "gehen" },
  kommen:  { ich: "komme", du: "kommst", er: "kommt", sie: "kommt", es: "kommt", wir: "kommen", ihr: "kommt", sie2: "kommen" },
  sagen:   { ich: "sage", du: "sagst", er: "sagt", sie: "sagt", es: "sagt", wir: "sagen", ihr: "sagt", sie2: "sagen" },
  geben:   { ich: "gebe", du: "gibst", er: "gibt", sie: "gibt", es: "gibt", wir: "geben", ihr: "gebt", sie2: "geben" },
  sehen:   { ich: "sehe", du: "siehst", er: "sieht", sie: "sieht", es: "sieht", wir: "sehen", ihr: "seht", sie2: "sehen" },
  wissen:  { ich: "weiß", du: "weißt", er: "weiß", sie: "weiß", es: "weiß", wir: "wissen", ihr: "wisst", sie2: "wissen" },
  wollen:  { ich: "will", du: "willst", er: "will", sie: "will", es: "will", wir: "wollen", ihr: "wollt", sie2: "wollen" },
  können:  { ich: "kann", du: "kannst", er: "kann", sie: "kann", es: "kann", wir: "können", ihr: "könnt", sie2: "können" },
  müssen:  { ich: "muss", du: "musst", er: "muss", sie: "muss", es: "muss", wir: "müssen", ihr: "müsst", sie2: "müssen" },
  dürfen:  { ich: "darf", du: "darfst", er: "darf", sie: "darf", es: "darf", wir: "dürfen", ihr: "dürft", sie2: "dürfen" },
  sollen:  { ich: "soll", du: "sollst", er: "soll", sie: "soll", es: "soll", wir: "sollen", ihr: "sollt", sie2: "sollen" },
  lernen:  { ich: "lerne", du: "lernst", er: "lernt", sie: "lernt", es: "lernt", wir: "lernen", ihr: "lernt", sie2: "lernen" },
  arbeiten:{ ich: "arbeite", du: "arbeitest", er: "arbeitet", sie: "arbeitet", es: "arbeitet", wir: "arbeiten", ihr: "arbeitet", sie2: "arbeiten" },
  wohnen:  { ich: "wohne", du: "wohnst", er: "wohnt", sie: "wohnt", es: "wohnt", wir: "wohnen", ihr: "wohnt", sie2: "wohnen" },
  spielen: { ich: "spiele", du: "spielst", er: "spielt", sie: "spielt", es: "spielt", wir: "spielen", ihr: "spielt", sie2: "spielen" },
  trinken: { ich: "trinke", du: "trinkst", er: "trinkt", sie: "trinkt", es: "trinkt", wir: "trinken", ihr: "trinkt", sie2: "trinken" },
  lesen:   { ich: "lese", du: "liest", er: "liest", sie: "liest", es: "liest", wir: "lesen", ihr: "lest", sie2: "lesen" },
  fahren:  { ich: "fahre", du: "fährst", er: "fährt", sie: "fährt", es: "fährt", wir: "fahren", ihr: "fahrt", sie2: "fahren" },
  laufen:  { ich: "laufe", du: "läufst", er: "läuft", sie: "läuft", es: "läuft", wir: "laufen", ihr: "läuft", sie2: "laufen" },
  schlafen:{ ich: "schlafe", du: "schläfst", er: "schläft", sie: "schläft", es: "schläft", wir: "schlafen", ihr: "schlaft", sie2: "schlafen" },
  essen:   { ich: "esse", du: "isst", er: "isst", sie: "isst", es: "isst", wir: "essen", ihr: "esst", sie2: "essen" },
};

function getConjugation(verb, pronounDe) {
  const v = CONJUGATIONS[verb];
  if (!v) return null;
  if (pronounDe === "sie" || pronounDe === "er" || pronounDe === "es") return v.ich === v.er ? v.er : v.ich;
  if (pronounDe === "wir") return v.wir;
  if (pronounDe === "ihr") return v.ihr;
  if (pronounDe === "du") return v.du;
  if (pronounDe === "ich") return v.ich;
  return v[pronounDe];
}

function getCorrectConj(verb, pronoun) {
  const v = CONJUGATIONS[verb];
  if (!v) return "";
  if (pronoun.de === "ich") return v.ich;
  if (pronoun.de === "du") return v.du;
  if (pronoun.de === "wir") return v.wir;
  if (pronoun.de === "ihr") return v.ihr;
  if (pronoun.de === "er" || pronoun.de === "sie" || pronoun.de === "es") return v.er;
  return v.ich;
}

function generateDistractors(verb, pronoun) {
  const correct = getCorrectConj(verb, pronoun);
  const all = Object.values(CONJUGATIONS).map(c => {
    if (pronoun.de === "ich") return c.ich;
    if (pronoun.de === "du") return c.du;
    if (pronoun.de === "wir") return c.wir;
    if (pronoun.de === "ihr") return c.ihr;
    return c.er;
  });
  const unique = [...new Set(all)].filter(x => x && x !== correct);
  return shuffle(unique).slice(0, 3);
}

export default function ConjugationGame({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => getLevelWords(levelIdx), [levelIdx]);
  const verbs = useMemo(() => {
    const verbWords = words.filter(w => Object.keys(CONJUGATIONS).includes(w.de.toLowerCase()));
    const base = verbWords.length >= 4 ? verbWords : words;
    return shuffle(base).slice(0, 8);
  }, [words]);

  const rounds = useMemo(() => {
    return verbs.map(v => {
      const verb = v.de.toLowerCase();
      const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
      const correct = getCorrectConj(verb, pronoun);
      const distractors = generateDistractors(verb, pronoun);
      const options = shuffle([correct, ...distractors]);
      return { verb, pronoun, ar: v.ar, correct, options };
    });
  }, [verbs]);

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
    const t = setTimeout(() => speakGerman(r.verb), 300);
    return () => clearTimeout(t);
  }, [rIndex]);

  if (done) {
    return <GameEnd won={score >= 6} title={score >= 6 ? "🏆 أستاذ التصريف!" : "💪 قريب!"}
      msg={`${score}/${rounds.length} إجابات صحيحة`} xp={score >= 6 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (rIndex + 1 >= rounds.length) {
      setDone(true);
      const won = finalScore >= 6;
      recordGameResult({
        gameId: "conjugation", levelCode: level.code,
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
      recordWrongWord(level.code, { de: `${r.verb} (${r.pronoun.de})`, ar: r.ar });
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
    recordWrongWord(level.code, { de: `${r.verb} (${r.pronoun.de})`, ar: r.ar });
    setTimeout(() => advance(score), 600);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>📝 تصريف الأفعال</h2>
        <p>صِف الفعل الألماني حسب الضمير المعروض</p>
        <span className="game-score">السؤال {rIndex + 1}/{rounds.length} · النتيجة {score} · 🔥{combo}</span>
      </div>
      <TimerBar seconds={TIME_PER_Q} resetKey={rIndex} onTimeout={onTimeout} />
      <div className="tf-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="tf-card">
          <div className="tf-de">{r.verb}</div>
          <div className="tf-ar" style={{ fontSize: "1.1rem", opacity: 0.7 }}>{r.ar}</div>
          <div className="tf-question" style={{ marginTop: 12 }}>
            صِف مع <strong>{r.pronoun.de}</strong> ({r.pronoun.en})
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
