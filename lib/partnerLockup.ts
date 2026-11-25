export const COMTECH_LOGO =
  "/images/Comtech_Logo_Design/Png/Comtech_Logo_Design-05.png";

export type LockupPartner = { name: string; src?: string; plate?: boolean };

export const LOCKUP_PARTNERS: Record<string, LockupPartner> = {
  cisco: { name: "Cisco", src: "/images/ciscoLogo.png" },
  huawei: { name: "Huawei", src: "/images/huaweiLogo.png" },
  ubiquiti: { name: "Ubiquiti", src: "/images/uniquitiLogo.png" },
  "d-link": { name: "D-Link", src: "/images/dlinkLogoxbig.png", plate: true },
  dlink: { name: "D-Link", src: "/images/dlinkLogoxbig.png", plate: true },
  "tp-link": { name: "TP-Link", src: "/images/tplinkLogo.png" },
  h3c: { name: "H3C", src: "/images/hecLogo.png" },
  fortinet: { name: "Fortinet", src: "/images/fortinetLogo.png", plate: true },
  kaspersky: { name: "Kaspersky", src: "/images/partner-logos/kaspersky.svg" },
  sangfor: {
    name: "Sangfor",
    src: "/images/partner-logos/sangfor.jpg",
    plate: true,
  },
  hpe: { name: "HPE", src: "/images/partner-logos/hpe.svg" },
  dell: { name: "Dell", src: "/images/partner-logos/dell.svg" },
  avaya: { name: "Avaya", src: "/images/partner-logos/avaya.svg" },
  broadcom: { name: "Broadcom" },
  grandstream: { name: "Grandstream" },
  polycom: { name: "Polycom" },
};


export function partnerFromPath(path: string): LockupPartner {
  const slug = path.split("/")[2] ?? "";
  return (
    LOCKUP_PARTNERS[slug] ?? { name: slug.replace(/-/g, " ").toUpperCase() }
  );
}
