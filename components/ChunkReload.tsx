"use client";

import { useEffect } from "react";

// After a deploy, a browser that still holds an OLD page asks for script files that no longer exist.
// The page then loads without its JavaScript (mega menu dead, sections un-styled). This notices a
// failed /_next/static file and reloads the page once, which fetches the current version.
export function ChunkReload() {
  useEffect(() => {
    const KEY = "chunk-reload-at";
    const reload = () => {
      const last = Number(sessionStorage.getItem(KEY) || 0);
      if (Date.now() - last < 60_000) return; // never loop
      sessionStorage.setItem(KEY, String(Date.now()));
      window.location.reload();
    };
    const onResourceError = (e: Event) => {
      const t = e.target as (HTMLScriptElement & HTMLLinkElement) | null;
      const url = t?.src || t?.href || "";
      if (url.includes("/_next/static/")) reload();
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const r = e.reason as { name?: string; message?: string } | undefined;
      if (r?.name === "ChunkLoadError" || /Loading chunk|Failed to load chunk/i.test(r?.message ?? "")) reload();
    };
    window.addEventListener("error", onResourceError, true); // resource errors don't bubble
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onResourceError, true);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
