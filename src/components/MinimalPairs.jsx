import { useState, useEffect } from "react";
import { speakGerman, stopSpeaking } from "../speech.js";

const PAIRS = [
  { word1: { de: "Bett", ar: "سرير" }, word2: { de: "Pet", ar: "حيوان أليف" }, spoken: 0 },
  { word1: { de: "Miete", ar: "إيجار" }, word2: { de: "Mitte", ar: "وسط" }, spoken: 1 },
  { word1: { de: "Karte", ar: "بطاقة" }, word2: { de: "Katte", ar: "قطة" }, spoken: 0 },
  { word1: { de: "Tier", ar: "حيوان" }, word2: { de: "Teer", ar: "قار" }, spoken: 1 },
  { word1: { de: "Stock", ar: "عصا" }, word2: { de: "Stuck", ar: "قطعة" }, spoken: 0 },
  { word1: { de: "Kirche", ar: "كنيسة" }, word2: { de: "Kirsche", ar: "كرز" }, spoken: 1 },
  { word1: { de: "Rat", ar: "نصيحة" }, word2: { de: "Rad", ar: "عجلة" }, spoken: 0 },
  { word1: { de: "Mund", ar: "فم" }, word2: { de: "Mut", ar: "شجاعة" }, spoken: 1 },
  { word1: { de: "Kuh", ar: "بقرة" }, word2: { de: "Kur", ar: "علاج" }, spoken: 0 },
  { word1: { de: "Haut", ar: "جلد" }, word2: { de: "Hut", ar: "قبعة" }, spoken: 1 },
  { word1: { de: "lange", ar: "طويل" }, word2: { de: "Lunge", ar: "رئة" }, spoken: 0 },
  { word1: { de: "bieten", ar: "يعرض" }, word2: { de: "beten", ar: "يصلي" }, spoken: 1 },
  { word1: { de: "Wein", ar: "نبيذ" }, word2: { de: "weinen", ar: "يبكي" }, spoken: 0 },
  { word1: { de: "Reis", ar: "أرز" }, word2: { de: "reisen", ar: "يسافر" }, spoken: 1 },
  { word1: { de: "Ziege", ar: "ماعز" }, word2: { de: "Säge", ar: "منشار" }, spoken: 0 },
  { word1: { de: "Bogen", ar: "قوس" }, word2: { de: "Wogen", ar: "أمواج" }, spoken: 1 },
  { word1: { de: "Kamm", ar: "مشط" }, word2: { de: "Kamm", ar: "وادي" }, spoken: 0 },
  { word1: { de: "Leere", ar: "فراغ" }, word2: { de: "Lehre", ar: " Teaching" }, spoken: 1 },
  { word1: { de: "Bahn", ar: "خط سكة حديد" }, word2: { de: "Bahne", ar: "يخرز" }, spoken: 0 },
  { word1: { de: "Schaf", ar: "خروف" }, word2: { de: "schaff", ar: "يحقق" }, spoken: 1 },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MinimalPairs({ levelIdx, onBack, onComplete }) {
  const [rounds] = useState(() => shuffle(PAIRS).slice(0, 8));
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const pair = rounds[currentQ];
  const total = rounds.length;

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const speak = (text) => {
    stopSpeaking();
    speakGerman(text, {
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
  };

  useEffect(() => {
    if (pair && !answered) {
      const spokenWord = pair.spoken === 0 ? pair.word1.de : pair.word2.de;
      setTimeout(() => speak(spokenWord), 400);
    }
  }, [currentQ, answered]);

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    const correct = pair.spoken === idx;
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) setScore(s => s + 12);
  };

  const nextQuestion = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setAnswered(false);
      setSelected(null);
      setIsCorrect(false);
    } else {
      const finalScore = Math.round((score / (total * 12)) * 100);
      onComplete(Math.min(finalScore, 100));
    }
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>

      <div className="game-head">
        <h2>👂 الأزواج المتشابهة — Minimal Pairs</h2>
        <p>استمع للكلمة واختر الكلمة التي سمعتها</p>
        <div className="game-score">
          <span>✅ {score} نقطة</span>
          <span>|</span>
          <span>{currentQ + 1}/{total}</span>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="tf-card" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 8 }}>
            اضغط للاستماع ثم اختر الكلمة الصحيحة
          </div>
          <button
            className="speak-btn"
            style={{ fontSize: 18, padding: "12px 24px", marginBottom: 16 }}
            onClick={() => speak(pair.spoken === 0 ? pair.word1.de : pair.word2.de)}
            disabled={isPlaying}
          >
            {isPlaying ? "⏳ جاري التشغيل..." : "🔊 استمع مرة أخرى"}
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[pair.word1, pair.word2].map((w, idx) => (
              <button
                key={idx}
                className={`tf-btn ${selected === idx ? (idx === pair.spoken ? "correct" : "wrong") : ""}`}
                onClick={() => handleAnswer(idx)}
                disabled={answered}
                style={{ textAlign: "center" }}
              >
                <div style={{ fontFamily: "var(--font-la)", fontWeight: 800, fontSize: 28, direction: "ltr" }}>
                  {w.de}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-soft)", marginTop: 4 }}>{w.ar}</div>
              </button>
            ))}
          </div>
        </div>

        {answered && (
          <div className={`dialogue-feedback ${isCorrect ? "good" : "bad"}`} style={{ textAlign: "center", marginBottom: 16 }}>
            {isCorrect ? "✅ ممتاز! كلمة صحيحة" : "❌ ليست هذه الكلمة"}
            {!isCorrect && (
              <div style={{ marginTop: 8, fontSize: 14 }}>
                الكلمة الصحيحة كانت: <strong style={{ direction: "ltr" }}>{pair.spoken === 0 ? pair.word1.de : pair.word2.de}</strong>
              </div>
            )}
          </div>
        )}

        {answered && (
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary" onClick={nextQuestion}>
              {currentQ < total - 1 ? "السؤال التالي →" : "إنهاء"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
