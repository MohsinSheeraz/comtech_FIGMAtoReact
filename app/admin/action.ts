"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, COOKIE, cookieOptions, createSessionToken } from "@/lib/admin-auth";

export async function login(formData: FormData) {
    const pw = String(formData.get("password") ?? "");
    if (!checkPassword(pw)) redirect("/admin/login?error=1");
    const jar = await cookies();
    jar.set(COOKIE, createSessionToken(), cookieOptions);
    redirect("/admin");
}

export async function logout() {
    const jar = await cookies();
    jar.delete(COOKIE);
    redirect("/admin/login");
}