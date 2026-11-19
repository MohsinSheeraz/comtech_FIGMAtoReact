import type { Metadata } from "next";
import { PartnerDetail, type PartnerDetailData } from "@/components/PartnerDetail";

export const metadata: Metadata = {
  title: "Fortinet Partner in Pakistan | Comtech Associates",
  description:
    "Comtech is a Fortinet Advanced Partner (Integrator) in Pakistan, with SD-WAN, OT and SASE specializations and 5 Fortinet Certified Engineers.",
};

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Your Network Is Only as Secure
        <br />
        as Its Weakest Connection.
      </>
    ),
    text: (
      <>
        Comtech Associates is a Fortinet Advanced Partner in Pakistan, deploying
        FortiGate firewalls, Secure SD-WAN and managed network security built
        to close the gaps attackers actually look for.
      </>
    ),
    cta: "Request a Fortinet Security Assessment",
  },
  intro: {
    title: "Where Most Networks Actually Get Breached",
    paragraphs: [
      "Not from a lack of hardware. From gaps between it.",
      "Advanced level of engagement. Integrator business model. SD-WAN, Operational Technology and SASE specializations. 5 Fortinet Certified Engineers.",
    ],
    tagline: "One security fabric. Every layer covered.",
  },
  audience: {
    title: "How Fortinet + Comtech Closes the Gap",
    sub: "From branch offices to endpoints and email, we connect security across the network.",
    items: [
      { title: "Secure Branch Links", text: "Branch offices connecting over unsecured or unreliable links get Fortinet Secure SD-WAN, encrypted and centrally managed across every site." },
      { title: "Network Edge Inspection", text: "FortiGate NGFW provides deep packet inspection when a perimeter firewall only inspects traffic at the edge." },
      { title: "Endpoint Protection", text: "FortiClient protects devices when endpoints leave the office and go unmonitored." },
      { title: "Email and Web Filtering", text: "FortiMail, web filtering and threat detection stop phishing, malware and risky sites across the Fortinet Security Fabric." },
    ],
  },
  layers: {
    title: (
      <>
        One Security Fabric,
        <br />
        Every Layer Covered
      </>
    ),
    sub: "This is what Comtech actually deploys, layer by layer.",
    items: [
      { title: "Network Edge", text: "FortiGate next-generation firewalls inspect traffic at every entry point." },
      { title: "Wide Area Network", text: "FortiGate Secure SD-WAN replaces costly, unreliable branch links." },
      { title: "Wireless & Switching", text: "FortiAP and FortiSwitch are managed under the same security policy." },
      { title: "Endpoint", text: "FortiClient protects laptops and devices wherever they connect." },
      { title: "Email & Web", text: "FortiMail and web filtering stop phishing, malware and risky sites." },
      { title: "Visibility & Control", text: "FortiAnalyzer and FortiManager provide one console for the whole fabric." },
    ],
  },
  why: {
    title: "Why Enterprises Choose Comtech for Fortinet",
    items: [
      { title: "Security-First, Not Bolted On", text: "Fortinet is deployed as the network's security layer from day one, not added after the fact." },
      { title: "One Dashboard, Every Site", text: "FortiManager gives a single view across every branch, firewall and access point Comtech deploys." },
      { title: "Proven in Regulated Banking", text: "Live in production for a regulated financial institution, not a lab environment or demo." },
      { title: "Advanced Partner, Certified Engineers", text: "An authorized Fortinet Advanced Partner (Integrator), with 5 Fortinet Certified Engineers on deployments." },
    ],
  },
  status: {
    title: "Fortinet Credentials",
    sub: "Advanced Partner status, proven specialization and a certified engineering bench.",
    stats: [
      { big: "Advanced", small: "Level of Engagement" },
      { big: "Integrator", small: "Business Model" },
      { big: "5 Certified Engineers", small: "SD-WAN, OT and SASE" },
    ],
  },
  faq: {
    title: (
      <>
        Fortinet Deployments,
        <br />
        Straight Answers
      </>
    ),
    items: [
      ["What's the difference between Fortinet Secure SD-WAN and a traditional network setup?", "Secure SD-WAN combines networking and security into one managed layer, routing branch traffic over encrypted links with built-in threat inspection instead of relying on separate routers and a perimeter firewall."],
      ["Is Fortinet only for large enterprises, or does it work for smaller networks too?", "Fortinet's product line scales from single-site firewalls to multi-branch SD-WAN deployments. Comtech sizes the deployment to the network, not the other way around."],
      ["Does Comtech monitor Fortinet deployments after installation?", "Yes. Comtech offers managed SOC and 24/7 monitoring, plus ongoing support, for Fortinet environments, not just initial setup."],
      ["Can Fortinet work with the network equipment we already have?", "Yes. Fortinet firewalls and SD-WAN commonly run alongside hardware from other vendors. Comtech designs the integration so security policy stays consistent."],
      ["Does Comtech test our security, or only install equipment?", "Both. Comtech delivers security assessments and vulnerability assessment and penetration testing, so you can see where your network is exposed before deciding what to deploy."],
    ],
  },
  cta: {
    title: "Ready to Close the Gaps in Your Network?",
    text: "Whether it's replacing branch routers with Secure SD-WAN or putting a real firewall at the edge, Comtech's Fortinet Advanced Partner team can scope it.",
    label: "Request a Fortinet Security Assessment",
  },
};

export default function Fortinet() {
  return <PartnerDetail d={data} />;
}
