import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  alternates: { canonical: "https://comtech.net.pk/partners/grandstream" },
  title: "Grandstream Partner in Pakistan | Comtech Associates",
  description:
    "Grandstream Wi-Fi 6 access points, switches, routers and UC in Pakistan, deployed by Comtech Associates, an authorized Grandstream partner.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Future-Proof Your Network 
        <br />
        and Your Calls.
      </>
    ),
    text: (
      <>
        Wi-Fi 6, switching, routing and voice on one platform family. Comtech Associates is an <b className="font-bold">Authorized Grandstream Partner</b> delivering it across Pakistan.
      </>
    ),
    cta: " Request a Grandstream Network Assessment ",
  },
  intro: {
    title: <>Genuine Grandstream. Certified deployment.</>,
    paragraphs: [
      "Reliable communication and connectivity are now business-critical. Comtech and Grandstream bring scalable, high-speed and affordable systems to enterprises, educational institutions and service providers.",
      "Our Authorized Partner status guarantees genuine Grandstream solutions, and our engineers have the skills to deploy and support VoIP, Wi-Fi and networking.",
    ],
    tagline:
      "Bandwidth. Reliability. Protection. Simple management. Room to grow.",
  },
  audience: {
    title: "Four environments that depend on connectivity.",
    sub: "Where Grandstream is a good fit.",
    items: [
      {
        title: "Corporate businesses",
        text: "Calling and Wi-Fi that scale across offices.",
      },
      {
        title: "Educational campuses",
        text: "High-density Wi-Fi and managed networks.",
      },
      {
        title: "Healthcare facilities",
        text: "Reliable voice and wireless coverage across sites.",
      },
      {
        title: "Retail and hospitality",
        text: "Guest Wi-Fi and communication for busy venues.",
      },
    ],
  },
  layers: {
    title: (
      <>
        Wi-Fi, switching, routing, 
        <br />
        voice and cloud, together.
      </>
    ),
    sub: "Six practices that work as one.",
    items: [
      {
        title: "Wi-Fi Access Points (GWN)",
        text: "Wi-Fi 6 coverage with self-healing mesh for high-density environments.",
      },
      {
        title: "Routers and Gateways",
        text: "Routing with VPN, VLAN and QoS support for distributed and remote networks.",
      },
      {
        title: "Networking Switches",
        text: "Layer 2+ and Layer 3 managed switches with PoE support.",
      },
      {
        title: "Unified Communications",
        text: "Voice, video and data in one platform for better collaboration and lower communication costs.",
      },
      {
        title: "Cloud Management",
        text: "GWN.Cloud and GWN Manager for centralized monitoring, configuration and analytics across sites.",
      },
      {
        title: "End-to-End Implementation",
        text: "Consultation, network planning, installation, integration and technical support.",
      },
    ],
  },
  why: {
    title: (
      <>
        International experience, 
        <br />
        local relevance.
      </>
    ),
    items: [
      {
        title: "Global product, local context",
        text: "Knowledge of Pakistan’s IT landscape applied to Grandstream’s products.",
      },
      {
        title: "The full range",
        text: "Direct access from Wi-Fi 6 access points to cloud management platforms.",
      },
      {
        title: "Plan to support",
        text: "Planning, installation, integration and support in one project.",
      },
      {
        title: "Certified specialists",
        text: "Grandstream-certified experts on your project.",
      },
    ],
  },
  status: {
    title: "Authorized, local and five categories wide.",
    sub: "Status and range.",
    stats: [
      { big: "Authorized", small: "Grandstream Partner" },
      { big: "4", small: "offices: Karachi, Islamabad, Lahore, Quetta" },
      { big: "5", small: "Grandstream product categories we deliver" },
    ],
  },
  faq: {
    title: (
      <>
        Grandstream, 
        <br />
        answered.
      </>
    ),
    items: [
      [
        "Is it genuine Grandstream?",
        "Yes. Comtech’s Authorized Partner status guarantees genuine Grandstream solutions.",
      ],
      [
        "Can several sites be managed together?",
        "Yes. GWN.Cloud and GWN Manager provide centralized monitoring, configuration and analytics across sites.",
      ],
      [
        "Does Grandstream cover calling as well as Wi-Fi?",
        "Yes. The unified communications range brings voice, video and data into one platform.",
      ],
      [
        "Can it handle a busy environment?",
        "GWN access points offer Wi-Fi 6 coverage with self-healing mesh for high-density environments.",
      ],
    ],
  },
  cta: {
    title: "Don’t get left behind?",
    text: "Future-proof your network today. Request an assessment and talk to our Grandstream specialists.",
    label: "Request a Grandstream Network Assessment",
  },
};

export default function Grandstream() {
  return <PartnerDetail d={data} />;
}
