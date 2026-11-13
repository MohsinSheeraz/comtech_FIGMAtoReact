const PLACEHOLDER = "/images/BlogExampleImageForNow.png";

export const eventsHero = {
  title: "Events",
  text: "Where Comtech shows up: summits, expos, and conversations with the partners and customers shaping Pakistan’s IT landscape.",
};

export const events = [
  {
    slug: "cisco-partner-summit-2026",
    live: true,
    title: "Cisco Partner Summit 2026",
    date: "26-28 October 2026",
    excerpt:
      "From Pakistan to Vancouver: Comtech’s CEO joins Cisco’s global partner community to talk networking, security, and what comes next.",
    image: "/images/CiscoPartnerSummit2026_TitleImage.webp",
  },
  {
    slug: "itcn-asia-2026",
    live: true,
    title: "ITCN Asia 2026",
    date: "22-24 September 2026",
    excerpt:
      "See Comtech’s networking, cybersecurity, data center, and IT infrastructure solutions live at the 28th ITCN Asia in Karachi.",
    image: "/images/ITCNAsia2026_TitleImage.webp",
  },
];

export const summit = {
  pill: "Cisco Partner Summit 2026 | Vancouver, Canada",
  title: "Comtech Associates CEO Farooq Zaheer at Cisco Partner Summit 2026",
  lead: "From Pakistan to Vancouver: Comtech’s CEO joins Cisco’s global partner community to talk networking, security, and what comes next.",
  text: "Farooq Zaheer, CEO of Comtech Associates, will be at Cisco Partner Summit 2026 in Vancouver, joining Cisco’s global partner community for three days of strategy, product direction, and partner conversations. He is available for interviews before, during, and after the event.",

  about: {
    label: "About The Event",
    title: "Where Cisco’s Partners Meet The People Setting Its Direction",
    text: "Cisco Partner Summit is an invitation-only gathering of Cisco’s global partner community. This year’s agenda centers on go-to-market priorities, partner profitability and durable growth, the Cisco 360 Partner Program, and the One Cisco Platform’s role in the AI era.",
    facts: [
      { date: "26 and 27 October", label: "Global keynotes" },
      {
        date: "28 October",
        label:
          "Americas, Asia Pacific, Japan and Greater China, and EMEA regional sessions",
      },
      {
        date: "26 and 27 October",
        label:
          "Executive conversations, a solutions showcase, and partner-led discussions",
      },
    ],
  },

  ceo: {
    label: "Leadership",
    title: "Meet Farooq Zaheer, CEO At Comtech Associates",
    name: "Farooq Zaheer",
    role: "CEO, Comtech Associates",
    image: "/images/Muhammad_Farooq_Zaheer.png",
    text: "Farooq Zaheer leads Comtech Associates, a Pakistani IT solutions company delivering enterprise networking, cybersecurity, and data center infrastructure through a network of 15 technology partners. Under his leadership, Comtech’s Cisco partnership has grown from SMB partner to premier integrator, and the company has delivered a Cisco ACI data center deployment and disaster recovery network migration for Bank Islami.",
  },

  schedule: {
    label: "The Schedule",
    title: "Farooq’s Summit, Day By Day",
    sub: "Every session Farooq is attending, in Vancouver time. Want to catch him around them? Book a meeting.",
    days: [
      {
        tab: "Monday 26 October",
        title: "Monday 26 October",
        intro:
          "Leadership conversations, then dinner with Cisco’s Gulf and Levant partners.",
        items: [
          {
            time: "7:00 AM",
            title: "Breakfast",
            meta: "120 mins | West Exhibition Level, Hall B",
          },
          {
            time: "10:15 AM",
            title: "Leadership Intelligence Circle",
            meta: "West Level 1, Room 109",
          },
          {
            time: "11:00 AM",
            title: "Lunch",
            meta: "90 mins | West Exhibition Level, Hall B",
          },
          {
            time: "11:45 AM",
            title: "Leadership Intelligence Circle",
            meta: "45 mins | West Level 1, Room 109",
          },
          {
            time: "7:30 PM",
            title:
              "Dinner with Cisco’s Gulf and Levant partner community, hosted by Cisco’s partner sales leadership",
            meta: "Venue close to the convention centre, to be confirmed",
          },
        ],
      },
      {
        tab: "Tuesday 27 October",
        title: "Tuesday 27 October",
        intro: "",
        items: [],
      },
      {
        tab: "Wednesday 28 October",
        title: "Wednesday 28 October",
        intro: "",
        items: [],
      },
    ],
  },

  topics: {
    label: "Ideas Worth Exchanging",
    title: "What You Can Discuss With Farooq: Six Conversations Worth Having!",
    sub: "Topics for editors, hosts, and analysts covering the summit.",
    items: [
      {
        title: "Cisco’s AI-Era Platform, Seen From Pakistan",
        text: "What One Cisco and the Cisco 360 Partner Program mean for a partner serving an emerging market.",
      },
      {
        title: "Securing Regulated Industries",
        text: "How Pakistani banks and other regulated sectors are preparing for the State Bank’s Cyber Shield strategy and the national push for security operations centers.",
      },
      {
        title: "From SMB Partner To Premier Integrator",
        text: "What it takes to grow a Cisco partnership, one credential at a time.",
      },
      {
        title: "The Data Center That Cannot Go Down",
        text: "Lessons from deploying Cisco ACI and a disaster recovery migration for a Pakistani bank.",
      },
      {
        title: "The Network As A Business Decision",
        text: "Why Wi-Fi 7 and network refresh planning now belong in the boardroom, not just the server room.",
      },
      {
        title: "Pakistan’s Place In A Global Partner Ecosystem",
        text: "What a Pakistani integrator brings to Cisco’s worldwide partner community, and what it takes home.",
      },
    ],
  },

  company: {
    label: "Why Comtech",
    title: "The Company Behind The CEO",
    text: "Comtech Associates is a Pakistani IT solutions company delivering enterprise networking, cybersecurity, data center and cloud, managed IT, and custom software development to banks, government bodies, universities, hospitals, telecom operators, and large enterprises. Ten-plus years, 250+ projects, and offices in Karachi, Islamabad, Lahore, and Quetta.",
    image: PLACEHOLDER,
    imageCaption: "Enterprise networking. Security. Infrastructure.",
    delivers: [
      "Networking and IT Infrastructure",
      "Cybersecurity",
      "Data Center and Cloud",
      "Managed IT Services",
      "Custom Software Development",
    ],
    cards: [
      {
        title: "Cisco Partnership",
        text: "Cisco Premier Partner, with seven Cisco credentials: Registered, SMB and Mid-Market Business, Extended Detection and Response (XDR), Services, Security, Networking, and Cloud and AI Infrastructure.",
      },
      {
        title: "On The Stage With Cisco",
        text: "Cisco Connect 2025 in Dubai, a Cisco reseller event hosted by Comtech in 2025, and ITCN Asia 2025 and 2026. Silver sponsor of the 28th ITCN Asia, Expo Centre Karachi, 22 to 24 September 2026.",
      },
    ],
  },

  impact: {
    label: "Our Impact",
    title: "What Comtech Achieved In 2026",
    // TODO: the last sentence was cut off in the screenshot, confirm the ending
    text: "In 2026, Comtech Associates delivered secure, scalable networking solutions that help public safety teams work smarter and speed up digital transformation. The work showed what Cisco technologies make possible: resilient, mission-critical infrastructure that supports safer, smarter communities. It reinforces Comtech’s standing as a trusted partner for public-sector digital transformation.",
  },

  awards: {
    label: "Awards",
    title: "Where Comtech’s Been Recognized By Cisco",
    items: [
      ["2026", "Cisco Beyond the Blueprint Award"],
      ["2026", "Cisco Cloud & AI Partner of the Year"],
      ["2026", "Cisco Public Sector Partner of the Year"],
      ["2026", "Cisco Deal Award"],
      ["2026", "Cisco SMB & Mid-Market Partner"],
    ] as [string, string][],
  },

  book: {
    label: "Start A Conversation",
    title: "Book A Meeting With Farooq Zaheer",
    text: "Tell us what you are working on and when you need it. We will confirm a time, in person in Vancouver or by video call before and after the summit.",
    when: "26 to 28 October, 2026",
    where: "Vancouver Convention Center, Vancouver, Canada",
  },
};
