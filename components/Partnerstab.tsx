"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BORDER_GRADIENT, Underline } from "@/components/PartnersUI";

type Partner = { slug: string; name: string; logo: string; text: string };
type Tab = { id: string; label: string; partners: Partner[] };

// placeholder copy exactly as in the Figma; replace per partner when final
const cardText =
    "Centrally managed, secure connectivity between multiple offices or branches, replacing costly point-to-point links with something more resilient and far easier to monitor as you add locations.";

// logos live in /public/images (change the extension here if yours are not .png)
const networking: Partner[] = [
    { slug: "cisco", name: "Cisco", logo: "/images/ciscoLogo.png", text: cardText },
    { slug: "huawei", name: "Huawei", logo: "/images/huaweiLogo.png", text: cardText },
    { slug: "ubiquiti", name: "Ubiquiti", logo: "/images/uniquitiLogo.png", text: cardText },
    { slug: "d-link", name: "D-Link", logo: "/images/dlinkLogo.png", text: cardText },
    { slug: "tp-link", name: "TP-Link", logo: "/images/tplinkLogo.png", text: cardText },
    { slug: "h3c", name: "H3C", logo: "/images/hecLogo.png", text: cardText },
];

// Only the first tab is designed in Figma. Fill the other tabs when their cards are designed.
const tabs: Tab[] = [
    { id: "networking", label: "Networking & Infrastructure", partners: networking },
    { id: "security", label: "Cyber Security", partners: [] },
    { id: "servers", label: "Servers, Storage & Data Center", partners: [] },
    { id: "comms", label: "Communications & Collaboration", partners: [] },
];

function PartnerCard({ p }: { p: Partner }) {
    return (
        <article className="rounded-[32px] border border-line bg-card p-[10px]">
            <div className="h-full rounded-[24px] p-px" style={{ background: BORDER_GRADIENT }}>
                <div
                    className="relative flex h-full flex-col rounded-[23px] px-[28px] pb-[32px] pt-[84px] lg:px-[32px]"
                    style={{ background: "linear-gradient(180deg,var(--card2) 0%,var(--card4) 100%)" }}
                >
                    {/* logo circle sits on the top border of the card */}
                    <span className="absolute left-[23px] top-0 flex size-[88px] -translate-y-1/2 items-center justify-center rounded-full border border-[#3a2a7a] bg-[var(--card2)]">
                        <Image
                            src={p.logo}
                            alt={`${p.name} logo`}
                            width={54}
                            height={40}
                            className="h-auto max-h-[40px] w-auto max-w-[54px] object-contain"
                        />
                    </span>

                    <h3 className="text-[26px] font-normal leading-[31px] text-fg">{p.name}</h3>
                    <Underline className="mt-[20px]" />
                    <p className="mt-[21px] flex-1 text-[18px] leading-[31px] text-fg">{p.text}</p>

                    <Link
                        href={`/partners/${p.slug}`}
                        className="mt-[28px] inline-flex h-[43px] items-center self-start rounded-[10px] border border-line bg-[var(--card)] px-6 text-[16px] text-fg transition-colors hover:border-[#7950E2]"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </article>
    );
}

export function PartnersTabs() {
    const [active, setActive] = useState(tabs[0].id);
    const current = tabs.find((t) => t.id === active) ?? tabs[0];

    return (
        <div>
            {/* tab row sits on a hairline, like the Figma */}
            <div className="mt-10 border-b border-fg/25 pb-4 lg:mt-[54px] lg:pb-0">
                <div role="tablist" aria-label="Partner categories" className="flex flex-wrap justify-center gap-3">
                    {tabs.map((t) => {
                        const on = t.id === active;
                        return (
                            <button
                                key={t.id}
                                type="button"
                                role="tab"
                                id={`tab-${t.id}`}
                                aria-selected={on}
                                aria-controls={`panel-${t.id}`}
                                onClick={() => setActive(t.id)}
                                className={`h-[46px] cursor-pointer rounded-t-[8px] rounded-b-none border border-b-0 border-fg/25  px-5 text-[16px] tracking-tight transition-colors ${on
                                    ? "border-[#9747FF] bg-[#9747FF] text-white"
                                    : "border-[#5b43b8]/60 bg-surface/30 text-fg hover:border-[#9747FF]"
                                    }`}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div
                role="tabpanel"
                id={`panel-${current.id}`}
                aria-labelledby={`tab-${current.id}`}
                className="mt-[70px] grid gap-x-[33px] gap-y-[64px] md:grid-cols-2 lg:mt-[114px] lg:grid-cols-3"
            >
                {current.partners.length ? (
                    current.partners.map((p) => <PartnerCard key={p.slug} p={p} />)
                ) : (
                    <p className="col-span-full text-center text-[18px] text-fg/60">
                        Partners for this category will be added soon.
                    </p>
                )}
            </div>
        </div>
    );
}