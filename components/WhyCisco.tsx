"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BORDER_GRADIENT } from "@/components/PartnersUI";

type Item = { title: string; text: string };

/* "Why Cisco": a numbered list with one open item.
   - Wide desktop screens: the block pins to the screen and scrolling steps through the items
     (the scroll length is STEP_VH of screen height per item).
   - Everything else (phones, tablets, short or reduced-motion screens): a plain accordion, tap to open.
   Rows keep the same size whether open or closed, so nothing jumps while you scroll. */

const STEP_VH = 40;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function WhyCisco({
  heading,
  items,
}: {
  heading: ReactNode;
  items: Item[];
}) {
  const n = items.length;
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1101px) and (prefers-reduced-motion: no-preference)",
    );
    const decide = () => {
      const zoom =
        parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
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
    window.scrollTo({
      top: tr.top + window.scrollY + ((i + 0.5) / n) * total,
      behavior: "smooth",
    });
  };

  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div
      ref={track}
      style={
        pinned
          ? {
              height: `calc(100vh / var(--z, 1) + ${n * STEP_VH}vh / var(--z, 1))`,
            }
          : undefined
      }
    >
      <div
        ref={stage}
        className={pinned ? "flex flex-col justify-center" : ""}
        style={
          pinned
            ? {
                position: "sticky",
                top: 0,
                height: "calc(100vh / var(--z, 1))",
              }
            : undefined
        }
      >
        {heading}

        <div className="mx-auto mt-8 grid w-full max-w-[1320px] gap-8 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14">
          {/* the list (an accordion on small screens) */}
          <ol className="m-0 list-none p-0" aria-label="Why Cisco">
            {items.map((it, i) => {
              const on = i === active;
              return (
                <li
                  key={it.title}
                  className={`relative border-b border-white/10 transition-colors duration-300 first:border-t lg:rounded-xl lg:border-0 ${
                    on ? "lg:bg-white/[0.05]" : "lg:hover:bg-white/[0.03]"
                  }`}
                >
                  {/* purple marker on the open item (desktop) */}
                  <span
                    aria-hidden
                    className={`absolute bottom-3 left-0 top-3 hidden w-[3px] rounded-full bg-[#8B4DE0] transition-opacity duration-300 lg:block ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <button
                    type="button"
                    id={`why-tab-${i}`}
                    aria-expanded={on}
                    aria-controls={`why-panel-${i}`}
                    onClick={() => select(i)}
                    className="flex min-h-[64px] w-full cursor-pointer items-center gap-4 py-3 text-left lg:gap-5 lg:px-6 lg:py-4"
                  >
                    <span
                      className={`w-8 shrink-0 text-[18px] font-medium tabular-nums transition-colors duration-300 lg:text-[20px] ${
                        on ? "text-[#b08cff]" : "text-white/40"
                      }`}
                    >
                      {num(i)}
                    </span>
                    <span
                      className={`flex-1 text-[19px] leading-[26px] transition-colors duration-300 lg:text-[21px] lg:leading-[28px] ${
                        on ? "text-white" : "text-white/60 hover:text-white/90"
                      }`}
                    >
                      {it.title}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className={`size-5 shrink-0 text-[#b08cff] transition-transform duration-300 lg:hidden ${
                        on ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* small screens: the text opens right under its title */}
                  <div
                    id={`why-panel-${i}`}
                    role="region"
                    aria-labelledby={`why-tab-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ${EASE} motion-reduce:transition-none lg:hidden ${
                      on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="pb-5 pl-12 pr-2 text-[17px] leading-[28px] text-white/85">
                        {it.text}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* right column: the open item's text (desktop) and the booth photo */}
          <div className="min-w-0">
            <div
              className="hidden rounded-[28px] p-px lg:block"
              style={{ background: BORDER_GRADIENT }}
            >
              <div
                aria-live="polite"
                className="relative grid rounded-[27px] px-10 py-9"
                style={{
                  background: "linear-gradient(180deg,#140b2a 0%,#0a0910 100%)",
                }}
              >
                {items.map((it, i) => (
                  <p
                    key={it.title}
                    aria-hidden={i !== active}
                    className={`col-start-1 row-start-1 self-center text-[22px] leading-[36px] text-white transition-[opacity,transform] duration-500 ${EASE} motion-reduce:transition-none ${
                      i === active
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    {it.text}
                  </p>
                ))}
                <span
                  aria-hidden
                  className="absolute bottom-3 right-6 text-[13px] tabular-nums text-white/40"
                >
                  {num(active)} / {num(n - 1)}
                </span>
              </div>
            </div>

            <Image
              src="/images/CiscoPartner_NestedImage.webp"
              alt="Comtech and Cisco partner exhibition booth"
              width={926}
              height={436}
              sizes="(min-width: 1024px) 55vw, 100vw"
              style={
                pinned
                  ? {
                      maxHeight: "calc(100vh / var(--z, 1) - 480px)",
                      minHeight: 220,
                    }
                  : undefined
              }
              className="h-auto w-full rounded-[22px] border border-white/10 object-cover lg:mt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
