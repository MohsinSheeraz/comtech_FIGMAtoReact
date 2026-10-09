import { cta } from "../../lib/partnersDatas";
import { Container, PrimaryButton } from "./ui";

export default function CtaBanner() {
  return (
    <section className="pb-16 pt-12 lg:pb-[125px] lg:pt-[161px]">
      <Container>
        <div
          className="rounded-[48px] border border-line2 px-6 py-12 text-center lg:rounded-[80px] lg:px-16 lg:py-[81px]"
          style={{ background: "linear-gradient(180deg,var(--bg) 0%,var(--cta-a) 85%,var(--cta-b) 100%)" }}
        >
          <h2 className="text-[30px] font-normal leading-[1.2] text-fg lg:text-[48px] lg:leading-[56px]">{cta.title}</h2>
          <p className="mx-auto mt-5 max-w-[990px] text-[16px] leading-7 text-fg lg:mt-[27px] lg:text-[18px] lg:leading-[38px]">{cta.text}</p>
          <div className="mt-8 flex justify-center lg:mt-[39px]">
            <PrimaryButton href={cta.button.href}>{cta.button.label}</PrimaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
