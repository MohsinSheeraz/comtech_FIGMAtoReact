import { cache } from "react";
import { postsData } from "@/lib/post-data";
import { getDb } from "@/lib/mongodb";
import type { Block, TextSizes } from "@/lib/post-code";
import type { PostSchema } from "@/lib/post-schema";

export type Section = { h: string; p: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  quickAnswer?: string;
  author?: string;
  date: string;
  category: string;
  image: string;
  intro: string;
  sections: Section[];   // old posts
  content?: Block[];     // new posts: headings and paragraphs from the editor
  sizes?: TextSizes;     // new posts: px sizes for h1/h2/h3/p
  toc?: string[];        // Table of Contents entries; [] = hidden
  schema?: PostSchema;   // JSON-LD settings; missing = Blog post, no FAQ
  seo: {
    metaTitle?: string;       // falls back to "<title> | Comtech Associates"
    metaDescription?: string; // falls back to excerpt
    metaTags?: string[];      // used as meta keywords
    ogImage?: string;         // falls back to image
  };
};

export const PER_PAGE = 12;

// the 120 static placeholder posts in post-data.ts all use this slug pattern
const PLACEHOLDER = /^infrastructure-support-reduces-downtime-\d+$/;
export const isDynamicPost = (p: Post) => !PLACEHOLDER.test(p.slug);

// posts saved from the admin (newest first); the site keeps working if the database is down
async function dbPosts(): Promise<Post[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection("posts")
      .find({}, { projection: { _id: 0, createdAt: 0, updatedAt: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
    return docs as unknown as Post[];
  } catch (e) {
    console.error("Couldn't read posts from the database:", e);
    return [];
  }
}

// Mongo posts first, then the static ones; if a slug exists in both, Mongo wins
const loadAll = cache(async (): Promise<Post[]> => {
  const fromDb = await dbPosts();
  const seen = new Set(fromDb.map((p) => p.slug));
  return [...fromDb, ...postsData.filter((p) => !seen.has(p.slug))];
});

/* ------------------------------------------------------------------
   DATA ACCESS LAYER: pages only call these functions.
------------------------------------------------------------------- */

export async function getPostsPage(page: number) {
  const all = await loadAll();
  const total = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const current = Math.min(Math.max(page || 1, 1), total);
  const items = all.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  return { items, current, total };
}

export async function getPost(slug: string): Promise<Post | null> {
  return (await loadAll()).find((p) => p.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  return (await loadAll()).map((p) => p.slug);
}

export async function getRecentPosts(excludeSlug: string, limit = 4) {
  return (await loadAll()).filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

// Placeholder logic; later this can match by category or tags.
export async function getRelatedPosts(excludeSlug: string, limit = 3) {
  return (await loadAll()).filter((p) => p.slug !== excludeSlug).slice(4, 4 + limit);
}

// the post listed before and after this one (the blog list is newest first)
export async function getAdjacentPosts(slug: string) {
  const all = await loadAll();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  return loadAll();
}

// posts created from the admin (no static placeholders)
export async function getDynamicPosts(): Promise<Post[]> {
  return (await loadAll()).filter(isDynamicPost);
}