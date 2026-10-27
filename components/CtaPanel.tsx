import { Btn } from "./Button";

export const CtaPanel = ({
  title,
  text,
  label,
}: {
  title: string;
  text: string;
  label: string;
}) => (
  <section className="wrap">
    <div className="ctapanel">
      <div className="cta-fx" aria-hidden />
      <i className="cta-glow" />
      <i className="cta-floor" />
      <h2 className="h2">{title}</h2>
      <p className="body">{text}</p>
      <Btn href="/contact">{label}</Btn>
    </div>
  </section>
);