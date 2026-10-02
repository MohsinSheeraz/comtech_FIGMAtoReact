import Image from "next/image";
import { Btn } from "./Button";

type Props = { t: string; p: string; img: string; className?: string };

export const ServiceCard = ({ t, p, img, className }: Props) => (
  <article className={className ? `card svc ${className}` : "card svc"}>
    <span className="num">01</span>
    <h3 className="h3">{t}</h3>
    <p>{p}</p>{" "}
    <div className="row">
      <Btn v="o" href="/services">
        Explore our Services
      </Btn>
    </div>
    <Image src={`/images/${img}.png`} alt={t} width={384} height={208} />
  </article>
);



export const StatementCard = () => (
<<<<<<< HEAD
  <article className="card svc fill flex flex-col gap-10 min-[1101px]:gap-52! justify-between  ">
=======
  <article className="card svc fill flex flex-col gap-52! justify-between  ">
>>>>>>> 34d527bd28f8812301ed1999746354076be4e8ef
    <h2 className="h2">
      We work across four connected disciplines because modern IT infrastructure
      isn&apos;t four separate problems; it&apos;s one system.
    </h2>
    <div>
      <Btn href="/contact">Connect with Us</Btn>
    </div>
  </article>
);
