import { useState, useEffect, useRef } from "react";
import { LESEN } from "../osdData.js";

export default function LesenExam({ level, onBack, onComplete }) {
  const data = LESEN[level];
  const [teil, setTeil] = useState(1);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setTimer(0);
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [teil, currentQ]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const getTeilQuestionCount = (teilNum) => {
    const t = data[`teil${teilNum}`];
    if (!t) return 0;
    if (teilNum === 1) return t.items?.length || 0;
    if (teilNum === 2) return t.passages?.length || 0;
    if (teilNum === 3) return t.items?.length || 0;
    if (teilNum === 4) return t.items?.length || 0;
    return 0;
  };

  const handleAnswer = (teilNum, qIdx, answer) => {
    setAnswers(prev => ({ ...prev, [`${teilNum}-${qIdx}`]: answer }));
  };

  const goToNext = () => {
    const maxQ = getTeilQuestionCount(teil);
    if (currentQ < maxQ - 1) {
      setCurrentQ(c => c + 1);
    } else if (teil < 4) {
      setTeil(t => t + 1);
      setCurrentQ(0);
    } else {
      const totalScore = calculateScore();
      onComplete(totalScore);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    [1, 2, 3, 4].forEach(t => {
      const tData = data[`teil${t}`];
      if (!tData) return;

      if (t === 1 && tData.items) {
        tData.items.forEach((item, i) => {
          total += 1;
          if (answers[`1-${i}`] === item.correct) correct += 1;
        });
      }
      if (t === 2 && tData.passages) {
        tData.passages.forEach((passage, i) => {
          total += passage.answers?.length || 0;
          const userAnswers = answers[`2-${i}`] || {};
          passage.answers?.forEach((ans, j) => {
            if (userAnswers[j]?.toLowerCase().trim() === ans.toLowerCase().trim()) correct += 1;
          });
        });
      }
      if (t === 3 && tData.items) {
        tData.items.forEach((item, i) => {
          total += 1;
          if (answers[`3-${i}`] === item.correct) correct += 1;
        });
      }
      if (t === 4 && tData.items) {
        tData.items.forEach((item, i) => {
          total += 1;
          if (answers[`4-${i}`] === item.correct) correct += 1;
        });
      }
    });

    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  if (!data) {
    return <div className="osd-empty">لا يوجد بيانات لهذا المستوى</div>;
  }

  const renderTeil1 = () => {
    const item = data.teil1?.items?.[currentQ];
    if (!item) return null;
    return (
      <div className="osd-question">
        <div className="osd-text-block">
          <div className="text-de">{item.text}</div>
          <div className="text-ar">{item.textAr}</div>
        </div>
        <div className="osd-options">
          {item.options.map((opt, i) => (
            <button
              key={i}
              className={`osd-option ${answers[`1-${currentQ}`] === i ? "selected" : ""}`}
              onClick={() => handleAnswer(1, currentQ, i)}
            >
              <span className="option-label">{["أ", "ب", "ج", "د"][i]}</span>
              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTeil2 = () => {
    const passage = data.teil2?.passages?.[currentQ];
    if (!passage) return null;
    const userAnswers = answers[`2-${currentQ}`] || {};

    return (
      <div className="osd-question">
        <div className="osd-luecke-text">
          {passage.text.split("_____").map((part, i) => (
            <span key={i}>
              {part}
              {i < (passage.answers?.length || 0) && (
                <input
                  type="text"
                  className="luecke-input"
                  value={userAnswers[i] || ""}
                  onChange={e => {
                    const newAnswers = { ...userAnswers, [i]: e.target.value };
                    handleAnswer(2, currentQ, newAnswers);
                  }}
                  placeholder={`...${i + 1}`}
                />
              )}
            </span>
          ))}
        </div>
        <div className="word-bank">
          <strong>الكلمات المتاحة:</strong>
          <div className="word-chips">
            {passage.wordBank?.map((word, i) => (
              <span key={i} className="word-chip" onClick={() => {
                const emptyIdx = passage.answers.findIndex((_, j) => !userAnswers[j]);
                if (emptyIdx !== -1) {
                  handleAnswer(2, currentQ, { ...userAnswers, [emptyIdx]: word });
                }
              }}>{word}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTeil3 = () => {
    const item = data.teil3?.items?.[currentQ];
    if (!item) return null;
    return (
      <div className="osd-question">
        <div className="osd-text-block">
          <div className="text-de">{item.text}</div>
          <div className="text-ar">{item.ar}</div>
        </div>
        <div className="osd-question-text">{item.question}</div>
        <div className="osd-question-ar">{item.questionAr}</div>
        <div className="osd-options">
          {item.options.map((opt, i) => (
            <button
              key={i}
              className={`osd-option ${answers[`3-${currentQ}`] === i ? "selected" : ""}`}
              onClick={() => handleAnswer(3, currentQ, i)}
            >
              <span className="option-label">{["أ", "ب", "ج", "د"][i]}</span>
              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTeil4 = () => {
    const item = data.teil4?.items?.[currentQ];
    if (!item) return null;
    return (
      <div className="osd-question">
        <div className="osd-text-block">
          <div className="text-de">{item.text}</div>
          <div className="text-ar">{item.ar}</div>
        </div>
        <div className="osd-question-text">{item.question}</div>
        <div className="osd-question-ar">{item.questionAr}</div>
        <div className="osd-options">
          {item.options.map((opt, i) => (
            <button
              key={i}
              className={`osd-option ${answers[`4-${currentQ}`] === i ? "selected" : ""}`}
              onClick={() => handleAnswer(4, currentQ, i)}
            >
              <span className="option-label">{["أ", "ب", "ج", "د"][i]}</span>
              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="osd-exam lesen">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="osd-exam-header">
        <h2>📖 Lesen — القراءة</h2>
        <div className="osd-level-badge">{level}</div>
      </div>

      <div className="osd-progress-bar">
        <div className="progress-dots">
          {[1, 2, 3, 4].map(t => (
            <div key={t} className={`dot ${t === teil ? "active" : t < teil ? "done" : ""}`}>
              Teil {t}
            </div>
          ))}
        </div>
        <div className="timer-display">⏱ {formatTime(timer)}</div>
      </div>

      <div className="osd-teil-header">
        <h3>{data[`teil${teil}`]?.title}</h3>
        <p className="teil-instruction">{data[`teil${teil}`]?.instructionAr}</p>
        {data[`teil${teil}`]?.timeLimit && (
          <p className="teil-time">⏰ الوقت المحدد: {Math.floor(data[`teil${teil}`].timeLimit / 60)} دقائق</p>
        )}
      </div>

      <div className="osd-content">
        {teil === 1 && renderTeil1()}
        {teil === 2 && renderTeil2()}
        {teil === 3 && renderTeil3()}
        {teil === 4 && renderTeil4()}
      </div>

      <div className="osd-nav-buttons">
        <button className="btn-next" onClick={goToNext}>
          {teil === 4 && currentQ === getTeilQuestionCount(teil) - 1 ? "إنهاء الاختبار" : "السؤال التالي →"}
        </button>
      </div>
    </div>
  );
}
