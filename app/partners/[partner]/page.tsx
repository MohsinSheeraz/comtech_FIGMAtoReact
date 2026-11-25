import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
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

  return pageMetadata(`/partners/${partner}`, {
    alternates: {
      canonical: `https://comtech.net.pk/partners/${partner}`,
    },
  });
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
