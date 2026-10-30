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

    // Keep current images unless new ones were supplied.
    let image = existing.image;
    let thumbnailImage = existing.thumbnailImage ?? "";
    let uploaded = "";
    let uploadedThumbnail = "";
    const img = await readImage(fd);
    if (img && "error" in img) return fail(img.error);
    const thumbnail = await readImage(
        fd,
        "thumbnailImageFile",
        "thumbnailImageUrl",
    );
    if (thumbnail && "error" in thumbnail) return fail(thumbnail.error);

    if (!image) return fail("This post has no cover image.");

    try {
        if (img) {
            uploaded = await saveImage(form.slug, img);
            image = uploaded;
        }
        if (thumbnail) {
            uploadedThumbnail = await saveImage(
                `${form.slug}-thumbnail`,
                thumbnail,
            );
            thumbnailImage = uploadedThumbnail;
        }
    } catch (e) {
        if (uploaded) await deleteImage(uploaded);
        if (uploadedThumbnail) await deleteImage(uploadedThumbnail);
        return fail(imageErrorMessage(e), 500);
    }

    try {
        await updatePost(toPost(form, image, thumbnailImage || undefined));
    } catch {
        if (uploaded) await deleteImage(uploaded);
        if (uploadedThumbnail) await deleteImage(uploadedThumbnail);
        return fail("Couldn't save to the database.", 500);
    }

    // Remove replaced files only after the updated post is saved.
    if (uploaded) await deleteImage(existing.image);
    if (uploadedThumbnail && existing.thumbnailImage)
        await deleteImage(existing.thumbnailImage);

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, slug: form.slug });
}