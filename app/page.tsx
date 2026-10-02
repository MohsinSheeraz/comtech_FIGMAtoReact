import Image from "next/image";
import { Btn } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { PageGlows } from "@/components/Glow";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { CtaPanel } from "@/components/CtaPanel";
import { CeoQuote } from "@/components/CeoQuote";
import { ServiceCard, StatementCard } from "@/components/ServiceCard";
import { services } from "@/lib/services";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { PartnerSlider } from "@/components/PartnerSlider";

const why: [string, string][] = [
  [
    "One Partner, Not Five Vendors",
    "Networking, security, infrastructure, and software- under one accountable team, not stitched together across vendors who point fingers when something breaks.",
  ],
  [
    "Compliance-Aligned by Design",
    "Our security and infrastructure practices align with ISO 27001, PCI DSS, HIPAA, and GDPR standards — built for regulated industries like banking and healthcare, where compliance isn't optional.",
  ],
  [
    "We Stay After Go-Live",
    "Deployment is the beginning, not the finish line. Our after-sales support, extended warranty programs, and managed services mean we're still answering the phone a year in.",
  ],
  [
    "Built for Pakistan's Business Reality",
    "With over a decade of navigating what enterprise IT actually looks like in Karachi, Islamabad, Lahore, and Quetta.",
  ],
  [
    "A 24/7 Security Operations Center",
    "Round-the-clock monitoring and threat response, security that doesn't clock out when your office does.",
  ],
  [
    "A Decade of Proof 250+",
    "successful deployments across banking, telecom, healthcare, government, and industry, for clients who don't get second chances when infrastructure fails.",
  ],
  [
    "Certified Where It Counts",
    "Cisco, Fortinet, Huawei, Dell, HPE, and Kaspersky, among others, have confirmed technology partnerships — real certifications, not just logos on a page.",
  ],
];
const ind: [string, string][] = [
  [
    "Banking & Financial Services",
    "Network, security, and infrastructure services built for institutions where uptime and compliance aren't optional.",
  ],
  [
    "Telecommunications",
    "Carrier-grade networking and infrastructure support for operators who can't afford a dropped connection.",
  ],
  [
    "Healthcare",
    "Compliant, always-on systems that protect patient data and keep critical care operations running without interruption.",
  ],
  [
    "Government & Public Sector",
    "Secure, standards-aligned infrastructure built for the scale and accountability public sector operations demand.",
  ],
  [
    "Education",
    "Reliable, campus-wide connectivity and IT support that keeps classrooms, labs, and administration running smoothly.",
  ],
  [
    "Retail & E-commerce",
    "Connected, secure infrastructure across multiple locations, so operations stay consistent.",
  ],
];

export default function Home() {
  return (
    <main>
      <PageGlows />
      <Hero
        pill="16+ Technology Partners"
        small="Pakistan Trusted It Solutions Providers for"
        title={
          <>
            Networking, Cybersecurity
            <br />
            &amp; Data Centers
          </>
        }
        primary="Connect with Us"
        secondary="Explore our Services"
        globe
      />
      <h2
        className="h2 wrap h2-lead"
      >
        A Decade of Building Pakistan&apos;s Digital Backbone
      </h2>
      <Stats />
      <section className="wrap sec">
        <div className="split">
          <div className="card big">
            <h2 className="h2">We’re Not Just an IT Vendor</h2>
            <h2 className="h2 gt">We’re Your Infrastructure Partner!</h2>
            <span className="bar" />
            <p>
              Every business today runs on its network, the invisible layer of
              switches, servers, firewalls, and connections that decide whether
              your operations move at the speed of your ambition, or grind to a
              halt at the worst possible moment.
            </p>
            <p>
              Comtech Associates has spent over a decade building that layer for
              some of Pakistan&apos;s most demanding organizations. We are a
              full-spectrum IT solutions company specializing in enterprise
              networking, system integration, managed cybersecurity, IT
              infrastructure, and custom software development, engineered not as
              isolated services, but as one connected ecosystem built around how
              your business actually operates.
            </p>
            <div className="row" style={{ marginTop: 30 }}>
              <Btn href="/contact">Connect with Us</Btn>
              <Btn v="o" href="/services">
                Explore our Services
              </Btn>
            </div>
          </div>
          <div className="side">
            <div className="purple">
              IT infrastructure isn&apos;t four separate problems; it&apos;s one
              system.
            </div>
            <Image
              src="/images/Hand_shake_two.png"
              alt=""
              width={490}
              height={323}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="panel pan-a">
        <div className="wrap">
          <SecHead
            title="What We Do"
            sub="We work across four connected disciplines because modern IT infrastructure isn't four separate problems;
             it's one system."
            cta
          />
          <div className="g3">
            {services.map((c) => (
              <ServiceCard className="gborder" key={c.t} {...c} />
            ))}
            <StatementCard />
          </div>
          <SecHead
            className="mt-16 min-[1101px]:mt-40"
            title="What Drives Us"
            sub="The purpose behind every network we build, every system we secure, and every partnership we keep. "
            cta
          />
          <Image
            className="strip mb-10 min-[1101px]:mb-20"
            src="/images/Group_12.png"
            alt=""
            width={1230}
            height={346}
          />
          <div className="mv mb-10 min-[1101px]:mb-40">
            <div>
              <h2>Mission</h2>
              <p>
                We deliver reliable networking, security, and IT solutions by
                integrating technical expertise, innovation, and exceptional
                service to build lasting partnerships and enable sustainable
                business growth.
              </p>
            </div>
            <i className="gborder w-[0.5px]" />
            <div className="min-[1101px]:pl-10">
              <h2>Vision</h2>
              <p>
                To be a trusted leader in network and IT solutions, enabling
                digital transformation through innovative, secure, and scalable
                technologies that empower business growth and long-term
                success.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec why">
        <div>
          <h2 className="h2">
            Why Businesses Choose Comtech as Their Enterprise IT Solutions
            Provider
          </h2>
          <Btn v="p" href="/contact">
            Get in touch
          </Btn>
          <div className="stack">
            {why.map(([t, p], i) => (
              <div className="card " key={t}>
                <div className={`in gborder ${i === 0 ? "gborder" : ""}`}>
                  <h3 className="h3">{t}</h3>
                  <p>{p}</p>
                  <Btn href="/contact">Connect with Us</Btn>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card stick">
          <Image
            src="/images/Section_Business_Enterprise.png"
            alt=""
            width={652}
            height={641}
          />
        </div>
      </section>

      <section className="wrap sec">
        <div className="card ind">
          <SecHead
            title="Trusted Across Pakistan's Most Regulated & Demanding Sectors"
            cta
          />
          <div className="g3">
            {ind.map(([t, p], i) => (
              <div
                className={`gborder card ${i === 0 ? "f" : i % 2 ? "v" : ""}`}
                key={t}
              >
                <h3 className="h3">{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CeoQuote title="A Message from Our CEO" />

      <section
        id="partners"
        className="panel pan-b"
      >
        <div className="wrap">
          <SecHead title="Backed by the Brands the World Trusts" />
        </div>
        <PartnerSlider />
        <div className="wrap">
          <TestimonialCarousel />
        </div>
      </section>

      <CtaPanel
        title="Ready to Strengthen Your IT Infrastructure?"
        text="Whether you need networking, cybersecurity, or infrastructure support: Comtech is ready to help. Serving businesses across Karachi, Islamabad, Lahore, Quetta, and everywhere in between."
        label="Connect with Us"
      />
    </main>
  );
}
