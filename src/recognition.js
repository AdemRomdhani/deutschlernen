/* ==========================================================================
   DeutschLernen — Speech recognition (browser mic, German)
   ========================================================================== */

export function recognitionSupported() {
  return typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Human-readable Arabic message for a recognition error code.
 */
export function recognitionErrorMessage(code) {
  switch (code) {
    case "unsupported":
      return "متصفحك لا يدعم التعرف على الصوت — استخدم Chrome أو Edge";
    case "not-allowed":
    case "service-not-allowed":
    case "permission-denied":
    case "security":
      return "لم تسمح باستخدام الميكروفون — فعّل إذن الميكروفون وحاول مجدداً";
    case "no-speech":
      return "لم نسمع شيئاً — اقترب من الميكروفون وحاول مجدداً";
    case "audio-capture":
      return "لم يتم العثور على ميكروفون متصل بجهازك";
    case "network":
      return "خدمة التعرف على الصوت تحتاج اتصالاً بالإنترنت — سنستخدم الوضع المحلي بدلاً منها";
    case "aborted":
      return "تم إيقاف الاستماع";
    case "language-not-supported":
      return "اللغة الألمانية غير مدعومة في متصفحك";
    case "start_failed":
    case "bad-grammar":
      return "تعذّر بدء التعرف على الصوت — حاول مجدداً";
    default:
      return "حدث خطأ أثناء الاستماع — حاول مجدداً";
  }
}

/**
 * Start listening via the Web Speech API (network-based).
 * Returns the recognition instance (or null).
 * callbacks: { onResult(transcript), onError(error), onEnd() }
 */
export function startRecognition(lang, callbacks = {}) {
  const SR = recognitionSupported();
  if (!SR) {
    if (callbacks.onError) callbacks.onError("unsupported");
    return null;
  }
  try {
    const rec = new SR();
    rec.lang = lang || "de-DE";
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      const result = e.results && e.results[0] && e.results[0][0];
      if (result && callbacks.onResult) callbacks.onResult(result.transcript, undefined);
    };
    rec.onerror = (e) => {
      if (callbacks.onError) callbacks.onError(e && e.error ? e.error : "unknown");
    };
    rec.onend = () => {
      if (callbacks.onEnd) callbacks.onEnd();
    };
    rec.start();
    return rec;
  } catch (e) {
    if (callbacks.onError) callbacks.onError("start_failed");
    return null;
  }
}

export function stopRecognition(rec) {
  try {
    if (rec) rec.stop();
  } catch (e) { /* ignore */ }
}

/* ==========================================================================
   Offline voice detection (Web Audio API) — no network required.
   Detects the user speaking, records it, and returns a heuristic score
   plus the recorded blob so the user can compare with the model.
   callbacks: { onResult(transcript, info), onError(error), onEnd() }
   info = { score, durationMs, blob }
   ========================================================================== */

export function localListenSupported() {
  return typeof navigator !== "undefined" &&
    !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) &&
    (typeof window.AudioContext !== "undefined" || typeof window.webkitAudioContext !== "undefined");
}

function localHeuristic(durationMs) {
  // We can't verify the actual word offline; score reflects voice was captured
  // at a plausible length. Honest range feedback.
  if (durationMs < 200) return 55;
  if (durationMs <= 4000) return 70 + Math.min(8, Math.round(durationMs / 500));
  return 65;
}

export function startLocalListen(callbacks = {}) {
  const { onResult, onError, onEnd } = callbacks;
  if (!localListenSupported()) {
    if (onError) onError("audio-capture");
    return null;
  }

  let audioCtx = null;
  let analyser = null;
  let stream = null;
  let raf = null;
  let recorder = null;
  const chunks = [];
  let cleaned = false;
  let speechOn = false;
  let speechStart = 0;
  let totalSpeech = 0;
  let lastSpeechEnd = 0;
  let finalBlob = null;

  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    if (raf) cancelAnimationFrame(raf);
    try { if (recorder && recorder.state !== "inactive") recorder.stop(); } catch (e) { /* ignore */ }
    if (stream) stream.getTracks().forEach(t => t.stop());
    if (audioCtx) { try { audioCtx.close(); } catch (e) { /* ignore */ } }
  };

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((ms) => {
      stream = ms;
      try {
        recorder = new MediaRecorder(ms);
        recorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = () => {
          finalBlob = chunks.length ? new Blob(chunks, { type: "audio/webm" }) : null;
        };
        recorder.start();
      } catch (e) { /* recorder optional */ }

      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
      const source = audioCtx.createMediaStreamSource(ms);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      const started = performance.now();
      const MAX = 6000;
      const SILENCE = 900;
      const MIN_SPEECH = 300;

      const finish = () => {
        cleanup();
        setTimeout(() => {
          if (totalSpeech >= MIN_SPEECH) {
            const info = { score: localHeuristic(totalSpeech), durationMs: totalSpeech, blob: finalBlob };
            if (onResult) onResult("", info);
          } else if (onError) {
            onError("no-speech");
          }
          if (onEnd) onEnd();
        }, 120);
      };

      const tick = () => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        const avg = sum / data.length;
        const now = performance.now();
        if (avg > 10) {
          if (!speechOn) { speechOn = true; speechStart = now; }
          lastSpeechEnd = now;
        } else if (speechOn && now - lastSpeechEnd > SILENCE) {
          speechOn = false;
          totalSpeech += now - speechStart;
          speechStart = 0;
        }
        const elapsed = now - started;
        const ended = elapsed > MAX ||
          (totalSpeech > 0 && !speechOn && now - lastSpeechEnd > SILENCE);
        if (ended) {
          if (speechOn && speechStart) { totalSpeech += now - speechStart; }
          finish();
        } else {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    })
    .catch(() => {
      cleanup();
      if (onError) onError("not-allowed");
      if (onEnd) onEnd();
    });

  return { stop: cleanup };
}

/* ==========================================================================
   Combined entry: try Web Speech first, automatically fall back to the
   offline detector on network errors. Reports the active mode via
   callbacks.onMode("web" | "local").
   onResult(transcript, info) — info undefined for web mode.
   ========================================================================== */

export function startListening(lang, callbacks = {}) {
  if (!recognitionSupported()) {
    if (callbacks.onMode) callbacks.onMode("local");
    return startLocalListen(callbacks);
  }
  let localRec = null;
  const rec = startRecognition(lang, {
    ...callbacks,
    onError: (code) => {
      if (code === "network" || code === "unknown") {
        if (callbacks.onMode) callbacks.onMode("local");
        localRec = startLocalListen(callbacks);
        if (localRec) return;
      }
      if (callbacks.onError) callbacks.onError(code);
    }
  });
  if (rec) {
    const origStop = rec.stop.bind(rec);
    rec.stop = () => {
      try { origStop(); } catch (e) { /* ignore */ }
      try { if (localRec && localRec.stop) localRec.stop(); } catch (e) { /* ignore */ }
    };
  }
  return rec;
}
