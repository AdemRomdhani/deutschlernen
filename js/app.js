/* ==========================================================================
   DeutschLernen — Main App Controller
   ========================================================================== */

const STORAGE_KEY = "deutschlernen_progress_v1";

const state = {
  currentView: "home",
  currentLevel: null,
  currentLesson: null,
  flashIndex: 0,
  currentGame: null,
  progress: loadProgress()
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return {
    xp: 0,
    streak: 0,
    lastVisit: null,
    wordsLearned: 0,
    lessonsDone: [],
    lessonsSeen: [],
    gamesWon: [],
    examsPassed: 0,
    examScores: {},
    gameBests: {}
  };
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch (e) { /* ignore */ }
}

/* ---------------- Util helpers ---------------- */

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return Array.from(document.querySelectorAll(sel)); }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getLevel(index) { return LEVELS[index]; }

function levelIndex(code) { return LEVELS.findIndex(l => l.code === code); }

function getLevelProgress(idx) {
  const level = LEVELS[idx];
  const lessonsDone = level.lessons.filter((l, li) =>
    state.progress.lessonsDone.includes(levelKey(idx, li))).length;
  const total = level.lessons.length;
  const pct = Math.round((lessonsDone / total) * 100);
  return { lessonsDone, total, pct };
}

function levelKey(idx, lessonIdx) { return `${idx}-${lessonIdx}`; }

function isLevelUnlocked(idx) {
  if (idx === 0) return true;
  const req = LEVELS[idx].unlockRequirement;
  const prevIdx = idx - 1;
  const prev = getLevelProgress(prevIdx);
  return prev.pct / 100 >= req || idx === 0;
}

function isLessonDone(idx, li) {
  return state.progress.lessonsDone.includes(levelKey(idx, li));
}

function allWordsCount() {
  return LEVELS.reduce((sum, l) => sum + l.lessons.reduce((s, l2) => s + l2.words.length, 0), 0);
}

function totalLessons() {
  return LEVELS.reduce((s, l) => s + l.lessons.length, 0);
}

/* ---------------- Rendering: Home ---------------- */

function renderHome() {
  updateHeaderStats();
  renderJourney();
  renderBadges();

  $("#statWords").textContent = state.progress.wordsLearned;
  $("#statLessons").textContent = `${state.progress.lessonsDone.length}/${totalLessons()}`;
  $("#statExams").textContent = `${state.progress.examsPassed}/${LEVELS.length}`;
  $("#statLevel").textContent = currentUserLevel();
}

function currentUserLevel() {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (getLevelProgress(i).pct === 100 && state.progress.examScores[LEVELS[i].code] >= 70) {
      return LEVELS[i].code;
    }
  }
  return "A1";
}

function renderJourney() {
  const wrap = $("#journeyPath");
  wrap.innerHTML = "";
  LEVELS.forEach((level, idx) => {
    const { pct } = getLevelProgress(idx);
    const unlocked = isLevelUnlocked(idx);
    const completed = pct === 100;

    const station = document.createElement("div");
    station.className = "station" + (unlocked ? "" : " locked") + (completed ? " completed" : "");
    station.style.setProperty("--sc", level.color);
    station.style.setProperty("--sc2", level.color2);

    const icon = document.createElement("div");
    icon.className = "station-icon";
    icon.textContent = level.icon;

    const info = document.createElement("div");
    info.className = "station-info";
    info.innerHTML = `
      <div class="station-code">${level.code} · ${level.de}</div>
      <div class="station-name">المستوى ${level.name}</div>
      <div class="station-desc">${level.desc}</div>
    `;

    const right = document.createElement("div");
    right.className = "station-right";

    if (unlocked) {
      const ring = document.createElement("div");
      ring.className = "ring-wrap";
      const C = 2 * Math.PI * 26;
      ring.innerHTML = `
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle class="ring-bg" cx="30" cy="30" r="26"></circle>
          <circle class="ring-fg" cx="30" cy="30" r="26"
            stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct / 100)}"></circle>
        </svg>
        <span class="ring-pct">${pct}%</span>
      `;
      right.appendChild(ring);
      if (completed) {
        const done = document.createElement("div");
        done.className = "station-lock";
        done.style.color = "#22c55e";
        done.textContent = "✓";
        right.appendChild(done);
      }
    } else {
      const lock = document.createElement("div");
      lock.className = "station-lock";
      lock.textContent = "🔒";
      right.appendChild(lock);
    }

    station.appendChild(icon);
    station.appendChild(info);
    station.appendChild(right);

    if (unlocked) {
      station.addEventListener("click", () => openLevel(idx));
    }
    wrap.appendChild(station);
  });
}

function renderBadges() {
  const grid = $("#badgesGrid");
  grid.innerHTML = "";
  BADGES.forEach(badge => {
    const unlocked = badge.check(state.progress);
    const card = document.createElement("div");
    card.className = "badge-card" + (unlocked ? "" : " locked");
    card.innerHTML = `
      <span class="badge-icon">${badge.icon}</span>
      <div class="badge-name">${badge.name}</div>
      <div class="badge-desc">${badge.desc}</div>
    `;
    grid.appendChild(card);
  });
}

function updateHeaderStats() {
  $("#xpDisplay").textContent = state.progress.xp;
  $("#streakDisplay").textContent = state.progress.streak;
}

/* ---------------- Rendering: Level ---------------- */

function openLevel(idx) {
  if (!isLevelUnlocked(idx)) {
    toast("🔒 أكمل المستوى السابق أولاً!");
    return;
  }
  state.currentLevel = idx;
  showView("level");
  renderLevel();
}

function renderLevel() {
  const level = LEVELS[state.currentLevel];
  const idx = state.currentLevel;
  const { pct } = getLevelProgress(idx);

  const hero = $("#levelHero");
  hero.style.setProperty("--sc", level.color);
  hero.style.setProperty("--sc2", level.color2);
  hero.innerHTML = `
    <div class="lh-code">${level.code} · ${level.de}</div>
    <h2>${level.icon} المستوى ${level.name}</h2>
    <p>${level.desc}</p>
  `;

  setTab("lessons");
  renderLessonsTab();
  renderGamesTab();
  renderExamTab();
}

function setTab(name) {
  $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  $$(".tab-panel").forEach(p => p.classList.toggle("active", p.id === `tab-${name}`));
}

function renderLessonsTab() {
  const level = LEVELS[state.currentLevel];
  const panel = $("#tab-lessons");
  panel.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "lessons-grid";

  level.lessons.forEach((lesson, li) => {
    const done = isLessonDone(state.currentLevel, li);
    const seen = state.progress.lessonsSeen.includes(levelKey(state.currentLevel, li));
    const card = document.createElement("div");
    card.className = "lesson-card";
    card.style.setProperty("--sc", level.color);
    card.style.setProperty("--sc2", level.color2);
    card.innerHTML = `
      <span class="lc-icon">${lesson.icon}</span>
      <h3>${lesson.title}</h3>
      <p>${lesson.words.length} كلمة جديدة</p>
      <div class="lc-meta">
        <span class="lc-count">${done ? "" : seen ? "مكتمل جزئياً" : "ابدأ الآن"}</span>
        <span class="lc-done">${done ? "✓ مكتمل" : "تعلم →"}</span>
      </div>
    `;
    card.addEventListener("click", () => openLesson(li));
    grid.appendChild(card);
  });

  panel.appendChild(grid);
}

function renderGamesTab() {
  const level = LEVELS[state.currentLevel];
  const panel = $("#tab-games");
  const games = [
    { id: "match", icon: "🎯", name: "اختبر نفسك", desc: "طابق الكلمة الألمانية مع معناها العربي الصحيح", bestKey: `match_${level.code}` },
    { id: "memory", icon: "🧠", name: "لعبة الذاكرة", desc: "اقلب البطاقات واعثر على الأزواج المتطابقة", bestKey: `memory_${level.code}` },
    { id: "builder", icon: "🧩", name: "ابنِ الكلمة", desc: "رتّب الحروف لتكوين الكلمة الألمانية الصحيحة", bestKey: `builder_${level.code}` }
  ];
  panel.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "games-grid";
  games.forEach(g => {
    const best = state.progress.gameBests[g.bestKey];
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <span class="gc-icon">${g.icon}</span>
      <h3>${g.name}</h3>
      <p>${g.desc}</p>
      <div class="gc-best">${best !== undefined ? `أفضل نتيجة: ${best}` : "العب الآن"}</div>
    `;
    card.addEventListener("click", () => openGame(g.id));
    grid.appendChild(card);
  });
  panel.appendChild(grid);
}

function renderExamTab() {
  const level = LEVELS[state.currentLevel];
  const panel = $("#tab-exam");
  const score = state.progress.examScores[level.code];
  panel.innerHTML = "";
  const box = document.createElement("div");
  box.className = "exam-box";
  box.innerHTML = `
    <span class="ex-icon">📝</span>
    <h3>امتحان المستوى ${level.name}</h3>
    <p>اختبر كل ما تعلمته في هذا المستوى. 10 أسئلة متنوعة، النجاح بنسبة 70% أو أكثر.</p>
    <div class="exam-rule">
      ✅ 10 أسئلة &nbsp;·&nbsp; ⏱️ بدون وقت محدد &nbsp;·&nbsp; 🏆 احصل على 70% للنجاح
    </div>
    ${score !== undefined ? `<div class="gc-best" style="margin-bottom:14px;font-size:15px;">آخر نتيجة: ${score}% ${score >= 70 ? "🎉 ناجح" : "💪 حاول مجدداً"}</div>` : ""}
    <button class="btn btn-primary btn-lg" id="btnStartExam">ابدأ الامتحان</button>
  `;
  panel.appendChild(box);
  $("#btnStartExam").addEventListener("click", () => startExam());
}

/* ---------------- Rendering: Lesson (flashcards) ---------------- */

function openLesson(li) {
  state.currentLesson = li;
  state.flashIndex = 0;
  showView("lesson");
  renderLesson();
}

function renderLesson() {
  const level = LEVELS[state.currentLevel];
  const lesson = level.lessons[state.currentLesson];
  const idx = state.currentLevel;

  $("#lessonHead").innerHTML = `
    <h2>${lesson.icon} ${lesson.title}</h2>
    <p>اضغط على البطاقة لقلبها واستكشاف الكلمة</p>
  `;
  renderFlashcard();
  renderLessonNav();
}

function renderFlashcard() {
  const level = LEVELS[state.currentLevel];
  const lesson = level.lessons[state.currentLesson];
  const word = lesson.words[state.flashIndex];
  const total = lesson.words.length;

  $("#flashcardArena").innerHTML = `
    <div class="flashcard-progress">${state.flashIndex + 1} / ${total}</div>
    <div class="flashcard" id="flashcard">
      <div class="flashcard-face flashcard-front">
        <div class="fc-de">${word.de}</div>
        <div class="fc-pron">${word.pron}</div>
      </div>
      <div class="flashcard-face flashcard-back">
        <div class="fc-ar">${word.ar}</div>
        <div class="fc-hint">اضغط لإعادة القلب</div>
      </div>
    </div>
  `;

  const card = $("#flashcard");
  card.addEventListener("click", () => card.classList.toggle("flipped"));

  const arena = $("#flashcardArena");
  arena.style.setProperty("--sc", level.color);
  arena.style.setProperty("--sc2", level.color2);

  // mark word as seen / learned
  const key = levelKey(state.currentLevel, state.currentLesson);
  if (!state.progress.lessonsSeen.includes(key)) {
    state.progress.lessonsSeen.push(key);
  }
  const wordSet = new Set(state.progress.lessonsSeen);
  void wordSet;
  saveProgress();
}

function renderLessonNav() {
  const level = LEVELS[state.currentLevel];
  const lesson = level.lessons[state.currentLesson];
  const total = lesson.words.length;
  const isLast = state.flashIndex === total - 1;

  $("#lessonNav").innerHTML = `
    <button class="nav-arrow" id="btnPrev" ${state.flashIndex === 0 ? "disabled" : ""}>→</button>
    <button class="btn ${isLast ? "btn-primary" : "btn-ghost"}" id="btnNext">
      ${isLast ? "✓ إنهاء الدرس" : "التالي"}
    </button>
    <button class="nav-arrow" id="btnNext2" ${isLast ? "disabled" : ""}>←</button>
  `;

  $("#btnPrev").addEventListener("click", () => { state.flashIndex--; renderFlashcard(); renderLessonNav(); });
  $("#btnNext2").addEventListener("click", () => { state.flashIndex++; renderFlashcard(); renderLessonNav(); });
  $("#btnNext").addEventListener("click", () => {
    if (isLast) finishLesson();
    else { state.flashIndex++; renderFlashcard(); renderLessonNav(); }
  });
}

function finishLesson() {
  const level = LEVELS[state.currentLevel];
  const lesson = level.lessons[state.currentLesson];
  const key = levelKey(state.currentLevel, state.currentLesson);
  const levelIdx = state.currentLevel;

  if (!state.progress.lessonsDone.includes(key)) {
    state.progress.lessonsDone.push(key);
    state.progress.wordsLearned += lesson.words.length;
    state.progress.xp += 20;
    updateStreak();
    saveProgress();
    confettiBurst();
    toast(`🎉 أكملت الدرس! +20 XP`);
    checkBadges();
  } else {
    toast("📚 لقد أكملت هذا الدرس من قبل");
  }

  const { pct } = getLevelProgress(levelIdx);
  renderLessonComplete(lesson.title, pct, levelIdx);
}

function renderLessonComplete(title, pct, levelIdx) {
  $("#lessonHead").innerHTML = `<h2>🎉 أحسنت!</h2><p>أكملت درس «${title}» بنجاح</p>`;
  $("#flashcardArena").innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="font-size:64px;margin-bottom:10px;">${pct === 100 ? "🏆" : "🌟"}</div>
      <p style="color:var(--text-soft);margin-bottom:16px;">
        ${pct === 100 ? "أنهيت كل دروس هذا المستوى! أنت جاهز للامتحان." : `تقدمت في المستوى: ${pct}%`}
      </p>
      <button class="btn btn-primary" onclick="window.openLevel(${levelIdx})">العودة للمستوى</button>
    </div>
  `;
  $("#lessonNav").innerHTML = "";
}

/* ---------------- Games ---------------- */

function openGame(gameId) {
  state.currentGame = gameId;
  showView("game");
  renderGame();
}

function renderGame() {
  const level = LEVELS[state.currentLevel];
  const games = {
    match: { name: "🎯 اختبر نفسك", desc: "اختر المعنى العربي الصحيح للكلمة الألمانية" },
    memory: { name: "🧠 لعبة الذاكرة", desc: "اعثر على أزواج الكلمات المتطابقة" },
    builder: { name: "🧩 ابنِ الكلمة", desc: "رتّب الحروف لتكوين الكلمة الألمانية" }
  };
  const g = games[state.currentGame];
  $("#gameHead").innerHTML = `
    <h2>${g.name}</h2>
    <p>${g.desc}</p>
    <span class="game-score" id="gameScore"></span>
  `;

  const area = $("#gameArea");
  area.style.setProperty("--sc", level.color);
  area.style.setProperty("--sc2", level.color2);

  if (state.currentGame === "match") startMatchGame(area);
  else if (state.currentGame === "memory") startMemoryGame(area);
  else if (state.currentGame === "builder") startBuilderGame(area);
}

/* ---------------- Exam ---------------- */

function startExam() {
  showView("exam");
  const level = LEVELS[state.currentLevel];
  $("#examHead").innerHTML = `
    <h2>📝 امتحان المستوى ${level.name}</h2>
    <p>${level.code} · أجب عن 10 أسئلة</p>
  `;
  ExamRunner.start($("#examArea"), state.currentLevel);
}

/* ---------------- Results ---------------- */

function showResult(type, data) {
  showView("result");
  const card = $("#resultCard");

  if (type === "exam") {
    const { score, pass, xp, levelCode, levelName } = data;
    card.innerHTML = `
      <span class="result-icon">${pass ? "🎉" : "💪"}</span>
      <div class="result-xp">+${xp} XP</div>
      <div class="result-title">${pass ? "مبروك! نجحت في الامتحان" : "قريب جداً!"}</div>
      <div class="result-msg">${levelCode} · المستوى ${levelName}</div>
      <div class="result-gauge">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="78" fill="none" stroke="var(--border)" stroke-width="14"></circle>
          <circle cx="90" cy="90" r="78" fill="none" stroke="#2563eb" stroke-width="14"
            stroke-linecap="round" stroke-dasharray="490.2" stroke-dashoffset="${490.2 * (1 - score / 100)}"
            transform="rotate(-90 90 90)"></circle>
        </svg>
        <div class="result-score" style="position:absolute;inset:0;display:grid;place-items:center;font-size:38px;">${score}%</div>
      </div>
      <p class="result-msg">${pass ? "أنت جاهز للمستوى التالي!" : "راجع الدروس وأعد المحاولة، ستنجح!"}</p>
      <div class="result-actions">
        <button class="btn btn-primary" onclick="window.openLevel(${state.currentLevel})">العودة للمستوى</button>
        <button class="btn btn-ghost" id="btnRetryExam">إعادة الامتحان</button>
      </div>
    `;
    $("#btnRetryExam").addEventListener("click", () => startExam());
    $(".result-gauge").style.position = "relative";
  } else if (type === "game") {
    const { title, msg, xp } = data;
    card.innerHTML = `
      <span class="result-icon">🏆</span>
      <div class="result-xp">+${xp} XP</div>
      <div class="result-title">${title}</div>
      <p class="result-msg">${msg}</p>
      <div class="result-actions">
        <button class="btn btn-primary" onclick="window.openLevel(${state.currentLevel})">العودة للمستوى</button>
        <button class="btn btn-ghost" id="btnRetryGame">العب مجدداً</button>
      </div>
    `;
    $("#btnRetryGame").addEventListener("click", () => { state.currentGame && renderGame(); showView("game"); });
  }

  confettiBurst();
}

/* ---------------- Progress & Streak ---------------- */

function addXP(n) {
  state.progress.xp += n;
  saveProgress();
  updateHeaderStats();
}

function updateStreak() {
  const today = new Date().toDateString();
  if (state.progress.lastVisit === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.progress.lastVisit === yesterday) {
    state.progress.streak += 1;
  } else {
    state.progress.streak = 1;
  }
  state.progress.lastVisit = today;
  saveProgress();
}

function checkBadges() {
  BADGES.forEach(b => {
    if (b.check(state.progress)) {
      toast(`🏆 أحرزت شارة: ${b.name}!`);
    }
  });
}

/* ---------------- Toast ---------------- */

function toast(msg) {
  const wrap = $("#toastWrap");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 350);
  }, 2200);
}

/* ---------------- Confetti ---------------- */

function confettiBurst(count = 120) {
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const colors = ["#2563eb", "#7c3aed", "#ec4899", "#06b6d4", "#22c55e", "#f59e0b"];
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: 2 + Math.random() * 3.5,
      vx: -1.5 + Math.random() * 3,
      rot: Math.random() * Math.PI,
      vr: -0.15 + Math.random() * 0.3
    });
  }
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frames++;
    if (frames < 150) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}

/* ---------------- View switching ---------------- */

function showView(name) {
  $$(".view").forEach(v => v.classList.remove("active"));
  const views = { home: "view-home", level: "view-level", lesson: "view-lesson", game: "view-game", exam: "view-exam", result: "view-result" };
  $("#" + views[name]).classList.add("active");
  state.currentView = name;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- Expose for inline handlers ---------------- */

window.openLevel = openLevel;
window.renderGame = renderGame;

/* ---------------- Event wiring ---------------- */

function init() {
  updateStreak();

  $("#btnHome").addEventListener("click", () => { showView("home"); renderHome(); });
  $("#btnStartJourney").addEventListener("click", () => {
    const firstLocked = LEVELS.findIndex((l, i) => isLevelUnlocked(i));
    showView("home");
    renderHome();
    document.getElementById("journeyPath").scrollIntoView({ behavior: "smooth" });
    if (firstLocked > 0) openLevel(firstLocked - 1);
    else openLevel(0);
  });
  $("#btnExploreGames").addEventListener("click", () => {
    showView("home");
    renderHome();
    document.getElementById("journeyPath").scrollIntoView({ behavior: "smooth" });
    openLevel(0);
    setTab("games");
  });

  $("#btnTheme").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    $("#themeIcon").textContent = next === "dark" ? "☀️" : "🌙";
    localStorage.setItem("deutschlernen_theme", next);
  });

  const savedTheme = localStorage.getItem("deutschlernen_theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    $("#themeIcon").textContent = "☀️";
  }

  // back buttons
  $("#btnBackLevel").addEventListener("click", () => openLevel(state.currentLevel));
  $("#btnBackGame").addEventListener("click", () => { openLevel(state.currentLevel); setTab("games"); });
  $("#btnBackExam").addEventListener("click", () => { openLevel(state.currentLevel); setTab("exam"); });

  // tabs
  $$(".tab").forEach(t => t.addEventListener("click", () => setTab(t.dataset.tab)));

  renderHome();
}

document.addEventListener("DOMContentLoaded", init);
