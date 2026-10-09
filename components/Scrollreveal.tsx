"use client";
import { motion, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { useMemo, type CSSProperties, type ReactNode } from "react";

/* Reveals its content as a shared scroll `progress` (from useScrollProgress) goes from `from` to `to`:
   0 = hidden (invisible, slightly smaller), 1 = fully shown. Scroll back up and it hides again.

   It writes two CSS variables (--rv = opacity, --rs = scale) instead of setting opacity directly, so the
   caller decides WHERE they apply (e.g. only on desktop):
     always:        className={REVEAL}
     desktop only:  className="min-[1101px]:[opacity:var(--rv,1)] min-[1101px]:[scale:var(--rs,1)]"
   Without those classes the element is simply always visible. */

export const REVEAL = "[opacity:var(--rv,1)] [scale:var(--rs,1)]";

export function ScrollReveal({
    progress, from, to, className, style, children,
}: {
    progress: MotionValue<number>;
    from: number;
    to: number;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}) {
    const input = useMemo(() => [from, to], [from, to]);
    const rv = useTransform(progress, input, [0, 1], { clamp: true });
    const rs = useTransform(rv, [0, 1], [0.9, 1]);
    return (
        <motion.div className={className} style={{ ...style, "--rv": rv, "--rs": rs } as unknown as MotionStyle}>
            {children}
        </motion.div>
    );
}