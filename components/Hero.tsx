import Image from "next/image";
import { Btn } from "./Button";

/* Globe position: raise GLOBE_TOP to push the globe further down (hero height grows with it). */
const GLOBE_TOP = 310; // px from the top of the hero (was 230)
const HERO_MIN_HEIGHT = 910; // px, keeps the heading below the globe clear

export const Hero = ({ pill, small, title, text, primary, secondary, globe }: { pill?: string; small?: string; title: React.ReactNode; text?: string; primary: string; secondary: string; globe?: boolean }) => (
  <section className={`wrap hero ${globe ? "g" : ""}`} style={globe ? { minHeight: HERO_MIN_HEIGHT } : undefined}>
    {pill && <span className="pill">{pill}</span>}
    {small && <p className="sm">{small}</p>}
    <h1 className="h1">{title}</h1>
    {text && <p className="body">{text}</p>}
    <div className="row" style={{ marginTop: globe ? 24 : 0 }}><Btn href="/contact">{primary}</Btn><Btn v="o" href="/services">{secondary}</Btn></div>
    {globe && (
      <Image
        className="globe [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]"
        style={{ top: GLOBE_TOP }}
        src="/images/Globe_hero.png" alt="" width={906} height={510} priority
      />
    )}
  </section>
);