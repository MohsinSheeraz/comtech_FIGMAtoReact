import type { CSSProperties } from "react";
import { Btn } from "./Button";

const LEDS: [number, number, number][] = [
  [1, 1, 0.4],
  [3, 6, 1.8],
  [5, 2, 2.6],
  [7, 7, 0.9],
  [9, 1, 2.1],
  [11, 5, 1.3],
  [13, 8, 0.2],
  [15, 2, 2.9],
  [17, 6, 1.0],
  [19, 1, 1.9],
  [21, 7, 2.4],
  [23, 3, 0.7],
  [25, 6, 1.5],
  [27, 2, 2.7],
];

export const CtaPanel = ({
  title,
  text,
  label,
}: {
  title: string;
  text: string;
  label: string;
}) => (
  <section className="wrap">
    <div className="ctapanel">
      <div className="cta-fx" aria-hidden="true">
        <span className="cta-glow" />
        <span className="cta-grid" />
        <span className="cta-grid cta-grid-lit" />
        {LEDS.map(([c, r, d], i) => (
          <span
            key={i}
            className="cta-led"
            style={{ "--c": c, "--r": r, "--d": `${d}s` } as CSSProperties}
          />
        ))}
      </div>
      <h2 className="h2">{title}</h2>
      <p className="body">{text}</p>
      <Btn href="/contact">{label}</Btn>
    </div>
  </section>
);