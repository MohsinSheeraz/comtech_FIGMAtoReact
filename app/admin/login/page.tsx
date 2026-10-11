import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { login } from "@/app/admin/action";

export default async function AdminLogin({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    if (await isAdmin()) redirect("/admin");
    const { error } = await searchParams;

    return (
        <main className="wrap flex min-h-[80vh] items-center justify-center pt-24">
            <form
                action={login}
                className="w-full max-w-[420px] rounded-[30px] border border-white/15 bg-white/5 p-8"
            >
                <h1 className="text-[32px] font-medium leading-[40px] tracking-tighter">Admin Login</h1>
                <label htmlFor="password" className="mt-8 block text-[15px] text-white/70">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoFocus
                    autoComplete="current-password"
                    className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/40 px-4 text-[16px] outline-none focus:border-[#7b55e0]"
                />
                {error && (
                    <p role="alert" className="mt-3 text-[14px] text-red-400">
                        That password isn&apos;t right. Try again.
                    </p>
                )}
                <button
                    type="submit"
                    className="mt-6 h-12 w-full rounded-xl bg-[#5522d6] text-[16px] font-medium text-white transition-colors hover:bg-[#6a3be6]"
                >
                    Log in
                </button>
            </form>
        </main>
    );
}