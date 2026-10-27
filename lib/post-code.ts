// text blocks keep the old { t, text } shape, so saved posts still load
export type Block =
    | { t: "h1" | "h2" | "h3" | "p" | "quote"; text: string }
    | { t: "ul" | "ol"; items: string[] }
    | { t: "img"; src: string; alt?: string; caption?: string }
    | { t: "table"; rows: string[][] } // first row is the header
    | { t: "hr" };
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

// cuts every row to the same width (at most 60 rows x 12 columns)
export function squareRows(rows: string[][]): string[][] {
    const cut = rows.slice(0, 60).map((r) => r.slice(0, 12));
    const w = Math.max(1, ...cut.map((r) => r.length));
    return cut.map((r) => [...r, ...Array(w - r.length).fill("")]);
}

// the text of every heading of one level, used for the Table of Contents
export const headings = (blocks: Block[], t: "h2" | "h3" = "h2"): string[] =>
    blocks.flatMap((b) => (b.t === t ? [b.text] : []));

// checks and trims blocks that came from the editor; empty ones are dropped
export function normBlocks(x: unknown): Block[] {
    if (!Array.isArray(x)) return [];
    const str = (v: unknown, max = 20000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
    const out: Block[] = [];
    for (const raw of x.slice(0, 400)) {
        const o = (raw ?? {}) as Record<string, unknown>;
        const t = o.t;
        switch (t) {
            case "h1":
            case "h2":
            case "h3":
            case "p":
            case "quote": {
                const text = str(o.text);
                if (text) out.push({ t, text });
                break;
            }
            case "ul":
            case "ol": {
                const items = Array.isArray(o.items) ? o.items.map((i) => str(i, 2000)).filter(Boolean).slice(0, 100) : [];
                if (items.length) out.push({ t, items });
                break;
            }
            case "img": {
                const src = str(o.src, 2000);
                if (!/^https?:\/\//i.test(src) && !/^\/(?!\/)/.test(src)) break;
                const alt = str(o.alt, 300);
                const caption = str(o.caption, 500);
                out.push({ t, src, ...(alt ? { alt } : {}), ...(caption ? { caption } : {}) });
                break;
            }
            case "table": {
                const rows = Array.isArray(o.rows)
                    ? o.rows.map((r) => (Array.isArray(r) ? r.map((c) => str(c, 2000)) : []))
                    : [];
                const sq = squareRows(rows.filter((r) => r.some(Boolean)));
                if (sq.length) out.push({ t, rows: sq });
                break;
            }
            case "hr":
                out.push({ t });
                break;
        }
    }
    return out;
}

export type PostFields = {
    slug: string;
    title: string;
    category: string;
    author: string;
    date: string;
    image: string;
    excerpt: string;
    quickAnswer?: string;
    intro: string;
    content: string;
    sizes: TextSizes;
    toc: string[];
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
            blocks.push({ t: `h${m[1].length}` as "h1" | "h2" | "h3", text: m[2].trim() });
        } else if (!line) flush();
        else para.push(line);
    }
    flush();
    return blocks;
}

export function buildPostCode(f: PostFields): string {
    const content = parseContent(f.content)
        .map((b) => `      ${JSON.stringify(b)},`)
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
        f.quickAnswer?.trim() && `    quickAnswer: ${q(f.quickAnswer.trim())},`,
        f.author.trim() && `    author: ${q(f.author.trim())},`,
        `    date: ${q(f.date.trim() || todayDMY())},`,
        `    category: ${q(f.category.trim())},`,
        `    image: ${q(f.image.trim())},`,
        `    intro: ${q(f.intro.trim())},`,
    ]
        .filter(Boolean)
        .join("\n");
    // always written: [] = no Table of Contents, otherwise the typed entries
    const tocItems = f.toc.map((t) => t.trim()).filter(Boolean);
    const toc = `\n    toc: [${tocItems.map(q).join(", ")}],`;

    return `  {\n${lines}\n    sections: [],\n    content: [\n${content}\n    ],\n    sizes: { h1: ${s.h1}, h2: ${s.h2}, h3: ${s.h3}, p: ${s.p} },${toc}\n    seo: {\n${seo}\n    },\n  },`;
}