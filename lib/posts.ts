import { postsData } from "@/lib/post-data";
import type { Block, TextSizes } from "@/lib/post-code";

export type Section = { h: string; p: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  author?: string;
  date: string;
  category: string;
  image: string;
  intro: string;
  sections: Section[];   // old posts
  content?: Block[];     // new posts: headings and paragraphs from the editor
  sizes?: TextSizes;     // new posts: px sizes for h1/h2/h3/p
  toc?: string[]; // optional; falls back to the headings
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

/* ------------------------------------------------------------------
   DATA ACCESS LAYER: pages only call these functions.
   When the database arrives, rewrite the bodies below and keep the
   signatures; no page needs to change.
------------------------------------------------------------------- */

export async function getPostsPage(page: number) {
  const total = Math.max(1, Math.ceil(postsData.length / PER_PAGE));
  const current = Math.min(Math.max(page || 1, 1), total);
  const items = postsData.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  return { items, current, total };
}

export async function getPost(slug: string): Promise<Post | null> {
  return postsData.find((p) => p.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  return postsData.map((p) => p.slug);
}

export async function getRecentPosts(excludeSlug: string, limit = 4) {
  return postsData.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

// Placeholder logic; later this can match by category or tags.
export async function getRelatedPosts(excludeSlug: string, limit = 3) {
  return postsData.filter((p) => p.slug !== excludeSlug).slice(4, 4 + limit);
}

export async function getAllPosts(): Promise<Post[]> {
  return postsData;
}

// only posts created from the admin (no static placeholders)
export async function getDynamicPosts(): Promise<Post[]> {
  return postsData.filter(isDynamicPost);
}