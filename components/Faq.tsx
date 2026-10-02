"use client";
import { useState } from "react";

export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-5">
      {items.map(([q, a], i) => {
        const o = open === i;
        return (
          <div key={q} className="rounded-[30px] border border-[#242424] bg-[#080808] px-5 py-6 sm:px-10 sm:py-9">
            <button type="button" aria-expanded={o} onClick={() => setOpen(o ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-5 text-left text-[20px] leading-[28px] sm:text-[26px] sm:leading-[33px] font-medium tracking-[-0.04em] text-white">
              {q}
              <span aria-hidden className={`grid size-8 shrink-0 place-items-center text-4xl font-normal transition-transform duration-300 ${o ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${o ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden"><p className="pt-5">{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
