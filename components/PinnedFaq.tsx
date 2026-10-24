"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Faq } from "@/components/Faq";
import "@/app/pinned-faq.css";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const noop = () => {};

/* Scroll-driven FAQ: the normal accordion, pinned in place. Scrolling opens the next question
   (its "+" rotates, the previous one closes). Clicking a question scrolls to it.
   Measured in screen pixels, so it stays correct with the laptop zoom in app/viewport-scale.css.
   Phones, tablets, short windows and reduced-motion visitors get the normal accordion.

   pin="top"    (default, unchanged) the block pins near the top of the screen.
   pin="bottom" the block pins to the BOTTOM of the screen as soon as it is fully visible, shows every
                question one by one, then the page carries on. Its height is locked to the tallest
                state so nothing jumps when the open question changes. */
export function PinnedFaq({
  head, items, className = "", pin = "top",
}: {
  head: ReactNode;                 // heading + text (+ button) on the left
  items: [string, string][];
  className?: string;
  pin?: "top" | "bottom";
}) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const measure = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pinned" | "classic" | null>(null);
  const [active, setActive] = useState(0);
  const [rightH, setRightH] = useState<number | undefined>(undefined);
  const n = items.length;
  const bottom = pin === "bottom";

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

  const pinned = mode === "pinned";
  const lock = pinned && bottom;

  // bottom mode: measure the tallest open-question state once, then keep the block that tall
  useEffect(() => {
    if (!lock) return;
    const m = measure.current;
    if (!m) return;
    const calc = () => setRightH(Math.max(0, ...Array.from(m.children, (c) => (c as HTMLElement).offsetHeight)));
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(m);
    return () => ro.disconnect();
  }, [lock]);

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
      const range = Math.max(1, tr.height - sr.height);
      // top pin: starts when the track's top reaches the screen top.
      // bottom pin: starts when the block's bottom edge reaches the screen bottom.
      const p = bottom ? clamp((window.innerHeight - sr.height - tr.top) / range) : clamp(-tr.top / range);
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
  }, [mode, n, bottom, rightH]);

  // clicking a question (or a dot) scrolls to the middle of that item's slice of the pinned stretch
  const jump = (i: number) => {
    const t = track.current, s = stage.current;
    if (!t || !s) return;
    const tr = t.getBoundingClientRect();
    const sh = s.getBoundingClientRect().height;
    const range = Math.max(1, tr.height - sh);
    const f = (i + 0.5) / n;
    const top = bottom
      ? window.scrollY + tr.top - (window.innerHeight - sh) + f * range
      : window.scrollY + tr.top + f * range;
    window.scrollTo({ top });
  };

  return (
    <div
      ref={track}
      className={`faq-track${pinned ? " is-pinned" : ""}${lock ? " faq-bottom" : ""} ${className}`}
      style={{ "--n": n } as CSSProperties}
    >
      {/* bottom pin: the scroll distance comes first, the block sticks to the bottom of the screen after it */}
      {lock && <div className="faq-spacer" aria-hidden />}
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
          {!pinned ? (
            <Faq items={items} />
          ) : lock ? (
            <div className="relative" style={rightH ? { minHeight: rightH } : undefined}>
              <Faq items={items} open={active} onToggle={jump} />
              {/* hidden copies, one per open question, only used to measure the tallest state */}
              <div ref={measure} aria-hidden inert className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10">
                {items.map((_, i) => (
                  <Faq key={i} items={items} open={i} onToggle={noop} />
                ))}
              </div>
            </div>
          ) : (
            <Faq items={items} open={active} onToggle={jump} />
          )}
        </div>
      </div>
      {pinned && !bottom && <div className="faq-spacer" aria-hidden />}
    </div>
  );
}
