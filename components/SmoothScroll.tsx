"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/* Site-wide smooth scroll (same library the reference site uses).
   Mounted once in app/layout.tsx. Touch devices keep native scrolling. */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const path = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out: soft landing
    });
    lenisRef.current = lenis;
    let raf = 0;
    const tick = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; };
  }, []);

  // New page = start at the top (skipped on first load so a refresh keeps its position, and for #hash links)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [path]);

  return null;
}