"use client";

import { useEffect, useRef, useState } from "react";
import type { Block } from "@/lib/post-code";

export type EBlock = Block & { id: string };

let counter = 0;
const uid = () => `b${++counter}`;

export const newBlock = (t: Block["t"] = "p", text = ""): EBlock => ({ id: uid(), t, text });
export const toEBlocks = (bs: Block[]): EBlock[] => bs.map((b) => ({ ...b, id: uid() }));

// back to the "# / ## / ###" text that the save routes understand
export function serializeBlocks(bs: Block[]): string {
    return bs
        .map((b) => (b.t === "p" ? b.text.trim() : `${"#".repeat(Number(b.t[1]))} ${b.text.trim()}`))
        .join("\n\n");
}

const STYLES: { t: Block["t"]; label: string }[] = [
    { t: "p", label: "Text" },
    { t: "h1", label: "H1" },
    { t: "h2", label: "H2" },
    { t: "h3", label: "H3" },
];

// editor-only look (the preview uses the real px sizes)
const look: Record<Block["t"], string> = {
    p: "text-[14px] leading-[22px]",
    h1: "text-[22px] font-semibold leading-[28px]",
    h2: "text-[18px] font-semibold leading-[24px]",
    h3: "text-[16px] font-medium leading-[22px]",
};

const hint: Record<Block["t"], string> = {
    p: "Type text…",
    h1: "Heading 1",
    h2: "Heading 2",
    h3: "Heading 3",
};

const ctl =
    "grid h-7 min-w-7 place-items-center rounded-md border border-white/15 px-2 text-[12px] text-white/70 hover:bg-white/10 hover:text-white";

export function BlockEditor({
    blocks,
    onChange,
}: {
    blocks: EBlock[];
    onChange: (b: EBlock[]) => void;
}) {
    const refs = useRef<Record<string, HTMLTextAreaElement | null>>({});
    const pending = useRef<string | null>(null);
    const [focused, setFocused] = useState<string | null>(null);

    // grow every textarea to fit its text, then focus a block we just created
    useEffect(() => {
        for (const b of blocks) {
            const el = refs.current[b.id];
            if (el) {
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
            }
        }
        if (pending.current) {
            const el = refs.current[pending.current];
            pending.current = null;
            if (el) {
                el.focus();
                const n = el.value.length;
                el.setSelectionRange(n, n);
            }
        }
    }, [blocks]);

    const patch = (id: string, p: Partial<Block>) =>
        onChange(blocks.map((b) => (b.id === id ? { ...b, ...p } : b)));

    const insertAfter = (i: number, items: EBlock[]) => {
        const next = [...blocks];
        next.splice(i + 1, 0, ...items);
        pending.current = items[items.length - 1].id;
        onChange(next);
    };

    const remove = (i: number) => {
        if (blocks.length === 1) return patch(blocks[0].id, { text: "", t: "p" });
        const next = blocks.filter((_, j) => j !== i);
        pending.current = (next[i - 1] ?? next[0]).id;
        onChange(next);
    };

    const move = (i: number, d: -1 | 1) => {
        const j = i + d;
        if (j < 0 || j >= blocks.length) return;
        const next = [...blocks];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };

    // pasted multi-line text becomes one block per line
    const onText = (i: number, v: string) => {
        if (!v.includes("\n")) return patch(blocks[i].id, { text: v });
        const lines = v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
        if (lines.length === 0) return patch(blocks[i].id, { text: "" });
        const extra = lines.slice(1).map((l) => newBlock("p", l));
        const next = blocks.map((b, j) => (j === i ? { ...b, text: lines[0] } : b));
        next.splice(i + 1, 0, ...extra);
        if (extra.length) pending.current = extra[extra.length - 1].id;
        onChange(next);
    };

    const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>, i: number) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === "Enter") {
            e.preventDefault();
            insertAfter(i, [newBlock()]);
        } else if (e.key === "Backspace" && blocks[i].text === "" && blocks.length > 1) {
            e.preventDefault();
            remove(i);
        }
    };

    return (
        <div className="space-y-2">
            {blocks.map((b, i) => {
                const active = focused === b.id;
                const label = i === 0 && b.t === "p" ? "Intro" : STYLES.find((s) => s.t === b.t)!.label;
                return (
                    <div
                        key={b.id}
                        className={`rounded-lg border px-3 py-2 ${active ? "border-[#7b55e0] bg-white/5" : "border-white/10"}`}
                    >
                        {active ? (
                            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                <div role="group" aria-label="Block style" className="flex gap-1">
                                    {STYLES.map((s) => (
                                        <button
                                            key={s.t}
                                            type="button"
                                            aria-pressed={b.t === s.t}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => patch(b.id, { t: s.t })}
                                            className={`${ctl} ${b.t === s.t ? "!border-[#7b55e0] !bg-[#5522d6] !text-white" : ""}`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-1">
                                    <button type="button" aria-label="Move block up" onMouseDown={(e) => e.preventDefault()} onClick={() => move(i, -1)} className={ctl}>↑</button>
                                    <button type="button" aria-label="Move block down" onMouseDown={(e) => e.preventDefault()} onClick={() => move(i, 1)} className={ctl}>↓</button>
                                    <button type="button" aria-label="Delete block" onMouseDown={(e) => e.preventDefault()} onClick={() => remove(i)} className={ctl}>✕</button>
                                </div>
                            </div>
                        ) : (
                            <span className="mb-1 block text-[10px] uppercase tracking-wide text-white/35">{label}</span>
                        )}
                        <textarea
                            ref={(el) => {
                                refs.current[b.id] = el;
                            }}
                            rows={1}
                            value={b.text}
                            aria-label={`${label} block`}
                            placeholder={i === 0 && b.t === "p" ? "Write the intro paragraph…" : hint[b.t]}
                            onFocus={() => setFocused(b.id)}
                            onChange={(e) => onText(i, e.target.value)}
                            onKeyDown={(e) => onKey(e, i)}
                            className={`block w-full resize-none overflow-hidden bg-transparent outline-none placeholder:text-white/30 ${look[b.t]}`}
                        />
                    </div>
                );
            })}
            <button
                type="button"
                onClick={() => insertAfter(blocks.length - 1, [newBlock()])}
                className="w-full rounded-lg border border-dashed border-white/20 py-2 text-[13px] text-[#b79cff] hover:bg-white/5"
            >
                + Add block
            </button>
        </div>
    );
}