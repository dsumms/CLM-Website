"use client";

import { useCallback, useEffect, useRef } from "react";
import { extend, useThree, useFrame, type ThreeElement } from "@react-three/fiber";
import {
    SplatMesh as SparkSplatMesh,
    SparkRenderer as SparkSplatRendererMesh,
} from "@sparkjsdev/spark";
import * as THREE from "three";

// Register Spark classes with R3F so they can be used declaratively in JSX
extend({ SparkSplatMesh, SparkSplatRendererMesh });

// Augment R3F's intrinsic elements for TypeScript
declare module "@react-three/fiber" {
    interface ThreeElements {
        sparkSplatMesh: ThreeElement<typeof SparkSplatMesh>;
        sparkSplatRendererMesh: ThreeElement<typeof SparkSplatRendererMesh>;
    }
}

/**
 * Renders a Spark-based SparkRenderer inside the R3F canvas.
 * Must be placed as a child of <Canvas>. Handles initialization
 * and per-frame updates automatically.
 */
export function SparkSplatRenderer({ onError }: { onError?: (error: unknown) => void }) {
    const gl = useThree((s) => s.gl);
    const scene = useThree((s) => s.scene);
    const rendererRef = useRef<SparkSplatRendererMesh | null>(null);
    const onErrorRef = useRef(onError);
    const failureReportedRef = useRef(false);

    useEffect(() => {
        onErrorRef.current = onError;
    }, [onError]);

    const reportFailure = useCallback((error: unknown) => {
        if (failureReportedRef.current) return;
        failureReportedRef.current = true;
        onErrorRef.current?.(error);
    }, []);

    useEffect(() => {
        failureReportedRef.current = false;
        const sparkRenderer = new SparkSplatRendererMesh({
            renderer: gl,
            autoUpdate: false,
        });
        scene.add(sparkRenderer);
        rendererRef.current = sparkRenderer;

        const handleContextLost = (event: Event) => {
            event.preventDefault();
            reportFailure(new Error("WebGL context lost"));
        };
        gl.domElement.addEventListener("webglcontextlost", handleContextLost);

        return () => {
            gl.domElement.removeEventListener("webglcontextlost", handleContextLost);
            scene.remove(sparkRenderer);
            sparkRenderer.dispose();
            rendererRef.current = null;
        };
    }, [gl, scene, reportFailure]);

    useFrame(({ camera }) => {
        const sparkRenderer = rendererRef.current;
        if (!sparkRenderer || failureReportedRef.current) return;

        try {
            void sparkRenderer.update({ scene, camera }).catch((error: unknown) => {
                if (rendererRef.current === sparkRenderer) reportFailure(error);
            });
        } catch (error) {
            if (rendererRef.current === sparkRenderer) reportFailure(error);
        }
    });

    return null;
}

export type SparkSplatProps = {
    /** URL to the splat file (.spz, .splat, .ply, .ksplat) */
    url: string;
    /** Position in the scene */
    position?: readonly [number, number, number];
    /** Rotation in the scene (Euler angles in radians) */
    rotation?: readonly [number, number, number];
    /** Called when the splat has finished loading */
    onLoaded?: () => void;
    /** Called if loading or rendering fails */
    onError?: (error: unknown) => void;
};

/**
 * Loads and renders a Gaussian splat file via Spark's SplatMesh.
 * Works with .spz, .splat, .ply, .ksplat formats.
 */
export function SparkSplat({
    url,
    position,
    rotation,
    onLoaded,
    onError,
}: SparkSplatProps) {
    const meshRef = useRef<SparkSplatMesh | null>(null);

    useEffect(() => {
        let active = true;
        const mesh = new SparkSplatMesh({
            url,
            onLoad: () => {
                if (active) onLoaded?.();
            },
        });

        if (position) {
            mesh.position.set(position[0], position[1], position[2]);
        }
        if (rotation) {
            mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
        }

        meshRef.current = mesh;

        // Catch async initialization errors
        mesh.initialized.catch((err: unknown) => {
            if (active) onError?.(err);
        });

        return () => {
            active = false;
            mesh.dispose();
            meshRef.current = null;
        };
        // Intentionally only re-run when URL changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    // We use a group as the container and imperatively add the mesh
    // because SplatMesh needs constructor options (url, onLoad) that
    // can't be passed through R3F's declarative <sparkSplatMesh />.
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        const group = groupRef.current;
        const mesh = meshRef.current;
        if (!group || !mesh) return;

        group.add(mesh);
        return () => {
            group.remove(mesh);
        };
    }, [url]);

    return <group ref={groupRef} />;
}
