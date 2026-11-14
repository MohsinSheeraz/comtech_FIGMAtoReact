import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  title: "Kaspersky Partner | Comtech Associates",
  description:
    "Comtech Associates is an Authorized Kaspersky Partner, deploying and managing Kaspersky protection from the endpoint to the plant floor.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Cyber Threats Don’t Wait.
        <br />
        Neither Should Your Defenses.
      </>
    ),
    text: (
      <>
        Ransomware, phishing and insider risk are not slowing down. Comtech
        Associates, an <b className="font-bold">Authorized Kaspersky Partner</b>
        , deploys and manages Kaspersky protection from the endpoint to the
        plant floor.
      </>
    ),
    cta: "Request a Kaspersky Security Assessment",
  },
  intro: {
    title: "Local expertise, global protection.",
    paragraphs: [
      "Ransomware, phishing, supply-chain breaches and insider risks keep growing. Comtech pairs its local presence and certified expertise with Kaspersky’s technology to meet them. As an Authorized Kaspersky Partner, Comtech implements, integrates and manages enterprise-level Kaspersky solutions.",
    ],
    tagline:
      "Local knowledge. Global threat intelligence. One accountable partner.",
  },
  audience: {
    title: "Different organizations, different threats.",
    sub: "Kaspersky also offers security awareness training, threat intelligence and cloud security.",
    items: [
      {
        title: "Enterprises",
        text: "Endpoint, EDR, mail and cloud security managed at scale.",
      },
      {
        title: "Small and midsize businesses",
        text: "Cloud-managed protection that does not need a large security team.",
      },
      {
        title: "Industrial operators",
        text: "KICS protection for plants and operational technology.",
      },
      {
        title: "Offices of every size",
        text: "Small Office Security and Total Security for Business.",
      },
    ],
  },
  layers: {
    title: (
      <>
        Eight layers of defense,
        <br />
        from desk to plant floor.
      </>
    ),
    sub: "Choose the layers that match your risk.",
    items: [
      {
        title: "Endpoint Security for Business",
        text: "Protection for workstations and servers across the organization.",
      },
      {
        title: "Endpoint Detection and Response",
        text: "EDR that helps teams see, investigate and respond to threats.",
      },
      {
        title: "Security for Mail Servers",
        text: "Filtering that stops threats arriving by email.",
      },
      {
        title: "Internet Gateway Security",
        text: "Protection at the gateway where your network meets the web.",
      },
      {
        title: "Endpoint Security Cloud",
        text: "Cloud-managed endpoint protection for growing teams.",
      },
      {
        title: "Industrial CyberSecurity (KICS)",
        text: "Security built for industrial and operational environments.",
      },
      {
        title: "Small Office Security",
        text: "Straightforward protection for small offices.",
      },
      {
        title: "Total Security for Business",
        text: "A complete protection bundle for business users.",
      },
    ],
  },
  why: {
    title: (
      <>
        Threat intelligence is global.
        <br />
        Response has to be local.
      </>
    ),
    items: [
      {
        title: "Local knowledge, global intelligence",
        text: "Pakistan-specific context combined with Kaspersky’s worldwide threat intelligence.",
      },
      {
        title: "The whole range",
        text: "Access to Kaspersky’s complete portfolio, from endpoint to industrial.",
      },
      {
        title: "Advice through to support",
        text: "Consultation, deployment, integration and ongoing support in one service.",
      },
      {
        title: "A partner that shows up",
        text: "Authorized status, Kaspersky Partner Summit 2025 attendance and enterprise deployments.",
      },
    ],
  },
  status: {
    title: "Eight products, one authorized partner.",
    sub: "Status, range and recent activity.",
    stats: [
      { big: "Kaspersky Partner", small: "Authorized" },
      { big: "8", small: "Kaspersky product lines we deliver" },
      { big: "2025", small: "Kaspersky Partner Summit attended" },
    ],
  },
  faq: {
    title: (
      <>
        Security questions,
        <br />
        answered.
      </>
    ),
    // TODO: answers 2-4 are drafted from the card copy above (not in the design), replace with final copy
    items: [
      [
        "Do you cover EDR as well as endpoint protection?",
        "Yes. Kaspersky Endpoint Security for Business and Kaspersky Endpoint Detection and Response are both part of what Comtech delivers.",
      ],
      [
        "Can Kaspersky protect our mail and web traffic?",
        "Yes. Security for Mail Servers and Internet Gateway Security cover those two entry points.",
      ],
      [
        "We run industrial systems. Is there a fit?",
        "Kaspersky Industrial CyberSecurity (KICS) is designed for industrial and operational environments, and Comtech can scope it for your site.",
      ],
      [
        "What if we only have a small office?",
        "Kaspersky Small Office Security and Endpoint Security Cloud are options for smaller teams.",
      ],
    ],
  },
  cta: {
    title: "Close the gap before someone finds it.",
    text: "In cyber security, delay brings danger. Request an assessment and we’ll show you where to start.",
    label: "Request a Kaspersky Security Assessment",
  },
};

export default function Kaspersky() {
  return <PartnerDetail d={data} />;
}
