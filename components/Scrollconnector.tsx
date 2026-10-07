"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useRef } from "react";

/* A dashed connector (plus its end dot) that DRAWS as you scroll down and UNDRAWS as you scroll up.
   The visible dashed path is untouched (same d, colour, width, dash pattern). A mask reveals it:
   the mask is the same path drawn as a solid line whose length is tied to scroll position, so the
   dashes stay dashes the whole time. Put it inside an <svg>.

   Progress is read from the path's own on-screen position (getBoundingClientRect), so it stays correct when
   the stage is scaled down on narrower screens. 0 = path top reaches `start` (fraction of viewport height),
   1 = path bottom reaches `end`. */
type Props = {
  d: string;
  color: string;
  width: number; // svg/stage width (mask region)
  height: number; // svg/stage height (mask region)
  dot?: { x: number; y: number };
  at?: number; // how far along the path (0..1) the dot sits; it pops in when the line reaches it
  dash?: string;
  stroke?: number;
  start?: number;
  end?: number;
};

export function ScrollConnector({ d, color, width, height, dot, at = 1, dash = "8 5", stroke = 2.5, start = 0.85, end = 0.5 }: Props) {
  const reduce = useReducedMotion();
  const id = "sc" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<SVGPathElement>(null);
  const raw = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 110, damping: 26, mass: 0.6 });
  const progress = useTransform(smooth, (v) => Math.min(1, Math.max(0, v)));
  const from = Math.max(0, at - 0.06);
  const dotOpacity = useTransform(progress, [from, at], [0, 1]);
  const dotScale = useTransform(progress, [from, at], [0.4, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let first = true;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = (vh * start - r.top) / ((start - end) * vh + r.height);
      raw.set(v);
      if (first) { smooth.jump(v); first = false; } // no draw-in from zero on page load
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [raw, smooth, reduce, start, end]);

  const dotEl = (props?: object) =>
    dot && (
      <motion.g {...props}>
        <circle cx={dot.x} cy={dot.y} r={24} fill="rgba(124,88,230,0.45)" />
        <circle cx={dot.x} cy={dot.y} r={13} fill="#7C58E6" />
      </motion.g>
    );

  // reduced motion: show the finished drawing, no animation
  if (reduce) {
    return (
      <g>
        <path d={d} stroke={color} strokeWidth={stroke} strokeDasharray={dash} />
        {dotEl()}
      </g>
    );
  }

  return (
    <g>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={0} y={0} width={width} height={height}>
          <motion.path d={d} fill="none" stroke="#fff" strokeWidth={stroke + 6} style={{ pathLength: progress }} />
        </mask>
      </defs>
      <path ref={ref} d={d} stroke={color} strokeWidth={stroke} strokeDasharray={dash} mask={`url(#${id})`} />
      {dotEl({ style: { opacity: dotOpacity, scale: dotScale, transformBox: "fill-box", transformOrigin: "center" } })}
    </g>
  );
}