import { useProgress, levelProgress, isLevelUnlocked } from "../store.js";
import { LEVELS } from "../data.js";

export default function SkillTree({ onBack, onOpenLevel }) {
  const progress = useProgress();

  const getMastery = (levelIdx) => {
    const lp = levelProgress(progress, levelIdx);
    const examScore = progress.examScores[LEVELS[levelIdx].code] || 0;
    const gamesCount = LEVELS[levelIdx].lessons.reduce((acc, _, li) => {
      return acc + (progress.gamesWon.includes(`match_${LEVELS[levelIdx].code}`) ? 1 : 0);
    }, 0);
    return {
      lessons: lp.pct,
      exam: examScore,
      games: Math.min(gamesCount * 20, 100),
      overall: Math.round((lp.pct + examScore + Math.min(gamesCount * 20, 100)) / 3)
    };
  };

  const getSkillColor = (mastery) => {
    if (mastery >= 80) return "#10b981";
    if (mastery >= 60) return "#3b82f6";
    if (mastery >= 40) return "#f59e0b";
    if (mastery > 0) return "#f97316";
    return "#6b7280";
  };

  const getSkillIcon = (mastery) => {
    if (mastery >= 80) return "⭐";
    if (mastery >= 60) return "🌟";
    if (mastery >= 40) return "✨";
    if (mastery > 0) return "🔹";
    return "○";
  };

  return (
    <div className="skill-tree">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="skill-tree-header">
        <h2>🌳 Skill Tree — شجرة المهارات</h2>
        <p>تتبع تقدمك في كل مستوى</p>
      </div>

      <div className="skill-tree-container">
        {LEVELS.map((level, idx) => {
          const unlocked = isLevelUnlocked(progress, idx);
          const mastery = getMastery(idx);
          const skillColor = getSkillColor(mastery.overall);

          return (
            <div key={level.code} className={`skill-node ${unlocked ? "unlocked" : "locked"}`}>
              <div className="skill-connector" style={{ backgroundColor: unlocked ? skillColor : "#374151" }} />

              <div
                className="skill-card"
                style={{ borderColor: unlocked ? skillColor : "#374151" }}
                onClick={() => unlocked && onOpenLevel(idx)}
              >
                <div className="skill-icon" style={{ color: skillColor }}>
                  {getSkillIcon(mastery.overall)}
                </div>

                <div className="skill-info">
                  <div className="skill-code">{level.code}</div>
                  <div className="skill-name">{level.de}</div>
                  <div className="skill-name-ar">{level.name}</div>
                </div>

                <div className="skill-mastery">
                  <div className="mastery-ring">
                    <svg viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="25" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                      <circle
                        cx="30" cy="30" r="25"
                        fill="none"
                        stroke={skillColor}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={157}
                        strokeDashoffset={157 * (1 - mastery.overall / 100)}
                        transform="rotate(-90 30 30)"
                      />
                    </svg>
                    <span className="mastery-value">{mastery.overall}%</span>
                  </div>
                </div>

                <div className="skill-details">
                  <div className="detail">
                    <span className="detail-icon">📚</span>
                    <span className="detail-label">الدروس</span>
                    <span className="detail-value">{mastery.lessons}%</span>
                  </div>
                  <div className="detail">
                    <span className="detail-icon">📝</span>
                    <span className="detail-label">الامتحان</span>
                    <span className="detail-value">{mastery.exam}%</span>
                  </div>
                  <div className="detail">
                    <span className="detail-icon">🎮</span>
                    <span className="detail-label">الألعاب</span>
                    <span className="detail-value">{mastery.games}%</span>
                  </div>
                </div>
              </div>

              {!unlocked && (
                <div className="skill-lock">🔒</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
