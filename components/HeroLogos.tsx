import { logos } from "./PartnerSlider";
import Image from "next/image";

/* Small, calm logo marquee for the hero. Pure CSS (no JS), seamless loop:
   the list is rendered twice and the track slides exactly -50%.
   Same logo assets as the partner slider further down the page. */
export function HeroLogos({ className = "" }: { className?: string }) {
  const set = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <div
          key={l.name}
          className={`flex h-[48px] w-[112px] shrink-0 items-center justify-center opacity-65 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 sm:h-[56px] sm:w-[136px] ${l.name === "Cisco" ? "" : "[&>*]:scale-[.68]"}`}
        >
          {l.name === "Cisco" ? (
            <Image
              src="/images/cisco-marquee-logo.png"
              alt="Cisco"
              width={68}
              height={36}
              className="h-[34px] w-[64px] object-contain sm:h-[36px] sm:w-[68px]"
            />
          ) : l.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={l.src} alt={l.name} className="max-h-[48px] max-w-[76%] object-contain" />
          ) : (
            l.mark
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      role="group"
      aria-label="Our technology partners"
      className={`group/herologos relative z-10 mx-auto w-full max-w-[860px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] ${className}`}
    >
      <style>{`@keyframes hero-marquee{to{transform:translateX(-50%)}}`}</style>
      {/* 38s per loop = unhurried; hover pauses; reduced-motion users get a still row */}
      <div className="flex w-max items-center [animation:hero-marquee_38s_linear_infinite] group-hover/herologos:[animation-play-state:paused] motion-reduce:animate-none">
        {set(false)}
        {set(true)}
      </div>
    </div>
  );
}