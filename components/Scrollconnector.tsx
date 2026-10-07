"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useId, useRef } from "react";

/* A dashed connector (plus its dot(s)) that DRAWS as you scroll down and UNDRAWS as you scroll up.
   The visible dashed path is untouched (same d, colour, width, dash pattern). A mask reveals it:
   the mask is the same path drawn as a solid line whose length is tied to scroll position, so the
   dashes stay dashes the whole time. Put it inside an <svg>.

   Progress is read from the path's own on-screen position (getBoundingClientRect), so it stays correct when
   the stage is scaled. 0 = path top reaches `start` (fraction of viewport height), 1 = path bottom reaches `end`. */

type DotSpec = { x: number; y: number; at?: number }; // at = how far along the path (0..1); 0 = always visible
type DotStyle = { outer: number; inner: number; outerFill: string; innerFill: string };

type Props = {
  d: string;
  color: string;
  width: number; // svg viewBox/stage width (mask region)
  height: number; // svg viewBox/stage height (mask region)
  dot?: { x: number; y: number }; // single dot, see `at`
  at?: number;
  dots?: DotSpec[]; // several dots along one path
  dotStyle?: DotStyle;
  dash?: string;
  stroke?: number;
  linecap?: "butt" | "round" | "square";
  linejoin?: "miter" | "round" | "bevel";
  start?: number;
  end?: number;
};

const PARTNERS_DOT: DotStyle = { outer: 24, inner: 13, outerFill: "rgba(124,88,230,0.45)", innerFill: "#7C58E6" };

function DotMarker({ x, y, at, progress, s }: { x: number; y: number; at: number; progress: MotionValue<number>; s: DotStyle }) {
  const to = Math.max(at, 0.001);
  const from = Math.max(0, to - 0.06);
  const opacity = useTransform(progress, [from, to], [0, 1]);
  const scale = useTransform(progress, [from, to], [0.4, 1]);
  return (
    <motion.g style={at <= 0 ? undefined : { opacity, scale, transformBox: "fill-box", transformOrigin: "center" }}>
      <circle cx={x} cy={y} r={s.outer} fill={s.outerFill} />
      <circle cx={x} cy={y} r={s.inner} fill={s.innerFill} />
    </motion.g>
  );
}

export function ScrollConnector({
  d, color, width, height, dot, at = 1, dots, dotStyle = PARTNERS_DOT,
  dash = "8 5", stroke = 2.5, linecap, linejoin, start = 0.85, end = 0.5,
}: Props) {
  const reduce = useReducedMotion();
  const id = "sc" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<SVGPathElement>(null);
  const raw = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 110, damping: 26, mass: 0.6 });
  const progress = useTransform(smooth, (v) => Math.min(1, Math.max(0, v)));
  const list: DotSpec[] = dots ?? (dot ? [{ ...dot, at }] : []);

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

  // reduced motion: show the finished drawing, no animation
  if (reduce) {
    return (
      <g>
        <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={dash} strokeLinecap={linecap} strokeLinejoin={linejoin} />
        {list.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={dotStyle.outer} fill={dotStyle.outerFill} />
            <circle cx={p.x} cy={p.y} r={dotStyle.inner} fill={dotStyle.innerFill} />
          </g>
        ))}
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
      <path
        ref={ref} d={d} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={dash}
        strokeLinecap={linecap} strokeLinejoin={linejoin} mask={`url(#${id})`}
      />
      {list.map((p, i) => (
        <DotMarker key={i} x={p.x} y={p.y} at={p.at ?? 1} progress={progress} s={dotStyle} />
      ))}
    </g>
  );
}