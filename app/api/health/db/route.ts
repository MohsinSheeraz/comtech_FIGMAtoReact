import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
    if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
    try {
        await (await getDb()).command({ ping: 1 });
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json(
            { ok: false, error: e instanceof Error ? e.message : "Connection failed" },
            { status: 500 }
        );
    }
}