"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Author } from "@/lib/authors";

const TYPES = ["image/png", "image/jpeg", "image/webp"];

// crop to a centered 256x256 square and return it as a small JPEG data URL
async function toAvatar(file: File): Promise<string> {
    const bmp = await createImageBitmap(file);
    const s = 256;
    const c = document.createElement("canvas");
    c.width = s;
    c.height = s;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, s, s);
    const r = Math.max(s / bmp.width, s / bmp.height);
    const w = bmp.width * r;
    const h = bmp.height * r;
    ctx.drawImage(bmp, (s - w) / 2, (s - h) / 2, w, h);
    return c.toDataURL("image/jpeg", 0.85);
}

export function AuthorsPanel({ authors, loadError }: { authors: Author[]; loadError: boolean }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [pfp, setPfp] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return setPfp("");
        if (!TYPES.includes(file.type)) {
            setError("Use a PNG, JPG or WebP image.");
            e.target.value = "";
            return setPfp("");
        }
        try {
            setError("");
            setPfp(await toAvatar(file));
        } catch {
            setError("Couldn't read that image.");
            setPfp("");
        }
    };

    const close = () => {
        setOpen(false);
        setName("");
        setPfp("");
        setError("");
    };

    const save = async () => {
        setPending(true);
        setError("");
        try {
            const res = await fetch("/api/admin/author", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, pfp }),
            });
            const data = await res.json();
            if (!data.ok) {
                setError(data.error ?? "Something went wrong.");
            } else {
                close();
                router.refresh();
            }
        } catch {
            setError("Couldn't reach the server.");
        } finally {
            setPending(false);
        }
    };

    return (
        <section className="mt-8 rounded-[24px] border border-white/15 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-[20px] font-medium tracking-tighter">Authors</h2>
                    <p className="mt-1 text-[14px] text-white/60">
                        Saved authors show up as suggestions when you write a post.
                    </p>
                </div>
                {!open && (
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="cursor-pointer rounded-xl bg-[#5522d6] px-5 py-2.5 text-[14px] text-white hover:bg-[#6a3be6]"
                    >
                        + Add author
                    </button>
                )}
            </div>

            {open && (
                <div className="mt-5 flex flex-wrap items-end gap-4 border-t border-white/10 pt-5">
                    <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border border-dashed border-white/25 bg-black/40 text-[11px] text-white/50">
                        {pfp ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={pfp} alt="Profile preview" className="size-full object-cover" />
                        ) : (
                            "Photo"
                        )}
                    </div>
                    <div className="min-w-[220px] flex-1">
                        <label htmlFor="author-name" className="block text-[14px] text-white/70">Author name</label>
                        <input
                            id="author-name"
                            value={name}
                            maxLength={80}
                            placeholder="Author Name"
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-[16px] outline-none focus:border-[#7b55e0]"
                        />
                    </div>
                    <div>
                        <label htmlFor="author-pfp" className="block text-[14px] text-white/70">Profile picture (optional)</label>
                        <input
                            id="author-pfp"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={pick}
                            className="mt-2 block text-[14px] text-white/70 file:mr-3 file:cursor-pointer file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2.5 file:text-white"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={save}
                            disabled={!name.trim() || pending}
                            className="rounded-xl bg-[#5522d6] px-5 py-3 text-[14px] text-white hover:bg-[#6a3be6] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {pending ? "Saving…" : "Save author"}
                        </button>
                        <button
                            type="button"
                            onClick={close}
                            className="rounded-xl border border-white/20 px-5 py-3 text-[14px] hover:bg-white/10"
                        >
                            Cancel
                        </button>
                    </div>
                    {error && <p role="alert" className="w-full text-[13px] text-red-300">{error}</p>}
                </div>
            )}

            {loadError && (
                <p role="alert" className="mt-4 text-[13px] text-amber-300">
                    Couldn&apos;t load authors from the database. Check MONGODB_URI.
                </p>
            )}

            {!loadError && authors.length === 0 && !open && (
                <p className="mt-4 text-[14px] text-white/50">No authors yet.</p>
            )}

            {authors.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-3">
                    {authors.map((a) => (
                        <li key={a.id} className="flex items-center gap-3 rounded-full border border-white/15 bg-black/30 py-1.5 pl-1.5 pr-4">
                            {a.pfp ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={a.pfp} alt="" className="size-9 rounded-full object-cover" />
                            ) : (
                                <span className="grid size-9 place-items-center rounded-full bg-[#5522d6]/50 text-[14px] font-medium">
                                    {a.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                            <span className="text-[14px]">{a.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}