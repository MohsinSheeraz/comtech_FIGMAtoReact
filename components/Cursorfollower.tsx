"use client";

import { useEffect, useRef } from "react";

const SIZE = 14; // sphere diameter in px
const EASE = 0.1; // 0-1: lower = floatier / slower follow

/* A soft 30px sphere that trails the real cursor. The normal system cursor is untouched.
   - ignores touch pointers (phones/tablets), but works on touch-screen laptops with a mouse
   - skipped for people who prefer reduced motion
   - grows slightly while hovering links / buttons / form fields
   - cancels the page-wide `html { zoom }` from viewport-scale.css so it stays exactly under the cursor */
export function CursorFollower() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let tx = 0, ty = 0; // target = real cursor
        let x = 0, y = 0; // sphere position (eased)
        let scale = 1, targetScale = 1;
        let shown = false;
        let raf = 0;

        // viewport-scale.css zooms <html> by --z on laptop widths; give the sphere the inverse zoom
        const syncZoom = () => {
            const z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--z")) || 1;
            el.style.zoom = String(1 / z);
        };
        syncZoom();

        const onMove = (e: PointerEvent) => {
            if (e.pointerType === "touch") return;
            tx = e.clientX;
            ty = e.clientY;
            if (!shown) {
                // first move: appear right under the cursor instead of flying in from the corner
                x = tx;
                y = ty;
                shown = true;
                el.style.opacity = "1";
            }
        };

        const onOver = (e: PointerEvent) => {
            const t = e.target as Element | null;
            targetScale = t?.closest?.("a, button, [role='button'], [role='tab'], input, textarea, select, label") ? 1.8 : 1;
        };

        const onLeave = () => {
            shown = false;
            el.style.opacity = "0";
        };

        const tick = () => {
            x += (tx - x) * EASE;
            y += (ty - y) * EASE;
            scale += (targetScale - scale) * EASE;
            el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0) scale(${scale})`;
            raf = requestAnimationFrame(tick);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onOver, { passive: true });
        window.addEventListener("resize", syncZoom);
        document.documentElement.addEventListener("mouseleave", onLeave);
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerover", onOver);
            window.removeEventListener("resize", syncZoom);
            document.documentElement.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
            style={{
                width: SIZE,
                height: SIZE,
                // soft purple sphere that matches the site's accent (#7950e2)
                background: "white",
                boxShadow: "0 0 18px rgba(121,80,226,.45)",
            }}
        />
    );
}