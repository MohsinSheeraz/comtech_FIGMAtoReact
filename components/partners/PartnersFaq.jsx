import { PinnedFaq } from "@/components/PinnedFaq";
import { faq } from "@/lib/partnersDatas";
import { Container } from "./ui";

export default function PartnersFaq() {
  return (
    <section className="mt-20 py-20">
      <Container>
        <PinnedFaq
          head={
            <>
              <h2 className="text-3xl font-normal leading-tight text-white md:text-4xl lg:text-[40px]">
                Frequently
                <br />
                Asked Questions
              </h2>
              <p className="mt-6 max-w-[320px] text-xs leading-5 text-white/90 md:text-[13px]">
                {faq.text}
              </p>
            </>
          }
          items={faq.items.map(({ q, a }): [string, string] => [q, a])}
        />
      </Container>
    </section>
  );
}
