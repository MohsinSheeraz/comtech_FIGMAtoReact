import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { listAuthors } from "@/lib/authors";
import { PostEditor } from "@/app/admin/PostEditor";

export default async function NewPost() {
    if (!(await isAdmin())) redirect("/admin/login");

    // saved authors are only suggestions here, so a database error must not break the editor
    let authorNames: string[] = [];
    try {
        authorNames = (await listAuthors()).map((a) => a.name);
    } catch { }

    return (
        <main className="mx-auto w-[96%] max-w-[1800px] pb-24 pt-28">
            <PostEditor canSave authorNames={authorNames} />
        </main>
    );
}