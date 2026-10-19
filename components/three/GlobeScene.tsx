"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Globe.module.css";

function Artwork({
  variant,
  textureSrc,
  active,
  reducedMotion,
}: {
  variant: "horizon" | "earth" | "particle";
  textureSrc: string;
  active: boolean;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { gl, viewport } = useThree();
  const texture = useLoader(THREE.TextureLoader, textureSrc);
  const imageRatio = texture.image.width / texture.image.height;
  const viewportRatio = viewport.width / viewport.height;
  const planeWidth = viewportRatio > imageRatio ? viewport.height * imageRatio : viewport.width;
  const planeHeight = viewportRatio > imageRatio ? viewport.height : viewport.width / imageRatio;

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    const canvas = gl.domElement;
    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.current.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [gl]);

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return;
    const motionScale = variant === "particle" ? 1 : 0.55;
    const targetX = -pointer.current.y * 0.035 * motionScale;
    const targetY = pointer.current.x * 0.045 * motionScale + window.scrollY * 0.000008;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 1.5, 1);
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 1.5, 1);
  });

  return (
    <group ref={group}>
      <mesh scale={[planeWidth, planeHeight, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={active ? 1 : 0}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function GlobeScene({
  variant,
  textureSrc,
  active,
}: {
  variant: "horizon" | "earth" | "particle";
  textureSrc: string;
  active: boolean;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      aria-hidden="true"
      className={styles.canvas}
      dpr={[1, 1]}
      frameloop={active && !reducedMotion ? "always" : "demand"}
      camera={{ position: [0, 0, 3], fov: 38 }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Artwork variant={variant} textureSrc={textureSrc} active={active} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
