import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

const secret = () => {
    const s = process.env.ADMIN_SECRET;
    if (!s) throw new Error("ADMIN_SECRET is not set");
    return s;
};

const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");
const sha = (v: string) => createHash("sha256").update(v).digest();

export function checkPassword(input: string) {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return false;
    return timingSafeEqual(sha(input), sha(expected));
}

export function createSessionToken() {
    const exp = String(Date.now() + MAX_AGE * 1000);
    return `${exp}.${sign(exp)}`;
}

function verifyToken(token?: string) {
    if (!token) return false;
    const [exp, sig] = token.split(".");
    if (!exp || !sig || Number(exp) < Date.now()) return false;
    const a = Buffer.from(sig);
    const b = Buffer.from(sign(exp));
    return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
    const jar = await cookies();
    return verifyToken(jar.get(COOKIE)?.value);
}

export const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
};