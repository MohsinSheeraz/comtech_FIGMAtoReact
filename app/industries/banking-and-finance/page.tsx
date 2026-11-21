import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "IT Services for Banks in Pakistan | Comtech Associates",
  description:
    "Comtech Associates provides IT services for banks in Pakistan: managed IT, cybersecurity, data center, and branch networking built for uptime and compliance.",
};

const stats: [string, string][] = [
  ["250+", "Projects Delivered"],
  ["10+ Years", "In Operation"],
  ["2 Documented", "Bank Deployments"],
  ["24/7", "Security Operations"],
];

const services = [
  {
    title: "Managed IT Services for Banks",
    text: "Managed IT services for banks that keep core systems, branches, and back offices running, with a single team answering when something breaks. Bank IT support that doesn't depend on who happens to be on shift.",
    bullets: [
      "24/7 monitoring and incident response",
      "Bank IT solutions planning and IT consulting for banking operations",
      "Asset lifecycle management and after-sales support",
    ],
  },
  {
    title: "Cybersecurity for Banking",
    text: "Cybersecurity for banks is a daily discipline, not an annual audit. Comtech builds and runs banking cyber security around the threats financial institutions actually face, with information security for banks designed in from the start.",
    bullets: [
      "Next-generation firewalls and Fortinet-based network protection",
      "24/7 Security Operations Center monitoring",
      "Cybersecurity solutions for banks, from endpoint to email to the network edge",
      "Security assessments and compliance-aligned hardening",
    ],
  },
  {
    title: "Bank Data Center and Disaster Recovery",
    text: "A bank data center has to be fast, resilient, and recoverable. Comtech designs, migrates, and supports data center environments on Cisco and HPE, with disaster recovery planned before it's needed.",
    bullets: [
      "Cisco ACI data center design and deployment",
      "Disaster recovery network migration",
      "Hybrid cloud connectivity for banking workloads",
    ],
  },
  {
    title: "Branch Networks and Secure SD-WAN",
    text: "Every branch should behave like part of one network. Comtech connects branches over encrypted, centrally managed links.",
    bullets: [
      "Fortinet Secure SD-WAN across branch locations",
      "Branch switching, wireless, and banking IT systems integration",
      "Centralized visibility across every site",
    ],
  },
];

const deployments = [
  {
    title: "Bank Islami",
    text: "Cisco ACI data center deployment, paired with a disaster recovery network migration project, for a regulated financial institution.",
  },
  {
    title: "Karakoram Bank (KCBL)",
    text: "Fortinet Secure SD-WAN deployed across branch locations, connecting branches on encrypted, centrally managed links.",
  },
];

const steps: [string, string, string][] = [
  [
    "01",
    "We Assess",
    "We map your network, systems, and security posture before anyone proposes a thing.",
  ],
  [
    "02",
    "We Design",
    "Architecture built around your uptime targets and the compliance requirements you answer to.",
  ],
  [
    "03",
    "We Deploy",
    "Staged rollouts planned around live banking operations, with recovery paths ready.",
  ],
  [
    "04",
    "We Support",
    "Ongoing monitoring, managed IT, and security operations after go-live.",
  ],
];

const why = [
  {
    title: "One Team, Branch to Data Center",
    text: "Networking, security, and data center under one accountable partner, not four vendors pointing at each other.",
  },
  {
    title: "Premier Cisco, Fortinet-Ready",
    text: "A Cisco Premier Partner with Fortinet deployments live in Pakistani banking.",
  },
  {
    title: "Security That Keeps Watching",
    text: "A 24/7 SOC covering the environment after go-live, not just at handover.",
  },
  {
    title: "Local Engineers in Four Cities",
    text: "Karachi, Islamabad, Lahore, and Quetta, so branch networks get support close by.",
  },
];

const faq: [string, string][] = [
  [
    "What IT services does Comtech provide for banks?",
    "Managed IT, cybersecurity, data center and disaster recovery, and branch networking, delivered by one team. That covers everything from IT services for banks day to day support through to large infrastructure projects.",
  ],
  [
    "How does Comtech approach cybersecurity in banking?",
    "As an ongoing operation: firewalls and endpoint protection, 24/7 SOC monitoring, and security assessments, designed around cybersecurity in banking threats and compliance needs.",
  ],
  [
    "Can Comtech migrate a bank data center without disrupting operations?",
    "Migrations are staged and planned around live operations, with disaster recovery in place first. Comtech has delivered a Cisco ACI deployment and DR network migration for Bank Islami.",
  ],
  [
    "Can Comtech connect and secure our branch network?",
    "Yes. Fortinet Secure SD-WAN links branches over encrypted, centrally managed connections, as deployed for Karakoram Bank.",
  ],
  [
    "Does Comtech provide ongoing support after a project ends?",
    "Yes. Managed IT, monitoring, and after-sales support continue after go-live.",
  ],
];

const related = [
  {
    title: "Cybersecurity",
    text: "Go deeper on managed security, SOC monitoring, and compliance-aligned protection.",
    href: "/services/cybersecurity",
  },
  {
    title: "Data Center & Cloud Solutions",
    text: "Design, migration, and disaster recovery for critical banking workloads.",
    href: "/services/data-center",
  },
  {
    title: "Networking & IT Infrastructure",
    text: "Branch connectivity, switching, and wireless built for always-on operations.",
    href: "/services/network-support",
  },
];

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";

const bandB =
  "linear-gradient(179.11deg, rgba(4, 4, 4, 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgba(4, 4, 4, 0) 99.23%)";

const H2 = "text-[46px] font-medium leading-[54px] tracking-tighter";

export default function BankingAndFinance() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={
          <>
            Banking IT That Doesn't Get
            <br />a Maintenance Window
          </>
        }
        text="Comtech delivers IT services for banking: networking, cybersecurity, data center, and managed IT support, built for institutions where uptime and compliance aren't optional."
        primary="Request a Banking IT Assessment"
        secondary="Explore our Services"
      />

      <Stats items={stats} interactive />

      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: frameBg }}
      >
        <section className="wrap sec">
          <SecHead
            title="Banking IT, Handled End to End"
            sub="One accountable IT provider for banking, from the branch network to the data center."
          />
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
                <ul className="mt-5 space-y-2 text-[17px] leading-[28px] text-white/90">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-5">
                      <span className="absolute left-0 top-[10px] size-2 rounded-full bg-[#7C58E6]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead
            title="Proven in Pakistani Banking"
            sub="Two documented bank deployments, delivered by Comtech."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:gap-[28px]">
            {deployments.map((deployment) => (
              <GlowCard key={deployment.title} className="h-full">
                <h3 className="text-[26px] font-normal leading-[31px] text-white">
                  {deployment.title}
                </h3>
                <Underline className="mt-[20px]" />
                <p className="mt-[21px] text-[18px] leading-[31px] text-white">
                  {deployment.text}
                </p>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="How We Get Your Bank Secure and Stable" />
          <HowWeWork steps={steps} />
        </section>

        <section className="wrap sec mt-16!">
          <SecHead
            title="Built Around the Standards Banks Answer To"
            sub="Delivery practices are aligned to PCI DSS and ISO 27001 requirements, and applied to the frameworks your institution actually reports against."
          />
        </section>

        <section className="wrap sec mt-16!">
          <SecHead
            title="Why Banks Choose Comtech"
            sub="When uptime and compliance aren't optional, you need one team accountable for the whole stack."
          />
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
                  Banking IT, Straight
                  <br />
                  Answers
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
        title="Ready to Strengthen Your Bank's IT Foundation?"
        text="An assessment maps your network, security, and data center before anything is proposed."
        label="Request a Banking IT Assessment"
      />
    </main>
  );
}
