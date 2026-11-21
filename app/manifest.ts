import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Comtech Associates",
    short_name: "Comtech",
    description:
      "IT solutions provider delivering networking, cybersecurity, data center, and software services across Pakistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#040404",
    theme_color: "#040404",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
