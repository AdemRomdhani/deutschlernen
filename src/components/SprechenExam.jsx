import { useState, useEffect, useRef } from "react";
import { SPRECHEN } from "../osdData.js";

export default function SprechenExam({ level, onBack, onComplete }) {
  const data = SPRECHEN[level];
  const [teil, setTeil] = useState(1);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSample, setShowSample] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  const teilKey = `teil${teil}`;
  const teilData = data?.[teilKey];

  useEffect(() => {
    setTimer(0);
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [teil, currentQ]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("المتصفح لا يدعم التعرف على الصوت");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "de-DE";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAnswer = (teilNum, qIdx, answer) => {
    setAnswers(prev => ({ ...prev, [`${teilNum}-${qIdx}`]: answer }));
  };

  const goToNext = () => {
    const currentTeilData = data[`teil${teil}`];
    const maxQ = getTeilQuestionCount(teil);
    if (currentQ < maxQ - 1) {
      setCurrentQ(c => c + 1);
      setTranscript("");
      setShowSample(false);
    } else if (teil < 4) {
      setTeil(t => t + 1);
      setCurrentQ(0);
      setTranscript("");
      setShowSample(false);
    } else {
      const totalScore = calculateScore();
      onComplete(totalScore);
    }
  };

  const getTeilQuestionCount = (teilNum) => {
    const t = data[`teil${teilNum}`];
    if (!t) return 0;
    if (teilNum === 1) return t.topics?.length || 0;
    if (teilNum === 2) return t.topics?.length || 0;
    if (teilNum === 3) return t.dialogues?.[0]?.steps?.filter(s => s.speaker === "Sie").length || 0;
    if (teilNum === 4) return t.questions?.length || 0;
    return 0;
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    // Teil 1 & 2: score based on keyword matches
    [1, 2].forEach(t => {
      const tData = data[`teil${t}`];
      if (tData?.topics) {
        tData.topics.forEach((topic, i) => {
          total += 1;
          const userAnswer = answers[`${t}-${i}`] || "";
          const matched = topic.keywords.filter(k => userAnswer.toLowerCase().includes(k.toLowerCase()));
          if (matched.length >= 2) correct += 1;
        });
      }
    });

    // Teil 3: score based on dialogue answers
    const t3 = data.teil3;
    if (t3?.dialogues) {
      let stepIdx = 0;
      t3.dialogues[0]?.steps.forEach(step => {
        if (step.speaker === "Sie") {
          total += 1;
          const userAnswer = answers[`3-${stepIdx}`] || "";
          if (userAnswer.trim().length > 5) correct += 1;
          stepIdx++;
        }
      });
    }

    // Teil 4: score based on keyword matches
    const t4 = data.teil4;
    if (t4?.questions) {
      t4.questions.forEach((q, i) => {
        total += 1;
        const userAnswer = answers[`4-${i}`] || "";
        const matched = q.keywords.filter(k => userAnswer.toLowerCase().includes(k.toLowerCase()));
        if (matched.length >= 1) correct += 1;
      });
    }

    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  if (!data || !teilData) {
    return <div className="osd-empty">لا يوجد بيانات لهذا المستوى</div>;
  }

  const renderTeil1 = () => {
    const topic = teilData.topics?.[currentQ];
    if (!topic) return null;
    return (
      <div className="osd-question">
        <div className="osd-prompt-de">{topic.prompt}</div>
        <div className="osd-prompt-ar">{topic.promptAr}</div>
        <textarea
          className="osd-textarea"
          value={answers[`1-${currentQ}`] || ""}
          onChange={e => handleAnswer(1, currentQ, e.target.value)}
          placeholder="اكتب إجابتك هنا..."
          rows={4}
        />
        <div className="osd-recording-section">
          {!isRecording ? (
            <button className="btn-record" onClick={startRecording}>🎤 سجّل إجابتك</button>
          ) : (
            <button className="btn-record stop" onClick={stopRecording}>⏹ إيقاف التسجيل</button>
          )}
          {transcript && (
            <div className="osd-transcript">
              <strong>النص المسجّل:</strong> {transcript}
            </div>
          )}
        </div>
        <button className="btn-show-sample" onClick={() => setShowSample(!showSample)}>
          {showSample ? "إخفاء النموذج" : "عرض نموذج إجابة"}
        </button>
        {showSample && (
          <div className="osd-sample-answer">
            <div className="sample-label">نموذج الإجابة:</div>
            <div className="sample-text">{topic.sampleAnswer}</div>
            <div className="sample-tip">💡 {topic.tips}</div>
          </div>
        )}
      </div>
    );
  };

  const renderTeil2 = () => {
    const topic = teilData.topics?.[currentQ];
    if (!topic) return null;
    return (
      <div className="osd-question">
        <div className="osd-prompt-de">{topic.prompt}</div>
        <div className="osd-prompt-ar">{topic.promptAr}</div>
        <textarea
          className="osd-textarea"
          value={answers[`2-${currentQ}`] || ""}
          onChange={e => handleAnswer(2, currentQ, e.target.value)}
          placeholder="صف الصورة هنا..."
          rows={4}
        />
        <div className="osd-recording-section">
          {!isRecording ? (
            <button className="btn-record" onClick={startRecording}>🎤 سجّل وصفك</button>
          ) : (
            <button className="btn-record stop" onClick={stopRecording}>⏹ إيقاف التسجيل</button>
          )}
          {transcript && (
            <div className="osd-transcript">
              <strong>النص المسجّل:</strong> {transcript}
            </div>
          )}
        </div>
        <button className="btn-show-sample" onClick={() => setShowSample(!showSample)}>
          {showSample ? "إخفاء النموذج" : "عرض نموذج إجابة"}
        </button>
        {showSample && (
          <div className="osd-sample-answer">
            <div className="sample-label">نموذج الإجابة:</div>
            <div className="sample-text">{topic.sampleAnswer}</div>
          </div>
        )}
      </div>
    );
  };

  const renderTeil3 = () => {
    const dialogue = teilData.dialogues?.[0];
    if (!dialogue) return null;

    const sieSteps = dialogue.steps.filter(s => s.speaker === "Sie");
    const currentSieStep = sieSteps[currentQ];

    let stepIdx = 0;
    const visibleSteps = [];
    for (const step of dialogue.steps) {
      if (step.speaker === "Sie") {
        if (stepIdx === currentQ) {
          visibleSteps.push(step);
          break;
        }
        stepIdx++;
      } else {
        visibleSteps.push(step);
      }
    }

    return (
      <div className="osd-dialogue">
        <div className="dialogue-scenario">{dialogue.scenarioAr} — {dialogue.scenario}</div>
        {visibleSteps.map((step, i) => (
          <div key={i} className={`dialogue-line ${step.speaker === "Sie" ? "user" : "other"}`}>
            <div className="speaker">{step.speaker === "Sie" ? "أنت" : step.speaker}</div>
            {step.de && <div className="dialogue-de">{step.de}</div>}
            {step.ar && <div className="dialogue-ar">{step.ar}</div>}
            {step.speaker === "Sie" && (
              <>
                <div className="dialogue-prompt">{step.promptAr}</div>
                <textarea
                  className="osd-textarea"
                  value={answers[`3-${currentQ}`] || ""}
                  onChange={e => handleAnswer(3, currentQ, e.target.value)}
                  placeholder="اكتب ردك هنا..."
                  rows={3}
                />
                <button className="btn-show-sample" onClick={() => setShowSample(!showSample)}>
                  {showSample ? "إخفاء" : "عرض نموذج"}
                </button>
                {showSample && (
                  <div className="osd-sample-answer">
                    <div className="sample-text">{step.correctAnswer}</div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTeil4 = () => {
    const q = teilData.questions?.[currentQ];
    if (!q) return null;
    return (
      <div className="osd-question">
        <div className="osd-prompt-de">{q.de}</div>
        <div className="osd-prompt-ar">{q.ar}</div>
        <textarea
          className="osd-textarea"
          value={answers[`4-${currentQ}`] || ""}
          onChange={e => handleAnswer(4, currentQ, e.target.value)}
          placeholder="اكتب إجابتك هنا..."
          rows={4}
        />
        <button className="btn-show-sample" onClick={() => setShowSample(!showSample)}>
          {showSample ? "إخفاء النموذج" : "عرض نموذج إجابة"}
        </button>
        {showSample && (
          <div className="osd-sample-answer">
            <div className="sample-label">نموذج الإجابة:</div>
            <div className="sample-text">{q.sampleAnswer}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="osd-exam sprechen">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="osd-exam-header">
        <h2>🎤 Sprechen — التحدث</h2>
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
        <h3>{teilData.title}</h3>
        <p className="teil-instruction">{teilData.instructionAr}</p>
        {teilData.timeLimit && (
          <p className="teil-time">⏰ الوقت المحدد: {Math.floor(teilData.timeLimit / 60)} دقائق</p>
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
