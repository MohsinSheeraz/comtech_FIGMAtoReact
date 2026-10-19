"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Globe.module.css";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => null,
});

type GlobeVariant = "horizon" | "earth" | "particle";

export function DeferredGlobe({
  variant,
  fallbackSrc,
  className,
  sizes = "100vw",
  style,
}: {
  variant: GlobeVariant;
  fallbackSrc: string;
  className?: string;
  sizes?: string;
  style?: CSSProperties;
}) {
  const host = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const loadSceneWhenIdle = useCallback(() => {
    const timer = window.setTimeout(() => setEntered(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    let cancelIdle: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (
          entry.isIntersecting &&
          imageLoaded &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          cancelIdle = loadSceneWhenIdle();
        }
        else {
          cancelIdle?.();
          cancelIdle = undefined;
        }
      },
      { rootMargin: "0px" }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelIdle?.();
    };
  }, [imageLoaded, loadSceneWhenIdle]);

  const onImageLoad = () => setImageLoaded(true);

  return (
    <div ref={host} aria-hidden="true" className={`${styles.container} ${className ?? ""}`} style={style}>
      <Image
        ref={imageRef}
        src={fallbackSrc}
        alt=""
        fill
        sizes={sizes}
        className={styles.fallback}
        onLoad={onImageLoad}
      />
      {entered && imageLoaded && imageRef.current && (
        <GlobeScene
          variant={variant}
          textureSrc={imageRef.current.currentSrc}
          active={active}
        />
      )}
    </div>
  );
}
