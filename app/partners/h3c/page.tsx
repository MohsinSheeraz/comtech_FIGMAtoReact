import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/partners/h3c", {
    alternates: { canonical: "https://comtech.net.pk/partners/h3c" },
  });
}

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Networking, Computing and Security 
        <br />
        From One Digital Infrastructure Vendor.
      </>
    ),
    text: (
      <>
        H3C technology for Pakistan’s enterprises, planned and supported by Comtech Associates, an <b className="font-bold">Authorized Grandstream Partner</b>
      </>
       
    ),
    cta: "Request an H3C Network Assessment",
  },
  intro: {
    title: <>A Vendor that came to Pakistan through its partners.</>,
    paragraphs: [
      "H3C announced its entry into the Pakistani market in November 2019 with a partner event in Islamabad.",
      "Comtech brings H3C’s range to organizations that want one vendor across their network, servers, storage and security, with a local team to plan and support it.",
    ],
    tagline:
      "Global scale. Local support.",
  },
  audience: {
    title: "Networks big and small.",
    sub: "H3C also offers products for smaller businesses.",
    items: [
      {
        title: "Enterprises and campuses",
        text: "Wired and wireless networks for sites that keep growing.",
      },
      {
        title: "Branch and wide-area networks",
        text: "Routing built for connecting many locations.",
      },
      {
        title: "Data centers",
        text: "Servers, storage and switching from the same vendor.",
      },
      {
        title: "Smaller businesses",
        text: "Right-sized products from H3C’s SMB range.",
      },
    ],
  },
  layers: {
    title: (
      <>
        Six product families, 
        <br />
        one digital infrastructure vendor.
      </>
    ),
    sub: "H3C’s public portfolio, which we can scope with you.",
    items: [
      {
        title: "Switches",
        text: "Switching from the campus edge to the data center core.",
      },
      {
        title: "Routers",
        text: "Routing for branch, wide-area and enterprise networks.",
      },
      {
        title: "Wireless",
        text: "Wireless access for enterprise and campus environments.",
      },
      {
        title: "UniServer Servers",
        text: "The UniServer series for compute workloads.",
      },
      {
        title: "Storage",
        text: "Storage area network and distributed storage options.",
      },
      {
        title: "Security",
        text: "Network security products, including zero trust approaches.",
      },
    ],
  },
  why: {
    title: (
      <>
        Fewer vendors, 
        <br />
        fewer handoffs.
      </>
    ),
    items: [
      {
        title: "One vendor, many layers",
        text: "Network, compute, storage and security planned together.",
      },
      {
        title: "Authorized partner",
        text: "Genuine H3C products through an authorized channel.",
      },
      {
        title: "Local team",
        text: "Offices in Karachi, Islamabad, Lahore and Quetta.",
      },
      {
        title: "Planned before quoted",
        text: "We map the design to your sites and workloads first.",
      },
    ],
  },
  status: {
    title: "Authorized, established and four areas wide.",
    sub: "Where the relationship stands.",
    stats: [
      { big: "Authorized", small: "H3C Partner" },
      { big: "2019", small: "year H3C entered the Pakistani market" },
      { big: "4", small: "H3C areas we can scope: networking, computing, storage, security" },
    ],
  },
  faq: {
    title: (
      <>
        H3C,
        <br />
        explained.
      </>
    ),
    items: [
      [
        "Who is H3C?",
        "H3C is a digital infrastructure vendor whose portfolio covers networking, computing, storage and security.",
      ],
      [
        "Is H3C active in Pakistan?",
        "Yes. H3C announced its entry into the Pakistani market in 2019.",
      ],
      [
        "Can H3C cover wireless as well as wired?",
        "Yes. H3C’s range includes switches, routers and wireless.",
      ],
      [
        "What is the first step?",
        "A network assessment. We review what you run and recommend what H3C products could replace or extend.",
      ],
    ],
  },
  cta: {
    title: "Talk to us about H3C",
    text: "Request an assessment and we’ll show you where H3C fits in your network.",
    label: "Request an H3C Network Assessment",
  },
};

export default function H3C() {
  return <PartnerDetail d={data} />;
}
