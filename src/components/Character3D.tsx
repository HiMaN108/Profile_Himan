"use client";

import { Suspense, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/character-_boy_base_mesh_lowpoly_3d_model.glb";

type AvatarSignal = {
  accent: string;
  label: string;
  mode: string;
};

type UserAvatar3DProps = {
  accent?: string;
  mode?: string;
  signal?: string;
};

type PointerState = {
  lastMove: number;
  position: THREE.Vector2;
};

const satelliteStats = [
  { label: "1M+", detail: "users", color: "#ff4655", angle: 0 },
  { label: "99.9", detail: "uptime", color: "#45f5a1", angle: 2.1 },
  { label: "40%", detail: "faster", color: "#00d1ff", angle: 4.2 },
];

function seededUnit(index: number, salt: number) {
  const value = Math.sin(index * 91.7 + salt * 23.3) * 10000;
  return value - Math.floor(value);
}

function isMesh(object: THREE.Object3D): object is THREE.Mesh {
  return (object as THREE.Mesh).isMesh;
}

function NeuralParticles({ accent }: { accent: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const count = 90;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.0 + seededUnit(i, 1) * 2.0;
      const theta = seededUnit(i, 2) * Math.PI * 2;
      const y = (seededUnit(i, 3) - 0.5) * 6;
      values[i * 3] = Math.cos(theta) * radius;
      values[i * 3 + 1] = y;
      values[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return values;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.08;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.34) * 0.05;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.24 + Math.sin(clock.elapsedTime * 1.6) * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} color={accent} depthWrite={false} size={0.05} transparent />
    </points>
  );
}

function ScanningRings({ accent, modelHeight }: { accent: string; modelHeight: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const range = 4.5;
    const speed = 1.0;
    const time = clock.getElapsedTime() * speed;
    groupRef.current.children.forEach((child, index) => {
      const progress = (time + index * (range / 5)) % range;
      child.position.y = modelHeight * 0.5 - progress * (modelHeight / range);
      child.scale.setScalar(1.0);
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      material.opacity = Math.sin((progress / range) * Math.PI) * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 5 }).map((_, index) => (
        <mesh key={index} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.6, 80]} />
          <meshBasicMaterial color={accent} opacity={0} side={THREE.DoubleSide} transparent />
        </mesh>
      ))}
    </group>
  );
}

function DataSatellites({
  accent,
  signal,
  modelHeight,
}: {
  accent: string;
  signal: AvatarSignal;
  modelHeight: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.42;
    groupRef.current.children.forEach((child) => child.lookAt(camera.position));
  });

  return (
    <group ref={groupRef}>
      {satelliteStats.map((stat) => {
        const x = Math.cos(stat.angle) * 2.2;
        const z = Math.sin(stat.angle) * 2.2;
        return (
          <group key={stat.label} position={[x, Math.sin(stat.angle) * 0.5, z]}>
            <mesh>
              <boxGeometry args={[0.95, 0.48, 0.04]} />
              <meshBasicMaterial color="#06080d" transparent opacity={0.72} />
            </mesh>
            <Text anchorX="center" anchorY="middle" color={stat.color} fontSize={0.28} position={[0, 0.1, 0.035]}>
              {stat.label}
            </Text>
            <Text anchorX="center" anchorY="middle" color="#f5f2ec" fontSize={0.13} position={[0, -0.16, 0.035]}>
              {stat.detail}
            </Text>
          </group>
        );
      })}
      {/* Mode label above head */}
      <group position={[0, modelHeight * 0.5 + 0.55, 0]}>
        <mesh>
          <boxGeometry args={[1.8, 0.46, 0.04]} />
          <meshBasicMaterial color="#06080d" transparent opacity={0.82} />
        </mesh>
        <Text anchorX="center" anchorY="middle" color={accent} fontSize={0.16} position={[0, 0.12, 0.04]}>
          {signal.mode}
        </Text>
        <Text anchorX="center" anchorY="middle" color="#f5f2ec" fontSize={0.11} position={[0, -0.12, 0.04]}>
          {signal.label}
        </Text>
      </group>
    </group>
  );
}

function NeuralCrown({ accent, modelHeight }: { accent: string; modelHeight: number }) {
  const crownRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!crownRef.current) return;
    crownRef.current.rotation.y = clock.elapsedTime * 0.85;
    crownRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.1;
  });

  const headY = modelHeight * 0.5 - modelHeight * 0.08;

  return (
    <group ref={crownRef} position={[0, headY, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.012, 10, 96]} />
        <meshBasicMaterial color={accent} transparent opacity={0.78} />
      </mesh>
      <mesh rotation={[Math.PI / 2.25, 0.35, 0]}>
        <torusGeometry args={[0.2, 0.008, 10, 80]} />
        <meshBasicMaterial color="#45f5a1" transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.25, 0]}>
        <torusGeometry args={[0.13, 0.006, 10, 64]} />
        <meshBasicMaterial color="#ffd166" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

function SceneContent({
  accent,
  signal,
  pointer,
}: {
  accent: string;
  signal: AvatarSignal;
  pointer: MutableRefObject<PointerState>;
}) {
  const { scene: gltfScene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<THREE.Group>(null);

  const { processed, modelHeight, modelMidY } = useMemo(() => {
    const clone = gltfScene.clone(true);

    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = rawBox.getSize(new THREE.Vector3());
    const rawMin = rawBox.min;
    const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z);

    const TARGET = 4.1;
    const scale = TARGET / maxDim;

    const offsetX = -(rawMin.x + rawSize.x / 2);
    const offsetY = -(rawMin.y + rawSize.y / 2);
    const offsetZ = -(rawMin.z + rawSize.z / 2);

    clone.position.set(offsetX, offsetY, offsetZ);

    const meshes: THREE.Mesh[] = [];
    clone.traverse((child) => {
      if (isMesh(child)) meshes.push(child);
    });

    meshes.forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.material = new THREE.MeshStandardMaterial({
        color: "#10141d",
        emissive: "#001826",
        emissiveIntensity: 0.55,
        metalness: 0.72,
        roughness: 0.34,
      });
      mesh.add(
        new THREE.Mesh(
          mesh.geometry,
          new THREE.MeshBasicMaterial({
            color: accent,
            opacity: 0.18,
            transparent: true,
            wireframe: true,
          }),
        ),
      );
    });

    const root = new THREE.Group();
    root.scale.setScalar(scale);
    root.add(clone);

    const worldHeight = rawSize.y * scale;
    return {
      processed: root,
      modelHeight: worldHeight,
      modelMidY: 0,
    };
  }, [accent, gltfScene]);

  useFrame(({ clock }, delta) => {
    if (!modelRef.current) return;

    const idle = !pointer.current.lastMove || Date.now() - pointer.current.lastMove > 2200;
    const targetRotY = idle
      ? modelRef.current.rotation.y + delta * 0.55
      : pointer.current.position.x * 0.42;
    const targetRotX = idle
      ? Math.sin(clock.elapsedTime * 0.9) * 0.04
      : pointer.current.position.y * 0.14;

    modelRef.current.rotation.y = THREE.MathUtils.damp(modelRef.current.rotation.y, targetRotY, 4, delta);
    modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetRotX, 4, delta);
    modelRef.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.03;
  });

  // FIX: Raise the ground plane slightly above the absolute feet position
  // so the ring is not sitting right at the frustum edge and getting clipped.
  const feetY = -modelHeight / 2 + 0.08;

  return (
    <>
      <Float floatingRange={[-0.03, 0.06]} rotationIntensity={0.12} speed={1.4}>
        <group ref={modelRef} position={[0, modelMidY, 0]}>
          <primitive object={processed} />
          <NeuralCrown accent={accent} modelHeight={modelHeight} />
        </group>
      </Float>

      <DataSatellites accent={accent} signal={signal} modelHeight={modelHeight} />
      <ScanningRings accent={accent} modelHeight={modelHeight} />
      <NeuralParticles accent={accent} />

      {/* Ground glow — raised slightly so the ring is fully in frame */}
      <mesh position={[0, feetY, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.4, 96]} />
        <meshBasicMaterial color={accent} opacity={0.1} transparent />
      </mesh>
      <mesh position={[0, feetY + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.45, 1.5, 96]} />
        <meshBasicMaterial color={accent} opacity={0.6} transparent />
      </mesh>
    </>
  );
}

export default function UserAvatar3D({
  accent = "#00d1ff",
  signal = "Neural Core",
  mode = "Builder Mode",
}: UserAvatar3DProps) {
  const pointer = useRef<PointerState>({
    lastMove: 0,
    position: new THREE.Vector2(0, 0),
  });

  const avatarSignal: AvatarSignal = { accent, label: signal, mode };

  return (
    <div
      className="relative h-[520px] w-full overflow-hidden rounded-md border border-white/10 bg-[radial-gradient(circle_at_50%_28%,rgba(0,209,255,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))]"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current.position.set(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
        );
        pointer.current.lastMove = Date.now();
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%", display: "block", touchAction: "auto" }}
        /**
         * FIX: Camera y shifted from -0.3 to 0.2 so the viewport looks slightly
         * higher, bringing the feet/ground ring fully into the visible frustum.
         * With y=-0.3 the camera aimed downward and the bottom ring was cut off.
         */
        camera={{ fov: 55, position: [0, 0.2, 5.5] }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <hemisphereLight args={["#7fe7ff", "#05070b", 1.4]} />
        <pointLight color={accent} intensity={3.5} position={[2.5, 2.5, 3]} />
        <spotLight angle={0.48} color="#ff4655" intensity={10} penumbra={0.65} position={[-2.5, 4, 3]} />

        <Suspense fallback={null}>
          <SceneContent accent={accent} signal={avatarSignal} pointer={pointer} />
        </Suspense>

        <OrbitControls
          autoRotate={false}
          enablePan={false}
          enableZoom={false}
          /**
           * FIX: minPolarAngle relaxed from Math.PI / 3.1 to Math.PI / 3.4
           * so the user cannot tilt the camera into a position where the
           * bottom ring clips again.
           */
          maxPolarAngle={Math.PI / 1.78}
          minPolarAngle={Math.PI / 3.4}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>Cursor linked</span>
        <span style={{ color: accent }}>{mode}</span>
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);