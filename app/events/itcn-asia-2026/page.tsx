import type { Metadata } from "next";
import Image from "next/image";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Glow, PageGlows } from "@/components/Glow";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Reveal } from "@/components/Reveal";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { itcn as d } from "@/lib/itcnData";

export const metadata: Metadata = {
  title: "ITCN Asia 2026 | Comtech Associates",
  description:
    "Meet Comtech Associates and Cisco at the 28th ITCN Asia, Expo Centre Karachi, 22 to 24 September 2026. Hall 04, Booths D-119 to D124 and D133 to D138.",
};

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";

const H2 = "text-[34px] font-medium leading-[42px] tracking-tighter min-[1101px]:text-[46px] min-[1101px]:leading-[54px]";
const P = "text-[18px] leading-[31px] tracking-tighter";

const Label = ({ children, center }: { children: string; center?: boolean }) => (
  <div className={`mb-5 flex ${center ? "justify-center" : ""}`}>
    <span className="inline-flex h-[34px] items-center rounded-full border border-white/20 px-4 text-[14px] tracking-normal">
      {children}
    </span>
  </div>
);

type Person = { name: string; role: string; image?: string };

const initials = (n: string) =>
  n
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

function PersonCard({ p }: { p: Person }) {
  return (
    <div className="w-full p-2">
      <div className="gborder-new relative mx-auto aspect-square w-full max-w-[250px] rounded-full">
        <div className="absolute inset-[1px] overflow-hidden rounded-full bg-gradient-to-b from-[#1a0f3d] to-[#0d0a15]">
          {p.image ? (
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="250px"
              className="object-cover object-center"
            />
          ) : (
            <span aria-hidden className="absolute inset-0 grid place-items-center text-[64px] font-medium text-white/25">
              {initials(p.name)}
            </span>
          )}
        </div>
      </div>
      <h3 className="mt-5 text-center text-[24px] font-medium leading-[30px] tracking-tighter">{p.name}</h3>
      <p className="mt-2 text-center text-[14px] uppercase tracking-wide text-[#b79cff]">{p.role}</p>
    </div>
  );
}

function Team({ label, title, people }: { label: string; title: string; people: Person[] }) {
  return (
    <Reveal as="section" className="wrap sec">
      <Label center>{label}</Label>
      <SecHead title={title} />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 min-[1101px]:grid-cols-5">
        {people.map((p) => (
          <PersonCard key={p.name} p={p} />
        ))}
      </div>
    </Reveal>
  );
}

export default function ItcnAsia() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero logos={false} title={d.hero.title} text={d.hero.text} primary={d.hero.primary} />

      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: frameBg }}
      >
        {/* Why visit */}
        <Reveal as="section" className="wrap sec">
          <div className="grid items-start gap-8 min-[1101px]:grid-cols-2 min-[1101px]:gap-16">
            <div>
              <Label>{d.why.label}</Label>
              <h2 className={H2}>{d.why.title}</h2>
            </div>
            <div className="flex flex-col gap-5">
              {d.why.paragraphs.map((t) => (
                <p key={t} className={P}>
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Find us */}
        <Reveal as="section" className="wrap sec">
          <Label center>{d.find.label}</Label>
          <SecHead title={d.find.title} />
          <div className="mx-auto max-w-[900px]">
            <div className="card rounded-[35px]! p-[18px]">
              <Image
                src={d.find.image}
                alt={d.find.imageAlt}
                width={864}
                height={500}
                className="h-auto w-full rounded-[28px]"
              />
            </div>
            <div className="gborder-new mx-auto mt-10 max-w-[520px] rounded-[20px] bg-[#0f0826] px-6 py-5 text-center">
              <p className="text-[18px] font-medium uppercase tracking-wide">{d.find.booth}</p>
              <p className="mt-1 text-[16px] tracking-tighter text-white/80">{d.find.hall}</p>
            </div>
          </div>
        </Reveal>

        <Team {...d.comtechTeam} />
        <Team {...d.ciscoTeam} />
      </div>

      <div className="relative overflow-x-clip">
        <Glow className="top-[6%] -left-[260px] size-[700px]" color="rgba(30,64,255,.4)" />
        <Glow className="bottom-[8%] -right-[260px] size-[700px]" color="rgba(30,64,255,.35)" />

        {/* Solutions */}
        <Reveal as="section" className="wrap sec mt-16!">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[640px]">
              <Label>{d.solutions.label}</Label>
              <h2 className={H2}>{d.solutions.title}</h2>
              <p className={`${P} mt-4`}>{d.solutions.sub}</p>
            </div>
            <Btn v="o" href="/services">
              View All Solutions
            </Btn>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {d.solutions.items.map((s) => (
              <div key={s.title} className="card pad-outer bg-[#080808]! p-4!">
                <div className="card svc svc-dark gborder-new flex h-full flex-col">
                  <Image
                    src={s.img}
                    alt={s.title}
                    width={384}
                    height={208}
                    className="h-[208px] w-full rounded-[24px] object-cover"
                  />
                  <h3 className="h3 mt-4 text-[26px]! leading-[34px]! tracking-tighter!">{s.title}</h3>
                  <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">{s.text}</p>
                  <div className="mt-auto pt-2">
                    <Btn v="o" href={s.href}>
                      View More →
                    </Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Showcase */}
        <Reveal as="section" className="wrap sec">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[760px]">
              <h2 className={H2}>
                What We’re Showcasing At <span className="text-[#b79cff]">ITCN Asia 2026</span>
              </h2>
              <p className={`${P} mt-4`}>{d.showcase.sub}</p>
            </div>
            <Btn v="o" href="/services">
              View All Solutions
            </Btn>
          </div>
          <ProductShowcase items={d.showcase.items} />
        </Reveal>

        {/* Why choose + awards */}
        <Reveal as="section" className="wrap sec">
          <Label center>{d.awards.label}</Label>
          <SecHead title={d.awards.title} />
          <Stats items={d.awards.stats} />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {d.awards.items.map(([a, b], i) => (
              <div key={i} className="card gborder-new p-8 text-center">
                <b className="block text-[46px] font-medium leading-[60px] tracking-tighter">{a}</b>
                <p className="mt-1 text-[18px] tracking-tighter">{b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* TODO: the screenshot ends at the footer; this CTA matches the other pages, remove if not wanted */}
      <CtaPanel
        title="See It Live At ITCN Asia 2026"
        text="Visit Comtech and Cisco at Hall 04, Expo Centre Karachi, 22 to 24 September 2026."
        label="Visitor Registration"
      />
    </main>
  );
}