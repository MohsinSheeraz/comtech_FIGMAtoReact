"use client";

import { useState } from "react";

const field =
    // "h-[61px] w-full rounded-[10px] border border-line3 bg-[linear-gradient(180deg,#0b1230_0%,#070b1d_100%)] px-6 text-[16px] tracking-normal text-fg outline-none placeholder:text-fg/80 focus:border-[#7950e2]";
    "h-[61px] w-full rounded-[10px] border border-line3 bg-transparent! inset-shadow-sm! px-6 text-[16px] tracking-normal text-fg outline-none placeholder:text-fg/80 focus:border-[#7950e2]";




const services = [
    "CyberSecurity",
    "Networking & IT Infrastructure",
    "Data Center & Cloud Solutions",
    "IT Services & Managed IT",
    "Custom Software Development",
];

export function ContactForm() {
    const [service, setService] = useState("");
    const [sent, setSent] = useState(false);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // TODO: send the form data to your API route / email service here
                setSent(true);
            }}
            // CommentForGradient
            // className="rounded-[40px] border border-line3 bg-[linear-gradient(180deg,#0a0d1c_0%,#05050a_100%)] p-6 sm:p-[40px]"


            className="rounded-[40px] border border-line3 bg-transparent! p-6 sm:p-[40px]"
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <input className={field} type="text" name="firstName" placeholder="First Name" aria-label="First Name" required />
                <input className={field} type="text" name="lastName" placeholder="Last Name" aria-label="Last Name" />
                <input className={field} type="text" name="company" placeholder="Company Name" aria-label="Company Name" />
                <input className={field} type="email" name="email" placeholder="Email Address" aria-label="Email Address" required />
                <input className={field} type="tel" name="phone" placeholder="Phone Number" aria-label="Phone Number" />

                {/* custom chevron, native select keeps it accessible on mobile */}
                <div className="relative">
                    <select
                        name="service"
                        aria-label="Service of Interest"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={`${field} cursor-pointer appearance-none pr-12 ${service ? "text-fg" : "text-fg/80"}`}
                    >
                        <option value="" disabled hidden>
                            Service of Interest
                        </option>
                        {services.map((s) => (
                            <option key={s} value={s} className="bg-card2 text-fg">
                                {s}
                            </option>
                        ))}
                    </select>
                    <svg
                        aria-hidden
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2"
                    >
                        <path d="M1 1.5 7 8.5l6-7Z" fill="#7950e2" stroke="#7950e2" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>

                <textarea
                    className={`${field} h-[187px] resize-none py-5 sm:col-span-2`}
                    name="message"
                    placeholder="Your Message"
                    aria-label="Your Message"
                />
            </div>

            <div className="mt-[30px] flex flex-wrap items-center gap-5">
                <button
                    type="submit"
                    className="h-[46px] cursor-pointer rounded-[10px] bg-inv px-8 text-[16px] font-normal tracking-tight text-inv-fg transition-opacity hover:opacity-90"
                >
                    Submit
                </button>
                {sent && (
                    <p role="status" className="text-[16px] text-fg/80">
                        Thanks, we&apos;ll be in touch shortly.
                    </p>
                )}
            </div>
        </form>
    );
}