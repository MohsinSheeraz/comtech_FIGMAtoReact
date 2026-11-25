import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import {
  PartnerDetail,
  type PartnerDetailData,
} from "@/components/PartnerDetail";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/partners/polycom", {
    alternates: { canonical: "https://comtech.net.pk/partners/polycom" },
  });
}

const data: PartnerDetailData = {
  hero: {
    title: (
      <>
        Meetings That Feel Like Everyone 
        <br />
        Is in the Room.
      </>
    ),
    text: (
      <>
       Clear audio, sharp video and rooms that just work. Comtech Associates, an <b className="font-bold">Authorized HP Poly (Polycom) Partner,</b> equips Pakistani teams for hybrid meetings.
      </>
    ),
    cta: "Request a Poly Collaboration Assessment",
  },
  intro: {
    title: <>Formerly Polycom. Now HP Poly.</>,
    paragraphs: [
      "Remote and hybrid work bring real challenges: staying connected, staying focused and staying productive. HP Poly, formerly Polycom, is a communication technology company focused on audio and video collaboration, now part of HP.",
      "Comtech helps organizations choose, install and support Poly systems, and integrate them into the IT infrastructure they already run.",
    ],
    tagline: "Clear audio. Sharp video. Simple to manage.",
  },
  audience: {
    title: "Four places where Poly changes the meeting.",
    sub: "Matched to how each group meets.",
    items: [
      {
        title: "Corporate offices",
        text: "Meeting rooms that connect head office, branches and remote staff.",
      },
      {
        title: "Universities",
        text: "Lecture and meeting spaces for hybrid learning.",
      },
      {
        title: "Healthcare providers",
        text: "Clear communication between sites, specialists and teams.",
      },
      {
        title: "Hybrid teams",
        text: "Headsets and desk phones that work as well at home as in the office.",
      },
    ],
  },
  layers: {
    title: (
      <>
        Everything between the headset 
        <br />
        and the boardroom.
      </>
    ),
    sub: "Six categories that cover the whole meeting.",
    items: [
      {
        title: "Headsets",
        text: "Headsets with noise cancellation for focus anywhere.",
      },
      {
        title: "Video Conferencing Systems",
        text: "Systems with framing, speaker tracking and noise suppression.",
      },
      {
        title: "Conference Phones and Speakerphones",
        text: "360° voice pickup and echo cancellation for shared rooms.",
      },
      {
        title: "Desk Phones",
        text: "Enterprise VoIP IP phones for everyday calling.",
      },
      {
        title: "Software and Device Management",
        text: "Centralized deployment, monitoring and updates for every device.",
      },
      {
        title: "Cloud Collaboration and Integration",
        text: "Works with Microsoft Teams, Zoom and Google Meet, with analytics and reporting.",
      },
    ],
  },
  why: {
    title: (
      <>
        Great meeting rooms are designed, 
        <br />
        not just installed.
      </>
    ),
    items: [
      {
        title: "We start with your rooms",
        text: "Equipment matched to your spaces, platforms and budget.",
      },
      {
        title: "Installed and integrated",
        text: "Systems fitted into the IT infrastructure you already run.",
      },
      {
        title: "Certified experts",
        text: "Technical people who integrate Poly into your environment.",
      },
      {
        title: "Support that continues",
        text: "Help after the room goes live.",
      },
    ],
  },
  status: {
    title: "Authorized, six categories, three platforms.",
    sub: "Status and range in three numbers.",
    stats: [
      { big: "Authorized", small: "HP Poly Partner" },
      { big: "6", small: "Poly product categories we deliver" },
      {
        big: "3",
        small:
          "meeting platforms supported: Teams, Zoom, Google Meet",
      },
    ],
  },
  faq: {
    title: (
      <>
        Polycom and HP Poly, 
        <br />
        explained.
      </>
    ),
    items: [
      [
        "Where did Polycom go?",
        "HP Poly was formerly Polycom, before it merged with HP. Comtech is an Authorized HP Poly Partner.",
      ],
      [
        "Will Poly work with our meeting platform?",
        "Yes. Poly systems integrate with Microsoft Teams, Zoom and Google Meet.",
      ],
      [
        "What if we only need headsets?",
        "Yes. Headsets with noise cancellation are one of the product categories Comtech delivers, alongside room systems.",
      ],
      [
        "How do we manage a lot of devices?",
        "Poly’s software provides centralized deployment, monitoring and updates for devices.",
      ],
    ],
  },
  cta: {
    title: "Make every meeting count?",
    text: "Request an assessment and we’ll review your rooms, platforms and devices.",
    label: "Request a Poly Collaboration Assessment",
  },
};

export default function Polycom() {
  return <PartnerDetail d={data} />;
}
