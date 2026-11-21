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
  title: "IT Services for Government in Pakistan | Comtech Associates",
  description:
    "Comtech Associates provides IT services for government agencies and public entities in Pakistan: infrastructure, security, and managed IT built for accountability at scale.",
};

const stats: [string, string][] = [
  ["250+", "Projects Delivered"],
  ["10+ Years", "In Operation"],
  ["4 Cities", "Nationwide"],
  ["24/7", "Security Operations"],
];

const services = [
  { title: "Government IT Infrastructure", text: "Government IT infrastructure that scales across departments and locations: networks, wireless, servers, and the connections between sites. Built to standards, with the documentation a public body needs." },
  { title: "Secure Communications and Data Protection", text: "Public bodies hold data citizens never agreed to lose. Comtech builds secure communication and data management systems, with firewalls and advanced threat protection watched around the clock." },
  { title: "Managed IT Services for Government Agencies", text: "Government managed IT services free internal teams from routine operations. As a managed IT services provider for public entities, Comtech runs helpdesk, desktop support, monitoring, and maintenance, with government IT maintenance services on a clear schedule." },
  { title: "IT Staff Augmentation for Government Projects", text: "When a project needs skilled hands for a fixed period, Comtech supplies IT engineers and technical specialists as part of a broader managed IT engagement. This is government IT staffing for technology work, not general recruitment." },
];

const procurement = [
  { title: "Cisco Premier Partner", text: "Seven confirmed Cisco credentials, including Networking, Security, Services, and Cloud and AI Infrastructure." },
  { title: "Huawei Loyalty Partner", text: "Recognized for consistent performance and reliability across deployments." },
  { title: "Compliance-Aligned Delivery", text: "Practices aligned to ISO 27001 and related standards." },
  { title: "Regulated-Sector Delivery", text: "Documented projects for banks, where uptime and audit trails are part of the job." },
  { title: "Four Offices", text: "Karachi, Islamabad, Lahore, and Quetta, so federal and provincial work has local engineers." },
];

const steps: [string, string, string][] = [
  ["01", "We Scope", "A written assessment of your environment, requirements, and constraints."],
  ["02", "We Specify", "Clear technical specifications and deliverables you can evaluate and approve."],
  ["03", "We Deliver", "Installation to the agreed scope, with milestones you can verify."],
  ["04", "We Support and Report", "Ongoing service with regular reporting, so there is always a record."],
];

const why = [
  { title: "One Accountable Partner", text: "Networking, security, and managed IT from a single team, so responsibility never gets split." },
  { title: "Standards First", text: "Design and delivery built to recognized standards rather than improvised on site." },
  { title: "A Paper Trail by Default", text: "Assessments, specifications, and reports documented at every stage." },
  { title: "Present Where You Operate", text: "Engineers in four cities, close to both federal and regional offices." },
];

const faq: [string, string][] = [
  ["What IT services does Comtech provide for government agencies?", "Infrastructure design and deployment, cybersecurity, managed IT, desktop support, and technical staff augmentation, delivered by one team."],
  ["Can Comtech provide managed IT for a public entity with multiple departments?", "Yes. Managed IT engagements are scoped per department or organization-wide, with defined service levels and written reporting."],
  ["How does Comtech handle security for sensitive public data?", "Layered protection: firewalls, segmentation, endpoint and email security, data center security, and 24/7 monitoring, designed to your classification and policy requirements."],
  ["Does Comtech provide IT staffing for government projects?", "Comtech provides IT staff augmentation for technology projects, as part of managed IT. It is not a recruitment agency for general government hiring."],
  ["Is Comtech a recognized technology partner?", "Yes. Comtech is a Cisco Premier Partner and a Huawei Loyalty Partner, with Fortinet and other vendor partnerships across its 15 technology partners."],
];

const related = [
  { title: "Cybersecurity", text: "Managed security, SOC monitoring, and protection for public-sector systems.", href: "/services/cybersecurity" },
  { title: "Networking & IT Infrastructure", text: "Secure department, facility, and multi-site connectivity.", href: "/services/networking" },
  { title: "IT Services & Managed IT", text: "Helpdesk, desktop support, monitoring, and ongoing operations.", href: "/services/managed-it" },
];

const frameBg = "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";
const bandB = "linear-gradient(179.11deg, rgba(4, 4, 4, 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgba(4, 4, 4, 0) 99.23%)";
const H2 = "text-[46px] font-medium leading-[54px] tracking-tighter";

export default function Government() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={<>Public Sector IT Built for<br />Accountability at Scale</>}
        text="Comtech is a trusted IT solutions provider for the public sector: government IT infrastructure, security, and managed IT services for government agencies and public entities."
        primary="Request a Public Sector IT Assessment"
        secondary="Explore our Services"
      />
      <Stats items={stats} interactive />

      <div className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16" style={{ background: frameBg }}>
        <section className="wrap sec">
          <SecHead title="What Public Sector IT Has to Prove" sub="Public systems answer to citizens, auditors, and standards, not just users. Comtech's IT services and consulting for government are built to be specified clearly, delivered on scope, and documented end to end." />
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="What We Deliver for Government and Public Entities" />
          <div className="grid gap-6 md:grid-cols-2 lg:gap-[28px]">
            {services.map((service) => (
              <GlowCard key={service.title} className="h-full">
                <h3 className="text-[26px] font-normal leading-[31px] text-white">{service.title}</h3>
                <Underline className="mt-[20px]" />
                <p className="mt-[21px] text-[18px] leading-[31px] text-white">{service.text}</p>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="Procurement-Ready: What You Can Verify" sub="Public sector buyers need credentials they can check. Comtech's are specific." />
          <NumberedCards items={procurement.slice(0, 4)} />
          <div className="mx-auto mt-6 max-w-[700px]">
            <GlowCard className="h-full">
              <h3 className="text-[26px] font-normal leading-[31px] text-white">{procurement[4].title}</h3>
              <Underline className="mt-[20px]" />
              <p className="mt-[21px] text-[18px] leading-[31px] text-white">{procurement[4].text}</p>
            </GlowCard>
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="How We Work With Public Sector Teams" />
          <HowWeWork steps={steps} />
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="Why Public Entities Choose Comtech" sub="Public sector IT should be predictable. Comtech makes it that way." />
          <NumberedCards items={why} />
        </section>
      </div>

      <div className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px]" style={{ background: bandB }}>
        <section className="wrap">
          <StackedFaq items={faq} head={<><h2 className={H2}>Government IT,<br />Straight Answers</h2><p className="mt-5">Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.</p></>} />
        </section>
      </div>

      <section className="wrap sec">
        <SecHead title="You Might Also Need" />
        <div className="grid gap-6 md:grid-cols-3 lg:gap-[28px]">
          {related.map((item) => (
            <GlowCard key={item.title} className="h-full">
              <div className="flex h-full flex-col">
                <h3 className="text-[26px] font-normal leading-[31px] text-white">{item.title}</h3>
                <Underline className="mt-[20px]" />
                <p className="mt-[21px] flex-1 text-[18px] leading-[31px] text-white">{item.text}</p>
                <div className="mt-7"><Btn v="o" href={item.href}>Read More</Btn></div>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      <CtaPanel title="Ready for Public Sector IT You Can Verify?" text="A written assessment of your environment comes before any proposal." label="Request a Public Sector IT Assessment" />
    </main>
  );
}
