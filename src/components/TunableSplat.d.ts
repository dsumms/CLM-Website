import * as THREE from 'three';
import * as React from 'react';
import { ThreeElements } from '@react-three/fiber';
export type SplatMaterialType = {
    alphaTest?: number;
    alphaHash?: boolean;
    screenCullBoundsMultiplier?: number;
    centerAndScaleTexture?: THREE.DataTexture;
    covAndColorTexture?: THREE.DataTexture;
    viewport?: THREE.Vector2;
    focal?: number;
};
export type TunableSplatDebugStats = {
    instanceCount: number;
};
export type TargetMesh = THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial & SplatMaterialType> & {
    ready: boolean;
    sorted: boolean;
    pm: THREE.Matrix4;
    vm1: THREE.Matrix4;
    vm2: THREE.Matrix4;
    viewport: THREE.Vector4;
};
export type SharedState = {
    url: string;
    gl: THREE.WebGLRenderer;
    worker: Worker;
    manager: THREE.LoadingManager;
    stream: ReadableStreamDefaultReader<Uint8Array>;
    loading: boolean;
    loaded: boolean;
    loadedVertexCount: number;
    rowLength: number;
    maxVertexes: number;
    chunkSize: number;
    totalDownloadBytes: number;
    numVertices: number;
    bufferTextureWidth: number;
    bufferTextureHeight: number;
    centerAndScaleData: Float32Array;
    covAndColorData: Uint32Array;
    covAndColorTexture: THREE.DataTexture;
    centerAndScaleTexture: THREE.DataTexture;
    connect(target: TargetMesh): () => void;
    update(target: TargetMesh, camera: THREE.Camera, hashed: boolean): void;
    onProgress?: (event: ProgressEvent) => void;
    onLoaded?: () => void;
    onDebugStats?: (stats: TunableSplatDebugStats) => void;
    onRuntimeError?: (error: unknown) => void;
};
declare module '@react-three/fiber' {
    interface ThreeElements {
        splatMaterial: SplatMaterialType & ThreeElements['shaderMaterial'];
    }
}
export type TunableSplatProps = {
    src: string;
    toneMapped?: boolean;
    alphaTest?: number;
    alphaHash?: boolean;
    chunkSize?: number;
    screenCullBoundsMultiplier?: number;
    onProgress?: (event: ProgressEvent) => void;
    onLoaded?: () => void;
    onDebugStats?: (stats: TunableSplatDebugStats) => void;
    onError?: (error: unknown) => void;
} & Omit<ThreeElements['mesh'], 'ref'>;
export declare function TunableSplat({ src, toneMapped, alphaTest, alphaHash, chunkSize, screenCullBoundsMultiplier, onProgress, onLoaded, onDebugStats, onError, ...props }: TunableSplatProps): React.JSX.Element;
