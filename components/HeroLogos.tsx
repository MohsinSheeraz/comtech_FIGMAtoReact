import { logos } from "./PartnerSlider";

/* Small, calm logo marquee for the hero. Pure CSS (no JS), seamless loop:
   the list is rendered twice and the track slides exactly -50%.
   Same logo assets as the partner slider further down the page. */
export function HeroLogos({ className = "" }: { className?: string }) {
  const set = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-14 sm:pr-14" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <div
          key={l.name}
          className="flex h-[48px] w-[120px] shrink-0 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-[56px] sm:w-[150px] [&>*]:scale-[.6]"
        >
          {l.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={l.src} alt={l.name} className="max-h-[54px] max-w-[70%] object-contain" />
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
      className={`group/herologos relative z-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}
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