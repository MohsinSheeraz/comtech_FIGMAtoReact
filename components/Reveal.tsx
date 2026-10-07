"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* One easing + one duration for the whole site = the "everything feels the same smooth" look
   of the reference. Use sparingly: hero is NOT revealed (page fade handles it), only a few sections. */
export const EASE = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: motion.div, section: motion.section, article: motion.article,
  h2: motion.h2, h3: motion.h3, p: motion.p, span: motion.span, li: motion.li,
} as const;

type Props = {
  as?: keyof typeof tags;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  id?: string;
  children: ReactNode;
};

/* Polymorphic on purpose: swap <section className="x"> for <Reveal as="section" className="x">
   and no extra wrapper div appears, so your existing CSS selectors keep working. */
export function Reveal({ as = "div", delay = 0, y = 28, duration = 0.8, className, id, children }: Props) {
  const reduce = useReducedMotion();
  const Tag = tags[as] as typeof motion.div;
  if (reduce) return <Tag id={id} className={className}>{children}</Tag>;
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}