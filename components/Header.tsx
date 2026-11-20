"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Btn } from "./Button";

type NavChild = { label: string; href: string; desc?: string };
type NavItem = { label: string; href: string; children?: NavChild[] };
export type MenuPost = { slug: string; title: string; image: string };

const VISIBLE = 9; // more than this = "Show more" button

const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Networking & IT Infrastructure",
        href: "/services/network-support",
        desc: "Design, deployment and 24/7 monitoring for networks that can't go down.",
      },
      {
        label: "Managed IT Services",
        href: "/services/managed-it",
        desc: "Helpdesk, desktop support and asset lifecycle from one accountable team.",
      },
      {
        label: "Data Center & Cloud",
        href: "/services/data-center",
        desc: "Data center design, migration and hybrid cloud connectivity.",
      },
      {
        label: "Custom Software Development",
        href: "/services/custom-software",
        desc: "Internal tools, platforms and integrations built around your workflow.",
      },
      {
        label: "Cybersecurity",
        href: "/services/cybersecurity",
        desc: "24/7 SOC monitoring, VAPT and compliance-aligned protection.",
      },
      {
        label: "IT Resourcing",
        href: "/services/resourcing",
        desc: "Vetted engineers on-site or remote, on your timeline.",
      },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      {
        label: "Cisco",
        href: "/partners/cisco",
        desc: "Premier Partner: networking, security and data center.",
      },
      {
        label: "Kaspersky",
        href: "/partners/kaspersky",
        desc: "Endpoint, EDR and industrial cybersecurity.",
      },
      {
        label: "Avaya",
        href: "/partners/avaya",
        desc: "IP telephony, unified communications and contact center.",
      },
      {
        label: "Huawei",
        href: "/partners/huawei",
        desc: "Smart networking, data center and telecom connectivity.",
      },
      {
        label: "Broadcom",
        href: "/partners/broadcom",
        desc: "VMware Cloud Foundation private cloud.",
      },
      {
        label: "Dell",
        href: "/partners/dell",
        desc: "Servers, storage, backup and business PCs.",
      },
      {
        label: "Grandstream",
        href: "/partners/grandstream",
        desc: "Wi-Fi 6, switching, routing and voice.",
      },
      {
        label: "H3C",
        href: "/partners/h3c",
        desc: "Switches, routers, servers and security.",
      },
      {
        label: "HPE",
        href: "/partners/hpe",
        desc: "ProLiant servers, Alletra storage and Aruba networking.",
      },
      {
        label: "Polycom",
        href: "/partners/polycom",
        desc: "HP Poly headsets and video conferencing.",
      },
      {
        label: "D-Link",
        href: "/partners/dlink",
        desc: "Switches, Wi-Fi, IP cameras and storage.",
      },
      {
        label: "Sangfor",
        href: "/partners/sangfor",
        desc: "NGAF firewall, endpoint, HCI and cloud.",
      },
      {
        label: "TP-Link",
        href: "/partners/tp-link",
        desc: "Omada, Deco and JetStream networking.",
      },
      {
        label: "Ubiquiti",
        href: "/partners/ubiquiti",
        desc: "UniFi Wi-Fi, switching and long-range links.",
      },
      {
        label: "Fortinet",
        href: "/partners/fortinet",
        desc: "FortiGate firewalls and Secure SD-WAN.",
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      {
        label: "Banking & Financial Industry",
        href: "/industries/banking-and-finance",
        desc: "Uptime and compliance-first IT for banks.",
      },
      {
        label: "Healthcare",
        href: "/industries/healthcare",
        desc: "Private patient data and always-on systems.",
      },
      {
        label: "Government & Public Sector",
        href: "/industries/government",
        desc: "IT built for accountability at scale.",
      },
      {
        label: "Education",
        href: "/industries/education",
        desc: "Campus-wide connectivity for schools and universities.",
      },
      {
        label: "Telecommunications",
        href: "/industries/telecomunication",
        desc: "The backbone behind every connection.",
      },
      {
        label: "Enterprise",
        href: "/industries/enterprise",
        desc: "One standard across every department and site.",
      },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  {
    label: "Resources",
    href: "/blog",
    children: [
      {
        label: "Blog",
        href: "/blog",
        desc: "IT and security insight from our team.",
      },
      {
        label: "Events",
        href: "/events",
        desc: "Summits and expos where we meet partners.",
      },
      {
        label: "Leadership",
        href: "/leadership",
        desc: "Meet the people leading Comtech.",
      },
    ],
  },
];

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

const ArrowCircle = () => (
  <span
    aria-hidden
    className="grid size-7 shrink-0 place-items-center rounded-full bg-[#5522d6]/40 text-white transition-colors group-hover:bg-[#7950e2]"
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </span>
);

export function Header({ posts = [] }: { posts?: MenuPost[] }) {
  const [open, setOpen] = useState(false); // mobile menu
  const [dd, setDd] = useState<string | null>(null); // desktop mega menu that is open
  const [sub, setSub] = useState<string | null>(null); // mobile accordion that is open
  const [more, setMore] = useState<Record<string, boolean>>({}); // "Show more" per menu
  const [h, setH] = useState(0); // height of the active panel (animated)
  const panels = useRef<Record<string, HTMLDivElement | null>>({});
  const path = usePathname() ?? "/";

  // Highlight the section you are in (e.g. /services/networking keeps "Services" bold).
  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
  const itemActive = (it: NavItem) =>
    isActive(it.href) || !!it.children?.some((c) => isActive(c.href));

  // panel height follows the active menu (and "Show more") smoothly
  useEffect(() => {
    const el = dd ? panels.current[dd] : null;
    if (!el) return;
    setH(el.offsetHeight);
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [dd]);

  const show = (k: string) => {
    if (dd === null) setMore({}); // fresh start each time the menu opens
    setDd(k);
  };
  const hideNow = () => setDd(null); // no timer = no lag
  const close = () => {
    setOpen(false);
    setDd(null);
    setSub(null);
  };

  return (
    <header
      className="wrap hdr"
      onMouseLeave={hideNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          hideNow();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setDd(null);
      }}
    >
      <Link href="/" className="logo" onClick={close}>
        Comtech Associates
      </Link>

      {/* desktop triggers */}
      <nav>
        {nav.map((it) => {
          const active = itemActive(it);
          const weight = { fontWeight: active ? 700 : 400 };
          if (!it.children) {
            return (
              <Link
                key={it.label}
                href={it.href}
                aria-current={active ? "page" : undefined}
                style={weight}
                onClick={close}
                onMouseEnter={hideNow}
              >
                {it.label}
              </Link>
            );
          }
          const isOpen = dd === it.label;
          return (
            <Link
              key={it.label}
              href={it.href}
              aria-current={active ? "page" : undefined}
              aria-haspopup="true"
              aria-expanded={isOpen}
              style={weight}
              className="bg-transparent! inline-flex items-center gap-1.5"
              onClick={close}
              onMouseEnter={() => show(it.label)}
              onFocus={() => show(it.label)}
            >
              {it.label}
              <Chevron open={isOpen} />
            </Link>
          );
        })}
      </nav>

      {/* ONE shared mega panel: menus cross-fade inside it, height animates */}
      <div
        className={`absolute inset-x-5 top-full z-50 hidden pt-4 transition-opacity duration-150 min-[1101px]:block ${
          dd
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="relative overflow-hidden rounded-[40px] shadow-[0_24px_60px_rgba(0,0,0,.6)] transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            height: h,
            background: "linear-gradient(180deg, #080808 0%, #100726 88%)",
          }}
        >
          {nav
            .filter((n) => n.children)
            .map((it) => {
              const on = dd === it.label;
              const items = it.children!;
              const expanded = !!more[it.label];
              const shown = expanded ? items : items.slice(0, VISIBLE);
              return (
  <div
    key={it.label}
    ref={(el) => {
      panels.current[it.label] = el;
    }}
    aria-hidden={!on}
    inert={!on}
    className={`absolute inset-x-0 top-0 p-8 transition-[opacity,transform] duration-200 ease-out ${
      on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
    }`}
  >
    <div className={`grid items-start gap-6 ${posts.length ? "grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]" : ""}`}>
      <div>
        {/* 2 per row (3 when there is no blog column); leftover items stretch to fill the last row */}
        <ul className="flex flex-wrap gap-4">
          {shown.map((c) => (
            <li
              key={c.label}
              className={`min-w-0 grow ${
                posts.length ? "basis-[calc((100%-1rem)/2)]" : "basis-[calc((100%-2rem)/3)]"
              }`}
            >
              <Link
                href={c.href}
                onClick={close}
                aria-current={isActive(c.href) ? "page" : undefined}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-[#7950e2] hover:bg-white/5"
              >
                <span>
                  <span className="block text-[17px] font-medium leading-[24px]">{c.label}</span>
                  {c.desc && (
                    <span className="mt-1 block text-[13px] leading-[20px] text-white/60">{c.desc}</span>
                  )}
                </span>
                <ArrowCircle />
              </Link>
            </li>
          ))}
        </ul>

        {items.length > VISIBLE && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setMore((m) => ({ ...m, [it.label]: !expanded }))}
              className="inline-flex h-[40px] cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-5 text-[14px] transition-colors hover:border-[#7950e2] hover:bg-white/5"
            >
              {expanded ? "Show less" : `Show ${items.length - VISIBLE} more`}
              <Chevron open={expanded} />
            </button>
          </div>
        )}
      </div>

      {posts.length > 0 && (
        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              onClick={close}
              className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" className="h-[72px] w-[104px] shrink-0 rounded-lg object-cover" />
              <span className="min-w-0">
                <span className="line-clamp-2 block text-[14px] leading-[20px]">{p.title}</span>
                <span className="mt-1 block text-[12px] text-[#b79cff]">Read More</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
);
            })}
        </div>
      </div>

      <div className="hdr-cta" onMouseEnter={hideNow}>
        <Btn v="p" href="/contact">
          Get in touch
        </Btn>
      </div>

      <button
        type="button"
        className="burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <path d="M5 5l14 14M19 5L5 19" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* mobile (unchanged) */}
      {open && (
        <div id="mobile-menu" className="mnav">
          {nav.map((it) =>
            it.children ? (
              <div key={it.label}>
                <div className="flex items-center justify-between">
                  <Link href={it.href} onClick={close}>
                    {it.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${sub === it.label ? "Collapse" : "Expand"} ${it.label}`}
                    aria-expanded={sub === it.label}
                    className="p-3"
                    onClick={() =>
                      setSub((s) => (s === it.label ? null : it.label))
                    }
                  >
                    <Chevron open={sub === it.label} />
                  </button>
                </div>
                {sub === it.label && (
                  <div className="flex flex-col pl-4">
                    {it.children.map((c) => (
                      <Link key={c.label} href={c.href} onClick={close}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={it.label} href={it.href} onClick={close}>
                {it.label}
              </Link>
            ),
          )}
          <div className="mnav-cta">
            <Btn v="p" href="/contact">
              Get in touch
            </Btn>
          </div>
        </div>
      )}
    </header>
  );
}
