import ScaledStage from "./ScaledStage";
import { CardText, GlowCard } from "./PartnersUI";
import { ScrollConnector } from "@/components/Scrollconnector";

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

// Same paths, colours and dots as before. `at` = how far along its path the dot sits (0..1),
// so the dot pops in right when the drawing line reaches it.
const LINES = [
  { d: "M 971 166 H 1048 Q 1090 166 1090 208 V 380", color: "#3A00CB", dot: { x: 1076.7, y: 183.7 }, at: 0.36 },
  { d: "M 466 544 H 424 Q 382 544 382 586 V 762", color: "#6A3FE0", dot: { x: 396.8, y: 552.5 }, at: 0.25 },
  { d: "M 971 928 H 1089", color: "#6A3FE0", dot: { x: 1089.3, y: 928.5 }, at: 1 },
];

export function DeliverStage({ cards }: { cards: { id: number; title: string; text: string }[] }) {
  return (
    <ScaledStage width={STAGE_W} height={STAGE_H}>
      {/* the connectors draw with scroll (and un-draw when you scroll back up) */}
      <svg className="absolute inset-0" width={STAGE_W} height={STAGE_H} fill="none" aria-hidden>
        {LINES.map((l) => (
          <ScrollConnector key={l.d} width={STAGE_W} height={STAGE_H} {...l} />
        ))}
      </svg>

      {cards.map((c, i) => (
        <GlowCard key={c.id} className="absolute" style={{ left: POS[i].x, top: POS[i].y, width: CARD_W, height: CARD_H }}>
          <CardText title={c.title} text={c.text} />
        </GlowCard>
      ))}
    </ScaledStage>
  );
}