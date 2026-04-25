"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";

function Scanner({ mousePosition }: { mousePosition: THREE.Vector2 }) {
  return (
    <mesh position={[mousePosition.x * 1.45, mousePosition.y * 1.1, 1.55]}>
      <ringGeometry args={[0.34, 0.4, 48]} />
      <meshBasicMaterial color="#45f5a1" transparent opacity={0.42} />
    </mesh>
  );
}

function Avatar({ mousePosition }: { mousePosition: THREE.Vector2 }) {
  const { scene } = useGLTF("/character-_boy_base_mesh_lowpoly_3d_model.glb");
  const modelRef = useRef<THREE.Group>(null);

  const modelFit = useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const bounds = new THREE.Box3().setFromObject(scene);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const largestAxis = Math.max(size.x, size.y, size.z) || 1;

    return {
      center,
      scale: 3.1 / largestAxis,
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (!modelRef.current) {
      return;
    }

    modelRef.current.rotation.x = THREE.MathUtils.damp(
      modelRef.current.rotation.x,
      mousePosition.y * 0.08,
      6,
      delta,
    );
    modelRef.current.rotation.y = THREE.MathUtils.damp(
      modelRef.current.rotation.y,
      mousePosition.x * 0.42,
      6,
      delta,
    );
  });

  return (
    <group ref={modelRef} position={[0, -0.2, 0]}>
      <group scale={modelFit.scale}>
        <primitive
          object={scene}
          position={[
            -modelFit.center.x,
            -modelFit.center.y,
            -modelFit.center.z,
          ]}
        />
      </group>
      <Text
        position={[0, 1.6, 0]}
        fontSize={0.22}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineColor="#07080b"
        outlineWidth={0.012}
      >
        GAMER
      </Text>
    </group>
  );
}

function AvatarFallback() {
  return (
    <group position={[0, -0.35, 0]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.45, 1.35, 8, 16]} />
        <meshStandardMaterial color="#263241" roughness={0.75} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color="#e5c7a8" roughness={0.68} />
      </mesh>
    </group>
  );
}

export default function UserAvatar3D() {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0, 0));

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const bounds = event.currentTarget.getBoundingClientRect();

    const x = ((clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = -(((clientY - bounds.top) / bounds.height) * 2 - 1);

    setMousePosition(new THREE.Vector2(x, y));
  };

  return (
    <div
      className="relative h-[420px] w-full overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_22%,rgba(0,209,255,0.18),transparent_28%),linear-gradient(180deg,#151922,#08090d)] sm:h-[520px] lg:h-[560px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition(new THREE.Vector2(0, 0))}
    >
      <Canvas
        camera={{ position: [0, 0.35, 6], fov: 40, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        shadows
      >
        <color attach="background" args={["#08090d"]} />
        <ambientLight intensity={1.8} />
        <hemisphereLight args={["#ffffff", "#111827", 2.1]} />
        <directionalLight
          castShadow
          intensity={3.2}
          position={[4, 5, 6]}
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
        />
        <pointLight color="#00d1ff" intensity={1.8} position={[-3, 1.4, 3]} />
        <pointLight color="#ff4655" intensity={1.2} position={[3, 1, 2]} />

        <Suspense fallback={<AvatarFallback />}>
          <Avatar mousePosition={mousePosition} />
        </Suspense>
        <Scanner mousePosition={mousePosition} />
        <mesh
          position={[0, -1.78, 0]}
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[1.75, 64]} />
          <shadowMaterial opacity={0.32} />
        </mesh>

        <OrbitControls
          enableZoom={true}
          makeDefault
          minDistance={3.2}
          maxDistance={8}
          enablePan={false}
          maxPolarAngle={Math.PI * 0.78}
          minPolarAngle={Math.PI * 0.18}
          target={[0, 0.05, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/character-_boy_base_mesh_lowpoly_3d_model.glb");
