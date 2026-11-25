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
  "grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[14px] font-medium leading-none tracking-normal text-white/75 transition-colors hover:border-[#7950e2]/70 hover:bg-[#7950e2]/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b7bf0]";
const selectedBox =
  "border-[#7950e2] bg-gradient-to-b from-[#7950e2] to-[#5724d8] text-white shadow-[0_6px_20px_rgba(87,36,216,.35)]";
const disabledBox = "pointer-events-none border-white/5 bg-white/[0.02] text-white/25";

export function Pagination({ current, total, base = "/blog" }: { current: number; total: number; base?: string }) {
  const pageCount = Math.min(total, 2);
  const page = Math.min(Math.max(current, 1), pageCount);
  const href = (n: number) => (n === 1 ? base : `${base}?page=${n}`);
  const prev = Math.max(1, page - 1);
  const next = Math.min(pageCount, page + 1);
  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={href(1)}
        className={`${box} ${page === 1 ? disabledBox : ""}`}
        aria-label="First page"
        aria-disabled={page === 1}
        tabIndex={page === 1 ? -1 : undefined}
      >
        «
      </Link>
      <Link
        href={href(prev)}
        className={`${box} ${page === 1 ? disabledBox : ""}`}
        aria-label="Previous page"
        aria-disabled={page === 1}
        tabIndex={page === 1 ? -1 : undefined}
      >
        ‹
      </Link>
      {pageList(page, pageCount).map((n, i) =>
        n === "…" ? (
          <span
            key={`e${i}`}
            aria-hidden="true"
            className="grid size-11 place-items-center text-sm text-white/45"
          >
            …
          </span>
        ) : (
          <Link
            key={n}
            href={href(n)}
            aria-current={n === page ? "page" : undefined}
            className={`${box} ${n === page ? selectedBox : ""}`}
          >
            {n}
          </Link>
        )
      )}
      <Link
        href={href(next)}
        className={`${box} ${page === pageCount ? disabledBox : ""}`}
        aria-label="Next page"
        aria-disabled={page === pageCount}
        tabIndex={page === pageCount ? -1 : undefined}
      >
        ›
      </Link>
      <Link
        href={href(total)}
        className={`${box} ${page === pageCount ? disabledBox : ""}`}
        aria-label="Last page"
        aria-disabled={page === pageCount}
        tabIndex={page === pageCount ? -1 : undefined}
      >
        »
      </Link>
    </nav>
  );
}
