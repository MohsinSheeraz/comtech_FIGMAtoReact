export const Glow = ({ className = "", color = "rgba(38,80,200,.6)" }: { className?: string; color?: string }) => (
  <div aria-hidden className={`pointer-events-none absolute -z-10 rounded-full blur-[120px] ${className}`} style={{ background: color }} />
);
export const PageGlows = () => (<>
  <Glow className="-top-[148px] -left-[128px] size-[596px]" color="rgba(87,36,216,.55)" />
  <Glow className="top-[131px] -right-[13px] size-[374px]" />
</>);
/* Full-width background gradient used behind About / Services sections */
export const SectionGlow = () => (
  <div aria-hidden className="pointer-events-none absolute inset-x-[5%] inset-y-0 -z-10 rounded-b-[80px] bg-[linear-gradient(0deg,#040404_8%,rgba(69,22,187,.45)_43%,#040404_81%)]" />
);
