import type { Metadata } from "next";
import Image from "next/image";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { PageGlows } from "@/components/Glow";
import { Hero } from "@/components/Hero";
import { events, eventsHero } from "@/lib/eventData";

export const metadata: Metadata = {
  title: "Events | Comtech Associates",
  description: "Summits, expos and conversations where Comtech Associates meets its partners and customers.",
};

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";

export default function Events() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        logos={false}
        title={eventsHero.title}
        text={eventsHero.text}
        primary="Talk to an IT Consultant"
        secondary="Explore our Services"
      />

      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-10"
        style={{ background: frameBg }}
      >
        <section className="wrap sec">
          <div className="grid grid-cols-1 gap-x-[33px] gap-y-14 min-[700px]:grid-cols-2 min-[1101px]:grid-cols-3">
            {events.map((e) => (
              <article
                key={e.slug}
                className="group flex flex-col rounded-[30px] border border-gray-700 p-6 transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <div className="gborder-new relative block overflow-hidden rounded-[30px]">
                  <Image src={e.image} alt={e.title} width={597} height={346} className="h-auto w-full" />
                </div>
                <p className="mt-10 text-[14px] leading-[20px] tracking-normal">Date: {e.date}</p>
                <h3 className="mt-4 text-[26px] font-medium leading-[34px] tracking-tighter">{e.title}</h3>
                <p className="mt-4 line-clamp-3 text-[18px]! leading-[31px]! tracking-tighter!">{e.excerpt}</p>
                <div className="mt-8">
                  {e.live ? (
                    <Btn v="o" href={`/events/${e.slug}`}>
                      Explore More
                    </Btn>
                  ) : (
                    <span aria-disabled="true" className="btn o cursor-not-allowed opacity-40">
                      Coming soon
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <CtaPanel
        title="Ready to Solve Your IT Challenge?"
        text="Whether it’s one service or all four, a conversation with Comtech’s team is the place to start. Tell us what you’re dealing with, a security gap, an unreliable network, a data center migration, or a staffing shortfall, and we’ll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations start with a short assessment of your current environment before anything gets proposed."
        label="Request an IT Assessment"
      />
    </main>
  );
}