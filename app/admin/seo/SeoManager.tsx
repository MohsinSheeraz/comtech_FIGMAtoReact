"use client";

import { useMemo, useState, useTransition } from "react";
import { saveSeo } from "./actions";

export type SeoRow = {
    path: string;
    label: string;
    defaultTitle: string;
    defaultDescription: string;
    title: string;
    description: string;
    updatedAt: string | null;
};

const field =
    "mt-1.5 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[14px] outline-none focus:border-[#7b55e0]";

// common search-result limits: titles get cut around 60 characters, descriptions around 160
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

function Count({ n, limit }: { n: number; limit: number }) {
    const color = n === 0 ? "text-white/40" : n > limit ? "text-amber-300" : "text-emerald-300";
    return (
        <span className={`text-[12px] ${color}`}>
            {n}/{limit}
        </span>
    );
}

function SeoCard({ row }: { row: SeoRow }) {
    const [saved, setSaved] = useState({ title: row.title, description: row.description, updatedAt: row.updatedAt });
    const [title, setTitle] = useState(row.title);
    const [description, setDescription] = useState(row.description);
    const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
    const [pending, start] = useTransition();

    const dirty = title !== saved.title || description !== saved.description;
    const custom = saved.title !== row.defaultTitle || saved.description !== row.defaultDescription;

    const submit = (t: string, d: string) =>
        start(async () => {
            setMessage(null);
            const res = await saveSeo(row.path, t, d);
            if (!res.ok) return setMessage({ ok: false, text: res.error });
            const next = { title: t.trim() || row.defaultTitle, description: d.trim() || row.defaultDescription };
            setTitle(next.title);
            setDescription(next.description);
            setSaved({ ...next, updatedAt: res.updatedAt });
            setMessage({ ok: true, text: "Saved. Live on the next page visit." });
        });

    return (
        <li className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                    <p className="font-medium">{row.label}</p>
                    <a
                        href={row.path}
                        target="_blank"
                        className="text-[13px] text-white/50 hover:text-white/80 hover:underline"
                    >
                        {row.path}
                    </a>
                    {custom ? (
                        <span className="rounded-full bg-[#5522d6]/25 px-3 py-0.5 text-[12px] text-[#c9b6ff]">Custom</span>
                    ) : (
                        <span className="rounded-full bg-white/10 px-3 py-0.5 text-[12px] text-white/60">Default</span>
                    )}
                </div>
                {saved.updatedAt && (
                    <span className="text-[12px] text-white/40">
                        Updated {new Date(saved.updatedAt).toLocaleString()}
                    </span>
                )}
            </div>

            <div className="mt-4 grid gap-4">
                <label className="block text-[12px] text-white/60">
                    <span className="flex items-center justify-between">
                        Meta title <Count n={title.trim().length} limit={TITLE_LIMIT} />
                    </span>
                    <input
                        className={field}
                        value={title}
                        maxLength={200}
                        placeholder={row.defaultTitle}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label className="block text-[12px] text-white/60">
                    <span className="flex items-center justify-between">
                        Meta description <Count n={description.trim().length} limit={DESCRIPTION_LIMIT} />
                    </span>
                    <textarea
                        className={`${field} min-h-[78px] resize-y`}
                        value={description}
                        maxLength={500}
                        placeholder={row.defaultDescription || "No description: search engines will pick text from the page."}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    disabled={!dirty || pending}
                    onClick={() => submit(title, description)}
                    className="cursor-pointer rounded-xl bg-[#5522d6] px-5 py-2 text-[14px] text-white hover:bg-[#6a3be6] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {pending ? "Saving…" : "Save"}
                </button>
                {dirty && !pending && (
                    <button
                        type="button"
                        onClick={() => {
                            setTitle(saved.title);
                            setDescription(saved.description);
                            setMessage(null);
                        }}
                        className="cursor-pointer rounded-xl border border-white/20 px-4 py-2 text-[14px] hover:bg-white/10"
                    >
                        Undo changes
                    </button>
                )}
                {custom && !dirty && !pending && (
                    <button
                        type="button"
                        onClick={() => submit(row.defaultTitle, row.defaultDescription)}
                        className="cursor-pointer rounded-xl border border-white/20 px-4 py-2 text-[14px] hover:bg-white/10"
                    >
                        Reset to default
                    </button>
                )}
                {message && (
                    <span className={`text-[13px] ${message.ok ? "text-emerald-300" : "text-red-400"}`}>{message.text}</span>
                )}
            </div>
        </li>
    );
}

export function SeoManager({ rows }: { rows: SeoRow[] }) {
    const [q, setQ] = useState("");
    const shown = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return rows;
        return rows.filter((r) =>
            [r.label, r.path, r.title, r.description].some((v) => v.toLowerCase().includes(s))
        );
    }, [q, rows]);

    return (
        <>
            <input
                className={`${field} mt-4 max-w-md`}
                placeholder={`Search ${rows.length} pages…`}
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <ul className="mt-6 grid gap-4">
                {shown.map((row) => (
                    <SeoCard key={row.path} row={row} />
                ))}
                {shown.length === 0 && <li className="py-10 text-center text-white/60">No pages match.</li>}
            </ul>
        </>
    );
}
