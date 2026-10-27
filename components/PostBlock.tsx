import type { CSSProperties } from "react";
import { slugify, type Block, type TextSizes } from "@/lib/post-code";

/* One blog block, drawn the same way on the blog page and in the admin preview.
   (The admin editor uses blockGap + textProps too, so what you edit is what you get.) */

type Tag = "h1" | "h2" | "h3" | "p" | "quote";

// space above each kind of block
export const blockGap = (t: Block["t"]) =>
    t === "p" || t === "ul" || t === "ol" ? "mt-4" : t === "h1" || t === "h2" || t === "h3" || t === "hr" ? "mt-8" : "mt-6";

// class + inline size for the text blocks
export function textProps(t: Tag, sizes: TextSizes): { className: string; style: CSSProperties } {
    if (t === "h1" || t === "h2" || t === "h3")
        return { className: "font-medium tracking-tighter", style: { fontSize: sizes[t], lineHeight: 1.3 } };
    return { className: "tracking-tighter", style: { fontSize: sizes.p, lineHeight: 1.7 } };
}

export function PostBlock({ b, sizes }: { b: Block; sizes: TextSizes }) {
    const gap = blockGap(b.t);

    if (b.t === "h1" || b.t === "h2" || b.t === "h3") {
        const Tag = b.t;
        return <Tag id={slugify(b.text)} className={`${gap} scroll-mt-6 ${textProps(b.t, sizes).className}`} style={textProps(b.t, sizes).style}>{b.text}</Tag>;
    }
    if (b.t === "p")
        return <p className={`${gap} ${textProps("p", sizes).className}`} style={textProps("p", sizes).style}>{b.text}</p>;
    if (b.t === "quote")
        return (
            <blockquote className={`${gap} border-l-4 border-[#7b55e0] pl-5 italic text-white/90 ${textProps("p", sizes).className}`} style={textProps("p", sizes).style}>
                {b.text}
            </blockquote>
        );
    if (b.t === "ul" || b.t === "ol") {
        const List = b.t;
        return (
            <List className={`${gap} space-y-2 pl-6 ${b.t === "ul" ? "list-disc" : "list-decimal"} ${textProps("p", sizes).className}`} style={textProps("p", sizes).style}>
                {b.items.map((it, i) => (
                    <li key={i}>{it}</li>
                ))}
            </List>
        );
    }
    if (b.t === "img")
        return (
            <figure className={gap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt ?? ""} loading="lazy" className="h-auto w-full rounded-2xl" />
                {b.caption && <figcaption className="mt-2 text-center text-[14px] text-white/60">{b.caption}</figcaption>}
            </figure>
        );
    if (b.t === "table")
        return (
            <div className={`${gap} overflow-x-auto rounded-2xl border border-white/20`}>
                <table className="w-full border-collapse text-left tracking-tighter" style={{ fontSize: Math.round(sizes.p * 0.9) }}>
                    <thead>
                        <tr>
                            {b.rows[0].map((c, i) => (
                                <th key={i} className="border border-white/10 bg-white/10 px-4 py-2.5 font-medium">{c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {b.rows.slice(1).map((r, i) => (
                            <tr key={i}>
                                {r.map((c, j) => (
                                    <td key={j} className="border border-white/10 px-4 py-2.5">{c}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    return <hr className={`${gap} border-white/20`} />;
}
