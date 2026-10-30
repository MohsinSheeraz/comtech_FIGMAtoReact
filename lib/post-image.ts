import { put, del } from "@vercel/blob";

const MAX = 4 * 1024 * 1024; // Vercel rejects request bodies over ~4.5 MB
const EXT: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
};
const TYPE: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    avif: "image/avif",
};

export type PostImage = { bytes: Buffer; ext: string };

// null = no image was supplied, { error } = the image was rejected
export async function readImage(
    fd: FormData,
    fileKey = "imageFile",
    urlKey = "imageUrl",
): Promise<PostImage | { error: string } | null> {
    const file = fd.get(fileKey);
    const url = String(fd.get(urlKey) ?? "").trim();

    if (file instanceof File && file.size > 0) {
        const ext = EXT[file.type];
        if (!ext) return { error: "Use a PNG, JPG, WebP, GIF or AVIF image." };
        if (file.size > MAX) return { error: "The image is over 4 MB." };
        return { bytes: Buffer.from(await file.arrayBuffer()), ext };
    }

    if (url) {
        let u: URL;
        try {
            u = new URL(url);
        } catch {
            return { error: "That image URL isn't valid." };
        }
        if (u.protocol !== "http:" && u.protocol !== "https:")
            return { error: "The image URL must start with http or https." };
        let res: Response;
        try {
            res = await fetch(u, { signal: AbortSignal.timeout(10000) });
        } catch {
            return { error: "Couldn't download that image URL." };
        }
        if (!res.ok) return { error: `The image URL returned ${res.status}.` };
        const type = (res.headers.get("content-type") ?? "").split(";")[0].trim();
        const ext = EXT[type];
        if (!ext) return { error: "That URL isn't a supported image (PNG, JPG, WebP, GIF or AVIF)." };
        const bytes = Buffer.from(await res.arrayBuffer());
        if (bytes.length > MAX) return { error: "The image is over 4 MB." };
        return { bytes, ext };
    }

    return null;
}

// uploads to Vercel Blob and returns the public URL
export async function saveImage(slug: string, img: PostImage): Promise<string> {
    if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("BLOB_NOT_CONFIGURED");
    const blob = await put(`post-covers/${slug}.${img.ext}`, img.bytes, {
        access: "public",
        addRandomSuffix: true,
        contentType: TYPE[img.ext],
    });
    return blob.url;
}

// only removes Blob files; old /images/... paths from the repo are left alone
export async function deleteImage(url: string): Promise<void> {
    if (!/\.public\.blob\.vercel-storage\.com\//.test(url)) return;
    try {
        await del(url);
    } catch { }
}

export function imageErrorMessage(e: unknown): string {
    return e instanceof Error && e.message === "BLOB_NOT_CONFIGURED"
        ? "Image storage isn't set up yet. Add BLOB_READ_WRITE_TOKEN (your Vercel Blob token) to .env.local and restart npm run dev."
        : "Couldn't upload the image.";
}