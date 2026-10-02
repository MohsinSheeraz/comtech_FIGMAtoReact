import Image from "next/image";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { PageGlows, Glow, SectionGlow } from "@/components/Glow";
import { SecHead } from "@/components/SecHead";

const off = [
  ["Cybersecurity", "24/7 SOC monitoring, penetration testing, and compliance-aligned security for banks, telecoms, and enterprises across Pakistan. Covers managed security, VAPT, incident response, identity and access management, cloud security posture management, and compliance with frameworks like ISO 27001, PCI DSS, and the SBP Cybersecurity Framework.", "Explore Cybersecurity Services"],
  ["Networking & IT Infrastructure", "Network design, deployment, and 24/7 monitoring for banks, hospitals, and enterprises that cannot afford downtime. Covers LAN/WAN architecture, SD-WAN, structured cabling, wireless networking, and network monitoring, delivered by a Cisco Premier Partner with certified engineers on staff.", "Explore Networking & IT Infrastructure"],
  ["Data Center & Cloud Solutions", "End-to-end data center architecture, migration, and hybrid cloud connectivity, built on Cisco and HPE infrastructure. Covers Tier II to IV aligned design, disaster recovery, 24/7 NOC operations, and multi-cloud connectivity across AWS, Azure, and GCP.", "Explore Data Center & Cloud Solutions"],
  ["IT Services & Managed IT", "IT staff augmentation, custom software development, asset lifecycle management, and after-sales support, delivered as one accountable partner instead of three separate vendors. Certified engineers across Cisco, AWS, Azure, and DevOps disciplines support your team directly.", "Explore IT Services & Managed IT"],
];
const steps: [string, string, string][] = [
  ["01", "Assess", "A baseline audit of your current environment, whether that's security posture, network health, infrastructure, or IT operations."],
  ["02", "Design", "An architecture or plan mapped to your actual requirements and your sector's regulatory obligations, not a generic template."],
  ["03", "Design", "Implementation sequenced to minimize disruption to operations already in progress."],
  ["04", "Manage", "Ongoing monitoring, support, and optimization once the initial engagement is complete."],
];
const checks = ["One accountable partner across cybersecurity, networking, data center, and IT services, instead of four separate vendors who don't talk to each other.", "A Cisco Preferred Partner with certified engineers across Fortinet, Kaspersky, AWS, Azure, and DevOps disciplines, not a generalist reseller.", "Physical presence in four Pakistani cities, so deployment and support don't depend on a single remote team.", "Ten years and 250+ delivered projects, with a track record spanning every service Comtech offers, not just one."];
const faq = [["What services does Comtech Associates offer?", "Four connected practices: cybersecurity, networking and IT infrastructure, data center and cloud solutions, and IT services and managed IT. Each has its own dedicated page with full detail."], ["Does Comtech work with small and mid-size businesses, or only large enterprises?", "Yes. Engagements range from a single office LAN to a multi-city enterprise backbone, and most conversations start with a short assessment of your current environment to size the right solution."], ["Does Comtech serve clients outside Karachi?", "Yes. Comtech has offices in Karachi, Islamabad, Lahore, and Quetta, so deployment and support don't depend on a single remote team."], ["How do I get started with Comtech?", "Start with a conversation. Tell us what you're dealing with and we'll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations begin with a short assessment of your current environment."]];

export default function Services() {
  return (<main>
    <PageGlows />
    <Hero title="Your Go To Enterprise IT Solutions" text="Comtech Associates delivers four connected IT practices, cybersecurity, networking and infrastructure, data center and cloud, and managed IT, as one accountable partner across Karachi, Islamabad, Lahore, and Quetta, not four disconnected vendors." primary="Talk to an IT Consultant" secondary="Explore our Services" />
    <section className="wrap sec about-who"><div><span className="bar" /><h2 className="h2">What Services Does Comtech Associates Provide?</h2>
      <p className="lead">Comtech Associates is an enterprise IT solutions company built around four practices that work together rather than in isolation: cybersecurity, networking and IT infrastructure, data center and cloud solutions, and IT services and managed IT. Most businesses end up coordinating separate vendors for each of these. Comtech delivers all four as one accountable team, so a networking decision accounts for the security layer, and a data center migration accounts for the compliance requirements your sector already carries.</p></div>
      <Image className="about-img" src="/images/Partnership_Section_Image.png" alt="" width={568} height={568} style={{ mixBlendMode: "hard-light", opacity: 0.57 }} /></section>
    <div className="relative overflow-x-clip"><SectionGlow /><Glow className="top-[40%] -left-[220px] size-[710px]" /><Glow className="top-[52%] -right-[220px] size-[710px]" /><section className="wrap sec"><div><SecHead title="What We Have to Offer" sub="Each service below has its own dedicated page with the full breakdown of sub-services, process, and technical detail. This is the short version." />
      <div className="g2">{off.map(([t, p, b]) => (<div className="card pad-outer" key={t}><div className="card svc svc-dark"><h3 className="h3 h3-lg">{t}</h3><p>{p}</p><div><Btn href="/services">{b}</Btn></div></div></div>))}
        <div className="card pad-outer" style={{ gridColumn: "1 / -1" }}><div className="card svc svc-dark"><h3 className="h3 h3-lg">Custom Software Development</h3><p>Custom enterprise application development, legacy system modernization, API integrations, and internal tools, built and supported by the same team that manages your infrastructure, not a vendor who disappears after launch.</p><div><Btn href="/services">Explore Custom Software Development</Btn></div></div></div></div>
      <SecHead title="How We Work" sub="Every engagement, regardless of which service or combination of services is involved, follows the same four-stage process." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([n, t, p]) => (
        <div key={n} className="rounded-[30px] border border-white/10 bg-[#080808]/80 p-8 transition-colors duration-300 hover:border-[#7950e2]">
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-b from-[#5724d8] to-[#7950e2] text-lg font-bold">{n}</span>
          <h3 className="mt-5 text-[26px] leading-[38px] font-medium tracking-[-0.04em]">{t}</h3>
          <p className="mt-2 text-[18px] leading-[31px] text-white/80">{p}</p>
        </div>))}</div>
    </div></section>
    <section className="wrap sec two">
      <div><h2 className="h2">Built on Enterprise Grade Technology</h2><p>Comtech&apos;s practice runs on 15 confirmed technology partnerships, including Cisco, where Comtech holds Preferred Partner status, alongside Fortinet, Kaspersky, Sangfor, Ubiquiti, TP-Link, D-Link, HPE, H3C, Broadcom, and Dell. Which partners apply depends on the service, each pillar page lists the specific subset it&apos;s built on.</p><Btn href="/#partners">See All Technology Partnerships</Btn></div><i />
      <div><h2 className="h2">Compliance You Can Count On</h2><p>Comtech&apos;s services are built around the compliance frameworks Pakistani enterprises are actually held to, not a generic international checklist: ISO 27001, PCI DSS, HIPAA, and GDPR where relevant, plus Pakistan-specific requirements including the SBP Cybersecurity Framewor</p><Btn href="/contact">Connect With Us</Btn></div></section></div>
    <section className="wrap sec"><SecHead title={<>Here Are Some Notable Industries<br />That We Work With</>} />
      <div className="chips">{["Banking & Finance", "Healthcare", "Public Sector & Govern", "Telecom", "Education"].map((c) => <div className="chip" key={c}>{c}</div>)}</div></section>
    <section className="wrap sec why"><div><h2 className="h2">Here’s Why Comtech Is The Right Choice</h2><div className="check">{checks.map((c) => <p key={c}>{c}</p>)}</div><Btn href="/contact">Connect With Us</Btn></div>
      <div className="card stick"><Image src="/images/Section_Business_Enterprise.png" alt="" width={652} height={641} /></div></section>
    <section className="wrap sec faq"><div><h2 className="h2">Frequently<br />Asked Questions</h2><p style={{ margin: "20px 0 30px" }}>Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.</p><Btn href="/contact">Connect With Us</Btn></div>
      <Faq items={faq as [string, string][]} /></section>
    <CtaPanel title="Ready to Solve Your IT Challenge?" text="Whether it's one service or all four, a conversation with Comtech's team is the place to start. Tell us what you're dealing with, a security gap, an unreliable network, a data center migration, or a staffing shortfall, and we'll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations start with a short assessment of your current environment before anything gets proposed." label="Request an IT Assessment" />
  </main>);
}
