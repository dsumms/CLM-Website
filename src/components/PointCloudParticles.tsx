"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uHoverState;
uniform sampler2D uTexture;

attribute vec2 reference;
attribute float size;

varying vec3 vColor;
varying float vDepth;

void main() {
  // Sample color from texture using reference UV
  vec4 texColor = texture2D(uTexture, reference);
  
  // Luminance for depth and effects
  float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  
  // Gentle gamma curve to tame highlights, moderate darkening
  vec3 crushed = pow(texColor.rgb, vec3(1.2));
  vec3 darkened = crushed * 1.5;
  // Warm highlights, cool shadows — cinematic color grade
  vColor = mix(darkened * vec3(0.7, 0.8, 1.0), darkened * vec3(1.0, 0.90, 0.8), brightness);
  
  vec3 pos = position;
  
  // Luminance-based depth displacement (bright = forward, dark = recede)
  pos.z += (brightness - 0.5) * 1.8;
  
  // Subtle ambient movement (scaled by brightness)
  pos.z += sin(pos.x * 2.5 + uTime * 0.5) * 0.09 * brightness;
  pos.z += cos(pos.y * 2.5 + uTime * 0.5) * 0.09 * brightness;
  
  // Mouse repel effect
  vec3 mouse3D = vec3(uMouse.x, uMouse.y, 0.0);
  float dist = distance(position, mouse3D);
  
  if (dist < 3.0 && uHoverState > 0.0) {
    vec3 dir = normalize(position - mouse3D);
    float force = (3.0 - dist) * 0.25 * uHoverState;
    pos += dir * force;
    pos.z += (fract(sin(dot(reference.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * force * 2.0;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mvPosition.z;
  
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * (40.0 / -mvPosition.z) * (brightness * 0.5 + 0.55);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vDepth;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  
  float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
  
  // Subtle depth-based fog
  float fogFactor = smoothstep(4.0, 10.0, vDepth);
  vec3 finalColor = vColor * (1.0 - fogFactor * 0.1);
  float finalAlpha = alpha * 0.95 * (1.0 - fogFactor * 0.2);
  
  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

export default function PointCloudParticles({ imageSrc }: { imageSrc: string }) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const texture = useLoader(THREE.TextureLoader, imageSrc);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHoverState: { value: 0 },
        uTexture: { value: texture },
    }), [texture]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

            const mouseX = (state.pointer.x * state.viewport.width) / 2;
            const mouseY = (state.pointer.y * state.viewport.height) / 2;

            const currentMouse = materialRef.current.uniforms.uMouse.value;
            currentMouse.x += (mouseX - currentMouse.x) * 0.1;
            currentMouse.y += (mouseY - currentMouse.y) * 0.1;

            const isActive = state.pointer.x !== 0 || state.pointer.y !== 0;
            const targetHover = isActive ? 1.0 : 0.0;
            materialRef.current.uniforms.uHoverState.value += (targetHover - materialRef.current.uniforms.uHoverState.value) * 0.1;
        }
    });

    const [positions, reference, sizes] = useMemo(() => {
        const width = 550;
        const height = Math.floor(width * (9 / 16));
        const particleCount = width * height;

        const positions = new Float32Array(particleCount * 3);
        const reference = new Float32Array(particleCount * 2);
        const sizes = new Float32Array(particleCount);

        let i = 0;
        const scale = 16.0;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const px = (x / width - 0.5) * scale;
                const py = (y / height - 0.5) * scale * (height / width);
                // eslint-disable-next-line react-hooks/purity
                const pz = (Math.random() - 0.5) * 0.2;

                positions[i * 3] = px;
                positions[i * 3 + 1] = py;
                positions[i * 3 + 2] = pz;

                reference[i * 2] = x / width;
                reference[i * 2 + 1] = y / height;

                // eslint-disable-next-line react-hooks/purity
                sizes[i] = Math.random() * 1.0 + 0.5;
                i++;
            }
        }
        return [positions, reference, sizes];
    }, []);

    const positionAttribute = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);
    const referenceAttribute = useMemo(() => new THREE.BufferAttribute(reference, 2), [reference]);
    const sizeAttribute = useMemo(() => new THREE.BufferAttribute(sizes, 1), [sizes]);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <primitive object={positionAttribute} attach="attributes-position" />
                <primitive object={referenceAttribute} attach="attributes-reference" />
                <primitive object={sizeAttribute} attach="attributes-size" />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
}
