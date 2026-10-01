import Link from "next/link";
import { Btn } from "./Button";

export function Header() {
  const nav = [["Home", "/"], ["Services", "/services"], ["Partners", "/#partners"], ["About Us", "/about"], ["Contact Us", "/contact"], ["Resources", "/resources"]];
  return (
    <header className="wrap hdr">
      <Link href="/" className="logo">Comtech Associates</Link>
      <nav>{nav.map(([l, h], i) => <Link key={l} href={h} style={{ fontWeight: i ? 400 : 700 }}>{l}</Link>)}</nav>
      <Btn v="p" href="/contact">Get in touch</Btn>
    </header>
  );
}
