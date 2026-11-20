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
import { HideInAdmin } from "@/components/HideInAdmin";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorFollower } from "@/components/Cursorfollower";
import { PageTransition } from "@/components/PageTransition";
import { getPostsPage } from "@/lib/posts";

export const metadata: Metadata = {
  metadataBase: new URL("https://justforexamplefornow.com"),
  title: "Comtech Associates",
  description:
    "Enterprise IT solutions: networking, cybersecurity, data centers and managed IT across Pakistan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040404",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { items } = await getPostsPage(1);
  const menuPosts = items.slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    image: p.thumbnailImage || p.image,
  }));

  return (
    <html lang="en" data-pt-theme="dark">
      <body>
        <SmoothScroll />{" "}
        <HideInAdmin>
          <CursorFollower />
        </HideInAdmin>{" "}
        <PageTransition />{" "}
        <HideInAdmin>
          <Header posts={menuPosts} />
        </HideInAdmin>
        {children}
        <HideInAdmin>
          <Footer />
        </HideInAdmin>
      </body>
    </html>
  );
}
