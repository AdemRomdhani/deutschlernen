import { useState, useRef, useEffect } from "react";
import { LEVELS, shuffle } from "../data.js";

export default function PronunciationCoach({ levelIdx, onBack, onComplete }) {
  const level = LEVELS[levelIdx]?.code || "A1";
  const [words] = useState(() => {
    const levelWords = LEVELS.slice(0, levelIdx + 1).flatMap(l => l.lessons.flatMap(ls => ls.words));
    return shuffle(levelWords).slice(0, 10);
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [similarity, setSimilarity] = useState(0);
  const recognitionRef = useRef(null);

  const current = words[currentQ];
  const total = words.length;

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE";
      u.rate = 0.7;
      window.speechSynthesis.speak(u);
    }
  };

  const levenshtein = (a, b) => {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[m][n];
  };

  const calculateSimilarity = (a, b) => {
    const norm = (s) => s.toLowerCase().replace(/[.,!?]/g, "").trim();
    const na = norm(a), nb = norm(b);
    if (na === nb) return 100;
    const maxLen = Math.max(na.length, nb.length);
    if (maxLen === 0) return 0;
    const dist = levenshtein(na, nb);
    return Math.round(((maxLen - dist) / maxLen) * 100);
  };

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("المتصفح لا يدعم التعرف على الصوت");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "de-DE";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      const sim = calculateSimilarity(current.de, text);
      setSimilarity(sim);
      setShowResult(true);
      if (sim >= 80) setScore(s => s + 20);
      else if (sim >= 60) setScore(s => s + 15);
      else if (sim >= 40) setScore(s => s + 10);
      else setScore(s => s + 5);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setTranscript("تعذر التعرف على الصوت");
      setSimilarity(0);
      setShowResult(true);
    };

    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setTranscript("");
    setShowResult(false);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const nextQuestion = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setTranscript("");
      setShowResult(false);
      setSimilarity(0);
    } else {
      const finalScore = Math.round((score / (total * 20)) * 100);
      onComplete(Math.min(finalScore, 100));
    }
  };

  const getScoreColor = (sim) => {
    if (sim >= 80) return "#10b981";
    if (sim >= 60) return "#f59e0b";
    if (sim >= 40) return "#f97316";
    return "#ef4444";
  };

  const getScoreLabel = (sim) => {
    if (sim >= 80) return "ممتاز! 🎉";
    if (sim >= 60) return "جيد! 👍";
    if (sim >= 40) return "مقبول 😊";
    return "حاول مرة أخرى 💪";
  };

  return (
    <div className="pronunciation-coach">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="pron-header">
        <h2>🎤 Pronunciation Coach — مدرب النطق</h2>
        <div className="pron-level">{level}</div>
      </div>

      <div className="pron-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
        </div>
        <span>{currentQ + 1}/{total}</span>
      </div>

      <div className="pron-stats">
        <span className="stat">✅ {score} نقطة</span>
      </div>

      <div className="pron-content">
        <div className="pron-word-card">
          <div className="word-de">{current.de}</div>
          <div className="word-pron">{current.pron}</div>
          <div className="word-ar">{current.ar}</div>
          <button className="btn-listen" onClick={() => speak(current.de)}>
            🔊 استمع للنطق الصحيح
          </button>
        </div>

        <div className="pron-record-area">
          {!isRecording ? (
            <button className="btn-record-big" onClick={startRecording}>
              🎤 اضغط للتحدث
            </button>
          ) : (
            <button className="btn-record-big recording" onClick={stopRecording}>
              <span className="recording-pulse" />
              ⏹ إيقاف
            </button>
          )}
        </div>

        {showResult && (
          <div className="pron-result">
            <div className="similarity-circle" style={{ borderColor: getScoreColor(similarity) }}>
              <span className="similarity-value">{similarity}%</span>
              <span className="similarity-label">{getScoreLabel(similarity)}</span>
            </div>

            <div className="pron-comparison">
              <div className="comparison-item">
                <div className="label">النطق الصحيح:</div>
                <div className="value de">{current.de}</div>
              </div>
              <div className="comparison-item">
                <div className="label">نطقك:</div>
                <div className="value user">{transcript}</div>
              </div>
            </div>

            {similarity < 80 && (
              <div className="pron-tips">
                <div className="tip">💡 حاول التركيز على النطق: {current.pron}</div>
              </div>
            )}

            <button className="btn-next" onClick={nextQuestion}>
              {currentQ < total - 1 ? "الكلمة التالية →" : "إنهاء"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
