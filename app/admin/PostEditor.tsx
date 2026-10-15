"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
// Copy code (hidden): also add `useMemo` to the react import above and uncomment the next line
// import { buildPostCode } from "@/lib/post-code";
import { slugify, DEFAULT_SIZES, type Block, type TextSizes } from "@/lib/post-code";
import { BlockEditor, newBlock, serializeBlocks, toEBlocks, type EBlock } from "@/app/admin/BlockEditor";

type Result = { ok: true; slug: string } | { ok: false; error: string } | null;
type Device = "desktop" | "tablet" | "mobile";

export type Initial = {
    slug: string;
    title: string;
    category: string;
    authors: string[];
    date: string; // YYYY-MM-DD, or ""
    excerpt: string;
    blocks: Block[]; // first block = intro
    sizes: TextSizes;
    toc: string[]; // Table of Contents entries (empty = no Table of Contents)
    metaTitle: string;
    metaDescription: string;
    metaTags: string;
    ogImage: string;
    image: string;
};

type Fields = {
    title: string;
    slug: string;
    category: string;
    date: string;
    excerpt: string;
    metaTitle: string;
    metaDescription: string;
    metaTags: string;
    ogImage: string;
};

const MAX_MB = 5;
const TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];

const DEVICES: { id: Device; label: string; w: string }[] = [
    { id: "desktop", label: "Desktop", w: "100%" },
    { id: "tablet", label: "Tablet", w: "768px" },
    { id: "mobile", label: "Mobile", w: "390px" },
];

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

export function PostEditor({
    canSave,
    authorNames,
    initial,
}: {
    canSave: boolean;
    authorNames: string[];
    initial?: Initial;
}) {
    const edit = !!initial;

    const [f, setF] = useState<Fields>({
        title: initial?.title ?? "",
        slug: initial?.slug ?? "",
        category: initial?.category ?? "Networking Infrastructure",
        date: initial?.date ?? "",
        excerpt: initial?.excerpt ?? "",
        metaTitle: initial?.metaTitle ?? "",
        metaDescription: initial?.metaDescription ?? "",
        metaTags: initial?.metaTags ?? "",
        ogImage: initial?.ogImage ?? "",
    });
    const [authors, setAuthors] = useState<string[]>(initial?.authors.length ? initial.authors : [""]);
    const [blocks, setBlocks] = useState<EBlock[]>(() =>
        toEBlocks(initial?.blocks.length ? initial.blocks : [{ t: "p", text: "" }])
    );
    const [sizes, setSizes] = useState<TextSizes>(initial?.sizes ?? DEFAULT_SIZES);
    const [tocOn, setTocOn] = useState(!!initial?.toc.length);
    const [tocItems, setTocItems] = useState<string[]>(initial?.toc.length ? initial.toc : [""]);
    const [slugTouched, setSlugTouched] = useState(false);
    const [mode, setMode] = useState<"upload" | "url">("upload");
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [imgErr, setImgErr] = useState("");
    const [failed, setFailed] = useState("");
    const [result, setResult] = useState<Result>(null);
    const [device, setDevice] = useState<Device>("desktop");
    const [openSec, setOpenSec] = useState<Record<string, boolean>>({ basics: true, content: true });
    const [pending, start] = useTransition();

    const toggle = (id: string) => setOpenSec((s) => ({ ...s, [id]: !s[id] }));

    // "Ali, Sara": one string, blank rows skipped
    const authorStr = authors.map((a) => a.trim()).filter(Boolean).join(", ");

    // calendar value (YYYY-MM-DD) -> DD-MM-YYYY; blank = today (the save code fills it)
    const dateDMY = f.date ? f.date.split("-").reverse().join("-") : "";

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
    const hasNewImage = mode === "upload" ? !!file : urlOk;
    const newPreview = mode === "upload" ? fileUrl : urlOk ? imgUrl.trim() : "";
    const preview = newPreview || initial?.image || "";
    const haveCover = hasNewImage || !!initial?.image;

    const set =
        (k: keyof Fields) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const v = e.target.value;
                setF((p) => ({
                    ...p,
                    [k]: v,
                    ...(k === "title" && !slugTouched && !edit ? { slug: slugify(v) } : {}),
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

    /* the first Text block is the intro; everything after it is the body */
    const clean = blocks.filter((b) => b.text.trim());
    const introBlock = clean[0]?.t === "p" ? clean[0] : null;
    const intro = introBlock ? introBlock.text.trim() : "";
    const body = introBlock ? clean.slice(1) : clean;
    const content = serializeBlocks(body);
    const toc = tocOn ? tocItems.map((t) => t.trim()).filter(Boolean) : [];

    const missing = [
        !f.title.trim() && "title",
        !f.slug.trim() && "slug",
        !f.excerpt.trim() && "excerpt",
        !intro && "intro (start the content with a Text block)",
        body.length === 0 && "content (a heading or more text after the intro)",
        !haveCover && "cover image",
    ].filter(Boolean) as string[];

    /* HIDDEN (Copy code): uncomment this whole block, the button in the top bar,
       `useMemo` in the react import and `buildPostCode` in the post-code import to bring it back.
    const [copied, setCopied] = useState(false);
    const ext =
        mode === "upload" && file
            ? (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg")
            : (imgUrl.match(/\.(png|jpe?g|webp|gif|avif)(?:$|\?)/i)?.[1] ?? "jpg").toLowerCase().replace("jpeg", "jpg");
    const imagePath = hasNewImage ? `/images/${f.slug || "post"}.${ext}` : initial?.image ?? "";
    const code = useMemo(
        () => buildPostCode({ ...f, date: dateDMY, author: authorStr, image: imagePath, intro, content, sizes, showToc }),
        [f, dateDMY, authorStr, imagePath, intro, content, sizes, showToc]
    );
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard blocked
        }
    };
    */

    const frameW = DEVICES.find((d) => d.id === device)!.w;

    const save = () =>
        start(async () => {
            setResult(null);
            const fd = new FormData();
            Object.entries(f).forEach(([k, v]) => {
                if (k !== "date") fd.append(k, v);
            });
            fd.append("date", dateDMY);
            fd.append("author", authorStr);
            fd.append("intro", intro);
            fd.append("content", content);
            fd.append("sizes", JSON.stringify(sizes));
            fd.append("toc", JSON.stringify(toc));
            if (edit) fd.append("currentImage", initial!.image);
            if (mode === "upload" && file) fd.append("imageFile", file);
            if (mode === "url" && urlOk) fd.append("imageUrl", imgUrl.trim());
            try {
                const res = await fetch(edit ? "/api/admin/post/edit" : "/api/admin/post", { method: "POST", body: fd });
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
        setF({
            title: "",
            slug: "",
            category: "Networking Infrastructure",
            date: "",
            excerpt: "",
            metaTitle: "",
            metaDescription: "",
            metaTags: "",
            ogImage: "",
        });
        setAuthors([""]);
        setBlocks([newBlock()]);
        setSlugTouched(false);
        setSizes(DEFAULT_SIZES);
        // setShowToc(false);
                setTocOn(false);
        setTocItems([""]);
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
                    <p className="text-[16px] font-medium">{edit ? "Edit post" : "Add post"}</p>
                </div>

                <div role="group" aria-label="Preview size" className="flex gap-1 rounded-full border border-white/15 p-1">
                    {DEVICES.map((d) => (
                        <button key={d.id} type="button" aria-pressed={device === d.id} onClick={() => setDevice(d.id)} className={pill(device === d.id)}>
                            {d.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {/* HIDDEN: Copy code button
                    <button
                        type="button"
                        onClick={copy}
                        className="rounded-xl border border-white/20 px-4 py-2 text-[13px] hover:bg-white/10"
                    >
                        {copied ? "Copied" : "Copy code"}
                    </button>
                    */}
                    <button
                        type="button"
                        onClick={save}
                        disabled={!canSave || missing.length > 0 || pending}
                        className="rounded-xl bg-[#5522d6] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#6a3be6] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {pending ? "Saving…" : edit ? "Save changes" : "Create post"}
                    </button>
                </div>
            </div>

            {/* ---------- STATUS LINE ---------- */}
            {result?.ok ? (
                <div role="status" className="mt-3 rounded-xl bg-emerald-500/15 px-4 py-2 text-[14px] text-emerald-200">
                    {edit ? "Changes saved." : "Post created."}{" "}
                    <Link href={`/blog/${result.slug}`} target="_blank" className="underline">View it</Link>
                    {!edit && (
                        <>
                            {" · "}
                            <button type="button" onClick={reset} className="underline">Add another</button>
                        </>
                    )}
                </div>
            ) : result ? (
                <p role="alert" className="mt-3 rounded-xl bg-red-500/15 px-4 py-2 text-[14px] text-red-200">
                    {result.error}
                </p>
            ) : !canSave ? (
                <p className="mt-3 text-[13px] text-white/60">
                    Saving only works when running locally (npm run dev).
                </p>
            ) : missing.length > 0 ? (
                <p className="mt-3 text-[13px] text-amber-300">Still needed: {missing.join(", ")}</p>
            ) : null}

            {/* both panes grow with their content; the whole page scrolls */}
            <div className="mt-4 grid items-start gap-4 min-[1100px]:grid-cols-[400px_minmax(0,1fr)]">
                {/* ---------- SIDEBAR ---------- */}
                <aside className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                    <Section title="Basics" open={!!openSec.basics} onToggle={() => toggle("basics")}>
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="title" className={label}>Title</label>
                                <input id="title" className={field} value={f.title} onChange={set("title")} />
                            </div>
                            <div>
                                <label htmlFor="slug" className={label}>
                                    Slug (/blog/…){edit ? " · can't be changed" : ""}
                                </label>
                                <input
                                    id="slug"
                                    className={`${field} ${edit ? "cursor-not-allowed opacity-60" : ""}`}
                                    value={f.slug}
                                    readOnly={edit}
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
                                <label htmlFor="date" className={label}>Date (blank = today)</label>
                                <input
                                    id="date"
                                    type="date"
                                    className={`${field} [color-scheme:dark]`}
                                    value={f.date}
                                    onChange={set("date")}
                                />
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
                                        onChange={(e) => setAuthors((p) => p.map((x, j) => (j === i ? e.target.value : x)))}
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
                        <button type="button" onClick={() => setAuthors((p) => [...p, ""])} className="mt-3 text-[13px] text-[#b79cff] hover:underline">
                            + Add author
                        </button>
                    </Section>

                    <Section
                        title="Cover image"
                        badge={haveCover ? "✓ added" : undefined}
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
                                <label htmlFor="img-file" className={label}>
                                    {edit ? "Replace the image (optional, max " : "Choose an image (max "}{MAX_MB} MB)
                                </label>
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
                        <p className="mt-2 text-[12px] text-white/50">
                            {edit ? "The current cover is kept unless you pick a new one. " : ""}The cover shows in the live preview.
                        </p>
                    </Section>

                    <Section title="Card excerpt" open={!!openSec.excerpt} onToggle={() => toggle("excerpt")}>
                        <label htmlFor="excerpt" className={label}>Short text shown on the blog cards</label>
                        <textarea id="excerpt" rows={3} className={field} value={f.excerpt} onChange={set("excerpt")} />
                    </Section>

                    <Section title="Content" open={!!openSec.content} onToggle={() => toggle("content")}>
                        <p className="mb-3 text-[12px] leading-[18px] text-white/55">
                            Click a block to pick <strong>Text / H1 / H2 / H3</strong>. The first Text block is the
                            intro, shown above the Table of Contents.
                        </p>
                        <BlockEditor blocks={blocks} onChange={setBlocks} />

                        <div className="mt-5 flex items-center justify-between">
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
                    <Section
                        title="Table of contents"
                        badge={tocOn ? "on" : "off"}
                        open={!!openSec.toc}
                        onToggle={() => toggle("toc")}
                    >
                        <label className="flex cursor-pointer items-center justify-between gap-3">
                            <span className="text-[13px] text-white/85">Show Table of Contents</span>
                            <input
                                type="checkbox"
                                role="switch"
                                checked={tocOn}
                                onChange={(e) => setTocOn(e.target.checked)}
                                className="peer sr-only"
                            />
                            <span
                                aria-hidden="true"
                                className="relative h-6 w-11 shrink-0 rounded-full bg-white/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-[#5522d6] peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-[#7b55e0]"
                            />
                        </label>

                        {tocOn && (
                            <div className="mt-3">
                                <p className="text-[12px] text-white/55">
                                    Type your own entries. They are separate from your headings.
                                </p>
                                <div className="mt-2 space-y-2">
                                    {tocItems.map((t, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input
                                                aria-label={`Table of contents entry ${i + 1}`}
                                                className={`${field} !mt-0`}
                                                placeholder="Entry title"
                                                value={t}
                                                onChange={(e) =>
                                                    setTocItems((p) => p.map((x, j) => (j === i ? e.target.value : x)))
                                                }
                                            />
                                            {tocItems.length > 1 && (
                                                <button
                                                    type="button"
                                                    aria-label={`Remove entry ${i + 1}`}
                                                    onClick={() => setTocItems((p) => p.filter((_, j) => j !== i))}
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
                                    onClick={() => setTocItems((p) => [...p, ""])}
                                    className="mt-3 text-[13px] text-[#b79cff] hover:underline"
                                >
                                    + Add entry
                                </button>
                            </div>
                        )}
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
                                    {intro || <span className="text-white/30">Intro paragraph…</span>}
                                </p>

                                {toc.length > 0 && (
                                    <nav aria-label="Table of contents" className="mt-8 rounded-2xl border border-white/20 bg-white/5 p-6">
                                        <p className="text-[14px] font-medium uppercase tracking-wide text-white/60">Table of Contents</p>
                                        <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-[17px] leading-[28px] tracking-tighter">
                                            {toc.map((t, i) => (
                                                <li key={i}>{t}</li>
                                            ))}
                                        </ol>
                                    </nav>
                                )}

                                {body.length === 0 && (
                                    <p className="mt-8 text-[16px] text-white/30">Your content will appear here…</p>
                                )}
                                {body.map((b) => {
                                    if (b.t === "p")
                                        return (
                                            <p key={b.id} className="mt-4 tracking-tighter" style={{ fontSize: sizes.p, lineHeight: 1.7 }}>
                                                {b.text}
                                            </p>
                                        );
                                    const Tag = b.t;
                                    return (
                                        <Tag key={b.id} className="mt-8 font-medium tracking-tighter" style={{ fontSize: sizes[b.t], lineHeight: 1.3 }}>
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