import type { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type Author = { id: string; name: string; pfp?: string; createdAt: string };

type Doc = { name: string; pfp?: string; createdAt: Date };

const col = async () => (await getDb()).collection<Doc>("authors");

const toAuthor = (d: Doc & { _id: ObjectId }): Author => ({
    id: d._id.toString(),
    name: d.name,
    pfp: d.pfp,
    createdAt: d.createdAt.toISOString(),
});

export async function listAuthors(): Promise<Author[]> {
    const docs = await (await col()).find().sort({ createdAt: -1 }).toArray();
    return docs.map(toAuthor);
}

// returns null when an author with the same name already exists (case-insensitive)
export async function addAuthor(name: string, pfp?: string): Promise<Author | null> {
    const c = await col();
    const dup = await c.findOne({ name }, { collation: { locale: "en", strength: 2 } });
    if (dup) return null;
    const doc: Doc = { name, createdAt: new Date(), ...(pfp ? { pfp } : {}) };
    const res = await c.insertOne(doc);
    return toAuthor({ ...doc, _id: res.insertedId });
}