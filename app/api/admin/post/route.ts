import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getPost } from "@/lib/posts";
import { readPostForm, toPost } from "@/lib/post-form";
import { deleteImage, imageErrorMessage, readImage, saveImage } from "@/lib/post-image";
import { createPost } from "@/lib/post-write";

export const runtime = "nodejs";

const fail = (error: string, status = 400) =>
    NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
    if (!(await isAdmin())) return fail("You're not logged in.", 401);

    const fd = await req.formData();
    const parsed = readPostForm(fd);
    if ("error" in parsed) return fail(parsed.error);
    const { form } = parsed;

    if (await getPost(form.slug)) return fail("A post with this slug already exists.");

    const img = await readImage(fd);
    if (!img) return fail("Add a cover image (upload or URL).");
    if ("error" in img) return fail(img.error);

    let image: string;
    try {
        image = await saveImage(form.slug, img);
    } catch (e) {
        return fail(imageErrorMessage(e), 500);
    }

    try {
        const ok = await createPost(toPost(form, image));
        if (!ok) {
            await deleteImage(image);
            return fail("A post with this slug already exists.");
        }
    } catch {
        await deleteImage(image);
        return fail("Couldn't save to the database.", 500);
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, slug: form.slug });
}