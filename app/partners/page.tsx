import type { Metadata } from "next";
import PartnersHero from "../../components/partners/PartnersHero";
import Credentials from "../../components/partners/Credentials";
import WhatWeDeliver from "../../components/partners/WhatWeDeliver";
import CiscoProducts from "../../components/partners/CiscoProducts";
import TrustedPartnership from "../../components/partners/TrustedPartnership";
import PartnersFaq from "../../components/partners/PartnersFaq";
import CtaBanner from "../../components/partners/CtaBanner";
import { PurplePanel } from "../../components/partners/ui";

export const metadata: Metadata = {
  title: "Partners | Comtech Associates",
  description: "Comtech Associates is a Cisco Premier Partner advancing Pakistan's digital future.",
};

// Page body only — Header and Footer come from your existing layout.
export default function PartnersPage() {
  return (
    <main className="overflow-x-clip">
      <PartnersHero />

      {/* long purple panel #1: Credentials + What We Deliver (+ globe background) */}
      <div className="relative isolate">
        <PurplePanel variant="top">
          <img
            src="/images/Partnership_Section_Image.png"
            alt=""
            className="absolute hidden h-auto w-[520px] max-w-none lg:block"
            style={{ right: -88, top: 773 }}
          />
        </PurplePanel>
        <Credentials />
        <WhatWeDeliver />
      </div>

      <div className="relative isolate">
        {/* blue glows behind the products + partnership sections */}
        <div aria-hidden className="pointer-events-none absolute -z-10 hidden lg:block" style={{ left: -700, top: 810, width: 1500, height: 1300, background: "radial-gradient(closest-side, rgba(40,95,230,0.5), rgba(40,95,230,0) 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute -z-10 hidden lg:block" style={{ right: -600, top: 1360, width: 1400, height: 1500, background: "radial-gradient(closest-side, rgba(40,95,230,0.45), rgba(40,95,230,0) 100%)" }} />
        <CiscoProducts />
        <TrustedPartnership />
      </div>

      {/* long purple panel #2: FAQ + CTA */}
      <div className="relative isolate">
        <PurplePanel variant="bottom" />
        <PartnersFaq />
        <CtaBanner />
      </div>
    </main>
  );
}
