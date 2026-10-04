import type { Metadata } from "next";
import Image from "next/image";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Faq } from "@/components/Faq";
import { Glow, PageGlows } from "@/components/Glow";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { SecHead } from "@/components/SecHead";

export const metadata: Metadata = {
  title: "Networking & IT Infrastructure | Comtech Associates",
};

const capabilities = [
  [
    "LAN/WAN Design & Deployment",
    "LAN/WAN setup and VLAN configuration architected around your actual traffic and user count, not a template scaled up or down to fit. Every deployment includes proper router and switch configuration from day one.",
  ],
  [
    "SD-WAN",
    "Centrally managed, secure connectivity between multiple offices or branches, replacing costly point-to-point links with something more resilient and far easier to monitor as you add locations.",
  ],
  [
    "Structured Cabling",
    "Certified cabling for new offices, data centers, or campus expansions, built to carry current and future network loads without a rebuild two years in because the initial install was undersized.",
  ],
  [
    "Wireless Networking",
    "Enterprise wireless design covering hospital, retail, and BPO environments, with coverage and device density both mapped before install, because a weak signal in the wrong spot has real operational cost.",
  ],
];

const steps: [string, string, string][] = [
  ["01", "We Assess", "A site survey and current-state network audit establishes exactly what you have, what's working, and where the real bottlenecks are, before any design work begins."],
  ["02", "We Design", "The resulting architecture gets sized to your traffic, sites, and growth plan, not a template scaled up or down to fit."],
  ["03", "We Deploy", "Certified installation and configuration follows, sequenced to minimize planned downtime during cutover."],
  ["04", "We Manage", "Ongoing monitoring, support, and capacity planning keep the network ahead of growth instead of catching up to it after problems appear."],
];

const trust = [
  [
    <>Certified Cisco <br /> Expertise</>,
    "A certified Cisco partner with engineers who hold active certifications, not a reseller offering third-party guesswork when something breaks."
  ],
  [
    <>Four Cities, <br /> One Team</>,
    "Physical presence in four cities, so deployment and support don't depend on a single remote team stretched across the whole country."
  ],
  [
    <>Security Built In <br /> From Day One</>,
    "Network design that accounts for the security and compliance layer from day one, not bolted on afterward once someone raises a concern."
  ],
  [
    <>Decade in Mission <br /> Critical Networks</>,
    "Ten years of infrastructure delivery across banking, telecom, and healthcare environments where downtime has a real, measurable cost attached to it."
  ],
];

const faq: [string, string][] = [
  ["What causes network downtime, and how do you prevent it?", "Most enterprise downtime traces back to hardware failure, misconfiguration, or capacity limits under peak load. Prevention comes down to redundant design, proactive monitoring, and planned capacity headroom, not reacting after an outage has already happened."],
  ["Do you support hardware we already have in place, like MikroTik, Juniper, or Aruba?", "Yes. Most engagements begin with an audit of the equipment you already run, and we support and integrate mixed environments where it makes sense rather than forcing a full replacement."],
  ["What is SD-WAN, and do I actually need it?", "SD-WAN manages the connections between your offices, branches, and cloud services from one central controller instead of separate point-to-point links. It usually pays off once you run multiple locations or depend on cloud applications, and we'll tell you honestly if a simpler setup fits better."],
  ["How much does structured cabling cost in Pakistan?", "It depends on the size of the site, the cable category and certification standard, and the physical conditions of the building. We scope every project from a site survey, so the quote reflects your actual floor plan rather than a generic per-point estimate."],
  ["Do you provide VoIP setup for call centers and BPOs?", "Yes. We design and configure VoIP and IP telephony for call centers and BPOs, with the network built to stay reliable through every shift, including quality-of-service settings and redundancy for voice traffic."],
];

const more = [
  ["Cybersecurity", "24/7 SOC monitoring, penetration testing, and compliance-aligned security for banks, telecoms, and enterprises across Pakistan. Covers managed security, VAPT, incident response, identity and access management, cloud security posture management, and compliance with frameworks like ISO 27001, PCI DSS, and the SBP Cybersecurity Framework.", "Explore Cybersecurity Services"],
  ["Custom Software Development", "Custom enterprise application development, legacy system modernization, API integrations, and internal tools, built and supported by the same team that manages your infrastructure, not a vendor who disappears after launch.", "Explore Custom Software Development"],
  ["Data Center & Cloud Solutions", "End-to-end data center architecture, migration, and hybrid cloud connectivity, built on Cisco and HPE infrastructure. Covers Tier II to IV aligned design, disaster recovery, 24/7 NOC operations, and multi-cloud connectivity across AWS, Azure, and GCP.", "Explore Data Center & Cloud Solutions"],
  ["IT Services & Managed IT", "IT staff augmentation, custom software development, asset lifecycle management, and after-sales support, delivered as one accountable partner instead of three separate vendors. Certified engineers across Cisco, AWS, Azure, and DevOps disciplines support your team directly.", "Explore IT Services & Managed IT"],
];

const bandA =
  "linear-gradient(180deg, #040404 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%);";

const bandB =
  // "linear-gradient(180deg, #040404 0%, rgba(69, 22, 187, 0.4) 50%, #040404 100%)";
  "linear-gradient(179.11deg, rgba(4, 4, 4, 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgba(4, 4, 4, 0) 99.23%);";

const H2 = "text-[46px] font-medium leading-[54px] tracking-tighter";
const P = "text-[18px] leading-[31px] tracking-tighter";

function Feature({
  title,
  flip,
  children,
  image = "/images/BlogExampleImageForNow.png",
}: {
  title: string;
  flip?: boolean;
  children: React.ReactNode;
  image?: string;
}) {
  return (
    <div className="grid items-center gap-10 min-[1101px]:grid-cols-2 min-[1101px]:gap-24">
      <div className={flip ? "min-[1101px]:order-2" : ""}>
        <h2 className={`${H2} max-w-[560px]`}>{title}</h2>
        <div className={`mt-8 flex flex-col gap-1 ${P}`}>{children}</div>
      </div>
      <div className={`card rounded-[35px]! p-[18px]! ${flip ? "min-[1101px]:order-1" : ""}`}>
        <Image src={image} alt="" width={597} height={346} className="h-auto w-full rounded-[28px]" />
      </div>
    </div>
  );
}

export default function Networking() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        className="p-40! mt-14!"
        title={<>When Your Network Goes Down,<br />So Does Your Business.</>}
        text={
          <>
            As a certified Cisco partner, Comtech designs, deploys, and monitors the network infrastructure banks, hospitals, and manufacturers depend on, 24/7.
            <br />
            We serve enterprises in four major cities, backed by certified engineers, not a reseller who ships hardware and disappears.
          </>
        }
        primary="Get a Professional Consult Today"
      />

      {/* capabilities: outer cards peek in from the edges and sit higher, like Figma */}
      <section className="sec relative p-10!">
        <div className="wrap">
          <SecHead
            title={<>Everything Your Network Needs <br /> End to End</>}
            sub="We don't sell network components. We build and manage the network itself, as one connected system, so nothing gets left as someone else's problem."
          />
        </div>
        <div className="mx-auto w-full max-w-[1764px] px-5 min-[1101px]:w-[94%] min-[1101px]:px-0">
          {/* mobile: swipeable row. desktop: 4 equal cards, outer two sit higher like Figma */}
          <div className="flex snap-x gap-5 overflow-x-auto [scrollbar-width:none] min-[1101px]:grid min-[1101px]:grid-cols-4 min-[1101px]:items-start min-[1101px]:gap-[2.4%] min-[1101px]:overflow-visible">
            {capabilities.map(([t, p], i) => (
              <div
                key={t}
                className={`card pad-outer min-w-[82%] snap-center bg-[#080808]! p-4!  min-[1101px]:min-w-0 ${i === 0 || i === capabilities.length - 1 ? "min-[1280px]:-translate-y-[42%]" : ""
                  }`}
              >
                <div className="card svc svc-dark gborder-new h-full bg-[#0f0826]! p-8!">
                  <h3 className="h3 h3-lg text-[26px]! leading-[38px]! tracking-tighter!">{t}</h3>
                  <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* purple band: One Vendor + How We Get You Connected */}
      <div
        className="relative isolate mx-auto w-[94%] max-w-[1764px] rounded-[40px] pb-24"
        style={{ background: bandA }}
      >
        <section className="wrap sec">
          <div className="grid items-start gap-8 min-[1101px]:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] min-[1101px]:gap-16">
            <h2 className={H2}>
              One Vendor,
              <br />
              Every System
              <br />
              Working Together
            </h2>
            <div>
              <p className={P}>
                The hardest part of enterprise IT usually isn&apos;t any single system, it&apos;s getting all of them to work as one. Our system integration practice connects your networking, security, and infrastructure layers into a single environment instead of a patchwork of point solutions that don&apos;t talk to each other. For businesses in Karachi specifically, our system integration team works on-site, not remotely, when a project needs hands on the ground.
              </p>
              <div className="mt-8">
                <Btn href="/contact">Connect With Us</Btn>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap sec">
          <SecHead
            title="How We Get You Connected"
            sub="Every network project, whether it's a single-office LAN or a multi-city SD-WAN rollout, follows the same disciplined process."
          />
          <HowWeWork steps={steps} />
        </section>
      </div>

      {/* hardware + feature rows, with the blue glows from Figma */}
      <div className="relative overflow-x-clip">
        <Glow className="top-[18%] -left-[260px] size-[760px]" color="rgba(30,64,255,.45)" />
        <Glow className="bottom-[2%] -right-[260px] size-[700px]" color="rgba(30,64,255,.4)" />

        <section className="wrap sec mt-16">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className={H2}>
              Certified Engineers,
              <br />
              Not Just Certified Boxes
            </h2>
            <p className={`${P} mt-5`}>
              Our networking practice runs on Cisco, a certified Cisco partner relationship, alongside Ubiquiti, TP-Link, D-Link, and HPE hardware. That range matters in practice: the right hardware gets chosen for your environment, not whatever a single-vendor relationship happens to stock. Comtech maintains 15 confirmed technology partnerships across our full-service portfolio.
            </p>
          </div>
        </section>

        <section className="wrap flex flex-col gap-24 pb-10 pt-10 min-[1101px]:gap-32">
          <Feature title="Security Built Into the Network, Not Bolted On">
            <p>
              Network segmentation and access controls are designed to support the compliance requirements your sector already carries, not treated as a separate concern from the network itself. For businesses in payments or healthcare, that means PCI DSS-aligned segmentation and HIPAA-aware access controls from the design stage onward, not retrofitted after an audit finding. See our Cybersecurity page for the full compliance picture across our practice.
            </p>
          </Feature>

          <Feature title="Built for the Environments Where Downtime Isn't an Option" flip>
            <p>
              We design hospital network infrastructure where a dropped connection can delay patient care, campus network solutions that keep every classroom and lab connected, and retail network infrastructure that stays consistent whether you have one storefront or fifty.
            </p>
            <p>
              For network support for BPO operations and contact centers, we handle VoIP setup for call centers that need to stay reliable through every shift. Our clients span Banking &amp; Financial Services, Telecommunications, Healthcare, Government &amp; Public Sector, Education, and Retail &amp; E-commerce.
            </p>
          </Feature>

          <Feature title="Results You Can Verify">
            <p>
              Comtech implemented a Fortinet Secure SD-WAN solution for Karakoram Bank (KCBL), a leading financial institution in Gilgit-Baltistan, delivering advanced connectivity that improved speed, reliability, and security across every branch as part of the bank&apos;s digital transformation.
            </p>
            <p>
              For Karwan-e-Hayat, we built a complete network infrastructure from a bare facility: structured cabling, networking racks, backbone connectivity, D-Link access points, and core and supporting switches, delivering reliable, faster, and secure connectivity backed by ongoing after-sales support.
            </p>
            <div className="mt-6">
              <Btn href="/contact">Get in Touch Today</Btn>
            </div>
          </Feature>
        </section>

        <section className="wrap sec mt-40!">
          <h2 className={`${H2} mx-auto max-w-[760px] text-center`}>
            Why Businesses Trust Comtech
            <br />
            With Their Network
          </h2>
          <div className="mx-auto mt-14 grid grid-cols-1 items-stretch gap-10 min-[700px]:grid-cols-2 min-[1101px]:grid-cols-4 min-[1101px]:gap-0">
            {trust.map(([t, p], i) => (<div key={i} className={`flex h-full flex-col justify-center min-[1101px]:p-8 ${i ? "min-[1101px]:border-l-[3px] min-[1101px]:border-[#6b43e2] min-[1101px]:pl-9" : ""}`} > <h3 className="max-w-[260px] text-[28px] font-medium leading-[36px] tracking-tighter"> {t} </h3> <p className="mt-4 text-[16px] leading-[26px] tracking-tighter"> {p} </p> </div>))}
          </div>
        </section>
      </div>

      {/* FAQ band */}
      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] py-10"
        style={{ background: bandB }}
      >
        <section className="wrap sec faq">
          <div>
            <h2 className={H2}>
              Frequently
              <br />
              Asked Questions
            </h2>
            <p className="mt-5">
              Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
            </p>
          </div>
          <Faq items={faq} />
        </section>
      </div>

      <section className="wrap sec mt-16">
        <SecHead
          title="You Might Also Need"
          sub="Each service below has its own dedicated page with the full breakdown of sub-services, process, and technical detail. This is the short version."
        />
        <div className="g2">
          {more.map(([t, p, b]) => (
            <div className="card pad-outer flex h-full bg-[#080808]! p-4!" key={t}>
              <div className="card svc svc-dark gborder-new flex h-full w-full flex-col bg-[#0f0826]!">
                <h3 className="h3 h3-lg text-[26px]! leading-[75px]! tracking-tighter!">{t}</h3>
                <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">{p}</p>
                <div className="mt-auto">
                  <Btn href="/services">{b}</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaPanel
        title="Let's Build a Network That Never Lets You Down"
        text="Whether you're outgrowing your current setup or building a new office from scratch, a conversation with our network team is the place to start."
        label="Get a Free Network Consultation"
      />
    </main>
  );
}
