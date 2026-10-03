import Image from "next/image";
import { Btn } from "./Button";

/* Globe position and hero min-height now live in globals.css (.hero.g / .hero .globe) so they can change per breakpoint. */
export const Hero = (
  {
    pill,
    small,
    title,
    text,
    primary,
    secondary,
    globe,
    className
  }:
    {
      pill?: string;
      small?: string;
      title: React.ReactNode;
      text?: string;
      primary: string;
      secondary: string;
      globe?: boolean;
      className?: string;
    }) => (
  <section className={`mx-auto wrap hero ${globe ? "g" : ""} ${className} `}>
    {pill && <span className="pill text-[16px]">{pill}</span>}
    {small && <p className="sm text-[24px] font-light!">{small}</p>}
    <h1 className="text-[64px] font-medium tracking-tighter leading-[75px]">{title}</h1>
    {text && <p className="body mt-5! text-[18px]! font-normal! tracking-tighter! leading-[31px]">{text}</p>}
    <div className="row" style={{ marginTop: globe ? 24 : 0 }}><Btn href="/contact">{primary}</Btn><Btn v="o" href="/services">{secondary}</Btn></div>
    {globe && (
      <Image
        className="globe [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]"
        src="/images/Globe_hero.png" alt="" width={906} height={510} priority
      />
    )}
  </section>
);