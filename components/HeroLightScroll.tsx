"use client";
import { useEffect } from "react";

/* Parallax for the hero light rays (.hl-ray).
   The variable is written on the rays' own container (.hl), never on <html>: changing a custom
   property on the root re-computes the style of every element on the page on every scroll frame,
   which is what made scrolling stutter. If the rays are not in the markup this does nothing. */
export function HeroLightScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = document.querySelector<HTMLElement>(".page-glows .hl");
    if (!target) return;

    let raf = 0;
    let last = NaN;
    const update = () => {
      raf = 0;
      const y = Math.round(-window.scrollY * 0.16);
      if (y === last) return;
      last = y;
      target.style.setProperty("--hl-py", `${y}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
