import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getDynamicPosts } from "@/lib/posts";
import { seoIssues } from "@/lib/seo-audit";
import { listAuthors, type Author } from "@/lib/authors";
import { logout } from "@/app/admin/action";
import { AuthorsPanel } from "./AuthorsPanel";

export default async function AdminDashboard() {
    if (!(await isAdmin())) redirect("/admin/login");

    const posts = await getDynamicPosts();

    let authors: Author[] = [];
    let authorsError = false;
    try {
        authors = await listAuthors();
    } catch {
        authorsError = true;
    }

    return (
        <main className="wrap pb-24 pt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-[36px] font-medium leading-[44px] tracking-tighter">Blog Admin</h1>
                    <p className="mt-1 text-[15px] text-white/60">Posts created from the admin.</p>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <Link
                        href="/admin/new"
                        className="rounded-xl bg-[#5522d6] px-5 py-2.5 text-[14px] text-white hover:bg-[#6a3be6]"
                    >
                        + Add post
                    </Link>
                    <form action={logout}>
                        <button className="cursor-pointer rounded-xl border border-white/20 px-5 py-2.5 text-[14px] hover:bg-white/10">
                            Log out
                        </button>
                    </form>
                </div>
            </div>

            <AuthorsPanel authors={authors} loadError={authorsError} />

            <div className="mt-8 overflow-x-auto rounded-[24px] border border-white/15">
                <table className="w-full min-w-[760px] text-left text-[15px]">
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
                        {posts.map((post) => {
                            const issues = seoIssues(post);
                            return (
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
                                    <td className="whitespace-nowrap px-5 py-4 text-right">
                                        <Link href={`/admin/edit/${post.slug}`} className="text-[14px] text-[#b79cff] hover:underline">
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            target="_blank"
                                            className="ml-5 text-[14px] text-white/70 hover:underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-10 text-center text-white/60">
                                    No posts yet. Click + Add post to create the first one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}