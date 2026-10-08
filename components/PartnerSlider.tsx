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

/* Hover effect: purple light pulsing outward from the core of the card, for as long as the pointer is on it.
   (Replaces the old dark "sphere" shadow.) Pulse layers are clipped to the card shape by their own
   wrapper, so the gradient border (gborder-new) is not affected. */
const Card = ({ l }: { l: Logo }) => (
  <div className="group/card flex h-[84px] w-[170px] sm:h-[113px] sm:w-[240px] shrink-0 items-center justify-center rounded-[28px] sm:rounded-[40px] border border-[#5b3bd1]/80 bg-gradient-to-b from-[#05010d] to-[#0b0722] cursor-pointer gborder-new">
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {/* soft core that breathes */}
      <i className="absolute left-1/2 top-1/2 size-[84px] rounded-full opacity-0 transition-opacity duration-300 [transform:translate(-50%,-50%)] bg-[radial-gradient(circle,rgba(150,110,255,.65)_0%,rgba(124,88,230,.3)_45%,transparent_72%)] group-hover/card:opacity-100 group-hover/card:[animation:core-breathe_1.8s_ease-in-out_infinite] motion-reduce:group-hover/card:[animation:none]" />
      {/* three staggered waves growing from the core */}
      {[0, -0.8, -1.6].map((d) => (
        <i
          key={d}
          className="absolute left-1/2 top-1/2 size-[300px] rounded-full opacity-0 [transform:translate(-50%,-50%)_scale(.15)] bg-[radial-gradient(circle,rgba(124,88,230,.55)_0%,rgba(124,88,230,.28)_35%,rgba(124,88,230,0)_70%)] group-hover/card:[animation:core-pulse_2.4s_ease-out_infinite] motion-reduce:group-hover/card:[animation:none]"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
    </span>
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
@keyframes core-pulse{0%{opacity:.95;transform:translate(-50%,-50%) scale(.15)}100%{opacity:0;transform:translate(-50%,-50%) scale(1)}}
@keyframes core-breathe{0%,100%{transform:translate(-50%,-50%) scale(.9)}50%{transform:translate(-50%,-50%) scale(1.15)}}`}</style>
      <div className="flex w-max [animation:partner-marquee_40s_linear_infinite] group-hover/slider:[animation-play-state:paused] motion-reduce:animate-none">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}