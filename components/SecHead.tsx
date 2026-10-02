import { ReactNode } from "react";
import { Btn } from "./Button";

export const SecHead = ({
  title,
  sub,
  cta,
  className,
}: {
  title: ReactNode;
  sub?: string;
  cta?: boolean;
  className?: string;
}) => (
  <div className={['sechead', className].filter(Boolean).join(" ")}>
    <h2 className="h2">{title}</h2>
    {sub && <p className="body">{sub}</p>}
    {cta && (
      <Btn v="p" href="/contact">
        Get in touch
      </Btn>
    )}
  </div>
);
