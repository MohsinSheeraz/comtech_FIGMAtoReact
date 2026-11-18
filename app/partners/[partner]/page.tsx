import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartnerDetail } from "@/components/PartnerDetail";
import { getPartnerPage, getPartnerSlugs, toPartnerDetail } from "@/lib/partnerPages";

export function generateStaticParams() {
  return getPartnerSlugs().map((partner) => ({ partner }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partner: string }>;
}): Promise<Metadata> {
  const { partner } = await params;
  const page = getPartnerPage(partner);
  if (!page) notFound();

  return {
    title: `${page.name} ${page.category} in Pakistan | Comtech Associates`,
    description: page.description,
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ partner: string }>;
}) {
  const { partner } = await params;
  const page = getPartnerPage(partner);
  if (!page) notFound();

  return <PartnerDetail d={toPartnerDetail(page)} />;
}
