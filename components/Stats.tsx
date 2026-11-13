import { AnimatedNumber } from "@/components/AnimatedNumber";

type Stat = [string, string];

const DEFAULT_STATS: Stat[] = [
  ["10+ Years", "In Operation"],
  ["250+", "Projects Delivered"],
  ["16 +", "Technology Partners"],
  ["4 Cities", "Nationwide"],
];

/* `items` is optional, so every existing <Stats /> keeps rendering exactly as before. */
export const Stats = ({ className, items = DEFAULT_STATS }: { className?: string; items?: Stat[] }) => (
  <div className={`wrap ${className ?? ""}`}>
    <div className="card stats">
      {items.map(([a, b]) => (
        <div className="card stat gborder-new" key={a}>
          <AnimatedNumber value={a} />
          <span>{b}</span>
        </div>
      ))}
    </div>
  </div>
);
