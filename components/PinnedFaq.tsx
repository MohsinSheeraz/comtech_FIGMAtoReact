"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Faq } from "@/components/Faq";
import "@/app/pinned-faq.css";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* Scroll-driven FAQ: the normal accordion, pinned in place. Scrolling opens the next question
   (its "+" rotates, the previous one closes). Clicking a question scrolls to it.
   Measured in screen pixels, so it stays correct with the laptop zoom in app/viewport-scale.css.
   Phones, tablets, short windows and reduced-motion visitors get the normal accordion. */
export function PinnedFaq({
  head, items, className = "",
}: {
  head: ReactNode;                 // heading + text (+ button) on the left
  items: [string, string][];
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pinned" | "classic" | null>(null);
  const [active, setActive] = useState(0);
  const n = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1101px) and (prefers-reduced-motion: no-preference)");
    const decide = () => {
      const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      setMode(mq.matches && window.innerHeight / zoom >= 700 ? "pinned" : "classic");
    };
    decide();
    mq.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => { mq.removeEventListener("change", decide); window.removeEventListener("resize", decide); };
  }, []);

  // scroll progress -> which question is open (React only re-renders when the index changes)
  useEffect(() => {
    if (mode !== "pinned") return;
    const t = track.current, s = stage.current;
    if (!t || !s) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const tr = t.getBoundingClientRect();
      const sr = s.getBoundingClientRect();
      const p = clamp(-tr.top / Math.max(1, tr.height - sr.height));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
    };
  }, [mode, n]);

  // clicking a question (or a dot) scrolls to the middle of that item's slice of the pinned stretch
  const jump = (i: number) => {
    const t = track.current, s = stage.current;
    if (!t || !s) return;
    const tr = t.getBoundingClientRect();
    const range = Math.max(1, tr.height - s.getBoundingClientRect().height);
    window.scrollTo({ top: window.scrollY + tr.top + ((i + 0.5) / n) * range });
  };

  const pinned = mode === "pinned";
  return (
    <div ref={track} className={`faq-track${pinned ? " is-pinned" : ""} ${className}`} style={{ "--n": n } as CSSProperties}>
      <div ref={stage} className="faq-sticky">
        <div className="faq">
          <div>
            {head}
            {pinned && (
              <div className="faq-dots">
                {items.map((_, i) => (
                  <button key={i} type="button" aria-label={`Show question ${i + 1}`} data-active={i === active ? "" : undefined} onClick={() => jump(i)} />
                ))}
                <span aria-hidden>{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              </div>
            )}
          </div>
          {pinned ? <Faq items={items} open={active} onToggle={jump} /> : <Faq items={items} />}
        </div>
      </div>
      {pinned && <div className="faq-spacer" aria-hidden />}
    </div>
  );
}