import type { Metadata } from "next";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Hero } from "@/components/Hero";
import { PageGlows } from "@/components/Glow";
import { PinnedFaq } from "@/components/PinnedFaq";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { NumberedCards } from "@/components/NumberedCards";
import { GlowCard, Underline } from "@/components/PartnersUI";

export const metadata: Metadata = {
  title: "Industries | Comtech Associates",
  description:
    "Comtech delivers IT services for banking, healthcare, government, education, telecom and enterprise across Pakistan, each built to its own definition of uptime.",
};

/* ---------- content (copy is exactly as in the Figma) ---------- */

const stats: [string, string][] = [
  ["10+ Years", "In Operation"],
  ["250+", "Projects Delivered"],
  ["6 Sectors", "Served"],
  ["4 Cities", "Nationwide"],
];

// TODO: only /industries/education exists so far; the other slugs need their own pages.
const sectors = [
  {
    title: "Banking & Financial Services",
    slug: "banking",
    text: "IT services for banking built for institutions where uptime and compliance aren’t optional. Bank IT support, cybersecurity, and bank data center infrastructure from one team.",
  },
  {
    title: "Healthcare",
    slug: "healthcare",
    text: "Healthcare IT services that protect patient data and keep critical care running. Healthcare cybersecurity and always-on infrastructure, built around compliance.",
  },
  {
    title: "Government & Public Sector",
    slug: "government",
    text: "IT services for government built for the scale and accountability the public sector demands. Managed IT services for government and standards-aligned government IT infrastructure.",
  },
  {
    title: "Education",
    slug: "education",
    text: "IT services for education that keep classrooms, labs, and administration running. IT support for education and campus-wide connectivity, from schools to universities.",
  },
  {
    title: "Telecommunications",
    slug: "telecom",
    text: "Telecom IT services and infrastructure services for operators who can’t afford a dropped connection. Carrier-grade networking with 24/7 support.",
  },
  {
    title: "Enterprise",
    slug: "enterprise",
    // the Figma copy ends at "and data center"; "infrastructure" added so it reads complete
    text: "Enterprise IT services for large, multi-department organizations. Enterprise IT support, cybersecurity solutions, and data center infrastructure.",
  },
];

const demands: [string, string][] = [
  ["Banking", "zero tolerance for downtime and audit gaps. We lead with Cisco ACI data centers, Fortinet Secure SD-WAN, and managed security."],
  ["Healthcare", "patient data that stays private and systems that stay up. We lead with disaster recovery, data protection, and compliance-aligned security."],
  ["Government", "standards, scale, and accountability. We lead with secure communications, firewalls, and standards-aligned infrastructure."],
  ["Education", "coverage across every block, hostel, and lab. We lead with campus-wide Wi-Fi 6, switching, and ongoing IT support."],
  ["Telecom", "continuity at carrier scale. We lead with carrier-grade routing, optical and GPON backbone, and 24/7 support."],
  ["Enterprise", "many departments, one standard. We lead with enterprise IT management, security, and data center infrastructure."],
];

const why = [
  { title: "One Team, the Whole Stack", text: "Networking, security, data center, and managed IT from one accountable team, not four vendors pointing at each other." },
  { title: "Compliance-Aligned Practices", text: "Delivery built around ISO 27001, PCI DSS, HIPAA, and GDPR requirements, matched to what your sector answers to." },
  { title: "24/7 Security Operations", text: "A round-the-clock SOC watching the environment after go-live, not just at handover." },
  { title: "Present in Four Cities", text: "Karachi, Islamabad, Lahore, and Quetta, so multi-site organizations get local engineers." },
];

// TODO: answers 2-4 were not in the design; drafted from existing site copy, replace with final copy.
const faq: [string, string][] = [
  [
    "Does Comtech offer a different solution per industry, or one package for all?",
    "Different starting points on the same engineering base. A bank’s conversation begins with uptime and audit trails, a campus’s with coverage and user density. The sector pages show where each one starts.",
  ],
  [
    "Which compliance frameworks does Comtech work to?",
    "Delivery is built around ISO 27001, PCI DSS, HIPAA, and GDPR where relevant, plus Pakistan-specific requirements including the SBP Cybersecurity Framework, matched to what your sector answers to.",
  ],
  [
    "Can Comtech support an organization spread across several cities?",
    "Yes. Comtech has offices in Karachi, Islamabad, Lahore, and Quetta, so multi-site organizations get local engineers instead of a single remote team.",
  ],
  [
    "My industry isn’t listed. Can Comtech still help?",
    "Most likely. The engineering base is the same across sectors, so start with a conversation about your environment and we’ll tell you honestly where Comtech fits.",
  ],
];

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";

const bandB =
  "linear-gradient(179.11deg, rgba(4, 4, 4, 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgba(4, 4, 4, 0) 99.23%)";

const H2 = "text-[46px] font-medium leading-[54px] tracking-tighter";

const Dot = ({ left }: { left: string }) => (
  <span
    aria-hidden
    className="absolute top-1/2 hidden size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full min-[1101px]:flex"
    style={{ left, background: "rgba(124,88,230,0.45)" }}
  >
    <span className="size-[13px] rounded-full bg-[#7C58E6]" />
  </span>
);

export default function Industries() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={
          <>
            IT Built Around How Your Industry
            <br />
            Actually Runs
          </>
        }
        text="A bank can’t go offline. A campus can’t go quiet. Comtech delivers IT services for seven sectors across Pakistan, each built to its own definition of uptime."
        primary="Request an Industry IT Assessment"
        secondary="Explore our Services"
      />

      <Stats items={stats} />

      {/* gradient frame: sectors + what each sector demands + why */}
      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: frameBg }}
      >
        <section className="wrap sec">
          <SecHead
            title={
              <>
                Seven Sectors. Seven Different
                <br />
                Definitions of Downtime.
              </>
            }
            sub="Seven Sectors. Seven Different Definitions of Downtime."
          />
          <div className="grid gap-6 md:grid-cols-2 min-[1101px]:grid-cols-3 lg:gap-x-[33px] lg:gap-y-[28px]">
            {sectors.map((s) => (
              <GlowCard key={s.slug} className="h-full">
                <div className="flex h-full flex-col">
                  <h3 className="text-[26px] font-normal leading-[31px] text-white">{s.title}</h3>
                  <Underline className="mt-[20px]" />
                  <p className="mt-[21px] flex-1 text-[18px] leading-[31px] text-white">{s.text}</p>
                  <div className="mt-7">
                    <Btn v="o" href={`/industries/${s.slug}`}>
                      Read More
                    </Btn>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead
            title="What Each Sector Demands, and What We Lead With"
            sub="Same engineering team. A different starting point for every conversation."
          />
          <div className="relative grid gap-12 min-[1101px]:grid-cols-3 min-[1101px]:gap-y-0">
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-[2px] -translate-x-1/2 bg-[#6739DD] min-[1101px]:block" />
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-[2px] -translate-x-1/2 bg-[#6739DD] min-[1101px]:block" />
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[2px] -translate-y-1/2 bg-[#6739DD]/70 min-[1101px]:block" />
            <Dot left="33.3333%" />
            <Dot left="66.6667%" />
            {demands.map(([t, p]) => (
              <div key={t} className="px-4 text-center min-[1101px]:px-10 min-[1101px]:py-14">
                <h3 className="text-[26px] font-normal leading-[34px] tracking-tighter text-white lg:text-[30px] lg:leading-[38px]">{t}</h3>
                <p className="mx-auto mt-5 max-w-[360px] text-[16px] leading-[28px] tracking-tighter lg:text-[18px] lg:leading-[31px]">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead
            title="Why Regulated Sectors Choose Comtech"
            sub="When uptime and compliance aren’t optional, you need one team accountable for the whole stack."
          />
          <NumberedCards items={why} />
        </section>
      </div>

      {/* FAQ band */}
      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] py-10"
        style={{ background: bandB }}
      >
        <section className="wrap sec">
          <PinnedFaq
            pin="bottom"
            items={faq}
            head={
              <>
                <h2 className={H2}>
                  Industry Solutions,
                  <br />
                  Straight Answers
                </h2>
                <p className="mt-5">
                  Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
                </p>
              </>
            }
          />
        </section>
      </div>

      <CtaPanel
        title="Tell Us Your Sector. We’ll Tell You Where to Start."
        text="An assessment maps your environment before anyone proposes a thing."
        label="Request an IT Assessment"
      />
    </main>
  );
}
