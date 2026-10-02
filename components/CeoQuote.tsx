import Image from "next/image";
// import CEOBG from "@/public/images/ceobg.png";

export const CeoQuote = ({ title }: { title: string }) => (
  <section className="relative">
    {/* section background image */}
   {/* <Image
       src={CEOBG}
       alt=""
       height={778}
       width={620}
       className="-z-20 object-cover object-top"
     /> */}

    {/* purple glow: centered on the section's top-left corner, so it spills up behind the previous section like in Figma */}
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{ top: -450, left: -450, width: 900, height: 900, background: "radial-gradient(circle at center, rgba(87,36,216,.6) 0%, rgba(87,36,216,.28) 38%, transparent 70%)" }}
    />

    <div className="wrap sec ceo">
      <div>
        <h2 className="h2">{title}</h2>
        <q>&quot;We didn&apos;t start big; we started with belief. Every connection we built, every solution we delivered, came from the idea that technology should empower people.&quot;</q>
        <span className="bar" />
        <div className="name">Muhammad Farooq Zaheer</div>
        <div className="role">CEO, Comtech Associates</div>
      </div>
      {/* bottom fade so the photo never shows a hard cut */}
      <Image src="/images/Ceo_Section_Image.png" alt="Muhammad Farooq Zaheer, CEO" width={620} height={778}
        className="[mask-image:linear-gradient(to_bottom,#000_70%,transparent)]" />
    </div>
  </section>
);