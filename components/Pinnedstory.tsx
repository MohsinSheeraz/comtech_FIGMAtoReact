"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "@/app/pinned-story.css";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };

type Props = {
  glow?: ReactNode;      // decorative background glow (stays pinned with the content)
  head: ReactNode;       // heading + button, always visible while pinned
  cards: ReactNode[];    // one entry per card; they swap in the same spot
  media: ReactNode;      // the image block on the right
};

/* Scroll-driven stacked cards, like the reference site's "Assist / Guide / Resolve" section.
   - Track: a tall element. Stage: sticky inside it. Scroll progress through the track picks which card is shown.
   - Per frame we only write opacity/transform (no React re-render), so it stays smooth with Lenis.
   - Everything is measured in screen pixels (getBoundingClientRect/innerHeight), so it is correct
     with the laptop-fit zoom in app/viewport-scale.css. */
export function PinnedStory({ glow, head, cards, media }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const dots = useRef<(HTMLElement | null)[]>([]);
  const count = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"pinned" | "classic" | null>(null);
  const n = cards.length;

  // 1) pick the mode: pinned needs a desktop-width screen, motion allowed, and enough height to hold the stage
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1101px) and (prefers-reduced-motion: no-preference)");
    const decide = () => {
      const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      setMode(mq.matches && window.innerHeight / zoom >= 740 ? "pinned" : "classic");
    };
    decide();
    mq.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => { mq.removeEventListener("change", decide); window.removeEventListener("resize", decide); };
  }, []);

  // 2a) classic mode: simple rise-in per card
  useEffect(() => {
    if (mode !== "classic") return;
    const els = items.current.filter(Boolean) as HTMLDivElement[];
    els.forEach((el) => { el.dataset.rise = "0"; });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.rise = "1"; io.unobserve(e.target); } }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => { io.disconnect(); els.forEach((el) => { delete el.dataset.rise; }); };
  }, [mode]);

  // 2b) pinned mode: drive the cards from scroll progress
  useEffect(() => {
    if (mode !== "pinned") return;
    const t = track.current, s = stage.current;
    if (!t || !s) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const tr = t.getBoundingClientRect();
      const sr = s.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp(-tr.top / Math.max(1, tr.height - sr.height));   // 0 -> 1 through the pinned stretch
      const u = p * (n - 1);                                           // 0 -> n-1 : card index in progress
      const intro = smooth((vh * 0.95 - tr.top) / (vh * 0.45));       // first card "comes up" as the section appears

      let active = 0, best = -1;
      items.current.forEach((el, i) => {
        if (!el) return;
        // hold -> old card fades up and away -> new card comes up from below -> hold
        const inP = i === 0 ? intro : smooth((u - (i - 1) - 0.3) / 0.45);
        const outP = i === n - 1 ? 0 : smooth((u - i - 0.12) / 0.35);
        const op = inP * (1 - outP);
        const y = (1 - inP) * 72 - outP * 56;
        const sc = 0.965 + 0.035 * inP - 0.02 * outP;
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${sc.toFixed(4)})`;
        el.style.visibility = op < 0.01 ? "hidden" : "visible";
        el.inert = op < 0.5;                       // hidden cards can't be tabbed to or clicked
        if (op > best) { best = op; active = i; }
      });

      dots.current.forEach((d, i) => { if (d) { if (i === active) d.setAttribute("data-active", ""); else d.removeAttribute("data-active"); } });
      if (count.current) count.current.textContent = `${String(active + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    };

    const request = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
      items.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = ""; el.style.transform = ""; el.style.visibility = ""; el.inert = false;
      });
    };
  }, [mode, n]);

  return (
    <section className="relative isolate wrap sec">
      <div ref={track} className={`why-track${mode === "pinned" ? " is-pinned" : ""}`} style={{ "--n": n } as CSSProperties}>
        <div ref={stage} className="why-sticky relative">
          {glow}
          <div className="why">
            <div>
              {head}
              <div className="stack">
                {cards.map((card, i) => (
                  <div key={i} className="pin-card" ref={(el) => { items.current[i] = el; }}>{card}</div>
                ))}
              </div>
              <div className="why-dots" aria-hidden>
                {cards.map((_, i) => <i key={i} ref={(el) => { dots.current[i] = el; }} />)}
                <span ref={count} />
              </div>
            </div>
            {media}
          </div>
        </div>
      </div>
    </section>
  );
}