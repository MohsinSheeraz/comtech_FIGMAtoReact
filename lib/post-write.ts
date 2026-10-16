import type { UpdateFilter } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Post } from "@/lib/posts";

type Doc = Post & { createdAt: Date; updatedAt: Date };

const col = async () => (await getDb()).collection<Doc>("posts");

// drops undefined fields (Mongo would store them as null)
const clean = (p: Post) => JSON.parse(JSON.stringify(p)) as Post;

// false = a post with this slug already exists
export async function createPost(post: Post): Promise<boolean> {
    const c = await col();
    await c.createIndex({ slug: 1 }, { unique: true });
    const now = new Date();
    try {
        await c.insertOne({ ...clean(post), createdAt: now, updatedAt: now });
        return true;
    } catch (e) {
        if ((e as { code?: number }).code === 11000) return false;
        throw e;
    }
}

// updates the post, or copies an old file-based post into Mongo the first time it is saved
export async function updatePost(post: Post): Promise<void> {
    const c = await col();
    await c.createIndex({ slug: 1 }, { unique: true });
    const now = new Date();
    const doc = clean(post);

    const update: UpdateFilter<Doc> = {
        $set: { ...doc, updatedAt: now },
        $setOnInsert: { createdAt: now },
    };
    if (doc.author === undefined) update.$unset = { author: "" };

    await c.updateOne({ slug: doc.slug }, update, { upsert: true });
}