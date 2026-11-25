import { servicePages } from "@/components/ServiceDetail";
import { industryPages } from "@/components/IndustryDetail";
import { getPartnerPage, getPartnerSlugs } from "@/lib/partnerPages";

/**
 * Every public page whose meta title / description can be edited from /admin/seo.
 * `title` and `description` here are the defaults; an override saved in the admin wins.
 * Blog posts are not listed: each post has its own SEO fields in the post editor.
 */
export type SeoPage = {
  path: string;
  label: string;
  title: string;
  description: string;
  /** other URLs that render the same page (refreshed together on save) */
  aliases?: string[];
};

const staticPages: SeoPage[] = [
  { path: "/", label: "Home", title: "Comtech Associates | IT Solutions Provider in Pakistan", description: "Pakistan's IT partner for Cisco networking, cybersecurity, data center and software. Get expert advice to secure, connect and scale your business." },
  { path: "/about-us", label: "About Us", title: "About Comtech Associates | IT Solutions Company in Pakistan", description: "Meet Comtech Associates, the Pakistani IT solutions company behind networks, security and data centers for banks, hospitals and enterprises nationwide." },
  { path: "/blog", label: "Blog", title: "IT & Cybersecurity Blog | Comtech Associates", description: "Practical IT, networking and cybersecurity insight for Pakistani organizations, from the team at Comtech Associates." },
  { path: "/contact-us", label: "Contact Us", title: "Contact Comtech Associates | IT Solutions Company in Pakistan", description: "Contact Comtech Associates in Karachi: call +92 21 3440 4440 or send your requirements – networking, cybersecurity, data center or IT services." },
  { path: "/events", label: "Events", title: "Events | Comtech Associates", description: "Where Comtech Associates meets partners and customers: ITCN Asia, Cisco Partner Summit and other technology events in Pakistan and abroad.", aliases: ["/event"] },
  { path: "/events/cisco-partner-summit-2026", label: "Events › Cisco Partner Summit 2026", title: "Cisco Partner Summit 2026 | Comtech Associates", description: "Comtech Associates CEO Farooq Zaheer joins Cisco’s global partner community in Vancouver, 26 to 28 October 2026. Book a meeting or interview.", aliases: ["/event/cisco-partner-summit-2026"] },
  { path: "/events/itcn-asia-2026", label: "Events › Itcn Asia 2026", title: "ITCN Asia 2026 | Comtech Associates", description: "Meet Comtech Associates and Cisco at the 28th ITCN Asia, Expo Centre Karachi, 22 to 24 September 2026. Hall 04, Booths D-119 to D124 and D133 to D138.", aliases: ["/event/itcn-asia-2026"] },
  { path: "/industries", label: "Industries", title: "Industry IT Solutions in Pakistan | Comtech Associates", description: "Comtech Associates delivers IT services for banks, healthcare, government, education, telecom, and enterprise organizations across Pakistan." },
  { path: "/industries/banking-and-finance", label: "Industries › Banking And Finance", title: "IT Services for Banks in Pakistan | Comtech Associates", description: "Comtech Associates provides IT services for banks in Pakistan: managed IT, cybersecurity, data center, and branch networking built for uptime and compliance." },
  { path: "/industries/education", label: "Industries › Education", title: "Education IT Services in Pakistan | Comtech Associates", description: "Education IT services in Pakistan: campus-wide Wi-Fi, cybersecurity and managed IT support for schools, colleges and universities." },
  { path: "/industries/enterprise", label: "Industries › Enterprise", title: "Enterprise IT Services in Pakistan | Comtech Associates", description: "Enterprise IT services in Pakistan: networking, cybersecurity, data center and managed IT for large, multi-site organisations." },
  { path: "/industries/government", label: "Industries › Government", title: "IT Services for Government in Pakistan | Comtech Associates", description: "IT services for government in Pakistan: secure infrastructure, cybersecurity and managed IT built for accountability at scale." },
  { path: "/industries/healthcare", label: "Industries › Healthcare", title: "Healthcare IT Services in Pakistan | Comtech Associates", description: "Healthcare IT services in Pakistan: cybersecurity, hospital infrastructure and managed IT that keep patient data private and systems running." },
  { path: "/industries/telecomunication", label: "Industries › Telecomunication", title: "Telecom IT Services in Pakistan | Comtech Associates", description: "Comtech Associates delivers telecom infrastructure services and telecom IT solutions: access, transport, routing, and data center for operators, ISPs, and telecom businesses." },
  { path: "/leadership", label: "Leadership", title: "Leadership | Comtech Associates", description: "" },
  { path: "/partners", label: "Partners", title: "Technology Partners in Pakistan | Comtech", description: "Comtech Associates partners with Cisco, HPE, Dell, Huawei, Kaspersky and more to supply, deploy and support enterprise technology across Pakistan." },
  { path: "/partners/avaya", label: "Partners › Avaya", title: "Avaya Partner in Pakistan | Comtech Associates", description: "Avaya IP telephony, unified communications and contact center solutions in Pakistan from Comtech Associates, an authorized Avaya partner." },
  { path: "/partners/broadcom", label: "Partners › Broadcom", title: "Broadcom Partner in Pakistan | Comtech Associates", description: "VMware Cloud Foundation, vSphere, vSAN and NSX in Pakistan, deployed by Comtech Associates, an authorized Broadcom partner." },
  { path: "/partners/cisco", label: "Partners › Cisco", title: "Cisco Premier Partner in Pakistan | Comtech Associates", description: "Comtech Associates is a Cisco Premier Partner in Pakistan, delivering enterprise networking, security, data center, and cloud infrastructure solutions." },
  { path: "/partners/dell", label: "Partners › Dell", title: "Dell Partner in Pakistan | Comtech Associates", description: "Dell servers, storage, PowerProtect backup and business PCs in Pakistan, supplied and supported by Comtech Associates, an authorized Dell partner." },
  { path: "/partners/dlink", label: "Partners › Dlink", title: "D-Link Partner in Pakistan | Comtech Associates", description: "Comtech Associates is an authorized D-Link partner in Pakistan, supplying switches, Wi-Fi, IP cameras and storage with design and after-sales support." },
  { path: "/partners/fortinet", label: "Partners › Fortinet", title: "Fortinet Partner in Pakistan | Comtech Associates", description: "Comtech is a Fortinet Advanced Partner (Integrator) in Pakistan, with SD-WAN, OT and SASE specializations and 5 Fortinet Certified Engineers." },
  { path: "/partners/grandstream", label: "Partners › Grandstream", title: "Grandstream Partner in Pakistan | Comtech Associates", description: "Grandstream Wi-Fi 6 access points, switches, routers and UC in Pakistan, deployed by Comtech Associates, an authorized Grandstream partner." },
  { path: "/partners/h3c", label: "Partners › H3c", title: "H3C Partner in Pakistan | Comtech Associates", description: "H3C switches, routers, wireless, UniServer servers, storage and security in Pakistan, supplied and supported by Comtech Associates, an authorized partner." },
  { path: "/partners/hpe", label: "Partners › Hpe", title: "HPE Partner in Pakistan | Comtech Associates", description: "HPE ProLiant servers, Alletra storage, Aruba networking and GreenLake in Pakistan, supplied and supported by Comtech Associates, an authorized partner." },
  { path: "/partners/huawei", label: "Partners › Huawei", title: "Huawei Partner in Pakistan | Comtech Associates", description: "Comtech Associates is an authorized Huawei partner in Pakistan, delivering Wi-Fi 6 networks, data center, security and enterprise connectivity." },
  { path: "/partners/kaspersky", label: "Partners › Kaspersky", title: "Kaspersky Partner | Comtech Associates", description: "Comtech Associates is an Authorized Kaspersky Partner, deploying and managing Kaspersky protection from the endpoint to the plant floor." },
  { path: "/partners/polycom", label: "Partners › Polycom", title: "Polycom (HP Poly) Partner in Pakistan | Comtech", description: "Polycom (HP Poly) headsets, video conferencing and conference phones in Pakistan, installed and supported by Comtech Associates." },
  { path: "/partners/sangfor", label: "Partners › Sangfor", title: "Sangfor Partner in Pakistan | Comtech Associates", description: "Sangfor NGAF, endpoint, HCI and cloud platforms in Pakistan, delivered by Comtech Associates, an authorized Sangfor partner." },
  { path: "/partners/tp-link", label: "Partners › Tp Link", title: "TP-Link Partner in Pakistan | Comtech Associates", description: "Comtech Associates is an authorized TP-Link partner in Pakistan, delivering Omada, Deco and JetStream networking with expert support." },
  { path: "/partners/ubiquiti", label: "Partners › Ubiquiti", title: "Ubiquiti Partner in Pakistan | Comtech Associates", description: "Comtech Associates is an authorized Ubiquiti wireless networking partner in Pakistan: UniFi Wi-Fi, switching, surveillance and long-range links." },
  { path: "/privacy-policy", label: "Privacy Policy", title: "Privacy Policy | Comtech Associates", description: "How Comtech Associates collects, uses and protects your information when you use comtech.net.pk, and how to reach us about your data." },
  { path: "/services", label: "Services", title: "IT Services in Pakistan | Comtech Associates", description: "Enterprise IT services in Pakistan: networking, managed cybersecurity, data center, managed IT, custom software and IT resourcing from one partner." },
  { path: "/services/network-support", label: "Services › Network Support", title: "Networking & IT Infrastructure | Comtech Associates", description: "Network design, deployment and 24/7 monitoring in Pakistan by Cisco-certified engineers – campus, branch and data center networks that stay up." },
  { path: "/terms-and-conditions", label: "Terms And Conditions", title: "Terms and Conditions | Comtech Associates", description: "The terms for using comtech.net.pk, the website of Comtech Associates, including content use, links, liability and how to contact us." },
];

const titleCase = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// pages built from data arrays; a static folder with the same URL takes precedence in routing
const dynamicPages: SeoPage[] = [
  ...servicePages.map((s) => ({
    path: `/services/${s.slug}`,
    label: `Services › ${titleCase(s.slug)}`,
    title: s.title,
    description: s.description,
  })),
  ...industryPages.map((i) => ({
    path: `/industries/${i.slug}`,
    label: `Industries › ${titleCase(i.slug)}`,
    title: i.title,
    description: i.description,
  })),
  ...getPartnerSlugs().map((slug) => {
    const p = getPartnerPage(slug)!;
    return {
      path: `/partners/${slug}`,
      label: `Partners › ${p.name}`,
      title: `${p.name} ${p.category} in Pakistan | Comtech Associates`,
      description: p.description,
    };
  }),
];

const taken = new Set(staticPages.map((p) => p.path));

export const seoPages: SeoPage[] = [
  ...staticPages,
  ...dynamicPages.filter((p) => !taken.has(p.path)),
].sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path)));

const byPath = new Map(seoPages.map((p) => [p.path, p]));

export const getSeoPage = (path: string) => byPath.get(path);
