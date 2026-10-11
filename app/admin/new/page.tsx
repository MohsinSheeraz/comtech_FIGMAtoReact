import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { NewPostForm } from "./NewPostForm";

export default async function NewPost() {
    if (!(await isAdmin())) redirect("/admin/login");

    return (
        <main className="wrap pb-24 pt-32">
            <Link href="/admin" className="text-[14px] text-[#b79cff] hover:underline">
                ← Back to dashboard
            </Link>
            <h1 className="mt-3 text-[36px] font-medium leading-[44px] tracking-tighter">Add post</h1>
            <p className="mt-1 text-[15px] text-white/60">
                Create post saves directly while you run the site locally. On the live site, use Copy code.
            </p>
            <NewPostForm canSave={process.env.NODE_ENV !== "production"} />
        </main>
    );
}