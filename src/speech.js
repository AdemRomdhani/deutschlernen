/* ==========================================================================
   DeutschLernen — German Pronunciation
   Primary: Google Translate TTS (native German voice)
   Fallback: Web Speech API ONLY with a confirmed de-DE voice
   ========================================================================== */

const TTS_BASE = "https://translate.google.com/translate_tts";

let currentAudio = null;
let germanVoice = null;

function ttsUrl(text) {
  return `${TTS_BASE}?ie=UTF-8&client=tw-ob&tl=de-DE&q=${encodeURIComponent(text)}`;
}

/* ---------------- Voice loading ---------------- */

function loadVoices() {
  try {
    if (!("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();

    // STRICT: only accept voices with lang exactly "de-DE" or "de_DE"
    const exact = voices.filter(v => {
      const l = (v.lang || "").toLowerCase().replace("_", "-");
      return l === "de-de" || l === "de_de";
    });

    // Among de-DE voices, prefer Microsoft or Google German voices
    germanVoice =
      exact.find(v => (v.name || "").toLowerCase().includes("microsoft") && (v.name || "").toLowerCase().includes("deutsch")) ||
      exact.find(v => (v.name || "").toLowerCase().includes("google") && (v.name || "").toLowerCase().includes("deutsch")) ||
      exact.find(v => (v.name || "").toLowerCase().includes("microsoft")) ||
      exact.find(v => (v.name || "").toLowerCase().includes("google")) ||
      exact[0] ||
      null;
  } catch (e) {
    germanVoice = null;
  }
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  try { window.speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {}
  setTimeout(loadVoices, 300);
  setTimeout(loadVoices, 1000);
  setTimeout(loadVoices, 3000);
}

/* ---------------- Google Translate TTS (primary) ---------------- */

function playGoogleTTS(text, onDone) {
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
    if (p && p.catch) p.catch(() => cleanup(false));
  });
}

/* ---------------- Web Speech API (only with confirmed de-DE voice) ---------------- */

function playWebSpeech(text, onDone) {
  if (!germanVoice) {
    if (onDone) onDone(false);
    return false;
  }
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "de-DE";
    utter.voice = germanVoice;
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

export function speakGerman(text, onDone) {
  if (!text) { if (onDone) onDone(false); return false; }
  stopSpeaking();

  // 1st: Google TTS (native German, always correct accent)
  if (typeof Audio !== "undefined") {
    playGoogleTTS(text, (ok) => {
      if (ok) {
        if (onDone) onDone(true);
      } else if (germanVoice) {
        // 2nd: Web Speech with confirmed de-DE voice only
        playWebSpeech(text, onDone);
      } else if (onDone) {
        onDone(false);
      }
    });
    return true;
  }

  // No Audio API: try Web Speech if we have a real German voice
  if (germanVoice) return playWebSpeech(text, onDone);
  if (onDone) onDone(false);
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
