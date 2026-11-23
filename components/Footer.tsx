import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

type L = [string, string];

const svc: L[] = [
  ["Cybersecurity", "/services/cyber-security"],
  ["Networking & IT Infrastructure", "/services/network-support"],
  ["Data Center & Cloud Solution", "/services/data-center"],
  ["IT Services & Managed Services", "/services/managed-it-services"],
  ["Custom Software Development", "/services/custom-software-development"],
];
const ql: L[] = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Leadership", "/leadership"],
  ["Events", "/events"],
  ["Contact Us", "/contact"],
];
const socials = [
  { label: "Facebook", Icon: FaFacebookF },
  { label: "Instagram", Icon: FaInstagram },
  { label: "LinkedIn", Icon: FaLinkedinIn },
  { label: "Twitter", Icon: FaTwitter },
];

const Col = ({ t, items }: { t: string; items: L[] }) => (
  <div className={t === "Services" ? "lg:-ml-12" : undefined}>
    <h4 className="fh">
      {t}
      <i className="mt-2! mb-2!" />
    </h4>
    {items.map(([label, href]) => (
      <Link key={label} href={href}>
        {label}
      </Link>
    ))}
  </div>
);

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-cols foot-main border-t border-white/10">
          <div className="col-span-full min-[1201px]:col-auto">
            <Image
              src="/images/Comtech_Logo_Design/Png/Comtech_Logo_Design-05.png"
              alt="Comtech Associates"
              width={180}
              height={56}
              className="h-auto w-[180px]"
            />
            <p className="mt-5 max-w-[420px]! text-[18px] leading-[28px]">
              Comtech Associates is a certified Cisco partner delivering
              networking, cybersecurity, data center, and managed IT solutions
              to enterprises across Pakistan. With over 10 years in operation
              and offices in Karachi, Islamabad, Lahore, and Quetta, we build
              the infrastructure businesses depend on to run.
            </p>
            <div className="mt-6 flex gap-[9px]">
              {socials.map(({ label, Icon }) => (
                <span
                  key={label}
                  aria-label={label}
                  role="img"
                  className="p-2 rounded-full bg-[#6739DD] text-black"
                >
                  <Icon size={10} aria-hidden />
                </span>
              ))}
            </div>
          </div>
          <Col t="Quick Links" items={ql} />
          <Col t="Services" items={svc} />
          <div>
            <h4 className="fh">
              Socials
              <i className="mt-2! mb-2!" />
            </h4>
            <div className="flex flex-row items-center gap-x-5">
              {/* absolute /images paths, so they also work on nested routes like /services/networking */}
              <img src="/images/email.png" height="17px" width="20" alt="" />
              <a href="mailto:info@comtech.com"> info@comtech.com</a>
            </div>
            <div className="flex flex-row items-center gap-x-5">
              <img src="/images/Vector.png" height="17px" width="20" alt="" />
              <a href="tel:+922134404440">+92 213 4404440</a>
            </div>
            <div className="mt-2 flex flex-row items-start gap-x-5">
              <img src="/images/layer1.png" height="17px" width="20" alt="" />
              <a className="-mt-2">
                The Hive 3rd Floor, NASTP Faisal Cantonment Main shahrah e
                faisal, Karachi.
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 COMTECH ASSOCIATES. All rights reserved</span>
          <div className="flex flex-wrap gap-x-6">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </div>
        </div>
      </div>
      <Image
        className="foot-bg"
        src="/images/Globe_hero.png"
        alt=""
        width={940}
        height={530}
      />
    </footer>
  );
}