import { useProgress, levelProgress, isLevelUnlocked, currentUserLevel, getDueReviewWords } from "../store.js";
import { LEVELS, BADGES, totalLessons, wordOfTheDay, RANKS } from "../data.js";
import { speakGerman } from "../speech.js";
import { useToast } from "./UI.jsx";

function WordOfDay() {
  const w = wordOfTheDay();
  const toast = useToast();
  return (
    <div className="wod-card">
      <div className="wod-head">
        <span className="wod-icon">📅</span>
        <div>
          <h3>كلمة اليوم</h3>
          <p>احفظ كلمة جديدة كل يوم</p>
        </div>
      </div>
      <div className="wod-body">
        <div className="wod-de">{w.de}</div>
        <div className="wod-pron">{w.pron}</div>
        <div className="wod-ar">{w.ar}</div>
      </div>
      <button className="speak-btn" onClick={() => { if (!speakGerman(w.de)) toast("🎧 تعذر تشغيل الصوت"); }}>
        <span className="spk-icon">🔊</span> استمع للنطق
      </button>
    </div>
  );
}

function Heatmap({ activity }) {
  const today = new Date();
  const days = [];
  for (let i = 55; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  return (
    <div className="heatmap">
      {days.map((d, i) => {
        const key = d.toISOString().slice(0, 10);
        const count = activity[key] || 0;
        const cls = count === 0 ? "" : count <= 2 ? "low" : count <= 5 ? "mid" : "high";
        const isToday = key === today.toISOString().slice(0, 10);
        return (
          <div
            key={i}
            className={"heat-cell " + cls + (isToday ? " today" : "")}
            title={key + (count ? ` · ${count} نشاط` : " · لا نشاط")}
          />
        );
      })}
    </div>
  );
}

function ReviewPrompt({ onReview }) {
  const due = getDueReviewWords().length;
  if (due === 0) return null;
  return (
    <div className="review-prompt" onClick={onReview} role="button" tabIndex={0}>
      <span className="rp-icon">🔁</span>
      <div className="rp-text">
        <b>{due} كلمة</b> جاهزة للمراجعة الذكية
        <span className="rp-sub">كلمات أخطأت فيها سابقاً — راجعها الآن لتثبيتها</span>
      </div>
      <span className="rp-arrow">←</span>
    </div>
  );
}

function Journey({ onOpenLevel }) {
  const progress = useProgress();

  return (
    <div className="journey-path">
      {LEVELS.map((level, idx) => {
        const { pct } = levelProgress(progress, idx);
        const unlocked = isLevelUnlocked(progress, idx);
        const completed = pct === 100;
        const C = 2 * Math.PI * 26;

        return (
          <div
            key={level.code}
            className={"station" + (unlocked ? "" : " locked") + (completed ? " completed" : "")}
            style={{ "--sc": level.color, "--sc2": level.color2 }}
            onClick={() => unlocked && onOpenLevel(idx)}
            role="button"
            tabIndex={0}
          >
            <div className="station-icon">{level.icon}</div>
            <div className="station-info">
              <div className="station-code">{level.code} · {level.de}</div>
              <div className="station-name">المستوى {level.name}</div>
              <div className="station-desc">{level.desc}</div>
            </div>
            <div className="station-right">
              {unlocked ? (
                <>
                  <div className="ring-wrap">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle className="ring-bg" cx="30" cy="30" r="26" />
                      <circle
                        className="ring-fg" cx="30" cy="30" r="26"
                        strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
                      />
                    </svg>
                    <span className="ring-pct">{pct}%</span>
                  </div>
                  {completed && <div className="station-lock" style={{ color: "#22c55e" }}>✓</div>}
                </>
              ) : (
                <div className="station-lock">🔒</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Badges() {
  const progress = useProgress();
  return (
    <div className="badges-grid">
      {BADGES.map(badge => {
        const unlocked = badge.check(progress);
        return (
          <div key={badge.id} className={"badge-card" + (unlocked ? "" : " locked")}>
            <span className="badge-icon">{badge.icon}</span>
            <div className="badge-name">{badge.name}</div>
            <div className="badge-desc">{badge.desc}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home({ onOpenLevel, onReview, onOpenOSD, onOpenTraining, onOpenSkillTree, onOpenAnalytics, onOpenCultural }) {
  const progress = useProgress();

  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <span className="hero-badge">🇩🇪 من العربية إلى الألمانية</span>
          <h1 className="hero-title">رحلتك لإتقان <span className="grad-text">الألمانية</span> تبدأ هنا</h1>
          <p className="hero-sub">
            تعلّم خطوة بخطوة من <b>A1</b> حتى <b>C2</b> مع دروس تفاعلية وألعاب ممتعة واختبارات حقيقية.
            كل مستوى هو محطة جديدة في رحلتك نحو الاحتراف.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => {
              const first = LEVELS.findIndex((l, i) => isLevelUnlocked(progress, i));
              onOpenLevel(Math.max(first - 1, 0));
            }}>🚀 ابدأ رحلتك</button>
            <button className="btn btn-ghost btn-lg" onClick={onOpenTraining}>🏋️ التدريبات</button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-card card-front">Hallo!</div>
          <div className="hero-card card-mid">مرحباً</div>
          <div className="hero-card card-back">Guten Morgen!</div>
          <div className="float-word w1">A1</div>
          <div className="float-word w2">B2</div>
          <div className="float-word w3">C1</div>
          <div className="float-word w4">C2</div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-block">
          <div className="stat-value">{progress.wordsLearned}</div>
          <div className="stat-desc">كلمة تعلّمتها</div>
        </div>
        <div className="stat-block">
          <div className="stat-value">{progress.lessonsDone.length}/{totalLessons()}</div>
          <div className="stat-desc">درس مكتمل</div>
        </div>
        <div className="stat-block">
          <div className="stat-value">{progress.examsPassed}/{LEVELS.length}</div>
          <div className="stat-desc">امتحان ناجح</div>
        </div>
        <div className="stat-block">
          <div className="stat-value">{currentUserLevel(progress)}</div>
          <div className="stat-desc">مستواك الحالي</div>
        </div>
      </div>

      <ReviewPrompt onReview={onReview} />

      <div className="section banners-section">
        <div className="osd-banner" onClick={onOpenOSD} role="button" tabIndex={0}>
          <div className="osd-banner-icon">🎓</div>
          <div className="osd-banner-text">
            <h3>OSD Prüfung — امتحان ألماني معتمد</h3>
            <p>اختبر مستواك في التحدث والاستماع والقراءة والكتابة</p>
          </div>
          <div className="osd-banner-arrow">←</div>
        </div>
      </div>

      <div className="section quick-access">
        <div className="quick-grid">
          <div className="quick-card" onClick={onOpenTraining}>
            <span className="quick-icon">🏋️</span>
            <span className="quick-name">التدريبات</span>
          </div>
          <div className="quick-card" onClick={onOpenSkillTree}>
            <span className="quick-icon">🌳</span>
            <span className="quick-name">شجرة المهارات</span>
          </div>
          <div className="quick-card" onClick={onOpenAnalytics}>
            <span className="quick-icon">📊</span>
            <span className="quick-name">التحليلات</span>
          </div>
          <div className="quick-card" onClick={onOpenCultural}>
            <span className="quick-icon">🇩🇪</span>
            <span className="quick-name">الثقافة</span>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">🗺️ خريطة المستويات</h2>
          <p className="section-sub">من أول خطوة حتى الإتقان الكامل — 6 محطات</p>
        </div>
        <Journey onOpenLevel={onOpenLevel} />
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">📅 يومياتك</h2>
          <p className="section-sub">كلمة اليوم + استمرارية تعلمك خلال الشهرين الماضيين</p>
        </div>
        <div className="daily-grid">
          <WordOfDay />
          <div className="heatmap-card">
            <h3>🔥 استمراريتك</h3>
            <p className="heatmap-label">كل خلية = يوم نشاط · كلما زادت كثافة اللون زاد نشاطك</p>
            <Heatmap activity={progress.activity || {}} />
            <div className="heatmap-legend">
              <span>أقل</span>
              <div className="heat-cell legend" />
              <div className="heat-cell low legend" />
              <div className="heat-cell mid legend" />
              <div className="heat-cell high legend" />
              <span>أكثر</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">🏆 إنجازاتك</h2>
          <p className="section-sub">اجمع الشارات وأنت تتقدم في الرحلة</p>
        </div>
        <Badges />
      </div>
    </>
  );
}
