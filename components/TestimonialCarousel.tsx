"use client";
import Image from "next/image";
import { useState } from "react";

/* Add more testimonials here; the arrows loop through them. */
const items = [
    { quote: "“Comtech's Cisco ACI deployment gave our data center the speed and simplicity we needed. The centralized visibility and control have made a real difference in how confidently we can scale.\"", name: "Bank Islami", title: "Unleashing the Power of Cisco ACI" },
];

const Arrow = ({ dir }: { dir: "l" | "r" }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={dir === "l" ? "rotate-180" : ""}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);

/* ---- Globe overlay (all coordinates are in a 100×100 box over the image) ----
   GLOBE_R = radius of the earth *inside* the PNG, as % of image width. If the lines spill outside
   the planet or stop short of its edge, tweak this one number (try 38–46). */
const GLOBE_R = 42;
const MERIDIANS = 8;
const PARALLELS = [-60, -30, 0, 30, 60]; // degrees of latitude
const NODES: [number, number][] = [[30, 38], [62, 30], [70, 58], [40, 66]];
/* [from, to, control point] — control pushed outward so arcs float above the surface */
const ARCS: [number, number, [number, number]][] = [
    [0, 1, [46, 18]], [1, 2, [86, 40]], [2, 3, [60, 86]], [3, 0, [16, 58]], [0, 2, [52, 44]],
];

function GlobeLines() {
    const R = GLOBE_R;
    return (
        <svg viewBox="0 0 100 100" aria-hidden className="globe-fx pointer-events-none absolute inset-0 h-full w-full">
            <defs>
                <linearGradient id="gl-line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#049fd9" />
                    <stop offset=".55" stopColor="#7950e2" />
                    <stop offset="1" stopColor="#5724d8" />
                </linearGradient>
                <clipPath id="gl-clip"><circle cx="50" cy="50" r={R} /></clipPath>
            </defs>

            {/* rim */}
            <circle cx="50" cy="50" r={R} fill="none" stroke="url(#gl-line)" strokeWidth=".35" className="gl-rim" />

            <g clipPath="url(#gl-clip)">
                {/* latitude rings (static, subtle) */}
                {PARALLELS.map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                        <ellipse key={deg} cx="50" cy={50 - R * Math.sin(rad)} rx={R * Math.cos(rad)} ry={R * Math.cos(rad) * 0.16}
                            fill="none" stroke="url(#gl-line)" strokeWidth=".18" opacity=".35" />
                    );
                })}
                {/* meridians: scaleX follows |cos| so it reads as a turning sphere */}
                {Array.from({ length: MERIDIANS }, (_, i) => (
                    <ellipse key={i} cx="50" cy="50" rx={R} ry={R} fill="none" stroke="url(#gl-line)" strokeWidth=".22"
                        className="gl-meridian" style={{ animationDelay: `-${(i * 26) / MERIDIANS}s` }} />
                ))}
            </g>

            {/* network arcs with travelling light */}
            {ARCS.map(([a, b, c], i) => {
                const d = `M${NODES[a][0]} ${NODES[a][1]} Q${c[0]} ${c[1]} ${NODES[b][0]} ${NODES[b][1]}`;
                return (
                    <g key={i}>
                        <path d={d} fill="none" stroke="url(#gl-line)" strokeWidth=".2" opacity=".35" />
                        <path d={d} pathLength={100} fill="none" stroke="#fff" strokeWidth=".55" strokeLinecap="round"
                            className="gl-pulse" style={{ animationDelay: `-${i * 1.3}s` }} />
                    </g>
                );
            })}

            {/* nodes */}
            {NODES.map(([x, y], i) => (
                <g key={i}>
                    <circle cx={x} cy={y} r="1" fill="#fff" />
                    <circle cx={x} cy={y} r="1" fill="none" stroke="#049fd9" strokeWidth=".3" className="gl-node"
                        style={{ animationDelay: `-${i * 0.7}s` }} />
                </g>
            ))}

            {/* tilted orbit with a satellite */}
            <g transform="rotate(-22 50 50)">
                <ellipse cx="50" cy="50" rx={R + 7} ry={R * 0.3} fill="none" stroke="url(#gl-line)" strokeWidth=".2" opacity=".5" />
                <circle r=".9" fill="#7950e2" className="gl-sat">
                    <animateMotion dur="14s" repeatCount="indefinite"
                        path={`M${50 + R + 7} 50 A${R + 7} ${R * 0.3} 0 1 1 ${50 - R - 7} 50 A${R + 7} ${R * 0.3} 0 1 1 ${50 + R + 7} 50`} />
                </circle>
            </g>
        </svg>
    );
}

export function TestimonialCarousel() {
    const [i, setI] = useState(0);
    const [show, setShow] = useState(true);
    const go = (d: number) => {
        setShow(false);
        setTimeout(() => { setI((v) => (v + d + items.length) % items.length); setShow(true); }, 220);
    };
    const t = items[i];
    return (
        <div className="mt-12 min-[1101px]:mt-24 grid items-center gap-10 min-[1101px]:grid-cols-[1fr_minmax(0,636px)]">
            <div className="max-w-[640px]">
                <h2 className="h2">We Provide Real Results,<br />Real Partnerships</h2>
                <span className="bar mt-10! mb-10!" />
                <div aria-live="polite" className={`transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`}>
                    <p className="text-[18px] leading-[28px] sm:text-[24px] sm:leading-[37px] tracking-[-.06em]">{t.quote}</p>
                    <div className="mt-8 text-[18px] leading-[26px] sm:text-[24px] sm:leading-[32px] tracking-[-.04em]">{t.name}<br />{t.title}</div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-[42px] cursor-pointer place-items-center rounded-[4px] bg-[#1c1c1c] text-white/70 transition hover:bg-[#2a2a2a] hover:text-white"><Arrow dir="l" /></button>
                    <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid size-[42px] cursor-pointer place-items-center rounded-[4px] bg-gradient-to-b from-[#5724d8] to-[#7950e2] text-black transition hover:brightness-125"><Arrow dir="r" /></button>
                </div>
            </div>
            <style>{`
.globe-fx ellipse,.globe-fx path{vector-effect:non-scaling-stroke}
.gl-rim{animation:gl-rim 4s ease-in-out infinite}
@keyframes gl-rim{0%,100%{opacity:.4}50%{opacity:1}}

.gl-meridian{transform-box:fill-box;transform-origin:center;opacity:.55;animation:gl-turn 26s linear infinite}
@keyframes gl-turn{
  0%{transform:scaleX(1);animation-timing-function:cubic-bezier(.12,0,.39,0)}
  50%{transform:scaleX(0);animation-timing-function:cubic-bezier(.61,1,.88,1)}
  100%{transform:scaleX(1)}
}

.gl-pulse{stroke-dasharray:10 90;stroke-dashoffset:10;opacity:.9;animation:gl-flow 5s linear infinite}
@keyframes gl-flow{to{stroke-dashoffset:-90}}

.gl-node{transform-box:fill-box;transform-origin:center;animation:gl-ping 2.8s ease-out infinite}
@keyframes gl-ping{0%{transform:scale(1);opacity:.9}100%{transform:scale(5);opacity:0}}

@media (prefers-reduced-motion:reduce){
  .gl-rim,.gl-meridian,.gl-pulse,.gl-node{animation:none}
  .gl-meridian{transform:scaleX(.6)}
  .gl-sat{display:none}
}
`}</style>
            {/* earth stays still; the line layers above it do the moving */}
            <div className="relative mx-auto w-full max-w-[636px]">
                <Image src="/images/Partnership_Section_Image.png" alt="" width={636} height={636} className="h-auto w-full" />
                <GlobeLines />
            </div>
        </div>
    );
}