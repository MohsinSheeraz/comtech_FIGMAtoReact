// the "Post schema" (JSON-LD) that tells Google and AI search what a post is

export const SITE_URL = "https://justforexamplefornow.com"; // same as metadataBase in app/layout.tsx

export const SCHEMA_TYPES = [
    { id: "BlogPosting", label: "Blog post" },
    { id: "Article", label: "Article" },
    { id: "NewsArticle", label: "News article" },
    { id: "none", label: "Off (no schema on this post)" },
] as const;

export type SchemaType = (typeof SCHEMA_TYPES)[number]["id"];
export type PostSchema = { type: SchemaType; faq: { q: string; a: string }[] };

export const DEFAULT_SCHEMA: PostSchema = { type: "BlogPosting", faq: [] };

// checks what the editor sends: a known type, and only FAQ rows that have both a question and an answer
export function normSchema(x: unknown): PostSchema {
    const o = (x ?? {}) as { type?: unknown; faq?: unknown };
    const type = SCHEMA_TYPES.find((t) => t.id === o.type)?.id ?? DEFAULT_SCHEMA.type;
    const cut = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
    const faq = Array.isArray(o.faq)
        ? o.faq
              .map((r) => ({ q: cut((r as { q?: unknown })?.q, 300), a: cut((r as { a?: unknown })?.a, 2000) }))
              .filter((r) => r.q && r.a)
              .slice(0, 20)
        : [];
    return { type, faq };
}

export type SchemaInput = {
    slug: string;
    title: string;
    description: string;
    image: string;
    authors: string[];
    date: string; // DD-MM-YYYY
    category: string;
    keywords: string[];
};

const absolute = (u: string) => {
    try {
        return new URL(u, SITE_URL).toString();
    } catch {
        return "";
    }
};

// "DD-MM-YYYY" -> "YYYY-MM-DD"
const iso = (dmy: string) => (/^\d{2}-\d{2}-\d{4}$/.test(dmy) ? dmy.split("-").reverse().join("-") : undefined);

// the JSON-LD object for one post, or null when the schema is switched off
export function buildSchema(i: SchemaInput, s: PostSchema): object | null {
    if (s.type === "none") return null;
    const url = `${SITE_URL}/blog/${i.slug}`;
    const org = { "@type": "Organization", name: "Comtech Associates", url: SITE_URL };
    const image = i.image ? absolute(i.image) : "";

    const article = {
        "@type": s.type,
        "@id": `${url}#article`,
        headline: i.title.slice(0, 110),
        description: i.description,
        image: image ? [image] : undefined,
        author: i.authors.length ? i.authors.map((name) => ({ "@type": "Person", name })) : org,
        publisher: org,
        datePublished: iso(i.date),
        dateModified: iso(i.date),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: i.category || undefined,
        keywords: i.keywords.length ? i.keywords.join(", ") : undefined,
    };

    const graph: object[] = [article];
    if (s.faq.length)
        graph.push({
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: s.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        });
    return { "@context": "https://schema.org", "@graph": graph };
}
