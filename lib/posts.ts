// Placeholder blog data until a CMS is connected. Every post uses the same copy and image, like the Figma.
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
};

export const PER_PAGE = 12;

export const posts: Post[] = Array.from({ length: 120 }, (_, i) => ({
  slug: `infrastructure-support-reduces-downtime-${i + 1}`,
  title: "How 24/7 Infrastructure Support Reduces Downtime",
  excerpt:
    "Centrally managed, secure connectivity between multiple offices or branches, replacing costly point-to-point links with something more resilient and far easier to monitor.",
  author: "Ausaf Ali",
  date: "03-10-2026",
  category: "Networking Infrastructure",
  image: "/images/BlogExampleImageForNow.png",
}));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
