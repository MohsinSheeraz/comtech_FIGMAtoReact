import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import Image from "next/image";
import Link from "next/link";
import { PageGlows } from "@/components/Glow";
import { DeliverStage } from "@/components/DeliverStage";
import { WhyCisco } from "@/components/WhyCisco";
import { PinnedFaq } from "@/components/PinnedFaq";
import { CtaPanel } from "@/components/CtaPanel";
import { PartnerHero } from "@/components/PartnerHero";
import { PartnerLockup } from "@/components/PartnerLockup";

import {
  BORDER_GRADIENT,
  CardText,
  Container,
  GlowCard,
  PurplePanel,
  SectionHeading,
  SectionIntro,
  Underline,
} from "@/components/PartnersUI";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/partners/cisco", {
    alternates: { canonical: "https://comtech.net.pk/partners/cisco" },
  });
}

/* ---------- content (copy from the Figma PDF; PLACEHOLDER = not in the design, replace) ---------- */

const intro = {
  a: "As a certified Cisco partner, Comtech designs, deploys, and monitors the network infrastructure banks, hospitals, and manufacturers depend on, 24/7.",
  b: "We serve enterprises in four major cities, backed by certified engineers, not a reseller who ships hardware and disappears.",
};

const journey = [
  {
    title: "Where We Started",
    text: "SMB Partner: helping small and medium businesses adopt Cisco technology for better efficiency and security",
  },
  {
    title: "Where We Are Now",
    text: "Premier Integrator: architecting, deploying, and managing complex Cisco implementations across banking, government, and enterprise",
  },
];

const credentials: [string][] = [
  ["Networking Partner\nBadge"],
  ["Security Partner\nBadge"],
  ["Services Partner\nBadge"],
  ["Cloud & AI Infrastructure\nPartner Badge"],
  ["Cisco Registered\nRegistration"],
  ["SMB & Mid-Market\nBusiness Practice"],
  ["Extended Detection &\nResponse XDR Specialization"],
];

// DeliverStage places these 6 at fixed Figma positions: 1 2 / 3 4 / 5 6
const portfolio = [
  {
    id: 1,
    title: "Enterprise Networking",
    text: "Cisco switching, wireless access points, and controllers, forming the core of secure, always on LAN and WAN infrastructure.",
  },
  {
    id: 2,
    title: "WAN & Edge",
    text: "SD WAN and edge platforms that bring secure, reliable performance to branches, remote sites, and the cloud.",
  },
  {
    id: 3,
    title: "Data Center & Cloud",
    text: "Data center switching and cloud software that simplify hybrid infrastructure instead of complicating it.",
  },
  {
    id: 4,
    title: "Collaboration",
    text: "Cisco IP telephony, delivering enterprise grade VoIP communication with the features hybrid teams actually use.",
  },
  {
    id: 5,
    title: "Service Provider",
    text: "Carrier grade routers, wireless, and infrastructure software for organizations scaling network services.",
  },
  {
    id: 6,
    title: "Industrial Networking",
    text: "Ruggedized switching, wireless, routing, and security built for conditions standard hardware can't survive.",
  },
];

const whyCisco = [
  {
    title: "Scale and Breadth",
    text: "Cisco reported about 79,500 employees across 95 countries and roughly US$50 billion in revenue in fiscal 2021, with products spanning networking, collaboration, security, wireless, data center, IoT, video, analytics, and software.",
  },
  {
    title: "Secure by Design",
    text: "Cisco builds products under its Secure Development Lifecycle and publishes security and trust information through the Cisco Trust Center, so customers can review how products are built and protected.",
  },
  {
    title: "A Net Zero Commitment",
    text: "In September 2021, Cisco committed to reach net zero greenhouse gas emissions across all scopes by 2040, with net zero for its direct operations (Scopes 1 and 2) targeted by 2025.",
  },
  {
    title: "Efficient Hardware",
    text: "Cisco reports its Silicon One based 8201 router uses 26x less power than its predecessor, one example of its focus on energy efficient product design.",
  },
  {
    title: "Circular by Design",
    text: "Cisco has set a target for all new products and packaging to incorporate Circular Design Principles by fiscal 2025, aiming for products built for reuse, repair, and resource efficiency. Its report listed this target as on track, with a pilot completed.",
  },
  {
    title: "Skills Pipeline",
    text: "Through Cisco Networking Academy, Cisco reported 3.09 million learners in fiscal 2021 and more than 15 million participants since 1997, across 180 countries. A deep talent pool helps organizations hire people trained on Cisco technology.",
  },
];

const whyComtech = [
  {
    number: "01",
    title: "Local Expertise, Global Standards",
    text: "Deep knowledge of Pakistan's IT landscape, applied through Cisco's global technology standards.",
  },
  {
    number: "02",
    title: "Access to Cisco's Latest Portfolio",
    text: "Advanced switching, security, and collaboration tools, available as soon as Cisco ships them.",
  },
  {
    number: "03",
    title: "End-to-End, Not Just Equipment",
    text: "Consultation, deployment, and after sales support, handled by one team from first call to go live.",
  },
  {
    number: "04",
    title: "A Proven Track Record",
    text: "Certified as a Premier Integrator, with a growing footprint across Pakistan's banking and public sectors.",
  },
];

const events = [
  {
    year: "2025",
    title: "Cisco Connect 2025, Dubai",
    desc: "Comtech represented at Cisco's regional flagship event.",
    href: "/events",
  },
  {
    year: "2025",
    title: "Reseller Event 2025",
    desc: "Hosted by Comtech Associates for the Cisco partner community.",
    href: "/events",
  },
  {
    year: "2025",
    title: "ITCN Asia 2025",
    desc: "Showcased Cisco innovations at Pakistan's largest IT expo.",
    href: "/events",
  },
  {
    year: "2026",
    title: "ITCN Asia 2026",
    desc: "Returned as a Silver Sponsor, showcasing Cisco networking, security, and data center technology at Hall 4, Booths D-119 to D-124 and D-133 to D-138.",
    href: "/events/itcn-asia-2026",
    latest: true,
  },
];

const faq = {
  text: "Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.",
  items: [
    [
      "Is Cisco technology secure and sustainable?",
      "Cisco states that it builds products under its Secure Development Lifecycle and has committed to net zero greenhouse gas emissions by 2040 (Cisco Purpose Report 2021). Comtech can walk you through the security features relevant to your deployment.",
    ],
    [
      "What Cisco partner tier is Comtech?",
      "Comtech Associates is recognized as a Cisco Premier Partner (Premier Integrator), backed by seven confirmed Cisco credentials spanning registration, SMB and Mid-Market Business practice, Extended Detection and Response (XDR), Services, Security, Networking, and Cloud & AI Infrastructure.",
    ],
    [
      "Is Comtech an authorized Cisco reseller, or something more?",
      "More. Comtech consults, architects, deploys, and supports Cisco environments end to end, the definition of an integrator rather than a reseller.",
    ],
    [
      "Which Cisco products does Comtech deploy?",
      "Enterprise switching and wireless, SD-WAN and routers, data center and cloud infrastructure, IP telephony, service provider infrastructure, and industrial-grade networking equipment.",
    ],
    [
      "Does Comtech support Cisco deployments after installation?",
      "Yes. Comtech's Services partner badge covers ongoing support, not just initial deployment.",
    ],
  ] as [string, string][],
};

/* ---------- small local pieces ---------- */

function Badge({ a, isActive }: { a: string; isActive: boolean }) {
  return (
    <div
      className={`cisco-credential-badge w-full rounded-[20px] p-px sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] ${isActive ? "is-active" : ""}`}
      style={{ background: BORDER_GRADIENT }}
    >
      <div
        className="flex h-full min-h-[96px] flex-col items-center justify-center rounded-[19px] px-4 py-5 text-center"
        style={{
          background: "linear-gradient(180deg,#100725 0%,#0D0A15 100%)",
        }}
      >
        <p className="whitespace-pre-line text-[16px] leading-[24px] text-white">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function Cisco() {
  return (
    <main>
      <PageGlows variant="inner" />
      <PartnerHero
        title={
          <>
            Advancing Pakistan’s Digital Future
            <br />
            as a Cisco Premier Partner
          </>
        }
        text="Comtech Associates is a Cisco Premier Partner in Pakistan, designing, deploying, and supporting Cisco networking, security, and data center technology for banks, government, and enterprises."
        cta="Request A Cisco Solutions Assessment"
      />

      {/* long purple panel #1: Partnership + Credentials + Portfolio (+ globe) */}
      <div className="relative isolate">
        <PurplePanel variant="top">
          <Image
            src="/images/globe-spin.webp"
            alt=""
            width={520}
            height={520}
            className="absolute right-0 top-[1300px] hidden h-auto w-[520px] max-w-none opacity-50 lg:right-[-88px] lg:block"
          />
        </PurplePanel>

        {/* A Partnership That Grew Into Something Real */}
        <section className="pb-10 pt-10 lg:pb-0 lg:pt-[40px]!">
          <Container>
            <SectionHeading className="pt-20! pb-10!">
              A Partnership That Grew Into
              <br />
              Something Real
            </SectionHeading>
            <div className="mx-auto mt-10 grid max-w-[1100px] gap-10 lg:mt-[60px] lg:max-w-[1320px] lg:grid-cols-[1fr_4px_1fr] lg:gap-[56px] pb-20!">
              {journey.map((j, i) => (
                <div
                  key={j.title}
                  className={`text-center ${i === 1 ? "lg:col-start-3" : ""}`}
                >
                  <h3 className="text-[26px] font-normal leading-[34px] text-white lg:text-[30px] lg:leading-[38px]">
                    {j.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-[460px] text-[16px] leading-[28px] text-white lg:max-w-[600px] lg:text-[18px] lg:leading-[31px]">
                    {j.text}
                  </p>
                </div>
              ))}
              <span
                aria-hidden
                className="hidden w-[4px] rounded-full bg-[#6739DD] lg:col-start-2 lg:row-start-1 lg:block"
              />
            </div>
          </Container>
        </section>

        {/* Seven Confirmed Cisco Credentials */}
        <section className="pb-10! pt-16 lg:pb-10 lg:pt-[130px]">
          <Container>
            <SectionHeading>Seven Confirmed Cisco Credentials</SectionHeading>
            <div className="mx-auto mt-10 flex w-full max-w-[1100px] flex-wrap justify-center gap-6 lg:mt-[56px]">
              {credentials.map(([a], i) => (
                <Badge key={a} a={a} isActive={i === 0} />
              ))}
            </div>
          </Container>
        </section>

        {/* The Cisco Portfolio We Deliver */}
        <section className="pb-16 pt-[80px] lg:pb-[125px] lg:pt-[130px]">
          <Container className="pb-16!">
            <SectionHeading>The Cisco Portfolio We Deliver</SectionHeading>
            <SectionIntro intro={intro} className="mt-4 lg:mt-[29px]" />
          </Container>

          {/* mobile / tablet: simple stack */}
          <Container className="mt-10 grid gap-6 md:grid-cols-2 lg:hidden">
            {portfolio.map((c, i) => (
              <GlowCard
                key={c.id}
                className={`service-portfolio-card ${i === 0 ? "is-active" : ""}`}
              >
                <CardText title={c.title} text={c.text} />
              </GlowCard>
            ))}
          </Container>

          {/* desktop: positioned stage with scroll-drawn dashed connectors */}
          <div className="mt-[55px] hidden px-8 lg:block xl:px-0">
            <DeliverStage cards={portfolio} />
          </div>
        </section>
      </div>

      {/* Why Cisco scroll stage */}
      <div className="relative isolate">
        {/* Why Cisco (pinned: scroll moves through the 6 items) */}
        <section className="relative pb-0 pt-16 lg:pt-[8px]">
          <Container>
            <WhyCisco
              heading={
                <SectionHeading>
                  Why Cisco: A Technology Partner
                  <br />
                  With a Stated Purpose
                </SectionHeading>
              }
              items={whyCisco}
            />
          </Container>
        </section>
      </div>

      {/* Blue glows begin after the pinned Cisco section. */}
      <div className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 hidden lg:block"
          style={{
            left: -700,
            top: -500,
            width: 1500,
            height: 1300,
            background:
              "radial-gradient(closest-side, rgba(40,95,230,0.5), rgba(40,95,230,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 hidden lg:block"
          style={{
            right: -600,
            top: 400,
            width: 1400,
            height: 1500,
            background:
              "radial-gradient(closest-side, rgba(40,95,230,0.45), rgba(40,95,230,0) 100%)",
          }}
        />
        {/* Why Businesses Choose Comtech as Their Cisco Partner */}
        <section className="relative pb-16 pt-20 lg:pb-0 lg:pt-[150px]">
          <Container>
            <SectionHeading>
              Why Businesses Choose Comtech
              <br />
              as Their Cisco Partner
            </SectionHeading>
            <SectionIntro intro={intro} className="mt-4 lg:mt-[28px]" />

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-[59px] lg:gap-x-[46px] lg:gap-y-[48px]">
              {whyComtech.map((it) => (
                <GlowCard
                  key={it.number}
                  className={`service-reason-card ${it.number === "01" ? "is-active" : ""}`}
                >
                  <div className="absolute right-[24px] top-[22px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#6739DC] text-[22px] text-white md:h-[68px] md:w-[68px] lg:right-[34px] lg:top-[32px]">
                    {it.number}
                  </div>
                  <h3 className="pr-[64px] text-[26px] font-normal leading-[31px] text-white md:pr-[84px]">
                    {it.title}
                  </h3>
                  <Underline className="mt-[20px]" />
                  <p className="mt-[21px] text-[18px] leading-[31px] text-white">
                    {it.text}
                  </p>
                </GlowCard>
              ))}
            </div>
          </Container>
        </section>

        {/* Recognized On the Regional Stage */}
        <section className="relative pb-0 pt-20 lg:pt-[150px]">
          <Container>
            <SectionHeading>Recognized On the Regional Stage</SectionHeading>

            <div className="mx-auto mt-10 grid max-w-[1320px] items-stretch gap-5 lg:mt-[64px] lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-6">
              {/* the credential */}
              <div
                className="rounded-[32px] p-px"
                style={{ background: BORDER_GRADIENT }}
              >
                <div
                  className="flex h-full flex-col rounded-[31px] px-7 pb-8 pt-9 lg:px-9 lg:pt-11"
                  style={{
                    background:
                      "linear-gradient(180deg,#1a0d3a 0%,#0D0A15 100%)",
                  }}
                >
                  <h3 className="text-[28px] font-normal leading-[36px] text-white lg:text-[32px] lg:leading-[40px]">
                    Premier Integrator
                    <br />
                    Certified
                  </h3>
                  <Underline className="mt-6" />
                  <p className="mt-5 text-[17px] leading-[29px] text-white/85 lg:text-[18px] lg:leading-[31px]">
                    Cisco&apos;s recognition of Comtech&apos;s technical delivery
                    capability
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center rounded-[8px] bg-white px-3 py-2 text-center text-[15px] font-medium leading-5 text-black! transition-colors hover:bg-[#9747FF] hover:text-white! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9747FF] lg:mt-auto"
                  >
                    Talk to an IT Consultant
                  </Link>
                </div>
              </div>

              {/* the events: always readable, the whole card is the link */}
              <ul className="grid list-none gap-5 sm:grid-cols-2 lg:gap-6">
                {events.map((e) => (
                  <li key={e.title} className="min-w-0">
                    <article
                      className="group/event relative h-full rounded-[28px] p-px transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                      style={{ background: BORDER_GRADIENT }}
                    >
                      <div
                        className="relative flex h-full min-h-[210px] flex-col overflow-hidden rounded-[27px] px-6 pb-6 pt-6 lg:min-h-[230px] lg:px-7 lg:pb-7"
                        style={{
                          background: e.latest
                            ? "linear-gradient(180deg,#1a0d3a 0%,#0D0A15 100%)"
                            : "linear-gradient(180deg,#100725 0%,#0D0A15 100%)",
                        }}
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[#7950e2]/12 opacity-0 transition-opacity duration-300 group-hover/event:opacity-100 group-focus-within/event:opacity-100"
                        />
                        <div className="relative flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2">
                            <span className="rounded-full bg-[#6739DD]/25 px-3 py-1 text-[13px] leading-4 text-[#cdbbff]">
                              {e.year}
                            </span>
                            {e.latest && (
                              <span className="rounded-full border border-[#8B4DE0]/60 px-3 py-1 text-[13px] leading-4 text-[#cdbbff]">
                                Latest
                              </span>
                            )}
                          </span>
                          <svg
                            aria-hidden
                            viewBox="0 0 24 24"
                            className="size-5 shrink-0 text-[#8B4DE0] transition-transform duration-300 group-hover/event:-translate-y-0.5 group-hover/event:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17 17 7M8 7h9v9" />
                          </svg>
                        </div>
                        <h3 className="relative mt-5 text-[22px] font-normal leading-[30px] text-white lg:text-[24px] lg:leading-[32px]">
                          {e.title}
                        </h3>
                        <p className="relative mt-3 text-[16px] leading-[26px] text-white/75 lg:text-[17px] lg:leading-[28px]">
                          {e.desc}
                        </p>
                        <Link
                          href={e.href}
                          aria-label={`View event: ${e.title}`}
                          className="relative mt-5 inline-flex w-fit items-center text-[15px] font-medium text-[#b79cff]! after:absolute after:-inset-[999px] after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9747FF] lg:mt-auto lg:pt-5"
                        >
                          <span className="underline-offset-4 group-hover/event:underline">
                            View event
                          </span>
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </div>

      {/* long purple panel #2: FAQ + CTA */}
      <div className="relative isolate">
        <PurplePanel variant="bottom" />

        <section className="mt-20 py-20">
          <Container>
            <PinnedFaq
            visual={<PartnerLockup layout="stack" />}
              head={
                <>
                  <h2 className="text-3xl font-normal leading-tight text-white md:text-4xl lg:text-[40px]">
                    Cisco Partnership,
                    <br />
                    Straight Answers
                  </h2>
                  <p className="mt-6 max-w-[320px] text-xs leading-5 text-white/90 md:text-[13px]">
                    {faq.text}
                  </p>
                </>
              }
              items={faq.items}
            />
          </Container>
        </section>

        <CtaPanel
          title="Ready to Transform Your Organization?"
          text="Explore Cisco's full portfolio with a partner that has deployed it across Pakistan's banking, government, and enterprise sectors."
          label="Request a Cisco Solutions Assessment"
        />
      </div>
    </main>
  );
}
