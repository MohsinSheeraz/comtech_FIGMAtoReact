import Image from "next/image";
import { Hero } from "@/components/Hero";
import { PageGlows, Glow } from "@/components/Glow";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { CtaPanel } from "@/components/CtaPanel";
import { CeoQuote } from "@/components/CeoQuote";
import { ServiceCard, StatementCard } from "@/components/ServiceCard";
import { services } from "@/lib/services";

const mv = [
  [
    "Mission",
    '"To deliver reliable networking, security, and IT solutions by integrating technical expertise, innovation, and exceptional service." ',
  ],
  [
    "Vision",
    '"To be a trusted leader in network and IT solutions, enabling digital transformation through innovative, secure, and scalable technologies.”',
  ],
];
const awards: [string, string][] = [
  ["2024", "Cisco SMB Emerging Partner of the Year"],
  ["2025", "Cisco SMB Partner Award"],
  ["2025", "Cisco Individual Excellence Award"],
  ["2025", "Fortinet Select Champions Award"],
  ["25+", "Vendor Awards Total"],
];

// Gradient frame behind Who We Are -> Mission/Vision -> What We Do
const frameBg =
  "linear-gradient(180deg, #040404 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";

export default function About() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        className="p-40! mt-14!"
        title="About Comtech Associates"
        text={
          <>
            Comtech Associates has spent over a decade building the networking,
            security, and infrastructure
            <br />
            that Pakistan&apos;s banks, hospitals, and enterprises run on.
          </>
        }
        primary="Connect with Us"
        secondary="Explore our Services"
      />

      {/* Gradient frame: Who We Are + Mission/Vision + What We Do */}
      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px]"
        style={{ background: frameBg }}
      >
        <section className="wrap sec about-who">
          <div>
            <h2 className="h2 text-[46px] leading-[54px] tracking-tighter">Who We Are</h2>
            <span className="bar mt-8!" />
            <p className="text-[24px] leading-[38px] tracking-tighter">
              Comtech Associates has spent over a decade building the networking,
              security, and infrastructure that Pakistan&apos;s banks, hospitals,
              and enterprises run on. As a certified Cisco partner, we deliver
              cybersecurity, networking, data center, and managed IT as one
              connected practice. We design it, secure it, and manage it, for as
              long as our clients need us to.{" "}
            </p>
          </div>
          <Image
            className="about-img"
            src="/images/Partnership_Section_Image.png"
            alt=""
            width={568}
            height={568}
            style={{ mixBlendMode: "hard-light", opacity: 0.57 }}
          />
        </section>

        <section className="wrap mt-20!">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            {mv.map(([t, p]) => (
              <div className="card pad-outer h-full" key={t}>
                <div className="gborder-new card svc svc-dark h-full p-16!">
                  <h2 className="h2 h2-lg">{t}</h2>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap sec mt-24!">
          <SecHead
            title="What We Do"
            sub="We work across four connected disciplines because modern IT infrastructure isn't four separate problems; it's one system."
            cta
          />
          <div className="g3 ">
            {services.map((c) => (
              <ServiceCard className="gborder-new bg-transparent!" key={c.t} {...c} />
            ))}
            <StatementCard />
          </div>
        </section>
      </div>

      <div className="relative overflow-x-clip">
        <Glow className="bottom-[8%] -left-[150px] size-[600px]" />
        <Stats className="my-36! " />
        <CeoQuote title="The Faces Behind The Work" />
      </div>

      <section className="wrap sec mt-20!">
        <SecHead title="Awards & Recognition" />
        <div className="awards">
          {awards.map(([a, b]) => (
            <div className="card gborder-new" key={b}>
              <b>{a}</b>
              <p>{b}</p>
            </div>
          ))}
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