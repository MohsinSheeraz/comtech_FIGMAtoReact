"use client";
import Link from "next/link";
import { useState } from "react";
import { Btn } from "./Button";

const nav = [["Home", "/"], ["Services", "/services"], ["Partners", "/#partners"], ["About Us", "/about"], ["Contact Us", "/contact"], ["Resources", "/blog"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="wrap hdr">
      <Link href="/" className="logo" onClick={close}>Comtech Associates</Link>
      <nav>{nav.map(([l, h], i) => <Link key={l} href={h} style={{ fontWeight: i ? 400 : 700 }}>{l}</Link>)}</nav>
      <div className="hdr-cta"><Btn v="p" href="/contact">Get in touch</Btn></div>
      <button type="button" className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <div id="mobile-menu" className="mnav">
          {nav.map(([l, h]) => <Link key={l} href={h} onClick={close}>{l}</Link>)}
          <div className="mnav-cta"><Btn v="p" href="/contact">Get in touch</Btn></div>
        </div>
      )}
    </header>
  );
}