import { ReactNode } from "react";

/* Drop real logo files in /public/logos and set `src` to replace a wordmark, e.g. { name: "Cisco", src: "/logos/cisco.png" } */
export type Logo = { name: string; src?: string; mark?: ReactNode };

export const logos: Logo[] = [
  {
    name: "Cisco",
    mark: (
      <div className="flex flex-col items-center gap-1 text-[#049fd9]">
        <svg
          width="46"
          height="22"
          viewBox="0 0 46 22"
          fill="currentColor"
          aria-hidden
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={i * 7}
              y={[10, 6, 2, 0, 2, 6, 10][i]}
              width="3"
              height={
                [12, 16, 20, 22, 20, 16, 12][i] -
                [10, 6, 2, 0, 2, 6, 10][i] +
                [10, 6, 2, 0, 2, 6, 10][i] -
                [10, 6, 2, 0, 2, 6, 10][i]
              }
              rx="1.5"
            />
          ))}
        </svg>
        <span className="text-[24px] leading-none font-bold tracking-[.14em]">
          CISCO
        </span>
      </div>
    ),
  },
  {
    name: "Grandstream",
    mark: (
      <span className="text-[13px] font-medium tracking-[.3em] text-slate-400">
        GRANDSTREAM
      </span>
    ),
  },
  {
    name: "Symantec",
    mark: (
      <span className="flex items-center gap-1 text-[26px] font-medium text-slate-400">
        <i className="size-9 rounded-full border-[5px] border-[#fdc015]" />
        Symantec.
      </span>
    ),
  },
  {
    name: "HP",
    mark: (
      <span className="grid size-[56px] place-items-center rounded-full bg-[#0096d6] text-[30px] leading-none font-bold text-white italic">
        hp
      </span>
    ),
  },
  {
    name: "Lenovo",
    mark: (
      <span className="text-[46px] leading-none font-bold tracking-[-.04em] text-[#e2231a]">
        Lenovo
      </span>
    ),
  },
  {
    name: "Semtech",
    mark: (
      <span className="text-[22px] font-medium tracking-[.2em] text-[#2dd4bf]">
        SEMTECH
      </span>
    ),
  },
  {
    name: "Emerson",
    mark: (
      <span className="text-[22px] font-bold tracking-[.02em] text-[#1d6fd8]">
        EMERSON
      </span>
    ),
  },
];

/* Hover effect: violet halo on the card + glassy rings (translucent band with a bright rim) that keep
   expanding outward from the card's border while the pointer is on it. Nothing inside the card.
   All layers are separate spans, so the gradient border (gborder-new) is untouched. */
const Card = ({ l }: { l: Logo }) => (
  <div className="partner-card group/card relative flex h-[84px] w-[170px] sm:h-[113px] sm:w-[240px] shrink-0 items-center justify-center rounded-[28px] sm:rounded-[40px] border border-[#5b3bd1]/80 bg-gradient-to-b from-[#05010d] to-[#0b0722] cursor-pointer gborder-new">
    <span aria-hidden className="partner-halo" />
    <span aria-hidden className="partner-wave" />
    <span aria-hidden className="partner-wave partner-wave-2" />
    <span aria-hidden className="partner-wave partner-wave-3" />
    <span className="relative z-10 flex items-center justify-center [&>*]:scale-[.72] sm:[&>*]:scale-100">
      {l.src ? (
        /* eslint-disable-next-line @next/next/no-img-element */ <img
          src={l.src}
          alt={l.name}
          className="max-h-[54px] max-w-[70%] object-contain"
        />
      ) : (
        l.mark
      )}
    </span>
  </div>
);

export function PartnerSlider() {
  const list = (aria: boolean) => (
    <div
      className="flex shrink-0 gap-[26px] pr-[26px]"
      aria-hidden={aria || undefined}
    >
      {logos.map((l) => (
        <Card key={l.name} l={l} />
      ))}
    </div>
  );
  return (
    <div className="group/slider mt-8 sm:mt-14 overflow-hidden py-8 sm:py-14 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
      <style>{`@keyframes partner-marquee{to{transform:translateX(-50%)}}
@keyframes edge-wave{
  0%{opacity:1;box-shadow:0 0 0 0 rgba(124,88,230,.30),0 0 0 1px rgba(190,165,255,.8),0 0 18px 2px rgba(121,80,226,.5)}
  100%{opacity:0;box-shadow:0 0 0 26px rgba(124,88,230,0),0 0 0 27px rgba(190,165,255,0),0 0 28px 8px rgba(121,80,226,0)}
}

.partner-card:hover{z-index:20}
.partner-halo,.partner-wave{position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;opacity:0}

/* steady glow: outer violet halo + inner edge light + thin bright rim */
.partner-halo{
  transition:opacity .35s ease;
  box-shadow:
    0 0 34px 4px rgba(121,80,226,.42),
    0 0 70px 14px rgba(87,36,216,.22),
    inset 0 0 26px 3px rgba(150,110,255,.32),
    inset 0 0 0 1px rgba(190,165,255,.55);
}
.partner-card:hover .partner-halo{opacity:1}

/* glassy rings radiating from the border, staggered so one is always on its way out */
.partner-card:hover .partner-wave{animation:edge-wave 2.4s ease-out infinite}
.partner-card:hover .partner-wave-2{animation-delay:.8s}
.partner-card:hover .partner-wave-3{animation-delay:1.6s}

@media (prefers-reduced-motion:reduce){
  .partner-card:hover .partner-wave{animation:none;opacity:0}
}`}</style>
      <div className="flex w-max [animation:partner-marquee_40s_linear_infinite] group-hover/slider:[animation-play-state:paused] motion-reduce:animate-none">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}