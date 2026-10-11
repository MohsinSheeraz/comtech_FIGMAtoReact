export type PostFields = {
    slug: string;
    title: string;
    category: string;
    author: string;
    date: string;
    image: string;
    excerpt: string;
    intro: string;
    sections: { h: string; p: string }[];
    metaTitle: string;
    metaDescription: string;
    metaTags: string;
    ogImage: string;
};

export const slugify = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const q = (s: string) => JSON.stringify(s);

// DD-MM-YYYY, used when the date field is left blank
export function todayDMY() {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    return `${p(d.getDate())}-${p(d.getMonth() + 1)}-${d.getFullYear()}`;
}

export function buildPostCode(f: PostFields): string {
    const sections = f.sections
        .filter((s) => s.h.trim())
        .map((s) => {
            const ps = s.p.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
            return `      {\n        h: ${q(s.h.trim())},\n        p: [\n${ps
                .map((x) => `          ${q(x)},`)
                .join("\n")}\n        ],\n      },`;
        })
        .join("\n");

    const tags = f.metaTags.split(",").map((t) => t.trim()).filter(Boolean);
    const seo = [
        f.metaTitle.trim() && `      metaTitle: ${q(f.metaTitle.trim())},`,
        f.metaDescription.trim() && `      metaDescription: ${q(f.metaDescription.trim())},`,
        tags.length > 0 && `      metaTags: [${tags.map(q).join(", ")}],`,
        f.ogImage.trim() && `      ogImage: ${q(f.ogImage.trim())},`,
    ]
        .filter(Boolean)
        .join("\n");

    const lines = [
        `    slug: ${q(f.slug.trim())},`,
        `    title: ${q(f.title.trim())},`,
        `    excerpt: ${q(f.excerpt.trim())},`,
        f.author.trim() && `    author: ${q(f.author.trim())},`,
        `    date: ${q(f.date.trim() || todayDMY())},`,
        `    category: ${q(f.category.trim())},`,
        `    image: ${q(f.image.trim())},`,
        `    intro: ${q(f.intro.trim())},`,
    ]
        .filter(Boolean)
        .join("\n");

    return `  {\n${lines}\n    sections: [\n${sections}\n    ],\n    seo: {\n${seo}\n    },\n  },`;
}