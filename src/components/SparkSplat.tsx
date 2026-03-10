"use client";

import { useEffect, useRef } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import {
    SplatMesh as SparkSplatMesh,
    SparkRenderer as SparkSparkRenderer,
} from "@sparkjsdev/spark";
import * as THREE from "three";

// Register Spark classes with R3F so they can be used declaratively in JSX
extend({ SparkSplatMesh, SparkSparkRenderer });

// Augment R3F's intrinsic elements for TypeScript
declare module "@react-three/fiber" {
    interface ThreeElements {
        sparkSplatMesh: any;
        sparkSparkRenderer: any;
    }
}

/**
 * Renders a Spark-based SparkRenderer inside the R3F canvas.
 * Must be placed as a child of <Canvas>. Handles initialization
 * and per-frame updates automatically.
 */
export function SparkSplatRenderer() {
    const gl = useThree((s) => s.gl);
    const scene = useThree((s) => s.scene);
    const rendererRef = useRef<SparkSparkRenderer | null>(null);

    useEffect(() => {
        const sparkRenderer = new SparkSparkRenderer({
            renderer: gl,
            autoUpdate: false,
        });
        scene.add(sparkRenderer);
        rendererRef.current = sparkRenderer;

        return () => {
            scene.remove(sparkRenderer);
            rendererRef.current = null;
        };
    }, [gl, scene]);

    useFrame(({ camera }) => {
        const sparkRenderer = rendererRef.current;
        if (!sparkRenderer) return;

        // Extract viewToWorld matrix from camera for sorting
        const viewToWorld = new THREE.Matrix4();
        viewToWorld.copy(camera.matrixWorld);

        sparkRenderer.update({ scene, viewToWorld });
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
        const mesh = new SparkSplatMesh({
            url,
            onLoad: () => {
                onLoaded?.();
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
            onError?.(err);
        });

        return () => {
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
