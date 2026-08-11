import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react";
import App from "../src/App.jsx";

function render(ui) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(ui); });
  return {
    container,
    root,
    cleanup: () => act(() => root.unmount())
  };
}

function q(container, sel) {
  return container.querySelector(sel);
}

function click(el) {
  act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
}

describe("DeutschLernen App", () => {
  let view;

  beforeEach(() => {
    localStorage.clear();
    view = render(<App />);
  });

  afterEach(() => {
    view.cleanup();
  });

  it("renders home with 6 journey stations and 8 badges", () => {
    expect(view.container.querySelectorAll(".station").length).toBe(6);
    expect(view.container.querySelectorAll(".badge-card").length).toBe(8);
    expect(view.container.querySelectorAll(".stat-block").length).toBe(4);
  });

  it("opens level A1 with lessons, grammar, games and exam tabs", () => {
    click(view.container.querySelector(".station"));
    expect(view.container.querySelectorAll(".lesson-card").length).toBe(3);
    expect(view.container.querySelectorAll(".tab").length).toBe(4);
  });

  it("shows grammar cards in grammar tab", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[1]); // grammar
    expect(view.container.querySelectorAll(".grammar-card").length).toBeGreaterThan(0);
  });

  it("shows 8 games in games tab", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]); // games
    expect(view.container.querySelectorAll(".game-card").length).toBe(8);
  });

  it("starts match game with 4 options and speak button", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]);
    click(view.container.querySelectorAll(".game-card")[0]);
    expect(view.container.querySelectorAll(".match-option").length).toBe(4);
    expect(view.container.querySelector(".speak-btn")).toBeTruthy();
  });

  it("starts memory game with 12 cards", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]);
    click(view.container.querySelectorAll(".game-card")[1]);
    expect(view.container.querySelectorAll(".memory-card").length).toBe(12);
  });

  it("starts builder game with letter buttons", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]);
    click(view.container.querySelectorAll(".game-card")[2]);
    expect(view.container.querySelectorAll(".builder-letter").length).toBeGreaterThan(0);
    expect(view.container.querySelectorAll(".builder-slot").length).toBeGreaterThan(0);
  });

  it("starts listening game with replay button", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]);
    click(view.container.querySelectorAll(".game-card")[3]);
    expect(view.container.querySelector(".listen-prompt")).toBeTruthy();
    expect(view.container.querySelectorAll(".match-option").length).toBe(4);
  });

  it("starts true/false game with 2 buttons", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]);
    click(view.container.querySelectorAll(".game-card")[4]);
    expect(view.container.querySelectorAll(".tf-btn").length).toBe(2);
  });

  it("starts sentence builder with word bank and slots", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]);
    click(view.container.querySelectorAll(".game-card")[5]);
    expect(view.container.querySelector(".sentence-bank")).toBeTruthy();
    expect(view.container.querySelector(".sentence-slots")).toBeTruthy();
    expect(view.container.querySelector(".sentence-bank .bank-word")).toBeTruthy();
  });

  it("starts interactive dialogue with chat bubbles and options", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]);
    click(view.container.querySelectorAll(".game-card")[6]);
    expect(view.container.querySelector(".dialogue-chat")).toBeTruthy();
    expect(view.container.querySelector(".dialogue-option")).toBeTruthy();
  });

  it("starts pronounce game with word to say", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[2]);
    click(view.container.querySelectorAll(".game-card")[7]);
    expect(view.container.querySelector(".pron-word .pw-de")).toBeTruthy();
  });

  it("shows typing mode with input and check button", () => {
    click(view.container.querySelector(".station"));
    click(view.container.querySelector(".lesson-card"));
    click(view.container.querySelectorAll(".mode-btn")[1]); // typing
    expect(view.container.querySelector(".type-input")).toBeTruthy();
    expect(view.container.querySelector(".type-actions .btn-primary")).toBeTruthy();
  });

  it("shows speak mode with listen button", () => {
    click(view.container.querySelector(".station"));
    click(view.container.querySelector(".lesson-card"));
    click(view.container.querySelectorAll(".mode-btn")[2]); // speak
    expect(view.container.querySelector(".speak-stage")).toBeTruthy();
    expect(view.container.querySelector(".speak-actions .btn-primary")).toBeTruthy();
  });

  it("renders word of day and heatmap on home", () => {
    expect(view.container.querySelector(".wod-card")).toBeTruthy();
    expect(view.container.querySelector(".heatmap")).toBeTruthy();
    expect(view.container.querySelectorAll(".heatmap > .heat-cell").length).toBe(56);
  });

  it("opens lesson with flipable flashcard and speech button", () => {
    click(view.container.querySelector(".station"));
    click(view.container.querySelector(".lesson-card"));
    const card = view.container.querySelector(".flashcard");
    expect(card).toBeTruthy();
    click(card);
    expect(card.classList.contains("flipped")).toBe(true);
    expect(view.container.querySelector(".flashcard .speak-btn")).toBeTruthy();
  });

  it("starts exam with a question and 4 options", () => {
    click(view.container.querySelector(".station"));
    const tabs = view.container.querySelectorAll(".tab");
    click(tabs[3]);
    click(view.container.querySelector(".exam-box .btn-primary"));
    expect(view.container.querySelectorAll(".exam-option").length).toBe(4);
  });
});
