import type { Post } from "./posts";

export function seoIssues(p: Post): string[] {
    const out: string[] = [];
    const t = p.seo.metaTitle?.trim();
    const d = p.seo.metaDescription?.trim();

    if (!t) out.push("No meta title");
    else if (t.length > 60) out.push(`Meta title too long (${t.length}/60)`);

    if (!d) out.push("No meta description");
    else if (d.length > 160) out.push(`Description too long (${d.length}/160)`);
    else if (d.length < 70) out.push("Description too short");

    if (!p.seo.metaTags?.length) out.push("No meta tags");
    return out;
}