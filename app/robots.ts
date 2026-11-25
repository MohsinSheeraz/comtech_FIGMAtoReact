import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Staging builds (NOINDEX=1) block every crawler.
  if (process.env.NOINDEX === "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://comtech.net.pk/sitemap.xml",
  };
}
