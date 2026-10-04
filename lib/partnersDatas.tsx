// All copy + image paths for the Partners page live here.
// Images are served from /public/images/partners/

export const hero = {
  title: (
    <>
      Advancing Pakistan’s Digital Future<br />as a Cisco Premier Partner
    </>
  ),
  text: "15 certified technology partnerships, one accountable team designing, deploying and supporting all of it.",
  primaryCta: { label: "Talk to an IT Consultant", href: "/contact" },
  secondaryCta: { label: "Explore our Services", href: "/services" },
};

const credentialsText =
  "Anyone can put a vendor’s logo on a website. A certified partnership means Comtech’s engineers hold active certifications on that platform, get direct vendor-level support when something’s urgent, and have real product and pricing access, not a general reseller markup.";

export const credentials = {
  title: "Credentials That Set Us Apart",
  image: "/images/partners/credentials.jpg",
  imageAlt: "Business professionals shaking hands in front of a global network overlay",
  blocks: [
    { heading: "Why the Partner Behind the Product Matters", text: credentialsText },
    { heading: "Why the Partner Behind the Product Matters", text: credentialsText },
  ],
};

const sectionIntro =
  "As a certified Cisco partner, Comtech designs, deploys, and monitors the network infrastructure banks, hospitals, and manufacturers depend on, 24/7. We serve enterprises in four major cities, backed by certified engineers, not a reseller who ships hardware and disappears.";

const cardText =
  "Centrally managed, secure connectivity between multiple offices or branches, replacing costly point-to-point links with something more resilient and far easier to monitor as you add locations.";

export const deliver = {
  title: "What We Deliver",
  intro: sectionIntro,
  // Placeholder titles/text exactly as in the design — replace with real copy.
  cards: Array.from({ length: 6 }, (_, i) => ({ id: i + 1, title: "Cisco", text: cardText })),
};

const textA =
  "Networking isn’t a category we dabble in; it’s where Comtech was built. As a certified Cisco partner in Pakistan, we design and deploy the data,";
const textB =
  "Cyberattacks in Pakistan aren’t a someday problem; they’re a Tuesday problem. As a managed security service provider.";
const textC =
  "Networking isn’t a category we dabble in; it’s where Comtech was built. As a certified Cisco partner in Pakistan, we design and deploy.";

export const products = {
  title: "Cisco Technology / Product Deep Dive",
  intro: sectionIntro,
  cta: { label: "View More Products", href: "/products" },
  items: [
    // NOTE: only 5 product images were supplied. The switch stack image was not
    // uploaded, so Switches temporarily reuses the stack image used by Firewalls.
    { id: "switches", title: "Cisco Switches", text: textA, image: "/images/partners/firewall-stack.png", alt: "Cisco switches" },
    { id: "routers", title: "Routers", text: textB, image: "/images/partners/router.png", alt: "Cisco router" },
    { id: "wireless", title: "Wireless Access Points", text: textC, image: "/images/partners/access-point.png", alt: "Cisco wireless access point" },
    { id: "firewalls", title: "Firewalls", text: textA, image: "/images/partners/firewall-stack.png", alt: "Cisco firewalls" },
    { id: "servers", title: "Servers", text: textB, image: "/images/partners/server.png", alt: "Server racks" },
    { id: "phones", title: "IP Phones", text: textC, image: "/images/partners/ip-phone.png", alt: "Cisco IP phone" },
  ],
};

export const partnership = {
  titleTop: "Comtech + Cisco",
  titleBottom: "A Trusted Technology Partnership",
  intro: sectionIntro,
  items: [
    { number: "01", title: "Proven Cisco Expertise", text: cardText },
    { number: "02", title: "End-to-End Solutions", text: cardText },
    { number: "03", title: "Scalable & Secure Infrastructure", text: cardText },
    { number: "04", title: "Trusted Technology Partnership", text: cardText },
  ],
};

export const faq = {
  title: "Frequently Asked Questions",
  text: "Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.",
  items: [
    {
      q: "What services does Comtech Associates offer?",
      a: "Four connected practices: cybersecurity, networking and IT infrastructure, data center and cloud solutions, and IT services and managed IT. Each has its own dedicated page with full detail.",
    },
    // Answers below were not in the design — PLACEHOLDER copy, replace.
    {
      q: "Does Comtech work with small and mid-size businesses, or only large enterprises?",
      a: "Placeholder answer — replace with the final copy.",
    },
    { q: "Does Comtech serve clients outside Karachi?", a: "Placeholder answer — replace with the final copy." },
    { q: "How do I get started with Comtech?", a: "Placeholder answer — replace with the final copy." },
  ],
};

export const cta = {
  title: "Ready to Solve Your IT Challenge?",
  text: "Whether it’s one service or all four, a conversation with Comtech’s team is the place to start. Tell us what you’re dealing with, a security gap, an unreliable network, a data center migration, or a staffing shortfall, and we’ll walk you through how Comtech would approach it, with no obligation to move forward. Most conversations start with a short assessment of your current environment before anything gets proposed.",
  button: { label: "Request an IT Assessment", href: "/contact" },
};
