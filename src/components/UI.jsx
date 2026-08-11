import { createContext, useCallback, useContext, useRef, useState, useEffect } from "react";
import { useProgress } from "../store.js";
import { rankForXp } from "../data.js";

/* ---------------- Toast system ---------------- */

const ToastContext = createContext(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const toast = useCallback((msg) => {
    const id = ++idRef.current;
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== id));
    }, 2400);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-wrap">
        {toasts.map(t => <div key={t.id} className="toast">{t.msg}</div>)}
      </div>
    </ToastContext.Provider>
  );
}

/* ---------------- Confetti ---------------- */

export function useConfetti() {
  return useCallback((count = 120) => {
    const canvas = document.getElementById("confetti");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const colors = ["#2563eb", "#7c3aed", "#ec4899", "#06b6d4", "#22c55e", "#f59e0b"];
    const parts = [];
    for (let i = 0; i < count; i++) {
      parts.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.4,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: 2 + Math.random() * 3.5,
        vx: -1.5 + Math.random() * 3,
        rot: Math.random() * Math.PI,
        vr: -0.15 + Math.random() * 0.3
      });
    }
    let frames = 0;
    (function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frames++;
      if (frames < 150) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    })();
  }, []);
}

/* ---------------- Timer bar (speed challenges) ---------------- */

export function TimerBar({ seconds, onTimeout, resetKey, color }) {
  const [left, setLeft] = useState(seconds);
  const timeoutRef = useRef(onTimeout);
  timeoutRef.current = onTimeout;

  useEffect(() => {
    setLeft(seconds);
    const iv = setInterval(() => setLeft(s => s - 1), 1000);
    return () => clearInterval(iv);
  }, [resetKey, seconds]);

  useEffect(() => {
    if (left <= 0) timeoutRef.current();
  }, [left]);

  const pct = Math.max(0, (left / seconds) * 100);
  return (
    <div className="timer-bar">
      <div
        className="timer-fill"
        style={{
          width: pct + "%",
          background: left <= 3 ? "#ef4444" : (color || "var(--primary)")
        }}
      />
      <span className={"timer-text" + (left <= 3 ? " danger" : "")}>{Math.max(0, left)}</span>
    </div>
  );
}

/* ---------------- Header ---------------- */

export function Header({ onHome, onTheme }) {
  const progress = useProgress();
  const [icon, setIcon] = useState("🌙");
  const rank = rankForXp(progress.xp);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" onClick={onHome} aria-label="الرئيسية">
          <span className="brand-logo">D</span>
          <span className="brand-name">Deutsch<span>Lernen</span></span>
        </button>
        <div className="header-stats">
          <div className="stat-chip rank-chip" title={`المرتبة: ${rank.title} (${rank.de})`}>
            <span className="chip-icon">{rank.icon}</span>
            <span>{rank.title}</span>
          </div>
          <div className="stat-chip" title="نقاط الخبرة">
            <span className="chip-icon">⚡</span>
            <span>{progress.xp}</span>
            <span className="chip-label">نقاط</span>
          </div>
          <div className="stat-chip" title="أيام التعلم المتتالية">
            <span className="chip-icon">🔥</span>
            <span>{progress.streak}</span>
            <span className="chip-label">يوم</span>
          </div>
          <button
            className="icon-btn"
            onClick={() => {
              const dark = document.documentElement.getAttribute("data-theme") === "dark";
              document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
              localStorage.setItem("deutschlernen_theme", dark ? "light" : "dark");
              setIcon(dark ? "🌙" : "☀️");
              onTheme && onTheme();
            }}
            title="الوضع الليلي/النهاري"
            aria-label="تبديل المظهر"
          >
            <span>{icon}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
