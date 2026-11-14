import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  title: "Avaya Partner in Pakistan | Comtech Associates",
  description:
    "Avaya IP telephony, unified communications and contact center solutions in Pakistan from Comtech Associates, an authorized Avaya partner.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Business Communications,
        <br />
        Without the Complexity.
      </>
    ),
    text: (
      <>
        Every missed call is a missed conversation. Comtech Associates is an{" "}
        <b className="font-bold">Authorized Avaya Partner</b>, helping Pakistani
        organizations plan, deploy and support business communications.
      </>
    ),
    cta: "Request an Avaya Communications Assessment",
  },
  intro: {
    title: (
      <>
        Communication that keeps
        <br />
        your business reachable.
      </>
    ),
    paragraphs: [
      "Customers, staff and partners all expect to reach you, and to be heard clearly when they do. Comtech helps organizations plan, deploy and support Avaya communications so calls, meetings and customer conversations just work.",
      "Our certified engineers integrate Avaya into your existing IT environment and support it after go-live.",
    ],
    tagline: "Plan it. Deploy it. Keep it running.",
  },
  audience: {
    title: "Organizations that live on the phone.",
    sub: "Four places where Avaya earns its keep.",
    items: [
      {
        title: "Enterprises",
        text: "Reliable calling and collaboration across sites.",
      },
      {
        title: "Banks and financial services",
        text: "Clear, dependable customer conversations.",
      },
      {
        title: "Government and public bodies",
        text: "Communication systems built for continuity.",
      },
      {
        title: "Customer service teams",
        text: "Contact tools for high-volume conversations.",
      },
    ],
  },
  layers: {
    title: (
      <>
        Four ways to keep customers and
        <br />
        colleagues connected.
      </>
    ),
    sub: "Four solution areas, one partner.",
    items: [
      {
        title: "IP Telephony",
        text: "Enterprise-grade VoIP calling for offices and branches.",
      },
      {
        title: "Unified Communications",
        text: "Voice, video and messaging brought together on one platform.",
      },
      {
        title: "Contact Center",
        text: "Tools that help teams handle customer conversations efficiently.",
      },
      {
        title: "Cloud Communications",
        text: "Communications delivered from the cloud for flexible, hybrid teams.",
      },
    ],
  },
  why: {
    title: (
      <>
        Communication is only as good
        <br />
        as the deployment behind it.
      </>
    ),
    items: [
      {
        title: "Designed for local needs",
        text: "Systems planned around how Pakistani organizations work.",
      },
      {
        title: "Fitted into your IT",
        text: "Avaya integrated with your existing network and environment.",
      },
      {
        title: "One team throughout",
        text: "Planning, deployment and support without a handover gap.",
      },
      {
        title: "Engineers who stay with it",
        text: "Certified engineers who deploy and support the platform.",
      },
    ],
  },
  status: {
    title: "Authorized and local.",
    sub: "Status and reach.",
    stats: [
      { big: "Avaya Partner", small: "Authorized" },
      { big: "4", small: "Avaya solution areas we cover" },
      { big: "4", small: "offices: Karachi, Islamabad, Lahore, Quetta" },
    ],
  },
  faq: {
    title: (
      <>
        Avaya,
        <br />
        in plain terms.
      </>
    ),
    // TODO: answers 2-4 are drafted from the page copy (not in the design), replace with final copy
    items: [
      [
        "What status does Comtech hold with Avaya?",
        "Comtech Associates is an Authorized Avaya Partner.",
      ],
      [
        "What can Avaya replace in our phone setup?",
        "Avaya covers IP telephony, unified communications, contact center and cloud communications. Exact product lines are confirmed during scoping.",
      ],
      [
        "Will it work with our existing network?",
        "Comtech integrates Avaya into your existing IT and network environment as part of each deployment.",
      ],
      [
        "Who supports it afterward?",
        "Comtech continues to support the deployment after go-live.",
      ],
    ],
  },
  // TODO: the design says the project story is still pending from the client; swap in the real story when supplied
  cta: {
    title: "Let’s fix how you communicate.",
    text: "Request an assessment and we’ll review your calling, collaboration and contact center needs.",
    label: "Request an Avaya Communications Assessment",
  },
};

export default function Avaya() {
  return <PartnerDetail d={data} />;
}
