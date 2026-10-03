import Link from "next/link";

function pageList(current: number, total: number): (number | "…")[] {
  const set = new Set([1, 2, 3, total, current - 1, current, current + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

const box =
  "grid size-[30px] place-items-center rounded-[6px] bg-white text-[14px] font-medium leading-none tracking-normal text-[#070707]";

export function Pagination({ current, total, base = "/blog" }: { current: number; total: number; base?: string }) {
  const href = (n: number) => (n === 1 ? base : `${base}?page=${n}`);
  const prev = Math.max(1, current - 1);
  const next = Math.min(total, current + 1);
  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-center gap-2">
      <Link href={href(1)} className={box} aria-label="First page">«</Link>
      <Link href={href(prev)} className={box} aria-label="Previous page">‹</Link>
      {pageList(current, total).map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className={box}>…</span>
        ) : (
          <Link
            key={n}
            href={href(n)}
            aria-current={n === current ? "page" : undefined}
            className={n === current ? `${box} bg-[#6b43e2]! text-white!` : box}
          >
            {n}
          </Link>
        )
      )}
      <Link href={href(next)} className={box} aria-label="Next page">›</Link>
      <Link href={href(total)} className={box} aria-label="Last page">»</Link>
    </nav>
  );
}
