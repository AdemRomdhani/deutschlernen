/* ==========================================================================
   DeutschLernen — Games (Match, Memory, Word Builder)
   ========================================================================== */

function getLevelWords(idx) {
  return LEVELS[idx].lessons.flatMap(l => l.words);
}

/* ---------------- Game: Match (choose correct meaning) ---------------- */

function startMatchGame(area) {
  const level = LEVELS[state.currentLevel];
  const words = getLevelWords(state.currentLevel);
  const questions = shuffle(words).slice(0, 8);
  let qIndex = 0;
  let correct = 0;
  let answered = false;

  const scoreEl = $("#gameScore");
  const key = `match_${level.code}`;

  function renderQ() {
    const q = questions[qIndex];
    const wrongPool = shuffle(words.filter(w => w.ar !== q.ar)).slice(0, 3);
    const options = shuffle([q, ...wrongPool]);
    answered = false;

    scoreEl.textContent = `السؤال ${qIndex + 1}/${questions.length} · النتيجة ${correct}`;
    area.innerHTML = `
      <div class="match-stage">
        <div class="match-prompt">
          <div class="mp-label">ما معنى هذه الكلمة؟</div>
          <div class="mp-word">${q.de}</div>
        </div>
        <div class="match-options">
          ${options.map((o, i) => `<button class="match-option" data-ar="${o.ar}">${o.ar}</button>`).join("")}
        </div>
      </div>
    `;

    $$(".match-option").forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const isCorrect = btn.dataset.ar === q.ar;
        $$(".match-option").forEach(b => {
          b.disabled = true;
          if (b.dataset.ar === q.ar) b.classList.add("correct");
          else if (b === btn && !isCorrect) b.classList.add("wrong");
        });
        if (isCorrect) {
          correct++;
          toast("✅ إجابة صحيحة!");
        } else {
          toast(`❌ الصحيح: ${q.ar}`);
        }
        setTimeout(next, 900);
      });
    });
  }

  function next() {
    qIndex++;
    if (qIndex < questions.length) {
      renderQ();
    } else {
      finishMatch(correct, questions.length, key, scoreEl, area);
    }
  }

  renderQ();
}

function finishMatch(correct, total, key, scoreEl, area) {
  const pct = Math.round((correct / total) * 100);
  const won = pct >= 70;
  const level = LEVELS[state.currentLevel];

  if (won && !state.progress.gamesWon.includes("match")) {
    state.progress.gamesWon.push("match");
  }
  const prevBest = state.progress.gameBests[key];
  if (prevBest === undefined || correct > prevBest) {
    state.progress.gameBests[key] = correct;
  }
  const isNewBest = prevBest === undefined || correct > prevBest;

  state.progress.xp += won ? 15 : 5;
  updateStreak();
  saveProgress();
  updateHeaderStats();

  scoreEl.textContent = "";
  area.innerHTML = `
    <div class="match-stage" style="text-align:center;">
      <div style="font-size:56px;margin-bottom:10px;">${won ? "🏆" : "💪"}</div>
      <h3 style="font-size:22px;font-weight:900;margin-bottom:8px;">
        ${won ? `رائع! ${correct}/${total} إجابة صحيحة` : `${correct}/${total} — قريب، حاول مجدداً!`}
      </h3>
      ${isNewBest ? `<div class="result-xp" style="margin:10px 0;">🎯 أفضل نتيجة جديدة!</div>` : ""}
      <p style="color:var(--text-soft);margin-bottom:18px;">${won ? `+15 XP · ${level.code}` : "+5 XP · تدرّب أكثر"}</p>
      <div class="result-actions" style="justify-content:center;display:flex;gap:10px;">
        <button class="btn btn-primary" onclick="window.renderGame()">العب مجدداً</button>
        <button class="btn btn-ghost" onclick="window.openLevel(${state.currentLevel})">العودة للمستوى</button>
      </div>
    </div>
  `;
  if (won) confettiBurst(70);
  checkBadges();
}

/* ---------------- Game: Memory ---------------- */

function startMemoryGame(area) {
  const level = LEVELS[state.currentLevel];
  const words = shuffle(getLevelWords(state.currentLevel)).slice(0, 6);
  const cards = shuffle(
    words.flatMap(w => [
      { type: "de", text: w.de, id: w.de },
      { type: "ar", text: w.ar, id: w.de }
    ])
  );

  let first = null;
  let lock = false;
  let matched = 0;
  let moves = 0;
  const totalPairs = words.length;
  const key = `memory_${level.code}`;
  const scoreEl = $("#gameScore");

  function bestMoves() {
    return state.progress.gameBests[key];
  }

  function updateScore() {
    scoreEl.textContent = `التحركات: ${moves} · الأزواج: ${matched}/${totalPairs} ${bestMoves() !== undefined ? `· الأفضل: ${bestMoves()}` : ""}`;
  }

  updateScore();
  area.innerHTML = `<div class="memory-grid">${cards.map((c, i) => `
    <button class="memory-card" data-i="${i}">
      <span class="mem-face mem-front">❓</span>
      <span class="mem-face mem-back" ${c.text.length > 10 ? `style="font-size:13px"` : ""}>${c.text}</span>
    </button>`).join("")}</div>`;

  const grid = area.querySelector(".memory-grid");
  const btns = $$(".memory-card");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (lock || btn.classList.contains("revealed") || btn.classList.contains("matched")) return;
      btn.classList.add("revealed");
      moves++;
      updateScore();

      if (!first) {
        first = btn;
      } else {
        const a = cards[first.dataset.i];
        const b = cards[btn.dataset.i];
        lock = true;

        if (a.id === b.id) {
          matched++;
          first.classList.add("matched");
          btn.classList.add("matched");
          first = null;
          lock = false;
          updateScore();
          if (matched === totalPairs) {
            setTimeout(() => finishMemory(moves, totalPairs, key, scoreEl, area), 600);
          }
        } else {
          const f = first;
          setTimeout(() => {
            f.classList.remove("revealed");
            btn.classList.remove("revealed");
            first = null;
            lock = false;
          }, 900);
        }
      }
    });
  });
}

function finishMemory(moves, totalPairs, key, scoreEl, area) {
  const won = moves <= totalPairs * 2;
  const prevBest = state.progress.gameBests[key];
  const isNewBest = prevBest === undefined || moves < prevBest;
  if (isNewBest) state.progress.gameBests[key] = moves;
  if (won && !state.progress.gamesWon.includes("memory")) {
    state.progress.gamesWon.push("memory");
  }

  const xp = won ? 15 : 8;
  state.progress.xp += xp;
  updateStreak();
  saveProgress();
  updateHeaderStats();

  scoreEl.textContent = "";
  area.innerHTML = `
    <div class="memory-grid" style="text-align:center;display:block;">
      <div style="font-size:56px;margin-bottom:10px;">${won ? "🏆" : "💪"}</div>
      <h3 style="font-size:22px;font-weight:900;margin-bottom:8px;">أنهيت اللعبة في ${moves} تحرّك!</h3>
      ${isNewBest ? `<div class="result-xp" style="margin:10px 0;">🏅 رقم قياسي جديد!</div>` : ""}
      <p style="color:var(--text-soft);margin-bottom:18px;">${won ? `+15 XP · ممتاز!` : "+8 XP · جرّب مرة أخرى"}</p>
      <div class="result-actions" style="justify-content:center;display:flex;gap:10px;">
        <button class="btn btn-primary" onclick="window.renderGame()">العب مجدداً</button>
        <button class="btn btn-ghost" onclick="window.openLevel(${state.currentLevel})">العودة للمستوى</button>
      </div>
    </div>
  `;
  if (won) confettiBurst(70);
  checkBadges();
}

/* ---------------- Game: Word Builder ---------------- */

function startBuilderGame(area) {
  const level = LEVELS[state.currentLevel];
  const words = getLevelWords(state.currentLevel);
  const candidates = words.filter(w => /^[a-zA-ZäöüÄÖÜß]+$/.test(w.de) && w.de.length >= 3);
  const pool = shuffle(candidates).slice(0, 5);
  let qIndex = 0;
  let correct = 0;
  let answered = false;
  const key = `builder_${level.code}`;
  const scoreEl = $("#gameScore");

  function lettersOf(de) {
    return de.split("");
  }

  function renderQ() {
    const q = pool[qIndex];
    answered = false;
    const letters = shuffle(lettersOf(q.de));
    scoreEl.textContent = `الكلمة ${qIndex + 1}/${pool.length} · النتيجة ${correct}`;

    area.innerHTML = `
      <div class="builder-stage">
        <div class="builder-prompt">
          <div class="bp-ar">${q.ar}</div>
          <div class="bp-pron">${q.pron}</div>
        </div>
        <div class="builder-slots" id="builderSlots"></div>
        <div class="builder-letters" id="builderLetters">
          ${letters.map((l, i) => `<button class="builder-letter" data-l="${i}" data-val="${l}">${l}</button>`).join("")}
        </div>
        <div class="builder-actions">
          <button class="btn btn-ghost" id="btnClear">↺ مسح</button>
          <button class="btn btn-primary" id="btnCheck">✓ تحقق</button>
        </div>
        <div class="builder-feedback" id="builderFeedback"></div>
      </div>
    `;

    const slotsEl = $("#builderSlots");
    const lettersEl = $("#builderLetters");
    const feedbackEl = $("#builderFeedback");
    const used = new Array(letters.length).fill(null);

    // create slots based on word length
    q.de.split("").forEach(() => {
      const slot = document.createElement("div");
      slot.className = "builder-slot";
      slot.dataset.fill = "";
      slotsEl.appendChild(slot);
    });
    const slots = Array.from(slotsEl.children);

    function refreshLetters() {
      Array.from(lettersEl.children).forEach((btn, i) => {
        btn.classList.toggle("used", used[i] !== null);
      });
    }

    lettersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".builder-letter");
      if (!btn || answered) return;
      const idx = Number(btn.dataset.l);
      if (used[idx] !== null) return;

      // find first empty slot
      const emptyIdx = slots.findIndex(s => !s.dataset.fill);
      if (emptyIdx === -1) return;

      used[idx] = emptyIdx;
      slots[emptyIdx].dataset.fill = idx;
      slots[emptyIdx].textContent = btn.dataset.val;
      slots[emptyIdx].classList.add("filled");
      refreshLetters();
    });

    slotsEl.addEventListener("click", (e) => {
      const slot = e.target.closest(".builder-slot");
      if (!slot || answered) return;
      if (slot.dataset.fill === "") return;
      const idx = Number(slot.dataset.fill);
      used[idx] = null;
      slot.dataset.fill = "";
      slot.textContent = "";
      slot.classList.remove("filled");
      refreshLetters();
    });

    $("#btnClear").addEventListener("click", () => {
      if (answered) return;
      used.fill(null);
      slots.forEach(s => { s.dataset.fill = ""; s.textContent = ""; s.classList.remove("filled"); });
      refreshLetters();
    });

    $("#btnCheck").addEventListener("click", () => {
      if (answered) return;
      const built = slots.map(s => s.textContent).join("");
      answered = true;
      if (built.toLowerCase() === q.de.toLowerCase()) {
        correct++;
        feedbackEl.textContent = "✅ أحسنت! صحيح تماماً";
        feedbackEl.className = "builder-feedback ok";
        toast("✅ إجابة صحيحة!");
        setTimeout(next, 1000);
      } else {
        feedbackEl.innerHTML = `❌ الصحيح هو: <span style="font-family:var(--font-la);direction:ltr;display:inline-block;">${q.de}</span>`;
        feedbackEl.className = "builder-feedback bad";
        setTimeout(next, 1600);
      }
    });
  }

  function next() {
    qIndex++;
    if (qIndex < pool.length) {
      renderQ();
    } else {
      finishBuilder(correct, pool.length, key, scoreEl, area);
    }
  }

  renderQ();
}

function finishBuilder(correct, total, key, scoreEl, area) {
  const won = correct >= Math.ceil(total * 0.7);
  const prevBest = state.progress.gameBests[key];
  const isNewBest = prevBest === undefined || correct > prevBest;
  if (isNewBest) state.progress.gameBests[key] = correct;
  if (won && !state.progress.gamesWon.includes("builder")) {
    state.progress.gamesWon.push("builder");
  }

  const xp = won ? 15 : 5;
  state.progress.xp += xp;
  updateStreak();
  saveProgress();
  updateHeaderStats();

  scoreEl.textContent = "";
  area.innerHTML = `
    <div class="builder-stage">
      <div style="font-size:56px;margin-bottom:10px;">${won ? "🏆" : "💪"}</div>
      <h3 style="font-size:22px;font-weight:900;margin-bottom:8px;">
        ${won ? `${correct}/${total} كلمات صحيحة!` : `${correct}/${total} — واصل التدريب!`}
      </h3>
      ${isNewBest ? `<div class="result-xp" style="margin:10px 0;">🎯 أفضل نتيجة جديدة!</div>` : ""}
      <p style="color:var(--text-soft);margin-bottom:18px;">${won ? `+15 XP · ممتاز!` : "+5 XP · لا تستسلم"}</p>
      <div class="result-actions" style="justify-content:center;display:flex;gap:10px;">
        <button class="btn btn-primary" onclick="window.renderGame()">العب مجدداً</button>
        <button class="btn btn-ghost" onclick="window.openLevel(${state.currentLevel})">العودة للمستوى</button>
      </div>
    </div>
  `;
  if (won) confettiBurst(70);
  checkBadges();
}
