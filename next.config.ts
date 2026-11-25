import type { NextConfig } from "next";

// NOINDEX=1 marks a staging build for cPanel: self-contained server bundle,
// no sharp-based image optimisation, and search engines kept out.
const isStaging = process.env.NOINDEX === "1";

const nextConfig: NextConfig = {
    ...(isStaging ? { output: "standalone" as const } : {}),
    images: {
        ...(isStaging ? { unoptimized: true } : {}),
        // cover images uploaded from the admin are served from Vercel Blob
        remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    },
    async redirects() {
        return [
            { source: "/services/cybersecurity", destination: "/services/cyber-security", permanent: true },
            { source: "/services/custom-software", destination: "/services/custom-software-development", permanent: true },
            { source: "/services/resourcing", destination: "/services/managed-it-services", permanent: true },
            { source: "/services/managed-it", destination: "/services/managed-it-services", permanent: true },
            { source: "/services/it-services", destination: "/services/managed-it-services", permanent: true },
            { source: "/services/it-resourcing", destination: "/services/managed-it-services", permanent: true },
            { source: "/services/it-asset-lifecycle", destination: "/services/managed-it-services", permanent: true },
            { source: "/services/desktop-support", destination: "/services/managed-it-services", permanent: true },
            { source: "/index", destination: "/", permanent: true },
            { source: "/favicon.ico", destination: "/icon", permanent: true },
        ];
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    // Staging builds (NOINDEX=1) tell crawlers not to index or follow anything.
                    ...(isStaging ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
                ],
            },
        ];
    },
};

export default nextConfig;