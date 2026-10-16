import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { listAuthors } from "@/lib/authors";
import { getPost, isDynamicPost } from "@/lib/posts";
import { DEFAULT_SIZES, type Block } from "@/lib/post-code";
import { PostEditor, type Initial } from "@/app/admin/PostEditor";

export default async function EditPost({ params }: { params: Promise<{ slug: string }> }) {
    if (!(await isAdmin())) redirect("/admin/login");

    const { slug } = await params;
    const post = await getPost(slug);
    if (!post || !isDynamicPost(post)) notFound();

    let authorNames: string[] = [];
    try {
        authorNames = (await listAuthors()).map((a) => a.name);
    } catch { }

    // intro first, then the body (older posts stored "sections", so convert those too)
    const blocks: Block[] = [];
    if (post.intro.trim()) blocks.push({ t: "p", text: post.intro });
    if (post.content?.length) blocks.push(...post.content);
    else
        for (const s of post.sections) {
            blocks.push({ t: "h2", text: s.h });
            for (const p of s.p) blocks.push({ t: "p", text: p });
        }

    // "DD-MM-YYYY" -> "YYYY-MM-DD" for the calendar input
    const date = /^\d{2}-\d{2}-\d{4}$/.test(post.date) ? post.date.split("-").reverse().join("-") : "";

    const initial: Initial = {
        slug: post.slug,
        title: post.title,
        category: post.category,
        authors: (post.author ?? "").split(",").map((a) => a.trim()).filter(Boolean),
        date,
        excerpt: post.excerpt,
        blocks,
        sizes: post.sizes ?? DEFAULT_SIZES,
        // posts without a saved toc keep showing their old auto-built list, now as editable entries
        toc: post.toc ?? (post.content
            ? post.content.filter((b) => b.t === "h2").map((b) => b.text)
            : post.sections.map((s) => s.h)),
        metaTitle: post.seo.metaTitle ?? "",
        metaDescription: post.seo.metaDescription ?? "",
        metaTags: (post.seo.metaTags ?? []).join(", "),
        ogImage: post.seo.ogImage ?? "",
        image: post.image,
    };

    return (
        <main className="mx-auto w-[96%] max-w-[1800px] pb-24 pt-28">
            <PostEditor canSave authorNames={authorNames} initial={initial} />
        </main>
    );
}