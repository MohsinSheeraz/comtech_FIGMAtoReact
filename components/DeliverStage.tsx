"use client";
import { useRef } from "react";
import ScaledStage from "./ScaledStage";
import { CardText, GlowCard } from "./PartnersUI";
import { ScrollConnector, useScrollProgress } from "@/components/Scrollconnector";
import { ScrollReveal, REVEAL } from "@/components/Scrollreveal";

// "What We Deliver" desktop layout: 6 cards at their Figma positions, joined by dashed connectors.
// Stage = Figma canvas (px, origin = top-left of card 1). It scales down on narrower screens.
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

// One continuous snake through every card:  1 -> 2 -> 4 -> 3 -> 5 -> 6 -> (end dot)
// `len`  = approximate path length in px, so each piece is drawn in proportion to its size.
// `to`   = index of the card this piece ARRIVES at (that card appears when the piece finishes drawing).
// `dot`  = same dots as before; `at` = how far along its path the dot sits (0..1).
const LINKS = [
  { d: "M 469 166 H 502", color: "#6A3FE0", len: 33, to: 1 }, // card 1 -> card 2
  {
    d: "M 971 166 H 1048 Q 1090 166 1090 208 V 380", color: "#3A00CB", len: 317, to: 3, // card 2 -> card 4
    dot: { x: 1076.7, y: 183.7 }, at: 0.37,
  },
  { d: "M 968 544 H 935", color: "#6A3FE0", len: 33, to: 2 }, // card 4 -> card 3
  {
    d: "M 466 544 H 424 Q 382 544 382 586 V 762", color: "#6A3FE0", len: 286, to: 4, // card 3 -> card 5
    dot: { x: 396.8, y: 552.5 }, at: 0.25,
  },
  { d: "M 469 928 H 502", color: "#6A3FE0", len: 33, to: 5 }, // card 5 -> card 6
  {
    d: "M 971 928 H 1089", color: "#6A3FE0", len: 118, to: -1, // card 6 -> end dot
    dot: { x: 1089.3, y: 928.5 }, at: 1,
  },
];

// The whole chain finishes at LINE_END of the scroll progress; each card fades in (over FADE) right after the
// piece of line that arrives at it has finished drawing. Scroll up and everything un-draws / hides in reverse.
const LINE_END = 0.88;
const FADE = 0.05;
const TOTAL = LINKS.reduce((a, l) => a + l.len, 0);
let acc = 0;
const RANGES = LINKS.map((l) => {
  const r: [number, number] = [(acc / TOTAL) * LINE_END, ((acc + l.len) / TOTAL) * LINE_END];
  acc += l.len;
  return r;
});
const CARD_FROM = POS.map(() => 0); // card 1 is always there; the others wait for their line
LINKS.forEach((l, i) => { if (l.to >= 0) CARD_FROM[l.to] = RANGES[i][1]; });

export function DeliverStage({ cards }: { cards: { id: number; title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref, 0.8, 0.5); // one shared progress for every line and card

  return (
    <div ref={ref}>
      <ScaledStage width={STAGE_W} height={STAGE_H}>
        <svg className="absolute inset-0" width={STAGE_W} height={STAGE_H} fill="none" aria-hidden>
          {LINKS.map((l, i) => (
            <ScrollConnector
              key={l.d}
              d={l.d}
              color={l.color}
              width={STAGE_W}
              height={STAGE_H}
              dot={l.dot}
              at={l.at}
              progress={progress}
              range={RANGES[i]}
            />
          ))}
        </svg>

        {cards.map((c, i) => (
          <ScrollReveal
            key={c.id}
            progress={progress}
            from={i === 0 ? -1 : CARD_FROM[i]}
            to={i === 0 ? 0 : CARD_FROM[i] + FADE}
            className={`absolute ${REVEAL}`}
            style={{ left: POS[i].x, top: POS[i].y, width: CARD_W, height: CARD_H }}
          >
            <GlowCard className="h-full w-full">
              <CardText title={c.title} text={c.text} />
            </GlowCard>
          </ScrollReveal>
        ))}
      </ScaledStage>
    </div>
  );
}