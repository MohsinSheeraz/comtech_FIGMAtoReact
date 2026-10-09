import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { PageGlows } from "@/components/Glow";
import { CtaPanel } from "@/components/CtaPanel";
import { PartnersTabs } from "@/components/Partnerstab";
import { SectionHeading, SectionIntro, Underline } from "@/components/PartnersUI";

export const metadata: Metadata = {
  title: "Technology Partners | Comtech Associates",
  description: "15 certified technology partnerships, one accountable team designing, deploying, and supporting all of it.",
};

/* ---------- content (copy is exactly as in the Figma) ---------- */

const why = {
  heading: "Why the Partner Behind the Product Matters",
  text: "Anyone can put a vendor’s logo on a website. A certified partnership means Comtech’s engineers hold active certifications on that platform, get direct vendor-level support when something’s urgent, and have real product and pricing access, not a general reseller markup.",
  alt: "Business professionals shaking hands in front of a global network overlay",
};

// two sentences so the intro breaks into two lines on desktop, like the design
const intro = {
  a: "As a certified Cisco partner, Comtech designs, deploys, and monitors the network infrastructure banks, hospitals, and manufacturers depend on, 24/7.",
  b: "We serve enterprises in four major cities, backed by certified engineers, not a reseller who ships hardware and disappears.",
};

const cta = {
  title: "Ready to Solve Your IT Challenge?",
  text: "Whether it’s one service or all four, a conversation with Comtech’s team is the place to start. Tell us what you’re dealing with, a security gap, an unreliable network, a data center migration, or a staffing shortfall, and we’ll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations start with a short assessment of your current environment before anything gets proposed.",
  label: "Request an IT Assessment",
};

export default function Partners() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={
          <>
            Comtech’s Technology Partners
            <br />
            in Pakistan
          </>
        }
        text={
          <>
            15 certified technology partnerships, one accountable team designing,
            <br />
            deploying, and supporting all of it.
          </>
        }
        primary="Talk to an IT Consultant"
        secondary="Explore our Services"
      />

      {/* long purple panel behind "Why the partner" + all partner cards */}
      <div className="relative isolate">
        <div
          aria-hidden
          className="rounded-[48px] pointer-events-none absolute inset-x-0 inset-y-0 -z-10 lg:inset-x-[5%]"
          style={{
            background:
              " linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, var(--bg) 80.62%)",
          }}
        />

        {/* Why the Partner Behind the Product Matters */}
        <section className="pb-10 pt-16 lg:pb-0 lg:pt-[240px]">
          <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="lg:w-[700px]">
              <h2 className="text-[34px] font-normal leading-[1.15] tracking-tighter text-fg lg:text-[48px] lg:leading-[56px]">
                {why.heading}
              </h2>
              <Underline className="mt-6 h-1! w-[86px]! lg:mt-[30px]" />
              <p className="mt-8 text-[18px] leading-[30px] tracking-tighter text-fg lg:mt-[34px] lg:text-[24px] lg:leading-[38px]">
                {why.heading}
                <br />
                {why.text}
              </p>
            </div>

            <div className="w-full rounded-[40px] border border-line bg-card p-5 lg:h-[393px] lg:w-[640px] lg:shrink-0">
              <Image
                src="/images/Partners_Credentials.jpg"
                alt={why.alt}
                width={600}
                height={346}
                className="block h-full w-full rounded-[28px] border border-fg/30 object-cover"
              />
            </div>
          </div>
        </section>

        {/* All partners */}
        <section className="pb-12 pt-[80px] lg:pb-[76px] lg:pt-[150px]">
          <div className="wrap">
            <SectionHeading>Here’s all the partners of Comtech</SectionHeading>
            <SectionIntro intro={intro} className="mt-4 lg:mt-[29px]" />
            <PartnersTabs />
          </div>
        </section>
      </div>

      <CtaPanel title={cta.title} text={cta.text} label={cta.label} />
    </main>
  );
}