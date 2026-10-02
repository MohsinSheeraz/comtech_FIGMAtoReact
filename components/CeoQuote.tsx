// import Image from "next/image";
// import CEOBG from "@/public/images/ceobg.png";

// export const CeoQuote = ({ title }: { title: string }) => (
//   <section className="relative">
//     {/* purple glow: centered on the section's top-left corner, so it spills up behind the previous section like in Figma */}
//     <div
//       aria-hidden
//       className="pointer-events-none absolute"
//       style={{ top: -450, left: -450, width: 900, height: 900, background: "radial-gradient(circle at center, rgba(87,36,216,.6) 0%, rgba(87,36,216,.28) 38%, transparent 70%)" }}
//     />

//     <div className="wrap sec ceo p-30!">
//       <div>
//         <h2 className="h2 text-[46px] leading-[54px] tracking-tighter">{title}</h2>
//         <q className="text-[36px] leading-[49px] tracking-tighter" >&quot;We didn&apos;t start big; we started with belief. Every connection we built, every solution we delivered, came from the idea that technology should empower people.&quot;</q>
//         <span className="bar" />
//         <div className="name">Muhammad Farooq Zaheer</div>
//         <div className="role">CEO, Comtech Associates</div>
//       </div>
//       {/* bottom fade so the photo never shows a hard cut */}
//       <div>
//         {/* section background image */}
//         <Image
//           src={CEOBG}
//           alt=""
//           height={281}
//           width={380}
//           className="-z-20 object-cover object-top"
//         />


//         <Image src="/images/Ceo_Section_Image.png" alt="Muhammad Farooq Zaheer, CEO" width={620} height={778} className="[mask-image:linear-gradient(to_bottom,#000_70%,transparent)]" />

//       </div>
//     </div>
//   </section>
// );

import Image from "next/image";
import CEOBG from "@/public/images/ceobg.png";

export const CeoQuote = ({ title }: { title: string }) => (
  <section className="relative">
    {/* purple glow: centered on the section's top-left corner, spills up behind the previous section */}
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        top: -450,
        left: -450,
        width: 900,
        height: 900,
        background:
          "radial-gradient(circle at center, rgba(87,36,216,.6) 0%, rgba(87,36,216,.28) 38%, transparent 70%)",
      }}
    />

    <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-10  py-16 md:min-h-[625px] md:flex-row md:items-center md:justify-between md:py-0 md:pl-[150px] md:pr-[127px]">
      {/* LEFT: text column */}
      <div className="">
        <h2 className="text-[46px] font-medium leading-[54px] tracking-tight text-white">
          {title}
        </h2>

        <q className="mt-5 block text-[36px] italic leading-[39px] tracking-tighter text-white [quotes:none]">
          &quot;We didn&apos;t start big; we started with belief. Every connection we built, every
          solution we delivered, came from the idea that technology should empower people.&quot;
        </q>

        <span className="my-8 block h-[3px] w-[54px] rounded-full bg-[#5b2fd8]" />

        <div className="text-[18px] text-white">Muhammad Farooq Zaheer</div>
        <div className="mt-1 text-[15px] text-white/40">CEO, Comtech Associates</div>
      </div>

      {/* RIGHT: quote mark sits behind the photo, offset up-left like in Figma */}
      <div className="relative h-[500px] w-[500] max-w-lful shrink-0">
        <Image
          src={CEOBG}
          alt=""
          width={240}
          className="absolute left-[10px] top-0 z-0 h-auto w-[240px]"
        />

        <Image
          src="/images/Ceo_Section_Image.png"
          alt="Muhammad Farooq Zaheer, CEO"
          width={620}
          height={778}
          className="absolute left-[90px] top-[18px] z-10 h-auto w-auto [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"
        />
      </div>
    </div>
  </section>
);

