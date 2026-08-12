/* ==========================================================================
   DeutschLernen — German Pronunciation
   Primary: Google Translate TTS audio (native German voice)
   Fallback: Web Speech API with de-DE voice
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

/* ---------------- Audio playback ---------------- */

function playAudio(text, onDone) {
  try {
    const audio = new Audio();
    audio.referrerPolicy = "no-referrer";
    audio.src = ttsUrl(text);
    currentAudio = audio;

    audio.onended = () => { currentAudio = null; if (onDone) onDone(true); };
    audio.onerror = () => { currentAudio = null; if (onDone) onDone(false); };

    const p = audio.play();
    if (p && p.catch) p.catch(() => { currentAudio = null; if (onDone) onDone(false); });
    return true;
  } catch (e) {
    if (onDone) onDone(false);
    return false;
  }
}

/* ---------------- Web Speech API ---------------- */

function playSpeech(text, onDone) {
  if (!germanVoice) { if (onDone) onDone(false); return false; }
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
  } catch (e) { if (onDone) onDone(false); return false; }
}

/* ---------------- Public API ---------------- */

export function speakGerman(text, onDone) {
  if (!text) { if (onDone) onDone(false); return false; }
  stopSpeaking();

  // 1st: Google TTS (native German)
  if (typeof Audio !== "undefined") {
    playAudio(text, (ok) => {
      if (ok) {
        if (onDone) onDone(true);
      } else if (germanVoice) {
        playSpeech(text, onDone);
      } else if (onDone) {
        onDone(false);
      }
    });
    return true;
  }

  // Fallback: Web Speech with de-DE voice only
  if (germanVoice) return playSpeech(text, onDone);
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
