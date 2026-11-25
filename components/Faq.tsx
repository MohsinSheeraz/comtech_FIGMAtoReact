"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/Reveal";

export function Faq({
  items,
  className,
  open: openProp,
  onToggle,
  reveal = false,
}: {
  items: [string, string][];
  className?: string;
  open?: number | null; // pass this to control it from outside (pinned mode)
  onToggle?: (i: number) => void;
  reveal?: boolean; // cards rise in one after another when they scroll into view
}) {
  const [inner, setInner] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const on = reveal && !reduce;
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : inner;
  const toggle = (i: number) =>
    controlled ? onToggle?.(i) : setInner(open === i ? null : i);

  return (
    <div className={`flex flex-col gap-5 ${className ?? ""}`}>
      {items.map(([q, a], i) => {
        const o = open === i;
        return (
          <motion.div
            key={q}
            initial={on ? { opacity: 0, y: 36 } : false}
            whileInView={on ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            className={`gborder-new rounded-[30px] border border-[#242424] bg-[#080808] px-5 py-6 transition-shadow duration-500 sm:px-10 sm:py-9 ${
              o ? "shadow-[0_0_44px_rgba(121,80,226,.2)]" : ""
            }`}
          >
            <button
              type="button"
              aria-expanded={o}
              onClick={() => toggle(i)}
              className="flex w-full cursor-pointer items-center justify-between gap-5 text-left text-[20px] leading-[28px] sm:text-[26px] sm:leading-[33px] font-medium tracking-[-0.04em] text-white"
            >
              {q}
              <span
                aria-hidden
                className={`grid size-8 shrink-0 place-items-center text-4xl font-normal transition-transform duration-300 ${o ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${o ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="pt-5">{a}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}