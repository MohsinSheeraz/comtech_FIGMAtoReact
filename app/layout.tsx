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

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#040404" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><SmoothScroll /> <CursorFollower />  <Header />{children}<Footer /></body></html>);
}