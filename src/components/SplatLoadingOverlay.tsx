"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SplatLoadingOverlay.module.css";

/**
 * Minimum time (ms) the overlay stays visible so the animation feels
 * intentional, even if the splat loads very fast.
 */
const MIN_DISPLAY_MS = 1200;

/**
 * Time (ms) for the CSS fade-out transition. Must match the `transition`
 * duration in `SplatLoadingOverlay.module.css`.
 */
const FADE_OUT_MS = 600;

/**
 * Path to the Rive animation file. Drop your `.riv` export into
 * `/public/loading.riv` and it will be picked up automatically.
 */
const RIVE_SRC = "/loading.riv";

// ---------------------------------------------------------------------------
// Rive is loaded lazily so that:
//   1. The CSS fallback spinner appears immediately.
//   2. If the .riv file doesn't exist, we fail silently.
// ---------------------------------------------------------------------------

type RiveComponentType = ReturnType<typeof import("@rive-app/react-canvas").useRive>["RiveComponent"];

function RivePlayer() {
    const [RiveModule, setRiveModule] = useState<typeof import("@rive-app/react-canvas") | null>(null);
    const [riveFailed, setRiveFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        import("@rive-app/react-canvas")
            .then((mod) => {
                if (!cancelled) setRiveModule(mod);
            })
            .catch(() => {
                if (!cancelled) setRiveFailed(true);
            });
        return () => { cancelled = true; };
    }, []);

    if (riveFailed || !RiveModule) {
        // Still loading the module or it failed — caller will show fallback
        return null;
    }

    return <RiveCanvas RiveModule={RiveModule} />;
}

/**
 * Renders the actual Rive canvas once the module is loaded.
 * Separated so that the hook call (`useRive`) only happens after the dynamic
 * import resolves.
 */
function RiveCanvas({ RiveModule }: { RiveModule: typeof import("@rive-app/react-canvas") }) {
    const [failed, setFailed] = useState(false);

    // `useRive` needs to be called unconditionally (hook rules).
    const { RiveComponent } = RiveModule.useRive(
        {
            src: RIVE_SRC,
            autoplay: true,
            onLoadError: () => setFailed(true),
        },
    );

    if (failed) return null;

    return (
        <div className={styles.riveContainer}>
            <RiveComponent />
        </div>
    );
}

function CssFallback() {
    return (
        <div className={styles.fallback}>
            <div className={styles.pulseRing} />
            <span className={styles.fallbackText}>Loading</span>
        </div>
    );
}

// ---------------------------------------------------------------------------

export type SplatLoadingOverlayProps = {
    /** Set to `true` once the Gaussian splat has fully loaded. */
    loaded: boolean;
    /** Optional path to a `.riv` file. Defaults to `/loading.riv`. */
    riveSrc?: string;
};

/**
 * Full-screen overlay shown while the Gaussian splat loads. Plays a Rive
 * animation if `/public/loading.riv` exists, otherwise falls back to a
 * minimal CSS spinner.
 *
 * Once `loaded` flips to `true` the overlay fades out over 600 ms and
 * unmounts itself.
 */
export default function SplatLoadingOverlay({ loaded }: SplatLoadingOverlayProps) {
    const mountedAtRef = useRef(Date.now());
    const [dismissed, setDismissed] = useState(false);
    const [readyToFade, setReadyToFade] = useState(false);
    const [riveAvailable, setRiveAvailable] = useState<boolean | null>(null);

    // ── Determine if Rive rendered anything ──────────────────────────────
    // We render the RivePlayer and check if it produced output.
    const riveRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Poll briefly to check if Rive rendered children
        const timer = setTimeout(() => {
            if (riveRef.current) {
                const hasCanvas = riveRef.current.querySelector("canvas") !== null;
                setRiveAvailable(hasCanvas);
            } else {
                setRiveAvailable(false);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // ── Handle "ready to fade" after both: splat loaded + minimum time ──
    useEffect(() => {
        if (!loaded) return;

        const elapsed = Date.now() - mountedAtRef.current;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

        const timer = setTimeout(() => setReadyToFade(true), remaining);
        return () => clearTimeout(timer);
    }, [loaded]);

    // ── Unmount after fade-out completes ─────────────────────────────────
    useEffect(() => {
        if (!readyToFade) return;

        const timer = setTimeout(() => setDismissed(true), FADE_OUT_MS);
        return () => clearTimeout(timer);
    }, [readyToFade]);

    if (dismissed) return null;

    return (
        <div
            className={`${styles.overlay} ${readyToFade ? styles.overlayHidden : ""}`}
            aria-hidden="true"
        >
            {/* Rive player — renders nothing if .riv is missing */}
            <div ref={riveRef} style={{ display: riveAvailable === false ? "none" : "contents" }}>
                <RivePlayer />
            </div>

            {/* CSS fallback — shown when Rive isn't available */}
            {riveAvailable !== true && <CssFallback />}
        </div>
    );
}
