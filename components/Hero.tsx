import Image from "next/image";
import { Btn } from "./Button";

export const Hero = ({ pill, small, title, text, primary, secondary, globe }: { pill?: string; small?: string; title: React.ReactNode; text?: string; primary: string; secondary: string; globe?: boolean }) => (
  <section className={`wrap hero ${globe ? "g" : ""}`}>
    {pill && <span className="pill">{pill}</span>}
    {small && <p className="sm">{small}</p>}
    <h1 className="h1">{title}</h1>
    {text && <p className="body">{text}</p>}
    <div className="row" style={{ marginTop: globe ? 24 : 0 }}><Btn href="/contact">{primary}</Btn><Btn v="o" href="/services">{secondary}</Btn></div>
    {globe && <Image className="globe" src="/images/Globe_hero.png" alt="" width={906} height={510} priority />}
  </section>
);

const S1 = "Networking isn't a category we dabble in; it's where Comtech was built. As a certified Cisco partner in Pakistan, we design and deploy the data network solutions and system integration that carry your business, from a single office LAN to a multi-city enterprise backbone.";
const cards = [
  { t: "Networking Infrastructure", p: S1, img: "Hand_shake" },
  { t: "Cybersecurity", p: "Cyberattacks in Pakistan aren't a someday problem; they're a Tuesday problem. As a managed security service provider and certified Cisco partner, we deliver round-the-clock, layered defense without the overhead of an in-house security team.", img: "Privacy_Protection" },
  { t: "Data Center & Cloud Solutions", p: S1, img: "Cloud_Services" },
  { t: "Custom Software Development", p: "Off-the-shelf tools eventually stop fitting how you actually work. As one of Pakistan's more established custom software development teams, we build the internal tools, platforms, and integrations that off-the-shelf software can't, and back it with the infrastructure to deploy and support what we build, end to end, under one roof.", img: "Custom_Software_development" },
  { t: "IT Services & Managed IT", p: "Most businesses juggle a staffing agency, a hardware reseller, and a break-fix vendor who don't talk to each other. Comtech delivers IT services and IT staff augmentation as one accountable team, so certified engineers, managed hardware, and after-sales support all come from the same place.", img: "IT_Management" },
];