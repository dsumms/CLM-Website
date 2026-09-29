import assert from "node:assert/strict";
import test from "node:test";

import { observeSplatFrameActivity } from "../src/lib/splatFrameActivity.ts";

function visibilityDocument() {
  const listeners = new Set();
  return {
    hidden: false,
    listeners,
    addEventListener(type, listener) {
      assert.equal(type, "visibilitychange");
      listeners.add(listener);
    },
    removeEventListener(type, listener) {
      assert.equal(type, "visibilitychange");
      listeners.delete(listener);
    },
    dispatchVisibilityChange() {
      for (const listener of listeners) listener();
    },
  };
}

test("pauses offscreen or hidden and resumes only when both are visible", () => {
  const element = {};
  const doc = visibilityDocument();
  const activity = [];
  let reportIntersection;
  let disconnected = false;
  let observedElement;
  const cleanup = observeSplatFrameActivity(
    element,
    doc,
    (notify) => {
      reportIntersection = notify;
      return {
        observe(target) { observedElement = target; },
        disconnect() { disconnected = true; },
      };
    },
    (active) => activity.push(active)
  );

  assert.equal(observedElement, element);
  assert.deepEqual(activity, [false]);

  reportIntersection(true);
  assert.deepEqual(activity, [false, true]);

  reportIntersection(false);
  assert.deepEqual(activity, [false, true, false]);

  doc.hidden = true;
  doc.dispatchVisibilityChange();
  reportIntersection(true);
  assert.deepEqual(activity, [false, true, false]);

  doc.hidden = false;
  doc.dispatchVisibilityChange();
  assert.deepEqual(activity, [false, true, false, true]);

  cleanup();
  assert.equal(disconnected, true);
  assert.equal(doc.listeners.size, 0);

  reportIntersection(false);
  doc.hidden = true;
  doc.dispatchVisibilityChange();
  assert.deepEqual(activity, [false, true, false, true]);
});

test("document visibility still controls frames without IntersectionObserver", () => {
  const doc = visibilityDocument();
  const activity = [];
  const cleanup = observeSplatFrameActivity({}, doc, undefined, (active) => activity.push(active));

  doc.hidden = true;
  doc.dispatchVisibilityChange();
  doc.hidden = false;
  doc.dispatchVisibilityChange();

  assert.deepEqual(activity, [true, false, true]);
  cleanup();
  assert.equal(doc.listeners.size, 0);
});

test("an observer setup failure falls back to document visibility", () => {
  const doc = visibilityDocument();
  const activity = [];
  const cleanup = observeSplatFrameActivity(
    {},
    doc,
    () => { throw new Error("IntersectionObserver unavailable"); },
    (active) => activity.push(active)
  );

  assert.deepEqual(activity, [true]);
  doc.hidden = true;
  doc.dispatchVisibilityChange();
  assert.deepEqual(activity, [true, false]);
  cleanup();
  assert.equal(doc.listeners.size, 0);
});
