"use client";
import { useMemo, useRef } from "react";
import ScaledStage from "./ScaledStage";
import { CardText, GlowCard } from "./PartnersUI";
import { ScrollConnector, useScrollProgress } from "@/components/Scrollconnector";
import { ScrollReveal, REVEAL } from "@/components/Scrollreveal";

/* Snake of cards: rows of 2, every other row shifted (same Figma geometry as DeliverStage).
   Works for any EVEN number of cards. Reading order = card order:
   row 1: [0] [1]   row 2: [2] [3]   row 3: [4] [5] ...
   The line runs 0 -> 1 -> 3 -> 2 -> 4 -> 5 -> 7 -> 6 ... and ends with a dot. */

const W = 1440;
const CARD_W = 469;
const CARD_H = 280;
const STEP = 350; // vertical distance between rows
const X_EVEN = [0, 502];
const X_ODD = [466, 968];
const C = "#6A3FE0";
const LINE_END = 0.88;
const FADE = 0.05;

type Link = {
  d: string;
  color: string;
  len: number; // approx path length, so each piece draws in proportion
  to: number; // card this piece arrives at (-1 = end dot)
  dot?: { x: number; y: number };
  at?: number;
};

function build(n: number) {
  const rows = Math.ceil(n / 2);
  const H = (rows - 1) * STEP + CARD_H;
  const pos = Array.from({ length: n }, (_, i) => {
    const r = i >> 1;
    return { x: (r % 2 ? X_ODD : X_EVEN)[i & 1], y: r * STEP };
  });

  const links: Link[] = [];
  for (let r = 0; r < rows; r++) {
    const my = r * STEP + CARD_H / 2;
    const odd = r % 2 === 1;
    const last = r === rows - 1;
    const ny = (r + 1) * STEP;

    // inside the row
    links.push(
      odd
        ? { d: `M 968 ${my} H 935`, color: C, len: 33, to: 2 * r }
        : { d: `M 469 ${my} H 502`, color: C, len: 33, to: 2 * r + 1 },
    );

    if (!last) {
      // down to the next row
      links.push(
        odd
          ? {
              d: `M 466 ${my} H 424 Q 382 ${my} 382 ${my + 42} V ${ny - 1}`,
              color: C,
              len: 42 + 66 + (ny - 1 - my - 42),
              to: 2 * (r + 1),
              dot: { x: 396.8, y: my + 8.5 },
              at: 0.25,
            }
          : {
              d: `M 971 ${my} H 1048 Q 1090 ${my} 1090 ${my + 42} V ${ny - 1}`,
              color: r === 0 ? "#3A00CB" : C,
              len: 77 + 66 + (ny - 1 - my - 42),
              to: 2 * (r + 1) + 1,
              dot: { x: 1076.7, y: my + 17.7 },
              at: 0.37,
            },
      );
    } else {
      // end dot
      links.push(
        odd
          ? { d: `M 466 ${my} H 381`, color: C, len: 85, to: -1, dot: { x: 381, y: my + 0.5 }, at: 1 }
          : { d: `M 971 ${my} H 1089`, color: C, len: 118, to: -1, dot: { x: 1089.3, y: my + 0.5 }, at: 1 },
      );
    }
  }

  const total = links.reduce((a, l) => a + l.len, 0);
  let acc = 0;
  const ranges = links.map((l) => {
    const r: [number, number] = [(acc / total) * LINE_END, ((acc + l.len) / total) * LINE_END];
    acc += l.len;
    return r;
  });
  const cardFrom = pos.map(() => 0); // first card is always there
  links.forEach((l, i) => {
    if (l.to >= 0) cardFrom[l.to] = ranges[i][1];
  });

  return { H, pos, links, ranges, cardFrom };
}

export function PartnerStage({ cards }: { cards: { title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref, 0.8, 0.5);
  const g = useMemo(() => build(cards.length), [cards.length]);

  return (
    <>
      {/* mobile / tablet: simple stack */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:hidden">
        {cards.map((c) => (
          <GlowCard key={c.title}>
            <CardText title={c.title} text={c.text} />
          </GlowCard>
        ))}
      </div>

      {/* desktop: positioned stage, connectors draw on scroll, cards appear when the line reaches them */}
      <div ref={ref} className="mt-[55px] hidden lg:block">
        <ScaledStage width={W} height={g.H}>
          <svg className="absolute inset-0" width={W} height={g.H} fill="none" aria-hidden>
            {g.links.map((l, i) => (
              <ScrollConnector
                key={l.d}
                d={l.d}
                color={l.color}
                width={W}
                height={g.H}
                dot={l.dot}
                at={l.at}
                progress={progress}
                range={g.ranges[i]}
              />
            ))}
          </svg>

          {cards.map((c, i) => (
            <ScrollReveal
              key={c.title}
              progress={progress}
              from={i === 0 ? -1 : g.cardFrom[i]}
              to={i === 0 ? 0 : g.cardFrom[i] + FADE}
              className={`absolute ${REVEAL}`}
              style={{ left: g.pos[i].x, top: g.pos[i].y, width: CARD_W, height: CARD_H }}
            >
              <GlowCard className="h-full w-full">
                <CardText title={c.title} text={c.text} />
              </GlowCard>
            </ScrollReveal>
          ))}
        </ScaledStage>
      </div>
    </>
  );
}