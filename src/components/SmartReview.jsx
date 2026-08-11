import { useState } from "react";
import { getDueReviewWords, reviewWordResult, clearReviewedWords, useProgress } from "../store.js";
import { speakGerman } from "../speech.js";
import { useToast, useConfetti } from "./UI.jsx";

export default function SmartReview({ onBack }) {
  useProgress();
  const [queue, setQueue] = useState(() => getDueReviewWords());
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [failed, setFailed] = useState([]);
  const [finished, setFinished] = useState(false);
  const toast = useToast();
  const confetti = useConfetti();

  const word = queue[index];
  const total = queue.length;

  const finish = () => setFinished(true);

  const next = (correct) => {
    reviewWordResult(word.levelCode, word.de, correct);
    if (correct) {
      clearReviewedWords([word]);
      setKnown(k => k + 1);
      toast("✅ إتقان!");
      confetti(30);
    } else {
      setFailed(f => [...f, word]);
    }
    if (index + 1 >= queue.length) {
      if (failed.length === 0 && correct) {
        finish();
        return;
      }
      // re-queue failed words for another pass
      const nextFailed = [...failed, ...(correct ? [] : [word])];
      if (nextFailed.length > 0) {
        setQueue(nextFailed);
        setIndex(0);
        return;
      }
      finish();
      return;
    }
    setIndex(i => i + 1);
  };

  if (finished || queue.length === 0) {
    return (
      <>
        <button className="back-btn" onClick={onBack}>→ العودة للرئيسية</button>
        <div className="lesson-head">
          <h2>🎉 انتهت المراجعة!</h2>
          <p>
            أتقنت <b>{known}</b> كلمة
            {failed.length > 0 ? `، وأُعيدت ${failed.length} كلمة للمراجعة التالية` : ""} — استمر بنفس النهج!
          </p>
        </div>
        <div style={{ textAlign: "center", padding: 20 }}>
          <div style={{ fontSize: 64, marginBottom: 10 }}>🏅</div>
          <p style={{ color: "var(--text-soft)", marginBottom: 16 }}>
            المراجعة المتباعدة تساعدك على تثبيت الكلمات في الذاكرة طويلة المدى
          </p>
          <button className="btn btn-primary" onClick={onBack}>العودة للرئيسية</button>
        </div>
      </>
    );
  }

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للرئيسية</button>
      <div className="lesson-head">
        <h2>🔁 مراجعة ذكية</h2>
        <p>راجع الكلمات التي أخطأت فيها من قبل — مراجعة متباعدة لتثبيت الحفظ</p>
      </div>
      <div className="review-progress">{index + 1}/{total} · ✓ {known} · 🔁 {failed.length}</div>
      <div className="review-card" style={{ "--sc": "#4f46e5", "--sc2": "#9333ea" }}>
        <div className="rc-de">{word.de}</div>
        <div className="rc-pron">{word.pron}</div>
        <button className="speak-btn" onClick={() => speakGerman(word.de)}>
          <span className="spk-icon">🔊</span> استمع
        </button>
        {flipped && <div className="rc-ar">{word.ar}</div>}
        {!flipped && (
          <button className="btn btn-ghost" onClick={() => setFlipped(true)}>أظهر المعنى</button>
        )}
      </div>
      <div className="review-actions">
        <button className="btn btn-primary" onClick={() => next(true)}>✓ أعرفها</button>
        <button className="btn btn-danger" onClick={() => next(false)}>✗ أعدها للمراجعة</button>
      </div>
    </>
  );
}
