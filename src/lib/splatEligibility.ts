type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export type SplatEligibilityEnvironment = {
  win: Pick<Window, "innerWidth" | "matchMedia">;
  nav: Pick<NavigatorWithConnection, "connection">;
  doc: Pick<Document, "createElement">;
};

const MIN_LIVE_SPLAT_WIDTH = 900;

function currentBrowser(): SplatEligibilityEnvironment | undefined {
  if (typeof window === "undefined" || typeof navigator === "undefined" || typeof document === "undefined") {
    return undefined;
  }

  return { win: window, nav: navigator as NavigatorWithConnection, doc: document };
}

export function canUseLiveSplat(browser: SplatEligibilityEnvironment | undefined = currentBrowser()): boolean {
  if (!browser) return false;

  const { win, nav, doc } = browser;
  if (win.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) {
    return false;
  }

  try {
    if (!doc.createElement("canvas").getContext("webgl2")) {
      return false;
    }
  } catch {
    return false;
  }

  const coarsePointer =
    win.matchMedia("(pointer: coarse)").matches ||
    win.matchMedia("(any-pointer: coarse)").matches;

  // CPU/RAM navigator hints can be privacy-reduced and do not establish GPU capacity.
  return !coarsePointer && win.innerWidth >= MIN_LIVE_SPLAT_WIDTH;
}
