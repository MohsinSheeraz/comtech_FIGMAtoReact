import Link from "next/link";
import { ReactNode } from "react";

// "w" (the default) now looks like the purple navbar button, so every main button matches it
export const Btn = ({ href = "#", v = "w", children }: { href?: string; v?: "w" | "o" | "p"; children: ReactNode }) => (
  <Link href={href} className={`btn ${v === "w" ? "p" : v}`}>{children}</Link>
);
