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
  const href = (n: number) => (n === 1 ? base : `${base}?page=${n}`);
  const prev = Math.max(1, current - 1);
  const next = Math.min(total, current + 1);
  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={href(1)}
        className={`${box} ${current === 1 ? disabledBox : ""}`}
        aria-label="First page"
        aria-disabled={current === 1}
        tabIndex={current === 1 ? -1 : undefined}
      >
        «
      </Link>
      <Link
        href={href(prev)}
        className={`${box} ${current === 1 ? disabledBox : ""}`}
        aria-label="Previous page"
        aria-disabled={current === 1}
        tabIndex={current === 1 ? -1 : undefined}
      >
        ‹
      </Link>
      {pageList(current, total).map((n, i) =>
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
            aria-current={n === current ? "page" : undefined}
            className={`${box} ${n === current ? selectedBox : ""}`}
          >
            {n}
          </Link>
        )
      )}
      <Link
        href={href(next)}
        className={`${box} ${current === total ? disabledBox : ""}`}
        aria-label="Next page"
        aria-disabled={current === total}
        tabIndex={current === total ? -1 : undefined}
      >
        ›
      </Link>
      <Link
        href={href(total)}
        className={`${box} ${current === total ? disabledBox : ""}`}
        aria-label="Last page"
        aria-disabled={current === total}
        tabIndex={current === total ? -1 : undefined}
      >
        »
      </Link>
    </nav>
  );
}
