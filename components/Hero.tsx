import { Btn } from "@/components/Button";
import { HeroLogos } from "@/components/HeroLogos";
import { DeferredGlobe } from "@/components/three/DeferredGlobe";
const LAYOUT_CLASS = /^(?:[^:\s]+:)*!?(?:p|pt|pb|py|mt|h|min-h)-/;
const safeClass = (c = "") =>
  c
    .split(/\s+/)
    .filter((t) => t && !LAYOUT_CLASS.test(t))
    .join(" ");

export const Hero = ({
  pill,
  small,
  title,
  text,
  primary,
  secondary,
  globe,
  logos = true,
  className,
}: {
  pill?: string;
  small?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  primary: string;
  secondary?: string;
  globe?: boolean;
  logos?: boolean;
  className?: string;
}) => (
  <section
    className={`mx-auto wrap hero ${globe ? "g" : ""} ${safeClass(className)}`}
  >
    <span
      className={`pill text-[16px] ${pill ? "" : "invisible"}`}
      aria-hidden={pill ? undefined : true}
    >
      {pill ?? "\u00A0"}
    </span>
    <p
      className={`sm text-[24px] font-light! ${small ? "" : "invisible"}`}
      aria-hidden={small ? undefined : true}
    >
      {small ?? "\u00A0"}
    </p>

    <h1 className="text-[42px] leading-[49px] md:text-[64px] py-5 md:py-auto font-medium tracking-tighter md:leading-[75px]">
      {title}
    </h1>
    {text && (
      <p className="body mt-5! text-[18px]! font-normal! tracking-tighter! leading-[31px]">
        {text}
      </p>
    )}
    <div className="row" style={{ marginTop: globe ? 24 : 0 }}>
      <Btn href="/contact">{primary}</Btn>
      {secondary && (
        <Btn v="o" href="/services">
          {secondary}
        </Btn>
      )}
    </div>
    {globe && (
      <DeferredGlobe
        className="globe [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]"
        variant="horizon"
        fallbackSrc="/images/globe-network.gif"
        sizes="(max-width: 768px) 170vw, 906px"
        style={{ aspectRatio: "1672 / 941" }}
      />
    )}

    {logos && (
      <HeroLogos className={globe ? "mt-60 mb-20 sm:mt-96 sm:mb-1" : "mt-14"} />
    )}
  </section>
);
