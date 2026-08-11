import { useEffect, useRef, useState } from "react";
import { LEVELS } from "../data.js";
import { completeLesson, levelProgress, getProgress, recordWrongWord } from "../store.js";
import { speakGerman } from "../speech.js";
import { startListening, stopRecognition, recognitionErrorMessage } from "../recognition.js";
import { similarity } from "../utils.js";
import { useToast, useConfetti } from "./UI.jsx";

const MODES = [
  { id: "flash", icon: "🃏", label: "بطاقات" },
  { id: "type", icon: "⌨️", label: "اكتبها" },
  { id: "speak", icon: "🎤", label: "انطقها" }
];

export default function Lesson({ levelIdx, lessonIdx, onBack }) {
  const level = LEVELS[levelIdx];
  const lesson = level.lessons[lessonIdx];
  const [mode, setMode] = useState("flash");
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const toast = useToast();
  const confetti = useConfetti();

  const goTo = (i) => { setIndex(i); };

  const finish = () => {
    const firstTime = completeLesson(levelIdx, lessonIdx);
    const { pct } = levelProgress(getProgress(), levelIdx);
    setFinished(true);
    confetti();
    if (firstTime) toast("🎉 أكملت الدرس! +20 XP");
  };

  if (finished) {
    return (
      <>
        <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
        <div className="lesson-head">
          <h2>🎉 أحسنت!</h2>
          <p>أكملت درس «{lesson.title}» بنجاح</p>
        </div>
        <div style={{ textAlign: "center", padding: 20 }}>
          <div style={{ fontSize: 64, marginBottom: 10 }}>🌟</div>
          <p style={{ color: "var(--text-soft)", marginBottom: 16 }}>واصل التقدم نحو المستوى التالي!</p>
          <button className="btn btn-primary" onClick={onBack}>العودة للمستوى</button>
        </div>
      </>
    );
  }

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للمستوى</button>
      <div className="lesson-head">
        <h2>{lesson.icon} {lesson.title}</h2>
        <p>اختر أسلوب التعلم الذي يناسبك</p>
      </div>

      <div className="mode-switch">
        {MODES.map(m => (
          <button
            key={m.id}
            className={"mode-btn" + (mode === m.id ? " active" : "")}
            onClick={() => setMode(m.id)}
          >
            <span className="mb-icon">{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>

      <div className="flashcard-arena" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="flashcard-progress">{index + 1} / {lesson.words.length}</div>
        {mode === "flash" && <FlashMode word={lesson.words[index]} />}
        {mode === "type" && <TypeMode key={index} word={lesson.words[index]} levelCode={level.code} />}
        {mode === "speak" && <SpeakMode word={lesson.words[index]} />}
      </div>

      <div className="lesson-nav">
        <button className="nav-arrow" disabled={index === 0} onClick={() => goTo(index - 1)}>→</button>
        <button
          className={"btn " + (index === lesson.words.length - 1 ? "btn-primary" : "btn-ghost")}
          onClick={() => (index === lesson.words.length - 1 ? finish() : goTo(index + 1))}
        >
          {index === lesson.words.length - 1 ? "✓ إنهاء الدرس" : "التالي"}
        </button>
        <button className="nav-arrow" disabled={index === lesson.words.length - 1} onClick={() => goTo(index + 1)}>←</button>
      </div>
    </>
  );
}

/* ---------------- Flash mode (passive) ---------------- */

function FlashMode({ word }) {
  const [flipped, setFlipped] = useState(false);
  const toast = useToast();
  return (
    <div className={"flashcard" + (flipped ? " flipped" : "")} onClick={() => setFlipped(f => !f)}>
      <div className="flashcard-face flashcard-front">
        <div className="fc-de">{word.de}</div>
        <div className="fc-pron">{word.pron}</div>
        <div className="fc-actions">
          <span
            className="speak-btn"
            role="button"
            onClick={(e) => { e.stopPropagation(); if (!speakGerman(word.de)) toast("🎧 تعذر تشغيل الصوت"); }}
          >
            <span className="spk-icon">🔊</span> استمع
          </span>
        </div>
      </div>
      <div className="flashcard-face flashcard-back">
        <div className="fc-ar">{word.ar}</div>
        <div className="fc-hint">اضغط لإعادة القلب</div>
      </div>
    </div>
  );
}

/* ---------------- Type mode (active recall) ---------------- */

function TypeMode({ word, levelCode }) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState(null); // null | ok | bad
  const [revealed, setRevealed] = useState(false);
  const toast = useToast();
  const inputRef = useRef(null);

  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

  const check = () => {
    if (feedback) return;
    if (!value.trim()) { toast("⌨️ اكتب الكلمة أولاً"); return; }
    const ok = similarity(value, word.de) >= 90;
    setFeedback(ok ? "ok" : "bad");
    if (!ok) recordWrongWord(levelCode, word);
    if (ok) toast("✅ ممتاز!");
  };

  const isWrong = feedback === "bad" || (feedback === "ok" && revealed);

  return (
    <div className="type-stage">
      <div className="type-prompt">
        <div className="tp-ar">{word.ar}</div>
        <div className="tp-pron">{word.pron}</div>
        <button className="speak-btn" onClick={() => speakGerman(word.de)}>
          <span className="spk-icon">🔊</span> استمع
        </button>
      </div>

      {feedback === "bad" && (
        <div className="type-answer bad">الإجابة الصحيحة: <span className="ltr">{word.de}</span></div>
      )}

      <input
        ref={inputRef}
        className={"type-input" + (feedback === "ok" ? " ok" : feedback === "bad" ? " bad" : "")}
        dir="ltr"
        placeholder="اكتب الكلمة بالألمانية..."
        value={value}
        disabled={feedback !== null}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") check(); }}
        style={{ fontFamily: "var(--font-la)" }}
      />

      {!feedback && (
        <div className="type-actions">
          <button className="btn btn-ghost" onClick={() => { setRevealed(true); setFeedback("bad"); recordWrongWord(levelCode, word); }}>
            أظهر الحل
          </button>
          <button className="btn btn-primary" onClick={check}>✓ تحقق</button>
        </div>
      )}
      {feedback === "ok" && <div className="type-actions"><span className="type-note">✅ صحيح! انتقل للكلمة التالية</span></div>}
    </div>
  );
}

/* ---------------- Speak mode (pronunciation checker) ---------------- */

function SpeakMode({ word }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(null);
  const [localMode, setLocalMode] = useState(false);
  const [blob, setBlob] = useState(null);
  const [error, setError] = useState(null);
  const recRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    setTranscript("");
    setScore(null);
    setError(null);
    setBlob(null);
  }, [word.de]);

  useEffect(() => {
    return () => stopRecognition(recRef.current);
  }, []);

  const startMic = () => {
    if (listening) return;
    setTranscript("");
    setScore(null);
    setBlob(null);
    setError(null);
    recRef.current = startListening("de-DE", {
      onMode: (m) => setLocalMode(m === "local"),
      onResult: (text, info) => {
        if (info && info.score !== undefined) {
          setTranscript("");
          setScore(info.score);
          setBlob(info.blob || null);
          scoreToast(info.score);
        } else {
          const s = similarity(text, word.de);
          setTranscript(text);
          setScore(s);
          scoreToast(s);
        }
      },
      onError: (e) => {
        setListening(false);
        setError(recognitionErrorMessage(e));
      },
      onEnd: () => setListening(false)
    });
    if (recRef.current) {
      setListening(true);
    } else {
      setError(prev => prev || recognitionErrorMessage("start_failed"));
    }
  };

  const scoreToast = (s) => {
    if (s >= 80) toast("🎉 نطق ممتاز!");
    else if (s >= 50) toast("👍 جيد، لكن حاول تحسينه");
    else toast("🔁 حاول مرة أخرى");
  };

  const scoreMsg = score === null ? "" : localMode
    ? "تم التقاط صوتك ✅ — قارن نطقك بالنموذج ثم استمع لنفسك"
    : score >= 80 ? "ممتاز! نطقك رائع 🎉"
    : score >= 50 ? "جيد جداً، اقتربت من الإتقان 👍"
    : "حاول أن تستمع ثم تنطق من جديد 🔁";

  const playBack = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    audio.play().catch(() => toast("🎧 تعذر تشغيل التسجيل"));
  };

  return (
    <div className="speak-stage">
      <div className="speak-word">
        <div className="sw-de">{word.de}</div>
        <div className="sw-pron">{word.pron}</div>
      </div>

      {localMode && !error && score === null && (
        <div className="speak-note">
          وضع بدون إنترنت: لا تتوفر خدمة التعرف على الصوت هنا، لذلك سنلتقط صوتك ونسجّله لتقارن نطقك بالنموذج.
        </div>
      )}

      {score !== null && (
        <div className={"speak-score " + (score >= 80 ? "great" : score >= 50 ? "good" : "meh")}>
          <div className="ss-num">{score}%</div>
          <div className="ss-msg">{scoreMsg}</div>
          {transcript && <div className="ss-transcript">سُمع: <span className="ltr">{transcript}</span></div>}
        </div>
      )}

      {blob && (
        <button className="speak-btn big playback-btn" onClick={playBack}>
          <span className="spk-icon">▶️</span> استمع إلى صوتك
        </button>
      )}

      {error && <div className="speak-error">{error}</div>}

      <div className="speak-actions">
        <button className="speak-btn big" onClick={() => speakGerman(word.de)}>
          <span className="spk-icon">🔊</span> استمع للنموذج
        </button>
        <button className="btn btn-primary big" onClick={startMic} disabled={listening}>
          {listening ? "🎙️ جارٍ الاستماع..." : "🎤 انطق الكلمة"}
        </button>
      </div>

      {listening && <div className="speak-pulse"><span></span><span></span><span></span></div>}
    </div>
  );
}
