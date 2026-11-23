import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  alternates: { canonical: "https://comtech.net.pk/partners/dlink" },
  title: "D-Link Partner in Pakistan | Comtech Associates",
  description:
    "Comtech Associates is an authorized D-Link partner in Pakistan, supplying switches, Wi-Fi, IP cameras and storage with design and after-sales support.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Networks That Stay Up, 
        <br />
        From Switch to Camera.
      </>
    ),
    text: (
      <>
       Comtech Associates is an <b className="font-bold">authorized D-Link partner</b> in Pakistan, supplying D-Link switches, wireless, surveillance and storage with consultation, design, deployment and after-sales support.
        
      </>
    ),
    cta: "Request a D-Link Network Assessment",
  },
  intro: {
    title: <>Reliable, innovative and built around your success.</>,
    paragraphs: [
      "With more than a decade of experience in IT supply and integration, Comtech works with D-Link to deliver networking you can rely on. Every D-Link product we deliver is genuine, performance tested and backed by the manufacturer’s warranty.",
      "Our certified professionals work with D-Link’s regional support teams on consultation, network design, deployment and maintenance.",
    ],
    tagline: "Secure office networks. Campus Wi-Fi. Smart surveillance.",
  },
  audience: {
    title: "Built for the places that cannot afford downtime.",
    sub: "Sectors we deploy D-Link into.",
    items: [
      {
        title: "Education",
        text: "Campus Wi-Fi and wired networks for students and staff.",
      },
      {
        title: "Healthcare",
        text: "Dependable connectivity and surveillance for hospitals and clinics.",
      },
      {
        title: "Government",
        text: "Secure office networking and monitoring for public bodies.",
      },
      {
        title: "Manufacturing and enterprise",
        text: "Stable networks and cameras for plants, offices and warehouses.",
      },
    ],
  },
  layers: {
    title: (
      <>
       What we deliver with D-Link.
        {/* <br />
        and the boardroom. */}
      </>
    ),
    sub: "From the core switch to the camera on the wall.",
    items: [
      {
        title: "Switches",
        text: "Managed, unmanaged and PoE-enabled models for offices, campuses and sites.",
      },
      {
        title: "Routers and Access Points",
        text: "Enterprise-grade devices for indoor and outdoor Wi-Fi.",
      },
      {
        title: "CCTV and IP Cameras",
        text: "Monitoring with motion detection, remote access and round-the-clock protection.",
      },
      {
        title: "Network Storage",
        text: "NAS options for storing and protecting business data.",
      },
      {
        title: "Network Accessories",
        text: "Patch panels, media converters and the parts that keep a network tidy.",
      },
      {
        title: "Structured Cabling",
        text: "The cabling foundation that every reliable network sits on.",
      },
    ],
  },
  why: {
    title: (
      <>
        Why organizations choose Comtech for D-Link.

        {/* <br />
        not just installed. */}
      </>
    ),
    items: [
      {
        title: "Genuine and warrantied",
        text: "Every product is genuine, performance tested and manufacturer backed.",
      },
      {
        title: "Certified experts",
        text: "Consultation, setup and support from certified technical people.",
      },
      {
        title: "Before and after the sale",
        text: "Help with planning, deployment and everything that follows.",
      },
      {
        title: "Delivered across Pakistan",
        text: "A supply network built for fast availability and delivery nationwide.",
      },
    ],
  },
  status: {
    title: "D-Link, at a glance.",
    sub: "The facts behind the partnership.",
    stats: [
      { big: "Authorized", small: "D-Link partner" },
      { big: "100%", small: "genuine, performance-tested products" },
      {
        big: "4",
        small: "D-Link product lines we deliver",
      },
    ],
  },
  faq: {
    title: (
      <>
        D-Link, 
        <br />
       straight answers.
      </>
    ),
    items: [
      [
        "Is Comtech an authorized D-Link partner?",
        "Yes. Comtech supplies D-Link networking products with consultation, technical expertise and after-sales support.",
      ],
      [
        "Which D-Link products does Comtech deliver?",
        "Switches, routers and access points, CCTV and IP cameras, NAS storage, and network accessories such as patch panels and media converters.",
      ],
      [
        "Are the products genuine?",
        "Yes. Comtech states that every D-Link product it delivers is genuine, performance tested and backed by manufacturer warranties.",
      ],
      [
        "Does Comtech help with design and installation?",
        "Yes. Certified professionals handle consultation, network design, deployment and maintenance.",
      ],
    ],
  },
  cta: {
    title: "Ready to upgrade your network?",
    text: "Tell us what you run today and we’ll show you what a D-Link design could do for it.",
    label: "Request a D-Link Network Assessment",
  },
};

export default function Dlink() {
  return <PartnerDetail d={data} />;
}
