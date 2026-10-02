import Image from "next/image";
import { Btn } from "./Button";

type Props = { t: string; p: string; img: string; className?: string; number?: string; };

export const ServiceCard = ({ t, p, img, className, number }: Props) => (
  <article className={className ? `card svc ${className}` : "card svc"}>
    <span className="num">{number}</span>
    <h3 className="h3">{t}</h3>
    <p className="text-[18px]! leading-[31px]! font-normal!" >{p}</p>{" "}
    <div className="row mt-3!">
      <Btn v="o" href="/services">
        Explore our Services
      </Btn>
    </div>
    <Image src={`/images/${img}.png`} alt={t} width={384} height={208} className="mt-3!" />
  </article>
);



export const StatementCard = () => (
  <article className="card svc fill flex flex-col gap-10 min-[1101px]:gap-52! justify-between  ">
    <h2 className="h2">
      We work across four connected disciplines because modern IT infrastructure
      isn&apos;t four separate problems; it&apos;s one system.
    </h2>
    <div>
      <Btn href="/contact">Connect with Us</Btn>
    </div>
  </article>
);