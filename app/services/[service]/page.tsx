import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail, servicePages } from "@/components/ServiceDetail";

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();

  return { title: service.title, description: service.description };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
