"use client";

import { useState } from "react";
import { Container } from "./PartnersUI";

export function PartnersFaq({ text, items }: { text: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0); // first item open by default

  return (
    <section className="mt-20 py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div>
          <h2 className="text-3xl font-normal leading-tight text-fg md:text-4xl lg:text-[40px]">
            Frequently
            <br />
            Asked Questions
          </h2>
          <p className="mt-6 max-w-[320px] text-xs leading-5 text-fg/90 md:text-[13px]">{text}</p>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="rounded-2xl border border-indigo-400/50 bg-surface px-6">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base text-fg md:text-lg">{item.q}</span>
                  <span aria-hidden className="text-2xl leading-none text-violet-500">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden text-[13px] leading-6 text-fg/90 md:max-w-[85%]">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
