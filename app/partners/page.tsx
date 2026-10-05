import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { PageGlows } from "@/components/Glow";
import { DeliverStage } from "@/components/DeliverStage";
import { PartnersFaq } from "@/components/PartnersFaq";
import {
  BORDER_GRADIENT,
  CardText,
  Container,
  GlowCard,
  PrimaryButton,
  PurplePanel,
  SectionHeading,
  SectionIntro,
} from "@/components/PartnersUI";

export const metadata: Metadata = {
  title: "Partners | Comtech Associates",
  description: "Comtech Associates is a Cisco Premier Partner advancing Pakistan's digital future.",
};

/* ---------- content (placeholder copy is exactly as in the Figma; replace when final) ---------- */

const credentialsText =
  "Anyone can put a vendor’s logo on a website. A certified partnership means Comtech’s engineers hold active certifications on that platform, get direct vendor-level support when something’s urgent, and have real product and pricing access, not a general reseller markup.";

const credentials = {
  title: "Credentials That Set Us Apart",
  alt: "Business professionals shaking hands in front of a global network overlay",
  blocks: [
    { heading: "Why the Partner Behind the Product Matters", text: credentialsText },
    { heading: "Why the Partner Behind the Product Matters", text: credentialsText },
  ],
};

// two sentences so the intro breaks into two lines on desktop, like the design
const intro = {
  a: "As a certified Cisco partner, Comtech designs, deploys, and monitors the network infrastructure banks, hospitals, and manufacturers depend on, 24/7.",
  b: "We serve enterprises in four major cities, backed by certified engineers, not a reseller who ships hardware and disappears.",
};

const cardText =
  "Centrally managed, secure connectivity between multiple offices or branches, replacing costly point-to-point links with something more resilient and far easier to monitor as you add locations.";

const deliver = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, title: "Cisco", text: cardText }));

const textA =
  "Networking isn’t a category we dabble in; it’s where Comtech was built. As a certified Cisco partner in Pakistan, we design and deploy the data,";
const textB =
  "Cyberattacks in Pakistan aren’t a someday problem; they’re a Tuesday problem. As a managed security service provider.";
const textC =
  "Networking isn’t a category we dabble in; it’s where Comtech was built. As a certified Cisco partner in Pakistan, we design and deploy.";

// w x h = display size in px on desktop (the image's natural size, 1:1 with Figma)
const products = [
  // the switch-stack image was not supplied yet, so Switches reuses the firewall stack image
  { id: "switches", title: "Cisco Switches", text: textA, image: "/images/Partners_FirewallStack.png", alt: "Cisco switches", w: 328, h: 328 },
  { id: "routers", title: "Routers", text: textB, image: "/images/Partners_Router.png", alt: "Cisco router", w: 298, h: 298 },
  { id: "wireless", title: "Wireless Access Points", text: textC, image: "/images/Partners_AccessPoint.png", alt: "Cisco wireless access point", w: 295, h: 166 },
  { id: "firewalls", title: "Firewalls", text: textA, image: "/images/Partners_FirewallStack.png", alt: "Cisco firewalls", w: 312, h: 312 },
  { id: "servers", title: "Servers", text: textB, image: "/images/Partners_Server.png", alt: "Server racks", w: 161, h: 161 },
  { id: "phones", title: "IP Phones", text: textC, image: "/images/Partners_IpPhone.png", alt: "Cisco IP phone", w: 333, h: 187 },
];

const partnership = [
  { number: "01", title: "Proven Cisco Expertise" },
  { number: "02", title: "End-to-End Solutions" },
  { number: "03", title: "Scalable & Secure Infrastructure" },
  { number: "04", title: "Trusted Technology Partnership" },
];

const faq = {
  text: "Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.",
  items: [
    { q: "What services does Comtech Associates offer?", a: "Four connected practices: cybersecurity, networking and IT infrastructure, data center and cloud solutions, and IT services and managed IT. Each has its own dedicated page with full detail." },
    { q: "Does Comtech work with small and mid-size businesses, or only large enterprises?", a: "Yes. Engagements range from a single office LAN to a multi-city enterprise backbone, and most conversations start with a short assessment of your current environment to size the right solution." },
    { q: "Does Comtech serve clients outside Karachi?", a: "Yes. Comtech has offices in Karachi, Islamabad, Lahore, and Quetta, so deployment and support don't depend on a single remote team." },
    { q: "How do I get started with Comtech?", a: "Start with a conversation. Tell us what you're dealing with and we'll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations begin with a short assessment of your current environment." },
  ],
};

const cta = {
  title: "Ready to Solve Your IT Challenge?",
  text: "Whether it’s one service or all four, a conversation with Comtech’s team is the place to start. Tell us what you’re dealing with, a security gap, an unreliable network, a data center migration, or a staffing shortfall, and we’ll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations start with a short assessment of your current environment before anything gets proposed.",
  label: "Request an IT Assessment",
};

/* ---------- small local pieces ---------- */

function ProductCard({ item }: { item: (typeof products)[number] }) {
  return (
    <article className="rounded-[28px] p-px" style={{ background: BORDER_GRADIENT }}>
      <div className="h-full rounded-[27px] bg-[#040404] px-[24px] pb-[24px] pt-[32px] lg:px-[38px] lg:pb-[38px] lg:pt-[46px]">
        <h3 className="text-[26px] font-normal leading-[31px] text-white">{item.title}</h3>
        <p className="mt-4 min-h-[93px] text-[18px] leading-[31px] text-white">{item.text}</p>
        {/* images are shown at natural size (1:1 with Figma), centred, never clipped */}
        <div className="relative mt-[29px] h-[206px] rounded-[30px] border border-[#1c1c1c] bg-[#040404]">
          <Image
            src={item.image}
            alt={item.alt}
            width={item.w}
            height={item.h}
            className="absolute left-1/2 top-1/2 h-auto max-w-none -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </article>
  );
}

export default function Partners() {
  return (
    <main>
      {/* the shared hero glow: this is what colours the header area on every other page */}
      <PageGlows variant="inner" />
      <Hero
        className="min-h-[460px] pt-24! pb-24! md:min-h-[640px] md:pt-28!"
        title={
          <>
            Advancing Pakistan’s Digital Future
            <br />
            as a Cisco Premier Partner
          </>
        }
        text={
          <>
            15 certified technology partnerships, one accountable team designing,
            <br />
            deploying and supporting all of it.
          </>
        }
        primary="Talk to an IT Consultant"
        secondary="Explore our Services"
      />

      {/* long purple panel #1: Credentials + What We Deliver (+ globe background) */}
      <div className="relative isolate">
        <PurplePanel variant="top">
          <Image
            src="/images/Partnership_Section_Image.png"
            alt=""
            width={520}
            height={520}
            className="absolute hidden h-auto w-[520px] max-w-none lg:block"
            style={{ right: -88, top: 773 }}
          />
        </PurplePanel>

        <section className="pb-10 pt-10 lg:pb-0 lg:pt-0">
          <Container className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0">
            <div className="lg:w-[700px]">
              <h2 className="text-[34px] font-normal leading-[1.15] text-white lg:mt-[9px] lg:text-[48px] lg:leading-[56px]">
                {credentials.title}
              </h2>
              <span className="mt-6 block h-1 w-[86px] rounded-full bg-[#6739DD] lg:mt-[35px]" />
              <div className="mt-8 space-y-6 text-[18px] leading-[30px] text-white lg:mt-[38px] lg:space-y-[38px] lg:text-[24px] lg:leading-[38px]">
                {credentials.blocks.map((b, i) => (
                  <p key={i}>
                    {b.heading}
                    <br />
                    {b.text}
                  </p>
                ))}
              </div>
            </div>

            <div className="w-full rounded-[40px] border border-[#262626] bg-[#080808] p-5 lg:h-[560px] lg:w-[640px] lg:shrink-0">
              <Image
                src="/images/Partners_Credentials.jpg"
                alt={credentials.alt}
                width={582}
                height={508}
                className="block h-full w-full rounded-[28px] border border-white/30 object-cover"
              />
            </div>
          </Container>
        </section>

        <section className="pb-16 pt-[80px] lg:mt-[150px] lg:pb-[125px] lg:pt-0">
          <Container>
            <SectionHeading>What We Deliver</SectionHeading>
            <SectionIntro intro={intro} className="mt-4 lg:mt-[29px]" />
          </Container>

          {/* mobile / tablet: simple stack */}
          <Container className="mt-10 grid gap-6 md:grid-cols-2 lg:hidden">
            {deliver.map((c) => (
              <GlowCard key={c.id}>
                <CardText title={c.title} text={c.text} />
              </GlowCard>
            ))}
          </Container>

          {/* desktop: pixel-positioned stage with dashed connectors */}
          <div className="mt-[55px] hidden px-8 lg:block xl:px-0">
            <DeliverStage cards={deliver} />
          </div>
        </section>
      </div>

      <div className="relative isolate">
        {/* blue glows behind the products + partnership sections */}
        <div aria-hidden className="pointer-events-none absolute -z-10 hidden lg:block" style={{ left: -700, top: 810, width: 1500, height: 1300, background: "radial-gradient(closest-side, rgba(40,95,230,0.5), rgba(40,95,230,0) 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute -z-10 hidden lg:block" style={{ right: -600, top: 1360, width: 1400, height: 1500, background: "radial-gradient(closest-side, rgba(40,95,230,0.45), rgba(40,95,230,0) 100%)" }} />

        <section className="relative pb-0 pt-16 lg:pt-[8px]">
          <Container>
            <SectionHeading>Cisco Technology / Product Deep Dive</SectionHeading>
            <SectionIntro intro={intro} className="mt-4 lg:mt-[32px]" />

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-[53px] lg:grid-cols-3 lg:gap-x-[33px] lg:gap-y-[28px]">
              {products.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-10 flex justify-center lg:mt-[66px]">
              <PrimaryButton href="/products">View More Products</PrimaryButton>
            </div>
          </Container>
        </section>

        <section className="relative pb-16 pt-20 lg:pb-0 lg:pt-[118px]">
          <Container>
            <h2 className="text-center text-[40px] font-normal leading-[1.15] text-white md:text-[52px] lg:text-[64px] lg:leading-[75px]">
              Comtech + Cisco
              <br />
              <span
                className="text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#F1F3FC,#AEBCF8)", WebkitBackgroundClip: "text", backgroundClip: "text" }}
              >
                A Trusted Technology Partnership
              </span>
            </h2>
            <SectionIntro intro={intro} className="mt-4 lg:mt-[28px]" />

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-[59px] lg:gap-x-[46px] lg:gap-y-[48px]">
              {partnership.map((it) => (
                <GlowCard key={it.number}>
                  <span className="absolute right-[24px] top-[22px] flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#6739DC] text-[22px] text-white lg:right-[34px] lg:top-[32px]">
                    {it.number}
                  </span>
                  <CardText title={it.title} text={cardText} />
                </GlowCard>
              ))}
            </div>
          </Container>
        </section>
      </div>

      {/* long purple panel #2: FAQ + CTA */}
      <div className="relative isolate">
        <PurplePanel variant="bottom" />
        <PartnersFaq text={faq.text} items={faq.items} />

        <section className="pb-16 pt-12 lg:pb-[125px] lg:pt-[161px]">
          <Container>
            <div
              className="rounded-[48px] border border-[#2e2e2e] px-6 py-12 text-center lg:rounded-[80px] lg:px-16 lg:py-[81px]"
              style={{ background: "linear-gradient(180deg,#040404 0%,#1F0C51 85%,#0D0525 100%)" }}
            >
              <h2 className="text-[30px] font-normal leading-[1.2] text-white lg:text-[48px] lg:leading-[56px]">{cta.title}</h2>
              <p className="mx-auto mt-5 max-w-[990px] text-[16px] leading-7 text-white lg:mt-[27px] lg:text-[18px] lg:leading-[38px]">{cta.text}</p>
              <div className="mt-8 flex justify-center lg:mt-[39px]">
                <PrimaryButton href="/contact">{cta.label}</PrimaryButton>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
