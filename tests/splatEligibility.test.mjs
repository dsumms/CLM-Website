import assert from "node:assert/strict";
import test from "node:test";

import { canUseLiveSplat } from "../src/lib/splatEligibility.ts";

function browserSignals({
  width = 1280,
  reducedMotion = false,
  saveData = false,
  coarsePointer = false,
  anyCoarsePointer = false,
  webgl2 = true,
  webgl1 = true,
  contextThrows = false,
} = {}) {
  return {
    win: {
      innerWidth: width,
      matchMedia(query) {
        return {
          matches: {
            "(prefers-reduced-motion: reduce)": reducedMotion,
            "(pointer: coarse)": coarsePointer,
            "(any-pointer: coarse)": anyCoarsePointer,
          }[query] ?? false,
        };
      },
    },
    nav: {
      connection: { saveData },
      deviceMemory: 4,
      hardwareConcurrency: 4,
    },
    doc: {
      createElement(tag) {
        assert.equal(tag, "canvas");
        return {
          getContext(kind) {
            if (contextThrows) throw new Error("WebGL unavailable");
            if (kind === "webgl2") return webgl2 ? {} : null;
            if (kind === "webgl") return webgl1 ? {} : null;
            return null;
          },
        };
      },
    },
  };
}

test("fine-pointer desktop with 4 GB and four cores can load the live splat", () => {
  assert.equal(canUseLiveSplat(browserSignals()), true);
  assert.equal(canUseLiveSplat(browserSignals({ width: 900 })), true);
});

for (const [reason, signals] of [
  ["reduced motion", { reducedMotion: true }],
  ["save data", { saveData: true }],
  ["coarse primary pointer", { coarsePointer: true }],
  ["any coarse pointer", { anyCoarsePointer: true }],
  ["narrow viewport", { width: 899 }],
  ["WebGL1 without WebGL2", { webgl2: false, webgl1: true }],
  ["WebGL context error", { contextThrows: true }],
]) {
  test(`${reason} keeps the static fallback`, () => {
    assert.equal(canUseLiveSplat(browserSignals(signals)), false);
  });
}
