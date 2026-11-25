import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getDb } from "@/lib/mongodb";
import { SEO_COLLECTION, type SeoOverride } from "@/lib/page-seo";
import { seoPages } from "@/lib/seo-pages";
import { SeoManager, type SeoRow } from "./SeoManager";

export default async function AdminSeo() {
    if (!(await isAdmin())) redirect("/admin/login");

    // read fresh (not the per-render cache) and report a database problem instead of hiding it
    let overrides = new Map<string, SeoOverride>();
    let loadError = false;
    try {
        const docs = await (await getDb())
            .collection<SeoOverride>(SEO_COLLECTION)
            .find({}, { projection: { _id: 0 } })
            .toArray();
        overrides = new Map(docs.map((d) => [d.path, d]));
    } catch {
        loadError = true;
    }

    const rows: SeoRow[] = seoPages.map((p) => {
        const o = overrides.get(p.path);
        return {
            path: p.path,
            label: p.label,
            defaultTitle: p.title,
            defaultDescription: p.description,
            title: o?.title || p.title,
            description: o?.description || p.description,
            updatedAt: o?.updatedAt ? new Date(o.updatedAt).toISOString() : null,
        };
    });

    return (
        <main className="wrap pb-24 pt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-[36px] font-medium leading-[44px] tracking-tighter">Page SEO</h1>
                    <p className="mt-1 text-[15px] text-white/60">
                        Meta title and description for every page. Changes go live as soon as you save.
                    </p>
                </div>
                <Link
                    href="/admin"
                    className="rounded-xl border border-white/20 px-5 py-2.5 text-[14px] hover:bg-white/10"
                >
                    ← Back to posts
                </Link>
            </div>

            {loadError && (
                <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-[14px] text-amber-300">
                    Couldn&apos;t load saved SEO from the database. Showing defaults; saving won&apos;t work until
                    MONGODB_URI is set.
                </p>
            )}

            <p className="mt-6 text-[14px] text-white/50">
                Blog posts are not listed here: edit their SEO inside each post.
            </p>

            <SeoManager rows={rows} />
        </main>
    );
}
