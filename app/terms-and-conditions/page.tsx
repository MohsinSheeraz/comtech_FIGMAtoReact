import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import Link from "next/link";
import { PageGlows } from "@/components/Glow";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/terms-and-conditions", {
    alternates: { canonical: "https://comtech.net.pk/terms-and-conditions" },
  });
}

const fairUse: [string, string][] = [
  [
    "Use it lawfully",
    "Use the site only for lawful purposes and in a way that does not harm others.",
  ],
  [
    "Do not interfere",
    "Do not try to disrupt the site, gain unauthorized access, or introduce harmful code.",
  ],
  [
    "Keep your details accurate",
    "Information you submit through our forms should be true and current.",
  ],
  [
    "Respect others",
    "Do not use the site to send spam or misuse contact details found on it.",
  ],
];

const services: [string, string][] = [
  [
    "Information only",
    "Descriptions of services and partners are general. Details can change.",
  ],
  [
    "Agreed in writing",
    "Scope, price and timelines for any project are set in a separate written agreement.",
  ],
  [
    "No guarantees from the website",
    "Nothing here guarantees a particular result or availability.",
  ],
  ["Ask us", "If you need something specific, contact us for a conversation."],
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

function TermsSection({
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

export default function TermsAndConditionsPage() {
  return (
    <main>
      <PageGlows />
      <div className="wrap relative pb-16 pt-36 md:pb-24 md:pt-48 mt-20!">
        <header className="max-w-4xl pb-12 md:pb-16">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-300">
            Terms and Conditions
          </p>
          <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            The Ground Rules for Using Our Website.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            These terms apply when you use Comtech Associates. Please read them,
            and contact us if anything is unclear.
          </p>
        </header>

        <TermsSection
          eyebrow="The short version"
          title="What you should know first."
        >
          <ul className="list-disc space-y-2 pl-6">
            <li>By using this website you agree to these terms.</li>
            <li>
              The content is here to inform you, and it is not a quote or a
              contract.
            </li>
            <li>Services are agreed separately, in writing.</li>
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
        </TermsSection>

        <TermsSection
          eyebrow="Using the site"
          title="Fair use, in four points."
        >
          <p>We keep this simple.</p>
          <InfoCards items={fairUse} />
        </TermsSection>

        <TermsSection eyebrow="Our content" title="Who owns what.">
          <p>
            The text, design, logos and other material on this site belong to
            Comtech Associates or its licensors. You may read and share pages
            for your own business use, but you may not copy, sell or republish
            them without our written permission.
          </p>
          <p className="mt-4">
            Vendor names and logos, such as those of our technology partners,
            belong to their owners. Their appearance here does not transfer any
            rights to you.
          </p>
        </TermsSection>

        <TermsSection
          eyebrow="Services and quotes"
          title="A page is not a promise."
        >
          <InfoCards items={services} />
        </TermsSection>

        <TermsSection
          eyebrow="Links and third parties"
          title="Links we do not control."
        >
          <p>
            This site may link to other websites, including partner and event
            pages. We do not control them and are not responsible for their
            content or privacy practices.
          </p>
        </TermsSection>

        <TermsSection
          eyebrow="Liability"
          title="What we can and cannot stand behind."
        >
          <p>
            We work to keep the site accurate and available, but we provide it
            as it is. To the extent the law allows, Comtech Associates is not
            liable for losses that come from using, or being unable to use, this
            website.
          </p>
        </TermsSection>

        <TermsSection
          eyebrow="Your data"
          title="Privacy lives on its own page."
        >
          <p>
            How we handle personal information is explained in our{" "}
            <Link className="text-violet-300 underline" href="/privacy-policy">
              Privacy Policy
            </Link>
            .
          </p>
        </TermsSection>

        <TermsSection eyebrow="Governing law" title="Which laws apply.">
          <p>These terms are governed by the laws of Pakistan.</p>
        </TermsSection>

        <TermsSection eyebrow="Changes" title="If these terms change.">
          <p>
            We may update these terms from time to time. Changes are posted on
            this page with a new effective date. Continuing to use the site
            means you accept the updated terms.
          </p>
        </TermsSection>

        <section className="border-t border-white/10 py-10 md:py-14">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-violet-300">
            Questions about these terms?
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
            <Link className="text-violet-300 underline" href="/privacy-policy">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
