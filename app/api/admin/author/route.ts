import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { addAuthor } from "@/lib/authors";

export const runtime = "nodejs";

const fail = (error: string, status = 400) =>
    NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
    if (!(await isAdmin())) return fail("You're not logged in.", 401);

    let body: { name?: unknown; pfp?: unknown };
    try {
        body = await req.json();
    } catch {
        return fail("Bad request.");
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const pfp = typeof body.pfp === "string" ? body.pfp : "";

    if (!name || name.length > 80) return fail("Enter an author name (up to 80 characters).");
    if (pfp && (!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(pfp) || pfp.length > 300_000))
        return fail("The profile picture is invalid or too large.");

    try {
        const author = await addAuthor(name, pfp || undefined);
        if (!author) return fail("An author with this name already exists.", 409);
        return NextResponse.json({ ok: true, author });
    } catch {
        return fail("Couldn't save to the database.", 500);
    }
}