import Image from "next/image";

export const Glow = ({ className = "", color = "rgba(38,80,200,.6)" }: { className?: string; color?: string }) => (
  <div aria-hidden className={`pointer-events-none absolute z-0 rounded-full blur-[120px] ${className}`} style={{ background: color }} />
);

/* Hero background: blue/purple glow + contour lines.
   banner-img.png is a light image, so it is inverted + hue-rotated to suit the dark theme. */
export const PageGlows = () => (
  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1000px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
    <Image src="/images/banner-img.png" alt="" width={1920} height={1005} priority sizes="100vw"
      className="h-full w-full max-w-none object-cover opacity-80 [filter:invert(1)_hue-rotate(180deg)]" />
  </div>
);

/* Full-width background gradient used behind About / Services sections */
export const SectionGlow = () => (
  <div aria-hidden className="pointer-events-none absolute inset-x-[5%] inset-y-0 z-0 rounded-b-[80px] bg-[linear-gradient(0deg,#040404_8%,rgba(69,22,187,.45)_43%,#040404_81%)]" />
);