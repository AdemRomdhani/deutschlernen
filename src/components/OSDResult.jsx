import { useEffect, useRef } from "react";
import { getOSDGrade } from "../osdData.js";

export default function OSDResult({ level, module, score, onBack, onRetry }) {
  const grade = getOSDGrade(score);
  const passed = score >= (grade.minPercent || 60);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (passed && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const particles = [];
      const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899"];

      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvasRef.current.width,
          y: Math.random() * canvasRef.current.height - canvasRef.current.height,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 3,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 10
        });
      }

      let frame = 0;
      const animate = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        particles.forEach(p => {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05;
          p.rotation += p.rotSpeed;
          if (p.y > canvasRef.current.height + 20) {
            p.y = -20;
            p.x = Math.random() * canvasRef.current.width;
          }
        });
        frame++;
        if (frame < 200) requestAnimationFrame(animate);
      };
      animate();
    }
  }, [passed]);

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const moduleNameAr = {
    sprechen: "التحدث",
    hören: "الاستماع",
    lesen: "القراءة",
    schreiben: "الكتابة"
  }[module] || module;

  return (
    <div className="osd-result">
      <canvas ref={canvasRef} className="confetti-canvas" />

      <div className="result-card">
        <div className="result-icon">{passed ? "🎉" : "💪"}</div>
        <h2 className="result-title">{passed ? "ممتاز! أحسنت!" : "حاول مرة أخرى!"}</h2>

        <div className="score-ring-container">
          <svg viewBox="0 0 160 160" className="score-ring">
            <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="80" cy="80" r="70"
              fill="none"
              stroke={passed ? "#10b981" : "#ef4444"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 80 80)"
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
            <text x="80" y="75" textAnchor="middle" className="score-text">{score}%</text>
            <text x="80" y="95" textAnchor="middle" className="score-label">النتيجة</text>
          </svg>
        </div>

        <div className="result-details">
          <div className="detail-row">
            <span className="detail-label">المستوى:</span>
            <span className="detail-value">{level}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">ال模块:</span>
            <span className="detail-value">{moduleNameAr}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">التقدير:</span>
            <span className={`detail-value grade ${passed ? "passed" : "failed"}`}>
              {grade.label} ({grade.labelAr})
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">النتيجة:</span>
            <span className={`detail-value ${passed ? "passed" : "failed"}`}>
              {passed ? "✅ ناجح" : "❌ لم يجتز"}
            </span>
          </div>
        </div>

        <div className="result-message">
          {passed
            ? `تهانينا! لقد اجتزت اختبار ${moduleNameAr} بمستوى ${level}.`
            : `تحتاج إلى ${grade.minPercent}% على الأقل للنجاح. حاول مرة أخرى!`
          }
        </div>

        <div className="result-buttons">
          <button className="btn-retry" onClick={onRetry}>🔄 إعادة الاختبار</button>
          <button className="btn-back-home" onClick={onBack}>🏠 رجوع</button>
        </div>
      </div>
    </div>
  );
}
