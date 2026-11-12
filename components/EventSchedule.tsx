"use client";

import { useState } from "react";

export type Day = {
  tab: string;
  title: string;
  intro: string;
  items: { time: string; title: string; meta?: string }[];
};

export function EventSchedule({ days }: { days: Day[] }) {
  const [active, setActive] = useState(0);
  const d = days[active];

  return (
    <div>
      <div role="tablist" aria-label="Summit days" className="flex flex-wrap justify-center gap-3">
        {days.map((x, i) => {
          const on = i === active;
          return (
            <button
              key={x.tab}
              type="button"
              role="tab"
              id={`day-tab-${i}`}
              aria-selected={on}
              aria-controls={`day-panel-${i}`}
              onClick={() => setActive(i)}
              className={`h-[46px] cursor-pointer rounded-[8px] border px-5 text-[16px] tracking-tight transition-colors ${
                on
                  ? "border-[#9747FF] bg-[#9747FF] text-white"
                  : "border-[#5b43b8]/60 bg-black/30 text-white hover:border-[#9747FF]"
              }`}
            >
              {x.tab}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`day-panel-${active}`}
        aria-labelledby={`day-tab-${active}`}
        className="leadership-border mx-auto mt-8 max-w-[1200px] rounded-[30px] p-6 sm:p-10"
      >
        <h3 className="text-[26px] font-medium leading-[34px] tracking-tighter">{d.title}</h3>
        {d.intro && <p className="mt-2 text-[16px] leading-[26px] tracking-tighter text-white/70">{d.intro}</p>}

        {d.items.length ? (
          <ol className="mt-8 divide-y divide-white/10">
            {d.items.map((it, i) => (
              <li key={i} className="grid gap-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-8">
                <span className="text-[18px] font-medium tracking-tighter text-[#b79cff]">{it.time}</span>
                <div>
                  <p className="text-[20px] font-medium leading-[28px] tracking-tighter">{it.title}</p>
                  {it.meta && <p className="mt-1 text-[15px] leading-[24px] tracking-tighter text-white/60">{it.meta}</p>}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-8 text-[18px] text-white/60">Schedule to be confirmed.</p>
        )}
      </div>
    </div>
  );
}