export type Block = { t: "h1" | "h2" | "h3" | "p"; text: string };
export type TextSizes = { h1: number; h2: number; h3: number; p: number };

export const DEFAULT_SIZES: TextSizes = { h1: 34, h2: 28, h3: 22, p: 18 };

// keeps every size between 10 and 120 px, falls back to the default otherwise
export function normSizes(x: unknown): TextSizes {
    const o = (x ?? {}) as Partial<Record<keyof TextSizes, unknown>>;
    const pick = (k: keyof TextSizes) => {
        const n = Number(o[k]);
        return Number.isFinite(n) && n >= 10 && n <= 120 ? Math.round(n) : DEFAULT_SIZES[k];
    };
    return { h1: pick("h1"), h2: pick("h2"), h3: pick("h3"), p: pick("p") };
}

export type PostFields = {
    slug: string;
    title: string;
    category: string;
    author: string;
    date: string;
    image: string;
    excerpt: string;
    intro: string;
    content: string;
    sizes: TextSizes;
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

// "# x" = h1, "## x" = h2, "### x" = h3, everything else = paragraph (blank line splits paragraphs)
export function parseContent(src: string): Block[] {
    const blocks: Block[] = [];
    let para: string[] = [];
    const flush = () => {
        const t = para.join(" ").trim();
        if (t) blocks.push({ t: "p", text: t });
        para = [];
    };
    for (const raw of src.split(/\r?\n/)) {
        const line = raw.trim();
        const m = /^(#{1,3})\s+(.+)$/.exec(line);
        if (m) {
            flush();
            blocks.push({ t: `h${m[1].length}` as Block["t"], text: m[2].trim() });
        } else if (!line) flush();
        else para.push(line);
    }
    flush();
    return blocks;
}

export function buildPostCode(f: PostFields): string {
    const content = parseContent(f.content)
        .map((b) => `      { t: ${q(b.t)}, text: ${q(b.text)} },`)
        .join("\n");
    const s = normSizes(f.sizes);

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

    return `  {\n${lines}\n    sections: [],\n    content: [\n${content}\n    ],\n    sizes: { h1: ${s.h1}, h2: ${s.h2}, h3: ${s.h3}, p: ${s.p} },\n    seo: {\n${seo}\n    },\n  },`;
}