import Link from "next/link";
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
  capabilities: [string, string, string[]?][];
  steps: [string, string, string][];
  reasons: { title: string; text: string }[];
  faq: [string, string][];
  ctaTitle: string;
  ctaText: string;
  capabilitiesTitle?: string;
  capabilitiesIntro?: string;
  stepsTitle?: string;
  reasonsTitle?: string;
  midCtaLabel?: string;
  finalCtaLabel?: string;
  partnerSection?: { title: string; paragraphs: string[] };
  industries?: string[];
  relatedServices?: {
    title: string;
    text: string;
    href: string;
    linkLabel: string;
  }[];
};

const baseServicePages: ServicePageData[] = [
  {
    slug: "cyber-security",
    title: "Managed Cyber Security Services in Pakistan",
    description:
      "Managed cybersecurity in Pakistan: 24/7 monitoring, VAPT, firewalls and incident response that protect your network, data and reputation.",
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
      [
        "Endpoint Security",
        "Lock down every laptop, server, and mobile device, so one compromised endpoint never becomes a company-wide breach.",
      ],
      [
        "Cloud Security",
        "Continuous configuration checks across AWS, Azure, and GCP catch misconfigurations before they become open doors.",
      ],
      [
        "VAPT",
        "Our cybersecurity assessment services are scoped to your actual environment and aligned to ISO 27001, PCI DSS, and HIPAA standards.",
      ],
      [
        "Incident Response & Digital Forensics",
        "Containment, root-cause investigation, and forensic evidence handling support regulatory or legal follow-up.",
      ],
      [
        "Identity & Access Management",
        "Single sign-on and multi-factor authentication ensure only the right people access your systems.",
      ],
      [
        "Threat Intelligence",
        "Track what is targeting your industry so defenses evolve ahead of attackers.",
      ],
      [
        "Compliance & Governance",
        "Cybersecurity advisory and consulting aligned to ISO 27001, PCI DSS, HIPAA, GDPR, PECA 2024/25, and the SBP Cybersecurity Framework.",
      ],
    ],
    steps: [
      [
        "01",
        "We Assess",
        "A baseline audit of your security posture and compliance gaps grounds every recommendation in your actual environment.",
      ],
      [
        "02",
        "We Design",
        "Security architecture mapped to real regulatory requirements, from the SBP framework to HIPAA.",
      ],
      [
        "03",
        "We Deploy",
        "Implementation across network, endpoint, identity, and cloud layers without disrupting operations.",
      ],
      [
        "04",
        "We Manage",
        "Ongoing SOC monitoring, testing, and incident response readiness keep the program working after rollout.",
      ],
    ],
    reasons: [
      {
        title: "Dual-Certified Expertise",
        text: "A certified Cisco partnership combined with Fortinet certification, not a generalist reseller bolting security onto hardware.",
      },
      {
        title: "24/7 Coverage, Four Cities",
        text: "SOC coverage backed by physical offices across Pakistan, not one remote help desk.",
      },
      {
        title: "Compliance Built for Your Sector",
        text: "Cybersecurity services built around the frameworks your regulators enforce.",
      },
      {
        title: "A Decade of Proven Delivery",
        text: "Ten years and 250+ projects across networking, data center, and security.",
      },
    ],
    faq: [
      [
        "Why can't my internal IT team just handle security?",
        "They can handle it alongside everything else on their plate, but managed security provides dedicated attention and continuous coverage.",
      ],
      [
        "What do cyber security companies in Pakistan do day to day?",
        "A SOC monitors continuously, teams test systems for weaknesses, respond to incidents, and keep controls aligned with regulatory requirements.",
      ],
      [
        "What does a penetration test cost in Pakistan?",
        "Scope, environment size, and whether testing is network, application, or full-stack determine the cost. Comtech scopes engagements individually after assessment.",
      ],
      [
        "Do I actually need ISO 27001 certification?",
        "It is not legally required for every sector, but enterprise clients and regulators increasingly expect it, particularly in banking and healthcare.",
      ],
      [
        "Does Comtech provide cyber security services outside Karachi?",
        "Yes. Comtech operates from Karachi, Islamabad, Lahore, and Quetta.",
      ],
    ],
    ctaTitle: "Let's Find Your Security Gaps Before Someone Else Does",
    ctaText:
      "Most security gaps stay invisible until someone goes looking for them. A conversation with our security team is the fastest way to find yours.",
  },
  {
    slug: "data-center",
    title: "Data Center Solutions in Pakistan",
    description:
      "Data center design, migration and management in Pakistan – planned, built and supported by engineers who keep enterprise workloads online.",
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
      [
        "Design & Architecture",
        "Infrastructure planning aligned to Tier II to IV standards, sized for today's load and growth without costly redesign.",
      ],
      [
        "Migration Services",
        "Structured migration from legacy infrastructure to new facilities or hybrid cloud, including Azure data center migration support.",
      ],
      [
        "Disaster Recovery",
        "Recovery architecture and failover planning keep an outage from becoming a business-continuity crisis.",
      ],
      [
        "Hybrid & Multi-Cloud Connectivity",
        "Connect on-premises infrastructure to AWS, Azure, and GCP, including Kubernetes environments.",
      ],
      [
        "24/7 Network Operations Center",
        "Continuous monitoring of data center health, capacity, and performance.",
      ],
      [
        "Physical Security & Power Management",
        "Biometric access, intrusion detection, and power management protect the physical layer.",
      ],
    ],
    steps: [
      [
        "01",
        "We Assess",
        "A current infrastructure audit and capacity and compliance review establish the starting point.",
      ],
      [
        "02",
        "We Design",
        "Architecture aligned to Tier II to IV standards and your growth plan, not a generic reference design.",
      ],
      [
        "03",
        "We Migrate",
        "Structured migration or build-out proceeds within an agreed downtime window.",
      ],
      [
        "04",
        "We Manage",
        "24/7 NOC monitoring and capacity planning keep the environment ahead of demand.",
      ],
    ],
    reasons: [
      {
        title: "Design Built for Your Tier",
        text: "Tier II to IV aligned design and migration experience, not a template applied everywhere.",
      },
      {
        title: "Always-On Monitoring",
        text: "24/7 NOC operations backed by a physical presence in four Pakistani cities.",
      },
      {
        title: "Multi-Cloud, Not Locked In",
        text: "Hybrid and multi-cloud expertise across AWS, Azure, and GCP.",
      },
      {
        title: "Cutover Planned to Minimize Risk",
        text: "Migration planning built around minimizing downtime at the most risky stage.",
      },
    ],
    faq: [
      [
        "What is a data center, exactly?",
        "The physical and virtual infrastructure, servers, storage, networking, and power systems, that houses systems a business depends on.",
      ],
      [
        "Does Comtech operate its own data center facility?",
        "No. Comtech designs, builds, migrates, and manages infrastructure in your own facility or a hosted or cloud environment.",
      ],
      [
        "What's the difference between data center migration and cloud migration?",
        "Data center migration moves physical infrastructure or workloads between facilities. Cloud migration moves workloads into a hosted cloud environment.",
      ],
      [
        "What Tier level does my business need?",
        "It depends on uptime and risk tolerance. Tier II suits standard enterprise needs, while Tier III to IV suits severe financial or regulatory risk.",
      ],
      [
        "Do I need disaster recovery with cloud infrastructure?",
        "Yes. Cloud reduces certain risks but doesn't replace a recovery and failover plan specific to your workloads.",
      ],
    ],
    ctaTitle: "Plan Your Next Data Center or Cloud Project",
    ctaText:
      "Tell Comtech about your workloads, migration plans, or recovery requirements. A technical assessment will establish a practical starting point.",
  },
  {
    slug: "managed-it-services",
    title: "Managed IT Services in Pakistan",
    description:
      "Managed IT services in Pakistan: helpdesk, infrastructure management and on-site support from one accountable team instead of three vendors.",
    keyword: "IT services and managed IT",
    heroTitle: "One Team. Every IT Need Covered.",
    heroText:
      "Comtech delivers IT staff augmentation, asset management, desktop support, and after-sales care as one accountable practice, not four disconnected vendors. We're one of Pakistan's leading IT companies, giving businesses enterprise IT solutions without the overhead of managing it themselves.",
    ctaLabel: "Request an IT Operations Assessment",
    stats: [],
    capabilitiesTitle: "IT Services & Managed IT Solutions",
    capabilitiesIntro:
      "Comtech brings staffing, asset management, desktop support, and after-sales care together as one accountable IT operations practice.",
    stepsTitle: "How We Get You Supported",
    reasonsTitle: "Why Businesses Trust Comtech With Their IT Operations",
    capabilities: [
      [
        "Scale Your Team Without the Six-Month Hiring Process",
        "Staff augmentation is one part of how we support your IT operations, alongside asset lifecycle management, desktop support, and after-sales care. When you need people rather than a project handed off, our service places vetted Comtech engineers onto your team on your timeline, without direct-hiring overhead.",
        [
          "Hire Cisco-certified engineers, cloud engineers across AWS and Azure, DevOps engineers, or cybersecurity analysts, sourced and vetted by Comtech directly.",
          "A dedicated development team built for a single project, scoped to start and end with the work.",
          "An offshore IT team or fully remote extended team for ongoing capacity, without the overhead of direct hiring.",
          "A full managed IT team for year-round coverage, not just a short-term placement.",
        ],
      ],
      [
        "Hardware That Doesn't Quietly Drain Your Budget",
        "Untracked IT hardware is one of the most common, and most avoidable, sources of wasted spend and compliance risk in a growing business. Our IT asset management practice covers the full lifecycle, so equipment doesn't disappear into a closet nobody's responsible for.",
        [
          "Procurement and deployment tracking from the moment hardware enters your business.",
          "Ongoing inventory tracking, so nothing goes missing or sits unused without anyone noticing.",
          "Secure data destruction and IT asset disposition when hardware reaches end of life, not just wiped and forgotten.",
          "Software license management, so you're not paying for seats nobody's using or exposed by licenses nobody renewed.",
        ],
      ],
      [
        "Desktops That Just Work",
        "End-user device support keeps your staff productive, without every issue routing through a slow internal ticket queue that takes days to resolve something simple. It's not glamorous, but it's the difference between a team that trusts IT and one that works around it.",
        [
          "Day-to-day troubleshooting and support for end-user devices.",
          "Fast ticket resolution, not a queue that sits untouched for days.",
        ],
      ],
      [
        "We Don't Disappear After Go-Live",
        "Deployment is only half the job. The other half is what happens after, and most vendors treat that as an afterthought. We treat it as the reason clients stay with us for years, not one project.",
        [
          "Deployment and maintenance across multiple sites, coordinated centrally rather than handled office by office with no shared visibility.",
          "Extended warranty coverage beyond standard vendor terms.",
          "Ongoing maintenance that catches problems before they become downtime.",
        ],
      ],
    ],
    steps: [
      [
        "01",
        "We Assess",
        "A review of your current IT operations, staffing, and asset inventory establishes exactly where the real gaps are before anything gets proposed.",
      ],
      [
        "02",
        "We Design",
        "A resourcing, development, or asset-management plan gets matched to your actual gaps, not a standard package applied regardless of what you need.",
      ],
      [
        "03",
        "We Deploy",
        "Staff placement or asset rollout follows, coordinated to minimize disruption to work already in progress.",
      ],
      [
        "04",
        "We Manage",
        "Ongoing support, maintenance, and lifecycle tracking keep the engagement working long after the initial handover.",
      ],
    ],
    reasons: [
      {
        title: "One Accountable Partner",
        text: "One accountable partner for staffing, hardware, and support, instead of three separate vendors who point fingers when something goes wrong.",
      },
      {
        title: "Certified, Vetted Engineers",
        text: "Certified engineers across Cisco, AWS, Azure, and DevOps disciplines, sourced and vetted by Comtech directly, not a generic staffing agency filling a seat.",
      },
      {
        title: "Decade of Asset Lifecycle Experience",
        text: "Ten years of hardware lifecycle experience, reducing both cost and compliance risk on asset disposition most businesses handle inconsistently.",
      },
      {
        title: "Single Point of Accountability",
        text: "A single point of accountability for staffing, assets, and support, so nothing falls into the gap between two vendors pointing fingers at each other.",
      },
    ],
    faq: [
      [
        "What's the difference between IT staff augmentation and outsourcing?",
        "Staff augmentation places Comtech engineers directly on your team under your direction. Outsourcing hands over an entire function for Comtech to run independently. We offer both, scoped to what the engagement actually needs.",
      ],
      [
        "Do you offer offshore or remote developers, or only on-site staff?",
        "Both. Depending on the role and the work, we can place engineers on-site, provide a fully remote extended team, or blend the two, whatever fits how your team actually operates.",
      ],
      [
        "How does IT asset lifecycle management actually reduce costs?",
        "By tracking hardware from procurement through disposal, businesses avoid over-purchasing, catch underused assets early, and handle end-of-life disposition securely instead of accumulating unmanaged equipment nobody's responsible for.",
      ],
      [
        "What's included in your after-sales support?",
        "Ongoing maintenance, extended warranty coverage beyond standard vendor terms, and ongoing system optimization, so you're not on your own the moment a project wraps.",
      ],
    ],
    midCtaLabel: "Get in Touch Today!",
    finalCtaLabel: "Get a Free IT Services Consultation",
    ctaTitle: "Need Certified IT Staff or Asset Management Support?",
    ctaText:
      "Whether you need one engineer or a full operations handover, we scope the engagement around what you actually need, not a fixed package.",
    partnerSection: {
      title: "Backed by Real Vendor Relationships, Not a Reseller Catalog",
      paragraphs: [
        "Our IT services practice partners with Dell, HPE, and D-Link for hardware, alongside a certified engineering bench across Cisco, a certified Cisco partner relationship, AWS, and Azure.",
        "That combination of hardware relationships and certified staff lets us handle procurement, deployment, and ongoing support as one connected service, not three disconnected ones. Comtech maintains 15 confirmed technology partnerships across our full service portfolio.",
      ],
    },
    industries: [
      "Banking & Financial Services",
      "Telecommunications",
      "Healthcare",
      "Government & Public Sector",
      "Education",
      "Retail & E-commerce",
    ],
    relatedServices: [
      // {
      //   title: "Cybersecurity",
      //   text: "Endpoint and identity security across the staff and assets we manage day to day.",
      //   href: "/services/cyber-security",
      //   linkLabel: "Explore Our Cybersecurity Services",
      // },
      {
        title: "Networking & IT Infrastructure",
        text: "The network layer supporting the distributed teams and devices we support.",
        href: "/services/network-support",
        linkLabel: "Explore Networking Solutions",
      },
      {
        title: "Data Center & Cloud Solutions",
        text: "Infrastructure hosting the systems our staff augmentation and asset management teams work within.",
        href: "/services/data-center",
        linkLabel: "Explore Data Center Services",
      },
      {
        title: "Custom Software Development",
        text: "Application development and legacy modernization, delivered by the same team managing your infrastructure.",
        href: "/services/custom-software-development",
        linkLabel: "Explore Software Development",
      },
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development in Pakistan | Comtech",
    description:
      "Custom software development for Pakistani enterprises – internal tools, platforms and legacy modernisation, built and supported in-house.",
    keyword: "custom software development",
    heroTitle:
      "Software That's Actually Yours, Not a Black Box Someone Else Controls",
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
      [
        "Custom Enterprise Application Development",
        "Greenfield builds and extensions of platforms you already run, shaped around how your team operates.",
      ],
      [
        "Legacy System Modernization",
        "Replace unsupported software in stages instead of forcing a risky rip-and-replace.",
      ],
      [
        "API Development & Integrations",
        "Connect CRM, ERP, and internal tools instead of forcing a system switch.",
      ],
      [
        "Internal Tools & Workflow Automation",
        "Purpose-built dashboards and automation that replace spreadsheet-and-email processes.",
      ],
      [
        "Ongoing Maintenance & Support",
        "Updates and fixes from the team that built the software and manages its infrastructure.",
      ],
    ],
    steps: [
      [
        "01",
        "We Assess",
        "Understand the actual problem and review current systems and workflows before writing code.",
      ],
      [
        "02",
        "We Design",
        "Map architecture and scope to your requirements and existing environment.",
      ],
      [
        "03",
        "We Develop",
        "Build in visible stages so you can react throughout delivery, not receive a black box at the end.",
      ],
      [
        "04",
        "We Manage",
        "Post-launch maintenance and updates from the team that built and hosts the software.",
      ],
    ],
    reasons: [
      {
        title: "One Team, Software and Infrastructure",
        text: "The team that builds the software also manages the infrastructure it runs on.",
      },
      {
        title: "Built by People Who Know Your Environment",
        text: "Ten years and 250+ projects across networking, data center, and security inform each build.",
      },
      {
        title: "Visible Progress",
        text: "Development proceeds in stages you can see and react to.",
      },
      {
        title: "Support That Doesn't Start Over",
        text: "Ongoing support comes from the same team that built the system.",
      },
    ],
    faq: [
      [
        "How much does custom software development cost in Pakistan?",
        "It depends on scope. We scope every project individually after understanding your requirements.",
      ],
      [
        "How is this different from hiring a software development agency?",
        "Comtech also manages the infrastructure, security, and support around what we build.",
      ],
      [
        "Can you modernize an existing system instead of building from scratch?",
        "Yes. Legacy modernization replaces outdated software in stages.",
      ],
      [
        "Do you offer ongoing maintenance after delivery?",
        "Yes. Maintenance and support are part of how we deliver software.",
      ],
      [
        "Can Comtech integrate with our existing CRM or ERP?",
        "Yes. API development and third-party integrations are core parts of what we build.",
      ],
    ],
    ctaTitle: "Have an Idea That Off-the-Shelf Software Can't Handle?",
    ctaText:
      "Tell us what you're trying to solve, and we'll tell you honestly whether custom software is the right answer.",
  },
];

const getBaseServicePage = (slug: string): ServicePageData => {
  const service = baseServicePages.find((item) => item.slug === slug);
  if (!service) {
    throw new Error(`Missing source content for service page "${slug}".`);
  }
  return service;
};

const cyberSecurityPage = getBaseServicePage("cyber-security");
const dataCenterPage = getBaseServicePage("data-center");
const managedItPage = getBaseServicePage("managed-it-services");
const customSoftwarePage = getBaseServicePage("custom-software-development");

export const servicePages: ServicePageData[] = [
  cyberSecurityPage,
  dataCenterPage,
  managedItPage,
  customSoftwarePage,
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
      {service.stats.length > 0 && <Stats items={service.stats} interactive />}

      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{
          background:
            "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)",
        }}
      >
        <section className="wrap sec">
          <SecHead
            title={
              service.capabilitiesTitle ?? `What ${service.keyword} Covers`
            }
            sub={
              service.capabilitiesIntro ??
              `Practical ${service.keyword} for organizations that need their technology to support day-to-day operations and long-term growth.`
            }
          />
          <div className="grid gap-5 md:grid-cols-2 min-[1101px]:grid-cols-4 min-[1101px]:gap-[2.4%]">
            {service.capabilities.map(([title, text, included], index) => (
              <article
                key={title}
                className="card pad-outer bg-[#080808]! p-4!"
              >
                <div
                  className={`card svc svc-dark gborder-new service-offer-card h-full p-4! sm:p-8! ${index === 0 ? "is-active" : ""}`}
                >
                  <h3 className="h3 h3-lg text-[26px]! leading-[38px]! tracking-tighter!">
                    {title}
                  </h3>
                  <span className="bar mt-2! mb-2!" />
                  <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">
                    {text}
                  </p>
                  {included && (
                    <>
                      <h4 className="mt-4 text-[16px] font-semibold">
                        What's included
                      </h4>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-[16px] leading-[25px] font-normal tracking-tighter">
                        {included.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap sec">
          <SecHead
            title={service.stepsTitle ?? `How We Deliver ${service.keyword}`}
          />
          <HowWeWork steps={service.steps} />
        </section>

        <section className="wrap sec">
          <SecHead
            title={
              service.reasonsTitle ??
              `Why Organizations Choose Comtech for ${service.keyword}`
            }
          />
          <NumberedCards items={service.reasons} interactive />
        </section>
      </div>

      {service.midCtaLabel && (
        <div className="wrap sec flex justify-center">
          <Btn href="/contact-us">{service.midCtaLabel}</Btn>
        </div>
      )}

      {service.partnerSection && (
        <section className="wrap sec">
          <SecHead title={service.partnerSection.title} />
          {service.partnerSection.paragraphs.map((paragraph) => (
            <p className="lead" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {service.industries && (
        <section className="wrap sec">
          <SecHead title="Built for Businesses That Can't Afford IT to Be an Afterthought" />
          <p className="lead">
            We support organizations that need IT operations to run reliably in
            the background, without leadership having to think about it every
            week.
          </p>
          <div className="chips">
            {service.industries.map((industry) => (
              <div className="chip gborder-new" key={industry}>
                {industry}
              </div>
            ))}
          </div>
        </section>
      )}

      {service.relatedServices && (
        <section className="wrap sec">
          <SecHead title="You Might Also Need…" />
          <div className="grid gap-5 md:grid-cols-2 min-[1101px]:grid-cols-4">
            {service.relatedServices.map((related) => (
              <Link
                key={related.title}
                href={related.href}
                className="card pad-outer bg-[#080808]! p-6! transition-colors hover:border-[#7950e2]"
              >
                <h3 className="h3 text-[22px]! leading-[30px]!">
                  {related.title}
                </h3>
                <p className="my-3 text-[16px]! leading-[25px]! font-normal!">
                  {related.text}
                </p>
                <span className="text-[#b79cff]">{related.linkLabel}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="wrap">
        <PinnedFaq
          className="mt-16!"
          items={service.faq}
          head={
            <>
              <h2 className="h2">
                Frequently
                <br />
                Asked Questions
              </h2>
              <p className="mt-5">
                Straight answers about {service.keyword} and how Comtech can
                help.
              </p>
              <Btn href="/contact-us">Talk to an IT Consultant</Btn>
            </>
          }
        />
      </section>

      <CtaPanel
        title={service.ctaTitle}
        text={service.ctaText}
        label={service.finalCtaLabel ?? service.ctaLabel}
      />
    </main>
  );
}
