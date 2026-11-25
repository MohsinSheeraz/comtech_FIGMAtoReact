"use client";
import { useId } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { usePathname } from "next/navigation";
import { EASE } from "@/components/Reveal";
import { COMTECH_LOGO, partnerFromPath } from "@/lib/partnerLockup";
import "@/app/partner-lockup.css";

// floating gems: [left %, top %, size (cqw), delay s]
const GEMS: [number, number, number, number][] = [
  [41, 13, 2.6, 0],
  [95, 17, 1.6, 1.2],
  [3, 88, 1.7, 0.6],
  [55, 90, 2.4, 1.8],
  [89, 55, 1.2, 2.4],
  [11, 30, 1.2, 0.9],
];

/* Glowing "Comtech + Partner" card (partner hero + FAQ side panel, same look).
   Plays once on scroll-in, then idles. Mouse tilt is desktop only.
   Reduced motion = shown finished, no movement.
   `layout` is kept so existing usages keep working; both layouts now render the same card. */
export function PartnerLockup({
  float = true,
  className = "",
}: {
  layout?: "row" | "stack";
  float?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const partner = partnerFromPath(usePathname() ?? "");
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  // mouse tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 16 });
  const sy = useSpring(my, { stiffness: 110, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const card: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: EASE, staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease: EASE } },
  };
  const fade: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1.4, ease: EASE } },
  };
  const side = (d: number): Variants => ({
    hidden: { opacity: 0, x: d * 50, filter: "blur(8px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE } },
  });
  const plus: Variants = {
    hidden: { opacity: 0, scale: 0.2, rotate: -90 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 150, damping: 14 } },
  };

  const L = "M 296 -10 C 373 150 373 350 296 510";
  const R = "M 504 -10 C 427 150 427 350 504 510";

  return (
    <motion.div
      variants={card}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={`lk ${float ? "lk--float" : ""} gborder-new ${className}`}
    >
      <div className="lk-bg" aria-hidden>
        <span className="lk-glow" />
        {GEMS.map(([l, t, s, d], i) => (
          <i
            key={i}
            className="lk-gem"
            style={{ left: `${l}%`, top: `${t}%`, width: `${s}cqw`, height: `${s}cqw`, animationDelay: `${d}s` }}
          />
        ))}
      </div>

      {/* the ) ( arcs */}
      <svg className="lk-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id={`f${uid}`} cx="50%" cy="50%" r="55%">
            <stop offset="0" stopColor="#c05cff" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#7a2cf0" stopOpacity="0.75" />
            <stop offset="1" stopColor="#3a14a8" stopOpacity="0.15" />
          </radialGradient>
          <linearGradient id={`l${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff5ad8" />
            <stop offset="0.5" stopColor="#c04dff" />
            <stop offset="1" stopColor="#5ad0ff" />
          </linearGradient>
          <linearGradient id={`r${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9a4ff" />
            <stop offset="0.55" stopColor="#8aa4ff" />
            <stop offset="1" stopColor="#4fe0ff" />
          </linearGradient>
        </defs>

        <motion.path
          variants={fade}
          className="lk-fill"
          d={`${L} L 504 510 C 427 350 427 150 504 -10 Z`}
          fill={`url(#f${uid})`}
        />

        {/* faint outer arcs */}
        <motion.path variants={draw} d="M 226 -10 C 326 150 326 350 226 510" className="lk-faint" />
        <motion.path variants={draw} d="M 574 -10 C 474 150 474 350 574 510" className="lk-faint" />

        {/* glow + core line */}
        <motion.path variants={draw} d={L} className="lk-halo" stroke={`url(#l${uid})`} />
        <motion.path variants={draw} d={L} className="lk-line" stroke={`url(#l${uid})`} />
        <motion.path variants={draw} d={R} className="lk-halo" stroke={`url(#r${uid})`} />
        <motion.path variants={draw} d={R} className="lk-line" stroke={`url(#r${uid})`} />
      </svg>

      <motion.span variants={plus} aria-hidden className="lk-plus" />

      <motion.div variants={side(-1)} className="lk-logo lk-logo-l">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={COMTECH_LOGO} alt="Comtech Associates" />
      </motion.div>

      <motion.div variants={side(1)} className="lk-logo lk-logo-r">
        {partner.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={partner.src} alt={partner.name} className={partner.plate ? "lk-white" : ""} />
        ) : (
          <span className="lk-name">{partner.name}</span>
        )}
      </motion.div>
    </motion.div>
  );
}