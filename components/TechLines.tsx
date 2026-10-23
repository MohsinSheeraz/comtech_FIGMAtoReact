"use client";

import { useEffect, useState } from "react";

type Pt = [number, number];
type Link = { a: Pt; b: Pt; k?: number; amp?: number };

// Stage space (1262 x 570), same as before. Sphere centre / radius from your reference.
const W = 1262;
const H = 570;
const CX = 644;
const CY = 280;

/* ---- card edge anchors (stage units) ----
   Derived from the card widths/gaps in TechnologySection.tsx (1cqw = 12.62 units, card height ~95).
   If a line doesn't meet a card edge exactly, nudge the matching number here. */
const L1R: Pt = [262, 142], L2R: Pt = [377, 285], L3R: Pt = [321, 428]; // left cards, right edge
const R1L: Pt = [998, 142], R2L: Pt = [941, 285], R3L: Pt = [1022, 428]; // right cards, left edge
const C1L: Pt = [479, 206], C1R: Pt = [783, 206], C1B: Pt = [631, 254]; // Collaboration
const C2L: Pt = [469, 363], C2R: Pt = [793, 363], C2T: Pt = [631, 316]; // Wireless

const LINKS: Link[] = [
  // left cards -> centre cards
  { a: L1R, b: C1L },
  { a: L2R, b: C1L, k: 0.6 },
  { a: L2R, b: C2L, k: 0.6 },
  { a: L3R, b: C2L },
  // centre cards -> right cards
  { a: C1R, b: R1L },
  { a: C1R, b: R2L, k: 0.6 },
  { a: C2R, b: R2L, k: 0.6 },
  { a: C2R, b: R3L },
  // centre cards to each other
  { a: C1B, b: C2T, amp: 6 },
  // stacked cards on each side
  { a: [50, 190], b: [50, 237], amp: 7 },
  { a: [50, 333], b: [50, 380], amp: 7 },
  { a: [1212, 190], b: [1212, 237], amp: 7 },
  { a: [1212, 333], b: [1212, 380], amp: 7 },
];

// smooth cubic between two anchors: horizontal S-curve for wide links, vertical for tall ones
function ctrl(l: Link): [Pt, Pt, Pt, Pt] {
  const [ax, ay] = l.a;
  const [bx, by] = l.b;
  const dx = bx - ax;
  const dy = by - ay;
  const k = l.k ?? 0.5;
  return Math.abs(dx) >= Math.abs(dy)
    ? [l.a, [ax + dx * k, ay], [bx - dx * k, by], l.b]
    : [l.a, [ax, ay + dy * 0.5], [bx, by - dy * 0.5], l.b];
}

// push the two control points sideways (perpendicular to the chord) = gentle wobble
function wobble([p0, p1, p2, p3]: [Pt, Pt, Pt, Pt], amt: number): [Pt, Pt, Pt, Pt] {
  const dx = p3[0] - p0[0];
  const dy = p3[1] - p0[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return [p0, [p1[0] + nx * amt, p1[1] + ny * amt], [p2[0] - nx * amt, p2[1] - ny * amt], p3];
}

const d = ([p0, p1, p2, p3]: [Pt, Pt, Pt, Pt]) =>
  `M${p0[0]} ${p0[1]} C${p1[0].toFixed(1)} ${p1[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} ${p3[0]} ${p3[1]}`;

const built = LINKS.map((l, i) => {
  const c = ctrl(l);
  const amp = l.amp ?? 16;
  const d0 = d(c);
  return {
    d0,
    values: [d0, d(wobble(c, amp)), d0, d(wobble(c, -amp)), d0].join(";"),
    morph: 8 + (i % 4) * 1.5, // seconds for one breathing cycle
    flow: 3.4 + (i % 5) * 0.7, // seconds for the light packet to cross the line
    delay: i * 0.9,
  };
});

// de-duplicated port dots where lines meet the cards
const ports: Pt[] = Array.from(new Map(LINKS.flatMap((l) => [l.a, l.b]).map((p) => [p.join(), p])).values());

const ORBITS = [
  { rx: 300, ry: 98, rot: -20, flow: 9, delay: 0 },
  { rx: 272, ry: 90, rot: 24, flow: 12, delay: 4 },
];

const KEY_TIMES = "0;0.25;0.5;0.75;1";
const KEY_SPLINES = Array(4).fill("0.45 0 0.55 1").join(";");

export function TechLines() {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(m.matches);
    const on = () => setStill(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  const common = { fill: "none", strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full min-[1101px]:block"
      style={{ filter: "drop-shadow(0 0 5px rgba(139,92,246,.4))" }}
    >
      <defs>
        {/* purple on the left -> blue on the right, across the whole stage */}
        <linearGradient id="tech-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
          <stop offset="0" stopColor="#b392ff" />
          <stop offset="0.5" stopColor="#7c6cf5" />
          <stop offset="1" stopColor="#5aa9ff" />
        </linearGradient>
        <radialGradient id="tech-core">
          <stop offset="0" stopColor="#7c3aed" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#4c1fc4" stopOpacity="0.12" />
          <stop offset="1" stopColor="#4c1fc4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* breathing energy core behind everything */}
      <circle className="tech-breathe" cx={CX} cy={CY} r={300} fill="url(#tech-core)" />

      {/* orbit rings around the sphere */}
      {ORBITS.map((o, i) => (
        <g key={`o${i}`} transform={`rotate(${o.rot} ${CX} ${CY})`}>
          <ellipse cx={CX} cy={CY} rx={o.rx} ry={o.ry} stroke="url(#tech-grad)" strokeWidth={1} strokeOpacity={0.22} {...common} />
          {!still && (
            <ellipse
              cx={CX} cy={CY} rx={o.rx} ry={o.ry} pathLength={1000}
              stroke="#f1ecff" strokeWidth={2} strokeOpacity={0.8} strokeDasharray="60 940"
              className="tech-flow"
              style={{ animationDuration: `${o.flow}s`, animationDelay: `${-o.delay}s` }}
              {...common}
            />
          )}
        </g>
      ))}

      {/* smooth links between the cards */}
      {built.map((b, i) => {
        const morph = still ? null : (
          <animate
            attributeName="d"
            values={b.values}
            keyTimes={KEY_TIMES}
            keySplines={KEY_SPLINES}
            calcMode="spline"
            dur={`${b.morph}s`}
            begin={`${-b.delay}s`}
            repeatCount="indefinite"
          />
        );
        const lag = 0.155 * b.flow; // tail trails the head by this many seconds
        return (
          <g key={i}>
            <path d={b.d0} stroke="url(#tech-grad)" strokeWidth={5} strokeOpacity={0.1} {...common}>{morph}</path>
            <path d={b.d0} stroke="url(#tech-grad)" strokeWidth={1.5} strokeOpacity={0.55} {...common}>{morph}</path>
            {!still && (
              <>
                {/* fading tail */}
                <path
                  d={b.d0} pathLength={1000} stroke="url(#tech-grad)" strokeWidth={3} strokeOpacity={0.55}
                  strokeDasharray="200 800" className="tech-flow"
                  style={{ animationDuration: `${b.flow}s`, animationDelay: `${-b.delay + lag}s` }}
                  {...common}
                >{morph}</path>
                {/* bright light packet */}
                <path
                  d={b.d0} pathLength={1000} stroke="#f6f2ff" strokeWidth={2.4}
                  strokeDasharray="45 955" className="tech-flow"
                  style={{ animationDuration: `${b.flow}s`, animationDelay: `${-b.delay}s` }}
                  {...common}
                >{morph}</path>
              </>
            )}
          </g>
        );
      })}

      {/* glowing ports where the lines meet the cards (cards sit above, so only the outer half shows) */}
      {ports.map(([x, y], i) => (
        <g key={`p${i}`}>
          <circle cx={x} cy={y} r={7} fill="#7c6cf5" opacity={0.25} />
          <circle cx={x} cy={y} r={3} fill="#e4dbff">
            {!still && (
              <animate attributeName="opacity" values="1;0.35;1" dur={`${2.2 + (i % 4) * 0.5}s`} begin={`${-i * 0.4}s`} repeatCount="indefinite" />
            )}
          </circle>
        </g>
      ))}
    </svg>
  );
}