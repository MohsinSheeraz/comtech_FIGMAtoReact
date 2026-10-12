import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { buildPostCode, normSizes } from "@/lib/post-code";

export const runtime = "nodejs";

const MAX = 5 * 1024 * 1024;
const EXT: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
};

const fail = (error: string, status = 400) =>
    NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
    if (!(await isAdmin())) return fail("You're not logged in.", 401);
    if (process.env.NODE_ENV === "production")
        return fail("Saving only works when running locally (npm run dev). Use Copy code instead.", 403);

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

    // locate the data file and check the slug is new
    const dataFile = path.join(process.cwd(), "lib", "post-data.ts");
    const src = await fs.readFile(dataFile, "utf8");
    if (src.includes(`slug: ${JSON.stringify(slug)}`)) return fail("A post with this slug already exists.");

    // cover image: uploaded file or downloaded from a URL
    let bytes: Buffer = Buffer.alloc(0);
    let ext = "";
    const file = fd.get("imageFile");
    const url = text("imageUrl");

    if (file instanceof File && file.size > 0) {
        ext = EXT[file.type];
        if (!ext) return fail("Use a PNG, JPG, WebP, GIF or AVIF image.");
        if (file.size > MAX) return fail("The image is over 5 MB.");
        bytes = Buffer.from(await file.arrayBuffer());
    } else if (url) {
        let u: URL;
        try {
            u = new URL(url);
        } catch {
            return fail("That image URL isn't valid.");
        }
        if (u.protocol !== "http:" && u.protocol !== "https:") return fail("The image URL must start with http or https.");
        let res: Response;
        try {
            res = await fetch(u, { signal: AbortSignal.timeout(10000) });
        } catch {
            return fail("Couldn't download that image URL.");
        }
        if (!res.ok) return fail(`The image URL returned ${res.status}.`);
        const type = (res.headers.get("content-type") ?? "").split(";")[0].trim();
        ext = EXT[type];
        if (!ext) return fail("That URL isn't a supported image (PNG, JPG, WebP, GIF or AVIF).");
        bytes = Buffer.from(await res.arrayBuffer());
        if (bytes.length > MAX) return fail("The image is over 5 MB.");
    } else {
        return fail("Add a cover image (upload or URL).");
    }

    const imgDir = path.join(process.cwd(), "public", "images");
    await fs.mkdir(imgDir, { recursive: true });
    const name = `${slug}.${ext}`;
    await fs.writeFile(path.join(imgDir, name), bytes);

    const code = buildPostCode({
        slug,
        title: text("title"),
        category: text("category") || "General",
        author: text("author"),
        date: text("date"),
        image: `/images/${name}`,
        excerpt: text("excerpt"),
        intro: text("intro"),
        content,
        sizes,
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