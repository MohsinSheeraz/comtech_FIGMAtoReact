import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./Globe.module.css";

export function DeferredGlobe({
  fallbackSrc,
  className,
  sizes = "100vw",
  style,
}: {
  fallbackSrc: string;
  className?: string;
  sizes?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.container} ${className ?? ""}`}
      style={style}
    >
      <Image
        src={fallbackSrc}
        alt=""
        fill
        sizes={sizes}
        className={styles.fallback}
      />
    </div>
  );
}
