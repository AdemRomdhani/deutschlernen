import { useProgress, levelProgress } from "../store.js";
import { LEVELS, RANKS } from "../data.js";

export default function Analytics({ onBack }) {
  const progress = useProgress();

  const totalWords = LEVELS.flatMap(l => l.lessons.flatMap(ls => ls.words)).length;
  const wordsLearned = progress.wordsLearned || 0;
  const totalLessons = LEVELS.reduce((s, l) => s + l.lessons.length, 0);
  const lessonsDone = progress.lessonsDone?.length || 0;
  const examsPassed = progress.examsPassed || 0;
  const gamesWon = progress.gamesWon?.length || 0;

  const weekActivity = (() => {
    const activity = progress.activity || {};
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        day: d.toLocaleDateString("ar", { weekday: "short" }),
        count: activity[key] || 0
      });
    }
    return days;
  })();

  const maxActivity = Math.max(...weekActivity.map(d => d.count), 1);

  const levelStats = LEVELS.map((level, idx) => {
    const lp = levelProgress(progress, idx);
    const examScore = progress.examScores[level.code] || 0;
    return {
      code: level.code,
      name: level.name,
      color: level.color,
      lessons: lp.pct,
      exam: examScore,
      overall: Math.round((lp.pct + examScore) / 2)
    };
  });

  const currentRank = RANKS.reduce((r, rank) => progress.xp >= rank.min ? rank : r, RANKS[0]);
  const nextRank = RANKS.find(r => r.min > progress.xp) || RANKS[RANKS.length - 1];
  const xpProgress = Math.round(((progress.xp - currentRank.min) / (nextRank.min - currentRank.min)) * 100);

  const skillRadar = [
    { label: "القراءة", value: Math.round(lessonsDone / totalLessons * 100), icon: "📖" },
    { label: "الكتابة", value: Math.round(Object.keys(progress.examScores || {}).length / LEVELS.length * 100), icon: "✍️" },
    { label: "الاستماع", value: Math.round(gamesWon / 8 * 100), icon: "🎧" },
    { label: "التحدث", value: Math.round(wordsLearned / totalWords * 100), icon: "🎤" }
  ];

  const predictions = (() => {
    const wordsPerWeek = Math.max(Object.values(progress.activity || {}).reduce((s, v) => s + v, 0), 1);
    const wordsNeeded = totalWords - wordsLearned;
    const weeksLeft = Math.ceil(wordsNeeded / wordsPerWeek);
    return {
      b1Weeks: Math.max(0, Math.ceil((totalWords * 0.5 - wordsLearned) / wordsPerWeek)),
      b2Weeks: Math.max(0, Math.ceil((totalWords * 0.7 - wordsLearned) / wordsPerWeek)),
      c1Weeks: Math.max(0, Math.ceil((totalWords * 0.9 - wordsLearned) / wordsPerWeek))
    };
  })();

  return (
    <div className="analytics">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="analytics-header">
        <h2>📊 Analytics — لوحة التحليلات</h2>
      </div>

      <div className="analytics-grid">
        {/* Stats Overview */}
        <div className="analytics-card stats-overview">
          <h3>📋 نظرة عامة</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📚</div>
              <div className="stat-value">{wordsLearned}/{totalWords}</div>
              <div className="stat-label">كلمة</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📖</div>
              <div className="stat-value">{lessonsDone}/{totalLessons}</div>
              <div className="stat-label">درس</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{examsPassed}/{LEVELS.length}</div>
              <div className="stat-label">امتحان</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎮</div>
              <div className="stat-value">{gamesWon}</div>
              <div className="stat-label">لعبة</div>
            </div>
          </div>
        </div>

        {/* Rank & XP */}
        <div className="analytics-card rank-card">
          <h3>🏆 الرتبة</h3>
          <div className="rank-display">
            <div className="rank-icon">{currentRank.icon}</div>
            <div className="rank-info">
              <div className="rank-title">{currentRank.title}</div>
              <div className="rank-de">{currentRank.de}</div>
            </div>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${xpProgress}%` }} />
          </div>
          <div className="xp-info">
            <span>{progress.xp} XP</span>
            <span>{nextRank.min} XP للمستوى التالي</span>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="analytics-card skill-radar">
          <h3>🎯 المهارات</h3>
          <div className="radar-chart">
            {skillRadar.map((skill, i) => (
              <div key={i} className="radar-item">
                <div className="radar-label">{skill.icon} {skill.label}</div>
                <div className="radar-bar">
                  <div className="radar-fill" style={{ width: `${skill.value}%` }} />
                </div>
                <div className="radar-value">{skill.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="analytics-card weekly-activity">
          <h3>📅 النشاط الأسبوعي</h3>
          <div className="activity-chart">
            {weekActivity.map((day, i) => (
              <div key={i} className="activity-day">
                <div className="activity-bar" style={{ height: `${(day.count / maxActivity) * 100}%` }} />
                <div className="activity-label">{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Level Progress */}
        <div className="analytics-card level-progress">
          <h3>📈 تقدم المستويات</h3>
          <div className="level-bars">
            {levelStats.map((level, i) => (
              <div key={i} className="level-bar-item">
                <div className="level-label">
                  <span className="level-code" style={{ color: level.color }}>{level.code}</span>
                  <span>{level.name}</span>
                </div>
                <div className="level-bar">
                  <div className="level-fill" style={{ width: `${level.overall}%`, backgroundColor: level.color }} />
                </div>
                <div className="level-value">{level.overall}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Areas */}
        <div className="analytics-card weak-areas">
          <h3>⚠️ نقاط الضعف</h3>
          <div className="weak-list">
            {levelStats.filter(l => l.overall < 50).length === 0 ? (
              <div className="no-weak">🎉 لا توجد نقاط ضعف! أنت على الطريق الصحيح</div>
            ) : (
              levelStats.filter(l => l.overall < 50).map((level, i) => (
                <div key={i} className="weak-item">
                  <span className="weak-code" style={{ color: level.color }}>{level.code}</span>
                  <span className="weak-name">{level.name}</span>
                  <span className="weak-value">{level.overall}%</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Predictions */}
        <div className="analytics-card predictions">
          <h3>🔮 توقعات التقدم</h3>
          <div className="prediction-list">
            <div className="prediction-item">
              <span className="pred-level">B1</span>
              <span className="pred-time">
                {predictions.b1Weeks > 0 ? `~${predictions.b1Weeks} أسبوع` : "تم بالفعل!"}
              </span>
            </div>
            <div className="prediction-item">
              <span className="pred-level">B2</span>
              <span className="pred-time">
                {predictions.b2Weeks > 0 ? `~${predictions.b2Weeks} أسبوع` : "تم بالفعل!"}
              </span>
            </div>
            <div className="prediction-item">
              <span className="pred-level">C1</span>
              <span className="pred-time">
                {predictions.c1Weeks > 0 ? `~${predictions.c1Weeks} أسبوع` : "تم بالفعل!"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
