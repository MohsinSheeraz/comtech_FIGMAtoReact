import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { buildPostCode, normSizes } from "@/lib/post-code";
import { readImage, saveImage } from "@/lib/post-image";

export const runtime = "nodejs";

const fail = (error: string, status = 400) =>
    NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
    if (!(await isAdmin())) return fail("You're not logged in.", 401);
    if (process.env.NODE_ENV === "production")
        return fail("Saving only works when running locally (npm run dev).", 403);

    const fd = await req.formData();
    const text = (k: string) => String(fd.get(k) ?? "").trim();

    const slug = text("slug");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return fail("The slug can only use lowercase letters, numbers and dashes.");

    const content = text("content");
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

    const dataFile = path.join(process.cwd(), "lib", "post-data.ts");
    const src = await fs.readFile(dataFile, "utf8");
    if (src.includes(`slug: ${JSON.stringify(slug)}`)) return fail("A post with this slug already exists.");

    const img = await readImage(fd);
    if (!img) return fail("Add a cover image (upload or URL).");
    if ("error" in img) return fail(img.error);
    const image = await saveImage(slug, img);

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

    // insert at the top of realPosts
    const open = /const realPosts: Post\[\] = \[[ \t]*\r?\n/;
    const inline = /const realPosts: Post\[\] = \[\];/;
    let next: string;
    const m = open.exec(src);
    if (m) {
        const i = m.index + m[0].length;
        next = src.slice(0, i) + code + "\n" + src.slice(i);
    } else if (inline.test(src)) {
        next = src.replace(inline, `const realPosts: Post[] = [\n${code}\n];`);
    } else {
        return fail("Couldn't find `const realPosts: Post[] = [` in lib/post-data.ts.");
    }
    await fs.writeFile(dataFile, next, "utf8");

    return NextResponse.json({ ok: true, slug });
}