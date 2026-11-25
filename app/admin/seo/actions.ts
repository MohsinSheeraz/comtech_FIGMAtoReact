"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getDb } from "@/lib/mongodb";
import { SEO_COLLECTION, type SeoOverride } from "@/lib/page-seo";
import { getSeoPage } from "@/lib/seo-pages";

export type SaveSeoResult = { ok: true; updatedAt: string | null } | { ok: false; error: string };

const MAX_TITLE = 200;
const MAX_DESCRIPTION = 500;

/** Save a page's meta title/description. Blank or default values fall back to the page's default. */
export async function saveSeo(path: string, title: string, description: string): Promise<SaveSeoResult> {
    if (!(await isAdmin())) return { ok: false, error: "Your session expired. Log in again." };

    const page = getSeoPage(path);
    if (!page) return { ok: false, error: "Unknown page." };

    const t = title.replace(/\s+/g, " ").trim();
    const d = description.replace(/\s+/g, " ").trim();
    if (t.length > MAX_TITLE) return { ok: false, error: `Title is over ${MAX_TITLE} characters.` };
    if (d.length > MAX_DESCRIPTION) return { ok: false, error: `Description is over ${MAX_DESCRIPTION} characters.` };

    // store only what differs from the default
    const custom = {
        title: t === page.title ? "" : t,
        description: d === page.description ? "" : d,
    };

    let updatedAt: Date | null = null;
    try {
        const col = (await getDb()).collection<SeoOverride>(SEO_COLLECTION);
        if (!custom.title && !custom.description) {
            await col.deleteOne({ path });
        } else {
            updatedAt = new Date();
            await col.updateOne({ path }, { $set: { path, ...custom, updatedAt } }, { upsert: true });
        }
    } catch {
        return { ok: false, error: "Couldn't save to the database. Check MONGODB_URI." };
    }

    // rebuild the page now so the new tags are live on the next visit
    for (const p of [page.path, ...(page.aliases ?? [])]) revalidatePath(p);
    revalidatePath("/admin/seo");

    return { ok: true, updatedAt: updatedAt?.toISOString() ?? null };
}
