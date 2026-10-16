import Image from "next/image";
import { HeroLightScroll } from "@/components/HeroLightScroll";

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

/* Layer the same blue-purple background gradient beneath the animated lights on every hero. */
const glowBg =
  "radial-gradient(ellipse 680px 620px at 95% 30%, #1b1232 0%, rgba(27,18,50,.5) 44%, rgba(27,18,50,.18) 68%, transparent 100%), radial-gradient(ellipse 680px 560px at 12% 22%, #122344 0%, rgba(18,35,68,.46) 44%, rgba(18,35,68,.16) 68%, transparent 100%)";


export const PageGlows = (_props: { variant?: "home" | "inner" }) => (
  <div
    aria-hidden
    // h = 100vh, divided by --z so it still spans the full screen height when the page is scaled (see viewport-scale.css)
    className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[calc(100vh/var(--z,1))] overflow-hidden [mask-image:linear-gradient(to_bottom,black_62%,transparent)]"
  >
    <div className="absolute inset-0" style={{ background: glowBg }} />
    {/* moving light rays and drifting orbs */}
    <div className="hl">
      <i className="hl-cone" />
      <i className="hl-orb hl-o1" />
      <i className="hl-orb hl-o2" />
      <i className="hl-ray" />
      <i className="hl-ray hl-ray-b" />
    </div>
    <HeroLightScroll />
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