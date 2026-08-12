import { useState, useEffect } from "react";

function getWeekData() {
  try {
    const data = JSON.parse(localStorage.getItem("progressReport") || "{}");
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const weekGames = (data.games || []).filter(g => new Date(g.date) >= weekAgo);
    const weekWords = (data.words || []).filter(w => new Date(w.date) >= weekAgo);
    const streak = data.streak || 0;
    const totalGames = weekGames.length;
    const avgScore = totalGames > 0 ? Math.round(weekGames.reduce((s, g) => s + g.score, 0) / totalGames) : 0;
    const wordsLearned = weekWords.length;
    const weakWords = data.mistakes || [];
    return { totalGames, avgScore, wordsLearned, streak, weekGames, weakWords };
  } catch { return { totalGames: 0, avgScore: 0, wordsLearned: 0, streak: 0, weekGames: [], weakWords: [] }; }
}

function BarChart({ data, maxVal }) {
  const max = maxVal || Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-soft)", marginBottom: 4 }}>{d.value}</div>
          <div style={{ width: "100%", height: `${(d.value / max) * 100}%`, minHeight: 4, background: "linear-gradient(180deg, var(--primary), var(--primary-2))", borderRadius: 6 }} />
          <div style={{ fontSize: 10, color: "var(--text-soft)", marginTop: 4 }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function HeatMap({ days }) {
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {days.map((d, i) => (
        <div key={i} title={`${d.date}: ${d.count} نشاط`}
          className={`heat-cell ${d.count === 0 ? "" : d.count < 3 ? "low" : d.count < 6 ? "mid" : "high"} ${d.isToday ? "today" : ""}`} />
      ))}
    </div>
  );
}

export default function ProgressReport({ onBack }) {
  const [data, setData] = useState(getWeekData);

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const count = data.weekGames.filter(g => g.date && g.date.startsWith(key)).length;
    days.push({ date: key, count, isToday: i === 0 });
  }

  const categoryScores = {};
  data.weekGames.forEach(g => {
    const cat = g.category || "غير محدد";
    if (!categoryScores[cat]) categoryScores[cat] = { total: 0, count: 0 };
    categoryScores[cat].total += g.score;
    categoryScores[cat].count++;
  });

  const weekDays = ["سب", "أح", "إث", "ثل", "أر", "خم", "جم"];
  const barData = days.map((d, i) => ({ label: weekDays[i], value: d.count }));

  return (
    <div style={{ padding: "20px 0" }}>
      <button className="back-btn" onClick={onBack}>← رجوع</button>
      <div className="game-head">
        <h2>📊 تقرير التقدم — Progress Report</h2>
        <p>ملخص تقدمك هذا الأسبوع</p>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14, marginBottom: 24 }}>
          {[
            { icon: "📝", value: data.totalGames, label: "لعبة" },
            { icon: "⭐", value: `${data.avgScore}%`, label: "متوسط النتيجة" },
            { icon: "📚", value: data.wordsLearned, label: "كلمة جديدة" },
            { icon: "🔥", value: data.streak, label: "أيام متتالية" },
          ].map((s, i) => (
            <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 18, textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-la)", fontWeight: 900, fontSize: 24, color: "var(--primary)" }}>{s.value}</div>
              <div style={{ color: "var(--text-soft)", fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 22, marginBottom: 16, boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ marginBottom: 14 }}>🔥 نشاط الأسبوع</h3>
          <BarChart data={barData} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 22, marginBottom: 16, boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ marginBottom: 14 }}>📅 خريطة النشاط</h3>
          <HeatMap days={days} />
          <div className="heatmap-legend" style={{ marginTop: 10 }}>
            <span>أقل</span>
            <div className="heat-cell legend" />
            <div className="heat-cell legend low" />
            <div className="heat-cell legend mid" />
            <div className="heat-cell legend high" />
            <span>أكثر</span>
          </div>
        </div>

        {Object.keys(categoryScores).length > 0 && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 22, marginBottom: 16, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ marginBottom: 14 }}>📈 النتائج حسب الفئة</h3>
            {Object.entries(categoryScores).map(([cat, s], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontWeight: 700, minWidth: 100 }}>{cat}</span>
                <div style={{ flex: 1, height: 10, background: "var(--border)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.round(s.total / s.count)}%`, background: "linear-gradient(90deg, var(--primary), var(--primary-2))", borderRadius: 999 }} />
                </div>
                <span style={{ fontFamily: "var(--font-la)", fontWeight: 700 }}>{Math.round(s.total / s.count)}%</span>
              </div>
            ))}
          </div>
        )}

        {data.weakWords.length > 0 && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 22, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ marginBottom: 14 }}>⚠️ كلمات تحتاج مراجعة</h3>
            {data.weakWords.slice(0, 10).map((w, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-la)", direction: "ltr", fontWeight: 700 }}>{w.de}</span>
                <span style={{ color: "var(--text-soft)" }}>{w.ar}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
