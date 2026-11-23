import type { Metadata } from "next";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export const metadata: Metadata = {
  alternates: { canonical: "https://comtech.net.pk/partners/tp-link" },
  title: "TP-Link Partner in Pakistan | Comtech Associates",
  description:
    "Comtech Associates is an authorized TP-Link partner in Pakistan, delivering Omada, Deco and JetStream networking with expert support.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Connectivity You Can Count On, 
        <br />
        Nationwide.
      </>
    ),
    text: (
      <>
        Comtech Associates is an  <b className="font-bold">Authorized TP-Link Partner</b> in Pakistan, delivering Omada, Deco and JetStream networking with consultation, installation and ongoing support.
      </>
    ),
    cta: "Request a Wi-Fi Network Audit ",
  },
  intro: {
    title: <>An authorized partner, not just a supplier.</>,
    paragraphs: [
      "Seamless connectivity is now essential for businesses, institutions, service providers and homes. As an Authorized TP-Link Partner, Comtech promotes and supports TP-Link products across Pakistan.",
      "We cover the whole journey: consultation, installation and ongoing support, delivered by certified engineers.",
    ],
    tagline: "A strategic technology partner, not only a seller of boxes.",
  },
  audience: {
    title: "From a single office to a service provider.",
    sub: "TP-Link scales with you.",
    items: [
      {
        title: "Businesses",
        text: "Managed Wi-Fi and switching for offices and branches.",
      },
      {
        title: "Institutions",
        text: "Reliable coverage across classrooms, clinics and campuses.",
      },
      {
        title: "Service providers",
        text: "Outdoor and CPE devices for last-mile and remote links.",
      },
      {
        title: "Homes",
        text: "Mesh Wi-Fi and smart devices for everyday connectivity.",
      },
    ],
  },
  layers: {
    title: (
      <>
        What we deliver with TP-Link.
        {/* <br />
        on one design. */}
      </>
    ),
    sub: "Six product families, one partner.",
    items: [
      {
        title: "Routers and Mesh Wi-Fi",
        text: "Archer routers and Deco mesh systems for homes, offices and small sites.",
      },
      {
        title: "Controllers and Access Points",
        text: "Omada cloud-managed access points and controllers for growing networks.",
      },
      {
        title: "Switches",
        text: "JetStream and Omada switches for wired access and aggregation.",
      },
      {
        title: "Outdoor and CPE",
        text: "Outdoor and CPE devices for ISPs and remote sites.",
      },
      {
        title: "Smart Home and IoT",
        text: "Tapo and Kasa devices for connected homes and spaces.",
      },
      {
        title: "Adapters and Extenders",
        text: "Network adapters and range extenders that fill the coverage gaps.",
      },
    ],
  },
  why: {
    title: (
      <>
        Why organizations choose Comtech for TP-Link.
        {/* <br />
        not just installed. */}
      </>
    ),
    items: [
      {
        title: "Authorized partner",
        text: "Authorized by TP-Link to promote and support its products in Pakistan.",
      },
      {
        title: "End to end",
        text: "Consultation, installation and ongoing support from one team.",
      },
      {
        title: "Certified engineers",
        text: "Technical people who know the products, not just the price list.",
      },
      {
        title: "Nationwide reach",
        text: "Coverage across Pakistan, from major cities to remote sites.",
      },
    ],
  },
  status: {
    title: "TP-Link, at a glance.",
    sub: "The facts behind the partnership.",
    stats: [
      { big: "Authorized", small: "TP-Link Partner" },
      { big: "6", small: "TP-Link product families we deliver" },
      {
        big: "Nationwide",
        small: "coverage across Pakistan",
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
        "What TP-Link status does Comtech hold?",
        "Comtech Associates is an Authorized TP-Link Partner.",
      ],
      [
        "Which TP-Link products does Comtech deliver?",
        "Archer and Deco routers, Omada access points and controllers, JetStream and Omada switches, outdoor and CPE devices, Tapo and Kasa smart devices, and adapters and extenders.",
      ],
      [
        "Can Comtech check our existing Wi-Fi?",
        "Yes. A Wi-Fi network audit is the first step: we review your coverage and performance, then recommend what to change.",
      ],
      [
        "Does Comtech support TP-Link after installation?",
        "Yes. Ongoing support is part of the service, alongside consultation and installation.",
      ],
    ],
  },
  cta: {
    title: "Ready to fix your Wi-Fi?",
    text: "Start with a Wi-Fi network audit and talk to our TP-Link experts.",
    label: "Request a Wi-Fi Network Audit",
  },
};

export default function TPLink() {
  return <PartnerDetail d={data} />;
}
