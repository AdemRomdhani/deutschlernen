import { useState, useRef, useEffect } from "react";
import { LEVELS, shuffle } from "../data.js";

export default function Flashcards({ levelIdx, onBack, onComplete }) {
  const level = LEVELS[levelIdx]?.code || "A1";
  const [cards] = useState(() => {
    const levelWords = LEVELS.slice(0, levelIdx + 1).flatMap(l => l.lessons.flatMap(ls => ls.words));
    return shuffle(levelWords).slice(0, 15);
  });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [showComplete, setShowComplete] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);

  const current = cards[currentIdx];
  const total = cards.length;

  useEffect(() => {
    setIsFlipped(false);
    setSwipeDirection(null);
  }, [currentIdx]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const diff = e.touches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? "right" : "left");
    }
  };

  const handleTouchEnd = () => {
    if (swipeDirection === "right") {
      markAsKnown();
    } else if (swipeDirection === "left") {
      markAsUnknown();
    }
    setTouchStart(null);
    setSwipeDirection(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") markAsKnown();
    else if (e.key === "ArrowLeft") markAsUnknown();
    else if (e.key === " " || e.key === "Enter") setIsFlipped(f => !f);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx]);

  const markAsKnown = () => {
    setKnown(k => [...k, current]);
    goNext();
  };

  const markAsUnknown = () => {
    setUnknown(u => [...u, current]);
    goNext();
  };

  const goNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      const score = Math.round((known.length / total) * 100);
      setShowComplete(true);
      onComplete(score);
    }
  };

  const getCardStyle = () => {
    if (swipeDirection === "right") return { transform: "translateX(100px) rotate(15deg)", opacity: 0.5 };
    if (swipeDirection === "left") return { transform: "translateX(-100px) rotate(-15deg)", opacity: 0.5 };
    return {};
  };

  if (showComplete) {
    return (
      <div className="flashcards-complete">
        <button className="btn-back" onClick={onBack}>← رجوع</button>
        <div className="complete-card">
          <div className="complete-icon">{known.length > unknown.length ? "🎉" : "💪"}</div>
          <h2>اكتملت البطاقات!</h2>
          <div className="complete-stats">
            <div className="stat known">✅ معروفة: {known.length}</div>
            <div className="stat unknown">❌ غير معروفة: {unknown.length}</div>
          </div>
          {unknown.length > 0 && (
            <div className="retry-section">
              <p>هل تريد مراجعة الكلمات غير المعروفة؟</p>
              <button className="btn-retry" onClick={() => {
                setCards(unknown);
                setUnknown([]);
                setCurrentIdx(0);
                setShowComplete(false);
              }}>🔄 راجع الكلمات الصعبة</button>
            </div>
          )}
          <button className="btn-back-home" onClick={onBack}>🏠 رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcards" onKeyDown={handleKeyDown}>
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="flashcards-header">
        <h2>🃏 Flashcards — بطاقات المراجعة</h2>
        <div className="flashcards-level">{level}</div>
      </div>

      <div className="flashcards-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
        </div>
        <span>{currentIdx + 1}/{total}</span>
      </div>

      <div className="flashcards-stats">
        <span className="stat known">✅ {known.length}</span>
        <span className="stat unknown">❌ {unknown.length}</span>
      </div>

      <div className="flashcards-instructions">
        <span>← سحب لليمين (معروف) | سحب لليسار (غير معروف) →</span>
        <span>اضغط Space لقلب البطاقة</span>
      </div>

      <div
        className={`flashcard-container ${isFlipped ? "flipped" : ""}`}
        ref={cardRef}
        style={getCardStyle()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setIsFlipped(f => !f)}
      >
        <div className="flashcard">
          <div className="flashcard-front">
            <div className="card-word">{current.de}</div>
            <div className="card-pron">{current.pron}</div>
            <div className="card-hint">اضغط للقلب</div>
          </div>
          <div className="flashcard-back">
            <div className="card-ar">{current.ar}</div>
            <div className="card-de">{current.de}</div>
            <div className="card-pron">{current.pron}</div>
          </div>
        </div>
      </div>

      <div className="flashcards-actions">
        <button className="btn-action unknown" onClick={markAsUnknown}>
          ❌ غير معروف
        </button>
        <button className="btn-action known" onClick={markAsKnown}>
          ✅ معروف
        </button>
      </div>
    </div>
  );
}
