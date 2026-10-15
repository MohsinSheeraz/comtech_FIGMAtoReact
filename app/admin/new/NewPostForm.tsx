"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
    buildPostCode,
    parseContent,
    slugify,
    DEFAULT_SIZES,
    type TextSizes,
} from "@/lib/post-code";

type Result = { ok: true; slug: string } | { ok: false; error: string } | null;
type Device = "desktop" | "tablet" | "mobile";

const MAX_MB = 5;
const TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];

const DEVICES: { id: Device; label: string; w: string }[] = [
    { id: "desktop", label: "Desktop", w: "100%" },
    { id: "tablet", label: "Tablet", w: "768px" },
    { id: "mobile", label: "Mobile", w: "390px" },
];

const INITIAL = {
    title: "",
    slug: "",
    category: "Networking Infrastructure",
    date: "",
    excerpt: "",
    intro: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    metaTags: "",
    ogImage: "",
};

const frameBg =
    "linear-gradient(180deg, transparent 0%, rgba(69, 22, 187, 0.42) 38%, rgba(69, 22, 187, 0.55) 62%, #040404 100%)";

const field =
    "mt-1.5 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[14px] outline-none focus:border-[#7b55e0]";
const label = "block text-[12px] text-white/60";

const counter = (n: number, max: number) => (
    <span className={n > max ? "text-amber-300" : "text-white/50"}>
        {n}/{max}
    </span>
);

/* collapsible sidebar section; children stay mounted so file inputs keep their state */
function Section({
    title,
    badge,
    open,
    onToggle,
    children,
}: {
    title: string;
    badge?: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <section className="border-b border-white/10 last:border-b-0">
            <button
                type="button"
                aria-expanded={open}
                onClick={onToggle}
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/5"
            >
                <span className="text-[13px] font-medium uppercase tracking-wide text-white/80">{title}</span>
                <span className="flex items-center gap-3">
                    {badge && <span className="text-[12px] text-emerald-300">{badge}</span>}
                    <span aria-hidden="true" className={`text-white/50 transition-transform ${open ? "rotate-180" : ""}`}>
                        ▾
                    </span>
                </span>
            </button>
            <div className={open ? "block px-4 pb-4" : "hidden"}>{children}</div>
        </section>
    );
}

export function NewPostForm({ canSave, authorNames }: { canSave: boolean; authorNames: string[] }) {
    const [f, setF] = useState(INITIAL);
    const [authors, setAuthors] = useState<string[]>([""]);
    const [slugTouched, setSlugTouched] = useState(false);
    const [sizes, setSizes] = useState<TextSizes>(DEFAULT_SIZES);
    const [mode, setMode] = useState<"upload" | "url">("upload");
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [imgErr, setImgErr] = useState("");
    const [failed, setFailed] = useState("");
    const [copied, setCopied] = useState(false);
    const [result, setResult] = useState<Result>(null);
    const [device, setDevice] = useState<Device>("desktop");
    const [openSec, setOpenSec] = useState<Record<string, boolean>>({ basics: true, content: true });
    const [pending, start] = useTransition();

    const toggle = (id: string) => setOpenSec((s) => ({ ...s, [id]: !s[id] }));

    // "Ali, Sara": one string, blank rows skipped
    const authorStr = authors.map((a) => a.trim()).filter(Boolean).join(", ");

    // local preview for an uploaded file
    useEffect(() => {
        if (!file) {
            setFileUrl("");
            return;
        }
        const u = URL.createObjectURL(file);
        setFileUrl(u);
        return () => URL.revokeObjectURL(u);
    }, [file]);

    const urlOk = /^https?:\/\//i.test(imgUrl.trim());
    const preview = mode === "upload" ? fileUrl : urlOk ? imgUrl.trim() : "";
    const hasImage = mode === "upload" ? !!file : urlOk;

    const set =
        (k: keyof typeof INITIAL) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const v = e.target.value;
                setF((p) => ({
                    ...p,
                    [k]: v,
                    ...(k === "title" && !slugTouched ? { slug: slugify(v) } : {}),
                }));
            };

    const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const x = e.target.files?.[0] ?? null;
        if (x && !TYPES.includes(x.type)) {
            setImgErr("Use a PNG, JPG, WebP, GIF or AVIF image.");
            setFile(null);
            e.target.value = "";
            return;
        }
        if (x && x.size > MAX_MB * 1024 * 1024) {
            setImgErr(`The image is over ${MAX_MB} MB.`);
            setFile(null);
            e.target.value = "";
            return;
        }
        setImgErr("");
        setFile(x);
    };

    // path the image will have once saved (approximate in URL mode)
    const ext =
        mode === "upload" && file
            ? (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg")
            : (imgUrl.match(/\.(png|jpe?g|webp|gif|avif)(?:$|\?)/i)?.[1] ?? "jpg")
                .toLowerCase()
                .replace("jpeg", "jpg");
    const imagePath = hasImage ? `/images/${f.slug || "post"}.${ext}` : "";

    const missing = [
        !f.title.trim() && "title",
        !f.slug.trim() && "slug",
        !f.excerpt.trim() && "excerpt",
        !f.intro.trim() && "intro",
        !f.content.trim() && "content",
        !hasImage && "cover image",
    ].filter(Boolean) as string[];

    const code = useMemo(
        () => buildPostCode({ ...f, author: authorStr, image: imagePath, sizes }),
        [f, authorStr, imagePath, sizes]
    );

    // what the live preview renders
    const blocks = useMemo(() => parseContent(f.content), [f.content]);
    const toc = blocks.filter((b) => b.t === "h2").map((b) => b.text);
    const frameW = DEVICES.find((d) => d.id === device)!.w;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked */
        }
    };

    const create = () =>
        start(async () => {
            setResult(null);
            const fd = new FormData();
            Object.entries(f).forEach(([k, v]) => fd.append(k, v));
            fd.append("author", authorStr);
            fd.append("sizes", JSON.stringify(sizes));
            if (mode === "upload" && file) fd.append("imageFile", file);
            if (mode === "url") fd.append("imageUrl", imgUrl.trim());
            try {
                const res = await fetch("/api/admin/post", { method: "POST", body: fd });
                const data = await res.json();
                setResult(
                    data.ok
                        ? { ok: true, slug: data.slug }
                        : { ok: false, error: data.error ?? "Something went wrong." }
                );
            } catch {
                setResult({ ok: false, error: "Couldn't reach the server." });
            }
        });

    const reset = () => {
        setF(INITIAL);
        setAuthors([""]);
        setSlugTouched(false);
        setSizes(DEFAULT_SIZES);
        setFile(null);
        setImgUrl("");
        setImgErr("");
        setResult(null);
    };

    const pill = (active: boolean) =>
        `rounded-full px-3 py-1.5 text-[13px] ${active ? "bg-[#5522d6] text-white" : "text-white/70 hover:text-white"}`;
    const tab = (active: boolean) =>
        `rounded-full border px-3 py-1.5 text-[13px] ${active ? "border-[#7b55e0] bg-[#5522d6]/40" : "border-white/20 text-white/70 hover:text-white"}`;

    return (
        <div>
            {/* ---------- TOP BAR ---------- */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-[13px] text-[#b79cff] hover:underline">
                        ← Dashboard
                    </Link>
                    <p className="text-[16px] font-medium">Add post</p>
                </div>

                <div role="group" aria-label="Preview size" className="flex gap-1 rounded-full border border-white/15 p-1">
                    {DEVICES.map((d) => (
                        <button key={d.id} type="button" aria-pressed={device === d.id} onClick={() => setDevice(d.id)} className={pill(device === d.id)}>
                            {d.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={copy}
                        className="rounded-xl border border-white/20 px-4 py-2 text-[13px] hover:bg-white/10"
                    >
                        {copied ? "Copied" : "Copy code"}
                    </button>
                    <button
                        type="button"
                        onClick={create}
                        disabled={!canSave || missing.length > 0 || pending}
                        className="rounded-xl bg-[#5522d6] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#6a3be6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {pending ? "Creating…" : "Create post"}
                    </button>
                </div>
            </div>

            {/* ---------- STATUS LINE ---------- */}
            {result?.ok ? (
                <div role="status" className="mt-3 rounded-xl bg-emerald-500/15 px-4 py-3 text-[14px] text-emerald-200">
                    Post created.{" "}
                    <Link href={`/blog/${result.slug}`} target="_blank" className="underline">View it</Link>
                    {" · "}
                    <button type="button" onClick={reset} className="underline">Add another</button>
                </div>
            ) : result ? (
                <p role="alert" className="mt-3 rounded-xl bg-red-500/15 px-4 py-3 text-[14px] text-red-200">
                    {result.error}
                </p>
            ) : !canSave ? (
                <p className="mt-3 text-[13px] text-white/60">
                    Create post only works when running locally (npm run dev). Use Copy code here.
                </p>
            ) : missing.length > 0 ? (
                <p className="mt-3 text-[13px] text-amber-300">Still needed: {missing.join(", ")}</p>
            ) : null}

            <div className="mt-4 grid items-start gap-4 min-[1100px]:grid-cols-[360px_minmax(0,1fr)]">
                {/* ---------- SIDEBAR ---------- */}
                <aside className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 min-[1100px]:sticky min-[1100px]:top-28 min-[1100px]:max-h-[calc(100vh-8rem)] min-[1100px]:overflow-y-auto">
                    <Section title="Basics" open={!!openSec.basics} onToggle={() => toggle("basics")}>
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="title" className={label}>Title</label>
                                <input id="title" className={field} value={f.title} onChange={set("title")} />
                            </div>
                            <div>
                                <label htmlFor="slug" className={label}>Slug (/blog/…)</label>
                                <input
                                    id="slug"
                                    className={field}
                                    value={f.slug}
                                    onChange={(e) => {
                                        setSlugTouched(true);
                                        setF((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") }));
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className={label}>Category</label>
                                <input id="category" className={field} value={f.category} onChange={set("category")} />
                            </div>
                            <div>
                                <label htmlFor="date" className={label}>Date, DD-MM-YYYY (blank = today)</label>
                                <input id="date" className={field} placeholder="03-10-2026" value={f.date} onChange={set("date")} />
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Authors"
                        badge={authorStr ? `${authors.filter((a) => a.trim()).length} added` : undefined}
                        open={!!openSec.authors}
                        onToggle={() => toggle("authors")}
                    >
                        <datalist id="author-list">
                            {authorNames.map((n) => (
                                <option key={n} value={n} />
                            ))}
                        </datalist>
                        <div className="space-y-2">
                            {authors.map((a, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        aria-label={`Author ${i + 1} name`}
                                        list="author-list"
                                        className={`${field} !mt-0`}
                                        placeholder="Author Name"
                                        value={a}
                                        onChange={(e) =>
                                            setAuthors((p) => p.map((x, j) => (j === i ? e.target.value : x)))
                                        }
                                    />
                                    {authors.length > 1 && (
                                        <button
                                            type="button"
                                            aria-label={`Remove author ${i + 1}`}
                                            onClick={() => setAuthors((p) => p.filter((_, j) => j !== i))}
                                            className="h-9 w-9 shrink-0 rounded-lg border border-white/15 text-white/70 hover:bg-white/10"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setAuthors((p) => [...p, ""])}
                            className="mt-3 text-[13px] text-[#b79cff] hover:underline"
                        >
                            + Add author
                        </button>
                    </Section>

                    <Section
                        title="Cover image"
                        badge={hasImage ? "✓ added" : undefined}
                        open={!!openSec.cover}
                        onToggle={() => toggle("cover")}
                    >
                        <div className="flex gap-2">
                            <button type="button" aria-pressed={mode === "upload"} onClick={() => setMode("upload")} className={tab(mode === "upload")}>
                                Upload
                            </button>
                            <button type="button" aria-pressed={mode === "url"} onClick={() => setMode("url")} className={tab(mode === "url")}>
                                From URL
                            </button>
                        </div>

                        {mode === "upload" ? (
                            <div className="mt-3">
                                <label htmlFor="img-file" className={label}>Choose an image (max {MAX_MB} MB)</label>
                                <input
                                    id="img-file"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                                    onChange={pick}
                                    className="mt-1.5 block w-full text-[13px] text-white/70 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#5522d6] file:px-3 file:py-2 file:text-white"
                                />
                            </div>
                        ) : (
                            <div className="mt-3">
                                <label htmlFor="img-url" className={label}>Image URL</label>
                                <input
                                    id="img-url"
                                    className={field}
                                    placeholder="https://example.com/photo.jpg"
                                    value={imgUrl}
                                    onChange={(e) => setImgUrl(e.target.value)}
                                />
                            </div>
                        )}
                        {imgErr && <p role="alert" className="mt-2 text-[12px] text-red-300">{imgErr}</p>}
                        <p className="mt-2 text-[12px] text-white/50">The cover shows in the live preview.</p>
                    </Section>

                    <Section title="Intro & excerpt" open={!!openSec.intro} onToggle={() => toggle("intro")}>
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="excerpt" className={label}>Excerpt (shown on the blog cards)</label>
                                <textarea id="excerpt" rows={3} className={field} value={f.excerpt} onChange={set("excerpt")} />
                            </div>
                            <div>
                                <label htmlFor="intro" className={label}>Intro paragraph</label>
                                <textarea id="intro" rows={5} className={field} value={f.intro} onChange={set("intro")} />
                            </div>
                        </div>
                    </Section>

                    <Section title="Content" open={!!openSec.content} onToggle={() => toggle("content")}>
                        <p className="text-[12px] leading-[18px] text-white/55">
                            <code>#</code> = H1, <code>##</code> = H2, <code>###</code> = H3. Anything else is
                            paragraph text; leave a blank line between paragraphs.
                        </p>
                        <textarea
                            id="content"
                            aria-label="Content"
                            rows={14}
                            className={`${field} font-mono text-[13px]`}
                            placeholder={"## My heading\n\nFirst paragraph…"}
                            value={f.content}
                            onChange={set("content")}
                        />

                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-[12px] text-white/60">Text sizes (px)</p>
                            <button type="button" onClick={() => setSizes(DEFAULT_SIZES)} className="text-[12px] text-[#b79cff] hover:underline">
                                Reset
                            </button>
                        </div>
                        <div className="mt-2 grid grid-cols-4 gap-2">
                            {(["h1", "h2", "h3", "p"] as const).map((k) => (
                                <div key={k}>
                                    <label htmlFor={`size-${k}`} className={label}>{k === "p" ? "Text" : k.toUpperCase()}</label>
                                    <input
                                        id={`size-${k}`}
                                        type="number"
                                        min={10}
                                        max={120}
                                        className={field}
                                        value={sizes[k]}
                                        onChange={(e) => setSizes((s) => ({ ...s, [k]: Number(e.target.value) || 0 }))}
                                    />
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="SEO" open={!!openSec.seo} onToggle={() => toggle("seo")}>
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="mt" className={`${label} flex justify-between`}>
                                    <span>Meta title</span>{counter(f.metaTitle.length, 60)}
                                </label>
                                <input id="mt" className={field} value={f.metaTitle} onChange={set("metaTitle")} />
                            </div>
                            <div>
                                <label htmlFor="md" className={`${label} flex justify-between`}>
                                    <span>Meta description</span>{counter(f.metaDescription.length, 160)}
                                </label>
                                <textarea id="md" rows={3} className={field} value={f.metaDescription} onChange={set("metaDescription")} />
                            </div>
                            <div>
                                <label htmlFor="tags" className={label}>Meta tags (comma separated)</label>
                                <input id="tags" className={field} value={f.metaTags} onChange={set("metaTags")} />
                            </div>
                            <div>
                                <label htmlFor="og" className={label}>Social share image (blank = cover)</label>
                                <input id="og" className={field} value={f.ogImage} onChange={set("ogImage")} />
                            </div>
                        </div>
                    </Section>
                </aside>

                {/* ---------- LIVE PREVIEW ---------- */}
                <div className="min-w-0 rounded-2xl border border-white/15 bg-[#040404] p-4">
                    <p className="mb-3 text-[12px] uppercase tracking-wide text-white/50">Live preview</p>
                    <div className="mx-auto overflow-hidden transition-[max-width] duration-200" style={{ maxWidth: frameW }}>
                        <div className="gborder-new relative aspect-[1400/390] overflow-hidden rounded-[40px] bg-black/40">
                            {preview && failed !== preview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    key={preview}
                                    src={preview}
                                    alt=""
                                    onError={() => setFailed(preview)}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <div className="grid size-full place-items-center px-4 text-center text-[14px] text-white/40">
                                    {preview ? "Couldn't load this image" : "Cover image"}
                                </div>
                            )}
                        </div>

                        <span className="mt-6 inline-flex h-[44px] items-center rounded-full border border-white/20 px-6 text-[16px] tracking-normal">
                            {f.category || "Category"}
                        </span>

                        <div className="mt-6 rounded-[40px] p-4 sm:p-6" style={{ background: frameBg }}>
                            <article className="leadership-border rounded-[30px] p-6 sm:p-10">
                                <h1 className="text-[34px] font-medium leading-[44px] tracking-tighter sm:text-[46px] sm:leading-[56px]">
                                    {f.title || <span className="text-white/30">Post title</span>}
                                </h1>
                                <p className="mt-8 text-[18px] leading-[31px] tracking-tighter">
                                    {f.intro || <span className="text-white/30">Intro paragraph…</span>}
                                </p>

                                <h2 className="mt-8 text-[34px] font-medium leading-[44px] tracking-tighter">Table of Contents</h2>
                                <ul className="mt-4 list-disc space-y-1 pl-6 text-[17px] leading-[30px] tracking-tighter">
                                    {toc.map((t, i) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                </ul>

                                {blocks.length === 0 && (
                                    <p className="mt-8 text-[16px] text-white/30">Your content will appear here…</p>
                                )}
                                {blocks.map((b, i) => {
                                    if (b.t === "p")
                                        return (
                                            <p key={i} className="mt-4 tracking-tighter" style={{ fontSize: sizes.p, lineHeight: 1.7 }}>
                                                {b.text}
                                            </p>
                                        );
                                    const Tag = b.t;
                                    return (
                                        <Tag key={i} className="mt-8 font-medium tracking-tighter" style={{ fontSize: sizes[b.t], lineHeight: 1.3 }}>
                                            {b.text}
                                        </Tag>
                                    );
                                })}
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}