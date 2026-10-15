import { promises as fs } from "fs";
import path from "path";

const MAX = 5 * 1024 * 1024;
const EXT: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
};

export type PostImage = { bytes: Buffer; ext: string };

// null = no image was supplied, { error } = the image was rejected
export async function readImage(fd: FormData): Promise<PostImage | { error: string } | null> {
    const file = fd.get("imageFile");
    const url = String(fd.get("imageUrl") ?? "").trim();

    if (file instanceof File && file.size > 0) {
        const ext = EXT[file.type];
        if (!ext) return { error: "Use a PNG, JPG, WebP, GIF or AVIF image." };
        if (file.size > MAX) return { error: "The image is over 5 MB." };
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
        if (bytes.length > MAX) return { error: "The image is over 5 MB." };
        return { bytes, ext };
    }

    return null;
}

// saves into public/images/<slug>.<ext> and returns the public path
export async function saveImage(slug: string, img: PostImage): Promise<string> {
    const dir = path.join(process.cwd(), "public", "images");
    await fs.mkdir(dir, { recursive: true });
    const name = `${slug}.${img.ext}`;
    await fs.writeFile(path.join(dir, name), img.bytes);
    return `/images/${name}`;
}