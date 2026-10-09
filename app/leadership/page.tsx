import type { Metadata } from "next";
import Image from "next/image";
import { CtaPanel } from "@/components/CtaPanel";
import { PageGlows } from "@/components/Glow";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = { title: "Leadership | Comtech Associates" };

const frameBg =
  "linear-gradient(180deg, var(--bg) 8.06%, rgba(69, 22, 187, 0.42) 43.03%, var(--bg) 80.62%)";

// rows are 12px high on desktop: [row-start, row-span] per card, copied from the Figma stagger
const people = [
  {
    name: "Muhammad Farooq Zaheer",
    role: "CEO, Comtech Associates",
    bio: "Leads Comtech Associates' strategic direction and overall business operations. Represented Comtech at the 27th ITCN Asia in Lahore, showcasing enterprise Cisco solutions alongside Cisco teams, and has overseen milestone deployments including Bank Islami's Cisco ACI rollout and disaster recovery network migration.",
    img: "/images/leaderShip_Page1stImage.png",
    w: 699,
    h: 659,
    text: "min-[1101px]:col-start-1 min-[1101px]:row-start-1 min-[1101px]:row-span-[45]",
    pic: "min-[1101px]:col-start-2 min-[1101px]:row-start-1 min-[1101px]:row-span-[55]",
  },
  {
    name: "Rehan Shaikh",
    role: "Director Sales, Pakistan & UAE",
    bio: "Drives sales growth, business development, and customer relationships across Pakistan and the UAE. Represents Comtech at major industry events, including ITCN Asia, and leads the sales relationships behind engagements such as Karakoram Bank's SD-WAN deployment.",
    img: "/images/leaderShip_Page2ndImage.png",
    w: 1024,
    h: 1536,
    text: "min-[1101px]:col-start-2 min-[1101px]:row-start-[59] min-[1101px]:row-span-[43]",
    pic: "min-[1101px]:col-start-1 min-[1101px]:row-start-[49] min-[1101px]:row-span-[62]",
  },
  {
    name: "Abdul Rehman Zaheer",
    role: "Director",
    bio: "Supports strategic business operations and organizational growth at Comtech Associates, working alongside the leadership team to align day-to-day execution with the company's long-term direction.",
    img: "/images/leaderShip_Page3rdImage.png",
    w: 699,
    h: 687,
    text: "min-[1101px]:col-start-1 min-[1101px]:row-start-[114] min-[1101px]:row-span-[48]",
    pic: "min-[1101px]:col-start-2 min-[1101px]:row-start-[105] min-[1101px]:row-span-[57]",
  },
];

// DOM order interleaves text + photo per person (right order for mobile); desktop placement comes from the classes above.
const cards = people.flatMap((p, i) => {
  const photoFirst = i === 1;
  const text = { kind: "text" as const, p, cls: p.text };
  const pic = { kind: "pic" as const, p, cls: p.pic };
  return photoFirst ? [pic, text] : [text, pic];
});

export default function Leadership() {
  return (
    <main>
      <PageGlows variant="inner" />
      <Hero
        className="p-40! mt-14!"
        title={<>Leadership at Comtech<br />Associates</>}
        text="Meet the team leading our mission to deliver reliable, secure, and scalable IT solutions across Pakistan."
        primary="Talk to an IT Consultant"
        secondary="Explore our Services"
      />

      <div
        className="relative isolate mx-auto mt-10 w-[94%] max-w-[1764px] rounded-[40px] py-10"
        style={{ background: frameBg }}
      >
        <section className="wrap">
          <div className="grid gap-6 min-[1101px]:grid-cols-2 min-[1101px]:gap-x-[28px] min-[1101px]:gap-y-0 min-[1101px]:[grid-template-rows:repeat(161,12px)]">
            {cards.map(({ kind, p, cls }) =>
              kind === "text" ? (
                <div
                  key={`${p.name}-t`}
                  className={`flex flex-col justify-center rounded-[40px] bg-gradient-to-r from-[#07050f] to-transparent px-8 py-10 min-[1101px]:px-16 min-[1101px]:py-10 ${cls}`}
                >
                  <h2 className="text-[34px] font-medium leading-[44px] tracking-tighter min-[1101px]:text-[46px] min-[1101px]:leading-[54px]">
                    {p.name}
                  </h2>
                  <p className="mt-3 text-[20px] leading-[30px] tracking-tighter text-fg/40 min-[1101px]:text-[24px]">
                    {p.role}
                  </p>
                  <span className="bar mt-8!" />
                  <p className="max-w-[560px] text-[18px] leading-[31px] tracking-tighter">{p.bio}</p>
                </div>
              ) : (
                <div
                  key={`${p.name}-i`}
                  className={`relative min-h-[420px] overflow-hidden rounded-[40px] ${cls}`}
                >
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 1101px) 700px, 100vw"
                    className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto max-w-full object-contain object-bottom"
                  />
                </div>
              )
            )}
          </div>
        </section>
      </div>

      <CtaPanel
        title="Let's Build Something Together"
        text="Whether it's one service or all four, a conversation with Comtech's team is the place to start. Tell us what you're dealing with, a security gap, an unreliable network, a data center migration, or a staffing shortfall, and we'll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations start with a short assessment of your current environment before anything gets proposed."
        label="Request an IT Assessment"
      />
    </main>
  );
}
