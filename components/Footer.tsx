import Image from "next/image";
import Link from "next/link";

type L = [string, string];

const svc: L[] = [
  ["CyberSecurity", "/services"],
  ["Networking & IT infrastructure", "/services/networking"],
  ["Data Center & Cloud Solution", "/services"],
  ["IT Services & Managed Services", "/services"],
  ["Custom Software Development", "/services"],
];
const ql: L[] = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Leadership", "/leadership"],
  ["Events", "/blog"],
  ["Contact Us", "/contact"],
];
const so: L[] = [
  ["Facebook", "#"],
  ["Instagram", "#"],
  ["Linkedin", "#"],
  ["Twitter", "#"],
  ["Youtube", "#"],
];

const Col = ({ t, items }: { t: string; items: L[] }) => (
  <div>
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
        <div className="foot-top">
          <div className="flogo">
            <i />
            Comtech
            <br />
            Associates
          </div>
          <p>
            Associates is a certified Cisco partner delivering networking, cybersecurity, data center, and managed IT solutions to enterprises across Pakistan. With over 10 years in operation and offices in Karachi, Islamabad, Lahore, and Quetta, we build the infrastructure businesses depend on to run.
          </p>
        </div>
        <div className="foot-cols">
          <Col t="Services" items={svc} />
          <Col t="Quick Links" items={ql} />
          <Col t="Socials" items={so} />
          <div>
            <h4 className="fh">
              Services
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
                The Hive 3rd Floor, NASTP Faisal Cantonment Main shahrah e faisal, Karachi.
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 COMTECH ASSOCIATES. All rights reserved</span>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <Image className="foot-bg" src="/images/Globe_hero.png" alt="" width={940} height={530} />
    </footer>
  );
}
