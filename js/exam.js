/* ==========================================================================
   DeutschLernen — Exam Runner
   ========================================================================== */

const ExamRunner = {
  start(area, levelIdx) {
    const level = LEVELS[levelIdx];
    const words = getLevelWords(levelIdx);
    const questions = this.buildQuestions(words, levelIdx);
    let qIndex = 0;
    let correct = 0;
    let answered = false;

    function render() {
      const q = questions[qIndex];
      const opts = shuffle(q.options);
      answered = false;

      area.innerHTML = `
        <div class="exam-progress-track">
          ${questions.map((_, i) => `<div class="exam-dot ${i < qIndex ? "done" : ""}"></div>`).join("")}
        </div>
        <div class="exam-qcard">
          <div class="exam-qlabel">السؤال ${qIndex + 1} من ${questions.length} ${q.type === "de2ar" ? "· ترجمة إلى العربية" : q.type === "ar2de" ? "· ترجمة إلى الألمانية" : "· معنى العبارة"}</div>
          <div class="exam-question">${q.prompt}</div>
          <div class="exam-options">
            ${opts.map((o, i) => `
              <button class="exam-option" data-val="${encodeURIComponent(o)}">
                <span class="eo-letter">${["أ", "ب", "ج", "د"][i]}</span>
                <span>${o}</span>
              </button>`).join("")}
          </div>
          <div class="exam-answer" id="examAnswer"></div>
        </div>
        <div style="text-align:center;">
          <button class="btn btn-ghost" id="btnSkipExam" ${qIndex === questions.length - 1 ? "" : ""}>تخطي</button>
        </div>
      `;

      $$(".exam-option").forEach(btn => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const val = decodeURIComponent(btn.dataset.val);
          const isCorrect = val === q.answer;
          const answerEl = $("#examAnswer");

          $$(".exam-option").forEach(b => {
            b.disabled = true;
            if (decodeURIComponent(b.dataset.val) === q.answer) b.classList.add("correct");
            else if (b === btn && !isCorrect) b.classList.add("wrong");
          });

          answerEl.classList.add("show");
          if (isCorrect) {
            correct++;
            answerEl.className = "exam-answer show good";
            answerEl.textContent = "✅ إجابة صحيحة!";
          } else {
            answerEl.className = "exam-answer show bad";
            answerEl.textContent = `❌ الإجابة الصحيحة: ${q.answer}`;
          }
          setTimeout(() => { qIndex++; if (qIndex < questions.length) render(); else finish(); }, 1100);
        });
      });

      $("#btnSkipExam").addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const answerEl = $("#examAnswer");
        answerEl.classList.add("show");
        answerEl.className = "exam-answer show bad";
        answerEl.textContent = `الإجابة الصحيحة: ${q.answer}`;
        $$(".exam-option").forEach(b => {
          b.disabled = true;
          if (decodeURIComponent(b.dataset.val) === q.answer) b.classList.add("correct");
        });
        setTimeout(() => { qIndex++; if (qIndex < questions.length) render(); else finish(); }, 1100);
      });
    }

    function finish() {
      const score = Math.round((correct / questions.length) * 100);
      const pass = score >= 70;
      const xp = pass ? 40 : 15;
      const isFirst = state.progress.examScores[level.code] === undefined;
      const improved = !pass && (state.progress.examScores[level.code] === undefined || score > state.progress.examScores[level.code]);

      state.progress.examScores[level.code] = Math.max(score, state.progress.examScores[level.code] || 0);
      state.progress.xp += xp;
      updateStreak();
      saveProgress();
      updateHeaderStats();

      if (pass && isFirst) {
        state.progress.examsPassed += 1;
        saveProgress();
        checkBadges();
      } else if (pass) {
        checkBadges();
      }

      window.showResult("exam", {
        score, pass, xp,
        levelCode: level.code,
        levelName: level.name
      });
      void improved;
    }

    render();
  },

  buildQuestions(words, levelIdx) {
    const level = LEVELS[levelIdx];
    const qs = [];
    const allWords = LEVELS.slice(0, levelIdx + 1).flatMap(l => l.lessons.flatMap(ls => ls.words));

    // Type 1: German → Arabic (choose correct meaning)
    const type1Pool = shuffle(words);
    for (const w of type1Pool) {
      if (qs.length >= 5) break;
      const wrong = this.pickWrong(allWords, w, "ar");
      qs.push({
        type: "de2ar",
        prompt: `ما معنى الكلمة <span class="eq-de">"${w.de}"</span>؟`,
        answer: w.ar,
        options: [w.ar, ...wrong]
      });
    }

    // Type 2: Arabic → German (choose correct German word)
    const type2Pool = shuffle(words);
    for (const w of type2Pool) {
      if (qs.length >= 9) break;
      const wrong = this.pickWrong(allWords, w, "de");
      qs.push({
        type: "ar2de",
        prompt: `ما الترجمة الألمانية لكلمة "${w.ar}"؟`,
        answer: w.de,
        options: [w.de, ...wrong]
      });
    }

    // Type 3: fill-in-style via pronunciation (choose matching German for transliteration)
    const type3Pool = shuffle(words);
    for (const w of type3Pool) {
      if (qs.length >= 10) break;
      const wrong = this.pickWrong(allWords, w, "de");
      qs.push({
        type: "pron",
        prompt: `تُنطق "${w.pron}" — أي كلمة ألمانية تقصد؟`,
        answer: w.de,
        options: [w.de, ...wrong]
      });
    }

    return shuffle(qs).slice(0, 10);
  },

  pickWrong(pool, correctWord, field) {
    const opts = shuffle(pool.filter(w => w !== correctWord)).slice(0, 3).map(w => w[field]);
    // dedupe and top up if needed
    const uniq = [];
    for (const o of opts) if (!uniq.includes(o)) uniq.push(o);
    while (uniq.length < 3) {
      const extra = pool[Math.floor(Math.random() * pool.length)][field];
      if (extra !== correctWord[field] && !uniq.includes(extra)) uniq.push(extra);
    }
    return uniq;
  }
};
