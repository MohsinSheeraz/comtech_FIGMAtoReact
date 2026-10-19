import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-sans/500-italic.css";
import "./globals.css";
import "./viewport-scale.css";
import "./page-transition.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorFollower } from "@/components/Cursorfollower";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://justforexamplefornow.com"),
  title: "Comtech Associates",
  description: "Enterprise IT solutions: networking, cybersecurity, data centers and managed IT across Pakistan."
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#040404" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-pt-theme = colour of the page-change light: "light" | "dark" | "vivid" (presets live in app/page-transition.css)
    <html lang="en" data-pt-theme="dark">
      <body><SmoothScroll /> <CursorFollower /> <PageTransition /> <Header />{children}<Footer /></body>
    </html>
  );
}