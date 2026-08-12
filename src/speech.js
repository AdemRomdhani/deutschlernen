/* ==========================================================================
   DeutschLernen — German Pronunciation
   Google Translate TTS audio (native German voice, correct accent).
   Fallback: Web Speech API with de-DE voice only.
   ========================================================================== */

let currentAudio = null;
let germanVoice = null;

function ttsUrl(text) {
  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=de&q=${encodeURIComponent(text)}`;
}

/* ---------------- Voice loading ---------------- */

function loadVoices() {
  try {
    if (!("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    const exact = voices.filter(v => {
      const l = (v.lang || "").toLowerCase().replace("_", "-");
      return l === "de-de" || l === "de_de";
    });
    germanVoice =
      exact.find(v => (v.name || "").toLowerCase().includes("microsoft") && (v.name || "").toLowerCase().includes("deutsch")) ||
      exact.find(v => (v.name || "").toLowerCase().includes("google") && (v.name || "").toLowerCase().includes("deutsch")) ||
      exact.find(v => (v.name || "").toLowerCase().includes("microsoft")) ||
      exact.find(v => (v.name || "").toLowerCase().includes("google")) ||
      exact[0] || null;
  } catch (e) { germanVoice = null; }
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  try { window.speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {}
  setTimeout(loadVoices, 300);
  setTimeout(loadVoices, 1000);
  setTimeout(loadVoices, 3000);
}

/* ---------------- Google TTS via Audio ---------------- */

function playGoogleTTS(text, opts = {}) {
  const { rate, onStart, onEnd } = opts;
  try {
    const audio = new Audio();
    audio.referrerPolicy = "no-referrer";
    audio.src = ttsUrl(text);
    currentAudio = audio;

    audio.onplay = () => { if (onStart) onStart(); };
    audio.onended = () => { currentAudio = null; if (onEnd) onEnd(true); };
    audio.onerror = () => { currentAudio = null; if (onEnd) onEnd(false); };

    const p = audio.play();
    if (p && p.catch) p.catch(() => { currentAudio = null; if (onEnd) onEnd(false); });
    return true;
  } catch (e) {
    if (onEnd) onEnd(false);
    return false;
  }
}

/* ---------------- Web Speech API (de-DE voice only) ---------------- */

function playWebSpeech(text, opts = {}) {
  const { rate = 0.85, onStart, onEnd } = opts;
  if (!germanVoice) { if (onEnd) onEnd(false); return false; }
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "de-DE";
    utter.voice = germanVoice;
    utter.rate = rate;
    utter.pitch = 1;
    if (onStart) utter.onstart = () => onStart();
    if (onEnd) {
      utter.onend = () => onEnd(true);
      utter.onerror = () => onEnd(false);
    }
    window.speechSynthesis.speak(utter);
    return true;
  } catch (e) { if (onEnd) onEnd(false); return false; }
}

/* ---------------- Public API ---------------- */

/**
 * Speak German with correct native accent.
 * @param {string} text - German text to speak
 * @param {object} [opts] - { rate, onStart, onEnd }
 */
export function speakGerman(text, opts = {}) {
  // If called with a function as second arg (legacy), treat as onEnd
  if (typeof opts === "function") opts = { onEnd: opts };

  if (!text) { if (opts.onEnd) opts.onEnd(false); return false; }
  stopSpeaking();

  // 1st: Google TTS (native German)
  if (typeof Audio !== "undefined") {
    return playGoogleTTS(text, opts);
  }

  // 2nd: Web Speech with confirmed de-DE voice
  if (germanVoice) return playWebSpeech(text, opts);
  if (opts.onEnd) opts.onEnd(false);
  return false;
}

export function stopSpeaking() {
  if (currentAudio) {
    try { currentAudio.pause(); currentAudio = null; } catch (e) {}
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}

export function speechSupported() {
  return typeof Audio !== "undefined" || (typeof window !== "undefined" && "speechSynthesis" in window);
}
