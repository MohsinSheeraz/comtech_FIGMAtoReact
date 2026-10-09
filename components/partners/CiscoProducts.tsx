import { products } from "../../lib/partnersData";
import { BORDER_GRADIENT, Container, PrimaryButton, SectionHeading, SectionIntro } from "./ui";

type Item = (typeof products.items)[number];

function ProductCard({ item }: { item: Item }) {
  return (
    <article className="rounded-[28px] p-px" style={{ background: BORDER_GRADIENT }}>
      <div className="h-full rounded-[27px] bg-surface px-[24px] pb-[24px] pt-[32px] lg:px-[38px] lg:pb-[38px] lg:pt-[46px]">
        <h3 className="text-[26px] font-normal leading-[31px] text-fg">{item.title}</h3>
        <p className="mt-4 min-h-[93px] text-[18px] leading-[31px] text-fg">{item.text}</p>
        {/* image box: images are shown at natural size (1:1 with Figma), centred, never clipped */}
        <div className="relative mt-[29px] h-[206px] rounded-[30px] border border-card3 bg-surface">
          <img
            src={item.image}
            alt={item.alt}
            width={item.width}
            style={{ width: item.width, maxWidth: "none" }}
            className="absolute left-1/2 top-1/2 h-auto -translate-x-1/2 -translate-y-1/2"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}

export default function CiscoProducts() {
  return (
    <section className="relative pb-0 pt-16 lg:pt-[8px]">
      <Container>
        <SectionHeading>{products.title}</SectionHeading>
        <SectionIntro intro={products.intro} className="mt-4 lg:mt-[32px]" />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-[53px] lg:grid-cols-3 lg:gap-x-[33px] lg:gap-y-[28px]">
          {products.items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:mt-[66px]">
          <PrimaryButton href={products.cta.href}>{products.cta.label}</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
