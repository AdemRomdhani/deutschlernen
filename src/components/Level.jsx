import { useState } from "react";
import { LEVELS } from "../data.js";
import { useProgress, isLessonDone, levelProgress } from "../store.js";
import { GAME_DEFS } from "../data.js";
import { stopSpeaking, speakGerman } from "../speech.js";
import { useToast } from "./UI.jsx";

const TABS = [
  { id: "lessons", label: "📚 الدروس" },
  { id: "grammar", label: "📖 القواعد" },
  { id: "games", label: "🎮 الألعاب" },
  { id: "exam", label: "📝 الامتحان" }
];

function LessonsTab({ levelIdx, onOpenLesson }) {
  const progress = useProgress();
  const level = LEVELS[levelIdx];
  return (
    <div className="lessons-grid">
      {level.lessons.map((lesson, li) => {
        const done = isLessonDone(progress, levelIdx, li);
        return (
          <div
            key={li}
            className="lesson-card"
            style={{ "--sc": level.color, "--sc2": level.color2 }}
            onClick={() => onOpenLesson(li)}
            role="button"
            tabIndex={0}
          >
            <span className="lc-icon">{lesson.icon}</span>
            <h3>{lesson.title}</h3>
            <p>{lesson.words.length} كلمة جديدة</p>
            <div className="lc-meta">
              <span className="lc-count">{done ? "" : "ابدأ الآن"}</span>
              <span className="lc-done">{done ? "✓ مكتمل" : "تعلم →"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GrammarTab({ levelIdx }) {
  const level = LEVELS[levelIdx];
  const toast = useToast();
  return (
    <div className="grammar-grid">
      {level.grammar.map((g, gi) => (
        <div key={gi} className="grammar-card" style={{ "--sc": level.color, "--sc2": level.color2 }}>
          <span className="g-icon">{g.icon}</span>
          <h3>{g.title}</h3>
          {g.topics.map((t, ti) => (
            <div key={ti} className="grammar-topic">
              <div className="gt-name">{t.name}</div>
              <div className="gt-explain">{t.explanation}</div>
              <div className="gt-example">
                <span className="ge-de">{t.example.de}</span>
                <span className="ge-ar">{t.example.ar}</span>
                <span
                  className="speak-btn ge-speak"
                  role="button"
                  onClick={() => {
                    if (!speakGerman(t.example.de)) toast("🎧 تعذر تشغيل الصوت، تأكد من اتصال الإنترنت");
                  }}
                >
                  <span className="spk-icon">🔊</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function GamesTab({ levelIdx, onOpenGame }) {
  const progress = useProgress();
  const level = LEVELS[levelIdx];
  return (
    <div className="games-grid">
      {GAME_DEFS.map(g => {
        const best = progress.gameBests[`${g.id}_${level.code}`];
        const bestLabel = g.id === "memory"
          ? (best !== undefined ? `أفضل نتيجة: ${best} تحرّك` : "العب الآن")
          : (best !== undefined ? `أفضل نتيجة: ${best}` : "العب الآن");
        return (
          <div key={g.id} className="game-card" onClick={() => onOpenGame(g.id)} role="button" tabIndex={0}>
            <span className="gc-icon">{g.icon}</span>
            <h3>{g.name}</h3>
            <p>{g.desc}</p>
            <div className="gc-best">{bestLabel}</div>
          </div>
        );
      })}
    </div>
  );
}

function ExamTab({ levelIdx, onStartExam }) {
  const progress = useProgress();
  const level = LEVELS[levelIdx];
  const score = progress.examScores[level.code];
  return (
    <div className="exam-box">
      <span className="ex-icon">📝</span>
      <h3>امتحان المستوى {level.name}</h3>
      <p>اختبر كل ما تعلمته في هذا المستوى. 10 أسئلة متنوعة، النجاح بنسبة 70% أو أكثر.</p>
      <div className="exam-rule">
        ✅ 10 أسئلة &nbsp;·&nbsp; ⏱️ بدون وقت محدد &nbsp;·&nbsp; 🏆 احصل على 70% للنجاح
      </div>
      {score !== undefined && (
        <div className="gc-best" style={{ marginBottom: 14, fontSize: 15 }}>
          آخر نتيجة: {score}% {score >= 70 ? "🎉 ناجح" : "💪 حاول مجدداً"}
        </div>
      )}
      <button className="btn btn-primary btn-lg" onClick={onStartExam}>ابدأ الامتحان</button>
    </div>
  );
}

export default function Level({ levelIdx, onBack, onOpenLesson, onOpenGame, onStartExam }) {
  const [tab, setTab] = useState("lessons");
  const progress = useProgress();
  const level = LEVELS[levelIdx];
  const { pct } = levelProgress(progress, levelIdx);

  return (
    <>
      <button className="back-btn" onClick={onBack}>→ العودة للرئيسية</button>
      <div className="level-hero" style={{ "--sc": level.color, "--sc2": level.color2 }}>
        <div className="lh-code">{level.code} · {level.de} · تقدم {pct}%</div>
        <h2>{level.icon} المستوى {level.name}</h2>
        <p>{level.desc}</p>
      </div>

      <div className="tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={"tab" + (tab === t.id ? " active" : "")}
            onClick={() => { stopSpeaking(); setTab(t.id); }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "lessons" && <LessonsTab levelIdx={levelIdx} onOpenLesson={onOpenLesson} />}
      {tab === "grammar" && <GrammarTab levelIdx={levelIdx} />}
      {tab === "games" && <GamesTab levelIdx={levelIdx} onOpenGame={onOpenGame} />}
      {tab === "exam" && <ExamTab levelIdx={levelIdx} onStartExam={onStartExam} />}
    </>
  );
}
