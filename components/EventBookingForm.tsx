"use client";

import { useState, type ReactNode } from "react";

const field =
  "h-[56px] w-full rounded-[10px] border border-[#1a2142] bg-transparent px-5 text-[16px] tracking-normal text-white outline-none placeholder:text-white/50 focus:border-[#7950e2]";
const lab = "mb-2 block text-[14px] tracking-normal text-white/70";

const formats = ["In person in Vancouver", "Video call", "Written Q and A"];
const topics = [
  "Cisco’s AI-Era Platform, Seen From Pakistan",
  "Securing Regulated Industries",
  "From SMB Partner To Premier Integrator",
  "The Data Center That Cannot Go Down",
  "The Network As A Business Decision",
];

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className={lab}>{label}</span>
    {children}
  </label>
);

export function EventBookingForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: send the form data to your API route / email service here (frontend only for now)
        setSent(true);
      }}
      className="rounded-[40px] border border-[#1e2540] p-6 sm:p-[40px]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full name">
            <input className={field} name="name" placeholder="Your full name" required />
          </Field>
        </div>
        <Field label="Outlet or organization">
          <input className={field} name="org" placeholder="Organization name" />
        </Field>
        <Field label="Role">
          <input className={field} name="role" placeholder="Your role" />
        </Field>
        <Field label="Email">
          <input className={field} type="email" name="email" placeholder="you@organization.com" required />
        </Field>
        <Field label="Phone or WhatsApp">
          <input className={field} type="tel" name="phone" placeholder="Include country code" />
        </Field>

        <fieldset className="sm:col-span-2">
          <legend className={lab}>Preferred format</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {formats.map((f) => (
              <label key={f} className="flex cursor-pointer items-center gap-2 text-[15px] tracking-normal">
                <input type="radio" name="format" value={f} className="size-4 accent-[#7950e2]" />
                {f}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <Field label="Preferred dates and time zone">
            <input className={field} name="when" placeholder="Your preferred dates, times and time zone" />
          </Field>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={lab}>Topics of interest</legend>
          <div className="grid gap-2">
            {topics.map((t) => (
              <label key={t} className="flex cursor-pointer items-center gap-3 text-[15px] tracking-normal">
                <input type="checkbox" name="topics" value={t} className="size-4 accent-[#7950e2]" />
                {t}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <Field label="Other">
            <input className={field} name="other" placeholder="Add your own topic" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Publication or air date">
            <input className={field} name="publication" placeholder="Expected publication or air date" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Message">
            <textarea
              className={`${field} h-[150px] resize-none py-4`}
              name="message"
              placeholder="Tell us more about your request"
            />
          </Field>
        </div>
      </div>

      <div className="mt-[30px] flex flex-wrap items-center gap-5">
        <button type="submit" className="btn p cursor-pointer">
          Book an Interview
        </button>
        {sent && (
          <p role="status" className="text-[16px] text-white/80">
            Thanks, we&apos;ll confirm a time shortly.
          </p>
        )}
      </div>
    </form>
  );
}