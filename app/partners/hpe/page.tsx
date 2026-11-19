import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  title: "HPE Partner in Pakistan | Comtech Associates",
  description:
    "HPE ProLiant servers, Alletra storage, Aruba networking and GreenLake in Pakistan, supplied and supported by Comtech Associates, an authorized partner.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Infrastructure From the Data Center 
        <br />
        to the Wireless Edge.
      </>
    ),
    text: (
      <>
       Hewlett Packard Enterprise technology, planned and supported by Comtech Associates, an <b className="font-bold">Authorized HPE Partner</b> in Pakistan.
      </>
        
    ),
    cta: "Request an HPE Infrastructure Assessment",
  },
  intro: {
    title: <>One vendor, edge to cloud.</>,
    paragraphs: [
      "HPE’s portfolio spans compute, storage, networking, private cloud, AI, software and services. The hard part is choosing the pieces that suit your organization and making them work together.",
      "Comtech helps with exactly that. As an authorized partner and system integrator, we start from what you need to run, not from a price list.",
    ],
    tagline: "Choose what you need. We’ll make it work together.",
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
        Six areas we can scope with you.
      </>
    ),
    sub: "HPE’s public portfolio, matched to the way Pakistani organizations buy.",
    items: [
      {
        title: "Compute",
        text: "HPE ProLiant servers for core business workloads.",
      },
      {
        title: "Storage",
        text: "HPE Alletra Storage MP for data that keeps growing.",
      },
      {
        title: "Campus and Branch Networking",
        text: "HPE Aruba Networking access points with Wi-Fi 7, managed through Aruba Central.",
      },
      {
        title: "Data Center Networking",
        text: "Apstra Data Center Director for fabric management and automation.",
      },
      {
        title: "Private Cloud and GreenLake",
        text: "The HPE GreenLake platform for a unified cloud experience across IT.",
      },
      {
        title: "Services",
        text: "Advisory and professional, managed and education services from HPE.",
      },
    ],
  },
  why: {
    title: (
      <>
        A partner that designs 
        <br />
        before it quotes.
      </>
    ),
    items: [
      {
        title: "Authorized partner",
        text: "Genuine HPE products through an authorized channel.",
      },
      {
        title: "Designed, not just supplied",
        text: "We map servers, storage and networking to your workloads first.",
      },
      {
        title: "Local team",
        text: "Offices in Karachi, Islamabad, Lahore and Quetta.",
      },
      {
        title: "Support after go-live",
        text: "Help continues once the equipment is racked and running.",
      },
    ],
  },
  status: {
    title: "Authorized, broad and local.",
    sub: "Three facts at a glance.",
    stats: [
      { big: "Authorized", small: "HPE Partner" },
      { big: "6", small: "HPE areas we can scope with you" },
      {
        big: "4",
        small:
          "offices: Karachi, Islamabad, Lahore, Quetta",
      },
    ],
  },
  faq: {
    title: (
      <>
        HPE, 

        <br />
        in plain terms.
      </>
    ),
    items: [
      [
        "What is HPE GreenLake?",
        "HPE describes GreenLake as a cloud that delivers a unified platform experience, to simplify IT, reduce costs and speed up change.",
      ],
      [
        "Does HPE cover networking as well as servers?",
        "Yes. HPE Aruba Networking covers access points and cloud-native management, and HPE also offers data center networking.",
      ],
      [
        "Does HPE offer security products?",
        "HPE’s portfolio includes Aruba Networking Unified SASE and Juniper SRX Series firewalls. Comtech scopes which pieces suit your environment.",
      ],
      [
        "Where do we start?",
        "With an assessment. We review what you run today and recommend what to replace, add or leave alone.",
      ],
    ],
  },
  cta: {
    title: "Plan your HPE environment.",
    text: "Request an assessment and we’ll match HPE’s portfolio to your servers, storage and network.",
    label: "Request an HPE Infrastructure Assessment",
  },
};

export default function HPE() {
  return <PartnerDetail d={data} />;
}
