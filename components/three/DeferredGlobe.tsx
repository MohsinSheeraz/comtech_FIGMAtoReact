import Image from "next/image";
import type { CSSProperties } from "react";
import { AnimatedLayer } from "./AnimatedLayer";
import styles from "./Globe.module.css";

/* A decorative globe/sphere. `fallbackSrc` is a small still image that shows immediately;
   `animatedSrc` (optional) is the big animated version, which fades in over it once it has loaded in
   the background (see AnimatedLayer). */
export function DeferredGlobe({
  fallbackSrc,
  animatedSrc,
  animateWhen = "idle",
  animateRevealMs = 0,
  className,
  sizes = "100vw",
  style,
  priority = false,
  intro = false,
}: {
  fallbackSrc: string;
  animatedSrc?: string;
  animateWhen?: "idle" | "visible";
  animateRevealMs?: number;
  className?: string;
  sizes?: string;
  style?: CSSProperties;
  /** preload the still image (use for the image at the top of the page) */
  priority?: boolean;
  /** On page load, draw the blue rim left to right first, then fade the globe in under it. */
  intro?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.container} ${intro ? styles.intro : ""} ${className ?? ""}`}
      style={style}
    >
      <Image
        src={fallbackSrc}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className={styles.fallback}
      />
      {animatedSrc && (
        <AnimatedLayer src={animatedSrc} when={animateWhen} revealAfterMs={animateRevealMs} />
      )}
      {intro && (
        // Traces the rim baked into the globe image (1672x941 frame):
        // a circle centred at (836, 1411) with radius 944.
        <svg className={styles.rim} viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid meet">
          <path
            d="M30 919.6 A944 944 0 0 1 1642 919.6"
            pathLength={1}
            className={styles.rimLine}
          />
        </svg>
      )}
    </div>
  );
}
