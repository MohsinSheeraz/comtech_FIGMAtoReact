"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/* Page-to-page transition engine.
   - Catches clicks on internal links, plays the "out" phase (html.pt-out), THEN navigates.
   - When the new route is mounted, removes html.pt-out so the new page reveals itself.
   - Styles live in app/page-transition.css. Skipped for reduced-motion users and for
     modified clicks (ctrl/cmd/shift), new-tab links, downloads, hash-only and same-page links. */

const OUT_MS = 480; // keep in sync with the "out" transition time in page-transition.css

export function PageTransition() {
    const router = useRouter();
    const path = usePathname();
    const first = useRef(true);
    const busy = useRef(false);
    const timers = useRef<number[]>([]);

    const later = (fn: () => void, ms: number) => {
        timers.current.push(window.setTimeout(fn, ms));
    };

    // 1) intercept internal link clicks
    useEffect(() => {
        const root = document.documentElement;

        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const a = (e.target as Element | null)?.closest?.("a");
            if (!a || !a.getAttribute("href")) return;
            if (a.target && a.target !== "_self") return;
            if (a.hasAttribute("download")) return;

            let url: URL;
            try {
                url = new URL(a.href, window.location.href);
            } catch {
                return;
            }
            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname) return; // same page / hash / query: normal behaviour

            e.preventDefault();
            if (busy.current) return; // already transitioning
            busy.current = true;

            root.classList.add("pt-out");
            later(() => router.push(url.pathname + url.search + url.hash), OUT_MS);
            // safety net: never leave the page stuck hidden
            later(() => {
                root.classList.remove("pt-out");
                busy.current = false;
            }, 5000);
        };

        document.addEventListener("click", onClick, true);
        return () => {
            document.removeEventListener("click", onClick, true);
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, [router]);

    // 2) new route is in the DOM: reveal it
    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        const root = document.documentElement;
        // two frames so the new page paints once in its charged state, then relaxes
        const id = requestAnimationFrame(() =>
            requestAnimationFrame(() => {
                root.classList.remove("pt-out");
                busy.current = false;
            })
        );
        return () => cancelAnimationFrame(id);
    }, [path]);

    return null;
}