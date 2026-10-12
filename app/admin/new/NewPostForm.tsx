"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { buildPostCode, slugify, DEFAULT_SIZES, type TextSizes } from "@/lib/post-code";

type Result = { ok: true; slug: string } | { ok: false; error: string } | null;

const MAX_MB = 5;
const TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];

const INITIAL = {
    title: "",
    slug: "",
    category: "Networking Infrastructure",
    author: "",
    date: "",
    excerpt: "",
    intro: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    metaTags: "",
    ogImage: "",
};

const input =
    "mt-2 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-[16px] outline-none focus:border-[#7b55e0]";
const label = "block text-[14px] text-white/70";

const counter = (n: number, max: number) => (
    <span className={n > max ? "text-amber-300" : "text-white/50"}>
        {n}/{max}
    </span>
);

export function NewPostForm({ canSave }: { canSave: boolean }) {
    const [f, setF] = useState(INITIAL);
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
    const [pending, start] = useTransition();

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
        () => buildPostCode({ ...f, image: imagePath, sizes }),
        [f, imagePath, sizes]
    );

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked: select the text manually */
        }
    };

    const create = () =>
        start(async () => {
            setResult(null);
            const fd = new FormData();
            Object.entries(f).forEach(([k, v]) => fd.append(k, v));
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
        setSlugTouched(false);
        setSizes(DEFAULT_SIZES);
        setFile(null);
        setImgUrl("");
        setImgErr("");
        setResult(null);
    };

    const tab = (active: boolean) =>
        `rounded-full border px-4 py-2 text-[14px] ${active ? "border-[#7b55e0] bg-[#5522d6]/40" : "border-white/20 text-white/70 hover:text-white"
        }`;

    return (
        <div className="mt-8 grid items-start gap-8 min-[1100px]:grid-cols-2">
            {/* ---------- FORM ---------- */}
            <div className="space-y-5 rounded-[24px] border border-white/15 bg-white/5 p-6">
                <div>
                    <label htmlFor="title" className={label}>Title</label>
                    <input id="title" className={input} value={f.title} onChange={set("title")} />
                </div>
                <div>
                    <label htmlFor="slug" className={label}>Slug (the URL: /blog/…)</label>
                    <input
                        id="slug"
                        className={input}
                        value={f.slug}
                        onChange={(e) => {
                            setSlugTouched(true);
                            setF((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") }));
                        }}
                    />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="category" className={label}>Category</label>
                        <input id="category" className={input} value={f.category} onChange={set("category")} />
                    </div>
                    <div>
                        <label htmlFor="author" className={label}>Author (optional)</label>
                        <input id="author" className={input} value={f.author} onChange={set("author")} />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="date" className={label}>Date, DD-MM-YYYY (leave blank for today)</label>
                        <input id="date" className={input} placeholder="03-10-2026" value={f.date} onChange={set("date")} />
                    </div>
                </div>

                {/* ----- cover image ----- */}
                <div className="border-t border-white/10 pt-5">
                    <p className="text-[16px] font-medium">Cover image</p>
                    <div className="mt-3 flex gap-3">
                        <button type="button" aria-pressed={mode === "upload"} onClick={() => setMode("upload")} className={tab(mode === "upload")}>
                            Upload from computer
                        </button>
                        <button type="button" aria-pressed={mode === "url"} onClick={() => setMode("url")} className={tab(mode === "url")}>
                            From URL
                        </button>
                    </div>

                    {mode === "upload" ? (
                        <div className="mt-4">
                            <label htmlFor="img-file" className={label}>Choose an image (max {MAX_MB} MB)</label>
                            <input
                                id="img-file"
                                type="file"
                                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                                onChange={pick}
                                className="mt-2 block w-full text-[14px] text-white/70 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-[#5522d6] file:px-4 file:py-2.5 file:text-white"
                            />
                        </div>
                    ) : (
                        <div className="mt-4">
                            <label htmlFor="img-url" className={label}>Image URL</label>
                            <input
                                id="img-url"
                                className={input}
                                placeholder="https://example.com/photo.jpg"
                                value={imgUrl}
                                onChange={(e) => setImgUrl(e.target.value)}
                            />
                        </div>
                    )}
                    {imgErr && <p role="alert" className="mt-2 text-[13px] text-red-300">{imgErr}</p>}

                    <div className="relative mt-4 aspect-[597/346] w-full max-w-[320px] overflow-hidden rounded-2xl border border-dashed border-white/25 bg-black/40">
                        {preview && failed !== preview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={preview}
                                src={preview}
                                alt="Cover preview"
                                onError={() => setFailed(preview)}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="grid h-full place-items-center px-4 text-center text-[13px] text-white/50">
                                {preview ? "Couldn't load this image" : "Image preview"}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="excerpt" className={label}>Excerpt (shown on the blog cards)</label>
                    <textarea id="excerpt" rows={3} className={input} value={f.excerpt} onChange={set("excerpt")} />
                </div>
                <div>
                    <label htmlFor="intro" className={label}>Intro paragraph</label>
                    <textarea id="intro" rows={5} className={input} value={f.intro} onChange={set("intro")} />
                </div>

                {/* ----- content (single editor) ----- */}
                <div className="border-t border-white/10 pt-5">
                    <p className="text-[16px] font-medium">Content</p>
                    <p className="mt-1 text-[13px] text-white/60">
                        Start a line with <code>#</code> for H1, <code>##</code> for H2, <code>###</code> for H3.
                        Anything else is paragraph text; leave a blank line between paragraphs.
                    </p>
                    <textarea
                        id="content"
                        rows={20}
                        className={`${input} font-mono`}
                        placeholder={"## My heading\n\nFirst paragraph…"}
                        value={f.content}
                        onChange={set("content")}
                    />

                    <div className="mt-5 flex items-center justify-between">
                        <p className="text-[14px] text-white/70">Text sizes (px)</p>
                        <button type="button" onClick={() => setSizes(DEFAULT_SIZES)} className="text-[13px] text-[#b79cff] hover:underline">
                            Reset to default
                        </button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {(["h1", "h2", "h3", "p"] as const).map((k) => (
                            <div key={k}>
                                <label htmlFor={`size-${k}`} className={label}>{k === "p" ? "Text" : k.toUpperCase()}</label>
                                <input
                                    id={`size-${k}`}
                                    type="number"
                                    min={10}
                                    max={120}
                                    className={input}
                                    value={sizes[k]}
                                    onChange={(e) => setSizes((s) => ({ ...s, [k]: Number(e.target.value) || 0 }))}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                    <p className="text-[16px] font-medium">SEO</p>
                    <div className="mt-4">
                        <label htmlFor="mt" className={`${label} flex justify-between`}>
                            <span>Meta title</span>{counter(f.metaTitle.length, 60)}
                        </label>
                        <input id="mt" className={input} value={f.metaTitle} onChange={set("metaTitle")} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="md" className={`${label} flex justify-between`}>
                            <span>Meta description</span>{counter(f.metaDescription.length, 160)}
                        </label>
                        <textarea id="md" rows={3} className={input} value={f.metaDescription} onChange={set("metaDescription")} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="tags" className={label}>Meta tags (comma separated)</label>
                        <input id="tags" className={input} value={f.metaTags} onChange={set("metaTags")} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="og" className={label}>Social share image (optional, defaults to the cover)</label>
                        <input id="og" className={input} value={f.ogImage} onChange={set("ogImage")} />
                    </div>
                </div>

                {/* ----- create ----- */}
                <div className="border-t border-white/10 pt-5">
                    {result?.ok && (
                        <div role="status" className="mb-4 rounded-xl bg-emerald-500/15 p-4 text-[14px] text-emerald-200">
                            Post created.{" "}
                            <Link href={`/blog/${result.slug}`} target="_blank" className="underline">View it</Link>
                            {" · "}
                            <button type="button" onClick={reset} className="underline">Add another</button>
                        </div>
                    )}
                    {result && !result.ok && (
                        <p role="alert" className="mb-4 rounded-xl bg-red-500/15 p-4 text-[14px] text-red-200">
                            {result.error}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={create}
                        disabled={!canSave || missing.length > 0 || pending}
                        className="h-12 w-full rounded-xl bg-[#5522d6] text-[16px] font-medium text-white transition-colors hover:bg-[#6a3be6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {pending ? "Creating…" : "Create post"}
                    </button>
                    {!canSave && (
                        <p className="mt-2 text-[13px] text-white/60">
                            Create post only works when running locally (npm run dev). Use Copy code here.
                        </p>
                    )}
                    {canSave && missing.length > 0 && (
                        <p className="mt-2 text-[13px] text-amber-300">Still needed: {missing.join(", ")}</p>
                    )}
                </div>
            </div>

            {/* ---------- OUTPUT ---------- */}
            <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 min-[1100px]:sticky min-[1100px]:top-6">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-[16px] font-medium">Generated code</p>
                    <button
                        type="button"
                        onClick={copy}
                        className="rounded-xl border border-white/20 px-5 py-2.5 text-[14px] hover:bg-white/10"
                    >
                        {copied ? "Copied" : "Copy code"}
                    </button>
                </div>
                <pre className="mt-4 max-h-[70vh] overflow-auto rounded-2xl bg-black/50 p-4 text-[13px] leading-[20px] text-white/85">
                    {code}
                </pre>
                <p className="mt-4 text-[13px] leading-[20px] text-white/60">
                    Copy code is for the live site: paste it inside <code>realPosts</code> in{" "}
                    <code>lib/post-data.ts</code> and save the image into <code>public/images</code> under the
                    path shown. Create post does both steps for you.
                </p>
            </div>
        </div>
    );
}