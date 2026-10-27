import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { imageErrorMessage, readImage, saveImage } from "@/lib/post-image";

export const runtime = "nodejs";

const fail = (error: string, status = 400) =>
    NextResponse.json({ ok: false, error }, { status });

// uploads one picture used inside a post (file or URL) and returns its public URL
export async function POST(req: Request) {
    if (!(await isAdmin())) return fail("You're not logged in.", 401);

    const fd = await req.formData();
    const img = await readImage(fd);
    if (!img) return fail("Add an image (upload or URL).");
    if ("error" in img) return fail(img.error);

    const slug = String(fd.get("slug") ?? "");
    const name = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : "post";

    try {
        return NextResponse.json({ ok: true, url: await saveImage(`${name}-body`, img) });
    } catch (e) {
        return fail(imageErrorMessage(e), 500);
    }
}
