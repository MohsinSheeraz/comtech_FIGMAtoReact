import { TechLines } from "./TechLines";
import { DeferredGlobe } from "@/components/three/DeferredGlobe";

type Item = { t: string; s: string; w: string };

// widths are % of the stage (measured from Figma: 1062px cards row)
const left: Item[] = [
  {
    t: "Networking",
    s: "Campus & Branch Networks",
    w: "min-[1101px]:w-[20.8cqw]",
  },
  {
    t: "Computing / AI-Data Center",
    s: "UCS, Intersight & Hybrid Cloud.",
    w: "min-[1101px]:w-[29.9cqw]",
  },
  {
    t: "Cybersecurity",
    s: "Firewalls, Zero Trust & Endpoint Security.",
    w: "min-[1101px]:w-[25.4cqw]",
  },
];
const center: Item[] = [
  {
    t: "Collaboration",
    s: "Webex, Conferencing & Contact Center.",
    w: "min-[1101px]:w-[24cqw]",
  },
  {
    t: "Cisco Wireless",
    s: "Access Points & Centralized Management",
    w: "min-[1101px]:w-[25.7cqw]",
  },
];
const right: Item[] = [
  {
    t: "Cisco IP Telephony",
    s: "VoIP & IP Phones.",
    w: "min-[1101px]:w-[20.9cqw]",
  },
  {
    t: "Professional Services",
    s: "Consulting, Support & Implementation.",
    w: "min-[1101px]:w-[25.4cqw]",
  },
  {
    t: "Cisco Meraki",
    s: "Cloud Networking & Security.",
    w: "min-[1101px]:w-[19cqw]",
  },
];

function TechCard({ t, s, w, tone }: Item & { tone: "side" | "center" }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-xl gborder-new bg-[#0a0a0c] px-4 py-4 text-center min-[1101px]:rounded-[0.95cqw] min-[1101px]:px-0 min-[1101px]:py-[1.55cqw] ${w} ${
        tone === "side" ? "gborder-new" : "gborder-new"
      }`}
    >
      <h3 className="text-[18px] font-medium leading-tight tracking-normal text-white min-[1101px]:whitespace-nowrap min-[1101px]:text-[1.88cqw]">
        {t}
      </h3>
      <p className="mt-1 text-[13px] leading-snug tracking-normal text-white/80 min-[1101px]:mt-[0.4cqw] min-[1101px]:whitespace-nowrap min-[1101px]:text-[1.22cqw]">
        {s}
      </p>
    </div>
  );
}

// coordinates are in the stage's own space (1262 x 570), same ratio as the 1062:480 stage
const lines = [
  // fan toward the upper-left cards
  {
    d: "M 372 262 C 330 200 250 120 150 40",
    dur: 9,
    sway: 11,
    delay: 0,
    dx: 6,
    dy: -5,
  },
  {
    d: "M 378 268 C 350 195 300 145 255 118",
    dur: 7,
    sway: 13,
    delay: -3,
    dx: 4,
    dy: -4,
  },
  {
    d: "M 374 258 C 300 215 225 155 185 100",
    dur: 10,
    sway: 12,
    delay: -6,
    dx: 5,
    dy: -3,
  },
  // fan toward the lower-left cards
  {
    d: "M 372 272 C 335 345 285 425 200 505",
    dur: 11,
    sway: 10,
    delay: -2,
    dx: -5,
    dy: 5,
  },
  {
    d: "M 378 276 C 352 340 332 405 300 474",
    dur: 8,
    sway: 14,
    delay: -5,
    dx: -4,
    dy: 4,
  },
  {
    d: "M 372 282 C 300 330 232 382 168 432",
    dur: 12,
    sway: 12,
    delay: -8,
    dx: -6,
    dy: 3,
  },
  // long line crossing the sphere
  {
    d: "M 379 265 C 480 250 580 270 660 305 S 860 385 919 400",
    dur: 13,
    sway: 15,
    delay: -4,
    dx: 0,
    dy: 6,
  },
  // right-side tail
  {
    d: "M 690 340 C 770 352 850 380 925 408",
    dur: 9,
    sway: 11,
    delay: -7,
    dx: 4,
    dy: 5,
  },
];

export function TechnologySection() {
  return (
    <section className="wrap sec relative z-auto! py-20 min-[1101px]:py-10">
      <div className="relative z-20 mx-auto max-w-[760px] text-center">
        <h2 className="text-[32px] font-medium leading-[40px] tracking-tight text-white min-[1101px]:text-[42px] min-[1101px]:leading-[52px]">
          End-to-End Cisco Technology Solutions
        </h2>
        <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[25px] tracking-normal text-white/85 min-[1101px]:text-[16px] min-[1101px]:leading-[26px]">
          From networking and cybersecurity to collaboration, cloud, data
          center, and managed services, we deliver integrated Cisco solutions
          that help organizations build secure, connected, and future-ready IT
          environments.
        </p>
      </div>

      {/* stage = width of the cards row in Figma; every size inside scales from it */}
      <div className="@container relative mx-auto mt-10 w-full max-w-[1300px] min-[1101px]:mt-4 min-[1101px]:aspect-[1062/480]">
        {/* sphere */}
        <div className="pointer-events-none absolute inset-0 min-[1101px]:inset-auto min-[1101px]:left-[51.7%] min-[1101px]:top-0 min-[1101px]:h-full min-[1101px]:w-[81%] min-[1101px]:-translate-x-1/2">
          <DeferredGlobe
            variant="particle"
            fallbackSrc="/images/sphereRotation_purple-cyan_faster.webp"
            className="absolute inset-0 h-full w-full mix-blend-screen select-none opacity-50 [mask-image:linear-gradient(to_right,transparent_0,#000_12%,#000_88%,transparent_100%),linear-gradient(to_bottom,transparent_0,#000_7%,#000_93%,transparent_100%)] min-[1101px]:opacity-100"
            sizes="(max-width: 1300px) 100vw, 1100px"
          />
        </div>

        <TechLines />

        <div className="relative z-10 flex flex-col gap-4 min-[1101px]:contents">
          {/* LEFT: hugs left edge */}
          <div className="flex flex-col items-center gap-4 min-[1101px]:absolute min-[1101px]:left-0 min-[1101px]:top-1/2 min-[1101px]:-translate-y-1/2 min-[1101px]:items-start min-[1101px]:gap-[3.8cqw]">
            {left.map((c) => (
              <TechCard key={c.t} {...c} tone="side" />
            ))}
          </div>

          {/* CENTER: over the sphere */}
          <div className="flex flex-col items-center gap-4 min-[1101px]:absolute min-[1101px]:left-1/2 min-[1101px]:top-1/2 min-[1101px]:-translate-x-1/2 min-[1101px]:-translate-y-1/2 min-[1101px]:gap-[4.9cqw]">
            {center.map((c) => (
              <TechCard key={c.t} {...c} tone="center" />
            ))}
          </div>

          {/* RIGHT: hugs right edge */}
          <div className="flex flex-col items-center gap-4 min-[1101px]:absolute min-[1101px]:right-0 min-[1101px]:top-1/2 min-[1101px]:-translate-y-1/2 min-[1101px]:items-end min-[1101px]:gap-[3.8cqw]">
            {right.map((c) => (
              <TechCard key={c.t} {...c} tone="side" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
