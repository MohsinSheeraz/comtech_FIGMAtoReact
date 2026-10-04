import { hero } from "@/lib/partnersDatas";
import { Container } from "./ui";

export default function PartnersHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* glows */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-violet-900/40 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-blue-600/40 blur-[160px]" />

      <Container className="flex min-h-[460px] flex-col items-center justify-start pb-24 pt-24 text-center md:min-h-[640px] md:pt-28">
        <h1 className=" text-4xl font-normal leading-[75px] text-white md:text-5xl lg:text-[64px]">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-[600px] text-[18px]! leading-[31px]! tracking-tighter text-white md:text-base">{hero.text}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* inline colours: a global `a { color }` rule can override utility classes */}
          <a href={hero.primaryCta.href} style={{ color: "#000" }} className="rounded-md bg-white px-6 py-3 text-sm font-medium transition hover:bg-white/90">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} style={{ color: "#fff" }} className="rounded-md border border-white/15 bg-black/60 px-6 py-3 text-sm transition hover:border-white/40">
            {hero.secondaryCta.label}
          </a>
        </div>
      </Container>
    </section>
  );
}
