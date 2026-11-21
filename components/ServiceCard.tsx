import Image from "next/image";
import { Btn } from "./Button";
import { LiquidBg } from "@/components/LiquidBg";

type Props = {
  t: string;
  p: string;
  img: string;
  className?: string;
  number?: string;
  bullets?: string[];
};

export const ServiceCard = ({
  t,
  p,
  img,
  className,
  number,
  bullets,
}: Props) => (
  <article className={`card svc svc-hover ${className ?? ""}`}>
    <span className="svc-hover-bg" aria-hidden="true" />
    <span className="num">{number}</span>
    <h3 className="h3">{t}</h3>
    <p className="text-[18px]! leading-[31px]! font-normal!">{p}</p>
    {bullets && (
      <ul className="mt-4 list-disc space-y-1 pl-5 text-[16px] leading-[27px]">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    )}
    <div className="row mt-3!">
      <Btn className="btn" v="o" href="/services">
        Explore our Services
      </Btn>
    </div>
    <Image
      src={`/images/${img}.png`}
      alt={t}
      width={384}
      height={208}
      className="mt-3!"
    />
  </article>
);

export const StatementCard = () => (
  <article className="card svc fill relative! overflow-hidden! isolate! flex flex-col justify-center gap-10 min-[1101px]:gap-52!">
    <LiquidBg />
    <h2 className="h2 relative z-10">
      We work across four connected disciplines because modern IT infrastructure
      isn&apos;t four separate problems; it&apos;s one system.
    </h2>
    <div className="relative z-10">
      <Btn href="/contact">Connect with Us</Btn>
    </div>
  </article>
);
