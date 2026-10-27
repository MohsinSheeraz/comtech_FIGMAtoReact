"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { squareRows, type Block, type TextSizes } from "@/lib/post-code";
import { blockGap, textProps } from "@/components/PostBlock";

export type EBlock = Block & { id: string };

let counter = 0;
const uid = () => `b${++counter}`;

// a fresh, empty block of any kind
export function newBlock(t: Block["t"] = "p"): EBlock {
    const id = uid();
    switch (t) {
        case "ul":
        case "ol":
            return { id, t, items: [""] };
        case "img":
            return { id, t, src: "" };
        case "table":
            return { id, t, rows: [["", "", ""], ["", "", ""], ["", "", ""]] };
        case "hr":
            return { id, t };
        default:
            return { id, t, text: "" };
    }
}
export const toEBlocks = (bs: Block[]): EBlock[] => bs.map((b) => ({ ...b, id: uid() }) as EBlock);

// back to plain blocks (no ids) for the save routes
export const fromEBlocks = (bs: EBlock[]): Block[] =>
    bs.map((b) => {
        const { id, ...rest } = b;
        void id;
        return rest as Block;
    });

// blocks with nothing in them are not saved
export function hasContent(b: Block): boolean {
    if (b.t === "hr") return true;
    if (b.t === "img") return !!b.src;
    if (b.t === "table") return b.rows.some((r) => r.some((c) => c.trim()));
    if ("items" in b) return b.items.some((i) => i.trim());
    return !!b.text.trim();
}

// the element that gets the cursor after a block is added
const focusKey = (b: EBlock) => (b.t === "ul" || b.t === "ol" ? `${b.id}:0` : b.id);

// the elements shown in the "+" menu (only the ones a blog needs)
const ELEMENTS: { t: Block["t"]; label: string; icon: string }[] = [
    { t: "h1", label: "Heading 1", icon: "H1" },
    { t: "h2", label: "Heading 2", icon: "H2" },
    { t: "h3", label: "Heading 3", icon: "H3" },
    { t: "p", label: "Text", icon: "¶" },
    { t: "img", label: "Image", icon: "▣" },
    { t: "table", label: "Table", icon: "▦" },
    { t: "ul", label: "Bulleted list", icon: "•" },
    { t: "ol", label: "Numbered list", icon: "1." },
    { t: "quote", label: "Quote", icon: "❝" },
    { t: "hr", label: "Divider", icon: "—" },
];

const TEXT_STYLES: { t: Block["t"]; label: string }[] = [
    { t: "p", label: "Text" },
    { t: "h1", label: "H1" },
    { t: "h2", label: "H2" },
    { t: "h3", label: "H3" },
    { t: "quote", label: "Quote" },
];

const hint: Record<string, string> = {
    p: "Type text, or paste a table or a picture…",
    h1: "Heading 1",
    h2: "Heading 2",
    h3: "Heading 3",
    quote: "Quote",
};

const ctl =
    "grid h-7 min-w-7 place-items-center rounded-md border border-white/15 px-2 text-[12px] text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30";

/* textarea that grows with its text (used for the title, intro and every text block) */
export function AutoText(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const fit = () => {
        const el = ref.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };
    useLayoutEffect(fit, [props.value, props.style?.fontSize]);
    // re-fit when the preview gets wider or narrower (Desktop / Tablet / Mobile)
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let w = el.offsetWidth;
        const ro = new ResizeObserver(() => {
            if (el.offsetWidth !== w) {
                w = el.offsetWidth;
                fit();
            }
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);
    return <textarea ref={ref} rows={1} {...props} className={`block w-full resize-none overflow-hidden bg-transparent outline-none placeholder:text-white/25 ${props.className ?? ""}`} />;
}

// rows from a copied table (web page, Word, Excel, Google Sheets) or tab-separated text
function tableFromClipboard(cd: DataTransfer): string[][] | null {
    const html = cd.getData("text/html");
    if (html && /<table[\s>]/i.test(html)) {
        const t = new DOMParser().parseFromString(html, "text/html").querySelector("table");
        if (t) {
            const rows = [...t.rows].map((tr) => [...tr.cells].map((td) => (td.textContent ?? "").replace(/\s+/g, " ").trim()));
            if (rows.some((r) => r.length)) return squareRows(rows);
        }
    }
    const lines = cd.getData("text/plain").split(/\r?\n/).filter((l) => l.trim() !== "");
    if (lines.length >= 2 && lines.every((l) => l.includes("\t"))) return squareRows(lines.map((l) => l.split("\t").map((c) => c.trim())));
    return null;
}

async function uploadImage(input: File | string, slug: string): Promise<string> {
    const fd = new FormData();
    fd.append("slug", slug);
    fd.append(typeof input === "string" ? "imageUrl" : "imageFile", input);
    const res = await fetch("/api/admin/post/image", { method: "POST", body: fd });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) throw new Error(data?.error ?? "Couldn't upload the image.");
    return data.url as string;
}

/* the "+" button between blocks, opens the list of elements */
function Inserter({
    open,
    last,
    empty,
    onToggle,
    onPick,
}: {
    open: boolean;
    last?: boolean;
    empty?: boolean;
    onToggle: () => void;
    onPick: (t: Block["t"]) => void;
}) {
    const menu = (
        <div
            role="menu"
            aria-label="Add an element"
            className={`absolute left-1/2 z-40 grid w-[min(92vw,380px)] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-white/15 bg-[#0b0814] p-2 shadow-2xl ${last || empty ? "bottom-full mb-2" : "top-4"}`}
        >
            {ELEMENTS.map((e) => (
                <button
                    key={e.t}
                    type="button"
                    role="menuitem"
                    onClick={() => onPick(e.t)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] text-white/85 hover:bg-white/10"
                >
                    <span aria-hidden="true" className="grid size-7 place-items-center rounded-md bg-[#5522d6]/40 text-[12px]">{e.icon}</span>
                    {e.label}
                </button>
            ))}
        </div>
    );

    if (last || empty)
        return (
            <div data-insert-menu className="relative mt-6">
                <button
                    type="button"
                    aria-expanded={open}
                    onClick={onToggle}
                    className="w-full rounded-lg border border-dashed border-white/20 py-2.5 text-[13px] text-[#b79cff] hover:bg-white/5"
                >
                    + {empty ? "Add your first element" : "Add element"}
                </button>
                {open && menu}
            </div>
        );

    return (
        <div data-insert-menu className="group/ins relative z-10 h-0">
            <div className="absolute inset-x-0 -top-3 flex h-6 items-center justify-center">
                <div className={`absolute inset-x-0 top-1/2 h-px bg-[#7b55e0]/60 ${open ? "" : "opacity-0 group-hover/ins:opacity-100 [@media(hover:none)]:opacity-40"}`} />
                <button
                    type="button"
                    aria-label="Add an element here"
                    aria-expanded={open}
                    onClick={onToggle}
                    className={`relative grid size-6 place-items-center rounded-full bg-[#5522d6] text-[16px] leading-none text-white focus-visible:opacity-100 ${open ? "" : "opacity-0 group-hover/ins:opacity-100 [@media(hover:none)]:opacity-60"}`}
                >
                    +
                </button>
            </div>
            {open && menu}
        </div>
    );
}

export function BlockEditor({
    blocks,
    onChange,
    sizes,
    slug,
}: {
    blocks: EBlock[];
    onChange: (b: EBlock[]) => void;
    sizes: TextSizes;
    slug: string; // names the uploaded pictures
}) {
    const root = useRef<HTMLDivElement>(null);
    const pending = useRef<string | null>(null);
    const latest = useRef(blocks);
    latest.current = blocks;
    const [menuAt, setMenuAt] = useState<number | null>(null);
    const [busy, setBusy] = useState<Record<string, boolean>>({});
    const [notice, setNotice] = useState("");

    // focus the block we just created
    useEffect(() => {
        if (!pending.current) return;
        const el = root.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-focus="${pending.current}"]`);
        pending.current = null;
        if (el) {
            el.focus();
            const n = el.value.length;
            el.setSelectionRange(n, n);
        }
    }, [blocks]);

    // close the "+" menu on a click outside it or on Escape
    useEffect(() => {
        if (menuAt === null) return;
        const down = (e: MouseEvent) => {
            if (!(e.target as Element).closest("[data-insert-menu]")) setMenuAt(null);
        };
        const key = (e: KeyboardEvent) => e.key === "Escape" && setMenuAt(null);
        document.addEventListener("mousedown", down);
        document.addEventListener("keydown", key);
        return () => {
            document.removeEventListener("mousedown", down);
            document.removeEventListener("keydown", key);
        };
    }, [menuAt]);

    const patch = (id: string, p: Partial<EBlock>) =>
        onChange(latest.current.map((b) => (b.id === id ? ({ ...b, ...p } as EBlock) : b)));

    const insertAt = (i: number, items: EBlock[], focus = true) => {
        const next = [...latest.current];
        next.splice(i, 0, ...items);
        if (focus) pending.current = focusKey(items[items.length - 1]);
        onChange(next);
    };

    const remove = (i: number) => {
        const next = latest.current.filter((_, j) => j !== i);
        if (next[i - 1] ?? next[0]) pending.current = focusKey(next[i - 1] ?? next[0]);
        onChange(next);
    };

    const move = (i: number, d: -1 | 1) => {
        const j = i + d;
        if (j < 0 || j >= latest.current.length) return;
        const next = [...latest.current];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };

    const duplicate = (i: number) => {
        const copy = { ...JSON.parse(JSON.stringify(latest.current[i])), id: uid() } as EBlock;
        insertAt(i + 1, [copy], false);
    };

    // a picture that is still uploading shows "Uploading…" in its block
    const fill = async (id: string, input: File | string) => {
        setBusy((s) => ({ ...s, [id]: true }));
        setNotice("");
        try {
            patch(id, { src: await uploadImage(input, slug || "post") } as Partial<EBlock>);
        } catch (e) {
            setNotice(e instanceof Error ? e.message : "Couldn't upload the image.");
        } finally {
            setBusy((s) => {
                const n = { ...s };
                delete n[id];
                return n;
            });
        }
    };

    const add = (i: number, t: Block["t"]) => {
        setMenuAt(null);
        insertAt(i, [newBlock(t)]);
    };

    // paste a table or a picture into a text block; plain text is handled by onText
    const onPasteText = (e: React.ClipboardEvent, i: number) => {
        const pic = [...e.clipboardData.files].find((f) => f.type.startsWith("image/"));
        const rows = pic ? null : tableFromClipboard(e.clipboardData);
        if (!pic && !rows) return;
        e.preventDefault();
        const cur = latest.current[i];
        const blank = "text" in cur && !cur.text.trim();
        const nb: EBlock = pic ? { id: uid(), t: "img", src: "" } : { id: uid(), t: "table", rows: rows! };
        const next = [...latest.current];
        next.splice(blank ? i : i + 1, blank ? 1 : 0, nb);
        onChange(next);
        if (pic) void fill(nb.id, pic);
    };

    // pasted multi-line text becomes one block per line
    const onText = (i: number, v: string) => {
        const cur = latest.current[i];
        if (!v.includes("\n")) return patch(cur.id, { text: v } as Partial<EBlock>);
        const lines = v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
        if (lines.length === 0) return patch(cur.id, { text: "" } as Partial<EBlock>);
        const extra = lines.slice(1).map((l) => ({ ...newBlock("p"), text: l }) as EBlock);
        const next = latest.current.map((b, j) => (j === i ? ({ ...b, text: lines[0] } as EBlock) : b));
        next.splice(i + 1, 0, ...extra);
        if (extra.length) pending.current = extra[extra.length - 1].id;
        onChange(next);
    };

    const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>, i: number) => {
        if (e.nativeEvent.isComposing) return;
        const b = latest.current[i];
        if (e.key === "Enter") {
            e.preventDefault();
            insertAt(i + 1, [newBlock()]);
        } else if (e.key === "Backspace" && "text" in b && b.text === "") {
            e.preventDefault();
            remove(i);
        }
    };

    /* ---------- one block ---------- */
    const edit = (b: EBlock, i: number) => {
        if (b.t === "hr") return <hr className="border-white/20" />;

        if (b.t === "ul" || b.t === "ol") {
            const List = b.t;
            const setItems = (items: string[]) => patch(b.id, { items } as Partial<EBlock>);
            return (
                <List className={`space-y-2 pl-6 ${b.t === "ul" ? "list-disc" : "list-decimal"} ${textProps("p", sizes).className}`} style={textProps("p", sizes).style}>
                    {b.items.map((it, k) => (
                        <li key={k}>
                            <input
                                data-focus={`${b.id}:${k}`}
                                aria-label={`List item ${k + 1}`}
                                value={it}
                                placeholder="List item"
                                onChange={(e) => setItems(b.items.map((x, j) => (j === k ? e.target.value : x)))}
                                onKeyDown={(e) => {
                                    if (e.nativeEvent.isComposing) return;
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        // Enter on an empty last item ends the list
                                        if (it === "" && k === b.items.length - 1 && b.items.length > 1) {
                                            const next = latest.current.map((x) => (x.id === b.id ? ({ ...b, items: b.items.slice(0, -1) } as EBlock) : x));
                                            next.splice(i + 1, 0, newBlock());
                                            pending.current = next[i + 1].id;
                                            onChange(next);
                                        } else {
                                            pending.current = `${b.id}:${k + 1}`;
                                            setItems([...b.items.slice(0, k + 1), "", ...b.items.slice(k + 1)]);
                                        }
                                    } else if (e.key === "Backspace" && it === "" && b.items.length > 1) {
                                        e.preventDefault();
                                        pending.current = `${b.id}:${Math.max(0, k - 1)}`;
                                        setItems(b.items.filter((_, j) => j !== k));
                                    }
                                }}
                                onPaste={(e) => {
                                    const lines = e.clipboardData.getData("text/plain").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
                                    if (lines.length < 2) return;
                                    e.preventDefault();
                                    setItems([...b.items.slice(0, k), ...lines, ...b.items.slice(k + 1)]);
                                }}
                                className="w-full bg-transparent outline-none placeholder:text-white/25"
                            />
                        </li>
                    ))}
                </List>
            );
        }

        if (b.t === "img") {
            if (b.src)
                return (
                    <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.src} alt={b.alt ?? ""} className="h-auto w-full rounded-2xl" />
                        <input
                            aria-label="Image caption"
                            value={b.caption ?? ""}
                            placeholder="Caption (optional)"
                            onChange={(e) => patch(b.id, { caption: e.target.value } as Partial<EBlock>)}
                            className="mt-2 w-full bg-transparent text-center text-[14px] outline-none placeholder:text-white/25"
                        />
                        <input
                            aria-label="Image description for search engines and screen readers"
                            value={b.alt ?? ""}
                            placeholder="Describe the image (alt text)"
                            onChange={(e) => patch(b.id, { alt: e.target.value } as Partial<EBlock>)}
                            className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-[12px] outline-none focus:border-[#7b55e0]"
                        />
                    </figure>
                );
            return <ImagePicker busy={!!busy[b.id]} onFile={(f) => void fill(b.id, f)} onUrl={(u) => void fill(b.id, u)} onError={setNotice} />;
        }

        if (b.t === "table")
            return <TableEdit b={b} sizes={sizes} setRows={(rows) => patch(b.id, { rows } as Partial<EBlock>)} />;

        // text, headings and quote
        if (!("text" in b)) return null;
        return (
            <div className={b.t === "quote" ? "border-l-4 border-[#7b55e0] pl-5 italic text-white/90" : ""}>
                <AutoText
                    data-focus={b.id}
                    value={b.text}
                    aria-label={`${TEXT_STYLES.find((s) => s.t === b.t)?.label ?? "Text"} block`}
                    placeholder={hint[b.t]}
                    onChange={(e) => onText(i, e.target.value)}
                    onKeyDown={(e) => onKey(e, i)}
                    onPaste={(e) => onPasteText(e, i)}
                    className={textProps(b.t, sizes).className}
                    style={textProps(b.t, sizes).style}
                />
            </div>
        );
    };

    return (
        <div ref={root}>
            {notice && (
                <p role="alert" className="mt-4 rounded-xl bg-red-500/15 px-4 py-2 text-[13px] text-red-200">
                    {notice}
                </p>
            )}
            {blocks.length === 0 ? (
                <Inserter empty open={menuAt === 0} onToggle={() => setMenuAt(menuAt === 0 ? null : 0)} onPick={(t) => add(0, t)} />
            ) : (
                <>
                    {blocks.map((b, i) => (
                        <div key={b.id}>
                            {i > 0 && (
                                <Inserter open={menuAt === i} onToggle={() => setMenuAt(menuAt === i ? null : i)} onPick={(t) => add(i, t)} />
                            )}
                            <div className={`group/blk relative rounded-lg ring-1 ring-transparent hover:ring-white/15 focus-within:ring-[#7b55e0] ${blockGap(b.t)}`}>
                                <div className="absolute -top-3.5 right-2 z-20 hidden gap-1 rounded-lg border border-white/15 bg-[#0b0814] p-1 group-focus-within/blk:flex group-hover/blk:flex">
                                    {"text" in b && (
                                        <select
                                            aria-label="Block style"
                                            value={b.t}
                                            onChange={(e) => patch(b.id, { t: e.target.value } as Partial<EBlock>)}
                                            className="h-7 rounded-md border border-white/15 bg-[#0b0814] px-1 text-[12px] text-white/80"
                                        >
                                            {TEXT_STYLES.map((s) => (
                                                <option key={s.t} value={s.t}>{s.label}</option>
                                            ))}
                                        </select>
                                    )}
                                    <button type="button" aria-label="Move block up" disabled={i === 0} onMouseDown={(e) => e.preventDefault()} onClick={() => move(i, -1)} className={ctl}>↑</button>
                                    <button type="button" aria-label="Move block down" disabled={i === blocks.length - 1} onMouseDown={(e) => e.preventDefault()} onClick={() => move(i, 1)} className={ctl}>↓</button>
                                    <button type="button" aria-label="Duplicate block" onMouseDown={(e) => e.preventDefault()} onClick={() => duplicate(i)} className={ctl}>⧉</button>
                                    <button type="button" aria-label="Delete block" onMouseDown={(e) => e.preventDefault()} onClick={() => remove(i)} className={ctl}>✕</button>
                                </div>
                                {edit(b, i)}
                            </div>
                        </div>
                    ))}
                    <Inserter last open={menuAt === blocks.length} onToggle={() => setMenuAt(menuAt === blocks.length ? null : blocks.length)} onPick={(t) => add(blocks.length, t)} />
                </>
            )}
        </div>
    );
}

/* editable table: the first row is the header; paste a copied table into any cell to fill it */
function TableEdit({
    b,
    sizes,
    setRows,
}: {
    b: Extract<EBlock, { t: "table" }>;
    sizes: TextSizes;
    setRows: (r: string[][]) => void;
}) {
    const [cell, setCell] = useState({ r: 0, c: 0 });
    const rows = b.rows;
    const w = rows[0]?.length ?? 1;
    const setCellText = (r: number, c: number, v: string) =>
        setRows(rows.map((row, ri) => (ri === r ? row.map((x, ci) => (ci === c ? v : x)) : row)));

    const paste = (e: React.ClipboardEvent, r: number, c: number) => {
        const pasted = tableFromClipboard(e.clipboardData);
        if (!pasted) return;
        e.preventDefault();
        const next = rows.map((row) => [...row]);
        pasted.forEach((pr, ri) =>
            pr.forEach((v, ci) => {
                while (next.length <= r + ri) next.push(Array(w).fill(""));
                while (next[r + ri].length <= c + ci) next.forEach((row) => row.push(""));
                next[r + ri][c + ci] = v;
            })
        );
        setRows(squareRows(next));
    };

    const small =
        "rounded-md border border-white/15 px-2.5 py-1 text-[12px] text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30";
    return (
        <div>
            <div className="overflow-x-auto rounded-2xl border border-white/20">
                <table className="w-full border-collapse text-left tracking-tighter" style={{ fontSize: Math.round(sizes.p * 0.9) }}>
                    <tbody>
                        {rows.map((row, r) => (
                            <tr key={r}>
                                {row.map((v, c) => (
                                    <td key={c} className={`border border-white/10 p-0 ${r === 0 ? "bg-white/10 font-medium" : ""}`}>
                                        <input
                                            data-focus={r === 0 && c === 0 ? b.id : undefined}
                                            aria-label={`${r === 0 ? "Header" : "Row " + (r + 1)}, column ${c + 1}`}
                                            value={v}
                                            placeholder={r === 0 ? "Header" : ""}
                                            onFocus={() => setCell({ r, c })}
                                            onChange={(e) => setCellText(r, c, e.target.value)}
                                            onPaste={(e) => paste(e, r, c)}
                                            className="w-full min-w-[110px] bg-transparent px-4 py-2.5 outline-none placeholder:text-white/25 focus:bg-white/5"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 hidden flex-wrap gap-2 group-focus-within/blk:flex">
                <button type="button" className={small} onClick={() => setRows([...rows.slice(0, cell.r + 1), Array(w).fill(""), ...rows.slice(cell.r + 1)])}>+ Row</button>
                <button type="button" className={small} onClick={() => setRows(rows.map((row) => [...row.slice(0, cell.c + 1), "", ...row.slice(cell.c + 1)]))} disabled={w >= 12}>+ Column</button>
                <button type="button" className={small} disabled={rows.length <= 1} onClick={() => setRows(rows.filter((_, r) => r !== cell.r))}>Delete row</button>
                <button type="button" className={small} disabled={w <= 1} onClick={() => setRows(rows.map((row) => row.filter((_, c) => c !== cell.c)))}>Delete column</button>
                <span className="self-center text-[11px] text-white/40">First row is the header</span>
            </div>
        </div>
    );
}

/* empty Image block: drop a file, browse for one, or use a link */
function ImagePicker({
    busy,
    onFile,
    onUrl,
    onError,
}: {
    busy: boolean;
    onFile: (f: File) => void;
    onUrl: (u: string) => void;
    onError: (m: string) => void;
}) {
    const [over, setOver] = useState(false);
    const [link, setLink] = useState("");
    const take = (f: File | undefined) => {
        if (!f) return;
        if (!f.type.startsWith("image/")) return onError("Use a PNG, JPG, WebP, GIF or AVIF image.");
        onFile(f);
    };
    const useLink = () => {
        const v = link.trim();
        if (/^https?:\/\//i.test(v)) onUrl(v);
        else onError("The image link must start with http or https.");
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                take(e.dataTransfer.files[0]);
            }}
            className={`rounded-2xl border border-dashed px-6 py-8 text-center transition ${over ? "border-[#7b55e0] bg-[#5522d6]/20" : "border-white/20 bg-white/[0.03]"}`}
        >
            {busy ? (
                <div className="py-6 text-[14px] text-white/70">
                    <span aria-hidden="true" className="mx-auto mb-3 block size-6 animate-spin rounded-full border-2 border-white/20 border-t-[#7b55e0]" />
                    Uploading…
                </div>
            ) : (
                <>
                    <span aria-hidden="true" className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#5522d6]/30 text-[26px]">▣</span>
                    <p className="mt-4 text-[15px] text-white/90">Drag an image here</p>
                    <p className="mt-1 text-[12px] text-white/45">PNG, JPG, WebP, GIF or AVIF, up to 4 MB. You can also paste a picture into a text block.</p>
                    <label className="mt-4 inline-block cursor-pointer rounded-xl bg-[#5522d6] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#6a3be6]">
                        Browse files
                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                            className="sr-only"
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                e.target.value = "";
                                take(f);
                            }}
                        />
                    </label>
                    <div className="mx-auto my-5 flex max-w-[420px] items-center gap-3 text-[11px] uppercase tracking-wide text-white/30">
                        <span className="h-px flex-1 bg-white/10" />
                        or use a link
                        <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <div className="mx-auto flex max-w-[460px] gap-2">
                        <input
                            aria-label="Image URL"
                            value={link}
                            placeholder="https://example.com/photo.jpg"
                            onChange={(e) => setLink(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                e.preventDefault();
                                useLink();
                            }}
                            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-[13px] outline-none focus:border-[#7b55e0]"
                        />
                        <button type="button" onClick={useLink} className="rounded-xl border border-white/20 px-4 py-2.5 text-[13px] text-white/80 hover:bg-white/10">
                            Add
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
