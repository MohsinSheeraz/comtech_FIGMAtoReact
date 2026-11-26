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
import { AnimGate } from "@/components/AnimGate";
import { PageTransition } from "@/components/PageTransition";
import { getPostsPage } from "@/lib/posts";

export const metadata: Metadata = {
  metadataBase: new URL("https://comtech.net.pk"),
  title: "Comtech Associates | IT Solutions Provider in Pakistan",
  description:
    "Comtech delivers Cisco networking, cybersecurity, data center and software solutions across Pakistan. Talk to our team to strengthen your IT.",
  openGraph: {
    type: "website",
    title: "Comtech Associates | IT Solutions Provider in Pakistan",
    description:
      "Comtech delivers Cisco networking, cybersecurity, data center and software solutions across Pakistan. Talk to our team to strengthen your IT.",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Comtech Associates IT solutions across Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comtech Associates | IT Solutions Provider in Pakistan",
    description:
      "Comtech delivers Cisco networking, cybersecurity, data center and software solutions across Pakistan. Talk to our team to strengthen your IT.",
    images: ["/opengraph-image"],
  },
  // Staging builds (NOINDEX=1) are kept out of search engines.
  ...(process.env.NOINDEX === "1" ? { robots: { index: false, follow: false } } : {}),
};

// Pages are pre-rendered, then refreshed in the background at most every 5 minutes, so
// SEO edits from /admin/seo come back after a redeploy even if the build had no database.
// (Saving in the admin also refreshes the page immediately.)
export const revalidate = 300;

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Comtech Associates",
              url: "https://comtech.net.pk",
              telephone: "+92 213 4404440",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92 213 4404440",
                contactType: "customer service",
              },
            }),
          }}
        />
        <SmoothScroll />{" "}
        <AnimGate />
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
