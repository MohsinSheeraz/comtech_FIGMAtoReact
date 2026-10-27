import type { ReactNode } from "react";
import { PinnedFaq } from "@/components/PinnedFaq";

export function StackedFaq({
  head, items, className = "",
}: {
  head: ReactNode;
  items: [string, string][];
  className?: string;
}) {
  return <PinnedFaq className={className} head={head} items={items} />;
}
