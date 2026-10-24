import type { Metadata } from "next";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { PageGlows } from "@/components/Glow";
import { PinnedFaq } from "@/components/PinnedFaq";
import { SecHead } from "@/components/SecHead";
import { Stats } from "@/components/Stats";
import { NumberedCards } from "@/components/NumberedCards";

export const metadata: Metadata = {
  title: "Education IT Services | Comtech Associates",
  description:
    "Comtech delivers IT services for the education industry: campus-wide connectivity, cybersecurity, and managed IT support for schools, colleges, and universities.",
};

/* ---------- content (copy is exactly as in the Figma) ---------- */

const stats: [string, string][] = [
  ["5,000+", "Students on One Comtech-Built Campus Network"],
  ["Wi-Fi 6", "Coverage"],
  ["250+", "Projects Delivered"],
  ["4 Cities", "Nationwide"],
];

// TODO: the 3rd card repeats the 2nd in the Figma (placeholder), replace with the final copy.
const running: [React.ReactNode, string][] = [
  [
    <>
      Wi-Fi That Reaches <br /> Every Block, Hostel, and Lab
    </>,
    "Coverage is the first thing students notice and the last thing they forgive. Comtech designs campus networks by density, not just floor area, so a full lecture hall gets the same connection as an empty corridor.",
  ],
  [
    <>
      Cybersecurity for an <br /> Open Campus
    </>,
    "Campuses are open by design, with thousands of personal devices on the same network. Cybersecurity solutions for education protect student records, research, and administration without locking the network down. That’s the real challenge behind higher education cybersecurity, and cyber security issues in higher education rarely look like a corporate office’s.",
  ],
  [
    <>
      Cybersecurity for an <br /> Open Campus
    </>,
    "Campuses are open by design, with thousands of personal devices on the same network. Cybersecurity solutions for education protect student records, research, and administration without locking the network down. That’s the real challenge behind higher education cybersecurity, and cyber security issues in higher education rarely look like a corporate office’s.",
  ],
];

const steps: [string, string, string][] = [
  ["01", "We Survey", "A walk-through of buildings, hostels, and labs to map where people actually connect."],
  ["02", "We Plan", "Coverage and capacity designed around your headcount and your budget."],
  ["03", "We Install", "Scheduled around timetables and breaks, so teaching isn’t interrupted."],
  ["04", "We Support", "Ongoing monitoring and help when something goes down on a Monday morning."],
];

const why = [
  { title: "Proven at Campus Scale", text: "A live deployment serving 5,000+ students, not a small-office pilot." },
  { title: "Built for Lean IT Teams", text: "Managed support that works alongside the staff you already have." },
  { title: "One Partner for Network and Security", text: "Wi-Fi, switching, and cybersecurity from one team, so nothing falls between vendors." },
  { title: "Nearby in Four Cities", text: "Karachi, Islamabad, Lahore, and Quetta, so support arrives in person." },
];

// TODO: answers 2-4 were not in the design; drafted from the page copy, replace with final copy.
const faq: [string, string][] = [
  [
    "Can Comtech run our IT as an outsourced service?",
    "Yes. Comtech provides managed IT, helpdesk, and on-site desktop support for institutions that want outsourced IT services instead of building a large in-house team. Many institutions keep a small team and add Comtech for coverage.",
  ],
  [
    "Can one Wi-Fi network handle thousands of students?",
    "Yes, when it is designed for density rather than floor area. Comtech plans campus Wi-Fi around how many people connect in each space, and one live Comtech-built campus network serves 5,000+ students.",
  ],
  [
    "How do you secure a network that students bring their own devices to?",
    "Campuses are open by design, so security is built to protect student records, research, and administration without locking the network down. We scope the details to your campus during the assessment.",
  ],
  [
    "Do you work with schools as well as universities?",
    "Yes. Schools get setups that are simple to run and hard to break, without needing a full-time IT team. Colleges and universities get campus-scale networks and cybersecurity built for an open, always-busy environment.",
  ],
];

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";

const bandB =
  "linear-gradient(179.11deg, rgba(4, 4, 4, 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgba(4, 4, 4, 0) 99.23%)";

const H2 = "text-[46px] font-medium leading-[54px] tracking-tighter";

export default function Education() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={
          <>
            Campus IT That Works When
            <br />
            Everyone Logs On at Once
          </>
        }
        text="Comtech delivers IT services for the education industry: campus-wide connectivity, cybersecurity, and managed IT support for schools, colleges, and universities."
        primary="Request a Campus IT Assessment"
        secondary="Explore our Services"
      />

      <Stats items={stats} />

      {/* One Page, Two Kinds of Campus */}
      <section className="wrap sec mt-16">
        <SecHead
          title="One Page, Two Kinds of Campus"
          sub="A school and a university don’t need the same IT. Comtech builds for both."
        />
        <div className="two">
          <div className="flex flex-col">
            <h2 className="h2 text-[34px]! leading-[44px]! tracking-tighter!">Schools</h2>
            <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">
              IT solutions for schools that are simple to run and hard to break. Reliable classroom Wi-Fi, safe student
              networks, and IT services for schools that don’t need a full-time IT team on staff.
            </p>
            <div className="mt-auto">
              <Btn v="o" href="/partners">
                See All Technology Partnerships
              </Btn>
            </div>
          </div>

          <i />

          <div className="flex flex-col min-[1101px]:ml-10">
            <h2 className="h2 text-[34px]! leading-[44px]! tracking-tighter!">Colleges and Universities</h2>
            <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">
              IT solutions for the education industry at campus scale: thousands of students, hostels, labs, and
              research networks, with cybersecurity for higher education built around an open, always-busy environment.
            </p>
            <div className="mt-auto">
              <Btn v="o" href="/contact">
                Connect With Us
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* gradient frame: what keeps a campus running + how we work + why */}
      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: frameBg }}
      >
        <section className="wrap sec">
          <SecHead title="What Keeps a Campus Running" />
          <div className="grid gap-5 min-[1101px]:grid-cols-3 min-[1101px]:gap-[2.4%]">
            {running.map(([t, p], i) => (
              <div key={i} className="card pad-outer bg-[#080808]! p-4!">
                <div className="card svc svc-dark gborder-new h-full bg-[#0f0826]! p-4! sm:p-8!">
                  <h3 className="h3 h3-lg text-[26px]! leading-[38px]! tracking-tighter!">{t}</h3>
                  <span className="bar mt-2! mb-2!" />
                  <p className="text-[18px]! leading-[31px]! font-normal! tracking-tighter!">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap sec">
          <SecHead title="How We Get Your Campus Connected" />
          <HowWeWork steps={steps} />
        </section>

        <section className="wrap sec">
          <SecHead
            title="Why Education Teams Choose Comtech"
            sub="Campus IT isn’t glamorous until it fails. Comtech makes sure it doesn’t."
          />
          <NumberedCards items={why} />
        </section>
      </div>

      {/* FAQ band */}
      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] py-10"
        style={{ background: bandB }}
      >
        <section className="wrap sec">
          <PinnedFaq
            pin="bottom"
            items={faq}
            head={
              <>
                <h2 className={H2}>
                  Education IT, Straight
                  <br />
                  Answers
                </h2>
                <p className="mt-5">
                  Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
                </p>
              </>
            }
          />
        </section>
      </div>

      <CtaPanel
        title="Ready for a Campus That Just Works?"
        text="A walk-through maps your buildings, users, and budget before anything is proposed."
        label="Request a Campus IT Assessment"
      />
    </main>
  );
}
