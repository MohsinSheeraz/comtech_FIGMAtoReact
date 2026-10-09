import Image from "next/image";

export const Glow = ({
  className = "",
  color = "rgba(38,80,200,.6)",
}: {
  className?: string;
  color?: string;
}) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute z-0 rounded-full blur-[120px] ${className}`}
    style={{ background: color }}
  />
);

/* Hero background glows: ONE gradient for every page (the Home design):
   blue glow on the left, purple on the right, with the contour-line texture (wavesImg.png) on top.
   `variant` is still accepted so existing pages keep working, but "inner" now renders the same
   look as "home". */
const glowBg =
  "radial-gradient(ellipse 560px 600px at 95% 33%, var(--glow-a) 0%, color-mix(in srgb, var(--glow-a) 60%, transparent) 50%, transparent 100%), radial-gradient(ellipse 560px 540px at 14% 23%, var(--glow-b) 0%, color-mix(in srgb, var(--glow-b) 55%, transparent) 45%, transparent 100%)";

export const PageGlows = (_props: { variant?: "home" | "inner" }) => (
  <div
    aria-hidden
    // h = 100vh, divided by --z so it still spans the full screen height when the page is scaled (see viewport-scale.css)
    className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[calc(100vh/var(--z,1))] overflow-hidden [mask-image:linear-gradient(to_bottom,black_62%,transparent)]"
  >
    {/* gradient layer */}
    <div className="absolute inset-0" style={{ background: glowBg }} />
    {/* waves layer */}
    <div className="absolute inset-0 opacity-50">
      {[0, 1].map((n) => (
        <Image key={n} src="/images/wavesImg.png" alt="" fill priority={n === 0} sizes="75vw" className="object-contain" />
      ))}
    </div>
  </div>
);

/* Full-width background gradient used behind About / Services sections */
export const SectionGlow = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-[5%] inset-y-0 z-0 rounded-b-[80px] bg-[linear-gradient(0deg,#040404_8%,rgba(69,22,187,.45)_43%,#040404_81%)]"
  />
);