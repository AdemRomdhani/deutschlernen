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
import Dictation from "./components/Dictation.jsx";
import GrammarDrills from "./components/GrammarDrills.jsx";
import DailyChallenge from "./components/DailyChallenge.jsx";
import PronunciationCoach from "./components/PronunciationCoach.jsx";
import Flashcards from "./components/Flashcards.jsx";
import SkillTree from "./components/SkillTree.jsx";
import Analytics from "./components/Analytics.jsx";
import ContextLearning from "./components/ContextLearning.jsx";
import CulturalContext from "./components/CulturalContext.jsx";
import BusinessGerman from "./components/BusinessGerman.jsx";
import ShadowingTechnique from "./components/ShadowingTechnique.jsx";
import RealWorldContent from "./components/RealWorldContent.jsx";
import MatchGame from "./components/games/MatchGame.jsx";
import MemoryGame from "./components/games/MemoryGame.jsx";
import BuilderGame from "./components/games/BuilderGame.jsx";
import ListeningGame from "./components/games/ListeningGame.jsx";
import TrueFalseGame from "./components/games/TrueFalseGame.jsx";
import SentenceBuilder from "./components/games/SentenceBuilder.jsx";
import Dialogue from "./components/games/Dialogue.jsx";
import Pronounce from "./components/games/Pronounce.jsx";
import ConjugationGame from "./components/games/ConjugationGame.jsx";
import CaseChallenge from "./components/games/CaseChallenge.jsx";
import WordOrderPuzzle from "./components/games/WordOrderPuzzle.jsx";
import OppositesGame from "./components/games/OppositesGame.jsx";
import PluralFormsGame from "./components/games/PluralFormsGame.jsx";
import MinimalPairs from "./components/MinimalPairs.jsx";
import IdiomsGame from "./components/IdiomsGame.jsx";
import NewspaperReading from "./components/NewspaperReading.jsx";
import KaraokeMode from "./components/KaraokeMode.jsx";
import Phrasebook from "./components/Phrasebook.jsx";
import CulturalNotes from "./components/CulturalNotes.jsx";
import AITutorChat from "./components/AITutorChat.jsx";
import PeerReview from "./components/PeerReview.jsx";
import CustomWordLists from "./components/CustomWordLists.jsx";
import ProgressReport from "./components/ProgressReport.jsx";
import MistakeTracker from "./components/MistakeTracker.jsx";
import StudyGroups from "./components/StudyGroups.jsx";
import { LEVELS } from "./data.js";
import { recordStreak, isLevelUnlocked, recordOSDExam, recordExam } from "./store.js";

const GAME_MAP = {
  match: MatchGame,
  memory: MemoryGame,
  builder: BuilderGame,
  listening: ListeningGame,
  truefalse: TrueFalseGame,
  sentence: SentenceBuilder,
  dialogue: Dialogue,
  pronounce: Pronounce,
  conjugation: ConjugationGame,
  casechallenge: CaseChallenge,
  wordorder: WordOrderPuzzle,
  opposites: OppositesGame,
  plurals: PluralFormsGame
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

  // Training navigation
  const openTraining = () => setNav(n => ({ ...n, view: "training" }));
  const openDictation = () => setNav(n => ({ ...n, view: "dictation" }));
  const openGrammar = () => setNav(n => ({ ...n, view: "grammar" }));
  const openDaily = () => setNav(n => ({ ...n, view: "daily" }));
  const openPronunciation = () => setNav(n => ({ ...n, view: "pronunciation" }));
  const openFlashcards = () => setNav(n => ({ ...n, view: "flashcards" }));
  const openSkillTree = () => setNav(n => ({ ...n, view: "skill-tree" }));
  const openAnalytics = () => setNav(n => ({ ...n, view: "analytics" }));
  const openContext = () => setNav(n => ({ ...n, view: "context" }));
  const openCultural = () => setNav(n => ({ ...n, view: "cultural" }));
  const openBusiness = () => setNav(n => ({ ...n, view: "business" }));
  const openShadowing = () => setNav(n => ({ ...n, view: "shadowing" }));
  const openRealWorld = () => setNav(n => ({ ...n, view: "realworld" }));
  const backToTraining = () => setNav(n => ({ ...n, view: "training" }));
  const backFromTraining = () => goHome();

  // New feature navigation
  const openMinimalPairs = () => setNav(n => ({ ...n, view: "minimal-pairs" }));
  const openIdioms = () => setNav(n => ({ ...n, view: "idioms" }));
  const openNewspaper = () => setNav(n => ({ ...n, view: "newspaper" }));
  const openKaraoke = () => setNav(n => ({ ...n, view: "karaoke" }));
  const openPhrasebook = () => setNav(n => ({ ...n, view: "phrasebook" }));
  const openCulturalNotes = () => setNav(n => ({ ...n, view: "cultural-notes" }));
  const openAITutor = () => setNav(n => ({ ...n, view: "ai-tutor" }));
  const openPeerReview = () => setNav(n => ({ ...n, view: "peer-review" }));
  const openCustomLists = () => setNav(n => ({ ...n, view: "custom-lists" }));
  const openProgressReport = () => setNav(n => ({ ...n, view: "progress-report" }));
  const openMistakes = () => setNav(n => ({ ...n, view: "mistake-tracker" }));
  const openStudyGroups = () => setNav(n => ({ ...n, view: "study-groups" }));

  let content;
  switch (nav.view) {
    case "home":
      content = <Home onOpenLevel={(idx) => openLevel(idx)} onReview={openReview} onOpenOSD={openOSD} onOpenTraining={openTraining} onOpenSkillTree={openSkillTree} onOpenAnalytics={openAnalytics} onOpenCultural={openCultural} onOpenBusiness={openBusiness} onOpenShadowing={openShadowing} onOpenRealWorld={openRealWorld} />;
      break;
    case "training":
      content = (
        <div className="training-hub">
          <button className="btn-back" onClick={backFromTraining}>← رجوع</button>
          <h2>🏋️ التدريبات</h2>
          <p>اختر تدريباً لتحسين مهاراتك</p>
          <div className="training-grid">
            <div className="training-card" onClick={openDictation}>
              <span className="training-icon">🎧</span>
              <span className="training-name">Dictation</span>
              <span className="training-ar">الكتابة بالاستماع</span>
            </div>
            <div className="training-card" onClick={openGrammar}>
              <span className="training-icon">📝</span>
              <span className="training-name">Grammar Drills</span>
              <span className="training-ar">تدريبات القواعد</span>
            </div>
            <div className="training-card" onClick={openDaily}>
              <span className="training-icon">📅</span>
              <span className="training-name">Daily Challenge</span>
              <span className="training-ar">تحدي اليوم</span>
            </div>
            <div className="training-card" onClick={openPronunciation}>
              <span className="training-icon">🎤</span>
              <span className="training-name">Pronunciation</span>
              <span className="training-ar">تدريب النطق</span>
            </div>
            <div className="training-card" onClick={openFlashcards}>
              <span className="training-icon">🃏</span>
              <span className="training-name">Flashcards</span>
              <span className="training-ar">بطاقات المراجعة</span>
            </div>
            <div className="training-card" onClick={openContext}>
              <span className="training-icon">📖</span>
              <span className="training-name">Context Learning</span>
              <span className="training-ar">تعلم السياق</span>
            </div>
            <div className="training-card" onClick={openShadowing}>
              <span className="training-icon">🗣️</span>
              <span className="training-name">Shadowing</span>
              <span className="training-ar">تقنية الشادوينج</span>
            </div>
            <div className="training-card" onClick={openRealWorld}>
              <span className="training-icon">📰</span>
              <span className="training-name">Real Content</span>
              <span className="training-ar">محتوى حقيقي</span>
            </div>
            <div className="training-card" onClick={openBusiness}>
              <span className="training-icon">💼</span>
              <span className="training-name">Business German</span>
              <span className="training-ar">الألمانية المهنية</span>
            </div>
            <div className="training-card" onClick={openMinimalPairs}>
              <span className="training-icon">🔊</span>
              <span className="training-name">Minimal Pairs</span>
              <span className="training-ar">أزواج الأصوات</span>
            </div>
            <div className="training-card" onClick={openIdioms}>
              <span className="training-icon">💬</span>
              <span className="training-name">Idioms & Sayings</span>
              <span className="training-ar">الأمثال والأقوال</span>
            </div>
            <div className="training-card" onClick={openNewspaper}>
              <span className="training-icon">📰</span>
              <span className="training-name">Newspaper Reading</span>
              <span className="training-ar">قراءة جرائد</span>
            </div>
            <div className="training-card" onClick={openKaraoke}>
              <span className="training-icon">🎤</span>
              <span className="training-name">Karaoke Mode</span>
              <span className="training-ar">وضع الكاريوكي</span>
            </div>
            <div className="training-card" onClick={openPhrasebook}>
              <span className="training-icon">📚</span>
              <span className="training-name">Phrasebook</span>
              <span className="training-ar">دليل العبارات</span>
            </div>
            <div className="training-card" onClick={openCulturalNotes}>
              <span className="training-icon">🇩🇪</span>
              <span className="training-name">Cultural Notes</span>
              <span className="training-ar">ملاحظات ثقافية</span>
            </div>
            <div className="training-card" onClick={openAITutor}>
              <span className="training-icon">🤖</span>
              <span className="training-name">AI Tutor</span>
              <span className="training-ar">المدرس الذكي</span>
            </div>
            <div className="training-card" onClick={openPeerReview}>
              <span className="training-icon">✍️</span>
              <span className="training-name">Writing Practice</span>
              <span className="training-ar">تدريب الكتابة</span>
            </div>
            <div className="training-card" onClick={openCustomLists}>
              <span className="training-icon">📋</span>
              <span className="training-name">Custom Lists</span>
              <span className="training-ar">قوائم مخصصة</span>
            </div>
            <div className="training-card" onClick={openProgressReport}>
              <span className="training-icon">📊</span>
              <span className="training-name">Progress Report</span>
              <span className="training-ar">تقرير التقدم</span>
            </div>
            <div className="training-card" onClick={openMistakes}>
              <span className="training-icon">❌</span>
              <span className="training-name">Mistake Tracker</span>
              <span className="training-ar">تتبع الأخطاء</span>
            </div>
            <div className="training-card" onClick={openStudyGroups}>
              <span className="training-icon">👥</span>
              <span className="training-name">Study Groups</span>
              <span className="training-ar">مجموعات الدراسة</span>
            </div>
          </div>
        </div>
      );
      break;
    case "level":
      content = <Level levelIdx={nav.level} onBack={backFromLevel} onOpenLesson={openLesson} onOpenGame={openGame} onStartExam={startExam} />;
      break;
    case "lesson":
      content = <Lesson levelIdx={nav.level} lessonIdx={nav.lesson} onBack={backToLevel} />;
      break;
    case "game": {
      const Game = GAME_MAP[nav.game];
      content = Game ? <Game levelIdx={nav.level} onBack={backToLevel} onReplay={() => setNav(n => ({ ...n, view: "game", game: n.game }))} /> : null;
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
    case "dictation":
      content = <Dictation levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => { recordExam("dictation", score); goHome(); }} />;
      break;
    case "grammar":
      content = <GrammarDrills levelIdx={nav.level} onBack={backToTraining} onComplete={(score, xp) => { recordExam("grammar", score); goHome(); }} />;
      break;
    case "daily":
      content = <DailyChallenge levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => { recordExam("daily", score); goHome(); }} />;
      break;
    case "pronunciation":
      content = <PronunciationCoach levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => { recordExam("pronunciation", score); goHome(); }} />;
      break;
    case "flashcards":
      content = <Flashcards levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => { recordExam("flashcards", score); goHome(); }} />;
      break;
    case "skill-tree":
      content = <SkillTree onBack={goHome} onOpenLevel={openLevel} />;
      break;
    case "analytics":
      content = <Analytics onBack={goHome} />;
      break;
    case "context":
      content = <ContextLearning levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => goHome()} />;
      break;
    case "cultural":
      content = <CulturalContext onBack={goHome} />;
      break;
    case "business":
      content = <BusinessGerman level={LEVELS[nav.level]?.code} goBack={backToTraining} />;
      break;
    case "shadowing":
      content = <ShadowingTechnique level={LEVELS[nav.level]?.code} goBack={backToTraining} />;
      break;
    case "realworld":
      content = <RealWorldContent level={LEVELS[nav.level]?.code} goBack={backToTraining} />;
      break;
    case "minimal-pairs":
      content = <MinimalPairs levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => goHome()} />;
      break;
    case "idioms":
      content = <IdiomsGame levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => goHome()} />;
      break;
    case "newspaper":
      content = <NewspaperReading levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => goHome()} />;
      break;
    case "karaoke":
      content = <KaraokeMode levelIdx={nav.level} onBack={backToTraining} onComplete={() => goHome()} />;
      break;
    case "phrasebook":
      content = <Phrasebook onBack={backToTraining} />;
      break;
    case "cultural-notes":
      content = <CulturalNotes onBack={goHome} />;
      break;
    case "ai-tutor":
      content = <AITutorChat onBack={backToTraining} />;
      break;
    case "peer-review":
      content = <PeerReview levelIdx={nav.level} onBack={backToTraining} onComplete={(score) => goHome()} />;
      break;
    case "custom-lists":
      content = <CustomWordLists onBack={backToTraining} />;
      break;
    case "progress-report":
      content = <ProgressReport onBack={goHome} />;
      break;
    case "mistake-tracker":
      content = <MistakeTracker onBack={backToTraining} />;
      break;
    case "study-groups":
      content = <StudyGroups onBack={goHome} />;
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
