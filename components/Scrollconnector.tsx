"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useId, useMemo, useRef, type RefObject } from "react";

/* A dashed connector (plus its dot(s)) that DRAWS as you scroll down and UNDRAWS as you scroll up.
   The visible dashed path is untouched (same d, colour, width, dash pattern). A mask reveals it:
   the mask is the same path drawn as a solid line whose length is tied to scroll position, so the
   dashes stay dashes the whole time. Put it inside an <svg>.

   Progress is read from an element's on-screen position (getBoundingClientRect), so it stays correct when
   the stage is scaled. 0 = element top reaches `start` (fraction of viewport height), 1 = element bottom reaches `end`.

   NEW: the progress can now be SHARED. Call `useScrollProgress(ref)` in the parent, pass the result to several
   connectors (`progress` + `range`) and to <ScrollReveal> cards, so cards can appear exactly when the line reaches them.
   Without `progress`, every connector works exactly as before (measures its own path). */

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
  progress?: MotionValue<number>; // shared 0..1 progress from useScrollProgress (optional)
  range?: [number, number]; // part of the shared progress this connector draws over, e.g. [0.2, 0.5]
};

const PARTNERS_DOT: DotStyle = { outer: 24, inner: 13, outerFill: "rgba(124,88,230,0.45)", innerFill: "#7C58E6" };
const SPRING = { stiffness: 110, damping: 26, mass: 0.6 };
const ZERO_ONE = [0, 1];
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Smoothed 0..1 scroll progress of `ref`'s element. Reduced motion = always 1 (everything shown). */
export function useScrollProgress(ref: RefObject<Element | null>, start = 0.85, end = 0.5, enabled = true) {
  const reduce = useReducedMotion();
  const raw = useMotionValue(0);
  const smooth = useSpring(raw, SPRING);
  const progress = useTransform(smooth, clamp01);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    let first = true;
    const update = () => {
      let v = 1;
      if (!reduce) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        v = (vh * start - r.top) / ((start - end) * vh + r.height);
      }
      raw.set(v);
      if (first) { smooth.jump(v); first = false; } // no draw-in from zero on page load
    };
    update();
    if (reduce) return;
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, enabled, reduce, start, end, raw, smooth]);

  return progress;
}

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
  progress: shared, range,
}: Props) {
  const reduce = useReducedMotion();
  const id = "sc" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<SVGPathElement>(null);
  const own = useScrollProgress(ref, start, end, !shared); // only measures when no shared progress is given
  const r0 = range?.[0] ?? 0;
  const r1 = range?.[1] ?? 1;
  const inputRange = useMemo(() => [r0, r1], [r0, r1]);
  const progress = useTransform(shared ?? own, inputRange, ZERO_ONE, { clamp: true });
  const list: DotSpec[] = dots ?? (dot ? [{ ...dot, at }] : []);

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