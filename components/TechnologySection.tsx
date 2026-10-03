import Image from "next/image";

type Item = { t: string; s: string; w: string };

// widths are % of the stage (measured from Figma: 1062px cards row)
const left: Item[] = [
    { t: "Networking", s: "Campus & Branch Networks", w: "min-[1101px]:w-[20.8cqw]" },
    { t: "Computing / AI-Data Center", s: "UCS, Intersight & Hybrid Cloud.", w: "min-[1101px]:w-[29.9cqw]" },
    { t: "Cybersecurity", s: "Firewalls, Zero Trust & Endpoint Security.", w: "min-[1101px]:w-[25.4cqw]" },
];
const center: Item[] = [
    { t: "Collaboration", s: "Webex, Conferencing & Contact Center.", w: "min-[1101px]:w-[24cqw]" },
    { t: "Cisco Wireless", s: "Access Points & Centralized Management", w: "min-[1101px]:w-[25.7cqw]" },
];
const right: Item[] = [
    { t: "Cisco IP Telephony", s: "VoIP & IP Phones.", w: "min-[1101px]:w-[20.9cqw]" },
    { t: "Professional Services", s: "Consulting, Support & Implementation.", w: "min-[1101px]:w-[25.4cqw]" },
    { t: "Cisco Meraki", s: "Cloud Networking & Security.", w: "min-[1101px]:w-[19cqw]" },
];

// fade all four edges so the image's dark rectangle disappears
const mask = {
    maskImage:
        "linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%)",
    WebkitMaskImage:
        "linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%)",
    maskComposite: "intersect",
    WebkitMaskComposite: "source-in",
} as const;

function TechCard({ t, s, w, tone }: Item & { tone: "side" | "center" }) {
    return (
        <div
            className={`flex w-full flex-col items-center justify-center rounded-xl border bg-[#0a0a0c] px-4 py-4 text-center min-[1101px]:rounded-[0.95cqw] min-[1101px]:px-0 min-[1101px]:py-[1.55cqw] ${w} ${tone === "side" ? "border-[#4f36d8]/80" : "border-[#3a3fa8]/50"
                }`}
        >
            <h3 className="text-[18px] font-medium leading-tight tracking-normal text-white min-[1101px]:whitespace-nowrap min-[1101px]:text-[1.88cqw]">
                {t}
            </h3>
            <p className="mt-1 text-[13px] leading-snug tracking-normal text-white/80 min-[1101px]:mt-[0.4cqw] min-[1101px]:whitespace-nowrap min-[1101px]:text-[1.22cqw]">
                {s}
            </p>
        </div>
    );
}

export function TechnologySection() {
    return (
        <section className="wrap sec relative py-20 min-[1101px]:py-28">
            <div className="relative z-20 mx-auto max-w-[760px] text-center">
                <h2 className="text-[32px] font-medium leading-[40px] tracking-tight text-white min-[1101px]:text-[42px] min-[1101px]:leading-[52px]">
                    End-to-End Cisco Technology Solutions
                </h2>
                <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[25px] tracking-normal text-white/85 min-[1101px]:text-[16px] min-[1101px]:leading-[26px]">
                    From networking and cybersecurity to collaboration, cloud, data
                    center, and managed services, we deliver integrated Cisco solutions
                    that help organizations build secure, connected, and future-ready IT
                    environments.
                </p>
            </div>

            {/* stage = width of the cards row in Figma; every size inside scales from it */}
            <div className="@container relative mx-auto mt-10 w-full max-w-[1300px] min-[1101px]:mt-4 min-[1101px]:aspect-[1062/480]">
                {/* sphere */}
                <div className="pointer-events-none absolute inset-0 min-[1101px]:inset-auto min-[1101px]:left-[51.7%] min-[1101px]:top-0 min-[1101px]:h-full min-[1101px]:w-[81%] min-[1101px]:-translate-x-1/2">
                    <Image
                        src="/images/TechnologySection_bgImage.png"
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 1100px) 100vw, 1100px"
                        className="select-none object-contain opacity-50 min-[1101px]:opacity-100"
                        style={mask}
                    />
                </div>

                <div className="relative z-10 flex flex-col gap-4 min-[1101px]:contents">
                    {/* LEFT: hugs left edge */}
                    <div className="flex flex-col items-center gap-4 min-[1101px]:absolute min-[1101px]:left-0 min-[1101px]:top-1/2 min-[1101px]:-translate-y-1/2 min-[1101px]:items-start min-[1101px]:gap-[3.8cqw]">
                        {left.map((c) => (
                            <TechCard key={c.t} {...c} tone="side" />
                        ))}
                    </div>

                    {/* CENTER: over the sphere */}
                    <div className="flex flex-col items-center gap-4 min-[1101px]:absolute min-[1101px]:left-1/2 min-[1101px]:top-1/2 min-[1101px]:-translate-x-1/2 min-[1101px]:-translate-y-1/2 min-[1101px]:gap-[4.9cqw]">
                        {center.map((c) => (
                            <TechCard key={c.t} {...c} tone="center" />
                        ))}
                    </div>

                    {/* RIGHT: hugs right edge */}
                    <div className="flex flex-col items-center gap-4 min-[1101px]:absolute min-[1101px]:right-0 min-[1101px]:top-1/2 min-[1101px]:-translate-y-1/2 min-[1101px]:items-end min-[1101px]:gap-[3.8cqw]">
                        {right.map((c) => (
                            <TechCard key={c.t} {...c} tone="side" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}