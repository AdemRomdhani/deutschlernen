import { useState, useEffect } from "react";
import { speakGerman } from "../speech.js";

const SIMULATED_PLAYERS = [
  { name: "Anna K.", xp: 4850, level: "B2", streak: 45, flag: "🇩🇪" },
  { name: "Mohamed A.", xp: 4620, level: "B2", streak: 38, flag: "🇪🇬" },
  { name: "Sophie M.", xp: 4380, level: "B1", streak: 32, flag: "🇦🇹" },
  { name: "Yusuf H.", xp: 4150, level: "B1", streak: 28, flag: "🇸🇦" },
  { name: "Lena S.", xp: 3900, level: "B1", streak: 25, flag: "🇩🇪" },
  { name: "Omar B.", xp: 3680, level: "A2", streak: 22, flag: "🇲🇦" },
  { name: "Julia W.", xp: 3420, level: "A2", streak: 20, flag: "🇩🇪" },
  { name: "Ali R.", xp: 3200, level: "A2", streak: 18, flag: "🇯🇴" },
  { name: "Maria F.", xp: 2950, level: "A1", streak: 15, flag: "🇩🇪" },
  { name: "Khalid N.", xp: 2700, level: "A1", streak: 12, flag: "🇰🇼" },
];

function getMedal(idx) {
  if (idx === 0) return "🥇";
  if (idx === 1) return "🥈";
  if (idx === 2) return "🥉";
  return `#${idx + 1}`;
}

export default function Leaderboard({ onBack }) {
  const [userXP, setUserXP] = useState(0);
  const [tab, setTab] = useState("all");
  const [userRank, setUserRank] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem("user_xp") || "0");
    setUserXP(stored);
    const allPlayers = [...SIMULATED_PLAYERS, { name: "أنت", xp: stored, level: "A1", streak: 0, flag: "🇸🇦" }];
    allPlayers.sort((a, b) => b.xp - a.xp);
    setUserRank(allPlayers.findIndex(p => p.name === "أنت") + 1);
  }, []);

  const allPlayers = [...SIMULATED_PLAYERS, { name: "أنت", xp: userXP, level: "A1", streak: parseInt(localStorage.getItem("daily_streak") || "0"), flag: "🇸🇦" }];
  allPlayers.sort((a, b) => b.xp - a.xp);

  const topPerformers = [...allPlayers].sort((a, b) => b.streak - a.streak).slice(0, 5);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 16, cursor: "pointer", marginBottom: 16 }}>← العودة</button>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2>🏅 لوحة المتصدرين</h2>
        <p style={{ color: "var(--text-soft)" }}>تنافس مع المتعلمين الآخرين</p>
      </div>

      <div style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", borderRadius: 16, padding: 20, marginBottom: 20, color: "#fff", textAlign: "center" }}>
        <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>ترتيبك الحالي</div>
        <div style={{ fontSize: 48, fontWeight: 800 }}>#{userRank}</div>
        <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>{userXP} XP</div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
        {[{ id: "all", label: "الكل" }, { id: "top", label: "الأفضل" }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "8px 20px", borderRadius: 999, border: "2px solid",
              borderColor: tab === t.id ? "#8b5cf6" : "var(--border)",
              background: tab === t.id ? "#8b5cf6" : "var(--bg)",
              color: tab === t.id ? "#fff" : "var(--text)",
              fontWeight: 700, cursor: "pointer", fontSize: 13
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "all" ? (
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
          {allPlayers.map((player, idx) => (
            <div
              key={player.name}
              style={{
                display: "flex", alignItems: "center", padding: "14px 20px", gap: 14,
                background: player.name === "أنت" ? "rgba(139,92,246,0.1)" : idx % 2 === 0 ? "var(--card)" : "var(--bg-soft)",
                borderBottom: idx < allPlayers.length - 1 ? "1px solid var(--border)" : "none"
              }}
            >
              <div style={{ width: 36, textAlign: "center", fontWeight: 700, fontSize: idx < 3 ? 20 : 14, color: idx === 0 ? "#fbbf24" : idx === 1 ? "#94a3b8" : idx === 2 ? "#d97706" : "var(--text-soft)" }}>
                {getMedal(idx)}
              </div>
              <div style={{ fontSize: 22 }}>{player.flag}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{player.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-soft)" }}>{player.level} • 🔥 {player.streak} يوم</div>
              </div>
              <div style={{ textAlign: "end" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: player.name === "أنت" ? "#8b5cf6" : "var(--text)" }}>{player.xp.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: "var(--text-soft)" }}>XP</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>🔥 الأفضل هذا الأسبوع (أطول سلسلة)</h3>
          {topPerformers.map((player, idx) => (
            <div key={player.name} style={{ display: "flex", alignItems: "center", padding: 14, gap: 12, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 28 }}>{getMedal(idx)}</div>
              <div style={{ fontSize: 20 }}>{player.flag}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{player.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-soft)" }}>{player.level} • {player.xp.toLocaleString()} XP</div>
              </div>
              <div style={{ textAlign: "end" }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#ef4444" }}>🔥 {player.streak}</div>
                <div style={{ fontSize: 11, color: "var(--text-soft)" }}>يوم متتالي</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>💡 كيف تكسب XP؟</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
          {[
            { action: "إتمام درس", xp: "+20 XP" },
            { action: "تحدي يومي", xp: "+30 XP" },
            { action: "تحدي أسبوعي", xp: "+50 XP" },
            { action: "سلسلة يومية", xp: "+10 XP/يوم" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "var(--bg-soft)", borderRadius: 8 }}>
              <span>{item.action}</span>
              <span style={{ color: "#10b981", fontWeight: 700 }}>{item.xp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
