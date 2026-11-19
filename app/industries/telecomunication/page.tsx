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
  title: "Telecom IT Services in Pakistan | Comtech Associates",
  description:
    "Comtech Associates delivers telecom infrastructure services and telecom IT solutions: access, transport, routing, and data center for operators, ISPs, and telecom businesses.",
};

const stats: [string, string][] = [
  ["24/7", "Support"],
  ["5G-Ready", "Backbone Technology"],
  ["250+", "Projects Delivered"],
  ["4 Cities", "Nationwide"],
];

const services = [
  {
    title: "For Operators and ISPs: The Network",
    text: "Telecom infrastructure built to scale as subscribers and traffic grow. Comtech works as a telecommunication infrastructure contractor for access, transport, and core, using Huawei and Cisco carrier-grade technology.",
    bullets: [
      "Access, transport, and core network infrastructure",
      "Huawei and Cisco carrier-grade technology",
      "Network architecture planned for subscriber and traffic growth",
    ],
  },
  {
    title: "For Telecom Businesses: The IT",
    text: "Telecom IT services keep billing, support, and corporate systems running behind the network. Comtech provides IT solutions for telecommunications companies and telecom business services for the teams who run them, with telecommunications systems for business customers in mind too.",
    bullets: [
      "Business systems and managed IT support",
      "Security for users, applications, and network layers",
      "Systems planned around telecom operations and business customers",
    ],
  },
  {
    title: "Access",
    text: "Huawei GPON for broadband, plus enterprise Wi-Fi at the edge.",
    bullets: [
      "Broadband access infrastructure",
      "Enterprise Wi-Fi at the network edge",
      "Connectivity planned for growing subscriber demand",
    ],
  },
  {
    title: "Transport",
    text: "Huawei optical transmission and SFP-based fiber links for high-speed, long-distance data transfer.",
    bullets: [
      "Optical transmission",
      "SFP-based fiber links",
      "High-speed, long-distance data transfer",
    ],
  },
];

const transportServices = [
  {
    title: "Core and Edge",
    text: "Huawei enterprise routing and Cisco service provider routers, wireless, and infrastructure software.",
  },
  {
    title: "Data Center",
    text: "Cisco data center switching and cloud software, with HPE and Dell servers.",
  },
  {
    title: "Security",
    text: "Next-generation firewalls and 24/7 monitoring across every layer.",
  },
];

const steps: [string, string, string][] = [
  ["01", "We Map the Network", "Capacity, topology, and growth plans, before any equipment is chosen."],
  ["02", "We Design for Growth", "Architecture that scales without a redesign every time demand moves."],
  ["03", "We Build and Cut Over", "Staged rollouts with fallback paths, so live services aren't put at risk."],
  ["04", "We Operate and Support", "Round-the-clock monitoring and engineers who pick up."],
];

const why = [
  {
    title: "Network and IT, One Team",
    text: "The backbone and the business systems behind it, built by the same engineers.",
  },
  {
    title: "Carrier-Grade Technology",
    text: "Huawei and Cisco lines designed for service provider scale, not repurposed office gear.",
  },
  {
    title: "Built for Growth",
    text: "Designs that expand with subscribers and traffic instead of being replaced.",
  },
  {
    title: "Engineers in Four Cities",
    text: "Karachi, Islamabad, Lahore, and Quetta, near the sites you actually run.",
  },
];

const faq: [string, string][] = [
  [
    "What does a telecom infrastructure company like Comtech actually build?",
    "Access, transport, routing, and data center infrastructure, using carrier-grade Huawei and Cisco technology, along with the IT and security that run the business around the network.",
  ],
  [
    "Does Comtech work with ISPs and operators, or only enterprises?",
    "Both. Comtech provides backbone infrastructure for operators and ISPs, and telecom IT services and systems for businesses.",
  ],
  [
    "Can Comtech help plan a 5G-ready network?",
    "Comtech deploys Huawei enterprise routing, optical transmission, and GPON technology that supports broadband expansion and 5G readiness.",
  ],
  [
    "Can you migrate our data center without risking live services?",
    "Migrations are staged with fallback paths and disaster recovery planned first. Comtech designs, migrates, and supports data center environments on Cisco and HPE.",
  ],
  [
    "Does Comtech provide 24/7 support for telecom environments?",
    "Yes. Comtech provides round-the-clock support and security monitoring after go-live, not just at handover.",
  ],
];

const related = [
  {
    title: "Cybersecurity",
    text: "Managed security and 24/7 monitoring across the network and business systems.",
    href: "/services/cybersecurity",
  },
  {
    title: "Data Center & Cloud Solutions",
    text: "Cisco switching, migration, and disaster recovery for telecom workloads.",
    href: "/services/data-center",
  },
  {
    title: "Networking & IT Infrastructure",
    text: "Carrier-grade routing, optical transport, switching, and wireless for connected operations.",
    href: "/services/networking",
  },
];

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";

const bandB =
  "linear-gradient(179.11deg, rgba(4, 4, 4, 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgba(4, 4, 4, 0) 99.23%)";

const H2 = "text-[46px] font-medium leading-[54px] tracking-tighter";

export default function Telecom() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={
          <>
            The Backbone Behind
            <br />
            Every Connection
          </>
        }
        text="Comtech delivers telecom infrastructure services and telecom IT solutions: access, transport, routing, and data center for operators, ISPs, and telecom businesses that can't afford a dropped connection."
        primary="Request a Telecom Infrastructure Assessment"
        secondary="Explore our Services"
      />

      <Stats items={stats} />

      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: frameBg }}
      >
        <section className="wrap sec">
          <SecHead
            title="Two Sides of Telecom, One Engineering Team"
            sub="Telecom companies need two things: a network that carries traffic, and IT that runs the business around it. Comtech builds both."
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
            title="The Technology Behind the Backbone"
            sub="A telecom network is a stack. Here is the one Comtech builds, layer by layer."
          />
          <div className="grid gap-6 md:grid-cols-3 lg:gap-[28px]">
            {transportServices.map((item) => (
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
          <SecHead title="How We Build a Backbone" />
          <HowWeWork steps={steps} />
        </section>

        <section className="wrap sec mt-16!">
          <SecHead
            title="Why Telecom Teams Choose Comtech"
            sub="When your product is connectivity, your infrastructure partner has to be better than your SLA."
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
                  Telecom Infrastructure, Straight
                  <br />
                  Answers
                </h2>
                <p className="mt-5">
                  Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
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
        title="Ready to Build a Backbone That Scales?"
        text="An assessment maps your network, capacity, and growth plans before anything is proposed."
        label="Request a Telecom Infrastructure Assessment"
      />
    </main>
  );
}
