import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  alternates: { canonical: "https://comtech.net.pk/partners/huawei" },
  title: "Huawei Partner in Pakistan | Comtech Associates",
  description:
    "Comtech Associates is an authorized Huawei partner in Pakistan, delivering Wi-Fi 6 networks, data center, security and enterprise connectivity.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Smarter Networks for Pakistan,
        <br />
        Built on Huawei.
      </>
    ),
    text: (
      <>
        Comtech Associates is an{" "}
        <b className="font-bold">Authorized Huawei Partner</b>, designing and
        deploying Huawei smart networking, data center, security and
        connectivity solutions for campuses, enterprises, government and
        telecom.
      </>
    ),
    cta: "Request a Huawei Solutions Assessment",
  },
  intro: {
    title: (
      <>
        A partnership built to last.
      </>
    ),
    paragraphs: [
      "Huawei, founded in 1987, operates in more than 170 countries across networking, cloud, AI and telecommunications. Comtech brings that technology to Pakistan and fits it to local conditions: infrastructure limits, fast-growing demand and tight budgets.",
      "Regular technical training and post-deployment support keep every Huawei deploymentrunning the way it was designed.",
    ],
    tagline: "Authorized by Huawei, and committed to consistent performance and long-term partnership.",
  },
  audience: {
    title: "What we deliver with Huawei..",
    sub: "Four solution areas, one accountable partner.",
    items: [
      {
        title: "Smart Networking",
        text: "AirEngine Wi-Fi 6 access points and S-Series switches, with access control and centralized management.",
      },
      {
        title: "Cloud and Data Centers",
        text: "FusionServer, OceanStor storage and FusionCompute for hybrid cloud, disaster recovery and remote operations.",
      },
      {
        title: "Security",
        text: "USG firewalls and threat protection across networks, endpoints and data centers.",
      },
      {
        title: "Enterprise and Telecom Connectivity",
        text: "GPON, optical transmission and enterprise routing for broadband and future 5G readiness.",
      },
    ],
  },
  layers: {
    title: (
      <>
       Built for the sectors 
        <br />
        that keep Pakistan moving.
      </>
    ),
    sub: "Huawei solutions, matched to the way each sector works.",
    items: [
      {
        title: "Education",
        text: "Smart campus networks with Wi-Fi for students and faculty.",
      },
      {
        title: "Corporate",
        text: "Hybrid cloud adoption for agility and business continuity.",
      },
      {
        title: "Government",
        text: "Secure communication, data management and governance systems.",
      },
      {
        title: "Telecom and ISPs",
        text: "Scalable backbone infrastructure that grows with demand.",
      },
    ],
  },
  why: {
    title: (
      <>
        Why organizations choose 
        <br />
        Comtech for Huawei.
      </>
    ),
    items: [
      {
        title: "Built for Pakistan",
        text: "We adapt Huawei solutions to local infrastructure limits, rising demand and cost constraints.",
      },
      {
        title: "Trained and supported",
        text: "Regular technical training and post-deployment support, not just a handover.",
      },
      {
        title: "One team, start to finish",
        text: "Consultation, deployment and support from the same partner.",
      },
      {
        title: "Proven on campus",
        text: "Huawei switches and access points live on a university campus serving over 5,000 students.",
      },
    ],
  },
  status: {
    title: "Huawei, at a glance.",
    sub: "The facts behind the partnership.",
    stats: [
      { big: "Authorized", small: "Huawei Partner" },
      { big: "4", small: "Huawei solution areas we cover" },
      { big: "5,000+", small: "students on a Huawei campus network" },
    ],
  },
  faq: {
    title: (
      <>
        Huawei, 
        <br />
        straight answers.
      </>
    ),
    // TODO: answers 2-4 are drafted from the page copy (not in the design), replace with final copy
    items: [
      [
        "What Huawei status does Comtech hold?",
        "Comtech Associates is an Authorized Huawei Partner, committed to consistent performance and long-term partnership.",
      ],
      [
        "Which Huawei products does Comtech deploy?",
        "AirEngine Wi-Fi 6 and S-Series switches, FusionServer, OceanStor and FusionCompute, USG firewalls, and GPON, optical and enterprise routing products.",
    ],
      [
        "Will it work with our existing network?",
        "Yes. Post-deployment support and regular technical training are part of how Comtech delivers Huawei solutions.",
      ],
      [
        "Can Huawei suit a campus network?",
        "Yes. Comtech has deployed Huawei switches and access points on a university campus serving over 5,000 students.",
      ],
    ],
  },
  // TODO: the design says the project story is still pending from the client; swap in the real story when supplied
  cta: {
    title: "Ready to put Huawei to work?",
    text: "Tell us about your network, and we’ll show you what a Huawei design could look like.",
    label: "Request a Huawei Solutions Assessment",
  },
};

export default function Huawei() {
  return <PartnerDetail d={data} />;
}
