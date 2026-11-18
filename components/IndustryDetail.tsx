import { CtaPanel } from "@/components/CtaPanel";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { PageGlows } from "@/components/Glow";
import { PinnedFaq } from "@/components/PinnedFaq";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { NumberedCards } from "@/components/NumberedCards";

type IndustryPageData = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  heroTitle: string;
  heroText: string;
  ctaLabel: string;
  stats: [string, string][];
  priorities: [string, string][];
  steps: [string, string, string][];
  reasons: { title: string; text: string }[];
  faq: [string, string][];
  ctaTitle: string;
  ctaText: string;
};

export const industryPages: IndustryPageData[] = [
  {
    slug: "banking",
    title: "Banking IT Services & Cybersecurity | Comtech Associates",
    description:
      "Banking IT services, bank IT support, cybersecurity, and data center infrastructure designed for financial institutions in Pakistan.",
    keyword: "IT services for banking",
    heroTitle: "Banking IT Built for Always-On Operations",
    heroText:
      "Comtech delivers IT services for banking in Pakistan, including bank IT support, cybersecurity, and bank data center infrastructure. Plan resilient systems around uptime, security, and the requirements your financial institution must meet.",
    ctaLabel: "Request a Banking IT Assessment",
    stats: [["10+ Years", "IT Delivery Experience"], ["250+", "Projects Delivered"], ["24/7", "Operational Support"], ["4 Cities", "Nationwide"]],
    priorities: [
      ["Bank IT Support That Keeps Branches Connected", "Support for branch networks, users, and core IT infrastructure helps maintain consistent operations across locations."],
      ["Cybersecurity for Financial Services", "Layered security and monitoring help protect sensitive information and address evolving cyber risks."],
      ["Bank Data Center Infrastructure", "Design and support data center environments with resilience, capacity, and recovery requirements in view."],
    ],
    steps: [["01", "Assess", "Review branch connectivity, critical systems, security posture, and operational requirements."], ["02", "Design", "Map a practical architecture to availability, compliance, and growth priorities."], ["03", "Deploy", "Coordinate changes and rollout around banking operations and planned maintenance windows."], ["04", "Support", "Monitor and support the environment as systems, branches, and requirements change."]],
    reasons: [
      { title: "Uptime Comes First", text: "Plan network and infrastructure changes around the availability your branches and teams depend on." },
      { title: "Security and Compliance in View", text: "Align technology decisions to applicable requirements, including the SBP Cybersecurity Framework." },
      { title: "One Team Across the Stack", text: "Coordinate networking, cybersecurity, data center, and managed IT without separate vendors shifting responsibility." },
      { title: "Local, Multi-City Support", text: "Comtech supports organizations from Karachi, Islamabad, Lahore, and Quetta." },
    ],
    faq: [["What banking IT services does Comtech provide?", "Comtech supports banking networks, cybersecurity, data center infrastructure, managed IT, and branch operations based on the institution's environment."], ["Can Comtech provide bank IT support across multiple branches?", "Yes. The support model can be scoped for multi-branch environments and coordinated with local teams."], ["How does Comtech approach cybersecurity for banks?", "Start with an assessment of systems, controls, and relevant obligations, then prioritize security improvements and ongoing monitoring."], ["Can you support the SBP Cybersecurity Framework?", "Comtech can align cybersecurity work to Pakistan-specific requirements, including the SBP Cybersecurity Framework, as relevant to the engagement."]],
    ctaTitle: "Start With Your Banking Environment",
    ctaText: "Discuss your branch operations, infrastructure, and security priorities with Comtech. An assessment maps the environment before a solution is proposed.",
  },
  {
    slug: "healthcare",
    title: "Healthcare IT Services & Cybersecurity | Comtech Associates",
    description:
      "Healthcare IT services, healthcare cybersecurity, and always-on infrastructure to support hospitals, clinics, and healthcare organizations in Pakistan.",
    keyword: "healthcare IT services",
    heroTitle: "Healthcare IT That Keeps Critical Care Connected",
    heroText:
      "Comtech provides healthcare IT services for hospitals and healthcare organizations, including healthcare cybersecurity, reliable connectivity, and managed infrastructure. Keep clinical and administrative systems supported while protecting sensitive patient information.",
    ctaLabel: "Request a Healthcare IT Assessment",
    stats: [["10+ Years", "IT Delivery Experience"], ["250+", "Projects Delivered"], ["24/7", "Operational Support"], ["4 Cities", "Nationwide"]],
    priorities: [
      ["Connectivity Across Clinical Spaces", "Plan network coverage and capacity for wards, clinics, labs, administration, and the devices teams depend on."],
      ["Healthcare Cybersecurity", "Protect patient information and critical systems with security controls considered alongside healthcare operations."],
      ["Resilient Healthcare Infrastructure", "Support the network, data center, and recovery planning that help keep essential systems available."],
    ],
    steps: [["01", "Walk Through", "Map clinical areas, users, devices, systems, and current support challenges."], ["02", "Plan", "Prioritize coverage, security, resilience, and implementation around care operations."], ["03", "Implement", "Coordinate deployment and changes to reduce disruption to staff and services."], ["04", "Support", "Monitor and maintain the environment after go-live, with a clear route for support."]],
    reasons: [
      { title: "Care Environments in Mind", text: "Plan changes around clinical workflows and systems that staff need throughout the day." },
      { title: "Privacy and Security", text: "Healthcare cybersecurity considers patient data, access, and operational continuity together." },
      { title: "Network and Infrastructure Expertise", text: "Coordinate campus connectivity, data center, and managed IT requirements with one team." },
      { title: "Support Across Four Cities", text: "Comtech's local presence helps support healthcare organizations in Karachi, Islamabad, Lahore, and Quetta." },
    ],
    faq: [["What healthcare IT services does Comtech offer?", "Healthcare IT services can include connectivity, cybersecurity, infrastructure, managed IT, and ongoing technical support."], ["How does Comtech approach healthcare cybersecurity?", "Begin by understanding systems, users, and data flows, then identify practical controls for protecting sensitive information and keeping services available."], ["Can Comtech support hospitals with multiple locations?", "Yes. Network and support coverage can be planned for hospitals or healthcare organizations operating across multiple sites."], ["Do you provide support after deployment?", "Ongoing monitoring and managed support can be included and scoped to your healthcare environment."]],
    ctaTitle: "Build a More Reliable Healthcare IT Environment",
    ctaText: "Start with a review of your clinical spaces, systems, and support needs. Comtech can help identify practical next steps for healthcare IT.",
  },
  {
    slug: "government",
    title: "Government IT Services & Infrastructure | Comtech Associates",
    description:
      "IT services for government and public sector organizations, including managed IT services for government, cybersecurity, and standards-aligned IT infrastructure.",
    keyword: "IT services for government",
    heroTitle: "Government IT Built for Scale and Accountability",
    heroText:
      "Comtech delivers IT services for government and public sector organizations in Pakistan. From managed IT services for government to cybersecurity and standards-aligned government IT infrastructure, plan dependable systems with clear support and accountability.",
    ctaLabel: "Request a Government IT Assessment",
    stats: [["10+ Years", "IT Delivery Experience"], ["250+", "Projects Delivered"], ["24/7", "Operational Support"], ["4 Cities", "Nationwide"]],
    priorities: [
      ["Government IT Infrastructure", "Plan connected, maintainable infrastructure for departments, facilities, and public-facing services."],
      ["Managed IT Services for Government", "Ongoing operations and user support can be scoped to department responsibilities and service requirements."],
      ["Secure Public Sector Systems", "Apply security controls and access practices to protect information and support reliable public services."],
    ],
    steps: [["01", "Understand", "Review departments, facilities, users, current systems, and service obligations."], ["02", "Plan", "Create an implementation plan around security, standards, accountability, and available resources."], ["03", "Deliver", "Coordinate deployment and documentation with operational stakeholders."], ["04", "Support", "Provide ongoing support and review as departments and public services evolve."]],
    reasons: [
      { title: "Designed for Public Accountability", text: "Keep scope, responsibilities, and support expectations clear throughout the engagement." },
      { title: "Standards-Aligned Infrastructure", text: "Plan government IT infrastructure around applicable standards, operational needs, and security." },
      { title: "One Coordinated IT Partner", text: "Bring network, security, data center, and managed IT work together under one accountable team." },
      { title: "Nationwide Presence", text: "Comtech's offices in Karachi, Islamabad, Lahore, and Quetta support public sector teams across Pakistan." },
    ],
    faq: [["What IT services does Comtech provide to government?", "Services can include infrastructure, networking, cybersecurity, managed IT, and ongoing support, scoped to the department's requirements."], ["Can Comtech provide managed IT services for government?", "Yes. Managed IT scope can cover agreed systems, support responsibilities, and escalation paths."], ["How is government IT infrastructure planned?", "Planning begins with facilities, systems, service requirements, security, and applicable standards before implementation is defined."], ["Can you support public sector organizations in multiple cities?", "Comtech's presence across four Pakistani cities supports multi-site planning and local engagement."]],
    ctaTitle: "Plan Your Public Sector IT Requirements",
    ctaText: "Tell Comtech about your department's systems, facilities, and service priorities. An assessment creates a clear basis for next steps.",
  },
  {
    slug: "telecom",
    title: "Telecom IT Services & Network Infrastructure | Comtech Associates",
    description:
      "Telecom IT services and infrastructure for operators in Pakistan, including carrier-grade networking, backbone connectivity, and 24/7 support.",
    keyword: "telecom IT services",
    heroTitle: "Telecom Infrastructure for Continuous Connectivity",
    heroText:
      "Comtech provides telecom IT services and infrastructure services for operators that need reliable connectivity. Coordinate carrier-grade networking, backbone infrastructure, and ongoing support around network continuity and growth.",
    ctaLabel: "Request a Telecom Infrastructure Assessment",
    stats: [["10+ Years", "IT Delivery Experience"], ["250+", "Projects Delivered"], ["24/7", "Operational Support"], ["4 Cities", "Nationwide"]],
    priorities: [
      ["Carrier-Grade Networking", "Plan routing, switching, and network capacity around service availability and operational requirements."],
      ["Backbone and Site Connectivity", "Connect sites and infrastructure with a clear view of bandwidth, resilience, and future expansion."],
      ["Monitoring and Ongoing Support", "Support network operations with monitoring, incident coordination, and planned maintenance."],
    ],
    steps: [["01", "Map", "Review sites, network topology, traffic, critical links, and operational constraints."], ["02", "Engineer", "Design capacity and resilience around current services and planned network growth."], ["03", "Deploy", "Coordinate implementation and testing to minimize service disruption."], ["04", "Operate", "Monitor performance and support ongoing network operations and improvement."]],
    reasons: [
      { title: "Continuity at Network Scale", text: "Plan infrastructure with availability, failure scenarios, and maintenance windows in mind." },
      { title: "Capacity for Growth", text: "Assess traffic and expansion requirements before links or core systems reach their limits." },
      { title: "Connected Technical Practices", text: "Coordinate network infrastructure with cybersecurity, data center, and managed IT." },
      { title: "Local Engineering Support", text: "Comtech's four-city presence supports operators and service teams across Pakistan." },
    ],
    faq: [["What telecom IT services does Comtech provide?", "Comtech supports telecom networking, infrastructure, connectivity, security, and managed operations, based on project scope."], ["Can you support carrier-grade networking?", "Network design and deployment can be scoped to operator requirements, topology, capacity, and availability targets."], ["Do you support backbone connectivity projects?", "Backbone and site connectivity requirements can be assessed and planned around resilience and traffic needs."], ["Is ongoing telecom network support available?", "Monitoring and support can be included for agreed network components and operational responsibilities."]],
    ctaTitle: "Strengthen Your Telecom Network Infrastructure",
    ctaText: "Review your network topology, critical links, and growth plans with Comtech before defining an implementation path.",
  },
  {
    slug: "enterprise",
    title: "Enterprise IT Services & Cybersecurity | Comtech Associates",
    description:
      "Enterprise IT services, enterprise IT support, cybersecurity solutions, and data center infrastructure for large organizations in Pakistan.",
    keyword: "enterprise IT services",
    heroTitle: "Enterprise IT for Complex, Multi-Team Environments",
    heroText:
      "Comtech delivers enterprise IT services for large, multi-department organizations in Pakistan. Coordinate enterprise IT support, cybersecurity solutions, and data center infrastructure with networking and managed IT from one accountable team.",
    ctaLabel: "Request an Enterprise IT Assessment",
    stats: [["10+ Years", "IT Delivery Experience"], ["250+", "Projects Delivered"], ["24/7", "Operational Support"], ["4 Cities", "Nationwide"]],
    priorities: [
      ["Enterprise IT Support", "Coordinate user support, infrastructure operations, and service responsibilities across teams and locations."],
      ["Cybersecurity Solutions for Enterprise", "Address security posture, access, monitoring, and compliance across a complex technology environment."],
      ["Data Center Infrastructure", "Plan data center and cloud environments around application dependencies, resilience, and growth."],
    ],
    steps: [["01", "Discover", "Map departments, locations, applications, infrastructure, and existing support responsibilities."], ["02", "Align", "Prioritize architecture, security, service coverage, and implementation sequence."], ["03", "Integrate", "Coordinate deployment across systems and teams with clear ownership and validation."], ["04", "Optimize", "Review operations and adjust enterprise IT support as business requirements evolve."]],
    reasons: [
      { title: "One Standard Across Departments", text: "Connect infrastructure and support practices across teams while accounting for their different needs." },
      { title: "Security Across the Environment", text: "Enterprise cybersecurity solutions consider users, networks, infrastructure, and cloud services together." },
      { title: "End-to-End IT Capabilities", text: "Networking, data center, cybersecurity, and managed IT can be coordinated by one team." },
      { title: "Support for Multi-Site Operations", text: "Comtech's presence in four cities supports organizations with distributed teams and facilities." },
    ],
    faq: [["What enterprise IT services does Comtech provide?", "Services can include enterprise IT support, networking, cybersecurity, data center and cloud infrastructure, and managed operations."], ["Can you support large organizations across multiple locations?", "Yes. The service and deployment model can be planned around multiple sites, teams, and operational requirements."], ["Do you provide enterprise cybersecurity solutions?", "Comtech can assess an organization's security environment and plan controls and managed services based on its risks and requirements."], ["Can enterprise IT support complement an internal team?", "Yes. Support can extend internal IT capabilities or cover specifically agreed systems and responsibilities."]],
    ctaTitle: "Bring Your Enterprise IT Priorities Into Focus",
    ctaText: "Start with a review of your teams, locations, systems, and support model. Comtech can help define where enterprise IT services will make the greatest difference.",
  },
];

export function IndustryDetail({ industry }: { industry: IndustryPageData }) {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={industry.heroTitle}
        text={industry.heroText}
        primary={industry.ctaLabel}
        secondary="Explore our Services"
      />
      <Stats items={industry.stats} />

      <div className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)" }}
      >
        <section className="wrap sec">
          <SecHead
            title={`What Keeps ${industry.keyword} Running`}
            sub={`Technology priorities for ${industry.keyword} shaped around the way your teams and services actually operate.`}
          />
          <div className="grid gap-5 min-[1101px]:grid-cols-3 min-[1101px]:gap-[2.4%]">
            {industry.priorities.map(([title, text]) => (
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
          <SecHead title={`How We Support ${industry.keyword}`} />
          <HowWeWork steps={industry.steps} />
        </section>

        <section className="wrap sec">
          <SecHead title={`Why ${industry.keyword} Teams Choose Comtech`} />
          <NumberedCards items={industry.reasons} />
        </section>
      </div>

      <section className="wrap">
        <PinnedFaq
          className="mt-16!"
          items={industry.faq}
          head={
            <>
              <h2 className="h2">{industry.keyword}<br />Straight Answers</h2>
              <p className="mt-5">Answers to common questions about IT services for {industry.keyword}.</p>
            </>
          }
        />
      </section>

      <CtaPanel title={industry.ctaTitle} text={industry.ctaText} label={industry.ctaLabel} />
    </main>
  );
}
