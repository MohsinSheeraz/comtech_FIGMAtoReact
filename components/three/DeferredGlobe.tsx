import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./Globe.module.css";

export function DeferredGlobe({
  fallbackSrc,
  className,
  sizes = "100vw",
  style,
  intro = false,
}: {
  fallbackSrc: string;
  className?: string;
  sizes?: string;
  style?: CSSProperties;
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
        className={styles.fallback}
      />
      {intro && (
        // Traces the rim baked into globe-network-lowered.webp (1672x941):
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
