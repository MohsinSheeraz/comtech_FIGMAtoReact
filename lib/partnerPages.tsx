import type { PartnerDetailData } from "@/components/PartnerDetail";

type PartnerPage = {
  slug: string;
  name: string;
  category: string;
  keyword: string;
  description: string;
  overview: string;
  audiences: { title: string; text: string }[];
  solutions: { title: string; text: string }[];
};

const pages: PartnerPage[] = [
  {
    slug: "huawei",
    name: "Huawei",
    category: "Networking & Infrastructure",
    keyword: "Huawei networking solutions",
    description: "Huawei networking solutions for business infrastructure in Pakistan from Comtech Associates.",
    overview: "Explore Huawei networking solutions for business connectivity and infrastructure. Comtech helps organizations assess requirements, plan deployments, and coordinate technology with the rest of their IT environment.",
    audiences: [
      { title: "Multi-site organizations", text: "Connectivity planning for teams and facilities operating across multiple locations." },
      { title: "Enterprise IT teams", text: "Networking options considered alongside existing infrastructure and operational requirements." },
      { title: "Growing businesses", text: "Technology planning that accounts for changing users, sites, and capacity needs." },
      { title: "Public and private sector", text: "Infrastructure discussions grounded in availability, support, and security priorities." },
    ],
    solutions: [
      { title: "Network Assessment", text: "Review existing infrastructure, site requirements, and connectivity goals." },
      { title: "Network Design", text: "Plan Huawei networking solutions around capacity, resilience, and integration requirements." },
      { title: "Deployment Planning", text: "Coordinate implementation stages and validation with operational teams." },
      { title: "Ongoing Support", text: "Define support responsibilities for the environment after deployment." },
    ],
  },
  {
    slug: "ubiquiti",
    name: "Ubiquiti",
    category: "Networking & Infrastructure",
    keyword: "Ubiquiti wireless networking",
    description: "Ubiquiti wireless networking and business connectivity solutions in Pakistan from Comtech Associates.",
    overview: "Plan Ubiquiti wireless networking around the way people use your offices, campuses, and sites. Comtech helps map coverage needs and fit wireless connectivity into your wider business network.",
    audiences: [
      { title: "Office environments", text: "Wireless coverage planned around users, meeting spaces, and daily operations." },
      { title: "Campuses and facilities", text: "Connectivity considerations for multiple buildings and different user densities." },
      { title: "Growing organizations", text: "Wireless infrastructure planning that can adapt as teams and sites expand." },
      { title: "IT operations teams", text: "Deployment and support planning coordinated with existing network operations." },
    ],
    solutions: [
      { title: "Wireless Site Survey", text: "Understand building layout, user density, and coverage requirements." },
      { title: "Wireless Network Design", text: "Plan Ubiquiti wireless networking for the needs and constraints of each site." },
      { title: "Deployment", text: "Coordinate installation, configuration, and validation with your team." },
      { title: "Support", text: "Set clear ongoing support and maintenance expectations." },
    ],
  },
  {
    slug: "d-link",
    name: "D-Link",
    category: "Networking & Infrastructure",
    keyword: "D-Link business networking",
    description: "D-Link business networking and connectivity solutions in Pakistan from Comtech Associates.",
    overview: "Explore D-Link business networking for office and site connectivity. Comtech can help assess your network requirements and plan how the selected technology fits with your existing infrastructure.",
    audiences: [
      { title: "Business offices", text: "Connectivity planning for employees, business applications, and shared workspaces." },
      { title: "Multi-site teams", text: "Network requirements considered across branches and remote facilities." },
      { title: "Education and healthcare", text: "Site connectivity planning shaped around users, spaces, and daily operations." },
      { title: "IT teams", text: "Technology and deployment decisions coordinated with existing network practices." },
    ],
    solutions: [
      { title: "Network Review", text: "Assess site connectivity, users, and current network equipment." },
      { title: "Infrastructure Planning", text: "Plan D-Link business networking to match the requirements of your environment." },
      { title: "Installation", text: "Coordinate configuration, installation, and handover." },
      { title: "After-Sales Support", text: "Define ongoing support for the deployed network environment." },
    ],
  },
  {
    slug: "tp-link",
    name: "TP-Link",
    category: "Networking & Infrastructure",
    keyword: "TP-Link business networking",
    description: "TP-Link business networking and wireless connectivity in Pakistan from Comtech Associates.",
    overview: "Comtech helps organizations plan TP-Link business networking and wireless connectivity around site needs, users, and the systems already in place.",
    audiences: [
      { title: "Small and midsize businesses", text: "Network planning that fits business operations and available IT resources." },
      { title: "Offices and branches", text: "Connectivity requirements mapped across work areas and locations." },
      { title: "Education environments", text: "Wireless and network considerations for classrooms, labs, and administration." },
      { title: "IT support teams", text: "Deployment and support expectations defined with your existing team." },
    ],
    solutions: [
      { title: "Connectivity Assessment", text: "Review wireless coverage, site layout, and business connectivity needs." },
      { title: "Network Planning", text: "Plan TP-Link business networking to fit your environment and growth." },
      { title: "Deployment", text: "Coordinate installation and configuration with minimal operational disruption." },
      { title: "Support", text: "Set out support and maintenance requirements after go-live." },
    ],
  },
  {
    slug: "h3c",
    name: "H3C",
    category: "Networking & Infrastructure",
    keyword: "H3C enterprise networking",
    description: "H3C enterprise networking and infrastructure solutions in Pakistan from Comtech Associates.",
    overview: "Evaluate H3C enterprise networking as part of a broader infrastructure plan. Comtech works with organizations to understand requirements, coordinate design, and plan deployment with the surrounding IT environment in view.",
    audiences: [
      { title: "Enterprise networks", text: "Infrastructure planning for organizations with complex connectivity needs." },
      { title: "Distributed organizations", text: "Network requirements reviewed across branches, facilities, and teams." },
      { title: "Data center environments", text: "Networking decisions coordinated with workload and infrastructure needs." },
      { title: "IT decision-makers", text: "Architecture and rollout plans grounded in business and operational priorities." },
    ],
    solutions: [
      { title: "Infrastructure Assessment", text: "Review current architecture, capacity, and operational goals." },
      { title: "Network Architecture", text: "Plan H3C enterprise networking for your environment and integration needs." },
      { title: "Implementation", text: "Coordinate deployment, testing, and transition into operations." },
      { title: "Managed Support", text: "Define ongoing support for the network after implementation." },
    ],
  },
  {
    slug: "fortinet",
    name: "Fortinet",
    category: "Cybersecurity",
    keyword: "Fortinet cybersecurity solutions",
    description: "Fortinet cybersecurity solutions and network security planning in Pakistan from Comtech Associates.",
    overview: "Explore Fortinet cybersecurity solutions as part of a security strategy shaped around your network and business risks. Comtech can help assess requirements and plan how security controls fit into your wider environment.",
    audiences: [
      { title: "Financial services", text: "Security planning for organizations with demanding availability and compliance needs." },
      { title: "Multi-site businesses", text: "Network security considerations for branches, remote sites, and connected teams." },
      { title: "Public sector", text: "Security requirements considered alongside service continuity and accountability." },
      { title: "IT and security teams", text: "Technology plans coordinated with existing policies, systems, and operations." },
    ],
    solutions: [
      { title: "Security Assessment", text: "Review network architecture, risk priorities, and existing security controls." },
      { title: "Network Security Planning", text: "Plan Fortinet cybersecurity solutions around your topology and operating needs." },
      { title: "Deployment Coordination", text: "Coordinate configuration, implementation, and validation." },
      { title: "Ongoing Security Support", text: "Define monitoring and support responsibilities for the deployed environment." },
    ],
  },
  {
    slug: "sangfor",
    name: "Sangfor",
    category: "Cybersecurity & Infrastructure",
    keyword: "Sangfor cybersecurity and infrastructure",
    description: "Sangfor cybersecurity and infrastructure technology planning in Pakistan from Comtech Associates.",
    overview: "Consider Sangfor cybersecurity and infrastructure technology alongside your existing systems and business priorities. Comtech helps assess requirements, plan integration, and coordinate deployment.",
    audiences: [
      { title: "Enterprise organizations", text: "Technology planning for environments with multiple systems and operational stakeholders." },
      { title: "Security teams", text: "Security priorities and integration needs reviewed before a solution is selected." },
      { title: "Infrastructure teams", text: "Infrastructure decisions coordinated with current architecture and workloads." },
      { title: "Growing businesses", text: "A practical assessment of requirements, support needs, and future plans." },
    ],
    solutions: [
      { title: "Environment Review", text: "Map current systems, security objectives, and operational requirements." },
      { title: "Solution Planning", text: "Assess Sangfor cybersecurity and infrastructure options for the identified needs." },
      { title: "Integration", text: "Plan deployment around existing systems and business processes." },
      { title: "Support Planning", text: "Agree on support requirements and ownership after implementation." },
    ],
  },
  {
    slug: "hpe",
    name: "HPE",
    category: "Servers, Storage & Data Center",
    keyword: "HPE server and data center solutions",
    description: "HPE server and data center solutions planned and supported in Pakistan by Comtech Associates.",
    overview: "Plan HPE server and data center solutions around your workloads, capacity, resilience, and operating requirements. Comtech can help assess the environment and coordinate infrastructure decisions with networking and cloud.",
    audiences: [
      { title: "Enterprise IT teams", text: "Server and data center planning for business-critical workloads." },
      { title: "Growing organizations", text: "Infrastructure options considered alongside capacity and expansion needs." },
      { title: "Hybrid environments", text: "Data center decisions coordinated with cloud and network requirements." },
      { title: "Operations teams", text: "Support and lifecycle expectations considered as part of infrastructure planning." },
    ],
    solutions: [
      { title: "Workload Assessment", text: "Review application requirements, current capacity, and infrastructure constraints." },
      { title: "Server and Data Center Design", text: "Plan HPE server and data center solutions for the workloads in scope." },
      { title: "Migration and Deployment", text: "Coordinate installation or migration with testing and transition planning." },
      { title: "Ongoing Support", text: "Define operational support and lifecycle requirements after deployment." },
    ],
  },
  {
    slug: "dell",
    name: "Dell",
    category: "Servers, Storage & Data Center",
    keyword: "Dell server and data center solutions",
    description: "Dell server and data center solutions planned and supported in Pakistan by Comtech Associates.",
    overview: "Explore Dell server and data center solutions based on your workloads, current infrastructure, and operational goals. Comtech can help scope requirements and plan integration with the rest of your environment.",
    audiences: [
      { title: "Enterprise infrastructure", text: "Server and data center needs reviewed for business-critical applications." },
      { title: "Multi-site organizations", text: "Infrastructure requirements considered across locations and teams." },
      { title: "Cloud-connected businesses", text: "On-premises systems planned alongside cloud and network connectivity." },
      { title: "IT operations teams", text: "Deployment, support, and asset lifecycle needs included in the discussion." },
    ],
    solutions: [
      { title: "Infrastructure Assessment", text: "Review workloads, storage needs, capacity, and existing systems." },
      { title: "Server and Data Center Planning", text: "Plan Dell server and data center solutions around technical requirements." },
      { title: "Deployment", text: "Coordinate installation, integration, and validation with your team." },
      { title: "Lifecycle Support", text: "Define maintenance and support responsibilities for the environment." },
    ],
  },
];

export function getPartnerPage(slug: string): PartnerPage | undefined {
  return pages.find((page) => page.slug === slug);
}

export function getPartnerSlugs() {
  return pages.map(({ slug }) => slug);
}

export function toPartnerDetail(page: PartnerPage): PartnerDetailData {
  return {
    hero: {
      title: <>{page.name} {page.category}<br />in Pakistan</>,
      text: page.overview,
      cta: `Request a ${page.name} Assessment`,
    },
    intro: {
      title: `${page.keyword} for your organization.`,
      paragraphs: [page.overview],
      tagline: `${page.name} technology. Planned around your environment.`,
    },
    audience: {
      title: `Who needs ${page.keyword}?`,
      sub: `A practical starting point for ${page.category.toLowerCase()} requirements.`,
      items: page.audiences,
    },
    layers: {
      title: <>{page.name} solutions,<br />planned end to end.</>,
      sub: `Assessment, planning, deployment, and support for ${page.keyword}.`,
      items: page.solutions,
    },
    why: {
      title: `Why work with Comtech on ${page.name}?`,
      items: [
        { title: "Start With Your Requirements", text: `Recommendations for ${page.keyword} begin with your environment, priorities, and operating requirements.` },
        { title: "Integration in View", text: `${page.name} technology is considered alongside your network, security, and existing infrastructure.` },
        { title: "One Team Through Delivery", text: "Coordinate assessment, planning, deployment, and support with one accountable team." },
        { title: "Local Engagement", text: "Comtech supports organizations across Pakistan, with offices in Karachi, Islamabad, Lahore, and Quetta." },
      ],
    },
    status: {
      title: `${page.name} technology, locally supported.`,
      sub: "Scope, implementation, and support are defined around your requirements.",
      stats: [
        { big: page.name, small: "Technology portfolio" },
        { big: "Pakistan", small: "Local engagement" },
        { big: "End to end", small: "Assessment to support" },
      ],
    },
    faq: {
      title: <>{page.name} questions,<br />answered.</>,
      items: [
        [`What ${page.name} solutions can Comtech help with?`, `Comtech can assess and plan ${page.keyword} based on your systems, requirements, and project scope.`],
        [`How do we choose the right ${page.name} solution?`, "Start by reviewing the current environment, business requirements, integration needs, and support expectations."],
        [`Can ${page.name} technology work with our existing infrastructure?`, "Integration requirements are reviewed during assessment so the proposed approach accounts for existing systems and operations."],
        ["Is support available after implementation?", "Support responsibilities and coverage can be defined as part of the project scope."],
      ],
    },
    cta: {
      title: `Plan your ${page.name} environment.`,
      text: `Discuss your ${page.keyword} requirements with Comtech. An assessment can map your current environment and identify the right next steps.`,
      label: `Request a ${page.name} Assessment`,
    },
  };
}
