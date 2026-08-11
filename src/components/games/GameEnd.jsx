import { useToast } from "../UI.jsx";

export default function GameEnd({ won, title, msg, xp, onReplay, onBack }) {
  return (
    <div className="result-card" style={{ marginTop: 10 }}>
      <span className="result-icon">{won ? "🏆" : "💪"}</span>
      <div className="result-xp">+{xp} XP</div>
      <div className="result-title">{title}</div>
      <p className="result-msg">{msg}</p>
      <div className="result-actions">
        <button className="btn btn-primary" onClick={onReplay}>العب مجدداً</button>
        <button className="btn btn-ghost" onClick={onBack}>العودة للمستوى</button>
      </div>
    </div>
  );
}
