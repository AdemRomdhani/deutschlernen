/* ==========================================================================
   DeutschLernen — German Pronunciation
   Primary: Web Speech API with a proper de-DE voice
   Fallback: Google Translate TTS audio
   ========================================================================== */

const TTS_BASE = "https://translate.google.com/translate_tts";
const TTS_CLIENT = "tw-ob";

let currentAudio = null;
let germanVoice = null;
let voicesReady = false;

function ttsUrl(text) {
  return `${TTS_BASE}?ie=UTF-8&client=${TTS_CLIENT}&tl=de&q=${encodeURIComponent(text)}`;
}

/* ---------------- Voice loading ---------------- */

function pickBestVoice(voices) {
  if (!voices || !voices.length) return null;

  // Priority: de-DE voices first, then any de-* voice
  const deDE = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith("de-de"));
  const deAny = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith("de") && !v.lang.toLowerCase().startsWith("de-de"));

  const preferred = [...deDE, ...deAny];

  // Among de-DE voices, prefer well-known good quality ones
  for (const v of preferred) {
    const name = (v.name || "").toLowerCase();
    // Google and Microsoft German voices are generally high quality
    if (name.includes("google") && name.includes("deutsch")) return v;
    if (name.includes("google") && v.lang.toLowerCase().startsWith("de-de")) return v;
    if (name.includes("microsoft") && name.includes("deutsch")) return v;
    if (name.includes("microsoft") && v.lang.toLowerCase().startsWith("de-de")) return v;
  }

  // If no "Google/Microsoft" match, still prefer de-DE over de-AT/de-CH
  if (deDE.length > 0) return deDE[0];
  if (deAny.length > 0) return deAny[0];

  return preferred[0] || null;
}

function loadVoices() {
  try {
    if (!("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    germanVoice = pickBestVoice(voices);
    voicesReady = true;
  } catch (e) {
    germanVoice = null;
  }
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  try {
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  } catch (e) { /* ignore */ }
  // Retry loading voices after a short delay (some browsers load async)
  setTimeout(loadVoices, 500);
  setTimeout(loadVoices, 1500);
}

/* ---------------- Web Speech API ---------------- */

function playSpeech(text, onDone) {
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "de-DE";
    if (germanVoice) {
      utter.voice = germanVoice;
    }
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

function hasGermanVoice() {
  return typeof window !== "undefined" && "speechSynthesis" in window && !!germanVoice;
}

/* ---------------- Google Translate TTS (fallback) ---------------- */

function playAudio(text, onDone) {
  return new Promise((resolve) => {
    let audio;
    try {
      audio = new Audio();
      audio.referrerPolicy = "no-referrer";
      audio.crossOrigin = "anonymous";
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

  // Primary: Web Speech API with a real German voice
  if (hasGermanVoice()) {
    return playSpeech(text, onDone);
  }

  // Fallback: Google Translate TTS (high quality but may be blocked)
  if (typeof Audio !== "undefined") {
    playAudio(text, (ok) => {
      if (ok) {
        if (onDone) onDone(true);
      } else {
        // Last resort: try Web Speech anyway (even without a known German voice)
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          playSpeech(text, onDone);
        } else if (onDone) {
          onDone(false);
        }
      }
    });
    return true;
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
