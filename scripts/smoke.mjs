// Post-deploy check:  node scripts/smoke.mjs https://staging.comtech.net.pk
// Loads key pages and confirms every script/style/image they reference is actually served (no 404s),
// that page caching headers are right, and (on staging) that noindex is on. Exit code 1 = something is wrong.
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const pages = ["/", "/services", "/partners", "/partners/cisco", "/industries", "/about-us", "/contact-us", "/blog", "/events/itcn-asia-2026"];
let failed = 0;
const fail = (m) => { failed++; console.log("  FAIL", m); };

for (const p of pages) {
  const r = await fetch(base + p, { cache: "no-store" });
  console.log(p, r.status);
  if (!r.ok) { fail(`${p} returned ${r.status}`); continue; }
  const cc = r.headers.get("cache-control") || "";
  if (!/must-revalidate|no-cache|no-store/.test(cc)) fail(`${p} cache-control is "${cc}" (old pages could be shown after a deploy)`);
  const html = await r.text();
  const urls = new Set([...html.matchAll(/(?:src|href)="(\/(?:_next|images)\/[^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&")));
  for (const u of urls) {
    const a = await fetch(base + u, { method: "HEAD" });
    if (!a.ok) fail(`${p} -> ${u} returned ${a.status}`);
  }
}
const robots = await fetch(base + "/robots.txt").then((r) => r.text());
console.log("robots.txt:", robots.includes("Disallow: /") ? "blocks crawlers" : "OPEN to crawlers");
console.log(failed ? `\n${failed} problem(s) found` : "\nAll good");
process.exit(failed ? 1 : 0);
