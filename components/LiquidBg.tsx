import type { CSSProperties } from "react";

// [column, row, delay in seconds] — positions are grid cells, so LEDs sit on line intersections
const LEDS: [number, number, number][] = [
  [1, 2, 0],
  [4, 1, 1.1],
  [8, 3, 2.2],
  [10, 6, 0.6],
  [2, 8, 1.7],
  [6, 9, 2.8],
  [9, 11, 0.3],
  [3, 13, 2.0],
  [7, 15, 1.3],
  [10, 17, 2.5],
  [1, 17, 0.9],
  [5, 5, 1.9],
];

export const LiquidBg = () => (
  <div className="liquid" aria-hidden="true">
    <span className="infra-glow" />
    <span className="infra-grid" />
    <span className="infra-grid infra-grid-lit" />
    {LEDS.map(([c, r, d], i) => (
      <span
        key={i}
        className="infra-led"
        style={
          { "--c": c, "--r": r, "--d": `${d}s` } as CSSProperties
        }
      />
    ))}
    <span className="liq-grain" />
  </div>
);