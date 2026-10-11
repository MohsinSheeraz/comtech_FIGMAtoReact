"use client";

import { useEffect, useState } from "react";

type Pt = [number, number];
type Curve = (t: number) => Pt;
type Def = {
    base: Curve;
    amp: number;      // how far the bolt can wander (px)
    seg: number;      // number of jagged segments
    dur: number;      // seconds for one full writhe cycle
    delay: number;
    seed: number;
    opacity?: number;
    pulse?: boolean;  // travelling light surge
    fork?: { t: number; to: Pt };
};

// Stage space (1262 x 570). Sphere centre / radius measured from your reference.
const W = 1262;
const H = 570;
const CX = 644;
const CY = 280;
const R = 258;

// seeded random so server and client render identical markup
function rng(seed: number) {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const quad =
    (a: Pt, c: Pt, b: Pt): Curve =>
        (t) => {
            const u = 1 - t;
            return [
                u * u * a[0] + 2 * u * t * c[0] + t * t * b[0],
                u * u * a[1] + 2 * u * t * c[1] + t * t * b[1],
            ];
        };

const arc =
    (a0: number, a1: number, r = R * 0.97): Curve =>
        (t) => {
            const a = a0 + (a1 - a0) * t;
            return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
        };

// jagged lightning path along a base curve; sin envelope keeps both ends anchored
function jagged(base: Curve, amp: number, seg: number, rand: () => number) {
    const pts: Pt[] = [];
    for (let i = 0; i <= seg; i++) {
        const t = i / seg;
        const [x, y] = base(t);
        const [x1, y1] = base(Math.max(0, t - 0.01));
        const [x2, y2] = base(Math.min(1, t + 0.01));
        let nx = -(y2 - y1);
        let ny = x2 - x1;
        const len = Math.hypot(nx, ny) || 1;
        nx /= len;
        ny /= len;
        const j = (rand() * 2 - 1) * amp * Math.sin(Math.PI * t);
        pts.push([x + nx * j, y + ny * j]);
    }
    return pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
}

const defs: Def[] = [
    // ---- sphere -> cards (ends tuck under the cards)
    { base: quad([396, 205], [330, 150], [262, 142]), amp: 16, seg: 12, dur: 3.4, delay: 0, seed: 1, pulse: true, fork: { t: 0.45, to: [300, 82] } },
    { base: quad([402, 360], [345, 400], [324, 428]), amp: 16, seg: 12, dur: 3.8, delay: 1.1, seed: 2, pulse: true, fork: { t: 0.5, to: [352, 492] } },
    { base: quad([888, 205], [960, 150], [1000, 148]), amp: 16, seg: 12, dur: 3.6, delay: 0.6, seed: 3, pulse: true, fork: { t: 0.5, to: [940, 110] } },
    // ---- long bolts crossing the sphere (behind the centre cards)
    { base: quad([382, 286], [640, 215], [948, 285]), amp: 26, seg: 22, dur: 4.6, delay: 0.3, seed: 4, pulse: true, fork: { t: 0.35, to: [520, 150] } },
    { base: quad([382, 290], [650, 365], [1022, 432]), amp: 26, seg: 22, dur: 5.0, delay: 1.7, seed: 5, pulse: true, fork: { t: 0.7, to: [880, 512] } },
    // ---- arcs crawling around the sphere surface
    { base: arc(-2.7, -1.9), amp: 20, seg: 14, dur: 4.2, delay: 0.2, seed: 6, opacity: 0.8, pulse: true },
    { base: arc(-1.2, -0.4), amp: 20, seg: 14, dur: 4.8, delay: 1.4, seed: 7, opacity: 0.8, pulse: true },
    { base: arc(0.3, 1.1), amp: 20, seg: 14, dur: 4.4, delay: 2.2, seed: 8, opacity: 0.8, pulse: true },
    { base: arc(1.9, 2.7), amp: 20, seg: 14, dur: 5.2, delay: 0.9, seed: 9, opacity: 0.8, pulse: true },
    // ---- free tendrils shooting out into space
    { base: quad([410, 185], [350, 110], [300, 55]), amp: 14, seg: 10, dur: 3.2, delay: 0.5, seed: 10, opacity: 0.6, pulse: true },
    { base: quad([880, 190], [930, 120], [975, 60]), amp: 14, seg: 10, dur: 3.5, delay: 1.9, seed: 11, opacity: 0.6, pulse: true },
    { base: quad([420, 385], [360, 460], [320, 520]), amp: 14, seg: 10, dur: 3.7, delay: 2.4, seed: 12, opacity: 0.6, pulse: true },
    { base: quad([885, 375], [940, 450], [985, 515]), amp: 14, seg: 10, dur: 3.3, delay: 1.2, seed: 13, opacity: 0.6, pulse: true },
];

const bolts = defs
    .flatMap((d) => {
        const list: Def[] = [d];
        if (d.fork) {
            const s = d.base(d.fork.t);
            const to = d.fork.to;
            list.push({
                base: quad(s, [(s[0] + to[0]) / 2 + 10, (s[1] + to[1]) / 2 - 10], to),
                amp: d.amp * 0.6,
                seg: 8,
                dur: d.dur * 1.25,
                delay: d.delay + 0.7,
                seed: d.seed + 100,
                opacity: 0.7,
                pulse: false,
            });
        }
        return list;
    })
    .map((d, i) => {
        const rand = rng(d.seed * 7919);
        const v = Array.from({ length: 4 }, () => jagged(d.base, d.amp, d.seg, rand));
        return {
            first: v[0],
            values: [...v, v[0]].join(";"),
            dur: d.dur,
            delay: d.delay,
            opacity: d.opacity ?? 1,
            pulse: !!d.pulse,
            flicker: 1.8 + (i % 5) * 0.7,
            surge: 5 + (i % 4) * 1.6,
        };
    });

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

    return (
        <svg
            aria-hidden="true"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full min-[1101px]:block"
            style={{ filter: "drop-shadow(0 0 6px rgba(139,92,246,.55))" }}
        >
            <defs>
                {/* purple on the left of the sphere -> blue on the right, like the particles */}
                <linearGradient id="tech-grad" gradientUnits="userSpaceOnUse" x1="374" y1="0" x2="914" y2="0">
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

            {/* breathing energy core behind the bolts */}
            <circle className="tech-breathe" cx={CX} cy={CY} r={300} fill="url(#tech-core)" />

            {bolts.map((b, i) => {
                const morph = still ? null : (
                    <animate
                        attributeName="d"
                        values={b.values}
                        keyTimes={KEY_TIMES}
                        keySplines={KEY_SPLINES}
                        calcMode="spline"
                        dur={`${b.dur}s`}
                        begin={`${-b.delay}s`}
                        repeatCount="indefinite"
                    />
                );
                const common = {
                    fill: "none",
                    strokeLinejoin: "round" as const,
                    strokeLinecap: "round" as const,
                    vectorEffect: "non-scaling-stroke" as const,
                };
                return (
                    <g
                        key={i}
                        className="tech-flicker"
                        style={{ animationDuration: `${b.flicker}s`, animationDelay: `${-b.delay}s` }}
                    >
                        {/* soft glow */}
                        <path d={b.first} stroke="url(#tech-grad)" strokeWidth={6} strokeOpacity={0.16 * b.opacity} {...common}>
                            {morph}
                        </path>
                        {/* bolt body */}
                        <path d={b.first} stroke="url(#tech-grad)" strokeWidth={1.6} strokeOpacity={0.85 * b.opacity} {...common}>
                            {morph}
                        </path>
                        {/* travelling surge */}
                        {b.pulse && (
                            <path
                                d={b.first}
                                pathLength={1000}
                                stroke="#f1ecff"
                                strokeWidth={2}
                                strokeOpacity={b.opacity}
                                strokeDasharray="70 930"
                                className="tech-flow"
                                style={{ animationDuration: `${b.surge}s`, animationDelay: `${-b.delay}s` }}
                                {...common}
                            >
                                {morph}
                            </path>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}