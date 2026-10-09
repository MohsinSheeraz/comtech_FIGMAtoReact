import { partnership } from "../../lib/partnersData";
import { CardText, Container, GlowCard, SectionIntro } from "./ui";

export default function TrustedPartnership() {
  return (
    <section className="relative pb-16 pt-20 lg:pb-0 lg:pt-[118px]">
      <Container>
        <h2 className="text-center text-[40px] font-normal leading-[1.15] text-fg md:text-[52px] lg:text-[64px] lg:leading-[75px]">
          {partnership.titleTop}
          <br />
          <span
            className="text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg,#F1F3FC,#AEBCF8)", WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            {partnership.titleBottom}
          </span>
        </h2>
        <SectionIntro intro={partnership.intro} className="mt-4 lg:mt-[28px]" />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-[59px] lg:gap-x-[46px] lg:gap-y-[48px]">
          {partnership.items.map((it) => (
            <GlowCard key={it.number}>
              <span className="absolute right-[24px] top-[22px] flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#6739DC] text-[22px] text-white lg:right-[34px] lg:top-[32px]">
                {it.number}
              </span>
              <CardText title={it.title} text={it.text} />
            </GlowCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
