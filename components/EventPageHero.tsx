import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function EventPageHero({
  title,
  text,
  lead,
  eyebrow,
  image,
  compactTitle = false,
  href,
  buttonLabel,
}: {
  title: ReactNode;
  text: string;
  lead?: string;
  eyebrow?: string;
  image?: string;
  compactTitle?: boolean;
  href: string;
  buttonLabel: string;
}) {
  return (
    <section className="relative isolate min-h-[650px] overflow-hidden bg-[#06172b] md:min-h-[780px]">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[center_45%]"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[440px] left-1/2 -z-10 size-[min(1000px,140vw)] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 20%, #7fc9ff 0%, #216ec4 22%, #102e65 54%, #071326 76%)",
            boxShadow: "inset 0 0 90px rgba(67, 175, 255, .4), 0 0 100px rgba(20, 107, 225, .18)",
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#06172b]/30 via-[#06172b]/70 to-[#040404]"
      />
      <div className="wrap relative z-10 flex min-h-[650px] flex-col items-center justify-center py-20 text-center md:min-h-[780px]">
        {eyebrow && (
          <p className="mb-6 rounded-full bg-[#2ab9e8] px-7 py-2 text-[14px] font-medium leading-6 tracking-normal text-[#04101c] sm:text-[16px]">
            {eyebrow}
          </p>
        )}
        <h1
          className={`max-w-[1050px] text-[38px] font-semibold leading-[1.12] tracking-tight ${
            compactTitle
              ? "sm:text-[42px] md:text-[44px] lg:text-[64px]"
              : "sm:text-[52px] md:text-[64px]"
          }`}
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-7 max-w-[920px] text-[17px] font-bold leading-[27px] tracking-normal sm:text-[18px]">
            {lead}
          </p>
        )}
        <p className="mt-5 max-w-[920px] text-[16px] leading-[27px] tracking-normal text-white/90 sm:text-[18px] sm:leading-[31px]">
          {text}
        </p>
        <Link
          href={href}
          className="mt-8 inline-flex min-h-[46px] items-center justify-center rounded-[9px] bg-[#2ab9e8] px-6 py-3 text-[16px] font-medium tracking-normal text-[#04101c] transition-colors hover:bg-[#6bd6f5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
