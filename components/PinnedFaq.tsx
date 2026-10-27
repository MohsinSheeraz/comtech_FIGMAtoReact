"use client";
import type { ReactNode } from "react";
import { Faq } from "@/components/Faq";
import { FaqBreeze } from "@/components/Faqbreeze";

export function PinnedFaq({
  head,
  items,
  className = "",
}: {
  head: ReactNode;
  items: [string, string][];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="faq relative isolate">
        <FaqBreeze
          className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
          x={0.22}
          y={0.62}
          size={0.42}
        />
        <div>{head}</div>
        <Faq items={items} />
      </div>
    </div>
  );
}
