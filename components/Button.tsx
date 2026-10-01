import Link from "next/link";
import { ReactNode } from "react";

export const Btn = ({ href = "#", v = "w", children }: { href?: string; v?: "w" | "o" | "p"; children: ReactNode }) => (
  <Link href={href} className={`btn ${v}`}>{children}</Link>
);
