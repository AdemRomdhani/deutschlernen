import { useState, useEffect, useRef } from "react";
import { SCHREIBEN } from "../osdData.js";

export default function SchreibenExam({ level, onBack, onComplete }) {
  const data = SCHREIBEN[level];
  const [teil, setTeil] = useState(1);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setTimer(0);
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [teil, currentQ]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const getTeilTaskCount = (teilNum) => {
    const t = data[`teil${teilNum}`];
    if (!t) return 0;
    return t.tasks?.length || 0;
  };

  const handleAnswer = (teilNum, qIdx, answer) => {
    setAnswers(prev => ({ ...prev, [`${teilNum}-${qIdx}`]: answer }));
  };

  const goToNext = () => {
    const maxQ = getTeilTaskCount(teil);
    if (currentQ < maxQ - 1) {
      setCurrentQ(c => c + 1);
      setShowTemplate(false);
      setShowModel(false);
    } else if (teil < 3) {
      setTeil(t => t + 1);
      setCurrentQ(0);
      setShowTemplate(false);
      setShowModel(false);
    } else {
      const totalScore = calculateScore();
      onComplete(totalScore);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let count = 0;

    [1, 2, 3].forEach(t => {
      const tData = data[`teil${t}`];
      if (!tData?.tasks) return;

      tData.tasks.forEach((task, i) => {
        const userText = answers[`${t}-${i}`] || "";
        const wordCount = userText.trim().split(/\s+/).filter(w => w.length > 0).length;

        // Score based on word count and structure
        let score = 0;

        // Word count check
        const targetWords = parseInt(task.wordCount?.split("-")[1] || "50");
        if (wordCount >= targetWords * 0.6) score += 30;
        if (wordCount >= targetWords) score += 20;

        // Structure check
        if (userText.includes(",") || userText.includes(".")) score += 10;

        // Content check (basic keyword matching)
        const modelWords = task.modelAnswer?.toLowerCase().split(/\s+/) || [];
        const userWords = userText.toLowerCase().split(/\s+/);
        const overlap = userWords.filter(w => modelWords.includes(w) && w.length > 3).length;
        score += Math.min(overlap * 5, 40);

        totalScore += Math.min(score, 100);
        count += 1;
      });
    });

    return count > 0 ? Math.round(totalScore / count) : 0;
  };

  const getWordCount = (teilNum, qIdx) => {
    const text = answers[`${teilNum}-${qIdx}`] || "";
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  if (!data) {
    return <div className="osd-empty">لا يوجد بيانات لهذا المستوى</div>;
  }

  const renderTask = () => {
    const tData = data[`teil${teil}`];
    const task = tData?.tasks?.[currentQ];
    if (!task) return null;

    const wordCount = getWordCount(teil, currentQ);
    const targetRange = task.wordCount || "50-100";

    return (
      <div className="osd-question">
        <div className="osd-prompt-de">{task.prompt}</div>
        <div className="osd-prompt-ar">{task.promptAr}</div>

        <div className="writing-area">
          <textarea
            className="osd-textarea writing"
            value={answers[`${teil}-${currentQ}`] || ""}
            onChange={e => handleAnswer(teil, currentQ, e.target.value)}
            placeholder="اكتب إجابتك هنا..."
            rows={8}
          />
          <div className="word-count">
            <span className={wordCount >= parseInt(targetRange.split("-")[0]) ? "good" : ""}>
              {wordCount}
            </span>
            /{targetRange} كلمة
          </div>
        </div>

        <div className="writing-tools">
          <button
            className="btn-tool"
            onClick={() => setShowTemplate(!showTemplate)}
          >
            {showTemplate ? "إخفاء القالب" : "📋 عرض القالب"}
          </button>
          <button
            className="btn-tool"
            onClick={() => setShowModel(!showModel)}
          >
            {showModel ? "إخفاء النموذج" : "📝 عرض النموذج"}
          </button>
        </div>

        {showTemplate && task.template && (
          <div className="osd-template">
            <div className="template-label">القالب:</div>
            <pre className="template-text">{task.template}</pre>
          </div>
        )}

        {showModel && task.modelAnswer && (
          <div className="osd-sample-answer">
            <div className="sample-label">نموذج الإجابة:</div>
            <div className="sample-text">{task.modelAnswer}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="osd-exam schreiben">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="osd-exam-header">
        <h2>✍️ Schreiben — الكتابة</h2>
        <div className="osd-level-badge">{level}</div>
      </div>

      <div className="osd-progress-bar">
        <div className="progress-dots">
          {[1, 2, 3].map(t => (
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
        {renderTask()}
      </div>

      <div className="osd-nav-buttons">
        <button className="btn-next" onClick={goToNext}>
          {teil === 3 && currentQ === getTeilTaskCount(teil) - 1 ? "إنهاء الاختبار" : "المهمة التالية →"}
        </button>
      </div>
    </div>
  );
}
