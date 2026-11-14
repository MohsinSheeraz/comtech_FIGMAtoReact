import type { ReactNode } from "react";
import { Hero } from "@/components/Hero";
import { PageGlows } from "@/components/Glow";
import { CtaPanel } from "@/components/CtaPanel";
import { PinnedFaq } from "@/components/PinnedFaq";
import { NumberedCards } from "@/components/NumberedCards";
import { PartnerStage } from "@/components/PartnerStage";
import {
  BORDER_GRADIENT,
  CardText,
  Container,
  GlowCard,
  SectionHeading,
  SectionIntro,
} from "@/components/PartnersUI";

type Card = { title: string; text: string };

export type PartnerDetailData = {
  hero: { title: ReactNode; text: ReactNode; cta: string };
  intro: { title: ReactNode; paragraphs: string[]; tagline: string };
  audience: { title: ReactNode; sub?: string; items: Card[] };
  layers: { title: ReactNode; sub: string; items: Card[] }; // EVEN number of cards
  why: { title: ReactNode; items: Card[] }; // 4 cards (numbered 01-04)
  status: {
    title: string;
    sub: string;
    stats: { big: string; small: string }[];
  };
  faq: { title: ReactNode; items: [string, string][] };
  cta: { title: string; text: string; label: string };
};

// same two-line intro used on the Cisco page
const WHY_INTRO = {
  a: "As a certified partner, Comtech designs, deploys, and monitors the network infrastructure banks, hospitals, and manufacturers depend on, 24/7.",
  b: "We serve enterprises in four major cities, backed by certified engineers, not a reseller who ships hardware and disappears.",
};

const FAQ_TEXT =
  "Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.";

export function PartnerDetail({ d }: { d: PartnerDetailData }) {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={d.hero.title}
        text={d.hero.text}
        primary={d.hero.cta}
      />

      {/* intro */}
      <section className="pb-10 pt-10 lg:pb-0 lg:pt-[60px]">
        <Container>
          <SectionHeading>{d.intro.title}</SectionHeading>
          <div className="mx-auto mt-5 max-w-[1100px] space-y-2 text-center text-[16px] leading-7 text-white lg:mt-[29px] lg:text-[18px] lg:leading-[32px]">
            {d.intro.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 text-center text-[18px] font-bold leading-[32px] text-white lg:mt-[34px] lg:text-[20px]">
            {d.intro.tagline}
          </p>
        </Container>
      </section>

      <div className="relative isolate">
        {/* blue glows, like the other partner pages */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 hidden lg:block"
          style={{
            left: -700,
            top: "62%",
            width: 1500,
            height: 1300,
            background:
              "radial-gradient(closest-side, rgba(40,95,230,0.5), rgba(40,95,230,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 hidden lg:block"
          style={{
            right: -600,
            top: "82%",
            width: 1400,
            height: 1400,
            background:
              "radial-gradient(closest-side, rgba(40,95,230,0.4), rgba(40,95,230,0) 100%)",
          }}
        />

        {/* audience */}
        <section className="pb-10 pt-16 lg:pb-0 lg:pt-[110px]">
          <Container>
            <SectionHeading>{d.audience.title}</SectionHeading>
            {d.audience.sub && (
              <SectionIntro
                intro={d.audience.sub}
                className="mt-4 lg:mt-[24px]"
              />
            )}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-[56px] lg:grid-cols-4 lg:gap-[28px]">
              {d.audience.items.map((c) => (
                <GlowCard key={c.title} className="h-full">
                  <CardText title={c.title} text={c.text} />
                </GlowCard>
              ))}
            </div>
          </Container>
        </section>

        {/* solution cards with the dashed snake */}
        <section className="pb-10 pt-16 lg:pb-0 lg:pt-[130px]">
          <Container>
            <SectionHeading>{d.layers.title}</SectionHeading>
            <SectionIntro intro={d.layers.sub} className="mt-4 lg:mt-[24px]" />
            <PartnerStage cards={d.layers.items} />
          </Container>
        </section>

        {/* why Comtech (numbered 01-04) */}
        <section className="pb-10 pt-16 lg:pb-0 lg:pt-[130px]">
          <Container>
            <SectionHeading>{d.why.title}</SectionHeading>
            <SectionIntro intro={WHY_INTRO} className="mt-4 lg:mt-[28px]" />
            <div className="mt-10 lg:mt-[59px]">
              <NumberedCards items={d.why.items} />
            </div>
          </Container>
        </section>

        {/* authorized and local */}
        <section className="pb-10 pt-16 lg:pb-0 lg:pt-[130px]">
          <Container className="">
            <SectionHeading>{d.status.title}</SectionHeading>
            <SectionIntro intro={d.status.sub} className="mt-4 lg:mt-[20px]" />
            <div className="mt-10 rounded-[32px] border border-[#212121] bg-[#080808] p-[10px] lg:mt-[48px]">
              <div className="grid gap-[10px] md:grid-cols-3 p-4">
                {d.status.stats.map((s) => (
                  <div
                    key={s.big + s.small}
                    className="rounded-[24px] p-px h-40 mx-2"
                    style={{ background: BORDER_GRADIENT }}
                  >
                    <div
                      className="flex h-full min-h-[130px] flex-col items-center justify-center rounded-[23px] px-6 py-6 text-center"
                      style={{
                        background:
                          "linear-gradient(180deg,#0a0a0a 0%,#050505 100%)",
                      }}
                    >
                      <p className="text-[28px] font-normal leading-[36px] text-white lg:text-[32px]">
                        {s.big}
                      </p>
                      <p className="mt-1 text-[16px] leading-[24px] text-white lg:text-[18px]">
                        {s.small}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="mt-16 py-16 lg:mt-20 lg:py-20">
          <Container>
            <PinnedFaq
              head={
                <>
                  <h2 className="text-3xl font-normal leading-tight text-white md:text-4xl lg:text-[40px]">
                    {d.faq.title}
                  </h2>
                  <p className="mt-6 max-w-[320px] text-xs leading-5 text-white/90 md:text-[13px]">
                    {FAQ_TEXT}
                  </p>
                </>
              }
              items={d.faq.items}
            />
          </Container>
        </section>
      </div>

      <CtaPanel title={d.cta.title} text={d.cta.text} label={d.cta.label} />
    </main>
  );
}
