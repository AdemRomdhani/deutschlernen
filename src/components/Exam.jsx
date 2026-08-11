import { useEffect, useMemo, useState } from "react";
import { LEVELS, getLevelWords, shuffle } from "../data.js";
import { recordExam } from "../store.js";
import { speakGerman } from "../speech.js";
import { useToast } from "./UI.jsx";
import Result from "./Result.jsx";

function buildQuestions(words, levelIdx) {
  const qs = [];
  const allWords = LEVELS.slice(0, levelIdx + 1).flatMap(l => l.lessons.flatMap(ls => ls.words));

  const pickWrong = (pool, correctWord, field) => {
    const uniq = [];
    for (const cand of shuffle(pool)) {
      if (cand !== correctWord && cand[field] !== correctWord[field] && !uniq.includes(cand[field])) {
        uniq.push(cand[field]);
        if (uniq.length === 3) break;
      }
    }
    while (uniq.length < 3) {
      const extra = pool[Math.floor(Math.random() * pool.length)][field];
      if (extra !== correctWord[field] && !uniq.includes(extra)) uniq.push(extra);
    }
    return uniq;
  };

  for (const w of shuffle(words)) {
    if (qs.length >= 5) break;
    qs.push({
      type: "de2ar",
      prompt: `ما معنى الكلمة <span class="eq-de">"${w.de}"</span>؟`,
      answer: w.ar,
      options: [w.ar, ...pickWrong(allWords, w, "ar")]
    });
  }
  for (const w of shuffle(words)) {
    if (qs.length >= 9) break;
    qs.push({
      type: "ar2de",
      prompt: `ما الترجمة الألمانية لكلمة "${w.ar}"؟`,
      answer: w.de,
      options: [w.de, ...pickWrong(allWords, w, "de")]
    });
  }
  for (const w of shuffle(words)) {
    if (qs.length >= 10) break;
    qs.push({
      type: "pron",
      prompt: `تُنطق "${w.pron}" — أي كلمة ألمانية تقصد؟`,
      answer: w.de,
      options: [w.de, ...pickWrong(allWords, w, "de")]
    });
  }
  return shuffle(qs).slice(0, 10);
}

export default function Exam({ levelIdx, onBack }) {
  const level = LEVELS[levelIdx];
  const words = useMemo(() => getLevelWords(levelIdx), [levelIdx]);
  const questions = useMemo(() => buildQuestions(words, levelIdx), [words, levelIdx]);
  const [qIndex, setQIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastChosen, setLastChosen] = useState(null);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const toast = useToast();

  const q = questions[qIndex];

  useEffect(() => {
    setAnswered(false);
    setLastChosen(null);
  }, [qIndex]);

  useEffect(() => {
    if (!q) return;
    const t = setTimeout(() => {
      if (q.type === "de2ar") {
        const deWord = q.prompt.match(/"([^"]+)"/)?.[1];
        if (deWord) speakGerman(deWord);
      } else if (q.type === "pron") {
        speakGerman(q.answer);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [q]);

  if (finished) {
    return (
      <Result
        score={finalScore}
        pass={finalScore >= 70}
        levelCode={level.code}
        levelName={level.name}
        onBack={onBack}
        onRetry={() => { setQIndex(0); setCorrect(0); setFinished(false); }}
      />
    );
  }

  const answer = (val) => {
    if (answered) return;
    setAnswered(true);
    setLastChosen(val);
    const isCorrect = val === q.answer;
    if (isCorrect) setCorrect(c => c + 1);
    const runningCorrect = isCorrect ? correct + 1 : correct;
    setTimeout(() => {
      if (qIndex + 1 >= questions.length) {
        const score = Math.round((runningCorrect / questions.length) * 100);
        setFinalScore(score);
        setFinished(true);
        recordExam(level.code, score);
      } else {
        setQIndex(i => i + 1);
      }
    }, 1100);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="exam-head">
        <h2>📝 امتحان المستوى {level.name}</h2>
        <p>{level.code} · أجب عن {questions.length} أسئلة</p>
      </div>
      <div className="exam-area">
        <div className="exam-progress-track">
          {questions.map((_, i) => (
            <div key={i} className={"exam-dot" + (i < qIndex ? " done" : "")} />
          ))}
        </div>
        <div className="exam-qcard">
          <div className="exam-qlabel">
            السؤال {qIndex + 1} من {questions.length} ·{" "}
            {q.type === "de2ar" ? "ترجمة إلى العربية" : q.type === "ar2de" ? "ترجمة إلى الألمانية" : "معنى النطق"}
          </div>
          <div className="exam-question" dangerouslySetInnerHTML={{ __html: q.prompt }} />
          <div className="exam-options">
            {q.options.map((o, i) => {
              let cls = "exam-option";
              if (answered) {
                if (o === q.answer) cls += " correct";
                else if (o === lastChosen) cls += " wrong";
              }
              return (
                <button key={i} className={cls} disabled={answered} onClick={() => answer(o)}>
                  <span className="eo-letter">{["أ", "ب", "ج", "د"][i]}</span>
                  <span>{o}</span>
                </button>
              );
            })}
          </div>
          <div className={"exam-answer show " + (answered ? (lastChosen === q.answer ? "good" : "bad") : "")}>
            {answered && (lastChosen === q.answer ? "✅ إجابة صحيحة!" : `❌ الإجابة الصحيحة: ${q.answer}`)}
          </div>
        </div>
      </div>
    </>
  );
}
