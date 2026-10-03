type Step = [string, string, string];

// Card centre (% of stage) + tilt, measured from Figma
const slots = [
    "min-[1101px]:left-[22.7%] min-[1101px]:top-[18.3%] min-[1101px]:rotate-[-6deg]",
    "min-[1101px]:left-[78%] min-[1101px]:top-[34.1%] min-[1101px]:rotate-[7deg]",
    "min-[1101px]:left-[22.7%] min-[1101px]:top-[61.5%] min-[1101px]:rotate-[8deg]",
    "min-[1101px]:left-[72%] min-[1101px]:top-[81.2%] min-[1101px]:rotate-[-8deg]",
];

// Path nodes in the 500x410 stage space (card edges where the dotted line attaches)
const nodes: [number, number][] = [
    [185.5, 59],
    [317.5, 112],
    [194.5, 219],
    [276.5, 302],
];

export function HowWeWork({ steps }: { steps: Step[] }) {
    return (
        // Stage: every size inside is in cqw, so the whole zigzag scales as one piece.
        // Change max-w-[1000px] to make it bigger or smaller.
        <div className="@container relative mx-auto mt-10 w-full max-w-[1000px] min-[1101px]:aspect-[500/410]">
            {/* dotted path + nodes, drawn in code (desktop only), above the cards like Figma */}
            <svg
                aria-hidden
                viewBox="0 0 500 410"
                className="pointer-events-none absolute inset-0 z-20 hidden size-full min-[1101px]:block"
            >
                <polyline
                    points={nodes.map(([x, y]) => `${x},${y}`).join(" ")}
                    fill="none"
                    stroke="#7a52f0"
                    strokeWidth="1.3"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {nodes.map(([x, y]) => (
                    <g key={`${x}-${y}`}>
                        <circle cx={x} cy={y} r="9" fill="#3a2388" />
                        <circle cx={x} cy={y} r="5" fill="#7a52f0" />
                    </g>
                ))}
            </svg>

            <div className="grid gap-6 sm:grid-cols-2 min-[1101px]:contents">
                {steps.map(([n, t, d], i) => (
                    <div
                        key={n}
                        className={`flex flex-col items-center justify-center rounded-[28px] border-[5px] border-black bg-[#6b43e2] px-6 py-8 text-center min-[1101px]:absolute min-[1101px]:z-10 min-[1101px]:h-[28cqw] min-[1101px]:w-[31cqw] min-[1101px]:-translate-x-1/2 min-[1101px]:-translate-y-1/2 min-[1101px]:rounded-[2.8cqw] min-[1101px]:border-[0.55cqw] min-[1101px]:px-[2.2cqw] min-[1101px]:py-[1.8cqw] ${slots[i]}`}
                    >
                        <span className="text-[34px] font-medium leading-none text-white min-[1101px]:text-[4.4cqw]">
                            {n}
                        </span>
                        <h3 className="mt-2 text-[22px] font-medium leading-tight tracking-normal text-white min-[1101px]:mt-[0.6cqw] min-[1101px]:text-[2.4cqw]">
                            {t}
                        </h3>
                        <p className="mt-2 text-[15px] leading-[1.5] tracking-normal text-white/90 min-[1101px]:mt-[0.8cqw] min-[1101px]:text-[1.45cqw]">
                            {d}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}