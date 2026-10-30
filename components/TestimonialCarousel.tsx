"use client";
import { useState } from "react";
import Image from "next/image";

const items = [
  {
    type: "Customer testimonial",
    quote:
      "“Comtech's Cisco ACI deployment gave our data center the speed and simplicity we needed. The centralized visibility and control have made a real difference in how confidently we can scale.”",
    name: "Bank Islami",
    title: "Unleashing the Power of Cisco ACI",
  },
  {
    type: "Project highlight",
    quote:
      "Network infrastructure designed to connect teams, systems, and sites while providing a clear foundation for future growth.",
    name: "Enterprise Networking",
    title: "Connected infrastructure",
  },
  {
    type: "Project highlight",
    quote:
      "Cybersecurity integrated with network and infrastructure planning to support a coordinated, layered approach to protection.",
    name: "Cybersecurity",
    title: "Security by design",
  },
  {
    type: "Project highlight",
    quote:
      "Centralized visibility and management help organizations operate complex data center environments with confidence.",
    name: "Data Centers",
    title: "Modern infrastructure",
  },
];

const Arrow = ({ dir }: { dir: "l" | "r" }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className={dir === "l" ? "rotate-180" : ""}
  >
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  const go = (d: number) => {
    setShow(false);
    setTimeout(() => {
      setI((v) => (v + d + items.length) % items.length);
      setShow(true);
    }, 220);
  };
  const t = items[i];
  return (
    <div className="mt-12 min-[1101px]:mt-24 grid items-center gap-10 min-[1101px]:grid-cols-[1fr_minmax(0,636px)]">
      <div className="max-w-[640px]">
        <h2 className="h2">
          We Provide Real Results,
          <br />
          Real Partnerships
        </h2>
        <span className="bar mt-10! mb-10!" />
        <div
          aria-live="polite"
          className={`h-[270px] overflow-y-auto transition-opacity duration-200 sm:h-[290px] min-[1101px]:h-[320px] ${show ? "opacity-100" : "opacity-0"}`}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.16em] text-white/55">
            {t.type}
          </p>
          <p className="text-[18px] leading-[28px] sm:text-[24px] sm:leading-[37px] tracking-[-.06em]">
            {t.quote}
          </p>
          <div className="mt-8 text-[18px] leading-[26px] sm:text-[24px] sm:leading-[32px] tracking-[-.04em]">
            {t.name}
            <br />
            {t.title}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-[42px] cursor-pointer place-items-center rounded-[4px] bg-[#1c1c1c] text-white/70 transition hover:bg-[#2a2a2a] hover:text-white"
          >
            <Arrow dir="l" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-[42px] cursor-pointer place-items-center rounded-[4px] bg-gradient-to-b from-[#5724d8] to-[#7950e2] text-black transition hover:brightness-125"
          >
            <Arrow dir="r" />
          </button>
        </div>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-[636px]">
        
        
        <img src="/images/globe_spinning_v4.gif" alt="Globe.gif" />
        {/*
         <Image
          src="/images/globe_spinning_v4.gif"
          alt=""
          fill
          sizes="(max-width: 1100px) 100vw, 636px"
          className="object-contain"
          aria-hidden="true"
        /> */}
      </div>
    </div>
  );
}
