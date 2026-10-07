import Image from "next/image";
import { Btn } from "@/components/Button";
import { HeroLogos } from "@/components/HeroLogos";

/* Hero position is owned by ONE place: this file + the .hero rules in globals.css.
   `className` can still add things like colours, but any padding / margin-top / height utilities
   passed by a page are dropped, so no page can nudge its hero away from the shared position. */
const LAYOUT_CLASS = /^(?:[^:\s]+:)*!?(?:p|pt|pb|py|mt|h|min-h)-/;
const safeClass = (c = "") => c.split(/\s+/).filter((t) => t && !LAYOUT_CLASS.test(t)).join(" ");

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
  /** auto-scrolling partner logos at the bottom of the hero (default on) */
  logos?: boolean;
  className?: string;
}) => (
  <section className={`mx-auto wrap hero ${globe ? "g" : ""} ${safeClass(className)}`}>
    {/* Eyebrow slot (pill + small line). Pages without them render INVISIBLE copies of the same
        elements, so their title starts at exactly the same height as on Home, at every breakpoint. */}
    <span className={`pill text-[16px] ${pill ? "" : "invisible"}`} aria-hidden={pill ? undefined : true}>
      {pill ?? "\u00A0"}
    </span>
    <p className={`sm text-[24px] font-light! ${small ? "" : "invisible"}`} aria-hidden={small ? undefined : true}>
      {small ?? "\u00A0"}
    </p>

    <h1 className="text-[64px] font-medium tracking-tighter leading-[75px]">{title}</h1>
    {text && <p className="body mt-5! text-[18px]! font-normal! tracking-tighter! leading-[31px]">{text}</p>}
    <div className="row" style={{ marginTop: globe ? 24 : 0 }}>
      <Btn href="/contact">{primary}</Btn>
      {secondary && <Btn v="o" href="/services">{secondary}</Btn>}
    </div>

    {globe && (
      <Image
        className="globe [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]"
        src="/images/Globe_hero.png" alt="" width={906} height={510} priority
      />
    )}

    {logos && (
      // Home (globe): pinned to the bottom of the tall hero on desktop. Other pages: right under the buttons.
      <HeroLogos className={globe ? "mt-10 md:absolute md:inset-x-0 md:bottom-12 md:mt-0" : "mt-14"} />
    )}
  </section>
);