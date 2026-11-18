import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { PageGlows } from "@/components/Glow";
import { PinnedFaq } from "@/components/PinnedFaq";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { NumberedCards } from "@/components/NumberedCards";

type ServicePageData = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  heroTitle: string;
  heroText: string;
  ctaLabel: string;
  stats: [string, string][];
  capabilities: [string, string][];
  steps: [string, string, string][];
  reasons: { title: string; text: string }[];
  faq: [string, string][];
  ctaTitle: string;
  ctaText: string;
};

export const servicePages: ServicePageData[] = [
  {
    slug: "cybersecurity",
    title: "Cybersecurity Services in Pakistan | Comtech Associates",
    description:
      "Cybersecurity services for Pakistani businesses, including managed security, SOC monitoring, VAPT, incident response, and compliance-aligned protection.",
    keyword: "cybersecurity services",
    heroTitle: "Cybersecurity Built Around Your Real Risks",
    heroText:
      "Comtech delivers cybersecurity services in Pakistan for organizations that need to protect users, infrastructure, and sensitive data. From managed security and SOC monitoring to VAPT and incident response, one team helps you identify and address risk.",
    ctaLabel: "Request a Cybersecurity Assessment",
    stats: [
      ["24/7", "Security Operations"],
      ["10+ Years", "IT Delivery Experience"],
      ["250+", "Projects Delivered"],
      ["4 Cities", "Nationwide"],
    ],
    capabilities: [
      [
        "Managed Security and SOC Monitoring",
        "Round-the-clock security monitoring and alert triage help teams identify suspicious activity and coordinate a response without building every capability in-house.",
      ],
      [
        "Vulnerability Assessment and Penetration Testing",
        "VAPT engagements identify weaknesses across applications, networks, and infrastructure, giving your team a prioritized view of what to address first.",
      ],
      [
        "Incident Response and Recovery",
        "Prepare response procedures, investigate incidents, and coordinate recovery steps to help limit disruption when a security event occurs.",
      ],
      [
        "Identity, Endpoint, and Cloud Security",
        "Layered controls help protect user accounts, business endpoints, and cloud environments while supporting the access and compliance needs of your organization.",
      ],
    ],
    steps: [
      ["01", "Assess", "Review your security posture, assets, exposure, and sector-specific obligations."],
      ["02", "Prioritize", "Turn findings into a practical plan based on risk, business impact, and available resources."],
      ["03", "Implement", "Deploy and configure the agreed security controls with minimal disruption to operations."],
      ["04", "Monitor", "Continue monitoring, support, and improvement as your environment and risks change."],
    ],
    reasons: [
      { title: "One Accountable Team", text: "Security, networking, cloud, and managed IT work together instead of being split across disconnected vendors." },
      { title: "Compliance-Aware Delivery", text: "Controls can be mapped to relevant requirements such as ISO 27001, PCI DSS, and the SBP Cybersecurity Framework." },
      { title: "Local Support", text: "Comtech teams in Karachi, Islamabad, Lahore, and Quetta support organizations across Pakistan." },
      { title: "Built Around Your Environment", text: "Recommendations start with your systems, operations, and risk profile rather than a one-size-fits-all product list." },
    ],
    faq: [
      ["What do Comtech cybersecurity services include?", "Services include managed security, SOC monitoring, VAPT, incident response, identity and access management, and cloud security, scoped to your environment."],
      ["What is VAPT?", "Vulnerability assessment and penetration testing helps identify and validate security weaknesses so your team can prioritize remediation."],
      ["Can Comtech support compliance requirements?", "Security work can be aligned to applicable frameworks, including ISO 27001, PCI DSS, and Pakistan's SBP Cybersecurity Framework."],
      ["Do we need an in-house security team to work with Comtech?", "No. Managed security services can add monitoring and support alongside your existing IT team or help organizations without a dedicated security function."],
    ],
    ctaTitle: "Know Where Your Security Gaps Are",
    ctaText: "Start with a cybersecurity assessment of your current environment. Comtech will help you understand the risks and practical next steps before anything is proposed.",
  },
  {
    slug: "data-center",
    title: "Data Center & Cloud Solutions in Pakistan | Comtech Associates",
    description:
      "Data center and cloud solutions for Pakistani organizations, including data center design, migration, disaster recovery, hybrid cloud, and managed operations.",
    keyword: "data center and cloud solutions",
    heroTitle: "Data Center and Cloud, Designed to Work Together",
    heroText:
      "Comtech provides data center and cloud solutions in Pakistan, from infrastructure design and migration to disaster recovery and hybrid cloud connectivity. Plan a dependable foundation for the applications and services your organization relies on.",
    ctaLabel: "Request a Data Center Assessment",
    stats: [
      ["10+ Years", "IT Delivery Experience"],
      ["250+", "Projects Delivered"],
      ["4 Cities", "Nationwide"],
      ["End to End", "Design to Support"],
    ],
    capabilities: [
      [
        "Data Center Design and Infrastructure",
        "Plan compute, storage, switching, power, and resilience around current workloads, growth, and operational requirements.",
      ],
      [
        "Data Center Migration",
        "Assess dependencies, plan migration stages, and coordinate cutovers to move infrastructure with a clear view of risk and business impact.",
      ],
      [
        "Hybrid Cloud Connectivity",
        "Connect on-premises environments with AWS, Azure, and other cloud services to support hybrid workloads and consistent operations.",
      ],
      [
        "Disaster Recovery and Managed Operations",
        "Develop recovery plans and ongoing operational support to help keep critical systems available and recoverable.",
      ],
    ],
    steps: [
      ["01", "Discover", "Inventory workloads, dependencies, capacity, and recovery requirements."],
      ["02", "Architect", "Design the data center or cloud architecture around business priorities and growth."],
      ["03", "Migrate", "Sequence implementation and migration with clear validation and rollback planning."],
      ["04", "Operate", "Monitor, support, and optimize the environment after it goes live."],
    ],
    reasons: [
      { title: "Infrastructure That Fits", text: "Data center and cloud architecture is shaped around real workloads rather than default hardware or cloud assumptions." },
      { title: "Migration With a Plan", text: "Workload dependencies, cutover sequencing, and validation are considered before a migration begins." },
      { title: "Resilience From the Start", text: "Disaster recovery and continuity needs are part of the design conversation, not an afterthought." },
      { title: "Connected Expertise", text: "Networking, cybersecurity, and managed IT capabilities can be coordinated with your data center and cloud project." },
    ],
    faq: [
      ["What do data center and cloud solutions include?", "Engagements can include infrastructure design, data center migration, hybrid cloud connectivity, disaster recovery, and managed operations."],
      ["Can Comtech help migrate an existing data center?", "Yes. A migration starts with workload and dependency discovery, followed by a staged plan and validation approach."],
      ["Can on-premises systems connect to public cloud?", "Hybrid cloud connectivity can link on-premises infrastructure with cloud services such as AWS and Azure, based on your requirements."],
      ["Do you provide support after implementation?", "Ongoing monitoring and managed support can be included in the engagement and scoped to the environment."],
    ],
    ctaTitle: "Plan Your Next Data Center or Cloud Project",
    ctaText: "Tell Comtech about your workloads, migration plans, or recovery requirements. A technical assessment will establish a practical starting point.",
  },
  {
    slug: "managed-it",
    title: "Managed IT Services in Pakistan | Comtech Associates",
    description:
      "Managed IT services and IT support for Pakistani organizations, including helpdesk, infrastructure operations, IT staff augmentation, and asset lifecycle support.",
    keyword: "managed IT services",
    heroTitle: "Managed IT That Keeps Your Team Moving",
    heroText:
      "Comtech delivers managed IT services and IT support in Pakistan for organizations that need dependable day-to-day operations. Add helpdesk, infrastructure support, IT staff augmentation, or lifecycle services around the team you already have.",
    ctaLabel: "Request a Managed IT Assessment",
    stats: [
      ["10+ Years", "IT Delivery Experience"],
      ["250+", "Projects Delivered"],
      ["4 Cities", "Nationwide"],
      ["One Team", "Across the IT Stack"],
    ],
    capabilities: [
      [
        "Managed IT Support and Helpdesk",
        "Give employees a clear route to IT support, incident tracking, and issue resolution, with service scope matched to your organization.",
      ],
      [
        "Infrastructure Operations",
        "Ongoing support for networks, endpoints, servers, and cloud services helps keep core IT systems monitored and maintained.",
      ],
      [
        "IT Staff Augmentation",
        "Add qualified IT professionals to your existing team for defined roles, projects, or operational coverage.",
      ],
      [
        "Asset Lifecycle and After-Sales Support",
        "Coordinate IT asset deployment, maintenance, and support through a consistent partner rather than disconnected vendors.",
      ],
    ],
    steps: [
      ["01", "Understand", "Review your IT environment, support demand, team structure, and service expectations."],
      ["02", "Scope", "Define responsibilities, escalation paths, service coverage, and the right support model."],
      ["03", "Onboard", "Document systems and workflows, then transition support in a controlled way."],
      ["04", "Improve", "Review service activity and adjust coverage as your users and environment change."],
    ],
    reasons: [
      { title: "Support That Fits Your Team", text: "Extend an existing IT department or get operational coverage without building every role in-house." },
      { title: "A Clear Point of Accountability", text: "Managed support, infrastructure, and asset services can be coordinated through one accountable team." },
      { title: "People and Technology Together", text: "IT staff augmentation complements managed services when your organization needs additional hands or expertise." },
      { title: "Support Across Pakistan", text: "Comtech's presence in Karachi, Islamabad, Lahore, and Quetta supports organizations with multi-city operations." },
    ],
    faq: [
      ["What are managed IT services?", "Managed IT services provide ongoing support and operations for agreed parts of your technology environment, with scope based on your needs."],
      ["Can Comtech provide IT support for our employees?", "Helpdesk and user support can be included, with agreed escalation paths and coverage."],
      ["What is IT staff augmentation?", "IT staff augmentation adds qualified professionals to your team for defined roles or project requirements."],
      ["Can managed IT work alongside our internal team?", "Yes. The service model can extend your internal IT team, take responsibility for specific systems, or provide broader operational support."],
    ],
    ctaTitle: "Make IT Support More Predictable",
    ctaText: "Start with a review of your users, systems, and support needs. Comtech can help define a managed IT services model that fits your organization.",
  },
];

export function ServiceDetail({ service }: { service: ServicePageData }) {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        className="p-40! mt-14!"
        title={service.heroTitle}
        text={service.heroText}
        primary={service.ctaLabel}
        secondary="Explore our Services"
      />
      <Stats items={service.stats} />

      <div className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)" }}
      >
        <section className="wrap sec">
          <SecHead
            title={`What ${service.keyword} Covers`}
            sub={`Practical ${service.keyword} for organizations that need their technology to support day-to-day operations and long-term growth.`}
          />
          <div className="grid gap-5 md:grid-cols-2 min-[1101px]:grid-cols-4 min-[1101px]:gap-[2.4%]">
            {service.capabilities.map(([title, text]) => (
              <article key={title} className="card pad-outer bg-[#080808]! p-4!">
                <div className="card svc svc-dark gborder-new h-full bg-[#0f0826]! p-4! sm:p-8!">
                  <h3 className="h3 h3-lg text-[26px]! leading-[38px]! tracking-tighter!">{title}</h3>
                  <span className="bar mt-2! mb-2!" />
                  <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap sec">
          <SecHead title={`How We Deliver ${service.keyword}`} />
          <HowWeWork steps={service.steps} />
        </section>

        <section className="wrap sec">
          <SecHead title={`Why Organizations Choose Comtech for ${service.keyword}`} />
          <NumberedCards items={service.reasons} />
        </section>
      </div>

      <section className="wrap">
        <PinnedFaq
          className="mt-16!"
          items={service.faq}
          head={
            <>
              <h2 className="h2">Frequently<br />Asked Questions</h2>
              <p className="mt-5">Straight answers about {service.keyword} and how Comtech can help.</p>
              <Btn href="/contact">Talk to an IT Consultant</Btn>
            </>
          }
        />
      </section>

      <CtaPanel title={service.ctaTitle} text={service.ctaText} label={service.ctaLabel} />
    </main>
  );
}
