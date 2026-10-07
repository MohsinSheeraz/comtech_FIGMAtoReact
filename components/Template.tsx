"use client";
import { motion } from "motion/react";

/* template.tsx (unlike layout.tsx) re-mounts on every navigation,
   so every page fades in. Header and Footer stay put (they live in layout.tsx).
   Opacity only on purpose: no transform, so sticky cards and the full-height hero glow are not affected. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}