"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavigatorWithHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

type SplatUrlFlags = {
  debugEnabled: boolean;
  forceLiveSplat: boolean;
};

const FALLBACK_IMAGE_SRC = "/hero-image.jpg";
const MIN_LIVE_SPLAT_WIDTH = 900;
const LIVE_SPLAT_BACKDROP = [
  "radial-gradient(120% 90% at 50% 30%, rgba(196, 218, 228, 0.95) 0%, rgba(160, 192, 205, 0.88) 38%, rgba(103, 128, 121, 0.52) 70%, rgba(24, 30, 28, 0.25) 100%)",
  "linear-gradient(180deg, #c5d9e2 0%, #a6bcc8 42%, #7f8f6d 74%, #1d2520 100%)",
].join(", ");

const SplatHero = dynamic(() => import("@/components/SplatHero"), {
  ssr: false,
});

function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function canUseLiveSplat() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    return false;
  }

  const nav = navigator as NavigatorWithHints;

  if (nav.connection?.saveData || !hasWebGLSupport()) {
    return false;
  }

  const coarsePointer =
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(any-pointer: coarse)").matches;

  if (coarsePointer || window.innerWidth < MIN_LIVE_SPLAT_WIDTH) {
    return false;
  }

  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) {
    return false;
  }

  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) {
    return false;
  }

  return true;
}

function readSplatUrlFlags(): SplatUrlFlags {
  const params = new URLSearchParams(window.location.search);
  const isEnabled = (key: string) => {
    const value = params.get(key);
    return value === "1" || value === "true";
  };

  return {
    debugEnabled: isEnabled("splatDebug"),
    forceLiveSplat: isEnabled("splatForceLive"),
  };
}

export default function SplatHeroWrapper() {
  const [shouldLoadLiveHero, setShouldLoadLiveHero] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const flags = readSplatUrlFlags();
      setShouldLoadLiveHero(flags.forceLiveSplat || flags.debugEnabled || canUseLiveSplat());
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (shouldLoadLiveHero) {
    return <SplatHero />;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: LIVE_SPLAT_BACKDROP,
      }}
    >
      <Image
        src={FALLBACK_IMAGE_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        style={{
          objectFit: "cover",
          objectPosition: "center center",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
