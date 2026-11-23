import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  alternates: { canonical: "https://comtech.net.pk/partners/broadcom" },
  title: "Broadcom Partner in Pakistan | Comtech Associates",
  description:
    "VMware Cloud Foundation, vSphere, vSAN and NSX in Pakistan, deployed by Comtech Associates, an authorized Broadcom partner.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Private Cloud, Modernized:
        <br />
        VMware Cloud Foundation in Pakistan.
      </>
    ),
    text: (
      <>
       Modern enterprise IT is moving to private cloud. Comtech Associates, an <b className="font-bold">Authorized Broadcom Partner</b>, supports VMware Cloud Foundation deployments across Pakistan.

      </>
    ),
    cta: "Request a Private Cloud Assessment",
  },
  intro: {
    title: <>From implementation expert to trusted partner.</>,
    paragraphs: [
      "Broadcom leads in enterprise software infrastructure across private cloud, cybersecurity and mainframe, with a focus on VMware Cloud Foundation. Comtech is an authorized Broadcom partner supporting digital transformation in Pakistan.",
      "Our focus is enterprise VMware deployments and cloud infrastructure that move organizations toward a modern private cloud.",
    ],
    tagline:
      "Local knowledge. Full portfolio access. Consultation to support.",
  },
  audience: {
    title: "The four building blocks of a private cloud.",
    sub: "Platform, virtualization, networking and operations.",
    items: [
      {
        title: "VMware Cloud Foundation",
        text: "A complete private cloud platform for modern enterprise workloads.",
      },
      {
        title: "vSphere and vSAN",
        text: "Virtualization and software-defined storage for cloud infrastructure.",
      },
      {
        title: "NSX",
        text: "Network virtualization and security for the private cloud.",
      },
      {
        title: "Aria Suite and Tanzu",
        text: "Operations management and application platform tools for the VMware portfolio.",
      },
    ],
  },
  layers: {
    title: (
      <>
        Who a private 
        <br />
        cloud suits best.
      </>
    ),
    sub: "Four types of organization that benefit.",
    items: [
      {
        title: "Enterprises",
        text: "Consolidated, software-defined infrastructure for large estates.",
      },
      {
        title: "Regulated organizations",
        text: "Private cloud that keeps data and control in-house.",
      },
      {
        title: "IT teams",
        text: "Fewer moving parts and simpler operations.",
      },
      {
        title: "Growing businesses",
        text: "A platform that scales without a rebuild.",
      },
    ],
  },
  why: {
    title: (
      <>
        A VMware project is only as strong 
        <br />
        as the team behind it.
      </>
    ),
    items: [
      {
        title: "We know the local landscape",
        text: "Experience of how enterprise IT really runs in Pakistan.",
      },
      {
        title: "Access to the whole portfolio",
        text: "Not a single product, but the range that makes up the private cloud.",
      },
      {
        title: "Assessment to support",
        text: "Deployment from the first consultation through to ongoing support.",
      },
      {
        title: "Certified and authorized",
        text: "Authorized partner status and VMware technical certifications.",
      },
    ],
  },
  status: {
    title: "Authorized, certified and VMware-focused.",
    sub: "What stands behind our deployments.",
    stats: [
      { big: "Authorized", small: "Broadcom Partner" },
      { big: "VMware", small: "technical certifications held" },
      { big: "5", small: "Broadcom and VMware platforms we deliver" },
    ],
  },
  faq: {
    title: (
      <>
        Private cloud, 
        <br />
        explained.
      </>
    ),
    items: [
      [
        "What is VMware Cloud Foundation?",
        "It is Broadcom’s private cloud platform, and the focus of Comtech’s enterprise VMware deployments.",
      ],
      [
        "What do vSphere and vSAN do?",
        "vSphere provides virtualization and vSAN provides software-defined storage for the cloud infrastructure.",
      ],
      [
        "What does NSX add?",
        "NSX brings network virtualization and security into the private cloud.",
      ],
      [
        "Can Comtech see us through to support?",
        "Yes. The service runs from consultation through deployment to ongoing support.",
      ],
    ],
  },
  // TODO: the design says the project story is still pending from the client; swap in the real story when supplied
  cta: {
    title: "Start your private cloud journey?",
    text: "Request an assessment and we’ll scope what VMware Cloud Foundation could look like in your environment.",
    label: "Request a Private Cloud Assessment",
  },
};

export default function Broadcom() {
  return <PartnerDetail d={data} />;
}
