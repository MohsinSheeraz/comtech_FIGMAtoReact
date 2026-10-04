import { credentials } from "../../lib/partnersDatas";
import { Container } from "./ui";

export default function Credentials() {
  return (
    <section className="pb-10 pt-10 lg:pb-0 lg:pt-0">
      <Container className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0">
        <div className="lg:w-[700px]">
          <h2 className="text-[34px] font-normal leading-[1.15] text-white lg:mt-[9px] lg:text-[48px] lg:leading-[56px]">
            {credentials.title}
          </h2>
          <span className="mt-6 block h-1 w-[86px] rounded-full bg-[#6739DD] lg:mt-[35px]" />
          <div className="mt-8 space-y-6 text-[18px] leading-[30px] text-white lg:mt-[38px] lg:space-y-[38px] lg:text-[24px] lg:leading-[38px]">
            {credentials.blocks.map((b, i) => (
              <p key={i}>
                {b.heading}
                <br />
                {b.text}
              </p>
            ))}
          </div>
        </div>

        <div className="w-full rounded-[40px] border border-[#262626] bg-[#080808] p-5 lg:h-[560px] lg:w-[640px] lg:shrink-0">
          <img
            src={credentials.image}
            alt={credentials.imageAlt}
            className="block h-full w-full rounded-[28px] border border-white/30 object-cover"
            loading="lazy"
          />
        </div>
      </Container>
    </section>
  );
}
