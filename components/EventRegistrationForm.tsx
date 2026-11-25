"use client";

import { useState } from "react";

const field =
  "h-[56px] w-full rounded-[10px] border border-[#1a2142] bg-transparent px-5 text-[16px] tracking-normal text-white outline-none placeholder:text-white/50 focus:border-[#2ab9e8]";

export function EventRegistrationForm() {
  const [notice, setNotice] = useState(false);

  return (
    <section id="visitor-registration" className="wrap sec scroll-mt-8">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-8 text-center">
          <p className="mb-4 text-[14px] uppercase tracking-[0.14em] text-[#2ab9e8]">
            Register as a Visitor
          </p>
          <h2 className="text-[34px] font-medium leading-[42px] tracking-tighter md:text-[46px] md:leading-[54px]">
            Join Comtech Associates and Cisco at ITCN Asia 2026
          </h2>
          <p className="mt-4 text-[16px] leading-[27px] tracking-normal text-white/75">
            Explore enterprise networking, cybersecurity, data center, and IT infrastructure solutions through live demonstrations.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setNotice(true);
          }}
          className="rounded-[30px] border border-white/10 p-6 sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-[14px] text-white/70">
              First name
              <input className={`${field} mt-2`} name="firstName" required />
            </label>
            <label className="block text-[14px] text-white/70">
              Last name
              <input className={`${field} mt-2`} name="lastName" required />
            </label>
            <label className="block text-[14px] text-white/70">
              Company email
              <input
                className={`${field} mt-2`}
                type="email"
                name="email"
                required
              />
            </label>
            <label className="block text-[14px] text-white/70">
              Phone number
              <input
                className={`${field} mt-2`}
                type="tel"
                name="phone"
                required
              />
            </label>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button type="submit" className="btn p cursor-pointer">
              Visitor Registration
            </button>
            {notice && (
              <p role="alert" className="text-[14px] leading-6 text-white/70">
                Online registration is not connected yet. Please contact{" "}
                <a
                  className="text-[#2ab9e8] underline"
                  href="mailto:info@comtech.net.pk"
                >
                  info@comtech.net.pk
                </a>{" "}
                to register.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
