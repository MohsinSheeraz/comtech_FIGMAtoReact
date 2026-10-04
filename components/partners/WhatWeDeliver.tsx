import { deliver } from "../../lib/partnersData";
import { CardText, Container, GlowCard, SectionHeading, SectionIntro } from "./ui";
import ScaledStage from "./ScaledStage";

// Stage = Figma canvas for the 6 cards (px, origin = top-left of card 1).
const STAGE_W = 1440;
const STAGE_H = 1082;
const CARD_W = 469;
const CARD_H = 320;
const POS = [
  { x: 0, y: 0 },
  { x: 502, y: 0 },
  { x: 466, y: 381 },
  { x: 968, y: 381 },
  { x: 0, y: 762 },
  { x: 502, y: 762 },
];

const PATHS = [
  { d: "M 971 166 H 1048 Q 1090 166 1090 208 V 380", color: "#3A00CB" },
  { d: "M 466 544 H 424 Q 382 544 382 586 V 762", color: "#6A3FE0" },
  { d: "M 971 928 H 1089", color: "#6A3FE0" },
];
const DOTS = [
  { x: 1076.7, y: 183.7 },
  { x: 396.8, y: 552.5 },
  { x: 1089.3, y: 928.5 },
];

export default function WhatWeDeliver() {
  return (
    <section className="pb-16 pt-[80px] lg:mt-[150px] lg:pb-[125px] lg:pt-0">
      <Container>
        <SectionHeading>{deliver.title}</SectionHeading>
        <SectionIntro intro={deliver.intro} className="mt-4 lg:mt-[29px]" />
      </Container>

      {/* mobile / tablet: simple stack */}
      <Container className="mt-10 grid gap-6 md:grid-cols-2 lg:hidden">
        {deliver.cards.map((c) => (
          <GlowCard key={c.id}>
            <CardText title={c.title} text={c.text} />
          </GlowCard>
        ))}
      </Container>

      {/* desktop: pixel-positioned stage with dashed connectors */}
      <div className="mt-[55px] hidden px-8 lg:block xl:px-0">
        <ScaledStage width={STAGE_W} height={STAGE_H}>
          <svg className="absolute inset-0" width={STAGE_W} height={STAGE_H} fill="none" aria-hidden>
            {PATHS.map((p) => (
              <path key={p.d} d={p.d} stroke={p.color} strokeWidth="2.5" strokeDasharray="8 5" />
            ))}
          </svg>

          {deliver.cards.map((c, i) => (
            <GlowCard key={c.id} className="absolute" style={{ left: POS[i].x, top: POS[i].y, width: CARD_W, height: CARD_H }}>
              <CardText title={c.title} text={c.text} />
            </GlowCard>
          ))}

          {DOTS.map((d, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{ left: d.x, top: d.y, background: "rgba(124,88,230,0.45)" }}
            >
              <span className="h-[26px] w-[26px] rounded-full bg-[#7C58E6]" />
            </span>
          ))}
        </ScaledStage>
      </div>
    </section>
  );
}
