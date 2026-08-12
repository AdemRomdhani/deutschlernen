import { useState, useEffect } from "react";

function loadGoal() {
  try { return JSON.parse(localStorage.getItem("dailyGoal") || '{"minutes":10,"streak":0,"lastDate":"","history":[]}'); } catch { return { minutes: 10, streak: 0, lastDate: "", history: [] }; }
}

function saveGoal(data) {
  localStorage.setItem("dailyGoal", JSON.stringify(data));
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getLast30Days() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

const GOAL_OPTIONS = [5, 10, 15, 20];

export default function DailyGoal({ onBack }) {
  const [data, setData] = useState(loadGoal);
  const [todayMinutes, setTodayMinutes] = useState(0);

  useEffect(() => {
    const today = getToday();
    const entry = data.history.find(h => h.date === today);
    setTodayMinutes(entry ? entry.minutes : 0);
  }, [data.history]);

  const setGoal = (minutes) => {
    const updated = { ...data, minutes };
    saveGoal(updated);
    setData(updated);
  };

  const addStudyTime = (mins) => {
    const today = getToday();
    const updated = { ...data };
    const existing = updated.history.find(h => h.date === today);
    if (existing) {
      existing.minutes += mins;
    } else {
      updated.history.push({ date: today, minutes: mins });
    }

    if (updated.lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().slice(0, 10);
      if (updated.lastDate === yStr) {
        updated.streak += 1;
      } else {
        updated.streak = 1;
      }
      updated.lastDate = today;
    }

    saveGoal(updated);
    setData(updated);
    setTodayMinutes(prev => prev + mins);
  };

  const days = getLast30Days();
  const historyMap = {};
  data.history.forEach(h => { historyMap[h.date] = h.minutes; });

  const progress = Math.min((todayMinutes / data.minutes) * 100, 100);

  return (
    <div style={{ padding: "20px 0" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>&#8592; Back</button>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 22 }}>Daily Goal</h2>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 10 }}>Set daily goal (minutes):</div>
          <div style={{ display: "flex", gap: 10 }}>
            {GOAL_OPTIONS.map(m => (
              <button key={m} onClick={() => setGoal(m)} style={{ flex: 1, padding: 12, background: data.minutes === m ? "var(--accent, #3b82f6)" : "var(--bg-soft)", border: data.minutes === m ? "none" : "1px solid var(--border)", borderRadius: 10, fontSize: 16, fontWeight: 600, color: data.minutes === m ? "#fff" : "var(--text)", cursor: "pointer" }}>
                {m}m
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, color: "var(--text-soft)" }}>Today's Progress</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{todayMinutes}/{data.minutes} min</div>
          </div>
          <div style={{ background: "var(--bg-soft)", borderRadius: 8, height: 10, overflow: "hidden" }}>
            <div style={{ background: progress >= 100 ? "#10b981" : "var(--accent, #3b82f6)", height: "100%", borderRadius: 8, width: `${progress}%`, transition: "width 0.5s" }} />
          </div>
          {progress >= 100 && <div style={{ fontSize: 13, color: "#10b981", marginTop: 8, textAlign: "center" }}>Goal reached!</div>}

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {[1, 2, 5, 10].map(m => (
              <button key={m} onClick={() => addStudyTime(m)} style={{ flex: 1, padding: 10, background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "var(--text)", cursor: "pointer" }}>
                +{m}m
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 14, color: "var(--text-soft)" }}>Streak</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{data.streak} days</div>
          </div>

          <div style={{ fontSize: 14, color: "var(--text-soft)", marginBottom: 10 }}>Last 30 days:</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4 }}>
            {days.map((day, i) => {
              const mins = historyMap[day] || 0;
              const intensity = mins === 0 ? 0 : mins <= 5 ? 1 : mins <= 10 ? 2 : mins <= 15 ? 3 : 4;
              const colors = ["var(--bg-soft)", "rgba(59,130,246,0.2)", "rgba(59,130,246,0.4)", "rgba(59,130,246,0.6)", "rgba(59,130,246,0.9)"];
              const isToday = day === getToday();
              return (
                <div key={i} title={`${day}: ${mins} min`} style={{ aspectRatio: "1", borderRadius: 4, background: colors[intensity], border: isToday ? "2px solid var(--accent, #3b82f6)" : "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "var(--text-soft)" }}>
                  {new Date(day).getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
