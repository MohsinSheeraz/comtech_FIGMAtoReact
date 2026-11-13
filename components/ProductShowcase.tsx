"use client";

import Image from "next/image";
import { useRef } from "react";

type Item = { title: string; text: string; image: string };

const Arrow = ({ dir }: { dir: "l" | "r" }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className={dir === "l" ? "rotate-180" : ""}
  >
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export function ProductShowcase({ items }: { items: Item[] }) {
  const row = useRef<HTMLDivElement>(null);
  const go = (d: number) => {
    const el = row.current;
    if (el) el.scrollBy({ left: d * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={row}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => (
          <article
            key={it.title}
            className="card gborder-new w-[88%] shrink-0 snap-start p-5 sm:w-[46%] min-[1101px]:w-[calc(33.333%-16px)]"
          >
            <div className="relative h-[210px] overflow-hidden rounded-[24px] bg-[#040404]">
              <Image src={it.image} alt={it.title} fill sizes="400px" className="object-contain p-4" />
            </div>
            <h3 className="mt-6 text-[26px] font-medium leading-[34px] tracking-tighter">{it.title}</h3>
            <p className="mt-3 text-[16px] leading-[26px] tracking-tighter text-white/80">{it.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="grid size-[42px] cursor-pointer place-items-center rounded-[4px] bg-[#1c1c1c] text-white/70 transition hover:bg-[#2a2a2a] hover:text-white"
        >
          <Arrow dir="l" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="grid size-[42px] cursor-pointer place-items-center rounded-[4px] bg-gradient-to-b from-[#5724d8] to-[#7950e2] text-black transition hover:brightness-125"
        >
          <Arrow dir="r" />
        </button>
      </div>
    </div>
  );
}