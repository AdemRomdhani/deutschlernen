/* ==========================================================================
   DeutschLernen — German Pronunciation
   Primary: high-quality German TTS (Google Translate audio, native voice)
   Fallback: Web Speech API (speechSynthesis, works offline)
   ========================================================================== */

const TTS_BASE = "https://translate.google.com/translate_tts";
const TTS_CLIENT = "tw-ob";

let currentAudio = null;
let germanVoice = null;

function ttsUrl(text) {
  return `${TTS_BASE}?ie=UTF-8&client=${TTS_CLIENT}&tl=de&q=${encodeURIComponent(text)}`;
}

/* ---------------- Audio (primary) ---------------- */

function playAudio(text, onDone) {
  return new Promise((resolve) => {
    let audio;
    try {
      audio = new Audio();
      audio.referrerPolicy = "no-referrer";
      audio.src = ttsUrl(text);
      audio.preload = "auto";
    } catch (e) {
      resolve(false);
      return;
    }
    currentAudio = audio;
    const cleanup = (ok) => {
      audio.onended = null;
      audio.onerror = null;
      audio.onpause = null;
      if (currentAudio === audio) currentAudio = null;
      if (onDone) onDone(ok);
      resolve(ok);
    };
    audio.onended = () => cleanup(true);
    audio.onerror = () => cleanup(false);
    audio.onpause = () => { if (audio.paused && !audio.ended) cleanup(false); };
    const p = audio.play();
    if (p && p.catch) {
      p.catch(() => cleanup(false));
    }
  });
}

/* ---------------- Web Speech (fallback) ---------------- */

function loadVoices() {
  try {
    if (!("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    germanVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("de")) || null;
  } catch (e) {
    germanVoice = null;
  }
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  try {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  } catch (e) { /* ignore */ }
}

function hasGermanVoice() {
  return typeof window !== "undefined" && "speechSynthesis" in window && !!germanVoice;
}

function playSpeech(text, onDone) {
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "de-DE";
    if (germanVoice) utter.voice = germanVoice;
    utter.rate = 0.85;
    utter.pitch = 1;
    if (onDone) {
      utter.onend = () => onDone(true);
      utter.onerror = () => onDone(false);
    }
    window.speechSynthesis.speak(utter);
    return true;
  } catch (e) {
    if (onDone) onDone(false);
    return false;
  }
}

/* ---------------- Public API ---------------- */

/**
 * Speak a German word or sentence with the correct voice.
 * Returns true if playback started.
 */
export function speakGerman(text, onDone) {
  if (!text) {
    if (onDone) onDone(false);
    return false;
  }
  stopSpeaking();

  // Primary: high-quality German audio (native pronunciation)
  if (typeof Audio !== "undefined") {
    playAudio(text, (ok) => {
      if (ok) {
        if (onDone) onDone(true);
      } else if (hasGermanVoice()) {
        playSpeech(text, onDone);
      } else if (onDone) {
        onDone(false);
      }
    });
    return true;
  }

  // Fallback: Web Speech API with a German voice
  if (hasGermanVoice()) {
    return playSpeech(text, onDone);
  }

  if (onDone) onDone(false);
  return false;
}

export function stopSpeaking() {
  if (currentAudio) {
    try { currentAudio.pause(); currentAudio = null; } catch (e) { /* ignore */ }
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  }
}

export function speechSupported() {
  return typeof Audio !== "undefined" || (typeof window !== "undefined" && "speechSynthesis" in window);
}
