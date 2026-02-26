"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Suspense, useEffect, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Splat } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

type HeroCameraConfig = {
    position: Vec3;
    target: Vec3;
    fov: number;
    near: number;
    far: number;
};

type WiggleConfig = {
    damping: number;
    desktopYaw: number;
    desktopPitch: number;
    touchYaw: number;
    touchPitch: number;
};

type DebugWiggleState = WiggleConfig & {
    wiggleEnabled: boolean;
};

type DebugOverlayState = {
    showReferenceUnderlay: boolean;
    underlayOpacity: number;
};

type PointerState = {
    x: number;
    y: number;
    isTouch: boolean;
};

type NavigatorWithHints = Navigator & {
    connection?: {
        saveData?: boolean;
    };
    deviceMemory?: number;
};

const FALLBACK_IMAGE_SRC = "/hero-image.jpg";
const MOBILE_FALLBACK_MAX_WIDTH = 900;
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const LIVE_SPLAT_BACKDROP = [
    "radial-gradient(120% 90% at 50% 30%, rgba(196, 218, 228, 0.95) 0%, rgba(160, 192, 205, 0.88) 38%, rgba(103, 128, 121, 0.52) 70%, rgba(24, 30, 28, 0.25) 100%)",
    "linear-gradient(180deg, #c5d9e2 0%, #a6bcc8 42%, #7f8f6d 74%, #1d2520 100%)",
].join(", ");

// Calibrated hero pose. Keep these together so future visual tuning is easy.
const DEFAULT_HERO_CAMERA: HeroCameraConfig = {
    position: [-1.2, -1.99, 19.85] as const,
    target: [-0.8, 0.1, 0] as const,
    fov: 50,
    near: 0.01,
    far: 5000,
};

const HERO_SPLAT = {
    src: "/hero-image.splat",
    position: [0, 0, 0] as const,
    rotation: [Math.PI, 0, 0] as const,
};

const DEFAULT_WIGGLE: WiggleConfig = {
    damping: 0.006,
    desktopYaw: 0.02,
    desktopPitch: 0.006,
    touchYaw: 0.015,
    touchPitch: 0.004,
};

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function round(value: number, digits: number) {
    const factor = 10 ** digits;
    return Math.round(value * factor) / factor;
}

function cloneCameraConfig(config: HeroCameraConfig): HeroCameraConfig {
    return {
        ...config,
        position: [...config.position] as Vec3,
        target: [...config.target] as Vec3,
    };
}

function updateVec3At(vec: Vec3, index: 0 | 1 | 2, value: number): Vec3 {
    const next = [...vec] as Vec3;
    next[index] = value;
    return next;
}

function toWiggleConfig(state: DebugWiggleState): WiggleConfig {
    return {
        damping: state.damping,
        desktopYaw: state.desktopYaw,
        desktopPitch: state.desktopPitch,
        touchYaw: state.touchYaw,
        touchPitch: state.touchPitch,
    };
}

function buildConstantsSnippet(camera: HeroCameraConfig, wiggle: WiggleConfig) {
    const formatVec3 = (values: Vec3) =>
        `[${round(values[0], 3)}, ${round(values[1], 3)}, ${round(values[2], 3)}]`;

    return `const HERO_CAMERA = {\n  position: ${formatVec3(camera.position)} as const,\n  target: ${formatVec3(camera.target)} as const,\n  fov: ${round(camera.fov, 2)},\n  near: ${camera.near},\n  far: ${camera.far},\n};\n\nconst WIGGLE = {\n  damping: ${round(wiggle.damping, 4)},\n  desktopYaw: ${round(wiggle.desktopYaw, 4)},\n  desktopPitch: ${round(wiggle.desktopPitch, 4)},\n  touchYaw: ${round(wiggle.touchYaw, 4)},\n  touchPitch: ${round(wiggle.touchPitch, 4)},\n};`;
}

function hasWebGLSupport() {
    if (typeof document === "undefined") {
        return false;
    }

    try {
        const canvas = document.createElement("canvas");
        const webgl2 = canvas.getContext("webgl2");
        const webgl = canvas.getContext("webgl");
        return Boolean(webgl2 ?? webgl);
    } catch {
        return false;
    }
}

function shouldUseStaticFallback() {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
        return true;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        return true;
    }

    const nav = navigator as NavigatorWithHints;

    if (nav.connection?.saveData) {
        return true;
    }

    if (!hasWebGLSupport()) {
        return true;
    }

    const coarsePointer =
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(any-pointer: coarse)").matches;

    if (!coarsePointer) {
        return false;
    }

    if (window.innerWidth < MOBILE_FALLBACK_MAX_WIDTH) {
        return true;
    }

    if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) {
        return true;
    }

    if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) {
        return true;
    }

    return false;
}

function shouldEnableCalibrationDebug() {
    if (IS_PRODUCTION || typeof window === "undefined") {
        return false;
    }

    return new URLSearchParams(window.location.search).get("splatDebug") === "1";
}

function NumberControl({
    label,
    value,
    step,
    min,
    max,
    onChange,
    disabled,
}: {
    label: string;
    value: number;
    step?: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
}) {
    return (
        <label style={{ display: "grid", gridTemplateColumns: "1fr 92px", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>{label}</span>
            <input
                type="number"
                inputMode="decimal"
                value={value}
                step={step}
                min={min}
                max={max}
                disabled={disabled}
                onChange={(event) => {
                    const next = event.currentTarget.valueAsNumber;
                    if (Number.isFinite(next)) {
                        onChange(next);
                    }
                }}
                style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "white",
                    borderRadius: 6,
                    fontSize: 11,
                    padding: "5px 8px",
                }}
            />
        </label>
    );
}

function ToggleControl({
    label,
    checked,
    onChange,
    disabled,
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}) {
    return (
        <label
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                fontSize: 11,
                color: "rgba(255,255,255,0.9)",
            }}
        >
            <span>{label}</span>
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(event) => onChange(event.currentTarget.checked)}
            />
        </label>
    );
}

function WiggleCamera({
    pointerStateRef,
    cameraConfig,
    wiggleConfig,
}: {
    pointerStateRef: MutableRefObject<PointerState>;
    cameraConfig: HeroCameraConfig;
    wiggleConfig: WiggleConfig;
}) {
    const { camera } = useThree();
    const smoothedPointer = useRef({ x: 0, y: 0 });
    const rigRef = useRef({
        target: new THREE.Vector3(),
        baseOffset: new THREE.Vector3(),
        upAxis: new THREE.Vector3(0, 1, 0),
        rotatedOffset: new THREE.Vector3(),
        forward: new THREE.Vector3(),
        rightAxis: new THREE.Vector3(),
        yawQuat: new THREE.Quaternion(),
        pitchQuat: new THREE.Quaternion(),
    });

    useEffect(() => {
        const rig = rigRef.current;
        smoothedPointer.current.x = 0;
        smoothedPointer.current.y = 0;
        rig.target.set(...cameraConfig.target);
        camera.position.set(...cameraConfig.position);
        camera.up.set(0, 1, 0);
        camera.lookAt(rig.target);
    }, [camera, cameraConfig]);

    useFrame(() => {
        const pointerState = pointerStateRef.current;
        const rig = rigRef.current;
        const damping = clamp(wiggleConfig.damping, 0.001, 1);

        smoothedPointer.current.x += (pointerState.x - smoothedPointer.current.x) * damping;
        smoothedPointer.current.y += (pointerState.y - smoothedPointer.current.y) * damping;

        const maxYaw = pointerState.isTouch ? wiggleConfig.touchYaw : wiggleConfig.desktopYaw;
        const maxPitch = pointerState.isTouch ? wiggleConfig.touchPitch : wiggleConfig.desktopPitch;
        const yaw = smoothedPointer.current.x * maxYaw;
        const pitch = -smoothedPointer.current.y * maxPitch;

        rig.target.set(...cameraConfig.target);
        rig.baseOffset.set(
            cameraConfig.position[0] - cameraConfig.target[0],
            cameraConfig.position[1] - cameraConfig.target[1],
            cameraConfig.position[2] - cameraConfig.target[2]
        );

        rig.rotatedOffset.copy(rig.baseOffset);
        rig.yawQuat.setFromAxisAngle(rig.upAxis, yaw);
        rig.rotatedOffset.applyQuaternion(rig.yawQuat);

        rig.forward.copy(rig.rotatedOffset).normalize().multiplyScalar(-1);
        rig.rightAxis.crossVectors(rig.forward, rig.upAxis).normalize();

        if (rig.rightAxis.lengthSq() > 1e-8) {
            rig.pitchQuat.setFromAxisAngle(rig.rightAxis, pitch);
            rig.rotatedOffset.applyQuaternion(rig.pitchQuat);
        }

        camera.position.copy(rig.target).add(rig.rotatedOffset);
        camera.lookAt(rig.target);
    });

    return null;
}

function CalibrationPanel({
    renderMode,
    debugCamera,
    debugWiggle,
    debugOverlay,
    copyStatus,
    onCameraAxisChange,
    onTargetAxisChange,
    onCameraFovChange,
    onWiggleChange,
    onWiggleEnabledChange,
    onOverlayChange,
    onResetCamera,
    onResetWiggle,
    onCopyConstants,
}: {
    renderMode: "splat" | "fallback";
    debugCamera: HeroCameraConfig;
    debugWiggle: DebugWiggleState;
    debugOverlay: DebugOverlayState;
    copyStatus: string;
    onCameraAxisChange: (index: 0 | 1 | 2, value: number) => void;
    onTargetAxisChange: (index: 0 | 1 | 2, value: number) => void;
    onCameraFovChange: (value: number) => void;
    onWiggleChange: (key: keyof WiggleConfig, value: number) => void;
    onWiggleEnabledChange: (enabled: boolean) => void;
    onOverlayChange: (next: DebugOverlayState) => void;
    onResetCamera: () => void;
    onResetWiggle: () => void;
    onCopyConstants: () => void;
}) {
    const buttonStyle: CSSProperties = {
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "white",
        borderRadius: 6,
        fontSize: 11,
        padding: "6px 8px",
        cursor: "pointer",
    };

    const statusColor =
        renderMode === "splat" ? "rgba(77, 208, 122, 0.95)" : "rgba(255, 196, 0, 0.95)";

    return (
        <div
            style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: "min(340px, calc(100vw - 24px))",
                maxHeight: "calc(100% - 24px)",
                overflow: "auto",
                zIndex: 30,
                background: "rgba(10, 12, 16, 0.84)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                backdropFilter: "blur(14px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                color: "white",
                padding: 12,
                display: "grid",
                gap: 10,
                pointerEvents: "auto",
            }}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerMove={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
        >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.2 }}>Splat Calibration</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>Dev-only (`?splatDebug=1`)</div>
                </div>
                <div
                    style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: statusColor,
                        border: renderMode === "splat" ? "1px solid rgba(77, 208, 122, 0.35)" : "1px solid rgba(255, 196, 0, 0.35)",
                        background: renderMode === "splat" ? "rgba(77, 208, 122, 0.12)" : "rgba(255, 196, 0, 0.12)",
                        borderRadius: 999,
                        padding: "4px 8px",
                        whiteSpace: "nowrap",
                    }}
                >
                    {renderMode === "splat" ? "Live splat" : "Fallback active"}
                </div>
            </div>

            {renderMode === "fallback" ? (
                <div
                    style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.75)",
                        background: "rgba(255,196,0,0.08)",
                        border: "1px solid rgba(255,196,0,0.2)",
                        borderRadius: 8,
                        padding: "7px 8px",
                    }}
                >
                    Performance/reduced-motion fallback is active, so camera tuning controls will not affect rendering until live splat mode is available.
                </div>
            ) : null}

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10, display: "grid", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>Camera Position</div>
                <NumberControl label="Pos X" value={debugCamera.position[0]} step={0.01} onChange={(value) => onCameraAxisChange(0, value)} />
                <NumberControl label="Pos Y" value={debugCamera.position[1]} step={0.01} onChange={(value) => onCameraAxisChange(1, value)} />
                <NumberControl label="Pos Z" value={debugCamera.position[2]} step={0.01} onChange={(value) => onCameraAxisChange(2, value)} />
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.92)", marginTop: 4 }}>Look Target</div>
                <NumberControl label="Target X" value={debugCamera.target[0]} step={0.01} onChange={(value) => onTargetAxisChange(0, value)} />
                <NumberControl label="Target Y" value={debugCamera.target[1]} step={0.01} onChange={(value) => onTargetAxisChange(1, value)} />
                <NumberControl label="Target Z" value={debugCamera.target[2]} step={0.01} onChange={(value) => onTargetAxisChange(2, value)} />
                <NumberControl label="FOV" value={debugCamera.fov} step={0.1} min={10} max={120} onChange={onCameraFovChange} />
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10, display: "grid", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>Wiggle</div>
                <ToggleControl label="Enable Wiggle" checked={debugWiggle.wiggleEnabled} onChange={onWiggleEnabledChange} />
                <NumberControl label="Damping" value={debugWiggle.damping} step={0.005} min={0.001} max={1} onChange={(value) => onWiggleChange("damping", clamp(value, 0.001, 1))} />
                <NumberControl label="Desktop Yaw" value={debugWiggle.desktopYaw} step={0.001} min={0} max={0.2} onChange={(value) => onWiggleChange("desktopYaw", clamp(value, 0, 0.2))} />
                <NumberControl label="Desktop Pitch" value={debugWiggle.desktopPitch} step={0.001} min={0} max={0.2} onChange={(value) => onWiggleChange("desktopPitch", clamp(value, 0, 0.2))} />
                <NumberControl label="Touch Yaw" value={debugWiggle.touchYaw} step={0.001} min={0} max={0.2} onChange={(value) => onWiggleChange("touchYaw", clamp(value, 0, 0.2))} />
                <NumberControl label="Touch Pitch" value={debugWiggle.touchPitch} step={0.001} min={0} max={0.2} onChange={(value) => onWiggleChange("touchPitch", clamp(value, 0, 0.2))} />
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10, display: "grid", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>Reference Image</div>
                <ToggleControl
                    label="Show Underlay"
                    checked={debugOverlay.showReferenceUnderlay}
                    disabled={renderMode !== "splat"}
                    onChange={(checked) =>
                        onOverlayChange({
                            ...debugOverlay,
                            showReferenceUnderlay: checked,
                        })
                    }
                />
                <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>
                        Underlay Opacity ({round(debugOverlay.underlayOpacity, 2)})
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={debugOverlay.underlayOpacity}
                        disabled={!debugOverlay.showReferenceUnderlay || renderMode !== "splat"}
                        onChange={(event) => {
                            const next = event.currentTarget.valueAsNumber;
                            if (!Number.isFinite(next)) {
                                return;
                            }

                            onOverlayChange({
                                ...debugOverlay,
                                underlayOpacity: clamp(next, 0, 1),
                            });
                        }}
                    />
                </label>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10, display: "grid", gap: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <button type="button" style={buttonStyle} onClick={onResetCamera}>
                        Reset Camera
                    </button>
                    <button type="button" style={buttonStyle} onClick={onResetWiggle}>
                        Reset Wiggle
                    </button>
                </div>
                <button type="button" style={buttonStyle} onClick={onCopyConstants}>
                    Copy Constants
                </button>
                {copyStatus ? <div style={{ fontSize: 10, color: "rgba(255,255,255,0.72)" }}>{copyStatus}</div> : null}
            </div>
        </div>
    );
}

function getActiveWiggleConfig(debugEnabled: boolean, debugWiggle: DebugWiggleState): WiggleConfig {
    if (!debugEnabled) {
        return DEFAULT_WIGGLE;
    }

    if (!debugWiggle.wiggleEnabled) {
        return {
            damping: debugWiggle.damping,
            desktopYaw: 0,
            desktopPitch: 0,
            touchYaw: 0,
            touchPitch: 0,
        };
    }

    return toWiggleConfig(debugWiggle);
}

function heroCameraKey(camera: HeroCameraConfig) {
    return `hero-camera-fov-${camera.fov}`;
}

function makeDefaultDebugWiggle(): DebugWiggleState {
    return {
        ...DEFAULT_WIGGLE,
        wiggleEnabled: false,
    };
}

function makeDefaultDebugOverlay(): DebugOverlayState {
    return {
        showReferenceUnderlay: false,
        underlayOpacity: 0.5,
    };
}

export default function SplatHero() {
    const pointerStateRef = useRef<PointerState>({ x: 0, y: 0, isTouch: false });
    const [renderMode] = useState<"splat" | "fallback">(() =>
        shouldUseStaticFallback() ? "fallback" : "splat"
    );
    const [debugEnabled] = useState<boolean>(() => shouldEnableCalibrationDebug());
    const [debugCamera, setDebugCamera] = useState<HeroCameraConfig>(() => cloneCameraConfig(DEFAULT_HERO_CAMERA));
    const [debugWiggle, setDebugWiggle] = useState<DebugWiggleState>(() => makeDefaultDebugWiggle());
    const [debugOverlay, setDebugOverlay] = useState<DebugOverlayState>(() => makeDefaultDebugOverlay());
    const [copyStatus, setCopyStatus] = useState("");

    const activeCamera = debugEnabled ? debugCamera : DEFAULT_HERO_CAMERA;
    const activeWiggle = getActiveWiggleConfig(debugEnabled, debugWiggle);
    const showDebugUnderlay =
        renderMode === "splat" && debugEnabled && debugOverlay.showReferenceUnderlay;

    const updatePointerFromClientPosition = (
        element: HTMLDivElement,
        clientX: number,
        clientY: number,
        isTouch: boolean
    ) => {
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
            return;
        }

        pointerStateRef.current.x = clamp(((clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        pointerStateRef.current.y = clamp(((clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
        pointerStateRef.current.isTouch = isTouch;
    };

    const resetPointer = () => {
        pointerStateRef.current.x = 0;
        pointerStateRef.current.y = 0;
    };

    const handleCameraAxisChange = (index: 0 | 1 | 2, value: number) => {
        setDebugCamera((prev) => ({
            ...prev,
            position: updateVec3At(prev.position, index, value),
        }));
        setCopyStatus("");
    };

    const handleTargetAxisChange = (index: 0 | 1 | 2, value: number) => {
        setDebugCamera((prev) => ({
            ...prev,
            target: updateVec3At(prev.target, index, value),
        }));
        setCopyStatus("");
    };

    const handleCameraFovChange = (value: number) => {
        setDebugCamera((prev) => ({
            ...prev,
            fov: clamp(value, 10, 120),
        }));
        setCopyStatus("");
    };

    const handleWiggleChange = (key: keyof WiggleConfig, value: number) => {
        setDebugWiggle((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCopyStatus("");
    };

    const handleCopyConstants = async () => {
        const snippet = buildConstantsSnippet(debugCamera, toWiggleConfig(debugWiggle));

        try {
            if (!navigator.clipboard?.writeText) {
                throw new Error("Clipboard API unavailable");
            }

            await navigator.clipboard.writeText(snippet);
            setCopyStatus("Copied current HERO_CAMERA/WIGGLE constants to clipboard.");
        } catch {
            console.info(snippet);
            setCopyStatus("Clipboard unavailable. Constants were printed to the console.");
        }
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: LIVE_SPLAT_BACKDROP,
            }}
            onPointerMove={(event) => {
                updatePointerFromClientPosition(
                    event.currentTarget,
                    event.clientX,
                    event.clientY,
                    event.pointerType === "touch"
                );
            }}
            onPointerLeave={resetPointer}
            onPointerCancel={resetPointer}
            onTouchMove={(event) => {
                if (event.touches.length === 0) {
                    return;
                }

                const touch = event.touches[0];
                updatePointerFromClientPosition(event.currentTarget, touch.clientX, touch.clientY, true);
            }}
            onTouchEnd={resetPointer}
            onTouchCancel={resetPointer}
        >
            {showDebugUnderlay ? (
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
                        opacity: debugOverlay.underlayOpacity,
                    }}
                />
            ) : null}

            {renderMode === "splat" ? (
                <Canvas
                    key={heroCameraKey(activeCamera)}
                    dpr={[1, 1.25]}
                    camera={{
                        position: activeCamera.position,
                        fov: activeCamera.fov,
                        near: activeCamera.near,
                        far: activeCamera.far,
                    }}
                    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                    style={{ position: "absolute", inset: 0, background: "transparent" }}
                >
                    <WiggleCamera
                        pointerStateRef={pointerStateRef}
                        cameraConfig={activeCamera}
                        wiggleConfig={activeWiggle}
                    />
                    <Suspense fallback={null}>
                        <Splat
                            src={HERO_SPLAT.src}
                            position={HERO_SPLAT.position}
                            rotation={HERO_SPLAT.rotation}
                            toneMapped={false}
                        />
                    </Suspense>
                </Canvas>
            ) : (
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
            )}

            {debugEnabled ? (
                <CalibrationPanel
                    renderMode={renderMode}
                    debugCamera={debugCamera}
                    debugWiggle={debugWiggle}
                    debugOverlay={debugOverlay}
                    copyStatus={copyStatus}
                    onCameraAxisChange={handleCameraAxisChange}
                    onTargetAxisChange={handleTargetAxisChange}
                    onCameraFovChange={handleCameraFovChange}
                    onWiggleChange={handleWiggleChange}
                    onWiggleEnabledChange={(enabled) => {
                        setDebugWiggle((prev) => ({
                            ...prev,
                            wiggleEnabled: enabled,
                        }));
                        setCopyStatus("");
                    }}
                    onOverlayChange={(next) => {
                        setDebugOverlay(next);
                    }}
                    onResetCamera={() => {
                        setDebugCamera(cloneCameraConfig(DEFAULT_HERO_CAMERA));
                        setCopyStatus("");
                    }}
                    onResetWiggle={() => {
                        setDebugWiggle(makeDefaultDebugWiggle());
                        setCopyStatus("");
                    }}
                    onCopyConstants={() => {
                        void handleCopyConstants();
                    }}
                />
            ) : null}
        </div>
    );
}

