import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/posts";
import { seoIssues } from "@/lib/seo-audit";
import { listAuthors, type Author } from "@/lib/authors";
import { logout } from "@/app/admin/action";
import { AuthorsPanel } from "./AuthorsPanel";

const PAGE = 15;

export default async function AdminDashboard({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; show?: string }>;
}) {
    if (!(await isAdmin())) redirect("/admin/login");

    const { page, show } = await searchParams;
    const all = await getAllPosts();
    const audited = all.map((post) => ({ post, issues: seoIssues(post) }));

    let authors: Author[] = [];
    let authorsError = false;
    try {
        authors = await listAuthors();
    } catch {
        authorsError = true;
    }

    const stats = [
        { label: "Total posts", value: all.length },
        { label: "Need attention", value: audited.filter((a) => a.issues.length).length },
        { label: "No meta description", value: all.filter((p) => !p.seo.metaDescription?.trim()).length },
        { label: "No meta tags", value: all.filter((p) => !p.seo.metaTags?.length).length },
    ];

    const issuesOnly = show === "issues";
    const list = issuesOnly ? audited.filter((a) => a.issues.length) : audited;
    const pages = Math.max(1, Math.ceil(list.length / PAGE));
    const current = Math.min(Math.max(parseInt(page ?? "1", 10) || 1, 1), pages);
    const rows = list.slice((current - 1) * PAGE, current * PAGE);

    const href = (p: number, issues = issuesOnly) =>
        `/admin?${new URLSearchParams({ ...(issues ? { show: "issues" } : {}), page: String(p) })}`;

    const tab = (active: boolean) =>
        `rounded-full border px-4 py-2 text-[14px] ${active ? "border-[#7b55e0] bg-[#5522d6]/40" : "border-white/20 text-white/70 hover:text-white"
        }`;

    return (
        <main className="wrap pb-24 pt-32">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-[36px] font-medium leading-[44px] tracking-tighter">Blog Admin</h1>
                    <p className="mt-1 text-[15px] text-white/60">
                        Read-only for now. Posts are edited in <code>lib/post-data.ts</code>.
                    </p>
                </div>
                <div className="flex gap-3 items-center justify-center">
                    <Link
                        href="/admin/new"
                        className="rounded-xl bg-[#5522d6] px-5 py-2.5 text-[14px] text-white hover:bg-[#6a3be6]"
                    >
                        + Add post
                    </Link>
                    <form action={logout}>
                        <button className="rounded-xl border border-white/20 px-5 py-2.5 text-[14px] hover:bg-white/10">
                            Log out
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 min-[900px]:grid-cols-4">
                {stats.map((s) => (
                    <div key={s.label} className="rounded-[24px] border border-white/15 bg-white/5 p-5">
                        <p className="text-[14px] text-white/60">{s.label}</p>
                        <p className="mt-2 text-[34px] font-medium leading-none">{s.value}</p>
                    </div>
                ))}
            </div>

            <AuthorsPanel authors={authors} loadError={authorsError} />

            <div className="mt-10 flex gap-3">
                <Link href={href(1, false)} className={tab(!issuesOnly)}>All posts</Link>
                <Link href={href(1, true)} className={tab(issuesOnly)}>Needs attention</Link>
            </div>

            <div className="mt-5 overflow-x-auto rounded-[24px] border border-white/15">
                <table className="w-full min-w-[820px] text-left text-[15px]">
                    <thead className="bg-white/5 text-[13px] uppercase tracking-wide text-white/60">
                        <tr>
                            <th className="px-5 py-3 font-medium">Post</th>
                            <th className="px-5 py-3 font-medium">Category</th>
                            <th className="px-5 py-3 font-medium">Date</th>
                            <th className="px-5 py-3 font-medium">SEO</th>
                            <th className="px-5 py-3 font-medium" />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(({ post, issues }) => (
                            <tr key={post.slug} className="border-t border-white/10 align-top">
                                <td className="px-5 py-4">
                                    <p className="font-medium">{post.title}</p>
                                    <p className="mt-1 text-[13px] text-white/50">/blog/{post.slug}</p>
                                </td>
                                <td className="px-5 py-4 text-white/80">{post.category}</td>
                                <td className="whitespace-nowrap px-5 py-4 text-white/80">{post.date}</td>
                                <td className="px-5 py-4">
                                    {issues.length === 0 ? (
                                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[13px] text-emerald-300">
                                            All set
                                        </span>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {issues.map((i) => (
                                                <span key={i} className="rounded-full bg-amber-500/15 px-3 py-1 text-[13px] text-amber-300">
                                                    {i}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        target="_blank"
                                        className="text-[14px] text-[#b79cff] hover:underline"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-10 text-center text-white/60">
                                    Nothing needs attention.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex items-center justify-between text-[14px] text-white/70">
                <span>Page {current} of {pages}</span>
                <div className="flex gap-3">
                    {current > 1 && <Link href={href(current - 1)} className={tab(false)}>Previous</Link>}
                    {current < pages && <Link href={href(current + 1)} className={tab(false)}>Next</Link>}
                </div>
            </div>
        </main>
    );
}