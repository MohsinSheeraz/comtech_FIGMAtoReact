import Link from "next/link";
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
    <main className="wrap flex min-h-[80vh] flex-col items-center justify-center gap-6 pt-0">
      <form
        action={login}
        className="w-full max-w-[420px] rounded-[30px] border border-white/15 bg-white/5 p-8"
      >
        <h1 className="text-[32px] font-medium leading-[40px] tracking-tighter">
          Admin Login
        </h1>
        <label
          htmlFor="password"
          className="mt-8 block text-[15px] text-white/70"
        >
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

      <Link
        href="/"
        className="group w-full max-w-[420px] rounded-[30px] border-2 border-[#7b55e0] bg-[#5522d6] px-6 py-8 text-center shadow-[0_0_40px_rgba(85,34,214,0.45)] transition hover:scale-[1.02] hover:bg-[#6a3be6] active:scale-[0.98]"
      >
        <span className="block text-[56px] font-black uppercase leading-none tracking-tight text-white">
          BACK!
        </span>
        <span className="mt-2 block text-[14px] uppercase tracking-[0.2em] text-white/70">
          Back to website
        </span>
        <span className="mt-4 block -rotate-2 font-serif text-[22px] italic text-white/60 group-hover:text-white/90">
          ~ Signed, The Admin
        </span>
      </Link>
    </main>
  );
}
