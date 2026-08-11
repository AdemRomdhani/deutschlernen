import { useEffect, useState } from "react";
import { Header, ToastProvider } from "./components/UI.jsx";
import Home from "./components/Home.jsx";
import Level from "./components/Level.jsx";
import Lesson from "./components/Lesson.jsx";
import Exam from "./components/Exam.jsx";
import Result from "./components/Result.jsx";
import SmartReview from "./components/SmartReview.jsx";
import OSDHub from "./components/OSDHub.jsx";
import SprechenExam from "./components/SprechenExam.jsx";
import HörenExam from "./components/HörenExam.jsx";
import LesenExam from "./components/LesenExam.jsx";
import SchreibenExam from "./components/SchreibenExam.jsx";
import OSDResult from "./components/OSDResult.jsx";
import MatchGame from "./components/games/MatchGame.jsx";
import MemoryGame from "./components/games/MemoryGame.jsx";
import BuilderGame from "./components/games/BuilderGame.jsx";
import ListeningGame from "./components/games/ListeningGame.jsx";
import TrueFalseGame from "./components/games/TrueFalseGame.jsx";
import SentenceBuilder from "./components/games/SentenceBuilder.jsx";
import Dialogue from "./components/games/Dialogue.jsx";
import Pronounce from "./components/games/Pronounce.jsx";
import { LEVELS } from "./data.js";
import { recordStreak, isLevelUnlocked, recordOSDExam } from "./store.js";

const GAME_MAP = {
  match: MatchGame,
  memory: MemoryGame,
  builder: BuilderGame,
  listening: ListeningGame,
  truefalse: TrueFalseGame,
  sentence: SentenceBuilder,
  dialogue: Dialogue,
  pronounce: Pronounce
};

export default function App() {
  const [nav, setNav] = useState({ view: "home", level: 0, lesson: 0, game: null });
  const [examScore, setExamScore] = useState(null);
  const [osdState, setOsdState] = useState({ level: "A1", module: null, score: null });

  useEffect(() => {
    recordStreak();
    const saved = localStorage.getItem("deutschlernen_theme");
    if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const goHome = () => { setNav({ view: "home", level: 0, lesson: 0, game: null }); setExamScore(null); setOsdState({ level: "A1", module: null, score: null }); };
  const openLevel = (idx, tab) => { setNav({ view: "level", level: idx, lesson: 0, game: null }); };
  const openLesson = (lessonIdx) => setNav(n => ({ ...n, view: "lesson", lesson: lessonIdx }));
  const openGame = (gameId) => setNav(n => ({ ...n, view: "game", game: gameId }));
  const startExam = () => { setNav(n => ({ ...n, view: "exam" })); setExamScore(null); };
  const backFromLevel = () => goHome();
  const backToLevel = () => setNav(n => ({ ...n, view: "level", game: null, lesson: 0 }));
  const openReview = () => setNav(n => ({ ...n, view: "review", game: null, lesson: 0 }));
  const backFromReview = () => goHome();

  // OSD navigation
  const openOSD = () => setNav(n => ({ ...n, view: "osd-hub" }));
  const startOSDModule = (level, module) => {
    setOsdState({ level, module, score: null });
    setNav(n => ({ ...n, view: `osd-${module}` }));
  };
  const completeOSDModule = (score) => {
    recordOSDExam(osdState.level, osdState.module, score);
    setOsdState(s => ({ ...s, score }));
    setNav(n => ({ ...n, view: "osd-result" }));
  };
  const retryOSD = () => {
    setNav(n => ({ ...n, view: `osd-${osdState.module}` }));
    setOsdState(s => ({ ...s, score: null }));
  };
  const backFromOSD = () => {
    setNav(n => ({ ...n, view: "osd-hub" }));
    setOsdState({ level: osdState.level, module: null, score: null });
  };

  let content;
  switch (nav.view) {
    case "home":
      content = <Home onOpenLevel={(idx) => openLevel(idx)} onReview={openReview} onOpenOSD={openOSD} />;
      break;
    case "level":
      content = <Level levelIdx={nav.level} onBack={backFromLevel} onOpenLesson={openLesson} onOpenGame={openGame} onStartExam={startExam} />;
      break;
    case "lesson":
      content = <Lesson levelIdx={nav.level} lessonIdx={nav.lesson} onBack={backToLevel} />;
      break;
    case "game": {
      const Game = GAME_MAP[nav.game];
      content = <Game levelIdx={nav.level} onBack={backToLevel} onReplay={() => setNav(n => ({ ...n, view: "game", game: n.game }))} />;
      break;
    }
    case "exam":
      content = <Exam levelIdx={nav.level} onBack={backToLevel} />;
      break;
    case "review":
      content = <SmartReview onBack={backFromReview} />;
      break;
    case "osd-hub":
      content = <OSDHub onBack={goHome} onStartModule={startOSDModule} />;
      break;
    case "osd-sprechen":
      content = <SprechenExam level={osdState.level} onBack={backFromOSD} onComplete={completeOSDModule} />;
      break;
    case "osd-hören":
      content = <HörenExam level={osdState.level} onBack={backFromOSD} onComplete={completeOSDModule} />;
      break;
    case "osd-lesen":
      content = <LesenExam level={osdState.level} onBack={backFromOSD} onComplete={completeOSDModule} />;
      break;
    case "osd-schreiben":
      content = <SchreibenExam level={osdState.level} onBack={backFromOSD} onComplete={completeOSDModule} />;
      break;
    case "osd-result":
      content = <OSDResult level={osdState.level} module={osdState.module} score={osdState.score} onBack={goHome} onRetry={retryOSD} />;
      break;
    default:
      content = null;
  }

  return (
    <ToastProvider>
      <Header onHome={goHome} />
      <div className="bg-decor" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <main className="container app-container">
        <div key={nav.view + nav.level + nav.game + nav.lesson} className="view active">
          {content}
        </div>
      </main>
      <canvas id="confetti" className="confetti-canvas" />
    </ToastProvider>
  );
}
