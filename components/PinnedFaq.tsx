"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Faq } from "@/components/Faq";
import { FaqBreeze } from "@/components/Faqbreeze";
import { EASE } from "@/components/Reveal";

export function PinnedFaq({
  head,
  items,
  className = "",
  visual,
}: {
  head: ReactNode;
  items: [string, string][];
  className?: string;
  visual?: ReactNode; // optional card under the heading (partner pages). Replaces the "?" particles.
}) {
  const reduce = useReducedMotion();
  const animate = !!visual && !reduce;

  return (
    <div className={className}>
      <div className="faq relative isolate">
        {!visual && (
          <FaqBreeze
            className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
            x={0.22}
            y={0.62}
            size={0.42}
          />
        )}
        <motion.div
          initial={animate ? { opacity: 0, x: -28 } : false}
          whileInView={animate ? { opacity: 1, x: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {head}
          {visual && <div className="mx-auto mt-10 lg:mx-0">{visual}</div>}
        </motion.div>
        <Faq items={items} reveal={!!visual} />
      </div>
    </div>
  );
}