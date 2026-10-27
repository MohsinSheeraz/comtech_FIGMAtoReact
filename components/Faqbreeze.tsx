"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** centre of the "?" as a fraction of this box's width / height (0–1) */
  x?: number;
  y?: number;
  /** height of the "?" as a fraction of this box's height */
  size?: number;
  /** particle count on desktop (scaled down on small screens) */
  count?: number;
  className?: string;
};

/* ---- timeline (seconds) ---- */
const CYCLE = 11;
const ARRIVE_SPREAD = 1.4; // particles start arriving at random moments in this window
const ARRIVE_DUR = 2.2; // each particle's flight time in
const DEPART_START = 7.2;
const DEPART_SPREAD = 1.2;
const DEPART_DUR = 2.2;

type Particle = {
  tx: number; ty: number; // target on the "?"
  sx: number; sy: number; // off-screen start (right)
  ex: number; ey: number; // off-screen exit (right)
  ad: number; dd: number; // arrive / depart delays
  ph: number; amp: number; big: boolean;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (u: number) => 1 - Math.pow(1 - u, 3);
const easeIn = (u: number) => Math.pow(u, 2.4);
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function place(p: Particle, t: number, out: number[]) {
  if (t < DEPART_START) {
    const ua = clamp01((t - p.ad) / ARRIVE_DUR);
    const e = easeOut(ua);
    out[0] = p.sx + (p.tx - p.sx) * e;
    out[1] = p.sy + (p.ty - p.sy) * e + Math.sin(e * 6.5 + p.ph) * p.amp * (1 - e);
    const sh = smooth(0.85, 1, ua); // tiny shimmer once settled
    out[0] += Math.sin(t * 1.7 + p.ph * 3) * 0.9 * sh;
    out[1] += Math.cos(t * 1.3 + p.ph * 2) * 0.9 * sh;
  } else {
    const ud = clamp01((t - DEPART_START - p.dd) / DEPART_DUR);
    const d = easeIn(ud);
    out[0] = p.tx + (p.ex - p.tx) * d;
    out[1] = p.ty + (p.ey - p.ty) * d + Math.sin(d * 6.5 + p.ph) * p.amp * d;
    const sh = 1 - smooth(0, 0.12, ud);
    out[0] += Math.sin(t * 1.7 + p.ph * 3) * 0.9 * sh;
    out[1] += Math.cos(t * 1.3 + p.ph * 2) * 0.9 * sh;
  }
}

export function FaqBreeze({
  x = 0.22,
  y = 0.62,
  size = 0.42,
  count = 700,
  className = "absolute inset-0 h-full w-full pointer-events-none",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, cx = 0, cy = 0, gr = 0;
    let ps: Particle[] = [];
    let raf = 0, visible = true, t0 = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tmp = [0, 0], prev = [0, 0];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w * x; cy = h * y;
      const gh = h * size; gr = gh * 0.9;

      // rasterise a bold "?" and sample particle targets from its pixels
      const box = Math.ceil(gh * 1.8);
      const off = document.createElement("canvas");
      off.width = off.height = box;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      const fam = getComputedStyle(canvas).fontFamily || "sans-serif";
      o.font = `700 ${Math.round(gh / 0.72)}px ${fam}`;
      o.textAlign = "center"; o.textBaseline = "middle"; o.fillStyle = "#fff";
      o.fillText("?", box / 2, box / 2);
      const data = o.getImageData(0, 0, box, box).data;
      const pts: number[][] = [];
      let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
      for (let j = 0; j < box; j += 2)
        for (let i = 0; i < box; i += 2)
          if (data[(j * box + i) * 4 + 3] > 128) {
            pts.push([i, j]);
            minX = Math.min(minX, i); maxX = Math.max(maxX, i);
            minY = Math.min(minY, j); maxY = Math.max(maxY, j);
          }
      const ox = cx - (minX + maxX) / 2, oy = cy - (minY + maxY) / 2;
      for (let i = pts.length - 1; i > 0; i--) { // shuffle
        const k = (Math.random() * (i + 1)) | 0; [pts[i], pts[k]] = [pts[k], pts[i]];
      }
      const n = Math.min(pts.length, Math.round(count * (w < 700 ? 0.55 : 1)));
      ps = [];
      for (let i = 0; i < n; i++) {
        const tx = pts[i][0] + ox + (Math.random() - 0.5) * 2;
        const ty = pts[i][1] + oy + (Math.random() - 0.5) * 2;
        const nx = (pts[i][0] - minX) / Math.max(1, maxX - minX);
        ps.push({
          tx, ty,
          sx: w + 30 + Math.random() * w * 0.35,
          sy: cy + (Math.random() - 0.5) * h * 0.45,
          ex: w + 40 + Math.random() * w * 0.3,
          ey: cy + (Math.random() - 0.5) * h * 0.5 - h * 0.05,
          ad: Math.random() * ARRIVE_SPREAD,
          dd: (nx * 0.6 + Math.random() * 0.4) * DEPART_SPREAD, // blown off left → right
          ph: Math.random() * Math.PI * 2,
          amp: 14 + Math.random() * 34,
          big: Math.random() < 0.1,
        });
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const g = smooth(2.2, 3.8, t) * (1 - smooth(7.3, 9.0, t));
      if (g > 0.01) {
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, gr);
        grd.addColorStop(0, `rgba(123,85,224,${0.34 * g})`);
        grd.addColorStop(1, "rgba(123,85,224,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(cx - gr, cy - gr, gr * 2, gr * 2);
      }
      ctx.lineWidth = 1;
      for (const p of ps) {
        place(p, t, tmp); place(p, t - 0.06, prev);
        const px = tmp[0], py = tmp[1];
        if (px > w + 60) continue;
        const dx = px - prev[0], dy = py - prev[1];
        const sp = Math.hypot(dx, dy);
        if (sp > 0.8) {
          const a = Math.min(0.7, sp / 9);
          ctx.strokeStyle = `rgba(160,120,255,${a})`;
          ctx.beginPath(); ctx.moveTo(px, py);
          ctx.lineTo(px - dx * 2.6, py - dy * 2.6); ctx.stroke();
        }
        const flying = sp > 0.8;
        const a = flying ? 0.9 : 0.6 + 0.4 * Math.sin(t * 2 + p.ph * 5);
        const r = p.big ? 2.1 : 1.3;
        ctx.fillStyle = `rgba(150,110,255,${a * 0.14})`;
        ctx.beginPath(); ctx.arc(px, py, r * 3.4, 0, 6.2832); ctx.fill();
        ctx.fillStyle = `rgba(240,228,255,${a})`;
        ctx.beginPath(); ctx.arc(px, py, r, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      draw(((now - t0) / 1000) % CYCLE);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduce) {
      draw(DEPART_START - 1); // static, fully formed "?"
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => { build(); if (reduce) draw(DEPART_START - 1); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [x, y, size, count]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}