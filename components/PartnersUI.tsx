import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Props = { className?: string; children?: ReactNode };

// Same vertical border gradient used by every card on the Partners page (grey top -> violet bottom).
export const BORDER_GRADIENT = "linear-gradient(180deg,var(--line) 0%,#7950E1 100%)";

export function Container({ className = "", children }: Props) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-0 ${className}`}>{children}</div>;
}

export function Underline({ className = "" }: { className?: string }) {
  return <span className={`block h-[5px] w-[74px] rounded-full bg-[#6739DD] ${className}`} />;
}

export function SectionHeading({ children, className = "" }: Props) {
  return (
    <h2 className={`text-center text-[40px] font-normal leading-[1.15] text-fg md:text-[52px] lg:text-[64px] lg:leading-[75px] ${className}`}>
      {children}
    </h2>
  );
}

// Intro paragraph under section headings. Plain string, or { a, b } for two lines on desktop.
export function SectionIntro({ intro, className = "" }: { intro: string | { a: string; b: string }; className?: string }) {
  return (
    <p className={`mx-auto max-w-[1120px] text-center text-[16px] leading-7 text-fg lg:text-[18px] lg:leading-[32px] ${className}`}>
      {typeof intro === "string" ? (
        intro
      ) : (
        <>
          {intro.a} <br className="hidden lg:block" />
          {intro.b}
        </>
      )}
    </p>
  );
}

// Black frame -> gradient hairline border -> dark card ("What We Deliver" and "Comtech + Cisco").
export function GlowCard({ className = "", style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`rounded-[32px] border border-line bg-card p-[10px] ${className}`} style={style}>
      <div className="h-full rounded-[24px] p-px" style={{ background: BORDER_GRADIENT }}>
        <div className="relative h-full rounded-[23px] px-[32px] pb-[41px] pt-[54px]" style={{ background: "linear-gradient(180deg,var(--card2) 0%,var(--card4) 100%)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function CardText({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h3 className="text-[26px] font-normal leading-[31px] text-fg">{title}</h3>
      <Underline className="mt-[20px]" />
      <p className="mt-[21px] text-[18px] leading-[31px] text-fg">{text}</p>
    </>
  );
}

// Long purple panels behind sections. Positions/heights are the Figma values (1920 canvas).
export function PurplePanel({ variant, children }: { variant: "top" | "bottom"; children?: ReactNode }) {
  const top = variant === "top";
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute -z-10 overflow-hidden",
        "inset-x-0 inset-y-0 lg:inset-y-auto",
        top ? "lg:left-[5.104%] lg:w-[91.875%] lg:top-[17px] lg:h-[2274px]" : "lg:left-[4.01%] lg:w-[91.875%] lg:bottom-[188px] lg:h-[1750px]",
      ].join(" ")}
      style={{
        background: top
          ? "linear-gradient(180deg, var(--bg) 8.06%, rgba(69, 22, 187, 0.42) 43.03%, var(--bg) 80.62%)"
          : "linear-gradient(179.11deg, rgb(var(--bg-rgb) / 0) 10.61%, rgba(69, 22, 187, 0.36) 53.31%, rgb(var(--bg-rgb) / 0) 99.23%)",
      }}
    >
      {children}
    </div>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex h-[46px] min-w-[209px] items-center justify-center rounded-lg bg-inv px-6 font-normal text-inv-fg! transition">
      {children}
    </Link>
  );
}
