import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        // cover images uploaded from the admin are served from Vercel Blob
        remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    },
    async redirects() {
        return [
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
                ],
            },
        ];
    },
};

export default nextConfig;