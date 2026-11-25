import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-seo";
import { notFound } from "next/navigation";
import { IndustryDetail, industryPages } from "@/components/IndustryDetail";

export function generateStaticParams() {
  return industryPages.map(({ slug }) => ({ industry: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = industryPages.find((item) => item.slug === slug);
  if (!industry) notFound();

  return pageMetadata(`/industries/${industry.slug}`, {
    alternates: {
      canonical: `https://comtech.net.pk/industries/${industry.slug}`,
    },
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = industryPages.find((item) => item.slug === slug);
  if (!industry) notFound();

  return <IndustryDetail industry={industry} />;
}
