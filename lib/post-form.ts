import { DEFAULT_SIZES, normBlocks, normSizes, parseContent, todayDMY, type Block, type TextSizes } from "@/lib/post-code";
import { DEFAULT_SCHEMA, normSchema, type PostSchema } from "@/lib/post-schema";
import type { Post } from "@/lib/posts";

export type PostForm = {
    slug: string;
    title: string;
    category: string;
    author: string;
    date: string;
    excerpt: string;
    quickAnswer: string;
    intro: string;
    blocks: Block[];
    sizes: TextSizes;
    toc: string[];
    schema: PostSchema;
    metaTitle: string;
    metaDescription: string;
    metaTags: string;
    ogImage: string;
};

// reads and validates what the editor sends
export function readPostForm(fd: FormData): { error: string } | { form: PostForm } {
    const text = (k: string) => String(fd.get(k) ?? "").trim();

    const slug = text("slug");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
        return { error: "The slug can only use lowercase letters, numbers and dashes." };

    // the editor sends "blocks" (JSON); "content" is the older "# / ## / ###" text
    let blocks: Block[] = [];
    if (fd.has("blocks")) {
        try {
            blocks = normBlocks(JSON.parse(text("blocks")));
        } catch { }
    } else blocks = parseContent(text("content"));
    if (!text("title") || !text("excerpt") || !text("intro") || blocks.length === 0)
        return { error: "Title, excerpt, intro and content are required." };

    let sizes = DEFAULT_SIZES;
    try {
        sizes = normSizes(JSON.parse(text("sizes")));
    } catch { }

    let toc: string[] = [];
    try {
        const t = JSON.parse(text("toc"));
        if (Array.isArray(t)) toc = t.map((x) => String(x).trim()).filter(Boolean);
    } catch { }

    let schema = DEFAULT_SCHEMA;
    try {
        schema = normSchema(JSON.parse(text("schema")));
    } catch { }

    return {
        form: {
            slug,
            title: text("title"),
            category: text("category"),
            author: text("author"),
            date: text("date"),
            excerpt: text("excerpt"),
            quickAnswer: text("quickAnswer"),
            intro: text("intro"),
            blocks,
            sizes,
            toc,
            schema,
            metaTitle: text("metaTitle"),
            metaDescription: text("metaDescription"),
            metaTags: text("metaTags"),
            ogImage: text("ogImage"),
        },
    };
}

// the post object that gets stored in Mongo (toc: [] = no Table of Contents)
export function toPost(f: PostForm, image: string, thumbnailImage?: string): Post {
    const tags = f.metaTags.split(",").map((t) => t.trim()).filter(Boolean);
    const seo: Post["seo"] = {};
    if (f.metaTitle) seo.metaTitle = f.metaTitle;
    if (f.metaDescription) seo.metaDescription = f.metaDescription;
    if (tags.length) seo.metaTags = tags;
    if (f.ogImage) seo.ogImage = f.ogImage;

    return {
        slug: f.slug,
        title: f.title,
        excerpt: f.excerpt,
        ...(f.quickAnswer ? { quickAnswer: f.quickAnswer } : {}),
        ...(f.author ? { author: f.author } : {}),
        date: f.date || todayDMY(),
        category: f.category || "General",
        image,
        ...(thumbnailImage ? { thumbnailImage } : {}),
        intro: f.intro,
        sections: [],
        content: f.blocks,
        sizes: f.sizes,
        toc: f.toc,
        schema: f.schema,
        seo,
    };
}