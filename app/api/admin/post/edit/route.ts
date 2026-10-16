import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getPost, isDynamicPost } from "@/lib/posts";
import { readPostForm, toPost } from "@/lib/post-form";
import { deleteImage, imageErrorMessage, readImage, saveImage } from "@/lib/post-image";
import { updatePost } from "@/lib/post-write";

export const runtime = "nodejs";

const fail = (error: string, status = 400) =>
    NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
    if (!(await isAdmin())) return fail("You're not logged in.", 401);

    const fd = await req.formData();
    const parsed = readPostForm(fd);
    if ("error" in parsed) return fail(parsed.error);
    const { form } = parsed;

    const existing = await getPost(form.slug);
    if (!existing || !isDynamicPost(existing)) return fail("Post not found.", 404);

    // keep the current cover unless a new one was supplied
    let image = existing.image;
    let uploaded = "";
    const img = await readImage(fd);
    if (img && "error" in img) return fail(img.error);
    if (img) {
        try {
            uploaded = await saveImage(form.slug, img);
        } catch (e) {
            return fail(imageErrorMessage(e), 500);
        }
        image = uploaded;
    }
    if (!image) return fail("This post has no cover image.");

    try {
        await updatePost(toPost(form, image));
    } catch {
        if (uploaded) await deleteImage(uploaded);
        return fail("Couldn't save to the database.", 500);
    }

    // the old cover is no longer used
    if (uploaded) await deleteImage(existing.image);

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, slug: form.slug });
}