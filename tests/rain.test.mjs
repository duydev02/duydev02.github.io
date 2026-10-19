import test from "node:test";
import assert from "node:assert/strict";
import { initRain } from "../src/lib/rain.ts";

// Exercise lifecycle and preferences without changing the user's OS settings.
class Events {
  listeners = new Map();
  addEventListener(type, handler) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(handler);
  }
  removeEventListener(type, handler) { this.listeners.get(type)?.delete(handler); }
  emit(type, event = {}) { for (const handler of this.listeners.get(type) || []) handler(event); }
  listenerCount() { return [...this.listeners.values()].reduce((sum, set) => sum + set.size, 0); }
}
class Button {
  constructor(kind) { this.dataset = { rainToggle: kind }; this.hidden = true; this.disabled = false; this.attributes = {}; }
  closest() { return this; }
  setAttribute(name, value) { this.attributes[name] = value; }
}
function setup(t, { saved = "off", reduced = false, width = 1200, storageFails = false, supported = true } = {}) {
  const motion = Object.assign(new Events(), { matches: reduced });
  const window = Object.assign(new Events(), { innerWidth: width, innerHeight: 800, devicePixelRatio: 3, matchMedia: () => motion });
  const root = { dataset: {}, classList: { contains: () => false } };
  let controls = [new Button("inline"), new Button("floating")];
  const status = {};
  const context = { strokes: 0, setTransform() {}, clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() { this.strokes++; } };
  const canvas = { hidden: true, getContext: () => supported ? context : null };
  const document = Object.assign(new Events(), {
    documentElement: root,
    hidden: false,
    querySelector(selector) {
      if (selector === "#page-rain") return canvas;
      if (selector.startsWith("main >")) return { getBoundingClientRect: () => ({ left: 200, right: 840 }) };
      return controls.find(button => button.dataset.rainToggle === "inline") || null;
    },
    querySelectorAll: selector => selector === "[data-rain-toggle]" ? controls : [status],
  });
  const storage = new Map([["duy:rain", saved]]);
  const frames = new Map();
  let nextFrame = 0;
  const globals = {
    window, document, Element: Button,
    sessionStorage: {
      getItem: key => { if (storageFails) throw new Error("unavailable"); return storage.get(key); },
      setItem: (key, value) => { if (storageFails) throw new Error("unavailable"); storage.set(key, value); },
    },
    requestAnimationFrame: handler => { frames.set(++nextFrame, handler); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
  };
  const originals = new Map(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const [key, value] of Object.entries(globals)) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  const dispose = initRain();
  t.after(() => {
    dispose();
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  return {
    document, window, root, motion, canvas, context, frames, storage, dispose,
    get controls() { return controls; },
    click(button = controls[0]) { document.emit("click", { target: button }); },
    setSubpage() { controls = [new Button("floating")]; },
    tick(time) {
      const [id, callback] = frames.entries().next().value;
      frames.delete(id); callback(time);
    },
  };
}

test("starts off, synchronizes controls, caps DPR/mobile particles, and stops completely", t => {
  const env = setup(t, { width: 375 });
  assert.equal(env.frames.size, 0);
  assert.equal(env.controls[1].hidden, true);
  env.click();
  assert.equal(env.canvas.hidden, false);
  assert.equal(env.canvas.width, Math.round(375 * 1.5));
  assert.equal(env.root.dataset.rain, "on");
  assert.equal(env.controls[1].hidden, false);
  assert.ok(env.controls.every(button => button.attributes["aria-pressed"] === "true"));
  assert.equal(env.storage.get("duy:rain"), "on");
  env.tick(100);
  assert.ok(env.context.strokes >= 24 && env.context.strokes <= 44);
  const strokes = env.context.strokes;
  env.tick(116);
  assert.equal(env.context.strokes, strokes, "skip drawing between 30fps frames");
  env.click(env.controls[1]);
  assert.equal(env.frames.size, 0);
  assert.equal(env.canvas.hidden, true);
  assert.equal(env.root.dataset.rain, "off");
});

test("keeps the choice across page swaps without duplicate animation loops/listeners", t => {
  const env = setup(t, { saved: "on" });
  assert.equal(env.frames.size, 1);
  env.document.emit("astro:before-swap");
  assert.equal(env.frames.size, 0);
  env.setSubpage();
  env.document.emit("astro:page-load");
  env.document.emit("astro:page-load");
  assert.equal(env.frames.size, 1);
  assert.equal(env.controls[0].attributes["aria-pressed"], "true");
  env.click();
  assert.equal(env.root.dataset.rain, "off", "one click should toggle once");
  assert.equal(env.frames.size, 0);
});

test("honors reduced motion at startup and when the preference changes", t => {
  const env = setup(t, { saved: "on", reduced: true });
  assert.equal(env.frames.size, 0);
  assert.equal(env.canvas.hidden, true);
  assert.ok(env.controls.every(button => button.disabled));
  env.click();
  assert.equal(env.storage.get("duy:rain"), "on", "preserve the choice while motion is suspended");
  env.motion.matches = false;
  env.motion.emit("change");
  assert.equal(env.frames.size, 1);
  env.motion.matches = true;
  env.motion.emit("change");
  assert.equal(env.frames.size, 0);
});

test("pauses in hidden tabs and cleans up all lifecycle listeners", t => {
  const env = setup(t, { saved: "on" });
  env.document.hidden = true;
  env.document.emit("visibilitychange");
  assert.equal(env.frames.size, 0);
  assert.equal(env.canvas.hidden, true);
  env.document.hidden = false;
  env.document.emit("visibilitychange");
  assert.equal(env.frames.size, 1);
  env.dispose();
  assert.equal(env.frames.size, 0);
  assert.equal(env.document.listenerCount() + env.window.listenerCount() + env.motion.listenerCount(), 0);
});

test("keeps the in-memory choice when session storage is unavailable", t => {
  const env = setup(t, { storageFails: true });
  assert.doesNotThrow(() => env.click());
  assert.equal(env.root.dataset.rain, "on");
  env.document.emit("astro:before-swap");
  env.document.emit("astro:page-load");
  assert.equal(env.frames.size, 1);
});

test("hides unavailable controls when Canvas 2D is unsupported", t => {
  const env = setup(t, { supported: false, saved: "on" });
  assert.equal(env.frames.size, 0);
  assert.ok(env.controls.every(button => button.hidden));
});
