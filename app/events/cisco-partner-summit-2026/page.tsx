import type { Metadata } from "next";
import Image from "next/image";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { EventBookingForm } from "@/components/EventBookingForm";
import { EventSchedule } from "@/components/EventSchedule";
import { Glow, PageGlows } from "@/components/Glow";
import { Hero } from "@/components/Hero";
import { NumberedCards } from "@/components/NumberedCards";
import { CardText, GlowCard } from "@/components/PartnersUI";
import { Reveal } from "@/components/Reveal";
import { SecHead } from "@/components/SecHead";
import { summit as s } from "@/lib/eventData";

export const metadata: Metadata = {
  title: "Cisco Partner Summit 2026 | Comtech Associates",
  description:
    "Comtech Associates CEO Farooq Zaheer joins Cisco’s global partner community in Vancouver, 26 to 28 October 2026. Book a meeting or interview.",
};

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";

const H2 =
  "text-[34px] font-medium leading-[42px] tracking-tighter min-[1101px]:text-[46px] min-[1101px]:leading-[54px]";
const P = "text-[18px] leading-[31px] tracking-tighter";

const Label = ({
  children,
  center,
}: {
  children: string;
  center?: boolean;
}) => (
  <div className={`mb-5 flex ${center ? "justify-center" : ""}`}>
    <span className="inline-flex h-[34px] items-center rounded-full border border-white/20 px-4 text-[14px] tracking-normal">
      {children}
    </span>
  </div>
);

export default function CiscoPartnerSummit() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        pill={s.pill}
        title={s.title}
        text={
          <>
            {s.lead}
            <br />
            {s.text}
          </>
        }
        primary="Book a Meeting"
      />

      {/* gradient frame: about + CEO + schedule + topics */}
      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: frameBg }}
      >
        {/* About the event */}
        <Reveal as="section" className="wrap sec">
          <div className="grid items-start gap-8 min-[1101px]:grid-cols-2 min-[1101px]:gap-16">
            <div>
              <Label>{s.about.label}</Label>
              <h2 className={H2}>{s.about.title}</h2>
            </div>
            <p className={P}>{s.about.text}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {s.about.facts.map((f, i) => (
              <div
                key={i}
                className="card gborder-new flex flex-col justify-center p-8"
              >
                <b className="text-[26px] font-medium leading-[34px] tracking-tighter">
                  {f.date}
                </b>
                <p className="mt-3 text-[16px] leading-[26px] tracking-tighter text-white/80">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Meet the CEO */}
        <Reveal as="section" className="wrap sec">
          <div className="grid items-center gap-10 min-[1101px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] min-[1101px]:gap-16">
            <div className="p-[18px]">
              <Image
                src={s.ceo.image}
                alt={s.ceo.name}
                width={699}
                height={659}
                className="h-auto w-full rounded-[28px] object-contain"
              />
              <p className="mt-5 text-[22px] font-medium tracking-tighter">
                {s.ceo.name}
              </p>
              <p className="text-[15px] tracking-tighter text-[#b79cff]">
                {s.ceo.role}
              </p>
            </div>
            <div>
              <Label>{s.ceo.label}</Label>
              <h2 className={H2}>{s.ceo.title}</h2>
              <span className="bar mt-8!" />
              <p className={P}>{s.ceo.text}</p>
            </div>
          </div>
        </Reveal>

        {/* Schedule */}
        <Reveal as="section" className="wrap sec">
          <Label center>{s.schedule.label}</Label>
          <SecHead title={s.schedule.title} sub={s.schedule.sub} />
          <EventSchedule days={s.schedule.days} />
          <div className="mt-10 flex justify-center">
            <Btn href="#book">Book a Meeting</Btn>
          </div>
        </Reveal>

        {/* Topics */}
        <Reveal as="section" className="wrap sec">
          <Label center>{s.topics.label}</Label>
          <SecHead title={s.topics.title} sub={s.topics.sub} />
          <NumberedCards items={s.topics.items} />
        </Reveal>
      </div>

      {/* company + impact + awards, with blue glows like the other pages */}
      <div className="relative overflow-x-clip">
        <Glow
          className="top-[8%] -left-[260px] size-[700px]"
          color="rgba(30,64,255,.4)"
        />
        <Glow
          className="bottom-[10%] -right-[260px] size-[700px]"
          color="rgba(30,64,255,.35)"
        />

        <Reveal as="section" className="wrap sec mt-16!">
          <div className="grid items-center gap-10 min-[1101px]:grid-cols-2 min-[1101px]:gap-16">
            <div>
              <Label>{s.company.label}</Label>
              <h2 className={H2}>{s.company.title}</h2>
              <span className="bar mt-8!" />
              <p className={P}>{s.company.text}</p>
            </div>
            <div className="card rounded-[35px]! p-[18px]">
              <Image
                src={s.company.image}
                alt={s.company.imageCaption}
                width={597}
                height={346}
                className="h-auto w-full rounded-[28px]"
              />
              <p className="mt-4 text-center text-[15px] tracking-tighter text-white/70">
                {s.company.imageCaption}
              </p>
            </div>
          </div>

          <h3 className="mt-16 text-center text-[30px] font-medium leading-[38px] tracking-tighter">
            What Comtech Delivers
          </h3>
          <div className="chips mt-8">
            {s.company.delivers.map((c) => (
              <div className="chip gborder-new" key={c}>
                {c}
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-x-[46px]">
            {s.company.cards.map((c) => (
              <GlowCard key={c.title}>
                <CardText title={c.title} text={c.text} />
              </GlowCard>
            ))}
          </div>
          <div className="mt-10">
            <Btn href="#book">Book an Interview</Btn>
          </div>
        </Reveal>

        <Reveal as="section" className="wrap sec mt-10!">
          <div className="mx-auto max-w-[900px] text-center">
            <Label center>{s.impact.label}</Label>
            <h2 className={H2}>{s.impact.title}</h2>
            <p className={`${P} mt-6`}>{s.impact.text}</p>
          </div>
        </Reveal>

        <Reveal as="section" className="wrap sec">
          <Label center>{s.awards.label}</Label>
          <SecHead title={s.awards.title} />
          <div className="awards">
            {s.awards.items.map(([y, t]) => (
              <div className="card gborder-new" key={t}>
                <b>{y}</b>
                <p>{t}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Book a meeting */}
      <section id="book" className="wrap sec scroll-mt-6">
        <div className="grid items-start gap-12 min-[1101px]:grid-cols-[minmax(0,1fr)_minmax(0,754px)] min-[1101px]:gap-[60px]">
          <div>
            <Label>{s.book.label}</Label>
            <h2 className={H2}>{s.book.title}</h2>
            <span className="bar mt-8!" />
            <p className={`${P} max-w-[560px]`}>{s.book.text}</p>
            <div className="mt-8 space-y-3 text-[18px] leading-[28px] tracking-tighter">
              <p>{s.book.when}</p>
              <p className="max-w-[460px]">{s.book.where}</p>
            </div>
          </div>
          <EventBookingForm />
        </div>
      </section>

      <CtaPanel
        title="Meet Comtech’s CEO In Vancouver"
        text="Twenty-six to twenty-eight October. One conversation could be all it takes."
        label="Book an Interview"
      />
    </main>
  );
}
