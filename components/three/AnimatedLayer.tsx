"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Globe.module.css";

type Conn = { saveData?: boolean; effectiveType?: string };

/* The animated version of a still image (a big animated WebP), loaded quietly AFTER the page is
   ready and laid exactly over the still, so the page never waits for it.
   - `when="visible"`: only start downloading when the image is about to scroll into view
   - skipped on phones, on data-saver / 2G connections and for "reduce motion" visitors (they keep the still)
   - `revealAfterMs`: don't fade in before this many ms after navigation start (lets an intro animation finish) */
export function AnimatedLayer({
  src,
  when = "idle",
  revealAfterMs = 0,
}: {
  src: string;
  when?: "idle" | "visible";
  revealAfterMs?: number;
}) {
  const holder = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false); // start downloading
  const [ready, setReady] = useState(false); // downloaded and allowed to show

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    const lowData = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
    if (lowData) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let cancelled = false;
    let io: IntersectionObserver | undefined;

    const idle = (cb: () => void) => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback;
      if (ric) ric(cb, { timeout: 2500 });
      else setTimeout(cb, 300);
    };
    const begin = () => {
      if (!cancelled) setMounted(true);
    };
    const afterLoad = () => {
      if (cancelled) return;
      if (when === "visible" && holder.current) {
        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              io?.disconnect();
              idle(begin);
            }
          },
          { rootMargin: "700px 0px" },
        );
        io.observe(holder.current);
      } else {
        idle(begin);
      }
    };

    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    return () => {
      cancelled = true;
      io?.disconnect();
      window.removeEventListener("load", afterLoad);
    };
  }, [when]);

  return (
    <span ref={holder} aria-hidden className={styles.animatedHolder}>
      {mounted && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          decoding="async"
          draggable={false}
          onLoad={() => {
            const wait = Math.max(0, revealAfterMs - performance.now());
            window.setTimeout(() => setReady(true), wait);
          }}
          className={`${styles.animated} ${ready ? styles.animatedOn : ""}`}
        />
      )}
    </span>
  );
}
