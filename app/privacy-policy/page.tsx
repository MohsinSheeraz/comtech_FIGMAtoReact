import type { Metadata } from "next";
import Link from "next/link";
import { PageGlows } from "@/components/Glow";

export const metadata: Metadata = {
  alternates: { canonical: "https://comtech.net.pk/privacy-policy" },
  title: "Privacy Policy | Comtech Associates",
  description:
    "How Comtech Associates collects, uses and protects your information when you use comtech.net.pk, and how to reach us about your data.",
};

const collect: [string, string][] = [
  [
    "Details you give us",
    "Your name, company, email address and phone number.",
  ],
  [
    "What you tell us you need",
    "Business requirements you submit through our contact or quote forms.",
  ],
  ["Technical information", "Your IP address, browser type and device type."],
  [
    "Usage information",
    "How you move around the site, gathered through cookies and analytics tools.",
  ],
];

const uses: [string, string][] = [
  [
    "Deliver and improve our services",
    "So we can scope and support the IT work you ask about.",
  ],
  ["Reply to you", "So an inquiry gets an answer from a person."],
  ["Improve the website", "So pages are easier to find and use."],
  [
    "Meet legal obligations",
    "Where the law requires us to keep or share information.",
  ],
];

const choices: [string, string][] = [
  ["See your information", "Ask for a copy of what we hold about you."],
  ["Correct it", "Tell us what is wrong and we will fix it."],
  ["Delete it", "Ask us to remove your information."],
  [
    "Change your mind on emails",
    "Withdraw consent for communications whenever you like.",
  ],
];

function InfoCards({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {items.map(([title, description]) => (
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          key={title}
        >
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="mt-3 text-base leading-7 text-white/75">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}

function PolicySection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 py-10 md:py-14">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="mt-5 max-w-4xl text-base leading-8 text-white/75 md:text-lg">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageGlows />
      <div className="wrap relative pb-16 pt-36 md:pb-24 md:pt-48 mt-20!">
        <header className="max-w-4xl pb-12 md:pb-16">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-300">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            Your Information, Handled With Care.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            This page explains what Comtech Associates collects through
            comtech.net.pk, why we collect it, and the choices you have.
          </p>
        </header>

        <PolicySection
          eyebrow="The short version"
          title="What you should know first."
        >
          <ul className="list-disc space-y-2 pl-6">
            <li>
              We collect only what we need to answer you and run our website.
            </li>
            <li>We do not sell, trade or rent your data.</li>
            <li>
              You can ask us to show, correct or delete your information at any
              time.
            </li>
            <li>
              Questions? Write to{" "}
              <a
                className="text-violet-300 underline"
                href="mailto:info@comtech.net.pk"
              >
                info@comtech.net.pk
              </a>
              .
            </li>
          </ul>
        </PolicySection>

        <PolicySection
          eyebrow="What we collect"
          title="The information we ask for and receive."
        >
          <p>Two kinds, depending on how you use the site.</p>
          <InfoCards items={collect} />
        </PolicySection>

        <PolicySection
          eyebrow="How we use it"
          title="What we do with your information."
        >
          <p>Each use has a clear purpose.</p>
          <InfoCards items={uses} />
        </PolicySection>

        <PolicySection eyebrow="Cookies" title="Cookies and similar tools.">
          <p>
            We use cookies and similar tools to make the site work better and to
            understand how it is used. You can manage or delete cookies in your
            browser settings. Some site features may stop working if you block
            them.
          </p>
        </PolicySection>

        <PolicySection
          eyebrow="Keeping it safe"
          title="How we protect your information."
        >
          <p>
            We use security measures to guard against unauthorized access,
            disclosure, alteration or destruction of your information.
          </p>
        </PolicySection>

        <PolicySection eyebrow="Sharing" title="Who else may see it.">
          <p>
            We do not sell, trade or rent your information. We may share it with
            trusted partners who help us run the website and our services. They
            are bound by confidentiality agreements.
          </p>
        </PolicySection>

        <PolicySection eyebrow="Your choices" title="You stay in control.">
          <p>Ask us at any time.</p>
          <InfoCards items={choices} />
        </PolicySection>

        <PolicySection eyebrow="Updates" title="If this policy changes.">
          <p>
            We post changes on this page and update the effective date at the
            top.
          </p>
        </PolicySection>

        <section className="border-t border-white/10 py-10 md:py-14">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-300">
            Questions about your data?
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
            Write to us and a person will reply.
          </h2>
          <a
            className="mt-5 inline-block text-lg text-violet-300 underline"
            href="mailto:info@comtech.net.pk"
          >
            Email info@comtech.net.pk
          </a>
          <p className="mt-8 text-base text-white/75">
            Also see our{" "}
            <Link
              className="text-violet-300 underline"
              href="/terms-and-conditions"
            >
              Terms and Conditions
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
