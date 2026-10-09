"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Btn } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

/* Header menu: ONLY these five items.
   TODO: replace the dropdown routes with your real ones.
   Confirmed from your files: /partners (Cisco page), /about, /contact, /blog, /services, /services/networking.
   The other /services/* slugs below are placeholders. */
const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Networking & IT Infrastructure", href: "/services/networking" },
      { label: "Cybersecurity", href: "/services/cybersecurity" },
      { label: "Data Center & Cloud", href: "/services/data-center" },
      { label: "IT Services & Managed IT", href: "/services/managed-it" },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "Cisco", href: "/partners/cisco" },
      // { label: "Fortinet", href: "/partners/fortinet" },
      // { label: "Huawei", href: "/partners/huawei" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Resources", href: "/blog" },
];

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

export function Header() {
  const [open, setOpen] = useState(false); // mobile menu
  const [dd, setDd] = useState<string | null>(null); // desktop dropdown that is open
  const [sub, setSub] = useState<string | null>(null); // mobile accordion that is open
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const path = usePathname() ?? "/";

  // Highlight the section you are in (e.g. /services/networking keeps "Services" bold).
  const isActive = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));
  const itemActive = (it: NavItem) => isActive(it.href) || !!it.children?.some((c) => isActive(c.href));

  const show = (k: string) => { clearTimeout(timer.current); setDd(k); };
  const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setDd(null), 120); };
  const close = () => { clearTimeout(timer.current); setOpen(false); setDd(null); setSub(null); };

  return (
    <header className="wrap hdr">
      <Link href="/" className="logo" onClick={close}>Comtech Associates</Link>

      {/* desktop */}
      <nav>
        {nav.map((it) => {
          const active = itemActive(it);
          const weight = { fontWeight: active ? 700 : 400 };
          if (!it.children) {
            return (
              <Link key={it.label} href={it.href} aria-current={active ? "page" : undefined} style={weight} onClick={close}>
                {it.label}
              </Link>
            );
          }
          const isOpen = dd === it.label;
          return (
            <div
              key={it.label}
              className="relative flex items-center"
              onMouseEnter={() => show(it.label)}
              onMouseLeave={hide}
              onFocus={() => show(it.label)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hide(); }}
              onKeyDown={(e) => { if (e.key === "Escape") setDd(null); }}
            >
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen}
                style={weight}
                className="inline-flex items-center gap-1.5"
                onClick={close}
              >
                {it.label}
                <Chevron open={isOpen} />
              </Link>

              {/* pt-4 is an invisible bridge so the pointer can travel from the link to the panel */}
              <div
                className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200 ease-out ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"
                  }`}
              >
                <div className="min-w-[260px] rounded-2xl border border-fg/10 bg-card/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,.6)] backdrop-blur-xl">
                  {it.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      onClick={close}
                      aria-current={isActive(c.href) ? "page" : undefined}
                      className="block whitespace-nowrap rounded-xl px-4 py-3 text-[15px] transition-colors hover:bg-fg/10 focus-visible:bg-fg/10"
                      style={{ fontWeight: isActive(c.href) ? 700 : 400 }}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="hdr-cta flex items-center gap-3"><ThemeToggle /><Btn v="p" href="/contact">Get in touch</Btn></div>

      <button type="button" className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* mobile */}
      {open && (
        <div id="mobile-menu" className="mnav">
          {nav.map((it) =>
            it.children ? (
              <div key={it.label}>
                <div className="flex items-center justify-between">
                  <Link href={it.href} onClick={close}>{it.label}</Link>
                  <button
                    type="button"
                    aria-label={`${sub === it.label ? "Collapse" : "Expand"} ${it.label}`}
                    aria-expanded={sub === it.label}
                    className="p-3"
                    onClick={() => setSub((s) => (s === it.label ? null : it.label))}
                  >
                    <Chevron open={sub === it.label} />
                  </button>
                </div>
                {sub === it.label && (
                  <div className="flex flex-col pl-4">
                    {it.children.map((c) => (
                      <Link key={c.label} href={c.href} onClick={close}>{c.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={it.label} href={it.href} onClick={close}>{it.label}</Link>
            )
          )}
          <div className="mnav-cta flex items-center gap-3"><ThemeToggle /><Btn v="p" href="/contact">Get in touch</Btn></div>
        </div>
      )}
    </header>
  );
}