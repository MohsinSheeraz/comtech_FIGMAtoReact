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
  title: "Healthcare IT Services in Pakistan | Comtech Associates",
  description:
    "Comtech Associates provides healthcare IT services: cybersecurity, hospital IT infrastructure, and managed IT that keep patient data private and systems running.",
};

const stats: [string, string][] = [
  ["24/7", "Security Operations"],
  ["HIPAA-Aligned", "Practices"],
  ["250+", "Projects Delivered"],
  ["4 Cities", "Nationwide"],
];

const services = [
  {
    title: "Cybersecurity for Healthcare",
    text: "Cybersecurity for healthcare means protecting the records, devices, and connections clinicians rely on, without slowing them down. Comtech builds healthcare IT security around the cyber security threats in healthcare that matter most, from ransomware to stolen patient records.",
  },
  {
    title: "Managed IT for Healthcare",
    text: "Managed IT services for healthcare take routine IT off clinical and administrative teams. As a managed service provider for healthcare, Comtech handles helpdesk, desktop support, and monitoring, with IT support for medical staff who can't wait on hold.",
  },
  {
    title: "Healthcare Data Center and Disaster Recovery",
    text: "A healthcare data center needs a plan for the day something fails. Comtech designs, migrates, and supports data center environments with disaster recovery built in, using Cisco and HPE.",
  },
  {
    title: "Hospital and Clinic IT Infrastructure",
    text: "Healthcare IT infrastructure has to work at every hour. Comtech designs and supports networks, wireless, and servers for hospitals, multi-site clinics, and labs, so records, imaging, and scheduling stay reachable.",
  },
];

const experience = [
  {
    title: "Disaster Recovery",
    text: "A disaster recovery network migration alongside a Cisco ACI data center deployment for Bank Islami.",
  },
  {
    title: "Secure Multi-Site Networking",
    text: "Fortinet Secure SD-WAN across branch locations for Karakoram Bank, the same model that connects clinics and hospital sites.",
  },
];

const steps: [string, string, string][] = [
  ["01", "We Review", "Where patient data lives, who can reach it, and what would stop if a system failed."],
  ["02", "We Protect", "Security controls matched to the risks in your environment, not a generic checklist."],
  ["03", "We Prepare", "Backup and recovery plans tested before you need them."],
  ["04", "We Monitor", "Round-the-clock watching, with a team that answers."],
];

const why = [
  { title: "Privacy and Uptime, Together", text: "One partner covering security and infrastructure, so neither gets traded for the other." },
  { title: "Compliance-Aligned Practices", text: "Delivery built around HIPAA and ISO 27001 requirements, matched to what your facility answers to." },
  { title: "Support That Picks Up", text: "A 24/7 operations team and local engineers, not a ticket queue." },
  { title: "Multi-Site Ready", text: "Offices in Karachi, Islamabad, Lahore, and Quetta for hospital groups and clinic networks." },
];

const faq: [string, string][] = [
  ["What does a healthcare IT service provider actually do?", "Comtech secures patient data, keeps hospital and clinic systems available, and handles day to day IT support, so clinical and administrative teams can focus on patients."],
  ["How do you protect patient records from a data breach?", "Layered controls: firewalls and segmentation, endpoint and email protection, access control, and 24/7 monitoring, backed by regular security assessments."],
  ["Is Comtech HIPAA compliant?", "Comtech's delivery practices are aligned to HIPAA requirements. Compliance itself rests with your organization, and Comtech designs your environment to support it."],
  ["Can you run a healthcare data center or host our systems?", "Comtech designs, migrates, and supports data center infrastructure, on premises or hybrid. It is an integrator and does not operate colocation facilities."],
  ["Do you support clinics and hospitals across several cities?", "Yes. With offices in four cities, multi-site healthcare groups get local support and consistent security across every location."],
];

const related = [
  { title: "Cybersecurity", text: "Managed security, SOC monitoring, and protection for healthcare systems.", href: "/services/cybersecurity" },
  { title: "Data Center & Cloud Solutions", text: "Resilient infrastructure and disaster recovery for critical workloads.", href: "/services/data-center" },
  { title: "Networking & IT Infrastructure", text: "Hospital, clinic, wireless, and multi-site connectivity.", href: "/services/networking" },
];

const frameBg = "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";
const bandB = "linear-gradient(179.11deg, rgba(4, 4, 4, 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgba(4, 4, 4, 0) 99.23%)";
const H2 = "text-[46px] font-medium leading-[54px] tracking-tighter";

export default function Healthcare() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={<>Healthcare IT That Keeps<br />Records Private and Care Running</>}
        text="Comtech is a healthcare IT service provider for hospitals, clinics, and diagnostic centers: healthcare cybersecurity, resilient infrastructure, and managed IT support, built around compliance."
        primary="Request a Healthcare IT Assessment"
        secondary="Explore our Services"
      />
      <Stats items={stats} />

      <div className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16" style={{ background: frameBg }}>
        <section className="wrap sec">
          <SecHead title="Two Promises Every Healthcare System Has to Keep" sub="Patients trust you with their records, and clinicians trust the systems to be there. Comtech's healthcare IT solutions and services are built around both. We promise to maintain patient privacy and keep your systems running!" />
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
          <SecHead title="Experience Carried In From Always-On Sectors" sub="Healthcare shares its hardest requirements with banking: continuity, privacy, and no tolerance for surprises. Comtech has delivered both for regulated financial institutions." />
          <div className="grid gap-6 md:grid-cols-2 lg:gap-[28px]">
            {experience.map((item) => (
              <GlowCard key={item.title} className="h-full">
                <h3 className="text-[26px] font-normal leading-[31px] text-white">{item.title}</h3>
                <Underline className="mt-[20px]" />
                <p className="mt-[21px] text-[18px] leading-[31px] text-white">{item.text}</p>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="How We Protect Care Continuity" />
          <HowWeWork steps={steps} />
        </section>

        <section className="wrap sec mt-16!">
          <SecHead title="Why Healthcare Teams Choose Comtech" sub="Clinical teams should never have to think about IT. We make sure they don't." />
          <NumberedCards items={why} />
        </section>
      </div>

      <div className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px]" style={{ background: bandB }}>
        <section className="wrap">
          <StackedFaq items={faq} head={<><h2 className={H2}>Healthcare IT,<br />Straight Answers</h2><p className="mt-5">Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.</p></>} />
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

      <CtaPanel title="Ready to Protect Your Patients' Data and Your Uptime?" text="An assessment shows where your records are exposed and which systems would stop care if they failed." label="Request a Healthcare IT Assessment" />
    </main>
  );
}
