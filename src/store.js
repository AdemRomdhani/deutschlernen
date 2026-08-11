/* ==========================================================================
   DeutschLernen — Progress store (localStorage + React sync)
   ========================================================================== */

import { useSyncExternalStore } from "react";
import { LEVELS, nextReviewInterval } from "./data.js";

const STORAGE_KEY = "deutschlernen_progress_v3";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return defaultProgress();
}

function defaultProgress() {
  return {
    xp: 0,
    streak: 0,
    lastVisit: null,
    wordsLearned: 0,
    lessonsDone: [],
    gamesWon: [],
    examsPassed: 0,
    examScores: {},
    gameBests: {},
    reviewWords: [],
    activity: {}
  };
}

let progress = load();
const listeners = new Set();

function emit() {
  listeners.forEach(l => l());
}

export function updateProgress(mutator) {
  const copy = JSON.parse(JSON.stringify(progress));
  mutator(copy);
  progress = copy;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { /* ignore */ }
  emit();
}

export function getProgress() {
  return progress;
}

export function subscribeProgress(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useProgress() {
  return useSyncExternalStore(subscribeProgress, getProgress);
}

/* ---------------- Derived helpers ---------------- */

export function levelProgress(progress, idx) {
  const level = LEVELS[idx];
  const done = level.lessons.filter((l, li) =>
    progress.lessonsDone.includes(levelKey(idx, li))).length;
  const total = level.lessons.length;
  return { lessonsDone: done, total, pct: Math.round((done / total) * 100) };
}

export function levelKey(idx, lessonIdx) {
  return `${idx}-${lessonIdx}`;
}

export function isLevelUnlocked(progress, idx) {
  if (idx === 0) return true;
  const req = LEVELS[idx].unlockRequirement;
  const prev = levelProgress(progress, idx - 1);
  return prev.pct / 100 >= req;
}

export function currentUserLevel(progress) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (levelProgress(progress, i).pct === 100 && (progress.examScores[LEVELS[i].code] || 0) >= 70) {
      return LEVELS[i].code;
    }
  }
  return "A1";
}

export function isLessonDone(progress, idx, li) {
  return progress.lessonsDone.includes(levelKey(idx, li));
}

/* ---------------- Streak & activity ---------------- */

export function recordStreak() {
  const today = new Date().toDateString();
  updateProgress(p => {
    if (p.lastVisit === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    p.streak = p.lastVisit === yesterday ? p.streak + 1 : 1;
    p.lastVisit = today;
  });
}

function recordActivity() {
  updateProgress(p => {
    const day = new Date().toISOString().slice(0, 10);
    p.activity = p.activity || {};
    p.activity[day] = (p.activity[day] || 0) + 1;
  });
}

/* ---------------- Lessons ---------------- */

export function completeLesson(idx, lessonIdx) {
  const level = LEVELS[idx];
  const lesson = level.lessons[lessonIdx];
  let firstTime = false;
  updateProgress(p => {
    const key = levelKey(idx, lessonIdx);
    if (!p.lessonsDone.includes(key)) {
      p.lessonsDone.push(key);
      p.wordsLearned += lesson.words.length;
      p.xp += 20;
      firstTime = true;
    }
  });
  recordStreak();
  recordActivity();
  return firstTime;
}

/* ---------------- Games ---------------- */

export function recordGameResult({ gameId, levelCode, metric, isBetter, won, xp }) {
  updateProgress(p => {
    if (won && !p.gamesWon.includes(gameId)) p.gamesWon.push(gameId);
    const key = `${gameId}_${levelCode}`;
    if (isBetter(p.gameBests[key])) p.gameBests[key] = metric;
    p.xp += xp;
  });
  recordStreak();
  recordActivity();
}

/* ---------------- Exams ---------------- */

export function recordExam(levelCode, score) {
  const pass = score >= 70;
  updateProgress(p => {
    const prev = p.examScores[levelCode];
    p.examScores[levelCode] = Math.max(score, prev || 0);
    if (pass && prev === undefined) p.examsPassed += 1;
    p.xp += pass ? 40 : 15;
  });
  recordStreak();
  recordActivity();
  return pass;
}

/* ---------------- Smart review (spaced repetition) ---------------- */

export function recordWrongWord(levelCode, word) {
  if (!word || !word.de) return;
  updateProgress(p => {
    p.reviewWords = p.reviewWords || [];
    const existing = p.reviewWords.find(w => w.de === word.de && w.levelCode === levelCode);
    if (existing) {
      existing.stage = 0;
      existing.addedAt = Date.now();
    } else {
      p.reviewWords.push({
        de: word.de, ar: word.ar, pron: word.pron,
        levelCode, stage: 0, addedAt: Date.now()
      });
    }
  });
}

export function getDueReviewWords() {
  const now = Date.now();
  return (getProgress().reviewWords || []).filter(w => {
    const interval = nextReviewInterval(w.stage);
    return now - w.addedAt >= interval * 86400000;
  });
}

export function reviewWordResult(levelCode, wordDe, correct) {
  updateProgress(p => {
    p.reviewWords = p.reviewWords || [];
    const w = p.reviewWords.find(x => x.de === wordDe && x.levelCode === levelCode);
    if (!w) return;
    w.addedAt = Date.now();
    w.stage = correct ? Math.min(w.stage + 1, REVIEW_MAX_STAGE) : 0;
  });
  if (correct) { recordStreak(); recordActivity(); }
}

const REVIEW_MAX_STAGE = 5;

export function clearReviewedWords(words) {
  updateProgress(p => {
    const keep = new Set((words || []).map(w => w.de + "|" + w.levelCode));
    p.reviewWords = (p.reviewWords || []).filter(w => !keep.has(w.de + "|" + w.levelCode));
  });
}
