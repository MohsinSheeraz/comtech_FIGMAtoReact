import { GlowCard, Underline } from "@/components/PartnersUI";

/* 2x2 numbered cards (01-04): same GlowCard + number badge used on /partners/cisco
   ("Comtech + Cisco" section). Used by /industries and /industries/education. */
export function NumberedCards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-2 lg:gap-x-[46px] lg:gap-y-[48px]">
      {items.map((it, i) => (
        <GlowCard key={it.title}>
          <div className="absolute right-[24px] top-[22px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#6739DC] text-[22px] text-white md:h-[68px] md:w-[68px] lg:right-[34px] lg:top-[32px]">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="pr-[64px] text-[26px] font-normal leading-[31px] text-white md:pr-[84px]">{it.title}</h3>
          <Underline className="mt-[20px]" />
          <p className="mt-[21px] text-[18px] leading-[31px] text-white">{it.text}</p>
        </GlowCard>
      ))}
    </div>
  );
}