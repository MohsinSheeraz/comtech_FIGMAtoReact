"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Pauses the heavy decorative animations while their section is off screen.

   Some of them (the technology lines' stroke/morph animations, the CTA floor's background scroll, the
   liquid card's sweep) can't run on the GPU, so every frame they forced the browser to redo style and
   layout for the whole page, even when nobody could see them. That is what made scrolling stutter.

   Add `data-anim-gate` to any element whose animations should only run while it is visible.
   CSS animations are paused through the [data-anim-paused] rule in globals.css; SVG (SMIL) animations are
   paused with pauseAnimations(). */
const SELECTOR = ".liquid, .ctapanel, [data-anim-gate]";

type SvgLike = Element & { pauseAnimations?: () => void; unpauseAnimations?: () => void };

function setPaused(el: Element, paused: boolean) {
  if (paused) el.setAttribute("data-anim-paused", "");
  else el.removeAttribute("data-anim-paused");
  const svgs: SvgLike[] = el instanceof SVGSVGElement ? [el] : Array.from(el.querySelectorAll("svg"));
  for (const svg of svgs) {
    if (paused) svg.pauseAnimations?.();
    else svg.unpauseAnimations?.();
  }
}

export function AnimGate() {
  const path = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setPaused(e.target, !e.isIntersecting);
      },
      { rootMargin: "120px 0px" },
    );
    const els = Array.from(document.querySelectorAll(SELECTOR));
    // start paused: the observer un-pauses whatever is actually on screen right away
    els.forEach((el) => {
      setPaused(el, true);
      io.observe(el);
    });
    return () => {
      io.disconnect();
      els.forEach((el) => setPaused(el, false));
    };
  }, [path]);

  return null;
}
