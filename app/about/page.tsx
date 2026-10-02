import Image from "next/image";
import { Hero } from "@/components/Hero";
import { PageGlows, Glow, SectionGlow } from "@/components/Glow";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { CtaPanel } from "@/components/CtaPanel";
import { CeoQuote } from "@/components/CeoQuote";
import { ServiceCard, StatementCard } from "@/components/ServiceCard";
import { services } from "@/lib/services";

const mv = [["Mission", "\"To deliver reliable networking, security, and IT solutions by integrating technical expertise, innovation, and exceptional service.\" "], ["Vision", "\"To be a trusted leader in network and IT solutions, enabling digital transformation through innovative, secure, and scalable technologies.”"]];
const awards: [string, string][] = [["2024", "Cisco SMB Emerging Partner of the Year"], ["2025", "Cisco SMB Partner Award"], ["2025", "Cisco Individual Excellence Award"], ["2025", "Fortinet Select Champions Award"], ["25+", "Vendor Awards Total"]];

export default function About() {
  return (<main>
    <PageGlows />
    <Hero title="About Comtech Associates" text="Comtech Associates has spent over a decade building the networking, security, and infrastructure that Pakistan's banks, hospitals, and enterprises run on." primary="Connect with Us" secondary="Explore our Services" />
    <section className="wrap sec about-who"><div><span className="bar" /><h2 className="h2">Who We Are</h2>
      <p>Comtech Associates has spent over a decade building the networking, security, and infrastructure that Pakistan&apos;s banks, hospitals, and enterprises run on. As a certified Cisco partner, we deliver cybersecurity, networking, data center, and managed IT as one connected practice. We design it, secure it, and manage it, for as long as our clients need us to. </p></div>
      <Image className="about-img" src="/images/Partnership_Section_Image.png" alt="" width={568} height={568} style={{ mixBlendMode: "hard-light", opacity: 0.57 }} /></section>
    <section className="wrap"><div className="grid gap-6 md:gap-10 md:grid-cols-2">{mv.map(([t, p]) => (
      <div className="card pad-outer" key={t}><div className="gborder card svc svc-dark"><h2 className="h2 h2-lg">{t}</h2><p>{p}</p></div></div>))}</div></section>

    <div className="relative mt-16 overflow-x-clip">
      <SectionGlow />
      <Glow className="bottom-[8%] -left-[150px] size-[600px]" />
      <section className="wrap sec"><SecHead title="What We Do" sub="We work across four connected disciplines because modern IT infrastructure isn't four separate problems; it's one system." cta />
        <div className="g3 ">{services.map((c) => <ServiceCard className="gborder" key={c.t} {...c} />)}<StatementCard /></div></section>
      <Stats />
      <CeoQuote title="The Faces Behind The Work" />
    </div>
    <section className="wrap sec"><SecHead title="Awards & Recognition" /><div className="awards">{awards.map(([a, b]) => (<div className="card gborder" key={b}><b>{a}</b><p>{b}</p></div>))}</div></section>
    <CtaPanel title="Ready to Strengthen Your IT Infrastructure?" text="Whether you need networking, cybersecurity, or infrastructure support: Comtech is ready to help. Serving businesses across Karachi, Islamabad, Lahore, Quetta, and everywhere in between." label="Connect with Us" />
  </main>);
}
