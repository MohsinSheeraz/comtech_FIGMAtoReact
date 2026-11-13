// Copy for the ITCN Asia 2026 page. Placeholder images: swap the paths below.
const PLACEHOLDER = "/images/BlogExampleImageForNow.png"; // TODO: replace with real images

export const itcn = {
  hero: {
    title: "Meet Comtech Associates X Cisco At ITCN Asia 2026",
    text: "See Comtech’s networking, cybersecurity, data center, and IT infrastructure solutions live at the 28th ITCN Asia, September 22-24, at Expo Centre Karachi.",
    primary: "Visitor Registration", // TODO: Hero links to /contact, point it to the real registration URL later
  },

  why: {
    label: "Why Comtech",
    title: "Why Visit Comtech At ITCN Asia",
    paragraphs: [
      "Comtech Associates is Pakistan’s enterprise networking, cybersecurity, and IT infrastructure partner, with 10+ years in operation, 250+ projects delivered, and offices in Karachi, Islamabad, Lahore, and Quetta.",
      "At ITCN Asia 2026, we’re bringing that track record to the show floor: live demos of the networking, cybersecurity, and data center solutions we build for banks, telecoms, hospitals, and government bodies across Pakistan. Stop by Booths D-119 to D124 and D133 to D138 to see it firsthand and talk to our engineers directly.",
    ],
  },

  find: {
    label: "Find Us",
    title: "Where To Find Us At The Event",
    image: PLACEHOLDER, // TODO: booth render
    imageAlt: "Comtech Associates and Cisco booth at ITCN Asia 2026",
    booth: "Comtech Associates × Cisco",
    hall: "Hall # 04 · Booths D-119 to D124 and D133 to D138",
  },

  comtechTeam: {
    label: "Leadership",
    title: "Meet The Comtech Team",
    people: [
      { name: "Muhammad Farooq Zaheer", role: "CEO", image: "/images/FarooqZaheer_Small.webp" },
      { name: "Abdul Rehman Zaheer", role: "Director", image: "/images/RehmanZaheer_Small.webp" },
      { name: "Rehan Shaikh", role: "Director Sales", image: "/images/RehanSheikh_Small.webp" },
      { name: "Muhammad Irfan Ghauri", role: "Head of Solutions at Comtech Associates", image: "/images/Muhammad_Irfan.webp" },
      { name: "Jibran Rufi", role: "Head of IT", image: "/images/Jifran_Rufi.webp" }, // TODO: confirm role (hard to read in the screenshot)
    ],
  },

  ciscoTeam: {
    label: "Leadership",
    title: "Meet The Cisco Team",
    people: [
      { name: "Kashif Ul Haque", role: "Country General Manager at Cisco Systems", image: "/images/KashifulHaque_Small.webp" },
      { name: "Arsalan Zahid", role: "Systems Architect at Cisco Systems", image: "/images/ArsalanZahid_Small.webp" },
      { name: "Ahsan Akhtar Khan", role: "Partner Account Manager at Cisco Systems", image: "/images/AhsanAkhtar_Small.webp" },
      { name: "Osama Zakaria Elshantaf", role: "Director & General Manager at Cisco Systems", image: "/images/OsamaZakaria_Small.webp" },
      { name: "Abdul Rafay Essani", role: "Account Manager at Cisco Systems", image: "/images/AbdulRafay_Small.webp" },
    ],
  },

  solutions: {
    label: "Our Solutions",
    title: "Solutions Built For Enterprise",
    sub: "From networking to custom software, here’s what Comtech builds, secures, and manages for businesses across Pakistan.",
    items: [
      {
        title: "Cybersecurity",
        text: "Round-the-clock managed security and a 24/7 SOC, built to stop threats before they make headlines.",
        img: "/images/Privacy_Protection.png",
        href: "/services",
      },
      {
        title: "Networking & IT Infrastructure",
        text: "Enterprise-grade network infrastructure and vendor-backed deployments that scale with your business.",
        img: "/images/Hand_shake.png",
        href: "/services/networking",
      },
      {
        title: "Data Center",
        text: "Data center design, migration, and hybrid cloud connectivity, built around uptime.",
        img: "/images/Cloud_Services.png",
        href: "/services",
      },
      {
        title: "IT Services & Managed IT",
        text: "Custom software development and IT staff augmentation, so your team never runs short.",
        img: "/images/IT_Management.png",
        href: "/services",
      },
    ],
  },

  showcase: {
    title: "What We’re Showcasing At ITCN Asia 2026",
    sub: "Live demos of the Cisco-powered networking, security, and collaboration technology Comtech deploys for enterprises across Pakistan. Stop by our booths to see it in action.",
    // TODO: product text was partly cut off in the screenshot, confirm the wording
    items: [
      {
        title: "Switch",
        text: "Cisco Catalyst 1000/9200 and 9300 series managed switches for SMB and branch deployments, alongside Catalyst 9300 and 9500 series switches, Cisco’s enterprise-class stackable access-layer platform used for campus and data center networking.",
        image: "/images/Partners_FirewallStack.png",
      },
      {
        title: "Firewall",
        text: "Cisco Firepower 1010 Next-Generation Firewall (FPR1010-NGFW-K9), a compact, fanless NGFW built for small offices and branch locations, delivering malware protection, intrusion prevention, and daily threat updates from Cisco Talos.",
        image: "/images/Partners_FirewallStack.png",
      },
      {
        title: "Network Router",
        text: "Cisco Catalyst 8200 and 8300 series Edge Platforms, purpose-built for SD-WAN, security, and cloud-ready routing, the same routing platform behind Comtech’s SD-WAN deployments.",
        image: "/images/Partners_Router.png",
      },
    ],
  },

  awards: {
    label: "Awards",
    title: "Why Choose Comtech",
    stats: [
      ["10+", "Years in Operation"],
      ["250+", "Projects Delivered"],
      ["4+", "Cities Nationwide"],
      ["16+", "Technology Partners"],
    ] as [string, string][],
    items: [
      ["2024", "Cisco Partner Award"],
      ["2025", "Cisco Individual Excellence Award"],
      ["2025", "Cisco Partner Award"],
      ["30+", "Vendor Awards Total"],
    ] as [string, string][],
  },
};