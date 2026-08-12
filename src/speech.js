/* ==========================================================================
   DeutschLernen — German Pronunciation
   Fetches German TTS audio as a blob (bypasses CORS), plays natively.
   Fallback: Web Speech API only with a confirmed de-DE voice.
   ========================================================================== */

let currentAudio = null;
let currentBlobUrl = null;
let germanVoice = null;

/* ---------------- Google TTS via fetch (blob) ---------------- */

async function fetchTTSBlob(text) {
  const urls = [
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=de&q=${encodeURIComponent(text)}`,
    `https://translate.google.com/translate_tts?ie=UTF-8&tl=de&client=dict-chrome-ex&q=${encodeURIComponent(text)}`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { referrerPolicy: "no-referrer" });
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 500) return blob;
      }
    } catch (e) { /* try next */ }
  }
  return null;
}

function playBlob(blob, onDone) {
  return new Promise((resolve) => {
    // cleanup previous blob url
    if (currentBlobUrl) { URL.revokeObjectURL(currentBlobUrl); currentBlobUrl = null; }

    let audio;
    try {
      currentBlobUrl = URL.createObjectURL(blob);
      audio = new Audio(currentBlobUrl);
      audio.preload = "auto";
    } catch (e) {
      resolve(false);
      return;
    }
    currentAudio = audio;
    const cleanup = (ok) => {
      audio.onended = null;
      audio.onerror = null;
      if (currentAudio === audio) currentAudio = null;
      if (onDone) onDone(ok);
      resolve(ok);
    };
    audio.onended = () => cleanup(true);
    audio.onerror = () => cleanup(false);
    const p = audio.play();
    if (p && p.catch) p.catch(() => cleanup(false));
  });
}

async function speakGoogle(text, onDone) {
  const blob = await fetchTTSBlob(text);
  if (blob) {
    playBlob(blob, onDone);
    return true;
  }
  return false;
}

/* ---------------- Web Speech API (only de-DE voice) ---------------- */

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

function playWebSpeech(text, onDone) {
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

  // 1st: Google TTS via fetch (native German voice, bypasses CORS)
  if (typeof fetch !== "undefined") {
    speakGoogle(text, (ok) => {
      if (ok) {
        if (onDone) onDone(true);
      } else if (germanVoice) {
        playWebSpeech(text, onDone);
      } else if (onDone) {
        onDone(false);
      }
    });
    return true;
  }

  // Fallback: Web Speech only with confirmed de-DE voice
  if (germanVoice) return playWebSpeech(text, onDone);
  if (onDone) onDone(false);
  return false;
}

export function stopSpeaking() {
  if (currentAudio) {
    try { currentAudio.pause(); currentAudio = null; } catch (e) {}
  }
  if (currentBlobUrl) { URL.revokeObjectURL(currentBlobUrl); currentBlobUrl = null; }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}

export function speechSupported() {
  return typeof fetch !== "undefined" || (typeof window !== "undefined" && "speechSynthesis" in window);
}
