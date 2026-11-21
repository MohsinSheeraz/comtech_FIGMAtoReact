const S1 = "Networking isn't a category we dabble in; it's where Comtech was built. As a certified Cisco partner in Pakistan, we design and deploy the data network solutions and system integration that carry your business, from a single office LAN to a multi-city enterprise backbone.";
const CYBER = "Cyberattacks in Pakistan aren't a someday problem; they're a Tuesday problem. As a managed security service provider and certified Cisco partner, we deliver round-the-clock, layered defense without the overhead of an in-house security team.";
const DATA_CENTER = "Comtech designs data center infrastructure around the one metric that actually matters: staying online. We handle design, migration, and the cloud infrastructure connectivity that ties it all together, including hybrid cloud environments for businesses that need both on-prem and cloud, not a forced choice between them.";
const SOFTWARE = "Off-the-shelf tools eventually stop fitting how you actually work. As one of Pakistan's more established custom software development teams, we build the internal tools, platforms, and integrations that off-the-shelf software can't, and back it with the infrastructure to deploy and support what we build, end to end, under one roof.";
const MANAGED_IT = "Most businesses juggle a staffing agency, a hardware reseller, and a break-fix vendor who don't talk to each other. Comtech delivers IT services and IT staff augmentation as one accountable team, so certified engineers, managed hardware, and after-sales support all come from the same place.";

export const services = [
  {
    number: "01",
    t: "Networking Infrastructure",
    p: S1,
    img: "Hand_shake",
    bullets: [
      "LAN/WAN design & deployment, structured cabling",
      "SD-WAN across multiple offices and branches",
      "Wireless & high-density Wi-Fi infrastructure",
      "Network monitoring & management",
      "System integration, connecting your networking, security, and infrastructure into one environment",
    ],
  },
  {
    number: "02",
    t: "Cybersecurity",
    p: CYBER,
    img: "Privacy_Protection",
    bullets: [
      "Managed security services & 24x7 monitoring via our Security Operations Center",
      "Endpoint security & cloud security posture management",
      "Identity & access management (IAM) and threat intelligence",
      "Compliance & governance: ISO 27001, PCI DSS, HIPAA, SBP Cybersecurity Framework, PECA 2024/25",
    ],
  },
  {
    number: "03",
    t: "Data Center & Cloud Solutions",
    p: DATA_CENTER,
    img: "Cloud_Services",
    bullets: [
      "Data center design & architecture (Tier II-IV aligned)",
      "Migration services, including Azure data center migration",
      "Disaster recovery & business continuity planning",
      "Hybrid & multi-cloud connectivity, 24/7 NOC",
      "Dedicated project management for every build or migration",
    ],
  },
  {
    number: "04",
    t: "Custom Software Development",
    p: SOFTWARE,
    img: "Custom_Software_development",
    bullets: [
      "Custom enterprise application development",
      "Legacy system modernization",
      "API development & third-party integrations",
      "Internal tools, dashboards & workflow automation",
      "Ongoing maintenance & support",
    ],
  },
  {
    number: "05",
    t: "IT Services & Managed IT",
    p: MANAGED_IT,
    img: "IT_Management",
    bullets: [
      "IT staff augmentation: hire Cisco-certified engineers, cloud engineers, DevOps engineers & cybersecurity analysts",
      "IT asset lifecycle management: procurement through secure disposition",
      "Next-gen desktop support",
      "After-sales support; deployment, maintenance & extended warranty",
    ],
  },
];
