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
    title: "Managed Cyber Security Services in Pakistan | Comtech",
    description:
      "Stop chasing breaches after they happen. Comtech's 24/7 managed cyber security services protect your network, data, and reputation before an attacker gets the chance.",
    keyword: "managed cybersecurity",
    heroTitle: "Your Business Is a Target. Let's Make Sure You're Ready.",
    heroText:
      "Cyberattacks in Pakistan don't wait for a convenient moment, and neither should your defense. As one of Pakistan's established cybersecurity companies, trusted by banks, telecoms, and healthcare providers, Comtech delivers managed cybersecurity services backed by certified Cisco and Fortinet partnerships.",
    ctaLabel: "Explore Our Security Services",
    stats: [
      ["24/7", "Security Operations"],
      ["10+ Years", "In Operation"],
      ["250+", "Projects Delivered"],
      ["4 Cities", "Nationwide"],
    ],
    capabilities: [
      ["Endpoint Security", "Lock down every laptop, server, and mobile device, so one compromised endpoint never becomes a company-wide breach."],
      ["Cloud Security", "Continuous configuration checks across AWS, Azure, and GCP catch misconfigurations before they become open doors."],
      ["VAPT", "Our cybersecurity assessment services are scoped to your actual environment and aligned to ISO 27001, PCI DSS, and HIPAA standards."],
      ["Incident Response & Digital Forensics", "Containment, root-cause investigation, and forensic evidence handling support regulatory or legal follow-up."],
      ["Identity & Access Management", "Single sign-on and multi-factor authentication ensure only the right people access your systems."],
      ["Threat Intelligence", "Track what is targeting your industry so defenses evolve ahead of attackers."],
      ["Compliance & Governance", "Cybersecurity advisory and consulting aligned to ISO 27001, PCI DSS, HIPAA, GDPR, PECA 2024/25, and the SBP Cybersecurity Framework."],
    ],
    steps: [
      ["01", "We Assess", "A baseline audit of your security posture and compliance gaps grounds every recommendation in your actual environment."],
      ["02", "We Design", "Security architecture mapped to real regulatory requirements, from the SBP framework to HIPAA."],
      ["03", "We Deploy", "Implementation across network, endpoint, identity, and cloud layers without disrupting operations."],
      ["04", "We Manage", "Ongoing SOC monitoring, testing, and incident response readiness keep the program working after rollout."],
    ],
    reasons: [
      { title: "Dual-Certified Expertise", text: "A certified Cisco partnership combined with Fortinet certification, not a generalist reseller bolting security onto hardware." },
      { title: "24/7 Coverage, Four Cities", text: "SOC coverage backed by physical offices across Pakistan, not one remote help desk." },
      { title: "Compliance Built for Your Sector", text: "Cybersecurity services built around the frameworks your regulators enforce." },
      { title: "A Decade of Proven Delivery", text: "Ten years and 250+ projects across networking, data center, and security." },
    ],
    faq: [
      ["Why can't my internal IT team just handle security?", "They can handle it alongside everything else on their plate, but managed security provides dedicated attention and continuous coverage."],
      ["What do cyber security companies in Pakistan do day to day?", "A SOC monitors continuously, teams test systems for weaknesses, respond to incidents, and keep controls aligned with regulatory requirements."],
      ["What does a penetration test cost in Pakistan?", "Scope, environment size, and whether testing is network, application, or full-stack determine the cost. Comtech scopes engagements individually after assessment."],
      ["Do I actually need ISO 27001 certification?", "It is not legally required for every sector, but enterprise clients and regulators increasingly expect it, particularly in banking and healthcare."],
      ["Does Comtech provide cyber security services outside Karachi?", "Yes. Comtech operates from Karachi, Islamabad, Lahore, and Quetta."],
    ],
    ctaTitle: "Let's Find Your Security Gaps Before Someone Else Does",
    ctaText: "Most security gaps stay invisible until someone goes looking for them. A conversation with our security team is the fastest way to find yours.",
  },
  {
    slug: "data-center",
    title: "Data Center Solutions in Pakistan | Comtech Associates",
    description:
      "Data center migrations don't fail on hardware, they fail on planning. Comtech designs, migrates, and manages data center infrastructure Pakistani enterprises can't afford to get wrong.",
    keyword: "data center and cloud solutions",
    heroTitle: "Your Data Center Shouldn't Be Your Biggest Risk.",
    heroText:
      "Comtech designs, migrates, and manages data center infrastructure end-to-end. We're the data center solution provider enterprises call before a failure hits, not after. Built on Cisco and HPE, we're integrators, not a colocation facility.",
    ctaLabel: "Request a Data Center Assessment",
    stats: [
      ["10+ Years", "IT Delivery Experience"],
      ["250+", "Projects Delivered"],
      ["4 Cities", "Nationwide"],
      ["End to End", "Design to Support"],
    ],
    capabilities: [
      ["Design & Architecture", "Infrastructure planning aligned to Tier II to IV standards, sized for today's load and growth without costly redesign."],
      ["Migration Services", "Structured migration from legacy infrastructure to new facilities or hybrid cloud, including Azure data center migration support."],
      ["Disaster Recovery", "Recovery architecture and failover planning keep an outage from becoming a business-continuity crisis."],
      ["Hybrid & Multi-Cloud Connectivity", "Connect on-premises infrastructure to AWS, Azure, and GCP, including Kubernetes environments."],
      ["24/7 Network Operations Center", "Continuous monitoring of data center health, capacity, and performance."],
      ["Physical Security & Power Management", "Biometric access, intrusion detection, and power management protect the physical layer."],
    ],
    steps: [
      ["01", "We Assess", "A current infrastructure audit and capacity and compliance review establish the starting point."],
      ["02", "We Design", "Architecture aligned to Tier II to IV standards and your growth plan, not a generic reference design."],
      ["03", "We Migrate", "Structured migration or build-out proceeds within an agreed downtime window."],
      ["04", "We Manage", "24/7 NOC monitoring and capacity planning keep the environment ahead of demand."],
    ],
    reasons: [
      { title: "Design Built for Your Tier", text: "Tier II to IV aligned design and migration experience, not a template applied everywhere." },
      { title: "Always-On Monitoring", text: "24/7 NOC operations backed by a physical presence in four Pakistani cities." },
      { title: "Multi-Cloud, Not Locked In", text: "Hybrid and multi-cloud expertise across AWS, Azure, and GCP." },
      { title: "Cutover Planned to Minimize Risk", text: "Migration planning built around minimizing downtime at the most risky stage." },
    ],
    faq: [
      ["What is a data center, exactly?", "The physical and virtual infrastructure, servers, storage, networking, and power systems, that houses systems a business depends on."],
      ["Does Comtech operate its own data center facility?", "No. Comtech designs, builds, migrates, and manages infrastructure in your own facility or a hosted or cloud environment."],
      ["What's the difference between data center migration and cloud migration?", "Data center migration moves physical infrastructure or workloads between facilities. Cloud migration moves workloads into a hosted cloud environment."],
      ["What Tier level does my business need?", "It depends on uptime and risk tolerance. Tier II suits standard enterprise needs, while Tier III to IV suits severe financial or regulatory risk."],
      ["Do I need disaster recovery with cloud infrastructure?", "Yes. Cloud reduces certain risks but doesn't replace a recovery and failover plan specific to your workloads."],
    ],
    ctaTitle: "Plan Your Next Data Center or Cloud Project",
    ctaText: "Tell Comtech about your workloads, migration plans, or recovery requirements. A technical assessment will establish a practical starting point.",
  },
  {
    slug: "managed-it",
    title: "IT Services & Managed IT in Pakistan | Comtech Associates",
    description:
      "Staffing agency for engineers. Reseller for hardware. Break-fix vendor for desktop support. Most businesses juggle three vendors who don't talk to each other. Comtech is one accountable team for all of it.",
    keyword: "IT services and managed IT",
    heroTitle: "One Team. Every IT Need Covered.",
    heroText:
      "Comtech delivers IT staff augmentation, asset management, desktop support, and after-sales care as one accountable practice, not four disconnected vendors.",
    ctaLabel: "Request an IT Operations Assessment",
    stats: [
      ["10+ Years", "IT Delivery Experience"],
      ["250+", "Projects Delivered"],
      ["4 Cities", "Nationwide"],
      ["One Team", "Across the IT Stack"],
    ],
    capabilities: [
      ["IT Staff Augmentation", "Hire Cisco-certified engineers, AWS or Azure cloud engineers, DevOps engineers, and cybersecurity analysts sourced and vetted by Comtech."],
      ["Dedicated Development Team", "A team scoped to start and end with a specific project."],
      ["Offshore or Remote Extended Team", "Ongoing capacity without the overhead of direct hiring."],
      ["Managed IT Operations", "Year-round coverage, including helpdesk, desktops, infrastructure, and maintenance."],
      ["Asset Lifecycle Management", "Procurement tracking, inventory management, license management, secure destruction, and asset disposition."],
      ["Desktop and After-Sales Support", "Fast troubleshooting, maintenance across sites, extended warranty, and ongoing system optimization."],
    ],
    steps: [
      ["01", "We Assess", "Review current IT operations, staffing, and asset inventory before proposing anything."],
      ["02", "We Design", "A resourcing, development, or asset-management plan matched to your actual gaps."],
      ["03", "We Deploy", "Staff placement or asset rollout coordinated to minimize disruption."],
      ["04", "We Manage", "Ongoing support, maintenance, and lifecycle tracking after handover."],
    ],
    reasons: [
      { title: "One Accountable Partner", text: "One partner for staffing, hardware, and support instead of separate vendors pointing fingers." },
      { title: "Certified, Vetted Engineers", text: "Engineers across Cisco, AWS, Azure, and DevOps disciplines, sourced and vetted directly." },
      { title: "Asset Lifecycle Experience", text: "Ten years of lifecycle experience reduces cost and compliance risk." },
      { title: "Single Point of Accountability", text: "Nothing falls into the gap between staffing, assets, and support." },
    ],
    faq: [
      ["What's the difference between IT staff augmentation and outsourcing?", "Staff augmentation places engineers on your team under your direction. Outsourcing hands over a function for Comtech to run independently."],
      ["Do you offer offshore or remote developers, or only on-site staff?", "Both. Engineers can be on-site, fully remote, or blended based on role and operating needs."],
      ["How does IT asset lifecycle management reduce costs?", "Hardware is tracked from procurement through disposal to avoid over-purchasing, identify underused assets, and handle disposition securely."],
      ["What's included in after-sales support?", "Ongoing maintenance, extended warranty coverage, and system optimization after implementation."],
    ],
    ctaTitle: "Make IT Support More Predictable",
    ctaText: "Start with a review of your users, systems, and support needs. Comtech can help define a managed IT services model that fits your organization.",
  },
  {
    slug: "custom-software",
    title: "Custom Software Development Services in Pakistan | Comtech",
    description:
      "Custom software development for Pakistani enterprises, from application development to legacy modernization, built and supported by the team that also manages your infrastructure.",
    keyword: "custom software development",
    heroTitle: "Software That's Actually Yours, Not a Black Box Someone Else Controls",
    heroText:
      "Most software companies deploy your application and disappear, leaving you to find someone else to host and maintain it. Comtech is different: the team that builds your software also manages the infrastructure it runs on.",
    ctaLabel: "Get A Professional Consult Today!",
    stats: [
      ["10+", "Years in Operation"],
      ["250+", "Projects Delivered"],
      ["4", "Cities Nationwide"],
      ["15", "Technology Partners"],
    ],
    capabilities: [
      ["Custom Enterprise Application Development", "Greenfield builds and extensions of platforms you already run, shaped around how your team operates."],
      ["Legacy System Modernization", "Replace unsupported software in stages instead of forcing a risky rip-and-replace."],
      ["API Development & Integrations", "Connect CRM, ERP, and internal tools instead of forcing a system switch."],
      ["Internal Tools & Workflow Automation", "Purpose-built dashboards and automation that replace spreadsheet-and-email processes."],
      ["Ongoing Maintenance & Support", "Updates and fixes from the team that built the software and manages its infrastructure."],
    ],
    steps: [
      ["01", "We Assess", "Understand the actual problem and review current systems and workflows before writing code."],
      ["02", "We Design", "Map architecture and scope to your requirements and existing environment."],
      ["03", "We Develop", "Build in visible stages so you can react throughout delivery, not receive a black box at the end."],
      ["04", "We Manage", "Post-launch maintenance and updates from the team that built and hosts the software."],
    ],
    reasons: [
      { title: "One Team, Software and Infrastructure", text: "The team that builds the software also manages the infrastructure it runs on." },
      { title: "Built by People Who Know Your Environment", text: "Ten years and 250+ projects across networking, data center, and security inform each build." },
      { title: "Visible Progress", text: "Development proceeds in stages you can see and react to." },
      { title: "Support That Doesn't Start Over", text: "Ongoing support comes from the same team that built the system." },
    ],
    faq: [
      ["How much does custom software development cost in Pakistan?", "It depends on scope. We scope every project individually after understanding your requirements."],
      ["How is this different from hiring a software development agency?", "Comtech also manages the infrastructure, security, and support around what we build."],
      ["Can you modernize an existing system instead of building from scratch?", "Yes. Legacy modernization replaces outdated software in stages."],
      ["Do you offer ongoing maintenance after delivery?", "Yes. Maintenance and support are part of how we deliver software."],
      ["Can Comtech integrate with our existing CRM or ERP?", "Yes. API development and third-party integrations are core parts of what we build."],
    ],
    ctaTitle: "Have an Idea That Off-the-Shelf Software Can't Handle?",
    ctaText: "Tell us what you're trying to solve, and we'll tell you honestly whether custom software is the right answer.",
  },
  {
    slug: "resourcing",
    title: "IT Resourcing & Staff Augmentation in Pakistan | Comtech",
    description:
      "Vetted Cisco, cloud, DevOps, and cybersecurity engineers for Pakistani businesses, available on-site or remotely as staff augmentation or a dedicated team.",
    keyword: "IT resourcing and staff augmentation",
    heroTitle: "Scale Your Team Without the Six-Month Hiring Process",
    heroText:
      "Comtech places vetted engineers onto your team on your timeline, backed by the managed IT and infrastructure practice that supports the same team.",
    ctaLabel: "Request an IT Resourcing Assessment",
    stats: [
      ["Cisco", "Certified Engineers"],
      ["AWS & Azure", "Cloud Engineers"],
      ["DevOps", "Specialists"],
      ["On-site or Remote", "Engagement Models"],
    ],
    capabilities: [
      ["Cisco-Certified Engineers", "Vetted networking and infrastructure specialists for defined roles or projects."],
      ["Cloud Engineers", "AWS and Azure engineers for implementation, migration, and ongoing operations."],
      ["DevOps Engineers", "Engineering capacity for automation, deployment, and infrastructure workflows."],
      ["Cybersecurity Analysts", "Security professionals for monitoring, assessment, and response coverage."],
      ["Dedicated Development Teams", "A team scoped to start and end with a specific project."],
      ["Offshore or Remote Extended Teams", "Fully remote or blended capacity without direct-hiring overhead."],
    ],
    steps: [
      ["01", "We Assess", "Review staffing gaps, responsibilities, and project timelines."],
      ["02", "We Source", "Match certified and vetted engineers to the required role."],
      ["03", "We Onboard", "Place staff on-site or remotely and align working practices."],
      ["04", "We Support", "Maintain oversight and replace or scale capacity as requirements change."],
    ],
    reasons: [
      { title: "Certified, Vetted Engineers", text: "Directly sourced engineers across Cisco, AWS, Azure, DevOps, and cybersecurity." },
      { title: "Flexible Engagement", text: "On-site, remote, dedicated-team, or blended staffing models." },
      { title: "Backed by Managed IT", text: "Resource placements are supported by Comtech's broader infrastructure practice." },
      { title: "No Six-Month Hiring Delay", text: "Move quickly for defined projects or operational capacity." },
    ],
    faq: [
      ["What is IT staff augmentation?", "Comtech engineers join your team under your direction for defined roles or project periods."],
      ["Do you offer offshore or remote engineers?", "Yes. We offer on-site, remote, and blended engagement models."],
      ["Which engineering disciplines can you provide?", "Cisco networking, AWS and Azure cloud, DevOps, cybersecurity, and software development roles."],
      ["How does staff augmentation differ from outsourcing?", "Augmentation adds people to your team; outsourcing hands a function to Comtech to run."],
    ],
    ctaTitle: "Need Certified IT Staff?",
    ctaText: "Whether you need one engineer or a dedicated team, we scope the engagement around what you actually need.",
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
