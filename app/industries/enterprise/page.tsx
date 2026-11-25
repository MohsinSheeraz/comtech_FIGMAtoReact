import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { PageGlows } from "@/components/Glow";
import { StackedFaq } from "@/components/Stackedfaq";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { NumberedCards } from "@/components/NumberedCards";
import { GlowCard, Underline } from "@/components/PartnersUI";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/industries/enterprise", {
    alternates: { canonical: "https://comtech.net.pk/industries/enterprise" },
  });
}

const stats: [string, string][] = [
  ["250+", "Projects Delivered"],
  ["10+ Years", "In Operation"],
  ["24/7", "Security Operations"],
  ["4 Cities", "Nationwide"],
];

const services = [
  {
    title: "Enterprise IT Management and Support",
    text: "Enterprise IT management from a single team: helpdesk, desktop support, asset lifecycle, and monitoring, with clear service levels across every site.",
  },
  {
    title: "Enterprise Networking",
    text: "Enterprise networking services that keep every office, floor, and branch on the same design, from switching and wireless to secure links between sites. Built on Cisco, Huawei, and Fortinet.",
  },
  {
    title: "Enterprise Cybersecurity",
    text: "Enterprise cyber security solutions applied the same way everywhere: firewalls, endpoint and email protection, and 24/7 monitoring, so a branch isn't the weak link. Cybersecurity for enterprises works when it covers every site, not just headquarters.",
  },
  {
    title: "Enterprise Data Center",
    text: "Enterprise data center solutions for core systems: design, migration, and disaster recovery on Cisco and HPE, with enterprise data center security built in from the start.",
  },
];

const breaks = [
  {
    title: "Too Many Vendors",
    text: "Four suppliers, four contracts, and nobody owning the gaps between them.",
  },
  {
    title: "Inconsistent Sites",
    text: "Head office is locked down. The regional branch isn't.",
  },
  {
    title: "No Single View",
    text: "Nobody can say what's running, where, or who is responsible when it stops.",
  },
];

const steps: [string, string, string][] = [
  [
    "01",
    "We Inventory",
    "What you have, where it is, and who is responsible for it.",
  ],
  [
    "02",
    "We Standardize",
    "One design and one security baseline across every site.",
  ],
  ["03", "We Consolidate", "Fewer vendors, fewer contracts, fewer gaps."],
  [
    "04",
    "We Run It",
    "Managed support and monitoring, with reporting you can read.",
  ],
];

const why = [
  {
    title: "One Accountable Team",
    text: "Networking, security, data center, and managed IT, without the finger-pointing.",
  },
  {
    title: "Same Standard Everywhere",
    text: "Every branch gets the security and support headquarters gets.",
  },
  {
    title: "Credentials You Can Check",
    text: "A Cisco Premier Partner and Huawei Loyalty Partner.",
  },
  {
    title: "Local in Four Cities",
    text: "We offer services in Karachi, Islamabad, Lahore, and Quetta.",
  },
];

const faq: [string, string][] = [
  [
    "What does Comtech's enterprise IT service cover?",
    "Networking, cybersecurity, data center, and managed IT support, delivered by one team across all your sites.",
  ],
  [
    "Can you take over IT from several existing vendors?",
    "Yes. Comtech inventories what is in place, standardizes it, and consolidates where it makes sense, rather than replacing everything at once.",
  ],
  [
    "How do you keep security consistent across branches?",
    "One baseline, applied everywhere, and monitored from one 24/7 operations team.",
  ],
  [
    "Do you work alongside our in-house IT team?",
    "Yes. Many organizations keep a core team and add Comtech for coverage, specialist work, or after-hours support.",
  ],
];

const related = [
  {
    title: "Cybersecurity",
    text: "Enterprise security controls, SOC monitoring, and incident protection.",
    href: "/services/cyber-security",
  },
  {
    title: "Data Center & Cloud Solutions",
    text: "Core infrastructure, migration, and disaster recovery.",
    href: "/services/data-center",
  },
  {
    title: "Networking & IT Infrastructure",
    text: "One secure network design across offices and branches.",
    href: "/services/networking",
  },
];

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";
const bandB =
  "linear-gradient(179.11deg, rgba(4, 4, 4, 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgba(4, 4, 4, 0) 99.23%)";
const H2 = "text-[46px] font-medium leading-[54px] tracking-tighter";

export default function Enterprise() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={
          <>
            One Standard for Every Department,
            <br />
            Site, and System
          </>
        }
        text="Comtech delivers enterprise IT services for large, multi-site organizations: networking, security, and data center under one accountable team, with enterprise IT support that doesn't change from branch to branch."
        primary="Request an Enterprise IT Assessment"
        secondary="Explore our Services"
      />
      <Stats items={stats} interactive />

      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: frameBg }}
      >
        <section className="wrap sec">
          <SecHead
            title="Where Enterprise IT Usually Breaks"
            sub="Comtech's job is to venture into all three areas and fix whatever is wrong!"
          />
          <div className="grid gap-6 md:grid-cols-3 lg:gap-[28px]">
            {breaks.map((item) => (
              <GlowCard key={item.title} className="h-full">
                <h3 className="text-[26px] font-normal leading-[31px] text-white">
                  {item.title}
                </h3>
                <Underline className="mt-[20px]" />
                <p className="mt-[21px] text-[18px] leading-[31px] text-white">
                  {item.text}
                </p>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="What We Run for Enterprise" />
          <div className="grid gap-6 md:grid-cols-2 lg:gap-[28px]">
            {services.map((service) => (
              <GlowCard key={service.title} className="h-full">
                <h3 className="text-[26px] font-normal leading-[31px] text-white">
                  {service.title}
                </h3>
                <Underline className="mt-[20px]" />
                <p className="mt-[21px] text-[18px] leading-[31px] text-white">
                  {service.text}
                </p>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="How We Take Over the Mess" />
          <HowWeWork steps={steps} />
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="Why Enterprises Choose Comtech" />
          <NumberedCards items={why} />
        </section>
      </div>

      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px]"
        style={{ background: bandB }}
      >
        <section className="wrap">
          <StackedFaq
            items={faq}
            head={
              <>
                <h2 className={H2}>
                  Enterprise IT,
                  <br />
                  Straight Answers
                </h2>
                <p className="mt-5">
                  Have questions? Our FAQ section has you covered with quick
                  answers to the most common inquiries.
                </p>
              </>
            }
          />
        </section>
      </div>

      <section className="wrap sec">
        <SecHead title="You Might Also Need" />
        <div className="grid gap-6 md:grid-cols-3 lg:gap-[28px]">
          {related.map((item) => (
            <GlowCard key={item.title} className="h-full">
              <div className="flex h-full flex-col">
                <h3 className="text-[26px] font-normal leading-[31px] text-white">
                  {item.title}
                </h3>
                <Underline className="mt-[20px]" />
                <p className="mt-[21px] flex-1 text-[18px] leading-[31px] text-white">
                  {item.text}
                </p>
                <div className="mt-7">
                  <Btn v="o" href={item.href}>
                    Read More
                  </Btn>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      <CtaPanel
        title="Ready to Put Your Whole IT Estate on One Standard?"
        text="An assessment shows what you have, where it differs, and what to fix first."
        label="Request an Enterprise IT Assessment"
      />
    </main>
  );
}
