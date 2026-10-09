import Image from "next/image";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { PageGlows } from "@/components/Glow";
import { SecHead } from "@/components/SecHead";
import { HowWeWork } from "@/components/HowWeWork";
import ComtechRightChoice_SectionImage from "@/public/images/Comtech_RightChoiceIMG.png";

const off = [
  [
    "Cybersecurity",
    "24/7 SOC monitoring, penetration testing, and compliance-aligned security for banks, telecoms, and enterprises across Pakistan. Covers managed security, VAPT, incident response, identity and access management, cloud security posture management, and compliance with frameworks like ISO 27001, PCI DSS, and the SBP Cybersecurity Framework.",
    "Explore Cybersecurity Services",
    "/services",
  ],
  [
    "Networking & IT Infrastructure",
    "Network design, deployment, and 24/7 monitoring for banks, hospitals, and enterprises that cannot afford downtime. Covers LAN/WAN architecture, SD-WAN, structured cabling, wireless networking, and network monitoring, delivered by a Cisco Premier Partner with certified engineers on staff.",
    "Explore Networking & IT Infrastructure",
    "/services/networking",
  ],
  [
    "Data Center & Cloud Solutions",
    "End-to-end data center architecture, migration, and hybrid cloud connectivity, built on Cisco and HPE infrastructure. Covers Tier II to IV aligned design, disaster recovery, 24/7 NOC operations, and multi-cloud connectivity across AWS, Azure, and GCP.",
    "Explore Data Center & Cloud Solutions",
    "/services",
  ],
  [
    "IT Services & Managed IT",
    "IT staff augmentation, custom software development, asset lifecycle management, and after-sales support, delivered as one accountable partner instead of three separate vendors. Certified engineers across Cisco, AWS, Azure, and DevOps disciplines support your team directly.",
    "Explore IT Services & Managed IT",
    "/services",
  ],
];

const steps: [string, string, string][] = [
  [
    "01",
    "Assess",
    "A baseline audit of your current environment, whether that's security posture, network health, infrastructure, or IT operations.",
  ],
  [
    "02",
    "Design",
    "An architecture or plan mapped to your actual requirements and your sector's regulatory obligations, not a generic template.",
  ],
  [
    "03",
    "Design",
    "Implementation sequenced to minimize disruption to operations already in progress.",
  ],
  [
    "04",
    "Manage",
    "Ongoing monitoring, support, and optimization once the initial engagement is complete.",
  ],
];

const checks = [
  "One accountable partner across cybersecurity, networking, data center, and IT services, instead of four separate vendors who don't talk to each other.",
  "A Cisco Preferred Partner with certified engineers across Fortinet, Kaspersky, AWS, Azure, and DevOps disciplines, not a generalist reseller.",
  "Physical presence in four Pakistani cities, so deployment and support don't depend on a single remote team.",
  "Ten years and 250+ delivered projects, with a track record spanning every service Comtech offers, not just one.",
];

const faq = [
  [
    "What services does Comtech Associates offer?",
    "Four connected practices: cybersecurity, networking and IT infrastructure, data center and cloud solutions, and IT services and managed IT. Each has its own dedicated page with full detail.",
  ],
  [
    "Does Comtech work with small and mid-size businesses, or only large enterprises?",
    "Yes. Engagements range from a single office LAN to a multi-city enterprise backbone, and most conversations start with a short assessment of your current environment to size the right solution.",
  ],
  [
    "Does Comtech serve clients outside Karachi?",
    "Yes. Comtech has offices in Karachi, Islamabad, Lahore, and Quetta, so deployment and support don't depend on a single remote team.",
  ],
  [
    "How do I get started with Comtech?",
    "Start with a conversation. Tell us what you're dealing with and we'll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations begin with a short assessment of your current environment.",
  ],
];

const industries = [
  "Banking & Finance",
  "Healthcare",
  "Public Sector & Govern",
  "Telecom",
  "Education",
];

// Figma "blue hover" frame: dark -> indigo -> dark vertical gradient
const frameBg =
  "var(--svc-band)";

export default function Services() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        className="p-40! mt-14!"
        title="Your Go To Enterprise IT Solutions"
        text="Comtech Associates delivers four connected IT practices, cybersecurity, networking and infrastructure, data center and cloud, and managed IT, as one accountable partner across Karachi, Islamabad, Lahore, and Quetta, not four disconnected vendors."
        primary="Talk to an IT Consultant"
        secondary="Explore our Services"
      />

      <div className="relative overflow-x-clip">
        {/* Gradient frame: About + What We Have to Offer + How We Work */}
        <div
          className="relative isolate mx-auto mt-16 w-[1764px] rounded-[40px]"
          style={{ background: frameBg }}
        >
          {/* blue glows: left-middle + bottom-right, as in Figma */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[200px] -bottom-[30%] -z-10 size-[620px] rounded-full blur-[90px] max-[1100px]:hidden"
            style={{
              background:
                "radial-gradient(circle, rgba(30,64,255,0.5) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[210px] -right-[160px] -z-10 size-[520px] rounded-full blur-[90px] max-[1100px]:hidden"
            style={{
              background:
                "radial-gradient(circle, rgba(43,85,214,0.6) 0%, transparent 70%)",
            }}
          />

          <section className="wrap sec about-who">
            <div>
              <h2 className="h2 text-[46px] leading-[54px] tracking-tighter">
                What Services Does <br /> Comtech Associates Provide?
              </h2>
              <span className="bar mt-8!" />
              <p className="lead text-[24px] leading-[38px] tracking-tighter">
                Comtech Associates is an enterprise IT solutions company built
                around four practices that work together rather than in
                isolation: cybersecurity, networking and IT infrastructure, data
                center and cloud solutions, and IT services and managed IT. Most
                businesses end up coordinating separate vendors for each of
                these. Comtech delivers all four as one accountable team, so a
                networking decision accounts for the security layer, and a data
                center migration accounts for the compliance requirements your
                sector already carries.
              </p>
            </div>
            <Image
              className="about-img"
              src="/images/Partnership_Section_Image.png"
              alt=""
              width={568}
              height={568}
              style={{ mixBlendMode: "screen" }}
            />
          </section>

          <section className="wrap sec">
            <div>
              <SecHead
                title="What We Have to Offer"
                sub="Each service below has its own dedicated page with the full breakdown of sub-services, process, and technical detail. This is the short version."
              />
              <div className="g2">
                {off.map(([t, p, b, href]) => (
                  <div
                    className="card pad-outer bg-card! flex h-full p-4!"
                    key={t}
                  >
                    <div className="card svc svc-dark gborder-new bg-card2! flex h-full w-full flex-col">
                      <h3 className="h3 h3-lg text-[26px]! leading-[75px]! tracking-tighter!">
                        {t}
                      </h3>

                      <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">
                        {p}
                      </p>

                      <div className="mt-auto">
                        <Btn href={href}>{b}</Btn>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="card pad-outer bg-surface/40!"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <div className="card svc svc-dark gborder-new bg-card2!">
                    <h3 className="h3 h3-lg">Custom Software Development</h3>
                    <p>
                      Custom enterprise application development, legacy system
                      modernization, API integrations, and internal tools, built
                      and supported by the same team that manages your
                      infrastructure, not a vendor who disappears after launch.
                    </p>
                    <div>
                      <Btn href="/services">
                        Explore Custom Software Development
                      </Btn>
                    </div>
                  </div>
                </div>
              </div>

              <SecHead
                className="mt-40"
                title="How We Work"
                sub="Every engagement, regardless of which service or combination of services is involved, follows the same four-stage process."
              />
              <HowWeWork steps={steps} />
            </div>
          </section>
        </div>

        <section className="wrap sec two flex items-stretch">
          <div className="flex flex-col">
            <h2 className="h2 text-[46px]! leading-[55px]! tracking-tighter!">Built on Enterprise Grade Technology</h2>
            <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">
              Comtech&apos;s practice runs on 15 confirmed technology partnerships,
              including Cisco, where Comtech holds Preferred Partner status, alongside
              Fortinet, Kaspersky, Sangfor, Ubiquiti, TP-Link, D-Link, HPE, H3C,
              Broadcom, and Dell. Which partners apply depends on the service, each
              pillar page lists the specific subset it&apos;s built on.
            </p>
            <div className="mt-auto">
              <Btn href="/partners">See All Technology Partnerships</Btn>
            </div>
          </div>

          <i />

          <div className="flex flex-col ml-10">
            <h2 className="h2 text-[46px]! leading-[55px]! tracking-tighter! ">Compliance You Can <br /> Count On</h2>
            <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">
              Comtech&apos;s services are built around the compliance frameworks
              Pakistani enterprises are actually held to, not a generic international
              checklist: ISO 27001, PCI DSS, HIPAA, and GDPR where relevant, plus
              Pakistan-specific requirements including the SBP Cybersecurity Framework.
            </p>
            <div className="mt-auto">
              <Btn href="/contact">Connect With Us</Btn>
            </div>
          </div>
        </section>
      </div>

      <section className="wrap sec">
        <SecHead
          title={
            <>
              Here Are Some Notable Industries
              <br />
              That We Work With
            </>
          }
        />
        <div className="chips">
          {industries.map((c) => (
            <div className="chip gborder-new" key={c}>
              {c}
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec max-w-[1764px]! p-20! mt-20! testing">
        <div className="why">
          <div>
            <h2 className="h2">Here’s Why Comtech Is The Right Choice</h2>
            <div className="check">
              {checks.map((c) => (
                <p key={c}>{c}</p>
              ))}
            </div>
            <Btn href="/contact">Connect With Us</Btn>
          </div>
          <div className="card stick">
            <Image
              src={ComtechRightChoice_SectionImage}
              alt=""
              width={652}
              height={641}
            />
          </div>
        </div>

        <div className="faq mt-20!">
          <div>
            <h2 className="h2">
              Frequently
              <br />
              Asked Questions
            </h2>
            <p style={{ margin: "20px 0 30px" }}>
              Have questions? Our FAQ section has you covered with quick answers
              to the most common inquiries.
            </p>
            <Btn href="/contact">Connect With Us</Btn>
          </div>
          <Faq items={faq as [string, string][]} />
        </div>
      </section>

      <CtaPanel
        title="Ready to Solve Your IT Challenge?"
        text="Whether it's one service or all four, a conversation with Comtech's team is the place to start. Tell us what you're dealing with, a security gap, an unreliable network, a data center migration, or a staffing shortfall, and we'll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations start with a short assessment of your current environment before anything gets proposed."
        label="Request an IT Assessment"
      />
    </main>
  );
}