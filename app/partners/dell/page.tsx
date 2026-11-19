import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  title: "Dell Partner in Pakistan | Comtech Associates",
  description:
    "Dell servers, storage, PowerProtect backup and business PCs in Pakistan, supplied and supported by Comtech Associates, an authorized Dell partner.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Dependable Dell Technology, 
        <br />
        From Data Center to Desktop.
      </>
    ),
    text: (
      <>
        Servers, storage, backup and business PCs from one trusted source. Comtech Associates is an <b className="font-bold">Authorized Dell Partner</b> supplying and supporting Dell technology across Pakistan.
      </>
    ),
    cta: "Request a Dell Infrastructure Assessment ",
  },
  intro: {
    title: <>A strategic partner, not just a reseller.</>,
    paragraphs: [
      "Innovation drives sustainable business success, and Comtech helps organizations use Dell technology for efficiency, security and scalability, from the data center to the workstation.",
      "We are authorized to sell Dell products with manufacturer-backed support and authenticity assurance. Our certified professionals handle consultation, solution design and post-deployment technical support for small and mid-sized enterprises and large corporations alike.",
    ],
    tagline: "Every product is genuine, performance tested and covered by Dell’s official warranty.",
  },
  audience: {
    title: "Four jobs Dell helps you finish.",
    sub: "The goals customers bring us most often.",
    items: [
      {
        title: "Modernize IT",
        text: "Servers and cloud-ready systems that replace aging hardware.",
      },
      {
        title: "Streamline operations",
        text: "Energy-efficient computing that lowers running costs.",
      },
      {
        title: "Enhance collaboration",
        text: "Secure, performance-driven devices for every team member.",
      },
      {
        title: "Gain digital agility",
        text: "Scalable, integrated infrastructure that grows with you.",
      },
    ],
  },
  layers: {
    title: (
      <>
        Everything from the desktop 
        <br />
        to the data center.
      </>
    ),
    sub: "Six product groups, each with Dell’s warranty behind it.",
    items: [
      {
        title: "Business Laptops and Desktops",
        text: "Latitude, OptiPlex and Precision series for everyday and professional work.",
      },
      {
        title: "Servers",
        text: "PowerEdge servers for modern, cloud-ready IT environments.",
      },
      {
        title: "Storage",
        text: "PowerVault storage for growing data.",
      },
      {
        title: "Data Protection and Backup",
        text: "PowerProtect solutions for backup and disaster recovery.",
      },
      {
        title: "Monitors and Peripherals",
        text: "Dell monitors and accessories for professional settings.",
      },
      {
        title: "Networking and Infrastructure",
        text: "Switches, routers and converged infrastructure.",
      },
    ],
  },
  why: {
    title: (
      <>
        A reseller that behaves 
        <br />
        like an IT partner.
      </>
    ),
    items: [
      {
        title: "Authentic, with access",
        text: "Authorized partner status, with authenticity assured and direct access to Dell resources.",
      },
      {
        title: "Certified people",
        text: "Design, setup and support from certified technical experts.",
      },
      {
        title: "Assessment to maintenance",
        text: "One partner from the first consultation through deployment and upkeep.",
      },
      {
        title: "Delivered nationwide",
        text: "A fast distribution network, and an approach focused on long-term value.",
      },
    ],
  },
  status: {
    title: "Authorized, five categories, delivered nationwide.",
    sub: "What the partnership covers.",
    stats: [
      { big: "Authorized", small: "Dell Partner" },
      { big: "5", small: "Dell product categories we deliver" },
      { big: "Nationwide", small: "delivery across Pakistan" },
    ],
  },
  faq: {
    title: (
      <>
        Dell,
        <br />
        answered.
      </>
    ),
    items: [
      [
        "Can you supply laptops and servers in one order?",
        "Yes. Comtech supplies business laptops and desktops, servers, storage, monitors and networking from Dell.",
      ],
      [
        "What does Dell offer for backup?",
        "PowerProtect solutions for backup and disaster recovery.",
      ],
      [
        "Whose warranty covers the hardware?",
        "Dell’s official warranty covers every product, with Comtech’s after-sales service on top.",
      ],
      [
        "Do you help work out what to buy?",
        "Yes. Certified professionals provide consultation and solution design before anything is ordered.",
      ],
    ],
  },
  cta: {
    title: "Modernize on your terms?",
    text: "Request an assessment and we’ll map your servers, storage and devices to what Dell can do for you.",
    label: "Request a Dell Infrastructure Assessment",
  },
};

export default function Dell() {
  return <PartnerDetail d={data} />;
}
