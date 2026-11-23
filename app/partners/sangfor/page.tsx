import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  alternates: { canonical: "https://comtech.net.pk/partners/sangfor" },
  title: "Sangfor Partner in Pakistan | Comtech Associates",
  description:
    "Sangfor NGAF, endpoint, HCI and cloud platforms in Pakistan, delivered by Comtech Associates, an authorized Sangfor partner.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Security, Cloud and Infrastructure,
        <br />
        Built to Work as One.
      </>
    ),
    text: (
      <>
        Firewall, endpoint, access gateway, hyper-converged infrastructure and
        cloud, designed together. Comtech Associates is an{" "}
        <b className="font-bold">Authorized Sangfor Partner</b> delivering the
        full stack in Pakistan.
      </>
    ),
    cta: " Request a Sangfor Security Assessment",
  },
  intro: {
    title: <>Integrated protection for distributed businesses.</>,
    paragraphs: [
      "Cybersecurity underpins sustainable growth, especially as networks, applications and data spread across sites and clouds. Comtech and Sangfor deliver integrated, adaptive technology that improves protection, visibility and business continuity.",
      "The partnership gives clients in Pakistan access to Sangfor’s technology suite, tailored to local requirements.",
    ],
    tagline: "Innovation. Reliability. Customer-focused service.",
  },
  audience: {
    title: "Tuned to the way each industry operates.",
    sub: "Customized deployments for the sectors we serve.",
    items: [
      {
        title: "Finance",
        text: "Protection and continuity for regulated, always-on operations.",
      },
      {
        title: "Education",
        text: "Secure access and manageable infrastructure for campuses.",
      },
      {
        title: "Government",
        text: "Resilient systems with the visibility public bodies need.",
      },
      {
        title: "Healthcare and corporate",
        text: "Security and infrastructure that keep critical services running.",
      },
    ],
  },
  layers: {
    title: (
      <>
        Security, cloud and infrastructure
        <br />
        on one design.
      </>
    ),
    sub: "Five Sangfor solutions, plus the thinking that joins them.",
    items: [
      {
        title: "Next-Generation Firewall (NGAF)",
        text: "Firewall, intrusion prevention, antivirus and threat intelligence in one, with protection against ransomware, malware and zero-day attacks.",
      },
      {
        title: "Endpoint Secure (EDR)",
        text: "Endpoint detection and response that detects, isolates and remediates threats, including on remote workers’ devices.",
      },
      {
        title: "Internet Access Gateway (IAG)",
        text: "Network insight, user access management, bandwidth efficiency, safe access policies and compliance support.",
      },
      {
        title: "Hyper-Converged Infrastructure (HCI)",
        text: "Compute, storage and networking in one platform, to simplify operations and scale.",
      },
      {
        title: "Sangfor Cloud Platform",
        text: "Secure hybrid cloud with cost efficiency, multi-tenant management and intelligent automation.",
      },
      {
        title: "Integrated Ecosystem Design",
        text: "Security, cloud and infrastructure planned together instead of bought in pieces.",
      },
    ],
  },
  why: {
    title: (
      <>
       Customized, certified and monitored.
        {/* <br />
        not just installed. */}
      </>
    ),
    items: [
      {
        title: "Tailored to your sector",
        text: "Deployments designed for finance, healthcare, education, government and corporate environments.",
      },
      {
        title: "Certified, systematic implementation",
        text: "Proven implementation models from technically certified people.",
      },
      {
        title: "Monitoring and automation",
        text: "Sophisticated monitoring, automated administration and scalable infrastructure.",
      },
      {
        title: "One ecosystem",
        text: "Security, cloud and infrastructure planned to work together.",
      },
    ],
  },
  status: {
    title: "Authorized, integrated, across five sectors.",
    sub: "Three facts at a glance",
    stats: [
      { big: "Authorized", small: "Sangfor Partner" },
      { big: "5", small: "Sangfor solution families we deliver" },
      {
        big: "5",
        small: "sectors we serve",
      },
    ],
  },
  faq: {
    title: (
      <>
       Common questions about 
        <br />
        Sangfor.
      </>
    ),
    items: [
      [
        "What does a Next-Generation Firewall (NGAF) replace?",
        "It combines firewall, intrusion prevention, antivirus and threat intelligence, with protection against ransomware, malware and zero-day attacks.",
      ],
      [
        "Can Sangfor protect remote workers?",
        "Endpoint Secure (EDR) detects, isolates and remediates threats, including on remote workers’ devices.",
      ],
      [
        "What is hyper-converged infrastructure?",
        "HCI combines compute, storage and networking into one platform, which simplifies operations and makes scaling easier.",
      ],
      [
        "Can security and cloud be planned together?",
        "Yes. Comtech designs the two as one ecosystem, with the Sangfor Cloud Platform providing secure hybrid cloud and multi-tenant management.",
      ],
    ],
  },
  cta: {
    title: "Secure today. Lead tomorrow?",
    text: "Request an assessment, and we’ll show you how Sangfor can modernize legacy systems, move you to the cloud and harden your endpoints.",
    label: "Request a Sangfor Security Assessment",
  },
};

export default function Sangfor() {
  return <PartnerDetail d={data} />;
}
