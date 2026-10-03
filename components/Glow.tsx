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

/* Hero background glows.
   variant="home"  -> purple right + blue left, with the contour-line texture (wavesImg.png) stacked twice on top.
   variant="inner" -> same gradient mirrored (purple left + blue right), no waves image. Used on every page except Home. */
const glowBg = {
  home: "radial-gradient(ellipse 560px 600px at 95% 33%, #231547 0%, rgba(35,21,71,.6) 50%, transparent 100%), radial-gradient(ellipse 560px 540px at 14% 23%, #193479 0%, rgba(25,52,121,.55) 45%, transparent 100%)",
  inner:
    "radial-gradient(ellipse 560px 600px at 5% 10%, #231547 0%, rgba(35,21,71,.6) 50%, transparent 100%), radial-gradient(ellipse 560px 540px at 86% 23%, #193479 0%, rgba(25,52,121,.55) 45%, transparent 100%)",
};

export const PageGlows = ({
  variant = "home",
}: {
  variant?: "home" | "inner";
}) => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen overflow-hidden [mask-image:linear-gradient(to_bottom,black_62%,transparent)]"
  >
    {/* gradient layer */}
    <div className="absolute inset-0" style={{ background: glowBg[variant] }} />
    {/* waves layer (home only) */}
    {variant === "home" && (
      <div className="absolute inset-0 opacity-35">
        {[0, 1].map((n) => (
          <Image key={n} src="/images/wavesImg.png" alt="" fill priority={n === 0} sizes="75vw" className="object-contain" />
        ))}
      </div>
    )}
  </div>
);

/* Full-width background gradient used behind About / Services sections */
export const SectionGlow = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-[5%] inset-y-0 z-0 rounded-b-[80px] bg-[linear-gradient(0deg,#040404_8%,rgba(69,22,187,.45)_43%,#040404_81%)]"
  />
);