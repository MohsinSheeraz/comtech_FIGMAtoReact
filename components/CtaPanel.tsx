import { Btn } from "./Button";

export const CtaPanel = ({
  title,
  text,
  label,
  href = "/contact-us",
}: {
  title: string;
  text: string;
  label: string;
  href?: string;
}) => (
  <section className="wrap">
    <div className="ctapanel">
      <div className="cta-fx" aria-hidden />
      <i className="cta-glow" />
      <i className="cta-floor" />
      <h2 className="h2">{title}</h2>
      <p className="body">{text}</p>
      <Btn href={href}>{label}</Btn>
    </div>
  </section>
);