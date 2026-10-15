import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { buildPostCode, normSizes } from "@/lib/post-code";
import { readImage, saveImage } from "@/lib/post-image";

export const runtime = "nodejs";

const fail = (error: string, status = 400) =>
    NextResponse.json({ ok: false, error }, { status });

// finds the `{ ... }` entry for this slug inside realPosts (skips strings and comments)
function findEntry(src: string, slug: string): { start: number; end: number } | null {
    const head = "const realPosts: Post[] = [";
    const from = src.indexOf(head);
    if (from < 0) return null;
    const key = `slug: ${JSON.stringify(slug)}`;

    let depth = 0;
    let start = -1;
    for (let i = from + head.length; i < src.length; i++) {
        const c = src[i];
        if (c === '"' || c === "'" || c === "`") {
            for (i++; i < src.length && src[i] !== c; i++) if (src[i] === "\\") i++;
            continue;
        }
        if (c === "/" && src[i + 1] === "/") {
            while (i < src.length && src[i] !== "\n") i++;
            continue;
        }
        if (c === "/" && src[i + 1] === "*") {
            i = src.indexOf("*/", i + 2);
            if (i < 0) return null;
            i++;
            continue;
        }
        if (c === "{") {
            if (depth === 0) start = i;
            depth++;
        } else if (c === "}") {
            depth--;
            if (depth === 0 && src.slice(start, i + 1).includes(key)) {
                let end = i + 1;
                if (src[end] === ",") end++;
                return { start, end };
            }
        } else if (c === "]" && depth === 0) break;
    }
    return null;
}

export async function POST(req: Request) {
    if (!(await isAdmin())) return fail("You're not logged in.", 401);
    if (process.env.NODE_ENV === "production")
        return fail("Saving only works when running locally (npm run dev).", 403);

    const fd = await req.formData();
    const text = (k: string) => String(fd.get(k) ?? "").trim();

    const slug = text("slug");
    const content = text("content");
    if (!slug) return fail("Missing slug.");
    if (!text("title") || !text("excerpt") || !text("intro") || !content)
        return fail("Title, excerpt, intro and content are required.");

    let rawSizes: unknown = {};
    try {
        rawSizes = JSON.parse(text("sizes"));
    } catch { }
    const sizes = normSizes(rawSizes);
        let toc: string[] = [];
    try {
        const t = JSON.parse(text("toc"));
        if (Array.isArray(t)) toc = t.map((x) => String(x).trim()).filter(Boolean);
    } catch { }

    // new image if one was supplied, otherwise keep the current one
    let image = text("currentImage");
    const img = await readImage(fd);
    if (img && "error" in img) return fail(img.error);
    if (img) image = await saveImage(slug, img);
    if (!image) return fail("This post has no cover image.");

    const dataFile = path.join(process.cwd(), "lib", "post-data.ts");
    const src = await fs.readFile(dataFile, "utf8");
    const range = findEntry(src, slug);
    if (!range)
        return fail("Couldn't find this post in lib/post-data.ts. Only posts created from the admin can be edited.");

    const code = buildPostCode({
        slug,
        title: text("title"),
        category: text("category") || "General",
        author: text("author"),
        date: text("date"),
        image,
        excerpt: text("excerpt"),
        intro: text("intro"),
        content,
        sizes,
        toc,
        metaTitle: text("metaTitle"),
        metaDescription: text("metaDescription"),
        metaTags: text("metaTags"),
        ogImage: text("ogImage"),
    });

    // the entry in the file already has its 2-space indent; the generated code carries its own
    const next = src.slice(0, range.start) + code.replace(/^ {2}/, "") + src.slice(range.end);
    await fs.writeFile(dataFile, next, "utf8");

    return NextResponse.json({ ok: true, slug });
}