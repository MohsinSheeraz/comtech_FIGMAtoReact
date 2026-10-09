import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-sans/500-italic.css";
import "./globals.css";
import "./viewport-scale.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorFollower } from "@/components/Cursorfollower";

export const metadata: Metadata = { title: "Comtech Associates", description: "Enterprise IT solutions: networking, cybersecurity, data centers and managed IT across Pakistan." };

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "var(--bg)" };

// Runs before first paint: saved choice, else the system preference. Prevents a dark/light flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"#f6f5fb":"#040404")}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><SmoothScroll /> <CursorFollower />  <Header />{children}<Footer /></body></html>);
}