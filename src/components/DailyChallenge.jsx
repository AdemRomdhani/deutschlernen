import { useState, useEffect } from "react";
import { LEVELS, shuffle } from "../data.js";

function getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateDailyChallenge(levelCode) {
  const seed = getDailySeed() + levelCode.charCodeAt(0);
  const rng = seededRandom(seed);

  const allWords = LEVELS.flatMap(l => l.lessons.flatMap(ls => ls.words));
  const levelIdx = LEVELS.findIndex(l => l.code === levelCode);
  const levelWords = levelIdx >= 0
    ? LEVELS.slice(0, levelIdx + 1).flatMap(l => l.lessons.flatMap(ls => ls.words))
    : allWords;

  const questions = [];
  const used = new Set();

  for (let i = 0; i < 5; i++) {
    let word;
    do { word = levelWords[Math.floor(rng() * levelWords.length)]; } while (used.has(word.de));
    used.add(word.de);

    const type = i % 3;
    if (type === 0) {
      const wrong = allWords.filter(w => w.ar !== word.ar && !used.has(w.ar)).slice(0, 3);
      const opts = shuffle([word, ...wrong]).map(w => w.ar);
      questions.push({
        type: "de2ar",
        question: word.de,
        questionAr: "ما معنى هذه الكلمة؟",
        options: opts,
        correct: opts.indexOf(word.ar),
        word
      });
    } else if (type === 1) {
      const wrong = allWords.filter(w => w.de !== word.de && !used.has(w.de)).slice(0, 3);
      const opts = shuffle([word, ...wrong]).map(w => w.de);
      questions.push({
        type: "ar2de",
        question: word.ar,
        questionAr: "ما ترجمة هذه الكلمة بالألمانية؟",
        options: opts,
        correct: opts.indexOf(word.de),
        word
      });
    } else {
      const wrong = allWords.filter(w => w.de !== word.de).slice(0, 3);
      const opts = shuffle([word, ...wrong]).map(w => w.pron);
      questions.push({
        type: "pron",
        question: word.pron,
        questionAr: "ما الكلمة التي تنطق هكذا؟",
        options: opts.map((_, i) => [word, ...wrong][i]?.de || ""),
        correct: 0,
        word
      });
    }
  }

  return questions;
}

export default function DailyChallenge({ levelIdx, onBack, onComplete }) {
  const level = LEVELS[levelIdx]?.code || "A1";
  const [questions] = useState(() => generateDailyChallenge(level));
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const current = questions[currentQ];
  const total = questions.length;
  const today = new Date().toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  useEffect(() => {
    const lastDaily = localStorage.getItem(`daily_${level}`);
    if (lastDaily) {
      const last = JSON.parse(lastDaily);
      if (last.date === getDailySeed().toString()) {
        setScore(last.score);
        setIsCompleted(true);
      }
    }
  }, []);

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const correct = idx === current.correct;
    setAnswers(a => [...a, { correct, question: current }]);
    if (correct) setScore(s => s + 20);
  };

  const nextQuestion = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const finalScore = Math.round((score / (total * 20)) * 100);
      localStorage.setItem(`daily_${level}`, JSON.stringify({
        date: getDailySeed().toString(),
        score: finalScore
      }));
      setIsCompleted(true);
      onComplete(finalScore);
    }
  };

  const correctCount = answers.filter(a => a.correct).length;

  if (isCompleted && currentQ >= total) {
    return (
      <div className="daily-complete">
        <button className="btn-back" onClick={onBack}>← رجوع</button>
        <div className="complete-card">
          <div className="complete-icon">{score >= 80 ? "🏆" : score >= 50 ? "⭐" : "💪"}</div>
          <h2>تحدي اليوم مكتمل!</h2>
          <div className="complete-date">{today}</div>
          <div className="complete-score">{score}%</div>
          <div className="complete-details">
            <span>✅ {correctCount}/{total} صحيح</span>
            <span>📊 المستوى: {level}</span>
          </div>
          <div className="complete-message">
            {score >= 80 ? "ممتاز! أنت على الطريق الصحيح!" : score >= 50 ? "جيد! واصل التقدم!" : "حاول مرة أخرى غداً!"}
          </div>
          <button className="btn-back-home" onClick={onBack}>🏠 رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-challenge">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="daily-header">
        <h2>📅 تحدي اليوم</h2>
        <div className="daily-date">{today}</div>
        <div className="daily-level">{level}</div>
      </div>

      <div className="daily-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
        </div>
        <span>{currentQ + 1}/{total}</span>
      </div>

      <div className="daily-content">
        <div className="daily-question">
          <div className="question-type">
            {current.type === "de2ar" ? "🇩🇪 → 🇸🇦" : current.type === "ar2de" ? "🇸🇦 → 🇩🇪" : "🔊 → 🇩🇪"}
          </div>
          <div className="question-text">{current.question}</div>
          <div className="question-ar">{current.questionAr}</div>
        </div>

        <div className="daily-options">
          {current.options.map((opt, i) => (
            <button
              key={i}
              className={`daily-option ${
                showResult
                  ? i === current.correct
                    ? "correct"
                    : i === selected
                    ? "wrong"
                    : ""
                  : ""
              }`}
              onClick={() => handleSelect(i)}
              disabled={showResult}
            >
              <span className="option-letter">{["أ", "ب", "ج", "د"][i]}</span>
              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`daily-result ${selected === current.correct ? "correct" : "wrong"}`}>
            <div className="result-icon">{selected === current.correct ? "✅" : "❌"}</div>
            {!selected === current.correct && (
              <div className="correct-answer">
                الإجابة: {current.options[current.correct]}
              </div>
            )}
            <button className="btn-next" onClick={nextQuestion}>
              {currentQ < total - 1 ? "السؤال التالي →" : "إنهاء"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
