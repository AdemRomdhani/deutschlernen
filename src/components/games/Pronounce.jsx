import { useEffect, useRef, useState } from "react";
import { LEVELS, getLevelWords, shuffle } from "../../data.js";
import { recordGameResult } from "../../store.js";
import { useToast, useConfetti } from "../UI.jsx";
import { speakGerman } from "../../speech.js";
import { startRecognition, stopRecognition, recognitionSupported, recognitionErrorMessage } from "../../recognition.js";
import { similarity } from "../../utils.js";
import GameEnd from "./GameEnd.jsx";

const PASS_SCORE = 75;

export default function Pronounce({ levelIdx, onBack, onReplay }) {
  const level = LEVELS[levelIdx];
  const words = shuffle(getLevelWords(levelIdx));
  const rounds = words.slice(0, 6);
  const [rIndex, setRIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState(null); // {score, text}
  const [recError, setRecError] = useState(null);
  const [done, setDone] = useState(false);
  const recRef = useRef(null);
  const toast = useToast();
  const confetti = useConfetti();

  const supported = recognitionSupported();
  const w = rounds[rIndex];

  useEffect(() => {
    setFeedback(null);
    setRecError(null);
  }, [rIndex]);

  useEffect(() => {
    return () => stopRecognition(recRef.current);
  }, []);

  if (done) {
    return <GameEnd won={score >= 4} title={score >= 4 ? "🏆 فمٌ ألماني!" : "💪 قريب!"}
      msg={`${score}/${rounds.length} كلمات بنطق ممتاز`} xp={score >= 4 ? 15 : 5} onReplay={onReplay} onBack={onBack} />;
  }

  const advance = (finalScore) => {
    if (rIndex + 1 >= rounds.length) {
      setDone(true);
      const won = finalScore >= 4;
      recordGameResult({
        gameId: "pronounce", levelCode: level.code,
        metric: finalScore, isBetter: (b) => b === undefined || finalScore > b,
        won, xp: won ? 15 : 5
      });
      if (won) confetti(70);
    } else {
      setRIndex(i => i + 1);
    }
  };

  const startMic = () => {
    if (listening) return;
    setFeedback(null);
    recRef.current = startRecognition("de-DE", {
      onResult: (text) => {
        const s = similarity(text, w.de);
        const passed = s >= PASS_SCORE;
        setListening(false);
        setFeedback({ score: s, text });
        if (passed) {
          setScore(sc => sc + 1);
          toast("🎉 نطق ممتاز!");
          confetti(50);
        } else {
          toast("🔁 حاول مرة أخرى");
        }
        setTimeout(() => advance(passed ? score + 1 : score), 1400);
      },
      onError: (e) => {
        setListening(false);
        setRecError(recognitionErrorMessage(e));
      },
      onEnd: () => setListening(false)
    });
    if (recRef.current) {
      setListening(true);
      setRecError(null);
    } else {
      setRecError(prev => prev || recognitionErrorMessage("start_failed"));
    }
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="game-head">
        <h2>🎤 قلها صح</h2>
        <p>انطق الكلمة الألمانية بصوتك واحصل على تقييم فوري</p>
        <span className="game-score">الكلمة {rIndex + 1}/{rounds.length} · النتيجة {score}</span>
      </div>
      <div className="pronounce-stage" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="pron-word">
          <div className="pw-de">{w.de}</div>
          <div className="pw-pron">{w.pron}</div>
          <div className="pw-ar">{w.ar}</div>
        </div>

        {feedback && (
          <div className={"pron-feedback " + (feedback.score >= PASS_SCORE ? "great" : "meh")}>
            <div className="pf-num">{feedback.score}%</div>
            <div className="pf-text">
              {feedback.score >= PASS_SCORE ? "ممتاز! نطقك رائع 🎉"
                : feedback.score >= 50 ? "جيد جداً، اقترب من الإتقان 👍"
                : "استمع للنموذج وحاول من جديد 🔁"}
            </div>
            <div className="pf-heard">سُمع: <span className="ltr">{feedback.text}</span></div>
          </div>
        )}

        {recError && <div className="speak-error">{recError}</div>}

        <div className="pron-actions">
          <button className="speak-btn big" onClick={() => speakGerman(w.de)}>
            <span className="spk-icon">🔊</span> استمع للنموذج
          </button>
          <button
            className={"btn " + (listening ? "btn-ghost" : "btn-primary") + " big"}
            onClick={startMic}
            disabled={listening || !supported}
          >
            {listening ? "🎙️ جارٍ الاستماع..." : "🎤 ابدأ النطق"}
          </button>
        </div>
        {!supported && <div className="speak-error">متصفحك لا يدعم التعرف على الصوت — استخدم متصفح Chrome أو Edge</div>}
        {listening && <div className="speak-pulse"><span></span><span></span><span></span></div>}
      </div>
    </>
  );
}
