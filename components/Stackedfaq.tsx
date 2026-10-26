"use client";
import type { ReactNode } from "react";
import { Faq } from "@/components/Faq";

export function StackedFaq({
  head, items, className = "",
}: {
  head: ReactNode;
  items: [string, string][];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="faq">
        <div>{head}</div>
        <Faq items={items} />
      </div>
    </div>
  );
}
