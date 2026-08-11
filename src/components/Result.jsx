import { useEffect } from "react";
import { useConfetti } from "./UI.jsx";

export default function Result({ score, pass, levelCode, levelName, onBack, onRetry }) {
  const confetti = useConfetti();

  useEffect(() => {
    if (pass) confetti(120);
  }, [pass]);

  const C = 2 * Math.PI * 78;

  return (
    <div className="result-card">
      <span className="result-icon">{pass ? "🎉" : "💪"}</span>
      <div className="result-xp">+{pass ? 40 : 15} XP</div>
      <div className="result-title">{pass ? "مبروك! نجحت في الامتحان" : "قريب جداً!"}</div>
      <div className="result-msg">{levelCode} · المستوى {levelName}</div>
      <div className="result-gauge">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="78" fill="none" stroke="var(--border)" strokeWidth="14" />
          <circle
            cx="90" cy="90" r="78" fill="none" stroke="#2563eb" strokeWidth="14"
            strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - score / 100)}
            transform="rotate(-90 90 90)"
          />
        </svg>
        <div className="result-score">{score}%</div>
      </div>
      <p className="result-msg">
        {pass ? "أنت جاهز للمستوى التالي!" : "راجع الدروس وأعد المحاولة، ستنجح!"}
      </p>
      <div className="result-actions">
        <button className="btn btn-primary" onClick={onBack}>العودة للمستوى</button>
        <button className="btn btn-ghost" onClick={onRetry}>إعادة الامتحان</button>
      </div>
    </div>
  );
}
