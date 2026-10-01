import Image from "next/image";

export function Footer() {
  const svc = ["CyberSecurity", "Networking & IT infrastructure", "Data Center & Cloud Solution", "IT Services & Managed Services", "Custom Software Development"];
  const ql = ["Home", "About Us", "Leadership", "Events", "Contact Us"];
  const so = ["Facebook", "Instagram", "Linkedin", "Twitter", "Youtube"];
  const Col = ({ t, items }: { t: string; items: string[] }) => (<div><h4 className="fh">{t}<i /></h4>{items.map((x) => <a key={x} href="#">{x}</a>)}</div>);
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top"><div className="flogo"><i />Comtech<br />Associates</div>
          <p>Associates is a certified Cisco partner delivering networking, cybersecurity, data center, and managed IT solutions to enterprises across Pakistan. With over 10 years in operation and offices in Karachi, Islamabad, Lahore, and Quetta, we build the infrastructure businesses depend on to run.</p></div>
        <div className="foot-cols">
          <Col t="Services" items={svc} /><Col t="Quick Links" items={ql} /><Col t="Socials" items={so} />
          <div><h4 className="fh">Services<i /></h4><a href="mailto:info@comtech.com">✉ info@comtech.com</a><a href="tel:+922134404440">☎ +92 213 4404440</a><a>⌖ The Hive 3rd Floor, NASTP Faisal Cantonment Main shahrah e faisal, Karachi.</a></div>
        </div>
        <div className="foot-bot"><span>© 2026 COMTECH ASSOCIATES. All rights reserved</span><a href="#">Privacy Policy</a></div>
      </div>
      <Image className="foot-bg" src="/images/Globe_hero.png" alt="" width={940} height={530} />
    </footer>
  );
}
