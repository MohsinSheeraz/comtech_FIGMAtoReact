"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BORDER_GRADIENT } from "@/components/PartnersUI";

type Item = { title: string; text: string };

const STEP_VH = 45; // scroll distance per item while pinned (bigger = slower)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* "Why Cisco: A Technology Partner With a Stated Purpose"
   Desktop: heading + list + panel are pinned; scrolling moves the active item (big number on the left,
   its text cross-fades on the right). Phones / tablets / short windows / reduced motion: click to switch.
   Measured in screen pixels, so it works with the laptop-fit zoom in app/viewport-scale.css. */
export function WhyCisco({ heading, items }: { heading: ReactNode; items: Item[] }) {
  const n = items.length;
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // pinned needs a desktop-width screen, motion allowed, and enough height to hold the stage
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1101px) and (prefers-reduced-motion: no-preference)");
    const decide = () => {
      const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      setPinned(mq.matches && window.innerHeight / zoom >= 740);
    };
    decide();
    mq.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      mq.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  // pinned: scroll progress picks the active item
  useEffect(() => {
    if (!pinned) return;
    const t = track.current,
      s = stage.current;
    if (!t || !s) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const tr = t.getBoundingClientRect();
      const sr = s.getBoundingClientRect();
      const p = clamp(-tr.top / Math.max(1, tr.height - sr.height));
      setActive(Math.min(n - 1, Math.floor(p * n))); // same value = no re-render
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
    };
  }, [pinned, n]);

  const select = (i: number) => {
    if (!pinned) return setActive(i);
    const t = track.current,
      s = stage.current;
    if (!t || !s) return;
    const tr = t.getBoundingClientRect();
    const total = tr.height - s.getBoundingClientRect().height;
    window.scrollTo({ top: tr.top + window.scrollY + ((i + 0.5) / n) * total, behavior: "smooth" });
  };

  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div
      ref={track}
      style={pinned ? { height: `calc(100vh / var(--z, 1) + ${n * STEP_VH}vh / var(--z, 1))` } : undefined}
    >
      <div
        ref={stage}
        className={pinned ? "flex flex-col justify-center p-16!" : ""}
        style={pinned ? { position: "sticky", top: 0, height: "calc(100vh / var(--z, 1))" } : undefined}
      >
        {heading}

        <div className="mx-auto mt-10 grid w-full max-w-[1440px] items-center gap-8 lg:mt-[60px] lg:grid-cols-[minmax(0,7fr)_minmax(0,13fr)] lg:gap-[60px]">
          {/* numbered list */}
          <div role="tablist" aria-orientation="vertical" aria-label="Why Cisco">
            {items.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.title}
                  type="button"
                  role="tab"
                  id={`why-tab-${i}`}
                  aria-selected={on}
                  aria-controls="why-panel"
                  onClick={() => select(i)}
                  style={{ height: on ? 112 : 72, color: on ? "#8B4DE0" : "#5e506f" }}
                  className="flex w-full cursor-pointer items-center border-b border-white/15 text-left tracking-normal transition-[height,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                >
                  <span className="flex items-center gap-[18px] text-2xl!">
                    <span
                      style={{ fontSize: on ? 64 : 19, lineHeight: 1 }}
                      className="tracking-tight transition-[font-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    >
                      {num(i)}.
                    </span>
                    <span
                      style={{ fontSize: on ? 20 : 19 }}
                      className="leading-[26px] transition-[font-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    >
                      {it.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* detail panel: every text sits in the same cell, the active one fades/slides in */}
          <div className="rounded-[32px] p-px lg:-translate-y-12" style={{ background: BORDER_GRADIENT }}>
            <div
              id="why-panel"
              role="tabpanel"
              aria-labelledby={`why-tab-${active}`}
              className="grid min-h-[220px] rounded-[31px] px-6 py-8 lg:min-h-[260px] lg:px-[44px]"
              style={{ background: "linear-gradient(180deg,#0c0818 0%,#080808 100%)" }}
            >
              {items.map((it, i) => (
                <p
                  key={it.title}
                  aria-hidden={i !== active}
                  className={`col-start-1 row-start-1 self-center text-[18px] leading-[30px] text-white transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:text-[22px] lg:leading-[36px] ${
                    i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  {it.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}