"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BORDER_GRADIENT, Underline } from "@/components/PartnersUI";

type Partner = { slug: string; name: string; logo?: string; text: string };
type Tab = { id: string; label: string; partners: Partner[] };

const networking: Partner[] = [
    { slug: "cisco", name: "Cisco", logo: "/images/ciscoLogo.png", text: "Enterprise networking, security, collaboration, and data center technology for connected organizations." },
    { slug: "huawei", name: "Huawei", logo: "/images/huaweiLogo.png", text: "Networking and connectivity technology for business infrastructure and multi-site environments." },
    { slug: "ubiquiti", name: "Ubiquiti", logo: "/images/uniquitiLogo.png", text: "Wireless networking and connectivity options for offices, campuses, and distributed sites." },
    { slug: "d-link", name: "D-Link", logo: "/images/dlinkLogo.png", text: "Network connectivity products for business environments, from access to site-wide infrastructure." },
    { slug: "tp-link", name: "TP-Link", logo: "/images/tplinkLogo.png", text: "Business networking and wireless connectivity for offices and growing organizations." },
    { slug: "h3c", name: "H3C", logo: "/images/hecLogo.png", text: "Enterprise networking technology for organizations building connected infrastructure." },
];

const tabs: Tab[] = [
    { id: "networking", label: "Networking & Infrastructure", partners: networking },
    {
        id: "security",
        label: "Cyber Security",
        partners: [
            { slug: "fortinet", name: "Fortinet", text: "Comtech is a Fortinet Authorized Partner in Pakistan, delivering FortiGate firewall deployment, Fortinet SD-WAN, and Fortinet SASE/ZTNA architecture for enterprises that need security built in." },
            { slug: "kaspersky", name: "Kaspersky", text: "Endpoint and threat protection for business environments, from user devices to operational sites." },
            { slug: "sangfor", name: "Sangfor", text: "Cybersecurity and infrastructure technology for organizations reviewing their security architecture." },
        ],
    },
    {
        id: "servers",
        label: "Servers, Storage & Data Center",
        partners: [
            { slug: "hpe", name: "HPE", text: "Server and data center infrastructure for enterprise workloads, capacity, and operational requirements." },
            { slug: "dell", name: "Dell", text: "Server and infrastructure technology to support business workloads and data center environments." },
        ],
    },
    {
        id: "comms",
        label: "Communications & Collaboration",
        partners: [
            { slug: "avaya", name: "Avaya", text: "Business communications, unified communications, and contact center technology for connected teams." },
        ],
    },
];

function PartnerCard({ p }: { p: Partner }) {
    return (
        <article className="rounded-[32px] border border-[#212121] bg-[#080808] p-[10px]">
            <div className="h-full rounded-[24px] p-px" style={{ background: BORDER_GRADIENT }}>
                <div
                    className="relative flex h-full flex-col rounded-[23px] px-[28px] pb-[32px] pt-[84px] lg:px-[32px]"
                    style={{ background: "linear-gradient(180deg,#100725 0%,#0D0A15 100%)" }}
                >
                    {/* logo circle sits on the top border of the card */}
                    <span className="absolute left-[23px] top-0 flex size-[88px] -translate-y-1/2 items-center justify-center rounded-full border border-[#3a2a7a] bg-[#0c0a1f]">
                        {p.logo ? (
                            <Image
                                src={p.logo}
                                alt={`${p.name} logo`}
                                width={54}
                                height={40}
                                className="h-auto max-h-[40px] w-auto max-w-[54px] object-contain"
                            />
                        ) : (
                            <span aria-hidden className="text-[20px] font-semibold text-white">
                                {p.name.slice(0, 1)}
                            </span>
                        )}
                    </span>

                    <h3 className="text-[26px] font-normal leading-[31px] text-white">{p.name}</h3>
                    <Underline className="mt-[20px]" />
                    <p className="mt-[21px] flex-1 text-[18px] leading-[31px] text-white">{p.text}</p>

                    <Link
                        href={`/partners/${p.slug}`}
                        className="mt-[28px] inline-flex h-[43px] items-center self-start rounded-[10px] border border-[#242424] bg-[#0b0b0b] px-6 text-[16px] text-white transition-colors hover:border-[#7950E2]"
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
            <div className="mt-10 border-b border-white/25 pb-4 lg:mt-[54px] lg:pb-0">
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
                                className={`h-[46px] cursor-pointer rounded-[8px] md:rounded-b-none! border md:border-b-0 border-white/25  px-5 text-[16px] tracking-tight transition-colors ${on
                                    ? "border-[#9747FF] bg-[#9747FF] text-white"
                                    : "border-[#5b43b8]/60 bg-black/30 text-white hover:border-[#9747FF]"
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
                    <p className="col-span-full text-center text-[18px] text-white/60">
                        Partners for this category will be added soon.
                    </p>
                )}
            </div>
        </div>
    );
}