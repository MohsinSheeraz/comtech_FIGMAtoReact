import { PinnedFaq } from "@/components/PinnedFaq";
import { Container } from "./PartnersUI";

export function PartnersFaq({ text, items }: { text: string; items: { q: string; a: string }[] }) {
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
              <p className="mt-6 max-w-[320px] text-xs leading-5 text-white/90 md:text-[13px]">{text}</p>
            </>
          }
          items={items.map(({ q, a }): [string, string] => [q, a])}
        />
      </Container>
    </section>
  );
}
