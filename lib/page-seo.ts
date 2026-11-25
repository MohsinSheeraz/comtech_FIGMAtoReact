import { cache } from "react";
import type { Metadata } from "next";
import { getDb } from "@/lib/mongodb";
import { getSeoPage } from "@/lib/seo-pages";

export const SEO_COLLECTION = "page_seo";

/** An admin edit for one page. An empty string means "use the default". */
export type SeoOverride = {
  path: string;
  title: string;
  description: string;
  updatedAt: Date;
};

// one read per render; the site keeps its default titles if the database is down
export const getSeoOverrides = cache(async (): Promise<Map<string, SeoOverride>> => {
  try {
    const docs = await (await getDb())
      .collection<SeoOverride>(SEO_COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .toArray();
    return new Map(docs.map((d) => [d.path, d]));
  } catch {
    return new Map();
  }
});

/**
 * Metadata for a page listed in lib/seo-pages.ts: its default title and description,
 * replaced by whatever was saved in /admin/seo. Open Graph and Twitter copies follow along.
 */
export async function pageMetadata(path: string, extra: Metadata = {}): Promise<Metadata> {
  const page = getSeoPage(path);
  const override = (await getSeoOverrides()).get(path);
  const title = override?.title || page?.title;
  const description = override?.description || page?.description;
  const text = { ...(title && { title }), ...(description && { description }) };

  return {
    ...extra,
    ...text,
    ...(extra.openGraph && { openGraph: { ...extra.openGraph, ...text } }),
    ...(extra.twitter && { twitter: { ...extra.twitter, ...text } }),
  };
}
