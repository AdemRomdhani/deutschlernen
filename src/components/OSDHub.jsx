import { useState } from "react";
import { OSD_MODULES, OSD_LEVELS, getOSDGrade } from "../osdData.js";
import { useProgress } from "../store.js";

export default function OSDHub({ onBack, onStartModule }) {
  const progress = useProgress();
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [selectedModule, setSelectedModule] = useState(null);

  const osdScores = progress.osdScores || {};

  const handleStart = () => {
    if (selectedModule) {
      onStartModule(selectedLevel, selectedModule);
    }
  };

  return (
    <div className="osd-hub">
      <button className="btn-back" onClick={onBack}>← رجوع</button>

      <div className="osd-hero">
        <div className="osd-hero-icon">🎓</div>
        <h1 className="osd-title">OSD Prüfung</h1>
        <p className="osd-subtitle">امتحان ألماني معتمد — اختبر مستواك في جميع المهارات</p>
      </div>

      <div className="osd-level-selector">
        <h2>اختر المستوى</h2>
        <div className="level-chips">
          {OSD_LEVELS.map(lv => (
            <button
              key={lv}
              className={`level-chip ${selectedLevel === lv ? "active" : ""}`}
              onClick={() => setSelectedLevel(lv)}
            >
              {lv}
            </button>
          ))}
        </div>
      </div>

      <div className="osd-modules-grid">
        {OSD_MODULES.map(mod => {
          const scoreKey = `${selectedLevel}_${mod.id}`;
          const score = osdScores[scoreKey];
          const grade = score != null ? getOSDGrade(score) : null;

          return (
            <button
              key={mod.id}
              className={`osd-module-card ${selectedModule === mod.id ? "selected" : ""} ${score != null ? "completed" : ""}`}
              onClick={() => setSelectedModule(mod.id)}
              style={{ "--mod-color": mod.color }}
            >
              <div className="osd-module-icon">{mod.icon}</div>
              <div className="osd-module-name">{mod.name}</div>
              <div className="osd-module-name-ar">{mod.nameAr}</div>
              {score != null && (
                <div className="osd-module-score">
                  <span className="score-value">{score}%</span>
                  {grade && <span className="score-grade">{grade.level}</span>}
                </div>
              )}
              {score == null && (
                <div className="osd-module-badge new">جديد</div>
              )}
            </button>
          );
        })}
      </div>

      {selectedModule && (
        <div className="osd-start-section">
          <button className="btn-osd-start" onClick={handleStart}>
            ابدأ اختبار {OSD_MODULES.find(m => m.id === selectedModule)?.nameAr}
          </button>
        </div>
      )}

      <div className="osd-info-section">
        <h3>عن امتحان OSD</h3>
        <div className="osd-info-grid">
          <div className="osd-info-item">
            <span className="info-icon">🎤</span>
            <span className="info-text">التحدث — 4 أجزاء</span>
          </div>
          <div className="osd-info-item">
            <span className="info-icon">🎧</span>
            <span className="info-text">الاستماع — 4 أجزاء</span>
          </div>
          <div className="osd-info-item">
            <span className="info-icon">📖</span>
            <span className="info-text">القراءة — 4 أجزاء</span>
          </div>
          <div className="osd-info-item">
            <span className="info-icon">✍️</span>
            <span className="info-text">الكتابة — 3 أجزاء</span>
          </div>
        </div>
      </div>
    </div>
  );
}
