import { vi } from "vitest";

// React 18: enable act() environment so state updates flush correctly
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Speech API stubs
if (typeof window !== "undefined") {
  window.speechSynthesis = window.speechSynthesis || {
    cancel: vi.fn(),
    speak: vi.fn((u) => {
      if (u && u.onend) setTimeout(() => u.onend(), 0);
    }),
    getVoices: () => [{ lang: "de-DE", name: "Anna" }],
    onvoiceschanged: null
  };
  window.SpeechSynthesisUtterance = window.SpeechSynthesisUtterance ||
    class { constructor(text) { this.text = text; } };
  window.HTMLCanvasElement.prototype.getContext = window.HTMLCanvasElement.prototype.getContext || function () {
    return {
      clearRect() {}, fillRect() {}, save() {}, restore() {},
      translate() {}, rotate() {}, set fillStyle(v) {}
    };
  };
  window.scrollTo = window.scrollTo || (() => {});
  // SpeechRecognition stub (recognized as unsupported in tests by default)
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    window.SpeechRecognition = undefined;
    window.webkitSpeechRecognition = undefined;
  }
}
