import Image from "next/image";

export const CeoQuote = ({ title }: { title: string }) => (
  <section className="wrap sec ceo">
    <div><h2 className="h2">{title}</h2><q>&quot;We didn&apos;t start big; we started with belief. Every connection we built, every solution we delivered, came from the idea that technology should empower people.&quot;</q><span className="bar" /><div className="name">Muhammad Farooq Zaheer</div><div className="role">CEO, Comtech Associates</div></div>
    <Image src="/images/Ceo_Section_Image.png" alt="Muhammad Farooq Zaheer, CEO" width={620} height={778} />
  </section>
);
