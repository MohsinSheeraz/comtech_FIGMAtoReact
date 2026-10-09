import type { Metadata } from "next";
import { PageGlows } from "@/components/Glow";
import { CtaPanel } from "@/components/CtaPanel";
import { ContactForm } from "@/components/Contactform";

export const metadata: Metadata = {
    title: "Contact Us | Comtech Associates",
    description: "Tell us what you're working on and we'll get the right person on it, not a generic ticket queue.",
};

/* ---------- content (copy is exactly as in the Figma) ---------- */

const details = {
    email: "info@comtech.com",
    phone: "+92 213 4404440",
    address: "The Hive 3rd Floor, NASTP Faisal Cantonment Main shahrah e faisal, Karachi.",
};

// icons are the PNGs already in /public/images. Order as in the design.
const socials = [
    { label: "Facebook", href: "#", icon: "/images/icon_Facebook.png" },
    { label: "Twitter", href: "#", icon: "/images/icon_Twitter.png" },
    { label: "YouTube", href: "#", icon: "/images/icon_YouTube.png" },
    { label: "Instagram", href: "#", icon: "/images/icon_Insta.png" },
];

const steps = [
    {
        title: "You tell us what’s going on",
        text: "security concern, a network that’s outgrown itself, a migration on the horizon, or a staffing gap. No need to have it perfectly scoped, that’s what the first call is for.",
    },
    {
        title: "We ask the right questions",
        text: "before anyone recommends anything, we want to understand your environment, your constraints, and what “solved” actually looks like for you.",
    },
    {
        title: "You get a straight answer",
        text: "sometimes that means a proposal. Sometimes it means telling you honestly that what you’re describing doesn’t need everything you think it does.",
    },
];

export default function Contact() {
    return (
        <main>
            <PageGlows variant="inner" />

            {/* Hero: copy + details on the left, form on the right */}
            <section className="pb-16 pt-12 lg:pb-[90px] lg:pt-[100px]">
                <div className="wrap grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,754px)] lg:gap-[60px]">
                    <div>
                        <h1 className="text-[40px] font-medium leading-[48px] tracking-tighter md:text-[56px] md:leading-[66px] lg:text-[64px] lg:leading-[75px]">
                            Have Questions?
                            <br />
                            Get In Touch Today!
                        </h1>
                        <p className="mt-8 max-w-[611px] text-[18px] leading-[31px] tracking-tighter lg:mt-[35px]">
                            Whether you’re dealing with a security gap, an unreliable network, a data center migration, or need extra
                            hands on your team, tell us what you’re working on and we’ll get the right person on it, not a generic
                            ticket queue.
                        </p>

                        {/* .bar has an unlayered margin, so the ! utilities are needed (same trick the other pages use) */}
                        <span className="bar mb-9! mt-9!" />

                        <div className="space-y-[14px] text-[18px] leading-[31px] tracking-tighter">
                            <p>
                                <a href={`mailto:${details.email}`}>{details.email}</a>
                            </p>
                            <p>
                                <a href="tel:+922134404440">{details.phone}</a>
                            </p>
                            <p className="max-w-[611px]">{details.address}</p>
                        </div>

                        <div className="mt-10 flex gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="flex size-[33px] items-center justify-center overflow-hidden rounded-full"
                                >
                                    {/* if your PNGs are just the glyph (no circle), add: bg-fg p-2 */}
                                    <img src={s.icon} alt="" className="size-full object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <ContactForm />
                </div>
            </section>

            {/* What Happens When You Reach Out */}
            <section className="py-12 lg:py-[90px]">
                <div className="wrap">
                    <h2 className="text-center text-[34px] font-normal leading-[1.15] tracking-tighter text-fg lg:text-[48px] lg:leading-[56px]">
                        What Happens When You Reach Out
                    </h2>
                    <p className="mx-auto mt-4 max-w-[762px] text-center text-[16px] leading-7 tracking-tighter lg:mt-[22px] lg:text-[18px] lg:leading-[31px]">
                        No automated quote, no generic sales deck. Every conversation starts with someone actually listening to what
                        you’re dealing with.
                    </p>

                    <div className="mt-12 grid gap-10 lg:mt-[70px] lg:grid-cols-[1fr_2px_1fr_2px_1fr] lg:gap-x-10">
                        {steps.map((s, i) => (
                            <div key={s.title} className="contents">
                                {i > 0 && <span aria-hidden className="hidden w-[2px] self-stretch bg-[#6739DD] lg:block" />}
                                <div className="text-center">
                                    <h3 className="mx-auto max-w-[300px] text-[26px] font-normal leading-[34px] tracking-tighter text-fg lg:text-[30px] lg:leading-[38px]">
                                        {s.title}
                                    </h3>
                                    <p className="mx-auto mt-6 max-w-[360px] text-[16px] leading-[28px] tracking-tighter lg:text-[18px] lg:leading-[31px]">
                                        {s.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CtaPanel
                title="Let’s Build Something Together"
                text="Reach out today, and our team will follow up to understand what you need before recommending anything."
                label="Get a Free Network Consultation"
            />
        </main>
    );
}