import { ReactNode } from "react";

/* Drop real logo files in /public/logos and set `src` to replace a wordmark, e.g. { name: "Cisco", src: "/logos/cisco.png" } */
type Logo = { name: string; src?: string; mark?: ReactNode };

const logos: Logo[] = [
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

const Card = ({ l }: { l: Logo }) => (
  <div className="flex h-[113px] w-[240px] shrink-0 items-center justify-center rounded-[40px] border border-[#5b3bd1]/80 bg-gradient-to-b from-[#05010d] to-[#0b0722] transition-shadow duration-300 hover:shadow-[0_0_0_16px_rgba(0,0,0,.35),0_0_70px_24px_rgba(0,0,0,.9)] cursor-pointer gborder">
    {l.src ? (
      /* eslint-disable-next-line @next/next/no-img-element */ <img
        src={l.src}
        alt={l.name}
        className="max-h-[54px] max-w-[70%] object-contain"
      />
    ) : (
      l.mark
    )}
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
    <div className="group/slider mt-14 overflow-hidden py-14 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
      <style>{`@keyframes partner-marquee{to{transform:translateX(-50%)}}`}</style>
      <div className="flex w-max [animation:partner-marquee_40s_linear_infinite] group-hover/slider:[animation-play-state:paused] motion-reduce:animate-none">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
