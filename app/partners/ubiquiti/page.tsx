import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  title: "Ubiquiti Partner in Pakistan | Comtech Associates",
  description:
    "Comtech Associates is an authorized Ubiquiti wireless networking partner in Pakistan: UniFi Wi-Fi, switching, surveillance and long-range links.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Wireless That Reaches Everything 
        <br />
        Your Business Does.
      </>
    ),
    text: (
      <>
        Comtech Associates is an <b className="font-bold">Authorized Ubiquiti Wireless Networking Partner</b> in Pakistan, designing, deploying and supporting UniFi, EdgeMAX and airMAX networks for businesses, campuses, hospitality and smart environments.
        
      </>
    ),
    cta: "Request a Ubiquiti Site Assessment",
  },
  intro: {
    title: <>Design, deployment and support, from one partner.</>,
    paragraphs: [
      "Comtech handles the full Ubiquiti journey: design, deployment, installation and technical support. From Wi-Fi coverage in an office to long-distance links between sites, we make sure the network is planned before it is installed.",
      "We also showcase Ubiquiti technology at national IT exhibitions, so you can see it working before you decide.",
    ],
    tagline: "Planned properly. Installed cleanly. Supported after.",
  },
  audience: {
    title: "Built for spaces that depend on reliable wireless.",
    sub: "Ubiquiti suits more than offices.",
    items: [
      {
        title: "Businesses",
        text: "Reliable Wi-Fi, routing and security for offices and branches.",
      },
      {
        title: "Campuses",
        text: "Coverage and capacity for students, staff and buildings spread across a site.",
      },
      {
        title: "Hospitality",
        text: "Guest Wi-Fi and back-of-house connectivity that works across every floor.",
      },
      {
        title: "Smart environments",
        text: "Connected cameras, door access and voice on one managed system.",
      },
    ],
  },
  layers: {
    title: (
      <>
        What we deliver with Ubiquiti.
        {/* <br />
        on one design. */}
      </>
    ),
    sub: "Six practices, one ecosystem.",
    items: [
      {
        title: "UniFi Wi-Fi",
        text: "UniFi access points for strong coverage and smooth roaming across offices, campuses and venues.",
      },
      {
        title: "Cloud Management and Gateways",
        text: "UniFi controllers for cloud-based, centralized management, plus cloud gateways with firewall, VPN and deep packet inspection.",
      },
      {
        title: "Routing and Switching",
        text: "EdgeMAX routers and switches, and UniFi managed, PoE and multi-gigabit switches.",
      },
      {
        title: "Long-Distance Wireless",
        text: "airMAX, airFiber, LTU and AirVision for long-distance and point-to-point links.",
      },
      {
        title: "Surveillance",
        text: "UniFi Protect IP surveillance with motion detection.",
      },
      {
        title: "Access Control and Voice",
        text: "UniFi Access for door control and UniFi Talk for cloud VoIP.",
      },
    ],
  },
  why: {
    title: (
      <>
        Why organizations choose Comtech for Ubiquiti.
        {/* <br />
        not just installed. */}
      </>
    ),
    items: [
      {
        title: "Authorized partner",
        text: "Genuine Ubiquiti products, supplied by an authorized wireless networking partner.",
      },
      {
        title: "Design first",
        text: "We plan coverage and capacity before a single device goes up",
      },
      {
        title: "Installed and supported",
        text: "Deployment, installation and technical support from the same team.",
      },
      {
        title: "Seen to be believed",
        text: "We show Ubiquiti at national IT exhibitions so you can try it first.",
      },
    ],
  },
  status: {
    title: "Ubiquiti, at a glance.",
    sub: "The facts behind the partnership.",
    stats: [
      { big: "Authorized", small: "Ubiquiti wireless networking partner" },
      { big: "10", small: "Ubiquiti product lines we deliver" },
      {
        big: "4",
        small: "cities served: Karachi, Islamabad, Lahore, Quetta",
      },
    ],
  },
  faq: {
    title: (
      <>
        TP-Link,
        <br />
        straight answers.
      </>
    ),
    items: [
      [
        "Is Comtech an authorized Ubiquiti partner?",
        "Yes. Comtech is an Authorized Ubiquiti Wireless Networking Partner in Pakistan.",
      ],
      [
        "Which Ubiquiti products does Comtech deliver?",
        "UniFi access points, controllers, switches, cloud gateways, Protect, Access and Talk, plus EdgeMAX, airMAX, airFiber, AirVision and LTU systems.",
      ],
      [
        "Can Ubiquiti cover large or outdoor sites?",
        "Yes. airMAX, airFiber and LTU systems are built for long-distance and point-to-point links, and UniFi access points cover campuses and venues.",
      ],
      [
        "Does Comtech support Ubiquiti networks after installation?",
        "Yes. Design, deployment, installation and technical support are all part of the service.",
      ],
    ],
  },
  cta: {
    title: "Ready to plan your Ubiquiti network?",
    text: "Book a site assessment and we’ll show you the coverage, capacity and equipment you actually need.",
    label: "Request a Ubiquiti Site Assessment",
  },
};

export default function Ubiquiti() {
  return <PartnerDetail d={data} />;
}
