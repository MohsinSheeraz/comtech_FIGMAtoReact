import { postsData } from "@/lib/post-data";

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
  sections: Section[];
  toc?: string[]; // optional; falls back to section headings
  seo: {
    metaTitle?: string;       // falls back to "<title> | Comtech Associates"
    metaDescription?: string; // falls back to excerpt
    metaTags?: string[];      // used as meta keywords
    ogImage?: string;         // falls back to image
  };
};

export const PER_PAGE = 12;

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